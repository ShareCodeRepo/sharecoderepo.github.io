import ModuleFactory from './lotto_web.js';

let Module = null;

// DOM 요소 참조
const els = {
    statusText: document.getElementById('statusText'),
    btnLoad: document.getElementById('btnLoad'),
    btnPick: document.getElementById('btnPick'),
    btnFilterSum: document.getElementById('btnFilterSum'),
    btnMarkov: document.getElementById('btnMarkov'),
    inputs: {
        minSum: document.getElementById('minSum'),
        maxSum: document.getElementById('maxSum'),
        targetSum: document.getElementById('targetSum'),
        mkSum: document.getElementById('mk-currentSum'),
        mkW: document.getElementById('mk-W'),
        mkTopN: document.getElementById('mk-topN')
    }
};

// 상태 메시지
// function setStatus(msg, type = "normal") {
//     els.statusText.innerHTML = msg;
//     if (type === "error") els.statusText.style.color = "#fa5252";
//     else if (type === "success") els.statusText.style.color = "#40c057";
//     else els.statusText.style.color = "#e67700";
// }
function setStatus(msg, type = "normal") {
    if (!els.statusText) return;
    els.statusText.innerHTML = msg;
    
    // 기존 클래스 제거 및 새 클래스 추가
    els.statusText.classList.remove('status-loading', 'status-success', 'status-error');

    if (type === "error") {
        els.statusText.classList.add('status-error');
    } else if (type === "success") {
        els.statusText.classList.add('status-success');
    } else {
        els.statusText.classList.add('status-loading');
    }
}


function setLoading(targetId, isLoading, msg = "작업 중...") {
    const out = document.getElementById(targetId);
    if (isLoading) {
        out.innerHTML = `<div class="spinner"></div><div style="text-align:center; color:#666;">${msg}</div>`;
    }
}

// 로또 공 HTML
function createBallHtml(numStr) {
    const n = parseInt(numStr);
    if (isNaN(n)) return '';
    let colorClass = 'ball-y';
    if (n > 10) colorClass = 'ball-b';
    if (n > 20) colorClass = 'ball-r';
    if (n > 30) colorClass = 'ball-g';
    if (n > 40) colorClass = 'ball-gn';
    return `<span class="lotto-ball ${colorClass}">${n}</span>`;
}

// 합계 태그 색상 결정
function getSumTagClass(sumVal) {
    if (sumVal <= 120) return 'tag-low';
    if (sumVal <= 160) return 'tag-mid';
    if (sumVal <= 180) return 'tag-high';
    return 'tag-very-high';
}

// 일반 결과 출력
// 일반 결과 출력 (JS 배열 대응 수정)
function printResults(targetId, results, timeMs = null, headerHtml = '') {
    const out = document.getElementById(targetId);
    out.innerHTML = "";
    if (headerHtml) out.innerHTML += headerHtml;

    if (timeMs !== null) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'result-msg msg-success';
        msgDiv.innerHTML = `✅ 완료 <small>(${timeMs.toFixed(2)}ms)</small>`;
        out.appendChild(msgDiv);
    }

    // [수정] .size() -> .length (JS 배열이므로)
    if (results.length === 0) {
        out.innerHTML += '<div class="msg-empty">조건에 맞는 결과가 없습니다.</div>';
        return;
    }

    // [수정] .size() -> .length
    for (let i = 0; i < results.length; i++) {
        // [수정] .get(i) -> [i]
        const rawStr = results[i]; 
        
        const match = rawStr.match(/#(\d+): \[(.*?)\] \((.*)\)/);
        const div = document.createElement('div');
        div.className = 'item';

        if (match) {
            const indexRaw = match[1];
            const indexNum = parseInt(indexRaw, 10);
            const indexStr = isNaN(indexNum) ? indexRaw : indexNum.toLocaleString();
            
            const numbers = match[2].split(',').map(s => s.trim());
            const ballsHtml = numbers.map(n => createBallHtml(n)).join('');
            
            const info = match[3];
            const sumMatch = info.match(/\d+/);
            const sumVal = sumMatch ? parseInt(sumMatch[0]) : 0;
            const tagClass = getSumTagClass(sumVal);

            div.innerHTML = `
                <span class="item-index">#${indexStr}</span>
                <span class="item-balls">${ballsHtml}</span>
                <span class="item-info ${tagClass}">${info}</span>
            `;
        } else {
            div.style.color = "red";
            div.innerText = "PARSE ERROR: " + rawStr;
        }
        out.appendChild(div);
    }
    // [수정] JS 배열은 .delete()가 없음 (자동 GC됨)
    // results.delete(); 
}


// [New] 마르코프 결과 출력
function printMarkovResults(results) {
    const out = document.getElementById('out-markov');
    out.innerHTML = "";
    
    if (results.length === 0) {
        out.innerHTML = '<div class="msg-empty">예측 결과가 없습니다.</div>';
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '10px';
    
    table.innerHTML = `
        <tr style="border-bottom:1px solid #444; color:#888; font-size:0.9em;">
            <th style="padding:8px; text-align:left;">순위</th>
            <th style="padding:8px; text-align:left;">예측 합계</th>
            <th style="padding:8px; text-align:left;">확률</th>
            <th style="padding:8px; text-align:left;">비중</th>
        </tr>
    `;

    results.forEach((item, idx) => {
        const rank = idx + 1;
        const probPct = (item.prob * 100).toFixed(2) + '%';
        const barWidth = Math.min(item.prob * 800, 100); 
        
        const tagClass = getSumTagClass(item.sum);
        
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #333';
        tr.innerHTML = `
            <td style="padding:10px;">${rank}</td>
            <td style="padding:10px;">
                <span class="item-info ${tagClass}" style="display:inline-block; width:auto; padding:4px 10px;">${item.sum}</span>
            </td>
            <td style="padding:10px; color:#e0e0e0;">${probPct}</td>
            <td style="padding:10px; width:40%;">
                <div style="background:#333; height:6px; border-radius:3px; overflow:hidden;">
                    <div style="background:#10b981; height:100%; width:${barWidth}%;"></div>
                </div>
            </td>
        `;
        table.appendChild(tr);
    });
    out.appendChild(table);
}

// 탭 전환
window.openTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-btn[onclick="openTab('${tabId}')"]`).classList.add('active');
};

window.updateSumInputs = () => {
    const mode = document.querySelector('input[name="sumMode"]:checked').value;
    const rangeDiv = document.getElementById('rangeInputs');
    const exactDiv = document.getElementById('exactInput');

    if (mode === 'range') {
        rangeDiv.classList.remove('hidden'); // 보이기
        exactDiv.classList.add('hidden');    // 숨기기
    } else {
        rangeDiv.classList.add('hidden');    // 숨기기
        exactDiv.classList.remove('hidden'); // 보이기
    }
};

// 초기화
async function init() {
    els.btnLoad.onclick = async () => {
        els.btnLoad.disabled = true;
        els.btnLoad.innerText = "로딩 중...";
        setStatus("데이터 초기화 중...");

        try {
            if (!Module) Module = await ModuleFactory();

            // [수정됨] 데이터 로드만 수행 (주입 삭제)
            if (Module.load_data()) {
                setStatus("🟢 준비 완료 (814만 조합 + 마르코프)", "success");
                els.btnLoad.style.display = 'none';
                els.btnPick.disabled = false;
                els.btnFilterSum.disabled = false;
                els.btnMarkov.disabled = false;
            }
        } catch (e) {
            console.error(e);
            setStatus("❌ 오류: " + e.message, "error");
            els.btnLoad.disabled = false;
            els.btnLoad.innerText = "다시 시도";
        }
    };

    els.btnPick.onclick = () => {
        setLoading('out-home', true);
        setTimeout(() => {
            const start = performance.now();
            const results = Module.get_random_combos(5);
            const end = performance.now();
            printResults('out-home', results, end - start);
        }, 10);
    };

    els.btnFilterSum.onclick = () => { 
        const mode = document.querySelector('input[name="sumMode"]:checked').value;
        let minVal, maxVal;

        if (mode === 'range') {
            minVal = parseInt(els.inputs.minSum.value);
            maxVal = parseInt(els.inputs.maxSum.value);
        } else {
            const val = parseInt(els.inputs.targetSum.value);
            minVal = val;
            maxVal = val;
        }
        
        if (isNaN(minVal) || isNaN(maxVal)) { alert("숫자 입력 필요"); return; }
        if (minVal > maxVal) [minVal, maxVal] = [maxVal, minVal];

        setLoading('out-sum', true, "검색 중...");
        
        setTimeout(() => {
            const start = performance.now();
            const results = Module.filter_by_sum(minVal, maxVal, 20);
            const end = performance.now();
            const header = `<div style="color:#888; margin-bottom:10px;">🔎 조건: 합계 ${minVal}~${maxVal}</div>`;
            printResults('out-sum', results, end - start, header);
        }, 10);
    };
    
    // C++이 이미 JS 배열(val)을 반환하므로 바로 쓰면 됨
els.btnMarkov.onclick = () => {
    const s = parseInt(els.inputs.mkSum.value);
    const w = parseInt(els.inputs.mkW.value);
    const topN = parseInt(els.inputs.mkTopN.value);
    
    setLoading('out-markov', true, "예측 분석 중...");
    
    setTimeout(() => {
        // [수정] 반환값이 이미 JS 배열입니다. 변환 필요 없음!
        const results = Module.predict_next_markov(s, w, topN, 0.01);
        
        printMarkovResults(results);
    }, 100);
};


    document.querySelectorAll('input[name="sumMode"]').forEach(r => r.addEventListener('change', updateSumInputs));
    updateSumInputs(); // 초기 상태 업데이트
}

init();
