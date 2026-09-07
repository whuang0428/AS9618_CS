import { section8Databases as db, section8SqlCases as sql } from "./course-v3-section8-sql.mjs";

// Reproducible diagrams use the same data as the executed SQL examples.
const C={ink:"#183448",blue:"#2369a0",teal:"#177f7b",amber:"#b66a22",pale:"#eaf5f4",line:"#b7cbd5",white:"#ffffff",muted:"#637887"};
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const txt=(x,y,s,size=26,colour=C.ink,anchor="start",weight=400)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${colour}" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
const rect=(x,y,w,h,fill=C.white,stroke=C.line,r=10)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const lines=(x,y,ss,size=25,gap=36,colour=C.ink)=>ss.map((s,i)=>txt(x,y+i*gap,s,size,colour)).join("");
const arrow=(x1,y1,x2,y2,colour="teal",dashed=false)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C[colour]}" stroke-width="4" fill="none" ${dashed?'stroke-dasharray="8 7" ':""}marker-end="url(#${colour})"/>`;
const path=(d,colour="teal",end=true)=>`<path d="${d}" stroke="${C[colour]}" stroke-width="3" fill="none"${end?` marker-end="url(#${colour})"`:""}/>`;
const pill=(x,y,w,s,colour="teal")=>rect(x,y,w,46,C.pale,C[colour],23)+txt(x+w/2,y+31,s,23,C[colour],"middle",700);
const box=(x,y,w,title,ss,colour="teal")=>rect(x,y,w,86+ss.length*36,C.white,C[colour])+rect(x,y,w,54,C.pale,C[colour])+txt(x+18,y+36,title,27,C[colour],"start",700)+lines(x+18,y+91,ss,24);
const schema=(x,y,w,name,fields,colour="blue")=>box(x,y,w,name,fields,colour);
const wrap=(s,n=87)=>{const a=[];let line="";for(const word of s.split(" ")){if(line.length+word.length>n){a.push(line);line=word;}else line+=(line?" ":"")+word;}if(line)a.push(line);return a;};
const frame=(title,subtitle,body,footer,height=780)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle+" "+footer)}</desc><defs>${["teal","blue","amber"].map(c=>`<marker id="${c}" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C[c]}"/></marker>`).join("")}</defs><rect width="1200" height="${height}" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${txt(44,58,title,35,C.ink,"start",700)}${lines(44,103,wrap(subtitle),24,31,C.muted)}${body}${rect(35,height-113,1130,87,"#f3f7f9",C.line)}${lines(55,height-78,wrap(footer),23,31)}</g></svg>`;
function grid(x,y,w,headers,rows,options={}){
 const rh=options.rh??46, widths=options.widths??headers.map(()=>w/headers.length), xs=[x];for(const width of widths)xs.push(xs.at(-1)+width);
 let svg="";for(let r=-1;r<rows.length;r++)for(let c=0;c<headers.length;c++){
  const fill=r<0?C.ink:options.cells?.[`${r},${c}`]??(options.cols?.includes(c)||options.rows?.includes(r)?"#d9efea":C.white);
  svg+=rect(xs[c],y+(r+1)*rh,widths[c],rh,fill,C.line,0)+txt(xs[c]+13,y+(r+1)*rh+rh*.66,(r<0?headers:rows[r])[c],options.size??23,r<0?C.white:C.ink,"start",r<0?700:400);
 }
 return {svg,rowY:r=>y+(r+1.5)*rh,cellX:c=>(xs[c]+xs[c+1])/2,bottom:y+(rows.length+1)*rh};
}
const records=[];
const add=(key,file,title,subtitle,body,footer,facts,height)=>records.push({unitKey:key,file,title,caption:subtitle,alt:footer,facts,svg:frame(title,subtitle,body,footer,height)});

// L01: relational vocabulary, keys, associations and access paths.
{
 const t=grid(260,245,850,["PatientID","PatientName","Town"],[[14,"Imani","York"],[18,"Hugo","Leeds"]],{rows:[0],cols:[2],cells:{"0,2":"#ffe4c8"}});
 add("S8.02-TERMS","relational-terms.svg","From an entity to its stored representation","Locate a whole table, one record, one attribute and one field value.",
 box(45,160,180,"Entity",["Patient"],"blue")+arrow(225,230,300,230,"blue")+txt(310,212,"Patient table",28,C.ink,"start",700)+t.svg+txt(46,302,"Record /",24)+txt(46,334,"tuple",24)+arrow(175,314,248,314)+txt(770,177,"Field / attribute: Town",25,C.teal)+arrow(973,188,973,232)+pill(320,474,660,"One cell value: York", "amber")+path("M1118 314H1140V497H992","amber"),
 "An entity is what is represented; a table holds records describing its occurrences.",["Patient is the entity type represented.","One row, such as patient 14, is a record or tuple.","Town is a field or attribute; York is one value in it."]);
}
{
 const upper=grid(50,185,730,["PupilID","ExamNumber","TutorGroup"],[[41,"E301","12A"],[42,"E302","12A"],[43,"E303","12B"]],{cols:[0,1],widths:[200,270,260]});
 const lower=grid(690,470,450,["AttendanceID","PupilID"],[[901,41],[902,41]],{cols:[1],widths:[250,200]});
 add("S8.02-KEYS","keys-and-references.svg","Keys answer different questions","PupilID and ExamNumber are independently unique; TutorGroup may repeat.",upper.svg+pill(52,405,305,"PupilID: chosen PK","blue")+pill(393,405,384,"ExamNumber: candidate","blue")+box(825,175,315,"Secondary key",["TutorGroup = 12A","finds pupils 41, 42"])+lower.svg+path("M1146 539H1175V130H30V254H43","teal")+path("M1146 585H1175V539","teal",false)+txt(60,535,"Attendance.PupilID is a foreign key.",25)+txt(60,578,"Repeated references to pupil 41 are valid.",25),
 "A secondary key supports retrieval. A foreign key refers to a related key; it need not be unique.",["PupilID and ExamNumber are candidate keys under the stated uniqueness rules.","PupilID is chosen as the primary key.","TutorGroup retrieves a group of matching pupils.","Attendance.PupilID may reference pupil 41 more than once."]);
}
{
 const tiny=(x,y,label)=>rect(x,y,220,60,C.pale)+txt(x+110,y+39,label,25,C.ink,"middle",700);
 add("S8.02-RELATIONSHIPS","relationship-cardinality.svg","Read each relationship in both directions","The 1 and many labels describe maximum cardinality.",
 tiny(70,176,"Employee")+tiny(875,176,"Permit")+path("M290 206H875","blue",false)+txt(330,193,"1",25)+txt(830,193,"1",25)+
 tiny(70,296,"Customer")+tiny(875,296,"Order")+path("M290 326H875","teal",false)+txt(330,313,"1",25)+txt(790,313,"many",25)+
 tiny(70,416,"Student")+tiny(875,416,"Club")+path("M290 446H875","amber",false)+txt(330,433,"many",25)+txt(790,433,"many",25)+
 arrow(600,464,600,512,"amber")+tiny(65,541,"Student")+tiny(450,541,"Membership")+tiny(865,541,"Club")+path("M285 571H450","teal",false)+path("M670 571H865","teal",false)+txt(309,559,"1",23)+txt(361,559,"many",23)+txt(693,559,"many",23)+txt(823,559,"1",23),
 "Membership records one student-club association, turning the many-to-many link into two one-to-many links.",["Employee to Permit is one-to-one in this example.","Customer to Order is one-to-many.","Student to Club is many-to-many.","Membership links each student-club pair; its key can be the pair of IDs."]);
}
{
 const p=grid(70,215,360,["PatientID"],[[14],[18]]);const a=grid(730,215,380,["PatientID (FK)"],[[14],[99]]);
 add("S8.02-REFERENTIAL","referential-integrity.svg","A reference must reach an existing record","Check a proposed Appointment.PatientID against Patient.PatientID.",txt(70,187,"Patient",28,C.ink,"start",700)+p.svg+txt(730,187,"Proposed appointments",28,C.ink,"start",700)+a.svg+arrow(726,a.rowY(0),438,p.rowY(0))+pill(465,213,204,"14: match")+path(`M730 ${a.rowY(1)}H570V447`,"amber")+pill(340,466,460,"99: no matching patient","amber")+txt(115,572,"Allow reference to 14",27,C.teal)+txt(700,572,"Reject reference to 99",27,C.amber),
 "Each non-null foreign-key value must match the referenced key. Null is allowed only when the field permits it.",["Patient contains IDs 14 and 18.","A non-null foreign key of 14 has a matching parent.","A foreign key of 99 has no match and must be rejected.","Foreign-key uniqueness is not required by this relationship alone."]);
}
{
 const t=grid(735,209,405,["PatientID","Town"],[[14,"York"],[18,"Leeds"],[22,"York"],[31,"Bath"]],{rows:[0,2],widths:[205,200]});
 add("S8.02-INDEX","index-lookup.svg","An index provides another access path","An index on Town can locate several records with the same town value.",
 pill(50,200,250,"Find Town = York","blue")+arrow(300,225,395,225)+box(420,172,245,"Town index",["Bath → 31","Leeds → 18","York → 14, 22"])+t.svg+path("M667 350H698V278H728")+path("M698 350V369H728")+box(95,490,435,"Benefit",["Locate suitable matches","without scanning every row."])+box(625,490,470,"Cost",["Extra storage and maintenance","when indexed values change."],"amber"),
 "The actual index stores record references or locations; the IDs here identify the illustrated target records.",["York has two matching patient records: 14 and 22.","An index is separate from the stored table records.","It can improve suitable retrieval, at the cost of storage and update work."]);
}

// L02: reveal exactly which dependency is removed at each normal form.
{
 const t=grid(590,280,550,["OrderID","ProductID","Quantity"],[[501,"P1",3],[501,"P2",1]],{cols:[0,1],widths:[180,190,180]});
 add("S8.04-1NF","normalisation-1nf.svg","1NF: expand a repeating group","For this example, a product occurs at most once in each order.",
 schema(55,190,405,"Order 501",["Items:","P1 / quantity 3","P2 / quantity 1"],"amber")+arrow(468,320,573,320)+txt(592,224,"One product line per row",27,C.teal)+t.svg+path("M610 464H1115","blue",false)+txt(608,513,"Key: (OrderID, ProductID)",25,C.blue)+txt(85,576,"Retain the order identifier in every product-line row.",27),
 "Atomic values remove the repeating group. Other duplicated facts can still require 2NF and 3NF work.",["The Items field holds two product entries before decomposition.","The two 1NF rows are (501, P1, 3) and (501, P2, 1).","The composite key identifies each order-product line.","This close-up shows the item group; the full worked example also retains customer and product facts."]);
}
{
 add("S8.04-2NF","normalisation-2nf.svg","2NF: separate facts with a partial dependency","Start from the composite key (OrderID, ProductID) in the 1NF relation.",
 pill(100,170,350,"OrderID","blue")+pill(720,170,350,"ProductID","teal")+
 arrow(275,224,275,300,"blue")+arrow(895,224,895,300)+
 schema(65,322,435,"SalesOrder",["OrderID  PK","CustomerID","CustomerName"],"blue")+
 schema(700,322,435,"Product",["ProductID  PK","ProductName","UnitPrice"])+
 path("M450 193H535V545","blue")+path("M720 193H660V545","teal")+
 schema(390,557,420,"OrderLine",["OrderID + ProductID  PK","Quantity depends on both"],"amber"),
 "Keep both foreign keys on OrderLine. CustomerName still depends on CustomerID, which is addressed in 3NF.",["OrderID determines the customer details for the order.","ProductID determines ProductName and UnitPrice.","The whole (OrderID, ProductID) key determines Quantity.","Removing partial dependencies produces SalesOrder, Product and OrderLine."],880);
}
{
 add("S8.04-3NF","normalisation-3nf.svg","3NF: remove the transitive dependency","CustomerName describes the customer identified by CustomerID.",
 pill(65,187,260,"OrderID","blue")+pill(468,187,265,"CustomerID")+pill(865,187,280,"CustomerName","amber")+arrow(333,210,456,210,"blue")+arrow(741,210,852,210,"amber")+txt(410,286,"The name depends on a non-key attribute.",25,C.amber)+arrow(600,316,600,389)+
 schema(90,420,430,"SalesOrder",["OrderID  PK","CustomerID  FK"],"blue")+schema(700,420,410,"Customer",["CustomerID  PK","CustomerName"])+arrow(528,541,690,505)+txt(530,575,"references",23,C.teal),
 "Keep CustomerID in SalesOrder so each order can still retrieve its customer's name from Customer.",["OrderID determines CustomerID.","CustomerID determines CustomerName.","SalesOrder keeps OrderID and the CustomerID reference.","Customer stores each CustomerName with its CustomerID."]);
}
{
 add("S8.04-DESIGN","normalisation-reconstruct.svg","Check that the original facts remain recoverable","Reconstruct order 501, product P1, from the four related 3NF tables.",
 schema(70,170,420,"OrderLine",["OrderID 501","ProductID P1","Quantity 3"],"blue")+
 schema(700,165,430,"SalesOrder",["OrderID 501","CustomerID C7"],"blue")+
 schema(700,420,430,"Customer",["CustomerID C7","CustomerName Amina"])+
 schema(70,420,420,"Product",["ProductID P1","ProductName Pen","UnitPrice 2"])+
 arrow(494,245,690,245,"blue")+arrow(910,330,910,408)+arrow(280,369,280,408)+
 pill(70,666,1060,"501  |  C7  |  Amina  |  P1  |  Pen  |  2  |  3"),
 "All seven original values are present. A decomposition that loses a linking field can lose information.",["OrderLine supplies OrderID 501, ProductID P1 and Quantity 3.","SalesOrder identifies CustomerID C7; Customer supplies Amina.","Product supplies Pen and UnitPrice 2.","Together the records reconstruct the original seven-value line."],880);
}

// L03: metadata, logical organisation and integrity are different mechanisms.
{
 add("S8.05-DICTIONARY","data-dictionary.svg","Metadata describes the data","A data dictionary stores definitions, rather than one person's field value.",
 schema(60,190,450,"Dictionary entry",["Field: BirthDate","Data type: DATE","Null allowed: no"],"blue")+
 schema(720,190,415,"Pupil record",["PupilID: 41","BirthDate: 2010-03-18"])+
 path("M510 276H610V480H720","blue")+box(740,422,390,"Definition check",["Use the declared type","and null constraint."])+
 txt(63,514,"Definition / metadata",28,C.blue)+txt(725,387,"Stored occurrence / data",26,C.teal),
 "The dictionary can support validation and query processing without being a second copy of pupil records.",["The field definition says BirthDate has type DATE and does not allow null in this example.","2010-03-18 is a value belonging to a particular pupil record.","The DBMS uses metadata when checking a proposed value."]);
}
{
 add("S8.05-SCHEMA","logical-schema.svg","A logical schema describes organisation","Programs name tables and fields; the DBMS handles their physical storage.",
 box(65,165,380,"Application",["Requests PupilName","and GroupName"],"blue")+arrow(455,245,550,245,"blue")+
 schema(580,163,535,"Logical schema",["TutorGroup(GroupID PK, GroupName)","Pupil(PupilID PK, PupilName, GroupID FK)","Pupil.GroupID → TutorGroup.GroupID"])+
 arrow(850,366,850,446)+box(605,470,470,"DBMS storage management",["Translate logical access","into physical retrieval."])+
 box(65,470,380,"Physical storage",["Pages, files and devices","No disk-sector names","in the pupil query."],"amber")+arrow(595,552,455,552,"amber"),
 "The logical schema is the database's organised definition; the dictionary stores metadata about that definition.",["TutorGroup and Pupil are linked through GroupID.","The schema names tables, attributes, types, keys and relationships.","Applications use logical identifiers instead of physical disk addresses."],830);
}
{
 add("S8.05-INTEGRITY","integrity-gates.svg","Check a change before accepting it","A proposed ExamResult must satisfy every applicable constraint.",
 pill(80,176,1030,"Proposed record → ResultID, CandidateID, Mark","blue")+arrow(210,240,210,313,"blue")+arrow(600,240,600,313)+arrow(990,240,990,313,"amber")+
 box(45,340,345,"Primary key",["ResultID already used?","Reject a duplicate."],"blue")+box(428,340,345,"Foreign key",["CandidateID absent?","Reject the reference."])+box(813,340,345,"Range rule",["Mark outside 0–100?","Reject 145."],"amber")+
 pill(215,591,770,"All checks pass → permit the proposed change"),
 "A valid mark such as 73 may still be factually wrong. Constraints do not prove correct transcription.",["ResultID must satisfy its primary-key constraint.","CandidateID must reference an existing candidate.","The stated mark range is 0 to 100 inclusive.","Passing the defined constraints does not establish factual truth."]);
}

// L04: diagrams classify effects rather than introducing extra SQL syntax.
{
 const base=grid(447,220,290,["MemberID"],[[1],[2],[3]],{size:25});
 add("S8.07-DML","dml-record-operations.svg","DML works with records","The definition stays in place while data is retrieved or maintained.",
 base.svg+pill(437,160,310,"Stored Member rows","blue")+
 box(55,205,275,"SELECT",["Read a result","Stored rows remain."],"blue")+arrow(438,305,337,305,"blue")+
 box(860,205,285,"INSERT INTO",["Add a new row","for MemberID 4."])+arrow(850,305,749,305)+
 box(55,478,425,"UPDATE",["Change a field value","in an identified record."],"amber")+path("M500 412V438H333V466","amber")+
 box(700,478,445,"DELETE FROM",["Remove an identified row","from the stored table."],"amber")+path("M685 412V438H845V466","amber"),
 "SELECT is DML retrieval. INSERT INTO, UPDATE and DELETE FROM are DML maintenance.",["A SELECT query returns information without changing the stored rows here.","INSERT INTO adds a row, UPDATE changes field values, and DELETE FROM removes rows.","These operations use the existing table definition."]);
}
{
 add("S8.07-SQL","sql-language-roles.svg","SQL includes both DDL and DML","Classify a statement by its effect on the definition or on the records.",
 box(420,165,360,"SQL",["Structured Query Language"],"blue")+
 path("M490 297V350H285V399","blue")+path("M710 297V350H915V399")+
 box(65,425,440,"DDL",["Define or alter structure","CREATE TABLE","ALTER TABLE"],"blue")+
 box(685,425,445,"DML",["Retrieve or maintain records","SELECT / INSERT INTO","UPDATE / DELETE FROM"]),
 "DDL and DML describe roles within SQL. They are not two alternative database products.",["SQL expresses both structural and record operations.","CREATE TABLE and ALTER TABLE are examples of DDL.","SELECT and the three record maintenance commands are DML in the syllabus classification."],850);
}

// L05: SQL interpretation and definitions, with exact identifiers and types.
{
 const source=db.books.tables[0], out=sql.read;
 const t=grid(50,352,595,["Title","Price"],source.rows.map(r=>[r[1],r[3]]),{rows:[0,2],widths:[340,255]});
 const result=grid(790,398,355,out.headers,out.expectedRows,{widths:[220,135]});
 add("S8.08-READ","read-sql-statement.svg","Read what each SQL clause asks for","Trace the supplied query against Book; the stored records do not change.",
 box(60,160,360,"SELECT Title, Price",["Which output fields?"],"blue")+box(450,160,250,"FROM Book",["Which source?"])+box(730,160,410,"WHERE Price >= 10",["Which rows qualify?"],"amber")+
 t.svg+arrow(657,465,778,465)+result.svg+txt(56,322,"Book: relevant input fields",27,C.ink,"start",700)+txt(790,361,"Result",27,C.teal,"start",700),
 "ORDER BY BookID gives Atlas then River. Price 10 satisfies the inclusive >= comparison.",["SELECT requests Title and Price from Book.","The WHERE condition retains Atlas at 14 and River at 10.","ORDER BY BookID determines the shown result order."]);
}
{
 add("S8.09-DATABASE","create-database.svg","Create the database before defining its tables","A database is a container for the definitions and records added later.",
 box(80,170,1035,"CREATE DATABASE SchoolLibrary;",["Creates the named database."],"blue")+
 arrow(600,312,600,375,"blue")+rect(265,402,675,225,"#f0f7fb",C.blue,25)+txt(600,457,"SchoolLibrary",31,C.blue,"middle",700)+rect(322,489,250,87,C.white,C.line)+rect(629,489,250,87,C.white,C.line)+txt(447,541,"Future tables",25,C.muted,"middle")+txt(754,541,"Future records",25,C.muted,"middle"),
 "Choose SchoolLibrary in the DBMS before defining tables. CREATE DATABASE does not insert Student records.",["CREATE DATABASE SchoolLibrary creates a database with that name.","The outlined contents are future objects, not objects created by this statement.","Selecting the active database is a separate DBMS action."]);
}
{
 const entries=[["INTEGER","StudentID","41"],["REAL","Score","82.5"],["BOOLEAN","Active","TRUE"],["CHARACTER(1)","Initial","'A'"],["VARCHAR(40)","StudentName","'Amina'"],["DATE","BirthDate","2010-03-18"],["TIME","ArrivalTime","08:30:00"]];
 let body="";for(let i=0;i<entries.length;i++){const [type,name,value]=entries[i],x= i<3?65+i*380:55+(i-3)*290,y=i<3?180:420,w=i<3?315:260;body+=box(x,y,w,type,[name,value],i<3?"blue":"teal");}
 add("S8.09-TYPES","sql-data-types.svg","Choose a type from the meaning of a value","The seven syllabus types represent different kinds of Student information.",body,
 "Digits alone do not make a number: a code such as 007B needs character data to retain its meaning.",entries.map(([type,name,value])=>`${name} uses ${type}; example value ${value}.`),850);
}
{
 const before=grid(60,340,440,["StudentID","TutorID"],[[21,7]],{widths:[240,200]});const after=grid(650,340,490,["StudentID","TutorID","Email"],[[21,7,"NULL"]],{cols:[2],widths:[175,160,155]});
 add("S8.09-ALTER","alter-table.svg","ALTER TABLE adds a field to the definition","Existing records remain; this added Email field has no default value.",
 box(85,167,1030,"ALTER TABLE Student ADD Email VARCHAR(80);",[],"blue")+before.svg+arrow(514,386,636,386)+after.svg+txt(68,306,"Before: selected fields",25)+txt(655,306,"After: same record, new field",25)+
 txt(112,517,"The table definition gains Email.",28,C.blue)+txt(112,563,"No particular email address is assigned by this statement.",27),
 "A later UPDATE supplies a value for a selected student. The other existing Student fields are omitted here.",["Student already exists and contains StudentID 21 with TutorID 7.","ALTER TABLE adds Email as VARCHAR(80).","The existing record has NULL in Email because no default was supplied.","Assigning an address would be a separate data operation."]);
}
{
 const allowed=grid(65,269,450,["LockerID (PK)","Location"],[[1,"East"],[2,"West"]],{widths:[245,205]});
 add("S8.09-PRIMARY","primary-key-constraint.svg","A primary key identifies each record","The LockerID constraint requires unique, non-null identifiers.",
 pill(200,169,800,"PRIMARY KEY (LockerID)","blue")+allowed.svg+txt(75,236,"Existing Locker records",26)+
 box(705,253,425,"Proposed LockerID 1",["Already present → reject"],"amber")+box(705,458,425,"Proposed NULL key",["No identifier → reject"],"amber")+
 path("M520 335H608V310H693","amber")+path("M607 335V515H693","amber"),
 "For a composite primary key, the combination must be unique; each component is part of the identifier.",["LockerID 1 and 2 identify existing records.","A second LockerID 1 would violate uniqueness.","A primary key cannot be null."]);
}
{
 const p=grid(70,225,350,["LockerID (PK)"],[[3],[8]]);const c=grid(700,225,435,["AllocationID","LockerID (FK)"],[[71,3],[72,3]],{cols:[1],widths:[210,225]});
 add("S8.09-FOREIGN","foreign-key-definition.svg","Declare which field references which key","Allocation is the child table; Locker supplies the referenced primary key.",
 txt(70,190,"Locker",27,C.blue,"start",700)+p.svg+txt(700,190,"Allocation",27,C.teal,"start",700)+c.svg+
 path("M1141 294H1170V135H30V294H62")+path("M1141 340H1170V294","teal",false)+
 box(68,456,1060,"FOREIGN KEY (LockerID) REFERENCES Locker(LockerID)",["Allocation.LockerID refers to Locker.LockerID."],"blue"),
 "Both allocations can reference locker 3. This foreign-key declaration alone does not make the child field unique.",["Allocation.LockerID references Locker.LockerID.","Allocation has its own AllocationID primary key.","The value 3 is a valid repeated reference because Locker 3 exists."]);
}

// L06: visualise the actual executed source, result and changed records.
{
 const t=grid(65,233,555,["MemberID","MemberName","Active"],db.library.tables[0].rows,{cols:[1],widths:[170,220,165]});const out=grid(865,233,280,sql.select.headers,sql.select.expectedRows,{rows:[0,1,2,3]});
 add("S8.10-SELECT","select-projection.svg","SELECT chooses the output columns","Project MemberName from Member while leaving its stored fields intact.",
 t.svg+arrow(632,350,851,350)+pill(650,203,190,"SELECT","blue")+out.svg+txt(70,193,"Stored Member table",27,C.blue,"start",700)+txt(865,193,"Result",27,C.teal,"start",700),
 "FROM names the source. ORDER BY MemberID makes the returned names follow the shown identifier order.",["Member has MemberID, MemberName and Active fields.","Only MemberName is returned: Asha, Ben, Chen and Dara.","Choosing result columns does not delete stored fields."]);
}
{
 const loan=db.library.tables[1].rows;let b=grid(50,210,430,["LoanID","Fee","Returned"],loan.map(r=>[r[0],r[2],r[3]]),{rows:[2,4],widths:[145,120,165]}).svg;
 b+=box(545,180,570,"WHERE Returned = FALSE AND Fee >= 3",[],"blue");
 const decisions=loan.map(r=>[r[0],r[3]==="FALSE"?"yes":"no",r[2]>=3?"yes":"no",r[3]==="FALSE"&&r[2]>=3?"KEEP":"omit"]);
 b+=grid(550,290,585,["LoanID","Unreturned?","Fee >= 3?","Result"],decisions,{rows:[2,4],widths:[132,160,160,133],size:21}).svg+arrow(488,408,535,408);
 add("S8.10-WHERE","where-and-filter.svg","WHERE: both conditions must be true","Trace each row through the unreturned and minimum-fee tests.",b,
 "Loan 202 passes the fee test but is returned. Loan 201 is unreturned but its fee is too small. Keep 203 and 205.",["The condition is Returned = FALSE AND Fee >= 3.","Loan 203 has fee 6 and Loan 205 has fee 3; both are unreturned.","Loans failing either part of the condition are omitted."]);
}
{
 const rows=db.library.tables[1].rows.map(r=>[r[0],r[2]]);const from=grid(70,210,375,["LoanID","Fee"],rows,{widths:[205,170]});const to=grid(780,210,375,sql.sort.headers,sql.sort.expectedRows,{widths:[205,170],rows:[0]});
 const arrows=rows.map((r,i)=>arrow(457,from.rowY(i),768,to.rowY(sql.sort.expectedRows.findIndex(o=>o[0]===r[0])),i%2?"blue":"teal")).join("");
 add("S8.10-ORDER","order-by-sorting.svg","ORDER BY rearranges the result rows","Sort Fee DESC; use LoanID ASC to resolve equal-fee ties.",from.svg+arrows+to.svg+txt(70,172,"Input order",27,C.blue,"start",700)+txt(780,172,"Requested result order",27,C.teal,"start",700)+pill(310,560,590,"6 → 4 → 3 → 2 → 0"),
 "The arrow follows each LoanID to its new result position. Sorting does not modify the stored fee values.",["The sorted LoanIDs are 203, 202, 205, 201 and 204.","The fees are in descending order: 6, 4, 3, 2, 0.","A secondary sort key applies only when the earlier key ties."]);
}
{
 const groups=[...db.library.tables[1].rows.reduce((g,[loanId,memberId])=>g.set(memberId,[...(g.get(memberId)??[]),loanId]),new Map())];let b="";
 groups.forEach(([id,loans],i)=>{const x=60+i*385;b+=box(x,195,325,`MemberID ${id}`,loans.map(n=>`Loan ${n}`),i===1?"blue":"teal")+arrow(x+160,195+86+loans.length*36+10,x+160,465)+pill(x+25,490,275,`COUNT(*) = ${loans.length}`,i===1?"blue":"teal");});
 add("S8.10-GROUP","group-by-count.svg","GROUP BY forms one group per key value","Count Loan rows separately within each represented MemberID group.",b,
 "The groups are (1, 2), (2, 2) and (3, 1). Member 4 has no Loan record, so Loan alone supplies no group for 4.",["Loans 201 and 202 belong to MemberID 1.","Loans 203 and 205 belong to MemberID 2.","Loan 204 belongs to MemberID 3.","COUNT(*) returns 2, 2 and 1 for those groups."]);
}
{
 const members=db.library.tables[0].rows.map(r=>[r[0],r[1]]), loans=db.library.tables[1].rows.map(r=>[r[0],r[1]]);
 const a=grid(50,190,395,["MemberID","MemberName"],members,{widths:[175,220]});const b=grid(780,190,365,["LoanID","MemberID"],loans,{widths:[175,190]});
 const links=loans.map((r,i)=>arrow(455,a.rowY(members.findIndex(m=>m[0]===r[1])),770,b.rowY(i),r[1]===2?"blue":"teal")).join("");
 const out=grid(325,560,555,sql.join.headers,sql.join.expectedRows,{widths:[350,205],rh:40});
 add("S8.10-JOIN","inner-join-matches.svg","INNER JOIN returns matching row pairs","ON Member.MemberID = Loan.MemberID matches each loan to its member.",a.svg+b.svg+links+txt(65,161,"Member",25,C.blue,"start",700)+txt(780,161,"Loan: relevant fields",25,C.teal,"start",700)+txt(57,482,"Dara has no match.",24,C.amber)+txt(325,533,"Result ordered by LoanID",25,C.teal,"start",700)+out.svg,
 "Asha and Ben each appear twice because each has two matching loans. Unmatched members contribute no joined row.",["The matching condition compares the two MemberID fields.","Asha matches loans 201 and 202; Ben matches 203 and 205; Chen matches 204.","Dara has no Loan match and does not appear.","The output order is 201, 202, 203, 204, 205."],960);
}
{
 let b=txt(65,190,"Loan fees",27,C.blue,"start",700);[2,4,6,0,3].forEach((n,i)=>{b+=pill(80+i*225,220,150,String(n),i===3?"blue":"teal");});
 b+=box(55,335,340,"SUM(Fee)",["2 + 4 + 6 + 0 + 3","= 15"])+box(430,335,340,"COUNT(*)",["Five Loan rows","= 5"],"blue")+box(805,335,340,"AVG(Fee)",["15 / 5","= 3"]);
 b+=txt(60,592,"Separate sample: 2, NULL, 4",25,C.amber)+txt(60,632,"COUNT(*) = 3   COUNT(Fee) = 2   SUM = 6   AVG = 3",25);
 add("S8.10-AGGREGATES","aggregate-calculations.svg","Aggregates calculate over the selected records","Count rows, add known numeric values, and calculate their mean.",b,
 "Zero is a known value and remains included. COUNT(Fee), SUM(Fee) and AVG(Fee) ignore null Fee values.",["The five library fees total 15; COUNT(*) is 5 and AVG(Fee) is 3.","For 2, NULL and 4, three rows contain only two known fee values.","That separate sample has SUM 6 and AVG 3, rather than treating NULL as zero."],850);
}
{
 const before=db.library.tables[0].rows,after=[...before,[5,"Elena","TRUE"]];
 add("S8.11-INSERT","insert-new-record.svg","INSERT INTO adds a new record","Match the explicit field list with VALUES in the same order.",
 grid(60,239,470,["MemberID","MemberName","Active"],before,{widths:[135,205,130],size:23}).svg+grid(670,239,470,["MemberID","MemberName","Active"],after,{rows:[4],widths:[135,205,130],size:23}).svg+arrow(542,379,655,379)+
 txt(66,190,"Before",28,C.blue,"start",700)+txt(675,190,"After",28,C.teal,"start",700)+pill(84,579,1030,"(MemberID, MemberName, Active) → (5, 'Elena', TRUE)"),
 "The four original Member rows remain. Repeating this insertion unchanged would duplicate primary key 5.",["INSERT adds MemberID 5, MemberName Elena and Active TRUE.","The explicit field list determines which field receives each value.","The other four records remain unchanged."]);
}
{
 const before=db.library.tables[1].rows.map(r=>[r[0],r[1]]),after=before.filter(r=>r[0]!==204);
 add("S8.11-DELETE","delete-target-record.svg","DELETE FROM removes the selected row","WHERE LoanID = 204 targets one record in this example.",
 grid(65,227,430,["LoanID","MemberID"],before,{rows:[3],widths:[215,215],cells:{"3,0":"#ffe4c8","3,1":"#ffe4c8"}}).svg+
 grid(710,227,430,["LoanID","MemberID"],after,{widths:[215,215]}).svg+arrow(510,355,693,355,"amber")+
 txt(70,183,"Before",27,C.blue,"start",700)+txt(716,183,"After",27,C.teal,"start",700)+pill(160,570,875,"DELETE FROM Loan WHERE LoanID = 204;","amber"),
 "The table definition remains. Without WHERE, DELETE FROM Loan would target every Loan row.",["Loan 204 is removed and loans 201, 202, 203 and 205 remain.","The operation deletes a record rather than a column or table definition.","The WHERE condition limits the affected records."]);
}
{
 const before=db.library.tables[1].rows.map(r=>[r[0],r[2],r[3]]),after=before.map(r=>r[0]===203?[r[0],r[1],"TRUE"]:r);
 add("S8.11-UPDATE","update-target-value.svg","UPDATE changes a field in the selected record","SET Returned = TRUE changes LoanID 203; other loans retain their values.",
 grid(60,238,470,["LoanID","Fee","Returned"],before,{widths:[150,120,200],cells:{"2,2":"#ffe4c8"}}).svg+
 grid(675,238,470,["LoanID","Fee","Returned"],after,{widths:[150,120,200],cells:{"2,2":"#d9efea"}}).svg+arrow(542,395,661,395)+
 txt(65,190,"Before",27,C.blue,"start",700)+txt(680,190,"After",27,C.teal,"start",700)+pill(65,580,1070,"UPDATE Loan SET Returned = TRUE WHERE LoanID = 203;"),
 "Loan 203 remains, its fee is still 6, and loan 205 stays unreturned even though it belongs to the same member.",["The WHERE condition identifies LoanID 203.","Only Returned changes from FALSE to TRUE.","The row identity, fee and all other records are retained."]);
}

export const section8ExactVisuals = records;
