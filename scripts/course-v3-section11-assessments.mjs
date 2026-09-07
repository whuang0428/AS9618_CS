import { codeFor } from "./course-v3-section11-programs.mjs";
const question=(id,marks,commandWord,prompt,requirements,answerPoints,extra={})=>({
  id,sourceType:"original",section:11,marks,commandWord,prompt,syllabusIds:requirements.map(n=>`S11.${String(n).padStart(2,"0")}`),answerPoints,
  guidance:"Award one mark for each listed independent point. Accept equivalent correct pseudocode and explanations that implement the stated rules.",semanticFingerprint:`assessment|S11|${id}|authored`,...extra,
});
const supplied=key=>({code:codeFor(key),programKey:key,codeLabel:"Supplied pseudocode",codeCaption:"Use this complete program for the question."});
const answer=key=>({answerCode:codeFor(key),answerProgramKey:key,answerLanguage:"text",answerCodeLabel:"One valid pseudocode solution"});
export const section11Assessments=[
  question("A-S11-1",5,"write","Write pseudocode for this design: input a non-negative integer Quantity of items costing 2.50 each; calculate complete packs of 6, loose items and the total cost; output all three. Declare the data and use a constant for the price. State the outputs for Quantity 14.",[1,2],[
    "Declare Quantity, Packs and Loose as INTEGER and Cost as REAL; use CONSTANT Price = 2.50.",
    "INPUT Quantity precedes all calculations using that value.",
    "Packs <- Quantity DIV 6 and Loose <- Quantity MOD 6 split the whole quantity.",
    "Cost <- Quantity * Price and OUTPUT Packs, Loose, Cost report the required results.",
    "Quantity 14 produces 2 complete packs, 2 loose items and cost 35.",
  ],answer("checkInput")),
  question("A-S11-2",5,"calculate","LENGTH(S) returns a string's length; MID(S, Start, Count) returns Count characters starting at one-based Start; UCASE(C) converts one CHAR to upper case. INT(X) takes the integer part and RAND(N) returns a real from 0 inclusive to N exclusive. For S = \"SCIENCE\" and C = 'm', calculate LENGTH(S), MID(S, 2, 3), UCASE(C) and INT(7.8). Write an expression generating an integer from 1 to 10 inclusive.",[3],[
    "LENGTH(S) is 7.","MID(S, 2, 3) is \"CIE\".","UCASE(C) is 'M'.","INT(7.8) is 7.","INT(RAND(10)) + 1 produces the specified integers.",
  ]),
  question("A-S11-3",5,"describe","A program inputs exactly three valid integer ratings. It initialises Count to zero. For each rating it tests Rating >= 4 to increment Count, then tests the same unchanged Rating >= 4 again to output \"High\". It outputs Count at the end. Describe an efficient control structure that retains all these outputs, justify the loop and state the final Count for ratings 3, 4, 5.",[4,5,9],[
    "A FOR loop is suitable because the three iterations are known in advance.",
    "Keep Count <- 0 before the loop, with one new INPUT Rating in each iteration.",
    "Use one IF Rating >= 4 block containing both the increment and OUTPUT \"High\".",
    "Combining the unchanged comparison removes one test per iteration while preserving both true-branch actions.",
    "OUTPUT Count remains after the loop and gives 2 for 3, 4, 5.",
  ]),
  question("A-S11-4",5,"explain","The supplied parking program receives positive integer hours until sentinel 0 and charges 3 per hour. Explain the interfaces and value flow: identify the parameter and argument in Charge(Hours), describe its return, explain both AddCharge parameter modes, and state the final output for 3, 2, 0.",[6,7,8],[
    "Hours in the function header is a formal parameter; Hours in the caller supplies the argument value, despite using the same spelling.",
    "Charge returns an INTEGER fee using RETURN Hours * 3, which supplies the Amount argument to AddCharge.",
    "Amount is BYVAL because the procedure only needs a copy of the fee.",
    "Total is BYREF so each addition changes the caller's running total.",
    "The final output is 15 for sessions of three and two hours.",
  ],supplied("review")),
  question("A-P2-3",9,"write","A shop packs a non-negative integer Quantity of items into boxes of 12. Each item costs 1.50. A purchase of at least 24 items receives 10% off the whole pre-discount total. Write complete pseudocode using a named price constant, appropriate declarations and a Boolean discount decision. Input Quantity and output complete boxes, loose items and the amount due. State all outputs for Quantity 25 and explain the boundary at 24.",[1,2,4],[
    "Declare Quantity, Boxes and Loose as INTEGER.",
    "Declare Total as REAL and Discount as BOOLEAN; use CONSTANT UnitPrice = 1.50.",
    "Obtain Quantity with INPUT before its first calculation.",
    "Boxes <- Quantity DIV 12 calculates complete boxes.",
    "Loose <- Quantity MOD 12 calculates remaining items.",
    "Total <- Quantity * UnitPrice calculates the pre-discount charge.",
    "Discount <- Quantity >= 24 includes exactly 24 in the discount condition.",
    "IF Discount THEN Total <- Total * 0.90 ENDIF applies the discount once, followed by output of the three results.",
    "Quantity 25 produces Boxes 2, Loose 1 and Total 33.75.",
  ],answer("mockExpression")),
  question("A-P2-7",10,"write","Write a complete program that inputs integers until sentinel 0, which may be the first input. Accept only values from 1 to 5 inclusive and output their sum, excluding all other values. Define Acceptable(Value : INTEGER) returning a BOOLEAN, and Accumulate(BYVAL Value : INTEGER, BYREF Total : INTEGER) to add an accepted value. Use both subprograms in the main program. Justify the loop and state the output for inputs 2, 8, 5, 0.",[1,4,5,6,7,8],[
    "The Acceptable function header specifies the INTEGER parameter and RETURNS BOOLEAN.",
    "RETURN (Value >= 1) AND (Value <= 5) implements the inclusive validity test, followed by ENDFUNCTION.",
    "The Accumulate procedure receives Value BYVAL and Total BYREF in the specified order.",
    "Its body assigns Total <- Total + Value and closes with ENDPROCEDURE.",
    "The main program declares its integer data and initialises Total to zero.",
    "INPUT Value occurs before WHILE Value <> 0, allowing a first sentinel to skip processing.",
    "IF Acceptable(Value) THEN guards CALL Accumulate(Value, Total), so 8 is excluded in the supplied case.",
    "A new INPUT Value occurs at the end of every loop body, followed by ENDWHILE.",
    "OUTPUT Total occurs after repetition and gives 7 for 2, 8, 5, 0.",
    "A pre-condition loop suits an unknown number of inputs and permits zero data values; the sentinel never enters the total.",
  ],answer("mockLoop")),
];
