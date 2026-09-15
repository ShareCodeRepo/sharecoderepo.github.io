// UI에서 쓰는 고정 문자열의 다국어 사전.
// 실제 메뉴명(음식 이름)은 여기 두지 않고, 크롤링 결과에 별도 번역을 붙여서 처리한다.
export const LOCALES = ["ko", "en", "uz"];

export const strings = {
  ko: {
    appTitle: "2026 웰리브 식단표",
    breakfast: "조식",
    lunch: "중식",
    dinner: "석식",
    loading: "불러오는 중...",
    error: "식단 정보를 가져오지 못했어요.",
    retry: "다시 시도",
    noData: "등록된 메뉴가 없어요.",
    today: "오늘",
    updatedAt: "업데이트",
    refresh: "새로고침",
    themeLight: "라이트 모드로 전환",
    themeDark: "다크 모드로 전환",
  },
  en: {
    appTitle: "2026 Welliv Menu",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    loading: "Loading...",
    error: "Couldn't load the menu.",
    retry: "Retry",
    noData: "No menu registered.",
    today: "Today",
    updatedAt: "Updated",
    refresh: "Refresh",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
  },
  uz: {
    appTitle: "2026 Welliv menyu",
    breakfast: "Nonushta",
    lunch: "Tushlik",
    dinner: "Kechki ovqat",
    loading: "Yuklanmoqda...",
    error: "Menyuni yuklab bo'lmadi.",
    retry: "Qayta urinish",
    noData: "Menyu topilmadi.",
    today: "Bugun",
    updatedAt: "Yangilangan",
    refresh: "Yangilash",
    themeLight: "Yorug' rejimga o'tish",
    themeDark: "Tungi rejimga o'tish",
  },
};

export function t(locale, key) {
  return strings[locale]?.[key] ?? strings.ko[key] ?? key;
}
