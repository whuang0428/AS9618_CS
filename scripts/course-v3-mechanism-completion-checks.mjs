import { spans, stateCells, edges } from './course-v3-mechanism-checks.mjs';

// Compute examples independently and inspect their displayed SVG content.
// Neither alternative text nor generation-time facts establish correctness.
export function validateCompletionMechanisms(files) {
  const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const drawing=key=>(files[`${key}.svg`]??'').replace(/<title[^>]*>[\s\S]*?<\/title>|<desc[^>]*>[\s\S]*?<\/desc>/g,'');
  const visible=key=>spans(drawing(key)).join(' ');
  const values=(key,id)=>stateCells(drawing(key),id).map(c=>c.value);
  const contains=(key,phrases)=>phrases.forEach(phrase=>check(visible(key).includes(phrase),`${key}: missing or incorrect displayed value ${phrase}`));
  const expectEdges=(key,pairs)=>{
    const actual=edges(drawing(key));
    check(same(actual.map(e=>`${e.from}>${e.to}`).sort(),pairs.split(' ').sort()),`${key}: incorrect directed connections`);
    check(actual.every(e=>e.path&&e.arrow),`${key}: connection lost its arrow`);
  };
  const edgeMatches=(key,from,to,path,label)=>{
    const e=edges(drawing(key)).find(e=>e.from===from&&e.to===to);
    check(e?.path===path&&(label===undefined||e.label===label),`${key}: connection geometry or branch label is incorrect`);
  };
  expectEdges('character-code','character>code code>bits bits>byte');
  const code='A'.charCodeAt(0);
  contains('character-code',[String(code),code.toString(2),code.toString(2).padStart(8,'0')]);
  expectEdges('microwave-path','clear-a>clear-b');
  edgeMatches('microwave-path','clear-a','clear-b','M255 195H845','Directional beam');
  check(/d="M255 445H445"[^>]*marker-end="url\(#red-arrow\)"/.test(drawing('microwave-path')),'Microwave blocked ray must stop at the obstruction');
  expectEdges('satellite-path','ground-a>satellite satellite>receiver');
  edgeMatches('satellite-path','ground-a','satellite','M185 390V178H390','Uplink');
  edgeMatches('satellite-path','satellite','receiver','M710 178H915V390','Downlink');
  expectEdges('feedback-cycle','target>controller controller>actuator actuator>condition condition>sensor sensor>controller');
  edgeMatches('feedback-cycle','sensor','controller','M375 370V290H550V220','New reading');
  expectEdges('alu-control','cir>cu clock>cu cu>alu acc-old>alu memory>alu alu>acc-new');
  contains('alu-control',['ADD 410','Memory[410] = 11',`6 + 11 = ${6+11}`,'ACC after']);
  check(spans(drawing('alu-control')).at(-2)===String(6+11),'ALU result is not copied to ACC');
  expectEdges('execute-load','decode>mar mar>mdr mdr>acc');
  contains('execute-load',['CIR = LDD 700; PC = 201','Address 700','MDR becomes 45','ACC becomes 45','PC is still 201']);
  expectEdges('indexed-store','address>source source>acc acc>destination');
  const source=400+2;
  contains('indexed-store',[`400 + 2 = ${source}`,`Memory[${source}] = 31`,'Memory[450] = 31','ACC = 31; IX = 2']);
  const byte=0b00010001;
  [byte,1<<4,byte&(1<<4),byte,1<<2,byte|(1<<2)].forEach((n,i)=>check(values('device-control',`control-${i}`).join('')===n.toString(2).padStart(8,'0'),`Device control row ${i} changes the wrong bits`));
  expectEdges('os-services','user>application application>os os>hardware hardware>result');
  contains('os-services',['Select Save','Request file save','Operating system','Driver / hardware','Reported to the application']);
  expectEdges('printer-services','queue>driver driver>buffer buffer>printer printer>os');
  contains('printer-services',['A active; B waiting','Device commands','Hold transfer data','Print job A','Schedule further work']);
  expectEdges('backup-restore','original>backup original>lost backup>restored');
  check(same(spans(drawing('backup-restore')).filter(s=>/^V\d$/.test(s)),['V1','V1','V1']),'Restore recovers a version absent from the backup');
  contains('backup-restore',['Time 2: edited to V2','Then working file is lost','Restore V1']);
  expectEdges('library-call','caller>library library>caller');
  contains('library-call',['SQRT(81)',`Result: ${Math.sqrt(81)}`,'negative input','test zero']);
  edgeMatches('library-call','library','caller','M715 240H445',`Result: ${Math.sqrt(81)}`);
  expectEdges('account-permissions','credentials>authenticate authenticate>deny-login authenticate>permissions');
  edgeMatches('account-permissions','authenticate','deny-login','M740 185H835','NO');
  edgeMatches('account-permissions','authenticate','permissions','M580 255V355','YES');
  contains('account-permissions',['Allow or deny this operation']);
  expectEdges('virus-host','host>execute execute>replicate replicate>share execute>payload');
  contains('virus-host',['Contains virus code','Virus code can run','Other files infected','Possible payload']);
  expectEdges('module-contract','inputs>calculate calculate>display');
  contains('module-contract',['Quantity; UnitPrice','CalculateCharge','Returns Amount','DisplayReceipt','Outputs Amount']);
  expectEdges('ipo-cost','input>process process>output constant>process');
  const cost=4.25*3+3.5;
  contains('ipo-cost',[`= ${cost}`,String(cost),'Fixed postage','3.50']);
  expectEdges('ticket-payment','quantity>subtotal subtotal>discount discount>total total>payment payment>success payment>failure');
  const total=2*25*.9;
  contains('ticket-payment',[`Total = ${total.toFixed(2)}`,`Change = ${(50-total).toFixed(2)}`,`PlacesLeft = 8 - 2 = ${8-2}`,'PlacesLeft stays 8']);
  edgeMatches('ticket-payment','total','payment','M947 225V242H550V255');
  edgeMatches('ticket-payment','payment','success','M375 322H195V480','YES: Paid 50.00');
  edgeMatches('ticket-payment','payment','failure','M725 322H890V480','NO: Paid 40.00');
  const ages=[15,17,16,15,18],lower=3,upper=7;
  check(values('array-index','ages').length===upper-lower+1&&same(values('array-index','ages'),ages.map(String)),'Array inclusive bounds or elements are incorrect');
  contains('array-index',[`Ages[4] = ${ages[4-lower]}`]);
  edgeMatches('array-index','index-4','value-17','M495 205V230');
  const marks=[6,9,4,7];let sum=0;const totals=marks.map(n=>String(sum+=n));
  check(same(values('array-total','marks'),marks.map(String))&&same(values('array-total','totals'),totals),'Array accumulator loses or duplicates a contribution');
  contains('array-total',[`OUTPUT after the loop: ${sum}, then the retained third mark ${marks[2]}.`]);
  const items=[9,4,6,4,2],position=items.indexOf(4)+1;
  check(same(values('linear-search','search-values'),items.map(String)),'Linear search changes the supplied array');
  contains('linear-search',[`Match at index ${position}`,`Position &lt;- ${position}; stop`,'Position = 0','outside indices 1..5']);
  expectEdges('linear-search','check-1>check-2');
  edgeMatches('linear-search','check-1','check-2','M315 234V340H465V234','Mismatch → next');
  // Model allocation and release without borrowing the diagram's state fixtures.
  const active=[2,4],free=[1,3],snapshots=[[active.slice(),free.slice()]];
  active.splice(1,0,free.shift());snapshots.push([active.slice(),free.slice()]);
  free.unshift(active.splice(active.indexOf(4),1)[0]);snapshots.push([active.slice(),free.slice()]);
  check(snapshots.every(([a,f])=>new Set([...a,...f]).size===4&&a.every(n=>!f.includes(n))),'Free-list model must partition all four slots');
  check(same(spans(drawing('free-chains')).filter(s=>/^\d$/.test(s)),snapshots.flatMap(pair=>pair.flatMap(list=>[...list,0].map(String)))),'Free-chain visible nodes disagree with allocation/release');
  const expectedLinks=snapshots.flatMap((pair,i)=>pair.flatMap((nodes,row)=>nodes.map((n,j)=>`${i}-${row}-${n}>${i}-${row}-${nodes[j+1]??0}`)));
  expectEdges('free-chains',expectedLinks.join(' '));
  const ints=Array.from({length:6},(_,i)=>i);
  check(same(values('random-die','truncated'),ints.map(String))&&same(values('random-die','die'),ints.map(i=>String(i+1))),'Random die includes a wrong integer outcome');
  contains('random-die',ints.map(i=>`[${i},${i+1})`));
  expectEdges('bounded-login','start>init init>condition condition>input input>increment increment>condition condition>output output>end');
  contains('bounded-login',['Password &lt;&gt; &quot;open&quot;','AND Attempts &lt; 3?','Attempts &lt;- Attempts + 1','OUTPUT Password = &quot;open&quot;, Attempts']);
  edgeMatches('bounded-login','condition','input','M540 520V585','TRUE');
  edgeMatches('bounded-login','condition','output','M795 435H935V860','FALSE');
  edgeMatches('bounded-login','increment','condition','M330 747H115V435H285');
  for(const input of [['open'],['x','y','open'],['x','y','z']]){
    let password='',attempts=0;
    while(password!=='open'&&attempts<3)password=input[attempts++];
    contains('bounded-login',[`${input.join(', ')} → ${String(password==='open').toUpperCase()}, ${attempts}`]);
  }
  const entered=[-1,0,50,101,100],accepted=entered.filter(n=>n>=0&&n<=100),acceptedTotal=accepted.reduce((a,b)=>a+b,0);
  for(const n of entered)contains('validated-slots',[`${n}: ${n>=0&&n<=100?'accept':'reject'}`]);
  contains('validated-slots',[`0 + 50 + 100 = ${acceptedTotal}`,`mean = ${acceptedTotal} / 3 = ${acceptedTotal/3}`,'Mark &gt;= 50']);
  const recorded=[...drawing('validated-slots').matchAll(/>Record only<\/tspan>\s*<tspan[^>]*>(\d+)<\/tspan>/g)].map(m=>Number(m[1]));
  check(same(recorded,accepted)&&accepted.filter(n=>n>=50).length===2,'Rejected attempts consume an accepted slot');
  const boundary=[49,50,51];
  for(const [id,test] of [['old-pass',n=>n>50],['fixed-pass',n=>n>=50]])check(same(values('regression-boundary',id),boundary.map(n=>test(n)?'Pass':'Fail')),'Regression result disagrees with its comparison');
  const countMarks=[49,50,69,70];
  contains('independent-counts',['IF Mark &gt;= 50','IF Mark &gt;= 70','PassCount +1 AND MeritCount +1',`PassCount = ${countMarks.filter(n=>n>=50).length}; MeritCount = ${countMarks.filter(n=>n>=70).length}.`]);
  expectEdges('independent-counts','mark>pass-test pass-test>merit-test');
  return errors;
}

export function completionMechanismSelfTest(files) {
  let count=0;
  for(const [key,from,to] of [
    ['character-code','>01000001</tspan>','>01000010</tspan>'],
    ['microwave-path','M255 445H445','M255 445H845'],
    ['satellite-path','M710 178H915V390','M915 390V178H710'],
    ['feedback-cycle','data-to="controller"','data-to="actuator"'],
    ['alu-control','6 + 11 = 17','6 + 11 = 18'],
    ['execute-load','PC is still 201','PC is still 202'],
    ['indexed-store','Memory[450] = 31','Memory[450] = 402'],
    ['device-control','>1</tspan>','>0</tspan>'],
    ['os-services','data-to="os"','data-to="hardware"'],
    ['printer-services','A active; B waiting','B active; A waiting'],
    ['backup-restore','Restore V1','Restore V2'],
    ['library-call','Result: 9','Result: 81'],
    ['account-permissions','>NO</tspan>','>YES</tspan>'],
    ['virus-host','data-to="replicate"','data-to="share"'],
    ['module-contract','Returns Amount','Returns Quantity'],
    ['ipo-cost','= 16.25','= 12.75'],
    ['ticket-payment','YES: Paid 50.00','NO: Paid 50.00'],
    ['ticket-payment','PlacesLeft stays 8','PlacesLeft stays 6'],
    ['array-index','Ages[4] = 17','Ages[4] = 4'],
    ['array-total','>15</tspan>','>9</tspan>'],
    ['linear-search','Position &lt;- 2; stop','Position &lt;- 4; stop'],
    ['free-chains','>4</tspan>','>3</tspan>'],
    ['free-chains','data-to="1-0-1"','data-to="1-0-4"'],
    ['random-die','[5,6)','[5,6]'],
    ['bounded-login','AND Attempts &lt; 3?','OR Attempts &lt; 3?'],
    ['bounded-login','M540 520V585','M540 520V710'],
    ['validated-slots','101: reject','101: accept'],
    ['regression-boundary','>Fail</tspan>','>Pass</tspan>'],
    ['independent-counts','MeritCount = 1.','MeritCount = 0.'],
  ]) {
    const name=`${key}.svg`,start=files[name].indexOf('<g font-family');
    const changed=files[name].slice(0,start)+files[name].slice(start).replace(from,to);
    if(changed===files[name]||!validateCompletionMechanisms({...files,[name]:changed}).length)throw new Error(`Undetected completion mutation: ${key}: ${from}`);
    count++;
  }
  return count;
}
