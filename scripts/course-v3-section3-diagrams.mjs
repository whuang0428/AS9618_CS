// Exact supplied circuit. Expressions and truth-table outputs belong in the answer.
export const section3DiagramFiles = Object.freeze({
  "question-circuit-d.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="560" viewBox="0 0 1100 560" role="img" aria-labelledby="title description">
<title id="title">Circuit D</title><desc id="description">A and B connect to an AND gate with output X. X and C connect to an OR gate with output Y. Y connects to a NOT gate with final output Q.</desc>
<style>text{font-family:Arial,sans-serif;fill:#142b45}.wire,.gate{stroke:#142b45;stroke-width:4;fill:none;stroke-linejoin:round;stroke-linecap:round}.gate{fill:#e8f5f5}.label{font-size:28px;font-weight:bold}.note{font-size:23px}</style>
<rect width="1100" height="560" fill="white"/><text x="45" y="55" class="label">Circuit D</text>
<g data-node="G1" data-gate="AND" transform="translate(240 145)"><path class="gate" d="M0 0 H70 A60 60 0 0 1 70 120 H0 Z"/></g>
<g data-node="G2" data-gate="OR" transform="translate(600 245)"><path class="gate" d="M0 0 Q95 0 160 60 Q95 120 0 120 Q45 60 0 0 Z"/></g>
<g data-node="G3" data-gate="NOT" transform="translate(850 265)"><path class="gate" d="M0 0 L100 40 L0 80 Z"/><circle class="gate" cx="110" cy="40" r="10"/></g>
<path class="wire" data-from="A" data-to="G1" d="M95 175 H240"/>
<path class="wire" data-from="B" data-to="G1" d="M95 235 H240"/>
<path class="wire" data-from="G1" data-to="G2" data-signal="X" d="M370 205 H500 V275 H617"/>
<path class="wire" data-from="C" data-to="G2" d="M95 395 H540 V335 H617"/>
<path class="wire" data-from="G2" data-to="G3" data-signal="Y" d="M760 305 H850"/>
<path class="wire" data-from="G3" data-to="Q" d="M970 305 H1030"/>
<text x="55" y="183" class="label">A</text><text x="55" y="243" class="label">B</text><text x="55" y="403" class="label">C</text>
<text x="420" y="188" class="label">X</text><text x="795" y="286" class="label">Y</text><text x="1040" y="313" class="label">Q</text>
<text x="45" y="485" class="note">Use the intermediate outputs X and Y in your truth table.</text>
<text x="45" y="519" class="note">All wires shown are connections; there are no crossing wires.</text></svg>`,
});
