import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Pencil,
  X,
  Download,
  Upload,
  Check,
  Settings,
} from "lucide-react";

const STORAGE_KEY = "leave-tracker-data";
const LANG_KEY = "leave-tracker-lang";

const TYPE_KEYS = ["full", "am", "pm"];
const TYPE_VALUE = { full: 1, am: 0.5, pm: 0.5 };

const LANGS = {
  ko: {
    name: "한국어",
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    title: "연차 관리",
    subtitle: "올해 사용한 연차와 남은 연차를 한눈에",
    saving: "저장 중",
    saved: "자동 저장됨",
    saveError: "자동 저장 실패 · JSON으로 내보내 두세요",
    daysRemaining: "일 남음",
    stateRelaxed: "여유",
    stateCaution: "주의",
    stateLow: "빠듯함",
    daysUsed: (n) => `${n}일 사용`,
    daysOfTotal: (n) => `${n}일 중`,
    caption: (used, total) => `${total}일 중 ${used}일 사용`,
    totalDaysLabel: (n) => `총 연차 ${n}일`,
    totalDaysEditLabel: "총 연차 일수",
    settings: "설정",
    saveSettings: "저장",
    history: "사용 내역",
    empty: "아직 등록된 연차 사용 내역이 없습니다.",
    addEntry: "사용 내역 추가",
    noLeaveLeft: "남은 연차가 없습니다",
    date: "날짜",
    type: "종류",
    memo: "메모 (선택)",
    memoPlaceholder: "예: 감기, 몸살, 병원 진료",
    cancel: "취소",
    save: "추가",
    saveEdit: "수정 저장",
    editLabel: "수정",
    deleteLabel: "삭제",
    confirmDelete: "이 사용 내역을 삭제할까요?",
    exportBtn: "내보내기 (JSON)",
    importBtn: "불러오기 (JSON)",
    typeLabels: {
      full: "연차",
      am: "오전 반차",
      pm: "오후 반차",
    },
    fmtDate: (iso, weekdays) => {
      const d = new Date(iso + "T00:00:00");
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekdays[d.getDay()]})`;
    },
  },

  en: {
    name: "English",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    title: "Leave Tracker",
    subtitle: "See your used and remaining leave at a glance",
    saving: "Saving",
    saved: "Saved automatically",
    saveError: "Auto-save failed · export a JSON backup",
    daysRemaining: " days left",
    stateRelaxed: "Relaxed",
    stateCaution: "Caution",
    stateLow: "Tight",
    daysUsed: (n) => `${n} days used`,
    daysOfTotal: (n) => `of ${n}`,
    caption: (used, total) => `${used} of ${total} days used`,
    totalDaysLabel: (n) => `Total leave: ${n} days`,
    totalDaysEditLabel: "Total leave days",
    settings: "Settings",
    saveSettings: "Save",
    history: "History",
    empty: "No leave entries yet.",
    addEntry: "Add entry",
    noLeaveLeft: "No leave days left",
    date: "Date",
    type: "Type",
    memo: "Memo (optional)",
    memoPlaceholder: "e.g. Cold, fever, hospital visit",
    cancel: "Cancel",
    save: "Add",
    saveEdit: "Save changes",
    editLabel: "Edit",
    deleteLabel: "Delete",
    confirmDelete: "Delete this leave record?",
    exportBtn: "Export (JSON)",
    importBtn: "Import (JSON)",
    typeLabels: {
      full: "Full day",
      am: "Half day (AM)",
      pm: "Half day (PM)",
    },
    fmtDate: (iso, weekdays) => {
      const d = new Date(iso + "T00:00:00");

      return `${weekdays[d.getDay()]}, ${d.toLocaleString("en-US", {
        month: "short",
      })} ${d.getDate()}`;
    },
  },

  uz: {
    name: "O'zbekcha",
    weekdays: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
    title: "Ta'til boshqaruvi",
    subtitle:
      "Ta'tilingizning ishlatilgan va qolgan kunlarini bir qarashda ko'ring",
    saving: "Saqlanmoqda",
    saved: "Avtomatik saqlandi",
    saveError:
      "Avtomatik saqlash muvaffaqiyatsiz · JSON sifatida eksport qiling",
    daysRemaining: " kun qoldi",
    stateRelaxed: "Bepul",
    stateCaution: "Ehtiyot",
    stateLow: "Tor",
    daysUsed: (n) => `${n} kun ishlatildi`,
    daysOfTotal: (n) => `${n} kundan`,
    caption: (used, total) => `${total} kundan ${used} kun ishlatildi`,
    totalDaysLabel: (n) => `Jami ta'til: ${n} kun`,
    totalDaysEditLabel: "Jami ta'til kunlari",
    settings: "Sozlamalar",
    saveSettings: "Saqlash",
    history: "Tarix",
    empty: "Hozircha ta'til yozuvlari yo'q.",
    addEntry: "Yozuv qo'shish",
    noLeaveLeft: "Ta'til kuni qolmadi",
    date: "Sana",
    type: "Ta'til turi",
    memo: "Izoh (ixtiyoriy)",
    memoPlaceholder: "masalan: shamollash, isitma, shifokor ko'rigi",
    cancel: "Bekor qilish",
    save: "Qo'shish",
    saveEdit: "O'zgarishlarni saqlash",
    editLabel: "Tahrirlash",
    deleteLabel: "O'chirish",
    confirmDelete: "Bu yozuvni o'chirilsinmi?",
    exportBtn: "Eksport (JSON)",
    importBtn: "Import (JSON)",
    typeLabels: {
      full: "To'liq kun",
      am: "Yarim kun (ertalab)",
      pm: "Yarim kun (tushdan keyin)",
    },
    fmtDate: (iso, weekdays) => {
      const d = new Date(iso + "T00:00:00");

      const months = [
        "yan",
        "fev",
        "mar",
        "apr",
        "may",
        "iyn",
        "iyl",
        "avg",
        "sen",
        "okt",
        "noy",
        "dek",
      ];

      return `${d.getDate()}-${months[d.getMonth()]}, ${
        weekdays[d.getDay()]
      }`;
    },
  },
};

const uid = () => Math.random().toString(36).slice(2, 9);

const todayStr = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

export default function LeaveTracker() {
  const [lang, setLang] = useState("ko");
  const t = LANGS[lang];

  const [totalDays, setTotalDays] = useState(15);

  const [entries, setEntries] = useState([
    {
      id: uid(),
      date: "2026-03-10",
      type: "full",
      memo: "가족 여행",
    },
    {
      id: uid(),
      date: "2026-05-06",
      type: "am",
      memo: "병원 진료",
    },
  ]);

  const [editingTotal, setEditingTotal] = useState(false);
  const [totalDraft, setTotalDraft] = useState(String(totalDays));

  const [showSettings, setShowSettings] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: todayStr(),
    type: "full",
    memo: "",
  });

  const fileInputRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle");

  // 자동 불러오기
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);

        if (!cancelled && result?.value) {
          const parsed = JSON.parse(result.value);

          if (typeof parsed.totalDays === "number") {
            setTotalDays(parsed.totalDays);
          }

          if (Array.isArray(parsed.entries)) {
            setEntries(parsed.entries);
          }
        }
      } catch {
        // 저장된 데이터가 없거나 불러오기 실패
      }

      try {
        const langResult = await window.storage.get(LANG_KEY, false);

        if (
          !cancelled &&
          langResult?.value &&
          LANGS[langResult.value]
        ) {
          setLang(langResult.value);
        }
      } catch {
        // 저장된 언어 설정 없음
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // 자동 저장
  useEffect(() => {
    if (!loaded) return;

    setSaveState("saving");

    const timer = setTimeout(async () => {
      try {
        const result = await window.storage.set(
          STORAGE_KEY,
          JSON.stringify({
            totalDays,
            entries,
          }),
          false
        );

        setSaveState(result ? "saved" : "error");
      } catch {
        setSaveState("error");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [totalDays, entries, loaded]);

  // 언어 변경 저장
  useEffect(() => {
    if (!loaded) return;

    window.storage.set(LANG_KEY, lang, false).catch(() => {});
  }, [lang, loaded]);

  const used = useMemo(
    () =>
      entries.reduce(
        (sum, e) => sum + TYPE_VALUE[e.type],
        0
      ),
    [entries]
  );

  const remaining = totalDays - used;

  const ratio =
    totalDays > 0
      ? Math.min(used / totalDays, 1)
      : 0;

  // 연차 상태 3단계 (사용률 기준): 여유 <50% / 주의 50~80% / 빠듯함 >80%
  const tier =
    ratio < 0.5
      ? "relaxed"
      : ratio <= 0.8
      ? "caution"
      : "low";

  const sortedEntries = useMemo(
    () =>
      [...entries].sort((a, b) =>
        a.date < b.date ? 1 : -1
      ),
    [entries]
  );

  function openAddForm() {
    setEditingId(null);

    setForm({
      date: todayStr(),
      type: "full",
      memo: "",
    });

    setShowForm(true);
  }

  function openEditForm(entry) {
    setEditingId(entry.id);

    setForm({
      date: entry.date,
      type: entry.type,
      memo: entry.memo,
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  function submitForm(e) {
    e.preventDefault();

    if (!form.date) return;

    // 남은 연차 초과 방지
    const nextValue = TYPE_VALUE[form.type] || 0;
    const otherUsed = editingId
      ? entries
          .filter((en) => en.id !== editingId)
          .reduce((sum, en) => sum + TYPE_VALUE[en.type], 0)
      : used;

    if (otherUsed + nextValue > totalDays + 1e-9) {
      return;
    }

    if (editingId) {
      setEntries((prev) =>
        prev.map((en) =>
          en.id === editingId
            ? { ...en, ...form }
            : en
        )
      );
    } else {
      setEntries((prev) => [
        ...prev,
        {
          id: uid(),
          ...form,
        },
      ]);
    }

    closeForm();
  }

  function deleteEntry(id) {
    if (!window.confirm(t.confirmDelete)) {
      return;
    }

    setEntries((prev) =>
      prev.filter((en) => en.id !== id)
    );

    if (editingId === id) {
      closeForm();
    }
  }

  function openSettings() {
    setTotalDraft(String(totalDays));
    setShowSettings(true);
  }

  function commitTotal() {
    const n = parseFloat(totalDraft);

    if (!isNaN(n) && n >= 0) {
      setTotalDays(n);
    }

    setEditingTotal(false);
    setShowSettings(false);
  }

  function handleExport() {
    const data = {
      totalDays,
      entries,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `leave-data-${new Date().getFullYear()}.json`;

    a.click();

    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);

        if (
          typeof parsed.totalDays === "number" &&
          Array.isArray(parsed.entries)
        ) {
          setTotalDays(parsed.totalDays);

          setEntries(
            parsed.entries.map((en) => ({
              id: en.id || uid(),
              date: en.date,
              type:
                TYPE_VALUE[en.type] !== undefined
                  ? en.type
                  : "full",
              memo: en.memo || "",
            }))
          );
        }
      } catch {
        // 잘못된 파일은 조용히 무시
      }
    };

    reader.readAsText(file);

    e.target.value = "";
  }

  return (
    <div className="lt-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .lt-root {
          --bg: #0d1117;
          --bg-soft: #10151c;
          --card: #161b22;
          --card-hover: #1c2128;

          --border: #30363d;
          --border-soft: #21262d;

          --text: #e6edf3;
          --text-soft: #8b949e;
          --text-muted: #6e7681;

          --accent: #58a6ff;
          --accent-hover: #79b8ff;

          --green: #3fb950;
          --red: #f85149;

          min-height: 100vh;

          background: var(--bg);

          font-family:
            'Noto Sans KR',
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: var(--text);

          padding: 32px 20px 56px;

          display: flex;
          justify-content: center;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .lt-page {
          width: 100%;
          max-width: 480px;
        }

        /* --------------------------------
           Language
        -------------------------------- */

        .lt-lang-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 26px;
        }

        .lt-lang-btn {
          appearance: none;

          background: transparent;

          border: 1px solid var(--border);

          border-radius: 6px;

          color: var(--text-soft);

          font-family: inherit;

          font-size: 12px;

          padding: 6px 11px;

          cursor: pointer;

          transition:
            color .15s ease,
            background .15s ease,
            border-color .15s ease;
        }

        .lt-lang-btn:hover {
          color: var(--text);
          background: var(--card);
          border-color: #484f58;
        }

        .lt-lang-btn.active {
          color: var(--text);
          background: var(--card);
          border-color: var(--accent);
        }

        /* --------------------------------
           Header
        -------------------------------- */

        .lt-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .lt-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .lt-title {
          margin: 0;

          color: var(--text);

          font-size: 23px;
          font-weight: 700;

          letter-spacing: -0.035em;
          line-height: 1.4;
        }

        .lt-settings-btn {
          appearance: none;

          background: transparent;

          border: 1px solid var(--border);

          border-radius: 8px;

          color: var(--text-soft);

          cursor: pointer;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 32px;
          height: 32px;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-settings-btn:hover {
          color: var(--text);

          border-color: #484f58;

          background: var(--card);
        }

        .lt-sub {
          margin: 6px 0 0;

          color: var(--text-soft);

          font-size: 13px;

          line-height: 1.5;
        }

        .lt-save-status {
          height: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          margin-top: 9px;

          color: var(--text-muted);

          font-size: 11px;
        }

        .lt-save-status.error {
          color: var(--red);
        }

        .lt-spin {
          animation: lt-spin .8s linear infinite;
        }

        @keyframes lt-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* --------------------------------
           Remaining days
        -------------------------------- */

        .lt-stamp-wrap {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          margin: 8px 0 24px;
        }

        .lt-stamp {
          width: 178px;
          height: 178px;

          border-radius: 50%;

          border: 1px solid var(--border);

          background:
            radial-gradient(
              circle at center,
              #1b222c 0%,
              #161b22 68%,
              #13181f 100%
            );

          box-shadow:
            0 0 0 7px rgba(88, 166, 255, 0.035),
            0 14px 35px rgba(0, 0, 0, .28);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          position: relative;
        }

        .lt-stamp::before {
          content: "";

          position: absolute;

          inset: 9px;

          border-radius: 50%;

          border: 1px solid var(--border-soft);
        }

        .lt-stamp-num {
          position: relative;

          color: var(--text);

          font-size: 46px;

          font-weight: 700;

          line-height: 1;

          letter-spacing: -0.045em;
        }

        .lt-stamp-label {
          position: relative;

          color: var(--text-soft);

          font-size: 13px;

          margin-top: 8px;

          font-weight: 500;
        }

        /* --------------------------------
           Ring progress (circular)
        -------------------------------- */

        .lt-ring {
          position: relative;

          width: 200px;
          height: 200px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lt-ring .lt-stamp {
          position: relative;

          z-index: 1;

          box-shadow: none;
        }

        .lt-ring-svg {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          transform: rotate(-90deg);
        }

        .lt-ring-track,
        .lt-ring-fill {
          fill: none;

          stroke-width: 12;
        }

        .lt-ring-track {
          stroke: #3c454f;

          opacity: .9;
        }

        .lt-ring-fill {
          stroke: var(--green);

          stroke-linecap: round;

          filter: drop-shadow(0 0 4px rgba(63, 185, 80, .55));

          transition: stroke-dashoffset .4s ease, stroke .2s ease;
        }

        .lt-ring-caption {
          text-align: center;

          color: var(--text-soft);

          font-size: 11px;

          margin-top: 8px;
        }

        /* 3단계 색상: 여유(초록) / 주의(노랑) / 빠듯함(빨강) */
        .lt-tier-relaxed { color: var(--green); }
        .lt-tier-caution { color: #f0b429; }
        .lt-tier-low { color: var(--red); }

        .lt-ring-fill.lt-tier-caution {
          stroke: #f0b429;

          filter: drop-shadow(0 0 4px rgba(240, 180, 41, .55));
        }
        .lt-ring-fill.lt-tier-low {
          stroke: var(--red);

          filter: drop-shadow(0 0 4px rgba(248, 81, 73, .55));
        }

        /* 스탬프 배경/링: 단계색 그라데이션 */
        .lt-stamp.lt-tier-relaxed {
          background:
            radial-gradient(
              circle at center,
              rgba(63, 185, 80, 0.18) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(63, 185, 80, 0.08),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-caution {
          background:
            radial-gradient(
              circle at center,
              rgba(227, 179, 65, 0.20) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(227, 179, 65, 0.10),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-low {
          background:
            radial-gradient(
              circle at center,
              rgba(248, 81, 73, 0.20) 0%,
              #161b22 70%,
              #13181f 100%
            );
          box-shadow:
            0 0 0 7px rgba(248, 81, 73, 0.10),
            0 14px 35px rgba(0, 0, 0, .28);
        }

        .lt-stamp.lt-tier-relaxed .lt-stamp-num,
        .lt-stamp.lt-tier-caution .lt-stamp-num,
        .lt-stamp.lt-tier-low .lt-stamp-num {
          color: inherit;
        }

        /* --------------------------------
           Total
        -------------------------------- */

        .lt-total-row {
          display: flex;

          justify-content: center;
          align-items: center;

          gap: 7px;

          color: var(--text-muted);

          font-size: 12px;

          margin-bottom: 30px;
        }

        .lt-total-edit-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 3px;

          border: 0;

          background: transparent;

          color: var(--text-muted);

          cursor: pointer;

          border-radius: 4px;

          transition:
            color .15s ease,
            background .15s ease;
        }

        .lt-total-edit-btn:hover {
          color: var(--text);
          background: var(--card);
        }

        .lt-total-input {
          width: 58px;

          padding: 3px 4px;

          border: 0;

          border-bottom: 1px solid var(--accent);

          background: transparent;

          color: var(--text);

          font-family: inherit;

          font-size: 12px;

          text-align: center;
        }

        .lt-total-input:focus {
          outline: none;
        }

        /* --------------------------------
           History
        -------------------------------- */

        .lt-section-title {
          padding: 0 0 10px;

          border-bottom: 1px solid var(--border);

          color: var(--text-soft);

          font-size: 12px;

          font-weight: 600;

          letter-spacing: .01em;
        }

        .lt-entry {
          display: flex;

          justify-content: space-between;
          align-items: center;

          gap: 14px;

          min-height: 68px;

          padding: 13px 2px;

          border-bottom: 1px solid var(--border-soft);

          transition:
            background .15s ease;
        }

        .lt-entry:hover {
          background: rgba(255,255,255,.018);
        }

        .lt-entry-left {
          min-width: 0;

          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 4px 8px;
        }

        .lt-entry-date,
        .lt-entry-type,
        .lt-entry-memo {
          color: var(--text);

          font-size: 13px;

          font-weight: 500;

          line-height: 1.4;
        }

        .lt-entry-date {
          white-space: nowrap;
        }

        .lt-entry-type {
          color: var(--accent);
        }

        .lt-entry-memo {
          color: var(--text-soft);

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lt-entry-actions {
          display: flex;

          gap: 2px;

          flex-shrink: 0;
        }

        .lt-icon-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 30px;
          height: 30px;

          padding: 0;

          border: 0;

          border-radius: 6px;

          background: transparent;

          color: var(--text-muted);

          cursor: pointer;

          transition:
            color .15s ease,
            background .15s ease;
        }

        .lt-icon-btn:hover {
          color: var(--text);

          background: var(--card);
        }

        .lt-icon-btn:last-child:hover {
          color: var(--red);
        }

        .lt-entry-actions {
          display: flex;
          gap: 6px;
        }

        .lt-entry-btn {
          appearance: none;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          padding: 5px 9px;

          border: 1px solid var(--border-soft);

          border-radius: 6px;

          background: transparent;

          color: var(--text-soft);

          font-family: inherit;

          font-size: 11px;

          font-weight: 500;

          cursor: pointer;

          white-space: nowrap;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-entry-btn:hover {
          color: var(--text);

          border-color: #484f58;

          background: var(--card);
        }

        .lt-entry-btn.danger {
          color: var(--text-muted);
        }

        .lt-entry-btn.danger:hover {
          color: var(--red);

          border-color: rgba(248, 81, 73, .5);

          background: rgba(248, 81, 73, .08);
        }

        .lt-empty {
          padding: 30px 10px;

          color: var(--text-muted);

          font-size: 12px;

          text-align: center;
        }

        /* --------------------------------
           Add button
        -------------------------------- */

        .lt-add-btn {
          appearance: none;

          width: 100%;

          margin-top: 14px;

          padding: 12px 14px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border: 1px solid #1f6feb;

          border-radius: 8px;

          background: linear-gradient(180deg, #2f81f7, #1f6feb);

          color: #fff;

          font-family: inherit;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .12) inset,
            0 4px 12px rgba(31, 111, 235, .28);

          transition:
            background .15s ease,
            box-shadow .1s ease,
            transform .1s ease;
        }

        .lt-add-btn:hover {
          background: linear-gradient(180deg, #388bfd, #1f6feb);

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .12) inset,
            0 6px 16px rgba(31, 111, 235, .35);
        }

        .lt-add-btn:active {
          background: linear-gradient(180deg, #1f6feb, #1961c8);

          transform: translateY(1px);

          box-shadow:
            0 1px 0 rgba(255, 255, 255, .08) inset,
            0 2px 6px rgba(31, 111, 235, .25);
        }

        .lt-add-btn.disabled,
        .lt-add-btn:disabled {
          cursor: not-allowed;

          opacity: .5;

          border-color: var(--border-soft);

          background: var(--card);

          color: var(--text-muted);

          box-shadow: none;
        }

        .lt-add-btn.disabled:hover,
        .lt-add-btn:disabled:hover {
          color: var(--text-muted);

          border-color: var(--border-soft);

          background: var(--card);

          box-shadow: none;
        }

        /* --------------------------------
           Form
        -------------------------------- */

        .lt-form {
          margin-top: 14px;

          padding: 18px;

          border: 1px solid var(--border);

          border-radius: 9px;

          background: var(--card);

          box-shadow:
            0 12px 30px rgba(0, 0, 0, .18);
        }

        .lt-form-row {
          display: flex;

          flex-direction: column;

          gap: 6px;

          margin-bottom: 14px;
        }

        .lt-form-row label {
          color: var(--text-soft);

          font-size: 11px;

          font-weight: 500;
        }

        .lt-form-row input,
        .lt-form-row select {
          width: 100%;

          appearance: none;

          padding: 9px 10px;

          border: 1px solid var(--border);

          border-radius: 6px;

          background: var(--bg);

          color: var(--text);

          font-family: inherit;

          font-size: 13px;

          transition:
            border-color .15s ease,
            box-shadow .15s ease;
        }

        .lt-form-row input::placeholder {
          color: var(--text-muted);
        }

        .lt-form-row input:hover,
        .lt-form-row select:hover {
          border-color: #484f58;
        }

        .lt-form-row input:focus,
        .lt-form-row select:focus {
          outline: none;

          border-color: var(--accent);

          box-shadow:
            0 0 0 3px rgba(88, 166, 255, .12);
        }

        .lt-form-row input[type="date"] {
          color-scheme: dark;
        }

        /* --------------------------------
           Leave type
        -------------------------------- */

        .lt-type-group {
          display: flex;

          gap: 6px;
        }

        .lt-type-opt {
          flex: 1;

          padding: 9px 5px;

          border: 1px solid var(--border);

          border-radius: 6px;

          background: var(--bg);

          color: var(--text-soft);

          font-size: 12px;

          text-align: center;

          cursor: pointer;

          transition:
            color .15s ease,
            border-color .15s ease,
            background .15s ease;
        }

        .lt-type-opt:hover {
          color: var(--text);

          border-color: #484f58;
        }

        .lt-type-opt.active {
          border-color: var(--accent);

          background: rgba(88, 166, 255, .08);

          color: var(--accent);

          font-weight: 600;
        }

        /* --------------------------------
           Settings modal
        -------------------------------- */

        .lt-overlay {
          position: fixed;

          inset: 0;

          background: rgba(1, 4, 9, 0.7);

          display: flex;
          align-items: flex-end;
          justify-content: center;

          z-index: 50;

          padding: 0;
        }

        .lt-modal {
          width: 100%;
          max-width: 420px;
          max-height: 88vh;
          overflow-y: auto;

          background: var(--bg-soft);

          border: 1px solid var(--border);

          border-top-left-radius: 14px;
          border-top-right-radius: 14px;

          padding: 16px;
        }

        @media (min-width: 520px) {
          .lt-overlay {
            align-items: center;
            padding: 20px;
          }

          .lt-modal {
            border-radius: 14px;
          }
        }

        .lt-modal-title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 15px;
          font-weight: 600;

          margin-bottom: 14px;
        }

        /* --------------------------------
           Form buttons
        -------------------------------- */

        .lt-form-actions {
          display: flex;

          gap: 8px;

          margin-top: 4px;
        }

        .lt-btn {
          flex: 1;

          appearance: none;

          padding: 10px;

          border: 1px solid var(--accent);

          border-radius: 6px;

          background: var(--accent);

          color: #08111b;

          font-family: inherit;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          transition:
            background .15s ease,
            border-color .15s ease,
            transform .05s ease;
        }

        .lt-btn:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
        }

        .lt-btn:active {
          transform: translateY(1px);
        }

        .lt-btn.secondary {
          border-color: var(--border);

          background: transparent;

          color: var(--text-soft);
        }

        .lt-btn.secondary:hover {
          border-color: #484f58;

          background: var(--bg);

          color: var(--text);
        }

        /* --------------------------------
           Footer
        -------------------------------- */

        .lt-footer {
          display: flex;

          justify-content: center;

          gap: 18px;

          margin-top: 30px;

          padding-top: 16px;

          border-top: 1px solid var(--border-soft);
        }

        .lt-text-btn {
          appearance: none;

          display: inline-flex;

          align-items: center;

          gap: 6px;

          padding: 5px;

          border: 0;

          background: transparent;

          color: var(--text-muted);

          font-family: inherit;

          font-size: 11px;

          cursor: pointer;

          transition:
            color .15s ease;
        }

        .lt-text-btn:hover {
          color: var(--text);
        }

        /* --------------------------------
           Animation
        -------------------------------- */

        @media (prefers-reduced-motion: no-preference) {
          .lt-form {
            animation: lt-drop .16s ease-out;
          }
        }

        @keyframes lt-drop {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --------------------------------
           Mobile
        -------------------------------- */

        @media (max-width: 480px) {
          .lt-root {
            padding: 24px 16px 44px;
          }

          .lt-title {
            font-size: 21px;
          }

          .lt-stamp {
            width: 164px;
            height: 164px;
          }

          .lt-stamp-num {
            font-size: 42px;
          }

          .lt-form {
            padding: 16px;
          }

          .lt-form-row input,
          .lt-form-row select {
            font-size: 16px;
          }

          .lt-entry-left {
            gap: 4px 8px;
          }

          .lt-entry-memo {
            flex-basis: 100%;
            white-space: normal;
            word-break: break-word;
          }
        }
      `}</style>

      <div className="lt-page">

        {/* Language */}
        <div className="lt-lang-row">
          {Object.entries(LANGS)
            .sort(([a], [b]) => (b === lang) - (a === lang))
            .map(([key, meta]) => (
              <button
                key={key}
                className={`lt-lang-btn ${
                  lang === key ? "active" : ""
                }`}
                onClick={() => setLang(key)}
              >
                {lang === key ? "✓ " : ""}
                {meta.name}
              </button>
            ))}
        </div>

        {/* Header */}
        <div className="lt-header">
          <div className="lt-title-row">
            <p className="lt-title">
              {t.title}
            </p>

            <button
              className="lt-settings-btn"
              onClick={openSettings}
              aria-label={t.settings}
              title={t.settings}
            >
              <Settings size={17} />
            </button>
          </div>
        </div>

        {/* Remaining */}
        <div className="lt-stamp-wrap">
          <div className={`lt-ring lt-tier-${tier}`}>
            <svg
              className="lt-ring-svg"
              viewBox="0 0 200 200"
            >
              <circle
                className="lt-ring-track"
                cx="100"
                cy="100"
                r="90"
              />
              <circle
                className="lt-ring-fill"
                cx="100"
                cy="100"
                r="90"
                style={{
                  strokeDasharray: `${2 * Math.PI * 90}`,
                  strokeDashoffset: `${
                    2 * Math.PI * 90 * (1 - ratio)
                  }`,
                }}
              />
            </svg>

            <div className={`lt-stamp lt-tier-${tier}`}>
              <span className="lt-stamp-num">
                {remaining}
              </span>

              <span className="lt-stamp-label">
                {t.daysRemaining}
              </span>
            </div>
          </div>

          <div className="lt-ring-caption">
            {t.caption(used, totalDays)}
          </div>
        </div>

        {/* History */}
        <div className="lt-section-title">
          {t.history}
        </div>

        {sortedEntries.length === 0 && (
          <div className="lt-empty">
            {t.empty}
          </div>
        )}

        {sortedEntries.map((entry) => (
          <div
            className="lt-entry"
            key={entry.id}
          >
            <div className="lt-entry-left">
              <span className="lt-entry-date">
                {t.fmtDate(
                  entry.date,
                  t.weekdays
                )}
              </span>

              <span className="lt-entry-type">
                {t.typeLabels[
                  entry.type
                ]}
              </span>

              {entry.memo && (
                <span className="lt-entry-memo">
                  {entry.memo}
                </span>
              )}
            </div>

            <div className="lt-entry-actions">
              <button
                className="lt-entry-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditForm(entry);
                }}
                aria-label={t.editLabel}
              >
                <Pencil size={13} />
                {t.editLabel}
              </button>

              <button
                className="lt-entry-btn danger"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteEntry(entry.id);
                }}
                aria-label={t.deleteLabel}
              >
                <X size={13} />
                {t.deleteLabel}
              </button>
            </div>
          </div>
        ))}

        {/* Add */}
        {!showForm && (
          <button
            className={`lt-add-btn ${
              remaining <= 0 ? "disabled" : ""
            }`}
            onClick={remaining > 0 ? openAddForm : undefined}
            disabled={remaining <= 0}
          >
            <Pencil size={15} />

            {remaining > 0
              ? t.addEntry
              : t.noLeaveLeft}
          </button>
        )}

        {/* Footer */}
        <div className="lt-footer">
          <button
            className="lt-text-btn"
            onClick={handleExport}
          >
            <Download size={14} />
            {t.exportBtn}
          </button>

          <button
            className="lt-text-btn"
            onClick={handleImportClick}
          >
            <Upload size={14} />
            {t.importBtn}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={handleImportFile}
          />
        </div>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="lt-overlay"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="lt-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lt-modal-title">
              {t.settings}
              <button
                type="button"
                className="lt-icon-btn"
                onClick={() => setShowSettings(false)}
                aria-label={t.cancel}
              >
                <X size={16} />
              </button>
            </div>

            <div className="lt-form-row">
              <label>{t.totalDaysEditLabel}</label>
              <input
                type="number"
                step="0.5"
                value={totalDraft}
                onChange={(e) =>
                  setTotalDraft(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && commitTotal()
                }
                autoFocus
              />
            </div>

            <div className="lt-form-actions">
              <button
                type="button"
                className="lt-btn secondary"
                onClick={() => setShowSettings(false)}
              >
                {t.cancel}
              </button>

              <button
                type="button"
                className="lt-btn"
                onClick={commitTotal}
              >
                <Check size={14} />
                {t.saveSettings}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div
          className="lt-overlay"
          onClick={closeForm}
        >
          <form
            className="lt-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitForm}
          >
            <div className="lt-modal-title">
              {editingId ? t.saveEdit : t.addEntry}
              <button
                type="button"
                className="lt-icon-btn"
                onClick={closeForm}
                aria-label={t.cancel}
              >
                <X size={16} />
              </button>
            </div>

            <div className="lt-form-row">
              <label>{t.date}</label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    date: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="lt-form-row">
              <label>{t.type}</label>

              <div className="lt-type-group">
                {TYPE_KEYS.map((key) => (
                  <div
                    key={key}
                    className={`lt-type-opt ${
                      form.type === key
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        type: key,
                      }))
                    }
                  >
                    {t.typeLabels[key]}
                  </div>
                ))}
              </div>
            </div>

            <div className="lt-form-row">
              <label>{t.memo}</label>

              <input
                type="text"
                placeholder={
                  t.memoPlaceholder
                }
                value={form.memo}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    memo: e.target.value,
                  }))
                }
              />
            </div>

            <div className="lt-form-actions">
              <button
                type="button"
                className="lt-btn secondary"
                onClick={closeForm}
              >
                {t.cancel}
              </button>

              <button
                type="submit"
                className="lt-btn"
              >
                <Check size={14} />
                {editingId
                  ? t.saveEdit
                  : t.save}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
