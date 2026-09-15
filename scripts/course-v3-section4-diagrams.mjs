// Repo-native SVGs: arrow endpoints and labels are explicit and reviewable.
const start = (title, width, height) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${title}</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#14747b"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#142b45} .title{font-size:30px;font-weight:700}.label{font-size:24px;font-weight:700}.note{font-size:21px}.wire{fill:none;stroke:#14747b;stroke-width:3;marker-end:url(#arrow)}.box{fill:#edf6f8;stroke:#4c7185;stroke-width:2}</style><rect width="100%" height="100%" fill="white"/><text x="30" y="45" class="title">${title}</text>`;
const box = (x, y, w, h, title, lines = []) => `<rect class="box" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text x="${x + 18}" y="${y + 35}" class="label">${title}</text>${lines.map((line, i) => `<text x="${x + 18}" y="${y + 70 + i * 29}" class="note">${line}</text>`).join("")}`;

export const section4DiagramFiles = Object.freeze({
  "von-neumann.svg": `${start("One addressable memory holds instructions and data", 1120, 760)}
<rect class="box" x="30" y="85" width="430" height="335" rx="12"/><text x="55" y="125" class="label">CPU</text>
${box(55, 150, 175, 90, "CU", ["Directs work"])}${box(255, 150, 175, 90, "ALU", ["Calculates"])}
${box(55, 275, 375, 100, "Registers", ["Temporary processor state"])}
${box(690, 85, 400, 335, "Immediate access store (IAS)", ["Address 0: LDD 4 (encoded)", "Address 1: ADD 5 (encoded)", "Address 2: STO 6; 3: END", "Address 4: 18; address 5: 24", "Address 6: 0, then 42"])}
<path class="wire" data-from="CPU" data-to="IAS" d="M460 180 H690"/><text x="485" y="162" class="note">Address</text>
<path class="wire" marker-start="url(#arrow)" data-from="CPU" data-to="IAS" data-direction="both" d="M460 270 H690"/><text x="485" y="251" class="note">Data / instructions</text>
<path class="wire" marker-start="url(#arrow)" data-from="CPU" data-to="IAS" data-direction="both" d="M460 360 H690"/><text x="485" y="341" class="note">Control signals</text>
${box(690, 480, 400, 135, "Input/output interface", ["Connects external peripherals", "Exchanges data and signals"])}
<path class="wire" marker-start="url(#arrow)" d="M245 420 V550 H690"/><text x="290" y="530" class="note">System buses to the interface</text>
<text x="30" y="670" class="note">Programs change the stored instruction sequence; the CPU fetches each instruction.</text>
<text x="30" y="710" class="note">Instruction and data addresses belong to the same memory space in this model.</text></svg>`,
  "calculation-transfers.svg": `${start("Fetch each instruction, then execute its operation",1120,730)}
${box(30,85,440,115,"0: fetch LDD 4",["Read instruction 0 into CIR"])}${box(630,85,460,115,"Read operand at address 4",["MDR = 18 → ACC = 18"])}
<path class="wire" d="M470 145 H630"/><text x="489" y="124" class="note">execute</text>
${box(30,240,440,115,"1: fetch ADD 5",["Read instruction 1 into CIR"])}${box(630,240,460,115,"Read operand at address 5",["MDR = 24; ACC = 18 + 24 = 42"])}
<path class="wire" d="M470 300 H630"/><text x="489" y="279" class="note">execute</text>
${box(30,395,440,115,"2: fetch STO 6",["Read instruction 2 into CIR"])}${box(630,395,460,115,"Write result at address 6",["MAR = 6; MDR = 42; write"])}
<path class="wire" d="M470 455 H630"/><text x="489" y="434" class="note">execute</text>
${box(30,550,1060,105,"3: fetch END, then return control to the OS",["Final ACC = 42; IX = 0; Memory[6] = 42; source data unchanged."])}
<text x="30" y="700" class="note">Initial PC = 0, ACC = 0, IX = 0; Memory[4] = 18, Memory[5] = 24, Memory[6] = 0.</text></svg>`,
  "interrupt-context.svg": `${start("Save, service, restore, resume",1120,570)}
${box(30,100,320,250,"Interrupted program",["Next PC = 330","ACC = 18","IX = 4","Comparison = True"])}
${box(400,100,320,250,"ISR working state",["Runs the selected handler","ACC becomes 65","IX becomes 0","Comparison becomes False"])}
${box(770,100,320,250,"Restored program",["PC = 330","ACC = 18","IX = 4","Comparison = True"])}
<path class="wire" d="M350 225 H400"/><path class="wire" d="M720 225 H770"/>
${box(30,400,660,100,"Saved context remains available during service",["Return address, live registers and required status"])}
<path class="wire" d="M190 350 V400"/><path class="wire" d="M690 450 H930 V350"/>
<text x="30" y="548" class="note">Resume ADD #2 at 330: ACC becomes 20. Keeping the ISR value would wrongly give 67.</text></svg>`,
  "device-conditional.svg": `${start("Set motor enable only when ready",1120,820)}
${box(325,85,470,145,"Read and test a copy",["LDD 900; AND B00010000","CMP #0"])}
<path class="wire" d="M560 230 V265"/>
<path class="box" d="M560 265 L760 340 L560 415 L360 340 Z"/><text x="465" y="347" class="label">Result = 0?</text>
<path class="wire" d="M360 340 H80 V700 H345"/><text x="35" y="315" class="note">Yes: not ready</text>
<text x="110" y="510" class="note">No write;</text><text x="110" y="542" class="note">stored byte unchanged.</text>
<path class="wire" d="M760 340 H920 V460"/><text x="790" y="315" class="note">No: ready</text>
${box(770,460,315,155,"Reload, set and store",["LDD 900","OR B00000100; STO 900"])}
<path class="wire" d="M895 615 V700 H775"/>
${box(345,655,430,95,"DONE: END",["Both paths terminate"])}
<text x="30" y="795" class="note">8-bit model: ready = bit 4; motor = bit 2. The interface byte stays stable during this sequence.</text></svg>`,
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
