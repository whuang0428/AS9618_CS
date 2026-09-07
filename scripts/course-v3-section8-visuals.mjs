import { section8ExactVisuals } from "./course-v3-section8-exact-visuals.mjs";

const concept = (unitKey,file,title,caption,alt,facts)=>({unitKey,file,title,caption,alt,facts});
export const section8ConceptVisuals = [
  concept("S8.01-FILES","shared-facts.png","Store shared patient facts once",
    "Compare inconsistent copies in separate applications with references to one shared patient record.",
    "Three separate files disagree about patient 14's location. Related records instead reference one Patient record.",
    ["On the left, appointment and billing copies say York while the reception copy says Leeds.","On the right, related records hold PatientID 14 and retrieve the shared location from Patient.","Centralising this shared fact reduces inconsistent copies; the design and controlled updates still matter."]),
  concept("S8.05-MODELLING","data-modelling.png","Translate a business rule into a model",
    "Identify Patient and Appointment, then document the relationship in both directions.",
    "A designer discusses visits, sketches the two entities, then documents a one-to-many Patient–Appointment model.",
    ["Discover the organisation's facts and business rules before drawing a model.","One patient can have many appointments, and each appointment has one patient.","The model identifies the entity keys and the reference from Appointment to Patient."]),
  concept("S8.05-SECURITY","access-rights.png","Permit operations according to user roles",
    "Trace each role's permitted operation; the blocked route is specifically an attempted payroll change.",
    "A tutor can update attendance but cannot modify payroll; a payroll clerk has payroll update rights.",
    ["This example policy lets a tutor update attendance while blocking payroll changes.","A payroll clerk has permission to update payroll.","Assign access rights to individuals or groups according to the operations their roles require."]),
  concept("S8.05-BACKUP","backup-recovery.png","Prepare, protect, restore and check",
    "Follow the protected backup copy into recovery after a separate live-storage failure.",
    "A consistent backup is stored separately, restored to replacement storage, and checked for a usable restored state.",
    ["Take a consistent backup and protect a copy from the same failure as live storage.","Restore a suitable copy after loss or corruption, then check the recovered database.","Test recovery before an emergency; the available recovery point determines which changes can be recovered."]),
  concept("S8.06-DEVELOPER","developer-interface.png","Build the objects and interfaces users need",
    "The developer configures definitions, an admissions form and an attendance report using the DBMS tools.",
    "A developer interface produces a Pupil field definition, an admissions form and an attendance report linked to the school database.",
    ["Table definitions specify fields and constraints.","Form-design tools arrange input controls; report tools format retrieved information.","Constructing these objects differs from the query processor executing their eventual requests."]),
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
