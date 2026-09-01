import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  contract: path.join(root, "scripts", "course-v3-section2-sample-contract.json"),
  topologyPrompts: path.join(root, "scripts", "course-v3-section2-topology-imagegen-prompts.json"),
  html: path.join(root, "web", "course-v3-pilot", "section-2", "index.html"),
  css: path.join(root, "web", "course-v3-pilot", "section-2", "pilot.css"),
  js: path.join(root, "web", "course-v3-pilot", "section-2", "pilot.js"),
  asset: path.join(root, "web", "assets", "diagrams", "course-v3-pilot", "streaming-buffer-reservoir.png"),
};

const topologyAssetPaths = Object.fromEntries(
  ["bus", "star", "mesh", "hybrid"].map((topology) => [
    topology,
    path.join(root, "web", "assets", "diagrams", "course-v3-pilot", `topology-${topology}-v2.png`),
  ]),
);

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function occurrences(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function topologyFigure(html, name) {
  const pattern = new RegExp(`<figure class="topology-card">\\s*<figcaption><strong>${name}<\\/strong>[\\s\\S]*?<\\/figure>`);
  const match = html.match(pattern);
  requireCondition(match, `${name} topology figure is missing`);
  return match[0];
}

function pngDimensions(buffer) {
  requireCondition(buffer.length >= 24, "PNG asset is truncated");
  requireCondition(buffer[0] === 0x89 && buffer.subarray(1, 4).toString("ascii") === "PNG", "asset is not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

export function verifySamples({ contract, topologyPrompts, html, css, js, assetBuffer, topologyAssetBuffers }) {
  const failures = [];
  const check = (work) => {
    try { work(); } catch (error) { failures.push(error.message); }
  };

  check(() => requireCondition(contract.schemaVersion === 1, "contract schemaVersion must be 1"));
  check(() => requireCondition(contract.status === "sample-checkpoint", "contract must remain a sample checkpoint"));
  check(() => requireCondition(contract.samples.length === 3, "exactly three representative samples are required"));
  check(() => requireCondition(contract.samples.every((sample) => sample.review.factStatus === "reviewed"), "every sample needs reviewed facts"));
  check(() => requireCondition(contract.samples.every((sample) => sample.review.renderedStatus === "reviewed-desktop-and-390px"), "every sample needs desktop and 390px rendered review"));
  check(() => requireCondition(contract.renderedEvidence.consoleWarningsOrErrors === 0, "rendered evidence records console warnings or errors"));

  const requiredOrder = ["guiding-question", "knowledge-explanation", "practice", "past-paper-analysis", "summary"];
  check(() => requireCondition(contract.pageContract.order.join("|") === requiredOrder.join("|"), "contract page order is wrong"));
  check(() => {
    const positions = requiredOrder.map((id) => html.indexOf(`id="${id}"`));
    requireCondition(positions.every((position) => position >= 0), "one or more required page sections are missing");
    requireCondition(positions.every((position, index) => index === 0 || position > positions[index - 1]), "page sections are not in the required order");
  });
  check(() => requireCondition(!/Quick route|Full route|Deep route|Teaching-depth menu/i.test(html), "legacy Quick/Full/Deep routing has returned"));
  check(() => requireCondition(occurrences(html, /<details class="teacher-hint">/g) >= 6, "Chinese teacher hints are not placed beside the teaching flow"));
  check(() => requireCondition(!/<details class="teacher-hint"[^>]*\sopen(?:\s|>)/.test(html), "teacher hints must be collapsed by default"));

  check(() => requireCondition(/<table class="comparison-table">/.test(html), "client-server comparison must be a native table"));
  for (const factor of ["Roles", "Management", "Cost", "Availability", "Suitable situation"]) {
    check(() => requireCondition(html.includes(`>${factor}</th>`), `comparison factor ${factor} is missing`));
  }
  check(() => requireCondition(html.includes("A failed server or connection can interrupt every client that depends on that service."), "client-server availability needs a scoped consequence"));
  check(() => requireCondition(html.includes("A resource becomes unavailable when the peer providing it disconnects; other peers may still operate."), "peer availability must not be overstated"));

  const topologySample = contract.samples.find((sample) => sample.sampleId === "S2-SAMPLE-TOPOLOGIES");
  check(() => requireCondition(topologySample, "topology sample is missing from the contract"));
  check(() => requireCondition(topologySample.material.rendering === "imagegen-raster-plus-native-html", "topologies must use generated raster models plus native HTML explanation"));
  check(() => requireCondition(topologySample.material.promptSetPath === "scripts/course-v3-section2-topology-imagegen-prompts.json", "topology prompt-set provenance is missing"));
  check(() => requireCondition(topologySample.material.assets.length === 4, "topology contract must list four generated assets"));

  check(() => requireCondition(topologyPrompts.mode === "built-in ImageGen", "topology assets must record built-in ImageGen provenance"));
  check(() => requireCondition(topologyPrompts.sharedPolicy.technicalTextInImage === false, "generated topology images must not contain technical text"));
  check(() => requireCondition(topologyPrompts.sharedPolicy.pathArrowsInImage === false, "generated topology images must not contain path arrows"));
  check(() => requireCondition(topologyPrompts.sharedPolicy.failureOverlaysInImage === false, "generated topology images must not contain failure overlays"));
  check(() => requireCondition(Object.keys(topologyPrompts.finalPrompts).join("|") === "bus|star|mesh|hybrid", "topology prompt set is incomplete or out of order"));
  check(() => requireCondition(topologyPrompts.rejectedCandidates.length >= 2, "rejected generated candidates must remain auditable"));

  const topologyRules = {
    Bus: {
      key: "bus",
      altParts: ["four computers", "four short drop cables", "one shared backbone", "terminator at each end"],
    },
    Star: {
      key: "star",
      altParts: ["exactly four computers", "one central switch", "four separate computer-to-switch links"],
    },
    Mesh: {
      key: "mesh",
      altParts: ["four routers", "all six direct router-to-router links"],
    },
    Hybrid: {
      key: "hybrid",
      altParts: ["two switches", "two computers on each switch", "one inter-switch backbone link"],
    },
  };
  for (const [name, rule] of Object.entries(topologyRules)) {
    check(() => {
      const figure = topologyFigure(html, name);
      const expectedSrc = `../../assets/diagrams/course-v3-pilot/topology-${rule.key}-v2.png`;
      requireCondition(figure.includes(`src="${expectedSrc}"`), `${name} generated topology asset is not referenced`);
      requireCondition(occurrences(figure, /<img\s/g) === 1, `${name} topology must contain exactly one generated image`);
      requireCondition(!/<svg(?:\s|>)/.test(figure), `${name} topology has reverted to an inline vector diagram or overlay`);
      requireCondition(!/packet-path|failure-mark|alternate-path/.test(figure), `${name} topology contains a misleading path or failure overlay`);
      requireCondition(occurrences(figure, /<li>/g) === 3, `${name} packet path must use exactly three ordered steps`);
      for (const altPart of rule.altParts) requireCondition(figure.includes(altPart), `${name} alt text does not state invariant: ${altPart}`);

      const assetRecord = topologySample.material.assets.find((asset) => asset.topology === rule.key);
      requireCondition(assetRecord, `${name} topology asset is missing from the contract`);
      requireCondition(assetRecord.path === `web/assets/diagrams/course-v3-pilot/topology-${rule.key}-v2.png`, `${name} topology contract path is wrong`);
      requireCondition(sha256(topologyAssetBuffers[rule.key]) === assetRecord.sha256, `${name} topology asset hash does not match the reviewed contract`);
      const dimensions = pngDimensions(topologyAssetBuffers[rule.key]);
      requireCondition(dimensions.width === 1448 && dimensions.height === 1086, `${name} topology asset dimensions must be 1448×1086`);
    });
  }
  check(() => requireCondition(!/data-topology-mode|packet-path|failure-mark|alternate-path/.test(html), "legacy topology overlays or controls have returned"));
  check(() => requireCondition(!/topologyBoard|data-topology-mode/.test(js), "legacy topology interaction code has returned"));
  check(() => requireCondition(html.includes("topology-failure-table"), "topology failure effects need a native comparison table"));
  for (const statement of [
    "A backbone break can divide or stop the network.",
    "A failed central switch stops communication through that star.",
    "An alternative route may remain, but redundancy needs more links and ports.",
    "A failed switch affects its segment; a failed inter-switch link separates the two star segments.",
  ]) {
    check(() => requireCondition(html.includes(statement), `topology failure statement is missing: ${statement}`));
  }

  check(() => requireCondition(html.includes("../../assets/diagrams/course-v3-pilot/streaming-buffer-reservoir.png"), "streaming asset is not referenced"));
  for (const label of ["Incoming data rate", "Buffer level", "Playback bit rate"]) {
    check(() => requireCondition(html.includes(`>${label}</text>`), `deterministic streaming label ${label} is missing`));
  }
  check(() => requireCondition(html.includes("A buffer is temporary stored data, not extra broadband speed"), "streaming misconception boundary is missing"));
  check(() => requireCondition(html.includes("Incoming &gt; playback") && html.includes("Incoming &lt; playback"), "both streaming rate directions must be taught"));
  check(() => requireCondition(sha256(assetBuffer) === contract.samples[2].material.assetSha256, "streaming asset hash does not match the reviewed contract"));

  check(() => requireCondition(occurrences(html, /<article><header><span>[1-4]<\/span>/g) === 4, "practice must contain four mapped sample questions"));
  check(() => requireCondition(html.includes("id=\"past-paper-analysis\"") && html.includes("Equivalent task") && html.includes("Why the marks are earned"), "copyright-safe past-paper analysis is incomplete"));
  check(() => requireCondition(html.includes("The original Cambridge wording and mark scheme are not reproduced."), "public copyright boundary is missing"));
  check(() => requireCondition(contract.pastPaperAnalysis.sourceRef === "9618/11/M/J/24 Q2(e)(i)-(ii)", "past-paper source must match the officially verified paper"));
  check(() => requireCondition(contract.pastPaperAnalysis.reviewStatus === "official-question-and-mark-scheme-verified", "past-paper source and mark logic are not reviewed"));
  check(() => requireCondition(html.includes("9618/11/M/J/24 Q2(e)(i)–(ii), 3 marks"), "rendered past-paper source index or mark total is wrong"));
  check(() => requireCondition(html.includes(contract.pastPaperAnalysis.officialQuestionPaperUrl), "official question-paper access link is missing"));
  check(() => requireCondition(html.includes("continuous, ordered flow of bits along a communication path"), "bit-streaming mark logic is incomplete"));

  check(() => requireCondition(css.includes("@media (max-width: 640px)"), "mobile layout gate is missing"));
  check(() => requireCondition(css.includes(".reservoir-canvas { min-width: 720px; }"), "390px reservoir legibility/scroll rule is missing"));
  check(() => requireCondition(css.includes("overflow-x: auto"), "wide teaching materials need intentional horizontal scrolling"));
  check(() => requireCondition(occurrences(html, /class="scroll-cue"/g) === 4 && css.includes(".scroll-cue { display: block; }"), "390px wide materials need visible swipe cues"));

  return failures;
}

function loadCurrentSources() {
  for (const file of Object.values(paths)) requireCondition(fs.existsSync(file), `missing file: ${path.relative(root, file)}`);
  for (const file of Object.values(topologyAssetPaths)) requireCondition(fs.existsSync(file), `missing file: ${path.relative(root, file)}`);
  return {
    contract: JSON.parse(fs.readFileSync(paths.contract, "utf8")),
    topologyPrompts: JSON.parse(fs.readFileSync(paths.topologyPrompts, "utf8")),
    html: fs.readFileSync(paths.html, "utf8"),
    css: fs.readFileSync(paths.css, "utf8"),
    js: fs.readFileSync(paths.js, "utf8"),
    assetBuffer: fs.readFileSync(paths.asset),
    topologyAssetBuffers: Object.fromEntries(
      Object.entries(topologyAssetPaths).map(([topology, assetPath]) => [topology, fs.readFileSync(assetPath)]),
    ),
  };
}

function runMutationTests(sources) {
  const mutations = [
    ["missing bus topology image", { html: sources.html.replace("topology-bus-v2.png", "missing-bus.png") }],
    ["old vector overlay returned", { html: sources.html.replace("</figure>", "<svg class=\"packet-path\"></svg></figure>") }],
    ["changed star asset", { topologyAssetBuffers: { ...sources.topologyAssetBuffers, star: Buffer.from(sources.topologyAssetBuffers.star.subarray(0, -1)) } }],
    ["missing comparison table", { html: sources.html.replace("<table class=\"comparison-table\">", "<div class=\"comparison-table\">") }],
    ["missing streaming asset", { html: sources.html.replace("streaming-buffer-reservoir.png", "missing-reservoir.png") }],
    ["missing past-paper analysis", { html: sources.html.replace("id=\"past-paper-analysis\"", "id=\"removed-paper-analysis\"") }],
    ["legacy route returned", { html: `${sources.html}\nQuick route` }],
    ["mobile reservoir rule removed", { css: sources.css.replace(".reservoir-canvas { min-width: 720px; }", "") }],
  ];

  for (const [name, change] of mutations) {
    const failures = verifySamples({ ...sources, ...change });
    requireCondition(failures.length > 0, `mutation was not rejected: ${name}`);
  }
  return mutations.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sources = loadCurrentSources();
  const failures = verifySamples(sources);
  if (failures.length) {
    console.error(failures.map((failure) => `- ${failure}`).join("\n"));
    process.exit(1);
  }
  const mutationCount = process.argv.includes("--self-test") ? runMutationTests(sources) : 0;
  console.log(`Course V3 Section 2 sample verification passed${mutationCount ? `; ${mutationCount} negative mutations rejected` : ""}.`);
}
