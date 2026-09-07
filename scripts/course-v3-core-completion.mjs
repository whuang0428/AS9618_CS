import { coreParagraph as p, coreList as list, coreSteps as steps, coreTable as table } from './course-v3-core-blocks.mjs';

export const completionCore = {
  'S1.07-CHARACTER-SETS': [
    p('A character set defines its characters and assigns each a numeric code. That code identifies the character independently of the font used to draw it.', 'Code and appearance'),
    steps('From character to stored bits', [['Look up the code','Use the agreed character set or encoding. ASCII uppercase A has code 65.'],['Represent the number','65 is 1000001 in 7 bits, or 01000001 with an 8-bit storage width.'],['Interpret consistently','Software must use the agreed encoding to recover the intended character from the bits.']]),
  ],
  Microwaves: [
    p('Microwaves are high-frequency electromagnetic waves. A narrow directional beam can provide a high-bandwidth point-to-point link between fixed antennas without laying cable between sites.', 'A directional wireless link'),
    list('What the path requires', [['Alignment','Point the transmitting and receiving antennas accurately towards one another.'],['Line of sight','Buildings, hills and Earth’s curvature can obstruct the path. Tall masts or relay stations may be needed.'],['Link conditions','Interference, antenna movement and bad weather can weaken the signal.']]),
    p('This can suit separate buildings or difficult ground where cable installation would be expensive.', 'Match the medium to the site'),
  ],
  Satellites: [
    steps('Follow the relayed signal', [['Uplink','A ground station sends microwaves to the satellite.'],['Downlink','The satellite receives and relays the signal to receiving dishes.']]),
    list('Coverage and constraints', [['Reach','Broad coverage can serve ships, aircraft and remote places where cable is difficult or impossible; one transmission can reach a wide area.'],['Delay','The long path causes propagation delay, affecting calls, video conferencing and real-time control. Delay depends on the orbit and path.'],['Conditions and cost','Bad weather can weaken the signal; equipment and services can be expensive.']]),
  ],
  'S3.08-FEEDBACK': [
    p('Feedback is a new sensor reading after an actuator has changed the physical condition. It measures the actual effect instead of assuming that the output achieved its goal.', 'Measure the outcome'),
    steps('Close the control loop', [['Compare','Compare the new reading with the target.'],['Adjust','Continue, adjust or stop the actuator as required.'],['Measure again','Obtain another reading to detect disturbances or ineffective actions. Without this return path, the condition can remain away from the target without automatic correction.']]),
  ],
  's4-components': [
    list('Processing and coordination', [['ALU','Performs arithmetic and logical operations.'],['CU','Decodes the instruction in CIR and signals the transfers and operations required.'],['System clock','Generates regular pulses to synchronise processor operations; one instruction may need several cycles.']]),
    p('The immediate access store (IAS) is main memory holding instructions and data available during execution. It is separate from long-term secondary storage. In the example, the CU coordinates reading 11, the ALU adds it to 6, and ACC retains 17.', 'Where the instruction and operands come from'),
  ],
  's4-execute': [
    list('The decoded instruction determines the work', [['Load or store','A load reads a value; a store writes a value.'],['Arithmetic','The CU coordinates the necessary transfers and ALU calculation.'],['Jump','A taken jump replaces PC, so the next instruction need not be adjacent.']]),
    p('The example has already fetched LDD 700 into CIR. Execution reads the operand 45 into MDR and copies it to ACC; it does not increment PC again. At the end of the cycle, check pending enabled interrupts before normal instruction processing continues.', 'Distinguish operand access from instruction fetch'),
  ],
  's4-data-movement': [
    p('Immediate #15, B00001111 and &0F supply the same value in denary, binary and hexadecimal forms. A bare address instead directs an instruction to memory.', 'Read the operand notation'),
    list('Copy in the specified direction', [['LDX','Add IX to the address operand, then read the contents at that effective address.'],['MOV IX','Copy ACC into IX, not IX into ACC.'],['STO','Copy ACC into memory while leaving ACC unchanged.']]),
    p('A copy does not consume its source. LDX 400 with IX = 2 reads location 402; STO 450 then saves a copy at 450 while the original value remains at 402.', 'Preserve the source'),
  ],
  's4-operations': [
    list('Change values in the intended register', [['ADD / SUB','Combine ACC with an immediate operand or directly addressed contents; retain the result in ACC.'],['INC / DEC','Increase or decrease the named ACC or IX register by one.']]),
    list('Compare, then branch', [['CMP / CMI','CMP compares with an immediate or direct operand; CMI uses an indirect operand. Neither replaces ACC.'],['JPE / JPN','JPE jumps when the comparison was True (equal); JPN jumps when it was False (not equal). JPN does not mean negative.']]),
    list('Input, output and finish', [['IN','Read one character and put its ASCII value in ACC.'],['OUT','Output the character represented by ACC: 65 produces A, not the printed digits 65.'],['END','Return control to the operating system.']]),
  ],
  's4-device-mask': [
    p('A device byte can encode several states and controls. Number its bits explicitly: here bit 7 is leftmost and bit 0 rightmost.', 'Know which bit represents the device function'),
    steps('Test ready, then enable the motor', [['Test a copy','AND the copy with 00010000. Nonzero means ready bit 4 was set; other positions in the copy are cleared.'],['Reload','Restore the original device byte before an unrelated update.'],['Set and store','OR with 00000100 sets motor bit 2 while preserving other bits; write the updated byte back to the device register.']]),
    p('AND with a zero in the selected position clears it. XOR with a one toggles it. Match the operation to the requested effect and preserve unrelated controls.', 'Other mask effects'),
  ],
  'S5.01-NEED': [
    p('An operating system is system software that manages resources and supplies services to applications. Its graphical or command-line user interface lets users request operations.', 'The OS provides shared services'),
    steps('A Save request crosses layers', [['Application','The editor requests a named file operation; it still owns the task-specific editing behaviour.'],['Operating system','Check whether the operation is permitted and coordinate shared storage access.'],['Device services','A driver and hardware perform the transfer, so every application need not implement its own storage controller.']]),
  ],
  'S5.01-HARDWARE': [
    p('Hardware management coordinates input, output and peripherals. Device drivers translate general OS requests into commands for particular devices, giving applications a consistent interface.', 'Coordinate device communication'),
    list('Separate the supporting roles', [['Queue','Keep requests waiting until the device is available.'],['Buffer','Hold data temporarily during transfers between components operating at different rates.'],['Interrupt','Notify the OS of completion or a need for attention so it can arrange a response.']]),
  ],
  'S5.02-BACKUP': [
    steps('Prepare for recovery', [['Copy','Create recoverable copies of files or system data, using a separate recovery destination.'],['Schedule and retain','Select changed files and keep suitable versions so an earlier state can be restored.'],['Restore and check','Test that the saved copy and recovery procedure actually work after loss, corruption or failure.']]),
    p('A copy on the same failing disk does not protect against that disk’s failure. Only changes present in the chosen backup can be recovered from it; a completed copy job alone is not proof of successful restoration.', 'Know what the copy protects'),
  ],
  'S5.03-REUSE': [
    p('A program library is a collection of routines or modules other programs can use, such as mathematical functions or image-reading operations.', 'Reuse an existing implementation'),
    list('Check the interface before calling', [['Inputs','Use the specified name, argument order, data types and conditions.'],['Result','Know what is returned and use it correctly in the surrounding program.'],['Integration','Test the caller: a correct routine can still be called with inappropriate data.']]),
    p('Suitable documented, tested libraries reduce implementation and testing effort and provide specialist operations. Those benefits depend on the chosen library; they are not guaranteed for every downloaded file.', 'Benefits depend on suitability'),
  ],
  'S6-ACCOUNTS': [
    list('Identity and permitted actions', [['Account','Associates a distinct identity with permissions and an activity record. Separate accounts help attribute actions.'],['Password','Secret knowledge used to authenticate that claimed identity against the stored verifier.']]),
    p('A successful login does not grant every permission. Hard-to-guess passwords and limits on repeated attempts reduce guessing, but a disclosed password can still be misused.', 'Authenticate, then authorise'),
  ],
  'S6-VIRUS': [
    steps('Trace host-based replication', [['Attach','Virus code attaches to or modifies a host file or program.'],['Execute','Running the infected host can run the virus.'],['Replicate','The virus can infect further files; a payload may corrupt, delete or disrupt data.']]),
    p('Shared files, networks and downloaded attachments can carry infected hosts to another computer. Avoid executing untrusted files and maintain detection software to reduce the risk.', 'Control the route into execution'),
  ],
  'S9-DECOMPOSITION-MODULES': [
    list('Define each module’s contract', [['Responsibility','Assign one sub-problem to the module.'],['Inputs','State which values the module needs.'],['Result or effect','A function returns a value for an expression; a procedure performs a task when called.']]),
    p('CalculateCharge can receive quantity and unit price and return an amount; DisplayReceipt receives that amount and prints it. Keeping the calculation in one module avoids different charging rules emerging in the display. Choose these interfaces before detailed subroutine syntax.', 'Connect modules without repeating their rules'),
  ],
  'S9-IPO-CONTRACT': [
    steps('Work backwards from the required result', [['Output','Identify what the algorithm must communicate.'],['Process','State the transformations and decisions that produce it, including compatible measurement units.'],['Input','Identify which values must be obtained and when. A fixed supplied constant need not be input each run.']]),
    p('An IPO table is a design aid. Translate its rules into explicit assignments or control structures when pseudocode is requested. Here the fixed postage 3.50 joins ItemPrice × Quantity to produce Total.', 'Turn the design into executable steps'),
  ],
  'S9-INTEGRATED-MODULES': [
    list('Rules for this ticket purchase', [['Quantity','Integer Quantity must be at least 1 and no greater than non-negative PlacesLeft.'],['Charge','Each identical ticket costs 25.00. Student TRUE gives 10% off the whole subtotal.'],['Payment','After showing Total, confirm, give change and reduce PlacesLeft only if Paid >= Total.']]),
    p('Assume correctly typed inputs and non-negative Paid. Decompose the work into checking quantity, calculating charge and completing payment. The charge function returns the amount; the completion procedure reports the result and updates availability only after sufficient payment. The detailed algorithm expands these responsibilities inline.', 'Agree responsibilities and effects'),
  ],
  'S10-ARRAY-TERMS': [
    list('Distinguish the parts of an array access', [['Array identifier','Names a collection of elements with the same declared data type.'],['Index','Selects a particular element: in Ages[4], the index is 4.'],['Value','The selected element might store 17. That value is independent of its index.']]),
    p('A 1D array uses one index; a 2D array uses two. Every position has the declared element type and must receive a value before the algorithm relies on it. Declared bounds determine valid indices, even when the lower bound is 3 rather than 0 or 1.', 'Dimensions, bounds and initialisation'),
  ],
  'S10-ONE-DIMENSION-CODE': [
    steps('Store and total four marks', [['Before traversal','Initialise Total once to 0.'],['For each index 1 to 4','INPUT Marks[Index], then add that same element to Total. FOR uses inclusive bounds and closes with NEXT Index; this form has no DO keyword.'],['After traversal','Output Total once, then output Marks[3] to show that the third stored mark remains available.']]),
    p('For inputs 6, 9, 4, 7, the totals progress through 6, 15, 19, 26. Moving Total <- 0 inside the loop would discard earlier contributions.', 'Preserve the accumulated state'),
  ],
  'S10-LINEAR-METHOD': [
    steps('Find the first match', [['Initialise','Index starts at the lower bound and Position at 0. Zero means not found because it is outside the 1-based bounds.'],['Guard','Continue only while Index is valid and Position is still 0.'],['Compare','On a mismatch advance Index; on a match store Index in Position. The next test then stops the loop.']]),
    p('The array access is inside the guarded body. An absent target checks indices 1 through 5 and stops before Values[6]. For [9, 4, 6, 4, 2] and target 4, report index 2; later equal values are not visited.', 'Return a position without reading past the array'),
  ],
  'S10-IMPLEMENT-FREE-LIST': [
    p('A fixed array can link unused nodes into a free list with its own Free head. Active and free chains must be disjoint. Free = 0 means no unused slot remains.', 'Track available storage separately'),
    steps('Allocate a free node', [['Take the head','Save the node identified by Free.'],['Advance Free','Read its old free link before reusing that link.'],['Join the active chain','Write the new active links while preserving access to the existing successor.']]),
    steps('Release a deleted node', [['Unlink it','Remove it from the active chain first.'],['Join the free chain','Point it to the old Free head, then make it the new Free head. Surviving node data need not move.']]),
  ],
  'S11-NUMERIC-FUNCTIONS': [
    p('A built-in function is supplied by the language; a library routine offers reusable operations through an interface. Check argument order, accepted types and the returned value before using the call in an expression.', 'Read the function contract'),
    steps('Produce one integer die result', [['RAND(6)','Returns a REAL from 0 inclusive to 6 exclusive.'],['INT','Taking the integer part gives 0, 1, 2, 3, 4 or 5.'],['Add 1','INT(RAND(6)) + 1 gives an INTEGER from 1 to 6 inclusive.']]),
  ],
  'S11-LOOP-BOUNDED': [
    steps('Stop on success or after three attempts', [['Initialise','Password is empty and Attempts is 0 before WHILE.'],['Continue','The password must be wrong AND Attempts < 3.'],['Read and count','Input Password and increment Attempts on every input, including a successful one.'],['Exit','Stop as soon as the password is correct or the limit is reached.']]),
    p('WHILE directly states the continuation rule and can allow a preliminary condition to prevent attempts. REPEAT could express an at-least-once task using success OR three attempts as its UNTIL rule. An unguarded three-iteration FOR would continue after early success.', 'Choose the loop from both exit reasons'),
  ],
  'S11-INTEGRATED-CONTROL': [
    steps('Separate accepted slots from input attempts', [['Outer FOR','Visit three accepted-mark slots.'],['Inner REPEAT','Read at least one Mark and repeat until ValidMark(Mark) is true. Rejection stays within the same slot.'],['Record once','Call RecordMark only after validation; update the total and inclusive pass count there.'],['Finish','After all three accepted marks, output their mean and the pass count.']]),
    p('Inputs -1, 0, 50, 101, 100 yield accepted marks 0, 50, 100. Their total is 150, mean 50 and pass count 2. Invalid attempts contribute to neither statistic.', 'Trace accepted data rather than every attempted value'),
  ],
  'S12-ERROR-CORRECT': [
    steps('Correct the diagnosed cause and test it', [['Amend','For a pass rule of at least 50, replace the faulty > comparison with >=.'],['Repeat the failure','Use Mark 50 and the required expected result to demonstrate the correction.'],['Regression test','Retest relevant existing behaviours, including neighbouring values, to check that they still work.']]),
    p('A run-time fault needs a defined response as well. Guard averaging with Count > 0; for Count = 0, the requirement can specify No data. Test both zero and an ordinary nonzero case instead of merely hiding division by zero.', 'Define behaviour for the exceptional case'),
  ],
  'S12-AMEND-CHANGE': [
    steps('Add merit counting to the existing traversal', [['Declare and initialise','Add MeritCount and set it to 0 before reading marks.'],['Update independently','After each Mark, keep the pass test and add a separate Mark >= 70 test. A mark of 70 contributes to both counters.'],['Output','Keep the old pass output and add the requested merit output.']]),
    p('Do not place ELSE between the pass and merit selections: that would wrongly make the categories exclusive. Keep behaviour that the request did not change, then compare original and amended results using the same inputs.', 'Preserve the original rule'),
  ],
  'S8.02-KEYS': [
    list('Identify records', [['Candidate key','A minimal field or combination that uniquely identifies a record.'],['Primary key','The chosen candidate; values must be unique and not null.'],['Composite key','Uses several fields, with every component needed for uniqueness.']]),
    list('Retrieve and relate records', [['Secondary key','Another retrieval route, such as Town; it need not be unique.'],['Foreign key','References a key in another table. A patient identifier may therefore recur across several appointment records.']]),
  ],
  'S8.04-1NF': [
    steps('Remove the repeating group', [['Identify it','Several product entries stored together in one order field form a repeating group.'],['Separate rows','Give each product line its own row, keeping the order and customer information needed to interpret it.'],['Check 1NF','Every field value is atomic and no repeating group remains.']]),
    p('Assume each product occurs once at most per order and UnitPrice is its current fixed price. (OrderID, ProductID) identifies a line. Customer and product details still repeat; 1NF alone does not remove those dependencies.', 'State the key and remaining problem'),
  ],
  'S8.04-2NF': [
    p('2NF requires 1NF and no partial dependency of a non-key attribute on part of a candidate key. Quantity depends on the whole (OrderID, ProductID) line key.', 'Check the whole key'),
    steps('Separate the partial dependencies', [['Product facts','ProductName and UnitPrice depend on ProductID alone; move them to Product.'],['Order facts','CustomerID and CustomerName depend on OrderID alone; move them to SalesOrder.'],['Line facts','Keep both identifying fields and Quantity in OrderLine, preserving the references.']]),
    p('CustomerName still depends on CustomerID inside SalesOrder; the next normal form addresses that transitive dependency.', 'The remaining dependency'),
  ],
  'S8.04-3NF': [
    p('3NF requires 2NF and, for these simple designs, no dependency between non-key attributes. OrderID determines CustomerID, which determines CustomerName; the name is transitively dependent on OrderID.', 'Find the transitive dependency'),
    steps('Store customer facts with their determinant', [['Create Customer','Store CustomerID and CustomerName together.'],['Keep the reference','Retain CustomerID as a foreign key in SalesOrder.'],['Check reconstruction','Product and OrderLine stay unchanged. The existing keys must still reconstruct the original order information.']]),
  ],
  'S8.04-DESIGN': [
    steps('Judge a proposed design', [['Identify keys','Name the key and state the relevant dependencies.'],['Check in order','Test 1NF, then 2NF, then 3NF; one row per entity alone does not prove 3NF.'],['Look for anomalies','A non-key fact about another entity can cause update, insertion or deletion anomalies.']]),
    p('Assign each fact to its determinant and retain primary and foreign keys. Account for every original attribute and reconstruct a representative record. State assumptions about uniqueness instead of inventing dependencies.', 'Produce and verify the decomposition'),
  ],
  'S8.05-BACKUP': [
    steps('Make the database recoverable', [['Schedule','Choose backup frequency for the acceptable interval of data loss.'],['Protect','Keep a consistent recovery copy outside the same failure as the live database; restrict access to sensitive records.'],['Recover','Restore a suitable backup. Where supported, replay later transaction logs to the chosen recovery point.'],['Test','Periodically restore to check the copies and the procedure.']]),
    p('A backup is a saved database state; recovery is the process of making a suitable consistent state usable again.', 'Connect the saved copy to the recovery procedure'),
  ],
  'S8.06-PROCESSOR': [
    steps('Process a query', [['Interpret and check','Check the statement’s syntax and references against table definitions.'],['Plan','Choose a suitable execution plan, considering available indexes.'],['Execute','Locate, filter and return the requested records while permissions and integrity rules apply.']]),
    p('An overdue-loans query needs data access, not a rebuilt data-entry form. The developer interface creates application objects; the query processor carries out the submitted data request.', 'Distinguish design tools from query execution'),
  ],
  'S8.10-AGGREGATES': [
    table('Select the aggregate', ['Expression','What it includes'], [['SUM(Fee)','Adds non-null fees.'],['COUNT(Fee)','Counts non-null fees.'],['COUNT(*)','Counts rows, including rows with a null Fee.'],['AVG(Fee)','Mean of included non-null fees.']]),
    p('For fees 2, 4, 6, 0, 3, SUM is 15, COUNT(*) is 5 and AVG is 3. SUM, AVG and COUNT(Fee) ignore null fees. Zero is a known value and stays included. Without GROUP BY, the query gives one overall aggregate result for the selected records.', 'Distinguish null from zero'),
  ],
};

// Preserve the detailed wording where conditions or distinctions are necessary,
// but expose each paragraph's purpose before the student starts reading it.
export const completionHeadings = {
  'S1.04-UNSIGNED':['Unsigned representation and range','Add each fixed-width column','Subtract and check the unsigned range'],
  'S3.10-STATEMENT':['Define variables and write the expression','Construct the circuit','Check every input combination'],
  'S3.10-FROM-TABLE':['Build an expression from accepted rows','Construct the circuit using two-input gates','Verify every row, including rejected cases'],
  's4-fetch':['Follow the instruction address','Move the instruction into CIR'],
  's4-interrupt-causes':['Why an interrupt is useful','Sources and instruction-boundary checks'],
  's4-trace-rules':['Start from the supplied state','Follow branch decisions and termination'],
  's4-complete-trace':['Follow execution rather than source order','Distinguish the loop counter from the output value'],
  'S5.05-CHOICE':['Development and immediate feedback','Native delivery and repeated execution','Overhead and combined translation models'],
  'S5.07-SYNTAX':['Find source-rule violations early','Investigate the diagnostic in context','Syntax correctness does not establish task correctness'],
  'S7-DUTIES':['Identify the duty and who it protects','Apply the duty to the action'],
  'S7-STAKEHOLDERS':['Identify affected people and interests','Compare interests using the circumstances'],
  'S7-CONSEQUENCES':['Follow the effect of each action','Compare options and their conditions'],
  'S7-JUDGEMENT':['Use evidence and relevant duties','Support the recommendation'],
  'S7-FSF':['The freedoms concern use and control','Check practical rights and responsibilities'],
  'S7-OSI':['Source access alone is insufficient','Distribution terms determine the granted rights'],
  'S7-SHAREWARE':['A trial is governed by licence terms','Check the continuation conditions'],
  'S7-LICENCE-CHOICE':['Translate the task into required rights','Check both permissions and obligations'],
  'S7-AI-MEANING':['Identify what the system infers','Judge the task, not a human-like appearance'],
  'S7-AI-SOCIAL':['Who benefits and who may be harmed','Check unequal effects in the application'],
  'S9-ALGORITHM-STEPS':['State a finite, unambiguous method','Make every required operation explicit'],
  'S9-IPO-STATEMENTS':['Classify statements by their effect','Track where values become available'],
  'S9-IDENTIFIER-TABLE':['Specify each identifier’s role','Document type and purpose before using a value'],
  'S9-REFINEMENT-ENDPOINT':['Stop only when the actions are programmable','Resolve the example’s missing rules'],
  'S9-LOGIC-COMPARISONS':['Translate the exact comparison','Test the boundary and its neighbours'],
  'S9-LOGIC-CHECK':['Relate valid and invalid range conditions','Exercise values on both sides of a limit'],
  'S9-INTEGRATED-IPO':['Derive the charging and change calculations','Let earlier decisions control later input'],
  'S9-INTEGRATED-REFINEMENT':['Expand the rules into control flow','Trace all the relevant outcomes'],
  'S10-TYPES-VALUES':['Choose by meaning and permitted operations','Write compatible declarations and literals'],
  'S10-TYPES-COLLECTIONS':['Choose indexed working storage','Use files for persistence'],
  'S10-ONE-DIMENSION-CHOICE':['When one index describes the collection','Retain an array when later access needs the values'],
  'S10-TWO-DIMENSION-CODE':['Use one loop per dimension','Reset each row total at the correct level'],
  'S10-LINEAR-CODE':['Initialise and guard the search','Test first, last, duplicate and absent targets'],
  'S10-BUBBLE-CODE':['Reset and update the swap flag for each pass','Shorten the unsorted region and detect completion'],
  'S10-ADT-CONTRACT':['Specify the data and operations','Include what each operation must do'],
  'S10-ADT-REPRESENTATION':['Separate behaviour from storage','Use the implementation to preserve the contract'],
  'S10-LINKED-FEATURES':['Nodes, head and the null link','Logical order follows the links'],
  'S10-IMPLEMENT-BOUNDS':['Check active state before each operation','Reject invalid changes without corrupting stored data'],
  'S10-COMBINE-ACCESS':['Match each responsibility to an access rule','Keep the representations and interfaces consistent'],
  'S11-LOGICAL':['Form complete Boolean comparisons','Test inclusive limits and their complement'],
  'S11-LOOP-CHOICE':['Choose from the stopping rule','Justify suitability without excluding workable alternatives'],
  'S11-PROCEDURE-CALL':['Declare a procedure and invoke it','Match arguments to the parameter interface'],
  'S11-INTERFACE':['Read the parameter and result contract','Distinguish formal parameters from arguments'],
  'S11-INTEGRATED-DESIGN':['State the complete processing requirement','Separate validation, control and recording'],
  'S11-INTEGRATED-INTERFACES':['Choose value or reference passing','Trace the complete program and test its boundaries'],
  'S12-STRUCTURE-HIERARCHY':['Show which modules call which','Apply the hierarchy to ProcessOrder'],
  'S12-STRUCTURE-PARAMETERS':['Show the direction of transferred values','Match parameters, arguments and returned results'],
  'S12-STRUCTURE-CODE':['Implement the module interfaces and bodies','Check agreement between chart and program'],
  'S12-STATES-MEANING':['States persist between events','Transitions depend on current state and event'],
  'S12-STATES-TRACE':['Follow one event from the current state','Distinguish state, structure and flow diagrams'],
  'S12-TEST-MANUAL':['Trace the algorithm manually','Review the design or code in a walkthrough'],
  'S12-TEST-USERS':['Choose who tests and what they establish','Match the method to the testing purpose'],
  'S12-STRATEGY':['Plan the scope and sequence of testing','Define evidence and completion criteria'],
  'S12-TEST-PLAN':['Specify inputs and expected results','Record actual results and follow up failures'],
  'S12-MAINTENANCE-NEED':['Why a delivered system still changes','Control the change and its tests'],
  'S12-AMEND-ANALYSE':['Understand the program before locating the change','Preserve pass counting while adding merit counting'],
  'S12-AMEND-VERIFY':['Test both the old and new thresholds','Compare full input sets and preserve existing outputs'],
};
