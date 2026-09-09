// Exact question stimuli: show the supplied links without revealing a route or answer.
const start = (title, description) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 960 540" role="img" aria-labelledby="title description">
<title id="title">${title}</title><desc id="description">${description}</desc>
<style>text{font-family:Arial,sans-serif;fill:#183047;text-anchor:middle}.title{font-size:30px;font-weight:700}.note{font-size:22px}.node-label{font-size:30px;font-weight:700}.link{stroke:#176b69;stroke-width:4;fill:none}.host,.router{fill:white;stroke:#183047;stroke-width:3}.switch{fill:#183047}.switch-label{fill:white}</style>
<rect width="960" height="540" fill="#f8fbfc"/>
<text x="480" y="48" class="title">${title}</text>`;
const link = (id, x1, y1, x2, y2) => `<line class="link" data-link="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const device = (id, x, y, isSwitch = false) => `<g data-node="${id}"><rect class="${isSwitch ? "switch" : "host"}" x="${x}" y="${y}" width="${isSwitch ? 88 : 110}" height="${isSwitch ? 72 : 64}" rx="8"/><text class="node-label${isSwitch ? " switch-label" : ""}" x="${x + (isSwitch ? 44 : 55)}" y="${y + (isSwitch ? 46 : 42)}">${id}</text></g>`;
const router = (id, x, y) => `<g data-node="${id}"><circle class="router" cx="${x}" cy="${y}" r="40"/><text class="node-label" x="${x}" y="${y + 10}">${id}</text></g>`;
const networkDevice = (id, x, y, width, labels) => `<g data-node="${id}"><rect class="host" x="${x}" y="${y}" width="${width}" height="90" rx="8"/>${labels.map((label, index) => `<text class="note" x="${x + width / 2}" y="${y + (labels.length === 1 ? 53 : 37 + index * 30)}">${label}</text>`).join("")}</g>`;

export const section2DiagramFiles = Object.freeze({
  "question-wireless-server.svg": `${start("Wireless laptop and a server on another network", "A laptop containing a WNIC has a wireless link to a WAP. Wired links connect the WAP to a switch, the switch to a router and the router to the server's network. No packet route is highlighted.")}
<rect x="20" y="115" width="920" height="230" rx="12" fill="#e6f3f0"/>
<text x="120" y="155" class="note">Source LAN</text>
<rect x="520" y="365" width="420" height="155" rx="12" fill="#e6f3f0"/>
<text x="650" y="395" class="note">Other network</text>
<line class="link" data-link="WNIC-WAP" x1="210" y1="265" x2="290" y2="265" stroke-dasharray="10 8"/>
${link("WAP-Switch", 430, 265, 500, 265)}${link("Switch-Router", 640, 265, 720, 265)}${link("Router-Server", 800, 310, 800, 415)}
${networkDevice("WNIC", 40, 220, 170, ["Laptop", "with WNIC"])}${networkDevice("WAP", 290, 220, 140, ["WAP"])}${networkDevice("Switch", 500, 220, 140, ["Switch"])}${networkDevice("Router", 720, 220, 160, ["Router"])}${networkDevice("Server", 720, 415, 160, ["Server"])}
<text x="320" y="425" class="note">Dashed line: wireless link</text>
<text x="320" y="463" class="note">Solid line: wired link</text>
</svg>`,
  "question-pstn-access.svg": `${start("Telephone-line access", "The home laptop, LAN switch, router and home modem are connected in sequence. A telephone-line PSTN connection joins the home modem to a provider modem, which connects to the provider network. Router and modem functions are shown separately.")}
<rect x="20" y="110" width="920" height="195" rx="12" fill="#e6f3f0"/>
<text x="90" y="150" class="note">Home</text>
<rect x="425" y="365" width="515" height="165" rx="12" fill="#e6f3f0"/>
<text x="505" y="397" class="note">Provider</text>
${link("Laptop-Switch", 190, 230, 255, 230)}${link("Switch-Router", 405, 230, 470, 230)}${link("Router-HomeModem", 620, 230, 710, 230)}
${link("HomeModem-ProviderModem", 800, 275, 800, 420)}${link("ProviderModem-ProviderNetwork", 710, 465, 620, 465)}
${networkDevice("Laptop", 40, 185, 150, ["Laptop"])}${networkDevice("Switch", 255, 185, 150, ["LAN switch"])}${networkDevice("Router", 470, 185, 150, ["Router"])}${networkDevice("HomeModem", 710, 185, 180, ["Home modem"])}
${networkDevice("ProviderModem", 710, 420, 180, ["Provider", "modem"])}${networkDevice("ProviderNetwork", 450, 420, 170, ["Provider", "network"])}
<text x="580" y="343" class="note">Telephone line / PSTN</text>
<text x="210" y="430" class="note">Router and modem</text>
<text x="210" y="465" class="note">shown separately</text>
</svg>`,
  "question-star-mesh.svg": `${start("Star + mesh network", "Computers A and B connect separately to switch S1. Computers C and D connect separately to S2. The three inter-switch links are S1–S2, S1–S3 and S2–S3. All links are shown before the failure.")}
<text x="480" y="85" class="note">All links are shown before the failure.</text>
<text x="480" y="120" class="note">A–D: computers · S1–S3: switches</text>
${link("A-S1", 150, 187, 260, 270)}${link("B-S1", 150, 377, 260, 298)}
${link("S1-S2", 348, 284, 612, 284)}${link("S1-S3", 304, 320, 450, 412)}${link("S2-S3", 656, 320, 510, 412)}
${link("C-S2", 810, 187, 700, 270)}${link("D-S2", 810, 377, 700, 298)}
${device("A", 40, 155)}${device("B", 40, 345)}${device("C", 810, 155)}${device("D", 810, 345)}
${device("S1", 260, 248, true)}${device("S2", 612, 248, true)}${device("S3", 436, 412, true)}
</svg>`,
  "question-partial-mesh.svg": `${start("Routers and physical links", "Routers P, Q, R and T have only four bidirectional links: P–Q, Q–R, R–T and T–P. P is at the upper left, Q upper right, R lower right and T lower left. All links are shown before either failure.")}
<text x="480" y="85" class="note">Initial network: only the four shown links exist.</text>
${link("P-Q", 220, 180, 740, 180)}${link("Q-R", 780, 220, 780, 350)}
${link("R-T", 740, 390, 220, 390)}${link("T-P", 180, 350, 180, 220)}
${router("P", 180, 180)}${router("Q", 780, 180)}${router("R", 780, 390)}${router("T", 180, 390)}
<text x="480" y="490" class="note">Each circle is a router; each line is one bidirectional link.</text>
</svg>`,
});
