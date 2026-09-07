import { cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const appDir = resolve(root, "AnnualLeave");
const dist = resolve(appDir, "dist");

rmSync(resolve(appDir, "assets"), { recursive: true, force: true });
rmSync(resolve(appDir, "index.html"), { force: true });

cpSync(resolve(dist, "assets"), resolve(appDir, "assets"), { recursive: true });
cpSync(resolve(dist, "index.html"), resolve(appDir, "index.html"));
