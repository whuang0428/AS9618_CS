import { material, ids, table, figure, pair, panel, flow, note, check, dependencies, workbench, esc } from './course-v3-section8-material-helpers.mjs';
import { libraryTables } from './course-v3-section8-dbms-data.mjs';
import { orderHeaders, unnormalisedOrders, order1NF, orderRelations } from './course-v3-section8-examples.mjs';
const keys = (...values) => values;
const libraryTable = name => { const t = libraryTables.find(t => t.title === name); if (!t) throw new Error(`Missing library table ${name}`); return table(t.title,t.headers,t.rows); };
const relation = name => {const t=orderRelations[name]; return table(name==='SalesOrder2NF'?'SalesOrder · at 2NF':name,t.headers,t.rows);};
const fieldIndex = (table,field) => table.headers.findIndex(header=>header.split(' (')[0]===field);
const flatRows = libraryTables.find(t=>t.title==='Loan').rows.map(loan => {
  const loans = libraryTables.find(t=>t.title==='Loan');
  const memberID = loan[fieldIndex(loans,'MemberID')];
  const members = libraryTables.find(t=>t.title==='Member');
  const member = members.rows.find(row=>row[fieldIndex(members,'MemberID')]===memberID);
  const copyID = loan[fieldIndex(loans,'CopyID')];
  const copies = libraryTables.find(t=>t.title==='Copy');
  const copy = copies.rows.find(row=>row[fieldIndex(copies,'CopyID')]===copyID);
  const bookID = copy[fieldIndex(copies,'BookID')];
  const books = libraryTables.find(t=>t.title==='Book');
  const book = books.rows.find(row=>row[fieldIndex(books,'BookID')]===bookID);
  return [loan[0],memberID,member[members.headers.indexOf('MemberName')],member[fieldIndex(members,'SchoolEmail')],copyID,bookID,book[books.headers.indexOf('Title')],loan[loans.headers.indexOf('BorrowDate')],loan[loans.headers.indexOf('Fee')],loan[loans.headers.indexOf('Returned')]];
});
const flatHeaders = ['LoanID','MemberID','MemberName','SchoolEmail','CopyID','BookID','Title','BorrowDate','Fee','Returned'];
const erBox = (x,y,w,title,fields) => `<g><rect x="${x}" y="${y}" width="${w}" height="${62+fields.length*29}" rx="8" fill="#fff" stroke="#173b50" stroke-width="2"/><rect x="${x}" y="${y}" width="${w}" height="46" rx="8" fill="#173b50"/><text x="${x+18}" y="${y+30}" fill="#fff" font-size="23" font-weight="700">${title}</text>${fields.map((f,i)=>`<text x="${x+18}" y="${y+74+i*29}" fill="#173b50" font-size="18">${esc(f)}</text>`).join('')}</g>`;
// CIE E-R notation: a single line at the one end; three branches at the many end.
// Optional participation is stated in the business rules, separately from these symbols.
const erRelationship = (id, x1, y1, x2, y2, manyAt = '') => {
  const length = Math.hypot(x2-x1,y2-y1), dx=(x2-x1)/length, dy=(y2-y1)/length;
  const fork = (end,x,y,direction) => `<path data-s8-er-many="${end}" d="M${x-dy*13} ${y+dx*13}L${x+direction*dx*24} ${y+direction*dy*24}L${x+dy*13} ${y-dx*13}"/>`;
  return `<g data-s8-er-edge="${id}"><path data-s8-er-line d="M${x1} ${y1}L${x2} ${y2}"/>${manyAt.includes('start')?fork('start',x1,y1,1):''}${manyAt.includes('end')?fork('end',x2,y2,-1):''}</g>`;
};
const erControls = [
  ['member-loan','Member–Loan','Member–Loan is one-to-many: a member can have many loans; each loan belongs to one member. Loan.MemberID is the foreign key.'],
  ['copy-loan','Copy–Loan','Copy–Loan is one-to-many: a copy can have many loans over time; each loan concerns one copy. Loan.CopyID is the foreign key.'],
  ['member-card','Member–MemberCard','Member–MemberCard is one-to-one: a member has at most one current card; each card belongs to one member. MemberCard.MemberID is both primary key and foreign key.'],
  ['book-copy','Book–Copy','Book–Copy is one-to-many: a book title can have many physical copies; each copy belongs to one title. Copy.BookID is the foreign key.'],
];
export const libraryErFigure = '<div class="s8-er-demo" data-active="member-loan"><div class="s8-er-controls" aria-label="Highlight a relationship">' + erControls.map(([id,label,explanation])=>`<button type="button" data-s8-er-highlight="${id}" data-explanation="${esc(explanation)}" aria-pressed="${id==='member-loan'}">${label}</button>`).join('') + '</div>' + figure(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 660" role="img" aria-labelledby="s8-er-title s8-er-desc"><title id="s8-er-title">Library entity-relationship diagram</title><desc id="s8-er-desc">A single line represents one; three branches represent many. Member to Loan, Copy to Loan and Book to Copy are one-to-many. Member to MemberCard is one-to-one. A member may have no current card or loans. Primary and foreign keys are labelled.</desc><g font-family="system-ui,sans-serif"><g fill="none" stroke="#208379" stroke-width="3">${erRelationship('member-loan',370,158,490,158,'end')}${erRelationship('copy-loan',830,158,950,158,'start')}${erRelationship('member-card',200,237,200,420)}${erRelationship('book-copy',1120,179,1120,420,'start')}</g>${erBox(30,30,340,'Member',['MemberID  PK','MemberName','SchoolEmail  UNIQUE, NOT NULL','TutorGroup','Active'])}${erBox(490,30,340,'Loan',['LoanID  PK','MemberID  FK → Member','CopyID  FK → Copy','BorrowDate','BorrowTime','Fee','Returned'])}${erBox(950,30,340,'Copy',['CopyID  PK','BookID  FK → Book','ShelfCode'])}${erBox(30,420,340,'MemberCard',['MemberID  PK, FK → Member','CardCode  UNIQUE, NOT NULL','IssueDate'])}${erBox(950,420,340,'Book',['BookID  PK','Title','Category'])}<g fill="#173b50"><text x="420" y="445" font-size="21" font-weight="700">E-R notation</text><g fill="none" stroke="#173b50" stroke-width="3"><path d="M420 481H500"/><path d="M420 526H500M500 513L476 526L500 539"/></g><text x="520" y="487" font-size="19">One: a single line</text><text x="520" y="532" font-size="19">Many: three branches</text><text x="420" y="578" font-size="18">Symbols show the maximum number of</text><text x="420" y="604" font-size="18">related records. See the business rules below.</text></g></g></svg>`, 'An entity-relationship (E-R) diagram shows entities and the relationships between them. The single-line and three-branch symbols follow the notation used in Cambridge 9618 papers. PK = primary key; FK = foreign key.') + `<p data-s8-er-explanation role="status">${esc(erControls[0][2])}</p></div>`;
const relationshipTypesFigure = figure(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1020 310" role="img" aria-labelledby="s8-er-types-title s8-er-types-desc"><title id="s8-er-types-title">Three types of relationship</title><desc id="s8-er-types-desc">Member to MemberCard has single lines at both ends. Book to Copy has a single line at Book and three branches at Copy. Member to Copy over the borrowing history has three branches at both ends; this many-to-many relationship is implemented using Loan.</desc><g font-family="system-ui,sans-serif" fill="#173b50" font-size="20">${[[50,'One-to-one','Member','MemberCard',''],[150,'One-to-many','Book','Copy','end'],[250,'Many-to-many','Member','Copy','start end']].map(([y,label,left,right,manyAt],i)=>`<text x="25" y="${y+7}">${label}</text><g fill="none" stroke="#173b50" stroke-width="3">${erRelationship(`type-${i}`,520,y,730,y,manyAt)}</g><rect x="260" y="${y-30}" width="260" height="60" fill="#fff" stroke="#173b50" stroke-width="2"/><rect x="730" y="${y-30}" width="260" height="60" fill="#fff" stroke="#173b50" stroke-width="2"/><text x="390" y="${y+7}" text-anchor="middle">${left}</text><text x="860" y="${y+7}" text-anchor="middle">${right}</text>`).join('')}</g></svg>`, 'The Member–Copy relationship describes borrowing over time. In the implemented database, Loan represents this relationship using two one-to-many relationships.');

const flatFile = [
  material('s8-flat-file', 'Flat-file database: library loans',
    '<p>A database is an organised collection of related data. A <strong>flat-file database</strong> keeps the data for this example in one table. Each row below records one borrowing event. The library copies the member’s name and email, and the book’s title, into every relevant event.</p>' + table('Flat-file database: five loan records',flatHeaders,flatRows) +
    '<p>MemberID 1 appears in two records, both referring to the same member. BookID 1 appears in several records because copies 101 and 102 are physical copies of the same title. Member details and book details are repeated in the loan records. This duplication is called <strong>data redundancy</strong>.</p>' +
    check('Asha changes her email address. Explain why updating only loan 201 causes data inconsistency.', 'Other loan records for the same member still contain the old email address. The records then give different email addresses for one member. All occurrences must be updated.'),
    keys('S8.01-FILES'),ids(1,1)),
  material('s8-relational-tables', 'Relational database: related tables',
    '<p>A <strong>relational database</strong> stores data in related tables. Member stores each registered person once; Book stores each title once; Copy identifies each physical item; Loan records borrowing events. MemberCard stores a member’s current card. The following tables are the actual starting data used throughout the chapter.</p>' +
    libraryTables.map(t=>table(t.title,t.headers,t.rows)).join('') +
    '<p>To read loan 201, follow its MemberID to Member and its CopyID to Copy, then follow Copy.BookID to Book. These links recover the member’s name and book title without writing them into every Loan row. This design also keeps a member with no loans and a copy that has never been borrowed.</p>' +
    note('The five flat-file borrowing rows can be reconstructed from these related tables. The member, card and catalogue tables additionally retain facts that exist independently of borrowing. A loan row does not need to store every attribute of every related entity.') + workbench('data'),
    keys('S8.01-FILES'),ids(1,2)),
  material('s8-flat-limitations', 'Limitations of flat-file databases and benefits of relational databases',
    table('Flat-file limitations and relational database features', ['Flat-file limitation','Relational database feature','Result in this library'],[
      ['Data redundancy: member details are stored repeatedly','Store each member’s details once and retain MemberID in Loan','Asha’s email is stored in one Member record.'],
      ['Data inconsistency: an update changes only some occurrences of an email','Update the one Member record','Every related loan refers to the same updated member.'],
      ['Insertion anomaly: no loan row exists for a new member','Member has its own table','Register Elena before she borrows anything.'],
      ['Deletion anomaly: deleting a last loan loses a member’s details','Keep Member independent of Loan','Removing loan 204 does not remove Chen.'],
      ['Difficulty maintaining data integrity','Declare foreign-key constraints','A loan for a missing member is rejected.'],
      ['Program–data dependency: programs depend on application file formats','The DBMS maintains data definitions and provides an interface for accessing data','Some changes to physical storage can be managed by the DBMS without changing application programs. Changes to fields used by a program may still require program changes.'],
      ['Data isolation: related data in separate files can be difficult to access together','Use keys and relational queries','Retrieve a member’s loans using the stored identifiers.'],
    ]) +
    note('Normalisation reduces unnecessary duplication and the risk of update, insertion and deletion anomalies. These benefits depend on the table design and the constraints defined in the DBMS. A value can satisfy a constraint and still be factually incorrect.', 'Database design and data integrity') +
    check('Explain why MemberID may occur in several Loan records without duplicating the member’s details.', 'Each Loan record refers to the member using MemberID as a foreign key. The member’s name and email address are stored once in Member and retrieved using this relationship.'),
    keys('S8.01-FILES'),ids(1,1,2)),
];

const terms = [
  material('s8-entities-and-rows', 'Entity, table, record, tuple, field and attribute',
    `<div class="s8-vocabulary-demo" data-highlight="record"><p class="s8-entity-label"><strong>Entity type: Member</strong> · the people registered with the library</p><div class="s8-vocabulary-controls" aria-label="Locate a database term">${[
      ['entity','Entity','An entity is an object, person or concept about which data is stored. Member represents the people registered with the library.'],
      ['table','Table','The Member table contains the stored records and their named attributes.'],
      ['record','Record / tuple','The first highlighted row is one record: MemberID 1 describes Asha.'],
      ['field','Field / attribute','MemberName is one attribute represented by this column. Asha is its value in the first record.'],
    ].map(([id,label,explanation])=>`<button type="button" data-s8-vocabulary="${id}" data-explanation="${esc(explanation)}" aria-pressed="${id==='record'}">${label}</button>`).join('')}</div>${libraryTable('Member')}<p data-s8-vocabulary-explanation role="status">The first highlighted row is one record: MemberID 1 describes Asha.</p></div>` +
    table('Database terminology in the Member table',['Term','Meaning','Example'],[
      ['Entity','An object, person or concept about which data is stored','Member is an entity type; Asha is one member instance.'],
      ['Table','A relation represented by columns and rows','Member represents the member entity type in the database.'],
      ['Record / tuple','One row containing values about one instance','The row for MemberID 1 describes Asha.'],
      ['Field / attribute','A named data item represented by a column','SchoolEmail is an attribute; a particular email is a field value in a record.'],
    ]) +
    '<p>The entity belongs to the model of the real world; the table is its database representation. A record has several fields. A column contains the same kind of field for all records, and its declared type limits the values it can store.</p>' +
    check('State what one record in Loan represents. Explain why LoanID is required.', 'It represents one borrowing event. The same person and physical copy can appear in later events, so Loan needs an identifier for the event rather than using the person’s name.'),
    keys('S8.02-TERMS'),ids(2,1)),
  material('s8-candidate-primary-secondary', 'Primary keys, candidate keys and secondary keys',
    libraryTable('Member') +
    '<p>Our business rules guarantee that MemberID is unique and present, and that each registered member has one unique SchoolEmail. Names and TutorGroup values may repeat.</p>' +
    table('Types of key',['Term','Rule','Library example'],[
      ['Candidate key','A minimal set of attributes guaranteed to identify every permitted record uniquely','MemberID and SchoolEmail are each candidate keys.'],
      ['Primary key','The candidate key chosen as the table’s main identifier; unique and not null','MemberID is selected because it is short and stable.'],
      ['Secondary key','An additional or alternative key used to locate records; its values need not be unique','TutorGroup retrieves everyone in 8A.'],
    ]) +
    '<p><strong>Minimal</strong> means no attribute can be removed without losing the guarantee of uniqueness. (MemberID, MemberName) is unique when MemberID is unique, but it is not minimal. Choosing MemberID as the primary key does not stop SchoolEmail from being a candidate key.</p>' +
    check('Identify the candidate keys in Member. State a suitable secondary key for retrieving all members of a tutor group. Explain why MemberName is not a candidate key under the stated rules.', 'MemberID and SchoolEmail are candidate keys because each is guaranteed to be unique and present. TutorGroup is a suitable secondary key for this search. MemberName is not guaranteed to be unique: two members may have the same name.'),
    keys('S8.02-KEYS'),ids(2,2)),
  material('s8-foreign-keys', 'Foreign keys and composite keys',
    libraryTable('Loan') +
    '<p><strong>Loan.MemberID</strong> is a foreign key referencing <strong>Member.MemberID</strong>. It identifies the member who borrowed the copy. <strong>LoanID</strong> identifies the borrowing event itself. MemberID 1 occurs in loans 201 and 202; that is allowed because both events belong to Asha.</p>' +
    '<p>A foreign key is an attribute or set of attributes whose non-null values refer to an existing key in a related table. In this chapter they reference primary keys. Copy.BookID and Loan.CopyID provide the other links in the catalogue and borrowing history.</p>' +
    note('A <strong>composite key</strong> contains more than one attribute. In an order line where each product occurs at most once per order, (OrderID, ProductID) can be a composite primary key. Do not use (MemberID, CopyID) as the key for historical Loan: one member may borrow the same copy again on a later date.') +
    check('Asha returns copy 101 and borrows it again next month. State the values required for LoanID, MemberID and CopyID in the new record.', 'A new unique LoanID, the same MemberID 1 and CopyID 101, and the new event’s date/time and other details. Reusing the two foreign keys is valid; reusing the LoanID is not.'),
    keys('S8.02-KEYS'),ids(2,2)),
  material('s8-library-er', 'Entity-relationship (E-R) diagram',
    libraryErFigure +
    '<p>The entities are Member, MemberCard, Book, Copy and Loan. Their attributes describe the relevant entity: Title describes Book, ShelfCode describes Copy, SchoolEmail describes Member and BorrowDate describes Loan. The diagram identifies the primary keys and the foreign keys used to link these tables.</p>' +
    table('Business rules represented by the design',['Event','How the design represents it'],[
      ['Two copies of Atlas','One Book row, two Copy rows with different CopyID values.'],
      ['Asha borrows two different copies','Two Loan rows with the same MemberID.'],
      ['Asha borrows the same copy again later','A new LoanID with the same member and copy references.'],
      ['Dara has no borrowing history','A Member row with no related Loan row.'],
      ['A member has no current card','A Member record with no related MemberCard record. The business rule permits a member to have no current card.'],
    ]) + workbench('schema') +
    check('Explain why BorrowDate is an attribute of Loan.', 'One member can have many borrowing events on different dates. The date describes one event, so it depends on the Loan identity, not solely on the member identity.'),
    keys('S8.03-ER'),ids(3,1)),
  material('s8-relationship-cardinality', 'One-to-one, one-to-many and many-to-many',
    relationshipTypesFigure + table('Relationship types and business rules',['Relationship','First direction','Reverse direction','Implementation'],[
      ['One-to-one: Member ↔ MemberCard','A member has at most one current card','Each card belongs to exactly one member','MemberCard.MemberID is both PK and FK.'],
      ['One-to-many: Book → Copy','A title can have many physical copies','Each copy belongs to exactly one title','Copy stores the BookID foreign key.'],
      ['One-to-many: Member → Loan','A member can have many borrowing events','Each event belongs to exactly one member','Loan stores the MemberID foreign key.'],
      ['Many-to-many over time: Member ↔ Copy','A member can borrow many copies','A copy can be borrowed by many members over time','Loan records the individual associations/events.'],
    ]) +
    figure(flow([['Many-to-many relationship','A member can borrow many copies; a copy can be borrowed by many members over time.'],['Linking table','Loan records the MemberID and CopyID for each borrowing event.'],['Two one-to-many relationships','Member–Loan and Copy–Loan are each one-to-many. LoanID identifies each borrowing event.']]),'A many-to-many relationship is implemented using a linking table. Loan allows the same member to borrow the same copy on different occasions.') +
    note('These relationship symbols show the maximum number of related records. A member may have no current card and no loans. A book may have no copies, and a copy may have no loans. These participation rules are stated separately. Preventing simultaneous loans of the same copy would require an additional rule.') +
    check('Suppose that, in a different sample, each member has one Loan record. Explain why this sample does not establish a one-to-one relationship.', 'The business rules permit a member to have many loans. The relationship is one-to-many even if each member currently has only one loan.'),
    keys('S8.02-RELATIONSHIPS'),ids(2,3)),
  material('s8-referential-integrity', 'Referential integrity',
    '<p><strong>Referential integrity</strong> means every non-null foreign-key value matches an existing value of its referenced key. The library additionally makes Loan.MemberID and Loan.CopyID mandatory using NOT NULL. The foreign-key and required-value rules are separate checks.</p>' +
    table('Independent attempts from the original data',['Attempt','Outcome','Reason'],[
      ['New LoanID 206, MemberID 1, CopyID 104','Accept when its other values are valid','Both parent records exist; LoanID 206 is new.'],
      ['New LoanID 207, MemberID 99','Reject','Member 99 does not exist.'],
      ['Reuse LoanID 201 for member 2','Reject','The duplicate value violates the primary-key constraint.'],
      ['Delete MemberID 1 while loans 201 and 202 refer to it','Reject under this schema','The deletion would leave unmatched references.'],
      ['Use MemberID 1 in another loan','Allowed','A foreign key may repeat in different child records.'],
    ]) + workbench('integrity','integrity-orphan','Attempt an invalid foreign-key value') +
    note('Different databases can declare different referential actions. Cascading deletion is not automatic. This library restricts deletion of referenced parent records, so an unsuccessful attempt leaves the data unchanged.') +
    check('Explain why an index on MemberName cannot ensure referential integrity for Loan.MemberID.', 'No. An index helps retrieval. The foreign-key constraint checks the reference, and adding an index does not create a missing member.'),
    keys('S8.02-REFERENTIAL'),ids(2,4)),
  material('s8-indexing', 'Indexing: purpose, benefits and costs',
    table('Illustrative index on TutorGroup',['Indexed value','References to matching Member records'],[['8A','MemberID 1, MemberID 2'],['8B','MemberID 3, MemberID 4']]) +
    figure(pair(panel('Table scan','<p>Read each Member record and test whether TutorGroup is 8A. To return all matches, continue after the first match.</p>'),panel('Index lookup','<p>Find 8A in a separate lookup structure, obtain the references to matching records, then fetch the required fields.</p>')),'The index stores values of TutorGroup with references to matching records. The displayed MemberID values represent those record references.') +
    '<p><strong>Indexing</strong> maintains an additional structure associating indexed values with record locations or suitable record references. An index can make a suitable search more efficient. A secondary retrieval key such as TutorGroup can be indexed even though several records share its value.</p>' +
    table('Benefit and cost',['Change or request','Effect on an index'],[['Find members of 8A','May avoid inspecting every Member row.'],['Member 2 moves from 8A to 8B','Move its reference from the 8A index entry to 8B.'],['Insert or delete a member','Maintain the corresponding index entry as well as the table.'],['Keep the index','Use additional storage.']]) +
    note('An index does not guarantee that every query is faster. For a small table or a query returning most records, a table scan may require less processing. Indexing does not guarantee the order of a query result; ORDER BY specifies that later in this chapter.') +
    check('Explain one storage cost and one maintenance cost of indexing.', 'The index requires additional storage. Inserting or deleting a record, or updating an indexed field, can require changes to both the table and its index, increasing processing time.'),
    keys('S8.02-INDEX'),ids(2,5)),
];

const normalisation = [
  material('s8-1nf-case', 'First normal form (1NF): removing repeating groups',
    '<p>The shop permits each product at most once per order, with Quantity recording how many units are ordered. A product has one current UnitPrice in this deliberately simplified catalogue. CustomerID identifies a customer; OrderID identifies an order.</p>' +
    table('Unnormalised order records: repeating product groups',['OrderID','CustomerID','CustomerName','Products (ProductID, ProductName, UnitPrice, Quantity)'],unnormalisedOrders) +
    '<p>Order 501 contains a list of two product groups inside one field. It is difficult to address one product’s quantity independently. A table is in <strong>first normal form (1NF)</strong> when its fields hold single values, it contains no repeating groups, and records can be identified.</p>' +
    table('1NF: one product per order line',orderHeaders,order1NF) +
    '<p>Use (OrderID, ProductID) as the composite key. OrderID alone repeats because one order has several products; ProductID alone repeats because a product appears in several orders. The pair is unique under the stated one-product-per-order rule. Expanding the list preserves all three line items and both orders.</p>' +
    note('1NF does not prohibit every repeated value. CustomerName and ProductName still repeat after this change. Each field now contains a single value. Partial and transitive dependencies are considered when converting to 2NF and 3NF.') +
    check('Explain why adding LineID without separating the product groups does not put the original table in 1NF.', 'A new identifier does not remove the repeating group. The products would still be stored as multiple structured values in one field. Split them into separately identifiable line records.'),
    keys('S8.04-1NF'),ids(4,1)),
  material('s8-2nf-case', 'Second normal form (2NF): removing partial dependencies',
    '<p>The table below is in 1NF and has composite primary key (OrderID, ProductID). For 2NF, each non-key attribute must depend on the whole key. An attribute depending on only part of this key has a <strong>partial dependency</strong>.</p>' + table('Starting 1NF order lines',orderHeaders,order1NF) +
    dependencies('Dependencies in the order-line table',[
      ['OrderID','CustomerID, CustomerName','An order identifies its customer without needing ProductID. This is a partial dependency on the composite key.'],
      ['ProductID','ProductName, UnitPrice','A product identifies these catalogue facts without needing OrderID. This is another partial dependency.'],
      ['OrderID + ProductID','Quantity','The quantity depends on which product is on which order; both key components are needed.'],
    ]) +
    '<p><strong>Second normal form (2NF)</strong> requires 1NF and no partial dependency of a non-key attribute on part of a candidate key. Move order facts to SalesOrder and product facts to Product. Keep Quantity with the complete order-line key.</p>' +
    relation('SalesOrder2NF') + relation('Product') + relation('OrderLine') +
    '<p>In OrderLine, both key attributes are also foreign keys: OrderID references SalesOrder and ProductID references Product. Joining each OrderLine to its one matching order and product reconstructs the original three rows without inventing extra line items.</p>' +
    check('Explain why Quantity must remain in OrderLine when the table is converted to 2NF.', 'P1 has quantity 3 in order 501 and quantity 2 in order 502. ProductID alone does not determine Quantity; the complete order-product pair does.'),
    keys('S8.04-2NF'),ids(4,2)),
  material('s8-3nf-case', 'Third normal form (3NF): removing transitive dependencies',
    '<p>Now examine SalesOrder independently. Its key is OrderID, so there is no proper subset of that key on which a non-key field could depend. Nevertheless, the same customer name appears in more than one order.</p>' + relation('SalesOrder2NF') +
    dependencies('The transitive dependency in SalesOrder',[
      ['OrderID','CustomerID','Each order belongs to one customer.'],
      ['CustomerID','CustomerName','The customer identifier determines the name.'],
      ['OrderID','CustomerName via CustomerID','The name depends on the order key indirectly through a non-key attribute.'],
    ]) +
    '<p>In these examples, <strong>third normal form (3NF)</strong> means the table is in 2NF and no non-key attribute depends transitively on a key through another non-key attribute. Move CustomerName to Customer, where CustomerID is the primary key. Retain CustomerID as a foreign key in SalesOrder.</p>' +
    relation('SalesOrder') + relation('Customer') +
    '<p>Changing Amina’s name now changes one Customer row. Both orders obtain the updated name through CustomerID C7. An order may be deleted without deleting the customer. The final design contains Customer, SalesOrder, Product and OrderLine.</p>' +
    check('Explain why a table with a single-field primary key can fail to satisfy 3NF.', 'A non-key attribute may depend on another non-key attribute. For example, OrderID determines CustomerID, and CustomerID determines CustomerName. This transitive dependency prevents the table from being in 3NF.'),
    keys('S8.04-3NF'),ids(4,3)),
  material('s8-normalisation-reconstruct', 'Reconstructing records from normalised tables',
    table('Records reconstructed by joining the normalised tables',['OrderID','CustomerID','CustomerName','ProductID','ProductName','UnitPrice','Quantity'],order1NF) +
    figure(flow([['Start at OrderLine','(501, P1, 3) identifies the product and quantity on one order.'],['Follow OrderID','SalesOrder 501 identifies CustomerID C7.'],['Follow CustomerID','Customer C7 supplies Amina.'],['Follow ProductID','Product P1 supplies Pen and price 2.'],['Reconstructed record','(501, C7, Amina, P1, Pen, 2, 3), exactly as in the 1NF table.']]),'Repeat the trace for (501, P2) and (502, P1): every original line is recovered once.') +
    '<p>Check keys, reference targets and every original attribute. Splitting a table is not enough if a required fact or the link needed to reconstruct it disappears. The normalised design should also support adding a new customer or product before it is used on an order.</p>' +
    note('The price rule matters. Here ProductID determines the current catalogue UnitPrice. If the system must preserve an agreed sale price that varies by order, the order-specific price belongs in OrderLine. Normal forms follow functional dependencies under the actual business rules.') +
    check('Explain the problem caused by storing CustomerName in both Customer and SalesOrder.', 'The name would be duplicated. Updating only some occurrences could cause data inconsistency. Store CustomerName in Customer and use SalesOrder.CustomerID to retrieve it.'),
    keys('S8.04-DESIGN'),ids(4,4,5)),
];
const judges = [
  ['s8-judge-not-1nf','Case A · a repeating group', ['MemberID','MemberName','BorrowedCopyIDs'],[[1,'Asha','101, 102'],[2,'Ben','103']], 'MemberID identifies a member. BorrowedCopyIDs is a list of separate copy identifiers, not one indivisible value.', 'Not in 1NF because BorrowedCopyIDs contains a repeating group, so the table is not in 3NF. Use Member(MemberID PK, MemberName) and Loan(LoanID PK, MemberID FK, CopyID FK), with one borrowing event per Loan record. Loan.MemberID references Member.MemberID and Loan.CopyID references Copy.CopyID in the library catalogue.'],
  ['s8-judge-not-2nf','Case B · part of a composite key', ['OrderID (PK part)','ProductID (PK part)','ProductName','Quantity'],[[501,'P1','Pen',3],[501,'P2','Pad',1],[502,'P1','Pen',2]], 'Each product appears at most once on an order. ProductID determines ProductName; Quantity depends on the complete (OrderID, ProductID) key.', 'In 1NF but not 2NF, therefore not 3NF. ProductName depends on only ProductID, part of the composite key. Use Product(ProductID PK, ProductName) and OrderLine(OrderID, ProductID, Quantity) with composite primary key (OrderID, ProductID). OrderLine.ProductID is a foreign key referencing Product.ProductID. OrderID links to the order header table.'],
  ['s8-judge-not-3nf','Case C · a transitive dependency', ['OrderID (PK)','CustomerID','CustomerName'],[[501,'C7','Amina'],[502,'C7','Amina']], 'Each OrderID determines one CustomerID. CustomerID determines CustomerName. CustomerID can occur on several orders.', 'In 2NF but not 3NF. CustomerName depends on OrderID through the non-key CustomerID. Use Customer(CustomerID PK, CustomerName) and SalesOrder(OrderID PK, CustomerID FK), where SalesOrder.CustomerID references Customer.CustomerID.'],
  ['s8-judge-3nf','Case D · already in 3NF', ['OrderID (PK part, FK)','ProductID (PK part, FK)','Quantity'],[[501,'P1',3],[501,'P2',1],[502,'P1',2]], 'Each product appears at most once per order. Only the complete (OrderID, ProductID) pair determines Quantity; there are no other non-key attributes or dependencies.', 'In 3NF under these rules. Values are single-valued; Quantity depends on the whole key; no non-key attribute determines another non-key attribute. No further split is needed.'],
];
const judgement = [
  material('s8-normal-form-method','Determining whether a table is in 3NF',
    figure(flow([['1. Read the business rules','Identify the permitted records, candidate keys and functional dependencies.'],['2. Check 1NF','Look for repeating groups and non-single values.'],['3. Check 2NF','For composite candidate keys, look for a non-key attribute depending on only part of a key.'],['4. Check 3NF','Look for a non-key attribute depending on another non-key attribute rather than directly on a key.'],['5. State and explain any changes','Identify the dependency, give the resulting tables and state their primary and foreign keys.']]),'Use the first failed requirement to explain why a table is not in 3NF, then check every resulting table after decomposition.') +
    note('A few distinct values in a sample do not establish a candidate key or dependency. Conversely, repeating a legitimate foreign key is not evidence that a table fails 3NF. “No many-to-many relationships” alone is not a sufficient proof of 3NF.') +
    '<p>For each case below, first decide the highest normal form supported by the stated rules. Name the offending dependency, if any, and propose the smallest necessary change before revealing the answer.</p>',
    keys('S8.04-DESIGN'),ids(4,4,5)),
  ...judges.map(([id,title,headers,rows,rules,answer])=>material(id,title,
    table(title,headers,rows)+`<p><strong>Business rules:</strong> ${rules}</p>`+check('State whether the table is in 3NF and explain your answer using the stated dependencies. If it is not in 3NF, give the required tables and identify their primary and foreign keys.',answer),keys('S8.04-DESIGN'),ids(4,4,5))),
];
export const section8ConceptMaterials = {'8.1.1':flatFile,'8.1.2':terms,'8.1.3':normalisation,'8.1.4':judgement};
