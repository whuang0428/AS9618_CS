// Original reproducible diagrams. Detailed HTML tables carry every input record.
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,s,size=26,colour='#183448') => `<text x="${x}" y="${y}" font-size="${size}" fill="${colour}">${esc(s)}</text>`;
const panel = (x,y,w,title,lines,colour='#177f7b') => `<rect x="${x}" y="${y}" width="${w}" height="${72+lines.length*34}" rx="12" fill="#f1f7f7" stroke="${colour}" stroke-width="2"/>${text(x+20,y+38,title,28,colour)}${lines.map((line,i)=>text(x+20,y+78+i*34,line,25)).join('')}`;
const arrow = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="#177f7b" stroke-width="3" marker-end="url(#arrow)"/>`;
const frame = (title,description,body,height) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#177f7b"/></marker></defs><rect width="1200" height="${height}" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${text(45,57,title,34)}${body}</g></svg>`;
const requestFacts = ['A request identifies the account, operation and proposed record.','Permission and all applicable data constraints are required.','A denied request leaves the database unchanged; an accepted insertion adds one record.','This teaching trace does not specify an internal DBMS implementation order.'];
const queryFacts = ['The join gives five matching pairs.','Returned = FALSE retains loans 201, 203 and 205.','Grouping gives Asha: count 1, sum 2, mean 2; Ben: count 2, sum 9, mean 4.5.','Descending totals place Ben before Asha.','These are logical reasoning stages, not a physical execution plan.'];
export const section8TeachingVisuals = [
  {file:'dbms-request-checks.svg',title:'Separate permission from valid data',caption:'Trace one insertion from its account and values to a decision. Each rejection preserves the starting state.',alt:'Permission, key/reference and field checks must all permit the proposed insertion; failure rejects it without adding a record.',facts:requestFacts,
    svg:frame('Separate permission from valid data',requestFacts.join(' '),
      text(45,100,'Teaching trace: a valid value does not give a user permission.',25)+
      panel(45,140,1100,'Request: add Student (22, Ben, 7, 80)',['Account: Editor. Existing TutorID: 7. Existing StudentID: 21.'])+arrow(350,250,350,295)+
      panel(45,310,620,'1. Permission',['May this role insert Student records?'])+panel(790,310,355,'No permission',['Reject: no change.'],'#a55922')+arrow(670,365,775,365)+arrow(350,420,350,465)+
      panel(45,480,620,'2. Identity and reference',['Is ID 22 new? Does tutor 7 exist?'])+panel(790,480,355,'Invalid key or link',['Reject: no change.'],'#a55922')+arrow(670,535,775,535)+arrow(350,590,350,635)+
      panel(45,650,620,'3. Field rules',['Are required values present and in range?'])+panel(790,650,355,'Invalid field value',['Reject: no change.'],'#a55922')+arrow(670,705,775,705)+arrow(350,760,350,805)+
      panel(45,820,1100,'All applicable checks pass: add Student 22',['Student 21 and tutor 7 remain unchanged. A permitted score may still be wrong.']),950)},
  {file:'sql-query-stages.svg',title:'Follow a complete query through its results',caption:'Use Member and Loan. Each logical stage works on the result of the preceding stage.',alt:'Five joined rows become three unreturned loans and two member groups; descending totals place Ben before Asha.',facts:queryFacts,
    svg:frame('Follow a complete query through its results',queryFacts.join(' '),
      text(45,105,'Logical reasoning stages; stored Member and Loan rows are unchanged.',25)+
      panel(45,145,1100,'FROM Member INNER JOIN Loan ON matching MemberID',['5 pairs: Asha 201, Asha 202, Ben 203, Chen 204, Ben 205'])+arrow(590,255,590,295)+
      panel(45,310,1100,'WHERE Loan.Returned = FALSE',['3 rows: Asha / 201 / fee 2; Ben / 203 / fee 6; Ben / 205 / fee 3'])+arrow(590,420,590,460)+
      panel(45,475,1100,'GROUP BY MemberID, MemberName; calculate aggregates',['Asha: COUNT = 1, SUM = 2, AVG = 2','Ben: COUNT = 2, SUM = 9, AVG = 4.5'])+arrow(590,620,590,660)+
      panel(45,675,1100,'ORDER BY SUM(Loan.Fee) DESC, MemberID ASC',['Output: Ben / 2 / 9 / 4.5, then Asha / 1 / 2 / 2'])+
      text(45,850,'Chen has no unreturned loan. Dara has no matching loan at all.',26),890)},
];
export const section8TeachingDiagramFiles = Object.fromEntries(section8TeachingVisuals.map(v=>[v.file,v.svg]));
