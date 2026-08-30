import { useCallback, useEffect, useState } from "react";
import "./app.css";

// 실제 Cloudflare Worker 주소로 변경
const WEATHER_API =
  "https://summer-snowflake-ccd3.excellwork.workers.dev/";

function getRestGuide(temperature) {
  const temp = Number(temperature);

  if (!Number.isFinite(temp)) {
    return null;
  }

  if (temp >= 31.5) {
    return {
      level: "high",
      title: "1시간 휴식",
      text: "고온입니다. 1시간 휴식이 필요합니다.",
    };
  }

  if (temp >= 28.5) {
    return {
      level: "mid",
      title: "30분 휴식",
      text: "더위가 있습니다. 30분 휴식을 권장합니다.",
    };
  }

  return {
    level: "ok",
    title: "정상 활동",
    text: "휴식이 필요하지 않습니다.",
  };
}

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState(null);

  const loadWeather = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(WEATHER_API, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setWeather(data);
      setLastChecked(new Date());

    } catch (err) {
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

  return (
    <div className="app">
      <div className="weather-card">

        <header className="header">
          <div>
            <h1>현재 기상</h1>
            <div className="station">
              AWS 관측소 294
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

              <div className="time">
                {weather.time}
              </div>

              <div className="date">
                {weather.date}
              </div>
            </section>

            <section className="weather-values">

              <div className="weather-item">
                <div className="item-icon" aria-hidden="true">
                  🌡
                </div>

                <div className="label">
                  기온
                  <span className="label-en">Temperature</span>
                </div>

                <div className="temperature">
                  {weather.temperature}
                  <span>℃</span>
                </div>
              </div>

              <div className="weather-item">
                <div className="item-icon" aria-hidden="true">
                  💧
                </div>

                <div className="label">
                  습도
                  <span className="label-en">Humidity</span>
                </div>

                <div className="humidity">
                  {weather.humidity}
                  <span>%</span>
                </div>
              </div>

            </section>

            {(() => {
              const restGuide = getRestGuide(weather.temperature);

              return restGuide && (
                <div className={`rest-guide rest-guide--${restGuide.level}`}>
                  <div className="rest-guide-icon" aria-hidden="true">
                    ⏱
                  </div>
                  <div className="rest-guide-body">
                    <div className="rest-guide-title">
                      {restGuide.title}
                    </div>
                    <div className="rest-guide-text">
                      {restGuide.text}
                    </div>
                  </div>
                </div>
              );
            })()}

            <footer className="footer">

              <div>
                관측시간&nbsp;
                <strong>{weather.time}</strong>
              </div>

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