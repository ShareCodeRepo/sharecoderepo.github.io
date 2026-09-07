import React from "react";
import { createRoot } from "react-dom/client";
import LeaveTracker from "./LeaveTracker.jsx";

const VERSION_KEY = "annualleave-build-hash";
const RELOAD_KEY = "annualleave-reloaded";

// 현재 로드된 번들 파일명(해시 포함)으로 업데이트 감지.
// 새 배포가 뜨면 index.html이 다른 해시 파일을 참조하므로,
// 이전에 저장된 해시와 다르면 한 번 자동 새로고침해 새 코드를 적용한다.
function getBundleName() {
  try {
    const entries = performance.getEntriesByType("resource") || [];
    for (const e of entries) {
      if (/\/assets\/index-[\w-]+\.js/.test(e.name)) {
        return e.name;
      }
    }
    const scripts = document.getElementsByTagName("script");
    for (const s of scripts) {
      if (/\/assets\/index-[\w-]+\.js/.test(s.src || "")) return s.src;
    }
  } catch {
    // 무시
  }
  return null;
}

if (!window.storage) {
  window.storage = {
    async get(key) {
      try {
        const raw = localStorage.getItem(key);
        return { value: raw === null ? null : raw };
      } catch {
        return { value: null };
      }
    },
    async set(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
  };
}

(function autoRefreshOnUpdate() {
  try {
    const bundle = getBundleName();
    if (!bundle) return;

    const prev = localStorage.getItem(VERSION_KEY);
    if (prev && prev !== bundle && !sessionStorage.getItem(RELOAD_KEY)) {
      sessionStorage.setItem(RELOAD_KEY, "1");
      location.reload();
      return;
    }
    localStorage.setItem(VERSION_KEY, bundle);
  } catch {
    // localStorage 실패 등은 무시
  }
})();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LeaveTracker />
  </React.StrictMode>
);
