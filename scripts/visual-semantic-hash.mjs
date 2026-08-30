import crypto from "node:crypto";
import path from "node:path";

const visualHint = /(?:diagram|visual|topology|flowchart|architecture|cycle|journey|gate|pipeline|entity|relationship|network-map|storage-media|peer-visual|concept-svg)/i;
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function directSections(source) {
  const sections = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  let match;
  while ((match = tags.exec(source))) {
    const tag = match[1].toLowerCase();
    const closing = match[0].startsWith("</");
    const selfClosing = match[0].endsWith("/>") || voidTags.has(tag);
    if (!closing && !selfClosing) {
      stack.push({ tag, start: match.index, openEnd: tags.lastIndex, id: match[0].match(/\bid="([^"]+)"/)?.[1] ?? "" });
    } else if (closing) {
      const openIndex = stack.map((item) => item.tag).lastIndexOf(tag);
      if (openIndex < 0) continue;
      const [open] = stack.splice(openIndex, 1);
      if (tag === "section" && open.id) {
        sections.push({ id: open.id, content: source.slice(open.openEnd, match.index) });
      }
    }
  }
  return sections;
}

function outerElement(source, start, tagName) {
  if (voidTags.has(tagName)) return source.slice(start).match(new RegExp(`^<${tagName}\\b[^>]*>`, "i"))?.[0] ?? "";
  const tags = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tags.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tags.exec(source))) {
    if (match[0].startsWith("</")) depth -= 1;
    else if (!match[0].endsWith("/>")) depth += 1;
    if (depth === 0) return source.slice(start, tags.lastIndex);
  }
  return source.slice(start).match(new RegExp(`^<${tagName}\\b[^>]*>`, "i"))?.[0] ?? "";
}

function assetPath(lesson, source) {
  const clean = source.split(/[?#]/, 1)[0];
  return path.posix.normalize(path.posix.join(`web/lesson-${lesson}`, clean));
}

export function scanVisualSemanticHashes(readText, readBinary, { lessonCount = 151 } = {}) {
  const records = [];
  const seen = new Set();
  for (let number = 1; number <= lessonCount; number += 1) {
    const lesson = String(number).padStart(3, "0");
    const html = readText(`web/lesson-${lesson}/index.html`);
    const css = readText(`web/lesson-${lesson}/styles.css`);
    for (const section of directSections(html)) {
      const content = section.content;
      const tags = [...content.matchAll(/<(svg|img|canvas|figure|[a-z][a-z0-9-]*)\b([^>]*)>/gi)];
      let ordinal = 0;
      for (const match of tags) {
        const tagName = match[1].toLowerCase();
        const tag = match[0];
        const semantic = ["svg", "img", "canvas", "figure"].includes(tagName)
          || /\brole="img"/.test(tag)
          || visualHint.test(tag.match(/\bclass="([^"]*)"/)?.[1] ?? "");
        if (!semantic) continue;
        if (tagName === "figure" && /<(?:svg|img|canvas)\b/i.test(content.slice(match.index))) continue;
        ordinal += 1;
        const visualId = tag.match(/\bid="([^"]+)"/)?.[1] ?? `${section.id}-${tagName}-${ordinal}`;
        const key = `${lesson}/${visualId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const outer = outerElement(content, match.index, tagName);
        let asset = "";
        let assetSha256 = "";
        if (tagName === "img") {
          const source = tag.match(/\bsrc="([^"]+)"/)?.[1] ?? "";
          if (source && !/^(?:data:|https?:)/.test(source)) {
            asset = assetPath(lesson, source);
            assetSha256 = sha256(readBinary(asset));
          }
        }
        records.push({ key, lesson, visualId, sectionId: section.id, tagName, asset, assetSha256, sectionHash: sha256(section.content), semanticHash: sha256(`${outer}\n${assetSha256}`) });
      }
    }
    for (const match of css.matchAll(/\.([a-z][a-z0-9_-]*(?:visual|diagram|topology|flowchart|cycle|journey|gate)[a-z0-9_-]*)::(?:before|after)\b/gi)) {
      const visualId = `css-${match[1]}`;
      const key = `${lesson}/${visualId}`;
      if (seen.has(key)) continue;
      seen.add(key);
      records.push({ key, lesson, visualId, sectionId: "css", tagName: "css", asset: "", assetSha256: "", sectionHash: sha256(match[0]), semanticHash: sha256(match[0]) });
    }
  }
  return records;
}
