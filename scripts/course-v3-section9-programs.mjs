// Complete Cambridge pseudocode shared by teaching, answers and executable checks.
// Tests are independently specified examples, including both sides of boundaries.
const program = (code, tests) => ({ code: code.trim(), tests });
export const section9Programs = {
  temperatureBand: program(`
DECLARE Temperature : INTEGER
INPUT Temperature
IF Temperature < 10 THEN
    OUTPUT "Low"
ELSE
    IF Temperature > 30 THEN
        OUTPUT "High"
    ELSE
        OUTPUT "Normal"
    ENDIF
ENDIF`, [{input:[9],output:["Low"]},{input:[10],output:["Normal"]},{input:[20],output:["Normal"]},{input:[30],output:["Normal"]},{input:[31],output:["High"]}]),
  pool: program(`
DECLARE PlacesLeft : INTEGER
DECLARE Paid : REAL
DECLARE Change : REAL
INPUT PlacesLeft
IF PlacesLeft > 0 THEN
    INPUT Paid
    IF Paid >= 6.00 THEN
        Change <- Paid - 6.00
        PlacesLeft <- PlacesLeft - 1
        OUTPUT Change, PlacesLeft
    ELSE
        OUTPUT "Not paid"
    ENDIF
ELSE
    OUTPUT "Full"
ENDIF`, [{input:[0],output:["Full"]},{input:[1,6],output:[0,0]},{input:[4,10],output:[4,3]},{input:[4,5],output:["Not paid"],variables:{PlacesLeft:4}}]),
  rectangle: program(`
DECLARE Length : REAL
DECLARE Width : REAL
DECLARE Area : REAL
INPUT Length
INPUT Width
Area <- Length * Width
OUTPUT Area`, [{ input: [4, 2.5], output: [10] }, { input: [0, 8], output: [0] }]),
  mean: program(`
DECLARE StudentName : STRING
DECLARE Mark1 : INTEGER
DECLARE Mark2 : INTEGER
DECLARE Mark3 : INTEGER
DECLARE MeanMark : REAL
INPUT StudentName
INPUT Mark1
INPUT Mark2
INPUT Mark3
MeanMark <- (Mark1 + Mark2 + Mark3) / 3
OUTPUT StudentName, MeanMark`, [{ input: ["Mina", 60, 70, 83], output: ["Mina", 71] }]),
  age: program(`
DECLARE Age : INTEGER
INPUT Age
IF Age >= 18 THEN
    OUTPUT "Adult"
ELSE
    OUTPUT "Minor"
ENDIF`, [{ input: [17], output: ["Minor"] }, { input: [18], output: ["Adult"] }, { input: [19], output: ["Adult"] }]),
  passDecision: program(`
DECLARE Mark : INTEGER
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit"
ENDIF`, [{ input: [49], output: ["Resit"] }, { input: [50], output: ["Pass"] }, { input: [80], output: ["Pass"] }]),
  passes: program(`
DECLARE Index : INTEGER
DECLARE Mark : INTEGER
DECLARE PassCount : INTEGER
PassCount <- 0
FOR Index <- 1 TO 10
    INPUT Mark
    IF Mark >= 50 THEN
        PassCount <- PassCount + 1
    ENDIF
NEXT Index
OUTPUT PassCount`, [{ input: [49, 50, 60, 20, 80, 0, 100, 48, 51, 70], output: [6] }, { input: [0, 1, 2, 3, 4, 5, 6, 7, 8, 49], output: [0] }]),
  postage: program(`
DECLARE ItemPrice : REAL
DECLARE Quantity : INTEGER
DECLARE Total : REAL
INPUT ItemPrice
INPUT Quantity
Total <- ItemPrice * Quantity + 3.50
OUTPUT Total`, [{ input: [4.25, 3], output: [16.25] }]),
  travelTime: program(`
DECLARE Distance : REAL
DECLARE Speed : REAL
DECLARE Hours : REAL
INPUT Distance
INPUT Speed
Hours <- Distance / Speed
OUTPUT Hours`, [{ input: [150, 60], output: [2.5] }, { input: [0, 40], output: [0] }]),
  change: program(`
DECLARE Cost : REAL
DECLARE Paid : REAL
DECLARE Change : REAL
INPUT Cost
INPUT Paid
Change <- Paid - Cost
OUTPUT Change`, [{ input: [12.5, 20], output: [7.5] }]),
  bulkPrice: program(`
DECLARE Quantity : INTEGER
DECLARE Total : REAL
INPUT Quantity
IF Quantity >= 5 THEN
    Total <- Quantity * 7.50
ELSE
    Total <- Quantity * 8.00
ENDIF
OUTPUT Total`, [{ input: [4], output: [32] }, { input: [5], output: [37.5] }, { input: [6], output: [45] }]),
  sumFour: program(`
DECLARE Index : INTEGER
DECLARE Value : INTEGER
DECLARE Total : INTEGER
Total <- 0
FOR Index <- 1 TO 4
    INPUT Value
    Total <- Total + Value
NEXT Index
OUTPUT Total`, [{ input: [3, 5, 2, 4], output: [14] }, { input: [-2, 2, 0, 7], output: [7] }]),
  countdown: program(`
DECLARE Count : INTEGER
INPUT Count
WHILE Count > 0 DO
    OUTPUT Count
    Count <- Count - 1
ENDWHILE
OUTPUT "Finished"`, [{ input: [3], output: [3, 2, 1, "Finished"] }, { input: [0], output: ["Finished"] }]),
  cold: program(`
DECLARE Temperature : INTEGER
INPUT Temperature
IF Temperature < 0 THEN
    OUTPUT "Frost"
ELSE
    OUTPUT "Clear"
ENDIF`, [{ input: [-1], output: ["Frost"] }, { input: [0], output: ["Clear"] }, { input: [5], output: ["Clear"] }]),
  refill: program(`
DECLARE Level : INTEGER
INPUT Level
IF Level < 20 THEN
    OUTPUT "Refill"
ELSE
    OUTPUT "No action"
ENDIF`, [{ input: [19], output: ["Refill"] }, { input: [20], output: ["No action"] }, { input: [21], output: ["No action"] }]),
  height: program(`
DECLARE Height : INTEGER
INPUT Height
IF Height >= 120 THEN
    OUTPUT "Enter"
ELSE
    OUTPUT "Wait"
ENDIF`, [{ input: [119], output: ["Wait"] }, { input: [120], output: ["Enter"] }, { input: [121], output: ["Enter"] }]),
  averageThree: program(`
DECLARE Index : INTEGER
DECLARE Score : INTEGER
DECLARE Total : INTEGER
DECLARE Average : REAL
Total <- 0
FOR Index <- 1 TO 3
    INPUT Score
    Total <- Total + Score
NEXT Index
Average <- Total / 3
OUTPUT Average`, [{ input: [6, 8, 10], output: [8] }, { input: [0, 0, 0], output: [0] }]),
  eligible: program(`
DECLARE Age : INTEGER
DECLARE Suspended : BOOLEAN
DECLARE Eligible : BOOLEAN
INPUT Age
INPUT Suspended
Eligible <- (Age >= 18) AND NOT Suspended
OUTPUT Eligible`, [{ input: [17, false], output: [false] }, { input: [18, false], output: [true] }, { input: [19, true], output: [false] }]),
  range: program(`
DECLARE Temperature : INTEGER
DECLARE Valid : BOOLEAN
INPUT Temperature
Valid <- (Temperature >= -20) AND (Temperature <= 50)
OUTPUT Valid`, [-21, -20, 50, 51].map((n, i) => ({ input: [n], output: [[false, true, true, false][i]] }))),
  discount: program(`
DECLARE Age : INTEGER
DECLARE Member : BOOLEAN
DECLARE Discount : BOOLEAN
INPUT Age
INPUT Member
Discount <- (Age < 12) OR Member
OUTPUT Discount`, [{ input: [11, false], output: [true] }, { input: [12, false], output: [false] }, { input: [30, true], output: [true] }]),
  ticket: program(`
CONSTANT TicketPrice = 25.00
DECLARE Quantity : INTEGER
DECLARE PlacesLeft : INTEGER
DECLARE Student : BOOLEAN
DECLARE Subtotal : REAL
DECLARE Total : REAL
DECLARE Paid : REAL
DECLARE Change : REAL
INPUT Quantity
INPUT PlacesLeft
IF (Quantity >= 1) AND (Quantity <= PlacesLeft) THEN
    INPUT Student
    Subtotal <- Quantity * TicketPrice
    IF Student THEN
        Total <- Subtotal * 0.90
    ELSE
        Total <- Subtotal
    ENDIF
    OUTPUT Total
    INPUT Paid
    IF Paid >= Total THEN
        Change <- Paid - Total
        PlacesLeft <- PlacesLeft - Quantity
        OUTPUT "Confirmed", Change, PlacesLeft
    ELSE
        OUTPUT "Insufficient payment"
    ENDIF
ELSE
    OUTPUT "Unavailable"
ENDIF`, [
    { input: [2, 8, true, 50], output: [45, "Confirmed", 5, 6], variables: { Subtotal: 50, Total: 45 } },
    { input: [1, 1, false, 25], output: [25, "Confirmed", 0, 0] },
    { input: [0, 8], output: ["Unavailable"] },
    { input: [9, 8], output: ["Unavailable"] },
    { input: [2, 8, false, 49], output: [50, "Insufficient payment"], variables: { PlacesLeft: 8 } },
  ]),
  taxi: program(`
DECLARE Distance : REAL
DECLARE Fare : REAL
INPUT Distance
IF Distance <= 3 THEN
    Fare <- 5.00
ELSE
    Fare <- 5.00 + (Distance - 3) * 2.00
ENDIF
OUTPUT Fare`, [{ input: [2], output: [5] }, { input: [3], output: [5] }, { input: [4], output: [7] }]),
  warnings: program(`
DECLARE Index : INTEGER
DECLARE Reading : INTEGER
DECLARE WarningCount : INTEGER
WarningCount <- 0
FOR Index <- 1 TO 6
    INPUT Reading
    IF Reading > 80 THEN
        WarningCount <- WarningCount + 1
    ENDIF
NEXT Index
OUTPUT WarningCount`, [{ input: [80, 81, 90, 40, 100, 79], output: [3] }]),
  review: program(`
DECLARE Index : INTEGER
DECLARE Weight : REAL
DECLARE Accepted : INTEGER
Accepted <- 0
FOR Index <- 1 TO 4
    INPUT Weight
    IF (Weight >= 2.0) AND (Weight <= 5.0) THEN
        Accepted <- Accepted + 1
    ENDIF
NEXT Index
OUTPUT Accepted`, [{ input: [1.9, 2, 5, 5.1], output: [2] }]),
  sectionCheck: program(`
DECLARE Index : INTEGER
DECLARE Pages : INTEGER
DECLARE TotalPages : INTEGER
TotalPages <- 0
FOR Index <- 1 TO 3
    INPUT Pages
    TotalPages <- TotalPages + Pages
NEXT Index
OUTPUT TotalPages`, [{ input: [12, 5, 8], output: [25] }]),
  mock: program(`
DECLARE Index : INTEGER
DECLARE Temperature : INTEGER
DECLARE AcceptedCount : INTEGER
DECLARE Total : INTEGER
DECLARE Average : REAL
AcceptedCount <- 0
Total <- 0
FOR Index <- 1 TO 5
    INPUT Temperature
    IF (Temperature >= 10) AND (Temperature <= 30) THEN
        AcceptedCount <- AcceptedCount + 1
        Total <- Total + Temperature
    ENDIF
NEXT Index
IF AcceptedCount > 0 THEN
    Average <- Total / AcceptedCount
    OUTPUT Average
ELSE
    OUTPUT "No valid readings"
ENDIF`, [{ input: [9, 10, 20, 30, 31], output: [20] }, { input: [0, 1, 2, 3, 4], output: ["No valid readings"] }]),
};

export const codeFor = (key) => {
  if (!section9Programs[key]) throw new Error(`Unknown S9 program: ${key}`);
  return section9Programs[key].code;
};
