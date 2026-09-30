import { section8ExactVisuals } from "./course-v3-section8-exact-visuals.mjs";

const concept = (unitKey,file,title,caption,alt,facts)=>({unitKey,file,title,caption,alt,facts});
export const section8ConceptVisuals = [
  concept("S8.01-FILES","shared-facts.png","Store shared patient facts once",
    "Compare inconsistent copies in separate applications with references to one shared patient record.",
    "Three separate files disagree about patient 14's location. Related records instead reference one Patient record.",
    ["On the left, appointment and billing copies say York while the reception copy says Leeds.","On the right, related records hold PatientID 14 and retrieve the shared location from Patient.","Centralising this shared fact reduces inconsistent copies; the design and controlled updates still matter."]),
  concept("S8.05-MODELLING","data-modelling-academic.svg","Translate a business rule into a model",
    "Read the school rule, identify Tutor and Student, then trace the foreign-key reference on the many side.",
    "A one-to-many Tutor–Student model: Tutor has primary key TutorID; Student has primary key StudentID and required foreign key TutorID referencing Tutor.TutorID.",
    ["Each student has one tutor; one tutor may advise many students.","Tutor owns TutorID and TutorName. Student owns StudentID, StudentName, TutorID and Mark.","Student.TutorID references Tutor.TutorID. If a student may have several tutors, model a StudentTutor association instead of one tutor reference."]),
  concept("S8.05-SECURITY","access-rights-academic.svg","Permit operations according to user roles",
    "Compare permission with integrity for three independent requests, restarting from the same school records each time.",
    "A permission matrix allows Readers to retrieve Student records and Editors to retrieve and insert. A valid insertion by an Editor succeeds; the same insertion by a Reader is denied; an Editor's insertion referring to missing tutor 9 fails integrity checks.",
    ["In this example group policy, Readers may retrieve Student records; Editors may also insert them.","The row order is StudentID, StudentName, TutorID, Mark. Editor insertion (22, Ben, 7, 80) is permitted and valid; Reader insertion of the same row is denied.","Editor insertion (23, Chen, 9, 80) is permitted but fails because tutor 9 is absent. Tutor 7 exists, StudentID must be unique, and Mark must be 0–100.","Access rights and integrity impose separate requirements; permission to insert does not relax database constraints."]),
  concept("S8.05-BACKUP","backup-recovery.png","Prepare, protect, restore and check",
    "Follow the protected backup copy into recovery after a separate live-storage failure.",
    "A consistent backup is stored separately, restored to replacement storage, and checked for a usable restored state.",
    ["Take a consistent backup and protect a copy from the same failure as live storage.","Restore a suitable copy after loss or corruption, then check the recovered database.","Test recovery before an emergency; the available recovery point determines which changes can be recovered."]),
  concept("S8.06-DEVELOPER","developer-interface-academic.svg","Build the objects and interfaces users need",
    "Compare a table definition, a bound entry form and a report layout; then follow the form's submitted request.",
    "Student fields and constraints appear beside a form for student 22, Ben, tutor 7, mark 80 and a report preview containing Amina 73 and Ben 80 after insertion. A form request reaches the DBMS, which checks permission and constraints before storing the record.",
    ["The Student table defines StudentID as its primary key, StudentName, TutorID as a foreign key and Mark in the range 0–100.","Form controls are linked to those fields. Report-design tools format retrieved StudentName and Mark values; the shown report is a preview after successful insertion.","When an Editor submits (22, Ben, 7, 80), the DBMS checks permission and constraints before storing the row and allowing confirmation.","Form checks assist input; database rules also apply to requests from other tools. Constructing objects differs from executing their later requests."]),
  concept("S8.06-PROCESSOR","query-processor.png","Turn a SQL request into a result",
    "Read the request-checking, planning and execution stages within the query processor.",
    "A SQL request is checked against definitions, assigned an execution plan, executed and returned as a result.",
    ["Check syntax, names and the permitted operation.","Choose a suitable execution plan using definitions and available access paths.","Execute the plan and return the requested result; an index is not necessarily used for every query."]),
  concept("S8.07-DDL","structure-versus-data.png","Distinguish a new attribute from a new value",
    "The upper example adds DueDate to a table definition; the lower example changes a value in existing fields.",
    "DDL adds a DueDate column to Loan. A separate DML example changes member 14's phone from 111 to 222 without changing the fields.",
    ["Adding DueDate changes the Loan table definition and is DDL.","Updating the phone for member 14 changes a stored value and is DML.","SQL expresses both definition and manipulation requests."]),
];

export const section8VisualPlacements = [
  ...section8ConceptVisuals,
  ...section8ExactVisuals.map(({svg,...metadata})=>metadata),
  {unitKey:"S8.03-ER",file:"clinic-er.svg"},
];
const visuals = new Map([...section8ConceptVisuals,...section8ExactVisuals].map(({svg,...v})=>[v.unitKey,v]));
const retainDataTables = new Set(["S8.08-READ","S8.10-SELECT","S8.10-WHERE"]);

export function addSection8Visual(unit) {
  const diagram=visuals.get(unit.unitKey);
  if(!diagram) return unit;
  return {
    ...unit, useAuthoredVisual:true, preserveTeachingSteps:true,
    materials:[
      {type:"reviewed-visual",asset:`/assets/course-v3/section-8/${diagram.file}`,title:diagram.title,caption:diagram.caption,alt:diagram.alt,facts:[...diagram.facts],review:"reviewed",preserveText:true,objectiveIds:[...unit.objectiveIds]},
      ...unit.materials.filter(m=>m.type === "worked-example" || m.preserve || (retainDataTables.has(unit.unitKey) && m.type === "table")).map(m=>({...m,preserve:m.type !== "worked-example" || m.preserve})),
    ],
  };
}
