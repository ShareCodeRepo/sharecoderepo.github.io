import { useCallback, useEffect, useState } from "react";
import "./app.css";

// 실제 Cloudflare Worker 주소로 변경
const WEATHER_API =
  "https://summer-snowflake-ccd3.excellwork.workers.dev/";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState(null);

  const loadWeather = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(`${WEATHER_API}?t=${Date.now()}`, {
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

  // 5분마다 갱신
  useEffect(() => {
    const timer = setInterval(() => {
      loadWeather();
    }, 5 * 60 * 1000);

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

            <footer className="footer">

              <div>
                관측 시각&nbsp;
                <strong>{weather.time}</strong>
              </div>

              <div>
                5분마다 자동 갱신
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