// Authored schematic; the page supplies the three rate and quantity labels.
export function renderSection2AcademicFigures() {
  return [{
    asset: "assets/course-v3/section-2/streaming-buffer-reservoir-academic.svg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810" viewBox="0 0 1440 810" role="img" aria-labelledby="reservoir-title reservoir-description">
  <title id="reservoir-title">Reservoir analogy for a streaming buffer</title>
  <desc id="reservoir-description">A cross-section of a reservoir receives an inflow at the upper left and releases an outflow at the lower right. The shaded stored quantity lies between an empty boundary and the reservoir capacity. In the analogy, arrival rate fills the buffer and playback bit rate drains it. A finite reserve eventually empties if the outflow exceeds the inflow for long enough.</desc>
  <defs>
    <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
      <path d="M1 1L9 5L1 9" fill="none" stroke="#366a69" stroke-width="1.5"/>
    </marker>
  </defs>
  <rect width="1440" height="810" fill="#ffffff"/>
  <g fill="none" stroke-linecap="square" stroke-linejoin="miter">
    <rect x="402" y="416" width="664" height="242" fill="#e8f0ef" stroke="none"/>
    <path d="M400 235V660H1070V603M1070 577V235" stroke="#283139" stroke-width="2.5"/>
    <path d="M415 248H1055" stroke="#a6afb6" stroke-width="1.5" stroke-dasharray="7 6"/>
    <path d="M402 416H1066" stroke="#366a69" stroke-width="2"/>
    <path d="M80 209H493V343M80 235H467V343" stroke="#69757e" stroke-width="1.8"/>
    <path d="M110 222H480V383" stroke="#366a69" stroke-width="2.5" marker-end="url(#flow-arrow)"/>
    <path d="M1070 577H1278V631H1370M1070 603H1252V657H1370" stroke="#69757e" stroke-width="1.8"/>
    <path d="M976 590H1265V644H1370" stroke="#366a69" stroke-width="2.5" marker-end="url(#flow-arrow)"/>
    <path d="M1100 248H1132M1100 660H1132M1116 248V660" stroke="#a6afb6" stroke-width="1.5"/>
  </g>
  <g fill="#52606b" font-family="Arial, Helvetica, sans-serif" font-size="26">
    <text x="1145" y="260">Capacity</text>
    <text x="1145" y="675">Empty</text>
    <text x="402" y="775">Cross-section: stored quantity, inflow and outflow</text>
  </g>
</svg>`,
  }];
}
