import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const resources = [
  ["Glossary", "glossary.md", "English definitions with Chinese support."],
  ["Pseudocode and Java", "pseudocode-java-guide.md", "Cambridge exam notation beside supporting Java examples."],
  ["Common misconceptions", "common-misconceptions.md", "Frequent errors and the precise correction."],
  ["Marking conventions", "cambridge-ms-conventions.md", "Project rules for point-based Cambridge-style marking."],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let listType = null;

  const closeList = () => {
    if (listType) output.push(`</${listType}>`);
    listType = null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith("|")) {
      closeList();
      const tableLines = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      const rows = tableLines
        .filter((row) => !/^\|(?:\s*:?-+:?\s*\|)+$/.test(row))
        .map((row) => row.slice(1, -1).split("|").map((cell) => inlineMarkdown(cell.trim())));
      if (rows.length) {
        output.push("<div class=\"table-wrap\"><table><thead><tr>");
        output.push(rows[0].map((cell) => `<th>${cell}</th>`).join(""));
        output.push("</tr></thead><tbody>");
        output.push(rows.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join(""));
        output.push("</tbody></table></div>");
      }
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 4);
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*-\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const requiredType = unordered ? "ul" : "ol";
      if (listType !== requiredType) {
        closeList();
        listType = requiredType;
        output.push(`<${listType}>`);
      }
      output.push(`<li>${inlineMarkdown((unordered ?? ordered)[1])}</li>`);
      continue;
    }

    closeList();
    output.push(`<p>${inlineMarkdown(line)}</p>`);
  }
  closeList();
  return output.join("\n");
}

const cards = resources.map(([title, filename, description], index) => {
  const markdown = fs.readFileSync(path.join(root, "resources", filename), "utf8");
  return `<article class="resource-card" id="resource-${index + 1}"><details${index === 0 ? " open" : ""}><summary><span>${escapeHtml(title)}</span><small>${escapeHtml(description)}</small></summary><div class="resource-content">${renderMarkdown(markdown)}</div></details></article>`;
}).join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AS9618 Resource Centre</title><link rel="icon" href="data:"><link rel="stylesheet" href="./styles.css"></head>
<body><header class="topbar"><div><p class="eyebrow">Cambridge AS9618 Computer Science</p><h1>Resource centre</h1></div><a href="../">Course index</a></header>
<main><section class="intro"><h2>Reference material for teaching and self-study</h2><p>Open a resource when needed. Cambridge pseudocode remains the Paper 2 answer standard; Java is supporting practice only.</p></section><section class="resource-list">${cards}</section></main></body></html>`;

const styles = `:root{--bg:#f7f8fb;--panel:#fff;--ink:#172033;--muted:#667085;--line:#d9e0ea;--accent:#2563eb;--soft:#eff6ff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);line-height:1.6}.topbar{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(16px,4vw,48px);background:#fff;border-bottom:1px solid var(--line)}.topbar h1,.intro h2{margin:4px 0}.topbar a,a{color:var(--accent);font-weight:750}.eyebrow{margin:0;color:var(--accent);font-size:.78rem;font-weight:850;text-transform:uppercase;letter-spacing:.05em}main{width:min(1100px,100%);margin:auto;padding:28px clamp(12px,3vw,32px) 64px}.intro{margin-bottom:22px}.resource-list{display:grid;gap:14px}.resource-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;overflow:hidden}summary{display:grid;gap:3px;padding:18px 20px;cursor:pointer;background:#fff;color:var(--accent);font-weight:850}summary:hover,summary:focus{background:var(--soft)}summary small{color:var(--muted);font-weight:600}.resource-content{padding:4px 20px 24px;border-top:1px solid var(--line)}.resource-content h2,.resource-content h3,.resource-content h4{letter-spacing:0;margin-top:24px}.resource-content p{overflow-wrap:anywhere}.resource-content code{background:#eef2f6;border-radius:4px;padding:2px 5px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:620px}th,td{border:1px solid var(--line);padding:9px;text-align:left;vertical-align:top}th{background:#f4f7fa}@media(max-width:620px){.topbar{align-items:flex-start;flex-direction:column}.resource-content,summary{padding-left:14px;padding-right:14px}}@media print{.topbar{display:none}details:not([open])>*:not(summary){display:none}}`;

const outputDir = path.join(root, "web", "resources");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.html"), html);
fs.writeFileSync(path.join(outputDir, "styles.css"), `${styles}\n`);
console.log(`Generated resource hub from ${resources.length} Markdown files.`);
