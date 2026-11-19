import { section8Materials } from './course-v3-section8-materials.mjs';
import { ids } from './course-v3-section8-material-helpers.mjs';
const unique = values => [...new Set(values)];
function topic(number,title) {
  const materials=section8Materials[number];
  if (!materials?.length) throw new Error(`Missing Section 8 materials for ${number}`);
  return {number,id:`s${number.replaceAll('.','-')}`,title,materials,
    unitKeys:unique(materials.flatMap(m=>m.unitKeys)),objectiveIds:unique(materials.flatMap(m=>m.objectiveIds)),papers:[]};
}
export const section8Journey = {
  42:{title:'Database concepts · flat-file and relational databases',intro:'Compare flat-file and relational databases. Use the library tables to identify entities, records, fields, keys and relationships.',groups:[topic('8.1.1','Flat-file and relational databases'),topic('8.1.2','Database terminology and E-R diagrams')]},
  43:{title:'Database concepts · normalisation',intro:'Convert order tables to first, second and third normal form. Use functional dependencies to determine whether a table is in 3NF.',groups:[topic('8.1.3','First, second and third normal form'),topic('8.1.4','Determine whether tables are in 3NF')]},
  44:{title:'Database management systems',intro:'Describe the features provided by a DBMS. Use the library example to explain data management, integrity, security, the developer interface and the query processor.',groups:[topic('8.2.1','Features provided by a DBMS'),topic('8.2.2','Developer interface and query processor')]},
  45:{title:'SQL · definition and manipulation',intro:'Explain the purposes of DDL and DML. Interpret SQL statements and execute them using the Library DBMS.',groups:[topic('8.3.1','Create and modify structure using DDL'),topic('8.3.2','Query and maintain data using DML'),topic('8.3.3','SQL and the interpretation of statements')]},
  46:{title:'Build the library with SQL DDL',intro:'Create a separate practice database, define the five related tables with appropriate types and keys, and change their definitions while inspecting the resulting schema.',groups:[topic('8.3.4','A complete SQL DDL example')]},
  47:{title:'Query and maintain library data',intro:'Write and execute SQL queries using selection, conditions, ordering, aggregate functions, grouping and joins. Use INSERT, UPDATE and DELETE to maintain records.',groups:[topic('8.3.5','SQL queries and data maintenance')]},
};
export const section8Checkpoints = {
  43:{id:'s8-checkpoint-concepts',title:'Database concepts · checkpoint',summary:['Explain how related tables address flat-file anomalies.','Identify records, fields, keys and cardinalities in a model.','Use functional dependencies to explain normalisation and determine whether tables are in 3NF.'],papers:['E056','E8D01','E065A','E058','E8N01'],extensionPapers:['E057','E8D02'],next:{page:44,target:'s8-2-1',label:'Continue to Database management systems'}},
  44:{id:'s8-checkpoint-dbms',title:'DBMS · checkpoint',summary:['Distinguish stored data, the model, the logical schema and dictionary.','Explain integrity, individual/group rights and backup procedures.','Explain the use and purpose of the developer interface and the query processor.'],papers:['E8N02','E059','E060','E065D'],extensionPapers:[],next:{page:45,target:'s8-3-1',label:'Continue to DDL and DML'}},
  47:{id:'s8-checkpoint-sql',title:'DDL and DML · checkpoint',summary:['Define a database and tables with appropriate types, primary keys and references.','Read and correct SQL, then write precise single- and two-table queries.','Maintain records using INSERT, UPDATE and DELETE.'],papers:['E061B','E061C','E065C','E062','E063','E8N03','E8N04'],extensionPapers:['E065B','E8N05'],next:null},
};
export const section8Modules = [
  {id:'s8-concepts',number:'8.1',title:'Database concepts',focus:'From a flat-file list to related tables, keys, E-R modelling and normalisation.',groups:['s8-1-1','s8-1-2','s8-1-3','s8-1-4'],checkpointId:'s8-checkpoint-concepts'},
  {id:'s8-dbms',number:'8.2',title:'Database management systems',focus:'Features of a DBMS, the developer interface and the query processor.',groups:['s8-2-1','s8-2-2'],checkpointId:'s8-checkpoint-dbms'},
  {id:'s8-sql',number:'8.3',title:'DDL and DML',focus:'Create and modify database structures; query and maintain data using SQL.',groups:['s8-3-1','s8-3-2','s8-3-3','s8-3-4','s8-3-5'],checkpointId:'s8-checkpoint-sql'},
];
// These are teaching subsections, not promises of a fixed lesson duration.
export const section8Sessions=Object.values(section8Journey).flatMap(page=>page.groups.map(group=>({title:`${group.number} · ${group.title}`,focus:page.intro,groups:[group.id],pacing:'Use as many teaching sessions as the cases, discussion and independent work require.'})));
export const section8PaperObjectives = {
  E056:ids(1,1,2), E057:[...ids(2,2),...ids(4,5)], E058:[...ids(2,2),...ids(4,3,5)],
  E059:ids(5,1,3), E060:ids(6,1), E061B:ids(9,2,4), E061C:ids(9,3,5), E062:ids(10,4,5,6), E063:ids(11,3),
  E065A:[...ids(2,3),...ids(3,1)], E065B:ids(9,2,4), E065C:ids(10,1,2,3,5), E065D:ids(5,5), E8D01:ids(2,2,3), E8D02:ids(2,4),
  E8N01:ids(4,3,4), E8N02:[...ids(5,1,3),...ids(6,1,2)], E8N03:ids(11,2), E8N04:[...ids(8,1,2),...ids(10,2,5,6)], E8N05:ids(11,1),
};
export const section8PaperCoverageNotes = {
  E056:'Explains benefits of moving from flat-file data to a relational database. Link each claimed benefit to its mechanism; the model does not automatically remove every possible redundancy.',
  E057:'Extension: a three-table design with appropriate keys. This assesses a design, not every definition of a normal form.',
  E058:'Decomposes repeated product facts into appropriate tables with keys. State the relevant dependency and retain the reference needed to reconstruct the facts.',
  E059:'Describes the data dictionary and logical schema. These are related structural concepts, not synonyms for the current data records.',
  E060:'Explains practical uses of the developer interface. Its editing and development facilities are distinct from query processing.',
  E061B:'Creates the requested table using the specified attributes, appropriate types and primary key. Other required data types have separate worked examples.',
  E061C:'Changes the definition to add a foreign key with its referenced target. A foreign key does not require all child values to be unique.',
  E062:'Combines matching two tables with grouping and counting. It follows the separate JOIN and aggregate explanations.',
  E063:'Updates two values in precisely the requested record. Preserve the exact condition and distinguish record maintenance from table definition.',
  E065A:'Completes relationships on the supplied E-R design. Retain its full common scenario and read each relationship in both directions.',
  E065B:'Extension: another CREATE TABLE task using the supplied schema and field definitions.',
  E065C:'Writes a two-table query with selection and ordering. The query uses the supplied field names and original business context.',
  E065D:'Explains access security in the given database context. Rights are separate from validity constraints and from backup restoration.',
  E8D01:'Identifies keys and the association in the supplied relations. Candidate-key minimality and secondary retrieval also have separate teacher-written checks.',
  E8D02:'Extension: referential integrity in the supplied tables. Explain valid references and declared actions rather than assuming automatic cascading deletion.',
  E8N01:'Explains why the given WORKEXPERIENCE table is in 3NF. Keep the official scheme unchanged; teacher reasoning uses the stated key and dependencies, not the insufficient claim that absence of M:N alone proves 3NF.',
  E8N02:'Matches descriptions to data dictionary, query processor, logical schema and developer interface. This provides a distinct recognition task before the extended explanations.',
  E8N03:'Deletes the completed work-experience records using a condition. Preserve the supplied Boolean field and the required table context.',
  E8N04:'Reads supplied SQL and corrects four errors involving the aggregate, qualified join names, condition operator and text literal. It is a correction task, not a request to list output rows.',
  E8N05:'Extension: writes INSERT INTO for the supplied PRODUCT record, including correctly represented text and numeric values.',
};
const target=(page,id)=>({page,target:id});
export const section8LegacyGroups = {
  42:{'library-repeated-facts':target(42,'s8-flat-file'),'library-records-and-fields':target(42,'s8-entities-and-rows'),'library-choose-identifiers':target(42,'s8-candidate-primary-secondary'),'library-link-and-repeat':target(42,'s8-foreign-keys'),'library-valid-references':target(42,'s8-referential-integrity'),'library-relationship-rules':target(42,'s8-relationship-cardinality'),'library-index-lookups':target(42,'s8-indexing')},
  43:{'library-er-design':target(42,'s8-library-er'),'orders-first-normal-form':target(43,'s8-1nf-case'),'orders-second-normal-form':target(43,'s8-2nf-case'),'orders-third-normal-form':target(43,'s8-3nf-case'),'orders-check-and-reconstruct':target(43,'s8-normalisation-reconstruct')},
  44:{'library-model-and-schema':target(44,'s8-model-schema'),'library-data-dictionary':target(44,'s8-live-dictionary'),'library-developer-tools':target(44,'s8-developer-interface'),'library-integrity-rules':target(44,'s8-dbms-integrity'),'library-access-rights':target(44,'s8-dbms-rights'),'library-backup-and-recovery':target(44,'s8-dbms-backup'),'library-query-processor':target(44,'s8-query-processor')},
  45:{'library-sql-roles':target(45,'s8-sql-language')},
  46:{'library-read-sql':target(45,'s8-read-sql'),'library-create-database':target(46,'s8-create-database'),'library-field-types':target(46,'s8-seven-types'),'library-declare-keys':target(46,'s8-complete-table-definitions'),'library-alter-structure':target(46,'s8-alter-definition')},
  47:{'library-select-columns':target(47,'s8-select'),'library-filter-records':target(47,'s8-where'),'library-sort-results':target(47,'s8-order'),'library-calculate-aggregates':target(47,'s8-aggregates'),'library-group-records':target(47,'s8-group-by'),'library-join-records':target(47,'s8-inner-join'),'library-query-combination':target(47,'s8-combined-query'),'library-insert-records':target(47,'s8-insert'),'library-update-records':target(47,'s8-update'),'library-delete-and-transfer':target(47,'s8-delete')},
};
