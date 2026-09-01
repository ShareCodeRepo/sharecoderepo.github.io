import { useCallback, useEffect, useRef, useState } from "react";
import "./app.css";
import TemperatureChart from "./TemperatureChart";

// 실제 Cloudflare Worker 주소로 변경
const WEATHER_API =
  "https://summer-snowflake-ccd3.excellwork.workers.dev/";

// 휴식 안내 적용 시간대
const REST_10M_WINDOWS = [
  { start: 9 * 60 + 30, end: 10 * 60 + 20 }, // 09:30 ~ 10:20
  { start: 14 * 60 + 30, end: 15 * 60 + 20 }, // 14:30 ~ 15:20
];

// 온도 기반 안내 적용 시간대 (11:40 ~ 14:00)
const REST_TEMP_START_MIN = 11 * 60 + 40; // 11:40
const REST_TEMP_END_MIN = 14 * 60; // 14:00

function isInWindow(minutes, start, end) {
  return minutes >= start && minutes < end;
}

function get10mRest(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();

  return REST_10M_WINDOWS.some(
    (w) => isInWindow(minutes, w.start, w.end)
  );
}

function isTempRestTime(now = new Date()) {
  const minutes = now.getHours() * 60 + now.getMinutes();

  return isInWindow(minutes, REST_TEMP_START_MIN, REST_TEMP_END_MIN);
}

function getRestGuide(temperature) {
  const temp = Number(temperature);

  if (!Number.isFinite(temp)) {
    return null;
  }

  const now = new Date();

  // 10분 연장 휴식 시간대 (09:30~10:20, 14:30~15:20) — 28.5℃ 이상일 때
  if (get10mRest(now) && temp >= 28.5) {
    return {
      level: "mid",
      title: "10분 연장 휴식",
    };
  }

  // 온도 기반 안내 시간대 (11:40~14:00)
  if (!isTempRestTime(now)) {
    return null;
  }

  if (temp >= 31.5) {
    return {
      level: "high",
      title: "1시간 추가 휴식",
    };
  }

  if (temp >= 28.5) {
    return {
      level: "mid",
      title: "30분 추가 휴식",
    };
  }

  return {
    level: "ok",
    title: "정상 근무",
  };
}

// 관측 시각과 현재 시각의 차이(분) 계산
function getMinutesAgo(latest) {
  if (!latest || !latest.date || !latest.time) {
    return null;
  }

  const obs = new Date(`${latest.date}T${latest.time}:00`);

  if (Number.isNaN(obs.getTime())) {
    return null;
  }

  const diffMs = Date.now() - obs.getTime();
  const minutes = Math.max(0, Math.round(diffMs / 60000));

  return minutes;
}

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState(null);

  // 이전 요청을 취소하기 위한 참조 (경쟁 상태 방지)
  const abortRef = useRef(null);

  const loadWeather = useCallback(async () => {
    // 이전에 진행 중이던 요청이 있으면 취소
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setError("");

      const response = await fetch(WEATHER_API, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // 응답 구조: { latest: {...}, history: [...] }
      setWeather(data);
      setLastChecked(new Date());

    } catch (err) {
      if (err.name === "AbortError") {
        return; // 취소된 요청은 에러로 취급하지 않음
      }
      console.error(err);
      setError(err.message || "데이터를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 최초 접속 즉시 조회
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // 1분마다 갱신
  useEffect(() => {
    const timer = setInterval(() => {
      loadWeather();
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [loadWeather]);

  const latest = weather?.latest;
  const history = weather?.history ?? [];

  return (
    <div className="app">
      <div className="weather-card">

        <header className="header">
          <div>
            <h1>
              현재 온도
              <span className="header-en">(Current Temperature)</span>
            </h1>
            <div className="station">
              한화오션 야드
            </div>
          </div>

          <button
            className="refresh-button"
            onClick={loadWeather}
            disabled={loading}
            aria-label="새로고침"
          >
            ↻
          </button>
        </header>

        {loading && !latest && (
          <div className="loading">
            데이터를 가져오는 중...
          </div>
        )}

        {error && (
          <div className="error">
            <div>데이터 조회 실패</div>
            <small>{error}</small>
          </div>
        )}

        {latest && (
          <>
            <section className="observation">
              <div className="observation-label">
                관측시간
              </div>

              <div className="date-time">
                <span className="date">{latest.date}</span>
                <span className="time">{latest.time}</span>
              </div>

              {getMinutesAgo(latest) !== null && (
                <div className="age">
                  {getMinutesAgo(latest)}분 전 관측
                </div>
              )}
            </section>

            <section className="weather-values">

              <div className="weather-item">
                <div className="item-header">
                  <div className="item-icon" aria-hidden="true">
                    🌡
                  </div>

                  <div className="label">
                    기온
                  </div>
                </div>

                <div className="label-en">
                  Temperature
                </div>

                <div className="temperature">
                  {latest.temperature}
                  <span>℃</span>
                </div>
              </div>

              <div className="weather-item weather-item--secondary">
                <div className="item-header">
                  <div className="item-icon" aria-hidden="true">
                    🥵
                  </div>

                  <div className="label">
                    체감온도
                  </div>
                </div>

                <div className="label-en">
                  Feels Like
                </div>

                <div className="feels-like">
                  {latest.feels_like}
                  <span>℃</span>
                </div>
              </div>

              <div className="weather-item">
                <div className="item-header">
                  <div className="item-icon" aria-hidden="true">
                    💧
                  </div>

                  <div className="label">
                    습도
                  </div>
                </div>

                <div className="label-en">
                  Humidity
                </div>

                <div className="humidity">
                  {latest.humidity}
                  <span>%</span>
                </div>
              </div>

              <div className="weather-item weather-item--secondary">
                <div className="item-header">
                  <div className="item-icon" aria-hidden="true">
                    💨
                  </div>

                  <div className="label">
                    풍속
                  </div>
                </div>

                <div className="label-en">
                  Wind Speed
                </div>

                <div className="wind-speed">
                  {latest.wind_speed}
                  <span>m/s</span>
                </div>
              </div>

            </section>

            {history.length > 0 && (
              <TemperatureChart history={history} />
            )}

            {(() => {
              const restGuide = getRestGuide(latest.temperature);

              return restGuide && (
                <div className={`rest-guide rest-guide--${restGuide.level}`}>
                  <div className="rest-guide-icon" aria-hidden="true">
                    ⏱
                  </div>
                  <div className="rest-guide-title">
                    {restGuide.title}
                  </div>
                </div>
              );
            })()}

            <footer className="footer">

              <div>
                1분마다 자동 갱신
              </div>

              {lastChecked && (
                <div>
                  마지막 조회&nbsp;
                  {lastChecked.toLocaleTimeString(
                    "ko-KR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )}
                </div>
              )}

            </footer>
          </>
        )}

      </div>
    </div>
  );
}

export default App;