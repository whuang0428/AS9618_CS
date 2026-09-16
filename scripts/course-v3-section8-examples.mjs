import { section8Databases } from './course-v3-section8-sql.mjs';

// Shared facts keep the teaching tables, traces and verification aligned.
export const orderHeaders = ['OrderID','CustomerID','CustomerName','ProductID','ProductName','UnitPrice','Quantity'];
export const unnormalisedOrders = [
  [501,'C7','Amina','(P1, Pen, 2, 3); (P2, Pad, 5, 1)'],
  [502,'C7','Amina','(P1, Pen, 2, 2)'],
];
export const order1NF = [
  [501,'C7','Amina','P1','Pen',2,3],
  [501,'C7','Amina','P2','Pad',5,1],
  [502,'C7','Amina','P1','Pen',2,2],
];
export const orderRelations = {
  Product: {headers:['ProductID (PK)','ProductName','UnitPrice'],rows:[['P1','Pen',2],['P2','Pad',5]]},
  SalesOrder2NF: {headers:['OrderID (PK)','CustomerID','CustomerName'],rows:[[501,'C7','Amina'],[502,'C7','Amina']]},
  OrderLine: {headers:['OrderID (PK, FK)','ProductID (PK, FK)','Quantity'],rows:[[501,'P1',3],[501,'P2',1],[502,'P1',2]]},
  SalesOrder: {headers:['OrderID (PK)','CustomerID (FK)'],rows:[[501,'C7'],[502,'C7']]},
  Customer: {headers:['CustomerID (PK)','CustomerName'],rows:[['C7','Amina']]},
};
const [members, loans] = section8Databases.library.tables;
export const joinedLoans = loans.rows.map(([loan,member,fee,returned]) => [member,members.rows.find(r=>r[0]===member)[1],loan,fee,returned]);
export const outstandingLoans = joinedLoans.filter(r=>r[4]==='FALSE');
export const schoolState = {
  tutors: [[7,'Jo']],
  students: [[21,'Amina',7,73]],
  attempts: [
    ['Editor','(22, Ben, 7, 80)','Allow','Key 22 is new; tutor 7 exists; mark is in range','Add student 22'],
    ['Editor','(21, Ben, 7, 80)','Reject','StudentID 21 already exists','No change'],
    ['Editor','(23, Chen, 9, 80)','Reject','Tutor 9 does not exist','No change'],
    ['Editor','(23, Chen, 7, 145)','Reject','Mark exceeds the stated 0–100 range','No change'],
    ['Reader','(23, Chen, 7, 80)','Reject','Role has no insertion right','No change'],
  ],
};
