// Shared, explicit data for the authored explanations and reproducible diagrams.
// These are teaching models, not specifications of a real multimedia file format.
export const additionExample = {
  width: 8, left: 45, right: 23,
  columns: [
    ['0 (1)', '1', '1', '0', '2', '0', '1'],
    ['1 (2)', '0', '1', '1', '2', '0', '1'],
    ['2 (4)', '1', '1', '1', '3', '1', '1'],
    ['3 (8)', '1', '0', '1', '2', '0', '1'],
    ['4 (16)', '0', '1', '1', '2', '0', '1'],
    ['5 (32)', '1', '0', '1', '2', '0', '1'],
    ['6 (64)', '0', '0', '1', '1', '1', '0'],
    ['7 (128)', '0', '0', '0', '0', '0', '0'],
  ],
  result: '01000100',
};

export const samplingExample = {
  rate: 4, bits: 3,
  // The supplied offset mapping assigns 000 to -4, ..., 111 to +3.
  levels: [-4, -3, -2, -1, 0, 1, 2, 3],
  samples: [
    { time: 0, measured: -3.2, level: -3, code: '001' },
    { time: 0.25, measured: -0.6, level: -1, code: '011' },
    { time: 0.5, measured: 1.6, level: 2, code: '110' },
    { time: 0.75, measured: 2.7, level: 3, code: '111' },
  ],
};

// A continuous piecewise-linear teaching trace; sample times select its vertices.
export const soundTrace = [-3.2, -1.7, -0.6, 2.6, 1.6, 0.3, 2.7, 0.5, -1.4]
  .map((value, index) => ({ time: index / 8, value }));

export const vectorExample = {
  width: 60, height: 45,
  // Origin at top left, x increases right, y increases down; units are arbitrary.
  objects: [
    { type: 'rectangle', x: 10, y: 10, width: 40, height: 20, fill: '#1765a0', stroke: 'none' },
    { type: 'line', x1: 10, y1: 30, x2: 50, y2: 30, stroke: '#17243a', thickness: 2 },
  ],
  scale: 2, scaleLineWidth: true,
};

export const rleExample = {
  source: 'AAAABBCCCCCCCCDD', countBits: 8, valueBits: 8,
  runs: [[4, 'A'], [2, 'B'], [8, 'C'], [2, 'D']],
  counterexample: 'ABC', counterRuns: [[1, 'A'], [1, 'B'], [1, 'C']],
};

export const soundRunExample = {
  samples: [12, 12, 12, 12, 13, 13, 9, 9, 9, 9, 9, 9],
  runs: [[4, 12], [2, 13], [6, 9]], countBits: 8, sampleBits: 8,
};
