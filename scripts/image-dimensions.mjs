import { readFileSync } from "node:fs";

export function imageDimensions(path) {
  const data = readFileSync(path);
  if (data.subarray(1, 4).toString("ascii") === "PNG") return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  if (data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) { offset += 1; continue; }
      const marker = data[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return { height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7) };
      if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
      const length = data.readUInt16BE(offset + 2);
      if (!length) break;
      offset += 2 + length;
    }
  }
  if (path.endsWith(".svg")) {
    const svg = data.toString("utf8");
    const dimensions = /<svg\b[^>]*\bwidth="(\d+)"[^>]*\bheight="(\d+)"/.exec(svg);
    if (dimensions && !/<script|<foreignObject|\bon\w+=|(?:href|src)="https?:/i.test(svg)) return { width: Number(dimensions[1]), height: Number(dimensions[2]) };
  }
  return null;
}
