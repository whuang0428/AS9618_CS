import { coreParagraph as p, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';
import { codeFor12, uploadStates12 } from './course-v3-section12-programs.mjs';
import { section12TeachingVisuals as visuals } from './course-v3-section12-teaching-diagrams.mjs';

const ids=(r,...ns)=>ns.map(n=>`S12.${String(r).padStart(2,'0')}.A${String(n).padStart(2,'0')}`);
const entry=(blocks,essentials)=>({blocks,essentials});
const materialTable=(title,headers,rows)=>({type:'table',title,headers,rows,preserve:true,preserveText:true});
const example=(key,title,requirements,result)=>({type:'worked-example',programKey:key,title,preserve:true,steps:[['Requirements and initial conditions',requirements],['Cambridge pseudocode',codeFor12(key)],['Expected result and checks',result]]});
const extension=(title,explanation,materials=[])=>({title:`Optional extension: ${title}`,explanation,materials});

const teaching={
  'LIFECYCLE-STAGES':entry([
    p('A development life cycle coordinates the work from a problem to a delivered, supported solution. Analysis establishes what is needed; design decides how to achieve it; coding implements that design; testing compares behaviour with independently expected results; maintenance responds to changes after delivery. Keeping the evidence connected helps a team find the source of a disagreement.', 'Connect activities through their outputs'),
    table('One booking requirement through the five stages',['Stage','Concrete result for the next activity'],[
      ['Analysis','Agree that Quantity is an INTEGER, 1–30 inclusive is accepted, and every other integer is rejected. Each request is independent; no seats are accumulated across requests.'],
      ['Design','Read Quantity, evaluate both limits with AND, output Accepted or Rejected, then finish this request. Identify boundary cases before implementation.'],
      ['Coding','Implement the complete roomRule program below with a declaration, input, both branches and ENDIF.'],
      ['Testing','1 and 30 must produce Accepted; 0 and 31 must produce Rejected. Compare these expectations with the chosen implementation.'],
      ['Maintenance','A later capacity change to 35 changes the specification, comparison and expected boundary tests together. The reason for the capacity change determines the maintenance category.'],
    ]),
    p('The agreed rule is the source of the expected results. If code accepts 31, testing has exposed a discrepancy; it has not changed the capacity to 31. If users actually need a larger room, analysis must establish a revised requirement before design and code change. A model organises this work but cannot replace judgement about the requirement.', 'Follow feedback to the right decision'),
    p('The short program demonstrates one complete requirement. It assumes integer input and does not claim to validate raw text. The five-stage library example is a separate illustration of stage responsibilities, not a complete library program.', 'Keep the example boundary explicit'),
  ],['Connect analysis, design, coding, testing and maintenance through requirements and evidence.','A development model organises the work; successful translation or a completed stage list does not establish suitability.']),
  WATERFALL:entry([
    p('Waterfall organises development largely in a planned sequence. Requirements are reviewed before the solution design becomes the basis for coding; later tests check the implemented behaviour against those requirements. Clear stage outputs make progress, responsibilities and approval decisions easier to track.', 'Explain what the sequence achieves'),
    p('For a fixed booking-capacity calculation with stable rules and required written approvals, a team can agree the range and messages before coding. Each approved output gives the next activity a defined starting point. This is a reasoned benefit of the model, rather than a claim that all small projects need waterfall.', 'Apply the benefit to a requirement'),
    p('Suppose users see the working form near final testing and explain that their group bookings need an additional rule. The team may need to revise the requirements, design, implementation and existing tests. Returning to earlier work is possible, but the late discovery makes previously completed work less reusable. That is why uncertain interaction requirements can make a strongly sequential approach costly.', 'Trace the cost of a late change'),
  ],['Waterfall uses largely sequential, reviewed stages and documented outputs.','Stable requirements support planning; late requirement changes can require substantial rework.']),
  ITERATIVE:entry([
    p('Iterative development revisits analysis, design, coding and testing through successive versions. An iteration has a defined aim, produces something that can be evaluated, and uses the findings to decide the next change. Repeatedly executing an unchanged program is not an iteration of its development.', 'Give each cycle a purpose'),
    steps('Improve the booking form through evidence',[
      ['First version','Implement the agreed 1–30 rule and the two decision messages. Verify those outputs.'],
      ['Review','Users can see a refusal but do not understand which value to enter. Record that specific finding.'],
      ['Next version','Keep the range rule and add a useful explanation of the permitted range. Test the old acceptance decisions and the new message.'],
      ['Decide whether to continue','Compare the result with the agreed goals. Prioritise any remaining issue instead of adding every suggestion.'],
    ]),
    p('Early feedback reduces the risk of completing an unsuitable solution. Smaller changes can also be easier to diagnose. However, repeated requests can expand scope, and code, documents and tests can drift apart unless the team controls versions, priorities and completion criteria. A new iteration may improve existing behaviour, add a planned part, or do both.', 'Balance feedback with control'),
  ],['Successive versions use feedback to refine the solution.','Define scope and completion criteria for each iteration and keep documents and tests consistent.']),
  RAD:entry([
    p('Rapid application development uses rapid prototypes, frequent user involvement and short agreed time boxes. A prototype makes selected behaviour tangible so users can evaluate it early. A time box limits the time spent on the agreed scope; it does not guarantee that every suggested feature can be delivered.', 'Connect the defining features'),
    p('A team can reuse a suitable form component to build a booking interface quickly. Separable parts may be developed alongside one another, then integrated through agreed interfaces. Reuse avoids repeating suitable work; modularity reduces interference between parts. Unsuitable components, tightly coupled modules or difficult integration can remove those advantages.', 'Explain how rapid construction is possible'),
    p('Daily access to booking staff allows a prototype to reveal unclear messages while there is still time to revise them. If users cannot review it until delivery, the feedback mechanism is absent. Skilled developers still need to check validation, data transfers and required outputs; an attractive prototype does not establish a complete, reliable system.', 'State the conditions and limits'),
    table('Make a choice when the constraints change',['Evidence','Implication'],[
      ['Stable calculation rules; formal approvals','Waterfall may make planned stage evidence easier to manage.'],
      ['Major purpose known; interaction details evolve','Iterative review can improve working versions as needs become clearer.'],
      ['Short prototype deadline; available users; separable components','RAD can shorten the route to useful feedback.'],
      ['A short deadline but no users or reusable components','The deadline alone does not establish that RAD fits. Explain the missing conditions.'],
    ]),
  ],['RAD combines rapid prototypes, user feedback and time-boxed development.','Justify the model using stability, user access, modularity, delivery needs and assurance constraints.']),
  'STRUCTURE-HIERARCHY':entry([
    p('A structure chart decomposes a problem into modules. A box names a coherent responsibility; a hierarchy line shows which parent calls a child. The controlling module sits above the modules it invokes. A large responsibility can be refined again, giving another level. Individual assignments inside a module do not each require a box.', 'Start with responsibilities'),
    p('For one order, the parent coordinates input, calculation and display. ReadOrder obtains Quantity and UnitPrice; CalculateCost computes their product; DisplayCost presents the supplied Cost. These responsibilities are separated because the reader supplies facts, the function answers a calculation question, and the writer performs an output action.', 'Explain the chosen decomposition'),
    p('The parent connects the work: an amount returned by CalculateCost must reach DisplayCost through the parent. Drawing a direct ReadOrder-to-DisplayCost call would claim a different hierarchy. The grey connections in the supplied chart show calls; labelled teal arrows show values and direction. Its left-to-right order is part of this example’s stated sequence, not a substitute for all internal control flow.', 'Read the chart’s conventions'),
  ],['A structure chart shows module hierarchy, responsibilities and interfaces.','Decompose further when a subtask still contains several coherent responsibilities.']),
  'STRUCTURE-PARAMETERS':entry([
    p('For every module, ask which data it needs before it starts and which results or changes it supplies afterwards. A parameter label without direction leaves the caller unsure whether it should provide a value or expect one back. The interface must also state types and meanings, not just names.', 'Account for every transferred value'),
    table('Follow Quantity 3 and UnitPrice 2.50',['Point','Caller state or effect'],[
      ['Before ReadOrder','Caller variables exist, but the two inputs have not yet been supplied.'],
      ['ReadOrder completes','BYREF assignments put 3 and 2.50 into those caller variables.'],
      ['CalculateCost is called','The function receives value copies, calculates 3 * 2.50 and returns 7.50.'],
      ['Cost receives the result','The parent assigns the returned amount to its own Cost.'],
      ['DisplayCost is called','A value copy of 7.50 is displayed; printing does not return a numeric function result.'],
    ]),
    p('Argument position determines which formal parameter receives which value. Check number, order, types and passing modes at every call. A BYREF update and a function return both communicate a result, but by different mechanisms. The reader uses reference parameters here because it supplies two entered values to the caller; that is a design choice for this interface, not a rule that every input routine must use BYREF.', 'Use the interface from Lessons 080–081'),
  ],['Label data direction and match argument order, types and parameter modes.','Distinguish a function return, an OUTPUT action and a BYREF caller update.']),
  'STRUCTURE-CODE':entry([
    steps('Derive complete pseudocode from the chart',[
      ['Define interfaces','Turn each named responsibility into a procedure or function with the stated typed parameters and result.'],
      ['Supply bodies','Use the problem rule to implement input, arithmetic and output. The chart does not invent the calculation.'],
      ['Connect the parent','Declare its variables, call the reader, assign the returned Cost, then call the writer.'],
      ['Start and trace','Include the controlling call and trace the same values through definitions and call sites.'],
    ]),
    p('The complete order example supplies all definitions and the startup call. ReadOrder must finish before the calculation can use the inputs, and the parent must assign Cost before displaying it. Correct headers alone do not constitute an implementation: calls, bodies and local declarations are needed.', 'Check completeness and ordering'),
    p('Use the ordinary case 3 and 2.50 to obtain 7.50. A single item at price 0 legitimately gives 0 under the stated non-negative-price assumption. Negative prices and text input are outside this example’s contract; do not claim that the program validates them.', 'Check meaningful limits of the example'),
  ],['Match module definitions, calls and data flow to the same design.','Include declarations, bodies, startup, expected results and relevant input assumptions.']),
  'STRUCTURE-CONTROL':entry([
    p('The next design repeats ProcessOrder for a known number of orders. Inside CalculateCost, Member chooses one of two price functions. The chart therefore has both another level of refinement and a condition deciding which lower-level module is called. The curved repetition annotation applies to the ProcessOrder call, not to every line in the whole chart.', 'Add repetition and conditional calls'),
    p('ProcessBatch inputs an already valid non-negative INTEGER OrderCount. If it is zero, output No orders without reading an order. Otherwise each order supplies a positive INTEGER Quantity, non-negative REAL UnitPrice and BOOLEAN Member. A member pays 90% of the base amount; a non-member pays the base amount. Rounding to a currency display is not an extra operation in this algorithm.', 'State the complete batch contract'),
    table('Trace two orders',['Step','Selected function','Returned Cost','Output'],[
      ['3 items at 2.50, Member FALSE','StandardCost','7.50','7.50'],
      ['2 items at 5.00, Member TRUE','MemberCost','9.00','9.00'],
      ['After two ProcessOrder calls','No further order is read','No new result','Program finishes'],
    ]),
    p('Quantity, UnitPrice and Member belong to each ProcessOrder invocation. They are read again for the next order. CalculateCost returns the selected child function’s result; DisplayCost receives that result from ProcessOrder. A function is used as an expression, whereas CALL invokes a procedure. The chart’s symbols and labels are explained here to support design and translation, without treating a structure chart as a statement-by-statement flowchart.', 'Connect the added level to executable meaning'),
  ],['Show which calls repeat and which calls are selected conditionally.','Trace one complete invocation, then account for the next invocation and the zero-call path.']),
  'STATES-MEANING':entry([
    p('A state is a condition a system can remain in while it waits for an event. A state-transition diagram documents possible changes from those conditions. The initial indicator supplies a starting state; a directed arrow specifies the source and destination of a transition, and its label tells the reader which event causes it.', 'Model persistent conditions'),
    p('The turnstile begins Locked. A coin moves it to Unlocked; passing moves it back to Locked. A push while Locked and another coin while Unlocked have explicit self-loops. A self-loop consumes an event without changing the state: it does not imply that the system briefly visits another state.', 'Interpret the supplied model'),
    p('A state such as Unlocked describes the system, whereas a module such as CalculateCost names a responsibility. An event such as coin is something that happens to the system. Keeping these roles separate prevents a state diagram from becoming a misleading list of instructions.', 'Separate state, event and action'),
  ],['Use state names for persistent conditions and labelled arrows for permitted changes.','Read the initial indicator and explicit self-loops before tracing events.']),
  'STATES-TRACE':entry([
    steps('Trace without inventing behaviour',[
      ['Start','Write the specified initial state.'],
      ['Select','Look only at arrows leaving the current state; match the next event and any condition.'],
      ['Update','Record the destination as the new current state, even if it is the same state.'],
      ['Continue or clarify','Use that result for the next event. If no relevant transition is specified, report the missing behaviour rather than borrowing an arrow from another state.'],
    ]),
    p('From Locked, coin, coin, pass gives Unlocked, Unlocked, Locked. The second coin uses the Unlocked loop; it cannot take the Locked-to-Unlocked arrow because its source does not match the current state. The intermediate states explain the result, rather than only naming the final state.', 'Use the current state at every step'),
    table('Choose the design document by the question',['Question','Useful representation'],[['Which modules call other modules, and what data cross their interfaces?','Structure chart'],['Which condition is the system in after these events?','State-transition diagram'],['Which processing step or decision executes next?','Flowchart']]),
  ],['Trace each event using its current source state, label and destination.','An omitted transition is unspecified unless the problem explicitly defines a default.']),
  'STATES-GUARDS':entry([
    p('A guard is a condition attached to a transition. The upload example has Ready, Uploading and Error states. During Uploading, complete with Valid TRUE returns to Ready; complete with Valid FALSE leads to Error. These alternatives are exclusive and cover both BOOLEAN values. Event name alone is therefore insufficient to select the transition.', 'Read the condition with the event'),
    materialToCoreUpload(),
    p('Ready can wait for a new start; it is not a terminal state merely because one upload has completed. The model also specifies cancellation from all three states, progress while Uploading and retry from Error. Other state/event pairs are unspecified. A real implementation would need a requirement for any additional events it must handle.', 'State what the model does and does not define'),
    p('A transition table is a useful check on the diagram: give one row for each specified source, event, condition and destination. Reading and completing such a table supports understanding of the diagram. No formal automata notation or state-machine implementation is needed here.', 'Use a table as supporting evidence'),
  ],['A guarded transition needs the current state, event and satisfied condition.','Check alternative guards and distinguish returning to a ready state from terminating.']),
  'ERROR-TYPES':entry([
    table('Classify the fault by what is wrong',['Type','Meaning','Useful evidence'],[
      ['Syntax','The statement structure violates the language grammar.','A translator or syntax checker can report an incomplete IF or another malformed construct.'],
      ['Logic','Valid statements implement the wrong rule.','Execution or a dry run disagrees with a result independently derived from the requirement.'],
      ['Run-time','An operation fails during execution under particular conditions.','A diagnostic or trace identifies an attempted invalid operation, such as division by zero.'],
    ]),
    p('Use clear requirements to avoid implementing the wrong rule; use modular responsibilities and meaningful names to make mistakes easier to locate; indent nested constructs so missing boundaries are visible; check required preconditions before risky operations. These practices reduce the likelihood of faults but do not prove correctness.', 'Connect prevention to the fault it helps expose'),
    p('The incomplete program below intends to display Pass for integer marks at least 50. Its IF has both branches but lacks ENDIF. A checker may complain when the program ends because that is where it discovers the unclosed construct. The cause is the missing closure, not the final valid OUTPUT statement. Cambridge pseudocode is being inspected here; no particular compiler diagnostic is assumed.', 'Read the whole syntax-error context'),
  ],['Distinguish a grammar violation, an incorrect rule and an execution failure.','Use prevention, review and tests together; successful translation cannot establish the required result.']),
  'ERROR-LOCATE':entry([
    p('Begin with a reproducible input and an independently expected result. Record the actual result, then follow the values and decisions that produced it. The statement where a symptom appears may be correct but use a value computed incorrectly earlier. Locating the cause means explaining that chain.', 'Separate failure evidence from diagnosis'),
    p('The supplied Mark > 50 program outputs Fail for 50 because the comparison is FALSE and the ELSE branch assigns Fail. The requirement says at least 50 passes, so this is a logic error in that comparison. Inputs 49 and 51 cannot expose it: both the wrong and correct comparisons give the required outputs there.', 'Use a discriminating input'),
    p('A condition Mark < 50 can be completely correct when its true branch outputs Fail and its alternative outputs Pass. Inspect branch actions before changing an operator. For a missing-file failure, reproduce the chosen path and inspect the actual file identifier before assuming the error message identifies the originating mistake.', 'Avoid correcting a symptom blindly'),
  ],['Use a specific input, expected result and actual path to locate the cause.','Inspect the whole condition and both branch actions before changing an operator.']),
  'ERROR-CORRECT':entry([
    steps('Correct and collect new evidence',[
      ['Fix the diagnosed cause','Change the Pass condition from > 50 to >= 50, keeping the branch meanings.'],
      ['Retest the failure','Repeat Mark 50; it must now produce Pass.'],
      ['Check related behaviour','Run 49 and 51 to confirm the neighbouring outcomes still agree with the original requirement.'],
      ['Keep the evidence','Record the corrected version and results alongside the earlier failure rather than changing the expected result to fit the implementation.'],
    ]),
    p('For syntax, closing the IF at its correct boundary repairs the malformed construct. For an average, Count > 0 guards the division and the zero-count alternative supplies the specified No data response. A zero denominator must not be “fixed” by silently changing Count to 1 or inventing an average of zero.', 'Make the correction follow the contract'),
    p('Retesting asks whether the identified failure has been repaired. Regression testing asks whether a change has damaged previously correct behaviour that should remain. Some cases contribute to both kinds of evidence. Tests provide evidence for the cases examined; avoid treating a few passes as proof of every possible execution.', 'Explain the purpose of each repeat'),
  ],['Correct the cause and rerun its failing case.','Check relevant unchanged behaviour and define required exceptional-case results.']),
};

function materialToCoreUpload() {
  const run=uploadStates12.tests[0];
  return table('Trace from Ready',['Event','State before','State after'],run.events.map((event,i)=>[event,run.states[i],run.states[i+1]]));
}

Object.assign(teaching, {
  'TEST-MANUAL':entry([
    p('A dry run follows an algorithm manually with stated inputs. Start with its declarations and initial values, execute the actual statements, and record variables, decisions and outputs. A walkthrough is a structured review in which the author explains the design or code to other people. Reviewers can use a dry run, but also question assumptions, omitted requirements and interfaces.', 'Distinguish execution by hand from collaborative review'),
    p('In the positive-total program, Total starts at 0. Inputs 4, -2 and 3 make Value > 0 TRUE, FALSE and TRUE, so the recorded totals are 4, 4 and 7. The final OUTPUT occurs after the third iteration. The skipped negative value is still an input that advances the loop; it is simply excluded from the total.', 'Explain what each trace row means'),
    steps('Walk through the same requirement as a group',[
      ['Prepare','The author supplies the complete program, three inputs and the rule that only positive values contribute.'],
      ['Review','One reviewer traces the ordinary case; another asks what happens for zero and for three negative values.'],
      ['Record','Note the expected zero result for all non-positive inputs and any mismatch between the requirement and statements.'],
      ['Follow up','Assign corrections or clarifications and check them after revision. A meeting without recorded findings gives little usable evidence.'],
    ]),
  ],['A dry run records the actual sequence of values and decisions without computer execution.','A walkthrough uses collaborative explanation and review to identify faults or omissions.']),
  'TEST-BOX':entry([
    p('White-box test design uses the internal code structure. For IF Member, choosing TRUE and FALSE exercises both branches. A trace or execution record establishes which decisions occurred. Black-box test design begins with the specification and predicts required outputs without depending on how the code implements them.', 'Name the basis for choosing a case'),
    p('The discount rule requires Amount 100 to produce 90 for a member and 100 for a non-member. These same cases can be justified from the two code branches or from the promised prices. The labels describe the selection approach, so a test input is not permanently owned by just one approach.', 'Use a shared case for different reasons'),
    p('Suppose a specification also requires a staff discount, but no staff branch was implemented. Every existing branch could execute while that requirement remains untested. Conversely, one correct output does not show that each internal path works. Combine specification-based expectations and relevant structural checks; passing branch checks is not proof of complete requirements coverage.', 'Explain the limit of coverage'),
  ],['White-box selects from internal structure; black-box selects from specified behaviour.','Record expected outputs and explain the selection basis; coverage of existing code can miss an omitted requirement.']),
  'TEST-INTEGRATION':entry([
    p('Integration testing checks modules working together, particularly their interfaces. A calculation and display may each pass isolated checks yet disagree about argument order, units, data meaning or the destination of a result. Matching REAL types alone cannot resolve a disagreement between metres and centimetres.', 'Test a connection, not just two separate modules'),
    steps('Investigate the supplied height mismatch',[
      ['Establish independent contracts','The sensor returns 180 centimetres; the display expects a value in metres.'],
      ['Observe the combined result','Passing 180 directly makes the display show 180 m, but the required result is 1.80 m.'],
      ['Locate the interface disagreement','The numeric type matches, but the transferred unit does not. Decide where the conversion belongs.'],
      ['Correct and retest','Convert once, so 180 cm becomes 1.80 m. Include 0 cm → 0 m and 200 cm → 2 m to test additional values.'],
    ]),
    p('Agree one interface contract so both modules do not independently convert the same quantity. When a called module is unfinished, a temporary stub can allow some caller tests to proceed; the next unit shows exactly which evidence this provides and what must be retested later.', 'Connect integration to staged development'),
  ],['Integration testing checks connected modules and the meaning of data crossing their interfaces.','A type-correct call can still pass the wrong unit, argument or result.']),
  'TEST-STUB':entry([
    p('A stub is a temporary replacement for a called module. It keeps a usable interface while supplying controlled behaviour, such as a fixed result. Here IsAvailable takes INTEGER RoomID and returns BOOLEAN; the caller displays Available on TRUE and Unavailable on FALSE. The only permitted IDs are 101 and 102.', 'Define the interface before substituting a module'),
    table('Separate caller evidence from availability evidence',['Version','Input','Expected caller output','What this checks'],[
      ['Stub returning TRUE','101 or 102','Available','The caller uses the TRUE result to select its positive message.'],
      ['Stub returning FALSE','101 or 102','Unavailable','The caller uses the FALSE result to select its negative message.'],
      ['Real fixture function','101','Available','The known available room is identified and the result is displayed correctly.'],
      ['Real fixture function','102','Unavailable','The known unavailable room is identified and the result is displayed correctly.'],
    ]),
    p('The real fixture specifies room 101 as available and room 102 as unavailable; it is a complete small lookup rule, not a database connection. The TRUE stub deliberately reports Available for 102. That is expected under the temporary stub contract, so it does not by itself identify a caller defect; it also cannot satisfy the real system’s acceptance requirement for that room.', 'State what a passing stub test means'),
    p('Replace the stub with the real function and repeat both room cases. A stub that only returned TRUE could never show whether the caller handles FALSE. The three complete versions below keep the same name, parameter and result type so the replacement does not silently change the caller interface.', 'Test both branches and the real replacement'),
  ],['A stub replaces a called module with controlled behaviour to exercise available code.','Test different controlled results, then replace the stub and check the real connected behaviour.']),
  'TEST-USERS':entry([
    table('Compare alpha and beta using the same booking form',['Feature','Alpha','Beta'],[
      ['Control and setting','The developer controls the environment and planned scenarios.','Selected external users try a near-complete version in realistic environments.'],
      ['People','Internal testers, sometimes with user representatives.','External users who report their own workflows and problems.'],
      ['Concrete case','Repeat Quantity 31 on a known test device and check the agreed refusal.','Try the booking workflow on users’ different devices and report input, device and observed behaviour.'],
      ['Useful evidence','Reproducible faults before wider exposure.','Problems arising from real devices, workflows and conditions.'],
    ]),
    p('Alpha is not defined by “developers are the only people allowed to test”, and beta is not simply a later run of the same laboratory script. Control, environment and purpose matter. Beta feedback can reveal unexpected conditions, but uneven participation does not guarantee every requirement was checked. Acceptance testing in the next unit asks a different question: whether agreed requirements have been met.', 'Use the purpose and setting in a scenario'),
  ],['Alpha uses a developer-controlled setting before wider release.','Beta uses selected external users and realistic environments to reveal further problems.']),
  'TEST-ACCEPTANCE':entry([
    p('Acceptance testing checks the delivered system against agreed user requirements so the customer can decide whether to accept it. The customer or suitable representatives need clear criteria, a known environment and independently expected results. “The users liked it” is useful feedback but does not establish that the required calculation or refusal rule works.', 'Connect customer decisions to criteria'),
    table('Acceptance evidence for the capacity rule',['Requirement','Concrete check','Expected evidence'],[
      ['Accept INTEGER requests from 1–30 inclusive','Enter 1, 15 and 30 as separate requests.','Each request is accepted.'],
      ['Reject other INTEGER requests','Enter 0 and 31 as separate requests.','Each request is refused with the agreed result.'],
      ['Explain a refusal, if this is in the agreed version','Submit an invalid request.','The specified guidance is shown; an unrelated beta suggestion is not automatically a requirement.'],
    ]),
    p('A test can be black-box because its inputs and results come from the specification, and also be an acceptance test because it supports the customer’s decision. White/black-box describe the basis of test design; integration describes connected components; alpha, beta and acceptance describe other aspects of purpose and setting. Do not force them into one mutually exclusive list.', 'Allow compatible testing descriptions'),
  ],['Acceptance checks agreed requirements for a customer decision.','Give explicit cases and expected evidence; broad user feedback alone is insufficient.']),
  STRATEGY:entry([
    p('A test strategy coordinates the overall approach: what is in scope, which methods and levels to use, who is responsible, what environment and resources are needed, and what evidence allows work to proceed. Its purpose is to prevent important work from being omitted or attempted before its dependencies are ready.', 'Make project-level decisions'),
    table('Strategy for the independent capacity-checking form',['Decision','Concrete choice'],[
      ['Scope','INTEGER Quantity, inclusive range 1–30 and the two decision outputs. Text parsing and cumulative seat availability are outside this small program.'],
      ['Methods','Review the rule and code; test both branches; choose cases from the specification; check connected input/decision/display behaviour.'],
      ['Sequence','Check components and their interfaces before presenting a stable integrated build for customer acceptance.'],
      ['People and resources','Developer records reproducible checks; staff representatives check agreed outcomes using a known build and separate requests.'],
      ['Completion','All required outcomes have evidence; blocking defects are corrected, retested and checked for relevant regressions.'],
    ]),
    p('A list saying “black-box, integration, acceptance” does not explain the strategy. State which risks each method addresses and how the results support the next activity. A plan of individual cases provides the repeatable details needed to carry out these decisions.', 'Link strategy and cases'),
  ],['A strategy coordinates scope, methods, sequence, responsibilities, resources and completion evidence.','Explain why those choices fit the project and its dependencies.']),
  'TEST-PLAN':entry([
    p('A test plan makes cases repeatable. Record an identifier, purpose, starting conditions, actual input values and an expected result derived before execution. A test record adds the version, observed result and pass/fail comparison, with a linked defect and retest when needed. Projects may organise plans and records differently; the evidence must still be recoverable.', 'Specify the case before recording the run'),
    table('Illustrative dry-run record: Quantity must be 1–30',['Case / purpose','Input','Expected','V1 traced output','Outcome'],[
      ['T01 ordinary request','15','Accepted','Accepted','Pass'],
      ['T02 maximum permitted','30','Accepted','Accepted','Pass'],
      ['T03 beyond maximum','31','Rejected','Accepted','Fail'],
    ]),
    p('These are illustrative manual-trace results for the supplied V1 program, which incorrectly uses <= 31. They are not a claim that a compiler executed Cambridge pseudocode. Each run starts afresh with one INTEGER input and no shared bookings. T03 exposes the mismatch; a record containing only “31: Fail” would omit the evidence needed to understand it.', 'Make the status and starting state explicit'),
    table('Preserve the failure and append a retest',['Record','Version / input','Expected','Traced result','Decision'],[
      ['T03 original','V1 / 31','Rejected','Accepted','Fail; upper limit is wrong.'],
      ['T03 retest','V2 uses <= 30 / 31','Rejected','Rejected','Pass for the correction.'],
      ['T02 regression','V2 / 30','Accepted','Accepted','Pass for the unchanged valid endpoint.'],
    ]),
    p('The plan is not yet a systematic selection of all useful cases. Lesson 090 adds lower-boundary and other discriminating cases to this same requirement. A small example in this lesson demonstrates complete records without pretending three rows establish comprehensive testing.', 'Continue the same plan in Lesson 090'),
  ],['Specify purpose, conditions, input and independently expected results before execution.','Record version, actual result and comparison; retain failure and retest evidence.']),
  'DATA-CATEGORIES':entry([
    p('Normal data are valid examples representative of ordinary use. Abnormal data violate the supplied type, format or range rule and require the specified rejection or error response. Valid extremes are the accepted endpoints. Boundary testing examines a limit and useful neighbouring positions; always state whether each chosen value is valid.', 'Use the rule to determine validity'),
    p('For integer marks from 0 to 100 inclusive, 55 is an ordinary valid value; 0 and 100 are accepted extremes; -1 and 101 are invalid neighbours. The syllabus groups extreme/boundary terminology: do not turn the labels into a rigid rule that an out-of-range neighbour cannot serve a boundary test. Its validity and testing purpose are different properties.', 'Separate a category from a test’s purpose'),
    p('A raw input field could receive the text fifty, which fails its integer-input rule. A variable already declared INTEGER cannot itself hold that string. Testing the raw interface’s parsing and testing the range of an already typed value are different tasks. State which interface is being tested before choosing an abnormal example.', 'Keep input type and range checks distinct'),
  ],['Choose normal, abnormal and extreme/boundary cases from the stated type, format and limits.','State expected behaviour for every case; boundary position does not by itself determine validity.']),
  'DATA-SELECT':entry([
    table('Complete the capacity plan from Lesson 089',['Input','Purpose','Expected','Potential fault exposed'],[
      ['15','Ordinary valid request','Accepted','Rejection of typical valid values.'],
      ['0 / 1 / 2','Just below / at / just inside lower limit','Rejected / Accepted / Accepted','Wrong lower bound, a strict > 1 check or accepting only endpoints.'],
      ['29 / 30 / 31','Just inside / at / just above upper limit','Accepted / Accepted / Rejected','Wrong upper bound, a strict < 30 check or accepting 31.'],
    ]),
    p('Select cases because they distinguish plausible mistakes. Values 1 and 30 distinguish inclusive limits from strict comparisons; 0 and 31 check rejection immediately outside; 2 and 29 show that near-endpoint interior values are not accidentally excluded. Some faults are exposed by more than one test, so justify the set rather than adding many interchangeable middle values.', 'Explain why each case is useful'),
    p('For a username, supply actual strings and count characters. abcde has length 5, abcdef has length 6, abcdefghijkl has length 12 and abcdefghijklm has length 13. A valid length does not establish that every character satisfies a separate character rule. Keep each restriction visible when choosing a test.', 'Use data of the requested type'),
    p('At one decimal place, -5.1, -5.0 and -4.9 are meaningful neighbouring inputs around -5.0. Without a stated input precision, there is no general “next real number” obtained by adding 1 or 0.1. Use the precision and comparison rules actually supplied. Expected results must include computed outputs when the requirement specifies a calculation, not only Accepted or Rejected.', 'Respect precision and output requirements'),
  ],['Use limits, nearby values and distinct invalid cases to challenge plausible faults.','Supply actual inputs, their expected outputs and a reason for choosing each case.']),
  'MAINTENANCE-NEED':entry([
    p('Acceptance checks agreed requirements at a particular time. Later use can expose undiscovered defects; operating systems, equipment and external rules can change; users can request improvements. Continuing maintenance keeps the delivered program useful under these changing circumstances.', 'Explain why delivery is not the end'),
    steps('Control a post-delivery booking change',[
      ['Understand the request','Record what changed, why, and which existing requirement is being corrected or replaced.'],
      ['Assess impact','Identify the range rule, input guidance, connected modules, documentation and tests that depend on the limit.'],
      ['Amend coherently','Update the approved rule and its implementation together; do not change an unrelated module just because it is nearby.'],
      ['Verify and record','Test the revised requirement and relevant unchanged behaviour; retain the version and reason for the change.'],
    ]),
    p('If a room capacity legitimately changes from 30 to 35, old input 31 is now expected to pass. Updating that expectation follows the revised requirement. It is different from rewriting an expected result merely to hide the old program’s defect. Regression checks protect behaviour that is still required, such as rejecting 0 and accepting ordinary valid requests.', 'Distinguish a changed requirement from a regression'),
  ],['Maintenance responds to faults, environmental changes and requested improvements after delivery.','Assess affected requirements, interfaces, documents and tests before changing the program.']),
  'MAINTENANCE-TYPES':entry([
    table('Classify the cause, not the edited file',['Change','Category','Reason'],[
      ['The existing 30-person rule incorrectly accepts 31.','Corrective','Restore behaviour that the original requirement already demanded.'],
      ['The operating system replaces the supported printer interface.','Adaptive','Respond to a changed operating environment.'],
      ['Users request an extra chart after the current reports meet their requirements.','Perfective','Improve delivered functionality.'],
    ]),
    p('The same calculation file can receive a corrective change when its tax rate was already wrong, or an adaptive change when a new external rule sets a different rate. Adding code does not automatically mean perfective maintenance. Similarly, making a search faster is perfective when it already meets its requirement, but repairing a violation of an existing response-time requirement can be corrective.', 'Use a paired counterexample'),
    p('A request can contain several causes. Split “fix duplicated charges, support a new driver and add a chart” into three changes rather than assigning one category to the whole batch. If the reason is absent, state what further information would distinguish a fault repair from an enhancement; do not invent a history.', 'Handle mixed or incomplete descriptions'),
  ],['Corrective repairs existing faults; adaptive responds to external change; perfective improves the delivered system.','Justify the category from the stated cause, including when similar edits have different reasons.']),
  'AMEND-ANALYSE':entry([
    p('Analyse the current program before designing the amendment. State its purpose, inputs, outputs, assumptions and changing data. Trace representative inputs and identify which statements initialise, update and report each result. This establishes the behaviour that a new request may need to preserve.', 'Establish the original contract'),
    p('The mark program reads four already validated INTEGER marks in 0–100 and counts those at least 50. PassCount starts at zero before the loop, increments inside the pass branch, and is output after all four inputs. For 49, 50, 69 and 70 the output is 3. Adding a merit count changes the reported information without replacing this pass rule.', 'Locate the proposed change in the old flow'),
    p('A useful impact list names the data declaration, initialisation, update condition and output affected by the extra count. It also names what stays: four input visits, the valid-mark assumption, the existing threshold and the position of the original output. The new requirement alone is not a description of the old program.', 'Make preservation explicit'),
  ],['Describe and trace the supplied program before amending it.','Identify affected data and operations, and state which existing behaviours must remain.']),
  'AMEND-CHANGE':entry([
    p('MeritCount needs an INTEGER declaration, zero initialisation before the loop, an update after each input and a final output. Every merit mark is also a pass, so Mark >= 70 must be tested independently of the pass selection. ELSE would make the categories exclusive and lose one required count.', 'Make every part of the amendment agree'),
    table('Trace 49, 50, 69, 70',['After Mark','PassCount','MeritCount','Reason'],[
      ['49','0','0','Neither threshold is met.'],['50','1','0','Pass only.'],['69','2','0','Pass only.'],['70','3','1','Both thresholds are met.'],
    ]),
    p('Moving MeritCount <- 0 inside the loop erases prior updates; placing its final OUTPUT inside the loop reports intermediate values. Keeping the original pass comparison while adding the new condition is a focused amendment. An unrelated rewrite creates more behaviour to inspect without helping this request.', 'Check placement as well as the condition'),
    p('The parcel exercise uses a different relationship: rejected is the complement of accepted, so ELSE is appropriate there. The rainfall exercise preserves a total while counting positive days. Select control flow from the category relationship, not by mechanically copying the two-IF pattern.', 'Transfer the reasoning to a different relationship'),
  ],['Update declaration, initialisation, processing and output coherently.','Overlapping categories need independent updates; complementary categories can use ELSE.']),
  'AMEND-VERIFY':entry([
    p('Derive both expected outputs before running or tracing the enhanced program. 49 and 50 challenge the old pass boundary; 69 and 70 challenge the new merit boundary. Four zeros must leave both counts at zero. Four merit marks must produce both counts as four, which exposes accidental exclusive branching.', 'Test old and new responsibilities'),
    p('Compare complete input sets, not only a single qualifying mark. Resetting a counter inside the loop may still give the right result when the only merit is the final value. The all-merit run reveals the lost earlier increments. State which potential mistake each dataset distinguishes.', 'Choose a case that would fail under the wrong amendment'),
    p('For the added merit feature, the original PassCount must remain identical for the same four marks. The next interface change deliberately allows a different pass rule, so preservation must be tested under the old threshold while changed-threshold expectations come from the new requirement. A changed output is not automatically a regression.', 'Carry verification into changed requirements'),
  ],['Check new boundaries and relevant old behaviour with independently expected results.','Use datasets that reveal misplaced initialisation, missing updates and incorrect exclusivity.']),
  'AMEND-INTERFACE':entry([
    p('The existing modular program uses IsPass(Mark), which compares against 50. The enhancement lets the user choose PassMark once before the four marks. PassMark and every Mark are already validated INTEGER values from 0 to 100. The function becomes IsPass(Mark, PassMark), still returning BOOLEAN; main still counts four marks and prints one final count.', 'Change the function contract deliberately'),
    table('Update all affected sites',['Site','Required amendment','Reason'],[
      ['Function header','Add INTEGER parameter PassMark.','The function needs the selected rule for this invocation.'],
      ['Function body','Compare Mark >= PassMark.','A hard-coded 50 would ignore the new argument.'],
      ['Main input','Declare PassMark and input it once before the loop.','All four marks use the same chosen threshold.'],
      ['Every call','Pass Mark followed by PassMark.','The caller must match the new ordered interface.'],
      ['Fixtures and documentation','Put the threshold before the four marks.','The input contract changed even though the final output is still one count.'],
    ]),
    table('Distinguish compatibility from changed behaviour',['Threshold / four marks','Expected count','Purpose'],[
      ['50 / 49,50,69,70','3','Reproduce the original fixed-50 result.'],
      ['60 / 49,50,69,70','2','Confirm the new parameter changes decisions.'],
      ['60 / 59,60,61,0','2','Test just below, exactly at and just above the new boundary.'],
      ['0 / 0,0,0,0','4','Check the permitted lowest threshold, including equality.'],
      ['100 / 99,100,0,50','1','Check the highest permitted threshold.'],
    ]),
    p('If main reads PassMark inside the loop, it changes the required input sequence and can apply different thresholds to different marks. If a call is left with one argument, it no longer matches the header. If the arguments are reversed, their types still match but the comparison answers the wrong question. These are interface faults that adding a counter alone does not exercise.', 'Explain why a coordinated change is necessary'),
  ],['Update the header, implementation, every call, input contract and tests together.','Use the original parameter value for compatibility and changed values for the new requirement.']),
});

function newUnit(source,key,heading,objectiveIds,visual,prompt,answer,misconception) {
  return {...source,unitKey:`S12-${key}`,heading,objectiveIds,syllabusId:objectiveIds[0].replace(/\.A\d+$/,''),
    explanation:[],materials:[visual],checkpoint:{prompt,answer},misconceptions:[misconception]};
}

const examples={
  'LIFECYCLE-STAGES':[example('roomRule','Implement the agreed capacity rule','Each independent request supplies one INTEGER Quantity. Accept 1–30 inclusive; reject all other integers. No text parsing or cumulative bookings are included.','1, 15 and 30 are accepted in separate runs. 0 and 31 are rejected.')],
  'STRUCTURE-CONTROL':[example('batchOrders','Implement the complete batch structure chart','Input non-negative INTEGER OrderCount, then that many triples: positive INTEGER Quantity, non-negative REAL UnitPrice and BOOLEAN Member. Members pay 90%; output one amount per order. Zero orders outputs No orders.','Input 2, 3, 2.50, FALSE, 2, 5.00, TRUE outputs 7.50 then 9.00. Input 0 alone outputs No orders and reads no order. One member item at zero price costs zero.')],
  'ERROR-TYPES':[example('syntaxFault','Inspect an incomplete IF construct','This intentionally malformed program is meant to display Pass for integer marks at least 50 and Fail otherwise. Locate the missing closure before attempting to trace it as a complete program.','There is no valid complete-program result to claim. The IF remains open at the end of the supplied text.')],
  'ERROR-CORRECT':[example('syntaxFixed','Close the IF at the correct boundary','Keep the same fixed-50 rule. ENDIF follows the two alternatives. Inputs are INTEGER marks from 0 to 100.','49 outputs Fail; 50 outputs Pass. The structure now has a matching closure.')],
  'TEST-STUB':[
    example('stubTrue','Complete caller with the TRUE stub','Input INTEGER RoomID, restricted to 101 or 102. Temporarily return TRUE for either argument to exercise the caller’s positive path.','Either ID outputs Available; actual room availability is not verified.'),
    example('stubFalse','Complete caller with the FALSE stub','Keep the same interface but return FALSE for either argument.','Either ID outputs Unavailable, exercising the other caller branch.'),
    example('availabilityReal','Replace the stub with the real fixture rule','For this complete small fixture, room 101 is available and 102 is unavailable. Inputs are restricted to these two INTEGER IDs.','101 outputs Available; 102 outputs Unavailable. Test both after replacement.'),
  ],
  'TEST-PLAN':[
    example('roomFault','Trace V1 to produce the failure record','The requirement is INTEGER Quantity in 1–30 inclusive. This deliberately faulty version uses 31 as the upper limit.','15 and 30 give the required Accepted result. 31 incorrectly produces Accepted instead of Rejected.'),
    example('roomRule','Trace V2 after correcting the upper limit','Use the unchanged 1–30 requirement and the same input conditions.','31 now gives Rejected; 30 remains Accepted. Retain the original failure record and append these new trace results.'),
  ],
  'AMEND-INTERFACE':[
    example('thresholdOriginal','Analyse the original modular pass counter','Input four validated INTEGER marks from 0 to 100. IsPass uses the fixed threshold 50.','49, 50, 69, 70 produces 3. Trace which data cross the one-parameter interface.'),
    example('thresholdEnhanced','Implement the new two-parameter interface','Read INTEGER PassMark in 0–100 once, followed by four validated marks in 0–100. Count marks >= PassMark and output one final count.','50, 49, 50, 69, 70 produces 3; 60, 49, 50, 69, 70 produces 2; 60, 59, 60, 61, 0 produces 2.'),
  ],
};

export function enhanceSection12Lesson(lesson) {
  if(lesson.section!==12)return lesson;
  const units=lesson.units.flatMap(unit=>{
    const key=unit.unitKey.replace('S12-','');
    if(key==='STRUCTURE-CODE')return [unit,newUnit(unit,'STRUCTURE-CONTROL','Represent repeated and conditional module calls',ids(2,1,3,4),visuals.batch,
      'Which calculation functions execute for one non-member order?', 'CalculateCost calls StandardCost; MemberCost is not called for that order.', 'A conditional call does not mean both alternative functions execute.')];
    if(key==='STATES-TRACE')return [unit,newUnit(unit,'STATES-GUARDS','Trace transitions with conditions',ids(3,1),visuals.upload,
      'From Uploading, which state follows complete when Valid is FALSE?', 'Error. Select the outgoing complete transition whose guard is satisfied.', 'Matching an event name is insufficient when the transition also has a condition.')];
    if(key==='TEST-INTEGRATION')return [
      {...unit,materials:unit.materials.filter(m=>!m.title?.startsWith('Booking caller'))},
      newUnit(unit,'TEST-STUB','Use a complete stub, then test its replacement',ids(5,5,9),visuals.stub,
        'Does a TRUE stub returning Available for room 102 prove an integration defect?', 'No. That is the controlled stub behaviour. It does not establish real room availability; replace it and check the actual fixture.', 'A stub test cannot verify an implementation that is absent.'),
    ];
    if(key==='TEST-USERS')return [
      {...unit,heading:'Alpha and beta in different environments',objectiveIds:ids(5,6,7,9),materials:[]},
      newUnit(unit,'TEST-ACCEPTANCE','Check acceptance against agreed requirements',ids(5,8,9),materialTable('Requirement-based customer decision',['Requirement','Evidence'],[['Accept 1–30 inclusive','Known endpoint and ordinary cases with the agreed outputs.'],['Reject other integers','Known invalid cases with the agreed rejection.']]),
        'Can an acceptance test also be black-box?', 'Yes. Acceptance is its customer-decision purpose; black-box describes selection from the specification.', 'Customer approval needs evidence against requirements, not only favourable comments.'),
    ];
    if(key==='AMEND-VERIFY')return [unit,newUnit(unit,'AMEND-INTERFACE','Change a function interface and its callers',ids(9,1),visuals.interfaces,
      'Why must the first input in the revised fixture be the threshold?', 'The revised program reads PassMark before the four marks; leaving it out shifts every later input into the wrong role.', 'Matching data types alone does not make reversed arguments correct.')];
    return [unit];
  }).map(unit=>{
    const key=unit.unitKey.replace('S12-',''),spec=teaching[key];
    if(!spec)throw new Error(`Missing Section 12 detailed teaching: ${key}`);
    let materials=[...(unit.materials??[])];
    if(['STRATEGY','TEST-PLAN','TEST-USERS','TEST-ACCEPTANCE'].includes(key))materials=materials.filter(m=>m.type!=='table');
    let blocks=spec.blocks;
    if(['STRATEGY','TEST-USERS','TEST-ACCEPTANCE'].includes(key)) {
      const overview=spec.blocks.find(block=>block.type==='table');
      materials.unshift(materialTable(overview.title,overview.headers,overview.rows));
      blocks=spec.blocks.filter(block=>block!==overview);
    }
    if(key==='TEST-PLAN')materials.unshift({type:'flow',title:'From a requirement to repeatable evidence',steps:[['Specify','State the rule, initial conditions and exact input.'],['Predict','Derive the required result before observing the program.'],['Record','Identify the version, actual result and comparison.'],['Follow up','Correct faults and retain the original and retest records.']]});
    if(key==='RAD')materials=[visuals.models];
    if(key==='TEST-PLAN')materials=materials.filter(m=>m.type!=='worked-example');
    const additions=examples[key]??[];
    materials.push(...additions);
    if(key==='STATES-GUARDS')materials.push(materialTable('All specified upload transitions',['State','Event / condition','Next state'],uploadStates12.transitions.map(t=>[t.from,`${t.event}${t.condition?` [${t.condition}]`:''}`,t.to])));
    const extensions=[];
    if(key==='TEST-INTEGRATION')extensions.push(extension('isolate a module before integration','A unit test checks one module in isolation against its interface contract. This can make a fault easier to locate before modules are combined. The contrast helps explain integration; no test framework or mocking library is required.'));
    if(key==='TEST-PLAN')extensions.push(extension('identify the version under test','A short version label such as V1 or V2 connects a result to the statements actually examined. Keep the input and expected result beside that label so another tester can repeat it. A full version-control workflow is outside this lesson.'));
    if(key==='AMEND-INTERFACE')extensions.push(extension('compare the existing Java practical lab','The linked Testing practical lab gives a runnable Java version of the pass/merit amendment. Use its starter, separate solution and expected datasets to record actual executions. The core examples on this page use Cambridge pseudocode; do not mix the two syntaxes.'));
    const primaryExample=materials.find(m=>m.type==='worked-example');
    return {...unit,teachingBlocks:blocks,explanation:spec.essentials,
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds,preserve:m!==primaryExample&&m.type!=='flow'})),
      ...(extensions.length?{extensions}:{}),
    };
  });
  return {...lesson,units,teachingCheckpoints:[
    'Read the stated inputs and required outputs before tracing any program.',
    'Use the knowledge-point checks, then solve the independent practice and exam tasks before opening answers.',
    'Keep model choices, expected results and correction evidence tied to the supplied requirements.',
  ]};
}
