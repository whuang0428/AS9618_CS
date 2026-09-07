// The displayed states are explicit fixtures. The verifier independently executes
// the operations and checks the SVG cells and directed edges against the results.
import { completionMechanisms, completionDiagramTargets } from './course-v3-mechanism-completion.mjs';
export const extendedDiagramTargets = {
  ...completionDiagramTargets,
  's4-buses':'buses', 's4-performance':'cache', 's4-interrupt-handling':'interrupt',
  's4-two-pass':'assembler', 's4-bitwise':'bitwise', 'S5.01-PROCESSES':'processes',
  'S5.02-DEFRAG':'defrag', 'S5.03-DLL':'dll', 'S5.06-JAVA':'java',
  'S9-REFINEMENT-LEVELS':'refinement', 'S9-LOGIC-COMBINE':'conditions',
  'S10-RECORD-DEFINITION':'record', 'S10-STACK-ARRAY':'stack-state',
  'S10-QUEUE-ARRAY':'queue-state', 'S10-LINKED-OPERATIONS':'linked-insert',
  'S10-FILE-PERSISTENCE':'file-modes', 'S10-FILE-READ':'file-read',
  'S11-ASSIGN-IO':'assignment', 'S11-FOR-STEP':'for-step', 'S11-FUNCTION-RETURN':'function-return',
  'S12-LIFECYCLE-STAGES':'lifecycle', 'S12-ITERATIVE':'iteration', 'S12-TEST-INTEGRATION':'stub',
  'S6-PHISHING':'phishing', 'S6-PHARMING':'pharming', 'S3.04-BUFFER':'buffer',
};

export function extendedMechanisms({ text, box, arrow, decision, io, terminal, esc, teal, red }) {
  const edge = (from,to,d,label='',x=0,y=0) => `<g data-from="${from}" data-to="${to}">${arrow(d,label,x,y)}</g>`;
  const cells = (id,values,x,y,w=130,active=values.map(()=>true)) => `<g data-state="${id}">`+values.map((v,i)=>
    `<g data-cell="${i+1}" data-active="${active[i]}">`+box(x+i*w,y,w-8,64,String(v),active[i]?'#e1f0ed':'#f2f4f6',28)+'</g>').join('')+'</g>';
  const note = (lines,y) => box(35,y,1030,Array.isArray(lines)&&lines.length>1?90:65,lines,'#fff4dd',24);
  const chain = (labels,y,ids=labels.map((_,i)=>`n${i}`)) => labels.map((label,i)=>box(35+i*265,y,235,90,label,'#eef7f6',25)+(i<labels.length-1?edge(ids[i],ids[i+1],`M${270+i*265} ${y+45}H${300+i*265}`):'')).join('');
  return {
    ...completionMechanisms({text,box,arrow,decision,io,terminal,edge,note,chain,cells,teal,red}),
    buses: {
      title:'A memory read and a memory write use different data directions',height:610,
      facts:['In the processor-controlled model, the address goes from CPU to memory for both reads and writes.', 'For a read, data returns from memory to CPU; for a write, data goes from CPU to memory.', 'READ and WRITE are CPU control outputs. Other control lines, such as interrupt requests, can be inputs.'],
      draw:()=>['READ','WRITE'].map((mode,i)=>{const y=145+i*205;return text(35,y-32,`${i+1} · ${mode} operation`,26)+box(35,y,210,135,'CPU')+box(845,y,220,135,'Memory')+
        edge(`${mode}-cpu`,`${mode}-memory`,`M245 ${y+20}H845`,'Address selects location',540,y+10)+
        edge(`${mode}-cpu`,`${mode}-memory`,`M245 ${y+68}H845`,`${mode} control signal`,540,y+58)+
        (i===0?edge('READ-memory','READ-cpu',`M845 ${y+117}H245`,'Instruction or data',540,y+107):edge('WRITE-cpu','WRITE-memory',`M245 ${y+117}H845`,'Data to store',540,y+107));}).join('')+text(35,575,'The control bus is a collection of signal lines with defined individual directions.',24),
    },
    cache: {
      title:'A cache hit avoids a main-memory read',height:660,
      facts:['This is a simplified read path: the CPU requests an instruction or data item.', 'On a cache hit the cache supplies it. On a miss it is fetched from RAM and supplied to the CPU, with a copy placed in cache.', 'Cache holds copies, not the only permanent copy of a program. Benefit depends on the working set and hit rate.'],
      draw:()=>box(35,140,225,80,['CPU requests','an item'])+edge('request','lookup','M260 180H360')+decision(360,115,320,130,['Item in','cache?'])+
        edge('lookup','hit','M680 180H830','YES · hit',756,164)+box(830,140,235,80,['Cache supplies','the item'])+
        edge('lookup','ram','M520 245V330','NO · miss',618,298)+box(350,330,340,80,['Read the item','from RAM'])+
        edge('ram','fill','M520 410V480')+box(230,480,580,80,['Supply CPU and keep a copy in cache'])+text(35,618,'A larger cache helps only when the extra retained items are useful.',25),
    },
    interrupt: {
      title:'Save the interrupted context before running the ISR',height:740,
      facts:['The current instruction finishes before the basic model checks for a pending enabled interrupt.', 'If a request is accepted, save the return address and required state, run the appropriate ISR, restore state and resume.', 'If no request is accepted, continue normal execution. Priority and enable rules govern acceptance.'],
      draw:()=>box(35,130,290,85,['Finish current','instruction'])+edge('finish','check','M325 172H430')+
        decision(430,105,320,135,['Accept an','interrupt?'])+edge('check','normal','M750 172H835','NO',790,152)+box(835,130,230,85,['Continue','normal work'])+
        edge('check','save','M590 240V320','YES',636,286)+box(350,320,480,70,'Save return address and state')+
        edge('save','isr','M590 390V435')+box(350,435,480,70,'Run ISR; service the event')+
        edge('isr','restore','M590 505V550')+box(350,550,480,70,'Restore state and resume')+text(35,691,'The ISR must not destroy values the interrupted program needs on return.',25),
    },
    assembler: {
      title:'A complete symbol table resolves a forward reference',height:600,
      facts:['Illustrative assembly model: one word per instruction or data item; the location counter starts at 20.', 'Address 20: JMP DONE; address 21: DATA 7; address 22: DONE: END. DONE is a forward reference from address 20.', 'Pass one records DONE = 22. Pass two resolves the jump operand to 22; opcode values depend on the instruction set.'],
      draw:()=>box(35,130,370,190,['Source at location 20','JMP DONE','DATA 7','DONE: END'],'#f3f7fa',27)+edge('source','symbols','M405 225H650','Pass 1',530,205)+box(650,155,415,135,['Symbol table','DONE = 22'])+
        edge('symbols','resolved','M855 290V410','Pass 2',925,358)+box(530,410,535,100,['At address 20: jump to address 22','Translate mnemonic to opcode'], '#eef7f6',25)+
        text(35,370,['Assumption: one word per line.','Advance the location counter','for instructions AND data.'],24)+text(35,565,'An undefined label is still an error after the complete first pass.',25),
    },
    bitwise: {
      title:'Apply the rule independently at every bit position',height:640,
      facts:['Each operation starts with ACC = 10101010 and immediate mask 00001111.', 'AND gives 00001010; OR gives 10101111; XOR gives 10100101.', 'AND with 0 clears; OR with 1 sets; XOR with 1 toggles. The other mask bit preserves the original bit.'],
      draw:()=>[['ACC','10101010'],['Mask','00001111'],['AND result','00001010'],['OR result','10101111'],['XOR result','10100101']].map(([label,bits],i)=>text(35,151+i*82,label,25)+cells(`bits-${i}`,[...bits],265,110+i*82,95)).join('')+text(35,589,'For a direct operand, first read the mask value from its memory address.',25),
    },
    processes: {
      title:'A waiting process lets another ready process use the core',height:610,
      facts:['In this simplified single-core sequence, process A runs, waits for I/O, then becomes ready when I/O completes.', 'While A waits, the OS schedules ready process B. A cannot run again until it is ready and selected.', 'Saving and restoring execution context allows the processes to resume correctly; one core does not execute both instructions at once.'],
      draw:()=>text(35,112,'Time advances from left to right. Scheduling policy is illustrative.',25)+
        text(35,185,'CPU core',26)+chain(['A runs','B runs','B runs','A resumes'],215)+
        text(35,370,'Process A',26)+chain(['Running',['Waiting','for I/O'],['Ready','I/O complete'],'Running'],405)+
        text(35,567,'I/O completion makes A ready; the scheduler still decides when A runs.',25),
    },
    defrag: {
      title:'Rearrange file blocks without changing the file',height:525,
      facts:['A1, A2 and A3 are consecutive logical parts of file A, initially separated physically by B and free blocks.', 'After relocation A1, A2 and A3 occupy consecutive disk blocks. B1 and B2 and the amount of free space are preserved.', 'On an HDD this can reduce mechanical seeking. An SSD has no moving read head.'],
      draw:()=>text(35,125,'Each box is one physical block on a simplified magnetic disk.',25)+text(35,196,'Before',26)+
        cells('disk-before',['A1','B1','—','A2','B2','A3','—'],35,220,148)+text(35,346,'After defragmentation',26)+
        cells('disk-after',['A1','A2','A3','B1','B2','—','—'],35,370,148)+text(35,494,'File A still contains A1 → A2 → A3; only the physical placement changes.',25),
    },
    dll: {
      title:'Static copies and a separate shared library',height:645,
      facts:['Static linking incorporates the required library code in each built executable.', 'Dynamic linking keeps a compatible library separate; multiple applications can call it at load time or runtime.', 'A compatible library update can serve the callers without recompiling each caller, but a reload or restart may be required.'],
      draw:()=>text(35,118,'Static linking',28)+box(35,155,450,125,['Executable A','Application + library code'])+box(585,155,480,125,['Executable B','Application + library code'])+
        text(35,355,'Dynamic linking',28)+box(35,395,250,90,'Application A')+box(815,395,250,90,'Application B')+box(365,395,370,90,['Separate DLL','Compatible interface'])+
        edge('app-a','dll','M285 440H365')+edge('app-b','dll','M815 440H735')+note(['The arrows show calls to the library, not the copying of two library files.','A missing or incompatible DLL can prevent the callers from working.'],525),
    },
    java: {
      title:'Build bytecode once; execute it on a compatible JVM',height:650,
      facts:['javac compiles .java source into .class bytecode. Bytecode targets the JVM, not a universal physical CPU.', 'Compatible JVMs execute the bytecode on their hosts, using interpretation and possibly JIT compilation.', 'Platform-specific native dependencies and incompatible JVM versions can limit portability.'],
      draw:()=>chain([['Source','.java'],['javac','compiler'],['Bytecode','.class'],['Compatible','JVM']],140,['source','javac','bytecode','jvm'])+
        edge('jvm','interpreter','M947 230V310H405V360','Host execution',675,296)+box(255,360,300,100,['Interpreter','executes bytecode'])+
        edge('jvm','jit','M947 310V360')+box(760,360,305,100,['JIT compiles code','for this host CPU'])+
        note(['Editing source requires another build before the bytecode reflects the edit.','A JVM is required on each host; the .class file is not native code for every CPU.'],510),
    },
    refinement: {
      title:'Refine an average calculation until every step is programmable',height:650,
      facts:['The high-level task is to calculate the mean of N values, where N is a positive integer.', 'Refinement defines initialisation, repeated input and accumulation, then division and output.', 'N > 0 is a precondition: division by zero is not a valid refinement for an empty input set.'],
      draw:()=>box(330,110,440,85,'Calculate the mean of N values')+
        `<path d="M550 195V240H200V290M550 240V290M550 240H900V290" stroke="${teal}" stroke-width="3" fill="none"/>`+
        box(35,290,320,140,['Prepare','Require INTEGER N > 0','Total <- 0'],'#eef7f6',24)+box(390,290,320,140,['Repeat N times','INPUT Value','Total <- Total + Value'],'#eef7f6',24)+box(745,290,320,140,['Finish','Mean <- Total / N','OUTPUT Mean'],'#eef7f6',24)+
        note(['Read the three responsibilities from left to right for this algorithm.','Refinement adds the rules inside each step; a heading alone is not enough.'],495),
    },
    conditions: {
      title:'Two required restrictions form an intersection',height:570,
      facts:['Eligibility is (Age >= 18) AND NOT Suspended.', 'Both tests must be true: an adult who is suspended is ineligible, and an unsuspended child is ineligible.', 'For (Age < 12) OR Member, either complete condition is sufficient; both can also be true.'],
      draw:()=>box(35,130,300,105,['Age >= 18','Adult?'])+box(35,310,300,105,['NOT Suspended','Not suspended?'])+
        edge('adult','and','M335 182H420V265H470')+edge('allowed','and','M335 362H420V285H470')+box(470,220,210,110,'AND')+
        edge('and','eligible','M680 275H795')+box(795,220,270,110,['Eligible only','if BOTH are true'])+
        note(['Age 20, Suspended TRUE → TRUE AND FALSE → FALSE.','Age 20, Suspended FALSE → TRUE AND TRUE → TRUE.'],465),
    },
    record: {
      title:'A record type is a template; a variable holds field values',height:620,
      facts:['MemberRecord defines Name as STRING, YearGroup as INTEGER and FeesPaid as BOOLEAN.', 'DECLARE Member : MemberRecord creates one variable. Assigning field values is a separate step.', 'The illustrated values Ada, 12 and FALSE are explicitly assigned example values, not declaration defaults.'],
      draw:()=>text(35,115,'Type definition',28)+box(35,155,440,265,['MemberRecord','Name : STRING','YearGroup : INTEGER','FeesPaid : BOOLEAN'],'#f3f7fa',28)+
        edge('type','instance','M475 285H625')+text(550,226,['Declare,','then assign'],20,'middle')+box(625,155,440,265,['Member','Name = "Ada"','YearGroup = 12','FeesPaid = FALSE'],'#eef7f6',28)+
        note(['Member.YearGroup selects one named field; changing it preserves the others.','Creating a record in RAM does not save it to a file.'],480),
    },
    'stack-state': {
      title:'Top marks the active stack, even if an old value remains',height:565,
      facts:['Capacity is 3 and Top is the last occupied 1-based index. Start with A and B, Top = 2.', 'PUSH C stores C at index 3 and sets Top = 3. POP then returns C and restores Top = 2.', 'C can remain physically in cell 3 after POP, but that cell is inactive. Top = 0 is empty; Top = 3 is full.'],
      draw:()=>[['Start',['A','B','—'],2],['PUSH C',['A','B','C'],3],['POP returns C',['A','B','C'],2]].map(([label,v,top],i)=>{
        const x=35+i*365;return text(x,130,label,27)+[3,2,1].map(index=>`<g data-stack="${i}" data-index="${index}" data-active="${index<=top}">`+box(x+45,170+(3-index)*77,205,65,v[index-1],index<=top?'#e1f0ed':'#f2f4f6',28)+text(x+17,210+(3-index)*77,index,24,'middle')+'</g>').join('')+text(x+150,452,`Top = ${top}`,27,'middle')+(i<2?arrow(`M${x+264} 280H${x+352}`):'');}).join('')+text(35,525,'Grey means inactive. The next PUSH overwrites the cell above Top.',25),
    },
    'queue-state': {
      title:'Wrap the rear index while preserving arrival order',height:660,
      facts:['Capacity is 3. Initially Front = 2, Rear = 3, Count = 2; B and C are waiting at indices 2 and 3.', 'ENQUEUE D wraps Rear to 1 and increases Count to 3. Front stays 2.', 'Array cells now hold D, B, C; logical removal order is B, C, D, following indices 2, 3, 1.'],
      draw:()=>text(35,115,'Physical array indices →',25)+[1,2,3].map((n,i)=>text(365+i*220,163,n,25,'middle')).join('')+
        text(35,220,'Before',26)+cells('queue-before',['—','B','C'],260,185,220,[false,true,true])+text(35,290,'Before: Front = 2     Rear = 3     Count = 2',26)+
        text(35,385,'ENQUEUE D',26)+cells('queue-after',['D','B','C'],260,350,220)+text(35,325,'After: Front = 2     Rear = 1     Count = 3 (full)',26)+
        edge('index-2','index-3','M590 414V510H810V414')+edge('index-3','index-1','M912 382H990V565H305V414')+
        text(590,547,'Next removals: B → C → D',26,'middle')+text(35,625,'Read from Front around the array; index 1 is not automatically served first.',25),
    },
    'linked-insert': {
      title:'Preserve the successor before linking the new node',height:680,
      facts:['Initially Head = 2 and the chain is 2:A → 4:B → 1:C → 0. Slot 3 is free.', 'To insert X after A, store X in slot 3 and set Next[3] = 4 before setting Next[2] = 3.', 'The resulting chain is 2:A → 3:X → 4:B → 1:C → 0. To delete X, restore Next[2] = 4 and release slot 3.'],
      draw:()=>text(35,118,'Before · Head = 2; 0 is the null link',26)+chain([['Index 2','A | Next 4'],['Index 4','B | Next 1'],['Index 1','C | Next 0'],'0 (end)'],150,['before-2','before-4','before-1','before-0'])+
        text(35,307,'1 · Save X in slot 3; set Next[3] = 4.    2 · Set Next[2] = 3.',25)+
        text(35,379,'After · Head still equals 2',26)+chain([['Index 2','A | Next 3'],['Index 3','X | Next 4'],['Index 4','B | Next 1'],['Index 1','C | Next 0']],415,['after-2','after-3','after-4','after-1'])+
        edge('after-1','after-0','M1065 460H1080V545H947','0 · end',989,576)+text(35,631,'Deleting X reverses the bypass: Next[2] <- 4, then release slot 3.',25),
    },
    'file-modes': {
      title:'READ preserves, WRITE replaces, APPEND extends',height:590,
      facts:['Each independent example starts with a file containing the lines Ada and Dan.', 'READ Ada leaves both stored lines unchanged. Opening for WRITE replaces old contents; writing Eve leaves only Eve.', 'Opening for APPEND and writing Eve leaves Ada, Dan, Eve in that order. Close the file after access.'],
      draw:()=>['READ one line','WRITE "Eve"','APPEND "Eve"'].map((label,i)=>{const x=35+i*365;return text(x,130,label,27)+box(x,165,300,90,['Before: Ada','Dan'])+arrow(`M${x+150} 255V325`)+box(x,325,300,130,i===0?['After: Ada','Dan']:i===1?['After: Eve']:['After: Ada','Dan','Eve'])+text(x,492,i===0?'Returned line: Ada':i===1?'Old lines replaced':'Old lines retained',24);}).join('')+text(35,558,'Choose a mode before access. All three panels start from the original file.',24),
    },
    'file-read': {
      title:'An empty line is data; end of file is a position',height:620,
      facts:['This text file contains Ada, an empty line, and Dan: three lines in total.', 'Before each READFILE, EOF is false if a line remains. Reading the empty line returns an empty STRING and still advances the position.', 'After Dan, EOF is true and no further READFILE should execute. An empty file starts with EOF true and yields zero lines.'],
      draw:()=>[0,1,2,3].map(i=>{const x=35+i*265;return text(x,123,`After ${i} reads`,26)+['Ada','"" (blank)','Dan'].map((line,j)=>box(x+25,165+j*77,190,65,line,j<i?'#f2f4f6':'#e1f0ed',26)).join('')+
        edge(`position-${i}`,i<3?`line-${i+1}`:'end',`M${x} ${197+i*77}H${x+24}`)+text(x+115,460,`EOF = ${i===3?'TRUE':'FALSE'}`,24,'middle');}).join('')+
        note(['Count every successful read, including the empty string: total 3 lines.','Guard each read with NOT EOF; close the file after the loop.'],515),
    },
    assignment: {
      title:'Evaluate the right-hand expression before storing its result',height:540,
      facts:['Illustrative update: Total starts at 12 and Increment at 4; execute Total <- Total + Increment.', 'Read the old values 12 and 4, calculate 16, then replace Total with 16. Increment stays 4.', 'The assignment arrow means store; an equals comparison tests whether two values are equal.'],
      draw:()=>text(35,120,'Statement: Total <- Total + Increment',30)+chain([['Read old values','12 and 4'],['Evaluate RHS','12 + 4 = 16'],['Store result','Total becomes 16'],['Other storage','Increment stays 4']],185)+
        note(['An assignment may read the same variable that it later overwrites.','INPUT must obtain required values before an expression uses them.'],345),
    },
    'for-step': {
      title:'A negative step stops before crossing the lower endpoint',height:535,
      facts:['FOR Index <- 6 TO 0 STEP -2 executes at 6, 4, 2 and 0, then stops.', 'FOR Index <- 5 TO 0 STEP -2 executes at 5, 3 and 1; -1 lies past the endpoint and is not executed.', 'An inclusive endpoint is visited only if the step sequence reaches it. STEP 0 does not make progress.'],
      draw:()=>text(35,124,'6 TO 0 STEP -2',28)+cells('for-even',[6,4,2,0],35,165,210)+text(902,205,'4 iterations',25)+
        text(35,307,'5 TO 0 STEP -2',28)+cells('for-odd',[5,3,1],35,350,210)+box(665,350,202,64,'-1','#ffe0d9',28)+text(912,386,['Stop here','No body'],24)+
        text(35,489,'0 is used in the first sequence; the second sequence never reaches 0.',25),
    },
    'function-return': {
      title:'RETURN supplies a value to the caller’s expression',height:660,
      facts:['Illustrative function: Tax(Amount : REAL) RETURNS REAL returns Amount * 0.10.', 'With Price = 20.00, Total <- Price + Tax(Price) calls Tax with a value copy of 20.00, then receives 2.00.', 'The caller completes 20.00 + 2.00 and stores Total = 22.00. Returning a value does not itself print it.'],
      draw:()=>box(35,140,490,120,['Caller: Price = 20.00','Total <- Price + Tax(Price)'],'#f3f7fa',26)+edge('caller','tax','M525 200H675')+text(600,145,['Argument','20.00'],20,'middle')+box(675,130,390,145,['Tax(Amount) RETURNS REAL','RETURN Amount * 0.10','Result: 2.00'],'#eef7f6',24)+
        edge('tax','expression','M870 275V370H525','Return 2.00',685,353)+box(35,325,490,110,['Total <- 20.00 + 2.00','Total becomes 22.00'])+
        note(['The function call appears inside an expression; do not prefix it with CALL.','In this Cambridge notation, function parameters use value passing.'],520),
    },
    lifecycle: {
      title:'Connect each development activity with the evidence it produces',height:860,
      facts:['Analysis defines requirements; design specifies the solution; coding implements it; testing compares actual with expected behaviour; maintenance changes the delivered system.', 'The sequence illustrates the activities, not a rule that feedback is forbidden.', 'Tests or real use can expose a need to revisit requirements, design or code.'],
      draw:()=>[['Analysis','User requirements and constraints'],['Design','Data, algorithms, interfaces and tests'],['Coding','Implementation of the design'],['Testing','Expected and actual results'],['Maintenance','Changes after delivery']].map(([name,result],i)=>{
        const y=125+i*132;return box(70,y,300,85,name)+edge(`stage-${i}`,`evidence-${i}`,`M370 ${y+42}H505`)+box(505,y,560,85,result,'#f3f7fa',25)+(i<4?edge(`stage-${i}`,`stage-${i+1}`,`M220 ${y+85}V${y+132}`):'');}).join('')+text(35,826,'Feedback can return the team to an earlier activity when evidence requires it.',25),
    },
    iteration: {
      title:'Review a working version, then use feedback in the next cycle',height:650,
      facts:['Each iteration revisits analysis, design, coding and testing to produce a version for review.', 'User feedback changes the priorities or requirements for the next version.', 'A cycle needs agreed scope and stopping criteria; the process is not an instruction to repeat forever.'],
      draw:()=>chain(['Analyse','Design','Code','Test'],140,['analyse','design','code','test'])+
        edge('test','review','M947 230V330H715')+box(395,330,320,100,['Working version','User review'])+
        edge('review','analyse','M395 380H150V230','Feedback',258,358)+
        edge('review','release','M555 430V505','Agreed criteria met',711,477)+box(395,505,320,80,'Deliver this version')+
        text(35,627,'Control scope, versions and schedule while findings guide the next cycle.',24),
    },
    stub: {
      title:'A stub tests a caller’s response before the real callee exists',height:675,
      facts:['In this illustrative interface, ProcessOrder calls GetPrice(ItemCode) and expects a REAL price.', 'A temporary stub returns the controlled REAL value 12.50 so the caller can be exercised.', 'Replace the stub with the real pricing module and repeat integration tests. The stub test has not tested the real lookup.'],
      draw:()=>text(35,118,'During early integration',27)+box(35,160,375,110,['ProcessOrder','GetPrice(ItemCode)'])+edge('caller','stub','M410 190H680','ItemCode',545,174)+box(680,160,385,110,['Temporary GetPrice stub','RETURN 12.50'],'#fff4dd',25)+edge('stub','caller','M680 242H410','REAL 12.50',545,231)+
        text(35,384,'After the real module is available',27)+box(35,430,375,110,['ProcessOrder','Same interface'])+edge('caller-real','real','M410 460H680','ItemCode',545,443)+box(680,430,385,110,['Real pricing module','Look up the correct price'])+edge('real','caller-real','M680 511H410','REAL result',545,499)+
        text(35,622,'Retest argument order, types, units and meaning with the real implementation.',24),
    },
    phishing: {
      title:'Phishing succeeds by persuading a person to act',height:610,
      facts:['An impersonating message creates a pretext such as an urgent account problem.', 'Following its link can take the user to a fake sign-in page where submitted credentials are captured.', 'An independent known contact or website checks the request without trusting the supplied link.'],
      draw:()=>chain([['Impersonating','message'],['User follows','its link'],['Fake sign-in','page'],['Credentials','captured']],155,['message','click','fake','capture'])+
        edge('message','check','M152 245V365')+box(35,365,500,105,['Alternative: verify independently','Use a known contact or saved address'])+
        text(610,395,['The deception targets the user’s trust.','MFA may limit password theft;','it does not validate every request.'],24)+
        text(35,570,'A request’s urgency is not evidence that its sender is genuine.',25),
    },
    pharming: {
      title:'Pharming can redirect a correctly typed address',height:620,
      facts:['The user types the intended hostname. A corrupted name-resolution path supplies the attacker-controlled destination.', 'The browser may reach a fraudulent server despite the address being entered correctly.', 'A hostname or certificate mismatch is a warning. HTTPS alone is not proof of the organisation behind a site.'],
      draw:()=>chain([['User types','intended hostname'],['Name resolution','has been corrupted'],['Wrong server','address supplied'],['Fraudulent','destination']],155,['typed','resolver','wrong-address','fake-server'])+
        box(35,365,500,110,['Protect name-resolution settings','Investigate certificate/hostname warnings'])+
        text(610,396,['The changed destination is the mechanism.','A deceptive message is not required','in this example.'],24)+
        text(35,574,'Correct spelling does not repair corrupted name-resolution information.',25),
    },
    buffer: {
      title:'A finite buffer absorbs a burst but cannot remove a sustained deficit',height:600,
      facts:['Illustrative buffer capacity: 8 items. It starts with 2 items; 4 arrive and 2 are consumed in each interval.', 'Occupancy at interval boundaries is 2, 4, 6, 8: a net gain of 2 items per interval.', 'Once full, further arrivals must be delayed or may be lost. The receiver still consumes only 2 items per interval.'],
      draw:()=>text(35,113,'Simplified rate model: +4 received −2 consumed = +2 items per interval.',25)+
        [2,4,6,8].map((level,i)=>{const x=35+i*265;return text(x,171,`After ${i} intervals`,24)+`<g data-buffer="${i}" data-level="${level}">`+Array.from({length:8},(_,j)=>`<rect x="${x+60}" y="${213+(7-j)*27}" width="145" height="24" fill="${j<level?teal:'#edf1f3'}" stroke="#bdcdd4"/>`).join('')+'</g>'+text(x+133,475,`${level} / 8 items`,25,'middle');}).join('')+
        text(35,560,'Back-pressure or data loss follows if the positive net arrival rate continues.',25),
    },
  };
}
