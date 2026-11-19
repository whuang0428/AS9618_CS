const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const M = require('./course-v3-section6-models.js');

test('signature verifies received content using the corresponding sender public key', () => {
  const valid = M.signature({message:'Warehouse A',tamper:false,publicKey:'A'});
  assert.equal(valid.valid,true);
  const changed = M.signature({message:'Warehouse A',altered:'Warehouse B',tamper:true,publicKey:'A'});
  assert.equal(changed.valid,false);
  assert.equal(changed.sentDigest,valid.sentDigest);
  assert.notEqual(changed.receivedDigest,valid.sentDigest);
  assert.equal(changed.frames[3].lanes[1].items[1].value,valid.frames[3].lanes[1].items[1].value,'message substitution must not silently regenerate the signature');
  assert.equal(M.signature({publicKey:'B'}).valid,false);
  assert.match(valid.frames.at(-1).conclusion,/not confidential/);
});

test('a tamper switch with unchanged replacement content does not invent a digest mismatch', () => {
  assert.equal(M.signature({message:'Same',altered:'Same',tamper:true}).valid,true);
  assert.equal(M.signature({altered:'',tamper:false}).valid,true,'an unused replacement field is irrelevant');
  assert.throws(() => M.signature({message:''}),/1–120/);
  assert.throws(() => M.signature({message:'a'.repeat(121)}),/1–120/);
});

test('firewall applies the first matching rule, including permitted replies and default deny', () => {
  for (const [input,rule,decision] of [
    [{direction:'inbound',port:22},4,'DENY'],
    [{direction:'inbound',port:443,target:'public'},2,'ALLOW'],
    [{direction:'inbound',port:443,target:'staff'},4,'DENY'],
    [{direction:'outbound',port:443},3,'ALLOW'],
    [{direction:'inbound',port:22,established:true},1,'ALLOW'],
  ]) {
    const result = M.firewall(input);
    assert.equal(result.rule,rule); assert.equal(result.decision,decision);
    const checked = result.frames.filter(frame => frame.rules);
    assert.equal(checked.length,rule);
    assert.equal(checked.at(-1).rules[rule-1].status,'MATCH');
    assert.ok(checked.at(-1).rules.slice(rule).every(r=>r.status==='Not evaluated'));
  }
  assert.throws(()=>M.firewall({port:65536}),/Port/);
});

test('firewall placement changes scope without pretending bypassed traffic was inspected', () => {
  assert.match(M.firewall({placement:'host'}).frames[0].caption,/one computer/);
  assert.match(M.firewall({placement:'network'}).frames[0].caption,/network boundary/);
  const bypass = M.firewall({bypass:true});
  assert.equal(bypass.rule,null); assert.equal(bypass.decision,'NOT INSPECTED');
  assert.equal(bypass.frames.some(frame=>frame.rules),false);
  assert.equal(bypass.frames.some(frame=>frame.title.includes('Read packet')),false);
  assert.match(M.firewall({established:true}).frames.at(-1).conclusion,/malicious content/);
});

test('an anti-virus update adds recognition, quarantine and deletion remain different outcomes', () => {
  assert.equal(M.antivirus({sample:'recent',updated:false}).detected,false);
  assert.equal(M.antivirus({sample:'recent',updated:true}).detected,true);
  assert.equal(M.antivirus({sample:'known',updated:false}).detected,true);
  assert.equal(M.antivirus({sample:'unknown',updated:true}).detected,false);
  assert.equal(M.antivirus({sample:'known',response:'quarantine'}).finalState,'quarantine');
  assert.equal(M.antivirus({sample:'known',response:'delete'}).finalState,'delete');
  assert.equal(M.antivirus({sample:'unknown',response:'delete'}).finalState,'undetected','a selected response cannot remove an undetected sample');
  assert.match(M.antivirus({sample:'unknown'}).frames.at(-1).conclusion,/missed/);
});

test('local spyware removal and password replacement cannot recall a disclosed copy', () => {
  for (const replacePassword of [false,true]) {
    const result = M.antispyware({disclosed:true,replacePassword});
    assert.equal(result.collecting,false); assert.equal(result.remoteCopy,true);
    assert.equal(result.oldCredentialExposed,true); assert.equal(result.oldCredentialReplaced,replacePassword);
    assert.equal(result.frames.at(-1).lanes[1].items[0].value,'Recorded keystrokes retained');
  }
  assert.equal(M.antispyware({disclosed:false}).remoteCopy,false);
});

test('encryption models the same reversible operation at both ends, including UTF-8 text', () => {
  for (const message of ['Meet at 8','成绩 82','<script>alert(1)</script>']) {
    const result = M.encryption({message,key:13,decryptionKey:13});
    assert.equal(result.recovered,message); assert.equal(result.matches,true);
    assert.deepEqual(result.cipherBytes,result.plainBytes.map(byte=>byte^13));
    assert.equal(M.encryption({message,key:13,decryptionKey:7}).matches,false);
  }
  assert.throws(()=>M.encryption({key:0}),/1 to 255/);
  assert.throws(()=>M.encryption({decryptionKey:3.5}),/1 to 255/);
  assert.throws(()=>M.encryption({message:''}),/1–120/);
});

test('all 128 seven-bit inputs append the right even and odd parity bits', () => {
  for (let n=0;n<128;n++) for (const convention of ['even','odd']) {
    const data=n.toString(2).padStart(7,'0');
    const result=M.parity({data,convention,flips:[]});
    assert.equal(result.sentBlock[0].length,8);
    assert.equal([...result.sentBlock[0]].filter(b=>b==='1').length%2,convention==='even'?0:1);
    assert.equal(result.detected,false);
  }
});

test('byte parity detects any single bit but misses two flips and cannot locate or correct it', () => {
  for (let column=0;column<8;column++) {
    const result=M.parity({flips:[{row:0,column}]});
    assert.equal(result.detected,true); assert.equal(result.candidate,null); assert.equal(result.correctable,false);
  }
  const double=M.parity({flips:[{row:0,column:2},{row:0,column:3}]});
  assert.equal(double.detected,false); assert.notDeepEqual(double.received,double.sentBlock);
});

test('block parity constructs and corrects every single-bit position under both conventions', () => {
  for (const convention of ['even','odd']) for (let row=0;row<4;row++) for(let column=0;column<8;column++) {
    const result=M.parity({mode:'block',convention,flips:[{row,column}]});
    assert.deepEqual(result.failedRows,[row]); assert.deepEqual(result.failedColumns,[column]);
    assert.deepEqual(result.candidate,{row,column}); assert.equal(result.correctable,true);
    assert.deepEqual(result.corrected,result.sentBlock);
    const final=result.frames.at(-1).grid;
    assert.deepEqual(final.failedRows,[]); assert.deepEqual(final.failedColumns,[]);
    assert.ok([...final.counts.rows,...final.counts.columns].every(n=>n%2===(convention==='even'?0:1)));
  }
});

test('multiple bit patterns expose detection limits and never silently regenerate checking bits', () => {
  const rectangle=[{row:0,column:0},{row:0,column:1},{row:1,column:0},{row:1,column:1}];
  const hidden=M.parity({mode:'block',flips:rectangle});
  assert.equal(hidden.detected,false); assert.notDeepEqual(hidden.received,hidden.sentBlock);
  assert.equal(hidden.received[3],hidden.sentBlock[3],'transmitted checking row is retained');
  const ambiguous=M.parity({mode:'block',flips:rectangle.slice(0,3)});
  assert.equal(ambiguous.detected,true); assert.ok(ambiguous.candidate);
  assert.equal(ambiguous.correctable,false,'three errors can imitate a single error syndrome');
  assert.deepEqual(ambiguous.corrected,ambiguous.received);
  assert.throws(()=>M.parity({data:'101'}),/seven/);
  assert.throws(()=>M.parity({mode:'block',flips:[{row:4,column:0}]}),/inside/);
  assert.equal(M.parity({flips:[{row:0,column:1},{row:0,column:1}]}).detected,false,'flipping a bit twice restores it');
});

test('checksum uses sender and receiver data independently and demonstrates cancelling changes', () => {
  const same=M.checksum({scenario:'unchanged'});
  assert.equal(same.sentSum,282); assert.equal(same.sentChecksum,26); assert.equal(same.matches,true);
  const changed=M.checksum({scenario:'single'});
  assert.equal(changed.sentChecksum,26); assert.equal(changed.receivedChecksum,27); assert.equal(changed.matches,false);
  const cancelling=M.checksum({scenario:'cancelling'});
  assert.equal(cancelling.dataChanged,true); assert.equal(cancelling.matches,true);
  assert.deepEqual(cancelling.received,[85,120,77]);
  assert.equal(M.checksum({original:[255,0],scenario:'cancelling'}).matches,true);
  assert.equal(M.checksum({original:[100,100,80],received:[101,99,80],scenario:'custom'}).receivedChecksum,24);
});

test('invalid checksum bytes cannot produce a plausible stale result', () => {
  for (const original of ['', '256', '-1','1.5','12oops','1,,2',Array(9).fill(1)]) assert.throws(()=>M.checksum({original}),/1–8 integer bytes/);
  assert.throws(()=>M.checksum({original:[0,0],scenario:'cancelling'}),/cancelling/);
  assert.throws(()=>M.checksum({original:[1,2],received:[1],scenario:'custom'}),/same number/);
});

test('lab markup has independent controls and complete no-script computed walkthroughs', async () => {
  const {renderSection6Lab}=await import('./course-v3-section6-labs.mjs');
  for(const kind of ['signature','firewall','antivirus','antispyware','encryption','parity','checksum']) {
    const html=renderSection6Lab(kind,{id:`test-${kind}`});
    assert.match(html,/data-s6-action="previous"/); assert.match(html,/data-s6-action="next"/); assert.match(html,/data-s6-action="reset"/);
    assert.match(html,/s6-lab-fallback/); assert.match(html,/aria-live="polite"/);
    assert.equal((html.match(new RegExp(`id="test-${kind}"`,'g'))??[]).length,1);
  }
  const block=renderSection6Lab('parity',{id:'test-block',variant:'block'});
  assert.match(block,/data-s6-field="mode" value="block"/); assert.match(block,/role="tablist"/); assert.match(block,/Parity byte/);
  assert.throws(()=>renderSection6Lab('parity'),/unique, safe/);
  assert.throws(()=>renderSection6Lab('unknown',{id:'test'}),/Unknown/);
});

test('separate model runs do not mutate their caller inputs or another experiment result', () => {
  const rows=['1011001','0110000','1100011'],flips=[{row:1,column:2}],original=[84,121,77];
  const before=JSON.stringify({rows,flips,original});
  const first=M.parity({mode:'block',rows,flips});
  const firstSnapshot=JSON.stringify(first);
  M.parity({mode:'block',rows,flips:[{row:0,column:0}]});
  M.checksum({original,scenario:'cancelling'});
  assert.equal(JSON.stringify({rows,flips,original}),before);
  assert.equal(JSON.stringify(first),firstSnapshot);
});

// A minimal DOM adapter exercises actual controller events, without installing a
// browser package or copying the controller's calculations into the test.
function encryptionLab() {
  const fields=Object.fromEntries([['message','Meet at 8'],['key','13'],['decryptionKey','13']].map(([name,value])=>[name,{
    dataset:{s6Field:name},value,type:name==='message'?'text':'number',checked:undefined,
    matches: selector=>selector==='[data-s6-field]',
  }]));
  const makeNode=()=>({hidden:false,textContent:'',innerHTML:'',disabled:false,replaceChildren(){this.innerHTML='';}});
  const nodes={};
  for(const key of ['.s6-lab-error','.s6-lab-live','[data-s6-stage]','[data-s6-progress]','[data-s6-result]']) nodes[key]=makeNode();
  for(const action of ['previous','next','reset']) nodes[`[data-s6-action="${action}"]`]={...makeNode(),dataset:{s6Action:action},closest(selector){return selector==='[data-s6-action]'?this:null;}};
  const events={};
  const lab={dataset:{s6Lab:'encryption'},classList:{add(){}},
    querySelector(selector){const match=selector.match(/^\[data-s6-field="([^"]+)"\]$/);return match?fields[match[1]]:nodes[selector];},
    querySelectorAll(selector){return selector==='[data-s6-field]'?Object.values(fields):[];},
    addEventListener(name,callback){events[name]=callback;},
  };
  return {lab,fields,nodes,
    set(name,value){fields[name].value=value;events.input({target:fields[name]});},
    click(action){events.click({target:nodes[`[data-s6-action="${action}"]`]});},
  };
}

test('actual browser controller keeps two encryption instances independent across inputs, errors and reset', () => {
  const a=encryptionLab(),b=encryptionLab();
  vm.runInNewContext(readFileSync(join(__dirname,'course-v3-section6-labs.js'),'utf8'),{
    section6Models:M,document:{querySelectorAll:()=>[a.lab,b.lab]},
  });
  for(let i=0;i<4;i++){a.click('next');b.click('next');}
  assert.match(a.nodes['[data-s6-result]'].textContent,/matching key restores/);
  const bResult=b.nodes['[data-s6-result]'].textContent,bStage=b.nodes['[data-s6-stage]'].innerHTML;
  a.set('decryptionKey','7');
  assert.equal(a.nodes['[data-s6-progress]'].textContent,'Step 1 / 5');
  assert.match(a.nodes['[data-s6-result]'].textContent,/Previous conclusions cleared/);
  for(let i=0;i<4;i++)a.click('next');
  assert.match(a.nodes['[data-s6-result]'].textContent,/different key/);
  a.click('previous');
  assert.doesNotMatch(a.nodes['[data-s6-result]'].textContent,/different key/,'going back must hide the final conclusion');
  a.set('message','');
  assert.equal(a.nodes['[data-s6-stage]'].innerHTML,'');
  assert.equal(a.nodes['.s6-lab-error'].hidden,false);
  assert.equal(a.nodes['[data-s6-action="next"]'].disabled,true);
  assert.match(a.nodes['[data-s6-result]'].textContent,/Previous results cleared/);
  a.set('message','<script>alert(1)</script>');
  assert.equal(a.nodes['.s6-lab-error'].hidden,true);
  assert.match(a.nodes['[data-s6-stage]'].innerHTML,/&lt;script&gt;/);
  assert.doesNotMatch(a.nodes['[data-s6-stage]'].innerHTML,/<script>/);
  a.click('reset');
  assert.equal(a.fields.message.value,'Meet at 8');assert.equal(a.fields.decryptionKey.value,'13');
  assert.equal(a.nodes['[data-s6-progress]'].textContent,'Step 1 / 5');
  assert.equal(b.nodes['[data-s6-result]'].textContent,bResult);assert.equal(b.nodes['[data-s6-stage]'].innerHTML,bStage);
});
