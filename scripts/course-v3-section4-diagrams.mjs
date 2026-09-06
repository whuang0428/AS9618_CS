// Repo-native SVGs: arrow endpoints and labels are explicit and reviewable.
const start = (title, width, height) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${title}</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#14747b"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#142b45} .title{font-size:30px;font-weight:700}.label{font-size:24px;font-weight:700}.note{font-size:21px}.wire{fill:none;stroke:#14747b;stroke-width:3;marker-end:url(#arrow)}.box{fill:#edf6f8;stroke:#4c7185;stroke-width:2}</style><rect width="100%" height="100%" fill="white"/><text x="30" y="45" class="title">${title}</text>`;
const box = (x, y, w, h, title, lines = []) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text x="${x + 18}" y="${y + 35}" class="label">${title}</text>${lines.map((line, i) => `<text x="${x + 18}" y="${y + 70 + i * 29}" class="note">${line}</text>`).join("")}`;

export const section4DiagramFiles = Object.freeze({
  "von-neumann.svg": `${start("One addressable memory holds instructions and data", 1120, 540)}
<rect class="box" x="30" y="85" width="430" height="335" rx="12"/><text x="55" y="125" class="label">CPU</text>
${box(55, 150, 175, 90, "CU", ["Directs work"])}${box(255, 150, 175, 90, "ALU", ["Calculates"])}
${box(55, 275, 375, 100, "Registers", ["Temporary processor state"])}
${box(690, 85, 400, 335, "Immediate access store (IAS)", ["Address 100: encoded instruction", "Address 101: encoded instruction", "Address 102: encoded instruction", "Address 300: data value", "Address 301: data value"])}
<path class="wire" data-from="CPU" data-to="IAS" d="M460 180 H690"/><text x="485" y="162" class="note">Address</text>
<path class="wire" marker-start="url(#arrow)" data-from="CPU" data-to="IAS" data-direction="both" d="M460 270 H690"/><text x="485" y="251" class="note">Data / instructions</text>
<path class="wire" marker-start="url(#arrow)" data-from="CPU" data-to="IAS" data-direction="both" d="M460 360 H690"/><text x="485" y="341" class="note">Control signals</text>
<text x="30" y="468" class="note">Programs change the stored instruction sequence; the CPU fetches each instruction.</text>
<text x="30" y="503" class="note">Instruction and data addresses belong to the same memory space in this model.</text></svg>`,
  "fetch-transfers.svg": `${start("Fetch one instruction: keep addresses and instructions distinct", 1160, 520)}
${box(30, 125, 150, 120, "PC", ["Next address"])}${box(265, 125, 155, 120, "MAR", ["Address"])}${box(500, 125, 180, 120, "Memory", ["Instruction"])}${box(760, 125, 155, 120, "MDR", ["Instruction"])}${box(990, 125, 145, 120, "CIR", ["Instruction"])}
<path class="wire" data-from="PC" data-to="MAR" d="M180 185 H265"/><text x="204" y="164" class="label">1</text>
<path class="wire" data-from="MAR" data-to="Memory" d="M420 185 H500"/><text x="445" y="164" class="label">2</text>
<path class="wire" data-from="Memory" data-to="MDR" d="M680 185 H760"/><text x="705" y="164" class="label">3</text>
<path class="wire" data-from="MDR" data-to="CIR" d="M915 185 H990"/><text x="939" y="164" class="label">4</text>
<text x="30" y="300" class="note">1. MAR ← [PC]</text><text x="380" y="300" class="note">2. Address bus selects memory; CU sends read.</text>
<text x="30" y="344" class="note">3. MDR ← [[MAR]]</text><text x="380" y="344" class="note">4. CIR ← [MDR]</text>
<text x="30" y="390" class="note">After copying the current address, advance PC to the next instruction (PC ← [PC] + 1 here).</text>
<text x="30" y="424" class="note">Decode the instruction in CIR; execution depends on that instruction.</text></svg>`,
});
