// Shared, explicit data for the teaching tables, circuits and answer diagrams.
// These are conceptual hardware models, not executable device firmware.
export const bufferTrace = [
  ['0 s', 'Receive P1–P4; pause sender', 'P1, P2, P3, P4', 'P5, P6', 'None'],
  ['1 s', 'Remove P1, then receive P5', 'P2, P3, P4, P5', 'P6', 'P1'],
  ['2 s', 'Remove P2, then receive P6', 'P3, P4, P5, P6', 'None', 'P1, P2'],
  ['3 s', 'Remove P3; no new arrival', 'P4, P5, P6', 'None', 'P1–P3'],
  ['4 s', 'Remove P4; no new arrival', 'P5, P6', 'None', 'P1–P4'],
  ['5 s', 'Remove P5; no new arrival', 'P6', 'None', 'P1–P5'],
  ['6 s', 'Remove P6; no new arrival', 'Empty', 'None', 'P1–P6'],
];
export const heaterTrace = [
  ['1', 'OFF', '17', 'Below 18: switch on', 'ON'],
  ['2', 'ON', '18', 'Between thresholds: retain state', 'ON'],
  ['3', 'ON', '19', 'Between thresholds: retain state', 'ON'],
  ['4', 'ON', '20', 'At least 20: switch off', 'OFF'],
  ['5', 'OFF', '19', 'Between thresholds: retain state', 'OFF'],
  ['6', 'OFF', '18', 'Between thresholds: retain state', 'OFF'],
  ['7', 'OFF', '17', 'Below 18: switch on', 'ON'],
];
export const gateFunctions = {
  NOT: a => 1-a,
  AND: (a,b) => a&b,
  OR: (a,b) => a|b,
  NAND: (a,b) => 1-(a&b),
  NOR: (a,b) => 1-(a|b),
  XOR: (a,b) => a^b,
};
export const op = (gate,...inputs) => ({gate,inputs});
export const logicCases = {
  permit: {inputs:['D','C'],output:'P',tree:op('AND','D',op('NOT','C'))},
  equality: {inputs:['A','B'],output:'Q',tree:op('OR',op('AND',op('NOT','A'),op('NOT','B')),op('AND','A','B'))},
  acceptedRows: {inputs:['A','B','C'],output:'Q',tree:op('OR',op('AND',op('AND',op('NOT','A'),op('NOT','B')),'C'),op('AND',op('AND','A',op('NOT','B')),'C'))},
  practiceRows: {inputs:['A','B','C'],output:'Q',tree:op('OR',op('AND',op('AND',op('NOT','A'),'B'),op('NOT','C')),op('AND',op('AND','A','B'),'C'))},
  lamp: {inputs:['S','U','V'],output:'L',tree:op('AND','S',op('AND',op('NOT','U'),op('NOT','V')))},
  norXor: {inputs:['A','B','C'],output:'Q',tree:op('XOR',op('NOR','A','B'),'C')},
  xorTerms: {inputs:['A','B'],output:'Q',tree:op('OR',op('AND',op('NOT','A'),'B'),op('AND','A',op('NOT','B')))},
  warning: {inputs:['A','B','C'],output:'W',tree:op('OR','A',op('AND',op('NOT','B'),op('NOT','C')))},
  fromExamTable: {inputs:['A','B'],output:'Q',tree:op('OR','A',op('NOT','B'))},
  branches: {inputs:['A','B','C'],output:'Q',tree:op('AND',op('XOR','A','B'),op('NOT','C'))},
  circuitC: {inputs:['A','B','C'],output:'Q',tree:op('NAND',op('OR','A','B'),'C')},
  circuitD: {inputs:['A','B','C'],output:'Q',tree:op('NOT',op('OR',op('AND','A','B'),'C'))},
  review: {inputs:['Door','Key','Smoke'],output:'Q',tree:op('OR',op('AND','Door',op('NOT','Key')),'Smoke')},
  sectionCheck: {inputs:['A','B','C'],output:'Q',tree:op('OR',op('AND',op('NOT','A'),'B'),'C')},
};
export function evaluateLogic(tree,values) {
  if(typeof tree === 'string') return values[tree];
  return gateFunctions[tree.gate](...tree.inputs.map(input=>evaluateLogic(input,values)));
}
export function truthRows(key, intermediates=[]) {
  const example=logicCases[key];
  return Array.from({length:2**example.inputs.length},(_,n)=>{
    const values=Object.fromEntries(example.inputs.map((name,i)=>[name,(n>>(example.inputs.length-1-i))&1]));
    return [...example.inputs.map(name=>values[name]),...intermediates.map(tree=>evaluateLogic(tree,values)),evaluateLogic(example.tree,values)];
  });
}
