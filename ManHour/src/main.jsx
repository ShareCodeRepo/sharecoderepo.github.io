import React from "react";
import { createRoot } from "react-dom/client";
import ManHourTracker from "./ManHourTracker.jsx";

const VERSION_KEY = "manhour-build-hash";

// 현재 로드된 번들 파일명(해시 포함)으로 업데이트 감지.
// 새 배포가 뜨면 index.html이 다른 해시 파일을 참조하므로,
// 이전에 저장된 해시와 다르면 한 번 자동 새로고침해 새 코드를 적용한다.
function getBundleName() {
  try {
    const entries = performance.getEntriesByType("resource") || [];
    for (const e of entries) {
      const name = e.name;
      if (/\/assets\/index-[\w-]+\.js/.test(name)) {
        return name;
      }
    }
    // fallback: 현재 script 태그
    const scripts = document.getElementsByTagName("script");
    for (const s of scripts) {
      const src = s.src || "";
      if (/\/assets\/index-[\w-]+\.js/.test(src)) return src;
    }
  } catch {
    // 무시
  }
  return null;
}

const DB_NAME = "manhour-db";
const DB_STORE = "kv";

function openDb() {
  return new Promise((resolve, reject) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(DB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (e) {
      reject(e);
    }
  });
}

async function idbGet(key) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readonly");
      const r = tx.objectStore(DB_STORE).get(key);
      r.onsuccess = () => resolve(r.result ?? null);
      r.onerror = () => reject(r.error);
    });
  } catch {
    return null;
  }
}

async function idbSet(key, value) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    return true;
  } catch {
    return false;
  }
}

if (!window.storage) {
  // localStorage 를 메인으로 쓰고 IndexedDB 에 항상 백업.
  // iOS 홈화면 웹앱 등에서 localStorage 가 비워져도 IndexedDB 로 복구된다.
  window.storage = {
    async get(key) {
      try {
        const raw = localStorage.getItem(key);
        if (raw !== null) return { value: raw };
      } catch {
        // localStorage 접근 불가 → 백업에서
      }
      const backup = await idbGet(key);
      if (backup !== null) {
        try {
          localStorage.setItem(key, backup);
        } catch {
          // 재저장 실패는 무시
        }
        return { value: backup };
      }
      return { value: null };
    },
    async set(key, value) {
      let ok = false;
      try {
        localStorage.setItem(key, value);
        ok = true;
      } catch {
        // localStorage 실패
      }
      const idbOk = await idbSet(key, value);
      return ok || idbOk;
    },
  };
}

(function autoRefreshOnUpdate() {
  try {
    const bundle = getBundleName();
    if (!bundle) return;

    const prev = localStorage.getItem(VERSION_KEY);
    if (prev && prev !== bundle && !sessionStorage.getItem("mh-reloaded")) {
      sessionStorage.setItem("mh-reloaded", "1");
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
    <ManHourTracker />
  </React.StrictMode>
);
