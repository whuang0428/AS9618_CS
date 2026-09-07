import { mechanismVisual } from "./course-v3-mechanism-diagrams.mjs";
import { coreParagraph, coreList, coreTable } from "./course-v3-core-blocks.mjs";
import { codeFor } from "./course-v3-section11-programs.mjs";
import { countDiagram } from "./course-v3-section11-diagrams.mjs";

const ids = (r, ...ns) => ns.map(n => `S11.${String(r).padStart(2,"0")}.A${String(n).padStart(2,"0")}`);
const table = (title, headers, rows) => ({type:"table",title,headers,rows,preserveText:true});
const worked = (key, task, result) => ({type:"worked-example",title:task,programKey:key,steps:[["Pseudocode",codeFor(key)],["Trace and check",result]]});
const unit = (key, heading, objectiveIds, explanation, visual, misconception, prompt, answer, example) => ({
  unitKey:`S11-${key}`,syllabusId:objectiveIds[0].replace(/\.A\d+$/,""),heading,objectiveIds,explanation,
  materials:[visual,...(example?[example]:[])].map(m=>({...m,objectiveIds})),misconceptions:[misconception],
  checkpoint:{prompt,answer},useAuthoredVisual:true,preserveTeachingSteps:true,
});
const question = (id,prompt,objectiveIds,answerPoints,commonError,extra={}) => ({id,prompt,objectiveIds,answerPoints,commonError,marks:answerPoints.length,type:"Application",authored:true,...extra});
const q = (l,n,...args) => question(`S11-L${String(l).padStart(2,"0")}-Q${n}`,...args);
const e = (l,n,...args) => question(`S11-L${String(l).padStart(2,"0")}-EXAM-${n}`,...args);
const supplied = key => ({code:codeFor(key),programKey:key,codeLabel:"Supplied pseudocode",codeCaption:"Use this complete program for the stated task."});
const solution = key => ({answerCode:codeFor(key),answerProgramKey:key,answerCodeLabel:"One valid pseudocode solution",answerLanguage:"text"});
const lessons = [
{
  title:"Translating descriptions into Cambridge pseudocode",
  subtitle:"Preserve the operations, decisions and repetition in a supplied design.",
  guidingQuestion:"Does every path in the design have an equivalent path in the program?",
  diagnostic:{prompt:"A design counts positive values. Should an input of zero increase the count?",answer:"No. Positive means greater than zero; the condition is Value > 0."},
  units:[
    unit("TRANSLATE-ENGLISH","Translate structured English",ids(1,1),[
      "Read the whole design before writing statements. Identify the inputs, initial values, processing order and required outputs. Translate a precise action such as increase Count by one into Count <- Count + 1; do not leave the action as an unexplained instruction to process data.",
      "Consider this design: set a count to zero; read three integers in turn; increase the count for each positive integer; output the final count. Initialisation belongs before repetition, the input and positive-value decision belong inside it, and the final output belongs after it. Indentation makes these responsibilities visible.",
    ],table("Translate each design step",["Structured English","Pseudocode responsibility"],[["Set the count to zero","Count <- 0 before the loop"],["Read three integers","One fresh input in each of three slots"],["Count each positive integer","IF Value > 0 THEN increment Count"],["Report the final count","OUTPUT Count after NEXT Index"]]),"Counting values greater than or equal to zero changes the supplied design.","Where is the count initialised?","Once, before reading the three values.",worked("countPositive","Implement the three-value design","Inputs -2, 0, 5 produce 1. Inputs 1, 2, 3 produce 3.")),
    unit("TRANSLATE-FLOWCHART","Follow every flowchart edge",ids(1,1),[
      "A flowchart's arrows specify execution order. A decision requires both outcomes to reach the correct next operation. A backward arrow identifies repetition; determine which state changes before execution returns to the decision. A terminal marks the end of that execution path.",
      "The flowchart below implements the same three-value design. Count and Index are initialised before the first test. Each completed input advances Index once, including a non-positive value. The loop exits to the final output when Index exceeds three; execution ends after that output.",
    ],countDiagram,"An End terminal must not continue into another iteration.","Why must Index advance after a non-positive value?","That value has still been read and must count toward the three inputs."),
  ],
  practice:[
    q(1,1,"Write pseudocode for this structured English: input a real-valued length and width; multiply them; output the area.",ids(1,1),["Declare Length, Width and Area as REAL and input Length and Width.","Assign Area <- Length * Width, then OUTPUT Area."],"Do not output before assigning the area."),
    q(1,2,"Write pseudocode equivalent to the supplied three-value flowchart. State the output for inputs -4, 2 and 7.",ids(1,1),["Initialise Count before a loop that obtains exactly three values.","Increment Count only for Value > 0.","Output the completed count after repetition; these inputs give 2."],"The loop counter and positive-value count have different purposes.",{diagram:countDiagram.asset,diagramAlt:countDiagram.alt,diagramLabel:"Supplied program flowchart",...solution("countPositive")}),
    q(1,3,"Explain why moving Count <- 0 inside the loop changes the three-value algorithm. Use inputs 2, 3 and -1.",ids(1,1),["Each new iteration discards the previous count.","The final negative value leaves 0 instead of the correct count 2."],"Trace all iterations, not only the first."),
  ],
  authoredExamQuestions:[
    e(1,1,"Write pseudocode for this design: input a non-negative integer Count; while it is positive, output it and reduce it by one; after repetition output \"Finished\". State the output when Count starts at zero.",ids(1,1),["Input Count before testing Count > 0.","Output Count and decrement it inside a WHILE loop.","After ENDWHILE output \"Finished\"; zero produces only that text."],"Decrement before the repeated condition is tested again.",solution("countdown")),
    e(1,2,"Write pseudocode for this structured English: input a real temperature; if it is below zero output \"Ice\"; otherwise output \"Water\". State which output occurs at zero.",ids(1,1),["Obtain Temperature before testing Temperature < 0.","Use IF/ELSE with the two stated outputs and ENDIF.","Zero follows ELSE and outputs \"Water\"."],"A strict comparison excludes the boundary."),
    e(1,3,"A design reads four prices, totals them and outputs the total once. A translation reads Price before the FOR loop, adds it four times and outputs Total inside the loop. Describe the changes needed to match the design.",ids(1,1),["Place INPUT Price inside the loop so four new prices are read.","Initialise Total to zero before the loop and add each new price.","Move OUTPUT Total after the loop so only the final total is displayed."],"Four additions of one input do not implement four separate inputs."),
  ],
  summary:[["Preserve the design","Translate each operation and both decision outcomes."],["Place state correctly","Initialise before accumulation and update before repeating a condition."],["Check equivalence","Trace the same inputs through the design and pseudocode."]],
},
{
  title:"Declarations, assignment and input/output",
  subtitle:"Give data a type, obtain values and report calculated results in Cambridge notation.",
  guidingQuestion:"Has every value been defined before the program uses it?",
  diagnostic:{prompt:"Does DECLARE Total : REAL set Total to zero?",answer:"No. A declaration gives the variable its type; use Total <- 0 to assign an initial value."},
  units:[
    unit("DECLARE","Declare variables and constants",ids(2,1,2),[
      "Use DECLARE Identifier : DataType for a variable. Choose INTEGER for whole-number counts, REAL for values that may have a fractional part, BOOLEAN for TRUE or FALSE, CHAR for one character and STRING for text. A declaration does not provide an initial value.",
      "Declare and initialise a named constant with CONSTANT Identifier = Literal. Its type follows from the literal and its value remains fixed. Use double quotes for a STRING literal and single quotes for a CHAR literal. In this notation a constant declaration uses a literal, rather than an expression involving other identifiers.",
    ],table("Declarations and literals",["Purpose","Example"],[["Count","DECLARE Quantity : INTEGER"],["Amount","DECLARE Price : REAL"],["Decision","DECLARE Paid : BOOLEAN"],["Single character","DECLARE Grade : CHAR; Grade <- 'A'"],["Fixed rate","CONSTANT TaxRate = 0.20"]]),"CONSTANT TaxRate <- 0.20 uses the assignment symbol in a declaration.","Which type suits an identifier that stores either TRUE or FALSE?","BOOLEAN."),
    unit("ASSIGN-IO","Obtain, assign and output values",ids(2,3,5),[
      "Assignment evaluates the expression on the right and stores the result in the variable on the left. Total <- Price * Quantity changes Total; Total = Price * Quantity is a comparison. A later assignment replaces the variable's earlier value. INPUT obtains a value from the keyboard, while OUTPUT writes a value or expression to the console.",
      "For a purchase with tax charged per item, read Price and Quantity before using either. Compute Tax <- Price * TaxRate, then multiply the tax-inclusive item price by Quantity. Declaring all identifiers, obtaining the inputs and assigning intermediate results in order prevents undefined values from reaching the calculation.",
    ],table("Purchase state",["After statement","Value"],[["INPUT Price; INPUT Quantity","Price 10, Quantity 3"],["Tax <- Price * TaxRate","Tax 2"],["Total <- (Price + Tax) * Quantity","Total 36"],["OUTPUT Total","Console receives 36"]]),"OUTPUT displays a result; it does not assign that result to a new variable.","What does Quantity <- Quantity + 1 do?","It reads the old Quantity, adds one and stores the result back in Quantity.",worked("purchase","Calculate a tax-inclusive purchase","Price 10 and Quantity 3 give Tax 2 per item and Total 36.")),
  ],
  practice:[
    q(2,1,"Write declarations for a whole-number stock count, a real price, a Boolean in-stock flag, a single grade character and a fixed discount rate of 0.10.",ids(2,1,2),["Use INTEGER, REAL, BOOLEAN and CHAR for Stock, Price, InStock and Grade respectively.","Write CONSTANT DiscountRate = 0.10."],"A constant declaration supplies its value with =."),
    q(2,2,"State the final values of A and B after A <- 4, B <- A and A <- A + 3. Explain why B has that value.",ids(2,3),["A finishes as 7 and B as 4.","B receives the value of A at assignment time, not a permanent link to A."],"Ordinary scalar assignment copies a value."),
    q(2,3,"Write pseudocode that inputs an integer Quantity and a real Price, calculates Total <- Price * Quantity, and outputs Total.",ids(2,2,3,5),["Declare Quantity as INTEGER and Price and Total as REAL.","INPUT Quantity and INPUT Price occur before the calculation.","Assign the product to Total and OUTPUT Total."],"Use <- for assignment, not =."),
  ],
  authoredExamQuestions:[
    e(2,1,"A program stores a bus route name, a whole-number passenger count and whether the bus is full. Write suitable declarations and initialise the count to zero and the full flag to FALSE.",ids(2,2,3),["RouteName has type STRING.","PassengerCount has type INTEGER and IsFull has type BOOLEAN.","PassengerCount <- 0 and IsFull <- FALSE assign the initial values."],"A quoted \"FALSE\" is text, not a Boolean."),
    e(2,2,"A program uses CONSTANT Fee = 2.50. Write statements that input a non-negative integer Visits and output its total fee. State the result for Visits 4 and explain why Fee is a constant.",ids(2,1,3,5),["INPUT Visits obtains the number of visits before using it.","OUTPUT Visits * Fee, or equivalent assignment then output, produces 10 for four visits.","Fee has one fixed value throughout execution, whereas Visits depends on the input."],"Do not overwrite Fee with the total charge."),
    e(2,3,"A pupil writes DECLARE Total : REAL followed immediately by Total <- Total + Price. Explain the problem and write a corrected sequence that inputs Price and calculates a single-item total starting from zero.",ids(2,2,3,5),["Neither Total nor Price has been given a value before the addition.","Declare Price as REAL, assign Total <- 0 and INPUT Price.","Then Total <- Total + Price uses defined values."],"Declaring a variable does not imply an initial value."),
  ],
  summary:[["Declare the data","Choose types that match the values; initialise constants with literals."],["Follow the value flow","Obtain or assign each value before using it."],["Use the right notation","<- assigns; = compares; INPUT reads and OUTPUT displays."]],
},
{
  title:"Arithmetic and logical expressions",
  subtitle:"Evaluate arithmetic accurately and express inclusive and exclusive conditions.",
  guidingQuestion:"Do the operators and grouping implement the stated calculation or rule?",
  diagnostic:{prompt:"Are 7 / 2 and 7 DIV 2 equal?",answer:"No. / gives 3.5; integer division gives 3."},
  units:[
    unit("ARITHMETIC","Evaluate arithmetic and integer division",ids(2,3,4),[
      "Arithmetic expressions use +, -, * and /. Multiplication and division are evaluated before addition and subtraction; parentheses override that order. The / operator produces a real division result even when both operands are integers. Choose a REAL destination when a fractional result is possible.",
      "DIV gives the integer quotient and MOD gives the remainder. For a non-negative number of minutes, Minutes DIV 60 gives complete hours and Minutes MOD 60 gives minutes left over. The divisor must be non-zero. Parentheses are useful when an expression combines arithmetic operations with a comparison.",
    ],table("Evaluate before assignment",["Expression","Result","Reason"],[["2 + 3 * 4","14","Multiplication first"],["(2 + 3) * 4","20","Parentheses first"],["7 / 2","3.5","Real division"],["125 DIV 60","2","Complete groups"],["125 MOD 60","5","Remainder"]]),"Rounding real division is not the definition of DIV.","What are 17 DIV 5 and 17 MOD 5?","3 and 2 respectively."),
    unit("LOGICAL","Build and test Boolean expressions",ids(2,4),[
      "Comparisons =, <>, <, <=, > and >= produce Boolean values. AND requires both conditions to be true; OR is true when either or both are true; NOT reverses a Boolean value. Write each comparison in full, including the identifier on both sides of an interval test.",
      "An adult threshold uses Age >= 18, which accepts 18 and every greater age. An inclusive interval from zero to 180 uses (Minutes >= 0) AND (Minutes <= 180). Test both endpoints and outside values. Its complement uses (Minutes < 0) OR (Minutes > 180); replacing AND by OR without changing the comparisons admits every value.",
    ],table("Test both sides of the rule",["Minutes","Inside 0 to 180?","Outside 0 to 180?"],[[-1,"FALSE","TRUE"],[0,"TRUE","FALSE"],[180,"TRUE","FALSE"],[181,"FALSE","TRUE"]]),"Age = 18 tests one age and does not mean at least 18.","If Member and Paid are both TRUE, what is Member OR Paid?","TRUE; OR is inclusive.",worked("operators","Convert minutes and test a permitted interval","125 gives 2 complete hours, 5 remaining minutes and TRUE. The final three arithmetic results are 14, 20 and 3.5.")),
  ],
  practice:[
    q(3,1,"Calculate 5 + 2 * 6, (5 + 2) * 6, 19 DIV 4 and 19 MOD 4.",ids(2,4),["The first two results are 17 and 42.","The quotient is 4 and the remainder is 3."],"Keep quotient and remainder distinct."),
    q(3,2,"Write a Boolean expression for entry when Age is at least 18 and Suspended is FALSE. Evaluate Age 18 with Suspended FALSE.",ids(2,4),["(Age >= 18) AND NOT Suspended expresses both restrictions.","The stated inputs make it TRUE."],"The lower boundary includes equality."),
    q(3,3,"Write assignments that store the complete boxes and loose items when Quantity non-negative items are packed in boxes of 8. State both values for Quantity 27.",ids(2,3,4),["Boxes <- Quantity DIV 8 and Loose <- Quantity MOD 8.","For 27 items the values are 3 boxes and 3 loose items."],"Use integer quotient and remainder, not a rounded decimal."),
  ],
  authoredExamQuestions:[
    e(3,1,"Calculate the final Total after Price <- 4.50, Quantity <- 3 and Total <- Price * Quantity + 2. State how the final assignment changes if the extra 2 applies to every item.",ids(2,3,4),["The given expression produces 15.50.","Use Total <- (Price + 2) * Quantity for an extra charge on each item.","The changed expression produces 19.50."],"Grouping depends on whether a charge is per item or per purchase."),
    e(3,2,"Write a condition that is TRUE when Temperature is outside the inclusive interval 5 to 30. Give its truth values for 4, 5, 30 and 31.",ids(2,4),["(Temperature < 5) OR (Temperature > 30) tests the two excluded regions.","The four truth values are TRUE, FALSE, FALSE and TRUE."],"Outside an interval uses OR between strict comparisons."),
    e(3,3,"A program computes Complete <- Seconds / 60 and Remainder <- Seconds DIV 60 to separate a non-negative duration into whole minutes and remaining seconds. Correct both assignments and state both results for 143 seconds.",ids(2,3,4),["Complete <- Seconds DIV 60 gives complete minutes.","Remainder <- Seconds MOD 60 gives remaining seconds.","143 seconds gives Complete 2 and Remainder 23."],"/ can produce a fraction and DIV does not give the remainder."),
  ],
  summary:[["Evaluate in order","Parentheses, then multiplication/division, then addition/subtraction."],["Split whole quantities","DIV counts complete groups and MOD finds the remainder."],["Test the condition","Check boundaries and the effect of AND, OR and NOT."]],
},
{
  title:"Built-in routines and string functions",
  subtitle:"Read a routine's interface and use numeric, character and string results correctly.",
  guidingQuestion:"What argument types does the routine require, and what value does it return?",
  diagnostic:{prompt:"A supplied function MID(Text, Start, Count) numbers characters from 1. What is MID(\"CAMBRIDGE\", 2, 3)?",answer:"\"AMB\": begin at character 2 and take three characters."},
  units:[
    unit("NUMERIC-FUNCTIONS","Use numeric built-in functions",ids(3,1),[
      "A built-in function is supplied by the language; a library routine supplies reusable operations through an interface. A function call gives arguments in the specified order and supplies a returned value to the surrounding expression. Check the accepted types and the meaning of the result before using it.",
      "INT(X) returns the integer part of real X. RAND(X), for a positive integer bound X, returns a real value from zero inclusive to X exclusive. INT(RAND(6)) + 1 therefore produces an integer from one to six. The addition shifts the possible values after truncation; RAND(6) alone does not return a die face.",
    ],table("Numeric routine contracts",["Call","Result","Use"],[["INT(4.8)","4","Take the integer part"],["RAND(6)","0 <= result < 6","Real random value in the given interval"],["INT(RAND(6)) + 1","1 to 6 inclusive","Integer die result"]]),"Do not describe RAND(6) as a random integer from 1 to 6.","Can INT(RAND(6)) + 1 produce 7?","No. RAND(6) is strictly below 6, so its integer part is at most 5."),
    unit("STRING-FUNCTIONS","Apply supplied string and character interfaces",ids(3,1,2,3),[
      "In examinations, string manipulation functions are supplied; other functions absent from the pseudocode guide are also defined. Read those definitions rather than assuming that a familiar name uses another language's indexing or argument order. The table here supplies the contracts needed for the lesson's examples.",
      "LENGTH(Text) returns a string's character count; MID(Text, Start, Count) takes Count characters beginning at the one-based Start position; RIGHT(Text, Count) takes the rightmost characters. UCASE and LCASE here accept and return a single CHAR. Supply indices and counts valid for the stated string; the examples do not rely on unspecified out-of-range behaviour.",
    ],table("Supplied interfaces for this lesson",["Function","Argument types","Returned result"],[["LENGTH(Text)","STRING","INTEGER character count"],["MID(Text, Start, Count)","STRING, INTEGER, INTEGER","STRING; Start begins at 1"],["RIGHT(Text, Count)","STRING, INTEGER","STRING containing last Count characters"],["UCASE(Letter)","CHAR","Upper-case CHAR"],["LCASE(Letter)","CHAR","Lower-case CHAR"]]),"A character routine is not automatically a whole-string routine.","What is RIGHT(\"ALGORITHM\", 2)?","\"HM\".",worked("library","Combine supplied routines","With ALGORITHM, 'b' and 4.8, the fixed results are 9, LGO, HM, B, b and 4; the final die value is an integer from 1 to 6.")),
  ],
  practice:[
    q(4,1,"State INT(8.9) and the smallest and largest possible values of INT(RAND(4)) + 2, using the numeric contracts in this lesson.",ids(3,1),["INT(8.9) is 8.","The random expression ranges from 2 to 5 inclusive."],"The upper bound passed to RAND is exclusive."),
    q(4,2,"Using the supplied lesson interfaces, calculate LENGTH(\"COMPUTER\"), MID(\"COMPUTER\", 3, 4) and RIGHT(\"COMPUTER\", 3).",ids(3,1,3),["The length is 8.","MID returns \"MPUT\" and RIGHT returns \"TER\"."],"MID's third argument is a character count, not an ending index."),
    q(4,3,"A supplied function TAKE(Text : STRING, Count : INTEGER) returns the first Count characters. Write an expression that obtains the first four characters of \"NETWORK\" and state the result.",ids(3,2,3),["TAKE(\"NETWORK\", 4) follows the supplied interface.","The returned string is \"NETW\"."],"Use the provided definition even when the function is unfamiliar."),
  ],
  authoredExamQuestions:[
    e(4,1,"A simulation needs an integer lane number from 1 to 8 inclusive. RAND(X) returns a real number from 0 inclusive to X exclusive and INT takes the integer part. Write an expression and explain the two operations after RAND.",ids(3,1),["INT(RAND(8)) + 1 is suitable.","INT converts the interval into integers 0 to 7.","Adding 1 shifts those outcomes to lanes 1 to 8."],"Applying INT before generating the random value does not perform this conversion."),
    e(4,2,"A supplied function SLICE(Text : STRING, Start : INTEGER, Count : INTEGER) returns Count characters beginning at one-based Start. A code is \"AB2046XY\". Write an expression that extracts its four digits and state the result.",ids(3,2,3),["SLICE(\"AB2046XY\", 3, 4) uses the supplied start and count.","The returned STRING is \"2046\"."],"An extracted string of digits is still a STRING under this interface."),
    e(4,3,"LENGTH(S) returns the number of characters in string S. RIGHT(S, N) returns its last N characters. UCASE(C) accepts a CHAR and returns its upper-case form. For S = \"database\" and C = 'q', state LENGTH(S), RIGHT(S, 4) and UCASE(C), and explain why UCASE(S) is unsuitable for this interface.",ids(3,1,3),["LENGTH(S) is 8 and RIGHT(S, 4) is \"base\".","UCASE(C) returns 'Q'.","UCASE requires a CHAR, whereas S supplies a STRING."],"Respect the supplied argument type rather than assuming whole-string conversion."),
  ],
  summary:[["Read the interface","Match argument order and types to the supplied definition."],["Check numeric bounds","RAND excludes its upper bound; INT takes an integer part."],["Track the result type","A returned STRING, CHAR or number determines where the call can be used."]],
},
{
  title:"IF, ELSE and CASE selection",
  subtitle:"Implement alternatives, nested decisions and labelled CASE branches.",
  guidingQuestion:"Which branch runs for each possible input, including boundary values?",
  diagnostic:{prompt:"For IF Age >= 18 THEN, does Age 19 take the true branch?",answer:"Yes. >= 18 includes both the boundary 18 and greater values."},
  units:[
    unit("IF-NESTED","Write alternatives and nested decisions",ids(4,1),[
      "An IF statement executes its THEN block when the condition is true. An optional ELSE block handles the false outcome. ENDIF closes that decision. Two independent IF statements can both execute their blocks; IF with ELSE selects only one of its alternatives.",
      "Nesting puts a second decision inside a branch of the first. For adult membership, check Age >= 18 first and check Member only inside the adult branch. Give each IF its own ENDIF and indent consistently so the reader can identify which ELSE belongs to which decision.",
    ],table("Nested membership paths",["Age","Member","Output"],[[17,"TRUE","Junior"],[18,"TRUE","Adult member"],[19,"FALSE","Adult visitor"]]),"The outer decision must use >= 18, not = 18.","For Age 17 and Member TRUE, is the inner adult decision reached?","No. The outer false branch outputs Junior.",worked("selection","Implement age and membership rules","The three supplied cases exercise the junior, adult-member and adult-visitor paths.")),
    unit("CASE","Select by the value of one identifier",ids(4,2),[
      "Use CASE OF Identifier when alternatives depend on the value of one identifier. Put each value or permitted range before a colon, provide its statements, and close the structure with ENDCASE. OTHERWISE handles a value that matches no listed case; no break statement is needed in Cambridge pseudocode.",
      "For a menu, Choice 1 opens and Choice 2 saves; every other value reports Invalid. This is clearer than a long series of equality tests on Choice. Use IF for general Boolean conditions or nested rules involving different data, and ensure CASE labels express distinct intended alternatives.",
    ],table("CASE layout",["Part","Pseudocode"],[["Header","CASE OF Choice"],["First alternative","1 : OUTPUT \"Open\""],["Second alternative","2 : OUTPUT \"Save\""],["Unmatched input","OTHERWISE : OUTPUT \"Invalid\""],["Closure","ENDCASE"]]),"CASE Choice OF reverses the official keyword order.","What does the menu output for Choice 0?","Invalid, through OTHERWISE.",worked("menu","Implement a complete menu selection","Choice 1 outputs Open, Choice 2 outputs Save, and Choice 0 outputs Invalid.")),
  ],
  practice:[
    q(5,1,"Write an IF/ELSE statement that outputs \"Pass\" for Mark at least 50 and \"Fail\" otherwise. State the output for Mark 50.",ids(4,1),["Use IF Mark >= 50 THEN with OUTPUT \"Pass\".","Use ELSE with OUTPUT \"Fail\", then ENDIF; 50 outputs Pass."],"At least includes the threshold."),
    q(5,2,"State the outputs of the supplied nested selection for Age 18, Member FALSE, and for Age 20, Member TRUE. Explain the role of the outer comparison.",ids(4,1),["The outputs are Adult visitor and Adult member respectively.","Age >= 18 admits all adults to the inner membership decision."],"Age = 18 would exclude adults older than 18.",supplied("selection")),
    q(5,3,"Write CASE pseudocode for integer Option: 1 outputs \"Add\", 2 outputs \"Remove\" and all other values output \"Unknown\".",ids(4,2),["Begin CASE OF Option and give separate 1 and 2 labels with their required outputs.","Use OTHERWISE : OUTPUT \"Unknown\" and close with ENDCASE."],"Place OF before the identifier."),
  ],
  authoredExamQuestions:[
    e(5,1,"Write nested IF pseudocode for an entry rule: an age below 16 outputs \"Too young\"; otherwise a person with Consent TRUE outputs \"Admitted\", and a person without consent outputs \"Consent needed\". State the outcome for age 16 without consent.",ids(4,1),["An outer age comparison separates under-16 and eligible-age branches.","The eligible-age branch contains a separate Consent decision with both stated outputs.","Both IF statements are closed; the given case outputs Consent needed."],"Consent is checked only after the age rule is satisfied."),
    e(5,2,"Write a CASE statement for integer Day: values 1 to 5 output \"Weekday\", 6 and 7 output \"Weekend\", and all other values output \"Invalid day\".",ids(4,2),["Use CASE OF Day with a 1 TO 5 label for Weekday.","Use 6 TO 7, or separate 6 and 7 labels, for Weekend.","Use OTHERWISE for Invalid day and ENDCASE to close."],"Unrecognised values need a defined outcome.",solution("days")),
    e(5,3,"A program uses IF Mark >= 50 THEN OUTPUT \"Pass\" ENDIF followed by IF Mark >= 80 THEN OUTPUT \"Distinction\" ENDIF. State its outputs at 85 and describe a change that outputs exactly one classification: Distinction from 80, Pass from 50, otherwise Fail.",ids(4,1),["At 85 it outputs both Pass and Distinction.","Test Mark >= 80 first and output Distinction on that branch.","In its ELSE branch test Mark >= 50 for Pass, with a final ELSE for Fail."],"Independent IF statements do not form exclusive alternatives."),
  ],
  summary:[["Close each decision","Use THEN, optional ELSE and the matching ENDIF."],["Trace nested paths","A decision inside a branch is reached only through that branch."],["Choose CASE appropriately","Use CASE OF for alternatives based on one identifier."]],
},
{
  title:"Count-controlled iteration",
  subtitle:"Control inclusive bounds, direction and accumulation with FOR loops.",
  guidingQuestion:"How many times does the body execute for the stated start, end and step?",
  diagnostic:{prompt:"How often does FOR Index <- 1 TO 0 execute with its default step?",answer:"Zero times. The positive step begins beyond the upper bound."},
  units:[
    unit("FOR-BOUNDS","Use inclusive count-controlled bounds",ids(4,3),[
      "A FOR loop is suitable when the iteration count is known before entering the loop. Write FOR Index <- Start TO End and close it with NEXT Index. With the default step of one, the body uses Start, Start + 1 and so on up to End inclusive. Let the loop manage its control variable.",
      "FOR Index <- 1 TO Count performs Count iterations for a non-negative Count. Count zero gives no iterations, and Count one gives exactly one. Initialise an accumulator before the loop; obtain each new value and add it inside; report the total afterwards. A zero-item total remains the initial zero without a special loop branch.",
    ],table("Default positive-step cases",["Bounds","Values used","Iterations"],[["1 TO 3","1, 2, 3","3"],["1 TO 1","1","1"],["1 TO 0","None","0"]]),"Starting beyond the end with a positive step does not force a first iteration.","For Index 2 TO 5, how many body executions occur?","Four: Index 2, 3, 4 and 5.",worked("total","Total a specified number of integers","Count 3 followed by 2, 4, 6 outputs 12; Count 0 outputs 0 without reading any Value.")),
    unit("FOR-STEP","Use an explicit step and direction",ids(4,3),[
      "STEP supplies the integer increment instead of the default one. A positive step moves upward; a negative step moves downward. The body runs while the control value remains within the endpoint in that direction. The endpoint is used only if the sequence of increments reaches it exactly.",
      "FOR Index <- 6 TO 0 STEP -2 visits 6, 4, 2 and 0. Starting at 5 with the same endpoint and step visits 5, 3 and 1, then stops before -1. A step of zero makes no progress and is unsuitable. Choose the starting value, endpoint and direction together before counting executions.",
    ],table("Step determines the sequence",["Header bounds","Body values"],[["2 TO 8 STEP 3","2, 5, 8"],["5 TO 0 STEP -2","5, 3, 1"],["0 TO 5 STEP -1","None"]]),"An inclusive endpoint does not imply that every step sequence lands on it.","What does 8 TO 2 STEP -3 visit?","8, 5 and 2.",worked("step","Trace a descending loop","The four outputs are 6, 4, 2 and 0.")),
  ],
  practice:[
    q(6,1,"State the control-variable values and number of iterations for FOR Index <- 3 TO 6.",ids(4,3),["The values are 3, 4, 5 and 6.","There are four iterations."],"Both bounds are included."),
    q(6,2,"Write a FOR loop that outputs 10, 8, 6, 4 and 2 in that order.",ids(4,3),["Use FOR Index <- 10 TO 2 STEP -2.","Place OUTPUT Index in the body and close with NEXT Index."],"A positive step cannot move down from 10 to 2."),
    q(6,3,"State the output of the supplied total program for Count 0 and for Count 1 followed by Value 9. State how many Value inputs each run reads.",ids(4,3),["Count 0 reads no Value and outputs 0.","Count 1 reads one Value and outputs 9."],"Initialisation still occurs when the loop body is skipped.",supplied("total")),
  ],
  authoredExamQuestions:[
    e(6,1,"Write pseudocode that inputs exactly four real prices and outputs their total once. Include declarations and initialise the total.",ids(4,3),["Declare Index as INTEGER and Price and Total as REAL; assign Total <- 0 before repetition.","Use FOR Index <- 1 TO 4 with INPUT Price and Total <- Total + Price in the body.","Close with NEXT Index and output Total after the loop."],"Reading Price before the loop would repeat one value four times."),
    e(6,2,"State every output of FOR Position <- 9 TO 1 STEP -3 with body OUTPUT Position. Explain why 1 is not output.",ids(4,3),["The outputs are 9, 6 and 3.","The next value would be 0, beyond the descending endpoint; the step never reaches 1."],"Count actual steps rather than subtracting bounds alone."),
    e(6,3,"A program sets Total <- 0, executes FOR Index <- 1 TO Count with body Total <- Total + 2, then outputs Total. State the outputs for Count 0, 1 and 5, and explain whether Count 0 requires a separate branch to prevent a body execution.",ids(4,3),["The outputs are 0, 2 and 10.","No extra branch is required: with Count 0 the start exceeds the end under the default positive step."],"FOR does not have REPEAT's guaranteed first execution."),
  ],
  summary:[["Count inclusive values","The loop body uses each reachable value within the bounds."],["Check direction","STEP controls the increment; a negative step counts downward."],["Place accumulation correctly","Initialise once, add inside the loop and output the result afterwards."]],
},
{
  title:"Post-condition and pre-condition loops",
  subtitle:"Place condition tests correctly and distinguish stopping from continuing.",
  guidingQuestion:"Must the body run before the condition can be evaluated?",
  diagnostic:{prompt:"Does REPEAT ... UNTIL Valid repeat when Valid becomes TRUE?",answer:"No. TRUE ends repetition; FALSE starts another iteration."},
  units:[
    unit("REPEAT",
      "Use a post-condition REPEAT loop",
      ids(4,5),
      [
        coreParagraph("A post-condition loop executes its body before testing, so the body runs at least once."),
        coreList("Read the REPEAT rules", [
          ["Syntax", "Write REPEAT, the body, then UNTIL Condition. There is no ENDREPEAT."],
          ["TRUE", "Stop and continue after the loop."],
          ["FALSE", "Return to the body for another iteration."]
        ]),
        coreParagraph("Read Mark inside the body and accept it when (Mark >= 0) AND (Mark <= 100). An invalid integer triggers another input. This example assumes integer input: the range test does not itself handle text instead of a number.", "Apply the rule to validation")
      ],
      mechanismVisual("repeat"),
      "UNTIL states when to stop, so a validity test is not negated here.",
      "How many reads occur when the first Mark is 0?",
      "One; the valid first input ends repetition.",
      worked("validation","Read a mark in the inclusive range","Inputs -1, 101, 100 lead to three reads and output 100. Input 0 is accepted on the first attempt.")),
    unit("WHILE",
      "Use a pre-condition WHILE loop",
      ids(4,4),
      [
        coreParagraph("A pre-condition loop tests before the body; the body may run zero times."),
        coreList("Read the WHILE rules", [
          ["Syntax", "Write WHILE Condition, the indented body and ENDWHILE. Do not add DO to the header."],
          ["TRUE", "Execute the body, then return to the condition."],
          ["FALSE", "Skip the body and continue after ENDWHILE."]
        ]),
        coreParagraph("Read Value before the first test so it is defined. While Value <> -1, add it and read again. The sentinel is not added: a first input of -1 leaves Total at zero.", "Initialise and update the condition")
      ],
      mechanismVisual("while"),
      "A missing fresh input can keep the condition unchanged indefinitely.",
      "Why is the first INPUT before WHILE?",
      "The initial test needs a defined Value, and a first sentinel must allow zero body executions.",
      worked("sentinel","Total integers until a sentinel","Inputs 3, 4, -1 output 7. Input -1 alone outputs 0.")),
    unit("LOOP-CONDITIONS",
      "Compare test position and polarity",
      ids(4,4,5),
      [
        coreTable("Compare test position and meaning", ["Property", "REPEAT ... UNTIL", "WHILE ... ENDWHILE"], [
          ["Test position", "After the body", "Before the body"],
          ["Minimum body executions", "1", "0"],
          ["Condition TRUE", "Stop", "Execute the body"],
          ["Condition role", "Stopping condition", "Continuation condition"]
        ]),
        coreParagraph("WHILE Valid continues on TRUE; UNTIL Valid stops on TRUE. Moving the same condition between loop forms can therefore reverse the behaviour.", "Check condition meaning"),
        coreParagraph("Negating the condition alone does not preserve a zero-iteration path. Check the allowed inputs; an outer decision may be needed before REPEAT to preserve a WHILE loop's original behaviour.", "Preserve the first-iteration rule")
      ],
      mechanismVisual("loop-comparison"),
      "Negating the condition alone does not preserve a WHILE loop's empty-input case.",
      "For non-negative Count, can REPEAT OUTPUT Count; Count <- Count - 1 UNTIL Count = 0 replace a countdown WHILE for Count 0?",
      "No. It executes at zero, decrements to -1 and never reaches zero by further decrements."),
  ],
  practice:[
    q(7,1,"Write a REPEAT loop to read an integer Rating until it is from 1 to 5 inclusive. State the number of inputs for 0, 6 and 5.",ids(4,5),["Place INPUT Rating between REPEAT and UNTIL (Rating >= 1) AND (Rating <= 5).","Three inputs are read before the valid 5 ends repetition."],"UNTIL should be true for an accepted rating."),
    q(7,2,"Calculate the output of the supplied sentinel total for 2, 0, 5 and -1. State why the final input is excluded.",ids(4,4),["The final total is 7.","Value -1 makes the pre-condition false before its addition can execute."],"Zero is ordinary data here; only -1 is the sentinel.",supplied("sentinel")),
    q(7,3,"Compare the minimum number of body executions of WHILE and REPEAT, and explain what a TRUE condition means in each.",ids(4,4,5),["WHILE may run zero times and a TRUE condition permits the next body execution.","REPEAT runs at least once and a TRUE UNTIL condition ends repetition."],"State both test position and condition meaning."),
  ],
  authoredExamQuestions:[
    e(7,1,"Write a post-condition loop that reads an integer PIN until it equals 2468. State the number of reads for 1111, 1234 and 2468, and explain why an input is needed before the first test.",ids(4,5),["REPEAT contains INPUT PIN and ends with UNTIL PIN = 2468.","The sequence requires three reads.","The user's first attempt supplies the PIN value to be checked."],"Stopping on PIN <> 2468 would accept a wrong PIN."),
    e(7,2,"Write a pre-condition loop that outputs the current positive integer Stock and subtracts one until Stock is zero. Assume Stock has already been initialised to a non-negative integer. State the output sequence from Stock 2 and from Stock 0.",ids(4,4),["Use WHILE Stock > 0 with OUTPUT Stock followed by Stock <- Stock - 1, then ENDWHILE.","Stock 2 produces 2 and 1.","Stock 0 produces no output because the first condition is false."],"Do not place the decrement outside repetition."),
    e(7,3,"A program reads an integer Value, then executes WHILE Value <> 0 with only OUTPUT Value in its body. Explain what happens for first input 4 and give a correction for reading and displaying values until sentinel 0.",ids(4,4),["Value remains 4, so the condition remains true and 4 is output repeatedly.","Add INPUT Value after OUTPUT Value inside the body.","A later 0 makes the next test false, so 0 itself is not displayed."],"A loop must update the state used by its continuation test."),
  ],
  summary:[["Test after a first attempt","REPEAT guarantees one execution; UNTIL TRUE stops."],["Allow an empty path","WHILE tests first and can execute zero times."],["Maintain progress","Initialise condition data and update it on the repeated path."]],
},
{
  title:"Selecting and justifying a loop structure",
  subtitle:"Choose repetition from the input rules and explain the reason in context.",
  guidingQuestion:"Is the count known, is one attempt compulsory, or can there be no items?",
  diagnostic:{prompt:"A file's first record may already be its end marker. Which loop property is needed?",answer:"The body must be allowed to execute zero times; a pre-condition loop is suitable."},
  units:[
    unit("LOOP-CHOICE","Justify from the problem's conditions",ids(5,1),[
      "A loop justification connects a property of the problem to a property of the chosen structure. Use FOR when the count is known before repetition. Use REPEAT when an action must happen before its result can be checked. Use WHILE when the continuation rule can be checked before processing and no body execution may be needed.",
      "Different loop structures can often implement the same result with additional setup. Explain suitability rather than claiming that alternatives are impossible or inherently slower. For twelve readings a count-controlled header exposes the count; for repeated menu input a post-condition loop places the first request before validation.",
    ],table("Requirement determines suitability",["Scenario","Suitable loop","Contextual reason"],[["Read exactly twelve readings","FOR","The count is fixed before entry"],["Ask for a valid menu option","REPEAT","An attempt is needed before checking it"],["Process records until an end marker","WHILE","The first marker may mean no records"]]),"The word input alone does not determine the loop type.","Why is 'FOR is easier' an incomplete justification?","It does not connect the known iteration count to the loop's count control."),
    unit("LOOP-BOUNDED","Combine a condition with a maximum attempt count",ids(5,1),[
      "Some repetitions end for either of two reasons. A password attempt sequence stops on success or after three attempts. Initialise Password and Attempts before WHILE, then continue only while the password is wrong AND fewer than three attempts have occurred. Increment the counter after every input, including a successful attempt.",
      "A WHILE loop states the combined continuation rule directly and can be adapted when a preliminary condition should prevent attempts. A REPEAT loop could also express the task if at least one attempt is required, using an UNTIL condition for success OR three attempts. A fixed three-iteration FOR without an extra guard would continue asking after early success.",
    ],table("Bounded attempt cases",["Inputs","Success","Attempts"],[["open","TRUE","1"],["x, y, open","TRUE","3"],["x, y, z","FALSE","3"]]),"Using OR in the WHILE continuation condition can continue after success or exceed the attempt limit.","Which stopping condition corresponds to the two WHILE restrictions?","(Password = \"open\") OR (Attempts >= 3).",worked("login","Stop on success or the attempt limit","The supplied cases distinguish first-attempt success, last-attempt success and failure at the limit.")),
  ],
  practice:[
    q(8,1,"Justify a loop structure for reading exactly seven daily rainfall values.",ids(5,1),["A FOR loop is suitable because seven iterations are known before the loop starts.","Its body reads one new value per iteration."],"Refer to the specified count."),
    q(8,2,"Justify a loop structure for asking for a positive integer until a positive value is entered. State a suitable stopping or continuation condition.",ids(5,1),["REPEAT is suitable because the user must enter an attempt before it is checked.","UNTIL Value > 0 stops when that attempt is acceptable."],"Use the acceptance test as the REPEAT stopping condition."),
    q(8,3,"Explain the choice of WHILE for the supplied password program and why its condition joins the restrictions with AND.",ids(5,1),["The number of attempts depends on success while a maximum of three must be enforced.","Both a wrong password and remaining attempts are needed for another iteration."],"Another attempt is unnecessary once either stopping event occurs.",supplied("login")),
  ],
  authoredExamQuestions:[
    e(8,1,"A sensor stream ends with -999, which may be the first input. Justify a loop structure for processing the readings while excluding the marker. Describe where the first and subsequent inputs belong.",ids(5,1),["WHILE is suitable because there may be no readings to process.","Read the first value before testing Value <> -999.","Read the next value at the end of each body so the next marker is checked before processing."],"A first end marker must not be treated as a sensor reading."),
    e(8,2,"A display must show integer levels 20 down to 0 in steps of 5. Justify a loop structure and write its header, body output and closing statement.",ids(5,1),["A count-controlled loop suits the predetermined sequence.","FOR Level <- 20 TO 0 STEP -5 gives the required bounds and direction.","Use OUTPUT Level and NEXT Level; the values are 20, 15, 10, 5 and 0."],"The step must match the descending requirement."),
    e(8,3,"A kiosk must request at least one integer option and keep requesting until the option is between 1 and 4 inclusive. Compare REPEAT with WHILE for this task and recommend one without claiming the other is impossible.",ids(5,1),["REPEAT naturally obtains the first attempt before testing its validity.","A WHILE solution is possible but needs an initial input before the loop or another defined initial state.","Recommend REPEAT with UNTIL (Option >= 1) AND (Option <= 4) for the stated first-attempt requirement."],"Explain the difference in setup, not an unsupported speed claim."),
  ],
  summary:[["Identify the stopping rule","Separate known counts, compulsory attempts and possibly empty input."],["Explain suitability","Connect a loop property to the specific problem."],["Check combined limits","Use a continuation rule that stops as soon as either ending condition holds."]],
},
{
  title:"Procedures and parameter passing",
  subtitle:"Define reusable actions and trace the effects of value and reference parameters.",
  guidingQuestion:"Does the call need a copy of a value or permission to update the caller's variable?",
  diagnostic:{prompt:"A procedure changes a BYVAL integer parameter. Must the caller's variable change?",answer:"No. The parameter holds a copy; changing that copy does not change the caller's integer."},
  units:[
    unit("PROCEDURE-CALL","Define and call procedures",ids(6,1,2,3),[
      "A procedure groups statements that perform an action. Use it for a responsibility such as displaying a heading or updating a total when no function result is required in an expression. Define it with PROCEDURE Name(parameters) and ENDPROCEDURE; invoke it with CALL Name(arguments). A definition alone does not execute the body.",
      "A procedure can take no parameters, one parameter or several parameters. Heading() needs none, Show(Value) receives one value, and Add(Total, Amount) receives two. State each formal parameter's type and preserve the declared order at the call. Empty parentheses remain in a no-parameter definition and call.",
    ],table("Procedure interfaces",["Procedure","Interface","Call"],[["Heading","No parameters; displays a title","CALL Heading()"],["Show","One INTEGER passed by value","CALL Show(Score)"],["Add","INTEGER Total by reference; Amount by value","CALL Add(Score, 3)"]]),"Do not assign the result of a procedure call; a procedure does not supply a function return value.","What triggers Heading's body?","CALL Heading(), rather than the definition being encountered.",worked("procedures","Use procedures with zero, one and two parameters","The outputs are Results, 10 and 13. Add changes Score from 10 to 13.")),
    unit("BYVAL-BYREF",
      "Trace parameter passing",
      ids(6,4,5),
      [
        coreTable("Choose the parameter mode", ["Rule", "BYVAL", "BYREF"], [
          ["What is passed", "A copy of the argument's value; this is the default mode", "A reference to the caller's variable"],
          ["Assigning to the parameter", "Changes the local copy only", "Changes the caller's variable"],
          ["Permitted argument", "A suitable value, variable or expression", "An assignable variable of the required type"]
        ]),
        coreParagraph("Use reference passing for data the procedure is intended to update. A literal such as 5 or a temporary expression cannot supply a BYREF variable.", "Choose by the intended effect"),
        coreParagraph("Trace the local view and caller state separately. The value printed inside a BYVAL procedure does not establish that its caller has changed.", "Trace both sides of the call")
      ],
      mechanismVisual("passing"),
      "A display of 7 inside a BYVAL procedure does not show that the caller changed.",
      "Can CALL ChangeOriginal(5) supply a BYREF integer parameter?",
      "No. The argument must be a variable whose stored value can be updated.",
      worked("passing","Observe local and caller values","ChangeCopy displays 7 but the caller still displays 5; ChangeOriginal then changes the caller to 7.")),
  ],
  practice:[
    q(9,1,"Write a procedure Banner() that outputs \"Welcome\", and write its call. Explain why a procedure is suitable.",ids(6,1,2,3),["Use PROCEDURE Banner(), OUTPUT \"Welcome\" and ENDPROCEDURE.","Invoke it with CALL Banner(); the required action is a display rather than a returned expression value."],"Keep the definition and invocation distinct."),
    q(9,2,"State all three outputs of the supplied parameter-passing program. Explain why the second output differs from the first.",ids(6,4,5),["The output sequence is 7, 5, 7.","ChangeCopy modifies only its BYVAL parameter; Number remains 5 until the BYREF call."],"Follow the caller's storage separately from the copied parameter.",supplied("passing")),
    q(9,3,"Write a procedure Increase(BYREF Total : INTEGER, BYVAL Amount : INTEGER) that adds Amount to Total. Write a call that adds 4 to caller variable Score.",ids(6,1,3,4,5),["The procedure body is Total <- Total + Amount, closed with ENDPROCEDURE.","CALL Increase(Score, 4) updates Score through the first parameter while passing the second argument by value."],"The position of the reference argument determines which caller variable changes."),
  ],
  authoredExamQuestions:[
    e(9,1,"Explain why BYVAL is suitable for a procedure parameter Limit that is used only to print a warning threshold. State whether a literal argument 50 is permitted and why.",ids(6,2,4),["The procedure needs the threshold's value and is not intended to change the caller's threshold.","BYVAL supplies a copy and prevents assignments to the parameter from updating the caller's scalar variable.","A literal 50 is permitted for an INTEGER value parameter because it can be evaluated and copied."],"Discuss parameter copying rather than RETURN or OUTPUT syntax."),
    e(9,2,"Write a procedure Clear(BYREF Count : INTEGER) that sets its parameter to zero. Caller variable Items starts at 12. Write a call and state Items afterwards; explain why a BYVAL version would give a different caller result.",ids(6,1,3,4,5),["PROCEDURE Clear(BYREF Count : INTEGER) contains Count <- 0 and ENDPROCEDURE.","CALL Clear(Items) leaves Items as 0.","A BYVAL version would change only the copy and leave Items as 12."],"Pass Items as a variable, not the literal 12."),
    e(9,3,"A procedure Move(BYREF Position : INTEGER, BYVAL Distance : INTEGER) executes Position <- Position + Distance. Cursor starts at 7. State the effect of CALL Move(Cursor, 2), identify the argument matched to each parameter, and explain why CALL Move(7, 2) is invalid.",ids(6,3,4,5),["Cursor supplies Position by reference and 2 supplies Distance by value.","Cursor becomes 9.","Literal 7 cannot provide caller storage for the BYREF Position parameter."],"A numeric value alone is insufficient for a reference argument."),
  ],
  summary:[["Define an action","Use PROCEDURE/ENDPROCEDURE and invoke it with CALL."],["Match the interface","Keep argument order, types and passing modes consistent."],["Trace the caller","BYVAL changes a copy; BYREF can update the caller's variable."]],
},
{
  title:"Functions, interfaces and return values",
  subtitle:"Define typed results and use function calls inside expressions.",
  guidingQuestion:"What value does the function deliver back to its caller?",
  diagnostic:{prompt:"A function outputs a number but has no RETURN statement. Has it supplied that number as its result?",answer:"No. OUTPUT displays a value; RETURN supplies the function result to the calling expression."},
  units:[
    unit("FUNCTION-RETURN","Define and use a returned value",ids(7,1,2,3,4),[
      "A function is a subprogram that returns a value. Its header uses FUNCTION Name(parameters) RETURNS DataType and its body uses RETURN Expression, ending with ENDFUNCTION. The returned expression must match the declared result type, and every reachable result path must supply a return value.",
      "Call a function where its result is needed: in an assignment, condition, output or another expression. Total <- Price + Tax(Price) adds the returned tax to the original price. Do not prefix a function call with CALL; that keyword invokes a procedure. Function parameters use value passing in this Cambridge notation.",
    ],table("Value flow through a function",["Stage","Tax calculation at Price 50"],[["Call","Tax(Price) receives 50"],["Evaluation","Price * 0.20 gives 10"],["Return","RETURN sends 10 to the caller"],["Use","Price + Tax(Price) gives 60"]]),"RETURNS declares a result type; RETURN supplies an actual result during execution.","Why is Tax suitable as a function?","The caller needs the calculated tax value in a larger expression.",worked("tax","Use a function result in a calculation","Input 50 causes Tax to return 10 and the caller to output 60.")),
    unit("INTERFACE","Read headers, parameters and arguments",ids(8,1,2,3,4),[
      "A subprogram interface describes how it can be called: its name, ordered formal parameters, their types and relevant passing modes, plus the result type for a function. The header records these details. A caller should be able to use the interface without depending on the internal calculation steps.",
      "A parameter is the identifier declared in the subprogram header. An argument is the value, variable or expression supplied at a call. In ValidMark(Value), Mark is the formal parameter and Value is the argument; the result is a BOOLEAN. A correct interface also needs a clear behavioural contract, such as accepting marks from zero to 100 inclusive.",
    ],table("Read the validity interface",["Term","Example"],[["Function header","FUNCTION ValidMark(Mark : INTEGER) RETURNS BOOLEAN"],["Parameter","Mark : INTEGER"],["Call and argument","ValidMark(Value); argument Value"],["Return contract","TRUE exactly for integer marks from 0 to 100"]]),"An argument and a parameter can have different names while representing the same value during a call.","What type must the calling expression expect from ValidMark?","BOOLEAN.",worked("validMark","Return a Boolean range decision","-1 and 101 return FALSE; both inclusive endpoints 0 and 100 return TRUE.")),
  ],
  practice:[
    q(10,1,"Write a function Double(Value : INTEGER) returning twice its argument, and an assignment that stores Double(6) in Result.",ids(7,1,2,3),["Use FUNCTION Double(Value : INTEGER) RETURNS INTEGER with RETURN Value * 2 and ENDFUNCTION.","Result <- Double(6) assigns 12."],"RETURN and RETURNS have different roles."),
    q(10,2,"For FUNCTION Area(Length : REAL, Width : REAL) RETURNS REAL and the call Area(3.0, Side), identify the parameters, arguments and return type.",ids(8,1,2,3,4),["Length and Width are the ordered REAL parameters.","3.0 and Side are the corresponding arguments.","The declared return type is REAL."],"The call's argument names need not repeat the header's parameter names."),
    q(10,3,"Explain why a tax calculation is suitable as a function and a print-heading action is suitable as a procedure. State how a caller uses each.",ids(7,4),["A tax function returns a numeric result for a calling expression such as Total <- Price + Tax(Price).","A heading procedure performs a display action and is invoked with CALL Heading()."],"Displaying text is different from supplying a typed result."),
  ],
  authoredExamQuestions:[
    e(10,1,"Write a function Square(Number : INTEGER) that returns Number multiplied by itself. Write an output statement using Square(4) + 1 and state the output.",ids(7,1,2,3),["The header declares RETURNS INTEGER and the body uses RETURN Number * Number.","Close with ENDFUNCTION and use OUTPUT Square(4) + 1.","The displayed result is 17."],"Use the returned value in the expression without CALL."),
    e(10,2,"A function has the header FUNCTION Discount(Price : REAL, Member : BOOLEAN) RETURNS REAL. It returns 10% of Price for a member and zero otherwise. Describe its interface and write a body that returns a value on both paths.",[...ids(7,1),...ids(8,1,2,4)],["The ordered parameters are a REAL price and a BOOLEAN membership flag; the result is REAL.","IF Member THEN RETURN Price * 0.10 supplies the member result.","ELSE RETURN 0.0 with ENDIF supplies the non-member result before ENDFUNCTION."],"Every path used as a function result needs a RETURN."),
    e(10,3,"FUNCTION ValidScore(Score : INTEGER) RETURNS BOOLEAN is called in Allowed <- ValidScore(TestMark). Identify the formal parameter, argument and receiving variable, and explain why replacing RETURN with OUTPUT inside the function would not preserve this call's behaviour.",[...ids(7,3),...ids(8,3,4)],["Score is the formal parameter and TestMark is the argument.","Allowed receives the Boolean result.","OUTPUT would display a value rather than return it for assignment to Allowed."],"The destination variable belongs to the caller, not the function interface."),
  ],
  summary:[["Return a typed result","RETURNS names the type and RETURN delivers the value."],["Use a call in an expression","The returned value participates in the caller's calculation or condition."],["Read the interface","Distinguish formal parameters, supplied arguments and the return contract."]],
},
{
  title:"Clear and efficient Cambridge pseudocode",
  subtitle:"Remove unnecessary work while preserving outputs and state changes.",
  guidingQuestion:"Can the algorithm do less work without changing its required behaviour?",
  diagnostic:{prompt:"Two versions produce the same answer for one input. Does that prove a refactoring is correct?",answer:"No. Other branches and boundary inputs may expose changed behaviour."},
  units:[
    unit("EFFICIENCY-BEFORE","Identify repeated work",ids(9,1),[
      "Efficient pseudocode avoids unnecessary operations while remaining correct and understandable. Look for repeated calculations, repeated tests with unchanged operands and avoidable traversals. Meaningful identifiers and indentation support review, but a shorter line count alone does not establish fewer operations.",
      "In the example, Mark is read once and is not changed between two identical Mark >= 50 tests. The first test increments Count and the second displays Pass. Both operations can share one true branch. This reduces two comparisons to one for every run while retaining the action order and final count.",
    ],table("Before combining the conditions",["Input","Comparisons","Observable results"],[["Mark 49","2","Count output 0"],["Mark 50","2","Pass, then count 1"]]),"A repeated-looking expression is not redundant if its input has changed between evaluations.","Which value must stay unchanged for these two tests to be combined?","Mark.",worked("repeated","Inspect the original repeated tests","49 outputs only 0; 50 outputs Pass and then 1. Each run tests the same unchanged mark twice.")),
    unit("EFFICIENCY-AFTER","Refactor and check behavioural equivalence",ids(9,1),[
      "Move both pass-only actions inside one IF Mark >= 50 block, keeping Count's initialisation before the decision and OUTPUT Count afterwards. A failed mark then skips both actions, just as in the original. A passing mark increments before displaying Pass, preserving the observable sequence.",
      "Compare original and revised versions for below-boundary, boundary and above-boundary inputs. Check outputs and updated values, not merely whether execution finishes. Reusable functions can also centralise a rule such as ValidMark, but a function call is not automatically a speed improvement; measure the operation or duplication that the change actually removes.",
    ],table("After combining the conditions",["Input","Comparisons","Required equivalence"],[["49","1","Same count 0"],["50","1","Same Pass then 1"],["80","1","Same Pass then 1"]]),"Moving OUTPUT Pass outside the IF would print it for failed marks.","What specific work has the revised version removed?","One repeated comparison per execution.",worked("factored","Use one decision for the shared actions","The revised code preserves both output paths while evaluating the threshold once.")),
  ],
  practice:[
    q(11,1,"Explain why the two Mark >= 50 tests in the supplied program are redundant, and state a condition under which combining them would be unsafe.",ids(9,1),["Mark is unchanged between the identical comparisons, so their truth values must agree.","Combining would need reconsideration if intervening code changed Mark or the required order of effects."],"Check state dependencies before removing a repeated condition.",supplied("repeated")),
    q(11,2,"Write a revised version of the supplied repeated-test program to use one threshold comparison while preserving outputs. State the output for Mark 50.",ids(9,1),["Put Count <- Count + 1 and OUTPUT \"Pass\" in the same true branch.","Leave Count initialisation before the IF and final count output after it.","Mark 50 outputs Pass and 1."],"Preserve actions on both the passing and failing paths.",{...supplied("repeated"),...solution("factored")} ),
    q(11,3,"A loop computes Width * Height on every iteration although neither variable changes. Explain when the product can be calculated once before the loop and give the benefit.",ids(9,1),["If the product is needed and both operands remain unchanged, calculate Area <- Width * Height before repetition and reuse Area.","This avoids repeating the multiplication for each iteration."],"Do not move a calculation ahead of inputs needed to evaluate it."),
  ],
  authoredExamQuestions:[
    e(11,1,"A program traverses the same 30 already stored marks once to find their total and again to count marks at least 50. Describe how one traversal can produce both results and state the reduction in element visits. Include the required initialisation.",ids(9,1),["Set Total and Passed to zero before traversal.","For each mark, add it to Total and increment Passed only if the mark is at least 50.","The visit count falls from 60 to 30 while both results are accumulated."],"Do not reset accumulators inside the traversal."),
    e(11,2,"A loop handles ten parcels. Inside it, Charge <- Weight * Rate uses the current parcel's Weight; Rate stays fixed. A proposed optimisation moves the full multiplication outside the loop. Explain why it is wrong and describe what could safely remain outside.",ids(9,1),["Weight changes between parcels, so one stored product would not give each parcel's correct charge.","Obtain or define the fixed Rate outside, but calculate Weight * Rate after reading each parcel's Weight."],"A fixed multiplier does not make a changing product invariant."),
    e(11,3,"A pupil replaces IF Mark >= 50 THEN Count <- Count + 1; OUTPUT \"Pass\" ENDIF with IF Mark > 50 THEN Count <- Count + 1 ENDIF followed by OUTPUT \"Pass\". Identify two behavioural changes and choose inputs that expose them.",ids(9,1),["Mark 50 no longer increments Count because >= was changed to >.","A failing value such as 49 now outputs Pass because the display moved outside the IF.","Testing 49 and 50 distinguishes the changed false path and changed boundary."],"Reducing or rearranging statements must retain both conditions and side effects."),
  ],
  summary:[["Find avoidable work","Check repeated operations and unchanged inputs."],["Preserve behaviour","Keep the same results, effects and output order on every path."],["State a concrete improvement","Count removed comparisons, calculations or element visits."]],
},
{
  title:"Writing complete program fragments",
  subtitle:"Integrate validation, a returned decision and reference updates in one complete marks program.",
  guidingQuestion:"Do the design, subprogram interfaces and final program implement the same marking rules?",
  diagnostic:{prompt:"The input sequence is -1, 0, 50, 101, 100. How many valid marks should a three-mark program record?",answer:"Three: 0, 50 and 100. The invalid attempts -1 and 101 must not update the totals."},
  units:[
    unit("INTEGRATED-DESIGN","Turn the complete design into responsibilities",ids(1,1),[
      "Implement this structured English: initialise Total and Passed to zero; obtain three valid integer marks, accepting the interval zero to 100 inclusive; for each accepted mark add it to Total and increase Passed when it is at least 50; finally output the mean and pass count. Incorrectly typed inputs are outside this task's assumptions.",
      "Separate deciding validity from updating the accumulated results. The main program controls the number of accepted marks, the validation function answers a Boolean question, and the recording procedure performs the updates. All three parts must use the same interval, threshold and accepted-mark count.",
    ],table("Responsibilities for one consistent scenario",["Component","Input or state","Contract"],[["Main program","Three accepted marks","Repeat input as needed; output mean and Passed"],["ValidMark function","One INTEGER Mark","Return whether 0 <= Mark <= 100"],["RecordMark procedure","Mark, Total, Passed","Add valid Mark; count it if at least 50"]]),"Three attempts are not necessarily three accepted marks.","Should an invalid attempt consume one of the three accepted-mark slots?","No. Repeat that slot's input until it is valid."),
    unit("INTEGRATED-CONTROL","Nest validation inside the known count",ids(4,1,3,5),[
      "Use a FOR loop for the three accepted-mark slots. Inside each iteration, use REPEAT to obtain at least one attempt and UNTIL ValidMark(Mark) to finish validation. Only then call RecordMark. The nested input loop may repeat many times while the outer loop still advances once per accepted mark.",
      "The pass comparison belongs to the recording action after validation. With inputs -1, 0, 50, 101, 100, the accepted values are 0, 50 and 100. Their sum is 150, their mean is 50 and two satisfy the inclusive pass threshold. Output the mean and count after all accepted marks have been recorded.",
    ],table("Trace accepted slots",["Outer slot","Attempts","Accepted mark","Total / Passed afterwards"],[[1,"-1, 0","0","0 / 0"],[2,"50","50","50 / 1"],[3,"101, 100","100","150 / 2"]]),"Updating Total inside validation would include rejected attempts.","Where is the mean calculated?","After the outer FOR loop, using Total / 3."),
    unit("INTEGRATED-INTERFACES","Connect the subprograms and verify the result",[...ids(6,1,2,3,4,5),...ids(7,1,2,3,4)],[
      "ValidMark takes its INTEGER argument by value and returns a BOOLEAN used by UNTIL. RecordMark receives Mark by value, because it only reads that mark, and Total and Passed by reference, because it must update the caller's accumulators. The order at CALL RecordMark(Mark, Total, Passed) matches the header.",
      "Read the complete program from definitions through initialisation, repetition and final output. Test all failing marks, all passing marks and rejected attempts followed by valid boundaries. A correct return condition is (Mark >= 0) AND (Mark <= 100); using equality at zero would reject every other valid mark.",
    ],table("Interface and state checks",["Case","Expected final results"],[["49, 49, 49","Mean 49; Passed 0"],["100, 100, 100","Mean 100; Passed 3"],["-1, 0, 50, 101, 100","Mean 50; Passed 2"]]),"Passing Total and Passed by value would discard each recording update on return.","Why does RecordMark use BYVAL for Mark but BYREF for Total?","It reads Mark without changing it, but must update the caller's accumulated Total.",worked("integrated","Complete the validated marks program","Invalid inputs are retried; only three accepted marks contribute to the mean and pass count.")),
  ],
  practice:[
    q(12,1,"Using the integrated design in this lesson, write the main program's control outline from accumulator initialisation to final output. Explain why RecordMark must follow the validation loop.",[...ids(1,1),...ids(4,3,5)],["Initialise Total and Passed, then use FOR for three accepted-mark slots.","Within each slot, REPEAT INPUT Mark UNTIL ValidMark(Mark), then call RecordMark.","After the FOR loop output Total / 3 and Passed; calling after validation excludes rejected attempts."],"Keep the inner loop's attempts separate from the outer accepted count."),
    q(12,2,"Calculate the results of the integrated program for attempts 20, -5, 60, 80. State accepted marks, final Total, mean and Passed.",ids(4,1,3,5),["The accepted marks are 20, 60 and 80; -5 is retried.","Total is 160 and the mean is 160 / 3 (approximately 53.33).","Passed is 2 because 60 and 80 meet the threshold."],"The rejected attempt does not alter the accumulators."),
    q(12,3,"Write the ValidMark and RecordMark definitions required by the integrated design. Explain the return type and each parameter mode.",[...ids(6,1,2,3,4,5),...ids(7,1,2,3,4)],["ValidMark returns BOOLEAN using the inclusive 0-to-100 test; its INTEGER mark is passed by value.","RecordMark reads Mark by value and receives Total and Passed by reference.","The procedure adds Mark to Total and increments Passed only for Mark >= 50."],"RETURN supplies the validity decision; reference parameters carry the updates.",solution("integrated")),
  ],
  authoredExamQuestions:[
    e(12,1,"Write pseudocode for this new design: read exactly two valid integer ratings from 1 to 5; retry an invalid rating; output the sum of the two accepted ratings. Include declarations and explain the two loop choices.",[...ids(1,1),...ids(4,3,5)],["Declare Index, Rating and Total as INTEGER and initialise Total to zero.","Use FOR Index <- 1 TO 2 because there are two accepted ratings.","Within it use REPEAT INPUT Rating UNTIL (Rating >= 1) AND (Rating <= 5), because an attempt precedes checking.","Add each accepted Rating to Total and output Total after NEXT Index."],"Do not end after two attempts if either attempt was invalid."),
    e(12,2,"Write a function Accepted(Length : INTEGER) returning TRUE for lengths from 10 to 20 inclusive, and a procedure CountLength(BYVAL Length : INTEGER, BYREF Count : INTEGER) that increments Count only when Accepted(Length) is TRUE. Include the function call in the procedure's condition.",[...ids(4,1),...ids(6,1,3,4,5),...ids(7,1,2,3)],["Accepted declares RETURNS BOOLEAN and returns (Length >= 10) AND (Length <= 20).","CountLength uses IF Accepted(Length) THEN Count <- Count + 1 ENDIF.","Both definitions are closed correctly; Count is updated by reference while Length is only read."],"A Boolean-returning function can be used directly as an IF condition."),
    e(12,3,"A caller sets Total <- 0 and uses CALL AddReading(4, Total) then CALL AddReading(6, Total). The procedure AddReading(BYVAL Reading : INTEGER, BYVAL Sum : INTEGER) contains Sum <- Sum + Reading. State the final caller Total, correct the interface so the intended total is accumulated, and explain the corrected result.",ids(6,1,3,4,5),["The original caller Total remains 0 because Sum is a copy in each call.","Change Sum to BYREF while keeping Reading BYVAL.","The corrected calls update Total first to 4 and then to 10."],"Local changes vanish from the caller's perspective when a scalar accumulator is passed by value."),
  ],
  summary:[["Keep one consistent design","The input rules, accepted count and thresholds agree across all parts."],["Place updates after acceptance","Validation retries do not consume a slot or change totals."],["Connect results correctly","Functions return decisions; reference parameters update caller state."]],
},
];

export function authorSection11Lesson(source) {
  if (source.section === 11) {
    const authored = lessons[source.originalLesson - 69];
    if (!authored) throw new Error(`Missing S11 lesson ${source.originalLesson}`);
    const taught = new Set(authored.units.flatMap(u=>u.objectiveIds));
    const objectives = [...taught].map(id=>{
      const row=source.objectives.find(([candidate])=>candidate===id);
      if(!row)throw new Error(`Unknown S11 objective ${id}`);
      return row;
    }).map(([id,text])=>[id,
      id==="S11.03.A02" ? "Use an unfamiliar routine from its supplied interface and definition." :
      id==="S11.03.A03" ? "Apply the supplied definitions of string manipulation functions." : text]);
    return {...source,...authored,objectives,summaryMode:"authored",
      teachingCheckpoints:["Use the opening diagnostic to check prerequisite understanding.","Trace the worked example, then attempt each knowledge-point check before revealing its answer.","Complete the practice tasks before the independent exam-style tasks; compare the supplied rules, outputs and marking points."],
      sources:["Cambridge 9618 2027–2029 syllabus, sections 11.1–11.3: https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf","Cambridge 9618 2027–2029 pseudocode guide: https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf","Original teaching examples, questions and marking guidance."],
    };
  }
  if (source.kind !== "review" || source.paper !== 2) return source;
  const r = (...ns)=>ns.map(n=>`S11.${String(n).padStart(2,"0")}.R`);
  const review = unit("REVIEW","Section 11: Programming",r(1,2,3,4,5,6,7,8,9),[
    "Translate the stated rules into declarations, expressions and correctly placed control structures. Read supplied routine interfaces before calling them. A complete solution defines values before use, respects condition boundaries and makes progress toward the stopping condition.",
    "Connect subprograms through arguments, returned values and intentional reference updates. In this review, a parking session costs 3 per whole hour; positive integer hours are entered until sentinel zero. A charge function returns each fee and an accumulation procedure updates the running total. The first input may already be zero.",
  ],table("Programming review checks",["Part","Question to resolve"],[["Design and data","Are all inputs, initial values and calculations explicit?"],["Control","Is zero input handled and is the sentinel excluded?"],["Subprograms","Do types, argument order, RETURN and BYREF agree?"],["Efficiency","Is each session's charge calculated and added once?"]]),"A sentinel is a stopping signal and must not become an extra charged session.","Why does this program use WHILE rather than a fixed-count FOR?","The number of sessions is unknown and may be zero.",worked("review","Combine a charge function and accumulation procedure","Inputs 2, 1, 0 produce 9; input 0 alone produces 0."));
  review.syllabusId="REVIEW-2-3";
  review.summary=["Section 11: Programming","Translate designs; control repetition and selection; use supplied routines, typed returns and deliberate reference updates; remove unnecessary work without changing results."];
  const practice=[
    question("REV-P2-S11-Q1","Write the parking algorithm described in this review. Include INTEGER declarations, zero initialisation, input until sentinel 0 and final output. Justify the loop and state the output for 2, 1, 0.",r(1,2,4,5),["Define Hours and Total, initialise Total to zero and read Hours before the first test.","WHILE Hours <> 0 processes each positive session and obtains the next input; it permits zero sessions.","Add three times each session's hours and output Total after the loop; the given result is 9."],"Process each value before reading the next, and exclude zero as a session.",solution("review")),
    question("REV-P2-S11-Q2","For the supplied parking program, identify each subprogram's parameters, argument types and result or effect. Explain how Charge(Hours) can be an argument to AddCharge.",r(6,7,8),["Charge receives INTEGER Hours by value and returns an INTEGER fee.","AddCharge receives INTEGER Amount by value and INTEGER Total by reference to update the caller.","Charge(Hours) is evaluated first; its returned integer supplies the Amount argument."],"A nested function call supplies a value, not a reference destination.",supplied("review")),
    question("REV-P2-S11-Q3","A supplied function LEFT(Text : STRING, Count : INTEGER) returns the first Count characters. A session code is \"PARK204\". State LEFT(\"PARK204\", 4). A proposed program calculates Hours * 3 twice for the same unchanged Hours, once to display the fee and once to add it. Describe an efficient correction that preserves both actions.",r(3,9),["The function returns \"PARK\".","Calculate Fee <- Hours * 3 once, then display Fee and add that same Fee to Total."],"Eliminate the repeated calculation while retaining both required uses."),
  ];
  return {...source,units:source.units.map(u=>u.heading.startsWith("Section 11:")?review:u),practice:[...source.practice.filter(p=>!p.objectiveIds?.some(id=>id.startsWith("S11."))),...practice]};
}
