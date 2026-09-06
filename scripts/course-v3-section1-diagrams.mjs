// Exact instructional diagrams: both grids and their annotations use the same data.
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
});

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
