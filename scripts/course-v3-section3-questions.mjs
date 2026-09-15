import {truthRows,op} from './course-v3-section3-examples.mjs';

const ids=(n,...a)=>a.map(x=>`S3.${String(n).padStart(2,'0')}.A${String(x).padStart(2,'0')}`);
const q=(id,prompt,objectiveIds,answerPoints,commonError,extra={})=>({id,prompt,objectiveIds,answerPoints,commonError,authored:true,type:'Application',marks:answerPoints.length,...extra});
const mt=(title,headers,rows)=>({type:'table',title,headers,rows,preserve:true,preserveText:true});
const answerCircuit=(key,alt)=>({answerDiagram:`/assets/course-v3/section-3/logic-${key}.svg`,answerDiagramLabel:'One valid logic circuit',answerDiagramAlt:alt});
const truth=(key,intermediateNames=[],intermediates=[])=>{
  const names={permit:['D','C','P'],equality:['A','B','Q'],lamp:['S','U','V','L'],norXor:['A','B','C','Q'],xorTerms:['A','B','Q'],warning:['A','B','C','W'],fromExamTable:['A','B','Q'],circuitC:['A','B','C','Q'],circuitD:['A','B','C','Q'],review:['Door','Key','Smoke','Q']}[key];
  return mt('Complete truth table',[...names.slice(0,-1),...intermediateNames,names.at(-1)],truthRows(key,intermediates));
};

const additions={
  13:[
    ['Explain what a recorder can recover after this sequence: a reading of 31 is saved successfully, a RAM-only correction changes it to 32, and power is lost before another save. State what a separately completed removable copy made before the correction contains.',ids(1,3,4,5),[
      'The volatile RAM-only value 32 is lost when power is removed.','The last completed saved file still contains 31.','On restart, the recorder can load 31 into new working RAM.','The separately completed removable copy also contains 31; it does not automatically receive later RAM edits.',
    ],'A displayed or edited value is not necessarily the value last written to persistent storage.'],
    ['Explain one benefit and one limitation of a dedicated embedded controller in a small ticket validator. It must scan tickets on battery power; a proposed upgrade would analyse camera images. Link each point to these requirements.',ids(2,1,2,3),[
      'The controller is incorporated into the validator for its dedicated ticket-checking function.','Hardware sized for the scanning task can avoid unnecessary general-purpose resources and support low-power operation.','Image analysis may require more working memory, processing capacity or a different input interface.','The proposed upgrade may therefore require replacement hardware rather than only changing the instructions.',
    ],'State how the claimed benefit or limitation follows from the specific task.'],
  ],
  14:[
    ['Explain the difference between the moving-coil microphone and loudspeaker in a recording/playback system. Include what causes motion in each and where ADC and DAC are required.',ids(3,3,4),[
      'Sound pressure moves the microphone diaphragm and its attached coil in a permanent magnetic field.','That movement induces a varying analogue voltage.','An ADC samples, quantises and encodes the input signal for digital processing.','During playback, a DAC supplies an analogue signal from the stored sample values.','After amplification, changing current in the loudspeaker coil produces force in the magnetic field, moving the cone and air.',
    ],'A microphone’s mechanical motion produces the electrical signal; the loudspeaker’s electrical drive produces motion.'],
    ['Describe the final model when a printer follows three aligned, 0.5 mm thick slices: a filled 4 × 4 base, a filled 3 × 3 middle and a filled 2 × 2 top. Explain what would be wrong if it repeated the first slice three times.',ids(3,2),[
      'The first slice forms the broad 4 × 4 base.','The printer repositions and forms the 3 × 3 middle, then the 2 × 2 top above it.','The complete stepped object is 1.5 mm high.','Repeating the base slice makes a constant 4 × 4 cross-section, so correct height alone does not establish correct shape.',
    ],'Use every supplied cross-section, not only the layer count.'],
    ['Explain how a flash cell can retain a programmed 0 during shutdown but need power to read it later. Use the declared model in which stored charge raises the threshold and a high-threshold state reads 0.',ids(3,6),[
      'The insulated floating-gate region retains the programmed charge after external power is removed.','Stored charge maintains the higher threshold in this declared model.','After power returns, sensing circuitry tests the cell behaviour and decodes the state as 0.','That electronic access requires power even though retention did not require continuous external power.',
    ],'Retaining a stored state and electronically accessing that state are different operations.'],
    ['Explain why each of these faults can occur independently: a correct visible screen with no registered touches, and a VR headset with working displays but a frozen viewpoint after a head turn.',ids(3,8,9),[
      'The touchscreen display is an output layer separate from the touch-sensing input layer.','A fault in sensing or coordinate processing can stop touch input while the display still works.','The VR rendering system needs updated tracking information to select the current view.','Working displays can keep showing an old view if the tracking or rendering update fails.',
    ],'Correct output hardware does not prove that the required input-to-processing path works.'],
    ['Compare writing and reading on a magnetic disk and a recordable optical disc. Explain why a pressed optical disc does not automatically support the same writing operation.',ids(3,5,7),[
      'A magnetic write head changes magnetic states, while reading senses and decodes their pattern.','A recordable optical writer changes a suitable recording layer using higher laser power.','An optical read uses lower power to detect reflected-light differences without deliberately rewriting the layer.','A pressed disc has a manufactured read-only pattern; its presence in a drive does not supply a compatible writable recording layer.',
    ],'Do not transfer magnetic or recording-layer mechanisms to the wrong medium.'],
  ],
  15:[
    ['Complete the buffer trace for capacity 3, initially empty, and ordered blocks A–E. At time zero A–C arrive and the sender pauses with D–E waiting. At each following second, remove the oldest block first, then accept one waiting block if there is space. State buffer contents after 1 s, 2 s and 5 s, and the order removed.',ids(4,1),[
      'After 1 s, A has been removed and D accepted: B, C, D remain.','After 2 s, B has been removed and E accepted: C, D, E remain.','With no more arrivals, C, D and E are removed at 3, 4 and 5 s; the buffer is then empty.','The removed order is A, B, C, D, E, with each block removed once.',
    ],'Apply the stated remove-then-arrive event order and keep sender waiting data separate from buffer data.'],
    ['Explain suitable memory choices for a small controller’s low-latency workspace, a large affordable image-editing workspace, and calibration instructions that must be rewritten electrically while installed. State what each retains after power loss.',[...ids(6,1,2,3,4),...ids(7,3)], [
      'SRAM suits the small low-latency workspace because its powered bistable storage provides fast access without periodic refresh.','DRAM suits the large workspace because high density and lower cost per bit support capacity; its capacitor charge needs refresh.','Both workspaces are volatile and lose unsaved data when power is removed.','EEPROM meets the stated electrical update requirement and retains the calibration instructions without power.',
    ],'Explain the particular workload and update condition; non-volatility alone does not distinguish ROM variants.'],
  ],
  16:[
    ['State the heater states for readings 17, 19, 20, 19, 18, 17 °C. It starts OFF, turns ON below 18 °C, turns OFF at or above 20 °C, and retains its previous state between those thresholds. Explain the two different outcomes at 19 °C.',ids(8,3),[
      'At 17 °C the heater changes from OFF to ON.','The first 19 °C retains ON; 20 °C changes it to OFF.','The later 19 °C and 18 °C retain OFF, then the final 17 °C changes it to ON.','The complete sequence is ON, ON, OFF, OFF, OFF, ON; 19 °C retains a different previous state on the two visits.',
    ],'The middle band has no single output independent of history.'],
    ['Explain the difference between a pump whose pressure sensor is stuck below the target and a pump whose motor fails while its pressure sensor remains accurate. The controller pumps whenever measured pressure is below the target.',ids(8,3),[
      'The stuck sensor keeps reporting low pressure even if actual pressure rises.','The controller may therefore keep pumping beyond the intended actual target.','With a failed motor and accurate sensor, the low measurement can correctly reveal that pressure has not risen.','Feedback supplies evidence of the outcome, but does not by itself repair a failed sensor or actuator.',
    ],'Distinguish an inaccurate reading from an accurate report of unsuccessful action.'],
  ],
  17:[
    ['Construct complete truth tables for Q = NOT (A OR B) and R = (NOT A) AND (NOT B), and state whether they are equivalent. State why one matching row would not be sufficient.',ids(10,1,2,3,5,7),[
      'Use all four input rows 00, 01, 10, 11.','Q is 1, 0, 0, 0 in that order.','R is also 1, 0, 0, 0, so the expressions are equivalent for these inputs.','A single matching row could hide a difference on another input combination.',
    ],'Equivalence concerns every input combination, not one successful example.',{answerTable:mt('Complete equivalence check',['A','B','Q','R'],[[0,0,1,1],[0,1,0,0],[1,0,0,0],[1,1,0,0]])}],
  ],
  18:[
    ['Construct an expression and a two-input-gate circuit for Q whose only accepted rows are ABC = 010 and 111. Include both accepted-row terms and verify all eight source outputs.',ids(10,8,9,10),[
      'The 010 term is ((NOT A) AND B) AND (NOT C).','The 111 term is (A AND B) AND C.','OR the two terms; construct each three-condition term using cascaded two-input AND gates and the required NOT gates.','The complete Q column in 000–111 order is 0, 0, 1, 0, 0, 0, 0, 1.',
    ],'Retain both accepted rows and test all rejected rows.',{...answerCircuit('practiceRows','Two three-condition AND terms for 010 and 111 feed a two-input OR.'),answerTable:mt('Complete verification',['A','B','C','Q'],truthRows('practiceRows'))}],
  ],
};

export function section3AdditionalPractice(lesson) {
  return additions[lesson.originalLesson].map(([prompt,objectiveIds,answerPoints,commonError,extra],i)=>q(`S3-L${String(lesson.originalLesson-12).padStart(2,'0')}-APPLY-${i+1}`,prompt,objectiveIds,answerPoints,commonError,extra));
}

export function completeSection3Answers(lesson) {
  const gates={answerDiagram:'/assets/course-v3/section-3/gate-symbols.svg',answerDiagramAlt:'Six standard NOT, AND, OR, NAND, NOR and XOR gate symbols.',answerDiagramLabel:'Gate symbol reference'};
  const answers={
    'S3-L05-Q1':gates,'S3-L05-Q2':gates,'S3-L05-EXAM-1':gates,
    'S3-L05-Q3':{answerTable:mt('Two-input inverted gates',['A','B','NAND','NOR'],[[0,0,1,1],[0,1,1,0],[1,0,1,0],[1,1,0,0]])},
    'S3-L05-Q4':{answerTable:mt('OR and XOR',['A','B','OR','XOR'],[[0,0,0,0],[0,1,1,1],[1,0,1,1],[1,1,1,0]])},
    'S3-L05-EXAM-3':{answerTable:mt('AND and XOR',['A','B','Q = AND','R = XOR'],[[0,0,0,0],[0,1,0,1],[1,0,0,1],[1,1,1,0]])},
    'S3-L06-Q1':{...answerCircuit('lamp','NOT U and NOT V feed AND, then this result and S feed the final AND.'),answerTable:truth('lamp',['NOT U','NOT V','Intermediate AND'],[op('NOT','U'),op('NOT','V'),op('AND',op('NOT','U'),op('NOT','V'))])},
    'S3-L06-Q2':{...answerCircuit('norXor','A and B feed NOR; its output and C feed XOR.'),answerTable:truth('norXor',['N = A NOR B'],[op('NOR','A','B')])},
    'S3-L06-Q3':{answerTable:truth('circuitD',['X = A AND B','Y = X OR C'],[op('AND','A','B'),op('OR',op('AND','A','B'),'C')])},
    'S3-L06-Q4':{...answerCircuit('xorTerms','NOT A AND B and A AND NOT B feed OR, implementing XOR.'),answerTable:truth('xorTerms')},
    'S3-L06-EXAM-1':{...answerCircuit('warning','NOT B and NOT C feed AND; its output and A feed OR.'),answerTable:truth('warning')},
    'S3-L06-EXAM-2':{answerTable:truth('circuitC',['X = A OR B'],[op('OR','A','B')])},
    'S3-L06-EXAM-3':{...answerCircuit('fromExamTable','B feeds NOT and its output combines with A through OR.'),answerTable:truth('fromExamTable')},
  };
  // Retain valid prompts and scoring, but make VR's viewpoint wording exact.
  const repair=q=>({...q,...(answers[q.id]??{}),...(q.id==='V3-014-S3.03-VR'?{answerPoints:q.answerPoints.map(s=>s==='The updated scene appears to follow the movement.'?'The view updates for the changed head orientation while virtual objects retain their world positions.':s)}:{})});
  return {...lesson,practice:lesson.practice.map(repair),authoredExamQuestions:lesson.authoredExamQuestions.map(repair)};
}

export const section3ReviewAnswer={
  answerTable:truth('review',['NOT Key','Door AND NOT Key'],[op('NOT','Key'),op('AND','Door',op('NOT','Key'))]),
};

export function section3ReviewPractice(available) {
  const ids=(...n)=>n.map(x=>`S3.${String(x).padStart(2,'0')}.R`);
  const questions=[
    q('REV-P1-S3-DEVICES','Explain two faults in a museum recording kiosk: the moving-coil microphone’s diaphragm cannot move, and the laser printer produces the correct label pattern but the toner rubs off. Identify the failed conversion or stage in each and explain why a functioning ADC or laser respectively does not resolve it.',ids(3),[
      'The microphone needs sound-driven diaphragm and coil motion to induce the analogue signal.','An immobilised diaphragm prevents normal acoustic-to-electrical conversion before the ADC.','A working ADC cannot recreate the voice signal that the transducer did not supply.','The printer’s faulty stage is fusing by heat and pressure.','The laser forms the drum’s electrostatic image; it does not permanently fix transferred toner on the paper.',
    ],'Locate the failed physical stage before changing a later or unrelated stage.'),
    q('REV-P1-S3-MEMORY','Explain why an embedded environmental recorder uses RAM for changing readings, persistent firmware storage and separate saved files. Its firmware must be rewritten electrically while installed. A capacity-three buffer starts with R1–R3 while R4 waits at the paused sender; one block is removed and then R4 is accepted. State the new buffer contents and what survives shutdown after a completed file save.',ids(1,2,4,5,7),[
      'RAM supplies read/write working data; persistent firmware provides the recorder’s dedicated instructions after restart.','EEPROM meets the stated electrical firmware-update requirement; PROM cannot be repeatedly reprogrammed and EPROM needs UV erasure.','A buffer is temporary transfer storage and does not increase the receiver’s sustained speed.','Removing R1 and accepting R4 leaves R2, R3, R4.','Ordinary RAM loses unsaved working values, while the completed non-volatile saved file and firmware remain.',
    ],'Keep the stored role, update technology and temporary waiting state distinct.'),
    q('REV-P1-S3-CONTROL','Explain why a pressure-controlled pump can keep running past the actual target if its sensor is stuck low. Compare this with an accurate sensor reporting no pressure rise because the motor is faulty, and state why a pressure display alone is monitoring.',ids(8,9),[
      'The controller compares the measured pressure, not an independently known actual value, with the target.','A stuck-low reading can keep commanding pumping after actual pressure is high.','An accurate unchanged reading with a faulty motor is feedback that the commanded action did not achieve the intended pressure change.','Feedback supplies evidence but does not by itself repair the failed component.','A pressure display reports a condition; without corrective action it does not regulate the pressure.',
    ],'Separate measurement accuracy from actuator effectiveness.'),
  ];
  for(const q of questions) if(!q.objectiveIds.every(id=>available.includes(id))) throw new Error(`Unknown S3 review objective: ${q.id}`);
  return questions;
}
