import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { courseV3Lessons } from './course-v3-content.mjs';
import { coreBlockTexts, validateCoreBlocks } from './course-v3-core-blocks.mjs';
import { mechanismDiagramFiles } from './course-v3-mechanism-diagrams.mjs';
import { extendedDiagramTargets } from './course-v3-mechanism-extensions.mjs';
import { validateExtendedMechanisms, extendedMechanismSelfTest } from './course-v3-mechanism-checks.mjs';
import { validateCompletionMechanisms, completionMechanismSelfTest } from './course-v3-mechanism-completion-checks.mjs';
import { expandedCore, coreHeadings, section2Headings } from './course-v3-concept-expansion.mjs';
const read = path => readFileSync(new URL(path,import.meta.url),'utf8');
const targets = {
  's4-addressing':'addressing', 's4-shifts':'shifts', 'S5.01-MEMORY':'memory', 'S5.07-DEBUG':'debugger',
  'S9-DECOMPOSITION-PARTS':'decomposition', 'S11-REPEAT':'repeat', 'S11-WHILE':'while',
  'S11-LOOP-CONDITIONS':'loop-comparison', 'S11-BYVAL-BYREF':'passing', 'S12-DATA-CATEGORIES':'boundaries',
  ...extendedDiagramTargets,
};
const strip = s => s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
function inspectDiagrams(files) {
  const errors=[], check=(ok,msg)=>{if(!ok)errors.push(msg);};
  // Check the displayed bit cells against independently calculated shifts, not alt text.
  const initial=0b10010111,width=8,mask=(1<<width)-1;
  const expected={
    'Logical left':(initial<<1)&mask,'Logical right':initial>>>1,
    'Arithmetic left':(initial<<1)&mask,'Arithmetic right':((initial-256)>>1)&mask,
    'Cyclic left':((initial<<1)|(initial>>7))&mask,'Cyclic right':(initial>>1)|((initial&1)<<7),
  };
  for(const [name,value] of Object.entries(expected)) {
    const panel=files['shifts.svg']?.match(new RegExp(`<g data-shift="${name}">([\\s\\S]*?)</g>`))?.[1]??'';
    const bits=[...panel.matchAll(/<tspan[^>]*>([01])<\/tspan>/g)].map(m=>m[1]);
    check(bits.slice(0,8).join('')==='10010111' && bits.slice(8).join('')===value.toString(2).padStart(8,'0'),`${name}: wrong displayed bit state`);
  }
  const addressing=strip(files['addressing.svg']);
  for(const value of ['#100','Value 100','Address 100','Memory[100]','contains 150','contains address 150','Memory[150]','contains value 7','100 + IX','= 102','contains 9','Target address 35'])check(addressing.includes(value),`Addressing loses ${value}`);
  const debugging=strip(files['debugger.svg']);
  for(const value of ['Total &lt;- Total - Increment','Total = 12','Total = 8','No output yet','Predict: 12 + 4 = 16','Observe: 12 - 4 = 8','Run again: output 16.'])check(debugging.includes(value),`Debugger display loses ${value}`);
  const passing=strip(files['passing.svg']);
  for(const value of ['Caller stays 5.','Local output: 7.','5 → 7','refers to Number','7 (inside copy), 5 (caller), 7 (after reference call)'])check(passing.includes(value),`Parameter state loses ${value}`);
  // The TRUE exit and FALSE return in REPEAT are deliberately opposite to WHILE.
  for(const [key,labels] of [['repeat',['TRUE · stop','FALSE · repeat','INPUT Mark','OUTPUT Mark','End']],['while',['TRUE · enter','FALSE · exit','INPUT Value','Value &lt;&gt; -1?','Total &lt;- Total + Value']]]) {
    const body=strip(files[`${key}.svg`]);for(const label of labels)check(body.includes(label),`${key}: missing or reversed branch ${label}`);
  }
  const boundary=files['boundaries.svg'];
  const values=[...boundary.matchAll(/<text x="(?:90|210|310|550|790|890|1010)" y="227"[^>]*><tspan[^>]*>(-?\d+)<\/tspan>/g)].map(m=>Number(m[1]));
  const outcomes=[...boundary.matchAll(/<text x="(?:90|210|310|550|790|890|1010)" y="315"[^>]*><tspan[^>]*>(Accept|Reject)<\/tspan>/g)].map(m=>m[1]);
  check(JSON.stringify(values)===JSON.stringify([-1,0,1,55,99,100,101]),'Boundary input coverage changed');
  check(values.length===outcomes.length && values.every((v,i)=>outcomes[i]===(v>=0&&v<=100?'Accept':'Reject')),'Boundary acceptance disagrees with inclusive limits');
  return errors;
}
const files=mechanismDiagramFiles();assert.deepEqual(inspectDiagrams(files),[]);
assert.deepEqual(validateExtendedMechanisms(files),[]);
assert.deepEqual(validateCompletionMechanisms(files),[]);
for(const [name,svg] of Object.entries(files))assert.equal(read(`../web/assets/course-v3/mechanisms/${name}`),svg,`Stale ${name}`);
let units=0;
for(const lesson of courseV3Lessons)for(const unit of lesson.units)if(targets[unit.unitKey ?? (lesson.section===2 ? unit.heading : undefined)]){
  units++;
  assert.equal(unit.leadVisual.asset,`/assets/course-v3/mechanisms/${targets[unit.unitKey ?? unit.heading]}.svg`);
  assert.deepEqual(validateCoreBlocks(unit),[]);
  assert.ok(unit.coreBlocks?.some(b=>b.type!=='paragraph'),`${unit.unitKey}: lost structured explanation`);
  assert.deepEqual(coreBlockTexts(unit.coreBlocks),unit.coreExplanation);
  assert.ok(unit.objectiveIds.every(id=>lesson.practice.some(q=>q.objectiveIds.includes(id))),`${unit.unitKey}: practice coverage lost`);
  const html=read(`../web/course-v3/${lesson.route}/index.html`);
  assert.ok(html.includes(`src="../..${unit.leadVisual.asset}"`)&&html.includes(`href="../..${unit.leadVisual.asset}" target="_blank"`));
  for(const block of unit.coreBlocks)assert.ok(html.includes(`data-core-type="${block.type}"`));
}
assert.equal(units,Object.keys(targets).length,'A diagram concept has disappeared or been duplicated');
const allUnits=courseV3Lessons.flatMap(l=>l.units);
for(const key of [...Object.keys(expandedCore),...Object.keys(coreHeadings)]) {
  const found=courseV3Lessons.flatMap(l=>l.units.filter(u=>(u.unitKey ?? (l.section===2 ? u.heading : undefined))===key));assert.equal(found.length,1,`Missing or duplicated revised concept ${key}`);
  assert.ok(found[0].coreBlocks?.length>=2);assert.deepEqual(validateCoreBlocks(found[0]),[]);
}
for(const heading of Object.keys(section2Headings))assert.equal(courseV3Lessons.filter(l=>l.section===2).flatMap(l=>l.units).filter(u=>u.heading===heading&&u.coreBlocks).length,1);
assert.equal(allUnits.find(u=>u.unitKey==='s4-ports')?.leadVisual.asset,'/assets/course-v3/reference/usb-hdmi-vga.png');
for(const asset of JSON.parse(read('./course-v3-reference-images.json')).assets) {
  const bytes=readFileSync(new URL(`../${asset.path}`,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,'Reviewed reference image changed');
}
let mutations=0;
if(process.argv.includes('--self-test')){
  mutations+=extendedMechanismSelfTest(files);
  mutations+=completionMechanismSelfTest(files);
  for(const [key,from,to] of [['shifts.svg','>0</tspan>','>1</tspan>'],['addressing.svg','Target address 35','Target address 45'],['debugger.svg','Total = 8','Total = 16'],['passing.svg','Caller stays 5.','Caller stays 7.'],['repeat.svg','TRUE · stop','FALSE · stop'],['while.svg','TRUE · enter','FALSE · enter'],['boundaries.svg','>101</tspan>','>100</tspan>']]){
    const copy={...files,[key]:files[key].replace(from,to)};assert.ok(inspectDiagrams(copy).length,`Undetected ${key} mutation`);mutations++;
  }
  const source=courseV3Lessons.flatMap(l=>l.units).find(u=>u.unitKey==='S11-BYVAL-BYREF');
  for(const mutate of [u=>u.coreBlocks[0].rows[0].pop(),u=>u.coreExplanation[0]='Only a label remains.',u=>u.coreBlocks[0].type='unknown',u=>u.coreBlocks=[]]){
    const copy=structuredClone(source);mutate(copy);assert.ok(validateCoreBlocks(copy).length);mutations++;
  }
}
console.log(`Concept teaching verified: ${units} units, ${Object.keys(files).length} reproducible mechanism diagrams, structured core and practice coverage; ${mutations} negative mutations rejected.`);
