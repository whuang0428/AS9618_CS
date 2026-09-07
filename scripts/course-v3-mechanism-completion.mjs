// Concept IDs identify the diagram; positions and state values are authored below.
export const completionDiagramTargets = {
  'S1.07-CHARACTER-SETS':'character-code', Microwaves:'microwave-path', Satellites:'satellite-path',
  'S3.08-FEEDBACK':'feedback-cycle', 's4-components':'alu-control', 's4-execute':'execute-load',
  's4-data-movement':'indexed-store', 's4-device-mask':'device-control',
  'S5.01-NEED':'os-services', 'S5.01-HARDWARE':'printer-services', 'S5.02-BACKUP':'backup-restore',
  'S5.03-REUSE':'library-call', 'S6-ACCOUNTS':'account-permissions', 'S6-VIRUS':'virus-host',
  'S9-DECOMPOSITION-MODULES':'module-contract', 'S9-IPO-CONTRACT':'ipo-cost',
  'S9-INTEGRATED-MODULES':'ticket-payment', 'S10-ARRAY-TERMS':'array-index',
  'S10-ONE-DIMENSION-CODE':'array-total', 'S10-LINEAR-METHOD':'linear-search',
  'S10-IMPLEMENT-FREE-LIST':'free-chains', 'S11-NUMERIC-FUNCTIONS':'random-die',
  'S11-LOOP-BOUNDED':'bounded-login', 'S11-INTEGRATED-CONTROL':'validated-slots',
  'S12-ERROR-CORRECT':'regression-boundary', 'S12-AMEND-CHANGE':'independent-counts',
};

export function completionMechanisms({text,box,arrow,decision,io,terminal,edge,note,chain,cells,teal,red}) {
  return {
    'character-code': {
      title:'The character code and the drawn glyph are different things',height:580,
      facts:['ASCII assigns uppercase A the decimal code 65, represented in 7 bits as 1000001.', 'An 8-bit storage representation with leading zero is 01000001. The leading zero does not change the value.', 'A font controls the shape drawn for A; the agreed encoding controls the interpretation of the bits.'],
      draw:()=>chain([['Character','A'],['ASCII code','65'],['7-bit value','1000001'],['8-bit storage','01000001']],145,['character','code','bits','byte'])+
        text(35,320,'One character, different glyphs',27)+`<text x="140" y="427" font-family="serif" font-size="86" fill="${teal}">A</text><text x="325" y="427" font-family="sans-serif" font-size="86" fill="${teal}">A</text>`+
        text(535,372,['Changing the font changes the drawing.','It does not turn ASCII code 65','into a different character code.'],25)+text(35,535,'Use the specified character set or encoding when converting between bits and text.',24),
    },
    'microwave-path': {
      title:'A directional link needs an unobstructed path',height:630,
      facts:['A point-to-point microwave link uses aligned antennas and normally requires clear line of sight.', 'The upper schematic has an unobstructed path; the lower path is blocked by a hill.', 'Masts or relay sites can help clear obstacles. This is a path schematic, not a scale drawing or a link-budget calculation.'],
      draw:()=>text(35,112,'Clear path',27)+box(35,155,220,80,['Aligned','antenna A'])+box(845,155,220,80,['Aligned','antenna B'])+edge('clear-a','clear-b','M255 195H845','Directional beam',550,175)+
        text(35,326,'Blocked path',27)+box(35,405,220,80,'Antenna A')+box(845,405,220,80,'Antenna B')+
        `<path d="M340 535L550 365L760 535Z" fill="#e5e9de" stroke="${teal}" stroke-width="2"/>`+
        arrow('M255 445H445','Blocked',350,420,red)+text(550,493,'Hill',26,'middle')+
        text(35,595,'Alignment, obstructions, interference and weather affect the usable link.',25),
    },
    'satellite-path': {
      title:'An uplink goes to the satellite; a downlink returns to Earth',height:620,
      facts:['Ground station A transmits an uplink to the satellite, which relays a downlink to a receiving station.', 'The long radio path introduces propagation delay; satellite coverage can reach remote locations.', 'The diagram shows one relay path and is not to scale. Delay depends on the orbit and path length.'],
      draw:()=>box(390,125,320,105,['Satellite','Receives and relays'])+box(35,390,300,100,['Ground station A','Transmitter'])+box(765,390,300,100,['Receiving station','Ground, ship or aircraft'])+
        edge('ground-a','satellite','M185 390V178H390','Uplink',279,161)+edge('satellite','receiver','M710 178H915V390','Downlink',816,161)+
        `<path d="M35 530H1065" stroke="${teal}" stroke-width="3"/>`+text(35,585,'Coverage can be broad; weather and the long path can affect service quality.',25),
    },
    'feedback-cycle': {
      title:'Measure the actual effect, then adjust the next output',height:670,
      facts:['A controller compares a sensor reading with a target and sends an output to an actuator.', 'The actuator changes the physical condition; the sensor measures that condition again.', 'The new reading closes the feedback loop. Disturbances or ineffective actions are detected through the changed reading.'],
      draw:()=>box(35,135,240,85,['Target','Required value'])+edge('target','controller','M275 177H390')+box(390,135,320,85,['Controller','Compare with reading'])+edge('controller','actuator','M710 177H835')+box(835,135,230,85,['Actuator','Apply output'])+
        edge('actuator','condition','M950 220V370')+box(765,370,300,100,['Physical condition','Actual effect'])+
        edge('condition','sensor','M765 420H525')+box(225,370,300,100,['Sensor','Measure again'])+
        edge('sensor','controller','M375 370V290H550V220','New reading',425,267)+
        note(['Feedback measures what happened, not merely what was requested.','The controller can continue, adjust or stop its output on the next comparison.'],545),
    },
    'alu-control': {
      title:'The CU coordinates the operation; the ALU calculates the result',height:700,
      facts:['CIR contains ADD 410, ACC starts at 6 and Memory[410] contains 11.', 'The CU decodes ADD and coordinates the operand read; the ALU adds 6 and 11.', 'The result 17 is retained in ACC. Clock pulses synchronise operations; one instruction can take several cycles.'],
      draw:()=>box(35,130,270,90,['CIR','ADD 410'])+edge('cir','cu','M305 175H430')+box(430,130,260,90,['Control unit','Decode and signal'])+box(795,130,270,90,['System clock','Regular pulses'])+
        edge('clock','cu','M795 175H690')+edge('cu','alu','M560 220V320')+
        box(35,320,270,100,['ACC before','6'])+edge('acc-old','alu','M305 370H430')+box(430,320,260,100,['ALU','6 + 11 = 17'])+box(795,320,270,100,['IAS / main memory','Memory[410] = 11'])+edge('memory','alu','M795 370H690')+
        edge('alu','acc-new','M560 420V505')+box(390,505,340,90,['ACC after','17'])+text(35,660,'IAS holds instructions and data during execution; secondary storage has another role.',24),
    },
    'execute-load': {
      title:'Executing LDD fetches the operand after the instruction is decoded',height:610,
      facts:['CIR contains LDD 700, PC is 201 and Memory[700] is 45.', 'The CU selects load-direct: MAR becomes 700; the memory read supplies 45 to MDR; ACC receives 45.', 'The instruction fetch is already complete. This operand read does not increment PC again; PC remains 201 unless another control event changes it.'],
      draw:()=>text(35,115,'Already fetched: CIR = LDD 700; PC = 201.',27)+chain([['CU decodes','Load direct'],['MAR','Address 700'],['Memory read','MDR becomes 45'],['Copy MDR','ACC becomes 45']],170,['decode','mar','mdr','acc'])+
        note(['MAR holds an address. MDR and ACC hold the value read from that address.','Normal next fetch: PC is still 201; the operand read is not another instruction fetch.'],350)+text(35,555,'Other instructions need different transfers: a store writes; a jump can replace PC.',24),
    },
    'indexed-store': {
      title:'Resolve the index, copy the value, then store a copy',height:605,
      facts:['Initially IX = 2 and Memory[402] = 31. Execute LDX 400, then STO 450.', 'LDX reads Memory[400 + 2], so ACC becomes 31; STO copies 31 into Memory[450].', 'The source at 402 remains 31, ACC remains 31 and IX remains 2. Data movement does not consume its source.'],
      draw:()=>text(35,115,'Execute LDX 400, then STO 450. IX = 2.',27)+chain([['Effective address','400 + 2 = 402'],['Read source','Memory[402] = 31'],['Load ACC','31'],['Store a copy','Memory[450] = 31']],170,['address','source','acc','destination'])+
        note(['After both instructions: Memory[402] = 31; ACC = 31; IX = 2.','MOV IX has another direction: it copies ACC into IX.'],355),
    },
    'device-control': {
      title:'Test on a copy; reload the original before changing a control bit',height:680,
      facts:['Bits are numbered 7 on the left to 0 on the right. The original device byte is 00010001.', 'AND 00010000 tests ready bit 4, producing 00010000 in the working copy.', 'Reload 00010001, then OR 00000100 sets motor bit 2. Store 00010101 back; original bits 4 and 0 stay set.'],
      draw:()=>[7,6,5,4,3,2,1,0].map((v,i)=>text(368+i*85,105,`b${v}`,21,'middle')).join('')+
        [['Device original','00010001'],['AND test mask','00010000'],['Test result','00010000'],['Reload original','00010001'],['OR setting mask','00000100'],['Store back','00010101']].map(([label,bits],i)=>text(35,160+i*76,label,25)+cells(`control-${i}`,[...bits],330,125+i*76,85)).join('')+
        text(35,636,'Using the test result for the update would lose bit 0: reload before setting bit 2.',24),
    },
    'os-services': {
      title:'Applications request services through the operating system',height:605,
      facts:['A user chooses Save in an editor; the editor requests a named file operation from the OS.', 'The OS checks permission and coordinates a device driver and storage hardware.', 'The application supplies editing behaviour; the OS supplies shared resource management and services.'],
      draw:()=>chain([['User','Select Save'],['Application','Request file save'],['Operating system','Coordinate access'],['Driver / hardware','Perform transfer']],165,['user','application','os','hardware'])+
        edge('hardware','result','M947 255V370H780')+box(400,325,380,100,['Completion or error','Reported to the application'])+text(35,537,'The OS also provides user interfaces and manages other shared computer resources.',24),
    },
    'printer-services': {
      title:'A queue, driver and buffer solve different printing problems',height:610,
      facts:['Jobs A and B are submitted. B waits in the print queue while A is serviced.', 'The driver supplies device-specific commands; the buffer temporarily holds data being transferred.', 'A completion notification lets the OS coordinate the next work. A queue of jobs is not the same as the buffer of outgoing data.'],
      draw:()=>chain([['Print queue','A active; B waiting'],['Device driver','Device commands'],['Output buffer','Hold transfer data'],['Printer','Print job A']],170,['queue','driver','buffer','printer'])+
        edge('printer','os','M947 260V390H775','Completion notification',765,315)+box(365,345,410,90,['OS responds','Schedule further work'])+
        text(35,546,'Permission is checked before protected data is released to these device services.',24),
    },
    'backup-restore': {
      title:'A saved recovery version can outlive loss of the working file',height:640,
      facts:['At time 1, version V1 is copied from the working disk to a separate recovery destination.', 'At time 2 the working file becomes V2; it is then lost before another backup.', 'Restoring the saved copy recovers V1, not the unbacked-up V2. Test restoration and keep recovery copies outside the same failure.'],
      draw:()=>box(35,145,355,100,['Time 1: working disk','V1'])+edge('original','backup','M390 195H710','Backup copy',550,176)+box(710,145,355,100,['Separate recovery copy','V1'])+
        edge('original','lost','M212 245V345')+box(35,345,355,110,['Time 2: edited to V2','Then working file is lost'],'#fff4dd',25)+
        edge('backup','restored','M887 245V520H660','Restore V1',953,389)+box(295,475,365,90,['Recovered working file','V1'])+text(35,614,'Backup frequency determines how much work since the last backup may be lost.',24),
    },
    'library-call': {
      title:'Use the routine’s contract to supply input and interpret its result',height:595,
      facts:['The supplied SQRT routine accepts a non-negative number and returns its square root.', 'The caller passes 81, receives 9 and stores it in Result without implementing square root itself.', 'Test the surrounding program and respect the routine’s preconditions; a correct library cannot correct an inappropriate call.'],
      draw:()=>box(35,155,410,110,['Caller','Result <- SQRT(81)'])+edge('caller','library','M445 192H715','Argument: 81',580,174)+box(715,155,350,110,['Library routine','SQRT'])+
        edge('library','caller','M715 240H445','Result: 9',580,226)+
        note(['Check the name, argument order and types, return value and preconditions.','For this routine, reject unsupported negative input; test zero as well as 81.'],370),
    },
    'account-permissions': {
      title:'Establish an identity before checking what that identity may do',height:640,
      facts:['The supplied password is checked against the account’s stored verifier to authenticate the claimed identity.', 'Only after successful login can permissions for that identity authorise an operation.', 'An authenticated account can still be denied a protected file. Separate accounts also support attribution of recorded activity.'],
      draw:()=>box(35,140,255,90,['Claimed account','Supplied password'])+edge('credentials','authenticate','M290 185H420')+decision(420,115,320,140,['Password check','succeeds?'])+
        edge('authenticate','deny-login','M740 185H835','NO',788,168)+box(835,140,230,90,['Reject','login'])+
        edge('authenticate','permissions','M580 255V355','YES',629,306)+box(350,355,460,100,['Check permissions for the account','Allow or deny this operation'])+
        text(35,577,'A valid password does not give the account every possible access right.',25),
    },
    'virus-host': {
      title:'An infected host can carry replication to other files',height:590,
      facts:['A virus attaches to or modifies a host file or program.', 'Executing the infected host can run the virus, which can replicate into further files and run a harmful payload.', 'Sharing an infected host can carry it to another computer. Replication here depends on the host being executed, not merely existing in a folder.'],
      draw:()=>chain([['Infected host','Contains virus code'],['Host executes','Virus code can run'],['Replication','Other files infected'],['Shared infected file','Reaches another PC']],170,['host','execute','replicate','share'])+
        edge('execute','payload','M417 260V355')+box(255,355,380,100,['Possible payload','Corrupt or disrupt data'])+
        text(35,551,'Reduce risk by avoiding untrusted execution and maintaining detection software.',24),
    },
    'module-contract': {
      title:'Pass a calculated result to the module that uses it',height:570,
      facts:['CalculateCharge receives Quantity and UnitPrice and returns an amount.', 'DisplayReceipt receives that amount and outputs it; it does not independently recalculate the charge.', 'The function returns a value; the procedure performs a task. Define input, result and effect at each interface.'],
      draw:()=>box(35,155,265,110,['Inputs','Quantity; UnitPrice'])+edge('inputs','calculate','M300 210H415')+box(415,155,310,110,['CalculateCharge','Returns Amount'])+
        edge('calculate','display','M725 210H825')+box(825,155,240,110,['DisplayReceipt','Outputs Amount'])+
        note(['One calculation owns the charging rule; the display uses its result.','If the rule changes, the calculation and its tests identify where to amend it.'],365),
    },
    'ipo-cost': {
      title:'Inputs and a fixed constant take different routes into the calculation',height:630,
      facts:['ItemPrice is 4.25 and Quantity is 3; fixed postage is 3.50.', 'Processing calculates 4.25 × 3 + 3.50 = 16.25, then outputs Total.', 'Postage is supplied by the problem as a constant, so it need not be input on every run.'],
      draw:()=>box(35,150,285,120,['INPUT','ItemPrice = 4.25','Quantity = 3'])+edge('input','process','M320 210H430')+box(430,150,330,120,['PROCESS','4.25 × 3 + 3.50','= 16.25'])+
        edge('process','output','M760 210H865')+box(865,150,200,120,['OUTPUT','Total','16.25'])+
        box(430,380,330,100,['Fixed postage','3.50'])+edge('constant','process','M595 380V270')+text(35,578,'Use a positive whole Quantity and a non-negative ItemPrice for this example.',24),
    },
    'ticket-payment': {
      title:'Update availability only after the purchase has sufficient payment',height:860,
      facts:['Quantity = 2, PlacesLeft = 8, Student = TRUE and TicketPrice = 25.00.', 'The quantity is valid; subtotal 50.00 becomes 45.00 with the 10% discount.', 'Paid 50.00 permits confirmation, change 5.00 and PlacesLeft 6. Paid 40.00 does not change PlacesLeft.'],
      draw:()=>chain([['Check quantity','1 <= 2 <= 8'],['Subtotal','2 × 25.00 = 50.00'],['Student discount','50.00 × 0.9 = 45.00'],['Amount due','Total = 45.00']],135,['quantity','subtotal','discount','total'])+
        edge('total','payment','M947 225V242H550V255')+decision(375,255,350,135,['Paid >=','45.00?'])+
        edge('payment','success','M375 322H195V480','YES: Paid 50.00',321,408)+box(35,480,430,170,['Confirm purchase','Change = 5.00','PlacesLeft = 8 - 2 = 6'])+
        edge('payment','failure','M725 322H890V480','NO: Paid 40.00',756,408)+box(645,480,420,170,['Report insufficient payment','No places sold','PlacesLeft stays 8'])+
        text(35,765,'An invalid quantity must be rejected before the charge and payment stages.',25),
    },
    'array-index': {
      title:'An array index selects a cell; it is not the stored value',height:565,
      facts:['Ages is ARRAY[3:7] OF INTEGER with values 15, 17, 16, 15, 18.', 'Ages[4] selects the cell at index 4 and reads the value 17.', 'Inclusive capacity is 7 - 3 + 1 = 5. The indices need not begin at 0 or 1.'],
      draw:()=>text(35,117,'Ages : ARRAY[3:7] OF INTEGER',28)+[3,4,5,6,7].map((v,i)=>text(345+i*150,197,v,28,'middle')) .join('')+
        text(35,195,'Index',26)+text(35,276,'Stored value',26)+cells('ages',[15,17,16,15,18],275,230,150)+
        edge('index-4','value-17','M495 205V230')+text(35,387,'Ages[4] = 17; index 4 selects one of the five INTEGER elements.',25)+
        text(35,510,'The same value can occur in several cells without making their indices equal.',24),
    },
    'array-total': {
      title:'Keep the accumulator while the index advances',height:600,
      facts:['Marks[1:4] receives 6, 9, 4 and 7. Total is initialised once to 0.', 'After each addition, Total is 6, 15, 19 and 26. All four marks remain in the array.', 'The final outputs are Total = 26 and Marks[3] = 4. Resetting Total inside the loop would lose earlier contributions.'],
      draw:()=>text(35,120,'Before the loop: Total <- 0',27)+[1,2,3,4].map((v,i)=>text(340+i*185,193,`Index ${v}`,24,'middle')).join('')+
        text(35,270,'Marks[Index]',25)+cells('marks',[6,9,4,7],250,230,185)+
        [0,1,2,3].map(i=>edge(`mark-${i+1}`,`total-${i+1}`,`M${338+i*185} 294V360`)).join('')+
        text(35,404,'Total after add',25)+cells('totals',[6,15,19,26],250,360,185)+text(35,537,'OUTPUT after the loop: 26, then the retained third mark 4.',26),
    },
    'linear-search': {
      title:'Stop at the first match; guard the index when no match exists',height:650,
      facts:['Search Values[1:5] = 9, 4, 6, 4, 2 for target 4.', 'Index 1 is a mismatch; index 2 matches, so Position = 2 and the second 4 at index 4 is never inspected.', 'If the target is absent, Position stays 0 and the search stops after checking index 5, before any Values[6] access.'],
      draw:()=>[1,2,3,4,5].map((v,i)=>text(315+i*150,133,`Index ${v}`,24,'middle')).join('')+cells('search-values',[9,4,6,4,2],245,170,150)+
        text(35,288,'Target = 4',28)+edge('check-1','check-2','M315 234V340H465V234','Mismatch → next',410,386)+text(675,292,['Match at index 2','Position <- 2; stop'],27)+
        note(['The reported result is the index 2, not the target value 4.','No match: keep Position = 0 and stop before reading outside indices 1..5.'],480),
    },
    'free-chains': {
      title:'A node belongs to either the active chain or the free chain',height:765,
      facts:['Initially the active chain is 2 → 4 → 0 and the free chain is 1 → 3 → 0.', 'Allocating slot 1 after node 2 gives active 2 → 1 → 4 → 0 and free 3 → 0.', 'Deleting node 4 and releasing it gives active 2 → 1 → 0 and free 4 → 3 → 0. No node is shared between chains.'],
      draw:()=>[
        ['Initial',[2,4,0],[1,3,0]],['Insert slot 1',[2,1,4,0],[3,0]],['Delete slot 4',[2,1,0],[4,3,0]],
      ].map(([title,active,free],i)=>{const y=125+i*190;const line=(values,row)=>values.map((v,j)=>box(300+j*165,y+row*80,110,56,String(v),row?'#fff4dd':'#e1f0ed',27)+(j<values.length-1?edge(`${i}-${row}-${v}`,`${i}-${row}-${values[j+1]}`,`M${410+j*165} ${y+row*80+28}H${465+j*165}`):'')).join('');return text(35,y-20,title,25)+text(170,y+35,'Active',22)+text(170,y+115,'Free',22)+line(active,0)+line(free,1);}).join('')+text(35,735,'0 is a null link, not a node. Save the old free link before reusing a slot.',25),
    },
    'random-die': {
      title:'Truncate first, then shift the six possible integer results',height:625,
      facts:['RAND(6) returns a real value x with 0 <= x < 6.', 'INT maps the six intervals [0,1), [1,2), …, [5,6) to integers 0, 1, …, 5.', 'Adding 1 produces die values 1 through 6. The endpoint 6 is excluded from RAND(6), but included in the final integer results.'],
      draw:()=>text(35,125,'RAND(6): each interval includes its left endpoint and excludes its right.',24)+
        ['[0,1)','[1,2)','[2,3)','[3,4)','[4,5)','[5,6)'].map((v,i)=>box(235+i*137,165,128,65,v,'#f3f7fa',24)).join('')+
        text(35,319,'INT result',25)+cells('truncated',[0,1,2,3,4,5],235,275,137)+
        [0,1,2,3,4,5].map(i=>edge(`int-${i}`,`die-${i+1}`,`M${295+i*137} 339V415`,'+1',326+i*137,389)).join('')+
        text(35,459,'Die result',25)+cells('die',[1,2,3,4,5,6],235,415,137)+text(35,579,'INT(RAND(6)) + 1 gives an INTEGER. RAND(6) alone gives a REAL.',25),
    },
    'bounded-login': {
      title:'Continue only while the password is wrong and attempts remain',height:1160,
      facts:['Password starts as an empty string and Attempts as 0.', 'The continuation test is (Password <> "open") AND (Attempts < 3). TRUE reads input and increments Attempts; FALSE exits.', 'Input open exits after one attempt. Inputs x, y, open succeed on attempt 3; x, y, z fail after 3. Every input increments the counter.'],
      draw:()=>terminal(390,100,300,60,'Start')+edge('start','init','M540 160V205')+box(290,205,500,85,['Password <- ""','Attempts <- 0'])+
        edge('init','condition','M540 290V350')+decision(285,350,510,170,['Password <> "open"','AND Attempts < 3?'])+
        edge('condition','input','M540 520V585','TRUE',593,558)+io(365,585,350,70,'INPUT Password')+
        edge('input','increment','M540 655V710')+box(330,710,420,75,'Attempts <- Attempts + 1')+
        edge('increment','condition','M330 747H115V435H285')+
        edge('condition','output','M795 435H935V860','FALSE',991,645)+io(545,860,520,85,'OUTPUT Password = "open", Attempts')+
        edge('output','end','M805 945V1000')+terminal(655,1000,300,60,'End')+
        text(35,888,['open → TRUE, 1','x, y, open → TRUE, 3','x, y, z → FALSE, 3'],24)+
        text(35,1121,'Third-attempt success is counted as attempt 3, not 2 or 4.',25),
    },
    'validated-slots': {
      title:'Rejected inputs repeat within one accepted-mark slot',height:660,
      facts:['Three outer slots require three accepted marks. Inputs are -1, 0, 50, 101, 100.', 'Slot 1 rejects -1 then accepts 0; slot 2 accepts 50; slot 3 rejects 101 then accepts 100.', 'Only 0, 50 and 100 are recorded: Total = 150, Mean = 50, Passed = 2. The pass threshold is at least 50.'],
      draw:()=>[
        ['Slot 1',['-1: reject','0: accept'],'0'],['Slot 2',['50: accept'],'50'],['Slot 3',['101: reject','100: accept'],'100'],
      ].map(([label,attempts,accepted],i)=>{const x=35+i*365;return text(x,135,label,28)+box(x,180,300,110,attempts,'#f3f7fa',26)+edge(`attempts-${i}`,`record-${i}`,`M${x+150} 290V365`)+box(x,365,300,90,['Record only',accepted]);}).join('')+
        note(['Accepted values: 0 + 50 + 100 = 150; mean = 150 / 3 = 50.','Two accepted marks meet Mark >= 50. Invalid attempts affect neither total nor count.'],520),
    },
    'regression-boundary': {
      title:'Retest the failing boundary and the neighbouring behaviours',height:575,
      facts:['The requirement is Pass for Mark >= 50. The faulty program uses Mark > 50.', 'At 49 the original and corrected outputs are Fail. At 50 the old output Fail changes to Pass. At 51 both output Pass.', 'Rechecking 50 demonstrates the fix; checking 49 and 51 gives regression evidence for nearby behaviour.'],
      draw:()=>['49','50','51'].map((v,i)=>text(430+i*240,130,`Mark ${v}`,28,'middle')).join('')+
        text(35,232,'Before: > 50',26)+cells('old-pass',['Fail','Fail','Pass'],315,190,240)+
        text(35,363,'After: >= 50',26)+cells('fixed-pass',['Fail','Pass','Pass'],315,320,240)+
        text(35,455,'49 and 51 preserve their outcomes. The boundary value 50 exposes the correction.',24)+text(35,535,'Expected results come from the requirement, not from the faulty program.',25),
    },
    'independent-counts': {
      title:'Merit marks must also contribute to the pass count',height:690,
      facts:['Pass requires Mark >= 50 and merit requires Mark >= 70.', 'Two independent IF statements are required: a mark of 70 increments both counts.', 'Inputs 49, 50, 69, 70 give PassCount 3 and MeritCount 1. An ELSE between the pass and merit tests would wrongly make them exclusive.'],
      draw:()=>box(390,125,320,75,'Read one Mark')+edge('mark','pass-test','M550 200V260')+
        box(220,260,660,90,['IF Mark >= 50','Increment PassCount when true'])+edge('pass-test','merit-test','M550 350V410','Then test independently',737,392)+
        box(220,410,660,90,['IF Mark >= 70','Increment MeritCount when true'])+
        text(35,568,'Mark 70 passes both tests: PassCount +1 AND MeritCount +1.',25)+
        text(35,637,'49, 50, 69, 70 → PassCount = 3; MeritCount = 1.',26),
    },
  };
}
