/* Merge a pristine npm-installed tree (tempDir) into the project's node_modules
 * without invoking npm's reifier, because npm cannot rename @opencode/cli
 * (locked by the running opencode.exe).
 *
 * - Removes packages on disk that are NOT in package-lock.json (extraneous).
 * - Copies/refreshes every package listed in package-lock.json from tempDir.
 * - Syncs .bin shims (best effort; skips files that are locked).
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const NM = path.join(ROOT, 'node_modules');
const TEMP = process.argv[2];
if (!TEMP || !fs.existsSync(TEMP)) {
  console.error('usage: node merge-nm.cjs <temp-node_modules-parent-dir>');
  process.exit(1);
}
const SRC_NM = path.join(TEMP, 'node_modules');

const lock = require(path.join(ROOT, 'package-lock.json'));
const lockKeys = new Set(Object.keys(lock.packages).filter((k) => k.startsWith('node_modules/')));

// ---- 1. find every package dir on disk ----
function walkPackages(dir, rel, out) {
  let ents;
  try {
    ents = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (!e.isDirectory() && !e.isSymbolicLink()) continue;
    if (e.name === '.bin' || e.name === '.cache') continue;
    const p = path.join(dir, e.name);
    const r = rel ? rel + '/' + e.name : e.name;
    if (fs.existsSync(path.join(p, 'package.json'))) out.push(r);
    if (e.name.startsWith('@')) walkPackages(p, r, out);
    walkPackages(path.join(p, 'node_modules'), r + '/node_modules', out);
  }
}

const onDisk = [];
walkPackages(NM, '', onDisk);

const extraneous = onDisk.filter((r) => !lockKeys.has('node_modules/' + r));
let removed = 0;
for (const r of extraneous) {
  const p = path.join(NM, ...r.split('/'));
  // never touch the opencode tree (locked by the running harness)
  if (r.startsWith('@opencode/')) {
    console.log('SKIP (opencode):', r);
    continue;
  }
  try {
    fs.rmSync(p, { recursive: true, force: true });
    removed++;
  } catch (e) {
    console.log('FAILED remove:', r, '->', e.message);
  }
}
console.log('extraneous removed:', removed, '/', extraneous.length);

// ---- 2. upsert every locked package from temp ----
let copied = 0;
let skipped = 0;
const keys = [...lockKeys].sort(); // parents sort before children
for (const key of keys) {
  const src = path.join(TEMP, ...key.split('/'));
  const dest = path.join(ROOT, ...key.split('/'));
  if (!fs.existsSync(path.join(src, 'package.json'))) {
    console.log('WARN not in temp:', key);
    continue;
  }
  let same = false;
  try {
    same =
      JSON.parse(fs.readFileSync(path.join(dest, 'package.json'), 'utf8')).version ===
      JSON.parse(fs.readFileSync(path.join(src, 'package.json'), 'utf8')).version;
  } catch {
    same = false;
  }
  if (same) {
    skipped++;
    continue;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  try {
    fs.rmSync(dest, { recursive: true, force: true });
  } catch (e) {
    console.log('FAILED replace:', key, '->', e.message);
    continue;
  }
  fs.cpSync(src, dest, { recursive: true });
  copied++;
}
console.log('packages copied:', copied, '| already current:', skipped);

// ---- 3. sync .bin shims ----
const binSrc = path.join(SRC_NM, '.bin');
const binDest = path.join(NM, '.bin');
fs.mkdirSync(binDest, { recursive: true });
let binCopied = 0;
let binLocked = 0;
for (const f of fs.readdirSync(binSrc)) {
  try {
    fs.copyFileSync(path.join(binSrc, f), path.join(binDest, f));
    binCopied++;
  } catch {
    binLocked++;
  }
}
console.log('bin shims synced:', binCopied, '| locked/skipped:', binLocked);
console.log('done');
