import test from 'node:test';
import assert from 'node:assert/strict';
import {INSTRUCTIONS,assemble,initialState,stepInstruction,resolveAddress,shiftBits,applyMask,bits,fetchMicrosteps} from '../../web/course-v3/processor-engine.mjs';

function one(line,{acc=18,ix=2,memory={5:24,7:11,20:0,100:150,150:7},comparison=null,input='A'}={}){
  const start=initialState({origin:0,acc,ix,memory,input,lines:[line,'END']});start.comparison=comparison;return stepInstruction(start);
}

test('official instruction inventory and exact branch meanings',()=>{
  assert.equal(Object.keys(INSTRUCTIONS).length,24);
  for(const op of ['LDM','LDD','LDI','LDX','LDR','MOV','STO','ADD','SUB','INC','DEC','JMP','CMP','CMI','JPE','JPN','IN','OUT','END','AND','OR','XOR','LSL','LSR']) assert.ok(INSTRUCTIONS[op]);
  for(const op of ['ASR','ASL','ROL','ROR','CALL','RET','PUSH','POP']) assert.equal(INSTRUCTIONS[op],undefined);
  assert.equal(one('JPE 5',{comparison:true}).pc,5);
  assert.equal(one('JPE 5',{comparison:false}).pc,1);
  assert.equal(one('JPN 5',{comparison:false}).pc,5);
  assert.equal(one('JPN 5',{comparison:true}).pc,1);
  assert.equal(one('JMP 5').pc,5);
});

test('addressing paths distinguish literal, value, pointer, offset and relative base',()=>{
  const memory={100:150,150:7,202:42};
  assert.deepEqual(resolveAddress('immediate','#7',memory),{path:['literal 7'],value:7,address:null});
  assert.equal(resolveAddress('direct','150',memory).value,7);
  assert.deepEqual(resolveAddress('indirect','100',memory).path,['Memory[100] → 150','Memory[150] → 7']);
  assert.equal(resolveAddress('indexed','200',memory,2).value,42);
  assert.equal(resolveAddress('relative','-3',memory,0,40).address,37);
  assert.throws(()=>resolveAddress('direct','999',memory),/does not exist/);
});

test('data movement and register selection',()=>{
  assert.equal(one('LDM #7').acc,7);
  assert.equal(one('LDD 5').acc,24);
  assert.equal(one('LDI 100').acc,7);
  assert.equal(one('LDX 5').acc,11);
  assert.equal(one('LDR #3').ix,3);
  assert.equal(one('MOV IX').ix,18);
  const store=one('STO 20');assert.equal(store.memory[20],18);assert.equal(store.acc,18);
});

test('arithmetic, comparisons, input/output and unchanged ACC',()=>{
  assert.equal(one('ADD 5').acc,42);
  assert.equal(one('ADD #2').acc,20);
  assert.equal(one('SUB 5').acc,-6);
  assert.equal(one('SUB #2').acc,16);
  assert.equal(one('INC ACC').acc,19);
  assert.equal(one('DEC IX').ix,1);
  const cmp=one('CMP #18');assert.equal(cmp.comparison,true);assert.equal(cmp.acc,18);
  const cmi=one('CMI 100');assert.equal(cmi.comparison,false);assert.equal(cmi.acc,18);
  assert.equal(one('IN').acc,65);
  assert.equal(one('OUT',{acc:65}).output,'A');
  assert.throws(()=>one('IN',{input:''}),/No input/);
  assert.equal(one('END').halted,true);
});

test('bitwise opcodes, shift concepts and masks',()=>{
  assert.equal(one('AND B00001111',{acc:172}).acc,12);
  assert.equal(one('OR B00000100',{acc:17}).acc,21);
  assert.equal(one('XOR B00000100',{acc:21}).acc,17);
  assert.equal(one('LSL #1',{acc:177}).acc,98);
  assert.equal(one('LSR #1',{acc:177}).acc,88);
  assert.equal(bits(shiftBits(177,'logical','right',1).value),'01011000');
  assert.equal(bits(shiftBits(177,'arithmetic','right',1).value),'11011000');
  assert.equal(bits(shiftBits(177,'cyclic','right',1).value),'11011000');
  assert.equal(bits(shiftBits(178,'cyclic','left',1).value),'01100101');
  assert.equal(applyMask(17,4,'OR'),21);
  assert.equal(applyMask(21,251,'AND'),17);
  assert.equal(applyMask(21,4,'XOR'),17);
  assert.throws(()=>shiftBits(256,'logical','left',1),/8-bit/);
});

test('assembler records forward references and rejects missing/duplicate labels',()=>{
  const built=assemble(['START: LDD FIRST','ADD SECOND','STO TOTAL','END','FIRST: 18','SECOND: 24','TOTAL: 0']);
  assert.deepEqual(built.errors,[]);
  assert.deepEqual(built.symbols,{START:0,FIRST:4,SECOND:5,TOTAL:6});
  assert.equal(built.resolved[0].resolved,'LDD 4');
  assert.equal(built.memory[4],18);
  assert.match(assemble(['LDD MISSING','END']).errors.join(' '),/undefined label/);
  assert.match(assemble(['X: END','X: 1']).errors.join(' '),/duplicate label/);
  assert.match(assemble(['ASR #1']).errors.join(' '),/unknown instruction/);
  assert.match(assemble(['LDM 4']).errors.join(' '),/requires #n/);
  assert.match(assemble(['LDD #4']).errors.join(' '),/requires an address/);
  let labelState=initialState({origin:0,acc:1,lines:['ADD BASE','END','BASE: 2']});
  labelState=stepInstruction(labelState);assert.equal(labelState.acc,3);
  let directLabel=initialState({origin:0,lines:['LDD BASE','END','BASE: 2']});
  directLabel=stepInstruction(directLabel);assert.equal(directLabel.acc,2);
  assert.equal(one('LDM #-3').acc,-3);
});

test('fetch transfers, loops, skipped lines, output and END',()=>{
  const program={origin:20,acc:0,ix:0,memory:{90:67},lines:['LDM #2','LOOP: DEC ACC','CMP #0','JPN LOOP','LDD 90','OUT','END']};
  let state=initialState(program);
  const steps=fetchMicrosteps(state);assert.equal(steps[0].operation,'MAR ← [PC]');assert.equal(steps[2].operation,'MDR ← [[MAR]]');
  for(let n=0;n<20&&!state.halted;n++)state=stepInstruction(state);
  assert.equal(state.halted,true);assert.equal(state.output,'C');assert.equal(state.acc,67);
  assert.deepEqual(state.trace.map(row=>row.address),[20,21,22,23,21,22,23,24,25,26]);
  assert.equal(state.trace[3].nextPC,21);assert.equal(state.trace[6].nextPC,24);
});
