// Complete Cambridge pseudocode examples. Verification executes these strings.
export const section10Programs = {
  recordInstances: `TYPE MemberRecord
    DECLARE Name : STRING
    DECLARE YearGroup : INTEGER
    DECLARE FeesPaid : BOOLEAN
ENDTYPE
DECLARE First : MemberRecord
DECLARE Second : MemberRecord
First.Name <- "Mina"
First.YearGroup <- 11
First.FeesPaid <- FALSE
Second <- First
Second.Name <- "Jo"
Second.YearGroup <- 12
Second.FeesPaid <- TRUE
OUTPUT First.Name
OUTPUT First.YearGroup
OUTPUT First.FeesPaid
OUTPUT Second.Name
OUTPUT Second.YearGroup
OUTPUT Second.FeesPaid`,
  arrayInitialise: `DECLARE Names : ARRAY[3:5] OF STRING
DECLARE Index : INTEGER
FOR Index <- 3 TO 5
    Names[Index] <- ""
NEXT Index
Names[4] <- "Mina"
FOR Index <- 3 TO 5
    OUTPUT Names[Index]
NEXT Index`,
  countThreshold: `DECLARE Marks : ARRAY[1:4] OF INTEGER
DECLARE Index : INTEGER
DECLARE Threshold : INTEGER
DECLARE Count : INTEGER
FOR Index <- 1 TO 4
    INPUT Marks[Index]
NEXT Index
INPUT Threshold
Count <- 0
FOR Index <- 1 TO 4
    IF Marks[Index] >= Threshold THEN
        Count <- Count + 1
    ENDIF
NEXT Index
OUTPUT Count`,
  arrayExtremes: `DECLARE Reading : ARRAY[1:4] OF REAL
DECLARE Index : INTEGER
DECLARE Largest : REAL
DECLARE Smallest : REAL
FOR Index <- 1 TO 4
    INPUT Reading[Index]
NEXT Index
Largest <- Reading[1]
Smallest <- Reading[1]
FOR Index <- 2 TO 4
    IF Reading[Index] > Largest THEN
        Largest <- Reading[Index]
    ENDIF
    IF Reading[Index] < Smallest THEN
        Smallest <- Reading[Index]
    ENDIF
NEXT Index
OUTPUT Largest
OUTPUT Smallest`,
  matrixTotals: `DECLARE Scores : ARRAY[1:2, 1:3] OF INTEGER
DECLARE Row : INTEGER
DECLARE Column : INTEGER
DECLARE RowTotal : INTEGER
DECLARE ColumnTotal : INTEGER
DECLARE GrandTotal : INTEGER
GrandTotal <- 0
FOR Row <- 1 TO 2
    RowTotal <- 0
    FOR Column <- 1 TO 3
        INPUT Scores[Row, Column]
        RowTotal <- RowTotal + Scores[Row, Column]
        GrandTotal <- GrandTotal + Scores[Row, Column]
    NEXT Column
    OUTPUT RowTotal
NEXT Row
FOR Column <- 1 TO 3
    ColumnTotal <- 0
    FOR Row <- 1 TO 2
        ColumnTotal <- ColumnTotal + Scores[Row, Column]
    NEXT Row
    OUTPUT ColumnTotal
NEXT Column
OUTPUT GrandTotal`,
  fileRoundTrip: `DECLARE Line : STRING
DECLARE Count : INTEGER
OPENFILE "Names.txt" FOR WRITE
WRITEFILE "Names.txt", "Ada"
WRITEFILE "Names.txt", ""
WRITEFILE "Names.txt", "Bo"
CLOSEFILE "Names.txt"
OPENFILE "Names.txt" FOR APPEND
WRITEFILE "Names.txt", "Cy"
CLOSEFILE "Names.txt"
Count <- 0
OPENFILE "Names.txt" FOR READ
WHILE NOT EOF("Names.txt")
    READFILE "Names.txt", Line
    OUTPUT Line
    Count <- Count + 1
ENDWHILE
CLOSEFILE "Names.txt"
OUTPUT Count`,
  copyBlankMarkers: `DECLARE Line : STRING
OPENFILE "Names.txt" FOR READ
OPENFILE "Labelled.txt" FOR WRITE
WHILE NOT EOF("Names.txt")
    READFILE "Names.txt", Line
    IF Line = "" THEN
        WRITEFILE "Labelled.txt", "[blank]"
    ELSE
        WRITEFILE "Labelled.txt", Line
    ENDIF
ENDWHILE
CLOSEFILE "Names.txt"
CLOSEFILE "Labelled.txt"`,
  recordArray: `TYPE MemberRecord
    DECLARE Name : STRING
    DECLARE Paid : BOOLEAN
ENDTYPE
DECLARE Members : ARRAY[1:2] OF MemberRecord
DECLARE Index : INTEGER
FOR Index <- 1 TO 2
    INPUT Members[Index].Name
    Members[Index].Paid <- FALSE
NEXT Index
Members[2].Paid <- TRUE
FOR Index <- 1 TO 2
    OUTPUT Members[Index].Name
    OUTPUT Members[Index].Paid
NEXT Index`,
  bubbleDescending: `DECLARE Values : ARRAY[0:4] OF INTEGER
DECLARE Index : INTEGER
DECLARE Last : INTEGER
DECLARE Temp : INTEGER
DECLARE Swapped : BOOLEAN
FOR Index <- 0 TO 4
    INPUT Values[Index]
NEXT Index
Last <- 4
Swapped <- TRUE
WHILE (Last > 0) AND Swapped
    Swapped <- FALSE
    FOR Index <- 0 TO Last - 1
        IF Values[Index] < Values[Index + 1] THEN
            Temp <- Values[Index]
            Values[Index] <- Values[Index + 1]
            Values[Index + 1] <- Temp
            Swapped <- TRUE
        ENDIF
    NEXT Index
    Last <- Last - 1
ENDWHILE
FOR Index <- 0 TO 4
    OUTPUT Values[Index]
NEXT Index`,
  record: `TYPE MemberRecord
    DECLARE Name : STRING
    DECLARE YearGroup : INTEGER
    DECLARE FeesPaid : BOOLEAN
ENDTYPE
DECLARE Member : MemberRecord
INPUT Member.Name
INPUT Member.YearGroup
Member.FeesPaid <- FALSE
Member.YearGroup <- Member.YearGroup + 1
OUTPUT Member.Name
OUTPUT Member.YearGroup
OUTPUT Member.FeesPaid`,
  arrayTotal: `DECLARE Marks : ARRAY[1:4] OF INTEGER
DECLARE Index : INTEGER
DECLARE Total : INTEGER
Total <- 0
FOR Index <- 1 TO 4
    INPUT Marks[Index]
    Total <- Total + Marks[Index]
NEXT Index
OUTPUT Total
OUTPUT Marks[3]`,
  arrayMaximum: `DECLARE Mass : ARRAY[1:4] OF REAL
DECLARE Index : INTEGER
DECLARE Largest : REAL
FOR Index <- 1 TO 4
    INPUT Mass[Index]
NEXT Index
Largest <- Mass[1]
FOR Index <- 2 TO 4
    IF Mass[Index] > Largest THEN
        Largest <- Mass[Index]
    ENDIF
NEXT Index
OUTPUT Largest`,
  array2D: `DECLARE Scores : ARRAY[1:2, 1:3] OF INTEGER
DECLARE Row : INTEGER
DECLARE Column : INTEGER
DECLARE RowTotal : INTEGER
FOR Row <- 1 TO 2
    RowTotal <- 0
    FOR Column <- 1 TO 3
        INPUT Scores[Row, Column]
        RowTotal <- RowTotal + Scores[Row, Column]
    NEXT Column
    OUTPUT RowTotal
NEXT Row`,
  columnTotals: `DECLARE Sales : ARRAY[1:2, 1:3] OF INTEGER
DECLARE Row : INTEGER
DECLARE Column : INTEGER
DECLARE Total : INTEGER
FOR Row <- 1 TO 2
    FOR Column <- 1 TO 3
        INPUT Sales[Row, Column]
    NEXT Column
NEXT Row
FOR Column <- 1 TO 3
    Total <- 0
    FOR Row <- 1 TO 2
        Total <- Total + Sales[Row, Column]
    NEXT Row
    OUTPUT Total
NEXT Column`,
  linear: `DECLARE Values : ARRAY[1:5] OF INTEGER
DECLARE Index : INTEGER
DECLARE Target : INTEGER
DECLARE Position : INTEGER
FOR Index <- 1 TO 5
    INPUT Values[Index]
NEXT Index
INPUT Target
Index <- 1
Position <- 0
WHILE (Index <= 5) AND (Position = 0)
    IF Values[Index] = Target THEN
        Position <- Index
    ELSE
        Index <- Index + 1
    ENDIF
ENDWHILE
OUTPUT Position`,
  bubble: `DECLARE Values : ARRAY[1:7] OF INTEGER
DECLARE Index : INTEGER
DECLARE Last : INTEGER
DECLARE Temp : INTEGER
DECLARE Swapped : BOOLEAN
FOR Index <- 1 TO 7
    INPUT Values[Index]
NEXT Index
Last <- 7
Swapped <- TRUE
WHILE (Last > 1) AND Swapped
    Swapped <- FALSE
    FOR Index <- 1 TO Last - 1
        IF Values[Index] > Values[Index + 1] THEN
            Temp <- Values[Index]
            Values[Index] <- Values[Index + 1]
            Values[Index + 1] <- Temp
            Swapped <- TRUE
        ENDIF
    NEXT Index
    Last <- Last - 1
ENDWHILE
FOR Index <- 1 TO 7
    OUTPUT Values[Index]
NEXT Index`,
  readFile: `DECLARE Line : STRING
DECLARE Count : INTEGER
Count <- 0
OPENFILE "Names.txt" FOR READ
WHILE NOT EOF("Names.txt")
    READFILE "Names.txt", Line
    OUTPUT Line
    Count <- Count + 1
ENDWHILE
CLOSEFILE "Names.txt"
OUTPUT Count`,
  writeFile: `DECLARE Line : STRING
DECLARE Index : INTEGER
OPENFILE "Names.txt" FOR WRITE
FOR Index <- 1 TO 3
    INPUT Line
    WRITEFILE "Names.txt", Line
NEXT Index
CLOSEFILE "Names.txt"`,
  appendFile: `DECLARE Line : STRING
INPUT Line
OPENFILE "Names.txt" FOR APPEND
WRITEFILE "Names.txt", Line
CLOSEFILE "Names.txt"`,
  filterFile: `DECLARE Line : STRING
OPENFILE "Names.txt" FOR READ
OPENFILE "NonEmpty.txt" FOR WRITE
WHILE NOT EOF("Names.txt")
    READFILE "Names.txt", Line
    IF Line <> "" THEN
        WRITEFILE "NonEmpty.txt", Line
    ENDIF
ENDWHILE
CLOSEFILE "Names.txt"
CLOSEFILE "NonEmpty.txt"`,
};
export function codeFor(key) {
  if (!Object.hasOwn(section10Programs, key)) throw new Error(`Unknown S10 program: ${key}`);
  return section10Programs[key];
}
