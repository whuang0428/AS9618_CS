import {section8Databases as db,section8SqlCases as sql} from './course-v3-section8-sql.mjs';
const ids=(n,...a)=>a.map(i=>`S8.${String(n).padStart(2,'0')}.A${String(i).padStart(2,'0')}`);
const q=(lesson,n,prompt,objectiveIds,answerPoints,commonError,extra={})=>({id:`S8-L0${lesson}-Q${n}`,prompt,objectiveIds,answerPoints,commonError,marks:answerPoints.length,type:'Application',authored:true,...extra});
const tables=name=>db[name].tables.map(t=>({...t,type:'table',preserveText:true}));
const additions=[
  q(1,7,'A club guarantees a unique MemberID for each member but allows names and towns to repeat. Explain whether (MemberID, Town) is a candidate key. The club also records annual membership of several societies: a member may join the same society again in another year. Propose a minimal membership key under that rule.',ids(2,2,3),[
    '(MemberID, Town) is unique but not minimal because MemberID alone already identifies a member; the pair is not a candidate key.',
    'Use (MemberID, SocietyID, Year) for an annual membership, assuming one membership per member, society and year.',
    'Omitting Year would wrongly treat the same member joining the same society in two years as a duplicate.',
  ],'Test both uniqueness and minimality under the changed rule.'),
  q(2,6,'Product(ProductID, Description, CurrentPrice) has atomic values. ProductID is its only candidate key, and neither Description nor CurrentPrice determines another attribute. Explain why this table is in 3NF. A separate Employee(EmployeeID, DepartmentID, DepartmentName) has DepartmentID → DepartmentName. Explain whether adding a unique RowID removes its normalisation problem.',ids(4,2,3,4),[
    'Product is in 1NF because its values are atomic.',
    'Its only candidate key is a single attribute, so there is no partial-key dependency; it meets 2NF.',
    'There is no non-key dependency under the supplied rules, so it also meets the simple 3NF test.',
    'Adding RowID to Employee leaves DepartmentID → DepartmentName intact; store department names in Department and retain the DepartmentID reference in Employee.',
  ],'A surrogate identifier does not change which entity owns a fact.'),
  q(3,9,'Class contains ClassID 4. Pupil initially contains (10, Ana, 4), with fields PupilID primary key, PupilName and required ClassID referencing Class. Editors can insert; Readers can only retrieve. Starting again from that initial state for each attempt, explain the result of: an Editor inserting (11, Bo, 4); a Reader inserting the same row; and an Editor inserting (11, Bo, 7). State the Pupil records after the accepted operation.',ids(5,4,5),[
    'The Editor can insert (11, Bo, 4): the identity is new and class 4 exists.',
    'The Reader is denied insertion even though the proposed values satisfy the stated integrity rules.',
    'Class 7 is absent, so the Editor’s third proposal is rejected by the foreign-key rule.',
    'Only the accepted attempt produces two rows: (10, Ana, 4), (11, Bo, 4). Each rejected independent attempt leaves only (10, Ana, 4).',
  ],'Separate the user’s right to perform an operation from validity of the proposed data.'),
  q(5,7,'Venue(VenueID INTEGER PRIMARY KEY) and Booking(BookingID INTEGER PRIMARY KEY, VenueID INTEGER) already exist. Venue contains 4; Booking contains (20, 4). Write ALTER TABLE to add the missing foreign key. Explain the resulting constraint and whether this same addition would succeed if Booking instead contained (20, 9).',ids(9,3,5),[
    'ALTER TABLE Booking ADD FOREIGN KEY (VenueID) REFERENCES Venue(VenueID);',
    'Each non-null Booking.VenueID must match Venue.VenueID; the successful addition preserves (20, 4).',
    'With (20, 9) and no venue 9, the existing data violates the proposed constraint, so adding it fails until the mismatch is corrected.',
  ],'ALTER adds a missing rule to the existing table; do not recreate it or add the already-existing field.',{answerCode:'ALTER TABLE Booking ADD FOREIGN KEY (VenueID) REFERENCES Venue(VenueID);'}),
  q(5,8,'Describe the structure and initial record count produced by the supplied SQL. Explain what changing VARCHAR(12) to VARCHAR(20) changes.',[...ids(8,1,2),...ids(9,2,4)],[
    'Badge has BadgeID INTEGER and Label VARCHAR(12); BadgeID is the primary key, with distinct non-null identifiers.',
    'The table initially contains zero records; CREATE TABLE does not insert a badge.',
    'VARCHAR(20) increases the permitted label length from 12 to 20 characters; it does not set a record count.',
  ],'Interpret the definition itself rather than inventing inserted data.',{code:'CREATE TABLE Badge (BadgeID INTEGER, Label VARCHAR(12), PRIMARY KEY (BadgeID));',codeCaption:'Supplied SQL definition',codeLabel:'Supplied SQL definition'}),
  q(6,10,'Identify the LoanIDs selected from the supplied Loan rows by (MemberID = 1 OR MemberID = 2) AND Returned = FALSE. Explain which additional loan would qualify if the parentheses were removed, and why.',ids(10,2),[
    'With parentheses, IDs 201, 203 and 205 qualify.',
    'Without them, LoanID 202 also qualifies despite having Returned TRUE.',
    'AND binds more tightly than OR, so every MemberID 1 loan qualifies in the unparenthesised condition.',
  ],'Evaluate the condition for each row; do not assume AND and OR have equal precedence.',{table:tables('library')[1]}),
  q(6,11,'Write a query using Charge(ChargeID, Fee) containing (1, 3), (2, 6), (3, 3) returning both fields in decreasing Fee order, breaking ties by increasing ChargeID. State the exact row order and explain whether Fee alone guarantees that order.',ids(10,1,3),[
    'SELECT ChargeID, Fee FROM Charge ORDER BY Fee DESC, ChargeID ASC;',
    'The result is (2, 6), (1, 3), (3, 3).',
    'Fee alone does not specify the relative order of the equal-fee rows 1 and 3.',
  ],'The second sort field acts within a tie on the first.',{answerCode:'SELECT ChargeID, Fee FROM Charge ORDER BY Fee DESC, ChargeID ASC;'}),
  q(6,12,'Write one query using the supplied Book and Sale data returning each BookID and Title with its sale count and total quantity, counting only Sale rows whose Quantity is at least 2. Group by BookID and Title; sort by decreasing total quantity then increasing BookID. State the result and explain why the other Atlas sale does not count.',ids(10,1,2,3,4,5,6),[
    'INNER JOIN matches Book.BookID with Sale.BookID and WHERE Sale.Quantity >= 2 keeps sales 11, 12, 13 and 15.',
    'Select Book.BookID, Book.Title, COUNT(*) and SUM(Sale.Quantity), grouping by Book.BookID and Book.Title.',
    'ORDER BY SUM(Sale.Quantity) DESC, Book.BookID ASC gives (3, River, 1, 4), (1, Atlas, 1, 3), (2, Orbit, 1, 2), (4, Map, 1, 2).',
    'Atlas sale 14 has quantity 1 and is removed before grouping; the Atlas count is therefore 1 rather than 2.',
  ],'Filter sale rows before calculating the totals, and use the second key to resolve the total-2 tie.',{tables:tables('books'),answerCode:sql.qCombined.sql,answerTable:{type:'table',title:'Expected result',headers:sql.qCombined.headers,rows:sql.qCombined.expectedRows}}),
];
export function enhanceSection8Questions(lesson,number){
  return {...lesson,practice:[...lesson.practice.map(question=>question.id==='S8-L02-Q3'?{...question,prompt:question.prompt.replace('the complete key','the entire key')}:question),...additions.filter(q=>q.id.startsWith(`S8-L0${number}-`))]};
}
export const section8ReviewQuestions=[{
  id:'REV-P1-S8-Q5',authored:true,type:'Application',marks:4,objectiveIds:['S8.05.R','S8.09.R','S8.11.R'],
  prompt:'Depot(DepotID primary key) contains 3. Parcel(ParcelID primary key, DepotID foreign key referencing Depot, Delivered BOOLEAN) contains (8, 3, FALSE), (9, 3, FALSE). An authorised Editor proposes UPDATE Parcel SET DepotID = 7 WHERE ParcelID = 8. Explain the outcome. Then write a statement setting only parcel 8 to delivered and state both final records. Finally, state what a backup taken before that successful update restores when no later recovery source exists.',
  answerPoints:['The first update is rejected because depot 7 does not exist, leaving both original records unchanged.','UPDATE Parcel SET Delivered = TRUE WHERE ParcelID = 8; targets the intended record.','After the successful update the rows are (8, 3, TRUE), (9, 3, FALSE).','The earlier backup restores (8, 3, FALSE), (9, 3, FALSE); it contains no record of the later successful update.'],
  answerCode:'UPDATE Parcel SET Delivered = TRUE WHERE ParcelID = 8;',commonError:'An Editor’s permissions do not create missing referenced records; a backup restores its saved state.',
}];
