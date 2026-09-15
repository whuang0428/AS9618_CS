import { codeFor12 } from './course-v3-section12-programs.mjs';
import { section12TeachingVisuals as visuals } from './course-v3-section12-teaching-diagrams.mjs';
const ids=(r,...ns)=>ns.map(n=>`S12.${String(r).padStart(2,'0')}.A${String(n).padStart(2,'0')}`);
const q=(lesson,n,prompt,objectiveIds,answerPoints,commonError,extra={})=>({id:`S12-L${String(lesson).padStart(2,'0')}-Q${n}`,prompt,objectiveIds,answerPoints,commonError,marks:answerPoints.length,type:'Application',authored:true,...extra});
const exam=(lesson,n,...args)=>({...q(lesson,n,...args),id:`S12-L${String(lesson).padStart(2,'0')}-EXAM-${n}`});
const supplied=key=>({code:codeFor12(key),programKey:key,codeLabel:'Supplied Cambridge pseudocode',codeCaption:'Use the complete program and the stated input assumptions.'});
const solution=key=>({answerCode:codeFor12(key),answerProgramKey:key,answerCodeLabel:'One complete Cambridge pseudocode solution',answerLanguage:'text'});

const practice={
  1:[q(1,5,'A booking form has a fixed 1–30 range rule but uncertain screen messages. Staff can review a prototype daily. Explain how RAD could obtain useful feedback, and how your choice would change if staff could review only at final delivery.',ids(1,3,4,5,6),[
    'A rapid prototype makes the uncertain messages available for staff to evaluate early.',
    'Short time boxes and daily decisions allow the messages to be revised while preserving the agreed range rule.',
    'Without timely staff access, the proposed RAD feedback cycle loses a necessary condition; another model must be justified using the remaining requirements and approval constraints.',
  ],'Do not claim that a short deadline alone guarantees RAD suitability.')],
  2:[q(2,5,'Draw a structure chart from this specification: ProcessBatch reads non-negative OrderCount and calls ProcessOrder that many times, or outputs No orders for zero. ProcessOrder calls ReadOrder to obtain Quantity, UnitPrice and Member, CalculateCost to return Cost, and DisplayCost to display it. CalculateCost calls MemberCost when Member is TRUE, otherwise StandardCost; both receive Quantity and UnitPrice and return the price. Show repetition, conditional calls and labelled data transfers.',ids(2,1,3),[
    'ProcessBatch controls repeated ProcessOrder calls, with no order call for zero.',
    'ProcessOrder is the parent of ReadOrder, CalculateCost and DisplayCost.',
    'ReadOrder supplies Quantity, UnitPrice and Member to its caller.',
    'CalculateCost receives those values and returns Cost, which the parent supplies to DisplayCost.',
    'The Member condition selects exactly one lower-level function.',
    'Both price-function interfaces receive Quantity and UnitPrice and return a REAL result.',
  ],'A hierarchy line is a call relationship, not an assertion that every child always executes.',{answerDiagram:visuals.batch.asset,answerDiagramAlt:visuals.batch.alt}),
  q(2,6,'Using the supplied complete batch program, trace inputs 2, 1, 20.00, TRUE, 4, 2.00, FALSE. State both outputs, name the selected lower-level calculation for each order, and explain the input consumed when OrderCount is zero.',ids(2,1,4),[
    'The first order uses MemberCost and outputs 18.00.',
    'The second uses StandardCost and outputs 8.00.',
    'For OrderCount zero, only that count is input; the program outputs No orders and never calls ProcessOrder.',
  ],'A zero-order run must not attempt to read a quantity, price or member flag.',supplied('batchOrders'))],
  3:[q(3,4,'The supplied upload diagram starts in Ready. State every state after start, complete [Valid = FALSE], retry, progress, complete [Valid = TRUE]. Explain why the two complete events have different outcomes and whether a new start is possible at the end.',ids(3,1),[
    'The successive states are Uploading, Error, Uploading, Uploading and Ready.',
    'Both completion events start in Uploading, but their different Valid guards select different transitions.',
    'Ready has a start transition back to Uploading, so it is not a terminal state.',
  ],'Do not choose a transition by event name while ignoring its condition.',{diagram:visuals.upload.asset,diagramAlt:visuals.upload.alt,diagramLabel:'Upload state-transition diagram'})],
  4:[q(4,5,'Locate and identify the fault in this supplied program, state the exact correction, and explain what can and cannot be concluded when the construct is repaired. The requirement is Pass for an INTEGER mark of at least 50, otherwise Fail.',ids(4,2,5,6),[
    'The IF is missing its closing ENDIF, so this is a syntax error.',
    'Insert ENDIF after the ELSE branch’s OUTPUT "Fail".',
    'The closure repairs the construct, but behaviour still needs checking against the rule, for example 49 → Fail and 50 → Pass.',
  ],'A diagnostic at the end of the text need not mean the final OUTPUT is itself malformed.',{...supplied('syntaxFault'),...solution('syntaxFixed')})],
  5:[q(5,6,'The TRUE stub is used with RoomID 102, although the real fixture says room 102 is unavailable. State the expected stub-based output and explain what this does and does not verify. Then specify the replacement tests for the real function, whose only IDs are 101 (available) and 102 (unavailable).',ids(5,5,9),[
    'The TRUE stub makes the caller output Available for 102.',
    'This verifies the controlled TRUE-path behaviour, not the real lookup for room 102.',
    'After replacement, test 101 with expected Available and 102 with expected Unavailable.',
  ],'Do not use the real lookup expectation to misclassify a deliberate fixed stub result.',supplied('stubTrue')),
  q(5,7,'Suggest a suitable method and a concrete case for each purpose: check both branches of IF Member; discover booking-form problems on customers’ own devices; decide whether the customer’s agreed 1–30 capacity rule is met.',ids(5,3,7,8,9),[
    'White-box design selects Member TRUE and FALSE to exercise the two internal branches.',
    'Beta testing lets selected external users attempt a booking on their own device and report the input, environment and result.',
    'Acceptance testing checks agreed outcomes, such as Quantity 30 accepted and 31 rejected, for the customer decision.',
  ],'A method name without a case does not describe the evidence to obtain.')],
  6:[q(6,4,'Develop a small test plan for independent INTEGER requests accepted exactly from 1 to 30. Include an ordinary valid request, both valid endpoints and values just outside them. Give identifiers, purpose, starting conditions, inputs and expected results. State which fields must be completed after each run and two strategy decisions needed before running the cases.',ids(6,1),[
    'Give distinct identifiers and purposes, with each request starting a fresh run and no retained booking state.',
    'An ordinary case such as 15 expects Accepted.',
    '1 and 30 each expect Accepted.',
    '0 and 31 each expect Rejected.',
    'Record the tested version, actual output and pass/fail comparison; link a defect and retest where necessary.',
    'Specify who runs or reviews the cases and which methods, environment or completion criteria organise the work.',
  ],'Do not fill an actual-output column by copying the expected result before execution.')],
  7:[q(7,5,'For the same inclusive 1–30 rule, a tester proposes only 10, 15 and 20. Explain the weakness, select data that expose erroneous > 1 and < 30 comparisons, and give a just-inside value that checks whether only endpoints are accepted.',ids(7,1,2),[
    'The three interior values do not distinguish correct inclusive comparisons from either strict-limit fault.',
    '1 and 30 must be accepted; they expose > 1 and < 30 respectively.',
    '2 or 29 must also be accepted and challenges an implementation that accepts only the endpoints.',
  ],'Select a case because it makes a plausible wrong implementation behave differently.')],
  8:[q(8,4,'A booking program correctly enforces a 30-person limit. The building is modified and its approved capacity becomes 35. Describe the impact analysis and tests needed to implement the changed requirement. Explain why changing the expected result for Quantity 31 is justified here but was not justified when correcting the original <= 31 defect.',ids(8,1,3),[
    'Identify the range comparison, displayed guidance, related interfaces, documentation and test data that depend on the capacity.',
    'Use the new approved range for tests, including 35 accepted and 36 rejected, and keep relevant checks such as 0 rejected.',
    '31 is now valid because the requirement changed; under the old 30-person rule, altering its expected rejection would only hide a defect.',
  ],'A regression check protects still-required behaviour; it does not forbid an approved requirement change.')],
  9:[q(9,5,'Analyse the supplied fixed-50 modular program and write a complete amendment that inputs one INTEGER PassMark in 0–100 before its four validated marks, counts Mark >= PassMark and outputs the count. Keep the four-mark traversal and give the result for threshold 60 with marks 59, 60, 61, 0.',ids(9,1),[
    'The old IsPass accepts one mark, compares against 50 and supplies a BOOLEAN used by main’s counter.',
    'Add a typed PassMark parameter and compare Mark >= PassMark in the function.',
    'Declare and input PassMark once before the existing four-input loop.',
    'Update every IsPass call to supply Mark followed by PassMark.',
    'Retain the initialisation, four-mark traversal, conditional increment and final output; the specified result is 2.',
  ],'Reading PassMark inside the loop changes the input contract.',{...supplied('thresholdOriginal'),...solution('thresholdEnhanced')}),
  q(9,6,'In the supplied amended program, explain the effect of replacing IsPass(Mark, PassMark) with IsPass(PassMark, Mark), using threshold 60 and marks 59, 60, 61, 0. Give a compatibility test for the unchanged threshold 50 and its expected result.',ids(9,1),[
    'The reversed call tests 60 >= each mark, incorrectly counting 59, 60 and 0, so the output is 3 instead of 2.',
    'The parameter types still match, but their meanings and order are wrong.',
    'Threshold 50 with marks 49,50,69,70 should give 3, matching the original program for those four marks.',
  ],'Use both an old-rule compatibility case and a changed-threshold case.',supplied('thresholdEnhanced'))],
};

const exams={
  2:[exam(2,4,'A parent Report calls ReadRecord, CalculateResult and ShowResult. CalculateResult chooses FastResult when FastMode is TRUE and FullResult otherwise; both return a REAL result using the supplied record value. A programmer calls both functions and displays both results for every record. Explain the mismatch with the design, describe the corrected call behaviour and identify data that distinguish the paths.',ids(2,1,3,4),[
    'The condition specifies alternative lower-level calls, not two unconditional calls.',
    'For each record CalculateResult selects one function, returns its value, and Report supplies that one value to ShowResult.',
    'Use one record with FastMode TRUE and another with FALSE, with independently expected results for the selected functions.',
  ],'Do not treat the existence of two child boxes as proof that both execute on every invocation.')],
  5:[exam(5,4,'A caller outputs Accepted if CheckCode returns TRUE and Rejected otherwise. CheckCode takes one STRING argument; the real rule accepts only "AB12". Two stubs return fixed TRUE and fixed FALSE respectively. Give one test for each stub, state its expected caller output and limitation, then give tests for the real replacement.',ids(5,5,9),[
    'With the TRUE stub, any supplied string such as "ZZ99" must lead to Accepted.',
    'With the FALSE stub, any string such as "AB12" must lead to Rejected.',
    'These results exercise the caller branches but do not establish that the real code rule is implemented.',
    'After replacement, "AB12" must give Accepted and a different code such as "ZZ99" must give Rejected.',
  ],'A controlled stub’s result need not match the real validation result for that argument.')],
  6:[exam(6,4,'A parcel form accepts REAL masses from 2.0 to 5.0 kg inclusive, entered to one decimal place. Design three repeatable cases around the upper limit, with expected outcomes. A build accepts 5.1. Describe the record and subsequent checks needed after correction.',ids(6,1),[
    'State fresh independent submissions and case purposes; use 4.9 with expected Accepted.',
    'Use 5.0 with expected Accepted.',
    'Use 5.1 with expected Rejected.',
    'Record the tested build, actual acceptance of 5.1, failed comparison and associated defect.',
    'Retest 5.1 on the corrected build and check still-valid cases such as 4.9 and 5.0, retaining the original failure record.',
  ],'The specified precision determines the adjacent values; do not change expected rejection to match the faulty build.')],
  9:[exam(9,4,'The supplied program is to accept a configurable pass threshold, read once before four valid marks. A proposed change adds a PassMark parameter to IsPass but leaves its body comparing Mark >= 50 and leaves main’s call as IsPass(Mark). Identify the two distinct defects, state the other input change required, and give a threshold/data set that distinguishes a correct amendment from a still-hard-coded comparison.',ids(9,1),[
    'The one-argument call no longer matches the revised two-parameter interface.',
    'The function body ignores the new threshold and must compare Mark >= PassMark.',
    'Main must declare and read PassMark once before the four marks, then supply it at each call.',
    'For threshold 60 and marks 50,50,60,60, the correct count is 2 while a fixed-50 comparison gives 4.',
  ],'A new parameter name alone does not implement a changed rule.',supplied('thresholdOriginal'))],
};

export function enhanceSection12Questions(lesson) {
  if(lesson.section!==12)return lesson;
  const n=lesson.originalLesson-80;
  return {...lesson,practice:[...lesson.practice,...(practice[n]??[])],authoredExamQuestions:[...lesson.authoredExamQuestions,...(exams[n]??[])]};
}
