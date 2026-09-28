// Section 4 teaching model. Opcode meanings follow the 2027–2029 Cambridge 9618 syllabus.
// One source line occupies one address; arithmetic is unbounded except the declared 8-bit bit labs.
export const INSTRUCTIONS = Object.freeze({
  LDM:{group:'Data movement',operand:'immediate',effect:'Load the number into ACC'},
  LDD:{group:'Data movement',operand:'direct',effect:'Load memory contents into ACC'},
  LDI:{group:'Data movement',operand:'indirect',effect:'Follow a pointer, then load into ACC'},
  LDX:{group:'Data movement',operand:'indexed',effect:'Load memory at address plus IX into ACC'},
  LDR:{group:'Data movement',operand:'immediate',effect:'Load the number into IX'},
  MOV:{group:'Data movement',operand:'register',effect:'Copy ACC into IX'},
  STO:{group:'Data movement',operand:'direct',effect:'Store ACC at the address'},
  ADD:{group:'Arithmetic',operand:'value',effect:'Add the operand to ACC'},
  SUB:{group:'Arithmetic',operand:'value',effect:'Subtract the operand from ACC'},
  INC:{group:'Arithmetic',operand:'register',effect:'Add one to ACC or IX'},
  DEC:{group:'Arithmetic',operand:'register',effect:'Subtract one from ACC or IX'},
  JMP:{group:'Control flow',operand:'address',effect:'Set PC to the address'},
  CMP:{group:'Comparison',operand:'value',effect:'Compare ACC for equality with the operand'},
  CMI:{group:'Comparison',operand:'indirect',effect:'Compare ACC with the value through a pointer'},
  JPE:{group:'Control flow',operand:'address',effect:'Jump when the previous comparison was True'},
  JPN:{group:'Control flow',operand:'address',effect:'Jump when the previous comparison was False'},
  IN:{group:'Input/output',operand:'none',effect:'Read one character ASCII code into ACC'},
  OUT:{group:'Input/output',operand:'none',effect:'Output the character whose ASCII code is in ACC'},
  END:{group:'Control flow',operand:'none',effect:'Return control to the operating system'},
  AND:{group:'Bit manipulation',operand:'value',effect:'Bitwise AND with ACC'},
  OR:{group:'Bit manipulation',operand:'value',effect:'Bitwise OR with ACC'},
  XOR:{group:'Bit manipulation',operand:'value',effect:'Bitwise XOR with ACC'},
  LSL:{group:'Bit manipulation',operand:'immediate',effect:'Logical shift ACC left'},
  LSR:{group:'Bit manipulation',operand:'immediate',effect:'Logical shift ACC right'},
});

export function numberFromToken(token) {
  const value=String(token).trim();
  if (/^#[+-]?\d+$/.test(value)) return Number(value.slice(1));
  if (/^B[01]+$/i.test(value)) return parseInt(value.slice(1),2);
  if (/^&[0-9a-f]+$/i.test(value)) return parseInt(value.slice(1),16);
  if (/^[+-]?\d+$/.test(value)) return Number(value);
  throw new Error(`Invalid number: ${value}`);
}

export function assemble(lines, origin=0) {
  if (!Number.isSafeInteger(origin) || origin<0) throw new Error('Origin must be a non-negative integer.');
  const symbols={}; const source=[]; const errors=[];
  lines.forEach((raw,index)=>{
    const text=String(raw).trim();
    if (!text) return;
    const match=text.match(/^(?:([A-Z][A-Z0-9_]*):\s*)?(.*)$/i);
    if (!match || !match[2]) {errors.push(`Line ${index+1}: missing instruction or data.`);return;}
    const address=origin+source.length;
    const label=match[1]?.toUpperCase();
    if (label) {if (Object.hasOwn(symbols,label)) errors.push(`Line ${index+1}: duplicate label ${label}.`); else symbols[label]=address;}
    source.push({address,label,text:match[2].trim(),line:index+1});
  });
  const memory={}; const resolved=[];
  for (const item of source) {
    const parts=item.text.match(/^([A-Z]+)(?:\s+(.+))?$/i);
    if (!parts) {try {memory[item.address]=numberFromToken(item.text);resolved.push({...item,kind:'data',value:memory[item.address]});} catch {errors.push(`Line ${item.line}: invalid data or instruction.`);} continue;}
    const op=parts[1].toUpperCase(), operand=parts[2]?.trim();
    if (!INSTRUCTIONS[op]) {
      try {memory[item.address]=numberFromToken(item.text);resolved.push({...item,kind:'data',value:memory[item.address]});}
      catch {errors.push(`Line ${item.line}: unknown instruction ${op}.`);}
      continue;
    }
    const needs=INSTRUCTIONS[op].operand!=='none';
    if (needs!==Boolean(operand)) {errors.push(`Line ${item.line}: ${op} ${needs?'requires':'does not take'} an operand.`);continue;}
    if (operand && ['LDM','LDR'].includes(op) && !/^#[+-]?\d+$/.test(operand)) {errors.push(`Line ${item.line}: ${op} requires #n immediate notation.`);continue;}
    if (operand && ['LSL','LSR'].includes(op) && !/^#[+]?(?:0|[1-9]\d*)$/.test(operand)) {errors.push(`Line ${item.line}: ${op} requires a non-negative #n shift amount.`);continue;}
    if (operand && ['LDD','LDI','LDX','STO','JMP','CMI','JPE','JPN'].includes(op) && /^(?:#[+-]?\d+|B[01]+|&[0-9A-F]+)$/i.test(operand)) {errors.push(`Line ${item.line}: ${op} requires an address, not an immediate value.`);continue;}
    let value=null;
    if (operand) {
      const key=operand.toUpperCase();
      if (Object.hasOwn(symbols,key)) value=symbols[key];
      else if (/^[A-Z][A-Z0-9_]*$/i.test(operand) && !/^B[01]+$/i.test(operand) && !['ACC','IX'].includes(key)) {errors.push(`Line ${item.line}: undefined label ${operand}.`);continue;}
      else if (['ACC','IX'].includes(key)) value=key;
      else {try {value=numberFromToken(operand);} catch {errors.push(`Line ${item.line}: invalid operand ${operand}.`);continue;}}
      if (INSTRUCTIONS[op].operand==='register' && value!=='IX' && !(op==='INC'||op==='DEC') ) {errors.push(`Line ${item.line}: MOV requires IX.`);continue;}
      if (INSTRUCTIONS[op].operand==='register' && !['ACC','IX'].includes(value)) {errors.push(`Line ${item.line}: register must be ACC or IX.`);continue;}
    }
    const instruction={op,operand,operandValue:value,address:item.address};
    memory[item.address]=instruction;
    resolved.push({...item,kind:'instruction',instruction,resolved:`${op}${operand?` ${typeof value==='number' && Object.hasOwn(symbols,operand.toUpperCase())?value:operand}`:''}`});
  }
  return {symbols,source,resolved,memory,errors};
}

export function initialState(program) {
  const built=assemble(program.lines,program.origin??0);
  if (built.errors.length) throw new Error(built.errors.join(' '));
  return {pc:program.origin??0,acc:program.acc??0,ix:program.ix??0,mar:null,mdr:null,cir:null,comparison:null,
    memory:{...(program.memory??{}),...built.memory},input:program.input??'',inputCursor:0,output:'',halted:false,trace:[],lastDiff:[],symbols:built.symbols};
}

function cell(memory,address) {
  if (!Number.isSafeInteger(address)||address<0||!Object.hasOwn(memory,address)) throw new Error(`Memory address ${address} does not exist in this scenario.`);
  return memory[address];
}
function data(memory,address) {
  const value=cell(memory,address);
  if (typeof value!=='number') throw new Error(`Memory[${address}] holds an instruction, not numeric data.`);
  return value;
}
export function resolveAddress(mode, operand, memory, ix=0, pcBase=0) {
  const n=numberFromToken(operand);
  if (mode==='immediate') return {path:[`literal ${n}`],value:n,address:null};
  if (mode==='relative') return {path:[`PC base ${pcBase}`,`offset ${n}`,`address ${pcBase+n}`],address:pcBase+n,value:null};
  const address=mode==='indexed'?n+ix:mode==='indirect'?data(memory,n):n;
  if (!['direct','indirect','indexed'].includes(mode)) throw new Error(`Unknown addressing mode: ${mode}.`);
  const value=data(memory,address);
  return {path:mode==='indirect'?[`Memory[${n}] → ${address}`,`Memory[${address}] → ${value}`]:mode==='indexed'?[`${n} + IX ${ix} → ${address}`,`Memory[${address}] → ${value}`]:[`Memory[${address}] → ${value}`],address,value};
}
function operandValue(state,instruction,indirect=false) {
  const token=instruction.operand;
  if (indirect) {
    const pointer=data(state.memory,instruction.operandValue);
    state.mar=pointer; state.mdr=data(state.memory,pointer);return state.mdr;
  }
  if (/^(?:#[+-]?\d+|B[01]+|&[0-9A-F]+)$/i.test(token)) return numberFromToken(token);
  state.mar=instruction.operandValue;state.mdr=data(state.memory,state.mar);return state.mdr;
}
export function stateDiff(before,after) {
  const keys=['pc','acc','ix','mar','mdr','cir','comparison','output','halted'];
  const changes=keys.filter(key=>JSON.stringify(before[key])!==JSON.stringify(after[key])).map(key=>`${key.toUpperCase()}: ${before[key]??'—'} → ${after[key]??'—'}`);
  for (const [address,value] of Object.entries(after.memory)) if (JSON.stringify(before.memory[address])!==JSON.stringify(value)) changes.push(`Memory[${address}]: ${before.memory[address]??'—'} → ${value}`);
  return changes;
}
export function stepInstruction(current) {
  if (current.halted) return current;
  const state={...current,memory:{...current.memory},trace:[...current.trace]};
  const address=state.pc;
  const instruction=cell(state.memory,address);
  if (!instruction || typeof instruction!=='object'||!instruction.op) throw new Error(`Memory[${address}] is data, not an instruction.`);
  const {op,operandValue:value}=instruction;
  state.mar=address;state.mdr=instruction.text??`${op}${instruction.operand?` ${instruction.operand}`:''}`;state.cir=state.mdr;state.pc=address+1;
  switch(op) {
    case 'LDM':state.acc=value;break;
    case 'LDR':state.ix=value;break;
    case 'LDD':state.mar=value;state.mdr=data(state.memory,value);state.acc=state.mdr;break;
    case 'LDI':state.acc=operandValue(state,instruction,true);break;
    case 'LDX':state.mar=value+state.ix;state.mdr=data(state.memory,state.mar);state.acc=state.mdr;break;
    case 'MOV':state.ix=state.acc;break;
    case 'STO':if(!Number.isSafeInteger(value)||value<0)throw new Error('Store address must be a non-negative integer.');state.mar=value;state.mdr=state.acc;state.memory[value]=state.acc;break;
    case 'ADD':state.acc+=operandValue(state,instruction);break;
    case 'SUB':state.acc-=operandValue(state,instruction);break;
    case 'INC':state[value.toLowerCase()]++;break;
    case 'DEC':state[value.toLowerCase()]--;break;
    case 'CMP':state.comparison=state.acc===operandValue(state,instruction);break;
    case 'CMI':state.comparison=state.acc===operandValue(state,instruction,true);break;
    case 'JMP':state.pc=value;break;
    case 'JPE':if(state.comparison===true)state.pc=value;break;
    case 'JPN':if(state.comparison===false)state.pc=value;break;
    case 'IN':{
      const character=state.input[state.inputCursor];if(!character)throw new Error('No input character is available.');
      state.acc=character.charCodeAt(0);state.inputCursor++;break;
    }
    case 'OUT':{
      if(!Number.isInteger(state.acc)||state.acc<0||state.acc>127)throw new Error('ACC is not a valid ASCII character code (0–127).');
      state.output+=String.fromCharCode(state.acc);break;
    }
    case 'AND':state.acc=(state.acc&operandValue(state,instruction))&255;break;
    case 'OR':state.acc=(state.acc|operandValue(state,instruction))&255;break;
    case 'XOR':state.acc=(state.acc^operandValue(state,instruction))&255;break;
    case 'LSL':state.acc=shiftBits(state.acc,'logical','left',value).value;break;
    case 'LSR':state.acc=shiftBits(state.acc,'logical','right',value).value;break;
    case 'END':state.halted=true;state.pc=null;break;
    default:throw new Error(`Unsupported instruction: ${op}.`);
  }
  state.lastDiff=stateDiff(current,state);
  state.trace.push({address,instruction:state.cir,acc:state.acc,ix:state.ix,nextPC:state.pc,comparison:state.comparison,output:state.output,diff:state.lastDiff});
  return state;
}
export function fetchMicrosteps(current) {
  const instruction=cell(current.memory,current.pc);
  if(typeof instruction!=='object')throw new Error(`Memory[${current.pc}] is not an instruction.`);
  const text=`${instruction.op}${instruction.operand?` ${instruction.operand}`:''}`;
  return [
    {operation:'MAR ← [PC]',change:`MAR: ${current.mar??'—'} → ${current.pc}`,bus:'Address: CPU → memory',active:'MAR',value:current.pc},
    {operation:'READ',change:`Memory[${current.pc}] selected`,bus:'Control: READ → memory',active:'Memory',value:current.pc},
    {operation:'MDR ← [[MAR]]',change:`MDR: ${current.mdr??'—'} → ${text}`,bus:'Data: memory → CPU',active:'MDR',value:text},
    {operation:'CIR ← [MDR]',change:`CIR: ${current.cir??'—'} → ${text}`,bus:'Internal transfer',active:'CIR',value:text},
    {operation:'PC ← [PC] + 1',change:`PC: ${current.pc} → ${current.pc+1}`,bus:'Internal transfer',active:'PC',value:current.pc+1},
    {operation:'DECODE',change:`CU decodes ${instruction.op}; execute behaviour depends on the opcode.`,bus:'Control signals',active:'CU',value:instruction.op},
  ];
}
export function shiftBits(value,kind,direction,amount,width=8) {
  if(!Number.isInteger(width)||width<2||width>30||!Number.isInteger(value)||value<0||value>=2**width)throw new Error(`Enter an unsigned ${width}-bit value.`);
  if(!Number.isInteger(amount)||amount<0||amount>width)throw new Error(`Shift amount must be 0–${width}.`);
  if(!['logical','arithmetic','cyclic'].includes(kind)||!['left','right'].includes(direction))throw new Error('Choose a valid shift type and direction.');
  const mask=2**width-1;let result=value;
  const states=[result];
  for(let i=0;i<amount;i++) {
    if(kind==='cyclic')result=direction==='left'?((result<<1)|(result>>(width-1)))&mask:((result>>1)|((result&1)<<(width-1)))&mask;
    else if(direction==='left')result=(result<<1)&mask;
    else result=kind==='arithmetic'?((result>>1)|(result&(1<<(width-1))))&mask:result>>1;
    states.push(result);
  }
  return {value:result,states};
}
export function applyMask(value,mask,operation,width=8) {
  const limit=2**width;
  if(![value,mask].every(n=>Number.isInteger(n)&&n>=0&&n<limit))throw new Error(`Both values must fit in ${width} bits.`);
  if(operation==='AND')return value&mask;
  if(operation==='OR')return value|mask;
  if(operation==='XOR')return value^mask;
  throw new Error('Choose AND, OR or XOR.');
}
export const bits=(value,width=8)=>Number(value).toString(2).padStart(width,'0');
