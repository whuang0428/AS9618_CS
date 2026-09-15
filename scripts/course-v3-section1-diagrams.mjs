// Exact instructional diagrams: both grids and their annotations use the same data.
import { samplingExample, soundTrace, vectorExample, rleExample } from './course-v3-section1-examples.mjs';
const escape = (text) => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const text = (x, y, value, size = 26) => `<text x="${x}" y="${y}" font-size="${size}">${escape(value)}</text>`;
const shell = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title><rect width="1280" height="800" fill="#fbfcfd"/><g font-family="Arial, sans-serif" fill="#17243a">${text(48, 65, title, 40)}${body}</g></svg>\n`;

export const bitmapExample = {
  width: 10, height: 6, depth: 2,
  palette: ["#123b68", "#24848b", "#db9b38", "#eaf3f4"],
  pixels: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 3, 2, 3, 3, 2, 3, 3, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
};

const bitmapSvg = () => {
  const { width, height, depth, pixels, palette } = bitmapExample;
  const grids = ["encoded", "decoded"].map((role, grid) => `<g data-grid="${role}">${pixels.flatMap((row, y) => row.map((value, x) => {
    const left = (grid ? 752 : 48) + x * 44;
    const top = 260 + y * 48;
    return `<rect data-pixel="${x},${y}" data-value="${value}" x="${left}" y="${top}" width="44" height="48" fill="${grid ? palette[value] : "#ffffff"}" stroke="#91a3b7"/>${grid ? "" : text(left + 7, top + 32, value.toString(2).padStart(depth, "0"), 24)}`;
  })).join("")}</g>`).join("");
  return shell("A bitmap: from stored codes to the same pixel grid", [
    `<rect x="48" y="100" width="1184" height="94" rx="8" fill="#edf3f8"/>`,
    text(72, 138, `Header: width ${width} pixels · height ${height} pixels · colour depth ${depth} bits`),
    text(72, 176, "The palette defines which colour each two-bit code selects."),
    text(48, 234, "Ordered pixel codes: 10 × 6"), text(752, 234, "Reconstructed image: 10 × 6"),
    grids,
    `<path d="M520 395 H714 M694 381 L714 395 L694 409" fill="none" stroke="#16747c" stroke-width="5"/>`,
    text(535, 350, "Decode", 25), text(530, 450, "in order", 25),
    text(48, 598, "60 pixels × 2 bits = 120 bits = 15 bytes of pixel data."),
    ...palette.map((colour, i) => `<rect x="${48 + i * 300}" y="635" width="48" height="48" fill="${colour}" stroke="#91a3b7"/>${text(112 + i * 300, 667, `${i.toString(2).padStart(2, "0")} → colour ${i}`)}`),
    text(48, 744, "Every code keeps its row, column and colour. Header and palette size are excluded.", 25),
  ].join(""));
};

export const depthPanels = [1, 2, 4].map((bits) => {
  const colours = 2 ** bits;
  const palette = Array.from({ length: colours }, (_, value) => {
    const gray = Math.round(255 * value / (colours - 1)).toString(16).padStart(2, "0");
    return `#${gray}${gray}${gray}`;
  });
  return { bits, palette, pixels: Array.from({ length: 8 }, (_, y) => Array.from({ length: 8 }, (_, x) => Math.floor(((x + 2 * y) % 16) * colours / 16))) };
});

const depthSvg = () => shell("Colour depth changes the number of available colours", [
  text(48, 120, "The same 8 × 8 source pattern is represented with different numbers of grey levels."),
  ...depthPanels.map(({ bits, palette, pixels }, i) => {
    const left = 48 + 416 * i;
    return `<g data-depth="${bits}">${text(left, 190, `${bits} ${bits === 1 ? "bit" : "bits"} → ${palette.length} colours`, 31)}${pixels.flatMap((row, y) => row.map((value, x) => `<rect data-pixel="${x},${y}" data-value="${value}" x="${left + x * 40}" y="${230 + y * 40}" width="40" height="40" fill="${palette[value]}"/>`)).join("")}<rect x="${left}" y="230" width="320" height="320" fill="none" stroke="#91a3b7"/>${text(left, 605, `64 × ${bits} = ${64 * bits} bits`)}${text(left, 644, `${8 * bits} bytes of pixel data`)}</g>`;
  }),
  text(48, 722, "n bits per pixel → 2ⁿ possible colours. Resolution stays at 64 pixels in every panel.", 25),
  text(48, 767, "More colour levels preserve finer tonal differences. Sizes exclude headers and palettes.", 25),
].join(""));

export const section1DiagramFiles = () => ({
  "bitmap-composition.svg": bitmapSvg(),
  "colour-depth.svg": depthSvg(),
  "vector-drawing.svg": vectorSvg(),
  "sound-sampling.svg": samplingSvg(),
  "sampling-rate.svg": rateSvg(),
  "sampling-resolution.svg": resolutionSvg(),
  "rle-roundtrip.svg": rleSvg(),
});

const vectorSvg = () => {
  const { width, height, objects, scale } = vectorExample;
  const panel = (left, top, factor, pixelsPerUnit) => {
    const unit = pixelsPerUnit;
    const graphic = objects.map(o => o.type === 'rectangle'
      ? `<rect data-object="rectangle" x="${o.x * factor}" y="${o.y * factor}" width="${o.width * factor}" height="${o.height * factor}" fill="${o.fill}"/>`
      : `<line data-object="line" x1="${o.x1 * factor}" y1="${o.y1 * factor}" x2="${o.x2 * factor}" y2="${o.y2 * factor}" stroke="${o.stroke}" stroke-width="${o.thickness * factor}"/>`).join('');
    return `<g transform="translate(${left},${top})"><rect width="${width * factor * unit}" height="${height * factor * unit}" fill="#edf3f8" stroke="#91a3b7"/><g transform="scale(${unit})">${graphic}</g>${text(0, -15, '(0,0)', 24)}${text(width * factor * unit - 100, -15, 'x →', 24)}${text(-35, 80, 'y ↓', 24)}</g>`;
  };
  return shell('Reconstruct a vector drawing, then scale its geometry', [
    text(48, 125, '1. Blue rectangle: top-left (10,10), width 40, height 20; no outline.'),
    text(48, 166, '2. Black line: (10,30) to (50,30), thickness 2; drawn last.'),
    text(80, 235, 'Original: 60 × 45 units', 30), text(630, 235, 'Scale factor 2: 120 × 90 units', 30),
    panel(80, 295, 1, 4), panel(630, 295, scale, 4),
    text(80, 515, 'Rectangle: (10,10) → (50,30)'),
    text(80, 556, 'The line covers its lower edge.'),
    text(630, 700, 'Rectangle: (20,20), size 80 × 40'),
    text(48, 763, 'Coordinates, dimensions and stroke width all double. Scaled line: (20,60) → (100,60), width 4.', 24),
  ].join(''));
};

const graph = ({ left, top, width, height, samples, levels, labels = false }) => {
  const x = time => left + time * width;
  const y = value => top + height * (4 - value) / 8;
  const grid = levels.map(level => `<path d="M${left} ${y(level)} H${left + width}" stroke="#d4e0e9"/>${text(left - 42, y(level) + 8, level, 23)}`).join('');
  const trace = `<polyline points="${soundTrace.map(s => `${x(s.time)},${y(s.value)}`).join(' ')}" fill="none" stroke="#9a5727" stroke-width="3"/>`;
  const dots = samples.map(s => `<path d="M${x(s.time)} ${top + height} V${y(s.value)}" stroke="#1765a0" stroke-width="2" stroke-dasharray="5 5"/><circle data-time="${s.time}" data-level="${s.value}" cx="${x(s.time)}" cy="${y(s.value)}" r="7" fill="#1765a0"/>${labels ? text(x(s.time) + 10, y(s.value) - 12, s.code, 26) : ''}`).join('');
  return `${grid}<path d="M${left} ${top} V${top + height} H${left + width}" stroke="#17243a" fill="none" stroke-width="2"/>${trace}${dots}${[0, .25, .5, .75, 1].map(t => text(x(t) - 15, top + height + 34, t, 23)).join('')}${text(left + width - 135, top + height + 65, 'Time (s)', 23)}`;
};

const samplingSvg = () => shell('Sample → quantise → encode → decode', [
  text(48, 120, '4 Hz · 3 bits per sample · levels −4 to +3 · code value = level + 4'),
  text(48, 165, 'Brown: analogue teaching trace. Blue: quantised samples and their stored codes.', 25),
  graph({ left: 105, top: 205, width: 1090, height: 315, levels: samplingExample.levels, labels: true, samples: samplingExample.samples.map(s => ({ time: s.time, value: s.level, code: s.code })) }),
  ...[['Time (s)', s => s.time.toFixed(2)], ['Measured', s => s.measured], ['Decoded', s => s.level]].map(([label, value], row) =>
    text(48, 634 + row * 45, label, 27) + samplingExample.samples.map((sample, col) => text(330 + col * 260, 634 + row * 45, value(sample), 27)).join('')),
  text(48, 771, 'The four codes occupy 12 sample-data bits. Decoding recovers levels, not the original trace.', 24),
].join(''));

const rateSvg = () => shell('More sampling times; the amplitude levels stay fixed', [
  text(48, 120, 'Same source trace, input range and eight allowed levels in both panels.'),
  text(55, 165, '4 Hz: four samples, spaced 0.25 s apart', 27),
  graph({ left: 105, top: 190, width: 1090, height: 180, levels: samplingExample.levels, samples: soundTrace.filter((s, i) => i < 8 && i % 2 === 0).map(s => ({ time: s.time, value: Math.round(s.value) })) }),
  text(55, 480, '8 Hz: eight samples, spaced 0.125 s apart', 27),
  graph({ left: 105, top: 505, width: 1090, height: 180, levels: samplingExample.levels, samples: soundTrace.slice(0, 8).map(s => ({ time: s.time, value: Math.round(s.value) })) }),
  text(48, 781, 'Samples are taken at 0 ≤ t < 1 s. Brown is the source; blue points are quantised values.', 23),
].join(''));

const resolutionSvg = () => {
  const levels2 = [-3, -1, 1, 3];
  const nearest = (value, levels) => levels.reduce((best, next) => Math.abs(value - next) <= Math.abs(value - best) ? next : best);
  const panels = [levels2, samplingExample.levels].map((levels, i) => {
    const left = 100 + i * 620;
    return `${text(left - 35, 190, `${i + 2} bits: ${levels.length} allowed levels`, 30)}${graph({ left, top: 235, width: 465, height: 320, levels, samples: samplingExample.samples.map(s => ({ time: s.time, value: nearest(s.measured, levels) })) })}${text(left - 30, 670, `1.6 → ${nearest(1.6, levels)}; error ${i ? '0.4' : '0.6'}`, 28)}`;
  });
  return shell('More amplitude levels; the sample times stay fixed', [
    text(48, 125, 'Same four measurements and same input range −4 to +4 in both panels.'),
    ...panels,
    text(48, 738, 'Four samples: 8 bits of data on the left, 12 bits on the right.', 26),
    text(48, 780, 'Some values round to the same level in both models; smaller spacing can reduce error.', 24),
  ].join(''));
};

const rleSvg = () => {
  const { source, runs, countBits, valueBits, counterexample, counterRuns } = rleExample;
  let position = 0;
  const colours = ['#edf3f8', '#e5f3ee', '#fff0cf', '#eeeaf9'];
  const groups = runs.map(([count, value], index) => {
    const start = position;
    position += count;
    const cells = Array.from({ length: count }, (_, i) => `<rect x="${48 + (start + i) * 72}" y="200" width="72" height="66" fill="${colours[index]}" stroke="#91a3b7"/>${text(71 + (start + i) * 72, 244, value, 32)}`).join('');
    return `<g data-run="${index}" data-count="${count}" data-value="${value}">${cells}${text(48 + start * 72, 309, `${count} × ${value}`, 28)}</g>`;
  });
  return shell('RLE preserves every consecutive run in its original order', [
    text(48, 130, `Source: ${source.length} characters × ${valueBits} bits = ${source.length * valueBits} bits`), ...groups,
    text(48, 381, `Encode → ${runs.map(([n, v]) => `(${n}, ${v})`).join('   ')}`, 34),
    text(48, 441, `Stored: ${runs.length} pairs × (${countBits}-bit count + ${valueBits}-bit value) = ${runs.length * (countBits + valueBits)} bits`),
    text(48, 513, `Decode → ${runs.map(([n, v]) => v.repeat(n)).join(' | ')}`, 33),
    text(48, 563, 'Remove the guide separators: the original ordered text is recovered exactly.', 25),
    `<rect x="48" y="605" width="1184" height="116" rx="10" fill="#fff0cf"/>`,
    text(70, 650, `Counterexample: ${counterexample} → ${counterRuns.map(([n, v]) => `(${n}, ${v})`).join('  ')}`, 29),
    text(70, 693, '24 source bits become 48 encoded bits: short runs can increase size.', 28),
    text(48, 773, 'All costs exclude headers. Human-readable pair labels stand for fixed binary fields.', 25),
  ].join(''));
};

const material = (asset, title, facts) => ({
  type: "reviewed-visual", title, asset: `/assets/course-v3/section-1/${asset}.svg`,
  facts, alt: facts.join(" "), review: "data-verified-svg",
});
export const section1DiagramMaterials = {
  "S1.08-BITMAP-STRUCTURE": material("bitmap-composition", "Decode every pixel at its original position", [
    "A ten-column, six-row bitmap stores sixty two-bit pixel codes and uses a four-colour palette.",
    "Each decoded colour is placed at the same row and column as its stored code; both grids have exactly sixty pixels.",
    "The pixel data needs 120 bits or 15 bytes, excluding the header and palette.",
  ]),
  "S1.08-COLOUR-DEPTH": material("colour-depth", "Compare colour depth at a fixed image resolution", [
    "Each panel has the same eight-by-eight pixel grid, so its image resolution is unchanged.",
    "One, two and four bits per pixel select from exactly two, four and sixteen grey levels respectively.",
    "Greater depth represents finer tonal differences and increases uncompressed pixel-data size.",
  ]),
};
