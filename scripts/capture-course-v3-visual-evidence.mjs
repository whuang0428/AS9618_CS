import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const evidenceRoot = join(root, "audits", "course-v3-visual-evidence");
const baseUrl = process.env.COURSE_V3_BASE_URL ?? "http://127.0.0.1:8769/course-v3";
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = mkdtempSync(join(tmpdir(), "as9618-v3-capture-"));
const port = 9300 + Math.floor(Math.random() * 400);
const desktop = { name: "desktop", width: 1440, height: 1000, mobile: false };
const mobile = { name: "mobile-390", width: 390, height: 844, mobile: true };
const viewports = [desktop, mobile];
const option = (name) => process.argv.find((argument) => argument.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const captureFrom = Number(option("from") ?? process.env.CAPTURE_FROM ?? 1);
const captureTo = Number(option("to") ?? process.env.CAPTURE_TO ?? courseV3Meta.lessonCount);
const requestedViewports = new Set((option("viewports") ?? process.env.CAPTURE_VIEWPORTS ?? viewports.map((viewport) => viewport.name).join(",")).split(","));
const activeViewports = viewports.filter((viewport) => requestedViewports.has(viewport.name));
const selectedLessons = courseV3Lessons.filter((lesson) => lesson.sequenceIndex >= captureFrom && lesson.sequenceIndex <= captureTo);
const captureIndexes = !process.argv.includes("--no-indexes") && process.env.CAPTURE_INDEXES !== "0";
const captureContactSheets = !process.argv.includes("--no-contact-sheets") && process.env.CAPTURE_CONTACT_SHEETS !== "0";

for (const path of [
  join(evidenceRoot, "full-pages", desktop.name),
  join(evidenceRoot, "full-pages", mobile.name),
  join(evidenceRoot, "indexes", desktop.name),
  join(evidenceRoot, "indexes", mobile.name),
  join(evidenceRoot, "contact-sheets"),
  join(evidenceRoot, "contact-sheet-source"),
]) mkdirSync(path, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-extensions",
  "--disable-features=Translate,MediaRouter",
  "--disable-sync",
  "--hide-scrollbars",
  "--no-first-run",
  "--allow-file-access-from-files",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

let chromeError = "";
chrome.stderr.on("data", (chunk) => { chromeError += String(chunk); });

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
const sha256File = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
async function waitForChrome() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error(`Chromium did not start on port ${port}. ${chromeError.slice(-1000)}`);
}

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }
  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolvePromise, reject) => {
      this.socket.addEventListener("open", resolvePromise, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${message.error.message}: ${message.error.data ?? ""}`));
        else pending.resolve(message.result);
        return;
      }
      for (const listener of this.listeners.get(message.method) ?? []) listener(message.params);
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method, timeout = 15_000) {
    return new Promise((resolvePromise, reject) => {
      const listeners = this.listeners.get(method) ?? [];
      const timer = setTimeout(() => {
        this.listeners.set(method, listeners.filter((listener) => listener !== handler));
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const handler = (params) => {
        clearTimeout(timer);
        this.listeners.set(method, listeners.filter((listener) => listener !== handler));
        resolvePromise(params);
      };
      this.listeners.set(method, [...listeners, handler]);
    });
  }
  on(method, listener) {
    this.listeners.set(method, [...(this.listeners.get(method) ?? []), listener]);
  }
  close() { this.socket.close(); }
}

const evaluate = async (cdp, expression) => {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

async function openTarget() {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  const target = await response.json();
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await Promise.all([cdp.send("Page.enable"), cdp.send("Runtime.enable"), cdp.send("Network.enable"), cdp.send("Log.enable")]);
  return { cdp, targetId: target.id };
}

async function setViewport(cdp, viewport) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
}

async function navigate(cdp, url, diagnostics) {
  const load = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url });
  await load;
  await evaluate(cdp, `(async()=>{
    await document.fonts.ready;
    for (const image of document.images) image.loading = "eager";
    await Promise.all([...document.images].map(image => image.complete ? true : new Promise(resolve => {
      image.addEventListener("load", resolve, {once:true});
      image.addEventListener("error", resolve, {once:true});
      setTimeout(resolve, 4000);
    })));
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    scrollTo(0, 0);
    return true;
  })()`);
  await sleep(80);
  return diagnostics;
}

async function inspect(cdp, expectedStages = true) {
  return evaluate(cdp, `(()=>{
    const stageOrder=[...document.querySelectorAll("main > .lesson-stage")].map(section=>section.id);
    const images=[...document.images].map(image=>({src:image.currentSrc||image.src,alt:image.alt,complete:image.complete,width:image.naturalWidth,height:image.naturalHeight}));
    const main=document.querySelector("main");
    const rect=document.querySelector("h1")?.getBoundingClientRect();
    const pageOverflow=document.documentElement.scrollWidth-document.documentElement.clientWidth;
    const visibleText=(main?.innerText||"").trim();
    return {
      title:document.title,
      h1:document.querySelector("h1")?.textContent?.trim()||"",
      stageOrder,
      knowledgeUnits:document.querySelectorAll(".knowledge-unit").length,
      materials:document.querySelectorAll(".teaching-material").length,
      practices:document.querySelectorAll(".practice-question").length,
      pastPaper:document.querySelectorAll(".past-paper").length,
      teacherNotes:document.querySelectorAll("details.teacher-note:not([open])").length,
      brokenImages:images.filter(image=>!image.complete||image.width<1).map(image=>image.src),
      missingAlt:images.filter(image=>image.alt.trim().length<20).map(image=>image.src),
      imageCount:images.length,
      pageOverflow,
      contentLength:visibleText.length,
      viewport:{width:innerWidth,height:innerHeight},
      h1Fits:!rect||rect.left>=-1&&rect.right<=innerWidth+1,
      expectedStages:${expectedStages},
    };
  })()`);
}

async function screenshot(cdp, outputPath, viewport) {
  const metrics = await cdp.send("Page.getLayoutMetrics");
  const width = Math.ceil(metrics.cssContentSize.width);
  const height = Math.ceil(metrics.cssContentSize.height);
  if (height > 8_000) {
    const tilePaths = [];
    for (let y = 0; y < height; y += 1800) {
      const tileHeight = Math.min(1800, height - y);
      const tile = await cdp.send("Page.captureScreenshot", {
        format: "png",
        optimizeForSpeed: true,
        captureBeyondViewport: true,
        fromSurface: true,
        clip: { x: 0, y, width: Math.max(viewport.width, width), height: tileHeight, scale: 1 },
      });
      const tilePath = join(profile, `tile-${String(y).padStart(6, "0")}.png`);
      writeFileSync(tilePath, Buffer.from(tile.data, "base64"));
      tilePaths.push(tilePath);
    }
    execFileSync("python3", [join(root, "scripts", "stitch-vertical-png.py"), outputPath, ...tilePaths], { cwd: root, stdio: "inherit" });
    for (const tilePath of tilePaths) rmSync(tilePath, { force: true });
    return { width: Math.max(viewport.width, width), height, bytes: statSync(outputPath).size, captureMode: "tiled-lossless" };
  }
  const capture = await Promise.race([cdp.send("Page.captureScreenshot", {
    format: "png",
    optimizeForSpeed: true,
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width: Math.max(viewport.width, width), height, scale: 1 },
  }), new Promise((_, reject) => setTimeout(() => reject(new Error(`Screenshot timed out for ${outputPath}`)), 60_000))]);
  writeFileSync(outputPath, Buffer.from(capture.data, "base64"));
  return { width: Math.max(viewport.width, width), height, bytes: Buffer.byteLength(capture.data, "base64"), captureMode: "single" };
}

const expectedStageOrder = ["guiding-question", "knowledge-explanation", "practice", "past-paper-analysis", "summary"];
function issuesFor(metrics, diagnostics, isLesson) {
  const issues = [];
  if (isLesson && JSON.stringify(metrics.stageOrder) !== JSON.stringify(expectedStageOrder)) issues.push(`stage order: ${metrics.stageOrder.join(",")}`);
  if (isLesson && metrics.knowledgeUnits < 1) issues.push("no knowledge unit");
  if (isLesson && metrics.materials < 2) issues.push("fewer than two teaching materials");
  if (isLesson && metrics.practices < 3) issues.push("fewer than three practice tasks");
  if (isLesson && metrics.pastPaper !== 1) issues.push("past-paper analysis missing or duplicated");
  if (isLesson && metrics.teacherNotes < 1) issues.push("teacher note is not collapsed by default");
  if (metrics.brokenImages.length) issues.push(`broken images: ${metrics.brokenImages.join(" | ")}`);
  if (metrics.missingAlt.length) issues.push(`weak/missing alt: ${metrics.missingAlt.join(" | ")}`);
  if (metrics.pageOverflow > 1) issues.push(`page horizontal overflow ${metrics.pageOverflow}px`);
  if (!metrics.h1Fits) issues.push("h1 exceeds viewport");
  if (metrics.contentLength < (isLesson ? 1800 : 300)) issues.push(`visible content too short: ${metrics.contentLength}`);
  if (diagnostics.exceptions.length) issues.push(`runtime exceptions: ${diagnostics.exceptions.join(" | ")}`);
  if (diagnostics.logs.length) issues.push(`console/log errors: ${diagnostics.logs.join(" | ")}`);
  if (diagnostics.network.length) issues.push(`network failures: ${diagnostics.network.join(" | ")}`);
  return issues;
}

function diagnosticsFor(cdp) {
  const diagnostics = { exceptions: [], logs: [], network: [] };
  cdp.on("Runtime.exceptionThrown", ({ exceptionDetails }) => diagnostics.exceptions.push(exceptionDetails.text));
  cdp.on("Runtime.consoleAPICalled", ({ type, args }) => {
    if (["error", "warning"].includes(type)) diagnostics.logs.push(`${type}: ${args.map((arg) => arg.value ?? arg.description ?? "").join(" ")}`);
  });
  cdp.on("Log.entryAdded", ({ entry }) => { if (["error", "warning"].includes(entry.level)) diagnostics.logs.push(`${entry.level}: ${entry.text}`); });
  cdp.on("Network.loadingFailed", ({ errorText, canceled }) => { if (!canceled) diagnostics.network.push(errorText); });
  return diagnostics;
}

function contactSheetHtml(section, viewport, lessons) {
  const cards = lessons.map((lesson) => {
    const id = String(lesson.sequenceIndex).padStart(3, "0");
    const imagePath = resolve(evidenceRoot, "full-pages", viewport.name, `lesson-${id}.png`);
    return `<article><header><strong>${id}</strong><span>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</span></header><img src="${pathToFileURL(imagePath)}" alt="Full-page ${viewport.name} screenshot for lesson ${id}"><h2>${lesson.title}</h2></article>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;padding:32px;background:#edf1f3;color:#102b4c;font-family:Arial,sans-serif}h1{font:700 34px Georgia,serif;margin:0 0 8px}p{margin:0 0 24px;color:#516278}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}article{background:#fff;border:1px solid #b8c6d1;padding:12px;box-shadow:0 5px 18px #18354e16}header{display:flex;justify-content:space-between;gap:8px;font-size:12px;letter-spacing:.04em}header strong{color:#0d7778}header span{text-align:right;color:#516278}img{display:block;width:100%;height:560px;object-fit:contain;object-position:top center;background:#f8fafb;border:1px solid #dce4e8;margin:10px 0}h2{font:700 16px Georgia,serif;line-height:1.2;margin:0}</style></head><body><h1>Section ${section} · ${sectionMeta[section].title}</h1><p>${viewport.name} full-page contact sheet · each strip links visually to the original evidence file.</p><div class="grid">${cards}</div></body></html>`;
}

function evidenceIndexHtml() {
  const sections = Object.keys(sectionMeta).map(Number).map((section) => {
    const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
    const links = lessons.map((lesson) => {
      const id = String(lesson.sequenceIndex).padStart(3, "0");
      return `<li><strong>${id}</strong> ${lesson.title}<span><a href="full-pages/desktop/lesson-${id}.png">desktop</a><a href="full-pages/mobile-390/lesson-${id}.png">390px</a></span></li>`;
    }).join("");
    return `<section><h2>Section ${section} · ${sectionMeta[section].title}</h2><p><a href="contact-sheets/section-${section}-desktop.png">Desktop contact sheet</a> · <a href="contact-sheets/section-${section}-mobile-390.png">390px contact sheet</a></p><ol>${links}</ol></section>`;
  }).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AS 9618 V3 visual evidence</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f6f7;color:#132d4f;font:16px/1.5 Arial,sans-serif}main{max-width:1120px;margin:auto;padding:40px 20px}h1,h2{font-family:Georgia,serif}h1{font-size:clamp(2.3rem,7vw,5rem);line-height:.95}section{background:white;border:1px solid #c8d3da;margin:24px 0;padding:24px}ol{columns:2;gap:30px;padding-left:22px}li{break-inside:avoid;padding:7px 0;border-bottom:1px solid #e3e8eb}li span{float:right;display:flex;gap:8px}a{color:#087678}@media(max-width:700px){ol{columns:1}li span{float:none;margin-left:8px}}</style></head><body><main><p>Cambridge AS 9618 · 2027–2029</p><h1>Whole-course visual evidence</h1><p>${courseV3Meta.lessonCount} pages reviewed at 1440px and 390px. These screenshots support the atomic-objective ledger and the human-readable audit report.</p>${sections}</main></body></html>`;
}

const qaPath = join(evidenceRoot, "browser-qa.json");
const priorQa = existsSync(qaPath) ? JSON.parse(readFileSync(qaPath, "utf8")) : { results: [], indexResults: [] };
const selectedIds = new Set(selectedLessons.map((lesson) => String(lesson.sequenceIndex).padStart(3, "0")));
const activeNames = new Set(activeViewports.map((viewport) => viewport.name));
const results = priorQa.results.filter((result) => !(selectedIds.has(result.lesson) && activeNames.has(result.viewport)));
const indexResults = captureIndexes ? priorQa.indexResults.filter((result) => !activeNames.has(result.viewport)) : priorQa.indexResults;
const qaDocument = () => ({
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  engine: "Google Chrome via DevTools Protocol",
  baseUrl,
  expectedLessonPages: courseV3Meta.lessonCount,
  viewports,
  results: [...results].sort((a, b) => a.viewport.localeCompare(b.viewport) || a.lesson.localeCompare(b.lesson)),
  indexResults: [...indexResults].sort((a, b) => a.viewport.localeCompare(b.viewport) || a.page.localeCompare(b.page)),
  summary: {
    lessonViewportReviews: results.length,
    lessonPasses: results.filter((result) => result.status === "PASS").length,
    lessonFailures: results.filter((result) => result.status !== "PASS").length,
    indexViewportReviews: indexResults.length,
    indexFailures: indexResults.filter((result) => result.status !== "PASS").length,
  },
});
const persistQa = () => writeFileSync(qaPath, JSON.stringify(qaDocument(), null, 2) + "\n");
let cdp;
let targetId;
try {
  await waitForChrome();
  ({ cdp, targetId } = await openTarget());
  for (const viewport of activeViewports) {
    await setViewport(cdp, viewport);
    for (const lesson of selectedLessons) {
      const id = String(lesson.sequenceIndex).padStart(3, "0");
      const diagnostics = diagnosticsFor(cdp);
      await navigate(cdp, `${baseUrl}/${lesson.route}/`, diagnostics);
      const metrics = await inspect(cdp, true);
      const outputPath = join(evidenceRoot, "full-pages", viewport.name, `lesson-${id}.png`);
      const capture = await screenshot(cdp, outputPath, viewport);
      const issues = issuesFor(metrics, diagnostics, true);
      results.push({ lesson: id, lessonKey: lesson.lessonKey, section: lesson.section, viewport: viewport.name, status: issues.length ? "FAIL" : "PASS", issues, metrics, capture, sourceSha256: sha256File(join(root, "web", "course-v3", lesson.route, "index.html")), evidence: outputPath.slice(root.length + 1) });
      persistQa();
      process.stdout.write(`${viewport.name} L${id} ${issues.length ? "FAIL" : "PASS"}\n`);
    }
    if (captureIndexes) {
      const indexes = [{ slug: "course", url: `${baseUrl}/` }, ...Object.keys(sectionMeta).map((section) => ({ slug: `section-${section}`, url: `${baseUrl}/section-${section}/` }))];
      for (const item of indexes) {
        const diagnostics = diagnosticsFor(cdp);
        await navigate(cdp, item.url, diagnostics);
        const metrics = await inspect(cdp, false);
        const outputPath = join(evidenceRoot, "indexes", viewport.name, `${item.slug}.png`);
        const capture = await screenshot(cdp, outputPath, viewport);
        const issues = issuesFor(metrics, diagnostics, false);
        const sourcePath = item.slug === "course" ? join(root, "web", "course-v3", "index.html") : join(root, "web", "course-v3", item.slug, "index.html");
        indexResults.push({ page: item.slug, viewport: viewport.name, status: issues.length ? "FAIL" : "PASS", issues, metrics, capture, sourceSha256: sha256File(sourcePath), evidence: outputPath.slice(root.length + 1) });
        persistQa();
      }
    }
  }

  writeFileSync(join(evidenceRoot, "index.html"), evidenceIndexHtml());
  if (captureContactSheets) for (const section of Object.keys(sectionMeta).map(Number)) {
    const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
    for (const viewport of viewports) {
      const sourcePath = join(evidenceRoot, "contact-sheet-source", `section-${section}-${viewport.name}.html`);
      writeFileSync(sourcePath, contactSheetHtml(section, viewport, lessons));
      await setViewport(cdp, { name: "contact", width: 1440, height: 1000, mobile: false });
      await navigate(cdp, pathToFileURL(sourcePath).href, diagnosticsFor(cdp));
      await screenshot(cdp, join(evidenceRoot, "contact-sheets", `section-${section}-${viewport.name}.png`), { width: 1440, height: 1000 });
    }
  }

  const qa = qaDocument();
  persistQa();
  console.log(JSON.stringify(qa.summary, null, 2));
  if (qa.summary.lessonFailures || qa.summary.indexFailures) process.exitCode = 1;
} finally {
  cdp?.close();
  const exited = new Promise((resolvePromise) => chrome.once("exit", resolvePromise));
  chrome.kill("SIGKILL");
  await Promise.race([exited, sleep(1000)]);
  chrome.stderr.destroy();
  chrome.unref();
  rmSync(profile, { recursive: true, force: true });
}
process.exit(process.exitCode ?? 0);
