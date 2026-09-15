import { codeFor } from './course-v3-section11-programs.mjs';
import { section11Visuals } from './course-v3-section11-diagrams.mjs';

const ids=(r,...ns)=>ns.map(n=>`S11.${String(r).padStart(2,'0')}.A${String(n).padStart(2,'0')}`);
const supplied=key=>({code:codeFor(key),programKey:key,codeLabel:'Supplied Cambridge pseudocode',codeCaption:'Use this complete program and the stated inputs.'});
const answer=key=>({answerCode:codeFor(key),answerProgramKey:key,answerLanguage:'text',answerCodeLabel:'One valid Cambridge pseudocode solution'});
const question=(id,prompt,objectiveIds,answerPoints,commonError,extra={})=>({id,prompt,objectiveIds,answerPoints,marks:answerPoints.length,commonError,type:'Application',authored:true,...extra});
const q=(n,k,...args)=>question(`S11-L${String(n).padStart(2,'0')}-Q${k}`,...args);
const e=(n,k,...args)=>question(`S11-L${String(n).padStart(2,'0')}-EXAM-${k}`,...args);
const additions={
  1:{practice:[q(1,4,'Write complete pseudocode for the supplied flowchart. Inputs are INTEGER temperatures ending with sentinel 999. State the outputs for 29, 30, 31, 999 and for 999 alone.',ids(1,1),[
    'Declare Temperature and Count as INTEGER; set Count to zero.',
    'Read Temperature before WHILE Temperature <> 999 so the first sentinel permits zero data items.',
    'Inside the loop, increment Count only when Temperature > 30.',
    'Read the next Temperature after either branch, and output Count once after ENDWHILE.',
    'The two runs output 1 and 0 respectively; 30 does not meet the strict threshold.',
  ],'A new input is needed on both data paths, including a temperature of 30.',{diagram:section11Visuals.warning.asset,diagramAlt:section11Visuals.warning.alt,diagramLabel:'Temperature-counting flowchart',...answer('warningStream')})]},
  3:{practice:[q(3,4,'Explain why (Value >= 10) OR (Value <= 20) is unsuitable for accepting only integers from 10 to 20 inclusive. Give an input below and above the interval, then correct the condition.',ids(2,4),[
    'For Value 9, Value <= 20 is TRUE, so OR accepts it.',
    'For Value 21, Value >= 10 is TRUE, so OR also accepts it.',
    'Use (Value >= 10) AND (Value <= 20) so both limits must hold.',
  ],'Testing only an in-range value cannot expose this incorrect connector.')]},
  4:{practice:[
    q(4,4,'Write complete pseudocode that inputs a code of exactly eight characters: two letters, four digit characters, then two letters. MID(S, Start, Count) returns Count characters from one-based Start; RIGHT(S, Count) returns the final Count characters. Output the four digit characters, a hyphen and the final letters as one STRING. State the result for IT0007XY.',ids(3,1,3),[
      'Declare the input and result identifiers as STRING, then input Code.',
      'MID(Code, 3, 4) obtains the four digit characters and RIGHT(Code, 2) obtains the final letters.',
      'Join the two results with an explicit "-" using &, then output the resulting STRING.',
      'IT0007XY produces "0007-XY"; the leading zeros are retained.',
    ],'Do not turn the digit characters into an INTEGER and lose the stated formatting.',answer('stringCode')),
    q(4,5,'State LENGTH("A B!"), UCASE(\'7\') and "Ada" & " " & "Lovelace". LENGTH counts all characters; UCASE accepts one CHAR and returns non-lower-case characters unchanged. Explain why UCASE("ab") does not match this interface.',ids(3,1,3),[
      'LENGTH("A B!") is 4 and UCASE(\'7\') is \'7\'.',
      'The concatenation produces "Ada Lovelace", including the explicit space.',
      '"ab" is a STRING, whereas this UCASE interface requires a CHAR.',
    ],'A space is a character and a function’s accepted type is part of its contract.'),
  ],exams:[e(4,4,'Write an expression to create a label from Code = "LAB0042": the first three characters, a colon, then the final four characters. You are supplied PREFIX(S : STRING, N : INTEGER) returning the first N characters and SUFFIX(S : STRING, N : INTEGER) returning the final N characters. State the label and its data type.',ids(3,1,2,3),[
    'PREFIX(Code, 3) obtains "LAB" and SUFFIX(Code, 4) obtains "0042".',
    'PREFIX(Code, 3) & ":" & SUFFIX(Code, 4) joins the three parts.',
    'The result is the STRING "LAB:0042", retaining both leading zeros.',
  ],'The supplied function definitions determine the call; no numeric conversion is needed.')]},
  6:{practice:[q(6,4,'State the ordered Row/Column output pairs and the final Count from the supplied nested-loop program. Explain what happens to Column when Row changes to 2, and where a separate per-row counter would be initialised.',ids(4,3),[
    'The pairs are (1,1), (1,2), (1,3), (2,1), (2,2), (2,3), followed by Count 6.',
    'The inner FOR header is reached again, so Column starts at 1 for Row 2.',
    'A separate per-row counter is initialised inside the outer loop, before the inner loop.',
  ],'The whole-table Count and a per-row count measure different groups.',supplied('nestedCoordinates'))]},
  7:{practice:[q(7,4,'Explain the purpose of the outer IF in the supplied REPEAT version of the sentinel total. State the output for first input -1. Describe the change in behaviour if the guard is removed while the body still adds Value before reading the next input.',ids(4,4,5),[
    'The outer IF preserves the zero-data path by skipping REPEAT when the first Value is -1.',
    'With the guard, Total remains 0 and the program outputs 0 without a second input.',
    'Without it, the first sentinel would be added and another input requested before the UNTIL test, changing both processing and input consumption.',
  ],'A stopping-condition negation alone does not preserve the first-execution rule.',supplied('sentinelRepeat'))]},
  8:{practice:[q(8,4,'Compare the supplied REPEAT password program with the WHILE program in this lesson. Explain why no initial Password assignment is needed here, why UNTIL uses OR, and the result for x, y, open.',ids(5,1),[
    'INPUT Password executes before the first UNTIL test, so it supplies the initial value.',
    'Success or reaching three attempts is sufficient to stop; the stopping conditions therefore use OR.',
    'x, y, open gives TRUE and 3; the successful third input still counts as an attempt.',
  ],'Do not copy the WHILE continuation connector into the stopping condition.',supplied('loginRepeat'))]},
  9:{practice:[
    q(9,4,'State the caller values A and B after each assignment in Swap for inputs 6 and 2. Explain the role of Temp and give the caller result for equal inputs 5 and 5.',ids(6,3,5),[
      'After Temp <- Left, A/B remain 6/2; after Left <- Right they are 2/2; after Right <- Temp they are 2/6.',
      'Temp preserves the original left value before its caller variable is overwritten.',
      'Equal inputs 5 and 5 remain 5 and 5; the same complete swap rule still works.',
    ],'Without saving the old left value, the two assignments would copy one value over both variables.',supplied('swapReference')),
    q(9,5,'State all outputs of the supplied SwapCopy program. Identify its two formal parameters and explain why main still has the original values after the call.',ids(6,3,4,5),[
      'The procedure outputs 2 and 6; main then outputs 6 and 2.',
      'Left and Right are the formal parameters; caller A and B supply their argument values.',
      'BYVAL gives separate copies, so the assignments change the local parameters rather than caller A and B.',
    ],'An apparently correct output inside a procedure does not prove that caller storage changed.',supplied('swapCopy')),
  ]},
  10:{practice:[
    q(10,4,'State the output of the supplied DeliveryFee program for Quantity 0, 1 and 4. Explain why the later RETURN does not override the zero result.',ids(7,1,2,3),[
      'The respective outputs are 0.0, 2.5 and 4.0.',
      'RETURN 0.0 immediately completes the zero-quantity call, so the later formula is not executed on that path.',
      'The returned value replaces DeliveryFee(Quantity) and is assigned to caller variable Fee.',
    ],'Source order does not mean execution continues after RETURN.',supplied('earlyReturn')),
    q(10,5,'Describe the interface of ReadRating() in the supplied program. State the caller output for inputs 0, 6, 5, and explain why its local Rating need not be an argument.',[...ids(7,1,2,3),...ids(8,1,2,3,4)],[
      'The function name is ReadRating, its parameter list is empty, and its return type is INTEGER.',
      'It returns the first accepted rating from 1 to 5; the given inputs cause main to output 5.',
      'The function obtains Rating through its own input statements and declares it locally, so the caller supplies no argument.',
    ],'A function with no parameters can still execute statements and return a useful result.',supplied('noParameterFunction')),
  ],exams:[e(10,4,'Write a function Smaller(First : INTEGER, Second : INTEGER) that returns the smaller argument. Write an assignment storing Smaller(8, 3) + 2 in INTEGER variable Result. State the returned value when the arguments are equal, and explain why every path needs a RETURN.',[...ids(7,1,2,3),...ids(8,1,4)],[
    'The header declares the two ordered INTEGER parameters and RETURNS INTEGER.',
    'IF First < Second THEN RETURN First ELSE RETURN Second ENDIF returns the smaller value, followed by ENDFUNCTION.',
    'Result <- Smaller(8, 3) + 2 stores 5.',
    'Equal arguments return that same value through ELSE; every reachable path must supply the result needed by the calling expression.',
  ],'Returning only on First < Second leaves the false path without a value.',{answerCode:'FUNCTION Smaller(First : INTEGER, Second : INTEGER) RETURNS INTEGER\n    IF First < Second THEN\n        RETURN First\n    ELSE\n        RETURN Second\n    ENDIF\nENDFUNCTION\nDECLARE Result : INTEGER\nResult <- Smaller(8, 3) + 2',answerLanguage:'text'})]},
  11:{practice:[
    q(11,4,'Describe a change to the supplied area-reporting program that avoids repeated multiplication for positive Count. State the outputs and multiplication counts before and after the change for Width 3, Height 4, Count 3. Explain why the same saving claim would not apply for Count 0.',ids(9,1),[
      'Move Area <- Width * Height after all inputs and before FOR because both operands remain unchanged.',
      'Both versions output 12 three times; multiplication changes from three executions to one.',
      'At Count 0, the original performs no multiplication but the revised version performs one unused multiplication, so it saves no work on that path.',
    ],'State which operation is removed and under which input conditions.',{...supplied('invariantBefore'),...answer('invariantAfter')}),
    q(11,5,'Write a revision of the supplied two-traversal marks program that performs one processing read per stored element while preserving Total and Passed. State both results for 49, 50, 80, 21, 50 and compare processing reads, excluding input.',ids(9,1),[
      'Keep the input loop and initialise Total and Passed to zero before processing.',
      'In one loop assign Mark <- Marks[Index], add Mark to Total, and increment Passed only for Mark >= 50.',
      'Output both after the loop: Total 250 and Passed 3.',
      'The original processing reads ten elements; the revised processing reads five, reusing Mark for the two operations.',
    ],'Resetting an accumulator inside processing would discard earlier elements.',{...supplied('twoTraversals'),...answer('oneTraversal')}),
  ],exams:[e(11,4,'Explain why a program that counts marks above the final mean may need a second pass, although calculating a total and counting marks at least 50 can share one pass. State what must be known before an above-mean comparison is made.',ids(9,1),[
    'The final mean depends on the completed total and number of marks.',
    'A comparison with a changing partial mean is not a comparison with the final mean.',
    'The fixed threshold 50 is already known during traversal, so pass counting and total accumulation can be updated independently for each mark.',
  ],'A second traversal is not redundant when it depends on a result completed by the first.')]},
  12:{exams:[e(12,4,'Write a complete program that accepts exactly two valid INTEGER sensor readings from -20 to 50 inclusive, retrying invalid attempts. Define ValidReading(Reading : INTEGER) returning BOOLEAN, and RecordReading with Reading BYVAL and Total and BelowZero BYREF. RecordReading adds each accepted reading and counts readings strictly below zero. Use both subprograms in main, then output Total and BelowZero. State the results for -21, -20, 51, 30.',[...ids(1,1),...ids(4,1,3,5),...ids(6,1,3,4,5),...ids(7,1,2,3)],[
    'ValidReading has an INTEGER parameter and RETURNS BOOLEAN.',
    'It returns (Reading >= -20) AND (Reading <= 50) and closes with ENDFUNCTION.',
    'RecordReading has Reading BYVAL and both INTEGER accumulators BYREF.',
    'Its body adds Reading to Total and increments BelowZero only for Reading < 0, then closes the procedure.',
    'Main declares its INTEGER identifiers and initialises Total and BelowZero to zero.',
    'An outer FOR runs for exactly two accepted slots.',
    'Within each slot, REPEAT inputs Reading UNTIL ValidReading(Reading); only then CALL RecordReading(Reading, Total, BelowZero).',
    'Main outputs both accumulators after the outer loop.',
    'Accepted values -20 and 30 give Total 10 and BelowZero 1; the two rejected attempts affect neither statistic.',
  ],'Exactly two accepted readings can require more than two input attempts.',answer('sensorSummary'))]},
};

const completeAnswers = {
  'S11-L01-Q1':answer('area'), 'S11-L01-EXAM-2':answer('temperature'),
  'S11-L02-Q3':answer('simplePurchase'), 'S11-L06-EXAM-1':answer('fourPrices'),
  'S11-L12-EXAM-1':answer('twoRatings'),
};
// These answers intentionally complete only the declarations, statements or
// subprogram definitions requested by their questions, not unstated programs.
const statementAnswers = {
  'S11-L02-Q1':'DECLARE Stock : INTEGER\nDECLARE Price : REAL\nDECLARE InStock : BOOLEAN\nDECLARE Grade : CHAR\nCONSTANT DiscountRate = 0.10',
  'S11-L02-EXAM-1':'DECLARE RouteName : STRING\nDECLARE PassengerCount : INTEGER\nDECLARE IsFull : BOOLEAN\nPassengerCount <- 0\nIsFull <- FALSE',
  'S11-L02-EXAM-2':'CONSTANT Fee = 2.50\nDECLARE Visits : INTEGER\nINPUT Visits\nOUTPUT Visits * Fee',
  'S11-L02-EXAM-3':'DECLARE Total, Price : REAL\nTotal <- 0.0\nINPUT Price\nTotal <- Total + Price',
  'S11-L05-Q1':'IF Mark >= 50 THEN\n    OUTPUT "Pass"\nELSE\n    OUTPUT "Fail"\nENDIF',
  'S11-L05-Q3':'CASE OF Option\n    1 : OUTPUT "Add"\n    2 : OUTPUT "Remove"\n    OTHERWISE : OUTPUT "Unknown"\nENDCASE',
  'S11-L05-EXAM-1':'IF Age < 16 THEN\n    OUTPUT "Too young"\nELSE\n    IF Consent THEN\n        OUTPUT "Admitted"\n    ELSE\n        OUTPUT "Consent needed"\n    ENDIF\nENDIF',
  'S11-L06-Q2':'FOR Index <- 10 TO 2 STEP -2\n    OUTPUT Index\nNEXT Index',
  'S11-L07-Q1':'REPEAT\n    INPUT Rating\nUNTIL (Rating >= 1) AND (Rating <= 5)',
  'S11-L07-EXAM-1':'REPEAT\n    INPUT PIN\nUNTIL PIN = 2468',
  'S11-L07-EXAM-2':'WHILE Stock > 0\n    OUTPUT Stock\n    Stock <- Stock - 1\nENDWHILE',
  'S11-L07-EXAM-3':'DECLARE Value : INTEGER\nINPUT Value\nWHILE Value <> 0\n    OUTPUT Value\n    INPUT Value\nENDWHILE',
  'S11-L09-Q1':'PROCEDURE Banner()\n    OUTPUT "Welcome"\nENDPROCEDURE\nCALL Banner()',
  'S11-L09-Q3':'PROCEDURE Increase(BYREF Total : INTEGER, BYVAL Amount : INTEGER)\n    Total <- Total + Amount\nENDPROCEDURE\n// Score is the caller variable supplied by the question.\nCALL Increase(Score, 4)',
  'S11-L09-EXAM-2':'PROCEDURE Clear(BYREF Count : INTEGER)\n    Count <- 0\nENDPROCEDURE\nDECLARE Items : INTEGER\nItems <- 12\nCALL Clear(Items)',
  'S11-L10-Q1':'FUNCTION Double(Value : INTEGER) RETURNS INTEGER\n    RETURN Value * 2\nENDFUNCTION\nDECLARE Result : INTEGER\nResult <- Double(6)',
  'S11-L10-EXAM-1':'FUNCTION Square(Number : INTEGER) RETURNS INTEGER\n    RETURN Number * Number\nENDFUNCTION\nOUTPUT Square(4) + 1',
  'S11-L10-EXAM-2':'FUNCTION Discount(Price : REAL, Member : BOOLEAN) RETURNS REAL\n    IF Member THEN\n        RETURN Price * 0.10\n    ELSE\n        RETURN 0.0\n    ENDIF\nENDFUNCTION',
  'S11-L12-EXAM-2':'FUNCTION Accepted(Length : INTEGER) RETURNS BOOLEAN\n    RETURN (Length >= 10) AND (Length <= 20)\nENDFUNCTION\nPROCEDURE CountLength(BYVAL Length : INTEGER, BYREF Count : INTEGER)\n    IF Accepted(Length) THEN\n        Count <- Count + 1\n    ENDIF\nENDPROCEDURE',
};
export function enhanceSection11Questions(lesson) {
  if (lesson.section !== 11) return lesson;
  const extra=additions[lesson.originalLesson-68] ?? {};
  const complete=q=>({...q,...(completeAnswers[q.id] ?? {}),...(statementAnswers[q.id] ? {answerCode:statementAnswers[q.id],answerLanguage:'text',answerCodeLabel:'One valid solution to the requested statements'} : {})});
  return {...lesson, practice:[...lesson.practice.map(complete),...(extra.practice ?? [])], authoredExamQuestions:[...lesson.authoredExamQuestions.map(complete),...(extra.exams ?? [])]};
}
