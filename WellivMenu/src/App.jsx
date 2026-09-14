import { useEffect, useState } from "react";
import MealTabs from "./components/MealTabs.jsx";
import { LOCALES, t } from "./i18n/strings.js";
import "./App.css";

// 크롤링 API (Cloudflare Worker) — 정적 호스팅에서는 같은 오리진에 API가 없으므로 절대주소 사용
const MENU_API =
  "https://welliv-menu-app.excellwork.workers.dev/api/menu";

export default function App() {
  const [locale, setLocale] = useState("ko");
  const [days, setDays] = useState(null); // 3일치 [{date, meals}]
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [updatedAt, setUpdatedAt] = useState(null);

  async function load() {
    setStatus("loading");
    try {
      const res = await fetch(MENU_API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDays(data.days ?? []);
      setUpdatedAt(data.updatedAt ?? null);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const activeDay = days?.[activeDayIdx];

  return (
    <div className="app">
      <header className="app__header">
        <h1>{t(locale, "appTitle")}</h1>
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
      </header>

      {status === "loading" && <p className="app__status">{t(locale, "loading")}</p>}

      {status === "error" && (
        <div className="app__status">
          <p>{t(locale, "error")}</p>
          <button onClick={load}>{t(locale, "retry")}</button>
        </div>
      )}

      {status === "ready" && days && days.length > 0 && (
        <>
          <div className="app__days" role="tablist">
            {days.map((day, idx) => (
              <button
                key={day.date}
                role="tab"
                aria-selected={activeDayIdx === idx}
                className={`app__day-btn${activeDayIdx === idx ? " is-active" : ""}`}
                onClick={() => setActiveDayIdx(idx)}
              >
                {day.date}
              </button>
            ))}
          </div>

          <MealTabs locale={locale} day={activeDay} />

          {updatedAt && (
            <p className="app__updated">
              {t(locale, "updatedAt")}: {new Date(updatedAt).toLocaleString(locale)}
            </p>
          )}
        </>
      )}
    </div>
  );
}
