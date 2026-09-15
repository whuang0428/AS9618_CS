// Executed teaching examples. Test cases specify observable results, including boundaries.
const p = (code, cases) => ({ code: code.trim(), cases });
export const section11Programs = {
  area: p(`
DECLARE Length, Width, Area : REAL
INPUT Length
INPUT Width
Area <- Length * Width
OUTPUT Area`, [{input:[3.5,2],output:[7]},{input:[0,4],output:[0]}]),
  temperature: p(`
DECLARE Temperature : REAL
INPUT Temperature
IF Temperature < 0 THEN
    OUTPUT "Ice"
ELSE
    OUTPUT "Water"
ENDIF`, [{input:[-0.5],output:["Ice"]},{input:[0],output:["Water"]},{input:[2.5],output:["Water"]}]),
  simplePurchase: p(`
DECLARE Quantity : INTEGER
DECLARE Price, Total : REAL
INPUT Quantity
INPUT Price
Total <- Price * Quantity
OUTPUT Total`, [{input:[3,4.5],output:[13.5]},{input:[0,4.5],output:[0]}]),
  fourPrices: p(`
DECLARE Index : INTEGER
DECLARE Price, Total : REAL
Total <- 0.0
FOR Index <- 1 TO 4
    INPUT Price
    Total <- Total + Price
NEXT Index
OUTPUT Total`, [{input:[1,2.5,3,4.5],output:[11]},{input:[0,0,0,0],output:[0]}]),
  twoRatings: p(`
DECLARE Index, Rating, Total : INTEGER
Total <- 0
FOR Index <- 1 TO 2
    REPEAT
        INPUT Rating
    UNTIL (Rating >= 1) AND (Rating <= 5)
    Total <- Total + Rating
NEXT Index
OUTPUT Total`, [{input:[0,1,6,5],output:[6]},{input:[3,4],output:[7]}]),
  warningStream: p(`
DECLARE Temperature, Count : INTEGER
Count <- 0
INPUT Temperature
WHILE Temperature <> 999
    IF Temperature > 30 THEN
        Count <- Count + 1
    ENDIF
    INPUT Temperature
ENDWHILE
OUTPUT Count`, [{input:[29,30,31,999],output:[1]},{input:[999],output:[0]},{input:[45,-2,31,999],output:[2]}]),
  headingOnly: p(`
PROCEDURE Heading()
    OUTPUT "Results"
ENDPROCEDURE
CALL Heading()
OUTPUT "Next action"`, [{input:[],output:["Results","Next action"]}]),
  countPositive: p(`
DECLARE Count, Index, Value : INTEGER
Count <- 0
FOR Index <- 1 TO 3
    INPUT Value
    IF Value > 0 THEN
        Count <- Count + 1
    ENDIF
NEXT Index
OUTPUT Count`, [{input:[-2,0,5],output:[1]},{input:[1,2,3],output:[3]},{input:[0,-1,-2],output:[0]}]),
  countPositiveWhile: p(`
DECLARE Count, Index, Value : INTEGER
Count <- 0
Index <- 1
WHILE Index <= 3
    INPUT Value
    IF Value > 0 THEN
        Count <- Count + 1
    ENDIF
    Index <- Index + 1
ENDWHILE
OUTPUT Count`, [{input:[-2,0,5],output:[1],state:{Count:1,Index:4}},{input:[1,2,3],output:[3]},{input:[0,-1,-2],output:[0]}]),
  assignmentCopies: p(`
DECLARE A, B : INTEGER
A <- 4
B <- A
A <- A + 3
OUTPUT "A = ", A, "; B = ", B`, [{input:[],output:["A = ",7,"; B = ",4],state:{A:7,B:4}}]),
  countdown: p(`
DECLARE Count : INTEGER
INPUT Count
WHILE Count > 0
    OUTPUT Count
    Count <- Count - 1
ENDWHILE
OUTPUT "Finished"`, [{input:[3],output:[3,2,1,"Finished"]},{input:[0],output:["Finished"]}]),
  purchase: p(`
CONSTANT TaxRate = 0.20
DECLARE Quantity : INTEGER
DECLARE Price, Tax, Total : REAL
INPUT Price
INPUT Quantity
Tax <- Price * TaxRate
Total <- (Price + Tax) * Quantity
OUTPUT Total`, [{input:[10,3],output:[36]},{input:[0,2],output:[0]}]),
  operators: p(`
DECLARE Minutes, Hours, Remainder : INTEGER
DECLARE Allowed : BOOLEAN
INPUT Minutes
Hours <- Minutes DIV 60
Remainder <- Minutes MOD 60
Allowed <- (Minutes >= 0) AND (Minutes <= 180)
OUTPUT Hours, Remainder, Allowed
OUTPUT 2 + 3 * 4, (2 + 3) * 4, 7 / 2`, [{input:[125],output:[2,5,true,14,20,3.5]},{input:[180],output:[3,0,true,14,20,3.5]},{input:[181],output:[3,1,false,14,20,3.5]}]),
  library: p(`
DECLARE Word : STRING
DECLARE Letter : CHAR
DECLARE Score : REAL
INPUT Word
INPUT Letter
INPUT Score
OUTPUT LENGTH(Word), MID(Word, 2, 3), RIGHT(Word, 2)
OUTPUT UCASE(Letter), LCASE(Letter), INT(Score)
OUTPUT INT(RAND(6)) + 1`, [{input:["ALGORITHM","b",4.8],random:[0],output:[9,"LGO","HM","B","b",4,1]},{input:["CAMBRIDGE","Q",9.1],random:[0.999999],output:[9,"AMB","GE","Q","q",9,6]}]),
  numericFunctions: p(`
DECLARE Score : REAL
DECLARE Die : INTEGER
INPUT Score
Die <- INT(RAND(6)) + 1
OUTPUT INT(Score), Die`, [{input:[4.8],random:[0],output:[4,1]},{input:[9.1],random:[0.999999],output:[9,6]}]),
  stringInterfaces: p(`
DECLARE Word : STRING
DECLARE Letter : CHAR
INPUT Word
INPUT Letter
OUTPUT LENGTH(Word), MID(Word, 2, 3), RIGHT(Word, 2)
OUTPUT UCASE(Letter), LCASE(Letter)`, [{input:["ALGORITHM","b"],output:[9,"LGO","HM","B","b"]},{input:["A B!","7"],output:[4," B!","B!","7","7"]}]),
  stringCode: p(`
DECLARE Code, Digits, Suffix, Label : STRING
INPUT Code
Digits <- MID(Code, 3, 4)
Suffix <- RIGHT(Code, 2)
Label <- Digits & "-" & Suffix
OUTPUT Label`, [{input:["CS2046AB"],output:["2046-AB"]},{input:["IT0007XY"],output:["0007-XY"]}]),
  independentIf: p(`
DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ENDIF
IF Mark >= 80 THEN
    OUTPUT "Distinction"
ENDIF`, [{input:[85],output:["Pass","Distinction"]},{input:[50],output:["Pass"]},{input:[49],output:[]}]),
  exclusiveIf: p(`
DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 80 THEN
    OUTPUT "Distinction"
ELSE
    IF Mark >= 50 THEN
        OUTPUT "Pass"
    ELSE
        OUTPUT "Fail"
    ENDIF
ENDIF`, [{input:[85],output:["Distinction"]},{input:[80],output:["Distinction"]},{input:[79],output:["Pass"]},{input:[50],output:["Pass"]},{input:[49],output:["Fail"]}]),
  selection: p(`
DECLARE Age : INTEGER
DECLARE Member : BOOLEAN
INPUT Age
INPUT Member
IF Age >= 18 THEN
    IF Member THEN
        OUTPUT "Adult member"
    ELSE
        OUTPUT "Adult visitor"
    ENDIF
ELSE
    OUTPUT "Junior"
ENDIF`, [{input:[17,true],output:["Junior"]},{input:[18,true],output:["Adult member"]},{input:[19,false],output:["Adult visitor"]}]),
  menu: p(`
DECLARE Choice : INTEGER
INPUT Choice
CASE OF Choice
    1 : OUTPUT "Open"
    2 : OUTPUT "Save"
    OTHERWISE : OUTPUT "Invalid"
ENDCASE`, [{input:[1],output:["Open"]},{input:[2],output:["Save"]},{input:[0],output:["Invalid"]}]),
  days: p(`
DECLARE Day : INTEGER
INPUT Day
CASE OF Day
    1 TO 5 : OUTPUT "Weekday"
    6 TO 7 : OUTPUT "Weekend"
    OTHERWISE : OUTPUT "Invalid day"
ENDCASE`, [{input:[1],output:["Weekday"]},{input:[5],output:["Weekday"]},{input:[6],output:["Weekend"]},{input:[7],output:["Weekend"]},{input:[0],output:["Invalid day"]},{input:[8],output:["Invalid day"]}]),
  total: p(`
DECLARE Count, Index, Value, Total : INTEGER
INPUT Count
Total <- 0
FOR Index <- 1 TO Count
    INPUT Value
    Total <- Total + Value
NEXT Index
OUTPUT Total`, [{input:[3,2,4,6],output:[12]},{input:[0],output:[0]},{input:[1,7],output:[7]}]),
  step: p(`
DECLARE Index : INTEGER
FOR Index <- 6 TO 0 STEP -2
    OUTPUT Index
NEXT Index`, [{input:[],output:[6,4,2,0]}]),
  nestedCoordinates: p(`
DECLARE Row, Column, Count : INTEGER
Count <- 0
FOR Row <- 1 TO 2
    FOR Column <- 1 TO 3
        OUTPUT Row, Column
        Count <- Count + 1
    NEXT Column
NEXT Row
OUTPUT Count`, [{input:[],output:[1,1,1,2,1,3,2,1,2,2,2,3,6],state:{Count:6}}]),
  validation: p(`
DECLARE Mark : INTEGER
REPEAT
    INPUT Mark
UNTIL (Mark >= 0) AND (Mark <= 100)
OUTPUT Mark`, [{input:[-1,101,100],output:[100]},{input:[0],output:[0]}]),
  sentinel: p(`
DECLARE Value, Total : INTEGER
Total <- 0
INPUT Value
WHILE Value <> -1
    Total <- Total + Value
    INPUT Value
ENDWHILE
OUTPUT Total`, [{input:[3,4,-1],output:[7]},{input:[-1],output:[0]},{input:[0,-1],output:[0]}]),
  sentinelRepeat: p(`
DECLARE Value, Total : INTEGER
Total <- 0
INPUT Value
IF Value <> -1 THEN
    REPEAT
        Total <- Total + Value
        INPUT Value
    UNTIL Value = -1
ENDIF
OUTPUT Total`, [{input:[3,4,-1],output:[7]},{input:[-1],output:[0]},{input:[0,-1],output:[0]}]),
  login: p(`
DECLARE Password : STRING
DECLARE Attempts : INTEGER
Password <- ""
Attempts <- 0
WHILE (Password <> "open") AND (Attempts < 3)
    INPUT Password
    Attempts <- Attempts + 1
ENDWHILE
OUTPUT Password = "open", Attempts`, [{input:["open"],output:[true,1]},{input:["x","y","open"],output:[true,3]},{input:["x","y","z"],output:[false,3]}]),
  loginRepeat: p(`
DECLARE Password : STRING
DECLARE Attempts : INTEGER
Attempts <- 0
REPEAT
    INPUT Password
    Attempts <- Attempts + 1
UNTIL (Password = "open") OR (Attempts >= 3)
OUTPUT Password = "open", Attempts`, [{input:["open"],output:[true,1]},{input:["x","y","open"],output:[true,3]},{input:["x","y","z"],output:[false,3]}]),
  procedures: p(`
PROCEDURE Heading()
    OUTPUT "Results"
ENDPROCEDURE
PROCEDURE Show(BYVAL Value : INTEGER)
    OUTPUT Value
ENDPROCEDURE
PROCEDURE Add(BYREF Total : INTEGER, BYVAL Amount : INTEGER)
    Total <- Total + Amount
ENDPROCEDURE
DECLARE Score : INTEGER
Score <- 10
CALL Heading()
CALL Show(Score)
CALL Add(Score, 3)
CALL Show(Score)`, [{input:[],output:["Results",10,13],state:{Score:13}}]),
  passing: p(`
PROCEDURE ChangeCopy(BYVAL Value : INTEGER)
    Value <- Value + 2
    OUTPUT Value
ENDPROCEDURE
PROCEDURE ChangeOriginal(BYREF Value : INTEGER)
    Value <- Value + 2
ENDPROCEDURE
DECLARE Number : INTEGER
Number <- 5
CALL ChangeCopy(Number)
OUTPUT Number
CALL ChangeOriginal(Number)
OUTPUT Number`, [{input:[],output:[7,5,7],state:{Number:7}}]),
  swapReference: p(`
PROCEDURE Swap(BYREF Left : INTEGER, BYREF Right : INTEGER)
    DECLARE Temp : INTEGER
    Temp <- Left
    Left <- Right
    Right <- Temp
ENDPROCEDURE
DECLARE A, B : INTEGER
INPUT A
INPUT B
CALL Swap(A, B)
OUTPUT A, B`, [{input:[6,2],output:[2,6],state:{A:2,B:6}},{input:[5,5],output:[5,5]},{input:[-3,8],output:[8,-3]}]),
  swapCopy: p(`
PROCEDURE SwapCopy(BYVAL Left : INTEGER, BYVAL Right : INTEGER)
    DECLARE Temp : INTEGER
    Temp <- Left
    Left <- Right
    Right <- Temp
    OUTPUT Left, Right
ENDPROCEDURE
DECLARE A, B : INTEGER
A <- 6
B <- 2
CALL SwapCopy(A, B)
OUTPUT A, B`, [{input:[],output:[2,6,6,2],state:{A:6,B:2}}]),
  maximum: p(`
FUNCTION Larger(First : INTEGER, Second : INTEGER) RETURNS INTEGER
    IF First > Second THEN
        RETURN First
    ELSE
        RETURN Second
    ENDIF
ENDFUNCTION
DECLARE A, B, Result : INTEGER
INPUT A
INPUT B
Result <- Larger(A, B) + 1
OUTPUT Result`, [{input:[7,4],output:[8]},{input:[4,7],output:[8]},{input:[5,5],output:[6]},{input:[-3,-7],output:[-2]}]),
  earlyReturn: p(`
FUNCTION DeliveryFee(Quantity : INTEGER) RETURNS REAL
    IF Quantity = 0 THEN
        RETURN 0.0
    ENDIF
    RETURN 2.0 + Quantity * 0.5
ENDFUNCTION
DECLARE Quantity : INTEGER
DECLARE Fee : REAL
INPUT Quantity
Fee <- DeliveryFee(Quantity)
OUTPUT Fee`, [{input:[0],output:[0]},{input:[4],output:[4]},{input:[1],output:[2.5]}]),
  noParameterFunction: p(`
FUNCTION ReadRating() RETURNS INTEGER
    DECLARE Rating : INTEGER
    REPEAT
        INPUT Rating
    UNTIL (Rating >= 1) AND (Rating <= 5)
    RETURN Rating
ENDFUNCTION
DECLARE Result : INTEGER
Result <- ReadRating()
OUTPUT Result`, [{input:[0,6,5],output:[5]},{input:[1],output:[1]}]),
  tax: p(`
FUNCTION Tax(Price : REAL) RETURNS REAL
    RETURN Price * 0.20
ENDFUNCTION
DECLARE Price, Total : REAL
INPUT Price
Total <- Price + Tax(Price)
OUTPUT Total`, [{input:[50],output:[60]},{input:[0],output:[0]}]),
  validMark: p(`
FUNCTION ValidMark(Mark : INTEGER) RETURNS BOOLEAN
    RETURN (Mark >= 0) AND (Mark <= 100)
ENDFUNCTION
DECLARE Value : INTEGER
INPUT Value
OUTPUT ValidMark(Value)`, [{input:[-1],output:[false]},{input:[0],output:[true]},{input:[100],output:[true]},{input:[101],output:[false]}]),
  repeated: p(`
DECLARE Mark, Count : INTEGER
INPUT Mark
Count <- 0
IF Mark >= 50 THEN
    Count <- Count + 1
ENDIF
IF Mark >= 50 THEN
    OUTPUT "Pass"
ENDIF
OUTPUT Count`, [{input:[49],output:[0]},{input:[50],output:["Pass",1]}]),
  invariantBefore: p(`
DECLARE Width, Height, Area : REAL
DECLARE Count, Index : INTEGER
INPUT Width
INPUT Height
INPUT Count
FOR Index <- 1 TO Count
    Area <- Width * Height
    OUTPUT Area
NEXT Index`, [{input:[3,4,3],output:[12,12,12]},{input:[2.5,4,1],output:[10]}]),
  invariantAfter: p(`
DECLARE Width, Height, Area : REAL
DECLARE Count, Index : INTEGER
INPUT Width
INPUT Height
INPUT Count
Area <- Width * Height
FOR Index <- 1 TO Count
    OUTPUT Area
NEXT Index`, [{input:[3,4,3],output:[12,12,12]},{input:[2.5,4,1],output:[10]}]),
  twoTraversals: p(`
DECLARE Marks : ARRAY[1:5] OF INTEGER
DECLARE Index, Total, Passed : INTEGER
FOR Index <- 1 TO 5
    INPUT Marks[Index]
NEXT Index
Total <- 0
Passed <- 0
FOR Index <- 1 TO 5
    Total <- Total + Marks[Index]
NEXT Index
FOR Index <- 1 TO 5
    IF Marks[Index] >= 50 THEN
        Passed <- Passed + 1
    ENDIF
NEXT Index
OUTPUT Total, Passed`, [{input:[49,50,80,21,50],output:[250,3]},{input:[0,0,0,0,0],output:[0,0]},{input:[100,100,100,100,100],output:[500,5]}]),
  oneTraversal: p(`
DECLARE Marks : ARRAY[1:5] OF INTEGER
DECLARE Index, Total, Passed, Mark : INTEGER
FOR Index <- 1 TO 5
    INPUT Marks[Index]
NEXT Index
Total <- 0
Passed <- 0
FOR Index <- 1 TO 5
    Mark <- Marks[Index]
    Total <- Total + Mark
    IF Mark >= 50 THEN
        Passed <- Passed + 1
    ENDIF
NEXT Index
OUTPUT Total, Passed`, [{input:[49,50,80,21,50],output:[250,3]},{input:[0,0,0,0,0],output:[0,0]},{input:[100,100,100,100,100],output:[500,5]}]),
  factored: p(`
DECLARE Mark, Count : INTEGER
INPUT Mark
Count <- 0
IF Mark >= 50 THEN
    Count <- Count + 1
    OUTPUT "Pass"
ENDIF
OUTPUT Count`, [{input:[49],output:[0]},{input:[50],output:["Pass",1]}]),
  integrated: p(`
FUNCTION ValidMark(Mark : INTEGER) RETURNS BOOLEAN
    RETURN (Mark >= 0) AND (Mark <= 100)
ENDFUNCTION
PROCEDURE RecordMark(BYVAL Mark : INTEGER, BYREF Total : INTEGER, BYREF Passed : INTEGER)
    Total <- Total + Mark
    IF Mark >= 50 THEN
        Passed <- Passed + 1
    ENDIF
ENDPROCEDURE
DECLARE Index, Mark, Total, Passed : INTEGER
Total <- 0
Passed <- 0
FOR Index <- 1 TO 3
    REPEAT
        INPUT Mark
    UNTIL ValidMark(Mark)
    CALL RecordMark(Mark, Total, Passed)
NEXT Index
OUTPUT Total / 3, Passed`, [{input:[-1,0,50,101,100],output:[50,2],state:{Total:150,Passed:2}},{input:[49,49,49],output:[49,0]},{input:[100,100,100],output:[100,3]},{input:[20,-5,60,80],output:[160/3,2],state:{Total:160,Passed:2}}]),
  variableMean: p(`
DECLARE Count, Index, Mark, Total : INTEGER
INPUT Count
Total <- 0
FOR Index <- 1 TO Count
    REPEAT
        INPUT Mark
    UNTIL (Mark >= 0) AND (Mark <= 100)
    Total <- Total + Mark
NEXT Index
IF Count > 0 THEN
    OUTPUT Total / Count
ELSE
    OUTPUT "No marks"
ENDIF`, [{input:[0],output:["No marks"]},{input:[1,101,50],output:[50]},{input:[3,0,50,100],output:[50]}]),
  sensorSummary: p(`
FUNCTION ValidReading(Reading : INTEGER) RETURNS BOOLEAN
    RETURN (Reading >= -20) AND (Reading <= 50)
ENDFUNCTION
PROCEDURE RecordReading(BYVAL Reading : INTEGER, BYREF Total : INTEGER, BYREF BelowZero : INTEGER)
    Total <- Total + Reading
    IF Reading < 0 THEN
        BelowZero <- BelowZero + 1
    ENDIF
ENDPROCEDURE
DECLARE Index, Reading, Total, BelowZero : INTEGER
Total <- 0
BelowZero <- 0
FOR Index <- 1 TO 2
    REPEAT
        INPUT Reading
    UNTIL ValidReading(Reading)
    CALL RecordReading(Reading, Total, BelowZero)
NEXT Index
OUTPUT Total, BelowZero`, [{input:[-21,-20,51,30],output:[10,1]},{input:[-20,50],output:[30,1]},{input:[0,10],output:[10,0]}]),
  review: p(`
FUNCTION Charge(Hours : INTEGER) RETURNS INTEGER
    RETURN Hours * 3
ENDFUNCTION
PROCEDURE AddCharge(BYVAL Amount : INTEGER, BYREF Total : INTEGER)
    Total <- Total + Amount
ENDPROCEDURE
DECLARE Hours, Total : INTEGER
Total <- 0
INPUT Hours
WHILE Hours <> 0
    CALL AddCharge(Charge(Hours), Total)
    INPUT Hours
ENDWHILE
OUTPUT Total`, [{input:[2,1,0],output:[9]},{input:[0],output:[0]}]),
  checkInput: p(`
CONSTANT Price = 2.50
DECLARE Quantity, Packs, Loose : INTEGER
DECLARE Cost : REAL
INPUT Quantity
Packs <- Quantity DIV 6
Loose <- Quantity MOD 6
Cost <- Quantity * Price
OUTPUT Packs, Loose, Cost`, [{input:[14],output:[2,2,35]},{input:[0],output:[0,0,0]}]),
  mockExpression: p(`
CONSTANT UnitPrice = 1.50
DECLARE Quantity, Boxes, Loose : INTEGER
DECLARE Total : REAL
DECLARE Discount : BOOLEAN
INPUT Quantity
Boxes <- Quantity DIV 12
Loose <- Quantity MOD 12
Total <- Quantity * UnitPrice
Discount <- Quantity >= 24
IF Discount THEN
    Total <- Total * 0.90
ENDIF
OUTPUT Boxes, Loose, Total`, [{input:[25],output:[2,1,33.75]},{input:[23],output:[1,11,34.5]},{input:[24],output:[2,0,32.4]}]),
  mockLoop: p(`
FUNCTION Acceptable(Value : INTEGER) RETURNS BOOLEAN
    RETURN (Value >= 1) AND (Value <= 5)
ENDFUNCTION
PROCEDURE Accumulate(BYVAL Value : INTEGER, BYREF Total : INTEGER)
    Total <- Total + Value
ENDPROCEDURE
DECLARE Value, Total : INTEGER
Total <- 0
INPUT Value
WHILE Value <> 0
    IF Acceptable(Value) THEN
        CALL Accumulate(Value, Total)
    ENDIF
    INPUT Value
ENDWHILE
OUTPUT Total`, [{input:[2,8,5,0],output:[7]},{input:[0],output:[0]},{input:[1,5,0],output:[6]}]),
};
export const codeFor = key => {
  if (!section11Programs[key]) throw new Error(`Unknown S11 program ${key}`);
  return section11Programs[key].code;
};
