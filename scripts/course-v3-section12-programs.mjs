// Complete displayed pseudocode with input/output fixtures for simulation checks.
const program = (code, tests) => ({ code, tests });
const selection = (condition) => `DECLARE Mark : INTEGER
DECLARE Result : STRING
INPUT Mark
IF ${condition} THEN
    Result <- "Pass"
ELSE
    Result <- "Fail"
ENDIF
OUTPUT Result`;
const counts = (enhanced) => `DECLARE Index : INTEGER
DECLARE Mark : INTEGER
DECLARE PassCount : INTEGER${enhanced ? '\nDECLARE MeritCount : INTEGER' : ''}
PassCount <- 0${enhanced ? '\nMeritCount <- 0' : ''}
FOR Index <- 1 TO 4
    INPUT Mark
    IF Mark >= 50 THEN
        PassCount <- PassCount + 1
    ENDIF${enhanced ? '\n    IF Mark >= 70 THEN\n        MeritCount <- MeritCount + 1\n    ENDIF' : ''}
NEXT Index
OUTPUT PassCount${enhanced ? '\nOUTPUT MeritCount' : ''}`;
const rainfall = (enhanced) => `DECLARE Day : INTEGER
DECLARE Rain : REAL
DECLARE Total : REAL${enhanced ? '\nDECLARE WetDays : INTEGER' : ''}
Total <- 0.0${enhanced ? '\nWetDays <- 0' : ''}
FOR Day <- 1 TO 3
    INPUT Rain
    Total <- Total + Rain${enhanced ? '\n    IF Rain > 0.0 THEN\n        WetDays <- WetDays + 1\n    ENDIF' : ''}
NEXT Day
OUTPUT Total${enhanced ? '\nOUTPUT WetDays' : ''}`;
const parcels = (enhanced) => `DECLARE Index : INTEGER
DECLARE Mass : REAL
DECLARE Accepted : INTEGER${enhanced ? '\nDECLARE Rejected : INTEGER' : ''}
Accepted <- 0${enhanced ? '\nRejected <- 0' : ''}
FOR Index <- 1 TO 4
    INPUT Mass
    IF (Mass >= 2.0) AND (Mass <= 5.0) THEN
        Accepted <- Accepted + 1${enhanced ? '\n    ELSE\n        Rejected <- Rejected + 1' : ''}
    ENDIF
NEXT Index
OUTPUT Accepted${enhanced ? '\nOUTPUT Rejected' : ''}`;
export const section12Programs = {
  boundaryFault: program(selection('Mark > 50'), [{input:[49],output:['Fail']},{input:[50],output:['Fail']},{input:[51],output:['Pass']}]),
  boundaryFixed: program(selection('Mark >= 50'), [{input:[49],output:['Fail']},{input:[50],output:['Pass']},{input:[51],output:['Pass']}]),
  failBranch: program(`DECLARE Mark : INTEGER
INPUT Mark
IF Mark < 50 THEN
    OUTPUT "Fail"
ELSE
    OUTPUT "Pass"
ENDIF`,[{input:[49],output:['Fail']},{input:[50],output:['Pass']},{input:[51],output:['Pass']}]),
  average: program(`DECLARE Total : REAL
DECLARE Count : INTEGER
INPUT Total
INPUT Count
IF Count > 0 THEN
    OUTPUT Total / Count
ELSE
    OUTPUT "No data"
ENDIF`,[{input:[24,3],output:[8]},{input:[0,0],output:['No data']}]),
  trace: program(`DECLARE Index : INTEGER
DECLARE Value : INTEGER
DECLARE Total : INTEGER
Total <- 0
FOR Index <- 1 TO 3
    INPUT Value
    IF Value > 0 THEN
        Total <- Total + Value
    ENDIF
NEXT Index
OUTPUT Total`,[{input:[4,-2,3],output:[7]},{input:[0,-1,0],output:[0]},{input:[1,2,3],output:[6]}]),
  discount: program(`DECLARE Amount : REAL
DECLARE Member : BOOLEAN
DECLARE Due : REAL
INPUT Amount
INPUT Member
IF Member THEN
    Due <- Amount * 0.90
ELSE
    Due <- Amount
ENDIF
OUTPUT Due`,[{input:[100,true],output:[90]},{input:[100,false],output:[100]}]),
  passOriginal: program(counts(false),[{input:[49,50,69,70],output:[3]},{input:[0,0,0,0],output:[0]},{input:[70,80,90,100],output:[4]}]),
  passEnhanced: program(counts(true),[{input:[49,50,69,70],output:[3,1]},{input:[0,0,0,0],output:[0,0]},{input:[70,80,90,100],output:[4,4]},{input:[50,50,69,69],output:[4,0]}]),
  rainOriginal: program(rainfall(false),[{input:[0,2,0.5],output:[2.5]},{input:[0,0,0],output:[0]}]),
  rainEnhanced: program(rainfall(true),[{input:[0,2,0.5],output:[2.5,2]},{input:[0,0,0],output:[0,0]},{input:[1,2,3],output:[6,3]}]),
  parcelOriginal: program(parcels(false),[{input:[1.9,2,5,5.1],output:[2]}]),
  parcelEnhanced: program(parcels(true),[{input:[1.9,2,5,5.1],output:[2,2]},{input:[2,3,4,5],output:[4,0]},{input:[0,1,6,7],output:[0,4]}]),
};
for (const [key, valueName, countName, threshold] of [['sales', 'Price', 'LargeSales', 100], ['journeys', 'Distance', 'LongTrips', 20]]) {
  const code = enhanced => `DECLARE Index : INTEGER
DECLARE ${valueName} : REAL
DECLARE Total : REAL${enhanced ? `\nDECLARE ${countName} : INTEGER` : ''}
Total <- 0.0${enhanced ? `\n${countName} <- 0` : ''}
FOR Index <- 1 TO 3
    INPUT ${valueName}
    Total <- Total + ${valueName}${enhanced ? `\n    IF ${valueName} >= ${threshold}.0 THEN\n        ${countName} <- ${countName} + 1\n    ENDIF` : ''}
NEXT Index
OUTPUT Total${enhanced ? `\nOUTPUT ${countName}` : ''}`;
  const input = key === 'sales' ? [99, 100, 101] : [19, 20, 21];
  const total = key === 'sales' ? 300 : 60;
  section12Programs[`${key}Original`] = program(code(false), [{ input, output: [total] }]);
  section12Programs[`${key}Enhanced`] = program(code(true), [{ input, output: [total, 2] }, { input: [0, 0, 0], output: [0, 0] }]);
}
export const codeFor12 = key => {
  if (!section12Programs[key]) throw new Error(`Unknown S12 program ${key}`);
  return section12Programs[key].code;
};

// One interface specification drives both the chart labels and full pseudocode.
export const section12Structures = {
  order: { main:'ProcessOrder', reader:'ReadOrder', calculate:'CalculateCost', writer:'DisplayCost', inputs:[['Quantity','INTEGER'],['UnitPrice','REAL']], result:['Cost','REAL'], expression:'Quantity * UnitPrice', tests:[{input:[3,2.5],output:[7.5]},{input:[1,0],output:[0]}] },
  payroll: { main:'ProcessPayroll', reader:'ReadHours', calculate:'CalculatePay', writer:'PrintPay', inputs:[['Hours','REAL'],['Rate','REAL']], result:['Pay','REAL'], expression:'Hours * Rate', tests:[{input:[4,12.5],output:[50]},{input:[0,12],output:[0]}] },
  journey: { main:'PlanJourney', reader:'ReadJourney', calculate:'CalculateDuration', writer:'DisplayDuration', inputs:[['Distance','REAL'],['Speed','REAL']], result:['Duration','REAL'], expression:'Distance / Speed', tests:[{input:[150,60],output:[2.5]},{input:[0,40],output:[0]}] },
};
export function structureCode(key) {
  const s=section12Structures[key];
  const formals=mode=>s.inputs.map(([name,type])=>`${mode} ${name} : ${type}`).join(', ');
  const args=s.inputs.map(([name])=>name).join(', '),[result,type]=s.result;
  return `PROCEDURE ${s.reader}(${formals('BYREF')})\n${s.inputs.map(([n])=>`    INPUT ${n}`).join('\n')}\nENDPROCEDURE\n\nFUNCTION ${s.calculate}(${formals('BYVAL')}) RETURNS ${type}\n    RETURN ${s.expression}\nENDFUNCTION\n\nPROCEDURE ${s.writer}(BYVAL ${result} : ${type})\n    OUTPUT ${result}\nENDPROCEDURE\n\nPROCEDURE ${s.main}\n${[...s.inputs,s.result].map(([n,t])=>`    DECLARE ${n} : ${t}`).join('\n')}\n    CALL ${s.reader}(${args})\n    ${result} <- ${s.calculate}(${args})\n    CALL ${s.writer}(${result})\nENDPROCEDURE\n\nCALL ${s.main}`;
}
export const section12States = {
  initial:'Locked',
  transitions:[
    {from:'Locked',event:'coin',to:'Unlocked'},
    {from:'Locked',event:'push',to:'Locked'},
    {from:'Unlocked',event:'pass',to:'Locked'},
    {from:'Unlocked',event:'coin',to:'Unlocked'},
  ],
  tests:[{events:['coin','pass'],states:['Locked','Unlocked','Locked']},{events:['push','coin','coin','pass'],states:['Locked','Locked','Unlocked','Unlocked','Locked']}],
};

const roomRule = upper => `DECLARE Quantity : INTEGER
INPUT Quantity
IF (Quantity >= 1) AND (Quantity <= ${upper}) THEN
    OUTPUT "Accepted"
ELSE
    OUTPUT "Rejected"
ENDIF`;
const availability = body => `FUNCTION IsAvailable(RoomID : INTEGER) RETURNS BOOLEAN
${body}
ENDFUNCTION

DECLARE RoomID : INTEGER
INPUT RoomID
IF IsAvailable(RoomID) THEN
    OUTPUT "Available"
ELSE
    OUTPUT "Unavailable"
ENDIF`;
const configurablePass = enhanced => `FUNCTION IsPass(Mark : INTEGER${enhanced ? ', PassMark : INTEGER' : ''}) RETURNS BOOLEAN
    RETURN Mark >= ${enhanced ? 'PassMark' : '50'}
ENDFUNCTION

DECLARE Index : INTEGER
DECLARE Mark : INTEGER
DECLARE PassCount : INTEGER${enhanced ? '\nDECLARE PassMark : INTEGER\nINPUT PassMark' : ''}
PassCount <- 0
FOR Index <- 1 TO 4
    INPUT Mark
    IF IsPass(Mark${enhanced ? ', PassMark' : ''}) THEN
        PassCount <- PassCount + 1
    ENDIF
NEXT Index
OUTPUT PassCount`;

Object.assign(section12Programs, {
  roomRule: program(roomRule(30), [0,1,2,15,29,30,31].map(n=>({input:[n],output:[n>=1&&n<=30?'Accepted':'Rejected']}))),
  roomFault: program(roomRule(31), [{input:[31],output:['Accepted']},{input:[30],output:['Accepted']}]),
  syntaxFault: program(`DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"`, []),
  syntaxFixed: program(`DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF`, [{input:[49],output:['Fail']},{input:[50],output:['Pass']}]),
  stubTrue: program(availability('    RETURN TRUE'), [{input:[101],output:['Available']},{input:[102],output:['Available']}]),
  stubFalse: program(availability('    RETURN FALSE'), [{input:[101],output:['Unavailable']},{input:[102],output:['Unavailable']}]),
  availabilityReal: program(availability('    RETURN RoomID = 101'), [{input:[101],output:['Available']},{input:[102],output:['Unavailable']}]),
  thresholdOriginal: program(configurablePass(false), [{input:[49,50,69,70],output:[3]},{input:[59,60,61,0],output:[3]}]),
  thresholdEnhanced: program(configurablePass(true), [{input:[50,49,50,69,70],output:[3]},{input:[60,49,50,69,70],output:[2]},{input:[60,59,60,61,0],output:[2]},{input:[0,0,0,0,0],output:[4]},{input:[100,99,100,0,50],output:[1]}]),
  batchOrders: program(`PROCEDURE ReadOrder(BYREF Quantity : INTEGER, BYREF UnitPrice : REAL, BYREF Member : BOOLEAN)
    INPUT Quantity
    INPUT UnitPrice
    INPUT Member
ENDPROCEDURE

FUNCTION StandardCost(Quantity : INTEGER, UnitPrice : REAL) RETURNS REAL
    RETURN Quantity * UnitPrice
ENDFUNCTION

FUNCTION MemberCost(Quantity : INTEGER, UnitPrice : REAL) RETURNS REAL
    RETURN Quantity * UnitPrice * 0.90
ENDFUNCTION

FUNCTION CalculateCost(Quantity : INTEGER, UnitPrice : REAL, Member : BOOLEAN) RETURNS REAL
    IF Member THEN
        RETURN MemberCost(Quantity, UnitPrice)
    ELSE
        RETURN StandardCost(Quantity, UnitPrice)
    ENDIF
ENDFUNCTION

PROCEDURE DisplayCost(BYVAL Cost : REAL)
    OUTPUT Cost
ENDPROCEDURE

PROCEDURE ProcessOrder()
    DECLARE Quantity : INTEGER
    DECLARE UnitPrice : REAL
    DECLARE Member : BOOLEAN
    DECLARE Cost : REAL
    CALL ReadOrder(Quantity, UnitPrice, Member)
    Cost <- CalculateCost(Quantity, UnitPrice, Member)
    CALL DisplayCost(Cost)
ENDPROCEDURE

PROCEDURE ProcessBatch()
    DECLARE OrderCount : INTEGER
    DECLARE Index : INTEGER
    INPUT OrderCount
    IF OrderCount = 0 THEN
        OUTPUT "No orders"
    ELSE
        FOR Index <- 1 TO OrderCount
            CALL ProcessOrder()
        NEXT Index
    ENDIF
ENDPROCEDURE

CALL ProcessBatch()`, [{input:[2,3,2.5,false,2,5,true],output:[7.5,9]},{input:[0],output:['No orders']},{input:[1,1,0,true],output:[0]},{input:[1,4,10,false],output:[40]}]),
});

export const uploadStates12 = {
  initial:'Ready',
  transitions:[
    {from:'Ready',event:'start',to:'Uploading'},
    {from:'Ready',event:'cancel',to:'Ready'},
    {from:'Uploading',event:'progress',to:'Uploading'},
    {from:'Uploading',event:'complete',condition:'Valid = TRUE',to:'Ready'},
    {from:'Uploading',event:'complete',condition:'Valid = FALSE',to:'Error'},
    {from:'Uploading',event:'cancel',to:'Ready'},
    {from:'Error',event:'retry',to:'Uploading'},
    {from:'Error',event:'cancel',to:'Ready'},
  ],
  tests:[
    {events:['start','progress','complete [Valid = FALSE]','retry','complete [Valid = TRUE]'],states:['Ready','Uploading','Uploading','Error','Uploading','Ready']},
    {events:['cancel','start','cancel'],states:['Ready','Ready','Uploading','Ready']},
  ],
};
