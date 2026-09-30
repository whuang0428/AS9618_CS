// Exact teaching diagrams. Text, paths and alternative descriptions are authored together.
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,value,size=24) => `<text x="${x}" y="${y}" font-size="${size}">${esc(value)}</text>`;
const box = (x,y,w,h,title,lines=[]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#edf6f8" stroke="#4c7185" stroke-width="2"/>${text(x+18,y+34,title,25)}${lines.map((line,i)=>text(x+18,y+70+i*31,line,23)).join('')}`;
const arrow = (from,to,path) => `<path data-from="${from}" data-to="${to}" d="${path}" fill="none" stroke="#14747b" stroke-width="3" marker-end="url(#arrow)"/>`;
const svg = (title,height,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="${height}" viewBox="0 0 1120 ${height}" role="img"><title>${esc(title)}</title><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#14747b"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#142b45}</style><rect width="1120" height="${height}" fill="white"/>${text(30,48,title,29)}${body}</svg>`;
const definitions = {
  fragmentation:{name:'hdd-fragmentation',title:'One file, different block positions',facts:[
    'A magnetic hard disk has rotating platters and a moving read/write head.',
    'In this simplified block map, file A consists of A1, A2 and A3. Read those blocks in that order.',
    'Defragmentation groups the blocks together. It can reduce mechanical movement when the file is read.',
    'The same three file blocks remain; neither the file contents nor its size is reduced. This is not the moving-head mechanism of an SSD.',
  ],image:()=>svg('One file, different block positions',720,
    '<circle cx="180" cy="215" r="100" fill="#edf6f8" stroke="#4c7185" stroke-width="3"/><circle cx="180" cy="215" r="76" fill="none" stroke="#a9c4cf" stroke-width="2"/><circle cx="180" cy="215" r="50" fill="none" stroke="#a9c4cf" stroke-width="2"/><circle cx="180" cy="215" r="18" fill="#4c7185"/><path d="M325 290L205 170L196 188L316 306Z" fill="#e8af62" stroke="#825720" stroke-width="2"/>'+
    text(325,150,'Magnetic HDD',28)+text(325,195,'The platter rotates.',25)+text(325,240,'The head moves to another track.',25)+text(325,285,'Scattered blocks can require more movement.',25)+
    text(30,355,'Simplified block order — not a physical scale drawing',23)+
    text(30,403,'Before',25)+['A1','B1','Free','A2','C','A3'].map((label,i)=>'<rect x="'+(180+i*148)+'" y="370" width="132" height="70" rx="6" fill="'+(label.startsWith('A')?'#cde9ee':'#f2f4f5')+'" stroke="#4c7185"/>'+text(205+i*148,414,label,28)).join('')+
    arrow('a1','a2','M245 442V477H689V442')+arrow('a2','a3','M689 442V498H985V442')+
    text(30,565,'After',25)+['A1','A2','A3','B1','C','Free'].map((label,i)=>'<rect x="'+(180+i*148)+'" y="532" width="132" height="70" rx="6" fill="'+(label.startsWith('A')?'#cde9ee':'#f2f4f5')+'" stroke="#4c7185"/>'+text(205+i*148,576,label,28)).join('')+
    arrow('a1-after','a3-after','M245 604V642H541V604')+
    text(30,694,'Same A1, A2 and A3. Less scattered placement; unchanged file size.',25))},
  request:{name:'os-request',title:'A file request returns success or an error',facts:[
    'An application requests a named file write. The OS checks the requester’s permission.',
    'An allowed operation proceeds through file and device services; successful completion changes the saved contents.',
    'A denied operation returns an error without changing the saved file. The application receives the result in either path.',
  ],image:()=>svg('A file request returns success or an error',700,
    box(30,100,370,110,'Application',['Request a named file write'])+arrow('application','permission','M400 155H580')+
    box(580,100,510,110,'OS security check',['Is this identity allowed to write?'])+
    arrow('permission','file-service','M690 210V255H275V320')+text(300,280,'Allowed')+
    arrow('permission','denied','M940 210V320')+text(960,280,'Denied')+
    box(30,320,490,165,'File and device services',['Locate file; coordinate the write.','Driver and storage perform transfer.','Wait for completion or a device error.'])+
    box(650,320,440,165,'Refuse the write',['Saved content stays unchanged.','No protected write is performed.'])+
    arrow('file-service','result','M275 485V575H350')+arrow('denied','result','M875 485V575H770')+
    box(350,530,420,115,'Result to application',['Completion or error','Show the actual save outcome.']))},
  translators:{name:'translation-stages',title:'Identify the source, translator and execution stage',facts:[
    'An assembler translates assembly source into target object or machine code; link if required before execution.',
    'In the native model a compiler translates high-level source before a built executable runs.',
    'In the high-level interpretation model a suitable interpreter translates and carries out the supplied program along its control flow.',
    'Loops and branches determine execution order in both high-level models. Cambridge pseudocode specifies behaviour; it is not input to an unspecified real tool.',
  ],image:()=>svg('Identify the source, translator and execution stage',700,
    text(30,106,'ASSEMBLY',22)+box(30,130,300,120,'Assembly source',['Mnemonics + operands'])+
    arrow('assembly-source','assembler','M330 190H400')+box(400,130,300,120,'Assembler',['Target instruction set'])+
    arrow('assembler','machine-code','M700 190H770')+box(770,130,320,120,'Object / machine code',['Link if needed; then run'])+
    text(30,296,'NATIVE COMPILATION MODEL',22)+box(30,320,300,120,'High-level source',['Saved program version'])+
    arrow('source','compiler','M330 380H400')+box(400,320,300,120,'Compiler / build',['Translate; link if needed'])+
    arrow('compiler','executable','M700 380H770')+box(770,320,320,120,'Native executable',['Run the built version'])+
    text(30,486,'HIGH-LEVEL INTERPRETATION MODEL',22)+box(30,510,300,120,'High-level source',['Valid program input'])+
    arrow('interpreted-source','interpreter','M330 570H400')+box(400,510,300,120,'Interpreter',['Follow control flow'])+
    arrow('interpreter','effects','M700 570H770')+box(770,510,320,120,'Execution effects',['Changed state / output'])+
    text(30,676,'Translation is not proof that the program implements the required calculation.',23))},
  java:{name:'java-build-run',title:'Java: compile the source, then run the class file',facts:[
    'javac Hello.java compiles Java source into Hello.class bytecode for the JVM.',
    'java Hello uses a compatible Java runtime to execute that class; the physical CPU does not treat bytecode as universal native instructions.',
    'Editing Hello.java leaves the old Hello.class unchanged until a successful rebuild. A destination can run the existing class without the source if its runtime is compatible.',
  ],image:()=>svg('Java: compile the source, then run the class file',625,
    box(30,110,300,120,'Hello.java',['Human-readable source'])+arrow('source','javac','M330 170H405')+
    box(405,110,300,120,'javac Hello.java',['Build step'])+arrow('javac','bytecode','M705 170H780')+
    box(780,110,310,120,'Hello.class',['JVM bytecode'])+
    arrow('bytecode','runtime','M935 230V325H810')+text(480,265,'Launch with java Hello',24)+
    box(340,280,470,160,'Compatible host JVM',['Executes the bytecode on this host','Requires a compatible runtime','Does not rebuild edited source'])+
    arrow('runtime','output','M575 440V490')+box(340,490,470,90,'Console: Hello, World!')+
    text(30,610,'Edit source → rebuild successfully → run updated class. Old class → old result.',23))},
  editor:{name:'ide-editor',title:'IDE assistance: see what each tool actually changes',facts:[
    'This is an illustrative editor using Cambridge-style notation, not a runnable IDE or a screenshot of a product.',
    'Context-sensitive prompts can suggest UnitPrice and Delivery when both identifiers are available; the programmer chooses the intended value.',
    'A missing operand in Total <- Total + can produce a syntax diagnostic while editing.',
    'Folding hides the body of an IF block but does not remove its statements or stop execution.',
  ],image:()=>svg('IDE assistance: see what each tool actually changes',710,
    text(30,95,'Illustrative editor • Cambridge-style notation • no interactive controls',22)+
    box(30,135,555,145,'Source being entered',['Cost <- Quantity *','Choose the intended right operand.'])+
    box(635,135,455,145,'Context-sensitive prompts',['UnitPrice : INTEGER','Delivery : INTEGER'])+
    arrow('source-position','suggestions','M585 207H635')+
    box(30,320,555,135,'Incomplete expression',['Total <- Total +','The right operand is missing.'])+
    box(635,320,455,135,'Syntax diagnostic',['Expected an operand','Inspect and complete the expression.'])+
    arrow('incomplete-source','diagnostic','M585 390H635')+
    box(30,500,1060,145,'Collapsed code block — display only',['IF Mark >= 50 THEN … ENDIF','The body is hidden, not deleted. Input 60 still selects the Pass branch.']))},
};
export const section5DiagramFiles = Object.freeze(Object.fromEntries(Object.values(definitions).map(d=>[`${d.name}.svg`,d.image()])));
export const section5Visuals = Object.freeze(Object.fromEntries(Object.entries(definitions).map(([key,d])=>[key,{
  type:'reviewed-visual',layout:'mechanism',asset:`/assets/course-v3/section-5/${d.name}.svg`,title:d.title,
  alt:d.facts.join(' '),facts:d.facts,caption:d.facts.at(-1),review:'reviewed',preserveText:true,
}])));
