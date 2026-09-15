import { uploadStates12 } from './course-v3-section12-programs.mjs';

const esc = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const words = (x,y,lines,cls='body',anchor='start') => lines.map((line,i)=>`<text x="${x}" y="${y+i*28}" class="${cls}" text-anchor="${anchor}">${esc(line)}</text>`).join('');
const box = (x,y,w,h,title,lines=[]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" class="box"/>${words(x+w/2,y+34,[title],'heading','middle')}${words(x+18,y+69,lines)}`;
const arrow = d => `<path d="${d}" class="arrow"/>`;
const shell = (title,body,height) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-label="${esc(title)}"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" stroke="#17676f" stroke-width="1.5"/></marker></defs><style>text{font-family:Arial,sans-serif;fill:#18364d}.title{font-size:30px;font-weight:700}.heading{font-size:23px;font-weight:700}.body{font-size:21px}.box{fill:#edf5f7;stroke:#254963;stroke-width:2}.arrow{fill:none;stroke:#17676f;stroke-width:3;marker-end:url(#arrow)}.call{fill:none;stroke:#526b80;stroke-width:3}</style><rect width="1200" height="${height}" fill="#fbfcfd"/>${words(35,48,[title],'title')}${body}</svg>`;

const models = () => shell('One booking project: three ways to organise development',
  words(35,90,['A request accepts INTEGER Quantity from 1 to 30. Users need an understandable refusal message.'])+
  box(35,125,1130,180,'Waterfall: review stage outputs before proceeding',[
    'Agree rules → approve design → implement → test → support after delivery',
    'A working interface may be reviewed late. A changed rule can require earlier work to be revised.',
    'Useful evidence: agreed requirements, approved design and recorded tests.',
  ])+
  box(35,345,1130,180,'Iterative: improve a working version using evidence',[
    'Version 1: apply the range rule → review: refusal is unclear',
    'Version 2: explain the permitted range → review: users can complete the task',
    'Each cycle includes analysis, design, coding and testing for the chosen scope.',
  ])+arrow('M1125 475 C1185 475 1185 395 1125 395')+
  box(35,565,1130,180,'RAD: short time boxes with rapid prototypes and available users',[
    'Prototype → user review → revise within an agreed time box',
    'Reuse a suitable form component; build separable parts and check their integration.',
    'Frequent decisions need user access; fast construction still needs testing.',
  ])+
  words(35,800,['Choose from the constraints. Short deadlines alone do not make every project suitable for RAD.']),845);

const batch = () => shell('Batch orders: hierarchy, repetition and conditional calls',
  words(35,90,['Grey lines show calls; teal arrows label transferred data. Member is BOOLEAN input data.'])+
  box(405,120,390,110,'ProcessBatch',['Reads OrderCount; zero: No orders'])+
  '<path class="call" d="M600 230 V315"/>'+arrow('M635 245 C720 210 725 300 645 295')+
  words(820,255,['OrderCount > 0:', 'repeat ProcessOrder', 'OrderCount times'])+
  box(405,315,390,75,'ProcessOrder')+
  '<path class="call" d="M600 390 V430 M185 430 H1015 M185 430 V545 M600 430 V545 M1015 430 V545"/>'+
  box(35,545,300,75,'ReadOrder')+box(450,545,300,75,'CalculateCost')+box(865,545,300,75,'DisplayCost')+
  arrow('M310 525 V450')+words(40,463,['Quantity','UnitPrice','Member'])+
  arrow('M465 450 V525')+words(485,463,['Quantity','UnitPrice','Member'])+
  arrow('M735 525 V450')+words(758,502,['Cost'])+
  arrow('M1140 450 V525')+words(1040,485,['Cost'])+
  '<path class="call" d="M600 620 V660"/><path d="M600 660 L720 730 L600 800 L480 730 Z" class="box"/>'+
  words(600,737,['Member?'],'heading','middle')+
  '<path class="call" d="M480 730 H255 V855 M720 730 H945 V855"/>'+
  words(295,708,['FALSE'],'heading')+words(835,708,['TRUE'],'heading')+
  box(55,855,400,130,'StandardCost',['Quantity, UnitPrice in','Return Quantity * UnitPrice'])+
  box(745,855,400,130,'MemberCost',['Quantity, UnitPrice in','Return Quantity * UnitPrice * 0.90'])+
  words(35,1035,['Only one price function is called per order; its returned result becomes CalculateCost’s result.',
    'ReadOrder updates caller variables by reference. Both calculation functions receive value copies.',
    'The zero-order path never calls ProcessOrder. The program supplies exact statement order.']),1135);

const upload = () => shell('Upload states: the same event can have different outcomes',
  words(35,90,['Start in Ready. Valid is supplied with complete; its conditions are mutually exclusive.'])+
  '<circle cx="50" cy="235" r="9" fill="#18364d"/>'+arrow('M65 235 H145')+
  box(145,185,260,100,'Ready',['Waiting for start'])+
  box(700,185,325,100,'Uploading',['Waiting for progress / complete'])+
  box(700,545,325,100,'Error',['Waiting for retry / cancel'])+
  arrow('M405 220 H700')+words(525,198,['start'])+
  arrow('M745 185 C670 110 1030 110 960 185')+words(827,127,['progress'])+
  arrow('M700 265 H430 V310 H275 V285')+words(310,350,['complete [Valid = TRUE]'])+
  arrow('M885 285 V545')+words(907,415,['complete','[Valid = FALSE]'])+
  arrow('M745 545 V285')+words(675,458,['retry'])+
  arrow('M700 595 H160 V285')+words(180,569,['cancel from Error → Ready'])+
  arrow('M1025 225 H1135 V735 H95 V285 H145')+words(360,715,['cancel from Uploading → Ready'])+
  arrow('M210 185 C105 85 400 85 335 185')+words(245,127,['cancel'])+
  words(35,795,['Unshown state/event combinations are unspecified. Do not assume that they are ignored.',
    'Ready is not a terminal state: the next start event can begin another upload.']),880);

const stub = () => shell('Replace the called function while preserving its interface',
  words(35,90,['Interface: IsAvailable(RoomID : INTEGER) RETURNS BOOLEAN. RoomID is 101 or 102.'])+
  box(35,150,350,150,'Caller',['Input RoomID','Use returned BOOLEAN','Display the matching message'])+
  arrow('M385 200 H685')+words(450,176,['RoomID argument'])+
  box(685,150,480,150,'Temporary replacement',['Version A returns TRUE','Version B returns FALSE','The RoomID argument is unused'])+
  arrow('M685 265 H385')+words(435,295,['controlled result'])+
  words(35,355,['A: either ID displays Available. B: either ID displays Unavailable.',
    'This checks caller branches; it does not establish which room is actually available.'])+
  arrow('M920 305 V465')+words(935,420,['replace'])+
  box(685,465,480,155,'Real function for the stated fixture',['Room 101: available','Room 102: unavailable','RETURN RoomID = 101'])+
  box(35,465,550,155,'Integration evidence after replacement',['101 must display Available.','102 must display Unavailable.','Check both the result and its use by the caller.'])+
  words(35,695,['The function name, parameter type and result type stay the same across all three versions.']),740);

const interfaceChange = () => shell('A configurable pass threshold changes an interface',
  box(35,120,535,200,'Existing contract',['IsPass(Mark) RETURNS BOOLEAN','Rule: Mark >= 50','Caller supplies one argument.','Four marks → one final pass count.'])+
  box(630,120,535,200,'Revised contract',['IsPass(Mark, PassMark) RETURNS BOOLEAN','Rule: Mark >= PassMark','Caller supplies two arguments.','Read PassMark once before the four marks.'])+
  arrow('M575 215 H625')+
  box(35,370,1130,155,'Keep or deliberately change each responsibility',[
    'Keep: four validated marks, one initialisation, one increment per pass and one final count.',
    'Change together: typed header, input of PassMark, comparison and every function call.',
    'The input sequence now begins with the selected threshold; test fixtures must include it.',
  ])+
  box(35,575,535,140,'Compatibility case',['Threshold 50; marks 49,50,69,70','Old count 3; revised count 3.','The original rule is preserved.'])+
  box(630,575,535,140,'New requirement case',['Threshold 60; same four marks','Revised count 2.','The changed result is required.']),770);

const visual=(key,title,alt,facts)=>({type:'reviewed-visual',asset:`/assets/course-v3/section-12/${key}.svg`,title,alt,facts,caption:facts[0],review:'reviewed'});
export const section12TeachingVisuals = {
  models:visual('development-models','Compare the organisation of the same project','Three panels compare reviewed waterfall stages, successive iterative versions and RAD prototype time boxes.', ['Relate the project constraints to when users provide feedback and how changes are managed.','The stages still need sound requirements, design and test evidence under each model.']),
  batch:visual('batch-orders','Follow repeated orders and conditional calculations','ProcessBatch repeats ProcessOrder for positive OrderCount. ProcessOrder calls ReadOrder, CalculateCost and DisplayCost. CalculateCost calls StandardCost or MemberCost according to Member.', ['Trace the caller hierarchy separately from the labelled data transfers.','Member FALSE selects StandardCost; TRUE selects MemberCost. Both return a REAL result.','OrderCount zero outputs No orders and makes no ProcessOrder call.']),
  upload:visual('upload-states','Read a guarded transition from the current state','Ready, Uploading and Error states with an initial arrow to Ready, a progress loop, valid and invalid completion paths, retry and cancel transitions.',uploadStates12.transitions.map(t=>`${t.from} + ${t.event}${t.condition?` [${t.condition}]`:''} → ${t.to}.`)),
  stub:visual('stub-replacement','Test the caller, then replace the stub','A caller passes RoomID to a BOOLEAN function. Temporary functions return TRUE or FALSE. The real function returns TRUE for 101 and FALSE for 102.', ['After replacing the stub, check both room IDs against the real availability fixture.','A controlled stub result can differ from a real room result without being a caller defect.']),
  interfaces:visual('threshold-interface','Change the header, caller and tests together','The original IsPass function takes Mark; the revised function also takes PassMark, read once before the marks.', ['Threshold 50 reproduces the old rule; threshold 60 deliberately changes which marks pass.','Keep four-input traversal and accumulation while updating the interface and fixtures.']),
};
export const section12TeachingDiagramFiles=()=>({
  'development-models.svg':models(), 'batch-orders.svg':batch(), 'upload-states.svg':upload(),
  'stub-replacement.svg':stub(), 'threshold-interface.svg':interfaceChange(),
});
