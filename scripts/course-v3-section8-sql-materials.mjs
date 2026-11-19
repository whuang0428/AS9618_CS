import {material,ids,table,figure,pair,panel,flow,note,check,code,workbench} from './course-v3-section8-material-helpers.mjs';
import {libraryTables,libraryDefinitionSql,libraryInsertSql,sqlExamples} from './course-v3-section8-dbms-data.mjs';
const sample = id => {const item=sqlExamples[id];if(!item)throw new Error(`Missing shared SQL example ${id}`);return code(item.sql)+(item.expected ? table('Expected result for the initial data',item.expected.headers,item.expected.rows) : '')+workbench('sql',id,'Execute or modify the SQL statement');};
const sourceTable = name => {const t=libraryTables.find(t=>t.title===name);return table(`Starting ${name} records`,t.headers,t.rows);};
const ddl = [
  material('s8-ddl-purpose','Data Definition Language (DDL)',
    '<p><strong>Data Definition Language (DDL)</strong> is used to create and modify the structure of a database. A table definition states which attributes exist, their types and their constraints. The DBMS maintains this definition and uses it when accepting data.</p>' +
    figure(pair(panel('Before','<p>Member has MemberID, MemberName, SchoolEmail, TutorGroup and Active.</p>'),panel('After ADD Note','<p>The same Member table also permits a Note of up to 80 characters. Existing members are still present.</p>')),'The new attribute changes the schema. It does not by itself add a member or write a note for any member.') +
    sample('alter-column') +
    table('DDL and its effect',['Statement','What changes'],[['CREATE DATABASE LibraryBuild','Creates a separate named database.'],['CREATE TABLE Loan (...)','Defines a table and the attributes / constraints in it.'],['ALTER TABLE Member ADD Note VARCHAR(80)','Changes an existing table definition.']]) +
    check('Explain why adding a Note attribute uses DDL, whereas changing a stored member name uses DML.', 'Adding a column changes which attributes the table has: DDL. Changing a name replaces one stored field value within the existing definition: DML.'),
    ['S8.07-DDL'],ids(7,1)),
];
const dml = [
  material('s8-dml-purpose','Data Manipulation Language (DML)',
    '<p><strong>Data Manipulation Language (DML)</strong> is used to query and maintain the data in a database. Its operations include retrieving, inserting, updating and deleting records.</p>' +
    table('Four data operations',['Command','Request in this library','Effect on stored records'],[
      ['SELECT','Show member names','Produces a result without changing the stored Member rows.'],
      ['INSERT INTO','Register Elena','Adds one new Member record.'],
      ['UPDATE','Record the return of loan 203','Changes selected values in an existing Loan record.'],
      ['DELETE FROM','Remove loan 204 when explicitly required','Removes the complete selected Loan record.'],
    ]) + sample('select') +
    note('SELECT returns a result table without creating a stored table definition. DELETE removes records while retaining the table definition and its constraints.', 'Effect on the database') +
    check('Identify the DML operation required to record that loan 203 has been returned while retaining the borrowing record.', 'UPDATE is required to change its Returned value. DELETE would remove the borrowing record.'),
    ['S8.07-DML'],ids(7,2)),
];
const sql = [
  material('s8-sql-language','Structured Query Language (SQL)',
    figure(flow([['Developer or application','Express the required operation as a statement.'],['SQL','Structured Query Language: an industry-standard language used for DDL and DML.'],['DDL or DML role','Choose according to whether the statement changes structure or works with records.'],['DBMS','Check and execute the request, then return records, a completion result or an error.']]),'SQL is the language; the DBMS is the managing software; DDL and DML describe categories of statements.') +
    table('Classification of SQL statements',['SQL statement','Category','Reason'],[
      ['CREATE TABLE Book (...)','DDL','Defines a new table structure.'],
      ['ALTER TABLE Member ADD Note VARCHAR(80)','DDL','Adds an attribute to a definition.'],
      ["UPDATE Member SET MemberName = 'Asha Patel' WHERE MemberID = 1",'DML','Changes a value in a selected record.'],
      ['SELECT MemberName FROM Member','DML','Retrieves values from existing records.'],
    ]) +
    check('Explain how SQL can be used for both data definition and data manipulation.', 'SQL includes DDL statements such as CREATE TABLE and DML statements such as INSERT INTO. A script may contain both types of statement.'),
    ['S8.07-SQL'],ids(7,3)),
  material('s8-read-sql','Interpret a given SQL statement',
    code('SELECT LoanID, Fee\nFROM Loan\nWHERE Returned = FALSE AND Fee >= 3\nORDER BY LoanID;') +
    table('Purpose of each SQL clause',['Part','Meaning'],[
      ['SELECT LoanID, Fee','These two attributes form the result columns.'],
      ['FROM Loan','Use the stored Loan records.'],
      ['Returned = FALSE AND Fee >= 3','A row must satisfy both conditions. Exactly 3 is included.'],
      ['ORDER BY LoanID','Arrange the qualifying result rows by increasing identifier.'],
    ]) +
    '<p>Names such as LoanID identify database objects. Values such as 3 and FALSE are literals. Text values use single quotes: <code>MemberName = \'Asha\'</code>. The semicolon terminates the statement. Parentheses can make the intended grouping of conditions explicit.</p>' +
    table('Predicted result',['LoanID','Fee'],[[203,6],[205,3]]) + workbench('sql','where','Check the prediction in the DBMS') +
    check('State the effect on the result of replacing >= 3 with > 3. State the effect of replacing AND with OR in the original statement.', 'With > 3, loan 205 is excluded and only 203 qualifies. With OR in the original statement, a row needs either condition, so loans 201, 202, 203 and 205 qualify. Loan 204 satisfies neither.'),
    ['S8.08-READ'],ids(8,1,2)),
];
const definitions = [
  material('s8-create-database','Create a database',
    '<p>Use Administrator for definition work. The existing SchoolLibrary database contains the shared demonstration records. Build the same design in a separate <strong>LibraryBuild</strong> database so that the working example remains available.</p>' + code(sqlExamples['create-database'].sql) +
    figure(flow([['Run CREATE DATABASE','A new database named librarybuild appears in the database list.'],['Check the current connection','Creating the database does not automatically connect to it.'],['Select librarybuild and Connect','Subsequent table definitions now apply to this database.'],['Inspect its tables','The new database has no library tables until you create them.']]),'PostgreSQL folds these unquoted identifiers to lower case. The workbench uses one active database connection at a time.') + workbench('sql','create-database','Create LibraryBuild') +
    check('Explain why CREATE TABLE Member may return “already exists” after a new database has been created.', 'You may still be connected to SchoolLibrary, where Member already exists. Inspect the current database and explicitly connect to the intended empty database before defining its tables.'),
    ['S8.09-DATABASE'],ids(9,1)),
  material('s8-seven-types','Select appropriate SQL data types',
    table('SQL data types and example attributes',['Type','Library attribute','Meaning / example'],[
      ['CHARACTER(6)','MemberCard.CardCode','Fixed-length character field; CARD01 has six characters. CHARACTER without a length defaults to one in this engine.'],
      ['VARCHAR(40)','Member.MemberName','Variable-length text up to 40 characters; Asha.'],
      ['BOOLEAN','Member.Active / Loan.Returned','Logical TRUE or FALSE.'],
      ['INTEGER','MemberID / LoanID','Whole-number identifier; 1 or 201.'],
      ['REAL','Loan.Fee','A real-valued number; 2 or 2.5.'],
      ['DATE','Loan.BorrowDate','A calendar date; 2027-11-01.'],
      ['TIME','Loan.BorrowTime','A time of day; 09:15:00.'],
    ]) +
    '<p>In VARCHAR(n), n is the maximum permitted length; VARCHAR(40) therefore allows up to 40 characters. Select a data type according to the values an attribute must store and the operations performed on those values. A card code is text even if some characters are digits; arithmetic on its characters would not represent the business meaning. A date type lets the DBMS reject impossible dates and compare calendar values.</p>' +
    note('REAL stores approximate floating-point values. It is used for Fee in this example. The specified SQL data types are CHARACTER, VARCHAR(n), BOOLEAN, INTEGER, REAL, DATE and TIME.', 'REAL and the required data types') +
    check('Explain why VARCHAR(40) is suitable for MemberName and BOOLEAN is suitable for Returned.', 'Names vary in length and contain text, so a bounded variable-length character field fits them. Returned represents one of two logical states and should not be treated as arbitrary text.'),
    ['S8.09-TYPES'],ids(9,2)),
  material('s8-complete-table-definitions','Create table definitions with primary and foreign keys',
    '<p>After connecting to the empty LibraryBuild database, run this complete definition. Create referenced parent tables before their children: Member before MemberCard and Loan; Book before Copy; Copy before Loan.</p>' + code(libraryDefinitionSql) +
    '<p>PRIMARY KEY requires unique, non-null key values. UNIQUE NOT NULL gives SchoolEmail the independent uniqueness and presence required of its candidate-key role. REFERENCES names the parent table and referenced field. Loan’s NOT NULL references require every event to identify an existing member and copy. CHECK (Fee &gt;= 0) rejects negative fees.</p>' + workbench('sql','create-tables','Create the five library tables') +
    table('Foreign-key declarations',['Declaration','Meaning'],[
      ['MemberCard.MemberID PRIMARY KEY REFERENCES Member(MemberID)','One card row at most per member; every card refers to a Member.'],
      ['Copy.BookID REFERENCES Book(BookID)','Each stored BookID must identify a Book.'],
      ['Loan.MemberID REFERENCES Member(MemberID)','Each loan’s member reference must exist.'],
      ['Loan.CopyID REFERENCES Copy(CopyID)','Each loan’s physical copy reference must exist.'],
    ]) +
    check('Explain whether a foreign-key value may occur in more than one record in the referencing table.', 'Several Loan records may contain the same MemberID. The foreign-key constraint requires a matching referenced member; it does not by itself require unique values in Loan.MemberID.'),
    ['S8.09-TYPES','S8.09-PRIMARY','S8.09-FOREIGN'],ids(9,2,4,5)),
  material('s8-alter-definition','Modify a table definition using ALTER TABLE',
    code(sqlExamples['alter-column'].sql) +
    table('Before and after adding Note',['Aspect','Before','After'],[
      ['Member attributes','Five defined attributes','Six defined attributes, including Note.'],
      ['Existing Member records','Any records already stored in this database','The same records; adding the attribute does not insert or delete members.'],
      ['New Note values','No such attribute exists','NULL for any existing records until a value is assigned.'],
    ]) + workbench('sql','alter-column','Add Note and inspect the new structure') +
    '<p>If you are following the steps in the new LibraryBuild database, Member is still empty until the initial records are inserted. The new attribute changes the table definition and appears in the data dictionary. Use DML later to supply values. When a constraint is added to a populated table, the existing records must satisfy that constraint. Otherwise, the DBMS rejects the change.</p>' +
    check('Explain why UPDATE Member SET Note = \'New member\' cannot create a missing Note attribute.', 'UPDATE changes values in an existing attribute. ALTER TABLE is required to add the attribute before UPDATE can assign a value to it.'),
    ['S8.09-ALTER'],ids(9,3)),
  material('s8-add-keys-later','Add primary-key and foreign-key constraints',
    '<p>A table can be created with constraints immediately, as above, or have them added later. The following reading-group tables illustrate adding constraints to existing definitions.</p>' + code(sqlExamples['add-primary-key'].sql) +
    '<p>ReadingGroup initially has attributes but no declared primary key. The ALTER statement makes GroupID its primary key. Existing duplicates or NULL identifiers would cause the new constraint to be rejected.</p>' + workbench('sql','add-primary-key','Add a primary key') + code(sqlExamples['add-foreign-key'].sql) +
    '<p>ReadingGroupMember identifies a membership with the pair (GroupID, MemberID). The ALTER statement adds a reference from MemberID to Member.MemberID. This example adds that one relationship; a complete reading-group design should also declare GroupID’s reference to ReadingGroup.</p>' + workbench('sql','add-foreign-key','Add a foreign key') +
    check('Explain why MemberID is a suitable referenced key, whereas a MemberName that may repeat is not.', 'MemberID uniquely identifies a Member record. A MemberName that may repeat does not identify a unique record, so it is not suitable as the referenced key.'),
    ['S8.09-ALTER','S8.09-PRIMARY','S8.09-FOREIGN'],ids(9,3,4,5)),
  material('s8-ddl-summary','Summary of DDL operations',
    table('DDL statements and their purposes',['Task','Required SQL / action'],[
      ['Create the database','CREATE DATABASE LibraryBuild; then explicitly Connect.'],
      ['Define attributes and types','CREATE TABLE with named columns and suitable types.'],
      ['Identify records','PRIMARY KEY in CREATE TABLE or ALTER TABLE … ADD PRIMARY KEY.'],
      ['Connect related records','FOREIGN KEY (…) REFERENCES Parent(Key), or the inline REFERENCES form.'],
      ['Change the definition','ALTER TABLE … ADD an attribute or constraint.'],
      ['Verify the structure','Inspect Schema and Dictionary, including FK targets.'],
    ]) +
    '<p>The earlier complete CREATE TABLE script is the five-table DDL reference. To use the same records in your new database, populate those empty tables with the following <strong>DML</strong> script. Run it once after creating the five tables; repeating it is rejected because the primary-key values already exist.</p>' +
    `<details class="s8-choice"><summary>Show the complete five-table starter data</summary>${code(libraryInsertSql)}</details>` + workbench('sql','insert-fixture','Populate the completed LibraryBuild') +
    check('Explain why SELECT returns no records immediately after the five tables have been created.', 'The DDL statements have created the table definitions, but no records have been inserted. INSERT INTO is required to add data to the tables.'),
    ['S8.09-DATABASE','S8.09-TYPES','S8.09-ALTER','S8.09-PRIMARY','S8.09-FOREIGN'],ids(9,1,2,3,4,5)),
];
const queries = [
  material('s8-query-start','Source data for the SQL examples',
    '<p>For the following examples, use the original library data: four members and five loans. Continue in SchoolLibrary, or populate your completed LibraryBuild with the supplied records. If earlier operations changed the records, restore the initial data before comparing the result with the expected result shown.</p>' + sourceTable('Member')+sourceTable('Loan')+
    '<p>State the expected result before executing each query. Compare it with the returned records and the source tables. The editor also allows the supplied statements to be modified or a new statement to be entered.</p>'+workbench('data'),
    ['S8.10-SELECT'],ids(10,1)),
  material('s8-select','Queries using SELECT and FROM',
    '<p>The field list after SELECT determines which attributes appear in the answer. FROM names the table to read. Each qualifying source record contributes its selected values; the stored records are unchanged.</p>'+sample('select')+
    '<p>SELECT * requests all columns. Naming columns explicitly makes the intended answer clearer. The ORDER BY in this introductory example makes the displayed row order predictable; its operation is explained below. Without ORDER BY, a particular row order is not guaranteed.</p>'+
    check('Describe the effect of SELECT MemberName FROM Member on the stored data.', 'The statement retrieves member names without changing the stored data. The other stored Member columns remain present even though they are not included in the result.'),
    ['S8.10-SELECT'],ids(10,1)),
  material('s8-where','Select records using WHERE',
    '<p>WHERE decides which source rows qualify. Test the condition for each row before selecting its output fields. With AND, both conditions must hold; with OR, at least one must hold.</p>'+sample('where')+
    table('Trace the condition Returned = FALSE AND Fee >= 3',['LoanID','Not returned?','Fee >= 3?','Include?'],[[201,'Yes','No','No'],[202,'No','Yes','No'],[203,'Yes','Yes','Yes'],[204,'No','No','No'],[205,'Yes','Yes','Yes']])+
    '<p>Use = for equality, &lt;&gt; for inequality, and &lt;, &gt;, &lt;= or &gt;= for ordered comparisons. Quote text, date and time literals appropriately; write numeric and Boolean literals in their typed forms. Parentheses make combined conditions explicit.</p>'+code('WHERE (MemberID = 1 OR MemberID = 2)\n  AND Returned = FALSE')+
    check('Explain why Fee >= 3 includes loan 205 but Fee > 3 excludes it.', 'Loan 205 has fee exactly 3. The first comparison includes equality; the second requires a strictly larger value. Testing values at a boundary helps distinguish these comparison operators.'),
    ['S8.10-WHERE'],ids(10,2)),
  material('s8-order','Sort query results using ORDER BY',
    '<p>ORDER BY sorts the result, not the underlying table definition. ASC means ascending and is the default; DESC means descending. A second sort expression decides the order of rows tied on the first.</p>'+sample('order')+
    '<p>The highest fee is 6 for loan 203; the lowest is 0 for loan 204. LoanID ASC provides the secondary sort order: if two fees become equal, the smaller LoanID comes first. Sorting does not by itself remove rows.</p>'+
    check('Identify the clause required to display the highest fees first.', 'ORDER BY Fee DESC sorts the result in descending order of Fee. WHERE specifies the condition used to select records.'),
    ['S8.10-ORDER'],ids(10,3)),
  material('s8-aggregates','Aggregate functions: SUM, COUNT and AVG',
    '<p>An aggregate combines values from several rows. With no GROUP BY here, the five Loan records contribute to one summary row.</p>'+sample('aggregate')+
    table('Calculation of aggregate results',['Function','Calculation','Result'],[['SUM(Fee)','2 + 4 + 6 + 0 + 3','15'],['COUNT(*)','Five qualifying records','5'],['AVG(Fee)','15 ÷ 5','3']])+
    '<p>AS gives a result column a readable alias, such as TotalFee. COUNT(*) counts rows; COUNT(attribute) counts non-null values of that attribute. SUM and AVG ignore NULL values. The Fee column is defined as NOT NULL, so all five fees participate.</p>'+
    check('State whether a fee of 0 is included in AVG. Calculate the mean of the three unreturned fees: 2, 6 and 3.', 'Zero is a real value and participates in AVG; it is not NULL. The three unreturned fees total 11, so their average is 11/3, approximately 3.67. Filter the records first to summarise only that set.'),
    ['S8.10-AGGREGATES'],ids(10,6)),
  material('s8-group-by','Group records using GROUP BY',
    '<p>Suppose the librarian wants a count and total fee for each member. GROUP BY MemberID collects records with the same member identifier. Aggregate each group separately, rather than combining all loans into one total.</p>'+sample('group')+
    table('Records included in each group',['Group','Included Loan IDs','COUNT(*)','SUM(Fee)'],[['MemberID 1','201, 202',2,6],['MemberID 2','203, 205',2,9],['MemberID 3','204',1,0]])+
    '<p>MemberID 4 has no Loan row, so this Loan-based query has no group for Dara. A selected non-aggregate attribute must be compatible with the grouping; in these examples explicitly list every selected non-aggregate field in GROUP BY.</p>'+
    check('Explain why MemberID should be used when grouping records to calculate one total per member.', 'Different members may share a name. Grouping by that name alone could merge distinct people. Use the unique identity, and include the name as another grouping field when selecting it.'),
    ['S8.10-GROUP'],ids(10,4)),
  material('s8-inner-join','Queries using INNER JOIN',
    '<p>Use two tables when the required answer contains facts stored separately. Member supplies MemberName; Loan supplies LoanID. The ON condition matches the foreign key to the referenced primary key.</p>'+sample('join')+
    figure(flow([['Identify the first Loan record','Its MemberID is 1.'],['Find a matching Member','Member.MemberID 1 identifies Asha.'],['Produce one joined row','Asha, 201.'],['Repeat for the other loans','Asha appears again for 202; Ben appears for 203 and 205.']]),'Matching one member to several loans legitimately produces several result rows.')+
    '<p>INNER JOIN includes only matching pairs. Dara has no Loan row and therefore does not appear. Qualified names such as Member.MemberID make the table owning a field explicit, especially when both tables use the same field name.</p>'+
    check('Explain why Dara does not appear in the result of this INNER JOIN query.', 'INNER JOIN returns records with matching values in both tables. Dara has no matching Loan record, so the query does not include her in the result.'),
    ['S8.10-JOIN'],ids(10,5)),
  material('s8-combined-query','A query combining INNER JOIN, WHERE, GROUP BY and ORDER BY',
    '<p>Request: for each member with outstanding loans, show their member identifier, name, number of outstanding loans and total fee. Display the results in descending order of total fee.</p>'+sample('combined')+
    table('Stages used to determine the query result',['Stage','Remaining information'],[
      ['Match Member and Loan','Five member–loan pairs.'],
      ['WHERE Returned = FALSE','Loans 201, 203 and 205 remain.'],
      ['GROUP BY MemberID, MemberName','Asha has one record; Ben has two.'],
      ['COUNT and SUM','Asha: 1 and 2. Ben: 2 and 9.'],
      ['ORDER BY SUM(Fee) DESC','Ben’s total 9 comes before Asha’s total 2.'],
    ])+
    note('These stages describe the logical result of the query. The DBMS may select a different physical execution plan that produces the same result.', 'Logical processing and execution plan')+
    check('Explain the effect of changing WHERE Returned = FALSE to WHERE Returned = TRUE on the counts and totals.', 'The condition selects returned loans 202 and 204 before grouping. Asha has COUNT = 1 and SUM = 4; Chen has COUNT = 1 and SUM = 0. Ben no longer appears because neither of his loans is returned. In descending order of total fee, Asha appears before Chen.'),
    ['S8.10-SELECT','S8.10-WHERE','S8.10-ORDER','S8.10-GROUP','S8.10-JOIN','S8.10-AGGREGATES'],ids(10,1,2,3,4,5,6)),
  material('s8-insert','Add records using INSERT INTO',
    '<p>Register Elena before she borrows. Name the target fields, then supply one matching value for each field in the same order. The database definition still applies: MemberID and SchoolEmail must be unique and required values must be present.</p>'+sample('insert')+
    table('Expected new Member record',['MemberID','MemberName','SchoolEmail','TutorGroup','Active'],[[5,'Elena','elena@school.example','8B','TRUE']])+
    '<p>There are now five members and still five loans. No Loan is automatically created. Repeating the identical INSERT is rejected because MemberID 5 already exists; it does not update the existing record.</p>'+
    check('State the change required in VALUES when SchoolEmail is listed before MemberName in the INSERT field list.', 'The corresponding values must be placed in the same order as the listed fields. SQL matches values to the explicit field list by position. A statement can be syntactically valid yet place the wrong text in the wrong field.'),
    ['S8.11-INSERT'],ids(11,1)),
  material('s8-update','Modify records using UPDATE',
    '<p>Request: record that loan 203 was returned and waive its fee. First preview the target using the same condition, then make the change.</p>'+code('SELECT LoanID, Fee, Returned\nFROM Loan\nWHERE LoanID = 203;')+sample('update')+
    table('Check changed and unchanged records',['Record','Before','After'],[['Loan 203','Fee 6; Returned FALSE','Fee 0; Returned TRUE'],['Loan 205, also belonging to Ben','Fee 3; Returned FALSE','Fee 3; Returned FALSE']])+
    '<p>SET gives the new values. WHERE identifies the rows receiving them. Without WHERE, all rows are targeted, subject to constraints. A WHERE condition matching nothing updates zero rows; it does not insert a new row.</p>'+
    check('Explain why WHERE MemberID = 2 does not correctly identify only loan 203.', 'It matches both loans 203 and 205. The instruction names one borrowing event, so use its unique LoanID to avoid changing Ben’s other loan.'),
    ['S8.11-UPDATE'],ids(11,3)),
  material('s8-delete','Delete records using DELETE FROM',
    '<p>The following statement removes the completed borrowing record with LoanID 204. Preview the target, execute the deletion and verify the remaining records. Removing an event is different from marking it returned.</p>'+code('SELECT LoanID FROM Loan WHERE LoanID = 204;')+sample('delete')+
    table('Expected remaining loans',['LoanID'],[[201],[202],[203],[205]])+
    '<p>All four Member records remain, including Chen. The Loan table definition also remains. Without WHERE, DELETE targets every row of the named table. Deleting a referenced parent instead may be rejected by the foreign-key constraint.</p>'+
    check('Identify the command required to record that a loan has been returned while retaining the borrowing record.', 'UPDATE changes the Returned value while retaining the event. DELETE removes the event record. The required operation is therefore UPDATE.'),
    ['S8.11-DELETE'],ids(11,2)),
  material('s8-sql-independent-check','SQL practice questions',
    '<p>Restore the original four-member, five-loan dataset for these independent tasks. State the result before using the workbench.</p>'+
    check('State the two values returned by SELECT COUNT(*), SUM(Fee) FROM Loan WHERE Returned = FALSE;', 'The unreturned loans are 201, 203 and 205. COUNT(*) is 3 and SUM(Fee) is 11.')+
    check('Identify and correct the error in SELECT MemberName FROM Member WHERE TutorGroup = 8A;', "8A is a text value and needs single quotes: WHERE TutorGroup = '8A'. MemberName and TutorGroup are attribute identifiers; the group name is a literal.")+
    check('Write a query that returns LoanID and Fee only for fees greater than 3, highest fee first.', 'SELECT LoanID, Fee FROM Loan WHERE Fee > 3 ORDER BY Fee DESC; The result is (203, 6), then (202, 4).')+
    check('Write an SQL statement to set the fee for LoanID 201 to zero without changing its Returned value.', 'UPDATE Loan SET Fee = 0 WHERE LoanID = 201; Only Fee appears in SET, and the unique event identity restricts the target.')+
    workbench('sql','default','Write and test an independent statement'),
    ['S8.08-READ','S8.10-SELECT','S8.10-WHERE','S8.10-ORDER','S8.10-AGGREGATES','S8.11-UPDATE'],[...ids(8,1,2),...ids(10,1,2,3,6),...ids(11,3)]),
];
export const section8SqlMaterials = {'8.3.1':ddl,'8.3.2':dml,'8.3.3':sql,'8.3.4':definitions,'8.3.5':queries};
