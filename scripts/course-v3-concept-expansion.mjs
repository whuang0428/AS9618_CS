import { coreParagraph as p, coreList as list, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { mechanismVisual } from './course-v3-mechanism-diagrams.mjs';
import { extendedDiagramTargets } from './course-v3-mechanism-extensions.mjs';
import { completionCore, completionHeadings } from './course-v3-core-completion.mjs';

// Authored teaching revisions, keyed by concept rather than mutable page position.
// Questions, programs and objective ownership are deliberately outside this layer.
export const expandedCore = {
  ...completionCore,
  'S1.01-PREFIXES': [
    table('Binary prefixes: powers of 1024', ['Prefix','Bytes'], [['kibi (Ki)','1 KiB = 2^10 = 1024 bytes'],['mebi (Mi)','1 MiB = 2^20 bytes'],['gibi (Gi)','1 GiB = 2^30 bytes'],['tebi (Ti)','1 TiB = 2^40 bytes']]),
    table('Decimal prefixes: powers of 1000', ['Prefix','Bytes'], [['kilo (k)','1 kB = 10^3 = 1000 bytes'],['mega (M)','1 MB = 10^6 bytes'],['giga (G)','1 GB = 10^9 bytes'],['tera (T)','1 TB = 10^12 bytes']]),
    p('Case and the i in KiB/MiB/GiB/TiB carry meaning. Check the unit before converting: each binary level multiplies by 1024; each decimal level multiplies by 1000.', 'Read the unit before calculating'),
  ],
  's4-buses': [
    list('What each bus carries', [['Address bus','Selects a memory location or addressed interface. In the basic processor-controlled model, the address travels outwards from the processor.'],['Data bus','Carries instructions and data. Reads return values to the CPU; writes send values from the CPU.']]),
    p('The control bus coordinates operations. READ and WRITE travel from the CPU; interrupt requests can travel towards it. The collection is bidirectional, but each individual signal line has its own defined direction.', 'Control signals have individual directions'),
  ],
  's4-performance': [
    list('Compare processors for a stated workload', [['Processor type','Instruction sets and internal organisation affect work per cycle, pipelining and cache use. Clock frequency alone cannot rank different designs.'],['Core count','Independent tasks or parallel parts can run concurrently. Sequential dependencies and communication overhead limit the gain.'],['Clock and data bus','A faster clock provides more cycles per second; a wider data bus transfers more bits at once. Neither removes every memory or I/O delay.']]),
    p('Cache keeps copies of recently or frequently needed instructions and data near the processor. A hit avoids a slower main-memory access. More capacity helps when it retains useful parts of the working set; access patterns and hit rate matter as well as size.', 'Why cache helps'),
  ],
  's4-ports': [
    table('Choose by the signal and purpose', ['Connection','Typical role'], [['Universal Serial Bus (USB)','Serial digital peripheral data for devices such as keyboards, printers and external drives; power where supported. Capabilities depend on the version, cable and devices.'],['High Definition Multimedia Interface (HDMI)','Digital video and audio to a compatible display or projector.'],['Video Graphics Array (VGA)','Analogue video for a legacy monitor or projector; audio requires a separate connection.']]),
    p('A port is a physical and electrical interface. The computer and peripheral need compatible signals and protocols; a connector that fits is not proof of compatibility. An adapter may need to convert the signal. The image shows USB Type-A, HDMI Type-A and VGA socket shapes from left to right.', 'Check compatibility as well as shape'),
  ],
  's4-interrupt-handling': [
    steps('Handle an accepted interrupt', [['Detect','After the current instruction finishes, check pending enabled requests. Priority and enable rules decide acceptance; another request may remain pending.'],['Save context','Preserve the return address and the state needed to resume.'],['Service','Load the appropriate Interrupt Service Routine (ISR) address into PC and run it, acknowledging or clearing the request as required.'],['Restore and resume','Restore saved state and continue the interrupted work.']]),
    p('The ISR must preserve registers as required by the system’s interrupt mechanism. Servicing an event must not corrupt values the interrupted program will use later.', 'Preserve the interrupted work'),
  ],
  's4-two-pass': [
    steps('Resolve source in two passes', [['Pass one','Assign locations and record labels with their addresses in a symbol table. Advance the location counter by each instruction or data item’s size; report duplicate definitions.'],['Pass two','Use the completed table to resolve symbolic operands, translate mnemonics into opcodes and emit machine instructions and data.']]),
    p('A forward reference names a label defined later in the source. The completed first pass makes its address available to pass two. A label still undefined after that pass is an error. The diagram’s one-word instructions and starting location are explicit example assumptions.', 'Why a second pass is useful'),
  ],
  's4-bitwise': [
    list('Apply one rule per bit position', [['AND','Produces 1 only when both input bits are 1. A mask bit 0 clears; a mask bit 1 preserves.'],['OR','Produces 1 when at least one input is 1. A mask bit 1 sets; a mask bit 0 preserves.'],['XOR','Produces 1 when exactly one input is 1. A mask bit 1 toggles; a mask bit 0 preserves.']]),
    p('AND, OR and XOR combine the operand with ACC and store the result in ACC. Immediate #n, Bn or &n forms supply the value. For a direct memory-address operand, read the contents of that address first.', 'Retrieve the operand before applying the rule'),
  ],
  'S5.01-PROCESSES': [
    p('A process is a program in execution. The OS records its state and schedules which ready process receives processor time. Switching on one core gives the appearance of simultaneous progress.', 'Program versus process'),
    steps('When a process waits for I/O', [['Retain context','Keep enough execution state to resume correctly.'],['Schedule another process','Give the core to a ready process while the first cannot usefully continue.'],['Make the waiting process ready','When its event completes, it can be selected to run again. Being ready does not mean it immediately owns the core.']]),
  ],
  'S5.02-DEFRAG': [
    steps('Why an HDD can benefit', [['Relocate blocks','Move separated parts of a file into fewer, more contiguous groups; consolidate free space where possible.'],['Reduce seeking','The magnetic drive’s head can move less while reading the file, reducing access delays.']]),
    p('The file’s logical contents stay the same. The performance explanation depends on mechanical seeking: an SSD has no moving read head, so routine HDD-style defragmentation is not the same treatment for an SSD.', 'Keep the mechanism and limitation together'),
  ],
  'S5.03-DLL': [
    table('Where library code is held', ['Linking model','Arrangement'], [['Static','Required library code is incorporated into the built executable.'],['Dynamic','A DLL remains separate; routines are linked at load time or as needed during execution.']]),
    list('Benefits and conditions', [['Less duplication','Compatible applications can use one library, reducing repeated disk copies and allowing loaded code to be shared in memory. Calling executables can be smaller.'],['One compatible correction','Update the library without recompiling each caller; running programs may need a restart or reload.'],['Compatibility matters','The interface and behaviour must remain compatible. Missing or incompatible DLLs can prevent loading or cause failures, so updates need checking.']]),
  ],
  'S5.06-JAVA': [
    steps('Separate building from execution', [['Compile','javac translates .java source into .class bytecode targeting the Java Virtual Machine (JVM).'],['Execute','A compatible host JVM interprets bytecode and may use a just-in-time (JIT) compiler for frequently executed code.']]),
    list('What portability requires', [['Compatible host','The same suitable bytecode can run on different platforms with compatible JVMs; native dependencies may limit this.'],['Rebuild after an edit','Installing a JVM does not translate an edited .java file. A .class file is not universal physical CPU machine code.']]),
  ],
  'S9-REFINEMENT-LEVELS': [
    steps('Expand a high-level solution', [['Start from the result','Name the required outcome and its preconditions.'],['Expand an unresolved step','Replace it with operations that achieve the same result.'],['Continue to programmable detail','Stop when no remaining action requires the programmer to invent a missing rule.']]),
    p('Decomposition identifies smaller sub-problems; refinement develops the internal detail of a solution. For an average, specify how inputs are read, how Total is updated and when division happens. For the diagram’s algorithm, N must be positive.', 'Add rules, not just headings'),
  ],
  'S9-LOGIC-COMBINE': [
    list('Combine complete Boolean conditions', [['AND','Both operands must be true.'],['OR','Either or both operands can be true.'],['NOT','Reverses the Boolean value.']]),
    p('Use parentheses to show grouping. Adulthood with no suspension is (Age >= 18) AND NOT Suspended. A child-or-member discount is (Age < 12) OR Member. The requirement decides the connector; replacing AND with OR changes who qualifies.', 'Translate the requirement precisely'),
  ],
  'S10-RECORD-DEFINITION': [
    p('A record groups related named fields under one identifier. Each field has its own type: one member can have a STRING name, INTEGER year group and BOOLEAN payment state.', 'Related fields can have different types'),
    steps('Define, declare, then store', [['Define the type','TYPE MemberRecord … ENDTYPE encloses the field DECLARE statements.'],['Declare a variable','DECLARE Member : MemberRecord creates one variable of that type.'],['Assign its fields','Store suitable values using field names. A type definition alone creates neither a member nor its field values.']]),
  ],
  'S10-STACK-ARRAY': [
    p('In this 1-based array model, Top identifies the last occupied element. Top = 0 means empty and Top = capacity means full.', 'State convention'),
    steps('Update only after checking the limit', [['PUSH','If Top is below capacity, increase Top and store the new item at Stack[Top]. Otherwise reject the push.'],['POP','If Top is above zero, return Stack[Top] and decrease Top. Otherwise reject the pop.']]),
    p('An allowed top edit changes its value without changing Top. To reach a deeper item through push/pop only, retain the removed items and restore them in reverse removal order. Old cells above Top can retain values but are inactive.', 'Active state is different from leftover memory'),
  ],
  'S10-QUEUE-ARRAY': [
    table('State in this circular implementation', ['Variable','Meaning'], [['Front','Next removal position; initially 1.'],['Rear','Last occupied insertion position; initially 0.'],['Count','Active items; initially 0. Zero means empty and capacity means full.']]),
    steps('Maintain FIFO when indices wrap', [['ENQUEUE','If not full, advance Rear, wrapping from capacity to 1; store the item and increase Count.'],['DEQUEUE','If not empty, read Front; advance it with wrap-around and decrease Count.']]),
    p('An allowed edit changes an active item’s value without changing its arrival position or Count. Physical array order can differ from FIFO order: start at Front and follow the active circular positions. Inactive cells are not waiting items.', 'Keep logical order separate from storage order'),
  ],
  'S10-LINKED-OPERATIONS': [
    steps('Insert X after node 2', [['Prepare free slot 3','Store X in Data[3]. Keep the existing successor, node 4, reachable.'],['Link the new node onward','Set Next[3] to 4, the old successor of node 2.'],['Link the predecessor to X','Set Next[2] to 3. The sequence is now A, X, B, C.']]),
    list('Other operations preserve the chain', [['Edit','Change Data[Index] without changing the links.'],['Delete a middle node','Point its predecessor to its successor, then return the removed slot to available storage.'],['Delete the head','Update Head to the old head’s successor before releasing the old slot.']]),
  ],
  'S10-FILE-PERSISTENCE': [
    p('Files retain data on secondary storage after a program terminates and allow another program to reuse it. Variables and arrays alone do not provide this persistence. A text file is a sequence of lines.', 'Why storage must outlive the program'),
    table('Select the OPENFILE mode', ['Mode','Effect'], [['READ','Read existing lines.'],['WRITE','Create a file or replace its existing contents; suitable for a fresh report.'],['APPEND','Add at the end while retaining existing contents; suitable for extending a log.']]),
  ],
  'S10-FILE-READ': [
    steps('Read every available line safely', [['Open','OPENFILE in READ mode.'],['Guard and read','Check NOT EOF before each READFILE. The read copies the next line into a STRING and advances the position.'],['Process','Output, count or otherwise use the line, then return to the EOF check.'],['Close','CLOSEFILE after the loop.']]),
    p('A blank line is an empty string, not end of file, and still counts as one line. EOF becomes TRUE when no further lines remain. An empty file skips the loop and leaves the count at zero.', 'Distinguish data from the file position'),
  ],
  'S11-ASSIGN-IO': [
    steps('Move from input to a stored result', [['INPUT','Obtain required keyboard values before using them.'],['Evaluate and assign','Evaluate the right-hand expression, then store the result on the left. Total <- Price * Quantity replaces Total; Total = Price * Quantity is a comparison.'],['OUTPUT','Write a value or expression to the console.']]),
    p('For tax charged per item, declare the identifiers, read Price and Quantity, calculate Tax <- Price * TaxRate, then multiply the tax-inclusive item price by Quantity. This order prevents undefined inputs or intermediate values from reaching the result.', 'Respect calculation dependencies'),
  ],
  'S11-FOR-STEP': [
    list('Choose the bounds and step together', [['Positive STEP','Move upward and stop before the value exceeds the endpoint.'],['Negative STEP','Move downward and stop before the value falls below the endpoint.'],['STEP 0','Makes no progress and is unsuitable.']]),
    p('6 TO 0 STEP -2 visits 6, 4, 2, 0. Starting at 5 visits 5, 3, 1 and stops before -1. The endpoint is inclusive only when the sequence reaches it exactly; write the visited values before counting body executions.', 'Count the values actually visited'),
  ],
  'S11-FUNCTION-RETURN': [
    steps('Define a function with a result', [['Header','Use FUNCTION Name(parameters) RETURNS DataType.'],['Result','Use RETURN Expression of the declared type on every reachable result path.'],['Close','End the definition with ENDFUNCTION.']]),
    p('Use the returned value in an assignment, condition, output or other expression. Total <- Price + Tax(Price) adds the tax result to Price. Do not prefix a function call with CALL, which invokes a procedure. Function parameters use value passing in this Cambridge notation.', 'Use the result at the call site'),
  ],
  'S12-LIFECYCLE-STAGES': [
    p('A development life cycle coordinates the route from the problem to a tested, maintained solution. Records connect requirements, design decisions and results; following stages alone does not guarantee a suitable product.', 'Purpose'),
    list('What each activity establishes', [['Analysis','The problem, user requirements and constraints.'],['Design','Data, algorithms, module interfaces and tests.'],['Coding','An implementation of the design.'],['Testing','Actual behaviour compared with expected results, exposing defects.'],['Maintenance','Changes after delivery as faults, environments and user needs change.']]),
    p('Feedback can reveal a need to revisit earlier work. The chosen development model determines how the team organises these activities.', 'Use evidence to revisit decisions'),
  ],
  'S12-ITERATIVE': [
    steps('Learn from successive versions', [['Develop a version','Revisit analysis, design, coding and testing for an agreed scope.'],['Review working behaviour','Users inspect the result before the whole system is finished.'],['Set the next cycle','Use findings to refine requirements and priorities.']]),
    p('Early feedback reduces the risk of building the wrong solution. Control scope, versions, schedule and stopping criteria: repeated changes can otherwise delay completion and leave documentation inconsistent.', 'Benefit and control'),
  ],
  'S12-TEST-INTEGRATION': [
    list('Check interfaces between modules', [['Arguments','Verify their number, order and types.'],['Meaning','Check units and interpretation: metres supplied to a centimetre input can fail even when both values are REAL.'],['Results','Confirm that returned values reach the intended caller and parameter.']]),
    p('A stub temporarily replaces an unavailable called module and returns a controlled value. It exercises the caller and available interfaces. Record what it simulates; replace it with the real module and retest. A passing stub test does not verify the absent implementation.', 'Use a stub for controlled early integration'),
  ],
  'S6-PHISHING': [
    steps('Recognise the persuasion mechanism', [['Impersonation','A message claims to come from a trusted person or organisation.'],['Unsafe action','Urgency or a pretext encourages disclosure, a link click or another unsafe action.'],['Credential capture','A linked fake sign-in page can collect the supplied password.']]),
    p('Verify a request through an independently obtained contact or known website. Filtering and training reduce exposure. Multi-factor authentication can reduce the impact of a stolen password, but does not make every deceptive request harmless.', 'Check independently'),
  ],
  'S6-PHARMING': [
    steps('Trace the changed destination', [['Correct entry','The user may type the intended address correctly.'],['Corrupted resolution','DNS or local name-resolution information redirects the lookup.'],['Fraudulent site','The resulting destination belongs to the attacker rather than the intended service.']]),
    p('Protect name-resolution settings, update affected software and investigate certificate or hostname warnings. An HTTPS indicator alone does not prove legitimacy; check the intended destination and do not ignore a certificate mismatch.', 'Address the redirection'),
  ],
  'S3.04-BUFFER': [
    p('A buffer temporarily holds data during transfer. It lets a sender’s burst wait while a receiver consumes data at its own rate.', 'Temporary storage between different rates'),
    list('Capacity and related roles', [['Finite capacity','Buffer capacity is finite. If arrivals keep exceeding removals, it fills. The sender must wait or data may be lost; buffering does not increase the receiver’s sustained rate.'],['Printer example','The printer receives blocks into a buffer while the CPU does other work. A device driver translates device-specific commands; a print queue orders waiting jobs. Neither role is the buffer itself.']]),
  ],
};

// These explanations need their existing qualifications. Give each paragraph an
// authored heading instead of deleting causal reasoning merely to shorten the page.
export const coreHeadings = {
  ...completionHeadings,
  'S1.04-SIGNED':['Encode the operands','Add at the fixed width','Subtract using two’s complement','Check signed overflow'],
  'S1.11-LOSSLESS-FILES':['Reconstruct every original bit','Choose lossless when exact data matters','Encode repetitions reversibly'],
  's4-registers':['Roles and the example ACC convention','Several registers cooperate'],
  'S5.04-COMPILER':['Translate before executing','Rebuild and check the result'],
  'S5.04-INTERPRETER':['Translate as execution proceeds','Follow the program’s control flow'],
  'S6-SIGNATURE':['Sender: hash and sign','Receiver: verify and compare','Integrity is separate from confidentiality'],
  'S7-BODIES':['What BCS and IEEE provide','Membership: support and accountability','Limits of a professional code'],
  'S7-COPYRIGHT':['Why control over copying matters','Expression, ownership and permission'],
  'S7-AI-APPLICATIONS':['Connect input, inference, output and use','Decide how the output guides action'],
  'S7-AI-ECONOMIC':['Potential savings and productivity','Costs and changes to work'],
  'S7-AI-ENVIRONMENT':['Resources used by the AI system','Compare savings with the system’s own cost'],
  'S7-AI-EVALUATION':['Develop effects in the stated context','Reach a conditional judgement'],
  'S11-FOR-BOUNDS':['Inclusive bounds and loop syntax','Place initialisation, input and output correctly'],
  'S11-STRING-FUNCTIONS':['Use the supplied interface','Check positions, counts and types'],
  'S12-WATERFALL':['Sequence, documentation and suitable requirements','Milestones and the cost of late change'],
  'S12-RAD':['Prototypes, time boxes and user feedback','Judge suitability from the constraints'],
  'S12-ERROR-TYPES':['Distinguish syntax, logic and run-time faults','Reduce faults and collect evidence'],
  'S12-ERROR-LOCATE':['Reproduce and narrow the failure','Trace the boundary case before changing the condition'],
  'S12-TEST-BOX':['White-box: select from internal structure','Black-box: select from the specification'],
  'S12-MAINTENANCE-TYPES':['Corrective and adaptive changes','Perfective changes and classification by cause'],
  'S12-DATA-SELECT':['Choose cases from the input rule','Use real values and the stated precision'],
};
// Section 2 predates semantic unit keys. Its existing unique headings are the
// stable authoring identifiers; assert their shape when applying the revision.
export const section2Headings = {
  'Networking creates shared access; LAN and WAN describe scope':['What users can share','Explain a benefit through its cause','LAN and WAN describe geographical scope'],
  'The topology is the link pattern':['Bus: one shared backbone','Star: separate links to a switch','Mesh: multiple interconnections','Hybrid: combine patterns'],
  'Copper cable, fibre-optic cable and radio waves including WiFi':['Copper: electrical signals','Fibre: light signals','Radio and WiFi: shared wireless space'],
  'CSMA/CD detects a collision, stops, waits and retries':['The shared-medium case','Listen, detect, stop, back off and retry','Why retries can still collide'],
  'The buffer level is the difference between two rates over time':['Incoming rate and playback demand','How the stored level changes','What a larger buffer can and cannot solve'],
  'Subnetting decides whether delivery is local or routed':['Compare network prefixes','Apply the /24 example','Generalise to /n and the /26 mask'],
};

export const section2Core = {
  'Subnetting decides whether delivery is local or routed': [
    p('Subnetting divides an address space into smaller logical networks for allocation and management. A host compares its own network prefix with the destination: matching prefixes mean local delivery; different prefixes require a router.', 'Decide between local and routed delivery'),
    list('Apply the /24 example', [['Local','192.168.10.37/24 and destination 192.168.10.80 share the first 24 bits.'],['Routed','Destination 192.168.11.80 has a different network prefix and must be sent to a router.']]),
    list('Generalise the prefix and mask', [['/n','The first n of 32 IPv4 bits are network bits; 32 − n remain as host bits.'],['Subnet mask','n leading 1s followed by 0s. Bitwise AND of the address and mask gives the subnet address.'],['/26 example','Mask 255.255.255.192 ends in binary 11000000, leaving six host bits and blocks of 64 addresses.']]),
    p('Subnet membership is separate from public/private scope and static/dynamic assignment.', 'Keep the classifications separate'),
  ],
  'CSMA/CD detects a collision, stops, waits and retries': [
    p('Ethernet (IEEE 802.3) carries frames on wired LANs. On a traditional shared or half-duplex medium, two stations starting close together can collide. CSMA/CD means Carrier Sense Multiple Access with Collision Detection.', 'The shared-medium case'),
    steps('Detect a collision and retry', [['Listen','Sense the medium and transmit if it is idle.'],['Monitor','Watch for a collision while transmitting.'],['Stop and signal','On collision, stop transmission and send or recognise a jam signal.'],['Back off','Wait for a random period, then try again.']]),
    p('Independent random waits reduce simultaneous retries but may be equal, so another collision can occur. Modern switched full-duplex Ethernet normally provides separate collision-free links; this mechanism describes the shared-medium case.', 'Random backoff reduces risk without guaranteeing success'),
  ],
};

const portsVisual = {
  type:'reviewed-visual', title:'Recognise USB Type-A, HDMI Type-A and VGA sockets',
  asset:'/assets/course-v3/reference/usb-hdmi-vga.png',
  alt:'Front views, left to right: rectangular USB Type-A socket; shallow trapezoidal HDMI Type-A socket; blue VGA female socket with three rows of five holes and two screw posts.',
  facts:['Left: USB Type-A. Centre: HDMI Type-A. Right: VGA.', 'The image is an appearance reference. Use the comparison below to select a connection by its signals and purpose.'],
  caption:'Left: USB Type-A. Centre: HDMI Type-A. Right: VGA. Also check signals, protocols, cable and device support when choosing a connection.',
  review:'reviewed', layout:'mechanism', preserveText:true,
};

export function expandConceptTeaching(unit, section) {
  const key=unit.unitKey ?? (section===2 ? unit.heading : undefined), titles=coreHeadings[key] ?? (section===2 ? section2Headings[unit.heading] : undefined);
  let blocks=expandedCore[key] ?? (section===2 ? section2Core[unit.heading] : undefined);
  if(!blocks && titles) {
    const original=unit.coreExplanation ?? unit.explanation;
    if(!Array.isArray(original) || original.length!==titles.length || original.some(x=>typeof x!=='string')) throw new Error(`Core heading revision is stale: ${key ?? unit.heading}`);
    blocks=original.map((text,index)=>p(text,titles[index]));
  }
  const visual=key==='s4-ports' ? portsVisual : extendedDiagramTargets[key] ? mechanismVisual(extendedDiagramTargets[key]) : null;
  if(!blocks && !visual)return unit;
  // Keep authored worked examples and preserved reference materials. The former
  // lead remains available only when explicitly marked preserve by its author.
  const consolidatedTables=new Set(['s4-performance','s4-ports','s4-interrupt-handling','s4-components']);
  const materials=(unit.materials??[]).filter(m=>!(consolidatedTables.has(key)&&m.type==='table'))
    .map(m=>key==='S3.04-BUFFER' && m.type==='table' ? {...m,preserve:true} : m);
  return {...unit, ...(blocks?{coreBlocks:blocks}:{}), ...(visual?{useAuthoredVisual:true, materials:[visual,...materials]}: {})};
}
