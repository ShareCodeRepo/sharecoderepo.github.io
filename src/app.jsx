import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./app.css";

// 실제 Cloudflare Worker 주소로 변경
const WEATHER_API =
  "https://summer-snowflake-ccd3.excellwork.workers.dev/";

// 요청 타임아웃 (ms)
const REQUEST_TIMEOUT = 10000;

function getRestGuide(temperature) {
  const temp = Number(temperature);

  if (!Number.isFinite(temp)) {
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

// 응답 필드 검증 (Worker 파싱이 깨져도 undefined가 화면에 찍히지 않도록)
function isValidWeather(data) {
  if (!data || typeof data !== "object") {
    return false;
  }

  const temperature = Number(data.temperature);
  const humidity = Number(data.humidity);

  return (
    Number.isFinite(temperature) &&
    Number.isFinite(humidity) &&
    typeof data.date === "string" &&
    typeof data.time === "string"
  );
}

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState(null);

  const abortRef = useRef(null);

  const loadWeather = useCallback(async () => {
    // 이전 요청 취소 (경쟁 상태 방지)
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT
    );

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

      if (!isValidWeather(data)) {
        throw new Error("기상 데이터 형식이 올바르지 않습니다.");
      }

      setWeather(data);
      setLastChecked(new Date());

    } catch (err) {
      if (err.name === "AbortError") {
        // 타임아웃 또는 이전 요청 취소로 인한 중단
        return;
      }
      console.error(err);
      setError(err.message || "데이터를 가져오지 못했습니다.");
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  // 최초 접속 즉시 조회
  useEffect(() => {
    loadWeather();

    return () => abortRef.current?.abort();
  }, [loadWeather]);

  // 1분마다 갱신 (탭이 보이는 동안만)
  useEffect(() => {
    let timer = null;

    const startPolling = () => {
      if (document.visibilityState === "visible") {
        loadWeather();
        timer = setInterval(loadWeather, 60 * 1000);
      }
    };

    const stopPolling = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        stopPolling();
        startPolling();
      } else {
        stopPolling();
      }
    };

    startPolling();

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
      abortRef.current?.abort();
    };
  }, [loadWeather]);

  const restGuide = useMemo(
    () => (weather ? getRestGuide(weather.temperature) : null),
    [weather]
  );

  return (
    <div className="app">
      <div className="weather-card">

        <header className="header">
          <div>
            <h1>현재 온도</h1>
            <div className="station">
              경상남도 거제시 장평동
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

        {loading && !weather && (
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

        {weather && (
          <>
            <section className="observation">
              <div className="observation-label">
                관측시간
              </div>

              <div className="date-time">
                <span className="date">{weather.date}</span>
                <span className="time">{weather.time}</span>
              </div>
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
                  {weather.temperature}
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
                  {weather.humidity}
                  <span>%</span>
                </div>
              </div>

            </section>

            {restGuide && (
              <div className={`rest-guide rest-guide--${restGuide.level}`}>
                <div className="rest-guide-icon" aria-hidden="true">
                  ⏱
                </div>
                <div className="rest-guide-title">
                  {restGuide.title}
                </div>
              </div>
            )}

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
