#!/usr/bin/env node
// Rolldown (Vite 8) leaves a stale per-chunk CSS reference in the JS chunk
// manifest even with cssCodeSplit:false. The runtime then tries to preload a
// CSS file that was never emitted, throwing "Unable to preload CSS" and
// unmounting the whole React tree on the lazy route. This copies the real
// bundle CSS to each name the manifest still references, so the preload
// resolves instead of 404ing.
import fs from "node:fs";
import path from "node:path";

const assets = path.resolve("dist/assets");
if (!fs.existsSync(assets)) {
  console.error("dist/assets not found; run vite build first");
  process.exit(1);
}

// Read every JS chunk, find .css names referenced in the deps manifest,
// and copy the (single) real CSS file to each.
const cssFiles = fs.readdirSync(assets).filter((f) => f.endsWith(".css"));
if (cssFiles.length === 0) {
  console.log("no CSS files; nothing to fix");
  process.exit(0);
}
const realCss = cssFiles[0];

for (const f of fs.readdirSync(assets)) {
  if (!f.endsWith(".js")) continue;
  const src = fs.readFileSync(path.join(assets, f), "utf-8");
  const refs = [...src.matchAll(/`\.\/([A-Za-z0-9_-]+\.css)`/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!fs.existsSync(path.join(assets, ref))) {
      fs.copyFileSync(path.join(assets, realCss), path.join(assets, ref));
      console.log(`aliased ${realCss} -> ${ref}`);
    }
  }
}
console.log("css manifest fix done");
