import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Pencil,
  X,
  Download,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  List,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";

const STORAGE_KEY = "manhour-data";
const STORAGE_BACKUP_KEY = "manhour-data-backup";
const LANG_KEY = "manhour-lang";

const round2 = (n) => Math.round(n * 100) / 100;
const clampNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const toISO = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const todayStr = () => toISO(new Date());

const monthOf = (iso) => iso.slice(0, 7);
const yearOf = (ym) => Number(ym.slice(0, 4));
const monOf = (ym) => Number(ym.slice(5, 7));

function toMinute(hhmm) {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return 0;
  return h * 60 + m;
}

function addDaysStr(iso, diff) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + diff);
  return toISO(d);
}

// 지급 규칙 (지정 일당 기준, 평일 2단계):
//   토/일/공휴일 5시까지 → 1.0 (일당 전액)
//   평일 5시까지(연장 없음) → 0.88 (일당 × 0.88)
//   연장 근무(6시 등, 17시 이후 또는 연장시간 있음) → 1.0 (일당 전액)
//   부분근무(일찍 퇴근)는 사용자가 직접 공수 입력(manual)
const MH_WEEKEND = 1.0;
const MH_WEEKDAY = 0.88;
const END_NORMAL_MIN = 17 * 60; // 17:00

function isWeekend(iso) {
  const d = new Date(iso + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

function hasOvertime(rec) {
  return clampNum(rec.otHours) > 0 || toMinute(rec.end) > END_NORMAL_MIN;
}

function autoManhourOf(rec) {
  if (rec.kind !== "work") return 0;
  if (isWeekend(rec.date) || rec.holiday) return MH_WEEKEND;
  if (hasOvertime(rec)) return MH_WEEKEND;
  return MH_WEEKDAY;
}

function manhourOf(rec) {
  if (!rec || rec.kind !== "work") return 0;
  if (rec.mhMode === "manual") {
    return clampNum(rec.mhValue);
  }
  return autoManhourOf(rec);
}

function nextMonth(ym, diff) {
  const d = new Date(yearOf(ym), monOf(ym) - 1 + diff, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const defaultSettings = () => ({
  baseMode: "daily", // daily | hourly
  dailyWage: 250000,
  hourlyWage: 25000,
  stdHours: 8,
  otMult: 1.5,
  taxRate: 3.3,
});

const LANGS = {
  ko: {
    name: "한국어",
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월",
    ],
    title: "공수 관리",
    subtitle: "일당 · 근무시간 · 휴무를 한눈에",
    language: "언어",
    saving: "저장 중",
    saved: "자동 저장됨",
    saveError: "자동 저장 실패 · JSON으로 내보내 두세요",
    calendar: "달력",
    list: "목록",
    prevMonth: "이전 달",
    nextMonth: "다음 달",
    today: "오늘",
    settings: "설정",
    exportJson: "내보내기 (JSON)",
    importJson: "불러오기 (JSON)",
    exportCsv: "내보내기 (CSV)",
    addEntry: "공수 추가",
    registerManHour: "공수 등록",
    work: "출근",
    off: "휴무",
    paidOff: "유급 휴무",
    unpaidOff: "무급 휴무",
    daily: "일당",
    hourly: "시급",
    paid: "유급",
    unpaid: "무급",
    date: "날짜",
    memo: "메모 (선택)",
    memoPlaceholder: "시스템 발판 탑재",
    cancel: "취소",
    save: "추가",
    saveSettings: "설정 저장",
    saveEdit: "수정 저장",
    delete: "삭제",
    edit: "수정",
    emptyDay: "기록 없음",
    noRecords: "이 달의 기록이 없습니다. 날짜를 눌러 추가하세요.",
    normalAmount: "정상",
    otAmount: "연장",
    bonus: "수당",
    gross: "지급액",
    net: "실수령",
    taxNote: "공제 포함",
    summary: {
      workDays: "출근일",
      offDays: "휴무일",
      hours: "근무시간",
      paid: "지급액(세전)",
      net: "실수령",
    },
    daySummary: "이 날",
    statsEmpty: "이 달 기록 없음",
    settingsTitle: "급여 기준 설정",
    dataSection: "데이터 관리",
    baseModeLabel: "근무 형태",
    calcModeLabel: "계산 방식",
    dailyWageLabel: "기본 일당 (원)",
    hourlyWageLabel: "기본 시급 (원)",
    stdHoursLabel: "근무시간 (시간/일)",
    otMultLabel: "연장·야간 배수",
    taxRateLabel: "공제율 (%)",
    showNetLabel: "요약 실수령 표시",
    workdaysLegend: "5시",
    offLegend: "휴무",
    otLegend: "1공수(연장·토·일)",
    start: "출근",
    end: "퇴근",
    break: "휴게(분)",
    otHours: "연장 시간",
    otExt: "연장",
    otDirect: "직접 입력",
    otAutoHint: "연장 근무",
    bonusLabel: "수당(원)",
    rateDaily: "당일 일당 (원)",
    rateHourly: "당일 시급 (원)",
    paidValue: "유급 금액 (원)",
    hoursLabel: "근무시간",
    previewGross: "지급액",
    previewNet: "실수령",
    perDay: "원",
    emptyListNote: "아직 기록이 없습니다.",
    loadErr: "불러온 파일이 올바르지 않습니다.",

    mh: "공수",
    mhAuto: "자동 (5시 기준)",
    mhManual: "직접 입력",
    mhHint: "평일 0.88 · 연장·토·일 1.0 · 5시 전 퇴근 직접 입력",
    mhManualHint: "부분근무/조퇴 시 공수를 직접 입력 (예: 0.5)",
    mhHolidayWork: "공휴일(빨간날) 근무",
    mhHolidayWorkHint: "공휴일에 근무한 날 → 평일도 1.0공수",
    mhValueLabel: "공수",
    mhUnit: "공수",
    summaryMh: "공수",
    mhOffShort: "휴",
  },
  en: {
    name: "English",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    title: "ManHour Tracker",
    subtitle: "Daily wage · work hours · days off at a glance",
    language: "Language",
    saving: "Saving",
    saved: "Saved automatically",
    saveError: "Auto-save failed · export a JSON backup",
    calendar: "Calendar",
    list: "List",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    today: "Today",
    settings: "Settings",
    exportJson: "Export (JSON)",
    importJson: "Import (JSON)",
    exportCsv: "Export (CSV)",
    addEntry: "Add man-day",
    registerManHour: "Register man-days",
    work: "Work",
    off: "Day off",
    paidOff: "Paid day off",
    unpaidOff: "Unpaid day off",
    daily: "Daily",
    hourly: "Hourly",
    paid: "Paid",
    unpaid: "Unpaid",
    date: "Date",
    memo: "Memo (optional)",
    memoPlaceholder: "Install system scaffold",
    cancel: "Cancel",
    save: "Add",
    saveSettings: "Save settings",
    saveEdit: "Save changes",
    delete: "Delete",
    edit: "Edit",
    emptyDay: "No record",
    noRecords: "No records this month. Tap a day to add.",
    normalAmount: "Normal",
    otAmount: "Overtime",
    bonus: "Bonus",
    gross: "Gross",
    net: "Net",
    taxNote: "after tax",
    summary: {
      workDays: "Work days",
      offDays: "Days off",
      hours: "Hours",
      paid: "Gross",
      net: "Net",
    },
    daySummary: "This day",
    statsEmpty: "No records this month",
    settingsTitle: "Pay basis settings",
    dataSection: "Data management",
    baseModeLabel: "Work type",
    calcModeLabel: "Calculation method",
    dailyWageLabel: "Default daily wage (KRW)",
    hourlyWageLabel: "Default hourly wage (KRW)",
    stdHoursLabel: "Standard hours (h/day)",
    otMultLabel: "Overtime multiplier",
    taxRateLabel: "Tax rate (%)",
    showNetLabel: "Show net in summary",
    workdaysLegend: "5PM",
    offLegend: "Day off",
    otLegend: "1 man-day (OT/Sat/Sun)",
    start: "Start",
    end: "End",
    break: "Break (min)",
    otHours: "Overtime",
    otExt: "Overtime",
    otDirect: "Manual",
    otAutoHint: "Overtime work",
    bonusLabel: "Bonus (KRW)",
    rateDaily: "This day daily wage (KRW)",
    rateHourly: "This day hourly wage (KRW)",
    paidValue: "Paid amount (KRW)",
    hoursLabel: "Work hours",
    previewGross: "Gross",
    previewNet: "Net",
    perDay: "won",
    emptyListNote: "No records yet.",
    loadErr: "The imported file is invalid.",

    mh: "Man-days",
    mhAuto: "Auto (till 5PM)",
    mhManual: "Manual entry",
    mhHint: "Weekday 0.88 · OT/Sat/Sun 1.0 · leave before 5PM: enter",
    mhManualHint: "For partial days, enter the man-days directly (e.g. 0.5)",
    mhHolidayWork: "Worked on a holiday",
    mhHolidayWorkHint: "Working on a public holiday → counts 1.0 even on a weekday",
    mhValueLabel: "Man-days",
    mhUnit: "md",
    summaryMh: "Man-days",
    mhOffShort: "Off",
  },
  uz: {
    name: "O'zbekcha",
    weekdays: ["Yak", "Du", "Se", "Cho", "Pa", "Ju", "Sha"],
    months: [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
    ],
    title: "Ish kuni hisobi",
    subtitle: "Kunlik maosh · ish vaqti · dam olish kuni",
    language: "Til",
    saving: "Saqlanmoqda",
    saved: "Avtomatik saqlandi",
    saveError: "Avtomatik saqlash amalga oshmadi · JSON zaxira nusxasini yuklab oling",
    calendar: "Taqvim",
    list: "Ro'yxat",
    prevMonth: "Oldingi oy",
    nextMonth: "Keyingi oy",
    today: "Bugun",
    settings: "Sozlamalar",
    exportJson: "Eksport (JSON)",
    importJson: "Import (JSON)",
    exportCsv: "Eksport (CSV)",
    addEntry: "Ish kunini qo'shish",
    registerManHour: "Ish kunini ro'yxatga olish",
    work: "Ish",
    off: "Dam olish",
    paidOff: "Pullik ta'til",
    unpaidOff: "Pulliksiz ta'til",
    daily: "Kunlik",
    hourly: "Soatlik",
    paid: "Pullik",
    unpaid: "Pulliksiz",
    date: "Sana",
    memo: "Izoh (ixtiyoriy)",
    memoPlaceholder: "Masalan: qurilish ishlari",
    cancel: "Bekor qilish",
    save: "Qo'shish",
    saveSettings: "Sozlamalarni saqlash",
    saveEdit: "O'zgarishlarni saqlash",
    delete: "O'chirish",
    edit: "Tahrirlash",
    emptyDay: "Yozuv yo'q",
    noRecords: "Bu oyda yozuv yo'q. Kunni bosib qo'shing.",
    normalAmount: "Oddiy",
    otAmount: "Qo'shimcha ish",
    bonus: "Bonus",
    gross: "Yalpi",
    net: "Sof",
    taxNote: "soliq hisobga olingan",
    summary: {
      workDays: "Ish kunlari",
      offDays: "Dam olish kunlari",
      hours: "Soatlar",
      paid: "Yalpi (soliqsiz)",
      net: "Sof",
    },
    daySummary: "Shu kun",
    statsEmpty: "Bu oyda yozuv yo'q",
    settingsTitle: "Maosh sozlamalari",
    dataSection: "Ma'lumotlar boshqaruvi",
    baseModeLabel: "Ish turi",
    calcModeLabel: "Hisoblash usuli",
    dailyWageLabel: "Asosiy kunlik maosh (KRW)",
    hourlyWageLabel: "Asosiy soatlik maosh (KRW)",
    stdHoursLabel: "Ish vaqti (soat/kun)",
    otMultLabel: "Qo'shimcha ish koeffitsienti",
    taxRateLabel: "Soliq stavkasi (%)",
    showNetLabel: "Xulosada sof summani ko'rsatish",
    workdaysLegend: "17:00 gacha",
    offLegend: "Dam olish",
    otLegend: "1 ish kuni (OT/Shan/Yak)",
    start: "Boshlash",
    end: "Tugash",
    break: "Tanaffus (daq)",
    otHours: "Qo'shimcha soat",
    otExt: "Qo'shimcha ish",
    otDirect: "Qo'lda kiritish",
    otAutoHint: "Qo'shimcha ish",
    bonusLabel: "Bonus (KRW)",
    rateDaily: "Kunlik maosh (KRW)",
    rateHourly: "Soatlik maosh (KRW)",
    paidValue: "Pullik ta'til summasi (KRW)",
    hoursLabel: "Ish vaqti",
    previewGross: "To'lov",
    previewNet: "Sof to'lov",
    perDay: "won",
    emptyListNote: "Hozircha yozuvlar yo'q.",
    loadErr: "Yuklangan fayl noto'g'ri.",
    mh: "Ish kuni",
    mhAuto: "Avtomatik (17:00 gacha)",
    mhManual: "Qo'lda kiritish",
    mhHint: "Ish kuni 0.88 · OT/Shan/Yak 1.0 · 17:00 dan oldin ketsa qo'lda kiriting",
    mhManualHint: "To'liq bo'lmagan kun uchun ish kunini qo'lda kiriting (mas. 0.5)",
    mhHolidayWork: "Bayram kuni ishlagan",
    mhHolidayWorkHint: "Bayram kuni ishlash → ish kunida ham 1.0 hisoblanadi",
    mhValueLabel: "Ish kuni",
    mhUnit: "kishi",
    summaryMh: "Ish kuni",
    mhOffShort: "Dam",
  },
};

function monthTitle(lang, ym) {
  if (lang === "ko") return `${yearOf(ym)}년 ${monOf(ym)}월`;
  const mon = LANGS[lang].months[monOf(ym) - 1];
  return `${mon} ${yearOf(ym)}`;
}

// ---------- 계산 ----------

function workHoursOf(rec, st) {
  if (rec.kind !== "work") return 0;
  if (rec.mode === "daily" && !rec.start && !rec.end) {
    return clampNum(st.stdHours);
  }
  const startMin = toMinute(rec.start);
  const endMin = toMinute(rec.end);
  let span = endMin - startMin;
  if (span < 0) span += 24 * 60; // 익일 새벽
  const worked = Math.max(0, span - clampNum(rec.breakMin));
  return round2(worked / 60);
}

function unitRate(rec, st) {
  const mode = rec.mode || st.baseMode;
  return mode === "daily"
    ? clampNum(rec.dailyRate ?? st.dailyWage)
    : clampNum(rec.hourlyRate ?? st.hourlyWage);
}

// 기록 하나 계산 → { normal, ot, bonus, gross, net, hours }
function computeEntry(rec, st) {
  if (rec.kind === "off") {
    const gross = rec.paid ? clampNum(rec.paidValue ?? st.dailyWage) : 0;
    return {
      normal: gross,
      ot: 0,
      bonus: 0,
      gross,
      net: round2(gross * (1 - clampNum(st.taxRate) / 100)),
      hours: 0,
      mode: rec.paid ? "offPaid" : "offUnpaid",
    };
  }

  const mode = rec.mode || st.baseMode;
  const rate = unitRate(rec, st);
  const hours = workHoursOf(rec, st);
  const otHours = clampNum(rec.otHours);
  const otMult = clampNum(st.otMult) || 1;

  let normal;
  let ot;
  if (mode === "daily") {
    // 지정 일당 × 공수신용
    //   평일 5시(연장 없음) 0.88 / 연장·6시 이후·토·일·공휴일 1.0 / 부분근무는 manual 공수
    const credit = manhourOf(rec);
    normal = round2(rate * credit);
    ot = 0;
  } else {
    normal = round2(hours * rate);
    ot = round2(otHours * rate * otMult);
  }

  const gross = round2(normal + ot);
  const net = round2(gross * (1 - clampNum(st.taxRate) / 100));
  return {
    normal,
    ot,
    bonus: 0,
    gross,
    net,
    hours: round2(hours + otHours),
    mode: "work",
  };
}

const fmtMoney = (n) => Math.round(n).toLocaleString("ko-KR");
// 숫자 문자열에 천 단위 콤마를 붙여 표시 (입력용)
const groupNum = (v) => {
  const s = String(v ?? "").replace(/[^\d]/g, "");
  return s ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
};
const ungroupNum = (s) => String(s ?? "").replace(/[^\d]/g, "");
const fmtMh = (n) => {
  const v = Math.round(clampNum(n) * 100) / 100;
  return v.toFixed(2);
};
const fmtHours = (h) => {
  const v = Math.round(h * 100) / 100;
  return String(v);
};

// ---------- 데이터 ----------

function seedRecords() {
  const today = new Date();
  const ym = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const d1 = addDaysStr(toISO(today), -1);
  const d2 = addDaysStr(toISO(today), -2);
  return [
    {
      id: uid(),
      date: d1,
      kind: "work",
      mode: "daily",
      dailyRate: 250000,
      hourlyRate: null,
      start: "08:00",
      end: "17:00",
      breakMin: 60,
      otHours: 1.5,
      memo: "",
      mhMode: "auto",
      mhValue: 0,
      holiday: false,
    },
    {
      id: uid(),
      date: d2,
      kind: "off",
      paid: true,
      paidValue: 250000,
      memo: "",
    },
  ].filter((r) => monthOf(r.date) === ym);
}

export default function ManHourTracker() {
  const [lang, setLang] = useState("ko");
  const t = LANGS[lang];

  const [settings, setSettings] = useState(defaultSettings);
  const [records, setRecords] = useState(seedRecords);

  const [ym, setYm] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [view, setView] = useState("calendar"); // calendar | list

  const [netVisible, setNetVisible] = useState(false); // 실수령 금액 표시 (기본 숨김)

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);

  const [showSettings, setShowSettings] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState(defaultSettings());
  const [langDraft, setLangDraft] = useState("ko");

  const jsonInputRef = useRef(null);

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
          if (parsed?.settings) {
            setSettings({ ...defaultSettings(), ...parsed.settings });
          }
          if (Array.isArray(parsed.records)) {
            setRecords(parsed.records);
          }
        }
      } catch {
        // 저장된 데이터 없음 또는 손상
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
        // 언어 설정 없음
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
          JSON.stringify({ settings, records }),
          false
        );
        setSaveState(result ? "saved" : "error");
      } catch {
        setSaveState("error");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [settings, records, loaded]);

  // 언어 저장
  useEffect(() => {
    if (!loaded) return;
    window.storage.set(LANG_KEY, lang, false).catch(() => {});
  }, [lang, loaded]);

  const monthRecords = useMemo(
    () =>
      records
        .filter((r) => monthOf(r.date) === ym)
        .sort((a, b) => (a.date < b.date ? -1 : 1)),
    [records, ym]
  );

  const recordByDate = useMemo(() => {
    const map = {};
    for (const r of records) map[r.date] = r;
    return map;
  }, [records]);

  // 월 요약
  const monthStats = useMemo(() => {
    const stats = {
      workDays: 0,
      offPaid: 0,
      offUnpaid: 0,
      hours: 0,
      mh: 0,
      gross: 0,
      net: 0,
    };
    for (const r of monthRecords) {
      const c = computeEntry(r, settings);
      if (r.kind === "work") {
        stats.workDays += 1;
        stats.hours += c.hours;
        stats.mh += manhourOf(r);
      } else if (r.paid) {
        stats.offPaid += 1;
      } else {
        stats.offUnpaid += 1;
      }
      stats.gross += c.gross;
      stats.net += c.net;
    }
    stats.hours = round2(stats.hours);
    stats.mh = round2(stats.mh);
    return stats;
  }, [monthRecords, settings]);

  const today = todayStr();

  // 캘린더 셀 구성
  const cells = useMemo(() => {
    const year = yearOf(ym);
    const monthIdx = monOf(ym) - 1;
    const first = new Date(year, monthIdx, 1).getDay();
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const list = [];

    // 이전 달 끝부분 (시작 빈칸 채우기, 입력 불가)
    const prevYear = monthIdx === 0 ? year - 1 : year;
    const prevMonth = monthIdx === 0 ? 11 : monthIdx - 1;
    const prevDays = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (let i = 0; i < first; i++) {
      const d = prevDays - first + 1 + i;
      const iso = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(
        d
      ).padStart(2, "0")}`;
      list.push({
        iso,
        d,
        dow: new Date(prevYear, prevMonth, d).getDay(),
        inMonth: false,
        rec: recordByDate[iso] || null,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${ym}-${String(d).padStart(2, "0")}`;
      const dow = new Date(year, monthIdx, d).getDay();
      list.push({
        iso,
        d,
        dow,
        inMonth: true,
        rec: recordByDate[iso] || null,
      });
    }

    // 다음 달 시작부분 (끝 빈칸 채우기, 입력 불가)
    const nextYear = monthIdx === 11 ? year + 1 : year;
    const nextMonth = monthIdx === 11 ? 0 : monthIdx + 1;
    let nextDay = 1;
    while (list.length % 7 !== 0) {
      const iso = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(
        nextDay
      ).padStart(2, "0")}`;
      list.push({
        iso,
        d: nextDay,
        dow: new Date(nextYear, nextMonth, nextDay).getDay(),
        inMonth: false,
        rec: recordByDate[iso] || null,
      });
      nextDay += 1;
    }
    return list;
  }, [ym, recordByDate]);

  function openAddForm(date) {
    setEditingId(null);
    setForm({
      date: date || todayStr(),
      kind: "work",
      mode: settings.baseMode,
      dailyRate: settings.dailyWage,
      hourlyRate: settings.hourlyWage,
      start: "08:00",
      end: "17:00",
      breakMin: 60,
      otHours: 0,
      otType: "",
      bonus: 0,
      paid: false,
      paidValue: settings.dailyWage,
      mhMode: "auto",
      mhValue: 0,
      holiday: false,
      memo: "",
    });
    setShowForm(true);
  }

  function openEditForm(rec) {
    setEditingId(rec.id);
    setForm({
      date: rec.date,
      kind: rec.kind,
      mode: rec.mode || settings.baseMode,
      dailyRate: rec.dailyRate ?? settings.dailyWage,
      hourlyRate: rec.hourlyRate ?? settings.hourlyWage,
      start: rec.start || "08:00",
      end: rec.end || "17:00",
      breakMin: rec.breakMin ?? 60,
      otHours: rec.otHours ?? 0,
      otType: rec.otType || "",
      bonus: rec.bonus ?? 0,
      paid: rec.paid ?? true,
      paidValue: rec.paidValue ?? settings.dailyWage,
      mhMode: rec.mhMode || "auto",
      mhValue: rec.mhValue ?? 0,
      holiday: rec.holiday ?? false,
      memo: rec.memo || "",
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(null);
  }

  function submitForm(e) {
    e.preventDefault();
    if (!form?.date) return;

    const base = { ...form, date: form.date, memo: form.memo || "" };

    if (form.kind === "off") {
      delete base.start;
      delete base.end;
      delete base.breakMin;
      delete base.otHours;
      delete base.otType;
      delete base.bonus;
      delete base.dailyRate;
      delete base.hourlyRate;
      delete base.mode;
      delete base.mhMode;
      delete base.mhValue;
      delete base.holiday;
    } else {
      delete base.paid;
      delete base.paidValue;
      base.otType = clampNum(base.otHours) > 0 ? "ext" : "";
      base.otHours = clampNum(base.otHours);
      base.bonus = clampNum(base.bonus);
      base.breakMin = clampNum(base.breakMin);
      base.mhMode = form.mhMode === "manual" ? "manual" : "auto";
      base.mhValue = clampNum(base.mhValue);
      base.holiday = !!base.holiday;
      if (base.mode === "daily") {
        base.dailyRate = clampNum(base.dailyRate) || settings.dailyWage;
        base.hourlyRate = null;
      } else {
        base.hourlyRate = clampNum(base.hourlyRate) || settings.hourlyWage;
        base.dailyRate = null;
      }
    }

    if (editingId) {
      setRecords((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...base } : r))
      );
    } else {
      setRecords((prev) => [...prev, { id: uid(), ...base }]);
    }

    setYm(monthOf(base.date));
    closeForm();
  }

  function deleteRecord(id) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    closeForm();
  }

  // 달력 셀 클릭
  function onCellClick(cell) {
    if (!cell || cell.inMonth === false) return; // 인접 달(비활성)은 입력 불가
    if (cell?.rec) {
      openEditForm(cell.rec);
    } else if (cell) {
      openAddForm(cell.iso);
    }
  }

  function openSettings() {
    setSettingsDraft({ ...settings });
    setLangDraft(lang);
    setShowSettings(true);
  }

  function commitSettings(e) {
    e.preventDefault();
    setSettings({
      ...settingsDraft,
      baseMode: settingsDraft.baseMode,
      dailyWage: clampNum(settingsDraft.dailyWage),
      hourlyWage: clampNum(settingsDraft.hourlyWage),
      stdHours: clampNum(settingsDraft.stdHours) || 8,
      otMult: clampNum(settingsDraft.otMult) || 1,
      taxRate: clampNum(settingsDraft.taxRate),
    });
    if (LANGS[langDraft]) {
      setLang(langDraft);
    }
    setShowSettings(false);
  }

  function handleExportJson() {
    const blob = new Blob([JSON.stringify({ settings, records }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manhour-${ym}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSettings(false);
  }

  function handleImportClick() {
    jsonInputRef.current?.click();
  }

  function handleImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed?.settings) {
          setSettings({ ...defaultSettings(), ...parsed.settings });
        }
        if (Array.isArray(parsed.records)) {
          setRecords(
            parsed.records.map((r) => ({
              id: r.id || uid(),
              date: r.date,
              kind: r.kind === "off" ? "off" : "work",
              mode: r.mode || settings.baseMode,
              dailyRate: r.dailyRate ?? null,
              hourlyRate: r.hourlyRate ?? null,
              start: r.start || "",
              end: r.end || "",
              breakMin: r.breakMin ?? 60,
              otHours: r.otHours ?? 0,
              otType: r.otType || "",
              bonus: r.bonus ?? 0,
              paid: r.paid ?? true,
              paidValue: r.paidValue ?? null,
              mhMode: r.mhMode === "manual" ? "manual" : "auto",
              mhValue: r.mhValue ?? 0,
              holiday: !!r.holiday,
              memo: r.memo || "",
            }))
          );
        }
      } catch {
        // 잘못된 파일 무시
      }
      setShowSettings(false);
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleExportCsv() {
    const header = ["date", "kind", "mode", "manhour", "hours", "normal", "ot", "gross", "net", "memo"];
    const rows = [...records]
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((r) => {
        const c = computeEntry(r, settings);
        const kind =
          r.kind === "work"
            ? "work"
            : r.paid
            ? "off_paid"
            : "off_unpaid";
        return [
          r.date,
          kind,
          r.kind === "work" ? r.mode : "-",
          r.kind === "work" ? fmtMh(manhourOf(r)) : "0",
          String(c.hours),
          String(Math.round(c.normal)),
          String(Math.round(c.ot)),
          String(Math.round(c.gross)),
          String(Math.round(c.net)),
          `"${(r.memo || "").replace(/"/g, '""')}"`,
        ].join(",");
      });

    const csv = "\uFEFF" + [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manhour.csv";
    a.click();
    URL.revokeObjectURL(url);
    setShowSettings(false);
  }

  const formPreview = form
    ? computeEntry(
        {
          ...form,
          ...(form.kind === "off"
            ? { kind: "off", paid: form.paid, paidValue: form.paidValue }
            : { kind: "work" }),
        },
        settings
      )
    : null;

  return (
    <div className="mh-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .mh-root {
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
          --orange: #f7812f;
          --yellow: #d29922;
          --red: #f85149;

          min-height: 100vh;
          background: var(--bg);
          font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--text);
          padding: 32px 16px 64px;
          display: flex;
          justify-content: center;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .mh-page { width: 100%; max-width: 560px; }

        /* ---------- 공통 ---------- */

        .mh-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 18px;
        }

        .mh-pill {
          appearance: none;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-soft);
          font-family: inherit;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
          transition: color .15s ease, background .15s ease, border-color .15s ease;
        }

        .mh-pill:hover { color: var(--text); background: var(--card); border-color: #484f58; }

        .mh-pill.active { color: var(--text); background: var(--card); border-color: var(--accent); }

        .mh-icon-btn {
          appearance: none;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          color: var(--text-soft);
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 8px;
          font-size: 12px;
          transition: color .15s ease, background .15s ease;
        }

        .mh-icon-btn:hover { color: var(--text); background: var(--card); border-color: var(--border-soft); }

        .mh-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .mh-title { font-size: 22px; font-weight: 700; margin: 0; }

        .mh-header-settings {
          appearance: none;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-soft);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transition: color .15s ease, border-color .15s ease, background .15s ease;
        }

        .mh-header-settings:hover { color: var(--text); border-color: var(--accent); }

        .mh-view-tabs {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        /* ---------- 월 네비게이션 ---------- */

        .mh-month-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 6px;
        }

        .mh-month-title {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          flex: 1;
        }

        /* ---------- 요약 카드 ---------- */

        .mh-summary-grid {
          display: grid;
          grid-template-columns: 0.65fr 0.65fr 1fr 1fr 1.7fr;
          gap: 6px;
          margin-bottom: 18px;
        }

        .mh-summary-tap {
          cursor: pointer;
          user-select: none;
          transition: background .15s ease, border-color .15s ease;
        }

        .mh-summary-tap:active { background: var(--card-hover); }

        .mh-summary-card {
          background: var(--card);
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          padding: 10px 6px;
          text-align: center;
          min-width: 0;
        }

        .mh-summary-label {
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 4px;
          white-space: nowrap;
        }

        .mh-summary-value {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          white-space: nowrap;
        }

        .mh-summary-value.small { font-size: 12px; }

        .mh-summary-value.accent { color: var(--accent); }

        .mh-net-hidden {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          min-height: 16px;
        }

        /* ---------- 캘린더 ---------- */

        .mh-cal-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 4px;
          background: var(--card);
          border: 1px solid var(--border-soft);
          border-radius: 10px;
          padding: 8px;
        }

        .mh-cal-dow {
          text-align: center;
          font-size: 10px;
          color: var(--text-muted);
          padding: 2px 0 6px;
        }

        .mh-cal-dow.sat { color: var(--accent); }
        .mh-cal-dow.sun { color: var(--red); }

        .mh-cal-cell {
          position: relative;
          min-height: 56px;
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 6px;
          padding: 4px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-align: center;
          transition: border-color .15s ease, background .15s ease;
        }

        .mh-cal-cell:hover { border-color: #484f58; }

        .mh-cal-cell.blank { background: transparent; border-color: transparent; cursor: default; }

        .mh-cal-cell.today { box-shadow: inset 0 0 0 2px var(--accent); }

        /* 유형별 색: 5시(0.88)=초록, 1공수(연장·토·일 1.0)=주황, 휴무=회색 */
        .mh-cal-cell.mh-cal-work {
          border-color: var(--green);
          background: rgba(63, 185, 80, 0.10);
        }
        .mh-cal-cell.mh-cal-ot {
          border-color: var(--orange);
          background: rgba(247, 129, 47, 0.12);
        }
        .mh-cal-cell.mh-cal-off {
          border-color: var(--text-muted);
          background: rgba(139, 148, 158, 0.06);
        }

        .mh-cal-work .mh-cal-mh { color: var(--green); font-weight: 700; }
        .mh-cal-ot .mh-cal-mh { color: var(--orange); font-weight: 700; }
        .mh-cal-off .mh-k-paidoff,
        .mh-cal-off .mh-k-unpaidoff { color: var(--text-muted); }

        .mh-cal-cell.mh-cal-ghost,
        .mh-cal-cell.mh-cal-ghost.mh-cal-work,
        .mh-cal-cell.mh-cal-ghost.mh-cal-ot,
        .mh-cal-cell.mh-cal-ghost.mh-cal-off {
          background: transparent;
          border: 1px dashed var(--text-muted);
          cursor: default;
          opacity: 0.55;
        }

        .mh-cal-cell.mh-cal-ghost:hover,
        .mh-cal-cell.mh-cal-ghost.mh-cal-work:hover,
        .mh-cal-cell.mh-cal-ghost.mh-cal-ot:hover,
        .mh-cal-cell.mh-cal-ghost.mh-cal-off:hover {
          border-color: var(--text-muted);
        }

        .mh-cal-cell.mh-cal-ghost .mh-cal-mh,
        .mh-cal-cell.mh-cal-ghost .mh-k-paidoff,
        .mh-cal-cell.mh-cal-ghost .mh-k-unpaidoff {
          color: var(--text-muted);
        }

        .mh-cal-cell.today { box-shadow: inset 0 0 0 2px var(--accent); }

        .mh-cal-date {
          font-size: 11px;
          color: var(--text-soft);
        }

        .mh-cal-date.sat { color: var(--accent); }
        .mh-cal-date.sun { color: var(--red); }

        .mh-cal-meta {
          margin-top: auto;
          font-size: 10px;
          line-height: 1.25;
          overflow: hidden;
        }

        .mh-cal-kinds {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          font-weight: 600;
        }

        .mh-k-work { color: var(--green); }
        .mh-k-paidoff { color: var(--yellow); }
        .mh-k-unpaidoff { color: var(--text-muted); }

        .mh-cal-cell .mh-k-paidoff,
        .mh-cal-cell .mh-k-unpaidoff {
          font-size: 9px;
          font-weight: 400;
        }

        .mh-cal-mh { color: var(--accent); font-size: 10px; font-weight: 600; }

        .mh-legend {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 12px;
          font-size: 11px;
          color: var(--text-soft);
        }

        .mh-legend span { display: inline-flex; align-items: center; gap: 5px; }

        .mh-legend i {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          display: inline-block;
        }

        /* ---------- 목록 ---------- */

        .mh-list { display: flex; flex-direction: column; gap: 6px; }

        .mh-list-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--card);
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          padding: 10px 12px;
          cursor: pointer;
          transition: border-color .15s ease;
        }

        .mh-list-row:hover { border-color: #484f58; }

        .mh-list-date {
          width: 96px;
          font-size: 12px;
          font-weight: 600;
        }

        .mh-list-sub { font-size: 10px; color: var(--text-muted); }

        .mh-list-main { flex: 1; min-width: 0; }

        .mh-list-kinds { font-size: 11px; font-weight: 600; }

        .mh-list-memo {
          font-size: 10px;
          color: var(--text-soft);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mh-list-money {
          text-align: right;
          font-size: 12px;
          font-weight: 600;
        }

        .mh-list-actions { display: flex; gap: 2px; }

        .mh-empty {
          text-align: center;
          color: var(--text-muted);
          font-size: 12px;
          padding: 32px 0;
        }

        /* ---------- 모달 ---------- */

        .mh-overlay {
          position: fixed;
          inset: 0;
          background: rgba(1, 4, 9, 0.7);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 50;
          padding: 0;
        }

        .mh-modal {
          width: 100%;
          max-width: 480px;
          max-height: 88vh;
          overflow-y: auto;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          padding: 18px 20px 22px;
        }

        @media (min-width: 520px) {
          .mh-overlay { align-items: center; padding: 20px; }
          .mh-modal { border-radius: 14px; }
        }

        .mh-modal-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .mh-modal-section {
          margin: 18px 0 10px;
          padding-top: 14px;
          border-top: 1px solid var(--border-soft);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-soft);
        }

        .mh-field { margin-bottom: 12px; }

        .mh-field label {
          display: block;
          font-size: 11px;
          color: var(--text-soft);
          margin-bottom: 5px;
        }

        .mh-field label .mh-req { color: var(--red); }

        .mh-input, .mh-select {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
          padding: 8px 10px;
          outline: none;
          transition: border-color .15s ease;
        }

        .mh-input:focus, .mh-select:focus { border-color: var(--accent); }

        .mh-input-row {
          display: flex;
          gap: 10px;
          margin: 0 2px;
        }

        .mh-input-row .mh-field {
          flex: 1 1 0;
          min-width: 0;
        }

        .mh-input-row .mh-input {
          min-width: 0;
          font-size: 13px;
          padding: 8px 6px;
          text-align: center;
        }

        .mh-time-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin: 0;
          width: 100%;
        }

        .mh-time-row .mh-field {
          min-width: 0;
          width: 100%;
        }

        .mh-time-row .mh-input {
          display: block;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          font-size: 13px;
          padding: 0;
          height: 38px;
          line-height: 38px;
          text-align: center;
          vertical-align: middle;
          overflow: hidden;
          appearance: none;
          -webkit-appearance: none;
        }

        .mh-holiday-toggle {
          width: 100%;
          padding: 10px 12px;
          font-size: 13px;
          text-align: left;
          margin: 2px 0 12px;
        }

        .mh-ot-row {
          display: flex;
          gap: 8px;
          align-items: stretch;
        }

        .mh-ot-row .mh-ot-auto {
          flex: 1 1 0;
          min-width: 0;
          appearance: none;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-soft);
          font-family: inherit;
          font-size: 13px;
          padding: 0 10px;
          cursor: pointer;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background .15s ease, color .15s ease;
        }

        .mh-ot-row .mh-ot-auto.active {
          background: #1f6feb;
          color: #fff;
          font-weight: 700;
        }

        .mh-ot-row .mh-ot-auto:not(.active):hover {
          background: var(--card);
          color: var(--text);
        }

        .mh-ot-row .mh-field {
          flex: 1 1 0;
          min-width: 0;
          margin-bottom: 0;
        }

        .mh-seg {
          display: flex;
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
        }

        .mh-seg button {
          flex: 1;
          appearance: none;
          background: transparent;
          border: none;
          color: var(--text-soft);
          font-family: inherit;
          font-size: 13px;
          padding: 9px 0;
          cursor: pointer;
          font-weight: 500;
          transition: background .15s ease, color .15s ease;
        }

        .mh-seg button.active {
          background: #1f6feb;
          color: #fff;
          font-weight: 700;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
        }

        .mh-seg button:not(.active):hover {
          background: var(--card);
          color: var(--text);
        }

        .mh-form-hint {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: -6px;
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mh-preview {
          background: var(--card);
          border: 1px solid var(--border-soft);
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .mh-preview strong { font-weight: 600; }

        .mh-preview .net { color: var(--accent); }

        .mh-form-actions {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }

        .mh-form-actions-gap {
          margin-top: 22px;
        }

        .mh-money-input {
          font-variant-numeric: tabular-nums;
          text-align: right;
        }

        .mh-btn {
          appearance: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--card);
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 12px;
          cursor: pointer;
          flex: 1;
          transition: background .15s ease, border-color .15s ease;
        }

        .mh-btn:hover { background: var(--card-hover); border-color: #484f58; }

        .mh-btn.primary { border-color: var(--accent); color: #fff; background: #1f6feb; }
        .mh-btn.primary:hover { background: #388bfd; }

        .mh-btn.danger { color: var(--red); border-color: #f8514955; }
        .mh-btn.ghost { background: transparent; color: var(--text-soft); }
        .mh-btn.small { flex: 0; padding: 6px 10px; font-size: 12px; }

        .mh-edit-icon-btn {
          appearance: none;
          background: transparent;
          border: none;
          color: var(--text-soft);
          cursor: pointer;
          padding: 4px;
        }

        .mh-edit-icon-btn:hover { color: var(--text); }

        .mh-close-btn {
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
          transition: color .15s ease, border-color .15s ease, background .15s ease;
        }

        .mh-close-btn:hover {
          color: var(--text);
          border-color: #484f58;
          background: var(--card);
        }
      `}</style>

      <div className="mh-page">
        {/* Header + Settings */}
        <div className="mh-header">
          <p className="mh-title">{t.title}</p>
          <button
            className="mh-header-settings"
            onClick={openSettings}
            title={t.settings}
            aria-label={t.settings}
          >
            <Settings size={16} />
          </button>
        </div>

        {/* View tabs */}
        <div className="mh-view-tabs">
          <button
            className={`mh-pill ${view === "calendar" ? "active" : ""}`}
            onClick={() => setView("calendar")}
          >
            <CalendarDays size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            {t.calendar}
          </button>
          <button
            className={`mh-pill ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <List size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            {t.list}
          </button>
        </div>

        {/* Month nav */}
        <div className="mh-month-nav">
          <button className="mh-icon-btn" onClick={() => setYm(nextMonth(ym, -1))} title={t.prevMonth}>
            <ChevronLeft size={18} />
          </button>
          <span className="mh-month-title">
            {monthTitle(lang, ym)}
          </span>
          <button className="mh-icon-btn" onClick={() => setYm(nextMonth(ym, 1))} title={t.nextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
        {/* Summary */}
        <div className="mh-summary-grid">
          <div className="mh-summary-card">
            <div className="mh-summary-label">{t.summary.workDays}</div>
            <div className="mh-summary-value">{monthStats.workDays}</div>
          </div>
          <div className="mh-summary-card">
            <div className="mh-summary-label">{t.summary.offDays}</div>
            <div className="mh-summary-value small">
              {monthStats.offPaid + monthStats.offUnpaid > 0
                ? `${monthStats.offPaid + monthStats.offUnpaid}`
                : "-"}
            </div>
          </div>
          <div className="mh-summary-card">
            <div className="mh-summary-label">{t.summaryMh}</div>
            <div className="mh-summary-value accent">{fmtMh(monthStats.mh)}</div>
          </div>
          <div className="mh-summary-card">
            <div className="mh-summary-label">{t.summary.hours}</div>
            <div className="mh-summary-value small">{fmtHours(monthStats.hours)}h</div>
          </div>
          <div
            className="mh-summary-card mh-summary-tap"
            onClick={() => setNetVisible((v) => !v)}
            title={t.showNetLabel}
          >
            <div className="mh-summary-label">{t.summary.net}</div>
            <div className="mh-summary-value accent small mh-net-value">
              {netVisible ? (
                fmtMoney(monthStats.net)
              ) : (
                <span className="mh-net-hidden">
                  <EyeOff size={14} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 본문 */}
        {view === "calendar" ? (
          <>
            <div className="mh-cal-grid">
              {t.weekdays.map((wd, i) => (
                <div
                  key={wd}
                  className={`mh-cal-dow ${i === 0 ? "sun" : i === 6 ? "sat" : ""}`}
                >
                  {wd}
                </div>
              ))}

              {cells.map((cell, idx) => (
                <div
                  key={cell.iso || idx}
                  className={`mh-cal-cell ${
                    cell.inMonth === false ? "mh-cal-ghost" : ""
                  } ${
                    cell.rec
                      ? cell.rec.kind === "work"
                        ? manhourOf(cell.rec) >= 1
                          ? "mh-cal-ot"
                          : "mh-cal-work"
                        : "mh-cal-off"
                      : ""
                  } ${cell.iso === today ? "today" : ""}`}
                  onClick={() => onCellClick(cell)}
                >
                  <span
                    className={`mh-cal-date ${
                      cell.dow === 0 ? "sun" : cell.dow === 6 ? "sat" : ""
                    }`}
                  >
                    {cell.d}
                  </span>

                  {cell.rec && cell.inMonth !== false && (
                    <span className="mh-cal-kinds">
                      {cell.rec.kind === "work" ? (
                        <span className="mh-cal-mh">
                          {fmtMh(manhourOf(cell.rec))}
                        </span>
                      ) : (
                        <span
                          className={
                            cell.rec.paid
                              ? "mh-k-paidoff"
                              : "mh-k-unpaidoff"
                          }
                        >
                          {t.mhOffShort}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mh-legend">
              <span><i style={{ background: "var(--green)" }} /> {t.workdaysLegend}</span>
              <span><i style={{ background: "var(--text-muted)" }} /> {t.offLegend}</span>
              <span><i style={{ background: "var(--orange)" }} /> {t.otLegend}</span>
            </div>
          </>
        ) : (
          <div className="mh-list">
            {monthRecords.length === 0 && (
              <div className="mh-empty">{t.noRecords}</div>
            )}

            {monthRecords.map((rec) => {
              const c = computeEntry(rec, settings);
              const dd = new Date(rec.date + "T00:00:00");
              return (
                <div key={rec.id} className="mh-list-row" onClick={() => openEditForm(rec)}>
                  <div className="mh-list-date">
                    <div>{rec.date.slice(5, 7)}/{rec.date.slice(8, 10)}</div>
                    <div className="mh-list-sub">{t.weekdays[dd.getDay()]}</div>
                  </div>

                  <div className="mh-list-main">
                    <div className="mh-list-kinds">
                      {rec.kind === "work" ? (
                        <span className="mh-k-work">
                          {t[rec.mode]}
                          {clampNum(rec.otHours) > 0
                            ? ` · ${rec.otHours}h+`
                            : ""}
                        </span>
                      ) : (
                        <span
                          className={
                            rec.paid
                              ? "mh-k-paidoff"
                              : "mh-k-unpaidoff"
                          }
                        >
                          {t.mhOffShort}
                        </span>
                      )}
                      {rec.memo && (
                        <div className="mh-list-memo">{rec.memo}</div>
                      )}
                    </div>
                  </div>

                  <div className="mh-list-money">
                    <div>{fmtMoney(c.gross)}</div>
                    <div className="mh-list-sub">
                      {rec.kind === "work"
                        ? `${fmtMh(manhourOf(rec))} · ${fmtHours(c.hours)}h`
                        : ""}
                    </div>
                  </div>

                  <div className="mh-list-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="mh-edit-icon-btn" onClick={() => openEditForm(rec)}>
                      <Pencil size={13} />
                    </button>
                    <button
                      className="mh-edit-icon-btn"
                      style={{ color: "var(--red)" }}
                      onClick={() => {
                        if (window.confirm(t.delete)) {
                          deleteRecord(rec.id);
                        }
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              className="mh-btn primary"
              style={{ marginTop: 8 }}
              onClick={() =>
                openAddForm(
                  monthOf(todayStr()) === ym ? todayStr() : ym + "-01"
                )
              }
            >
              <Plus size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
              {t.addEntry}
            </button>
          </div>
        )}
      </div>

      {/* ---------- 기록 추가/수정 모달 ---------- */}
      {showForm && form && (
        <div className="mh-overlay" onClick={closeForm}>
          <form
            className="mh-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitForm}
          >
            <div className="mh-modal-title">
              {editingId ? t.saveEdit : t.registerManHour}
              <button type="button" className="mh-edit-icon-btn" onClick={closeForm}>
                <X size={16} />
              </button>
            </div>

            {/* 종류 */}
            <div className="mh-field">
              <label>{t.date} <span className="mh-req">*</span></label>
              <input
                className="mh-input"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className="mh-field">
              <label>{t.work} / {t.off}</label>
              <div className="mh-seg">
                <button
                  type="button"
                  className={form.kind === "work" ? "active" : ""}
                  onClick={() => setForm({ ...form, kind: "work" })}
                >
                  {t.work}
                </button>
                <button
                  type="button"
                  className={form.kind === "off" ? "active" : ""}
                  onClick={() =>
                    setForm({
                      ...form,
                      kind: "off",
                      paid: form.kind === "off" ? form.paid : false,
                    })
                  }
                >
                  {t.off}
                </button>
              </div>
            </div>

            {form.kind === "off" ? (
              <>
                <div className="mh-field">
                  <label>{t.paid ? t.paid : t.unpaid}</label>
                  <div className="mh-seg">
                    <button
                      type="button"
                      className={form.paid ? "active" : ""}
                      onClick={() => setForm({ ...form, paid: true })}
                    >
                      {t.paidOff}
                    </button>
                    <button
                      type="button"
                      className={!form.paid ? "active" : ""}
                      onClick={() => setForm({ ...form, paid: false })}
                    >
                      {t.unpaidOff}
                    </button>
                  </div>
                </div>

                {form.paid && (
                  <div className="mh-field">
                    <label>{t.paidValue}</label>
                    <input
                      className="mh-input"
                      type="number"
                      min="0"
                      step="1000"
                      value={form.paidValue ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, paidValue: e.target.value })
                      }
                    />
                  </div>
                )}

                <div className="mh-field">
                  <label>{t.memo}</label>
                  <input
                    className="mh-input"
                    value={form.memo}
                    placeholder={t.memoPlaceholder}
                    onChange={(e) => setForm({ ...form, memo: e.target.value })}
                  />
                </div>

                <div className="mh-preview">
                  <span>{t.previewNet}</span>
                  <strong className="net">
                    {fmtMoney(formPreview?.net ?? 0)} {t.perDay}
                  </strong>
                </div>
              </>
            ) : (
              <>
                {/* 공수 */}
                <div className="mh-field">
                  <label>{t.mh}</label>
                  <div className="mh-seg">
                    <button
                      type="button"
                      className={form.mhMode !== "manual" ? "active" : ""}
                      onClick={() => setForm({ ...form, mhMode: "auto" })}
                    >
                      {t.mhAuto}
                    </button>
                    <button
                      type="button"
                      className={form.mhMode === "manual" ? "active" : ""}
                      onClick={() => setForm({ ...form, mhMode: "manual" })}
                    >
                      {t.mhManual}
                    </button>
                  </div>
                </div>

                {form.mhMode === "manual" ? (
                  <>
                    <div className="mh-field">
                      <label>{t.mhValueLabel}</label>
                      <input
                        className="mh-input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.mhValue ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, mhValue: e.target.value })
                        }
                      />
                    </div>
                    <div className="mh-form-hint">{t.mhManualHint}</div>
                  </>
                ) : (
                  <>
                    <div className="mh-form-hint">
                      {t.mhHint} ·{" "}
                      <b>
                        {fmtMh(
                          autoManhourOf({
                            kind: "work",
                            date: form.date,
                            end: form.end,
                            otHours: form.otHours,
                          })
                        )}
                      </b>
                    </div>
                  </>
                )}

                {/* 연장 시간 (자동 1시간 + 직접 입력) */}
                <div className="mh-field" style={{ marginTop: 14 }}>
                  <label>{t.otHours}</label>
                  <div className="mh-ot-row">
                    <button
                      type="button"
                      className={`mh-ot-auto ${
                        clampNum(form.otHours) > 0 ? "active" : ""
                      }`}
                      onClick={() =>
                        setForm((prev) =>
                          clampNum(prev.otHours) > 0
                            ? { ...prev, otHours: 0, otType: "" }
                            : { ...prev, otHours: 1, otType: "ext" }
                        )
                      }
                    >
                      {clampNum(form.otHours) > 0 ? "✓ " : ""}
                      {t.otAutoHint}
                    </button>

                    <div className="mh-field">
                      <input
                        className="mh-input"
                        type="number"
                        min="0"
                        step="0.5"
                        value={form.otHours ?? 0}
                        onChange={(e) => {
                          const v = e.target.value;
                          setForm({
                            ...form,
                            otHours: v,
                            otType: clampNum(v) > 0 ? "ext" : "",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 지급 방식 */}
                <div className="mh-field">
                  <label>{t.calcModeLabel}</label>
                  <div className="mh-seg">
                    <button
                      type="button"
                      className={form.mode === "daily" ? "active" : ""}
                      onClick={() => setForm({ ...form, mode: "daily" })}
                    >
                      {t.daily}
                    </button>
                    <button
                      type="button"
                      className={form.mode === "hourly" ? "active" : ""}
                      onClick={() => setForm({ ...form, mode: "hourly" })}
                    >
                      {t.hourly}
                    </button>
                  </div>
                </div>

                {/* 시간 */}
                <div className="mh-input-row mh-time-row">
                  <div className="mh-field">
                    <label>{t.start}</label>
                    <input
                      className="mh-input"
                      type="time"
                      value={form.start}
                      onChange={(e) => setForm({ ...form, start: e.target.value })}
                    />
                  </div>
                  <div className="mh-field">
                    <label>{t.end}</label>
                    <input
                      className="mh-input"
                      type="time"
                      value={form.end}
                      onChange={(e) => setForm({ ...form, end: e.target.value })}
                    />
                  </div>
                  <div className="mh-field">
                    <label>{t.break}</label>
                    <input
                      className="mh-input"
                      type="number"
                      min="0"
                      step="10"
                      value={form.breakMin ?? 60}
                      onChange={(e) => setForm({ ...form, breakMin: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mh-field">
                  <label>{t.memo}</label>
                  <input
                    className="mh-input"
                    value={form.memo}
                    placeholder={t.memoPlaceholder}
                    onChange={(e) => setForm({ ...form, memo: e.target.value })}
                  />
                </div>

                <div className="mh-preview">
                  <span>
                    {t.previewGross}: {fmtMoney(formPreview?.gross ?? 0)}
                    <br />
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                      {t.mh}:{" "}
                      {fmtMh(
                        manhourOf({
                          ...form,
                          kind: "work",
                          date: form.date,
                          holiday: form.holiday,
                          mhMode: form.mhMode,
                          mhValue: form.mhValue,
                        })
                      )}
                      {form.mode === "hourly"
                        ? ` · ${t.normalAmount} ${fmtMoney(
                            formPreview?.normal ?? 0
                          )} · ${t.otAmount} ${fmtMoney(
                            formPreview?.ot ?? 0
                          )}`
                        : ""}
                    </span>
                  </span>
                  <strong className="net">
                    {fmtMoney(formPreview?.net ?? 0)} {t.perDay}
                  </strong>
                </div>
              </>
            )}

            <div className="mh-form-actions">
              {editingId && (
                <button
                  type="button"
                  className="mh-btn danger"
                  onClick={() => {
                    if (window.confirm(t.delete)) {
                      deleteRecord(editingId);
                    }
                  }}
                >
                  {t.delete}
                </button>
              )}

              <button type="button" className="mh-btn ghost" onClick={closeForm}>
                {t.cancel}
              </button>

              <button type="submit" className="mh-btn primary">
                <Check size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
                {editingId ? t.saveEdit : t.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------- 설정 모달 ---------- */}
      {showSettings && (
        <div className="mh-overlay" onClick={() => setShowSettings(false)}>
          <form
            className="mh-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={commitSettings}
          >
            <div className="mh-modal-title">
              {t.settingsTitle}
              <button
                type="button"
                className="mh-close-btn"
                onClick={() => setShowSettings(false)}
                aria-label={t.cancel}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mh-field">
              <label>{t.language}</label>
              <div className="mh-seg">
                {Object.keys(LANGS).map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={langDraft === code ? "active" : ""}
                    onClick={() => setLangDraft(code)}
                  >
                    {LANGS[code].name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mh-field">
              <label>{t.baseModeLabel}</label>
              <div className="mh-seg">
                <button
                  type="button"
                  className={settingsDraft.baseMode === "daily" ? "active" : ""}
                  onClick={() => setSettingsDraft({ ...settingsDraft, baseMode: "daily" })}
                >
                  {t.daily}
                </button>
                <button
                  type="button"
                  className={settingsDraft.baseMode === "hourly" ? "active" : ""}
                  onClick={() => setSettingsDraft({ ...settingsDraft, baseMode: "hourly" })}
                >
                  {t.hourly}
                </button>
              </div>
            </div>

            <div className="mh-input-row">
              <div className="mh-field">
                <label>{t.dailyWageLabel}</label>
                <input
                  className="mh-input mh-money-input"
                  type="text"
                  inputMode="numeric"
                  value={groupNum(settingsDraft.dailyWage)}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      dailyWage: ungroupNum(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mh-field">
                <label>{t.hourlyWageLabel}</label>
                <input
                  className="mh-input mh-money-input"
                  type="text"
                  inputMode="numeric"
                  value={groupNum(settingsDraft.hourlyWage)}
                  onChange={(e) =>
                    setSettingsDraft({
                      ...settingsDraft,
                      hourlyWage: ungroupNum(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="mh-input-row">
              <div className="mh-field">
                <label>{t.stdHoursLabel}</label>
                <input
                  className="mh-input"
                  type="number"
                  min="1"
                  max="24"
                  step="0.5"
                  value={settingsDraft.stdHours}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, stdHours: e.target.value })
                  }
                />
              </div>
              <div className="mh-field">
                <label>{t.otMultLabel}</label>
                <input
                  className="mh-input"
                  type="number"
                  min="1"
                  step="0.1"
                  value={settingsDraft.otMult}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, otMult: e.target.value })
                  }
                />
              </div>
              <div className="mh-field">
                <label>{t.taxRateLabel}</label>
                <input
                  className="mh-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={settingsDraft.taxRate}
                  onChange={(e) =>
                    setSettingsDraft({ ...settingsDraft, taxRate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mh-modal-section">{t.dataSection}</div>

            <div className="mh-form-actions" style={{ marginBottom: 0 }}>
              <button
                type="button"
                className="mh-btn"
                onClick={handleExportJson}
              >
                <Download size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
                {t.exportJson}
              </button>
              <button type="button" className="mh-btn" onClick={handleImportClick}>
                <Upload size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
                {t.importJson}
              </button>
              <button type="button" className="mh-btn" onClick={handleExportCsv}>
                <Download size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
                {t.exportCsv}
              </button>
              <input
                ref={jsonInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: "none" }}
                onChange={handleImportFile}
              />
            </div>

            <div className="mh-form-actions mh-form-actions-gap">
              <button type="button" className="mh-btn ghost" onClick={() => setShowSettings(false)}>
                {t.cancel}
              </button>
              <button type="submit" className="mh-btn primary">
                <Check size={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
                {t.saveSettings}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
