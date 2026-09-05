import { cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

rmSync(resolve(root, "assets"), { recursive: true, force: true });
rmSync(resolve(root, "index.html"), { force: true });
rmSync(resolve(root, "kma_grid_light.json"), { force: true });

cpSync(resolve(dist, "assets"), resolve(root, "assets"), { recursive: true });
cpSync(resolve(dist, "index.html"), resolve(root, "index.html"));
cpSync(
  resolve(dist, "kma_grid_light.json"),
  resolve(root, "kma_grid_light.json")
);
