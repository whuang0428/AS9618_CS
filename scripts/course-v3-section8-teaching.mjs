import { coreParagraph as p, coreTable as table, coreSteps as steps } from './course-v3-core-blocks.mjs';
import { section8Databases as db, section8SqlCases as sql, section8Ddl as ddl } from './course-v3-section8-sql.mjs';
import { orderHeaders, unnormalisedOrders, order1NF, orderRelations, joinedLoans, outstandingLoans, schoolState } from './course-v3-section8-examples.mjs';
import { section8TeachingVisuals } from './course-v3-section8-teaching-diagrams.mjs';
import { enhanceSection8Questions, section8ReviewQuestions } from './course-v3-section8-questions.mjs';

const entry = (essentials, titles, blocks = [], extra = {}) => ({essentials,titles,blocks,...extra});
const worked = (title, steps) => ({type:'worked-example',title,steps});
const data = (title,headers,rows) => ({type:'table',title,headers,rows,preserveText:true});
const fixture = (name,n=0) => ({type:'table',...db[name].tables[n],preserveText:true});
const relation = name => data(name.replace('2NF',' (2NF)'),orderRelations[name].headers,orderRelations[name].rows);
const result = key => data('Expected result',sql[key].headers,sql[key].expectedRows.map(row=>row.map(v=>v===null?'NULL':v)));
const query = (key,title,reason) => worked(title,[['Starting state',reason],['SQL',sql[key].sql],['Result',sql[key].expectedRows.length?sql[key].expectedRows.map(r=>r.map(v=>v===null?'NULL':v).join(' | ')).join('\n'):'No result rows. The requested column headings still describe the empty result.']]);
const extension = (title,explanation,materials=[]) => ({title:'Optional extension · '+title,explanation,materials});
const visual = file => {const {svg,...v}=section8TeachingVisuals.find(v=>v.file===file);return {...v,type:'reviewed-visual',asset:'/assets/course-v3/section-8/'+file,review:'authored-exact-svg',preserveText:true};};

const teaching = {
  'S8.01-FILES': entry([
    'Separate application files can duplicate facts, disagree after updates and make combined retrieval or changes difficult.',
    'Shared related records, logical definitions, queries and centrally enforced controls address different problems; good design is still required.',
  ],['Identify the repeated fact','Replace copies with references'],[
    table('Follow each limitation to a mechanism',['File-based limitation','Relational / DBMS response','Why it helps'],[
      ['Appointment and Billing each keep an address','One Patient address, referenced by PatientID','An address change updates one fact rather than several independent copies.'],
      ['Combining separate formats requires special program code','Queries use related tables and common definitions','The request can match identifiers and retrieve the relevant fields together.'],
      ['A program assumes a particular file layout','Logical table and field definitions separate requests from physical placement','Changing physical storage need not require rewriting every application; changing a referenced field can still require program changes.'],
      ['Applications implement their own access and validation rules','A DBMS can enforce shared permissions and constraints','Different entry routes can be checked against the same declared rules.'],
    ]),
    p('Redundancy means unnecessary repeated facts, not every repeated value. Several appointments must retain PatientID so that each can name its patient. Two unrelated people may legitimately have the same town. Ask whether a repeated value represents one fact copied in several places or distinct facts that happen to agree.','Distinguish repetition from harmful redundancy'),
  ],{extensions:[extension('Shared updates need coordination','If two staff members read a stock quantity of 5 and independently save 4 after separate sales, one reduction can be lost. DBMS coordination can make the two accepted reductions produce 3. This explains a shared-access problem; locking and transaction implementation are beyond this lesson.')]}),
  'S8.02-TERMS': entry([
    'A table represents occurrences of an entity type; a row is a record or tuple and a column represents a field or attribute.',
    'Keep the entity type, one occurrence, a named property and its stored value distinct.',
  ],['From an entity type to its occurrences','From an attribute to a value'],[
    p('Patient is an entity type. Patient 14 is one occurrence; (14, Imani, York) is its stored record. Town is an attribute and York is one value. Adding a new patient adds a row; adding a previously unrecorded property such as Phone adds a field to the definition. These changes answer different questions.','Read two kinds of change'),
    p('A database can contain several tables and relationships. A database is the organised data and its definitions; a DBMS is the software that manages them. A table is not the entire DBMS, and the DBMS is not one particular patient record.','Locate the table inside the system'),
  ]),
  'S8.02-KEYS': entry([
    'A candidate key is minimal and unique under the business rules; one is chosen as the non-null primary key.',
    'A secondary key supports retrieval, while a foreign key references a related key. Composite keys identify combinations.',
  ],['Identify a row uniquely','Retrieve a set or reference another row'],[
    table('Test uniqueness and minimality',['Proposed identifier','Stated rule','Conclusion'],[
      ['PatientName','Names can repeat, although the two displayed names differ','Not a candidate key; a small sample cannot guarantee uniqueness.'],
      ['PatientID','Every patient is assigned a distinct identifier','A candidate key.'],
      ['PatientID + PatientName','PatientID already distinguishes every patient','Unique but not minimal, so this combination is not a candidate key.'],
      ['StudentID + ClubID in Membership','Each student-club pair occurs at most once','Neither field alone identifies membership; the pair can be a candidate key.'],
    ]),
    p('Minimal does not mean the fewest printed characters or the lowest numeric value. It means no component can be removed while preserving identification. Choose a primary key using the stated rules; a stable assigned identifier avoids relying on a name that can change. Candidate and primary describe identification, not an index implementation.','Use the rules, not the current appearance'),
  ],{check:['PatientID is unique. Why is (PatientID, Town) not a candidate key even if every pair is distinct?','PatientID alone already identifies the row. Town is unnecessary for uniqueness, so the pair is not minimal.']}),
  'S8.02-RELATIONSHIPS': entry([
    'Determine cardinality by reading the business rule in both directions.',
    'A many-to-many association uses a linking entity; its key must distinguish every permitted association.',
  ],['Read both directions','Represent the association'],[
    p('In a one-to-many relationship the many-side record can store the one-side identifier: Appointment contains PatientID. Placing a list of appointment identifiers in a Patient field makes individual links harder to manage. The labels 1 and many in these diagrams show maximum cardinality; “may have no appointments” concerns whether participation is optional.','Place the reference on the appropriate side'),
    table('Change the membership rule',['Rule','Suitable identification','Reason'],[
      ['A student joins a club once','(StudentID, ClubID)','Each pair identifies one membership.'],
      ['A student can rejoin the same club in a later year, at most once per year','(StudentID, ClubID, Year)','The old pair repeats; the year distinguishes the permitted occurrences.'],
      ['A patient can visit the same doctor several times','AppointmentID','The patient-doctor pair does not identify a particular visit.'],
    ]),
    p('A one-to-one rule also needs enforcement. A foreign key alone allows repeated references; it does not ensure that two pupils cannot be assigned the same locker. In a one-to-one design the identifying relationship must also prevent a repeated allocation, for example by a suitable unique or shared-key constraint. No extra constraint syntax is needed here.','Do not infer one-to-one from a foreign key alone'),
  ]),
  'S8.02-REFERENTIAL': entry([
    'Every non-null foreign-key value must match an existing referenced key.',
    'Insertions, changes to references and parent deletions must preserve valid links; repeated valid references are permitted.',
  ],['Check the proposed reference','Preserve existing links'],[
    table('Start independently from Patient 14, 18 and Appointment (90, 14)',['Operation','Decision under restrictive referential rules','Final state'],[
      ['Insert Appointment (91, 18)','Accept: patient 18 exists','Appointments (90,14) and (91,18).'],
      ['Insert Appointment (91, 99)','Reject: patient 99 is absent','Only appointment (90,14) remains.'],
      ['Change appointment 90 to PatientID 99','Reject: replacement reference is invalid','Appointment 90 still references patient 14.'],
      ['Change appointment 90 to PatientID 18','Accept: the replacement reference exists','Appointment (90,18); both patient rows remain.'],
      ['Delete patient 14','Reject: appointment 90 still refers to 14','Both original patients and appointment 90 remain.'],
      ['Delete patient 18','Accept: no appointment in this starting state references 18','Patient 14 and appointment (90,14) remain.'],
      ['Insert Appointment (91, 14)','Accept: repeated reference is allowed','Two different appointments reference patient 14.'],
    ]),
    p('Here (AppointmentID, PatientID) gives the order of fields, and each operation starts from the same stated initial state. If a design permits NULL, it means no supplied association; it is not the identifier 0 or an unmatched identifier such as 99. A required association must also prohibit NULL.','State the conditions of the check'),
  ]),
  'S8.02-INDEX': entry([
    'An index is an additional lookup structure that can reduce the records inspected by suitable queries.',
    'It uses storage and needs maintenance; it neither establishes factual truth nor guarantees result ordering.',
  ],['Find records through an access path','Account for the extra work'],[
    steps('Trace the illustrated Town index',[
      ['Request','Find records whose Town is York.'],['Lookup','The York entry identifies patient records 14 and 22 in this separate index example.'],['Retrieve','Follow those references to the table and read the requested patient fields.'],['Update','If patient 22 moves to Bath, change its stored town, remove its York index reference and add its Bath reference.'],
    ]),
    p('The illustrated IDs stand for the target records; an actual index holds suitable record references or locations. If most records match a condition, reading the table can be cheaper than following many index references. For a tiny, frequently updated table, maintenance may outweigh retrieval savings. An index is therefore a choice based on the workload.','Qualify the performance claim'),
  ]),
  'S8.03-ER': entry([
    'An E-R diagram records entities, keys and relationships justified by business rules.',
    'Read cardinality in both directions and store facts on the entity or association they describe.',
  ],['Derive the design from requirements','Identify a particular appointment'],[
    p('Begin with facts to store, not a list of all nouns in a paragraph. A clinic needs patient details, doctor details and the date of each appointment. The appointment is a distinct occurrence because a patient can see the same doctor again. Place VisitDate there rather than on Patient or Doctor, both of which take part in many visits.','Explain ownership of a fact'),
    p('After drawing, test the design with a new patient who has no appointments, two appointments for one patient, and a later return to the same doctor. The diagram must permit the stated cases without overwriting an earlier visit. If an appointment can involve several doctors instead, the present single DoctorID field is insufficient; a separate appointment-doctor association is needed.','Test the model against changed conditions'),
  ]),
  'S8.04-1NF': entry([
    '1NF requires atomic field values and no repeating groups.',
    'Expand each item into a row while retaining its order identity and all represented facts.',
  ],['Remove the repeating group','State the identity rule'],[
    p('In the following worked example, each order has one customer; CustomerID determines CustomerName; ProductID determines ProductName and the current fixed UnitPrice. A product appears at most once per order. Quantity depends on the order-product pair. These are business rules, not conclusions obtained merely because a value repeats in this small sample.','Rules for the complete order example'),
    table('Complete unnormalised input',['OrderID','CustomerID','CustomerName','Items: (ProductID, ProductName, UnitPrice, Quantity)'],unnormalisedOrders),
    p('An atomic value is treated as one value for the operations this application needs. Here a product list is not atomic because the system must address each product and its quantity independently. Creating Product1, Product2 and Product3 columns would impose an arbitrary limit and repeat the same group of fields; give the items rows instead.','Explain why the original structure fails'),
  ],{support:[data('Complete 1NF result: one row per order-product pair',orderHeaders,order1NF)]}),
  'S8.04-2NF': entry([
    '2NF requires 1NF and no non-key attribute depending on only part of a candidate key.',
    'Separate order and product facts; retain the whole line key and Quantity in OrderLine.',
  ],['Find partial dependencies','Split without losing the relationship'],[
    p('X → Y means that each permitted X value determines one Y value under the rules. It does not mean a processing arrow or that Y must determine X. ProductID P1 has the same product description in different orders, but its quantities are 3 and 2. ProductID alone therefore cannot determine Quantity. OrderID alone cannot determine it either because an order has several product lines.','Read a dependency and test the determinant'),
    table('Three independent changes to the original 1NF table',['Requested change','Problem before decomposition','How separate relations help'],[
      ['Record a new product P3, Ruler, price 4 before any order','No order-product key is available for the product-only fact: an insertion anomaly','Insert P3 into Product without inventing an order.'],
      ['Change P1 current price from 2 to 3 in only the order 501 row','Order 502 still says 2 for the same product: an update anomaly','Update the single P1 Product row.'],
      ['Delete the only P2 line, (501, P2, 1)','The only stored Pad description and price also disappear: a deletion anomaly','Remove the line while retaining the P2 Product record.'],
    ]),
    p('A field appearing in a composite key can recur. In OrderLine, OrderID 501 appears twice and ProductID P1 appears twice; the pair is unique. Removing either identifier would merge distinct lines. Normalisation moves facts to their determinant, not every repeated identifier into isolation.','Keep the connecting fields'),
  ],{support:[relation('Product'),relation('SalesOrder2NF'),relation('OrderLine')]}),
  'S8.04-3NF': entry([
    '3NF requires 2NF and, in these simple designs, removal of dependencies between non-key attributes.',
    'Move CustomerName to Customer and keep CustomerID in SalesOrder so the original facts remain retrievable.',
  ],['Find the remaining transitive dependency','Preserve the customer reference'],[
    p('The two SalesOrder rows in 2NF still repeat Amina because both name customer C7. OrderID identifies an order, whereas CustomerID identifies the customer whose name is being stored. A change of name belongs to the customer independently of any particular order. The dependency is OrderID → CustomerID → CustomerName.','Explain why another split is needed'),
    p('The final database below contains one customer, two orders, two products and three order lines. Store a new customer in Customer before the customer places an order; deleting an order and its lines need not delete the customer record. Repeated foreign-key values remain useful references, not leftover customer-name copies.','Check the new possibilities'),
  ],{support:[relation('Customer'),relation('SalesOrder'),relation('Product'),relation('OrderLine')],extensions:[extension('Current price versus price charged','This example stores the current fixed product price. If the required fact becomes the actual price agreed for each order line, ProductID alone no longer determines that price. Store the agreed UnitPrice on OrderLine under the stated one-product-per-order rule. The price may then differ between two orders of P1 without inconsistency. The stopping point is fact ownership; historical pricing systems are not required.')]}),
  'S8.04-DESIGN': entry([
    'Judge keys and dependencies in order: atomic values, partial dependencies, then transitive dependencies.',
    'A complete design accounts for every fact and retains references that reconstruct the original information.',
  ],['Explain a verdict with evidence','Check information preservation'],[
    table('Reconstruct every original line from the final 3NF tables',orderHeaders,order1NF),
    p('For each OrderLine, match its OrderID to SalesOrder to find CustomerID; match that identifier to Customer; match ProductID to Product. The three reconstructed rows above equal the three 1NF rows, including both different quantities of P1. No three- or four-table SQL statement is required here: this is a design trace. Section 8 SQL tasks remain limited to two tables.','Follow the full reconstruction'),
    table('A positive example and a deceptive repair',['Design and declared rules','Verdict','Reason'],[
      ['Product(ProductID, ProductName, UnitPrice); ProductID is the only candidate key; no non-key dependencies; atomic values','In 3NF under these rules','A single-field key has no proper subset; neither non-key field determines the other.'],
      ['Employee gains RowID but still stores DepartmentID and DepartmentName, with DepartmentID determining DepartmentName','Not fixed by the new identifier','The department dependency remains; a new number does not change which entity owns the name.'],
    ]),
    p('Do not infer a dependency merely because all displayed products have different prices. If different products may share a price, UnitPrice does not determine ProductID. State a missing business rule as an assumption instead of silently inventing it. A design can be checked against the stated rules, not every unknown future requirement.','Separate sample evidence from guarantees'),
  ],{check:['ProductID is the only candidate key in an atomic Product(ProductID, ProductName, UnitPrice) table, and neither non-key attribute determines the other. Explain why it is in 3NF.','It is in 1NF because the values are atomic. The single-field candidate key cannot have a partial dependency, so it meets 2NF. With no dependency between its non-key fields it also meets the simple 3NF test.'],extensions:[extension('The scope of the single-key shortcut','An atomic table whose only candidate key is a single attribute cannot have a partial dependency on that key. Do not generalise this to a table with an additional composite candidate key, or conclude that 2NF also proves 3NF. Formal higher-normal-form proofs are outside this course.')]}),
};

Object.assign(teaching, {
  'S8.05-DICTIONARY': entry(['The data dictionary stores metadata describing tables, fields, types, lengths, keys and constraints.','The DBMS uses these definitions when checking and processing requests.'],['Identify metadata','Use a shared definition'],[
    table('One school example: definition versus stored fact',['Metadata in the dictionary','Application data'],[['StudentName: VARCHAR(40)','Student 21 has name Amina.'],['StudentID: INTEGER, primary key','StudentID 21 identifies this student.'],['Student.TutorID references Tutor.TutorID','Amina has TutorID 7.'],['Mark must be between 0 and 100','Amina has Mark 73.']]),
    p('A request for StudntName contains a name absent from the schema, so it cannot be resolved as the intended field. A request assigning Mark 145 can be checked against the stored range rule. Neither decision requires the dictionary to contain Amina as a metadata value.','Follow a use of metadata'),
  ]),
  'S8.05-MODELLING': entry(['Data modelling identifies entities, attributes and relationships from organisational requirements.','Validate the model against business rules before turning it into table definitions.'],['Start with the organisation','Test the model'],[
    steps('Continue the school example',[['State the rule','Each student has one tutor; one tutor may advise many students.'],['Assign facts','Student owns StudentID, StudentName and Mark. Tutor owns TutorID and TutorName.'],['Connect','Put the tutor reference on Student, the many side.'],['Change the rule','If each student may have several tutors, a StudentTutor association is needed; one TutorID field no longer records all links.']]),
    p('The modelling tool can draw these entities and their association. It cannot decide whether the school really permits several tutors per student. Confirm that requirement with the organisation. Lesson 043 supplies the E-R and normalisation methods; here the focus is the DBMS facility supporting that work.','Separate the tool from the design judgement'),
  ]),
  'S8.05-SCHEMA': entry(['The logical schema defines tables, attributes, types, keys, relationships and constraints.','The dictionary records metadata about that schema; physical storage locations are a separate concern.'],['Define the logical organisation','Relate schema to dictionary'],[
    table('School logical schema',['Relation','Definitions and rules'],[['Tutor','TutorID INTEGER primary key; TutorName VARCHAR(40)'],['Student','StudentID INTEGER primary key; StudentName VARCHAR(40); TutorID INTEGER non-null foreign key; Mark INTEGER in 0–100'],['Relationship','Student.TutorID references Tutor.TutorID; many students may reference tutor 7.']]),
    p('This schema permits a Tutor record (7, Jo) and a Student record (21, Amina, 7, 73). The model expresses which facts belong together; the schema specifies their logical implementation; dictionary entries record those definitions. Moving the underlying files does not require the application to substitute disk-sector numbers for StudentID.','Connect all three descriptions'),
  ]),
  'S8.05-INTEGRITY': entry(['Integrity constraints check identities, references and permitted field values when data changes.','A value that passes a constraint can still be factually wrong.'],['Apply the declared rules','Distinguish validity from truth'],[
    table('Initial school records',['Table','Complete records'],[['Tutor(TutorID, TutorName)','(7, Jo)'],['Student(StudentID, StudentName, TutorID, Mark)','(21, Amina, 7, 73)']]),
    p('For the following independent attempts, restart from the initial records each time. Editors may insert students; Readers may only retrieve them. TutorID is required and must reference Tutor; Mark must be in 0–100. A rejected operation leaves both tables unchanged.','State the rules and reset boundary'),
    table('Trace five independent attempts',['User','Proposed Student row','Decision','Reason','Final change'],schoolState.attempts),
    p('In the accepted case Student becomes (21, Amina, 7, 73), (22, Ben, 7, 80), and Tutor stays (7, Jo). Acceptance means this operation passed these declared checks. A typed mark of 80 could still be a copying mistake if the actual script says 08.','Check the full accepted state'),
  ],{support:[visual('dbms-request-checks.svg')]}),
  'S8.05-SECURITY': entry(['Access rights specify which data and operations an authenticated user or group may use.','Permissions and integrity answer different questions and must both be satisfied.'],['Check permission after identity','Manage rights through roles'],[
    table('Same row, different decision',['Request','Permission','Integrity','Outcome'],[['Editor inserts (22, Ben, 7, 80)','Allowed','Passes the school rules','One student added.'],['Reader inserts the same valid row','Denied','No permission to perform this insertion','No student added.'],['Editor inserts (23, Chen, 9, 80)','Allowed','Missing tutor 9','No student added.']]),
    p('Assign an account to the Readers group to apply its configured read rights. Moving that account to Editors changes which operations may be requested; it does not relax the primary-key, tutor-reference or mark-range rules. Rights may be limited to particular tables or fields, so access to contact information need not permit changes to marks.','Explain group administration'),
  ]),
  'S8.05-BACKUP': entry(['Keep protected, consistent recovery copies separate from the live failure risk and test restoration.','Backup-only recovery restores the saved state; subsequent changes require another recovery source.'],['Prepare a recoverable copy','Restore and verify'],[
    table('A complete backup-only recovery',['Time / event','Student records (ID, Name, TutorID, Mark)'],[['18:00 consistent backup','(21, Amina, 7, 73)'],['09:00 update and insert','(21, Amina, 7, 75), (22, Ben, 7, 80)'],['11:00 live storage fails','Live records unavailable. No recovery logs exist.'],['Restore the 18:00 backup','(21, Amina, 7, 73): the change to 75 and student 22 are absent.']]),
    p('Restore the associated Tutor record (7, Jo) as part of the same consistent database state. Then verify the student count, values and reference to tutor 7 before returning to service. A later Student copy combined with an incompatible earlier Tutor copy could fail the reference check.','Verify relationships as well as files'),
  ],{extensions:[extension('A supported recovery log','After understanding backup-only recovery, a DBMS log can record later committed changes for replay: restore 18:00, replay the mark change to 75, then the insertion of student 22. This reaches the later state only if the required records and recovery mechanism are available. Detailed logging algorithms are outside this lesson.')]}),
  'S8.06-DEVELOPER': entry(['The developer interface helps define objects and construct forms, queries and reports.','Designing an interface is separate from executing its later requests.'],['Build database objects','Bind an interface to data'],[
    steps('Build and use a student-entry form',[['Design','Provide controls for StudentID, StudentName, TutorID and Mark. Link them to the Student fields.'],['Configure','Offer existing tutors and display the 0–100 mark requirement.'],['Use','An Editor enters (22, Ben, 7, 80) and submits the form.'],['Result','The DBMS checks permission and constraints, then stores the new row. The form can display confirmation.']]),
    p('A form check helps the user correct input, but the database rules must also govern requests from another form or query tool. A report designer chooses fields and layout; the saved query is executed each time the report needs fresh records.','Explain the boundary of the tool'),
  ]),
  'S8.06-PROCESSOR': entry(['The query processor interprets a request, checks names and syntax, plans access and executes the query.','Metadata and indexes support processing; an execution plan does not change the logical data model.'],['Interpret and plan','Execute and return'],[
    steps('Retrieve from the same school state',[['Initial data','Student contains (21, Amina, 7, 73) and (22, Ben, 7, 80).'],['Request','Retrieve StudentName for students whose Mark is at least 75.'],['Check and plan','Resolve StudentName and Mark using the schema; confirm permitted access and choose a suitable access path.'],['Execute','Compare 73 and 80 with 75. Only student 22 qualifies.'],['Return','The result is one value, Ben. Both original records remain stored.']]),
    p('An index may help a suitable request locate records, but a small table may be scanned instead. This is a conceptual route from request to result, not a claim that every DBMS performs its internal checks in one fixed order. SQL spelling is developed in Lessons 046 and 047.','State the abstraction boundary'),
  ]),
  'S8.07-DDL': entry(['DDL creates or changes database structure, including fields and constraints.','A structural change and the later assignment of a record value are separate operations.'],['Identify a structural operation','Separate definition from population'],[
    table('Add a field: before and after',['State','Loan definition','Stored records'],[['Before','LoanID INTEGER, Returned BOOLEAN','(201, FALSE)'],['After adding nullable DueDate DATE','LoanID INTEGER, Returned BOOLEAN, DueDate DATE','(201, FALSE, NULL)']]),
    p('The existing loan remains, but the schema now has a place for a due date. NULL means no date has been supplied here. The operation has not chosen a due date for loan 201. Lesson 046 explains the DDL syntax and key declarations.','Read the actual effect'),
  ]),
  'S8.07-DML': entry(['DML retrieves, inserts, updates and deletes records within a defined structure.','SELECT produces a result without changing the stored rows in these examples.'],['Recognise four operations','Distinguish a result from a definition'],[
    table('A continuous record lifecycle',['Operation on Loan(LoanID, Returned)','Stored state afterwards','Returned information'],[['Start','(201, FALSE)','—'],['Insert (202, TRUE)','(201, FALSE), (202, TRUE)','—'],['Retrieve IDs of unreturned loans','(201, FALSE), (202, TRUE)','201'],['Update loan 201 to TRUE','(201, TRUE), (202, TRUE)','—'],['Delete loan 202','(201, TRUE)','—']]),
    p('The column definitions remain LoanID INTEGER and Returned BOOLEAN throughout. A displayed result is temporary information from the query, not a new stored table definition. The SQL clauses implementing these operations are taught in Lesson 047.','Track what stays defined'),
  ]),
  'S8.07-SQL': entry(['SQL expresses both DDL and DML requests for the DBMS to process.','Classify by the effect on the structure or records, including retrieval.'],['Relate language to roles','Classify the effect'],[
    p('DDL and DML are categories of operations, not separate database applications. A developer may define Loan, insert the first row, retrieve it, then extend the definition in one sequence of SQL statements. The DBMS processes that language; it is the software service, not another name for SQL.','Connect the lifecycle to the language'),
  ]),
  'S8.08-READ': entry(['Read the exact SQL identifiers, data types and constraints before describing the result.','CREATE TABLE defines an initially empty structure; it does not add records.'],[],[],{
    heading:'Read an SQL table definition',
    detail:[p('Start by identifying the command and the named object. Then read each comma-separated field declaration and the key clause. This first definition is small enough to interpret before constructing a larger linked design.','Read structure before writing it'),table('Interpret the supplied definition',['Element','Meaning'],[['CREATE TABLE Account','Create a new table named Account.'],['AccountID INTEGER','Define a whole-number identifier field.'],['AccountName VARCHAR(25)','Allow variable-length names up to 25 characters.'],['Verified BOOLEAN','Store a truth value.'],['PRIMARY KEY (AccountID)','Use distinct, non-null AccountID values.']]),p('Names such as AccountName are identifiers, while 25 is a length limit. No VALUES clause or record data is present. Query interpretation continues in Lesson 047 after SELECT, WHERE and ORDER BY have been taught.','Identify the resulting state')],
    lead:data('Definition to interpret',['SQL role','Named parts'],[['Command and object','CREATE TABLE Account'],['Fields','AccountID, AccountName, Verified'],['Constraint','PRIMARY KEY (AccountID)']]),
    examples:[worked('Read the complete definition',[['Statement','CREATE TABLE Account (\n  AccountID INTEGER,\n  AccountName VARCHAR(25),\n  Verified BOOLEAN,\n  PRIMARY KEY (AccountID)\n);'],['Final state','Account exists with three fields and a primary-key constraint. It contains zero records.'],['Predict a changed definition','Using VARCHAR(40) instead allows a longer name; it still inserts no account.']])],
    check:['What changes if VARCHAR(25) becomes VARCHAR(40), and how many account records are created?','The maximum name length changes from 25 to 40 characters. The statement creates zero records.'],misconception:'A number inside VARCHAR brackets is a field-length limit, not a number of records.',
  }),
  'S8.09-DATABASE': entry(['CREATE DATABASE names a database container; table creation and population are separate steps.','Select the database in the DBMS interface before defining its tables.'],['Create the container','Choose its context'],[
    p('After CREATE DATABASE SchoolLibrary, the named database exists without the Tutor or Student tables in this example. After defining those tables, both initially have zero records. After inserting tutor 7 and student 21, the database has actual related data. These are three distinct states.','Count objects and records separately'),
    p('SQL products differ in how a database is selected and in some supported statements. Use the syllabus form for the requested definition and the local DBMS interface to choose its context; do not treat an interface selection command as universal SQL.','Keep product details separate'),
  ]),
  'S8.09-TYPES': entry(['Choose CHARACTER, VARCHAR, INTEGER, REAL, BOOLEAN, DATE or TIME from the meaning of each field.','A type describes permitted representation; it does not prove factual accuracy.'],['Choose from meaning','Build comma-separated declarations'],[
    table('Distinguish similar-looking values',['Value and purpose','Suitable type','Reason'],[['007B room code','VARCHAR(4)','Letters and leading zeroes belong to an identifier.'],['007 telephone-area code','CHARACTER(3)','A fixed three-character code; not arithmetic 7.'],['7 pupils','INTEGER','A whole-number count.'],['7.5 hours','REAL','A quantity with a fractional part.'],['2028-02-29; 09:15:00','DATE; TIME','A calendar date and a time of day have different domains.']]),
    p('A name exceeding VARCHAR(40) is outside the declared limit in a DBMS enforcing that type. A syntactically valid date can still be the wrong birth date. REAL is the required fractional-number choice here, but real-number implementations may approximate some decimals; exact financial decimal types and product-specific date formats are outside this lesson.','State the limits of a type'),
  ]),
  'S8.09-PRIMARY': entry(['Declare PRIMARY KEY explicitly for the selected minimal identifier.','A composite key requires a unique, non-null combination; each component can repeat.'],['Declare the chosen identifier','Apply the composite rule'],[
    table('Independent Membership insertions; initial pairs (12, A), (12, B)',['Proposed pair','Result'],[['(13, A)','Allowed: a new combination.'],['(12, A)','Rejected: duplicates an existing pair.'],['(12, NULL)','Rejected: a primary-key component is missing.']]),
    p('PRIMARY KEY (StudentID, ClubID) declares one composite key. Declaring each field individually unique would wrongly prevent student 12 from joining both A and B. Choose the constraints that match the one-membership-per-student-per-club rule.','Avoid two separate uniqueness rules'),
  ]),
  'S8.09-FOREIGN': entry(['FOREIGN KEY identifies the local field; REFERENCES identifies the parent table and key.','Each non-null value must match the parent; repeated child references are permitted.'],['Read both sides of the declaration','Apply it to records'],[
    table('Tutor contains only TutorID 7; attempts are independent',['Student row / operation','Result'],[['New StudentID 21, TutorID 7','Allowed if the remaining values satisfy their constraints.'],['New StudentID 22, TutorID 7','Allowed: a tutor may have several students.'],['New StudentID 23, TutorID 9','Rejected: tutor 9 is absent.'],['Change student 21 from tutor 7 to 9','Rejected; the existing reference stays 7.']]),
    p('The complete Tutor/Student DDL in this lesson does not declare TutorID NOT NULL. It therefore allows a missing association where the DBMS permits NULL; the non-null school rule in Lesson 044 was a separately stated scenario constraint. To require every student to have a tutor, that additional requirement must be declared too.','Read only the constraints actually supplied'),
  ]),
  'S8.09-ALTER': entry(['ALTER TABLE can add a field or a primary/foreign-key constraint to an existing table.','Adding a constraint requires existing data to satisfy it; adding a field does not fill its values.'],['Extend a definition','Separate the field from its value'],[
    table('Add nullable Email to existing records',['StudentID','StudentName','Email afterwards'],[[21,'Amina','NULL'],[22,'Ben','NULL']]),
    p('For the next independent example, Tutor(TutorID INTEGER, TutorName VARCHAR(40)) and Student(StudentID INTEGER, TutorID INTEGER) already exist without the two constraints being added. Tutor contains (7, Jo), Student contains (21, 7). TutorID values in Tutor are distinct and non-null; every student tutor reference matches.','Prepare to add constraints to existing tables'),
  ],{appendExamples:[worked('Add keys after the tables already exist',[['Prerequisite','Use the separate unconstrained Tutor/Student tables and records stated above, not the earlier tables whose keys are already declared.'],['Add the parent key, then the child reference',ddl.addConstraints],['Final structure and data','Tutor.TutorID is now the primary key and Student.TutorID a foreign key. The records remain Tutor(7, Jo) and Student(21, 7).'],['Check an invalid starting state','If Student instead contained (21, 9) while only tutor 7 existed, adding the foreign-key constraint would fail until the data or intended relationship was corrected.']])],check:['Student.TutorID exists but has no reference constraint. Tutor.TutorID is already the primary key. Write the statement that adds the link.','ALTER TABLE Student ADD FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID);']}),
});

Object.assign(teaching, {
  'S8.10-SELECT': entry(['SELECT names result columns and FROM names their source.','A query result leaves stored records unchanged; request ordering explicitly when it matters.'],['Choose columns and source','Read the result'],[
    table('Library Member: the complete starting data',db.library.tables[0].headers,db.library.tables[0].rows),
    p('SELECT MemberName FROM Member; returns four name values. SELECT * FROM Member; requests all three columns. The stored Member rows are unchanged in both cases. A selected column need not uniquely identify people: if two members share a name, the result can contain that name twice. The next units add conditions and ordering.','Separate projection from record identity'),
    p('SQL keywords identify operations; table and field names identify database objects. A text value such as \'Asha\' uses single quotes. Do not quote MemberName as a string when the task requires values from that field. AS LoanCount later labels a calculated result column; it does not add a field to Loan.','Read names, literals and aliases'),
  ],{examples:[worked('Retrieve one column before adding ordering',[['Initial data','Use all four Member rows above.'],['SQL','SELECT MemberName FROM Member;'],['Result','Asha, Ben, Chen and Dara each occur once. No order is guaranteed by this statement. The Member table still contains all four original rows.']])]}),
  'S8.10-WHERE': entry(['WHERE keeps rows whose condition is true; AND requires both tests and OR at least one.','Use parentheses to express intended mixed conditions, and quote text literals.'],['Filter the supplied records','Combine conditions'],[
    table('Library Loan: reset to this data for each query',db.library.tables[1].headers,db.library.tables[1].rows),
    table('Evaluate the main AND condition row by row',['LoanID','Returned = FALSE','Fee >= 3','Both true?'],[[201,'TRUE','FALSE','No'],[202,'FALSE','TRUE','No'],[203,'TRUE','TRUE','Yes'],[204,'FALSE','FALSE','No'],[205,'TRUE','TRUE','Yes']]),
    p('Replacing AND with OR admits a row when either test is true: IDs 201, 202, 203 and 205 qualify. Comparisons include =, <>, <, >, <= and >=. With Fee > 6 no row qualifies; that is an empty result, not a row of zeroes. For Book.Category = \'Fiction\', the quotes distinguish the requested category value from a field name.','Vary the condition'),
    table('Mixed AND/OR conditions on the same Loan records',['Condition after WHERE','Qualifying LoanIDs','Reason'],[['(MemberID = 1 OR MemberID = 2) AND Returned = FALSE','201, 203, 205','Both members are restricted to unreturned loans.'],['MemberID = 1 OR MemberID = 2 AND Returned = FALSE','201, 202, 203, 205','AND binds more tightly: every member 1 loan qualifies, including returned loan 202.']]),
    p('The examples display qualifying IDs in ID order for checking. ORDER BY, taught next, is what requests that order in a full SQL query. WHERE itself chooses rows and does not sort them.','Separate filtering from ordering'),
  ],{check:['Using the Loan records, which extra LoanID appears if the parentheses are removed from (MemberID = 1 OR MemberID = 2) AND Returned = FALSE? Explain.','LoanID 202 appears. AND binds to the MemberID = 2 branch, so every MemberID 1 row now qualifies, even when Returned is TRUE.']}),
  'S8.10-ORDER': entry(['ORDER BY sorts the returned rows; ASC is ascending and DESC descending.','Later sort fields break ties in earlier fields; they do not independently re-sort the entire result.'],['Specify an ordering','Resolve ties'],[
    p('The main Loan example has no equal fees, so its second field does not affect the visible order. Use the separate Charge data below to see a real tie. ORDER BY Fee DESC alone puts fee 6 first, but does not determine the relative order of the two fee-3 records.','Choose data that exercises the rule'),
    table('Separate Charge starting data',db.sortTies.tables[0].headers,db.sortTies.tables[0].rows),
  ],{appendExamples:[query('sortTies','Break a real tie','Use only the three Charge records. Fee DESC puts record 2 first; ChargeID DESC then puts 3 before 1 within fee 3.')],check:['For Charge(1,3), (2,6), (3,3), what ID order follows ORDER BY Fee DESC, ChargeID ASC?','2, 1, 3. Fee 6 comes before fee 3, and IDs 1 then 3 break the equal-fee tie.']}),
  'S8.10-AGGREGATES': entry(['SUM adds known numeric values, COUNT(*) counts rows and AVG divides the known-value total by its count.','COUNT(field) excludes NULL values; zero is a known value and is included.'],['Calculate one overall result','Choose the correct denominator'],[
    table('Trace the separate FeeSample input',['Row','Fee','Included in COUNT(*)?','Included in COUNT(Fee) / AVG?'],[[1,2,'Yes','Yes'],[2,'NULL','Yes','No'],[3,4,'Yes','Yes']]),
    p('FeeSample has three rows but two known fees. Its known total is 2 + 4 = 6; AVG(Fee) is 6 / 2 = 3. Replacing NULL with 0 changes the known-value count to three and the mean to 2, while the total remains 6. AS Mean names the result column without changing FeeSample.','Explain the missing-value effect'),
  ],{appendExamples:[query('nullAggregate','Calculate with a missing fee','FeeSample is a separate one-column table containing exactly 2, NULL and 4, as shown above.')],extensions:[extension('Aggregating an empty set','With the initial Loan data, WHERE Fee > 6 selects no rows. Without GROUP BY, SELECT COUNT(*), SUM(Fee), AVG(Fee) still returns one aggregate row: 0, NULL, NULL. No known-value total or mean is available. A grouped query over the empty set has no groups and returns no rows. This distinction explains an edge case; subqueries and further aggregate functions are not required.')]}),
  'S8.10-GROUP': entry(['GROUP BY forms sets with equal grouping values and aggregates within each set.','Group selected non-aggregate fields; ORDER BY arranges the resulting groups separately.'],['Create the groups','Calculate one row per group'],[
    table('Partition the five Loan rows',['MemberID group','LoanIDs','Fees','COUNT(*)','SUM(Fee)','AVG(Fee)'],[[1,'201, 202','2, 4',2,6,3],[2,'203, 205','6, 3',2,9,4.5],[3,'204','0',1,0,0]]),
    p('Without GROUP BY, the same five rows give one overall count of 5. With GROUP BY MemberID, the result has three groups with counts 2, 2 and 1. GROUP BY Returned would form different groups because its grouping values express a different question.','Contrast grouping choices'),
    p('Do not select LoanID alongside COUNT(*) while grouping only by MemberID: member 1 has IDs 201 and 202, so no single LoanID describes its group. Select the grouping fields and calculated values. A member with no Loan rows is not a zero-sized group in this table; there is no row to place into such a group.','Explain an invalid selection'),
  ]),
  'S8.10-JOIN': entry(['INNER JOIN returns matching pairs under ON; one parent can contribute several result rows or none.','Combine row matching, filtering, grouping, aggregates and ordering in their appropriate roles, using at most two tables.'],['Match the two tables','Count pairs, not just parents'],[
    table('Complete joined rows before filtering',['MemberID','MemberName','LoanID','Fee','Returned'],joinedLoans),
    p('Member.MemberID and Loan.MemberID are qualified field names: the prefix identifies the table containing the field. Match these related identifiers in ON. Comparing Member.MemberID with Loan.LoanID would compare different kinds of identifier, even if a coincidental number happened to match. Dara has no matching Loan, so she produces no joined pair.','Choose the relationship deliberately'),
    p('The combined task is: for each member with unreturned loans, return the name, number of those loans, total fee and mean fee, with the largest total first. Start again from the original four Member and five Loan rows. First match the tables, then keep unreturned loans, then group by the member identity and name. This is a logical explanation of the result; an optimiser may execute a different physical plan.','Build one complete combined query'),
    table('After WHERE Loan.Returned = FALSE',['MemberID','MemberName','LoanID','Fee','Returned'],outstandingLoans),
    table('Calculate the two groups before sorting',['MemberID','MemberName','COUNT(*)','SUM(Fee)','AVG(Fee)'],[[1,'Asha',1,2,2],[2,'Ben',2,9,4.5]]),
    p('Grouping by MemberID as well as MemberName keeps two different people named Asha separate. The name is output information, not a guaranteed unique identifier. The grouped table is then ordered by decreasing total fee; MemberID ASC supplies a tie rule if totals are equal.','Preserve identity through grouping'),
  ],{appendExamples:[query('combined','Complete two-table query and exact result','Use the original Member and Loan data and the intermediate rows above. No maintenance example has changed this input.')],support:[visual('sql-query-stages.svg')],extensions:[extension('Two members with the same name','Add a separate member (5, Asha, TRUE) and loan (206, 5, 4, FALSE) to a fresh copy of the library data. Grouping by MemberID and MemberName produces separate unreturned counts for (1, Asha): 1, (2, Ben): 2 and (5, Asha): 1. Grouping by name alone would merge the two Ashas into one count of 2. No additional join type is needed.')]}),
  'S8.11-INSERT': entry(['INSERT INTO supplies values in the same order as its named fields.','A new row must satisfy existing keys, references and field constraints.'],['Match each value to a field','Check the new record'],[
    table('Full Member state after this insertion',['MemberID','MemberName','Active'],[[1,'Asha','TRUE'],[2,'Ben','TRUE'],[3,'Chen','FALSE'],[4,'Dara','TRUE'],[5,'Elena','TRUE']]),
    p('This example starts from the original library data. An alternative field order is valid only if the values move with their fields: naming MemberName, Active, MemberID requires values \'Elena\', TRUE, 5. The five Loan records are unchanged. Repeating the insertion fails because MemberID 5 already exists; it is not an instruction to replace Elena.','Verify matching and unchanged data'),
  ]),
  'S8.11-DELETE': entry(['DELETE FROM removes whole rows selected by WHERE; the table definition remains.','Check target identities and foreign-key restrictions before deletion.'],['Identify target rows','Verify the remaining records'],[
    p('Reset to the original five Loan rows before this example. Deleting LoanID 204 leaves 201, 202, 203 and 205, with every field in those four records unchanged. The Member records also remain. Deleting WHERE LoanID = 999 would match no rows and leave the database unchanged.','State the reset and no-match result'),
    table('Same initial data, different deletion condition',['Condition','Target LoanIDs'],[['WHERE LoanID = 201','201'],['WHERE MemberID = 1','201, 202'],['No WHERE clause','201, 202, 203, 204, 205, subject to constraints']]),
  ]),
  'S8.11-UPDATE': entry(['UPDATE names the table, SET assigns values and WHERE chooses existing rows.','Verify changed fields, unchanged fields and unaffected rows; a no-match update does not insert a row.'],['Specify replacements and targets','Check the resulting state'],[
    p('Reset to the original library data before the main update. Loan 203 changes from (203, 2, 6, FALSE) to (203, 2, 6, TRUE). Loans 201, 202, 204 and 205 retain all their fields. A missing WHERE would target every Loan record; WHERE MemberID = 2 would target both 203 and 205.','Follow identity and scope'),
    p('For a separate update, suppose returning loan 203 also waives its fee. SET can assign Returned = TRUE, Fee = 0 in one statement. The target becomes (203, 2, 0, TRUE); its identity and member stay unchanged and every other row remains as before.','Change two fields in one target'),
  ],{appendExamples:[worked('Update two fields from a fresh starting copy',[['Initial record','Loan 203 is (203, 2, 6, FALSE); all other records are the original library rows.'],['SQL',sql.multiUpdate.sql],['Final check','Loan 203 is (203, 2, 0, TRUE). MemberID stays 2; loan 205 remains (205, 2, 3, FALSE).']])],check:['Stock initially contains only (30, Cable, 6) and (31, Adapter, 2). What is its final state after UPDATE Stock SET Quantity = 8 WHERE StockID = 99?','Both original records remain unchanged. No record matches 99, and UPDATE does not create one.']}),
});

const order = {
  5:['S8.08-READ','S8.09-DATABASE','S8.09-TYPES','S8.09-PRIMARY','S8.09-FOREIGN','S8.09-ALTER'],
  6:['S8.10-SELECT','S8.10-WHERE','S8.10-ORDER','S8.10-AGGREGATES','S8.10-GROUP','S8.10-JOIN','S8.11-INSERT','S8.11-DELETE','S8.11-UPDATE'],
};
const stages = {
  1:['Connect each file limitation to a specific relational response.','Choose keys from stated rules, then read cardinalities in both directions.','Trace accepted and rejected references; explain the index trade-off.'],
  2:['Model the entities and business rules before inspecting dependencies.','Trace the complete UNF → 1NF → 2NF → 3NF example, including each anomaly.','Reconstruct all original rows and diagnose a different design independently.'],
  3:['Connect a model, logical schema and dictionary using the school example.','Trace permission and integrity decisions, then restore the stated backup records.','Separate building a form or report from processing its requests.'],
  4:['Classify each change by its effect on the structure or stored records.','Follow the concrete DDL/DML lifecycle; SQL syntax is developed in the next two lessons.'],
  5:['Read a small definition; create the database and select the seven field types.','Define parent and child keys, then explain the permitted and rejected records.','Add a field or constraint to an existing table and check the before/after state.'],
  6:['Stage 1 · Retrieve: SELECT → WHERE → ORDER BY; trace conditions and actual ties.','Stage 2 · Summarise: aggregates → GROUP BY → INNER JOIN; complete the combined two-table query.','Stage 3 · Maintain: INSERT → DELETE → UPDATE. Teaching examples reset their input; the Stock practice explicitly continues through all three operations.'],
};

export function enhanceSection8Teaching(lesson,number) {
  let units=lesson.units.map(unit=>{
    const spec=teaching[unit.unitKey];
    if(!spec) throw new Error('Missing Section 8 teaching: '+unit.unitKey);
    const original=unit.materials??[];
    const visuals=spec.lead?[spec.lead]:original.filter(m=>m.type==='reviewed-visual');
    const examples=[...(spec.examples??original.filter(m=>m.type==='worked-example')),...(spec.appendExamples??[])];
    const retained=spec.lead?[]:original.filter(m=>m.preserve&&m.type==='table'&&!['S8.10-SELECT','S8.10-WHERE'].includes(unit.unitKey));
    const materials=[...visuals,...examples,...retained,...(spec.support??[])];
    return {...unit,heading:spec.heading??unit.heading,explanation:spec.essentials,coreBlocks:undefined,
      teachingBlocks:spec.detail??[...unit.explanation.map((text,i)=>p(text,spec.titles[i])),...spec.blocks],
      preserveSelectedVisual:true,preserveTeachingSteps:true,useAuthoredVisual:true,
      materials:materials.map(m=>({...m,objectiveIds:unit.objectiveIds,preserve:m!==examples[0]})),
      ...(spec.check?{checkpoint:{prompt:spec.check[0],answer:spec.check[1]}}:{}),
      ...(spec.misconception?{misconceptions:[spec.misconception]}:{}),extensions:spec.extensions??[],
    };
  });
  if(order[number]) units.sort((a,b)=>order[number].indexOf(a.unitKey)-order[number].indexOf(b.unitKey));
  return enhanceSection8Questions({...lesson,units,teachingCheckpoints:stages[number],
    ...(number===5?{subtitle:'Read and write table definitions, select data types, declare keys and alter existing structure.'}:{}),
  },number);
}

export function enhanceSection8Review(lesson) {
  return {...lesson,units:lesson.units.map(unit=>unit.unitKey!=='REVIEW-S8'?unit:{...unit,coreBlocks:undefined,preserveSelectedVisual:true,preserveTeachingSteps:true,
    explanation:['Use business rules to choose keys and dependencies, then preserve references through normalisation.','Connect DBMS controls to exact operations; trace DDL structure and DML results against supplied data.'],
    teachingBlocks:[p('Identify which entity owns each fact. Test candidate keys against the permitted records, not only a convenient sample. For normalisation, state the repeating group or dependency, decompose it, then match retained identifiers to recover the original facts. A positive 3NF verdict needs reasons as well as a rejected example.','Reconstruct a design argument'),p('Separate metadata from records, permissions from integrity and backup state from later changes. A logical schema is the definition being represented; the dictionary records its metadata. A developer interface builds objects, while the query processor handles requests for their use.','Choose the responsible facility'),p('For SQL, first decide whether structure or records must change. Read each DDL type and key explicitly. For a combined query, match two tables, filter rows, form groups, calculate and order results. Verify which stored records remain unchanged after a maintenance statement.','Apply the full SQL method'),table('Starting Member data for the worked query',db.library.tables[0].headers,db.library.tables[0].rows),table('Starting Loan data for the worked query',db.library.tables[1].headers,db.library.tables[1].rows)],
  }),practice:[...lesson.practice,...section8ReviewQuestions]};
}
