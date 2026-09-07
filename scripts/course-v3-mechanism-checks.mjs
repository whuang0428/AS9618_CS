// Independent checks of the visible SVG, not just its alternative text.
export const spans = s => [...s.matchAll(/<tspan[^>]*>([^<]*)<\/tspan>/g)].map(m=>m[1]);
export const stateCells = (svg,id) => {
  const group=svg.match(new RegExp(`<g data-state="${id}">([\\s\\S]*?)</g></g>`))?.[1]??'';
  return [...group.matchAll(/<g data-cell="(\d+)" data-active="(true|false)">([\s\S]*?)(?:<\/g>|$)/g)].map(m=>({index:Number(m[1]),active:m[2]==='true',value:spans(m[3])[0]}));
};
export const edges = svg => [...svg.matchAll(/<g data-from="([^"]+)" data-to="([^"]+)">([\s\S]*?)<\/g>/g)].map(m=>({from:m[1],to:m[2],path:m[3].match(/<path d="([^"]+)"/)?.[1],label:spans(m[3]).join(' '),arrow:m[3].includes('marker-end="url(#arrow)"')}));

export function validateExtendedMechanisms(files) {
  const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);},same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const drawing=key=>(files[`${key}.svg`]??'').replace(/<title[^>]*>[\s\S]*?<\/title>|<desc[^>]*>[\s\S]*?<\/desc>/g,'');
  const visible=key=>spans(drawing(key)).join(' ');
  const expectEdges=(key,pairs)=>{
    const actual=edges(drawing(key));
    check(same(actual.map(e=>`${e.from}>${e.to}`).sort(),pairs.split(' ').sort()),`${key}: incorrect directed connections`);
    check(actual.every(e=>e.path&&e.arrow),`${key}: a connection lost its directed arrow`);
  };
  expectEdges('buses','READ-cpu>READ-memory READ-cpu>READ-memory READ-memory>READ-cpu WRITE-cpu>WRITE-memory WRITE-cpu>WRITE-memory WRITE-cpu>WRITE-memory');
  const bus=edges(drawing('buses'));
  check(bus[2]?.path==='M845 262H245'&&bus[5]?.path==='M245 467H845','Bus arrow geometry reverses a read or write');
  expectEdges('cache','request>lookup lookup>hit lookup>ram ram>fill');
  expectEdges('interrupt','finish>check check>normal check>save save>isr isr>restore');
  for(const [key,from,to,label,path] of [
    ['cache','lookup','hit','YES · hit','M680 180H830'],['cache','lookup','ram','NO · miss','M520 245V330'],
    ['interrupt','check','normal','NO','M750 172H835'],['interrupt','check','save','YES','M590 240V320'],
  ]){const e=edges(drawing(key)).find(e=>e.from===from&&e.to===to);check(e?.label===label&&e.path===path,`${key}: branch label or physical connection disagrees with its condition`);}
  expectEdges('assembler','source>symbols symbols>resolved');
  // Starting at 20, JMP and one data word occupy two addresses before DONE.
  const doneAddress=20+1+1;
  check(visible('assembler').includes(`DONE = ${doneAddress}`)&&visible('assembler').includes(`jump to address ${doneAddress}`),'Assembler symbol address is not its location');
  const acc=0b10101010,mask=0b00001111;
  [acc,mask,acc&mask,acc|mask,acc^mask].forEach((n,i)=>check(stateCells(drawing('bitwise'),`bits-${i}`).map(c=>c.value).join('')===n.toString(2).padStart(8,'0'),`Bitwise row ${i} has incorrect displayed bits`));
  const diskBefore=stateCells(drawing('defrag'),'disk-before').map(c=>c.value),diskAfter=stateCells(drawing('defrag'),'disk-after').map(c=>c.value);
  check(same([...diskBefore].sort(),['A1','A2','A3','B1','B2','—','—'].sort())&&same([...diskAfter].sort(),[...diskBefore].sort()),'Defragmentation changes file blocks or free space');
  check(same(diskAfter.slice(0,3),['A1','A2','A3']),'Defragmentation fails to group A in logical order');
  expectEdges('dll','app-a>dll app-b>dll');
  expectEdges('java','source>javac javac>bytecode bytecode>jvm jvm>interpreter jvm>jit');
  check(visible('java').includes('for this host CPU')&&visible('java').includes('Editing source requires another build'),'Java loses execution target or rebuild condition');
  check(visible('refinement').includes('INTEGER N &gt; 0')&&visible('refinement').includes('Total &lt;- Total + Value')&&visible('refinement').includes('Mean &lt;- Total / N'),'Mean refinement loses its precondition or computation');
  expectEdges('conditions','adult>and allowed>and and>eligible');
  for(const suspended of [true,false]){const output=20>=18&&!suspended?'TRUE':'FALSE';check(visible('conditions').includes(`Age 20, Suspended ${String(suspended).toUpperCase()} → TRUE AND ${String(!suspended).toUpperCase()} → ${output}.`),'Eligibility example disagrees with AND NOT');}
  expectEdges('record','type>instance');
  for(const pair of ['Name : STRING','YearGroup : INTEGER','FeesPaid : BOOLEAN','Name = &quot;Ada&quot;','YearGroup = 12','FeesPaid = FALSE'])check(visible('record').includes(pair),`Record loses field/type/value ${pair}`);
  const stack=['A','B'],snapshots=[stack.slice()];stack.push('C');snapshots.push(stack.slice());const removed=stack.pop();snapshots.push(stack.slice());
  snapshots.forEach((active,i)=>{
    const groups=[...drawing('stack-state').matchAll(new RegExp(`<g data-stack="${i}" data-index="(\\d+)" data-active="(true|false)">([\\s\\S]*?)</g>`,'g'))];
    const rendered=groups.filter(m=>m[2]==='true').sort((a,b)=>Number(a[1])-Number(b[1])).map(m=>spans(m[3])[0]);
    check(groups.length===3&&same(rendered,active),`Stack snapshot ${i} violates active Top state`);
  });
  check(visible('stack-state').includes(`POP returns ${removed}`),'Stack POP returns the wrong item');
  const queue=[null,'B','C'],front=2,rear=3,capacity=3,newRear=rear%capacity+1;queue[newRear-1]='D';
  check(same(stateCells(drawing('queue-state'),'queue-before').map(c=>[c.value,c.active]),[['—',false],['B',true],['C',true]]),'Queue initial active cells are wrong');
  const renderedQueue=stateCells(drawing('queue-state'),'queue-after');
  check(same(renderedQueue.map(c=>c.value),queue)&&renderedQueue.every(c=>c.active),'Queue wrap overwrites or reorders an active item');
  const removalOrder=Array.from({length:3},(_,i)=>queue[(front-1+i)%capacity]);
  check(visible('queue-state').includes(`Next removals: ${removalOrder.join(' → ')}`)&&visible('queue-state').includes('Front = 2     Rear = 1     Count = 3 (full)'),'Queue pointers, count or FIFO order are wrong');
  expectEdges('queue-state','index-2>index-3 index-3>index-1');
  expectEdges('linked-insert','before-2>before-4 before-4>before-1 before-1>before-0 after-2>after-3 after-3>after-4 after-4>after-1 after-1>after-0');
  const after=drawing('linked-insert').split('After · Head still equals 2')[1]??'';
  const nodes=new Map([...after.matchAll(/>Index (\d+)<\/tspan>[\s\S]*?>([ABCX]) \| Next (\d+)<\/tspan>/g)].map(m=>[Number(m[1]),{data:m[2],next:Number(m[3])}]));
  let at=2;const visited=new Set(),values=[];
  while(at!==0&&nodes.has(at)&&!visited.has(at)){visited.add(at);values.push(nodes.get(at).data);at=nodes.get(at).next;}
  check(at===0&&same(values,['A','X','B','C'])&&nodes.size===4,'Linked-list insertion loses a node, forms a cycle or breaks logical order');
  for(const state of ['After: Ada Dan','After: Eve','After: Ada Dan Eve','Returned line: Ada'])check(visible('file-modes').includes(state),`File mode changes the wrong lines: ${state}`);
  expectEdges('file-read','position-0>line-1 position-1>line-2 position-2>line-3 position-3>end');
  const eof=[...visible('file-read').matchAll(/EOF = (TRUE|FALSE)/g)].map(m=>m[1]);
  const lines=['Ada','','Dan'];check(same(eof,Array.from({length:4},(_,i)=>i>=lines.length?'TRUE':'FALSE')),'EOF is confused with the empty line');
  check(visible('assignment').includes(`12 + 4 = ${12+4}`)&&visible('assignment').includes('Increment stays 4'),'Assignment changes the wrong value');
  for(const [start,id] of [[6,'for-even'],[5,'for-odd']]){const visited=[];for(let i=start;i>=0;i-=2)visited.push(String(i));check(same(stateCells(drawing('for-step'),id).map(c=>c.value),visited),`FOR from ${start} has an off-by-one or direction error`);}
  expectEdges('function-return','caller>tax tax>expression');
  const tax=(20*0.1).toFixed(2),total=(20+Number(tax)).toFixed(2);
  check(visible('function-return').includes(`Return ${tax}`)&&visible('function-return').includes(`Total becomes ${total}`),'Function result is not substituted correctly');
  expectEdges('lifecycle','stage-0>evidence-0 stage-0>stage-1 stage-1>evidence-1 stage-1>stage-2 stage-2>evidence-2 stage-2>stage-3 stage-3>evidence-3 stage-3>stage-4 stage-4>evidence-4');
  expectEdges('iteration','analyse>design design>code code>test test>review review>analyse review>release');
  expectEdges('stub','caller>stub stub>caller caller-real>real real>caller-real');
  check(visible('stub').includes('RETURN 12.50')&&visible('stub').includes('REAL 12.50'),'Stub returned type/value is inconsistent');
  expectEdges('phishing','message>click click>fake fake>capture message>check');
  expectEdges('pharming','typed>resolver resolver>wrong-address wrong-address>fake-server');
  [...drawing('buffer').matchAll(/<g data-buffer="(\d+)" data-level="(\d+)">([\s\S]*?)<\/g>/g)].forEach(m=>{
    const i=Number(m[1]),expected=2+i*(4-2),filled=(m[3].match(/fill="#176b70"/g)??[]).length;
    check(Number(m[2])===expected&&filled===expected,`Buffer interval ${i} has the wrong visible occupancy`);
  });
  check((drawing('buffer').match(/data-buffer=/g)??[]).length===4,'Buffer rate sequence is incomplete');
  return errors;
}

export function extendedMechanismSelfTest(files) {
  let count=0;
  for(const [key,from,to] of [
    ['buses','M845 262H245','M245 262H845'],['cache','YES · hit','NO · hit'],['cache','M520 245V330','M520 245V480'],
    ['interrupt','data-to="save"','data-to="restore"'],['assembler','DONE = 22','DONE = 21'],
    ['bitwise','>1</tspan>','>0</tspan>'],['defrag','>A1</tspan>','>A2</tspan>'],
    ['dll','data-to="dll"','data-to="app-b"'],['java','data-to="bytecode"','data-to="jvm"'],
    ['refinement','N &gt; 0','N &gt;= 0'],['conditions','TRUE AND FALSE → FALSE.','TRUE AND FALSE → TRUE.'],
    ['record','YearGroup = 12','YearGroup = FALSE'],['stack-state','data-index="3" data-active="false"','data-index="3" data-active="true"'],
    ['queue-state','>D</tspan>','>A</tspan>'],['linked-insert','X | Next 4','X | Next 2'],
    ['linked-insert','data-from="after-3" data-to="after-4"','data-from="after-3" data-to="after-1"'],
    ['file-modes','After: Eve','After: Ada'],['file-read','EOF = FALSE','EOF = TRUE'],
    ['assignment','12 + 4 = 16','12 + 4 = 15'],['for-step','>6</tspan>','>5</tspan>'],
    ['function-return','Total becomes 22.00','Total becomes 20.00'],['lifecycle','data-to="stage-1"','data-to="stage-2"'],
    ['iteration','data-to="analyse"','data-to="code"'],['stub','RETURN 12.50','RETURN 1250'],
    ['phishing','data-to="fake"','data-to="check"'],['pharming','data-to="resolver"','data-to="fake-server"'],
    ['buffer','data-level="2"','data-level="3"'],
  ]) {
    const name=`${key}.svg`,start=files[name].indexOf('<g font-family');
    const changed=files[name].slice(0,start)+files[name].slice(start).replace(from,to);
    if(changed===files[name]||!validateExtendedMechanisms({...files,[name]:changed}).length)throw new Error(`Undetected mechanism mutation: ${key}: ${from}`);
    count++;
  }
  return count;
}
