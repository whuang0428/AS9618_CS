# Section 8 classroom redesign

Local implementation and acceptance record · 2026-09-29

## Teaching route

The student pages are in English and assume that a learner understands rows and columns but has not studied databases or SQL. A library borrowing system connects the chapter. Shop orders provide a complete, small normalisation example. The six original routes, lesson-042 through lesson-047, remain usable, with old unit and question bookmarks retained. The learning route crosses those pages in prerequisite order.

- 40 explicit syllabus objectives; all 37 original knowledge units retained in the mapping.
- 35 teaching groups, 134 explanation steps and 74 worked-example steps.
- 12 connected modules and 27 suggested 45-minute sessions. These are flexible stopping points.
- A concrete observation precedes explanation, worked reasoning, the applicable experiment, an independent check and a recap/connection.
- A matched official question follows the knowledge it requires. Topics without a directly matching selected question use clearly labelled teacher-written checks.

| Module | Focus | Concept groups |
| --- | --- | --- |
| 1. A library needs reliable records | Discover repeated facts, then distinguish people, physical items and borrowing events. | 2 |
| 2. Identify a member and link a loan | Choose minimal keys, distinguish references from event identities and enforce valid links. | 3 |
| 3. Turn library rules into an ER design | Read relationships in both directions and test a design with repeated borrowing events. | 2 |
| 4. Put each fact in the right table | Use complete order data to explain 1NF, 2NF and 3NF, then reconstruct every original fact. | 4 |
| 5. From a design to a working database | Connect the model, schema, dictionary, developer tools and the roles of SQL. | 5 |
| 6. Keep library data usable | Distinguish integrity from permissions and recover a defined consistent state. | 3 |
| 7. Ask questions of one table | Choose result fields, filter rows and order results before independently writing a query. | 3 |
| 8. Turn records into summaries | Calculate totals, counts and means, then group records by a meaningful identity. | 2 |
| 9. Reconnect related information | Trace matching pairs and combine JOIN, filtering, grouping and ordering. | 2 |
| 10. Find records efficiently | Explain index lookup costs and the query processor’s interpretation, planning and execution. | 2 |
| 11. Build and change the structure with SQL | Create and connect to a database, choose field types, declare keys and alter definitions. | 4 |
| 12. Maintain data and explain a complete solution | Insert, update and delete precisely, then transfer the design and query methods to a new context. | 3 |

The complete objective-to-concept and prerequisite mapping is in `scripts/course-v3-section8-journey.mjs` and the generated S8 entries of `scripts/course-v3-contract.json`. The route introduces reading queries before DDL and returns to indexing after learners have executed queries. The 27th session transfers earlier methods to another scenario.

## Materials and classroom use

The opening image uses a restrained, realistic textbook style. Its complete built-in ImageGen prompt, file hash and visual review are recorded in `scripts/course-v3-section8-classroom-images.json`. The image is illustrative; exact records and relationships are authored as HTML tables and an editable academic SVG. There are no generated text labels or database values embedded in the photograph.

Classroom mode displays one concept stage and one explanation/worked step at a time. Full reading uses the same complete DOM and can resume teaching from the reading position. Keyboard Previous/Next and the large buttons follow the module route across pages. The concept menu remains local to each original topic page; the chapter overview provides all modules and sessions. Images and data tables can be enlarged. On wide screens, SQL statements and results appear side by side; on narrow screens they stack. The index controls stay visible while the teacher scrolls to its data tables. Hints, teacher reasoning and official mark schemes are separate closed controls. Navigation hides previously opened answers.

Eight deterministic experiments cover repeated records, primary/foreign keys, relationship cardinality, normalisation, metadata, integrity/permissions, backup/recovery and indexing. They support changed inputs, explanations, reset and keyboard/touch controls. Normalisation accounts for all three source lines, follows a selected line through the final relations and updates one shared customer record. The index lab explicitly models a linear scan and binary search of a sorted index; its counts are logical accesses, not actual DBMS timings or physical disk reads.

Twelve SQL workspaces provide Guided, Modify and Write your own stages. A real PostgreSQL engine runs in a Worker using locally vendored PGlite 0.5.8. Results, errors, affected records and current table definitions come from execution. This includes creating a database, connecting to it, table definitions, all seven taught types, constraints, ALTER, queries and maintenance. Each experiment has isolated temporary data. Switching groups preserves its state until page reload or Reset. One Worker hosts the active database and restores the selected experiment's memory snapshot.

## Official questions

There are 15 selected official parts, totalling 52 marks. The six selected parts previously grouped as E061/E065 are placed separately after their prerequisites. E065 remains in the existing integrated review as well. E8D01 and E8D02 add direct key and referential-integrity practice. Original QP context, diagrams and complete mark-scheme extracts remain available; teacher reasoning is separately labelled.

| ID | Source | Marks |
| --- | --- | --- |
| E056 | Cambridge 9618/12 · October/November 2024 · 6(a) | 3 |
| E8D02 | Cambridge 9618/11 · October/November 2025 · 2(d) | 3 |
| E8D01 | Cambridge 9618/12 · October/November 2025 · 4(a) | 2 |
| E065A | Cambridge 9618/13 · October/November 2025 · 5(a) | 3 |
| E058 | Cambridge 9618/13 · October/November 2024 · 4(c)(ii) | 4 |
| E057 | Cambridge 9618/11 · May/June 2024 · 6(a) | 6 |
| E059 | Cambridge 9618/11 · May/June 2024 · 6(b) | 4 |
| E060 | Cambridge 9618/12 · October/November 2025 · 4(d) | 2 |
| E065D | Cambridge 9618/13 · October/November 2025 · 5(d) | 4 |
| E061B | Cambridge 9618/12 · May/June 2024 · 4(b) | 3 |
| E065B | Cambridge 9618/13 · October/November 2025 · 5(b) | 4 |
| E061C | Cambridge 9618/12 · May/June 2024 · 4(c) | 2 |
| E065C | Cambridge 9618/13 · October/November 2025 · 5(c) | 5 |
| E062 | Cambridge 9618/13 · May/June 2024 · 4(c) | 4 |
| E063 | Cambridge 9618/12 · May/June 2025 · 5(d)(ii) | 3 |

The original paper definitions remain in the course source. New/split part records, original PDF identities, crop bounds, extract hashes and completed visual reviews are in `scripts/course-v3-section8-extra-papers.json`. Twenty-two new extract images were checked against contact sheets containing every QP and MS crop. The local archive check verifies the identities of 18 distinct original PDFs.

### Coverage limits

- **E056:** Assesses benefits of the relational approach. Explain the mechanism addressing each file-based problem; the teacher-written record activity checks the vocabulary separately.
- **E057:** Assesses a three-table design with appropriate primary and foreign keys. It does not directly ask for an ER diagram or a verbal proof of normal form; those skills have their own checks.
- **E058:** Applies decomposition of repeated product facts. Trace the dependency and retained reference; this part alone does not test every stage of normalisation.
- **E059:** Assesses the data dictionary and logical schema. Data modelling, integrity, permissions and recovery have their own checks.
- **E060:** Assesses practical uses of the developer interface. Query processing needs the separate trace activity.
- **E061B:** Assesses a table definition and its specified fields and primary key. It does not assess every required SQL data type.
- **E061C:** Assesses changing a definition to declare a foreign key. Creating a named database has a separate teacher-written check.
- **E062:** Combines two-table matching, grouping and counting. Use after the individual JOIN and aggregate explanations.
- **E063:** Assesses a conditional UPDATE. INSERT and DELETE remain separate teacher-written checks until a suitable sourced question is added.
- **E065A:** Assesses relationships in an ER design. Retain the supplied common scenario before attempting this part.
- **E065B:** Assesses CREATE TABLE using the supplied schema. Preserve the original field definitions and required context.
- **E065C:** Assesses a two-table query with selection and ordering. This is suitable after the first JOIN explanation; it does not require the later grouped query.
- **E065D:** Assesses database access security in context. It does not directly assess restoration of a backup.
- **E8D01:** Assesses primary and foreign keys and a one-to-many relationship. Candidate-key minimality, secondary keys and composite keys also need the preceding checks.
- **E8D02:** Assesses referential integrity in the supplied relations. A deletion or update is rejected or handled by its explicitly declared referential action; cascading is not automatic in every design.

## Source and build

- Teaching, sessions and mapping: `scripts/course-v3-section8-journey.mjs`.
- Renderer and browser presentation: `scripts/course-v3-section8-classroom.mjs`, `.js`, `.css`.
- Exact ER figure: `scripts/course-v3-section8-classroom-figures.mjs`.
- Experiment markup, behaviour and pure state models: `course-v3-section8-labs.mjs`, `-labs.js`, `-models.js`.
- SQL configuration, UI and Worker: `course-v3-section8-sql-labs.mjs`, `-sql-runtime.js`, `-sql-worker.js`.
- Fixed vendor files, Apache license and source/hash manifest: `web/assets/vendor/pglite/` (about 17.4 MB uncompressed).

Regenerate only S8 while preserving other generated pages:

```sh
node scripts/render-course-v3.mjs --section8
node --test scripts/course-v3-section8-classroom.test.mjs scripts/course-v3-section8-models.test.cjs scripts/course-v3-section8-sql.test.mjs
python3 -m http.server 8828 --bind 127.0.0.1 --directory web
```

Open `http://127.0.0.1:8828/course-v3/section-8/`. SQL requires HTTP(S); file URLs keep the reading content but cannot run the module Worker. Source-PDF tests use `AS9618_PAST_PAPER_ROOT` when set, otherwise the existing local teaching archive. Missing source files cause explicit skips, not a claimed source verification.

## Verification and operating limits

All 50 automated checks passed with zero failures or skipped checks. They cover complete objective/unit mapping, module/session dependencies, precise paper placement, source-PDF and crop hashes, old anchors, initially hidden answers, generated routes, image provenance, state transitions and real PostgreSQL execution. The PostgreSQL suite executes all 39 retained SQL fixtures plus constraints, changed data, connection switching, state isolation and reset. A repeated scoped build left all 1,130 checked output/contract files byte-identical; JavaScript syntax and targeted whitespace checks also passed.

Real Chrome acceptance covered all six pages and the overview at 1366, 1920, 910 and 390 CSS-pixel widths. The navigation run checked 34 forward and 34 backward transitions, 612 stage/viewport combinations and 24 complete-reading page/viewport combinations. No page-wide horizontal overflow, script errors or failed resources were observed. It also operated independent answer controls, image/table enlargement and the old E061 bookmark. Separate browser runs operated all eight model labs and the real SQL workflows, including changed source data and recoverable errors.

The implementation is local and has not been pushed or published. Actual HDMI hardware, classroom display scaling and the classroom's installed browser were not available for this verification. SQL data is temporary and resets on page reload. A stalled query is stopped after 20 seconds by replacing the Worker; that recovery loses temporary state for all experiments on the page. This is stated in the error message. The first SQL start loads the local database runtime; give the page time to finish loading before using it with a class.
