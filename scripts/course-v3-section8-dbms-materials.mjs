import {material,ids,table,figure,pair,panel,flow,note,check,code,workbench} from './course-v3-section8-material-helpers.mjs';
import {sqlExamples} from './course-v3-section8-dbms-data.mjs';
const features = [
  material('s8-dbms-tour','Features of the Library DBMS',
    '<p>The <strong>database</strong> is the stored collection of tables, records and associated definitions. The <strong>database management system (DBMS)</strong> is the software used to define, organise, retrieve, maintain and protect that data. It accepts requests, checks them and manages the resulting state.</p>' +
    table('DBMS features and their functions',['Panel','Function'],[
      ['Data','The five related tables and their current records.'],
      ['Model & schema','The logical structure, keys and declared references.'],
      ['Data dictionary','Metadata describing attributes, types, lengths and constraints.'],
      ['Integrity','Operations accepted or rejected according to declared rules.'],
      ['Users & groups','The access rights of the selected simulated user and their groups.'],
      ['Backup & recovery','A saved database state and its restoration.'],
      ['Developer & SQL','Requests, execution results and the query-processing explanation.'],
    ]) + workbench('data','default','Open the shared Library DBMS') +
    note('The examples use the same database workspace. Changing section preserves its records. “Load this example” places the SQL in the editor; running the statement may change the database. Restore the initial data before comparing independent operations.', 'Using the Library DBMS') +
    '<p>The operations run in a PostgreSQL engine in your browser. Simulated users demonstrate operations under different access rights. Saved progress remains in this browser on this site.</p>' +
    check('A librarian enters a new borrowing record. Identify the data being stored and describe the role of the DBMS.', 'The new Loan row is part of the database. The DBMS processes the request, checks types, keys, references and rights, and stores the row if it is valid.'),
    ['S8.05-DICTIONARY'],ids(5,1)),
  material('s8-model-schema','Data modelling and the logical schema',
    '<p><strong>Data modelling</strong> identifies the entities, attributes and relationships required by a system. A <strong>logical schema</strong> describes the conceptual design of a database independently of a particular DBMS. It specifies how the data is organised and how the entities or tables are related. This design can then be implemented using the facilities of a chosen DBMS.</p>' +
    figure(flow([['Identify the business requirements','A Book can have several Copies. Each Loan concerns one Member and one Copy.'],['Create the data model','Represent the entities, attributes, keys and cardinalities in an E-R diagram.'],['Define the logical schema','Specify the entities or tables, their attributes, keys and relationships independently of a particular DBMS.'],['Implement the schema','Use the chosen DBMS to create table definitions with supported data types and constraints.']]),'The logical schema is the DBMS-independent design. The SQL data types and constraint declarations below show how this design is implemented in the workbench.') +
    table('PostgreSQL definitions implementing part of the logical schema',['Table','Attribute definitions','Keys / relationship'],[
      ['Member','MemberID INTEGER; MemberName VARCHAR(40); SchoolEmail VARCHAR(80); TutorGroup VARCHAR(4); Active BOOLEAN','MemberID PK; SchoolEmail UNIQUE and NOT NULL'],
      ['Copy','CopyID INTEGER; BookID INTEGER; ShelfCode VARCHAR(8)','CopyID PK; BookID FK → Book.BookID'],
      ['Loan','LoanID INTEGER; MemberID INTEGER; CopyID INTEGER; BorrowDate DATE; BorrowTime TIME; Fee REAL; Returned BOOLEAN','LoanID PK; MemberID and CopyID mandatory FKs'],
    ]) + workbench('schema') +
    '<p>A changed member name is a data change: the definition of MemberName stays the same. Adding a new Note attribute changes the schema. The model should be checked against real events before implementation; the DBMS’s structure tools then create and inspect the chosen definitions.</p>' +
    check('Explain whether adding a valid Loan record changes the cardinality of the Member–Loan relationship.', 'The cardinality remains one-to-many because the existing relationship already permits several loans per member. A change to the business requirements may require a change to the model.'),
    ['S8.05-MODELLING','S8.05-SCHEMA'],ids(5,2,3)),
  material('s8-live-dictionary','The DBMS maintains a data dictionary',
    '<p>A <strong>data dictionary</strong> stores metadata: data describing the database’s data and structure. It can record table and attribute names, data types, lengths, required values, keys, references, validation constraints and permissions. The Member and Loan records contain the data described by this metadata.</p>' +
    table('Metadata and stored data',['Observation','Classification','Example'],[
      ['MemberName is VARCHAR(40)','Metadata','The column accepts text of up to 40 characters.'],
      ['MemberName contains Asha','Data','Asha is a value in a particular record.'],
      ['Loan.MemberID references Member.MemberID','Metadata','A relationship the DBMS must check.'],
      ['Loan 201 belongs to MemberID 1','Data','Data about one borrowing event.'],
    ]) + code(sqlExamples['dictionary-add-note'].sql) +
    '<p>State the expected change before running the statement. The data dictionary gains an entry for Note with type VARCHAR(80); this definition permits NULL. The four existing Member records remain, with no Note value supplied. Updating a Note value later does not change the column definition.</p>' + workbench('dictionary','dictionary-add-note','Add Note and inspect the dictionary') +
    note('The DBMS updates the metadata when the table definition changes. The dictionary view displays this metadata. If Note already exists, a second attempt to add the same column is rejected.', 'Maintaining the data dictionary') +
    check('Explain how the DBMS uses the data dictionary when processing a request for MemberName.', 'It can check that MemberName exists in the named table, determine its type and associated constraints, and use the stored structure information while planning and executing the request.'),
    ['S8.05-DICTIONARY'],ids(5,1)),
  material('s8-dbms-integrity','Maintaining data integrity',
    table('Constraints used to maintain data integrity',['Constraint','Library rule','Rejected example'],[
      ['Data type / size','CardCode is CHARACTER(6)','A seven-character card code.'],
      ['PRIMARY KEY','Every MemberID is unique and present','A second member with MemberID 1.'],
      ['UNIQUE and NOT NULL','Each member has a unique, present SchoolEmail','A duplicate email or missing email.'],
      ['FOREIGN KEY','Every Loan member exists','MemberID 99 when no such Member exists.'],
      ['CHECK','Fee must be zero or positive','A fee of −2.'],
    ]) +
    '<p><strong>Data integrity</strong> concerns maintaining the validity and consistency of stored data. The DBMS checks declared constraints when changes are attempted. If a statement violates a constraint, the DBMS rejects that statement and its changes are not applied.</p>' +
    workbench('integrity','integrity-duplicate','Test a duplicate primary key') + workbench('integrity','integrity-orphan','Test an invalid foreign key') +
    note('A value can satisfy a constraint and still be incorrect. For example, an existing MemberID may identify the wrong borrower. Verification is needed to check that entered data matches its source.', 'Constraints and accuracy') +
    check('Explain why an insertion referring to MemberID 99 is still rejected when the user has permission to insert records.', 'Permission allows the user to attempt the insertion, but MemberID 99 does not exist in Member. The foreign-key constraint rejects the invalid reference.'),
    ['S8.05-INTEGRITY'],ids(5,4)),
  material('s8-dbms-rights','Access rights for individuals and groups',
    '<p><strong>Access rights</strong> specify which operations a user may perform on which database objects. Assigning rights to a group makes it easier to manage people who need the same access. An individual can also receive a direct grant without giving that right to every member of their group.</p>' +
    table('Users, groups and initial access rights',['User','Group / role','Initial rights'],[
      ['Student','library_readers','Read the library tables; cannot insert, update or delete.'],
      ['Librarian','library_writers','Read and maintain library records.'],
      ['Administrator','Database owner','Manage definitions, roles, grants and the database.'],
    ]) +
    figure(flow([['Choose Student','The selected identity inherits SELECT from library_readers.'],['Execute a SELECT statement','The request to list members is permitted.'],['Execute an UPDATE statement','The DBMS denies the request to update loan 203.'],['Choose Librarian','The same valid update succeeds through the writer group’s rights.']]),'Only the selected identity changes; the request and data constraints can remain identical.') +
    workbench('users','security-read','Inspect users, groups and rights') + workbench('sql','security-write','Compare the same update under two users') +
    '<p>Grant an operation directly to Student using the individual-rights control, then revoke it and repeat the operation. Compare the result with granting the right to the group: members inherit the rights assigned to their group. Access rights should permit the operations required by each user’s role.</p>' +
    check('Explain one advantage of assigning SELECT access to a group of users.', 'Adding a user to the group gives the common access without repeating each grant. Changing the group’s rights updates the shared policy. A direct individual grant can provide additional access for a particular user.'),
    ['S8.05-SECURITY'],ids(5,5)),
  material('s8-dbms-backup','Backup and recovery procedures',
    '<p>A <strong>backup</strong> is a saved copy used to recover the database after loss, damage or an unwanted change. A backup procedure specifies the data to copy, the backup schedule, the storage location, access rights and the method used to test restoration.</p>' +
    table('Database state during backup and recovery',['Moment','Action','Loan 203'],[
      ['T0','Start from the teaching data','Returned FALSE; Fee 6'],
      ['T1','Create a backup','Backup contains FALSE and 6'],
      ['T2','Record the return and waive the fee','Current data becomes TRUE and 0'],
      ['T3','Restore the T1 backup','Current data returns to FALSE and 6'],
    ]) + workbench('backup','backup-change','Run the backup and restore sequence') +
    '<p>Check the date and time of the backup before restoring it. This operation replaces the current database with its earlier state, so changes after that point are lost from the restored state. The workbench backup includes the schema, records and roles. Its separate automatic progress save helps you continue across pages; it is not a substitute for an independent recovery copy.</p>' +
    table('Requirements of a backup procedure',['Decision','Purpose'],[
      ['Schedule backups according to acceptable data loss','More recent copies reduce the amount of work lost after a failure.'],
      ['Keep protected copies away from the original failure location','A fault or theft affecting the original should not destroy every copy.'],
      ['Restrict access and protect stored copies','Backups contain data that still requires access control.'],
      ['Retain suitable earlier versions','A newly discovered problem may already exist in the latest copy.'],
      ['Test restoration','Verify that the database can be restored from the backup.'],
    ]) +
    note('The demonstration backup is stored in the browser workspace. An operational backup procedure should use independent storage and test restoration. Recovering changes made after a backup requires an additional recovery source, such as a transaction log.', 'Scope of the backup demonstration') +
    check('A backup is made at 09:00 and a failure occurs at 11:00. Describe the data recovered when only the 09:00 backup is restored.', 'The database is restored to the state recorded in the 09:00 backup. Changes made between 09:00 and 11:00 are not recovered from that backup.'),
    ['S8.05-BACKUP'],ids(5,6)),
];
const interfaces = [
  material('s8-developer-interface','Use and purpose of the developer interface',
    figure(pair(panel('Developer interface','<p>Tools for defining and editing database objects, writing and testing queries, and constructing forms or reports that applications and users will use.</p>'),panel('Application / user task','<p>A librarian uses a prepared return-loan operation or a report of outstanding loans without designing the underlying table each time.</p>')),'The interface is how a developer issues and organises requests. The query processor is the DBMS component that carries them out.') +
    '<p>The table and schema views, SQL editor, example controls and result viewer provide a simplified developer interface in this simulation. A developer can test a statement, inspect an error, correct it and verify the result. A DBMS may also provide tools for designing forms and reports.</p>' +
    table('Developer interface facilities',['Task','Interface facility','Outcome'],[
      ['Define Member and its key','Table-definition editor or SQL editor','The DBMS creates a table definition.'],
      ['Find outstanding loans','Query editor and result grid','Test which records the request returns.'],
      ['Create a form for recording a return','Develop a form or prepared operation','Users supply the relevant loan and request the update.'],
      ['Present a weekly total','Report designer or saved query','Format retrieved summaries for the intended audience.'],
    ]) + workbench('sql','select','Inspect the developer workspace') +
    check('Identify the component that provides the query editor and the component that processes the SQL statement.', 'The developer interface provides the editor and execution control. The query processor within the DBMS checks, plans and executes the request and returns its outcome.'),
    ['S8.06-DEVELOPER'],ids(6,1)),
  material('s8-query-processor','Use and purpose of the query processor',
    code(sqlExamples.select.sql) +
    figure(flow([['Receive and check the statement','Check the syntax and resolve the names of tables and attributes using metadata; check the user’s access rights.'],['Generate an execution plan','Select a method for accessing and combining the required records, using available indexes where appropriate.'],['Execute','Read matching data, perform the requested operations and enforce applicable rules.'],['Return the outcome','Send the result records or a meaningful error back to the interface.']]),'The diagram summarises the main functions of a query processor. The displayed execution plan is produced by the database engine.') +
    table('Expected result on the initial data',['MemberID','MemberName'],[[1,'Asha'],[2,'Ben'],[3,'Chen'],[4,'Dara']]) +
    '<p>The <strong>query processor</strong> interprets a query, checks it against the database definitions and access rights, determines an execution plan and executes the query. The execution plan may use an index to locate the required records.</p>' + workbench('sql','select','Inspect SQL and a real execution plan') +
    note('EXPLAIN displays the execution plan selected by the DBMS. For a small table, the plan may use a sequential scan. The presence of an index does not mean that the DBMS will use it for every query.', 'Interpreting an execution plan') +
    check('Explain why a statement with valid SQL keywords can be rejected when an attribute name is misspelled.', 'The syntax can be recognisable while a named attribute is absent from the schema. The processor must resolve the statement’s names against metadata before it can retrieve the requested values.'),
    ['S8.06-PROCESSOR'],ids(6,2)),
];
export const section8DbmsMaterials = {'8.2.1':features,'8.2.2':interfaces};
