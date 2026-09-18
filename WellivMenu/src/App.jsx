import { useEffect, useState } from "react";
import MealTabs from "./components/MealTabs.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { LOCALES, t } from "./i18n/strings.js";
import "./App.css";

// 크롤링 API (Cloudflare Worker) — 정적 호스팅에서는 같은 오리진에 API가 없으므로 절대주소 사용
const MENU_API =
  "https://welliv-menu-app.excellwork.workers.dev/api/menu";

const THEME_KEY = "welliv-menu-theme";

function getInitialTheme() {
  const applied = document.documentElement.dataset.theme;
  if (applied === "light" || applied === "dark") return applied;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage 접근 불가 시 시스템 설정 사용
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// "09/14(월)" 같은 dateLabel을 { date: "09/14", weekday: "월" }로 분리한다.
// 요일은 로케일과 무관하게 항상 한국어로 표시한다.
const KO_WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

function dayParts(day) {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day.date ?? "");
  if (iso) {
    const [, y, m, d] = iso;
    const wd = new Date(
      Date.UTC(Number(y), Number(m) - 1, Number(d))
    ).getUTCDay();
    return { date: `${m}/${d}`, weekday: KO_WEEKDAY[wd] };
  }

  // date.date가 ISO가 아니면 dateLabel에서 분리
  const label = (day.dateLabel ?? "").trim();
  const m2 = /^(\d{1,2}\/\d{1,2})\s*\(([^()]+)\)$/.exec(label);
  if (m2) return { date: m2[1], weekday: m2[2].trim() };

  return { date: label || day.date || "", weekday: "" };
}

export default function App() {
  const [locale, setLocale] = useState("ko");
  const [theme, setTheme] = useState(getInitialTheme);
  const [days, setDays] = useState(null); // 3일치 [{date, meals}]
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [updatedAt, setUpdatedAt] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // 저장 실패는 무시
    }
  }, [theme]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`${MENU_API}?lang=${locale}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setDays(data.days ?? []);
        setUpdatedAt(data.updatedAt ?? null);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [locale, reloadKey]);

  const activeDay = days?.[activeDayIdx];

  // 데이터가 없거나 에러일 때만 제목 클릭 새로고침을 허용한다.
  const canRefresh =
    status === "error" || (status === "ready" && (!days || days.length === 0));

  return (
    <div className="app">
      <header className="app__header">
        <h1>
          <button
            type="button"
            className="app__title-btn"
            onClick={() => setReloadKey((k) => k + 1)}
            disabled={!canRefresh}
            title={canRefresh ? t(locale, "refresh") : undefined}
            aria-label={canRefresh ? t(locale, "refresh") : undefined}
          >
            {t(locale, "appTitle")}
          </button>
        </h1>
        <div className="app__controls">
          <div className="app__locale">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                className={`app__locale-btn${locale === loc ? " is-active" : ""}`}
                onClick={() => setLocale(loc)}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <ThemeToggle
            theme={theme}
            locale={locale}
            onToggle={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
          />
        </div>
      </header>

      {status === "loading" && <p className="app__status">{t(locale, "loading")}</p>}

      {status === "error" && (
        <div className="app__status">
          <p>{t(locale, "error")}</p>
          <p className="app__schedule">{t(locale, "updateSchedule")}</p>
          <button onClick={() => setReloadKey((k) => k + 1)}>
            {t(locale, "retry")}
          </button>
        </div>
      )}

      {status === "ready" && (!days || days.length === 0) && (
        <div className="app__status">
          <p>{t(locale, "notUpdated")}</p>
          <p className="app__schedule">{t(locale, "updateSchedule")}</p>
        </div>
      )}

      {status === "ready" && days && days.length > 0 && (
        <>
          <div className="app__days" role="tablist">
            {days.map((day, idx) => {
              const { date, weekday } = dayParts(day);
              return (
                <button
                  key={day.date}
                  role="tab"
                  aria-selected={activeDayIdx === idx}
                  className={`app__day-btn${activeDayIdx === idx ? " is-active" : ""}`}
                  onClick={() => setActiveDayIdx(idx)}
                >
                  <span className="app__day-date">{date}</span>
                  {weekday && (
                    <span className="app__day-weekday">({weekday})</span>
                  )}
                </button>
              );
            })}
          </div>

          <MealTabs locale={locale} day={activeDay} />

          {updatedAt && (
            <p className="app__updated">
              <span className="app__updated-line">
                {t(locale, "updatedAt")}: {new Date(updatedAt).toLocaleString(locale)}
              </span>
              <span className="app__updated-line">
                {t(locale, "updateSchedule")}
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
}
