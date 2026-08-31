// TemperatureChart.jsx
// history 배열(최신이 0번)을 받아 시간순(과거→최신)으로 점을 찍고
// 온도 값을 라벨로 표시하는 순수 SVG 미니 차트.
// 외부 차트 라이브러리 없이, 지금 앱의 다크 테마 톤에 맞춰 직접 그린다.

import { useMemo } from "react";
import "./temperature-chart.css";

const WIDTH = 320;
const HEIGHT = 128;
const PADDING_X = 24;
const PADDING_TOP = 24; // 라벨 공간 확보
const PADDING_BOTTOM = 32; // 하단 시간 라벨 공간 확보 (점과 겹침 방지)

function TemperatureChart({ history }) {
  const points = useMemo(() => {
    if (!history || history.length === 0) return [];

    // history[0]이 최신이므로 뒤집어서 과거→최신 순서로
    const ordered = [...history].reverse();

    const temps = ordered.map((h) => Number(h.temperature));
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    // 온도가 전부 같을 때(변화 없음) 대비한 최소 범위
    const range = Math.max(max - min, 1);

    const usableWidth = WIDTH - PADDING_X * 2;
    const usableHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM;

    return ordered.map((h, i) => {
      const x =
        ordered.length === 1
          ? WIDTH / 2
          : PADDING_X + (usableWidth * i) / (ordered.length - 1);
      const t = Number(h.temperature);
      const y =
        PADDING_TOP + usableHeight - ((t - min) / range) * usableHeight;

      return { x, y, temperature: t, time: h.time };
    });
  }, [history]);

  if (points.length === 0) {
    return null;
  }

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="temp-chart">
      <div className="temp-chart-header">
        <div className="temp-chart-title">
          온도 그래프
        </div>
        <div className="temp-chart-sub">
          Temperature Graph
        </div>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="temp-chart-svg"
        role="img"
        aria-label="최근 온도 추이"
      >
        <defs>
          <linearGradient id="tempLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>

        {/* 연결선 */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#tempLine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 점 + 온도 라벨 + 시각 라벨 */}
        {points.map((p, i) => {
          const isLatest = i === points.length - 1;
          return (
            <g key={p.time + i}>
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                className={
                  isLatest
                    ? "temp-chart-value temp-chart-value--latest"
                    : "temp-chart-value"
                }
              >
                {p.temperature}°
              </text>

              <circle
                cx={p.x}
                cy={p.y}
                r={isLatest ? 5 : 3.5}
                className={
                  isLatest ? "temp-chart-dot temp-chart-dot--latest" : "temp-chart-dot"
                }
              />

              <text
                x={p.x}
                y={HEIGHT - 6}
                textAnchor="middle"
                className="temp-chart-time"
              >
                {p.time}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default TemperatureChart;
