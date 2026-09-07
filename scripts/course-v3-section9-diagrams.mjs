// Named edges are executable: diagram verification follows the same arrows
// that the SVG renderer draws, then compares results with the pseudocode.
const n = (id, type, text, x, y, links = {}) => ({ id, type, text, x, y, ...links });
const selection = (key, title, input, condition, yes, no) => ({
  programKey: key, title, width: 960, height: 830,
  nodes: [n("start", "start", "START", 480, 130, { next: "input" }), n("input", "input", `INPUT ${input}`, 480, 250, { next: "test" }),
    n("test", "decision", condition, 480, 390, { yes: "yes", no: "no" }),
    n("yes", "output", `OUTPUT "${yes}"`, 240, 570, { next: "end" }), n("no", "output", `OUTPUT "${no}"`, 720, 570, { next: "end" }), n("end", "end", "END", 480, 720)],
});
export const section9Flowcharts = {
  passDecision: selection("passDecision", "A mark selects one of two outcomes", "Mark", "Mark >= 50", "Pass", "Resit"),
  age: selection("age", "Adults include everyone aged 18 or over", "Age", "Age >= 18", "Adult", "Minor"),
  cold: selection("cold", "A frost warning depends on temperature", "Temperature", "Temperature < 0", "Frost", "Clear"),
  refill: selection("refill", "Refill only below the stated level", "Level", "Level < 20", "Refill", "No action"),
  height: selection("height", "Check the minimum height for entry", "Height", "Height >= 120", "Enter", "Wait"),
  countdown: {
    programKey: "countdown", title: "A loop returns to its condition", width: 960, height: 1040,
    nodes: [n("start", "start", "START", 480, 125, { next: "input" }), n("input", "input", "INPUT Count", 480, 235, { next: "test" }),
      n("test", "decision", "Count > 0", 480, 375, { yes: "output", no: "finished" }), n("output", "output", "OUTPUT Count", 480, 535, { next: "decrement" }),
      n("decrement", "process", "Count <- Count - 1", 480, 655, { next: "test" }), n("finished", "output", 'OUTPUT "Finished"', 480, 825, { next: "end" }), n("end", "end", "END", 480, 950)],
    paths: { "test:finished": "M660 375H850V825H647.5", "decrement:test": "M300 655H130V375H300" },
  },
  sumFour: {
    programKey: "sumFour", title: "Four inputs contribute to one total", width: 960, height: 1250,
    nodes: [n("start", "start", "START", 480, 120, { next: "initialise" }), n("initialise", "process", "Total <- 0\nIndex <- 1", 480, 250, { next: "test" }),
      n("test", "decision", "Index <= 4", 480, 400, { yes: "input", no: "output" }), n("input", "input", "INPUT Value", 480, 560, { next: "add" }),
      n("add", "process", "Total <- Total + Value", 480, 690, { next: "increment" }), n("increment", "process", "Index <- Index + 1", 480, 820, { next: "test" }),
      n("output", "output", "OUTPUT Total", 480, 1030, { next: "end" }), n("end", "end", "END", 480, 1160)],
    paths: { "test:output": "M660 400H850V1030H647.5", "increment:test": "M300 820H130V400H300" },
  },
};
const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const shape = (node) => {
  const { type, text, x, y } = node;
  const geometry = type === "decision" ? `<polygon points="0,-80 180,0 0,80 -180,0"/>`
    : ["input", "output"].includes(type) ? `<polygon points="-155,-40 180,-40 155,40 -180,40"/>`
    : `<rect x="-180" y="-40" width="360" height="80" rx="${["start", "end"].includes(type) ? 40 : 0}"/>`;
  const lines = text.split("\n");
  return `<g data-node="${node.id}" transform="translate(${x} ${y})" fill="${type === "decision" ? "#e4f3ee" : "#eef4fb"}" stroke="#244b65" stroke-width="2">${geometry}<text text-anchor="middle" fill="#142f45" stroke="none" font-size="23">${lines.map((line, i) => `<tspan x="0" y="${8 + (i - (lines.length - 1) / 2) * 28}">${esc(line)}</tspan>`).join("")}</text></g>`;
};
function renderGraph(g) {
  const edges = g.nodes.flatMap((a) => ["next", "yes", "no"].filter((kind) => a[kind]).map((kind) => {
    const b = g.nodes.find((node) => node.id === a[kind]);
    const custom = g.paths?.[`${a.id}:${b.id}`];
    const startY = a.y + (a.type === "decision" ? 80 : 40), endY = b.y - (b.type === "decision" ? 80 : 40);
    const path = custom ?? `M${a.x} ${startY}V${(startY + endY) / 2}H${b.x}V${endY}`;
    const labelX = custom && kind === "no" ? 745 : a.x === b.x ? a.x + 38 : (a.x + b.x) / 2;
    const labelY = custom ? a.y - 14 : (startY + endY) / 2 - 12;
    return `<g data-from="${a.id}" data-to="${b.id}" data-branch="${kind}"><path d="${path}" fill="none" stroke="#286477" stroke-width="3" marker-end="url(#arrow)"/>${kind === "next" ? "" : `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="24" fill="#163e4f">${kind === "yes" ? "Yes" : "No"}</text>`}</g>`;
  })).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(g.width * 1.25)}" height="${Math.round(g.height * 1.25)}" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-labelledby="title desc"><title id="title">${esc(g.title)}</title><desc id="desc">${esc(graphFacts(g).join(" "))}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#286477"/></marker></defs><rect width="100%" height="100%" fill="white"/><g font-family="Arial, Helvetica, sans-serif"><text x="480" y="50" text-anchor="middle" font-size="29" font-weight="700" fill="#15354d">${esc(g.title)}</text>${edges}${g.nodes.map(shape).join("")}</g></svg>`;
}
function graphFacts(g) {
  return g.nodes.map((a) => a.type === "decision" ? `${a.text}: Yes leads to ${g.nodes.find((b) => b.id === a.yes).text}; No leads to ${g.nodes.find((b) => b.id === a.no).text}.` : `${a.text.replaceAll("\n", "; ")}${a.next ? `; next: ${g.nodes.find((b) => b.id === a.next).text.replaceAll("\n", "; ")}` : "."}`);
}
export const diagramPath = (key) => `/assets/course-v3/section-9/${key}.svg`;
export function diagramFor(key) {
  const g = section9Flowcharts[key];
  if (!g) throw new Error(`Unknown S9 flowchart ${key}`);
  return { type: "reviewed-visual", asset: diagramPath(key), title: g.title, facts: graphFacts(g), alt: graphFacts(g).join(" "), review: "reviewed", caption: "Follow one labelled branch at each decision. The arrows show the next operation, including any return to a loop condition." };
}
export function section9DiagramFiles() {
  const legend = { title: "Use a different symbol for each operation", width: 960, height: 760 };
  return {
    ...Object.fromEntries(Object.entries(section9Flowcharts).map(([key, g]) => [`${key}.svg`, renderGraph(g)])),
    "symbols.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="950" viewBox="0 0 960 760" role="img" aria-labelledby="title"><title id="title">${legend.title}</title><rect width="960" height="760" fill="white"/><g font-family="Arial, Helvetica, sans-serif"><text x="40" y="55" font-size="32" fill="#15354d">${legend.title}</text>${[n("start","start","START / END",240,150),n("io","input","INPUT / OUTPUT",240,280),n("assignment","process","Total <- Price * Quantity",240,410),n("decision","decision","Mark >= 50",240,585)].map(shape).join("")}<g fill="#244b65" font-size="26"><text x="470" y="160">Terminator: begin or finish</text><text x="470" y="290">Parallelogram: input or output</text><text x="470" y="420">Rectangle: processing</text><text x="470" y="590">Diamond: labelled Yes/No paths</text><text x="40" y="715">Flow lines have arrowheads showing the direction of execution.</text></g></g></svg>`,
  };
}
