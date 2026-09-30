// The same authored sequence supplies classroom steps and independent reading.
// Ticket examples are teaching scenarios. Original paper wording stays in its source extracts.
const ids = (requirement, ...numbers) => numbers.map(number => 'S9.' + String(requirement).padStart(2, '0') + '.A' + String(number).padStart(2, '0'));
const table = (headers, rows) => ({ headers, rows });
const step = (title, body, extra = {}) => ({ title, body, ...extra });
const code = lines => lines.join('\n');
const worked = (title, setup, steps, conclusion) => ({ title, setup, steps, conclusion });
const group = (number, title, unitKeys, objectiveIds, content) => ({
  id: 's9-u' + String(number).padStart(2, '0'), title, unitKeys, objectiveIds, papers: [], ...content,
});

export const section9PaperObjectives = {
  E067: ids(1, 1, 3),
  E068: ids(2, 1, 2),
  E069: ids(4, 1),
  E070: ids(6, 1),
  E071: ids(7, 1, 3),
  E072: ids(8, 1),
  E073: ids(9, 1),
  E074: ids(8, 1),
  E086: [...ids(5, 1), ...ids(6, 1)],
};

export const section9PaperCoverageNotes = {
  E067: 'Directly tests selecting information for a stated purpose and justifying those choices. It does not ask for a complete abstract model or a general explanation of the benefits of abstraction; the preceding teacher-written tasks assess those separately.',
  E068: 'Tests named submodules and their responsibilities in a text-message task. It supports decomposition into modules, but does not directly test the difference between a returned value and displayed output.',
  E069: 'Tests meaningful variable names and suitable data types. The preceding identifier-table task also requires a purpose for each identifier and distinguishes its type from its current value.',
  E070: 'Tests identification of iteration and selection. It does not require a complete pseudocode solution; use the independent writing task and E086 to assess construction.',
  E071: 'Tests drawing a flowchart from a written two-stage algorithm. It does not directly test writing pseudocode from a flowchart or drawing from supplied pseudocode; the four conversion tasks assess those directions separately.',
  E072: 'Tests stepwise refinement in words for a fixed number of inputs, a stated inclusive range and one final total. Use the requested response form rather than substituting a code listing.',
  E073: 'Tests tracing and correcting decisions in a bonus flowchart. It does not directly assess the full use of AND, OR and NOT, which have separate construction and boundary checks.',
  E074: 'Tests refinement of a banded points calculation. Select the band from the original amount before discarding the fractional dollar part; this is a transfer task with rules distinct from the ticket example.',
  E086: 'Tests a complete pseudocode algorithm with declarations, exactly 100 integer inputs, an input prompt, selection, accumulation and one final output. It directly assesses writing IPO and combined constructs, but does not by itself assess every loop form.',
};

const u01 = group(1, 'Give the ticket seller instructions that can be followed', ['S9-ABSTRACTION-PURPOSE'], [...ids(3, 1), ...ids(1, 1, 2, 3)], {
  question: 'Could a new volunteer sell the correct tickets using only your instructions?',
  observe: 'Two people want to attend a school performance. Tickets cost 25.00 each. The volunteer has a poster, a list of seats and a note saying “work out the price”. Explain what the volunteer can determine and what the note still leaves unstated.',
  image: { asset: '/assets/course-v3/section-9/ticket-desk-scene.png', alt: 'Students buying tickets from a volunteer at a school event ticket desk.', caption: 'Observe the ticket desk first. Identify which information is needed to calculate a buyer’s total.' },
  stimulus: { title: 'The first ticket desk', items: ['Request: 2 tickets', 'Price: 25.00 per ticket', 'Poster: blue background and a photograph', 'Task: tell the buyer the total price'] },
  prerequisite: { title: 'Start with an ordinary calculation', body: 'You only need multiplication and the idea of following instructions in order. This first version assumes that the requested tickets are available. Discounts, payment and repeated orders will be added later, one rule at a time.' },
  steps: [
    step('Carry out the task before naming it', 'Read the requested quantity, multiply it by 25.00 and tell the buyer the result. For two tickets the result is 50.00. Another volunteer should obtain the same result from those instructions.'),
    step('Replace an aim with defined actions', '“Sell tickets” names a goal but leaves the method open. “Read the quantity; multiply the quantity by 25.00; display the result” supplies operations and their order. A solution expressed as a sequence of defined steps is an algorithm.'),
    step('Ask which facts can change the answer', 'Changing the quantity from two to three changes the total. Changing the poster background from blue to green does not change this calculation. Keep quantity and price when representing this particular task.'),
    step('Name abstraction after making the choice', 'Abstraction removes unnecessary detail while retaining essential features. Its purpose here is to make the price calculation easier to understand. Removing the price would make the representation unusable, even though it would contain less information.'),
  ],
  worked: worked('Change the request, keep the same method', 'The next buyer wants three tickets at 25.00 each. The poster now has a red background.', [
    step('Select the relevant facts', 'Keep quantity 3 and unit price 25.00. The new colour has no role in the stated price rule.'),
    step('Follow the ordered operations', 'Obtain 3 before calculating 3 × 25.00 = 75.00. Display 75.00 after calculating it; do not guess the total before reading the request.'),
    step('Check the model against the purpose', 'A second volunteer can reproduce 75.00. If the task changes to printing matching posters, colour becomes relevant; relevance belongs to a purpose, not permanently to a fact.'),
  ], 'Defined steps make the calculation repeatable; abstraction keeps the information those steps need.'),
  check: { prompt: 'A model keeps the poster colour and quantity but removes the ticket price. Can it calculate the total? Explain the missing information.', answer: 'No. Quantity alone does not determine the total. The model must retain the price or a rule that supplies it. Keeping an unrelated colour does not repair that omission.' },
  takeaway: 'An algorithm solves a problem using defined steps. Abstraction retains the details essential to the stated purpose.',
  bridge: 'Next, turn the selected facts into a model another person can inspect.',
  trap: 'A shorter description is not automatically a useful abstraction.',
  lab: 'abstraction', labConfig: { variant: 'charge' },
  experimentPrompt: 'Choose the price-calculation purpose. Retain or remove each information card, then change to a publicity task and explain which choices change.',
});

const u02 = group(2, 'Build and challenge an abstract model', ['S9-ABSTRACTION-MODEL'], ids(1, 1, 2, 3, 4), {
  question: 'What must a model show to decide whether a ticket request can be met?',
  observe: 'Performance A has eight places left and performance B has no places left. A buyer requests two tickets for A. A model saying only “the school sells tickets” cannot distinguish this request from one for B.',
  stimulus: { title: 'Two requests with different outcomes', items: ['A: 8 places left; request 2', 'B: 0 places left; request 2', 'Both performances have the same poster', 'Decision: can this request be accepted?'] },
  prerequisite: { title: 'Choose a purpose before choosing fields', body: 'A field is one named item recorded in a model, such as the performance identifier. You can write values in an ordinary table; you do not need database commands or programming syntax.' },
  steps: [
    step('State the exact question', 'This model answers whether enough places remain for a specified performance and quantity. It does not allocate named seats or take payment. State these limits so that a reader knows which decisions the model can support.'),
    step('Represent the facts, not only their names', 'Record a performance identifier and its available places. Record the requested performance and quantity separately. The identifier connects the request to the correct availability record.', { table: table(['Performance', 'Places left'], [['A', '8'], ['B', '0']]) }),
    step('Add the relationship needed for a decision', 'Find the requested performance, then check that quantity is at least one and does not exceed its places left. In ordinary words, request 2 for A fits within 8; request 2 for B does not fit within 0.'),
    step('Test omissions with contrasting cases', 'If the model stores only a total of eight places across all performances, it could wrongly accept a request for B. A useful abstraction removes unrelated detail while preserving distinctions that change the answer.'),
  ],
  worked: worked('Model a new performance', 'Performance C has five places left. Requests R1 and R2 ask for four and six tickets respectively. Ignore seat positions and assume whole-number quantities.', [
    step('Produce the representation', 'Add the row C, 5. Record R1 as performance C, quantity 4, and R2 as performance C, quantity 6. Keep the two trial requests independent.'),
    step('Use the model', 'R1 can be met because 4 is positive and no greater than 5. R2 cannot be met because 6 exceeds 5. No payment or stock change is being performed in this model test.'),
    step('Explain a limit and a benefit', 'Omitting seat positions makes the availability decision easier to inspect, but the model cannot tell a buyer their seat number. That limitation is acceptable only because named-seat allocation is outside the stated task.'),
  ], 'An abstract model must show retained data and useful relationships, with limits that match its purpose.'),
  check: { prompt: 'Create a model for hiring devices: D1 is available and D2 is already hired. The task is to identify a device that can be hired now. Give fields, both rows and one assumption.', answer: 'Use DeviceID and Availability: D1, Available; D2, Hired. Select D1. A suitable assumption is that both devices work and there are no reservations. A list of field names without the two states is incomplete.' },
  takeaway: 'Produce a representation containing essential details, and test whether it can answer the stated question.',
  bridge: 'The names and values in a model become the data used by an algorithm.',
  papers: ['E067'], lab: 'abstraction', labConfig: { variant: 'availability' },
  experimentPrompt: 'Remove the performance identifier or availability value in turn. Predict a pair of requests the reduced model can no longer distinguish.',
  challenge: { prompt: 'The purpose changes to emailing buyers about a cancelled performance. Which information must be added, and why?', answer: 'Add a way to associate each booking with its performance and a contact email address. Availability alone cannot identify affected recipients or deliver the message. Explain each additional field through the new purpose.' },
});

const u03 = group(3, 'Give changing values meaningful names', ['S9-ALGORITHM-STEPS', 'S9-IDENTIFIER-TABLE'], [...ids(3, 1), ...ids(4, 1)], {
  question: 'When one buyer replaces another, which parts of the ticket calculation change?',
  observe: 'The desk records Mina, 2 tickets and student status TRUE. The next buyer is Arun, with 3 tickets and student status FALSE. Point to the labels that stay useful and the values that change.',
  stimulus: { title: 'Labels and their current contents', items: ['BuyerName: Mina', 'Quantity: 2', 'Student: TRUE', 'TicketPrice: 25.00 throughout this version'] },
  prerequisite: { title: 'A name is not its current value', body: 'Think of a labelled space that holds one current value. Reading the label tells us which data item we mean; reading its contents gives the value now. We assume inputs have the stated types. Checking wrongly typed input is outside these examples.' },
  steps: [
    step('Follow a value changing under one name', 'Quantity holds 2 for Mina and later holds 3 for Arun. It is a variable because its stored value can change during execution. Using the meaningful name Quantity lets the same instructions work for both buyers.'),
    step('Distinguish text, numbers and truth values', 'BuyerName is text, so use STRING. Quantity is a whole number, so use INTEGER. A paid amount can contain a fractional part, so use REAL. Student records TRUE or FALSE, so use BOOLEAN; it does not store the word “student”.'),
    step('Separate a constant from a variable', 'TicketPrice is fixed at 25.00 for this version of the program. A named constant states the value once and prevents reassignment during the run. A programmer can change that definition for a later version with a new price.'),
    step('Write an identifier table that explains the job', 'An identifier names a data item. Record its name, type and purpose, not just an example value. A declaration gives a variable a type; it does not by itself read a buyer’s name or initialise a count.', { table: table(['Identifier', 'Type', 'Purpose'], [['BuyerName', 'STRING', 'Name shown on the receipt'], ['Quantity', 'INTEGER', 'Number of tickets requested'], ['Student', 'BOOLEAN', 'Whether the buyer receives the student discount'], ['Paid', 'REAL', 'Amount tendered by the buyer']]) }),
  ],
  worked: worked('Describe the data before writing the calculation', 'A buyer called Lee requests four tickets and tenders 100.00. No discount is used in this small example.', [
    step('Choose meaningful identifiers', 'Use BuyerName, Quantity and Paid. Names such as X and Y would make a reader work out which value represents money and which represents tickets.'),
    step('Give types and current values separately', 'BuyerName has type STRING and current value "Lee"; Quantity has type INTEGER and value 4; Paid has type REAL and value 100.00. A type describes permitted values, not this one value alone.'),
    step('Add the result that will be calculated', 'Total has type REAL and purpose “amount due for this order”. It does not yet have a calculated value merely because it appears in the table. The algorithm must assign that result.'),
  ], 'The identifier table connects each data name to a suitable type and a clear purpose.'),
  check: { prompt: 'A table says Quantity has type 3 and purpose INTEGER. Correct it, then explain whether DECLARE Quantity : INTEGER gives Quantity the value zero.', answer: 'The type is INTEGER; the purpose is the number of tickets requested. The value 3 is an example input. The declaration states a type and does not initialise the variable to zero.' },
  takeaway: 'Use meaningful identifier names and document each identifier’s data type and purpose.',
  bridge: 'Next, make values move through input, assignment and output in a defined order.',
  papers: ['E069'],
  experimentPrompt: 'On paper, keep the identifier-table labels and replace Mina’s current values with Arun’s. Explain why replacing Quantity 2 with 2.5 would be unsuitable, while a Paid value may contain a fractional part.',
});

const u04 = group(4, 'Trace input, assignment and output', ['S9-IPO-CONTRACT', 'S9-IPO-STATEMENTS'], [...ids(5, 1), ...ids(6, 1)], {
  question: 'When does the computer first know the total, and when does the buyer see it?',
  observe: 'The buyer requests two tickets. A desk calculator displays 2, then 50.00. The printed receipt still says nothing until a separate print action. Distinguish obtaining a value, calculating with it and communicating the result.',
  stimulus: { title: 'Three separate actions', items: ['Read the requested quantity: 2', 'Calculate 2 × 25.00: 50.00', 'Display the amount due: 50.00', 'Assume a positive whole-number quantity; tickets are available'] },
  prerequisite: { title: 'Use named values and a fixed price', body: 'Quantity is an INTEGER variable; Total is REAL; TicketPrice is the constant 25.00. A variable must receive a value before an expression reads it. We introduce one statement at a time.' },
  steps: [
    step('Obtain data with INPUT', 'INPUT Quantity waits for a supplied value and stores it in Quantity. For this run the value is 2. TicketPrice does not need another input because the task already defines it as a constant.', { code: 'INPUT Quantity' }),
    step('Evaluate first, then store', 'In Total ← Quantity * TicketPrice, read the current values 2 and 25.00, multiply them to obtain 50.00, then store that result in Total. The arrow points to the destination on the left; the calculation uses the right-hand side.', { code: 'Total ← Quantity * TicketPrice' }),
    step('Communicate a result with OUTPUT', 'OUTPUT Total displays the current numeric value. OUTPUT "Total" displays the literal word Total instead. The quotation marks distinguish text supplied directly by the program from the name of a stored value.', { table: table(['Statement', 'Displayed output when Total is 50'], [['OUTPUT Total', '50'], ['OUTPUT "Total"', 'Total']]) }),
    step('Keep the dependency order visible', 'Read Quantity before calculating Total and calculate Total before displaying it. Group these effects as input, process and output. A declaration can appear before them to establish types, but it does not perform any of these three actions.'),
  ],
  worked: worked('Work out the change after a sufficient payment', 'For this separate trace, Cost is 75.00 and Paid is 100.00. Both are non-negative REAL values and Paid is at least Cost.', [
    step('Read the values in the stated order', 'INPUT Cost stores 75.00; INPUT Paid stores 100.00. Change has not yet been assigned a value.'),
    step('Calculate and store the result', 'Change ← Paid - Cost evaluates 100.00 - 75.00 and stores 25.00. Paid and Cost keep their values; using them in the subtraction does not remove them.'),
    step('Report and check', 'OUTPUT Change displays 25.00. Reversing the subtraction gives -25.00 and violates the meaning of change. For exact payment of 75.00, the correct output is zero.'),
  ], 'A trace records how the current values change and which outputs are actually produced.'),
  check: { prompt: 'Write a complete small algorithm to read a positive INTEGER Quantity, calculate its cost at 25.00 per ticket and output the text "Amount due" followed by the result. Include declarations.', answer: code(['CONSTANT TicketPrice = 25.00', 'DECLARE Quantity : INTEGER', 'DECLARE Total : REAL', 'INPUT Quantity', 'Total ← Quantity * TicketPrice', 'OUTPUT "Amount due", Total']) },
  takeaway: 'Input obtains data, processing transforms it, and output communicates the result. Assignment stores the evaluated right-hand side.',
  bridge: 'We can now translate an ordinary written rule into statements without changing its meaning.',
  lab: 'trace', labConfig: { variant: 'ipo' },
  experimentPrompt: 'Predict the value after each statement before stepping. Try quantities 1 and 3, then move the output before the assignment and explain why that order cannot give the intended result.',
  challenge: { prompt: 'A rental desk charges 4.00 per device plus one 10.00 deposit per order. Read Quantity and output AmountDue. State the result for 3 devices.', answer: 'Declare Quantity as INTEGER and AmountDue as REAL. INPUT Quantity; AmountDue ← Quantity * 4.00 + 10.00; OUTPUT AmountDue. For 3 devices the output is 22.00. Adding the deposit once per device would implement a different rule.' },
});

const u05 = group(5, 'Translate a written rule into pseudocode', ['S9-REPRESENTATIONS-ENGLISH'], [...ids(7, 1, 2), ...ids(5, 1)], {
  question: 'Which parts of an English instruction must survive when we change its notation?',
  observe: 'A volunteer’s card says: “Read a positive ticket quantity. Multiply it by 25.00. Display the total.” The result must remain the same when those words become pseudocode.',
  stimulus: { title: 'A rule with an order', items: ['Read the quantity', 'Multiply quantity by the fixed ticket price', 'Display the calculated total', 'Do not invent a discount or extra fee'] },
  prerequisite: { title: 'Reuse the effects of statements', body: 'INPUT obtains a value, assignment stores a calculated result and OUTPUT displays a value or literal. Structured English uses controlled natural-language steps to make operations and their grouping clear.' },
  steps: [
    step('Underline actions and data separately', '“Read” is an action and “quantity” is the data it obtains. “Multiply” names the processing, while quantity and price are its operands. This separates instructions from the values on which they operate.'),
    step('Choose one statement for each effect', 'Translate reading into INPUT Quantity. Translate the calculation into Total ← Quantity * TicketPrice. Translate displaying the answer into OUTPUT Total. Choose meaningful names and declare the types required by their roles.'),
    step('Preserve every stated rule', 'Keep the multiplier 25.00 and the original operation order. Changing names consistently is acceptable, but changing the price, adding a discount or displaying only Quantity changes the algorithm.'),
    step('Check equivalence with actual values', 'Follow both versions for Quantity 2 and then Quantity 3. Each should produce 50.00 and 75.00 respectively. Matching one example is useful evidence, but you must also check that the statements preserve the general rule.'),
  ],
  worked: worked('Translate a two-output receipt', 'Structured English: read the buyer’s name and ticket quantity; calculate the total at 25.00 each; display the name followed by the total. Assume available tickets and a positive whole-number quantity.', [
    step('List the data roles', 'BuyerName is STRING, Quantity is INTEGER and Total is REAL. TicketPrice is the fixed constant 25.00. The name is displayed but is not an operand in the multiplication.'),
    step('Translate in order', 'Read BuyerName, then Quantity; calculate Total; output BuyerName and Total. The result can now be written as a complete listing.', { code: code(['CONSTANT TicketPrice = 25.00', 'DECLARE BuyerName : STRING', 'DECLARE Quantity : INTEGER', 'DECLARE Total : REAL', 'INPUT BuyerName', 'INPUT Quantity', 'Total ← Quantity * TicketPrice', 'OUTPUT BuyerName, Total']) }),
    step('Trace against the written rule', 'For "Mina" and 2, display Mina followed by 50.00. Quoting "BuyerName" would display the identifier’s spelling instead of the buyer’s name and would fail the rule.'),
  ], 'Translation changes the representation while preserving operations, data dependencies and results.'),
  check: { prompt: 'Independently translate: read a non-negative distance in kilometres and a positive speed in kilometres per hour; divide distance by speed; display the journey time in hours.', answer: code(['DECLARE Distance, Speed, Hours : REAL', 'INPUT Distance', 'INPUT Speed', 'Hours ← Distance / Speed', 'OUTPUT Hours']) },
  takeaway: 'Structured English and pseudocode must express the same defined operations in the same required order.',
  bridge: 'Next, the written rule will choose between two possible calculations.',
  lab: 'representations', labConfig: { variant: 'sequence' },
  experimentPrompt: 'Match each English action to its statement. Predict the output before revealing the complete translated listing.',
});

const u06 = group(6, 'Let a condition choose the ticket price', ['S9-CONSTRUCTS-SELECTION'], [...ids(6, 1), ...ids(9, 1)], {
  question: 'How can one program charge students and other buyers differently?',
  observe: 'Two buyers each request two tickets. Mina is a student and pays 45.00 after a 10% discount. Arun is not a student and pays 50.00. The quantity and unit price are the same; student status selects the calculation.',
  stimulus: { title: 'Two routes from one subtotal', items: ['2 × 25.00 = 50.00 subtotal', 'Student TRUE: pay 90% of 50.00', 'Student FALSE: pay the full 50.00', 'Expected totals: 45.00 and 50.00'] },
  prerequisite: { title: 'A condition has a truth value', body: 'A BOOLEAN value is TRUE or FALSE. IF uses that value to choose an action. A 10% discount removes one tenth of the subtotal, leaving 90%, so multiply by 0.90. Inputs have the stated types and requested tickets are available.' },
  steps: [
    step('Calculate what both cases share', 'Read Quantity and Student, then calculate Subtotal ← Quantity * 25.00. Doing this before the decision gives both possible branches the same undiscounted amount.'),
    step('Choose one branch', 'IF Student THEN selects the discounted calculation when Student is TRUE. ELSE selects the full subtotal when it is FALSE. Only the selected branch runs on one execution.', { code: code(['IF Student THEN', '    Total ← Subtotal * 0.90', 'ELSE', '    Total ← Subtotal', 'ENDIF']) }),
    step('Continue after the decision', 'Place OUTPUT Total after ENDIF. Either branch assigns Total, so the output can use it whichever branch was selected. Two unconnected IF statements are not automatically equivalent to one IF with an ELSE.'),
    step('Build conditions from comparisons', 'Paid >= Total is TRUE when payment is sufficient, including exact payment. For Total 45, Paid 44 is FALSE and Paid 45 is TRUE. The symbols >= include the boundary; > would wrongly reject exact payment.'),
  ],
  worked: worked('Trace both student-status inputs', 'Quantity is 3 and TicketPrice is 25.00. Compare independent runs with Student TRUE and Student FALSE.', [
    step('Calculate the shared subtotal', 'Both runs read Quantity 3 and calculate Subtotal = 3 × 25.00 = 75.00.'),
    step('Take the selected branch', 'TRUE assigns Total = 75.00 × 0.90 = 67.50. FALSE assigns Total = 75.00. The other branch is skipped in each run.'),
    step('Follow the join and output', 'Each execution continues after ENDIF and outputs its own Total once. The student run displays 67.50; the other displays 75.00.'),
  ], 'Selection uses a truth-valued condition to choose which operations are executed.'),
  check: { prompt: 'Read a non-negative INTEGER Age. Output "Adult" when Age is at least 18 and "Minor" otherwise. Write the selection and give outputs for 17, 18 and 19.', answer: code(['DECLARE Age : INTEGER', 'INPUT Age', 'IF Age >= 18 THEN', '    OUTPUT "Adult"', 'ELSE', '    OUTPUT "Minor"', 'ENDIF', '// Outputs for 17, 18, 19: Minor, Adult, Adult']) },
  takeaway: 'Selection chooses a branch according to a condition. Preserve inclusive and exclusive boundaries.',
  bridge: 'Draw the same decision so that its possible paths can be followed visually.',
  trap: 'Discounted total means Subtotal × 0.90. Subtotal × 0.10 is the amount removed.',
  lab: 'trace', labConfig: { variant: 'selection' },
  experimentPrompt: 'Predict Total for each student-status value. The experiment uses an equivalent shorter version: first store the full price in Total, then change Total only when Student is TRUE. On FALSE, keeping that value gives the same result as the explicit ELSE assignment above.',
});

const u07 = group(7, 'Draw and follow a simple decision', ['S9-REPRESENTATIONS-SYMBOLS'], ids(7, 1, 2, 3), {
  question: 'Can someone follow the student-discount rule using arrows alone?',
  observe: 'Place a buyer at a decision with two labelled exits: TRUE for a student and FALSE for another buyer. Follow only one exit, then return to the shared instruction that displays the total.',
  image: { asset: '/assets/course-v3/section-9/symbols.svg', alt: 'Standard flowchart symbols: rounded terminator for start or end, parallelogram for input or output, rectangle for processing, diamond for a decision, and arrowheads showing execution direction.', caption: 'Inspect the four shapes before drawing a path. Enlarge the diagram to read each operation and its symbol.' },
  stimulus: { title: 'A path to one output', items: ['Start and obtain Quantity and Student', 'Calculate Subtotal', 'Decision: Student?', 'TRUE gives a discount; FALSE keeps the subtotal', 'Join the paths and display Total'] },
  prerequisite: { title: 'A diagram must describe execution', body: 'You already know what INPUT, assignment, OUTPUT and IF do. A flowchart expresses those operations with standard symbols and directed connections. Position on the page alone does not determine the next operation; follow arrowheads.' },
  steps: [
    step('Give each symbol a specific job', 'Use a terminator for start and end, a parallelogram for input or output, a rectangle for processing, and a diamond for a decision. Put the actual operation or condition inside the shape.'),
    step('Use the condition to choose a labelled exit', 'Label the diamond’s exits consistently as Yes/No or True/False. For Student TRUE, follow the branch calculating Subtotal × 0.90. The labels represent the truth of the condition, not whether the outcome is desirable.'),
    step('Show where the paths rejoin', 'Connect both Total assignments to the shared output. The join does not execute both assignments; it gives either completed branch a next instruction. Connect the output forward to the end.'),
    step('Verify the arrows with two traces', 'Trace one student and one non-student request. Every required input must be reached before it is used, and exactly one Total must be output. A correct-looking collection of shapes with a missing arrow is not a complete flowchart.'),
  ],
  worked: worked('Draw an entry-height decision', 'Read a whole-number Height in centimetres. Display Enter for a height of at least 120; otherwise display Wait. End after that message.', [
    step('Place the shared beginning', 'Connect Start to an input parallelogram labelled INPUT Height, then to a diamond labelled Height >= 120.'),
    step('Draw both outcomes and the end', 'Yes leads to an output parallelogram labelled OUTPUT "Enter". No leads to OUTPUT "Wait". Connect both outputs to End without an arrow from one output to the other.'),
    step('Check the boundary paths', '119 follows No and displays Wait. 120 and 121 follow Yes and display Enter. Replacing >= with > would change the result at 120.'),
  ], 'A flowchart records operations and control flow through connected symbols and labelled decisions.'),
  check: { prompt: 'Independently draw a flowchart: input Temperature; below zero output Frost, otherwise output Clear; then end. Afterwards write its equivalent pseudocode.', answer: 'Start → INPUT Temperature → decision Temperature < 0. Yes → OUTPUT "Frost" → End; No → OUTPUT "Clear" → End. Equivalent code: INPUT Temperature; IF Temperature < 0 THEN OUTPUT "Frost" ELSE OUTPUT "Clear" ENDIF, with Temperature declared as REAL. Zero follows the Clear branch.' },
  takeaway: 'Use suitable symbols, arrowheads and labelled decision paths, then trace each possible outcome.',
  bridge: 'Some ticket rules require more than one condition to be true.',
  lab: 'representations', labConfig: { variant: 'selection' },
  experimentPrompt: 'The diagram first stores the full price in Total and changes it only for a student. Its No route keeps that value and reaches the output directly. Trace both routes, then change Student while keeping Quantity fixed and predict the final total.',
});

const u08 = group(8, 'Combine conditions without changing the rule', ['S9-LOGIC-COMPARISONS', 'S9-LOGIC-COMBINE', 'S9-LOGIC-CHECK'], ids(9, 1), {
  question: 'Does a request qualify if it satisfies only one of the quantity restrictions?',
  observe: 'There are eight places left. Compare requests for 0, 1, 8 and 9 tickets. A quantity must be positive and must fit the remaining capacity. State both answers before combining them.',
  stimulus: { title: 'Two restrictions on one request', items: ['At least one ticket: Quantity >= 1', 'No more than the available places: Quantity <= PlacesLeft', 'PlacesLeft = 8', 'Test 0, 1, 8 and 9'] },
  prerequisite: { title: 'Compare first, combine second', body: 'Each comparison produces TRUE or FALSE. A compound expression combines these complete truth-valued conditions. Quantities and PlacesLeft are INTEGER values; PlacesLeft is non-negative.' },
  steps: [
    step('Require both restrictions with AND', 'Use (Quantity >= 1) AND (Quantity <= PlacesLeft). With eight places, quantity 0 fails the first condition and 9 fails the second. Quantities 1 and 8 satisfy both, so both boundaries are included.'),
    step('Use OR for genuine alternatives', 'A separate example offers an invitation to a performer OR a helper. Performer OR Helper is TRUE if either or both values are TRUE. This invitation example does not alter the student-only ticket discount.'),
    step('Reverse a whole condition with NOT', 'NOT Available is TRUE when Available is FALSE. To reject the complete valid-quantity rule, use NOT ((Quantity >= 1) AND (Quantity <= PlacesLeft)), or equivalently (Quantity < 1) OR (Quantity > PlacesLeft).'),
    step('Choose counterexamples before trusting the expression', 'Quantity >= 1 OR Quantity <= 8 wrongly admits both 0 and 9: each satisfies one side. Evaluate values at and just outside each boundary, and vary Boolean inputs independently.', { table: table(['Quantity', '>= 1', '<= 8', 'AND result'], [['0', 'FALSE', 'TRUE', 'FALSE'], ['1', 'TRUE', 'TRUE', 'TRUE'], ['8', 'TRUE', 'TRUE', 'TRUE'], ['9', 'TRUE', 'FALSE', 'FALSE']]) }),
  ],
  worked: worked('Add a cancellation status to entry', 'Entry is allowed when a ticket has been paid for and is not cancelled. Let PaidTicket and Cancelled be BOOLEAN inputs.', [
    step('Translate each requirement', 'PaidTicket represents the first requirement. NOT Cancelled represents the requirement that cancellation must be false.'),
    step('Combine and test', 'Use PaidTicket AND NOT Cancelled. (TRUE, FALSE) allows entry; (TRUE, TRUE) rejects it; (FALSE, FALSE) also rejects it.'),
    step('Challenge a wrong connector', 'PaidTicket OR NOT Cancelled accepts an unpaid but uncancelled ticket. That counterexample shows why OR changes the rule, even though it gives the right answer for a paid uncancelled ticket.'),
  ], 'The English requirements determine the operator; successful results for one case do not establish equivalence.'),
  check: { prompt: 'Write a condition accepting a REAL parcel mass from 2 to 5 kg inclusive. Write its rejection condition and evaluate 1.9, 2, 5 and 5.1.', answer: 'Accept: (Mass >= 2) AND (Mass <= 5). Reject: (Mass < 2) OR (Mass > 5), equivalently NOT ((Mass >= 2) AND (Mass <= 5)). Acceptance results are FALSE, TRUE, TRUE, FALSE.' },
  takeaway: 'AND requires both conditions; OR allows either or both; NOT reverses a truth value. Test boundaries and counterexamples.',
  bridge: 'Next, use conditions to control when payment is requested and when ticket availability can change.',
  lab: 'conditions', labConfig: { variant: 'quantity' },
  experimentPrompt: 'Predict the accepted quantities with AND, then replace it with OR. Use 0 and 9 to explain the difference; test a zero-capacity performance as well.',
  challenge: { prompt: 'An invitation is allowed for a performer or helper, but never for a suspended person. Construct the expression and test Performer TRUE, Helper FALSE, Suspended TRUE.', answer: '(Performer OR Helper) AND NOT Suspended. The stated case is FALSE. Without the parentheses, the suspension rule may not apply to both qualifying roles as intended.' },
});

const u09 = group(9, 'Put decisions in an order that preserves the rules', ['S9-LOGIC-CHECK'], [...ids(9, 1), ...ids(6, 1), ...ids(2, 2)], {
  question: 'Should the desk reduce PlacesLeft as soon as it calculates a price?',
  observe: 'A student requests two tickets from eight available places. The amount due is 45.00, but the buyer tenders only 40.00. The price calculation succeeds; the sale does not.',
  stimulus: { title: 'Calculation and confirmation are different events', items: ['Quantity 2; PlacesLeft 8; Student TRUE', 'Subtotal 50.00; Total 45.00', 'Paid 40.00 is insufficient', 'Expected result: no sale; PlacesLeft stays 8'] },
  prerequisite: { title: 'A returned value can be used later', body: 'Imagine giving Quantity and Student to a calculation box. It sends back the numeric Total for the caller to use in Paid >= Total. That is a returned value. Printing 45.00 on a screen does not by itself supply a numeric result to another calculation. We use this idea before formal module design.' },
  steps: [
    step('Check quantity before asking for later data', 'Reject a quantity below one or above PlacesLeft. On that route, do not request student status or payment. Those values are needed only after a valid request reaches the calculation.'),
    step('Calculate and keep the amount due', 'For a valid request, calculate the subtotal and apply the student decision. Store or receive the numeric Total and display it. A later comparison must use that value, not the text of a message.'),
    step('Place state changes inside the success branch', 'Read Paid after displaying Total. Only if Paid >= Total should the program calculate change, subtract Quantity from PlacesLeft and confirm the sale. Underpayment leaves PlacesLeft unchanged.'),
    step('Trace conditions in their actual order', 'A later decision can be reached only through the preceding arrows or branches. Checking a high threshold first and sending its false path directly to the end may make a middle band unreachable. Trace a failing example before proposing a repair.'),
  ],
  worked: worked('Compare two payments for the same request', 'Use independent runs with Quantity 2, PlacesLeft 8, Student TRUE and TicketPrice 25.00. First use Paid 40.00, then Paid 45.00.', [
    step('Follow the common path', 'The request fits the eight places. Subtotal is 50.00; the returned or stored Total is 45.00. Display that amount and obtain payment.'),
    step('Trace the insufficient-payment run', '40.00 >= 45.00 is FALSE. Display insufficient payment. Skip the availability update, so PlacesLeft remains 8.'),
    step('Trace exact payment', '45.00 >= 45.00 is TRUE. Change is zero, PlacesLeft becomes 6 and the sale is confirmed. Exact payment belongs on the success branch.'),
  ], 'The branch controls both the output and whether stored state is allowed to change.'),
  check: { prompt: 'A design subtracts Quantity from PlacesLeft before testing Paid >= Total. Explain its result for the underpaid request and correct the placement.', answer: 'The design wrongly reduces PlacesLeft from 8 to 6 even though payment is rejected. Move the subtraction into the sufficient-payment branch, after the payment condition succeeds. A failed payment must preserve 8 places.' },
  takeaway: 'Trace every reachable path and place each action under the condition that authorises it.',
  bridge: 'We can process one request correctly. Next, repeat defined operations for several requests.',
  papers: ['E073'], lab: 'ticket', labConfig: { variant: 'complete' },
  experimentPrompt: 'Predict which inputs are requested and whether availability changes for invalid quantity, underpayment and exact payment. Reveal one decision at a time.',
  challenge: { prompt: 'For the separate bonus task, bands are 0 below 2000, 10 from 2000 through 4000, and 100 above 4000. Give a decision order and test both boundaries.', answer: 'First test ValueOfSales >= 2000. If FALSE, bonus is 0. If TRUE, test ValueOfSales > 4000: TRUE gives 100, FALSE gives 10. Values 2000 and 4000 both receive 10; 1999 receives 0 and 4001 receives 100.' },
});

const u10 = group(10, 'Replace repeated additions with a FOR loop', ['S9-CONSTRUCTS-SEQUENCE', 'S9-CONSTRUCTS-ITERATION'], ids(6, 1), {
  question: 'How can the desk total four requests without writing the same instructions four times?',
  observe: 'Four valid requests contain 2, 1, 3 and 2 tickets. We want the total number requested. These quantities are teaching inputs for a count-controlled calculation; payment and available capacity are outside this small task.',
  stimulus: { title: 'Four quantities, one running total', items: ['Inputs in order: 2, 1, 3, 2', 'Start with zero tickets counted', 'Read and add one new quantity at a time', 'Display the final total once'] },
  prerequisite: { title: 'Update from the old value', body: 'In TotalTickets ← TotalTickets + Quantity, evaluate the right side using the old TotalTickets, then replace it with the new value. This is an update, not an algebraic claim that a number equals itself plus another number.' },
  steps: [
    step('Perform the repeated work manually', 'Starting from zero, add 2 to get 2, then 1 to get 3, then 3 to get 6, then 2 to get 8. The repeated actions are reading the next quantity and adding it to the current total.'),
    step('State the repetition count with FOR', 'FOR OrderNumber ← 1 TO 4 repeats its body for 1, 2, 3 and 4. The upper bound is included. OrderNumber is the loop counter; TotalTickets records a different quantity.'),
    step('Place operations before, inside and after', 'Initialise TotalTickets to zero before the loop. Put INPUT Quantity and the addition inside it. Put OUTPUT TotalTickets after NEXT OrderNumber so that only the completed total is displayed.'),
    step('Check the state after each pass', 'Record the new input and new total on each iteration. Resetting TotalTickets inside the loop would discard earlier additions. Reading Quantity only before the loop would repeatedly add one old value.', { table: table(['OrderNumber', 'Quantity', 'TotalTickets after addition'], [['1', '2', '2'], ['2', '1', '3'], ['3', '3', '6'], ['4', '2', '8']]) }),
  ],
  worked: worked('Write and trace the four-request total', 'Use the inputs 2, 1, 3, 2. All inputs are positive integers and the task requests one final total.', [
    step('Prepare the state', 'Declare the three INTEGER variables and initialise the accumulator once. Its zero means no quantities have yet contributed.'),
    step('Write the repeated body', 'Use one input and one addition per iteration. The same statements operate on each newly obtained Quantity.', { code: code(['DECLARE OrderNumber, Quantity, TotalTickets : INTEGER', 'TotalTickets ← 0', 'FOR OrderNumber ← 1 TO 4', '    INPUT Quantity', '    TotalTickets ← TotalTickets + Quantity', 'NEXT OrderNumber', 'OUTPUT TotalTickets']) }),
    step('Verify input count and final output', 'The loop consumes four quantities and produces a final total of 8. The output is after the loop; 2, 3 and 6 are intermediate stored values, not required outputs.'),
  ], 'Use a count-controlled loop when the required number of repetitions is known.'),
  check: { prompt: 'Read exactly three REAL payments and output their total once. Write the pseudocode and trace payments 25.00, 45.00 and 50.00.', answer: code(['DECLARE Index : INTEGER', 'DECLARE Paid, TotalPaid : REAL', 'TotalPaid ← 0', 'FOR Index ← 1 TO 3', '    INPUT Paid', '    TotalPaid ← TotalPaid + Paid', 'NEXT Index', 'OUTPUT TotalPaid', '// Running totals: 25.00, 70.00, 120.00. Final output: 120.00.']) },
  takeaway: 'Initialise once, repeat the input and update the specified number of times, then output the final aggregate.',
  bridge: 'The next total includes only inputs that meet a condition.',
  lab: 'loops', labConfig: { variant: 'for', values: '2, 1, 3, 2' },
  experimentPrompt: 'Predict each running total, then test moving the initialisation inside the loop. Explain why the final result changes to the last input.',
});

const u11 = group(11, 'Add only the inputs that qualify', ['S9-CONSTRUCTS-COMBINE'], [...ids(5, 1), ...ids(6, 1), ...ids(9, 1)], {
  question: 'How can the desk read every entry but add only positive quantities?',
  observe: 'A trial input list contains 2, -1 and 3. The rule for this small exercise is to total positive INTEGER values and ignore zero or negative values. It is a data-processing exercise, not a completed sale or a change to ticket availability.',
  stimulus: { title: 'Predict the changing total', items: ['Read exactly 3 integers: 2, -1, 3', 'Initial total: 0', 'Add a value only when it is greater than 0', 'Expected final total: 5'] },
  prerequisite: { title: 'Keep loop count and accepted total separate', body: 'A FOR loop controls how many inputs are read. An IF inside the loop controls whether the current input contributes. The number of iterations is not the number of accepted inputs and neither is automatically their sum.' },
  steps: [
    step('Read every required input', 'For the small trial, use three iterations even though one value is negative. The negative entry still uses one input position. Reading until three positive values arrive would implement a different requirement.'),
    step('Test the current value inside the loop', 'After obtaining the new value, evaluate Value > 0. If it is TRUE, add Value to Total. If it is FALSE, leave Total unchanged and continue to the next iteration.'),
    step('Distinguish counting from totalling', 'Total ← Total + Value adds the accepted amount. AcceptedCount ← AcceptedCount + 1 would count qualifying entries instead. With 2, -1, 3, the sum is 5 but the number of positive entries is 2.'),
    step('Prepare a complete response to the question', 'Include required declarations and any requested input prompt. Initialise before repetition and output after it. For E086, extend the count to exactly 100 integers and prompt before each input; do not change the positive-value condition.', { table: table(['Input', 'Value > 0', 'Total after decision'], [['2', 'TRUE', '2'], ['-1', 'FALSE', '2'], ['3', 'TRUE', '5']]) }),
  ],
  worked: worked('Build the three-input algorithm', 'Read exactly three integers, prompt before each one and output the sum of the positive values once. Use 2, -1, 3.', [
    step('Initialise and choose the loop', 'Declare Index, Value and Total as INTEGER. Set Total to zero before FOR Index ← 1 TO 3. This establishes one running total for the whole task.'),
    step('Place input and selection in the repeated body', 'Each iteration prompts, reads a new Value and selects whether to add it. The indentation shows which operations belong to the loop.', { code: code(['DECLARE Index, Value, Total : INTEGER', 'Total ← 0', 'FOR Index ← 1 TO 3', '    OUTPUT "Input an integer value"', '    INPUT Value', '    IF Value > 0 THEN', '        Total ← Total + Value', '    ENDIF', 'NEXT Index', 'OUTPUT Total']) }),
    step('Check normal and empty-contribution cases', 'The trial produces three prompts followed by final total 5. Inputs 0, -1, -3 still use all three iterations and give final total 0. No positive contribution does not mean no final output.'),
  ], 'Sequence, iteration and selection cooperate, but each controls a different part of the solution.'),
  check: { prompt: 'Independently write pseudocode to read four INTEGER values and total only those from 30 through 70 inclusive. Give the result for 29, 30, 70, 71.', answer: code(['DECLARE Index, Value, Total : INTEGER', 'Total ← 0', 'FOR Index ← 1 TO 4', '    INPUT Value', '    IF (Value >= 30) AND (Value <= 70) THEN', '        Total ← Total + Value', '    ENDIF', 'NEXT Index', 'OUTPUT Total', '// Final output: 100. All four inputs are read.']) },
  takeaway: 'Read each input once, test it inside the loop, update only on the qualifying branch and output the final result after repetition.',
  bridge: 'A fixed count does not suit every task. Next, let a condition determine when input stops.',
  papers: ['E070', 'E086'], lab: 'loops', labConfig: { variant: 'conditional', values: '2, -1, 3' },
  experimentPrompt: 'For 2, -1, 3, predict the loop index, current value and total separately. Try zero and an all-negative set, then explain how a counter would differ from the sum.',
  challenge: { prompt: 'Modify the four-value task so it outputs both the qualifying sum and the number of qualifying values. State both results for 29, 30, 70, 71.', answer: 'Initialise Total and AcceptedCount to zero before the loop. Inside the qualifying IF, add Value to Total and add 1 to AcceptedCount. After the loop output Total and AcceptedCount. The results are 100 and 2.' },
});

const u12 = group(12, 'Stop a WHILE loop when its condition becomes false', ['S9-CONSTRUCTS-ITERATION'], ids(6, 1), {
  question: 'How can the desk collect quantities when nobody knows how many entries will arrive?',
  observe: 'For this separate input task, positive whole numbers are quantities and 0 means “finish”. The list is 2, 1, 0. Zero is a stopping signal and must not be treated as another request.',
  stimulus: { title: 'A stream with an end signal', items: ['Inputs: 2, 1, 0', 'Continue while Quantity > 0', 'Do not process the stopping value', 'What if the very first input is 0?'] },
  prerequisite: { title: 'Separate a stopping signal from ordinary data', body: 'All inputs in this task are non-negative integers and the supplied stream eventually contains 0. A sentinel is a special value used to signal an end. Test the current input before deciding whether to process it.' },
  steps: [
    step('Read the first value before the test', 'INPUT Quantity supplies the first value for Quantity > 0. Without an initial input, the condition would try to use an unavailable value. Initialise the running total before any additions.'),
    step('Use WHILE as a pre-condition loop', 'WHILE Quantity > 0 tests before its body. If the first input is 0, the body runs zero times. The final output is still reached after ENDWHILE.'),
    step('Make progress towards another test', 'Inside the body, add the current positive Quantity and read the next Quantity. Execution returns to the test with that new value. Omitting the new input would keep retesting the old positive value indefinitely.'),
    step('Keep the exit value out of processing', 'For 2, 1, 0, only 2 and 1 enter the body. Zero makes the condition FALSE and exits. The total is 3, and a first input of zero leaves the initial total at 0.'),
  ],
  worked: worked('Trace each condition check', 'Read non-negative quantities until 0 and output their total. Trace 2, 1, 0.', [
    step('Prepare and enter', 'Set Total to zero and read 2. Since 2 > 0 is TRUE, enter the body and add 2.'),
    step('Update the value used by the condition', 'Read 1 at the end of the body. The next test is TRUE, so add 1 and obtain total 3. Then read 0.'),
    step('Exit and report once', 'The test 0 > 0 is FALSE. Skip the body and output 3 after ENDWHILE.', { code: code(['DECLARE Quantity, Total : INTEGER', 'Total ← 0', 'INPUT Quantity', 'WHILE Quantity > 0', '    Total ← Total + Quantity', '    INPUT Quantity', 'ENDWHILE', 'OUTPUT Total']) }),
  ], 'A WHILE loop may execute zero times because its condition is tested before the body.'),
  check: { prompt: 'Trace the algorithm for input 0, then for 4, 0. Explain what happens if the input at the end of the body is removed.', answer: 'Input 0 gives final output 0 without entering the body. Inputs 4, 0 give final output 4. Removing the new input makes a positive first value repeat indefinitely, repeatedly adding that same value; the condition never receives the stopping value.' },
  takeaway: 'A pre-condition loop repeats while its condition is true; its body must allow the stopping condition to be reached.',
  bridge: 'Some tasks need the first action to happen before the condition can be tested.',
  lab: 'loops', labConfig: { variant: 'while', values: '2, 1, 0' },
  experimentPrompt: 'Compare a first input of zero with one positive input followed by zero. Count condition checks separately from executions of the body.',
});

const u13 = group(13, 'Use REPEAT when the body must run at least once', ['S9-CONSTRUCTS-ITERATION'], ids(6, 1), {
  question: 'How can a loop test a quantity only after it has asked the buyer for one?',
  observe: 'A request-entry task must ask for a positive whole-number quantity. The buyer enters 0, then -2, then 3. All entries are INTEGER values, but only the last satisfies this exercise’s rule.',
  stimulus: { title: 'Ask, then decide whether to stop asking', items: ['Attempt 1: 0 → ask again', 'Attempt 2: -2 → ask again', 'Attempt 3: 3 → accept', 'The task must ask at least once'] },
  prerequisite: { title: 'This example checks a range, not a type', body: 'Assume every supplied input is an INTEGER and that a positive value will eventually be supplied. We only check positivity here; ticket availability will be checked separately. The input must happen before its value can be tested.' },
  steps: [
    step('Place the first action before the condition', 'REPEAT starts the body immediately. Display the prompt and read Quantity inside the body, then test the input at UNTIL. No earlier input is needed for this structure.'),
    step('State the condition that ends repetition', 'UNTIL Quantity > 0 stops when the quantity is acceptable. A FALSE result repeats the body; a TRUE result leaves the loop. This stopping meaning is the opposite of a WHILE condition that is true while repetition continues.'),
    step('Trace rejected and accepted attempts', 'After 0, Quantity > 0 is FALSE, so ask again. The same happens for -2. After 3 it becomes TRUE, so leave the loop with Quantity holding 3.'),
    step('Choose a loop from the required first behaviour', 'Use REPEAT when the body must run before the first test. Use WHILE when the condition may prevent every execution of the body. Equivalent solutions are possible if their input placement and condition polarity are adjusted together.'),
  ],
  worked: worked('Request a positive quantity', 'Prompt for an INTEGER Quantity until it is positive, then output the accepted quantity. Use attempts 0, -2, 3.', [
    step('Write the action and stopping rule', 'Put the prompt and input after REPEAT. End with UNTIL Quantity > 0. The loop itself gives every attempt a prompt.'),
    step('Follow the three tests', 'The tests after 0 and -2 are FALSE, so both repeat. The test after 3 is TRUE and stops. The body executes three times; its minimum possible count is one.'),
    step('Use the accepted value afterwards', 'OUTPUT Quantity after the loop displays only the accepted value 3. Rejected inputs are not output as accepted requests.', { code: code(['DECLARE Quantity : INTEGER', 'REPEAT', '    OUTPUT "Enter a positive quantity"', '    INPUT Quantity', 'UNTIL Quantity > 0', 'OUTPUT Quantity']) }),
  ], 'The REPEAT condition describes when to stop, and it is tested after the body.'),
  check: { prompt: 'Rewrite the positive-quantity task using WHILE. Include the first input and the condition that means “another attempt is needed”.', answer: code(['DECLARE Quantity : INTEGER', 'OUTPUT "Enter a positive quantity"', 'INPUT Quantity', 'WHILE Quantity <= 0', '    OUTPUT "Enter a positive quantity"', '    INPUT Quantity', 'ENDWHILE', 'OUTPUT Quantity']) },
  takeaway: 'REPEAT tests after the body and executes at least once. Its UNTIL condition is true when repetition finishes.',
  bridge: 'We can now translate loops between words, diagrams and pseudocode with their test positions intact.',
  lab: 'loops', labConfig: { variant: 'repeat', mode: 'positive', values: '0, -2, 3' },
  experimentPrompt: 'Predict the number of attempts for 3 alone and for 0, -2, 3. Compare the UNTIL condition with the WHILE version’s continuing condition.',
  challenge: { prompt: 'The quantity must also fit PlacesLeft. State an UNTIL condition and explain what the program should do before the loop when PlacesLeft is 0.', answer: 'For positive PlacesLeft, use UNTIL (Quantity >= 1) AND (Quantity <= PlacesLeft). When PlacesLeft is 0, no quantity can satisfy that rule. Report that no places are available and skip the request loop; do not trap the buyer in endless attempts.' },
});

const u14 = group(14, 'Preserve behaviour in all four conversions', ['S9-REPRESENTATIONS-TO-CODE', 'S9-REPRESENTATIONS-TO-FLOW'], ids(7, 1, 2, 3), {
  question: 'How can different-looking representations read exactly the same inputs and produce the same outputs?',
  observe: 'Four boxes show the same task in words, pseudocode and two possible diagram arrangements: read three quantities and output their sum. The layout can change, but the input count, additions and final output must agree.',
  stimulus: { title: 'Things every representation must preserve', items: ['Total starts at 0', 'Exactly 3 new quantities are read', 'Each quantity is added once', 'One final output happens after repetition'] },
  prerequisite: { title: 'Track execution rather than appearance', body: 'You know sequence, decisions, FOR, WHILE and REPEAT. When a FOR loop becomes a flowchart, show the counter’s initial value, comparison and update explicitly. A different arrangement of boxes is acceptable if its directed paths preserve the algorithm.' },
  steps: [
    step('Translate Structured English into pseudocode', 'Identify the input, update and stopping rule in the words. “Read three quantities” means three inputs, not one input reused three times. Write the initialisation before the loop and the final output after it.'),
    step('Translate a flowchart into pseudocode', 'Start at the terminator and follow arrows. Recover which paths repeat and when each condition is tested. A decision reached before the repeated input may represent WHILE; do not choose a loop solely because a diamond appears.'),
    step('Draw from Structured English', 'Choose symbols for each required operation and connect them in order. Show both exits of a decision and where each goes. For a repeated operation, show the return path and the exit to the final output.'),
    step('Draw from pseudocode', 'Expand FOR Index ← 1 TO 3 into Index ← 1, a test Index <= 3, a repeated body, Index ← Index + 1 and a return to the test. When Index reaches 4, exit without reading a fourth quantity.'),
    step('Use a shared trace to compare results', 'Trace quantities 2, 1, 3 in both representations. The intermediate totals must be 2, 3, 6 and the only final output 6. Also inspect the control paths; one matching example cannot excuse a missing branch.'),
  ],
  worked: worked('Convert the three-input total into a flowchart', 'Source pseudocode initialises Total to zero, repeats input and addition with FOR Index ← 1 TO 3, then outputs Total.', [
    step('Expand the hidden loop control', 'After Start, use a processing rectangle for Total ← 0 and Index ← 1, then a diamond for Index <= 3.'),
    step('Connect the repeated path', 'Yes leads to INPUT Quantity, then Total ← Total + Quantity, then Index ← Index + 1. The arrow returns to the same diamond, not to the initialisation.'),
    step('Connect and verify the exit', 'No leads to OUTPUT Total and End. With 2, 1, 3 the total becomes 6; Index then becomes 4 and the next test exits.'),
  ], 'The expanded diagram preserves the count-controlled loop even though it makes its control operations visible.'),
  check: {
    prompt: 'Complete four independent tasks before comparing answers.\n\nA — Structured English to pseudocode: read a non-negative whole-number Age. Display "Adult" for an age of at least 18; otherwise display "Minor". Display exactly one message.\n\nB — Flowchart to pseudocode: use the supplied flowchart labelled B. Level is an INTEGER percentage from 0 to 100. Preserve both branch outputs and state the result for Level 20.\n\nC — Structured English to flowchart: read a positive whole-number Quantity; multiply it by 25.00 and store the result in Total; display Total; end.\n\nD — Pseudocode to flowchart: use the supplied listing labelled D. Draw the initialisation, loop test, counter update, return path and final output explicitly.',
    image: { asset: '/assets/course-v3/section-9/refill.svg', alt: 'Task B flowchart: Start, input Level, decision Level less than 20. Yes leads to output Refill; No leads to output No action. Both outputs lead to End.', caption: 'B — Supplied flowchart. Write the equivalent pseudocode before opening the answer.' },
    codeLabel: 'D — Supplied pseudocode',
    code: code(['DECLARE I, Value, Total : INTEGER', 'Total ← 0', 'FOR I ← 1 TO 2', '    INPUT Value', '    Total ← Total + Value', 'NEXT I', 'OUTPUT Total']),
    answer: 'A: declare and input Age; use IF Age >= 18 THEN OUTPUT "Adult" ELSE OUTPUT "Minor" ENDIF. B: declare and input Level; use IF Level < 20 THEN OUTPUT "Refill" ELSE OUTPUT "No action" ENDIF. Level 20 outputs No action. C: Start → input parallelogram for Quantity → processing rectangle Total ← Quantity * 25.00 → output parallelogram for Total → End. D: initialise Total=0 and I=1; test I<=2; Yes → input Value → add Value to Total → increment I → return to the test; No → output Total → End. Both diagrams require connected symbols and labelled decision exits where applicable.',
  },
  takeaway: 'Conversions preserve operations, conditions, repetition counts and execution order, not just vocabulary or visual shape.',
  bridge: 'Next, use these conversion skills for a task with two distinct input phases.',
  lab: 'representations', labConfig: { variant: 'loop', values: '2, 1, 3' },
  experimentPrompt: 'Follow one representation and predict the next operation in the other. Check initial values, the final failed loop test and the output after the exit.',
  challenge: { prompt: 'A diagram returns from Index ← Index + 1 to Total ← 0 rather than to the condition. What behaviour changes?', answer: 'The accumulator is reset on later iterations, losing earlier inputs. If the same initialisation also resets Index, the loop may never progress to its exit. The return must go to the condition after the initialisation has run once.' },
});

const u15 = group(15, 'Separate waiting from collecting data', ['S9-REPRESENTATIONS-TO-FLOW', 'S9-REPRESENTATIONS-TO-CODE'], [...ids(6, 1), ...ids(7, 1, 2, 3)], {
  question: 'Can the same number mean “ignore” in one phase and “stop” in another?',
  observe: 'Read 0, 5, 27, 4, 27, 0. The first 27 starts collection and is not added. After that point, add values until 0. Before the first 27, even 0 must be ignored.',
  stimulus: { title: 'Mark the phase boundary before calculating', items: ['Waiting: 0, 5', 'Start signal: first 27', 'Collected data: 4, 27', 'Stop signal: final 0', 'Expected total: 31'] },
  prerequisite: { title: 'A sentinel has a role within a phase', body: 'Inputs are INTEGER values and the supplied stream contains a start signal followed eventually by a stop signal. You can use two loops in sequence. The value 27 is a start signal only while waiting; after collection starts, a later 27 is ordinary data.' },
  steps: [
    step('Describe the two tasks separately', 'The first task consumes inputs until the first 27. It does not add any of those values. The second task starts after that signal and accumulates later values until 0.'),
    step('Choose a loop for waiting', 'A REPEAT input UNTIL Value = 27 reads at least once and stops on the start signal. A 0 encountered here does not satisfy Value = 27, so waiting continues.'),
    step('Read fresh data when collection begins', 'After the waiting loop finishes, initialise Total to zero and input the next Value. Do not add the Value still holding the starting 27. Use WHILE Value <> 0 to control the collecting loop.'),
    step('Place the update and final output', 'Inside collection, add the current Value and input the next one. A later 27 is added because it is not 0. Output the total only after the collecting loop exits.'),
  ],
  worked: worked('Trace both phases before drawing', 'Use input sequence 0, 5, 27, 4, 27, 0.', [
    step('Finish the waiting phase', 'Read 0 and 5 without adding either. Reading the first 27 makes the waiting condition true and ends that phase. No collection total includes that 27.'),
    step('Collect the subsequent values', 'Start Total at zero. Read 4 and add it to make 4; read the next 27 and add it to make 31; read 0 and exit without adding another value.'),
    step('Draw the phase transition', 'The waiting loop’s successful exit leads to the collection initialisation and a fresh input. The collection test has its own return arrow through addition and new input, and its exit leads to OUTPUT Total.'),
  ], 'Separate control phases preserve the changing role of each sentinel value.'),
  check: { prompt: 'Before seeing the official answer, draw the complete flowchart. Then trace 27, 0 and 0, 27, 27, 0. Give the totals and identify which 27 is added.', answer: 'The two-loop flowchart waits for the first 27, initialises Total, reads a fresh value, then adds and reads again while Value <> 0. Inputs 27, 0 give total 0. Inputs 0, 27, 27, 0 give total 27: the first 0 is ignored, the first 27 starts collection and the second 27 is added.' },
  takeaway: 'When input has phases, define each phase’s start, processing and stopping rules before joining their control flow.',
  bridge: 'Separating these responsibilities prepares us to name cooperating program modules.',
  papers: ['E071'], lab: 'representations', labConfig: { variant: 'two-stage', values: '0, 5, 27, 4, 27, 0' },
  experimentPrompt: 'Predict whether each input is ignored, starts collection, is added or stops collection. Move a zero before and after the first 27 and explain the changed role.',
  challenge: { prompt: 'Write equivalent pseudocode using a waiting loop followed by a collecting loop.', answer: code(['DECLARE Value, Total : INTEGER', 'REPEAT', '    INPUT Value', 'UNTIL Value = 27', 'Total ← 0', 'INPUT Value', 'WHILE Value <> 0', '    Total ← Total + Value', '    INPUT Value', 'ENDWHILE', 'OUTPUT Total']) },
});

const u16 = group(16, 'Give each module a clear responsibility', ['S9-DECOMPOSITION-PARTS', 'S9-DECOMPOSITION-MODULES'], ids(2, 1, 2), {
  question: 'Which pieces of the ticket task can be understood and checked separately?',
  observe: 'The desk must check a quantity, calculate an amount, accept or reject payment and report a result. Giving every piece the name “process tickets” hides the different work each one performs.',
  stimulus: { title: 'Follow information between responsibilities', items: ['CheckQuantity needs Quantity and PlacesLeft', 'CalculateCharge needs Quantity and Student', 'Payment needs the calculated Total and the amount Paid', 'Receipt needs the confirmed result'] },
  prerequisite: { title: 'Recall returned values and effects', body: 'A function returns a value that its caller can use, such as an amount in a later comparison. A procedure performs a task when called, such as displaying a receipt. Here we design responsibilities and data flow without requiring full subroutine-declaration syntax.' },
  steps: [
    step('Break the whole task into smaller problems', 'Decomposition divides a complex problem into manageable sub-problems. CheckQuantity decides whether the requested number fits availability. CalculateCharge determines the amount due. CompletePayment handles success or failure according to the payment rule.'),
    step('State what each part receives and supplies', 'CalculateCharge receives Quantity and Student, uses fixed TicketPrice 25.00 and returns Total. CompletePayment needs Quantity, PlacesLeft, Total and Paid. Naming a module without stating its job or needed data leaves the design incomplete.'),
    step('Choose a returned value when later processing needs it', 'A charge function can return 45.00 so the caller can evaluate Paid >= Total. Merely printing 45.00 does not return it. DisplayReceipt can be a procedure because its required effect is presenting information.'),
    step('Check cooperation and completeness', 'The parts together must satisfy the original rules. Rejected payment must not reduce places; receipt generation must not recalculate a different price. Giving one part ownership of a calculation makes a changed rule easier to apply consistently.', { table: table(['Module', 'Receives', 'Returns or does'], [['CheckQuantity', 'Quantity, PlacesLeft', 'Returns whether the request fits'], ['CalculateCharge', 'Quantity, Student', 'Returns amount due'], ['CompletePayment', 'Quantity, PlacesLeft, Total, Paid', 'Reports result and updates places only on success']]) }),
  ],
  worked: worked('Pass the result to the next responsibility', 'Quantity 2, PlacesLeft 8, Student TRUE and Paid 50.00. TicketPrice is 25.00.', [
    step('Check the request', 'CheckQuantity determines that 2 is at least one and no greater than 8. The caller may continue to charging.'),
    step('Return the amount due', 'CalculateCharge obtains subtotal 50.00, applies the student rule and returns 45.00. The caller keeps this numeric value as Total and displays the amount due.'),
    step('Complete the accepted sale', 'CompletePayment compares 50.00 with 45.00, calculates change 5.00 and changes PlacesLeft to 6. A receipt can use those confirmed values without repeating the charge calculation.'),
  ], 'A useful decomposition gives each part a distinct job and connects the data required by the other parts.'),
  check: { prompt: 'Decompose a device hire into availability checking, charge calculation and receipt output. The charge is Quantity × 4.00 + 10.00. Identify a suitable function and its inputs and returned value.', answer: 'An availability module checks the requested quantity against devices available. CalculateCharge can be a function receiving Quantity and returning Quantity * 4.00 + 10.00. A receipt procedure receives the accepted hire details and calculated amount and outputs them. Printing the amount alone does not supply the numeric result to a payment comparison.' },
  takeaway: 'Decomposition creates cooperating sub-problems that can be represented as modules with defined inputs and results or effects.',
  bridge: 'A module name still hides internal work. Next, expand that work until every step is programmable.',
  papers: ['E068'], lab: 'modules', labConfig: { variant: 'return' },
  experimentPrompt: 'Follow 2 and TRUE into CalculateCharge and 45.00 back to its caller. Compare a returned result with a displayed message and identify which can supply the payment comparison.',
  challenge: { prompt: 'Two modules separately calculate a charge. One is updated when the discount changes; the other is not. Explain the defect and improve the design.', answer: 'The same order can receive inconsistent amounts. Put the charging rule in one calculation module and let other modules use its returned result. Test that module and the connections after a rule change.' },
});

const u17 = group(17, 'Refine an unfinished step into programmable actions', ['S9-REFINEMENT-LEVELS', 'S9-REFINEMENT-ENDPOINT'], ids(8, 1), {
  question: 'When has “complete the payment” become detailed enough for a programmer?',
  observe: 'A plan says “check request; calculate charge; complete payment”. Those are useful responsibilities, but the last step does not yet say when to confirm, calculate change or change the available places.',
  stimulus: { title: 'One unfinished leaf', items: ['High-level step: complete payment', 'Known values: Quantity, PlacesLeft, Total', 'New input required: Paid', 'Success and failure must have different effects'] },
  prerequisite: { title: 'Decomposition and refinement answer different questions', body: 'Decomposition identifies smaller responsibilities. Stepwise refinement adds the internal detail of a chosen step while preserving its purpose. We already know the statements and conditions needed to express that detail.' },
  steps: [
    step('State the result before expanding', 'CompletePayment must either confirm a sufficiently paid sale or reject underpayment. Keep this result visible so that each expansion serves the same purpose rather than adding unrelated features.'),
    step('Replace a broad action with smaller actions', 'Expand the step into obtain payment, compare it with Total, perform successful-sale updates or report failure. This first expansion exposes the decision but still leaves arithmetic to define.'),
    step('Continue until the rules are explicit', 'On success, Change ← Paid - Total and PlacesLeft ← PlacesLeft - Quantity provide the missing calculations. On failure, display insufficient payment and leave PlacesLeft unchanged. Use Paid >= Total to include exact payment.'),
    step('Check the endpoint against examples', 'A leaf such as “process payment correctly” is still unresolved. A comparison, assignment or output with defined operands can be programmed. Trace exact payment and underpayment to check that the refined version preserves the parent task.'),
  ],
  worked: worked('Refine a selected-number total in words', 'Read exactly four INTEGER values and total only those from 30 to 70 inclusive. This smaller teaching task prepares the control structure used by E072.', [
    step('Write the high-level outline', 'Obtain the values, decide which qualify, accumulate their contributions and report the total. This describes the jobs but does not yet state initial values, loop count or the complete condition.'),
    step('Resolve each unfinished detail', 'Set Total to zero. Read the next value. If it is at least 30 and at most 70, add it to Total. Repeat the reading and decision until four values have been input. Output Total afterwards.'),
    step('Test the finished refinement', 'For 29, 30, 70, 71, only 30 and 70 contribute, giving 100. Read all four inputs even though two are rejected. For E072, apply its stated count and requested five-step response in words.'),
  ], 'A final refinement states enough detail for implementation without requiring invented rules.'),
  check: { prompt: 'Refine “calculate the ticket total” through an intermediate level to programmable operations. Use fixed price 25.00 and a 10% student discount.', answer: 'Intermediate: obtain Quantity and Student; calculate the undiscounted amount; select the final amount; display it. Final: INPUT Quantity; INPUT Student; Subtotal ← Quantity * 25.00; IF Student THEN Total ← Subtotal * 0.90 ELSE Total ← Subtotal ENDIF; OUTPUT Total. Declare suitable variables and assume a positive available quantity.' },
  takeaway: 'Repeatedly expand unresolved steps until the operations, conditions and execution order can be programmed.',
  bridge: 'Use the same method to assemble a complete ticket purchase and challenge its branches.',
  papers: ['E072'], lab: 'refinement', labConfig: { variant: 'payment' },
  experimentPrompt: 'Expand one unfinished payment step at a time. Before revealing each level, state which missing rule prevents the current version from being implemented.',
  challenge: { prompt: 'A refinement says “repeat input; add qualifying values; display total”. Name four details it must resolve.', answer: 'State the initial total; the exact repetition count or stopping rule; the full qualifying condition; and whether the total is displayed inside or after the loop. Also ensure each repetition reads a new value.' },
});

const u18 = group(18, 'Assemble and test one complete ticket purchase', ['S9-INTEGRATED-MODULES', 'S9-INTEGRATED-IPO', 'S9-INTEGRATED-REFINEMENT'], [...ids(2, 1, 2), ...ids(4, 1), ...ids(5, 1), ...ids(6, 1), ...ids(8, 1), ...ids(9, 1)], {
  question: 'Does every successful and rejected purchase obey the same stated rules?',
  observe: 'Compare a valid student request with insufficient payment, an exact-payment request and a request larger than the available places. Decide which inputs should be requested and when PlacesLeft may change before viewing the full algorithm.',
  stimulus: { title: 'The complete single-purchase rules', items: ['TicketPrice = 25.00; students pay 90% of the subtotal', 'Quantity must be at least 1 and no greater than PlacesLeft', 'Read Paid only after displaying Total', 'Confirm and reduce places only when Paid >= Total', 'Typed inputs: INTEGER Quantity and PlacesLeft; BOOLEAN Student; non-negative REAL Paid'] },
  prerequisite: { title: 'This program handles one request', body: 'PlacesLeft is initially a non-negative integer. Quantity may be an invalid integer such as 0, so the program must check its permitted range. All input types are assumed correct. This version does not store bookings or repeat for another buyer.' },
  steps: [
    step('Write the data and responsibility plan', 'Use Quantity and PlacesLeft as INTEGER; Student as BOOLEAN; Subtotal, Total, Paid and Change as REAL. Check the quantity, calculate the charge and complete payment. The fixed price belongs to the rule rather than to buyer input.'),
    step('Finish both sides of the first decision', 'Input Quantity and PlacesLeft, then test (Quantity >= 1) AND (Quantity <= PlacesLeft). A false result outputs Unavailable and ends this request before obtaining Student or Paid.'),
    step('Calculate and display the amount on the valid path', 'Input Student, multiply Quantity by TicketPrice, then select the discounted or full subtotal. Output Total before reading Paid. Each path leading to the payment comparison has now assigned Total.'),
    step('Update only after sufficient payment', 'If Paid >= Total, calculate change and reduce PlacesLeft by Quantity, then output confirmation, change and remaining places. Otherwise output Insufficient payment. Both paths end without an accidental second update.'),
    step('Choose cases that distinguish the branches', 'Include zero quantity, quantity above availability, zero available places, exact payment, underpayment and both student-status values. Check which inputs are consumed as well as the final numerical results.'),
  ],
  worked: worked('Build the successful path, then challenge it', 'Quantity 2, PlacesLeft 8, Student TRUE and Paid 50.00. The price is 25.00 and the discount is 10%.', [
    step('Validate and calculate', '2 is within 1 to 8. The subtotal is 50.00 and the student total is 45.00. Display 45.00, then obtain payment 50.00.'),
    step('Complete the successful payment', '50.00 >= 45.00 is TRUE. Store Change = 5.00 and PlacesLeft = 6, then output Confirmed, 5.00 and 6.'),
    step('Change one input and retrace', 'With Paid 44.00, the amount due is still 45.00, but payment fails and PlacesLeft stays 8. With Quantity 9, reject before reading student status or payment. These traces test different branches rather than just different arithmetic.'),
  ], 'The complete algorithm must preserve rules, input dependencies and state on every path.'),
  check: { prompt: 'Independently write the full pseudocode for the stated single-purchase rules. Trace Quantity 1, PlacesLeft 1, Student FALSE, Paid 25.00; then trace Quantity 0, PlacesLeft 8.', answer: code(['CONSTANT TicketPrice = 25.00', 'DECLARE Quantity, PlacesLeft : INTEGER', 'DECLARE Student : BOOLEAN', 'DECLARE Subtotal, Total, Paid, Change : REAL', 'INPUT Quantity', 'INPUT PlacesLeft', 'IF (Quantity >= 1) AND (Quantity <= PlacesLeft) THEN', '    INPUT Student', '    Subtotal ← Quantity * TicketPrice', '    IF Student THEN', '        Total ← Subtotal * 0.90', '    ELSE', '        Total ← Subtotal', '    ENDIF', '    OUTPUT Total', '    INPUT Paid', '    IF Paid >= Total THEN', '        Change ← Paid - Total', '        PlacesLeft ← PlacesLeft - Quantity', '        OUTPUT "Confirmed", Change, PlacesLeft', '    ELSE', '        OUTPUT "Insufficient payment"', '    ENDIF', 'ELSE', '    OUTPUT "Unavailable"', 'ENDIF', '// First case: 25.00; Confirmed, 0.00, 0.', '// Second case: Unavailable; do not request Student or Paid.']) },
  takeaway: 'A complete solution connects a suitable model, defined data, precise rules and correct control flow.',
  bridge: 'Next, keep the design method while replacing the familiar ticket rules with a different calculation.',
  lab: 'ticket', labConfig: { variant: 'complete' },
  experimentPrompt: 'Predict the branch, output sequence and remaining places before each run. Change one input at a time and explain which rule changes the outcome.',
  challenge: { prompt: 'Extend the design to three buyers without reinitialising the available places for every buyer. Where should the loop and stock initialisation go?', answer: 'Obtain the initial PlacesLeft once before the three-buyer loop. Inside the loop read the next Quantity and run the request, charge and payment logic using the current PlacesLeft. Update it only on successful payment. Do not input the original stock again or restore it at the start of each iteration.' },
});

const u19 = group(19, 'Transfer refinement to a different set of rules', ['S9-INTEGRATED-REFINEMENT'], [...ids(8, 1), ...ids(9, 1)], {
  question: 'Which order of operations matters when a reward uses both spending bands and whole dollars?',
  observe: 'A separate shop awards points. Below 10 dollars the rate is 5 per whole dollar; from 10 through 100 it is 7; above 100 it is 10. A spend of 100.50 belongs to the highest band even though its whole-dollar part is 100.',
  stimulus: { title: 'New scenario, new rules', items: ['Amount 99.77: middle band; 99 whole dollars', 'Amount 100.50: highest band; 100 whole dollars', 'Choose the band from the original amount', 'Apply that rate to all whole dollars; no progressive slices'] },
  prerequisite: { title: 'Discarding a fraction is not rounding', body: 'For a non-negative amount, taking its whole-dollar part removes the fractional part: 99.77 becomes 99. It does not become 100. This lesson can express that operation in words; do not invent an unspecified function name. These reward rules do not alter the ticket-price rules.' },
  steps: [
    step('Separate the original amount from the derived value', 'Keep Amount as the complete REAL input. WholeDollars is a derived INTEGER value. They have related but different jobs: the original amount chooses the band, while whole dollars determine how many units earn points.'),
    step('Select exactly one rate', 'Test Amount < 10 for rate 5. Otherwise, test Amount <= 100 for rate 7. The remaining case is above 100 and uses rate 10. Values exactly 10 and exactly 100 belong to the middle band.'),
    step('Apply the rate after obtaining whole dollars', 'Discard the fractional part to obtain WholeDollars, then calculate Points = WholeDollars × Rate. The chosen rate applies to the entire whole-dollar amount. Nothing in the rule asks for separate portions charged at different rates.'),
    step('Refine and challenge the order', 'Write input, band selection, whole-dollar conversion, multiplication and output as explicit actions. Use 100.50 to detect the mistake of truncating before band selection: that error would choose rate 7 instead of 10.'),
  ],
  worked: worked('Compare two nearby amounts', 'Apply the reward rules independently to 99.77 and 100.50.', [
    step('Choose rates from the original values', '99.77 is at least 10 and no greater than 100, so its rate is 7. 100.50 is greater than 100, so its rate is 10.'),
    step('Obtain the whole-dollar quantities', 'Discard the fractional parts: 99.77 gives 99 whole dollars and 100.50 gives 100. Keep each selected rate with its own original transaction.'),
    step('Calculate and verify', '99 × 7 = 693 points. 100 × 10 = 1000 points. Rounding 99.77 to 100 would wrongly give 700; choosing a band after truncating 100.50 would also wrongly give 700.'),
  ], 'Correct refinement preserves the meaning and required order of each transformation.'),
  check: { prompt: 'Give a five-step refinement in words for this calculation. Then state the points for Amount 10.00 and Amount 100.00.', answer: '1. Read Amount. 2. Choose rate 5 below 10, otherwise rate 7 up to and including 100, otherwise rate 10. 3. Discard the fractional dollar part to obtain WholeDollars. 4. Multiply WholeDollars by the selected rate. 5. Output Points. Amount 10.00 earns 70; Amount 100.00 earns 700.' },
  takeaway: 'A new scenario requires its own rules; refinement must preserve their boundaries, transformations and dependencies.',
  bridge: 'Finally, design a solution for an unfamiliar situation without copying the ticket algorithm.',
  papers: ['E074'], lab: 'refinement', labConfig: { variant: 'points' },
  experimentPrompt: 'Before each refinement is revealed, name the original value and derived value it needs. Test just below, at and just above each band boundary.',
  trap: 'A familiar multiplication is not enough: choosing the rate and removing the fraction in the wrong order changes the result.',
  challenge: { prompt: 'A learner proposes “award 5 points for each of the first 10 dollars, then 7 for the next dollars”. Explain why that is a different algorithm.', answer: 'That proposal uses progressive slices. The stated rule selects one rate from the whole original amount and applies it to all whole dollars. For 99.77 the correct calculation is 99 × 7, not a sum of portions at different rates.' },
});

const u20 = group(20, 'Design, trace and improve an unfamiliar solution', ['S9-INTEGRATED-MODULES', 'S9-INTEGRATED-IPO', 'S9-INTEGRATED-REFINEMENT'], [...ids(1, 1, 2, 3, 4), ...ids(2, 1, 2), ...ids(3, 1), ...ids(4, 1), ...ids(5, 1), ...ids(6, 1), ...ids(7, 1, 2, 3), ...ids(8, 1), ...ids(9, 1)], {
  question: 'Can you choose the model and construct the algorithm when the familiar ticket story is removed?',
  observe: 'A science club takes exactly three equipment-hire requests. Available devices begin at 5. Each accepted request costs 4.00 per device plus one 10.00 deposit per order. There is no student discount. Confirm only when the quantity fits and payment is sufficient.',
  stimulus: { title: 'Equipment-hire design brief', items: ['Process exactly 3 requests; start with 5 devices', 'Quantity must be at least 1 and no greater than DevicesLeft', 'Charge = Quantity × 4.00 + 10.00 per accepted order', 'Display Charge, then read Paid, only for a quantity that fits', 'Success: reduce devices and output Confirmed with the change', 'Failure: output Unavailable or Insufficient payment; preserve the stock', 'After all requests, output the number of successful hires'] },
  prerequisite: { title: 'Use the method without assuming the old rules', body: 'Quantity and DevicesLeft are INTEGER; Paid and Charge are REAL; supplied payment is non-negative and all input types are correct. Devices are not returned during these three requests. Attempt the design and its checks before opening a worked answer.' },
  steps: [
    step('Produce a purpose-specific model', 'Retain requested quantity, available devices, payment and the fixed charging rule. Record the successful-hire count because the final output requires it. Poster colours and individual device serial numbers are outside this quantity-only task.'),
    step('Decompose and refine the work', 'Use responsibilities for quantity checking, charge calculation and payment completion. A charge function can receive Quantity and return Quantity * 4.00 + 10.00. Refine each responsibility into statements; naming it alone is not an implementation.'),
    step('Place state and repetition deliberately', 'Initialise DevicesLeft to 5 and SuccessfulHires to zero once before a three-iteration loop. Every iteration reads a fresh Quantity. Increment SuccessfulHires and reduce stock only after sufficient payment; then proceed to the next request.'),
    step('Create and compare representations', 'Write pseudocode and a flowchart for the same solution. In the diagram, show the loop count explicitly and let each success or rejection route return to the next iteration. Translate one selected branch into Structured English without changing its conditions.'),
    step('Use evidence to identify the next learning need', 'A correct trace checks understanding of supplied operations. Completing a missing branch checks modification. Constructing the model, code and flowchart from this brief checks independent design. Use the first incorrect step to decide which earlier concept to revisit.'),
  ],
  worked: worked('Check the independent design after attempting it', 'Use three requests: Quantity 2 with Paid 20.00; Quantity 4; Quantity 3 with Paid 21.00. Start with 5 devices and zero successful hires.', [
    step('Trace a successful hire', 'The first quantity fits. Charge is 2 × 4.00 + 10.00 = 18.00. Payment 20.00 succeeds, giving change 2.00, DevicesLeft 3 and SuccessfulHires 1. The deposit is charged once for the order.'),
    step('Trace a request that cannot be met', 'Quantity 4 exceeds the current DevicesLeft 3. Reject without asking for payment. The two stored counts remain 3 devices and 1 successful hire.'),
    step('Trace underpayment and the final report', 'Quantity 3 fits and requires 3 × 4.00 + 10.00 = 22.00. Paid 21.00 is insufficient, so stock and successful count remain unchanged. After all three requests, output SuccessfulHires = 1.'),
  ], 'Independent design succeeds when the model, representations and traces all implement the new brief rather than the previous example.'),
  check: {
    prompt: 'New independent brief: a parcel desk reads exactly five non-negative REAL masses. Accept masses from 2 to 5 kg inclusive. After all five inputs, output the accepted count. If that count is positive, also output the mean mass of the accepted parcels; otherwise output "No accepted parcels". All inputs have the stated type.\n\nProduce an abstract model, an identifier table with purposes, named responsibilities with their data, complete pseudocode and a matching flowchart. Trace inputs 1.9, 2, 3.5, 5, 5.1 and a set with no accepted masses. Explain why the mean is calculated after the loop and why zero accepted parcels need a separate path.',
    answer: code([
      '// Model: current Mass, accepted count and accepted-mass sum.',
      '// Identifier purposes: Index = input position; Mass = current kilograms;',
      '// AcceptedCount = qualifying parcels; TotalMass = sum of qualifying masses;',
      '// MeanMass = mean of qualifying masses when at least one qualifies.',
      '// Responsibilities: read a mass; decide acceptance; accumulate; report.',
      'DECLARE Index, AcceptedCount : INTEGER',
      'DECLARE Mass, TotalMass, MeanMass : REAL',
      'AcceptedCount ← 0',
      'TotalMass ← 0',
      'FOR Index ← 1 TO 5',
      '    INPUT Mass',
      '    IF (Mass >= 2) AND (Mass <= 5) THEN',
      '        AcceptedCount ← AcceptedCount + 1',
      '        TotalMass ← TotalMass + Mass',
      '    ENDIF',
      'NEXT Index',
      'OUTPUT AcceptedCount',
      'IF AcceptedCount > 0 THEN',
      '    MeanMass ← TotalMass / AcceptedCount',
      '    OUTPUT MeanMass',
      'ELSE',
      '    OUTPUT "No accepted parcels"',
      'ENDIF',
      '// Trace: 3 accepted parcels; TotalMass 10.5; MeanMass 3.5.',
      '// For 0, 1, 1.9, 5.1, 6: count 0 and the no-accepted-parcels message.',
      '// Flowchart: initialise count, sum and Index=1; test Index<=5.',
      '// Yes: input mass; acceptance diamond; update on Yes only;',
      '// join at Index←Index+1 and return to the loop test.',
      '// No: output count; test count>0; calculate/output mean or output message;',
      '// join at End. Never divide by zero.'
    ]),
  },
  takeaway: 'Demonstrate understanding by tracing, modifying and independently constructing a solution that satisfies an unfamiliar specification.',
  bridge: 'Use the result of each check to revisit the relevant session: data, conditions, loops, representations, decomposition or refinement.',
  experimentPrompt: 'First predict all three outcomes on paper. Then change one payment to the exact amount and trace the downstream stock and successful-hire count again.',
  challenge: {
    prompt: 'Return to the equipment-hire brief. Write the complete three-request pseudocode and use a named deposit constant. Explain what changes if the deposit becomes 12.00 per order.',
    answer: code([
      'CONSTANT DevicePrice = 4.00',
      'CONSTANT Deposit = 10.00',
      'DECLARE RequestNumber, Quantity, DevicesLeft, SuccessfulHires : INTEGER',
      'DECLARE Charge, Paid, Change : REAL',
      'DevicesLeft ← 5',
      'SuccessfulHires ← 0',
      'FOR RequestNumber ← 1 TO 3',
      '    INPUT Quantity',
      '    IF (Quantity >= 1) AND (Quantity <= DevicesLeft) THEN',
      '        Charge ← Quantity * DevicePrice + Deposit',
      '        OUTPUT Charge',
      '        INPUT Paid',
      '        IF Paid >= Charge THEN',
      '            Change ← Paid - Charge',
      '            DevicesLeft ← DevicesLeft - Quantity',
      '            SuccessfulHires ← SuccessfulHires + 1',
      '            OUTPUT "Confirmed", Change',
      '        ELSE',
      '            OUTPUT "Insufficient payment"',
      '        ENDIF',
      '    ELSE',
      '        OUTPUT "Unavailable"',
      '    ENDIF',
      'NEXT RequestNumber',
      'OUTPUT SuccessfulHires',
      '// New deposit: change its constant definition to 12.00 and retest.',
      '// For 2 paid 20; 4 unavailable; 3 paid 21: final count 1, stock 3.'
    ]),
  },
});

export const section9Journey = {
  49: { title: 'From a real ticket desk to an abstract model', intro: 'Begin with concrete requests and decide which information and instructions a useful solution needs.', groups: [u01, u02] },
  50: { title: 'Connect responsibilities through program modules', intro: 'Use the values and control structures already learned to design cooperating parts of a ticket solution.', groups: [u16] },
  51: { title: 'Represent data with meaningful names', intro: 'Separate a data item’s name, type, purpose and current value before using it in an algorithm.', groups: [u03] },
  52: { title: 'Make input, processing and output visible', intro: 'Follow the source of every value and reveal each assignment before displaying the result.', groups: [u04] },
  53: { title: 'Choose and repeat the required operations', intro: 'Build selection and three loop forms in separate sessions, then combine them in complete solutions.', groups: [u06, u10, u11, u12, u13] },
  54: { title: 'Preserve an algorithm across representations', intro: 'Translate between words, pseudocode and flowcharts, progressing from a short sequence to two input phases.', groups: [u05, u07, u14, u15] },
  55: { title: 'Refine a design to programmable detail', intro: 'Expand unresolved operations and test the final steps against their original purpose.', groups: [u17] },
  56: { title: 'Turn exact rules into reliable conditions', intro: 'Construct, trace and challenge comparisons and compound logic before relying on their results.', groups: [u08, u09] },
  57: { title: 'Integrate the method and transfer it', intro: 'Complete the ticket purchase, adapt the method to a new calculation and independently design an unfamiliar solution.', groups: [u18, u19, u20] },
};

const orderedGroups = [u01, u02, u03, u04, u05, u06, u07, u08, u09, u10, u11, u12, u13, u14, u15, u16, u17, u18, u19, u20];
export const section9Sessions = orderedGroups.map((item, index) => ({
  id: item.id, title: item.title, focus: item.question, minutes: 45, groups: [item.id],
  prerequisiteGroups: index === 0 ? [] : [orderedGroups[index - 1].id],
}));
