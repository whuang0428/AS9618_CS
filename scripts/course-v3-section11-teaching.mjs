import { coreParagraph as p, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { codeFor } from './course-v3-section11-programs.mjs';
import { section11Visuals } from './course-v3-section11-diagrams.mjs';

const lessonIds = (requirement, ...items) => items.map(n => `S11.${String(requirement).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const materialTable = (title, headers, rows) => ({ type:'table', title, headers, rows, preserve:true });
const example = (programKey, title, requirements, result) => ({
  type:'worked-example', title, programKey,
  steps:[['Requirements and starting conditions', requirements], ['Cambridge pseudocode', codeFor(programKey)], ['Expected result', result]],
});
const extension = (title, explanation, materials = []) => ({ title:`Optional extension: ${title}`, explanation, materials });
const entry = (headings, blocks, essentials) => ({ headings, blocks, essentials });

// Each entry turns the introductory explanation into detailed teaching, followed
// by a short recap. Exact programs and additional traces are attached below.
export const section11Teaching = {
  'TRANSLATE-ENGLISH':entry(['Read the complete contract', 'Place each action at the correct level'], [
    steps('Build the translation in dependency order', [
      ['Identify the data', 'Value is the current INTEGER input. Index identifies which input is being processed; Count counts only positive inputs. Their meanings differ even though both counters are integers.'],
      ['Establish starting state', 'Set Count to 0 once. No positive input has been seen at the start. Declaring Count does not establish that value.'],
      ['Translate one repeated responsibility', 'Obtain a fresh Value, test Value > 0 and increment Count only on TRUE. Complete all three inputs, including non-positive ones.'],
      ['Place the final report', 'Output Count after repetition. The requirement asks for one completed count, not three intermediate counts.'],
    ]),
    p('Changing the input values is a useful way to challenge the translation. All non-positive values must leave Count at zero; three positive values must give three. A zero input is data, not a stopping signal in this task. A sentinel would need to be explicitly specified.', 'Check the meaning as well as the notation'),
    p('The basic constructs are introduced in Lesson 053; Lessons 073 and 076–078 explain their precise statement forms. Here the supplied design determines which operations belong together. Do not invent new validation rules or outputs while translating it.', 'Use the design boundary'),
  ], ['Translate the stated input, processing and output without changing the rules.', 'Initialise once, preserve every branch and place repeated actions inside the correct loop.']),
  'TRANSLATE-FLOWCHART':entry(['Read each directed edge', 'Check the repeated and final paths'], [
    table('Map this graph to the direct WHILE implementation', ['Graph operation', 'Code responsibility'], [
      ['Initialisation', 'Count <- 0; Index <- 1 before WHILE.'],
      ['Index <= 3 decision', 'TRUE enters the loop; FALSE reaches OUTPUT Count.'],
      ['Value > 0 decision', 'Only the TRUE branch increments Count.'],
      ['The two branches rejoin', 'Index <- Index + 1 runs after ENDIF, on either path.'],
      ['Back edge', 'ENDWHILE returns control to the Index test.'],
    ]),
    p('After the third value, Index becomes 4. The next test is FALSE, so no fourth input is read. Moving the Index update inside the positive branch would mean a non-positive input fails to advance the processed-input count.', 'Explain the exit'),
    p('The previous unit expresses the known three inputs with FOR. The direct WHILE version below makes the graph’s initialisation, test and update explicit. Compare their consumed inputs, decisions and final output. This does not require an assumption about the FOR control variable after the loop has ended.', 'Recognise an equivalent representation'),
  ], ['Preserve both outcomes, the back edge and the path to the final output.', 'A loop update outside the inner IF executes after either branch.']),
  'DECLARE':entry(['Choose names and types', 'Give constants literal values'], [
    table('Separate three responsibilities', ['Statement', 'What it establishes', 'What it does not establish'], [
      ['DECLARE Total : REAL', 'A variable name and permitted data type.', 'No initial numeric value.'],
      ['Total <- 0.0', 'The current value of the declared variable.', 'A new declaration or a permanent restriction to zero.'],
      ['CONSTANT TaxRate = 0.20', 'A fixed named value supplied by a literal.', 'A variable that can later store a different rate.'],
    ]),
    p('A meaningful name exposes a value’s role: Quantity is an INTEGER count while ProductCode is a STRING if leading zeros matter and arithmetic is not required. Lesson 058 develops the data types in full, including DATE; this lesson concentrates on using declarations correctly in programs.', 'Choose from the meaning of the data'),
    p('A constant avoids repeating an unexplained literal throughout a program. Changing its declaration for a different version updates all uses of the name. In Cambridge pseudocode, CONSTANT DoubleRate = TaxRate * 2 is not a valid constant declaration: only a literal is allowed on its right side.', 'Distinguish a fixed value from a computed value'),
  ], ['DECLARE gives a variable its type; initialise it before reading its value.', 'Use CONSTANT Name = Literal; quoted STRING, quoted CHAR and BOOLEAN literals are different types.']),
  'ASSIGN-IO':entry(['Evaluate before storing', 'Follow the purchase dependencies'], [
    steps('Read Quantity <- Quantity + 1', [['Read', 'Obtain the old Quantity value.'], ['Evaluate', 'Add one to that old value.'], ['Store', 'Replace Quantity with the result. The statement is an update, not a mathematical equality.']]),
    p('B <- A copies A’s value at that moment. A later assignment to A does not cause B to be recalculated. A variable on the right side must already have a value, even when it is also the destination on the left.', 'Copy a value rather than establish a link'),
    p('OUTPUT can display several values separated by commas, for example OUTPUT "Total: ", Total. The text is a label and Total supplies the current number. Output does not store a new variable. Constructing a reusable STRING with & is a separate operation taught in Lesson 075.', 'Make the report understandable'),
  ], ['Obtain all inputs before calculations that read them.', 'Assignment evaluates the right side and replaces the left-side variable; OUTPUT displays values.']),
  'ARITHMETIC':entry(['Evaluate grouped expressions', 'Separate quotient and remainder'], [
    steps('Evaluate Total <- 2 + 3 * 4', [['Multiply', '3 * 4 produces 12.'], ['Add', '2 + 12 produces 14.'], ['Assign', 'Store 14 in Total. Parentheses around 2 + 3 would instead produce 20.']]),
    table('Check a quotient and remainder', ['Minutes', 'Minutes DIV 60', 'Minutes MOD 60', 'Reconstruction'], [
      ['0', '0', '0', '0 = 0 * 60 + 0'], ['59', '0', '59', '59 = 0 * 60 + 59'],
      ['60', '1', '0', '60 = 1 * 60 + 0'], ['125', '2', '5', '125 = 2 * 60 + 5'],
    ]),
    p('For the non-negative integer quantities and positive integer divisors used here, the remainder is at least zero and less than the divisor. This gives two checks: reconstruct the original quantity and check the remainder’s range. DIV is not rounding to the nearest integer, and / may give a fractional REAL result.', 'Check the result without repeating the calculation'),
    p('All operands must be defined, and a divisor must not be zero. These examples deliberately avoid language-dependent signed-remainder conventions. For a money example, the mathematical amount and a chosen display format such as two decimal places are different requirements.', 'State the arithmetic assumptions'),
  ], ['Use parentheses to make expression grouping explicit.', 'For non-negative integers, DIV gives complete groups and MOD the remainder; / gives real division.']),
  'LOGICAL':entry(['Build complete comparisons', 'Test a range and its complement'], [
    table('Evaluate (Age >= 18) AND NOT Suspended', ['Age / Suspended', 'Age >= 18', 'NOT Suspended', 'Final result'], [
      ['17 / FALSE', 'FALSE', 'TRUE', 'FALSE'], ['18 / FALSE', 'TRUE', 'TRUE', 'TRUE'],
      ['18 / TRUE', 'TRUE', 'FALSE', 'FALSE'], ['19 / FALSE', 'TRUE', 'TRUE', 'TRUE'],
    ]),
    p('The comparison first produces a BOOLEAN. NOT reverses the suspension flag, then AND combines those two truth values. NOT should apply to the intended condition: NOT (Age >= 18 AND NOT Suspended) rejects the whole eligibility rule, not just suspension.', 'Follow intermediate Boolean results'),
    p('Write both comparisons in full. Minutes >= 0 AND <= 180 leaves the second comparison without an operand. Minutes >= 0 OR Minutes <= 180 accepts every integer: even an out-of-range value meets the other half. Lesson 056 establishes boundary reasoning; here use it inside assignments and program conditions.', 'Diagnose a plausible-looking condition'),
    p('Do not assume that AND always skips its second operand when the first is false. If an operand could divide by zero or access an invalid array index, put that operation behind a separate IF guard. Logical truth and an implementation’s evaluation strategy are different issues.', 'Keep potentially invalid operations behind a guard'),
  ], ['Comparisons produce BOOLEAN results; AND, OR and NOT combine them.', 'Test each endpoint and both outside regions; use parentheses and complete operands.']),
  'NUMERIC-FUNCTIONS':entry(['Read the routine contract', 'Build a bounded integer result'], [
    table('Follow the die expression through its stages', ['Supplied RAND(6) result', 'INT result', 'After adding 1'], [
      ['0.0', '0', '1'], ['2.75', '2', '3'], ['5.999', '5', '6'],
    ]),
    p('These selected random values illustrate the transformation; they are not predicted outputs of a fresh random call. A call returns one value. Calling RAND again requests another draw, so store a result when two later operations must use the same draw.', 'Separate a possible result from a promised result'),
    p('INT takes the integer part, rather than rounding to the nearest integer. The non-negative inputs here make the truncation and interval argument explicit. Defining your own function is taught in Lesson 081; using a supplied function only needs its interface and result contract.', 'Use the result in an expression'),
  ], ['Check the argument type, order and returned type before using a routine.', 'RAND(N) returns a REAL in [0, N); INT(RAND(N)) + 1 gives integers 1 through N for positive INTEGER N.']),
  'STRING-FUNCTIONS':entry(['Use the supplied definitions', 'Track positions and result types'], [
    table('Distinguish a start position from a count', ['Expression', 'Selected positions in ALGORITHM', 'Result'], [
      ['MID(Word, 2, 3)', '2, 3, 4', '"LGO"'], ['RIGHT(Word, 2)', '8, 9', '"HM"'], ['LENGTH(Word)', 'Count all nine characters.', 'INTEGER 9'],
    ]),
    p('A STRING of one character and a CHAR are still different declared types. Under the supplied interfaces, UCASE accepts Letter : CHAR, not Word : STRING. A digit such as \'7\' has no upper-case alternative and is returned unchanged. Space and punctuation count as characters: LENGTH("A B!") is 4.', 'Respect type and content'),
    p('For the complete program below, Word contains at least four characters and Letter is one CHAR. That makes MID(Word, 2, 3) and RIGHT(Word, 2) valid. LENGTH("") is zero, but do not apply these non-empty slices to an empty string or invent an out-of-range result.', 'Give the calls valid inputs'),
    p('An unfamiliar name such as TAKE or SLICE does not change the method: read its definition, match arguments in order, determine the return type, then use the result. String functions are supplied in examination questions; learning the interface-reading process is more useful than assuming a language’s familiar indexing rule.', 'Transfer to an unfamiliar routine'),
  ], ['For supplied MID, the third argument is a character count, not an ending position.', 'Keep STRING and CHAR types distinct; use valid positions and count spaces.']),
  'STRING-JOIN':entry(['Join text into a new value'], [
    steps('Build the label from CS2046AB', [['Extract', 'MID(Code, 3, 4) returns "2046". It is text, even though all four characters are digits.'], ['Take the suffix', 'RIGHT(Code, 2) returns "AB".'], ['Join', 'Digits & "-" & Suffix produces the new STRING "2046-AB".'], ['Store and use', 'Assign that result to Label. The source Code remains "CS2046AB"; OUTPUT Label displays the stored result.']]),
    p('The & operator joins strings exactly as supplied. It does not insert spaces or separators automatically: "Ada" & "Lovelace" produces "AdaLovelace", whereas an explicit " " preserves the gap. Joining "" adds no characters. Numeric addition uses + and has a different purpose.', 'Make every character intentional'),
    p('OUTPUT "Label: ", Label displays two values without requiring one combined variable. Label <- "Label: " & Label constructs a reusable string. Do not assume that & implicitly converts an INTEGER to STRING; use a conversion routine only when its interface has been supplied.', 'Distinguish concatenation from multiple-value output'),
  ], ['Use & to concatenate strings; include required spaces or separators explicitly.', 'Extracted digits remain STRING data; concatenation does not change the source.']),
  'IF-NESTED':entry(['Select a branch', 'Nest a decision within one branch'], [
    p('After a chosen IF branch finishes, execution continues after its matching ENDIF. An ELSE attaches to one IF, not to every earlier condition. Indentation and matching ENDIF statements make this visible; a branch that is not selected does not execute its inner tests.', 'Follow control after the branch'),
    table('Four combinations in the membership program', ['Age', 'Member', 'Inner decision reached?', 'Output'], [['17', 'FALSE', 'No', 'Junior'], ['17', 'TRUE', 'No', 'Junior'], ['18', 'FALSE', 'Yes', 'Adult visitor'], ['18', 'TRUE', 'Yes', 'Adult member']]),
    p('Two separate IF statements can both be true. That is correct when two independent actions are required, such as counting passes and counting merits. A single classification needs exclusive alternatives: test the highest threshold first, then place the lower-threshold decision in ELSE. At 85, the two programs below intentionally have different output contracts.', 'Choose independent or exclusive actions from the requirement'),
  ], ['An IF/ELSE selects one branch; separate IF statements can both execute.', 'In nested selection, the outer branch determines whether the inner decision is reached.']),
  'CASE':entry(['Select from one identifier', 'Give unmatched values a defined route'], [
    p('CASE clauses are considered in order. After the first matching clause runs, control continues after ENDCASE; later clauses are not executed. There is no fall-through and no BREAK is needed. Keep intended ranges distinct so the case order does not hide a classification mistake.', 'Explain what happens after a match'),
    table('Trace the day ranges', ['Day', 'Matched clause', 'Output'], [['0', 'OTHERWISE', 'Invalid day'], ['1 or 5', '1 TO 5', 'Weekday'], ['6 or 7', '6 TO 7', 'Weekend'], ['8', 'OTHERWISE', 'Invalid day']]),
    p('OTHERWISE must come last when it is present. Without it, a value matching no clause performs no case action and execution continues after ENDCASE. IF remains more suitable for a general Boolean rule involving several different identifiers.', 'Separate optional syntax from the task requirement'),
  ], ['Use CASE OF Identifier, labelled values or ranges, and ENDCASE.', 'Only the first matching clause runs; a final OTHERWISE handles unmatched values.']),
  'FOR-BOUNDS':entry(['Count the values used by the body', 'Place accumulation at the correct level'], [
    table('Trace the complete total program', ['Point', 'Input / control', 'Total'], [['Before the loop', 'Count = 3', '0'], ['First body', 'Index = 1; Value = 2', '2'], ['Second body', 'Index = 2; Value = 4', '6'], ['Third body', 'Index = 3; Value = 6', '12'], ['After repetition', 'Output once', '12']]),
    p('For default STEP 1, the number of body executions is End − Start + 1 when Start <= End; otherwise it is zero. With Count 0 in this program, the initial zero is still available for output and no Value input is requested. With Count 1, exactly one input contributes.', 'Derive the boundary behaviour'),
    p('The control variable and bounds are INTEGER values. Do not assign another value to the control variable inside the loop; let FOR and NEXT manage it. A trace should record the values used in the body and not depend on an unspecified final counter value after loop termination.', 'Keep loop control separate from data'),
  ], ['FOR uses every reachable value within inclusive bounds; default STEP is 1.', 'Initialise totals before, obtain each input inside, and report the completed result after the loop.']),
  'FOR-STEP':entry(['Choose a direction and step', 'Check whether the endpoint is reached'], [
    table('Follow the last step', ['Header', 'Body values', 'Next candidate and decision'], [['2 TO 8 STEP 3', '2, 5, 8', '11 is above 8: stop.'], ['5 TO 0 STEP -2', '5, 3, 1', '-1 is below 0: stop.'], ['0 TO 5 STEP -1', 'None', 'The starting value is already outside the descending range.']]),
    p('An inclusive bound permits the endpoint; it does not force the sequence to land on it. Determine direction, list the first few values, and inspect the final candidate before counting iterations. STEP 0 provides no progress and is unsuitable for a terminating count-controlled loop.', 'Reason from successive values'),
  ], ['STEP changes the control value by the stated integer amount; negative steps descend.', 'Stop before crossing the bound; the endpoint is visited only when the step reaches it.']),
  'FOR-NESTED':entry(['One complete inner loop belongs to each outer iteration'], [
    p('Each time execution reaches the inner FOR header, Column starts at 1 again. After (1,3), NEXT Column finishes that inner loop; NEXT Row advances Row, and the next inner loop begins at (2,1). There are two complete groups of three outputs, not one run of three outputs shared between both rows.', 'Trace the boundary between groups'),
    p('Count is reset once before both loops because it measures all body executions. A separate per-row count would instead be reset just inside the outer loop. This placement principle is the same one used for row and column totals in Lesson 062; no array is needed to understand the control flow here.', 'Connect the counter to what it counts'),
  ], ['Complete the inner loop before advancing the outer loop.', 'Each new outer iteration restarts the inner loop; reset state at the level of the required result.']),
  'REPEAT':entry([], [
    table('Follow integer attempts −1, 101, 100', ['Attempt read', 'Lower bound met?', 'Upper bound met?', 'UNTIL result / next action'], [['-1', 'FALSE', 'TRUE', 'FALSE: read again.'], ['101', 'TRUE', 'FALSE', 'FALSE: read again.'], ['100', 'TRUE', 'TRUE', 'TRUE: leave the loop and output 100.']]),
    p('The condition uses the value just obtained in the body. If the first input is 0, both comparisons are true on the first test and only one read occurs. If no valid integer is ever supplied, the program continues requesting input; a stopping guarantee would need an additional attempt limit.', 'State what makes the loop finish'),
    p('A range check establishes whether an integer is allowed; it does not establish whether the original real-world mark was entered accurately. Nor does this integer-input example handle text typed in place of a number.', 'Keep validation within its stated purpose'),
  ], ['REPEAT executes before testing; UNTIL TRUE ends repetition.', 'Obtain a fresh attempt inside the loop and make the stopping condition express acceptance.']),
  'WHILE':entry([], [
    table('Follow sentinel input 3, 4, −1', ['Value before test', 'Value <> -1', 'Action', 'Total'], [['3', 'TRUE', 'Add 3; read 4.', '3'], ['4', 'TRUE', 'Add 4; read -1.', '7'], ['-1', 'FALSE', 'Skip the body; output Total.', '7']]),
    p('A sentinel is a value reserved to signal the end. This task permits integers other than -1 as data, including zero; if -1 itself needed to be ordinary data, the input contract would need another ending mechanism. Read the next value on every processed path, even when a later version filters some data out.', 'Separate a stopping signal from a data value'),
    p('For text files, the comparable pre-condition is NOT EOF before READFILE, as in Lesson 065. The keyboard priming input used here should not be copied blindly into a file algorithm: an empty file must be checked before its first read.', 'Connect the loop form without confusing input sources'),
  ], ['WHILE tests before the body and may execute zero times.', 'Define the condition data before the first test and update it on every continuing path.']),
  'LOOP-CONDITIONS':entry([], [
    steps('Preserve a sentinel algorithm when changing the loop form', [['Read first', 'Read Value before either form so the first sentinel can mean no data.'], ['Guard REPEAT', 'Only enter REPEAT when Value <> -1; this preserves the zero-body path.'], ['Process and update', 'Add the current data value, then obtain the next one.'], ['Reverse the test meaning', 'UNTIL Value = -1 ends processing. Both programs output Total once afterwards.']]),
    p('The complete alternative below consumes the same inputs and reports the same totals as the WHILE example. Negating the condition is only one part of the conversion: the first-execution rule, input placement and final output must also be preserved.', 'Compare observable behaviour'),
  ], ['WHILE TRUE continues; UNTIL TRUE stops.', 'Changing loop form must preserve the zero-iteration path, data updates and output placement.']),
  'LOOP-CHOICE':entry(['Start with the input and stopping contract', 'Explain suitability in context'], [
    table('Turn a property into a justification', ['Problem property', 'Loop property', 'Reasoned choice'], [['Exactly seven readings', 'FOR expresses a known count.', 'One new reading per iteration gives exactly seven.'], ['An option must be entered before checking it', 'REPEAT executes at least once.', 'The first attempt supplies the value for validation.'], ['The first item may already be the sentinel', 'WHILE can skip its body.', 'No data is processed when the first test is false.']]),
    p('Distinguish attempts from accepted data. Three accepted ratings may require five attempts. A FOR for three accepted slots can contain a REPEAT for each slot’s attempts. A FOR for only three raw attempts would implement a different contract.', 'Choose the quantity that is controlled'),
  ], ['Justify a loop by the known count, required first attempt or possible empty input.', 'Explain necessary setup for alternatives; do not claim only one loop can ever work.']),
  'LOOP-BOUNDED':entry(['Maintain both continuation requirements', 'Compare equivalent stopping rules'], [
    table('Check both reasons to stop', ['After input', 'Wrong password?', 'Attempts < 3?', 'WHILE continues?'], [['open on attempt 1', 'FALSE', 'TRUE', 'No: success.'], ['y on attempt 2', 'TRUE', 'TRUE', 'Yes.'], ['open on attempt 3', 'FALSE', 'FALSE', 'No: success at the limit.'], ['z on attempt 3', 'TRUE', 'FALSE', 'No: attempt limit.']]),
    p('Using OR in the continuation condition would allow one true half to override the other stopping event: a correct first attempt could still be followed by another prompt, or a wrong third attempt could be followed by a fourth. Success OR exhausted attempts is instead the corresponding stopping condition.', 'Explain the connector from the rule'),
    p('For this task at least one attempt is allowed. REPEAT therefore avoids the artificial initial Password value used by WHILE: input supplies Password before UNTIL tests it. Both complete versions count the successful input and stop at the same point. If a prior lock state could prohibit all attempts, a pre-condition or an outer guard would be needed.', 'Compare complete solutions rather than isolated headers'),
  ], ['Continue only while the password is wrong AND attempts remain.', 'Count every attempt; the equivalent stopping rule is success OR the limit reached.']),
  'PROCEDURE-CALL':entry(['Give an action one responsibility', 'Separate the definition from its calls'], [
    steps('Follow a procedure call', [['Reach CALL', 'The main program reaches CALL Heading(). The definition itself has not printed anything.'], ['Enter the body', 'Control transfers to Heading and OUTPUT prints Results.'], ['Finish the action', 'ENDPROCEDURE completes this invocation.'], ['Resume the caller', 'Continue at the next statement after CALL, not at the beginning of the main program.']]),
    p('Use a procedure when the caller requests an action, such as displaying a heading or updating a running total. Reusing one body avoids copying that action at each call site and gives one place to maintain it. That is a clarity and maintenance benefit; the call itself does not prove faster execution.', 'Explain when a procedure helps'),
    p('The interface in the next unit states which data an action receives. A procedure may have no parameters, one, or several. It does not provide a function result for an expression, but it may display output or deliberately update a caller variable through a reference parameter.', 'Keep three kinds of effect distinct'),
  ], ['Define with PROCEDURE … ENDPROCEDURE; invoke with CALL Name(arguments).', 'Control returns to the next caller statement; a procedure supplies an action, not a function result.']),
  'PARAMETER-INTERFACE':entry(['Read the interface before making the call'], [
    table('Match CALL Add(Score, 3)', ['Interface item', 'At definition', 'At this call'], [['Name', 'Add', 'Add selects the procedure.'], ['First formal parameter', 'BYREF Total : INTEGER', 'Score supplies caller storage.'], ['Second formal parameter', 'BYVAL Amount : INTEGER', '3 supplies a value.'], ['Intended effect', 'Add Amount to Total.', 'Increase Score by 3.']]),
    p('A formal parameter is the name declared in a subprogram header. An argument is the value, variable or expression supplied by the caller. The names need not be the same. Match the number, order, types and modes: Total receives the first argument because of its position, not because the caller must name its variable Total.', 'Introduce the terms at the point of use'),
    p('The header records the name and typed parameter list. The interface also needs the intended behaviour: Add increases Total by Amount, rather than setting it to Amount or printing it. A caller can use that contract without depending on the internal statements.', 'A valid type is not the whole contract'),
    p('Heading() has an empty parameter list. Show(Score) supplies one argument. Add(Score, 3) supplies two. Supplying an extra argument, reversing unlike parameter roles or passing text where an INTEGER is required does not match the interface.', 'Check calls systematically'),
  ], ['A parameter is declared in the header; an argument is supplied at the call.', 'Match the number, order, types and passing modes, as well as the intended effect.']),
  'BYVAL-BYREF':entry([], [
    table('Trace the two calls in the supplied program', ['Point', 'Local Value', 'Caller Number', 'Output'], [['Before ChangeCopy', 'Not active yet', '5', 'None'], ['Inside ChangeCopy after +2', '7: a separate copy', '5', '7'], ['Back in caller', 'Copy no longer active', '5', '5'], ['Inside ChangeOriginal after +2', 'Refers to Number, now 7', '7', 'None'], ['Back in caller again', 'Reference parameter no longer active', '7', '7']]),
    p('Each call establishes its own parameters and local variables. A later call does not inherit the earlier BYVAL copy. A local name can match a caller name without sharing storage; sharing here is determined by BYREF, not spelling. This is enough scope information to trace these examples; no call-stack implementation is assumed.', 'Separate the active local environment from the caller'),
    p('In Swap, Left and Right refer to the two distinct caller variables A and B. Temp must preserve the original left value before Left is overwritten. The BYVAL variant swaps only two local copies: its internal output can look correct while the caller remains unchanged.', 'Use two reference parameters for a complete swap'),
    p('When a procedure header specifies no passing mode, assume BYVAL. A single BYVAL or BYREF marker may cover several parameters passed in that mode; a missing repeated marker does not reset the mode. The examples here write the mode for each parameter to keep the calls unambiguous. A BYREF argument must be an assignable variable of the required type, not a literal or a calculated temporary value.', 'Make reference updates intentional'),
  ], ['BYVAL copies a value; BYREF provides access to the caller’s variable.', 'Trace local values and caller state separately; use a temporary value before overwriting either side of a swap.']),
  'FUNCTION-RETURN':entry(['Define a typed result', 'Use the result at the call site'], [
    steps('Evaluate Total <- Price + Tax(Price) for Price 50', [['Read the argument', 'The caller supplies its REAL value 50 to the function parameter.'], ['Run the function', 'Tax computes 50 * 0.20, giving 10.'], ['Return', 'RETURN supplies that REAL value to the pending expression.'], ['Resume the expression', 'Replace Tax(Price) with 10, calculate 50 + 10, then assign 60 to Total.']]),
    table('Compare three different destinations', ['Operation', 'Destination', 'Meaning'], [['OUTPUT Value', 'Console', 'Display the value.'], ['RETURN Value', 'The calling expression', 'Supply the current function result and finish this call.'], ['Total <- Total + Amount through BYREF', 'Caller storage', 'Update the referenced variable.']]),
    p('RETURNS REAL describes the result type in the header; it does not perform a return. RETURN 10.0 supplies one result during execution. A function can return a number, BOOLEAN or other permitted type; the caller must use it in a compatible expression. Cambridge function parameters use value passing.', 'Separate a type promise from execution'),
  ], ['RETURNS declares the result type; RETURN supplies a value and ends the call.', 'A returned value replaces the function call inside an expression; do not prefix the call with CALL.']),
  'FUNCTION-PATHS':entry(['Every reachable result path must return a value'], [
    table('Trace Larger(A, B) + 1', ['Arguments A / B', 'First > Second', 'Returned value', 'Caller result'], [['7 / 4', 'TRUE', '7', '8'], ['4 / 7', 'FALSE', '7', '8'], ['5 / 5', 'FALSE', '5', '6'], ['-3 / -7', 'TRUE', '-3', '-2']]),
    p('For equal arguments, the ELSE branch returns Second, which still equals the required larger value. A function with only the TRUE return would leave equal or smaller first arguments without a result. Test both branches and equality, not only an example that reaches the first RETURN.', 'Account for the missing path'),
    p('RETURN acts immediately. DeliveryFee has a free result for a zero-item order; that branch returns 0.0 and the later fee formula is not evaluated. A positive Quantity skips the first RETURN and reaches the final one. Replacing RETURN with OUTPUT would print inside the function while leaving the caller without that returned result.', 'Explain an early return'),
    p('The delivery task assumes non-negative integer quantities. It is not a negative-quantity validator. A function with several RETURN statements still returns one value in a particular call: only the statement reached first can complete that invocation.', 'Keep paths and assumptions explicit'),
  ], ['Cover every possible result path, including equality and false branches.', 'After RETURN executes, later statements in that invocation are skipped.']),
  'INTERFACE':entry(['Read a function’s result contract', 'Connect arguments, parameters and destination'], [
    table('Read Allowed <- ValidMark(TestMark)', ['Identifier or expression', 'Role'], [['TestMark', 'Caller variable supplying an INTEGER argument.'], ['Mark', 'Formal parameter receiving a value copy.'], ['ValidMark(TestMark)', 'Expression producing a BOOLEAN result.'], ['Allowed', 'Caller BOOLEAN variable receiving the returned result.']]),
    p('A function may receive multiple arguments, as Larger does, or none. ReadRating() has no arguments because its body obtains its own keyboard input; the empty parentheses still identify a function call. Its returned INTEGER can be assigned to Result. Having no parameters does not mean the body performs no work.', 'Use zero, one and multiple arguments'),
    p('The no-argument example declares Rating locally, reads at least once, validates integers from 1 to 5, and returns only the accepted value. Input assumptions and the returned meaning are part of its interface. A no-argument function is a useful syntax example here, not a requirement to use keyboard input inside every function.', 'Read a complete no-argument example'),
    p('Lesson 085 uses these interface contracts in structure charts, and Lesson 088 checks their connections during integration testing. This lesson establishes the typed call, returned value and immediate caller use on which that work depends.', 'Connect to program design'),
  ], ['An interface states the name, ordered parameters, result type and behaviour.', 'Distinguish the argument, formal parameter and caller variable receiving the result.']),
  'EFFICIENCY-BEFORE':entry(['Identify work whose result cannot have changed'], [
    p('Combine the pass-count increment and Pass output inside one IF Mark >= 50 block. Keep their order, keep Count initialisation before the branch and keep the final count output afterwards. The change removes one comparison, not either of the required actions.', 'Make a specific improvement'),
    table('Compare the complete programs', ['Input', 'Original output', 'Revised output', 'Threshold comparisons'], [['49', '0', '0', '2 becomes 1'], ['50', 'Pass, then 1', 'Pass, then 1', '2 becomes 1'], ['80', 'Pass, then 1', 'Pass, then 1', '2 becomes 1']]),
    p('If intervening code changed Mark, the two comparisons could have different results and could not simply be combined. Check data dependencies and output order before removing repeated-looking work. Tests below, at and above the boundary expose different possible mistakes, although a few passing tests are not a proof for every input.', 'Preserve behaviour before counting a benefit'),
    p('Meaningful names and indentation make code easier to inspect. Factoring repeated code into a procedure can improve maintenance. Fewer repeated comparisons, calculations or data visits can reduce computational work. These are related benefits, but they are not interchangeable measurements.', 'Separate clarity, reuse and execution work'),
  ], ['Remove repeated work only when its inputs and required effects permit it.', 'State the operation saved, then compare outputs, state and boundary behaviour.']),
  'EFFICIENCY-INVARIANT':entry(['Move an unchanged calculation outside repetition'], [
    steps('Check whether Width * Height is loop-invariant', [['Defined before entry', 'Width and Height are both read before the loop.'], ['Unchanged through repetition', 'Neither value is assigned or input inside the loop.'], ['Same required value', 'Each of the Count reports must show the same product.'], ['Safe placement', 'Calculate Area once after input, then reuse it for each output.']]),
    p('The complete examples assume a positive integer Count and non-negative real dimensions. With Width 3, Height 4 and Count 3, both output 12 three times. The original multiplies three times; the revised program multiplies once. In general the multiplication count falls from N to 1 for positive N, while the N outputs remain.', 'Count exactly what changes'),
    p('If Count could be zero, the revised version would calculate an unused product once, while the original would not. Its output would still be empty for these valid operands, but the claim of saving work would not apply. If the moved expression could fail, evaluating it on a previously skipped path could also change behaviour.', 'Consider a skipped loop before moving work'),
    p('A parcel program reads a new Weight on each iteration. Even with fixed Rate, Weight * Rate changes, so the full product must stay after that input. Only obtaining the fixed rate can remain outside. A constant multiplier does not make the whole expression invariant.', 'Use a counterexample'),
  ], ['Move a calculation only after its inputs are defined and when they remain unchanged.', 'Compare operation counts under stated input conditions, including any newly executed path.']),
  'EFFICIENCY-TRAVERSAL':entry(['Accumulate independent results during one traversal'], [
    p('The supplied programs first store five already valid marks, each from 0 to 100. One then traverses them to calculate Total and traverses again to count passes. The revised version reads one element into Mark, uses that value for both updates and continues. Both accumulators are initialised before the processing loop.', 'Identify shared access without changing the data'),
    table('Trace the combined processing loop', ['Index / Mark', 'Total afterwards', 'Passed afterwards'], [['1 / 49', '49', '0'], ['2 / 50', '99', '1'], ['3 / 80', '179', '2'], ['4 / 21', '200', '2'], ['5 / 50', '250', '3']]),
    p('Count processing reads separately from the input stage, which is unchanged. The original reads five elements for the total and five for the count; the revised reads each once, giving 10 versus 5 reads. For 30 elements the same comparison is 60 versus 30. This does not establish that wall-clock runtime halves: input, output and other operations still exist.', 'Define the work being counted'),
    p('Combine only computations whose dependencies allow it. Counting values greater than the final mean normally needs that mean first; it cannot use the still-changing partial mean as a substitute. A second pass over retained values is then meaningful work rather than redundant work.', 'Recognise a necessary second pass'),
  ], ['One traversal can update independent results from the same element.', 'Initialise each accumulator once; preserve dependencies on results that are not yet available.']),
  'INTEGRATED-DESIGN':entry(['Translate the complete marks requirement', 'Give each component one responsibility'], [
    table('Make the input and output contract explicit', ['Part', 'Rule'], [['Input', 'Integers; keep asking until exactly three valid marks have been accepted. Enough input is supplied to finish.'], ['Validity', '0 through 100 inclusive. Invalid attempts are retried within the same slot.'], ['Statistics', 'Total all accepted marks; count marks >= 50.'], ['Output', 'One mean followed by the pass count after all three accepted marks.'], ['Scope', 'Non-integer input handling, persistence and an attempt limit are not part of this task.']]),
    p('The main program owns control and the accumulated state. ValidMark answers a question without updating those accumulators. RecordMark assumes it receives an accepted mark and updates the two statistics. Calling it before validation would violate that precondition even if its syntax were correct.', 'Connect responsibility to a precondition'),
  ], ['State accepted-input count, validity bounds, pass threshold and final outputs together.', 'Keep validation decisions separate from accepted-data updates.']),
  'INTEGRATED-CONTROL':entry(['Repeat attempts within an accepted slot', 'Update only after acceptance'], [
    table('Trace every input attempt', ['Slot', 'Input Mark', 'ValidMark', 'Total / Passed', 'Next action'], [['1', '-1', 'FALSE', '0 / 0', 'Retry slot 1.'], ['1', '0', 'TRUE', '0 / 0', 'Record once; advance.'], ['2', '50', 'TRUE', '50 / 1', 'Record once; advance.'], ['3', '101', 'FALSE', '50 / 1', 'Retry slot 3.'], ['3', '100', 'TRUE', '150 / 2', 'Finish; output 50 and 2.']]),
    p('The outer FOR controls accepted slots. The inner REPEAT controls attempts for the current slot. An invalid attempt does not reach RecordMark or NEXT Index; it returns to INPUT within the same slot. Once accepted, exactly one recording update occurs before the outer loop advances.', 'Follow the two levels separately'),
    p('The divisor is three because exactly three values contribute. For attempts 20, -5, 60, 80, the accepted total is 160, so the mathematical mean is 160 / 3 and Passed is 2. Approximately 53.33 is a display rounded to two decimal places, not the exact value specified by the arithmetic.', 'Check the denominator and precision'),
  ], ['Rejected attempts stay in the inner loop and change neither statistic.', 'Calculate the mean after all accepted marks have been recorded.']),
  'INTEGRATED-INTERFACES':entry(['Choose how data crosses each call', 'Check the whole program'], [
    steps('Follow the accepted mark 50', [['Decide', 'ValidMark receives a copy of 50 and returns TRUE to UNTIL.'], ['Match the call', 'RecordMark receives Mark by value and references to main Total and Passed.'], ['Update', 'With Total 0 and Passed 0, add 50 and increment Passed to 1.'], ['Resume', 'Control returns to main at NEXT Index. The updated accumulators persist for the next slot.']]),
    p('Test rejected attempts, both valid endpoints, all failing marks and all passing marks. Three 49s produce mean 49 and pass count 0; three 100s produce mean 100 and pass count 3. If Total and Passed were BYVAL, local updates would not accumulate in the caller between calls.', 'Use tests that expose different mistakes'),
    p('The program definitions, main calls, interface diagram and trace all describe the same data flow. The BOOLEAN returned by ValidMark controls acceptance; RecordMark changes storage through reference parameters and provides no function result. Main performs the final division and output.', 'Read definitions and caller as one program'),
  ], ['Functions return decisions into expressions; reference parameters update caller state.', 'Check argument order, types, parameter modes and the placement of every update.']),
};

const examples = {
  'TRANSLATE-FLOWCHART':[
    example('countPositiveWhile', 'Translate every flowchart edge', 'Read exactly three INTEGER values and output how many are strictly positive.', 'For -2, 0, 5, Count becomes 0, 0, 1; Index advances to 2, 3, 4. The output is 1.'),
  ],
  'ASSIGN-IO':[
    example('purchase', 'Calculate a tax-inclusive purchase', 'Input a non-negative REAL Price and non-negative INTEGER Quantity. Tax is 20% of the price per item.', 'Price 10 and Quantity 3 give Tax 2 and Total 36. Price 0 gives Total 0.'),
    example('assignmentCopies', 'Trace copies and replacement', 'A and B are separate INTEGER variables. Follow all three assignments before output.', 'After A <- 4: A is 4 and B is uninitialised. After B <- A: both are 4. After A <- A + 3: A is 7 and B remains 4. Display: A = 7; B = 4.'),
  ],
  'NUMERIC-FUNCTIONS':[
    example('numericFunctions', 'Use a numeric function and store one random draw', 'Input a non-negative REAL Score. INT takes its integer part; RAND(6) returns a REAL in [0,6).', 'Score 4.8 gives integer part 4. The second output is one INTEGER from 1 to 6; it varies with the random draw.'),
  ],
  'STRING-FUNCTIONS':[
    example('stringInterfaces', 'Apply the supplied string and character interfaces', 'Word is a STRING with at least four characters. Letter is a CHAR. Use the interfaces supplied above.', 'ALGORITHM and b produce 9, LGO, HM, B, b. A B! and 7 produce 4, a STRING containing a leading space then B!, B!, 7, 7.'),
  ],
  'STRING-JOIN':[
    example('stringCode', 'Construct a code label', 'Code has exactly eight characters: two letters, four digit characters, then two letters. Use the supplied MID and RIGHT interfaces from the previous unit.', 'CS2046AB produces 2046-AB. IT0007XY produces 0007-XY, preserving the leading zeros.'),
  ],
  'IF-NESTED':[
    example('selection', 'Implement age and membership rules', 'Input a non-negative INTEGER Age and BOOLEAN Member. Under 18 means Junior; otherwise classify by membership.', '17 / TRUE gives Junior; 18 / TRUE gives Adult member; 19 / FALSE gives Adult visitor.'),
    example('independentIf', 'Perform two independently required actions', 'Mark is an INTEGER from 0 to 100. Output Pass if it is >= 50; independently output Distinction if it is >= 80.', '85 produces both Pass and Distinction; 50 produces Pass; 49 produces no output.'),
    example('exclusiveIf', 'Report exactly one classification', 'Mark is an INTEGER from 0 to 100. Output only Distinction from 80, otherwise Pass from 50, otherwise Fail.', '85 and 80 produce Distinction; 79 and 50 produce Pass; 49 produces Fail.'),
  ],
  'CASE':[
    example('menu', 'Select a menu response', 'Input INTEGER Choice. 1 means Open, 2 means Save, and all other values are invalid.', '1 gives Open, 2 gives Save, and 0 gives Invalid.'),
    example('days', 'Select from inclusive ranges', 'Input INTEGER Day. 1 through 5 are weekdays, 6 and 7 are weekend days, and other values are invalid.', '1 and 5 give Weekday; 6 and 7 give Weekend; 0 and 8 give Invalid day.'),
  ],
  'FOR-NESTED':[
    example('nestedCoordinates', 'Visit two rows of three positions', 'No keyboard input is needed. Output each Row and Column pair in row order, then the total number of visited positions.', 'The six pairs are (1,1), (1,2), (1,3), (2,1), (2,2), (2,3), followed by Count 6.'),
  ],
  'LOOP-CONDITIONS':[
    example('sentinelRepeat', 'Preserve the empty-input path with a guard', 'Integers other than -1 are data; -1 is the sentinel and may be the first input. Sum data and output one total.', '3, 4, -1 gives 7; -1 alone gives 0; 0, -1 gives 0. The sentinel is never added.'),
  ],
  'LOOP-BOUNDED':[
    example('login', 'Use a combined continuation condition', 'The toy password is open. Permit at most three STRING attempts, stopping on the first correct attempt. At least one attempt is allowed.', 'open gives TRUE, 1; x, y, open gives TRUE, 3; x, y, z gives FALSE, 3. These are loop-control examples, not a password-storage design.'),
    example('loginRepeat', 'Use the equivalent stopping condition', 'Use the same password and attempt limit as the WHILE version, with at least one permitted attempt.', 'The three cases give the same success flags and attempt counts. No initial Password value is needed because input precedes the first UNTIL test.'),
  ],
  'PROCEDURE-CALL':[
    example('headingOnly', 'Call an action, then resume the caller', 'No keyboard input is required. Define a heading action, call it once, then display the next main-program message.', 'The output is Results followed by Next action. The definition itself produces no output before CALL.'),
  ],
  'PARAMETER-INTERFACE':[
    example('procedures', 'Call actions and resume the main program', 'No keyboard input is required. Score starts at 10. Heading displays a title; Show displays its argument; Add increases its first argument by the second.', 'The outputs are Results, 10, 13. Add changes Score to 13; the later Show observes that value.'),
  ],
  'BYVAL-BYREF':[
    example('passing', 'Observe both local and caller values', 'No keyboard input is needed. Number starts at 5. Follow the caller after each procedure finishes.', 'The output sequence is 7, 5, 7; Number is finally 7.'),
    example('swapReference', 'Swap two distinct caller variables', 'Input INTEGER A and B. Pass the two different variables by reference.', '6, 2 becomes 2, 6. Equal inputs 5, 5 remain 5, 5. -3, 8 becomes 8, -3.'),
    example('swapCopy', 'Compare the same assignments on local copies', 'A starts at 6 and B at 2. The procedure displays its changed parameters, then main displays its own variables.', 'The procedure displays 2, 6; main still displays 6, 2. A correct local swap has not changed caller storage.'),
  ],
  'FUNCTION-PATHS':[
    example('maximum', 'Return a value from each branch', 'Input two INTEGER values A and B. Return the larger through Larger, add 1 in the caller, and output the result.', '7,4 and 4,7 both produce 8. Equal values 5,5 produce 6; negative values -3,-7 produce -2.'),
    example('earlyReturn', 'Finish a call before its last source line', 'A non-negative INTEGER Quantity of zero has no delivery fee. Otherwise the fee is 2.0 plus 0.5 per item.', 'Quantity 0 returns and outputs 0.0; Quantity 4 gives 4.0; Quantity 1 gives 2.5. The zero path does not evaluate the later fee formula.'),
  ],
  'INTERFACE':[
    example('validMark', 'Use an argument and a Boolean result', 'Input INTEGER Value; ValidMark returns TRUE exactly for 0 through 100 inclusive.', '-1 and 101 give FALSE; 0 and 100 give TRUE.'),
    example('noParameterFunction', 'Use a function with an empty parameter list', 'Input INTEGER attempts until one is from 1 to 5. Supply enough input to finish; non-integer tokens are outside the task.', '0, 6, 5 returns 5 and main outputs 5. An initial 1 returns and outputs 1 after one input.'),
  ],
  'EFFICIENCY-BEFORE':[
    example('repeated', 'Inspect the original repeated comparison', 'Input one INTEGER Mark from 0 to 100. Count it if >= 50 and display Pass, then display Count.', '49 outputs 0; 50 and 80 output Pass followed by 1. Mark is compared twice.'),
    example('factored', 'Preserve the actions with one comparison', 'Implement exactly the same input and output contract as the original.', 'The outputs and final Count match the original; one threshold comparison is performed instead of two.'),
  ],
  'EFFICIENCY-INVARIANT':[
    example('invariantBefore', 'Calculate the unchanged area on every iteration', 'Input non-negative REAL Width and Height, then positive INTEGER Count. Output their product Count times.', '3, 4, 3 outputs 12 three times and performs three multiplications.'),
    example('invariantAfter', 'Calculate once after input, then reuse', 'Use the same positive-count and fixed-dimension contract.', '3, 4, 3 still outputs 12 three times, with one multiplication. Count 1 also performs one multiplication in each version.'),
  ],
  'EFFICIENCY-TRAVERSAL':[
    example('twoTraversals', 'Compute two statistics in separate passes', 'Input five INTEGER marks from 0 to 100, store them, then output their total and the count >= 50.', '49, 50, 80, 21, 50 outputs 250 and 3. The processing passes read ten array elements in total.'),
    example('oneTraversal', 'Reuse each element for both statistics', 'Use the same five stored marks and output contract. Mark holds the current element for both updates.', 'The outputs remain 250 and 3, with five processing reads. Five zeros give 0 and 0; five 100s give 500 and 5 in both versions.'),
  ],
  'INTEGRATED-INTERFACES':[
    example('integrated', 'Complete the validated marks program', 'Read exactly three accepted INTEGER marks in [0,100]; retry invalid attempts. Output their mean and count >= 50. Provide enough inputs to finish.', '-1, 0, 50, 101, 100 gives mean 50 and Passed 2, with Total 150. Three 49s give 49 and 0; three 100s give 100 and 3.'),
  ],
};

function derivedUnit(source, key, heading, explanation, visual, prompt, answer, objectiveIds = source.objectiveIds) {
  const misconceptions={
    'STRING-JOIN':'Concatenation does not insert a separator or convert digit characters into a number.',
    'FOR-NESTED':'The inner loop restarts for each outer iteration; it does not continue from the previous group’s last value.',
    'PARAMETER-INTERFACE':'Matching names do not determine argument binding; position, type and passing mode do.',
    'FUNCTION-PATHS':'RETURN ends the current function call; a later RETURN does not overwrite its result.',
    'EFFICIENCY-INVARIANT':'One fixed operand does not make a calculation invariant when the other operand changes.',
    'EFFICIENCY-TRAVERSAL':'A second pass is necessary when its work depends on a result that must be completed first.',
  };
  return { ...source, unitKey:`S11-${key}`, heading, explanation, objectiveIds,
    syllabusId:objectiveIds[0].replace(/\.A\d+$/, ''), materials:[{ ...visual, objectiveIds }],
    misconceptions:[misconceptions[key]], checkpoint:{ prompt, answer },
  };
}

export function enhanceSection11Lesson(lesson) {
  if (lesson.section !== 11) return lesson;
  let units = lesson.units.flatMap(unit => {
    const key=unit.unitKey.replace('S11-', '');
    if (key === 'STRING-FUNCTIONS') return [unit, derivedUnit(unit, 'STRING-JOIN', 'Construct strings with concatenation',
      ['Concatenation joins two STRING values with & to produce one STRING. It can build a label from extracted parts while preserving their character order.'],
      section11Visuals.strings, 'Does "00" & "7" produce the number 7?', 'No. It produces the STRING "007", retaining all three characters.', lessonIds(3,1,3))];
    if (key === 'FOR-STEP') return [unit, derivedUnit(unit, 'FOR-NESTED', 'Follow nested count-controlled loops',
      ['A nested loop puts a complete loop inside another loop’s body. The inner loop runs to completion for each outer control value. Use distinct control variables to keep the two responsibilities separate.'],
      section11Visuals.nested, 'Which pair follows Row 1, Column 3 in the 2 by 3 example?', 'Row 2, Column 1: the outer value advances and the inner loop starts again.')];
    if (key === 'PROCEDURE-CALL') return [unit, derivedUnit(unit, 'PARAMETER-INTERFACE', 'Match arguments to a procedure interface',
      ['The caller and the procedure need an agreed interface. Its name identifies the action; its ordered, typed parameters specify the data the caller must supply and which data may be updated.'],
      materialTable('Zero, one and two arguments', ['Definition shape', 'Matching call'], [['Heading()', 'CALL Heading()'], ['Show(BYVAL Value : INTEGER)', 'CALL Show(Score)'], ['Add(BYREF Total : INTEGER, BYVAL Amount : INTEGER)', 'CALL Add(Score, 3)']]),
      'In CALL Add(Score, 3), must the caller variable be named Total?', 'No. Score is matched to formal parameter Total by argument position.', lessonIds(6,3))];
    if (key === 'FUNCTION-RETURN') return [unit, derivedUnit(unit, 'FUNCTION-PATHS', 'Trace branches and early returns',
      ['A function can choose its result with selection. The chosen execution path must supply a value of the declared result type. RETURN immediately completes the current call; it does not merely display a value or wait for ENDFUNCTION.'],
      section11Visuals.returns, 'How many RETURN statements execute in a single call of DeliveryFee?', 'One. The first RETURN reached ends the call, so no later RETURN is executed.', lessonIds(7,1,2,3))];
    if (key === 'EFFICIENCY-AFTER') return [];
    if (key === 'EFFICIENCY-BEFORE') return [
      {...unit, heading:'Combine repeated decisions safely', explanation:[unit.explanation[0]]},
      derivedUnit(unit, 'EFFICIENCY-INVARIANT', 'Reuse a calculation whose inputs do not change',
        ['A loop-invariant calculation has the same result on every iteration because its inputs remain unchanged. Reusing its result can avoid repeated work, provided the new placement preserves the program’s required behaviour.'],
        materialTable('Fixed operands, repeated output', ['Stage', 'Before', 'After'], [['Input', 'Read Width, Height and positive Count.', 'Read the same inputs.'], ['Calculate', 'Multiply inside each iteration.', 'Multiply once before the loop.'], ['Output', 'One area per iteration.', 'The same area per iteration.']]),
        'May Weight * Rate move out of a loop that reads a new Weight for every parcel?', 'No. Fixed Rate does not make the changing Weight * Rate product invariant.'),
      derivedUnit(unit, 'EFFICIENCY-TRAVERSAL', 'Share a traversal between independent results',
        ['Two computations can share one traversal when both can use the same current element and neither needs the other’s completed result first. The total and pass count of a set of marks meet this condition.'],
        materialTable('Processing reads for the same stored data', ['Data size', 'Two traversals', 'One traversal with a local Mark'], [['5 marks', '10 array reads', '5 array reads'], ['30 marks', '60 array reads', '30 array reads']]),
        'Why can counting marks above the final mean require another pass?', 'The final mean is unknown until the total and count are complete; a partial mean is not equivalent.'),
    ];
    return [unit];
  });
  units=units.map(unit => {
    const key=unit.unitKey.replace('S11-', '');
    const spec=section11Teaching[key];
    if (!spec) throw new Error(`Missing detailed S11 teaching: ${key}`);
    const intro=unit.explanation.map((block,i)=>typeof block === 'string' ? p(block,spec.headings[i]) : block);
    let materials=unit.materials;
    if (key === 'IF-NESTED') materials=[section11Visuals.selection];
    if (key === 'INTEGRATED-INTERFACES') materials=[section11Visuals.interfaces];
    if (examples[key]) materials=[...materials.filter(m=>m.type!=='worked-example'), ...examples[key].map((m,i)=>({...m, ...(i ? {preserve:true} : {})}))];
    if (key === 'BYVAL-BYREF') materials.push(materialTable('Swap(6, 2): storage after each assignment', ['Statement', 'Caller A / Left', 'Caller B / Right', 'Local Temp'], [['Before body', '6', '2', 'Uninitialised'], ['Temp <- Left', '6', '2', '6'], ['Left <- Right', '2', '2', '6'], ['Right <- Temp', '2', '6', '6']]));
    const extensions=[];
    if (key === 'NUMERIC-FUNCTIONS') extensions.push(extension('generate another inclusive integer interval', 'For integer bounds Low <= High, INT(RAND(High - Low + 1)) + Low shifts an interval of the required width. The bound supplied to RAND must be positive. This is an application of the supplied numeric contracts.', [materialTable('Example: Low 3, High 7', ['Stage', 'Possible values'], [['RAND(5)', 'REAL values from 0 inclusive to 5 exclusive.'], ['INT', '0, 1, 2, 3, 4'], ['Add Low', '3, 4, 5, 6, 7']])]));
    if (key === 'BYVAL-BYREF') extensions.push(extension('compare the supporting Java lab', 'Java passes arguments by value. Reassigning a copied primitive parameter does not change its caller. The lab updates the caller by assigning a returned value; do not describe this as Cambridge BYREF. Follow the related Subprograms practical task for complete Java programs.'));
    if (key === 'INTEGRATED-INTERFACES') extensions.push(extension('allow a variable number of accepted marks', 'The next complete program assumes a non-negative INTEGER Count. It keeps the validation rule, but checks Count > 0 before dividing. It illustrates the new empty-data requirement rather than changing the fixed-three-mark task above.', [example('variableMean','Handle zero accepted slots','Read non-negative INTEGER Count, then Count valid marks. Output the mean, or No marks when Count is zero.','0 outputs No marks without reading a mark; 1, 101, 50 outputs 50; 3, 0, 50, 100 outputs 50.')]));
    return {...unit, teachingBlocks:[...intro,...spec.blocks], explanation:spec.essentials,
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds})),
      ...(extensions.length ? {extensions:extensions.map(x=>({...x,materials:x.materials.map(m=>({...m,objectiveIds:unit.objectiveIds}))}))} : {}),
    };
  });
  return {...lesson, units,
    ...(lesson.originalLesson === 80 ? {title:'Building a complete structured program'} : {}),
  };
}
