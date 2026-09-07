// Executed teaching examples. Test cases specify observable results, including boundaries.
const p = (code, cases) => ({ code: code.trim(), cases });
export const section11Programs = {
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
OUTPUT Total / 3, Passed`, [{input:[-1,0,50,101,100],output:[50,2],state:{Total:150,Passed:2}},{input:[49,49,49],output:[49,0]},{input:[100,100,100],output:[100,3]}]),
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
