# 웰리브 식단표 앱 — 작업 정리 / 인수인계

최종 갱신: 2026-09-18 (KST)
대상: `welliv-menu-app` (워커+프론트) + `sharecoderepo.github.io/WellivMenu` (허브 서브앱)

이 문서 하나로 아키텍처·배포·유지보수·함정을 이해하고 이어서 수정할 수 있게 정리한다.

---

## 0. 한눈에

- 목적: `http://m.welliv.co.kr/mobile/mealmenu_list.jsp` 의 **3일치 식단표**를 조식/중식/석식 탭으로 보여주는 모바일 웹앱. 한국어/영어/우즈벡어 지원.
- 데이터 흐름: **Cloudflare Worker**가 Browser Run(Playwright)으로 크롤 → KV에 원문 캐시 → 요청 시 언어별 변환 후 응답.
- 프론트엔드는 정적(React 19 + Vite)이라 어디든 배포 가능. 데이터는 Worker 한 곳에서 처리.
- 대상 페이지는 **EUC-KR**, 매일 바뀜, 정적 HTML 아님 → 서버측 헤드리스 크롤링 필수.

---

## 1. 저장소 / 경로

### 1-1. 워커+앱 저장소 (메인)
- 경로: `C:\Users\Sapphire\Downloads\분석\ShareCodeRepo\welliv-menu-app`
- git: **로컬 전용** (원격 없음, branch `master`). 커밋은 하되 push 안 함.
- 구성:
  - `worker/index.js` — Worker 엔트리(라우터) + `scheduled()`
  - `worker/menu.js` — API 핸들러, KV 캐시, 크롤링, 로케일 분기, cron 예열
  - `worker/parse.js` — DOM 파서 (`page.evaluate` 겸용, 외부 스코프 참조 없음)
  - `worker/translate.js` — 정규화/영어카테고리/우즈벡어 변환, 칼로리 보존
  - `worker/uz-dict.js` — 우즈벡어 사전(영어 키 → 우즈벡어)
  - `worker/en-dict.js` — 영어 모드에서 한글로 남는 카테고리 → 영어
  - `worker/ko-space.js` — 한국어 띄어쓰기(토큰 사전 + 최장일치)
  - `scripts/uz-report.mjs` — 미번역 항목 리포트 (`npm run uz:report`)
  - `src/` — React 프론트(App.jsx, components/MealTabs.jsx, i18n/strings.js, App.css)
  - `wrangler.toml`, `package.json`, `vite.config.js`

### 1-2. 허브 저장소 (GitHub Pages)
- 경로: `C:\Users\Sapphire\Downloads\분석\ShareCodeRepo\sharecoderepo.github.io`
- 원격: `https://github.com/ShareCodeRepo/sharecoderepo.github.io.git` (branch `main`) — push 함
- 서브앱: `WellivMenu/`
  - 소스: `WellivMenu/src/**`
  - 커밋되는 빌드 산출물: `WellivMenu/assets/*`, `WellivMenu/index.html`
  - `WellivMenu/package.json`의 `deploy` = `vite build && node ../scripts/copy-welliv.mjs`
  - `scripts/copy-welliv.mjs`가 `WellivMenu/dist/{assets,index.html}` → `WellivMenu/`로 복사
  - API는 **절대주소** 호출: `https://welliv-menu-app.excellwork.workers.dev/api/menu?lang=<locale>`

### 1-3. 배포 위치
| 위치 | URL | 비고 |
|---|---|---|
| Cloudflare Worker | https://welliv-menu-app.excellwork.workers.dev | API + 자체 정적자산 |
| GitHub Pages | https://sharecoderepo.github.io/WellivMenu/ | 허브 리포 push 시 반영 |
| Vercel | https://wellivmenu.vercel.app | 허브 빌드 산출물 서빙(리포 연동 시 자동) |

---

## 2. 아키텍처

```
[브라우저]
   ├─ 정적 프론트 (React 빌드): GitHub Pages / Vercel / (Worker 자체 자산)
   └─ GET /api/menu?lang=ko|en|uz  (절대주소, CORS)
          ▼
Cloudflare Worker (worker/index.js)
   ├─ /api/* → worker/menu.js onRequestGet
   │     ├─ KV 원문 캐시 조회  key = menu:raw:YYYY-MM-DD (KST)
   │     ├─ miss/불완전 → Browser Run(브라우저 1세션)으로 ko/en 동시 크롤
   │     │       └─ worker/parse.js 로 3일치 파싱
   │     └─ 요청 로케일로 변환 후 응답 (변환은 캐시하지 않음)
   └─ 그 외 → ASSETS(dist, SPA fallback)
Cron (0 15 * * * = KST 00:00, 30 20 * * * = KST 05:30) → scheduled() → warmCache(force) 로 캐시 갱신
```

---

## 3. API 계약

`GET /api/menu?lang=ko|en|uz` (생략 시 ko)

- `ko`: 사이트 한국어 + **한국어 띄어쓰기** 적용
- `en`: 사이트 영어 + **한글로 남은 카테고리만 영어로 변환**
- `uz`: 사이트 영어를 **우즈벡어로 변환**(항목명), **칼로리는 보존**

응답:
```json
{
  "lang": "ko",
  "days": [
    {
      "date": "2026-09-15",
      "dateLabel": "09/15(화)",
      "meals": {
        "breakfast": [
          { "category": "A(한식)", "items": ["황태 콩나물 해장국 (125Kcal)", "..."] }
        ],
        "lunch": [], "dinner": []
      }
    }
  ],
  "updatedAt": "2026-09-15T...Z"
}
```
- `days`는 3일치. `category`는 `null` 가능.
- 실패 시 `502 { "error": "crawl_failed", "message": "..." }`.

---

## 4. Worker 구현 상세 (`welliv-menu-app/worker`)

### 4-1. 라우팅 (`index.js`)
- `/api/menu`: OPTIONS(204+CORS) / GET → `onRequestGet` / 그 외 405
- 그 외 경로: `env.ASSETS.fetch(request)` (SPA fallback)
- `scheduled()`: `ctx.waitUntil(warmCache(env, { force: true }))`

### 4-2. KV 캐시 (`menu.js`)
- 키: `menu:raw:${YYYY-MM-DD(KST)}` 하나에 `{ kor, eng, updatedAt }` 저장.
- **원문(ko/en)만 캐시**하고 언어 변환은 요청 시 수행 → **사전/카테고리 수정이 배포 즉시 반영**(번역 캐시 없음).
- TTL 20시간.
- 캐시가 없거나 `kor`/`eng` 중 하나라도 비면 재크롤(`isIncompleteRaw`). 정상일 때만 저장.

### 4-3. 크롤링/파싱
- `WELLIV_URL = http://m.welliv.co.kr/mobile/mealmenu_list.jsp`
- 언어는 쿼리파라미터: `?lang=kor` / `?lang=eng` (사이트가 kor/eng만 제공).
- 한 브라우저 세션에서 **kor → eng 순서로 2회 goto** (Browser Run 429 rate limit 회피).
- `page.goto(..., { waitUntil: "networkidle" })` 후 `.food_sch table` 렌더 대기(`waitForSelector`), 그 다음 `page.evaluate(parseMenuDocument)`.
- 빈 결과면 언어별 **1회 재시도**. 빈 결과는 캐시하지 않음.
- `parse.js`: `.food_sch table`의 첫 행(헤더) 제외, 각 행=하루, `cells[0]=날짜`, `cells[1..3]=조/중/석식`. 끼니 셀 내부 table에서 `span.style3`=카테고리, 그 외 텍스트=항목.
- 날짜 변환 `normalizeDate`: 페이지에 연도 없음 → 오늘(KST) 기준 ±200일 규칙으로 보정.

### 4-4. 언어 변환 (`translate.js` + dict)
- `normalizeKey`: 괄호(칼로리/수량) 제거, `‘’` → `'`, 슬래시 공백 정리, 소문자화 → 매칭 안정화.
- 우즈벡어: `UZ_PHRASES`(영어 표기 키 → 우즈벡어), `UZ_ALIASES`(사이트 변형/오탈자 → 정식 키).
  - 정확 매칭 → 슬래시/플러스 분해 매칭 → **미매칭은 영어 폴백**.
  - **칼로리 보존**: 원문에서 `(NNNKcal)` 추출해 번역 뒤에 붙임.
- 영어: `EN_CATEGORY`로 한글 잔존 카테고리(한식/간편식/분식/일품식/샐러드/컵밥/선식)를 영어로.
- 한국어 띄어쓰기: `ko-space.js`의 어토믹 토큰 사전 + 최장일치. `/`와 `+`는 공백 삽입, 괄호 안쪽 공백 제거. **완성형 합성어를 토큰으로 넣으면 분절이 막히므로 금지.**

### 4-5. 캐시 예열 (Cron)
- `wrangler.toml`: `[triggers] crons = ["0 15 * * *", "30 20 * * *"]` → **UTC 15:00 = KST 자정 00:00**, **UTC 20:30 = KST 새벽 05:30**.
- `warmCache(env, { force })`:
  - 기본(force=false): 캐시 없음/불완전할 때만 크롤.
  - cron은 **force=true** → 캐시가 있어도 다시 크롤해 **자정/새벽 갱신을 반영**.

### 4-6. 방어 로직 (중요)
- 파싱 전 테이블 렌더 대기 + 빈 결과 재시도.
- **양쪽 언어가 정상일 때만 캐시** → 빈 캐시로 하루 종일 특정 언어가 비는 사고 방지.
- 불완전 캐시는 다음 요청에서 자동 재크롤(auto-heal).

---

## 5. 프런트엔드 (`src/`)

- `App.jsx`: 로케일 상태(ko/en/uz), 테마 상태, 데이터 로드(`/api/menu?lang=<locale>`), 날짜탭, 제목.
- `components/MealTabs.jsx`: 조/중/석식 탭, 그룹(대표메뉴) 렌더, 항목 괄호 앞 공백 처리(`formatItem`).
- `i18n/strings.js`: UI 문자열 + `LOCALES`.
- `App.css` / `index.css`: 테마 토큰(라이트/다크), 날짜칩, 대표메뉴 그룹 스타일.

### 5-1. 테마
- `:root` / `:root[data-theme="dark"]` 토큰. `index.html`에 FOUC 방지 인라인 스크립트, `localStorage` 키 `welliv-menu-theme`.
- 허브에만 `ThemeToggle.jsx` 있음(워커 프론트엔 없음).

### 5-2. 날짜 칩
- 표시: `MM/DD` + **요일은 항상 한국어**(ISO `day.date`에서 계산, 로케일 무관) → `09/15 (화)` 한 줄.
- 스타일: 카드형 pill, 활성=파란 그라데이션+흰 글씨+그림자.

### 5-3. 대표메뉴(그룹)
- 그룹=서브카드(연한 배경+라운드), 카테고리 제목=**파란 글씨 + 2px 언더라인**(배경 없음).
- 그룹 간격 > 항목 간격으로 위계.

### 5-4. 타이틀 새로고침 규칙
- 제목 클릭 시 재요청. 단 **데이터가 정상 로드된 상태면 비활성**(`canRefresh`), 없음/에러일 때만 클릭 가능.
- 허브: `2026 웰리브 식단표`, 영어: `2026 Welliv Menu`, 우즈벡: `2026 Welliv menyu` (en/uz만 축약, wrap 방지).
- 헤더는 `flex-wrap`, `h1`은 `white-space: nowrap`.

### 5-5. 갱신 안내 메시지
- 원문 캐시가 **KST 날짜 단위**라, 같은 날 안에서는 사이트가 식단을 수정해도 반영되지 않는다. 사용자 오해를 줄이기 위해 **갱신 시각을 안내**한다.
- i18n 키: `notUpdated`(미갱신 안내), `updateSchedule`(`매일 자정 12:00, 새벽 05:30 (KST) 갱신`).
- 표시 위치(`App.jsx`): ① 에러 상태, ② `ready`지만 `days`가 빈 상태, ③ 정상 상태의 업데이트 시각 옆.
- Worker 자체 프론트(`welliv-menu-app/src`)와 허브(`WellivMenu/src`) **양쪽 동일 적용**.

---

## 6. 유지보수 방법

### 6-1. 우즈벡어 사전
- 파일: `worker/uz-dict.js`의 `UZ_PHRASES`(영어 표기 키). 사이트는 우즈벡어 미지원이라 **영어 키** 사용.
- 빠진 항목 확인: `npm run uz:report` → 출력된 키를 채워 넣고 배포. (번역 캐시 없음 → 배포 즉시 반영)
- 칼로리는 자동 보존되므로 사전 값에 넣지 않는다.

### 6-2. 한국어 띄어쓰기
- 파일: `worker/ko-space.js` `LEXICON`. **어토믹 토큰만 추가**. 완성형 합성어 금지.
- 새 메뉴가 생기면 새로 등장한 토큰만 추가하면 대부분 자동 분절됨.

### 6-3. 영어 카테고리
- 파일: `worker/en-dict.js` `EN_CATEGORY` (한글 카테고리 → 영어).

### 6-4. 캐시 수동 채우기 / 확인
```bash
# 원문 캐시 수동 주입(정상 데이터 확보 시)
npx wrangler kv key put --binding MENU_KV --remote "menu:raw:<YYYY-MM-DD>" --path <raw.json>
```
- `raw.json` 형태: `{ "kor": days[], "eng": days[], "updatedAt": "..." }`
- 참고: 원격 KV **읽기**(`kv key get --remote`)는 토큰 권한 문제로 401이 날 수 있음. 쓰기는 가능.

---

## 7. 함정 / 의사결정 로그

1. **Cloudflare Pages Functions 불가** → Worker 사용.
   `@cloudflare/playwright`가 `node:fs.mkdtemp` 사용 → Pages의 unenv 폴리필에서 미구현. Worker(+정적자산)로 배포해야 정상.
2. **Browser Run 429 rate limit** → 언어별로 따로 크롤하지 않고 **브라우저 1세션에서 ko/en 동시 크롤**.
3. **EUC-KR**: 서버가 `Content-Type: ...charset=euc-kr` 응답(meta의 utf-8 선언보다 HTTP 헤더 우선) → Playwright 정상 디코딩.
4. **빈 `kor` 캐시 사고**: 특정 날짜 `menu:raw`에 `kor:[]`가 캐시되어 한국어만 안 나옴 → 파싱 전 대기 + 빈 결과 재시도 + 정상일 때만 캐시 + auto-heal 로 해결.
5. **날짜 경계**: 자정 넘으면 캐시 키가 바뀌어 첫 접속자가 새로 크롤. 자정 00:00 / 새벽 05:30 cron(force)이 갱신을 반영.
6. **버전 관리 제거**: 번역을 캐시하지 않으므로 `UZ_DICT_VERSION` 같은 수동 버전 불필요(과거에 content-hash 방식 → 이후 raw 캐시 + 요청시 변환으로 단순화).
7. **허브 서브패스**: `base: "./"` (GitHub Pages 하위경로), API는 절대주소+CORS.
8. **하루 내 갱신 안 됨(2026-09-18 대응)**: 원문을 KST 날짜 키로 캐시하므로 같은 날 사이트가 식단을 바꿔도 재크롤하지 않아 사용자가 "갱신이 안 된다"고 느낌. 대응으로 cron을 **KST 자정 00:00 + 새벽 05:30 강제 갱신**으로 늘리고, 프론트에 **갱신 시각 안내 메시지**를 추가. 근본 해결(TTL 단축/stale-while-revalidate)은 미적용.

---

## 8. 명령어 / 배포

### 워커 저장소
```bash
npm install
npm run dev        # Vite(5173) + wrangler dev(8788)  ※ Browser Run 로컬은 --remote 필요할 수 있음
npm run lint       # oxlint
npm run deploy     # vite build && wrangler deploy  (Cloudflare 배포)
```

### 허브 저장소 (WellivMenu)
```bash
# WellivMenu 디렉터리에서
npm run deploy     # vite build + scripts/copy-welliv.mjs → WellivMenu/(assets,index.html)
git add -A && git commit -m "..." && git push origin main
```

### 로컬 테스트 보조(임시, 커밋 안 됨)
- `C:\Users\Sapphire\AppData\Local\Temp\opencode\welliv-test\`
  - `linkedom` 기반 파서 테스트, `gen-raw.mjs`(라이브 페이지 → raw JSON 생성), `test-uz.mjs`(커버리지), `test-ko-space.mjs`.

### Cloudflare 설정(`wrangler.toml`)
| 항목 | 값 |
|---|---|
| name | `welliv-menu-app` |
| main | `worker/index.js` |
| compatibility_date | `2026-09-14` |
| compatibility_flags | `["nodejs_compat"]` |
| assets | `directory=./dist`, `binding=ASSETS`, SPA fallback, `run_worker_first=["/api/*"]` |
| KV | `MENU_KV` id `caad6e3bb87b49128fd2e4e523278c32` |
| browser | `MENU_BROWSER` |
| triggers | `crons = ["0 15 * * *", "30 20 * * *"]` (KST 00:00, 05:30) |
| 계정 | `excellwork@gmail.com` (account id `d31cd88d4ef896d3804992fdb2a1498b`) |

---

## 9. 알려진 이슈 / TODO

- **실패 시 폴백 미구현**: 재시도까지 실패하면 빈 결과 대신 ① 직전 정상 스냅샷(`menu:lastgood`) stale 응답 → ② 스냅샷도 없으면 `503 + Retry-After`로 떨어뜨리자는 안이 논의됨(미적용).
- **하루 내 신선도**: 날짜 키 캐시라 같은 날 사이트 수정은 cron(00:00/05:30) 전까지 반영 안 됨. TTL 단축/stale-while-revalidate/수동 강제 새로고침(`?refresh=1`)은 미적용(안내 메시지만 추가).
- **우즈벡어 번역 품질**: `uz-dict.js`의 `// ── 보조 번역 (검토 필요) ──` 이하 항목은 사람 검수 필요.
- **한국어 띄어쓰기**: 휴리스틱이라 일부 경계(예: `제육 불고기`, `파 계란국`, `초간장`)는 토큰 조정 필요.
- **워커 소스 원격 없음**: `welliv-menu-app`은 로컬 git만. 필요 시 새 원격을 만들어 push.
- **Vercel**: 리포 연동이면 push 시 자동 재배포, 아니면 수동 재배포.
- **커스텀 도메인**(선택): `*.workers.dev`의 계정 식별자 노출 완화.

---

## 10. 최근 커밋 (워커 repo, 최신순)

- `a44d513` 하루 갱신 안내 메시지 + cron KST 00:00/05:30
- `1d89370` 05:30 KST cron 강제 갱신
- `2aa3581` 데이터 있을 때 타이틀 새로고침 비활성
- `e520494` 타이틀 클릭 새로고침 + cron 05:30
- `cffe8cd` 영어/우즈벡 타이틀 축약
- `0048521` 타이틀 wrap 방지 + cron 예열 추가
- `c2e928f` 빈 언어 결과 방어(대기/재시도/캐시 가드)
- `d4b02f7` 날짜칩 간격/요일 볼드
- `af039ae` 날짜 한국어 요일 + 연도 타이틀
- `4a904ec` `/` 공백 · `5b970b5` `+` 공백 · `a9c43f9` 한국어 띄어쓰기
- `f0f0c54` 우즈벡 칼로리 보존 + 항목 괄호 공백
- `dc76bb6` 날짜/그룹 스타일
- `7cb5348` 영어 카테고리 변환 + raw 캐시 구조
- `c49afc5`/`19e4aac`/`2c3e869`/`58fe6cb`/`8172749` 우즈벡 사전·번역
- `82dc71b` 로컬 스냅샷(lang 지원)

허브 repo 최근: `c5542fc`(웰리브 갱신 안내 메시지), `5d22961`(ManHour 기본 일당 전파), `cf0a024`(타이틀 새로고침 비활성), `4c16893`(타이틀 클릭+5:30), `b61dbae`(타이틀 축약), `528f10f`(타이틀 wrap 방지), `0b077b1`(날짜칩/요일), `a15a4fd`(날짜+타이틀), `e85ee5a`(괄호 공백), `59278a0`(날짜/그룹 스타일), `0adad45`(테마+언어 로딩).
