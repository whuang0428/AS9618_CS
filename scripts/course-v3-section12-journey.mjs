import { codeFor12, structureCode } from './course-v3-section12-programs.mjs';

// One authored route supplies classroom teaching and full reading. Booking
// scenarios and short checks are teacher-written; E098–E107 retain source papers.
const ids = (requirement, ...numbers) => numbers.map(number => `S12.${String(requirement).padStart(2, '0')}.A${String(number).padStart(2, '0')}`);
const table = (headers, rows, title) => ({ headers, rows, ...(title ? { title } : {}) });
const step = (title, body, extra = {}) => ({ title, body, ...extra });
const worked = (title, setup, steps, conclusion) => ({ title, setup, steps, conclusion });
const recall = (title, body) => ({ title, body });
const specimen = (title, ...items) => ({ title, items });
const check = (prompt, answer) => ({ prompt, answer });
const diagram = (name, alt, caption) => ({ asset: `/assets/course-v3/section-12/${name}.svg`, alt, caption });

const bookingCode = `PROCEDURE ReadBooking(BYREF Seats : INTEGER, BYREF Price : REAL)
    INPUT Seats
    INPUT Price
ENDPROCEDURE

FUNCTION CalculateCharge(BYVAL Quantity : INTEGER, BYVAL PriceEach : REAL) RETURNS REAL
    RETURN Quantity * PriceEach
ENDFUNCTION

PROCEDURE DisplayCharge(BYVAL Amount : REAL)
    OUTPUT Amount
ENDPROCEDURE

PROCEDURE BookingController
    DECLARE Seats : INTEGER
    DECLARE Price, Total : REAL
    CALL ReadBooking(Seats, Price)
    Total <- CalculateCharge(Seats, Price)
    CALL DisplayCharge(Total)
ENDPROCEDURE

CALL BookingController`;
const capacityCode = upper => `DECLARE Seats : INTEGER
INPUT Seats
IF (Seats >= 1) AND (Seats <= ${upper}) THEN
    OUTPUT "Accepted"
ELSE
    OUTPUT "Rejected"
ENDIF`;
const bookingCountCode = enhanced => `DECLARE Index, Seats, Total : INTEGER${enhanced ? '\nDECLARE GroupBookings : INTEGER' : ''}
Total <- 0${enhanced ? '\nGroupBookings <- 0' : ''}
FOR Index <- 1 TO 3
    INPUT Seats
    Total <- Total + Seats${enhanced ? '\n    IF Seats >= 3 THEN\n        GroupBookings <- GroupBookings + 1\n    ENDIF' : ''}
NEXT Index
OUTPUT Total${enhanced ? '\nOUTPUT GroupBookings' : ''}`;

export const section12PaperObjectives = {
  E098: ids(1, 3, 4, 5, 6),
  E099: ids(2, 1, 3),
  E100: ids(3, 1),
  E101: ids(4, 2, 4, 5),
  E102: [...ids(4, 3, 4), ...ids(5, 4, 5)],
  E103: ids(5, 8),
  E104: ids(7, 1, 2),
  E105: ids(7, 1),
  E106: ids(8, 1, 3),
  E107: ids(9, 1),
};
export const section12PaperCoverageNotes = {
  E098: 'Explains why waterfall is unsuitable for the stated changing requirements and identifies iterative development or RAD. It does not assess every lifecycle stage or a full comparison of all models.',
  E099: 'Completes module and data/control-transfer labels from supplied interfaces, then explains selection in the chart. It does not require equivalent pseudocode; the complete booking and order implementations provide separate checks.',
  E100: 'Completes a PIN state-transition diagram from the supplied transition table, including a self-loop and input/output labels. Guarded transitions have a separate teaching example.',
  E101: 'Identifies syntax and bounds faults, explains an unreachable CASE alternative and names a run-time error. The original task asks for identification rather than corrected code. Correction, retesting and prevention are checked separately in the teaching route.',
  E102: 'Explains temporary stubs and a behavioural error exposed by black-box testing. The marking scheme accepts logic or run-time errors with a suitable description; it does not assess dry runs, walkthroughs or every testing stage.',
  E103: 'Identifies acceptance testing from a customer checking a completed system after alpha and beta. Separate checks teach the characteristics of alpha and beta.',
  E104: 'Completes test-plan rows with category, value and expected outcome for an integer sensor domain. Attempt after test-data categories and plan records; it does not assess a complete test strategy.',
  E105: 'Chooses distinct valid sentinel-terminated test sequences with a purpose. The task is about behaviour and sequences rather than identifying every normal, abnormal and boundary category.',
  E106: 'Gives contextual reasons for adaptive maintenance of a production-line program. Corrective and perfective maintenance have separate teacher-written checks.',
  E107: 'Analyses a changed record requirement and explains an unambiguous enhancement. The full original context and supplied string interface remain available. Writing complete amended pseudocode is checked separately; this question asks for an explanation.',
};

export const section12Journey = {
  84: {
    title: 'Turn a booking request into a development plan',
    intro: 'The booking program from Sections 9–11 is a starting point. Follow one requirement through the work that makes a program suitable for its users, then compare ways to organise that work.',
    groups: [
      {
        id: 'develop-booking-requirement', title: 'Follow one requirement through five stages',
        unitKeys: ['S12-LIFECYCLE-STAGES'], objectiveIds: ids(1, 1, 2), prerequisites: [], lab: 'lifecycle',
        image: { asset: '/assets/course-v3/section-12/development-workshop.png', alt: 'A school booking team follows a request from a paper form to a designed screen, a program and test results.', caption: 'What evidence would show that the booking desk received the system it needed?' },
        stimulus: specimen('A message from the booking desk', '“Let one group request between one and six seats. Tell us whether the request is accepted.”', 'Mina enters 3. Another attendee enters 0. A third enters 6.', 'For this small feature, each request is independent. Available is 6; accepted requests do not reduce it. Raw text parsing and payment are separate features.'),
        question: 'Before writing code, what must the team agree about 0 and 6?',
        observe: 'Predict the three decisions. Then imagine that the teacher expects 6 to pass but the programmer expects only 1–5. Working code would still implement the wrong agreement.',
        prerequisite: recall('Recall a specification and an algorithm', 'The specification states the required behaviour. An algorithm is the sequence of steps used to achieve it. A BOOLEAN condition such as Seats <= 6 can help implement a rule, but the rule must first be agreed.'),
        steps: [
          step('Analysis: make the request precise', 'Ask users what the program must do. Agree that the input is an INTEGER, 1–6 inclusive is accepted, and every other integer is rejected. Record the messages, independent-request assumption and any constraints. The specification now determines what correct means.'),
          step('Design: describe how to meet it', 'Choose Seats as an INTEGER, read it, test both limits with AND and choose one of two output messages. Plan the module interfaces and boundary tests before implementation. Design describes a solution; analysis establishes the need it must satisfy.'),
          step('Coding and testing: implement, then compare', 'Coding expresses the design as statements. Testing supplies inputs and compares actual results with results independently derived from the specification. Input 6 must produce Accepted even if the program currently says Rejected.', { code: capacityCode(6) }),
          step('Maintenance: support the delivered program', 'After delivery, repair newly found defects, adapt to environmental changes or improve the program. Keep requirements, designs and tests consistent with an approved change. A development life cycle organises these activities and their evidence; completing a checklist cannot itself prove correctness.'),
        ],
        worked: worked('Trace the requirement, not just the code', 'The original rule is 1–6 inclusive. During testing, the implementation rejects 6.', [
          step('Locate the disagreement', 'The agreed specification and its expected result both say Accepted. Inspect the design and implementation for a missing equality, instead of changing the expected result to make the test pass.'),
          step('Connect each stage to a concrete product', 'One requirement can be followed from agreement to evidence.', { table: table(['Stage', 'Product'], [['Analysis', 'Integer quantity; accept 1–6'], ['Design', 'Both comparisons joined by AND'], ['Coding', 'Complete IF/ELSE implementation'], ['Testing', '6: expected Accepted, actual Rejected'], ['Maintenance', 'A recorded post-delivery change and its retest']]) }),
        ], 'Keep the required behaviour, implementation and test evidence connected.'),
        check: check('A user asks for a larger permitted group. Which activity agrees the new limit, and which activity decides the revised comparison?', 'Analysis agrees the new required limit with the user. Design decides how to represent and enforce it. Coding implements that design, and testing compares behaviour with the revised requirement.'),
        takeaway: 'The life cycle connects a user need to an implemented, checked and supported solution.',
        bridge: 'The activities are needed in every model. Their organisation determines when feedback can change the work.',
        trap: 'A program that translates and runs can still implement the wrong requirement. Expected results come from the agreed rule.', papers: [],
      },
      {
        id: 'develop-waterfall', title: 'Review one stage before moving to the next',
        unitKeys: ['S12-WATERFALL'], objectiveIds: ids(1, 3), prerequisites: ['develop-booking-requirement'],
        stimulus: { title: 'A fixed pricing contract', table: table(['Constraint', 'Evidence'], [['Rule', 'Each seat costs 12.50; no discount'], ['Approval', 'The bursar must approve the written calculation'], ['Change', 'The rule is expected to remain fixed for this release']]) },
        question: 'How could agreed stage outputs help this project stay organised?',
        observe: 'Place the approved requirement, design, code and test report in order. Each is used by the next activity. Now imagine finding a different pricing rule only at final testing.',
        prerequisite: recall('Recall what each stage produces', 'Analysis supplies required behaviour. Design supplies algorithms and interfaces. Coding implements them. Testing checks the required outcomes. A review checks a stage output before later work depends on it.'),
        steps: [
          step('Organise the work largely in sequence', 'Waterfall normally settles and reviews one planned stage before proceeding to the next. Requirements lead to design, then implementation and testing. Written outputs establish a common basis for the people responsible for each stage.'),
          step('Explain the benefit in this context', 'Stable price rules make it practical to agree the calculation early. The bursar can review the requirement and design; the team can plan milestones and trace each test to an approved rule.'),
          step('Follow a late change backwards', 'If the working form reveals that school groups require a discount, the team may need to revise requirements, calculations, code and tests. Returning to earlier work is possible, but completed work can need substantial revision. Users may see useful working software only late in the process.'),
        ],
        worked: worked('Assess one change discovered late', 'The existing design calculates Seats * 12.50. During final testing, users reveal a required 10% school-group discount.', [
          step('Identify affected outputs', 'Confirm the discount rule and eligible users; revise the selection and calculation; amend the implementation; add ordinary, qualifying and boundary cases to the tests.'),
          step('Connect cause to drawback', 'The cost comes from changing work that later stages already relied on. “Waterfall is slow” does not explain that dependency; a late requirement discovery and resulting rework do.'),
        ], 'A model comparison should link its organisation to the actual constraints.'),
        check: check('Give one reason waterfall could fit fixed, approved price rules and one reason it could be difficult for an unclear new interface.', 'Reviewed stage documents support the fixed calculation and its formal approval. With an unclear interface, useful user feedback may arrive after implementation, causing requirements, design, code and tests to be revised.'),
        takeaway: 'Waterfall gives planned stage outputs; late requirement changes can make those outputs expensive to revise.',
        bridge: 'A team with uncertain details can use working versions to learn earlier.',
        trap: 'Waterfall does not mean change is impossible. Explain why late change may be costly.', papers: [],
      },
      {
        id: 'develop-iterations', title: 'Use feedback to improve the next version',
        unitKeys: ['S12-ITERATIVE'], objectiveIds: ids(1, 4), prerequisites: ['develop-waterfall'],
        stimulus: { title: 'Two booking-form reviews', table: table(['Version', 'What the user sees', 'Finding'], [['1', 'Rejected', 'The reason is unclear'], ['2', 'Enter an integer from 1 to 6', 'The attendee can correct the request']]) },
        question: 'What changed between these versions, and what should remain the same?',
        observe: 'The valid range has not changed. The message has improved after a review. Predict which old tests are still useful and which new check is needed.',
        prerequisite: recall('Recall a development change', 'Changing a program version is different from running the same program again. A version can refine existing behaviour, add a planned feature or do both.'),
        steps: [
          step('Give the next iteration a specific aim', 'Iterative development repeats analysis, design, coding and testing through successive versions. For this cycle, the aim is to explain a rejection clearly, while retaining the agreed range.'),
          step('Obtain evidence from the working version', 'Users try the current form. Record the observed difficulty: they cannot tell which values are allowed. That evidence guides the next design and implementation, rather than making an unrelated visual change.'),
          step('Review the result and control scope', 'Test the improved message and the existing acceptance decisions. Decide whether the agreed aim is met. Prioritise new requests, keep versions and documents consistent, and define when the release is ready. Uncontrolled extra cycles can expand scope and delay delivery.'),
        ],
        worked: worked('Choose the next useful change', 'A review suggests clearer rejection text, a new report and a colour theme. This iteration has time for one requirement.', [
          step('Choose from the evidence', 'Prioritise the rejection explanation because it prevents users completing a booking. Record the report and theme as separate requests for later decisions.'),
          step('Define completion', 'Inputs 1, 3 and 6 remain accepted; 0 and 7 are rejected with the agreed guidance. Review whether users can now correct an invalid request.'),
        ], 'An iteration needs an aim, a working result, feedback and a decision about what follows.'),
        check: check('Does running the same five tests twice create two development iterations? Explain.', 'No. Repeated tests may verify a program, but an iterative development cycle uses review evidence to revise a version through relevant development activities.'),
        takeaway: 'Iterative development learns from successive versions, with priorities and completion criteria to control change.',
        bridge: 'Rapid application development also uses feedback, with particular emphasis on fast prototypes and time boxes.',
        trap: 'More iterations do not automatically improve a program. Uncontrolled changes can lose the agreed goal.', papers: [],
      },
      {
        id: 'develop-rad-choice', title: 'Choose a model from the project evidence',
        unitKeys: ['S12-RAD'], objectiveIds: ids(1, 3, 4, 5, 6), prerequisites: ['develop-iterations'],
        stimulus: specimen('A short prototype brief', 'Booking staff can review a prototype every afternoon.', 'The team has two weeks to demonstrate the form.', 'Existing form components are available; the reporting module can be developed separately.'),
        question: 'Which details make rapid development possible besides the deadline?',
        observe: 'Remove daily user access from the brief. Then remove the reusable components. Explain how each change makes the same deadline harder to meet.',
        prerequisite: recall('Recall feedback and modularity', 'Feedback identifies what to improve. Modules separate responsibilities and communicate through agreed interfaces. Reusing a suitable component can reduce implementation work, but the combined system still needs testing.'),
        steps: [
          step('Use a prototype to obtain an early response', 'Rapid application development, RAD, builds useful prototypes quickly and involves users frequently. A prototype lets booking staff try a screen and report misunderstandings before all features are complete.'),
          step('Limit each period of work', 'A time box is an agreed, short development period. The team chooses achievable scope for it, reuses suitable components and may develop separable modules alongside one another. A time box does not guarantee every requested feature will be finished.'),
          step('State benefits and conditions', 'Early working behaviour speeds up feedback. User availability, skilled developers and suitable modular components help this approach. Unavailable users, difficult integration or strong approval requirements can make rapid revisions harder to control. The resulting program still needs accurate requirements and testing.'),
          step('Compare the same project constraints', 'Use evidence rather than choosing from a slogan.', { table: table(['Project evidence', 'Possible choice and reason'], [['Stable calculation and required stage approval', 'Waterfall: reviewed outputs support planning'], ['Uncertain details that users can review in versions', 'Iterative: each review guides the next cycle'], ['Short prototype period, available users and reusable parts', 'RAD: fast prototypes and time boxes support frequent feedback']]) }),
        ],
        worked: worked('Justify a choice without overclaiming', 'The new booking interface must be demonstrated soon and users are still discovering the best workflow.', [
          step('Explain the pressure', 'A largely sequential process risks obtaining working-interface feedback after too many decisions are fixed. Successive prototypes or versions can expose uncertainties sooner.'),
          step('Select with a limitation', 'RAD is plausible if staff can review frequently and the team can build the prototype quickly. If those conditions are absent, the short deadline alone is not enough justification.'),
        ], 'Name the relevant model feature, connect it to a stated constraint, then explain its consequence.'),
        check: check('A team has a short deadline but cannot contact users until delivery. Why is “use RAD because it is fast” incomplete?', 'RAD depends on frequent user feedback on rapid prototypes. The unavailable users remove that feedback mechanism; the deadline alone does not establish that RAD is suitable.'),
        takeaway: 'Choose a development model by relating requirements, feedback, resources and approvals to its actual features.',
        bridge: 'Whichever model is chosen, the design must divide the booking task into understandable responsibilities.',
        trap: 'Iterative development and RAD share feedback ideas. Describe their features rather than claiming one always guarantees speed or correctness.', papers: ['E098'],
      },
    ],
  },
  85: {
    title: 'Design modules that exchange the right information',
    intro: 'Split one booking calculation into input, calculation and display. Rebuild parameter knowledge at each interface, then translate the design into complete pseudocode.',
    groups: [
      {
        id: 'develop-module-responsibilities', title: 'Divide the task before drawing the chart',
        unitKeys: ['S12-STRUCTURE-HIERARCHY'], objectiveIds: ids(2, 1, 2, 3), prerequisites: ['develop-rad-choice'],
        stimulus: specimen('One booking receipt', 'Read Seats 3 and Price 12.50.', 'Calculate Total 37.50.', 'Display that total. Inputs already satisfy Seats 1–6 and Price >= 0.'),
        question: 'Which responsibilities can be named separately, and who coordinates them?',
        observe: 'Imagine three people handling input, arithmetic and display. The display person needs the calculated amount, not a new copy of the booking form. Identify who passes that amount on.',
        prerequisite: recall('Recall a subprogram call', 'A procedure groups an action under a name. CALL starts that action and then returns control to the caller. A function computes and returns a value. Defining a subprogram does not automatically execute it.'),
        steps: [
          step('Choose coherent responsibilities', 'BookingController coordinates the booking. ReadBooking obtains values, CalculateCharge computes their product and DisplayCharge displays the supplied amount. Each module name describes one responsibility; individual arithmetic operators do not each need a module.'),
          step('Place the caller above its children', 'A structure chart uses named rectangles for modules and hierarchy connections for calls. Put BookingController above its three children. The siblings do not call one another merely because they appear next to each other.', { image: diagram('booking-structure', 'BookingController calls ReadBooking, CalculateCharge and DisplayCharge. The reader updates Seats and Price; the calculation returns Total; display receives Amount.', 'Grey connections show calls. Labelled arrows show information moving across each interface.') }),
          step('Refine a large responsibility when needed', 'If ReadBooking must later obtain customer details and booking details separately, it can call two smaller modules on another level. The chart documents decomposition and interfaces; it does not show every internal assignment, decision or loop.'),
          step('Read a second instance of the same pattern', 'This order chart has the same three responsibilities: its Quantity corresponds to Seats and UnitPrice to Price. The grey lines show calls; the arrows show data. Follow the parent as the coordinator.', { image: diagram('order', 'ProcessOrder calls ReadOrder, CalculateCost and DisplayCost; labelled arrows show quantity, unit price and cost.', 'A separate order example uses the same input–calculation–display design.') }),
        ],
        worked: worked('Sketch the booking hierarchy', 'The specification requires one input action, one calculation and one display.', [
          step('Name the parent and children', 'Draw BookingController above ReadBooking, CalculateCharge and DisplayCharge, with a calling connection from the parent to each child. State that this example calls them in that sequence.'),
          step('Check what the picture claims', 'A line from ReadBooking directly to DisplayCharge would say the reader calls the display routine. That is different from the intended parent-controlled design. Use a flowchart if you need to document the detailed path within a module.'),
        ], 'A good chart makes the chosen responsibilities and caller relationships visible.'),
        check: check('Why is a structure chart useful before coding, and why does it not replace a flowchart?', 'It shows how the task is decomposed and which modules call which other modules. It does not normally specify every internal decision, assignment or execution path, which a flowchart can show.'),
        takeaway: 'A structure chart records module responsibilities, hierarchy and interfaces.',
        bridge: 'A calling connection alone does not show how Seats and Total reach the modules that need them.',
        trap: 'A lower box is a called module, not necessarily the next individual statement in execution.', papers: [],
      },
      {
        id: 'develop-module-data', title: 'Follow values across each interface',
        unitKeys: ['S12-STRUCTURE-PARAMETERS'], objectiveIds: ids(2, 1), prerequisites: ['develop-module-responsibilities'],
        stimulus: { title: 'The parent has three storage locations', table: table(['Before input', 'After input', 'After calculation'], [['Seats: not assigned', 'Seats: 3', 'Seats: 3'], ['Price: not assigned', 'Price: 12.50', 'Price: 12.50'], ['Total: not assigned', 'Total: not assigned', 'Total: 37.50']]) },
        question: 'How can the reader supply values back, while the calculator only needs copies?',
        observe: 'Mark the moment each parent variable receives a value. A returned amount and an output on the screen are different destinations.',
        prerequisite: recall('Recall argument, parameter and return', 'The caller supplies arguments such as Seats and Price. A subprogram header declares formal parameters such as Quantity and PriceEach. BYVAL gives the subprogram a copy. BYREF allows it to update the caller’s variable. RETURN supplies a function result to its caller.'),
        steps: [
          step('Let the input procedure update caller storage', 'ReadBooking uses BYREF Seats and BYREF Price because its INPUT statements must fill the parent’s variables. With value copies only, the reader would change its local parameters and leave the parent variables without these new values.'),
          step('Pass copies into a pure calculation', 'CalculateCharge receives the current Seats and Price in the ordered parameters Quantity and PriceEach. It returns their product as REAL. The parent assigns that value to Total; parameter names need not match argument names, but position and types must match.'),
          step('Pass the result into the display action', 'DisplayCharge receives Total as BYVAL Amount and uses OUTPUT. Its screen output is not a function return. Label the direction of each value on the chart so the caller knows what it must supply or can expect back.', { table: table(['Call or expression', 'Information crossing the interface'], [['CALL ReadBooking(Seats, Price)', 'Reader updates the two parent variables by reference'], ['Total <- CalculateCharge(Seats, Price)', 'Two values in; one REAL result back'], ['CALL DisplayCharge(Total)', 'Amount into the display procedure']]) }),
        ],
        worked: worked('Track the same 37.50 without losing its source', 'The entered values are 3 and 12.50.', [
          step('Bind the ordered arguments', 'Quantity receives 3 and PriceEach receives 12.50. The product is 37.50. RETURN sends that number back to the expression in BookingController.'),
          step('Store before displaying', 'Total receives 37.50. DisplayCharge then receives a copy in Amount and displays it. Reversing these two parent statements would try to display Total before it has this value.'),
        ], 'Explain both the direction of transfer and the operation that receives the information.'),
        check: check('CalculateCharge returns 37.50 but the parent never assigns or uses the returned value. Does calling DisplayCharge(Total) recover it automatically?', 'No. The function result must be used explicitly, for example Total <- CalculateCharge(Seats, Price), before Total is passed to DisplayCharge.'),
        takeaway: 'For each interface, identify the caller’s arguments, the parameter modes and where every result goes.',
        bridge: 'Now write complete bodies and parent calls that preserve those interfaces.',
        trap: 'BYREF is a caller update, RETURN is a function result and OUTPUT is a visible display. They are not interchangeable.', papers: [],
      },
      {
        id: 'develop-module-code', title: 'Translate the chart into a complete program',
        unitKeys: ['S12-STRUCTURE-CODE'], objectiveIds: ids(2, 3, 4), prerequisites: ['develop-module-data'], lab: 'structure',
        stimulus: specimen('The implementation contract', 'Read two already valid inputs: Seats 1–6 and non-negative Price.', 'Return Seats * Price as a REAL amount.', 'Display that result once. Input validation and payment are outside this calculation example.'),
        question: 'What is missing if the programmer writes only the module headers?',
        observe: 'Headers describe the interfaces. Locate the input statements, multiplication, output, parent calls and initial call that are also needed for a working implementation.',
        prerequisite: recall('Recall definitions and execution order', 'A declaration establishes a variable and type, not a starting value. Execution begins with the main call here. A procedure finishes at ENDPROCEDURE; a function’s RETURN gives control and a value back to the waiting expression.'),
        steps: [
          step('Implement each leaf responsibility', 'ReadBooking contains its two INPUT statements. CalculateCharge contains RETURN Quantity * PriceEach. DisplayCharge contains OUTPUT Amount. Their declared parameters and return type must match the intended data directions.'),
          step('Connect the calls in the parent', 'Declare the parent’s data, call the reader, assign the function result, then call the display procedure. Add the call that starts the controller.', { code: bookingCode }),
          step('Check equivalence with the design', 'Every module has the same responsibility as its chart box. The same values travel in the same direction. A program with matching names but a BYVAL reader, missing return assignment or reversed call order does not implement the same design.'),
        ],
        worked: worked('Dry-run the complete calls', 'Use input 3, 12.50; choose one receipt copy in the experiment.', [
          step('Follow entry and return', 'BookingController calls ReadBooking, which fills Seats and Price. Control returns to the parent. CalculateCharge receives copies, returns 37.50 and ends; the parent stores the result.'),
          step('Finish the visible action', 'DisplayCharge receives 37.50, displays it and returns. BookingController then finishes. The experiment also allows repeated display calls; changing the number of copies changes output count, not the calculated charge.'),
        ], 'Test a complete path from input to displayed output, including the calls between modules.'),
        check: check('For Seats 1 and Price 0.00, what does the program display? Why should it not omit the display?', 'It displays 0. The product is a valid zero amount, and the specification requires one displayed result. A zero value is not an instruction to skip the output.'),
        takeaway: 'Equivalent pseudocode preserves responsibilities, interfaces, call order and returned results.',
        bridge: 'More complex charts also communicate repeated or conditional module calls.',
        trap: 'Writing headers is not a complete translation. Include module bodies, parent data, ordered calls and a starting call.', papers: [],
      },
      {
        id: 'develop-module-control', title: 'Read repeated calls and conditional calls',
        unitKeys: ['S12-STRUCTURE-CONTROL'], objectiveIds: ids(2, 1, 3, 4), prerequisites: ['develop-module-code'],
        stimulus: specimen('A shop order extension', 'This separate example reads OrderCount, then Quantity, UnitPrice and Member for each order.', 'A member pays 90% of the ordinary cost; a non-member pays the full cost.', 'OrderCount may be zero. Quantity is positive, UnitPrice non-negative and Member BOOLEAN.'),
        question: 'Which module repeats, and which of two calculations runs for one order?',
        observe: 'Predict the output for one non-member order with Quantity 3 and UnitPrice 2.50, then for one member order with Quantity 2 and UnitPrice 5.00.',
        prerequisite: recall('Recall selection, repetition and BOOLEAN', 'FOR repeats a block for a known count. IF chooses an alternative from a Boolean result. The count of module calls and the choice of a child module are separate design decisions.'),
        steps: [
          step('Read repetition over the controlled call', 'An iteration mark on a structure chart indicates repeated calls under the controlling module. In this example ProcessBatch calls ProcessOrder once per order. OrderCount 0 produces No orders and makes no ProcessOrder call.', { image: diagram('batch-orders', 'ProcessBatch repeats ProcessOrder. CalculateCost selects StandardCost or MemberCost using Member.', 'Follow repetition at the parent and selection within CalculateCost separately.') }),
          step('Read selection at the parent that decides', 'A diamond indicates selection among the attached subordinate calls. CalculateCost calls MemberCost when Member is TRUE, otherwise StandardCost. Do not call both merely because both appear in the chart.'),
          step('Distinguish data and control couples', 'A labelled arrow shows transfer direction. An unfilled circle denotes a data couple; a filled circle denotes a control couple, such as a Boolean flag controlling a choice. Follow the supplied chart’s notation. A function may return a Boolean control value rather than a numeric data value. A returned INTEGER still uses an unfilled circle: filled does not mean return. A BYREF value may need arrows in both directions.', { image: diagram('structure-couples', 'An unfilled circle marks an INTEGER data transfer, a filled circle marks a BOOLEAN control transfer, and a BYREF data transfer has two-way arrows.', 'Circle fill distinguishes data and control; arrow direction distinguishes where the information goes.') }),
          step('Translate the control as well as the interfaces', 'The parent’s loop surrounds the ProcessOrder call; the IF belongs inside CalculateCost. The complete example includes definitions and all caller connections.', { code: codeFor12('batchOrders') }),
        ],
        worked: worked('Trace two orders through different branches', 'Input 2, then 3, 2.50, FALSE, then 2, 5.00, TRUE.', [
          step('First repeated call', 'ProcessOrder reads the non-member order. StandardCost returns 3 * 2.50 = 7.50. MemberCost is not called. DisplayCost receives 7.50.'),
          step('Second repeated call', 'ProcessOrder reads the member order. MemberCost returns 2 * 5.00 * 0.90 = 9.00. StandardCost is not called. After outputting 9.00, the batch loop finishes.'),
        ], 'Separate the hierarchy, value transfers, repetition and conditional choice when reading the chart.'),
        check: check('For OrderCount 0, how many reader calls occur? For one member order, do both cost functions execute?', 'There are zero reader calls when OrderCount is 0. For one member order only MemberCost executes; the alternative StandardCost call is skipped.'),
        takeaway: 'Translate each repeated or conditional call at the parent that controls it.',
        bridge: 'A structure chart describes modules. A state-transition diagram answers a different question: what can happen next from the current state?',
        trap: 'A structure-chart selection diamond indicates conditional module calls; it is not an ordinary flowchart box containing every internal condition.', papers: ['E099'],
      },
    ],
  },
  86: {
    title: 'Describe what the booking can do next',
    intro: 'A booking can remain in one state while waiting for an event. Trace state, event, condition and action separately before transferring the method to an unfamiliar diagram.',
    groups: [
      {
        id: 'develop-state-events', title: 'Keep the current state between events',
        unitKeys: ['S12-STATES-MEANING', 'S12-STATES-TRACE'], objectiveIds: ids(3, 1), prerequisites: ['develop-module-control'], lab: 'states',
        stimulus: { title: 'One booking, three states', table: table(['State', 'Meaning'], [['Draft', 'A request is being prepared'], ['Pending', 'A valid request has been submitted; payment is awaited'], ['Confirmed', 'Payment has been received']]) },
        question: 'Does pressing Pay have the same effect before and after Submit?',
        observe: 'Begin in Draft with Seats 3 and Available 6. Predict Draft → Submit → Pay → Cancel. Each request is independent; this model does not subtract seats from availability.',
        prerequisite: recall('Recall a stored value', 'A variable can keep a value until something changes it. Similarly, a state persists between events. An event is something that happens, such as Submit; it is not the name of the state that exists afterwards.'),
        steps: [
          step('Identify the starting state', 'A state-transition diagram uses a node for each state and directed arrows for transitions. A starting arrow identifies the initial state. Begin the booking model in Draft, before consuming any event.', { image: diagram('booking-states', 'Draft is initial. A valid submission moves to Pending; Pay moves to Confirmed. Cancel returns Pending or Confirmed to Draft. Invalid submission remains Draft.', 'Start at the initial arrow, then inspect only transitions from the current state.') }),
          step('Choose a transition from the current state', 'For a valid request, Submit moves Draft to Pending. Pay moves Pending to Confirmed. Cancel moves Pending or Confirmed back to Draft. Read the event only against outgoing arrows from the current state.'),
          step('Keep a state when an event does not advance it', 'In this teaching model, events not assigned a change leave the state unchanged. Pay in Draft therefore stays Draft; Submit in Confirmed stays Confirmed. Such a self-loop consumes an event without moving to a different state. That rule is explicitly specified here; do not invent missing transitions in another question.'),
          step('Use the diagram for behaviour, not module hierarchy', 'A state diagram shows event-dependent behaviour over time. It does not divide the program into callable modules. The same booking system can have both a structure chart and a state diagram, each documenting a different aspect.'),
        ],
        worked: worked('Trace the full event sequence', 'Seats is 3, Available is 6, and the initial state is Draft.', [
          step('Record after every event', 'Do not restart from Draft for each row.', { table: table(['Event', 'Before', 'After'], [['Submit', 'Draft', 'Pending'], ['Pay', 'Pending', 'Confirmed'], ['Pay', 'Confirmed', 'Confirmed'], ['Cancel', 'Confirmed', 'Draft']]) }),
          step('Explain the repeated Pay', 'The third event is consumed in Confirmed, where this model specifies no further payment transition. The state stays Confirmed. That is different from ignoring the current state and selecting the Pending-to-Confirmed arrow.'),
        ], 'Always carry the previous row’s resulting state into the next row.'),
        check: check('Starting in Draft with a valid request, trace Pay, Submit, Cancel. Give the state after each event.', 'Draft, Pending, Draft. The first Pay does not change Draft. Submit then creates the Pending request, and Cancel returns it to Draft.'),
        takeaway: 'The next state depends on the current state and the event, not on the event name alone.',
        bridge: 'Some transitions also require a condition, and some arrow labels specify an output action.',
        trap: '“Submit” is an event; “Pending” is a state. A self-loop still processes the event.', papers: [],
      },
      {
        id: 'develop-state-guards', title: 'Check the condition and read the action',
        unitKeys: ['S12-STATES-GUARDS'], objectiveIds: ids(3, 1), prerequisites: ['develop-state-events'],
        stimulus: { title: 'Two submissions from Draft', table: table(['Seats', 'Event', 'Condition', 'Result'], [['3', 'Submit', '1 <= Seats <= 6 is true', 'Pending'], ['7', 'Submit', 'The range condition is false', 'Draft; request is rejected']]) },
        question: 'Why can the same event from the same state have different outcomes?',
        observe: 'The extra information is a guard: a condition that must hold for the transition. In Cambridge pseudocode the range condition is written as two comparisons joined by AND.',
        prerequisite: recall('Recall an inclusive Boolean range', '(Seats >= 1) AND (Seats <= Available) is TRUE only when both bounds are met. A condition is evaluated from data; an event is the occurrence that prompts the system to consider a transition.'),
        steps: [
          step('Evaluate the guard before taking the arrow', 'For a Draft booking, Submit with a true range guard moves to Pending. A false guard follows the specified rejection self-loop. Do not take both arrows or change the required limit to match the entered value.'),
          step('Read event, condition and action separately', 'A diagram may use an event [condition] / action label. The event triggers consideration, the guard chooses whether the transition is allowed, and the action is an output or update performed as the transition occurs. A label such as Cancel | Re-prompt in a supplied question separates input from output; use that question’s convention.'),
          step('Transfer to an upload example', 'The upload model starts Ready. Start enters Uploading; progress keeps Uploading. On complete, Valid TRUE returns to Ready, while Valid FALSE enters Error. Retry from Error returns to Uploading. The upload model defines only the listed transitions; no default response to an unlisted event is assumed.', { image: diagram('upload-states', 'Ready, Uploading and Error with guards on the two complete transitions, progress self-loop, retry and cancel.', 'The complete event needs its Valid guard to determine the next state.') }),
        ],
        worked: worked('Use a table to draw and trace transitions', 'From Ready, process start, progress, complete with Valid FALSE, retry, complete with Valid TRUE.', [
          step('Carry the state and inspect each guard', 'The resulting states are Uploading, Uploading, Error, Uploading, Ready. The two complete events differ because their Valid conditions differ.'),
          step('Construct arrows from a supplied table', 'Create nodes for distinct states. For each row draw an arrow from its current state to its next state, then copy the event and any condition or output onto the arrow. Equal current and next states require a self-loop. Mark the initial state separately.'),
        ], 'The transition table and diagram should express the same cases, including loops and actions.'),
        check: check('An arrow says Re-input PIN | Display error and returns to the same state. Which part is the event, which is the action, and does the state change?', 'Re-input PIN is the input event and Display error is the output action. The self-loop returns to the same state; the event and output still occur.'),
        takeaway: 'Read a transition as current state + event + satisfied guard → next state and any stated action.',
        bridge: 'Designs can be precise and code can still contain faults. Use evidence to distinguish a grammar problem from incorrect behaviour.',
        trap: 'An output such as Display error is not automatically a new state. Keep actions on transitions when that is what the specification describes.', papers: ['E100'],
      },
    ],
  },
  87: {
    title: 'Find the first point where the program goes wrong',
    intro: 'Begin with a visible symptom. Distinguish different kinds of fault, compare a trace with the required behaviour and verify a focused correction.',
    groups: [
      {
        id: 'develop-error-types', title: 'Distinguish three different failures',
        unitKeys: ['S12-ERROR-TYPES'], objectiveIds: ids(4, 1, 2, 3, 4), prerequisites: ['develop-state-guards'],
        stimulus: { title: 'Three reports from the booking desk', table: table(['Report', 'Evidence'], [['A', 'The translator rejects an IF with no THEN'], ['B', 'The program runs but rejects a valid request for 6'], ['C', 'Average calculation fails when Groups is 0']]) },
        question: 'Which problem concerns grammar, which concerns the rule, and which occurs during execution?',
        observe: 'The same phrase, “it does not work”, hides three different causes. Identify what was observed before proposing a repair.',
        prerequisite: recall('Recall translation and execution', 'A translator checks whether code follows the language rules. Execution performs its operations on actual values. Correct grammar does not prove that those operations implement the specification.'),
        steps: [
          step('Syntax: the statement does not follow the language rules', 'A missing THEN or mismatched loop ending prevents the construct being read correctly. Use translator feedback or a syntax checker to locate the malformed statement, then inspect the surrounding block. Error reporting may identify where the problem was noticed rather than its original cause.'),
          step('Logic: valid instructions produce the wrong behaviour', 'The correct rule accepts Seats 6 when Available is 6. A complete condition using Seats < Available rejects it. The code can translate and finish, but the result disagrees with the requirement. Compare actual output with an independently expected output.'),
          step('Run time: an invalid operation occurs when executing', 'Total / Groups with Groups 0 attempts division by zero. An array access outside its declared bounds can also cause a run-time error. Whether the failure occurs depends on the path and values reached during execution.'),
          step('Reduce the chance of a fault and expose remaining faults', 'Use clear requirements, small modules, meaningful names and consistent indentation. Review interfaces and boundary cases; validate or guard inputs before unsafe operations. Then use translator checks, code review and purposeful tests. None of these alone proves the complete program correct.'),
        ],
        worked: worked('Match each report to evidence', 'The required average is total seats divided by the number of bookings; zero bookings must display No data.', [
          step('Classify without guessing', 'A is syntax because the IF lacks required grammar. B is logic because a valid input produces the wrong decision. C is run time because execution attempts a forbidden division.'),
          step('Choose a useful next check', 'For A inspect the complete IF/ELSE/ENDIF block. For B trace exactly Seats 6, not only an ordinary value such as 3. For C inspect Groups immediately before division and test the zero-booking path.'),
        ], 'A useful error label is supported by the observed cause, not just by a failed test.'),
        check: check('A program translates successfully and charges 25.00 for three seats costing 12.50 each. What kind of error does this evidence suggest, and what is the expected charge?', 'It suggests a logic error: the completed calculation disagrees with the required multiplication. The expected charge is 3 * 12.50 = 37.50.'),
        takeaway: 'Syntax concerns language rules; logic concerns the required result; run-time errors arise from invalid executed operations.',
        bridge: 'An error category narrows the search. A trace shows the exact point where values or decisions diverge.',
        trap: 'Do not call every failed output a syntax error. Preserve an original paper’s explicit classification when it describes a particular language rule.', papers: [],
      },
      {
        id: 'develop-error-location', title: 'Trace from the symptom to its cause',
        unitKeys: ['S12-ERROR-LOCATE'], objectiveIds: ids(4, 1, 3, 4, 5), prerequisites: ['develop-error-types'], lab: 'debug',
        stimulus: { title: 'A boundary failure', table: table(['Input', 'Expected', 'Observed'], [['Seats 3, Available 6', 'Accepted', 'Accepted'], ['Seats 6, Available 6', 'Accepted', 'Rejected']]) },
        question: 'What is the first decision that differs from the intended algorithm?',
        observe: 'The ordinary case passes. The exact-fit case fails. Read the quantity, evaluate both comparisons, then inspect which branch executes.',
        prerequisite: recall('Recall a trace and a breakpoint', 'A dry run follows statements manually. A breakpoint pauses an executing program before or at a selected statement; stepping advances execution, and a watch displays selected variable values. Neither operation repairs code automatically.'),
        steps: [
          step('Reproduce the failure with a small test', 'Use Seats 6 and Available 6. Record the exact input, expected Accepted and actual Rejected. Keeping one failing example removes unrelated interactions and allows the same fault to be checked after repair.'),
          step('Inspect state just before the decision', 'Seats is 6 and Available is 6, so the input has been read correctly. Evaluate the existing comparisons. Seats >= 1 is TRUE, but Seats < Available is FALSE. This is the first discrepancy with the inclusive specification.'),
          step('Follow the discrepancy to its consequence', 'TRUE AND FALSE is FALSE, so the ELSE branch produces Rejected. The output statement is doing what that branch tells it to do. Changing the word Rejected would hide the symptom and break other cases; the upper comparison is the cause.'),
          step('Apply the same method to other paths', 'For division by zero, inspect the denominator and the path that allowed 0 to reach the division. For an array failure, compare the current index with the declared bounds before the access. For an unreachable branch, list possible expression results and the alternatives already covered.'),
        ],
        worked: worked('Explain why an OTHERWISE is unreachable', 'Index is a non-negative integer. CASE OF Index MOD 2 already contains alternatives 0 and 1.', [
          step('Recall what MOD returns', 'MOD gives the remainder after integer division. Dividing a non-negative integer by 2 can leave only remainder 0 or 1.'),
          step('Check coverage before blaming execution', 'Both possible values already select named alternatives. No input in the stated domain reaches OTHERWISE. This conclusion comes from the expression’s possible values, not from simply failing to observe the branch in one test.'),
        ], 'Locate a cause by comparing the first incorrect state or decision with the requirement.'),
        check: check('The output is wrong, but the input and intermediate total are correct. Why should you inspect the next calculation or branch before rewriting the whole program?', 'The earliest difference narrows the cause. Correct earlier state is evidence that those parts should be preserved while inspecting the operation that first produces an incorrect value or path.'),
        takeaway: 'Reproduce the fault, inspect state, and locate the first departure from the intended behaviour.',
        bridge: 'A focused correction still needs evidence that it fixes the original failure and preserves other required cases.',
        trap: 'A debugger helps observe execution. It does not decide which behaviour the users required.', papers: [],
      },
      {
        id: 'develop-error-retest', title: 'Correct the cause and repeat the right tests',
        unitKeys: ['S12-ERROR-CORRECT'], objectiveIds: ids(4, 2, 3, 4, 5, 6), prerequisites: ['develop-error-location'],
        stimulus: specimen('A proposed patch', 'Change Seats < Available to Seats <= Available.', 'Keep the lower bound Seats >= 1.', 'Re-run the original failure and nearby accepted and rejected cases.'),
        question: 'Does passing Seats 6 establish that the correction is complete?',
        observe: 'A patch that accepts every quantity would pass that one test. Choose additional inputs that distinguish a genuine repair from this new fault.',
        prerequisite: recall('Recall a boundary and regression', 'A boundary is where a rule changes its decision. A regression is a previously correct required behaviour broken by a change. Repeating relevant old tests helps detect it.'),
        steps: [
          step('Amend the smallest responsible operation', 'Use <= for the inclusive upper limit, leaving the correct lower bound and output branches intact. For a syntax error, restore the missing or matching keyword at the correct block position. Do not move a statement merely to silence an error message without understanding its role.'),
          step('Guard an unsafe calculation before it happens', 'For a zero count, test the denominator before dividing. Putting the guard after the division is too late.', { code: 'DECLARE Total : REAL\nDECLARE Groups : INTEGER\nINPUT Total\nINPUT Groups\nIF Groups > 0 THEN\n    OUTPUT Total / Groups\nELSE\n    OUTPUT "No data"\nENDIF' }),
          step('Repeat the failing case and surrounding cases', 'For the range repair, 6 must now pass. Check 5 remains accepted, 7 remains rejected, 1 remains accepted and 0 remains rejected. Record the new version and results while retaining the original failure record.'),
          step('Read the supplied string and array interfaces', 'In the next paper, & joins string or character operands. Index is INTEGER, so convert it with NUM_TO_STR(Index) before concatenation, or use comma-separated OUTPUT items. Its supplied TO_UPPER and TO_LOWER routines accept STRING arguments; follow that insert rather than assuming another routine interface. An array declared from 1 to 200 has no element 0.'),
          step('Recheck the full path affected by the change', 'If a repair changes loop initialisation, trace the first and last valid array positions. Changing an initial index from 0 to 1 may skip the first element when the loop also increments before access. Understand the existing flow before applying a plausible-looking correction.'),
        ],
        worked: worked('Verify the inclusive-range repair', 'The intended input domain is all INTEGER quantities; valid values are 1–6 inclusive.', [
          step('Derive outcomes independently', 'The requirement, not the patched program, provides the expected decisions.', { table: table(['Seats', 'Expected after repair', 'Reason'], [['0', 'Rejected', 'Below minimum'], ['1', 'Accepted', 'Minimum included'], ['5', 'Accepted', 'Ordinary valid input'], ['6', 'Accepted', 'Original failure; maximum included'], ['7', 'Rejected', 'Above maximum']]) }),
          step('Explain what the evidence supports', 'These cases expose the identified off-by-one mistake and protect nearby behaviour. They do not establish every possible feature of the whole booking system; keep testing proportional to the affected responsibility.'),
        ], 'A repair is supported by a reproduced failure, a causal change and relevant retest evidence.'),
        check: check('A proposed zero-count fix performs Average <- Total / Groups and only then checks Groups = 0. Why does it fail?', 'Execution attempts the division before reaching the guard. Test Groups first and execute the division only in the positive-count branch; use the specified No data response otherwise.'),
        takeaway: 'Fix the responsible statement, repeat the original failure and check required neighbouring behaviour.',
        bridge: 'Next choose how to test: by manually following code, inspecting its structure or using its external specification.',
        trap: 'Do not change expected results merely to match faulty output. Change expectations only when the requirement itself is legitimately revised.', papers: ['E101'],
      },
    ],
  },
  88: {
    title: 'Choose tests for the question you need to answer',
    intro: 'Different testing methods reveal different evidence. Start with a manual trace, then test paths and interfaces, and finally consider user environments and acceptance.',
    groups: [
      {
        id: 'develop-manual-review', title: 'Dry-run the values and walk through the reasoning',
        unitKeys: ['S12-TEST-MANUAL'], objectiveIds: ids(5, 1, 2), prerequisites: ['develop-error-retest'],
        stimulus: specimen('Three independent accepted requests', 'Seats values arrive in this order: 3, 2, 4.', 'Total begins at 0 and should report 9.', 'The program executes Total <- Total + Seats after each input.'),
        question: 'What evidence could you produce before running this program on a computer?',
        observe: 'Take turns being the computer: read one statement at a time and record the values that change. Do not calculate the final answer and fill in a trace backwards.',
        prerequisite: recall('Recall accumulation', 'Total <- Total + Seats reads the old Total, adds the current Seats, then replaces Total. Initialisation belongs before the loop; otherwise each visit discards the previous accumulation.'),
        steps: [
          step('Perform a dry run manually', 'Choose exact input values and follow the written statements in execution order. Record changing variables, condition results and outputs in a trace table. The aim is to predict what this implementation actually does, even if it is wrong.'),
          step('Compare with an independent expectation', 'The requirement says the total should be 3 + 2 + 4 = 9. Compare that expected result with the trace. A trace can reveal repeated initialisation, a missing update or a wrong stopping condition without executing the code.'),
          step('Use a walkthrough to review with other people', 'In a walkthrough, the author explains the design or code step by step to others. Reviewers question assumptions, conditions and interfaces. They may trace sample values, but a walkthrough is the collaborative review activity, not merely another name for an individual trace.'),
        ],
        worked: worked('Keep a trace that another student can check', 'All three inputs are already valid for the independent-request example.', [
          step('Record the state after each update', 'Initial Total is 0.', { table: table(['Input position', 'Seats', 'Previous Total', 'New Total'], [['1', '3', '0', '3'], ['2', '2', '3', '5'], ['3', '4', '5', '9']]) }),
          step('Review placement collaboratively', 'A reviewer asks what happens if Total <- 0 moves inside the loop. Tracing the same inputs would then produce final Total 4. Explain why the changed placement contradicts the intended accumulated result.'),
        ], 'Manual evidence depends on following the implementation exactly and judging it against a separate requirement.'),
        check: check('One student fills a trace table alone; then the author explains the loop to a group who challenge its assumptions. Name the two activities.', 'The first is a dry run. The second is a walkthrough; it can include a dry run, but its defining feature is the collaborative step-by-step review.'),
        takeaway: 'A dry run follows values manually; a walkthrough reviews the reasoning with other people.',
        bridge: 'Tests can also be selected from the internal code or from the external specification.',
        trap: 'A hand trace is not an actual computer execution. Label the evidence accurately.', papers: [],
      },
      {
        id: 'develop-box-testing', title: 'Choose from the specification or the code',
        unitKeys: ['S12-TEST-BOX'], objectiveIds: ids(5, 3, 4, 9), prerequisites: ['develop-manual-review'],
        stimulus: { title: 'Two testers receive different information', table: table(['Tester', 'Information available', 'Proposed test'], [['A', 'Specification: accept 1–6 inclusive', 'Use 6; expect Accepted'], ['B', 'IF Paid THEN confirm ELSE ask for payment', 'Use Paid TRUE and FALSE to execute both branches']]) },
        question: 'What determines the difference between black-box and white-box testing?',
        observe: 'It is how test cases are selected. Both testers can compare actual output with expected output, and the same input might be useful to both.',
        prerequisite: recall('Recall a path through IF', 'Only one IF/ELSE branch executes on a particular test. A passing test for the TRUE branch does not tell you what the FALSE branch will do.'),
        steps: [
          step('Black-box: start from required inputs and outputs', 'Select cases from the specification without relying on internal code structure. For a 1–6 rule, input 6 must be accepted regardless of how the programmer wrote the condition. This can expose wrong results or failures during execution.'),
          step('White-box: use the implementation structure', 'Inspect code to choose inputs that exercise particular statements, branches or paths. For an IF Paid condition, TRUE and FALSE exercise both alternatives. For a loop, consider no iterations where possible, one iteration and several iterations.'),
          step('Explain what each result does and does not show', 'Black-box tests can miss an internal branch that the chosen requirements examples never reach. White-box branch coverage can execute incorrect logic without proving the requirements are satisfied. Use independent expected outcomes in both methods; successful coverage is evidence of execution, not proof of correctness.'),
        ],
        worked: worked('Test an exact-fit booking two ways', 'The code incorrectly uses Seats < 6. The specification says 1–6 inclusive.', [
          step('Derive the black-box case', 'From the specification alone, choose Seats 6 and expect Accepted. Observing Rejected reveals a fault without needing the source.'),
          step('See why two branches are not enough', 'White-box inputs 3 and 7 execute both acceptance and rejection branches. Both results can be correct even though the inclusive endpoint is wrong. Add the boundary case because branch coverage alone missed that requirement.'),
        ], 'Explain the basis for selecting a case and the evidence that its outcome supplies.'),
        check: check('A tester looks at an IF and chooses inputs to execute each branch. Is this white-box or black-box, and why does passing both cases not prove the inclusive limit is correct?', 'It is white-box because the code structure guided the choice. Values can exercise both branches without being exactly at the boundary; an incorrect < can still pass those tests.'),
        takeaway: 'Black-box selects from the specification; white-box selects using the internal structure.',
        bridge: 'Even correctly tested modules can fail when their interfaces are connected.',
        trap: 'The colour name describes test selection, not whether the test is manual, automated, early or late.', papers: [],
      },
      {
        id: 'develop-integration-stubs', title: 'Test a caller before its real module is ready',
        unitKeys: ['S12-TEST-INTEGRATION', 'S12-TEST-STUB'], objectiveIds: ids(5, 4, 5, 9), prerequisites: ['develop-box-testing', 'develop-module-code'], lab: 'testing', labConfig: { implementation: 'Stub', stubResult: 'TRUE', view: 'Black-box', requests: '0, 3, 6, 7' },
        stimulus: specimen('The booking interface is ready first', 'The caller asks ValidSeats(Seats) for a BOOLEAN result.', 'TRUE should display Accepted; FALSE should display Rejected.', 'The real quantity checker is unfinished. Its eventual rule accepts integers 1–6 inclusive.'),
        question: 'How can you check both caller branches without pretending that the real validation has been implemented?',
        observe: 'Give the caller a controlled TRUE response, then a controlled FALSE response. Identify which part is being exercised and which part is still absent.',
        prerequisite: recall('Recall a Boolean function interface', 'A function header states the ordered parameters and return type. The caller uses the returned BOOLEAN in its condition. Replacing a function safely requires preserving the interface expected by that caller.'),
        steps: [
          step('Separate a module from its connections', 'A module may calculate correctly in isolation, yet integration can reveal reversed arguments, a wrong returned type or values sent to the wrong place. Integration testing checks cooperating modules and their interfaces when they are combined.'),
          step('Substitute a small temporary stub', 'A stub stands in for an unfinished called module. It uses the required interface and supplies a controlled response, such as a fixed TRUE. A separate FALSE version lets the caller’s other branch be exercised.', { code: 'FUNCTION ValidSeats(BYVAL Seats : INTEGER) RETURNS BOOLEAN\n    RETURN TRUE\nENDFUNCTION\n\nDECLARE Seats : INTEGER\nINPUT Seats\nIF ValidSeats(Seats) THEN\n    OUTPUT "Accepted"\nELSE\n    OUTPUT "Rejected"\nENDIF' }),
          step('Keep the claim within the evidence', 'A TRUE stub makes every entered quantity produce Accepted because that is its programmed response. This can show that the caller handles TRUE, but it does not verify the required range or the missing implementation. Change the controlled return to FALSE to check the other branch.'),
          step('Replace the stub and retest the integration', 'The real ValidSeats function returns (Seats >= 1) AND (Seats <= 6). Test 0 and 7 expecting Rejected, and 3 and 6 expecting Accepted. The caller, parameter interface and real result now need to agree.', { code: 'FUNCTION ValidSeats(BYVAL Seats : INTEGER) RETURNS BOOLEAN\n    RETURN (Seats >= 1) AND (Seats <= 6)\nENDFUNCTION\n\nDECLARE Seats : INTEGER\nINPUT Seats\nIF ValidSeats(Seats) THEN\n    OUTPUT "Accepted"\nELSE\n    OUTPUT "Rejected"\nENDIF' }),
        ],
        worked: worked('Read evidence without overclaiming', 'Use the independent integer requests 0, 3, 6 and 7. The real rule is 1–6 inclusive.', [
          step('Use the controlled versions', 'With a TRUE stub all four inputs display Accepted, so 0 and 7 disagree with the real requirement. With a FALSE stub all four display Rejected, so 3 and 6 disagree with it. These are the substitutes’ known limitations, not discovered defects in the absent real module.'),
          step('Check the connected real version', 'After replacement, the expected outputs are Rejected, Accepted, Accepted and Rejected. If all still display Accepted, inspect the selected implementation, returned Boolean and caller branch. Use the white-box view to identify which caller branches were visited; use the black-box view to judge outcomes from the specification.'),
        ], 'A stub enables progress on a caller while making the unverified responsibility explicit.'),
        check: check('A stub returns TRUE for every Seats value and all caller tests pass. What still needs to be tested after the real function replaces it?', 'Test the real function’s required results and its integration with the caller, including 0 and 7 → Rejected and 3 and 6 → Accepted. Stub success did not verify the missing range logic.'),
        takeaway: 'A stub preserves an interface but supplies a controlled temporary response; integration must be checked after replacement.',
        bridge: 'Next choose data that challenges limits and sequences, then record complete, repeatable test cases.',
        trap: 'A stub is not a complete implementation of the unfinished module. It must not be presented as proof that the missing function is correct.', papers: ['E102'],
      },
      {
        id: 'develop-alpha-beta', title: 'Test in controlled and real user environments',
        unitKeys: ['S12-TEST-USERS'], objectiveIds: ids(5, 6, 7, 9), prerequisites: ['develop-test-record'],
        stimulus: { title: 'Two trials of the booking screen', table: table(['Trial', 'Where and who', 'Finding'], [['A', 'Developer-controlled environment with the test team', 'A saved booking does not reopen correctly'], ['B', 'Selected school staff use a trial release at their own desks', 'A message is cut off on one school display']]) },
        question: 'Why can both trials find useful problems even after module tests pass?',
        observe: 'The completed screen now meets different equipment, users and work patterns. Compare the level of control and the source of feedback in the two trials.',
        prerequisite: recall('Recall evidence against a requirement', 'A useful issue report includes version, environment, exact steps, expected behaviour and actual behaviour. “It is broken” is difficult to reproduce, whichever testing stage produced it.'),
        steps: [
          step('Alpha: check a release under controlled conditions', 'Alpha testing takes place within the developing organisation or another controlled test environment, typically with internal testers and sometimes invited users. Problems can be investigated while the developers control the setup.'),
          step('Beta: obtain feedback from outside users', 'Beta testing makes a trial version available to selected users in their real environments. Their equipment, data and workflows can expose problems the development setup did not reproduce. Gather specific feedback and defect reports for the next change.'),
          step('Choose the method for the uncertainty', 'Use controlled testing when you need reproducible conditions and close inspection. Use beta feedback when you need evidence from real user environments. A beta release may still contain defects; distributing it does not itself mean that the customer has accepted the finished system.'),
        ],
        worked: worked('Turn a beta comment into a useful test', 'A school user reports that the booking confirmation is clipped on their display.', [
          step('Capture the conditions', 'Record the trial version, screen size, browser and steps leading to the clipped message, plus the complete expected confirmation text.'),
          step('Reproduce and follow up', 'Recreate those conditions, correct the responsible layout and repeat the case. Check a normal display as well, so the correction preserves its working layout.'),
        ], 'Real-environment feedback becomes useful when it can be reproduced and checked.'),
        check: check('Selected users try an unfinished release on their own equipment and submit reports. Name the testing stage and one advantage of this environment.', 'Beta testing. It can expose compatibility, usability or workflow problems arising in real user environments that the controlled development environment did not reveal.'),
        takeaway: 'Alpha uses controlled conditions; beta gathers feedback from selected users in their own environments.',
        bridge: 'The customer still needs evidence that the completed system satisfies the agreed requirements.',
        trap: 'Beta testing and acceptance testing have different purposes. User participation alone does not make them the same stage.', papers: [],
      },
      {
        id: 'develop-acceptance', title: 'Decide whether the agreed requirements are met',
        unitKeys: ['S12-TEST-ACCEPTANCE'], objectiveIds: ids(5, 8, 9), prerequisites: ['develop-alpha-beta'],
        stimulus: { title: 'The customer’s completion checklist', table: table(['Agreed requirement', 'Acceptance evidence'], [['Accept integer quantities 1–6 inclusive', '1 and 6 accepted'], ['Reject other integers', '0 and 7 rejected with agreed guidance'], ['Display the calculated charge', '3 at 12.50 displays 37.50']]) },
        question: 'What distinguishes “staff like it” from accepting the agreed system?',
        observe: 'A pleasant interface can still calculate the wrong amount. The customer needs repeatable evidence against the actual requirements, not just a general impression.',
        prerequisite: recall('Recall the test plan', 'A test case links a requirement to initial conditions, input and an independently expected result. Actual results support a decision only when it is clear what was tested.'),
        steps: [
          step('Use customer requirements as the basis', 'Acceptance testing checks the completed system against agreed requirements so the customer can decide whether to accept it. Include the outputs and constraints that the agreement specifies, not only the developer’s favourite features.'),
          step('Keep purpose separate from test design technique', 'An acceptance test can be black-box because its cases come from required behaviour rather than code. Acceptance identifies the customer-decision purpose; black-box identifies the basis for selecting the cases.'),
          step('Record unmet requirements and the next action', 'If the system rejects a valid maximum request, record the failure and resolve it before claiming that requirement is met. A new requested feature needs an agreed change; it should not silently replace an existing acceptance criterion.'),
        ],
        worked: worked('Judge a partial success', 'The booking system correctly accepts 1 and rejects 0, but rejects 6. All planned alpha and beta trials have finished.', [
          step('Evaluate the agreed boundary', 'The customer’s rule includes 6. Passing the other two cases does not satisfy that requirement.'),
          step('Name the current purpose', 'The customer is checking the completed system against its agreement: acceptance testing. Finishing alpha and beta does not guarantee acceptance.'),
        ], 'Acceptance connects the end of the current delivery to the requirements agreed at its beginning.'),
        check: check('A customer tests the completed system after alpha and beta to decide whether it meets their requirements. Name the stage.', 'Acceptance testing.'),
        takeaway: 'Acceptance testing supplies the customer with evidence against the agreed requirements.',
        bridge: 'After delivery, new faults, environments and needs can still require maintenance.',
        trap: 'A favourable user comment is useful feedback, but it is not evidence that every agreed requirement has passed.', papers: ['E103'],
      },
    ],
  },
  89: {
    title: 'Make testing repeatable and its evidence usable',
    intro: 'After choosing methods and purposeful data, plan who will test what, then keep records that distinguish expectation, observation and retest.',
    groups: [
      {
        id: 'develop-test-strategy', title: 'Plan the whole testing approach',
        unitKeys: ['S12-STRATEGY'], objectiveIds: ids(6, 1), prerequisites: ['develop-test-sequences'],
        stimulus: specimen('A release planning note', 'The quantity check, calculation and screen are built by different people.', 'The availability function will arrive later than its caller.', 'School staff can trial the screen on Friday; the customer needs acceptance evidence next week.'),
        question: 'Which decisions must the team make before listing individual inputs?',
        observe: 'The project needs more than a table of numbers. Decide what is tested first, how unfinished parts are handled, who supplies user feedback and what evidence allows release.',
        prerequisite: recall('Recall method, data and expected result', 'A method explains how testing is organised or cases are selected. Data supplies specific inputs. Expected results describe the behaviour required for those inputs. A complete approach coordinates all three.'),
        steps: [
          step('Set scope, priorities and stages', 'A test strategy describes the overall approach: what will be tested, the methods and sequence, significant risks, responsibilities, environments, resources and completion criteria. A test plan then makes the work concrete and repeatable with schedules and individual cases.'),
          step('Connect methods to specific risks', 'Review and dry-run calculations; select black-box range cases and white-box branch cases; use a stub while the availability module is absent; check integration after replacement. Plan user trials and acceptance with their participants and environments.'),
          step('Specify responsibilities and evidence', 'Name who prepares cases, runs them, investigates failures and decides whether the completion criteria are met. Record environment and version so another tester can reproduce a failure. Define what must pass rather than using “we tested for an hour” as a release criterion.'),
        ],
        worked: worked('Write a small, usable strategy', 'The highest risks are a wrong charge, an invalid quantity being accepted and a missing availability response.', [
          step('Sequence dependent work', 'First review calculation and range rules; test modules; exercise the caller with controlled responses; replace the stub and test integration; then use representative staff environments and customer acceptance cases.'),
          step('Choose completion evidence', 'All agreed range and charge cases must match expected results. Required availability paths must pass after integration. Unresolved failures need recorded decisions, and the customer checks the agreed acceptance requirements.'),
        ], 'The strategy explains the overall approach; individual records make its execution inspectable.'),
        check: check('“Use Seats 6 and expect Accepted” is useful, but why is it not a complete test strategy?', 'It is one test case. A strategy also coordinates scope, methods, priorities, sequence, responsibilities, environments and completion criteria across the system.'),
        takeaway: 'A test strategy organises the approach; a test plan makes the required work and evidence concrete.',
        bridge: 'Now record one case precisely enough for another person to repeat and judge it.',
        trap: 'A long list of inputs without their purpose, expected outcomes and testing context is not a complete approach.', papers: [],
      },
      {
        id: 'develop-test-record', title: 'Keep expected, actual and retest results separate',
        unitKeys: ['S12-TEST-PLAN'], objectiveIds: ids(6, 1), prerequisites: ['develop-test-strategy', 'develop-test-data'],
        stimulus: { title: 'An incomplete test record', table: table(['Input', 'Result'], [['6', 'Wrong']]) },
        question: 'What information would another tester need to repeat and judge this case?',
        observe: 'The record omits the requirement, initial availability, program version, expected output and actual output. “Wrong” cannot explain which operation to investigate.',
        prerequisite: recall('Recall the independent expectation', 'For the booking range, derive Accepted or Rejected from the agreed 1–6 rule before observing the program. A valid boundary value can be accepted; being a boundary does not make a value invalid.'),
        steps: [
          step('Write the case before running it', 'Record a case ID, requirement or purpose, initial conditions, exact input and expected outcome. Include data type or category where relevant. For this case use Available 6, integer Seats 6 and expected Accepted.'),
          step('Add actual evidence after the test', 'Record the version, observed result and pass/fail comparison. If the code is only dry-run, label the result as a trace, not a computer execution. A case not yet run has no observed actual result to invent.'),
          step('Retain the failure and append the retest', 'After changing < to <=, run or trace the same case on the corrected version. Keep V1’s failure as evidence; record V2 separately and add neighbouring regression cases.', { table: table(['Case', 'Version / evidence', 'Input', 'Expected', 'Actual', 'Outcome'], [['B06', 'V1 / dry run', 'Seats 6; Available 6', 'Accepted', 'Rejected', 'Fail'], ['B06', 'V2 / dry run', 'Same input and initial state', 'Accepted', 'Accepted', 'Pass']]) }),
          step('Respect the input source in the next paper', 'A sensor may produce non-negative integers only. For such a sensor, a negative number or text cannot be a real test input from that source. Use attainable values, and provide the requested category, value and expected outcome together.'),
        ],
        worked: worked('Complete a test record from a different rule', 'For a sensor accepting integer readings 0–60 inclusive, the source never produces negative or fractional values.', [
          step('Use the required domain', '0 and 60 are valid endpoint tests. 15 is an ordinary valid value. 61 is attainable but outside the accepted range, so it must be rejected.'),
          step('Separate a plan from a report', 'Write those expected results before running the sensor program. Leave actual and outcome pending until evidence exists. A plan can be complete even before the test is executed; a result claim cannot.'),
        ], 'Keep the requirement, prediction, observation and version together so the comparison can be repeated.'),
        check: check('A test has not been executed. Which can already be recorded: expected result, actual result, or both?', 'The expected result can be derived from the requirement and recorded. The actual result must remain pending until execution or an explicitly labelled dry run supplies evidence.'),
        takeaway: 'A useful test record makes the case reproducible and keeps prediction separate from observation.',
        bridge: 'The plan now supports controlled testing, user trials and the customer’s acceptance decision.',
        trap: 'Never erase a failed result or relabel the expected output just to make a record say Pass.', papers: ['E104'],
      },
    ],
  },
  90: {
    title: 'Choose data that could expose a real mistake',
    intro: 'Start with the permitted input domain. Challenge the limits and then choose complete input sequences that distinguish different behaviours.',
    groups: [
      {
        id: 'develop-test-data', title: 'Challenge ordinary values and both limits',
        unitKeys: ['S12-DATA-CATEGORIES'], objectiveIds: ids(7, 1, 2), prerequisites: ['develop-integration-stubs'], lab: 'boundary',
        stimulus: { title: 'The booking quantity rule', table: table(['Input domain', 'Accepted values', 'Candidate integers'], [['All INTEGER quantities', '1–6 inclusive', '0, 1, 2, 3, 5, 6, 7']]) },
        question: 'Why are 3, 6 and 7 useful for different reasons?',
        observe: 'Predict each decision first. Then test the exact upper limit against an implementation using < instead of <=. Explain why an ordinary accepted value might miss the mistake.',
        prerequisite: recall('Recall inclusive limits', 'Inclusive means the endpoint is allowed. For an INTEGER range, the nearest integer below 1 is 0 and the nearest above 6 is 7. Available does not decrease in this independent-request model.'),
        steps: [
          step('Choose an ordinary valid value', 'Normal data represents typical permitted input, such as Seats 3. It should be accepted. It establishes an ordinary working path but may not challenge a limit.'),
          step('Choose invalid values with stated expectations', 'Abnormal data violates the requirement. For this integer input contract, 0 and 7 are outside the permitted range and should be rejected. Text and fractional values are separate type-validation cases only when the stated input source can supply them.'),
          step('Test the boundaries and their neighbours', 'Extreme valid values are the minimum and maximum permitted values, here 1 and 6. Boundary testing also considers values immediately around the decision boundaries, such as 0, 1, 2 and 5, 6, 7. State the actual value and expected result so different naming conventions do not obscure the test.'),
          step('Use the type and precision in the requirement', 'For strings, a length limit concerns the number of characters, not the numeric value of the text. For real values, the useful neighbouring inputs depend on stated precision. With one decimal place, -5.1, -5.0 and -4.9 can challenge -5.0; there is no universal next real value found by adding 1.'),
        ],
        worked: worked('Distinguish an inclusive rule from an off-by-one fault', 'The required condition is Seats >= 1 AND Seats <= 6. A faulty version uses Seats < 6.', [
          step('Derive the expected decisions', 'Keep these decisions fixed when changing the implementation under test.', { table: table(['Seats', 'Expected', 'Reason'], [['0', 'Rejected', 'Just below minimum'], ['1', 'Accepted', 'Minimum valid'], ['2', 'Accepted', 'Just above minimum'], ['5', 'Accepted', 'Just below maximum'], ['6', 'Accepted', 'Maximum valid'], ['7', 'Rejected', 'Just above maximum']]) }),
          step('Identify the distinguishing case', 'Only 6 in this set exposes the faulty upper comparison. Five correct outcomes would therefore not compensate for omitting the case that matters.'),
        ], 'Every chosen input needs a purpose and a result derived from the rule.'),
        check: check('A text field permits 2–5 characters inclusive. Give one normal, one valid extreme and one abnormal example with its expected decision.', 'For example: "Mina" has 4 characters and is normal/accepted; "Li" has 2 characters and is a valid extreme/accepted; "A" has 1 character and is abnormal/rejected. Other examples are valid if their lengths and outcomes fit the rule.'),
        takeaway: 'Choose data from the stated domain and test both accepted endpoints and nearby rejected values.',
        bridge: 'One input cannot reveal every loop or accumulation fault. Some behaviours require a complete sequence.',
        trap: 'Boundary does not mean rejected. The valid endpoint is often the most important accepted test.', papers: [],
      },
      {
        id: 'develop-test-sequences', title: 'Test distinct behaviours with complete sequences',
        unitKeys: ['S12-DATA-SELECT'], objectiveIds: ids(7, 1, 2), prerequisites: ['develop-test-data'],
        stimulus: specimen('A booking-total routine with a stop value', 'Read positive seat quantities and stop at sentinel 99.', '99 marks the end; it is not a booking quantity and must not enter the total.', 'For this separate routine, all data values before 99 are positive integers. The 1–6 validation rule is not part of this input contract.'),
        question: 'Which cases distinguish no work, one update and several updates?',
        observe: 'Predict the final total for 99; for 3, 99; and for 3, 2, 4, 99. Keep the sentinel outside the calculation.',
        prerequisite: recall('Recall a sentinel and loop placement', 'A sentinel is a special value that signals termination. A pre-condition loop can skip its body entirely when the first input is the sentinel. Initialising the total before the loop preserves a correct zero result for that path.'),
        steps: [
          step('Select behaviours rather than decorative variations', '99 alone tests immediate termination and a zero total. 3, 99 tests one update. 3, 2, 4, 99 tests repeated accumulation. Three lists with different numbers can still test the same behaviour if their structure is identical.'),
          step('Challenge relationships between outputs', 'For a routine counting odd and even data, use an all-odd sequence to check the even count stays zero, an all-even sequence to check the odd count stays zero, and an immediate sentinel to check both start at zero. Choose according to the outputs actually required.'),
          step('Keep every proposed sequence valid for the task', 'If asked for valid sequences, obey the stated type, sign and terminating sentinel. Do not insert an invalid value just because abnormal testing exists elsewhere. Include each sequence’s purpose and independently predicted output when useful.'),
          step('Connect the case to a plausible fault', 'Several data items can reveal an accumulator reset inside a loop. An immediate sentinel can reveal processing before the termination check. A sequence containing only one category can expose an unintended update to the other category.'),
        ],
        worked: worked('Prepare for the odd/even counting task', 'The original paper asks for distinct valid positive-integer sequences ending in 99. The sentinel is excluded from both counts.', [
          step('Calculate from data before the sentinel', 'A sequence 7, 9, 99 contains two odd data items and no even data. 99 is itself odd but is a terminator, so the expected counts are 2 and 0.'),
          step('Choose a different behaviour next', 'Use an all-even sequence or immediate sentinel rather than another mixed list resembling the supplied example. Explain the specific behaviour each proposed sequence tests.'),
        ], 'The purpose of a sequence should explain why its arrangement may expose a different fault.'),
        check: check('The required total for 3, 2, 4, 99 is 9. A faulty program outputs 4. Which likely placement error should you investigate, and which other test checks the no-data path?', 'Investigate whether Total is reset inside the loop so only the final data value remains. Test the sequence 99 alone; the required total is 0 and no booking value should be processed.'),
        takeaway: 'Test distinct execution behaviours with complete, valid input sequences and an explicit purpose.',
        bridge: 'Now organise these useful cases into a strategy and records that another person can repeat.',
        trap: 'A sentinel may have the same numeric type as data but a different role. It must not be counted merely because it meets a data category test.', papers: ['E105'],
      },
    ],
  },
  91: {
    title: 'Keep the delivered booking system useful',
    intro: 'Delivery does not freeze the world around a program. Identify why a change is needed, then keep the requirement, implementation and tests consistent.',
    groups: [
      {
        id: 'develop-maintenance-need', title: 'Follow a change after delivery',
        unitKeys: ['S12-MAINTENANCE-NEED'], objectiveIds: ids(8, 1), prerequisites: ['develop-acceptance'], lab: 'maintenance',
        stimulus: specimen('A new booking-desk message', 'The delivered system follows the agreed maximum of 6 seats per request.', 'A new approved arrangement allows up to 8 seats per request.', 'The input hint still says 1–6, the code still checks <= 6, and the old maximum test still uses 6.'),
        question: 'Which connected parts must change before the new rule is consistently supported?',
        observe: 'Predict what happens if only the help text changes. Then predict what happens if only the code changes. Neither change alone keeps the user instruction, behaviour and evidence aligned.',
        prerequisite: recall('Recall requirement, implementation and test', 'A required limit determines the design, comparison, user guidance and expected boundary results. The new limit is a revised requirement; it does not mean the original 1–6 implementation was faulty.'),
        steps: [
          step('Explain why maintenance continues', 'Real use can expose faults not found before delivery. Operating systems, devices, libraries or external rules can change. Users may need additional functions or better performance. Maintenance changes delivered software so that it remains useful under these circumstances.'),
          step('Record what changed and why', 'Confirm the new 1–8 rule and its reason before editing. Identify every dependent location: the interface guidance, validation condition, documentation and test cases. A change request should distinguish a new requirement from a defect in the old one.'),
          step('Update affected evidence coherently', 'After the approved change, 7 and 8 should be accepted, while 9 should be rejected. Old 0 must remain rejected and old ordinary values must remain accepted. Change expectations because the requirement changed, not because an arbitrary patch happens to produce them.'),
        ],
        worked: worked('Check the new maximum without losing the minimum', 'The old rule is 1–6; the new approved rule is 1–8. Every request remains independent.', [
          step('List changed and retained behaviour', 'Inputs 7 and 8 deliberately change from rejection to acceptance. Input 6 still passes. Input 0 still fails. The next rejected upper neighbour is now 9.'),
          step('Prepare a coherent revision', 'Revise the displayed range and upper comparison to 8, update the specification and expected cases, then repeat the revised boundary cases and relevant unchanged cases. Record which version implements which rule.'),
        ], 'A maintenance change includes its impact on users, code and evidence.'),
        check: check('A revised limit makes input 7 valid. Is changing its expected result from Rejected to Accepted always hiding a defect?', 'No. It is correct when an approved requirement changed from maximum 6 to maximum 8. It would hide a defect if the original 1–6 requirement still applied and the expected result were changed merely to match faulty code.'),
        takeaway: 'Maintenance responds to change after delivery and keeps all affected parts consistent.',
        bridge: 'Classify a maintenance task by the reason for the change, not by the file that receives it.',
        trap: 'A working program may need maintenance even when it has no known defect.', papers: [],
      },
      {
        id: 'develop-maintenance-types', title: 'Classify the cause of the change',
        unitKeys: ['S12-MAINTENANCE-TYPES'], objectiveIds: ids(8, 1, 2, 3, 4), prerequisites: ['develop-maintenance-need'],
        stimulus: { title: 'Three delivered-system change tickets', table: table(['Ticket', 'Reason'], [['Fix the charge for exactly 6 seats', 'The original calculation requirement is not met'], ['Support a replacement printer interface', 'The external device environment changed'], ['Add an optional booking-summary chart', 'Users want an improvement to a working report']]) },
        question: 'Why can all three tickets change code but belong to different categories?',
        observe: 'Look for the cause stated in each ticket. The number of edited lines, adding a function or changing a screen does not determine the category.',
        prerequisite: recall('Recall old and revised requirements', 'A defect means the program fails a requirement that already applied. A new environment or improvement request can create a new requirement even when the old behaviour was correct.'),
        steps: [
          step('Corrective: repair an existing fault', 'Corrective maintenance restores behaviour the system should already provide. Repairing a wrong total or an existing response-time violation is corrective because the original requirement was not met.'),
          step('Adaptive: respond to the changed environment', 'Adaptive maintenance lets a program work with changed operating systems, hardware, library interfaces, external rules or operational circumstances. A new printer interface requires an adaptation even if the old printer support was correct.'),
          step('Perfective: improve a delivered system', 'Perfective maintenance improves functionality, efficiency or usability beyond the currently satisfied requirements. An extra report or a faster already-compliant search can be perfective. Classify from the stated reason, not from the word “faster” alone.'),
          step('Split mixed requests and ask what changed', '“Fix duplicate charges, support a new printer and add a chart” contains three different causes. A changed tax rate could be corrective if the old value was already wrong, or adaptive if a new external rule changes it. The same edited line can serve different maintenance purposes.'),
        ],
        worked: worked('Explain why a correct program still needs adaptation', 'The booking program calls a printer library. A system update replaces the library’s interface.', [
          step('Identify the external change', 'The old program worked with the old interface. Its caller now needs the replacement interface, so the trigger is environmental change rather than a newly discovered old fault.'),
          step('Give a contextual consequence', 'Update the printer call and any affected data handling, then test the connection. The same reasoning applies to a factory program when its control hardware or a library it uses changes.'),
        ], 'A classification earns its explanation by linking the change to the stated cause.'),
        check: check('A search already meets its required response time. Users request a faster version. Then a different search is found to exceed its existing required time. Classify the two changes.', 'The requested improvement to the already-compliant search is perfective. Repairing the search that violates an existing response-time requirement is corrective.'),
        takeaway: 'Corrective repairs a fault; adaptive responds to external change; perfective improves a delivered system.',
        bridge: 'To implement any of these changes safely, first understand the current program and its dependencies.',
        trap: 'Adding code is not automatically perfective, and changing a working program is not automatically corrective.', papers: ['E106'],
      },
    ],
  },
  92: {
    title: 'Amend a program while preserving required behaviour',
    intro: 'Trace the existing program, identify the full impact of the requested change and verify the result. Then transfer this method from calculations to interfaces and stored records.',
    groups: [
      {
        id: 'develop-amend-baseline', title: 'Understand the existing program before editing',
        unitKeys: ['S12-AMEND-ANALYSE'], objectiveIds: ids(9, 1), prerequisites: ['develop-maintenance-types'],
        stimulus: specimen('The existing booking report', 'Read exactly three already valid requests, each an integer from 1 to 6.', 'Output the sum of their Seats values. Requests are independent; the sum is not a remaining-capacity calculation.', 'The new request is to report how many bookings contain at least 3 seats as well, without changing the original total.'),
        question: 'Which old behaviour must remain, and which new information is missing?',
        observe: 'Use 2, 3, 6. The total is 11, while two bookings meet the new group threshold. Counting qualifying bookings is different from totalling their seats.',
        prerequisite: recall('Recall count versus total', 'A count increases by 1 for each qualifying item. A total increases by the item’s numeric value. Both need initialisation before repetition and final output after the relevant inputs have been processed.'),
        steps: [
          step('State the current contract', 'The program receives three validated INTEGER quantities and outputs one sum. It does not validate raw input, process a sentinel or subtract bookings from Available. Preserve those assumptions while analysing this amendment.'),
          step('Read the actual placement of operations', 'Total is initialised once, updated for every input and displayed once after the loop. Trace those statements before proposing new code.', { code: bookingCountCode(false) }),
          step('Make an impact list for the new requirement', 'The additional count needs an INTEGER declaration, zero initialisation, a qualifying condition, an increment and a final output. The original total, input count and update remain. A heading saying “add group count” is not enough to locate all affected operations.'),
        ],
        worked: worked('Establish a baseline for the amendment', 'Run a manual trace using input 2, 3, 6.', [
          step('Trace the original values', 'Total progresses 0 → 2 → 5 → 11. There is one final output, 11. No group counter currently exists.'),
          step('Write the new expected outcome before editing', 'The enhanced program should still output 11, then output 2 for the number of requests with at least 3 seats. The requested new output does not replace the old one.'),
        ], 'A baseline identifies the old contract, current implementation and behaviour that the change must preserve.'),
        check: check('Why would replacing Total <- Total + Seats with Total <- Total + 1 fail the change request?', 'It would change the original sum into a count and lose the required total. Add a separate counter and retain the existing total update.'),
        takeaway: 'Trace the old program and define the preservation requirements before designing the amendment.',
        bridge: 'Next place every part of the additional count and choose tests that would expose incorrect placement.',
        trap: 'An enhancement adds or deliberately changes specified behaviour; it is not permission to rewrite unrelated working responsibilities.', papers: [],
      },
      {
        id: 'develop-amend-count', title: 'Add the new result and test old and new behaviour',
        unitKeys: ['S12-AMEND-CHANGE', 'S12-AMEND-VERIFY'], objectiveIds: ids(9, 1), prerequisites: ['develop-amend-baseline'],
        stimulus: { title: 'Predict both outputs', table: table(['Three requests', 'Old total', 'New group count (Seats >= 3)'], [['2, 3, 6', '11', '2'], ['1, 1, 1', '3', '0'], ['3, 4, 6', '13', '3']]) },
        question: 'Where must the new counter start, change and be displayed?',
        observe: 'Imagine initialising GroupBookings inside the loop. Then imagine displaying it before the loop finishes. Explain which required output each placement would break.',
        prerequisite: recall('Recall overlapping responsibilities', 'Every request contributes its seats to Total. Some also add one to GroupBookings. These are not mutually exclusive alternatives: a qualifying request must contribute to both results.'),
        steps: [
          step('Declare and initialise once', 'Declare GroupBookings as INTEGER and set it to 0 before the loop. Starting it inside the loop would erase earlier qualifying bookings.'),
          step('Update at the correct scope', 'Retain Total <- Total + Seats for every input. Then use IF Seats >= 3 to increment GroupBookings by 1. The group test does not belong in an ELSE that would prevent its seats entering Total.'),
          step('Output both final results', 'Place both output statements after NEXT so they describe the complete set. Keep the original result first, followed by the added count.', { code: bookingCountCode(true) }),
          step('Test boundaries, accumulation and preservation', 'Use 2 and 3 around the new inclusive threshold. Include no qualifying bookings, all qualifying bookings and several early qualifying bookings. For every set, check that the total matches the old program as well as checking the new count.'),
        ],
        worked: worked('Expose a misplaced reset', 'Compare the correct enhancement with a version that resets GroupBookings to 0 on every loop visit.', [
          step('Use a sequence with repeated qualifying items', 'For 3, 4, 6 the correct outputs are total 13 and group count 3. The reset-inside-loop version ends with group count 1, so this sequence distinguishes the fault.'),
          step('Transfer to overlapping grade categories', 'In the separate mark example, Mark >= 70 is a merit and also a pass at >= 50. Two independent IF statements update both counts; ELSE would incorrectly exclude one. Input 49, 50, 69, 70 must yield 3 passes and 1 merit.', { code: codeFor12('passEnhanced') }),
        ], 'Use complete datasets that would fail under plausible wrong amendments, not just one convenient example.'),
        check: check('For bookings 3, 1, 1, what are Total and GroupBookings? Why is this also useful for testing a counter reset inside the loop?', 'Total is 5 and GroupBookings is 1. A faulty counter reset on each iteration would lose the first qualifying booking and finish at 0 because the last two requests do not qualify.'),
        takeaway: 'A complete amendment aligns declaration, initialisation, processing and output, then verifies changed and preserved behaviour.',
        bridge: 'An interface change reaches beyond one function body: callers and test inputs must change with it.',
        trap: 'A new result passing one case does not show that the old result was preserved or that accumulation works across several iterations.', papers: [],
      },
      {
        id: 'develop-amend-interface', title: 'Change the interface and every affected caller',
        unitKeys: ['S12-AMEND-INTERFACE'], objectiveIds: ids(9, 1), prerequisites: ['develop-amend-count', 'develop-module-data'],
        stimulus: specimen('A configurable booking rule', 'The old function IsValid(Seats) checks the fixed range 1–6.', 'The new version reads one Limit before one Seats value. Limit is already validated as an integer from 1 to 12.', 'Change the function to IsValid(Seats, Limit). Keep its BOOLEAN result and accept Seats from 1 through Limit inclusive.'),
        question: 'Why is adding a parameter to the function header only part of the change?',
        observe: 'Locate the source of Limit, its position in the call and the comparison that uses it. Two INTEGER arguments can have the correct types yet be passed in the wrong order.',
        prerequisite: recall('Recall an ordered interface', 'Formal parameters appear in the function header; arguments appear in its call. Number, order, types and intended roles must agree. A returned BOOLEAN is used by the caller’s selection.'),
        steps: [
          step('Revise the contract before its implementation', 'The function now needs two inputs. Replace the fixed upper bound with the supplied Limit, but preserve the lower bound and BOOLEAN return. Document that Limit itself has already been validated.'),
          step('Update the caller’s state and input sequence', 'Declare Limit and read it before Seats. Pass Seats first and Limit second at every call. An old one-argument call no longer matches the header; reversed arguments compare the wrong roles.'),
          step('Show the complete revised connection', 'This small program checks one integer request against one selected limit. It does not read a different limit for each part of a calculation.', { code: 'FUNCTION IsValid(BYVAL Seats : INTEGER, BYVAL Limit : INTEGER) RETURNS BOOLEAN\n    RETURN (Seats >= 1) AND (Seats <= Limit)\nENDFUNCTION\n\nDECLARE Limit, Seats : INTEGER\nINPUT Limit\nINPUT Seats\nIF IsValid(Seats, Limit) THEN\n    OUTPUT "Accepted"\nELSE\n    OUTPUT "Rejected"\nENDIF' }),
          step('Update tests and examples to the new interface', 'With Limit 6, old accepted and rejected quantities must behave as before. With Limit 8, Seats 7 now passes, while 9 fails. Include Seats 0 to protect the unchanged minimum. Each fixture must supply the limit before the quantity.'),
        ],
        worked: worked('Distinguish compatibility from new behaviour', 'Test the revised function and its complete caller.', [
          step('Check the old parameter setting', 'Inputs 6, 6 must display Accepted and 6, 7 must display Rejected. These reproduce the old upper-limit rule.'),
          step('Check a deliberately different setting', 'Inputs 8, 7 must display Accepted. If the function body still compares with 6, it incorrectly rejects the request. Inputs 8, 9 must display Rejected. A reversed call IsValid(Limit, Seats) would make the latter comparison 8 <= 9 and wrongly accept it.'),
        ], 'Header, body, callers, input fixtures and documentation are one connected change.'),
        check: check('The header becomes IsValid(Seats, Limit), but the function still returns Seats <= 6. Why can tests using only Limit 6 miss the fault?', 'Those tests reproduce the old fixed rule, so the hard-coded 6 appears correct. Use a different valid limit, such as Limit 8 with Seats 7, to prove the new parameter actually changes the decision. Retain the lower-bound check too.'),
        takeaway: 'Interface amendments require coordinated changes at every definition, call and dependent test.',
        bridge: 'Stored record formats are also interfaces. Changing what data may contain can require a different way to find field boundaries.',
        trap: 'Matching argument types does not guarantee correct argument order, and editing one caller does not update every call automatically.', papers: [],
      },
      {
        id: 'develop-amend-record', title: 'Preserve field boundaries when data changes',
        unitKeys: ['S12-AMEND-ANALYSE', 'S12-AMEND-CHANGE', 'S12-AMEND-VERIFY'], objectiveIds: ids(9, 1), prerequisites: ['develop-amend-interface'],
        stimulus: specimen('A changed record requirement', 'A booking record stores BookingID, Name and Email, separated by |. These original fields are guaranteed not to contain |.', 'Two new encoded fields may contain any visible character, including |. Each has length 0–99.', 'The whole record must remain on one physical line. How will a reader know where each added field ends?'),
        question: 'Can choosing a different separator solve a field that may contain any separator?',
        observe: 'Try storing the added value A|B. A reader that splits at every | would treat one value as two fields. The format must describe boundaries without mistaking field data for separators.',
        prerequisite: recall('Recall text records and string length', 'A text record needs a defined way to separate its fields. LENGTH counts characters; a substring operation extracts a specified number of characters. Leading zeros in a fixed-width length are meaningful text. Read each paper’s supplied string interface before using its function names.'),
        steps: [
          step('Analyse the old assumption that no longer holds', 'Delimiter-separated fields work only when the delimiter is excluded or handled by a defined escaping rule. The new fields can contain it, so the old “split everywhere” reader is no longer valid. Both writer and reader depend on the format.'),
          step('Choose an unambiguous length representation', 'For each added field, store its length as exactly two decimal digits followed immediately by that many characters. The limit 99 makes two digits sufficient. A one-character field begins 01, an empty field 00. Unseparated variable-width lengths would introduce another ambiguous boundary.'),
          step('Find the new section and read by length', 'Preserve the three original fields and their agreed delimiters, including a delimiter after the email before the added section. Read two digits as a length, then exactly that many characters. Repeat for the next field. Characters inside those spans are data, even when they look like delimiters.'),
          step('Amend both sides and verify the new contract', 'Update writing, reading, format documentation and fixtures together. Check an empty added field, one containing the old delimiter and a maximum-length field. If line breaks are possible, first encode them into a single-line representation and define lengths consistently for that stored representation.'),
        ],
        worked: worked('Decode a record with an embedded separator', 'The teacher-written record is B004|Mina|mina@example.org|03A|B02xy. The new values are A|B and xy.', [
          step('Locate the section boundary', 'The first three delimiters bound the original BookingID, Name and Email fields. After the email delimiter, the reader changes to the new length-prefixed format.'),
          step('Read the two new fields', 'Read 03, then exactly A, | and B. That internal | belongs to the first field. Read 02 next, then x and y. The consumed characters now end at the record end. Both values are recovered without choosing a forbidden separator.'),
          step('Connect the format change to program enhancement', 'The implementation must write and read matching formats. An amended writer paired with the old split-at-every-separator reader still fails. Use the same analysis–impact–amend–verify method as for the changed function interface.'),
        ], 'A reliable enhancement revises the assumptions and every component that depends on them.'),
        check: check('How would you store the added fields "" and "A|B" using two-digit lengths? Why does picking # as a new separator not solve the general problem?', 'The added section is 0003A|B: 00 introduces an empty first field; 03 introduces the three-character second field. Choosing # is insufficient because the new data may also contain #.'),
        takeaway: 'When a data assumption changes, revise the format and all readers and writers that depend on it.',
        bridge: 'The complete development method is now connected: agree a requirement, design, implement, test and maintain its dependent parts.',
        trap: 'A length prefix must itself have an unambiguous representation. Also preserve any explicit one-line requirement of the record.', papers: ['E107'],
      },
    ],
  },
};

// Verified review routes reconnect prerequisites without interrupting the lesson.
const prerequisiteLinks = {
  'develop-module-data': [
    { href: '../lesson-080/', label: 'Review procedures and parameter passing' },
    { href: '../lesson-081/', label: 'Review functions and return values' },
  ],
  'develop-module-control': [
    { href: '../lesson-076/', label: 'Review IF and CASE selection' },
    { href: '../lesson-077/', label: 'Review count-controlled loops' },
  ],
  'develop-manual-review': [
    { href: '../lesson-077/', label: 'Review loop traces and running totals' },
  ],
  'develop-test-sequences': [
    { href: '../lesson-078/', label: 'Review pre-condition loops and sentinel inputs' },
  ],
  'develop-amend-interface': [
    { href: '../lesson-081/', label: 'Review ordered function interfaces and returns' },
  ],
  'develop-amend-record': [
    { href: '../lesson-065/', label: 'Review text records and file operations' },
    { href: '../lesson-075/', label: 'Review string lengths and substrings' },
  ],
};

const experimentPrompts = {
  lifecycle: 'Predict which stage produces the agreed range, algorithm, code and test report. Step through a model, then introduce a changed requirement and explain which earlier products need review.',
  structure: 'Predict the charge for Seats 3 and Price 12.50 before stepping. Locate the two BYREF updates, the copied calculation parameters and the returned REAL. Change the receipt copies from one to two: predict which module repeats and which value remains unchanged.',
  states: 'Starting in Draft, predict Submit, Pay and Cancel for Seats 3 and Available 6. Then reset and try Seats 7. Explain the guard failure, current state and effect of Pay before a valid submission.',
  debug: 'Predict the exact-fit result before comparing the faulty and corrected range decisions. Inspect Seats 6 and Available 6, then compare a positive Groups value with Groups 0 in the run-time example. Explain where the cause first becomes visible.',
  testing: 'Predict the caller output with controlled TRUE and FALSE stub responses, then with the real implementation. State what each test proves about the caller and what remains unknown about the replaced module. Compare tests chosen from code and from the specification.',
  boundary: 'Keep the default 1–6 rule and predict 0, 1, 2, 5, 6 and 7. Compare the exact maximum with the faulty upper comparison. If you change the rule, derive new expected values before observing the implementation.',
  maintenance: 'Predict which outputs deliberately change when the maximum moves from 6 to 8. Update the dependent rule, guidance and tests in the activity, then compare 0, 6, 7, 8 and 9 with the new requirement.',
};
for (const topic of Object.values(section12Journey)) {
  for (const group of topic.groups) {
    if (prerequisiteLinks[group.id]) group.prerequisite.links = prerequisiteLinks[group.id];
    if (group.lab) {
      if (!experimentPrompts[group.lab]) throw new Error(`Missing Section 12 experiment prompt: ${group.lab}`);
      group.experimentPrompt = experimentPrompts[group.lab];
    }
  }
}

const groupIds = (...sequences) => sequences.flatMap(sequence => section12Journey[sequence].groups.map(group => group.id));
const testingGroups = section12Journey[88].groups.map(group => group.id);
export const section12Modules = [
  { title: 'Agree and organise the work', focus: 'Follow one booking rule through five stages and choose a development model from the project evidence.', groups: groupIds(84) },
  { title: 'Design connected modules', focus: 'Decompose the task, recover parameter knowledge, translate complete interfaces and trace conditional calls.', groups: groupIds(85) },
  { title: 'Model event-driven behaviour', focus: 'Trace state, event, guard and output without confusing them with module responsibilities.', groups: groupIds(86) },
  { title: 'Find and correct faults', focus: 'Distinguish error types, locate the first incorrect operation and verify a focused repair.', groups: groupIds(87) },
  { title: 'Choose testing methods', focus: 'Dry-run and review code, compare black-box and white-box selection, then test callers and connected modules.', groups: testingGroups.slice(0, 3) },
  { title: 'Choose data and keep evidence', focus: 'Challenge limits and sequences before turning tests into an overall strategy and repeatable records.', groups: [...groupIds(90), ...groupIds(89)] },
  { title: 'Evaluate the system with users', focus: 'Distinguish alpha and beta environments from the customer’s acceptance decision.', groups: testingGroups.slice(3) },
  { title: 'Maintain and amend the program', focus: 'Classify the reason for a change, preserve old behaviour and update counts, interfaces and record formats coherently.', groups: groupIds(91, 92) },
];

const session = (title, focus, groups) => ({ title, minutes: 45, focus, groups });
export const section12Sessions = [
  session('Follow one booking requirement', 'Discuss the request, connect five concrete stage products and try the development-process experiment.', ['develop-booking-requirement']),
  session('Compare sequential work and successive versions', 'Trace a late change through waterfall, then use review evidence to set one iteration’s aim.', ['develop-waterfall', 'develop-iterations']),
  session('Evaluate RAD and justify a model', 'Compare feedback conditions and resources, then attempt the original model-choice question.', ['develop-rad-choice']),
  session('Draw modules and recover parameter knowledge', 'Sketch the booking hierarchy, then trace copies, reference updates and a returned amount.', ['develop-module-responsibilities', 'develop-module-data']),
  session('Translate a complete structure chart', 'Walk through the definitions and parent calls, predict data transfers and operate the module experiment.', ['develop-module-code']),
  session('Read control notation and apply the chart method', 'Trace repeated and conditional calls, explain data/control couples and complete the original chart question.', ['develop-module-control']),
  session('Trace persistent states', 'Predict booking events, operate the state experiment and explain the starting state and self-loops.', ['develop-state-events']),
  session('Read guards and complete a state diagram', 'Distinguish event, condition and output, trace the upload example and attempt the PIN diagram.', ['develop-state-guards']),
  session('Distinguish faults and locate a cause', 'Classify concrete symptoms, reproduce the boundary fault and compare values before and after a decision.', ['develop-error-types', 'develop-error-location']),
  session('Verify a correction and transfer to supplied code', 'Check the zero-count guard and regression cases, then inspect the original syntax, bounds and CASE task.', ['develop-error-retest']),
  session('Dry-run and review a program', 'Build a trace collaboratively and distinguish the dry run from the walkthrough discussion.', ['develop-manual-review']),
  session('Choose black-box and white-box cases', 'Compare test-selection evidence and explain why executing both branches can miss an inclusive boundary.', ['develop-box-testing']),
  session('Test unfinished and connected modules', 'Use both stub responses, replace the stub with the real fixture and attempt the original stub/testing question.', ['develop-integration-stubs']),
  session('Challenge the permitted input range', 'Derive normal, abnormal and endpoint cases, operate the boundary experiment and transfer to strings and precision.', ['develop-test-data']),
  session('Design distinct input sequences', 'Predict zero, one and several updates, then attempt the odd/even sentinel test-design question.', ['develop-test-sequences']),
  session('Plan testing and write usable records', 'Connect methods and responsibilities, then record expected and actual results without losing earlier failures.', ['develop-test-strategy', 'develop-test-record']),
  session('Complete test-plan data under a source constraint', 'Review the integer sensor domain, derive attainable cases and attempt the original sensor table independently.', ['develop-test-record']),
  session('Use user trials and acceptance evidence', 'Distinguish controlled trials, real environments and requirement-based customer acceptance; complete its short original question.', ['develop-alpha-beta', 'develop-acceptance']),
  session('Follow maintenance impact', 'Change the booking limit coherently and explain which expected outcomes should change and which should remain.', ['develop-maintenance-need']),
  session('Classify maintenance by its cause', 'Compare paired examples and attempt the factory adaptation question with contextual reasons.', ['develop-maintenance-types']),
  session('Analyse and enhance a complete program', 'Establish the old booking total, locate every part of the added group count and write the complete amendment.', ['develop-amend-baseline', 'develop-amend-count']),
  session('Verify the enhancement and transfer to counts', 'Use discriminating sequences and old-output checks, then explain overlapping pass and merit categories.', ['develop-amend-count']),
  session('Change a function and its callers', 'Trace the old fixed limit, implement an ordered two-parameter interface and test both old and new settings.', ['develop-amend-interface']),
  session('Revise a record format', 'Recall string lengths and delimiters, decode an embedded separator and attempt the original format-enhancement question.', ['develop-amend-record']),
];
