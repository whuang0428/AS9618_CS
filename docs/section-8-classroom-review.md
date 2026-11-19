# Section 8 classroom redesign

Implementation and acceptance record · 2026-11-19

## Active teaching route

The chapter uses English explanations for database beginners. Eleven subsections replace the previous 35-concept route while retaining six public lesson URLs, all 40 objective IDs, all 37 original knowledge-unit links and 35 original concept links. Old stage suffixes resolve to the corresponding replacement material. Where teaching has moved to another page, an explicit bookmark link forwards to that page; the no-JavaScript view retains a usable link.

| Page | Subsections | Stage boundary |
| --- | --- | --- |
| Lesson 042 | 8.1.1 flat-file comparison; 8.1.2 relational terms and matching ER model | — |
| Lesson 043 | 8.1.3 three worked normal forms; 8.1.4 four 3NF judgements | Database concepts |
| Lesson 044 | 8.2.1 DBMS features; 8.2.2 developer interface and query processor | DBMS |
| Lesson 045 | 8.3.1 DDL; 8.3.2 DML; 8.3.3 SQL and reading statements | — |
| Lesson 046 | 8.3.4 complete SQL definitions and alterations | — |
| Lesson 047 | 8.3.5 querying and maintaining records | DDL and DML |

There are 49 teaching materials. Classroom presents one material or question at a time; Full reading uses the same complete DOM. Answers close on navigation. Tables, diagrams and original extracts can be enlarged. Printing supports question-only and teacher-answer versions, including folded extension questions, then restores the prior screen state. Subsection numbers are not fixed lesson durations.

The shared fixture contains Member, MemberCard, Book, Copy and Loan. It supplies the reading tables and real SQL database. MemberID and SchoolEmail illustrate candidate keys; TutorGroup illustrates a secondary retrieval key. MemberCard permits at most one current card per member. Loan represents historical Member–Copy associations using a separate LoanID, preserving repeat borrowing. The E-R diagram uses a single line for one and three branches for many, with selectable relationship highlighting. Optional participation is stated in the business rules. Vocabulary controls locate an entity, table, record and field.

Independent shop orders demonstrate removal of repeating groups, partial dependencies and transitive dependencies. Business rules and keys accompany every example. The final relations reconstruct all three original order lines. The 3NF judgement cases include a repeating group, a partial dependency, a transitive dependency and a valid design. An absent M:N relationship alone is not taught as proof of 3NF.

## Shared Library DBMS

`course-v3-section8-dbms-data.mjs` defines the shared records, SQL definitions, examples and roles. The workbench modules implement seven panels: Data, Model & schema, Dictionary, Integrity, Users & groups, Backup, and Developer & SQL. The existing vendored PGlite 0.5.8 engine is reused without dependency changes.

- One workbench per page, opened from any teaching card. Choosing a card/example prepares an editor without executing SQL or resetting records.
- Actual PostgreSQL executes definitions, queries, record maintenance, constraints, grants and EXPLAIN. Results preserve duplicate column labels and NULL values.
- The dictionary reads current system metadata, including types, lengths, nullability, constraints, FK targets and indexes. Schema and permissions panels are labelled administrative teaching views. Data and SQL use the selected identity; denied table reads do not leak their records.
- The Student inherits SELECT from library_readers; Librarian inherits record maintenance from library_writers. Individual grants and group grants can be changed by Administrator. These are simulated classroom identities, not online accounts or an authentication boundary.
- CREATE DATABASE creates a real separate database. The student must explicitly Connect before executing its table definitions. The engine maintains one active connection, preserving the cluster when switching databases.
- Guided SQL and an editable mode share the current state. The complete DDL and the five-table insert script remain available statically, together with expected query results.
- A teaching backup preserves the complete cluster, selected database and user. Restore recovers structures, records and grants and removes subsequent changes. A simulated outage demonstrates data unavailability and recovery. The teaching backup and automatic progress save are distinct; neither is represented as an off-device backup.
- IndexedDB stores a versioned gzip snapshot after completed operations. Compare-and-swap revisions reject stale tab writes without automatically rerunning SQL. A conflicting tab restores the winning saved state.
- Errors roll back an unfinished explicit transaction. The 20-second SQL watchdog stops a hung Worker; a subsequent request restores the most recent completed snapshot. Incompatible or unreadable saved work is preserved. Storage failures use an explicitly labelled temporary mode.
- Reset and teaching-backup restore require explicit confirmation because they replace the current workspace state. Page navigation waits for an in-progress operation/save.

The browser renders at most 100 result rows, 50 rows per displayed table and inspects up to 30 public tables. These bounds keep the classroom UI manageable; they are not database capacity claims. HTTP is required for Worker/WASM execution. Without JavaScript the complete authored teaching content remains readable.

## Original question selection

Three checkpoints contain 16 main parts, 51 marks in total. Four extension parts add 17 marks without interrupting the main route.

| Stage | Main selections | Marks |
| --- | --- | --- |
| Database concepts | E056, E8D01, E065A, E058, E8N01 | 14 |
| DBMS | E8N02, E059, E060, E065D | 14 |
| DDL and DML | E061B, E061C, E065C, E062, E063, E8N03, E8N04 | 23 |

Extensions: E057 (design, 6), E8D02 (referential integrity, 3), E065B (CREATE TABLE, 4), E8N05 (INSERT, 4).

| New selection | Original source | Marks |
| --- | --- | --- |
| E8N01 | 2025 O/N 9618/11 Q2(b): explain 3NF | 2 |
| E8N02 | 2023 M/J 9618/12 Q2(a): DBMS terms and descriptions | 4 |
| E8N03 | 2025 O/N 9618/11 Q2(c)(i): DELETE | 2 |
| E8N04 | 2023 M/J 9618/12 Q2(c)(iii): read and correct SQL | 4 |
| E8N05 | 2025 M/J 9618/13 Q6(b): INSERT | 4 |

Five records and 15 unaltered QP/MS crops are maintained in `course-v3-section8-new-papers.json`. Eleven original pages and all final crops were visually inspected. Tests verify PDF and PNG hashes, dimensions, crop review identities, exact re-rendered pixels and that crop boundaries do not intersect text. Required table definitions and original question context remain included. Earlier source records and split-source identities remain intact.

Hints, teacher reasoning and official mark schemes are independently folded. Official answers are unchanged; teacher interpretation distinguishes syllabus notation from executable PostgreSQL syntax where needed. Detailed coverage notes do not claim that these questions assess every taught SQL keyword or DBMS feature.

## Verification

### CIE wording and E-R notation revision · 2026-11-19

Teaching headings and explanations now use direct database terminology. Practice questions use explicit command words such as State, Identify, Describe and Explain. Authorial slogans have been removed from the active materials, overview and checkpoints; official question and mark-scheme extracts are unchanged.

The library E-R diagram and the one-to-one / one-to-many / many-to-many comparison use the single-line and three-branch convention visually checked against 2025 O/N 9618/13 Q5(a), MS page 8. The diagrams do not use numerical UML multiplicities, circles, bars or arrowheads to denote relationships. Attribute-list arrows identify foreign-key references; they are not relationship-end symbols. Optional card membership and other minimum participation rules remain explicit in the prose.

Terminology was also checked against 2023 M/J 9618/13 Q4(a–b), MS page 6, and 2024 M/J 9618/11 Q6(b), MS page 7. Flat-file limitations explicitly identify data redundancy, data inconsistency and program–data dependency. Secondary keys are defined by their additional retrieval purpose without categorically excluding unselected candidate keys. The logical schema is described as a DBMS-independent conceptual design, followed by the workbench's PostgreSQL implementation.

Review corrected three question/example inconsistencies: the one-loan-per-member question now specifies a hypothetical sample; the returned-loan aggregate answer gives the actual counts and totals; and ALTER describes unchanged record counts without assuming that a newly created database is populated.

Revision checks: targeted generation succeeded; 72 Section 8 tests passed without skips, including a relationship-symbol regression check. The revised returned-loan answer was executed in PostgreSQL and returned `(1, Asha, 1, 4)` and `(3, Chen, 1, 0)`. Browser checks covered all six pages at 1440px and 390px, both reading modes, keyboard relationship selection, highlighting of all three branches, diagram enlargement, hidden answers, local diagram scrolling, the legacy E-R bookmark, no-JavaScript display and 1920px projection layout. Screenshots of both diagrams and the narrow and projection layouts were visually reviewed. The complete browser backup, permission and persistence scenarios below were not repeated for this wording/diagram revision; their execution code was unchanged.

### Initial implementation acceptance

Executed after integration:

```sh
node scripts/render-course-v3.mjs --section8
node --test scripts/course-v3-section8-*.test.*
git diff --check
```

All 71 tests passed, with zero failures and zero skips. This includes retained model/SQL tests, the new shared DBMS tests, all teaching and bookmark mappings, original-source identities and the new crop checks.

Browser acceptance used the installed Chrome through the bundled Playwright runtime, with a fresh temporary profile and a local HTTP server. The computer-use connector was unavailable; no dependency installation was needed.

- All six pages at 1440px and 390px: no page-level horizontal overflow; local table/diagram scrolling retained.
- Classroom and Full reading, vocabulary and ER highlighting, image/table enlargement, old cross-page bookmarks, extension deep links and no-JavaScript reading passed.
- Question-only and answer print states include extension questions and restore the prior screen state.
- All seven DBMS panels at desktop and 390px; keyboard-accessible tabs and controls; no browser page errors.
- Real group and individual rights, SELECT revocation and denied Data display passed.
- Backup restored schema and records after changes and recovered the simulated outage.
- Lesson 044 to 045 and reload preserved a newly inserted record.
- A failed explicit transaction recovered; EXPLAIN did not execute an UPDATE.
- Concurrent writes from two tabs produced exactly one saved change and one conflict response.
- With IndexedDB unavailable, SQL remained usable and the UI reported temporary mode.
- An actual 25-second SQL request was interrupted by the 20-second watchdog. Recovery preserved the preceding saved insertion and discarded the unfinished update.
- A deliberately incompatible seedVersion remained unchanged, including its revision and saved Blob, while a temporary workspace was used.
- Screenshots at 390px, 1440px and 1920px were reviewed. Fixed pale table-header contrast and active-tab hover contrast. 1920px checks simulate projection resolution; physical classroom projector hardware was not tested.

Scope verification compared existing-file hashes against the pre-task working tree: no unrelated file changed. Existing Section 6/7 edits were preserved. Only Section 8 is regenerated; other entries in the shared course contract remain unchanged. No push, deployment, migration or dependency change was performed.
