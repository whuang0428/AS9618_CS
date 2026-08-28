import { repairs as stage2Repairs } from "./stage2-repairs-data.mjs";

const byLesson = new Map(stage2Repairs.map((repair) => [repair.lesson, repair]));
const take = (lesson, targetLesson = lesson, rows = null) => {
  const repair = byLesson.get(lesson);
  if (!repair) throw new Error(`Missing Stage 2 repair donor L${String(lesson).padStart(3, "0")}`);
  return Object.freeze({ ...repair, lesson: targetLesson, rows: rows ?? repair.rows });
};

const combine = (targetLesson, title, ...repairs) => Object.freeze({
  lesson: targetLesson,
  rows: [...new Set(repairs.flatMap((repair) => repair.rows))].sort((a, b) => {
    const [aSection, aRow] = a.slice(1).split(".").map(Number);
    const [bSection, bRow] = b.slice(1).split(".").map(Number);
    return aSection - bSection || aRow - bRow;
  }),
  title,
  explanation: repairs.flatMap((repair) => repair.explanation),
  exampleTitle: repairs.map((repair) => repair.exampleTitle).join(" / "),
  example: repairs.map((repair) => repair.example).join(" "),
  practice: repairs.flatMap((repair) => repair.practice),
  exam: repairs.map((repair) => repair.exam).join(" "),
  marks: repairs.flatMap((repair) => repair.marks),
  strict: repairs.map((repair) => repair.strict).join(" "),
});

const focused = (lesson, rows, title, explanation, exampleTitle, example, practice, exam, marks, strict) => Object.freeze({
  lesson, rows, title, explanation, exampleTitle, example, practice, exam, marks, strict,
});

const qa = (q, a) => Object.freeze({ q, a });

const section2 = [
  combine(16, "Network purpose and client/server models", take(16, 16, ["S2.01"]), take(17, 16)),
  focused(17, ["S2.04"], "Bus, star, mesh and hybrid topologies", [
    "A topology describes the pattern of links between devices. In a bus topology devices share one backbone; in a star topology each device has a separate link to a central switch; in a mesh topology nodes have multiple interconnections; a hybrid topology combines two or more topology patterns.",
    "Compare topologies using packet path, single points of failure, alternative routes, cabling, expansion and traffic. A topology name without a path or failure consequence is not a developed explanation.",
  ], "Compare failure paths", "After one end-device cable fails, only that device normally loses access in a star. If the central switch fails, every attached device loses access. A mesh can retain an alternative path after one link fails.", [
    qa("Describe the path followed in a star topology.", "A frame travels from the sender to the central switch and then to the destination."),
    qa("Why can a mesh be more resilient than a bus?", "Its multiple links can provide an alternative route after one link fails."),
  ], "Compare star and mesh topologies for a hospital network and justify one choice.", [["B1", "accurate star path"], ["B1", "accurate mesh path"], ["M1", "developed failure or cost comparison"], ["A1", "scenario-linked justification"]], "Do not credit a topology name without an accurate connection pattern and consequence."),
  take(18, 18),
  focused(19, ["S2.06"], "Public and private cloud computing", [
    "Cloud computing provides storage, processing or software as a service using remote shared infrastructure reached through a network. A public cloud is offered over shared provider infrastructure; a private cloud is restricted to one organisation.",
    "A public cloud may scale quickly and reduce local hardware management: these are possible benefits. A private cloud is dedicated to one organisation and can give greater control over access and configuration. Each benefit or drawback must link availability, control, cost or security to the stated scenario.",
  ], "Choose a cloud model", "A school storing non-sensitive public resources may use a public cloud for scalable access. A hospital may choose a private cloud for tighter organisational control of patient-data access.", [
    qa("Distinguish public from private cloud.", "Public cloud uses shared provider infrastructure; private cloud is dedicated or restricted to one organisation."),
    qa("State one cloud-computing service.", "Remote storage, processing or hosted software."),
  ], "Compare public and private cloud for a medical organisation.", [["B1", "public cloud characteristic"], ["B1", "private cloud characteristic"], ["M1", "scenario-linked comparison"], ["A1", "justified choice"]], "Do not equate cloud computing with the internet itself."),
  take(22, 20),
  focused(21, ["S2.09", "S2.10"], "LAN hardware and the router", [
    "LAN hardware includes a switch, server, NIC/WNIC, WAP, cables, bridge and repeater. A server provides network services. A NIC/WNIC connects a device by cable or wirelessly; a WAP connects wireless devices to a wired LAN. A switch forwards frames within a LAN, a bridge connects LAN segments, a repeater regenerates a weakened signal, and cables carry signals.",
    "A router connects different networks and forwards packets using destination IP addresses and stored routing information. It is not a replacement name for a switch: the two devices make forwarding decisions at different scopes.",
  ], "Trace a school request", "A laptop sends a frame through its wireless interface to an access point. The LAN switch forwards it toward the router. The router then forwards the packet from the school LAN toward another network.", [
    qa("Which device connects wireless clients to a wired LAN?", "A wireless access point."),
    qa("Which device connects different networks?", "A router."),
    qa("What is the role of a NIC?", "It provides the device's network interface for sending and receiving data."),
  ], "Explain the roles of a NIC, wireless access point, switch and router in a school LAN connected to the internet.", [["B1", "NIC role"], ["B1", "access-point role"], ["B1", "switch role"], ["B1", "router role"]], "Do not describe every named device as routing packets between networks."),
  take(19, 22),
  take(25, 23),
  focused(24, ["S2.13"], "The internet and the World Wide Web", [
    "The internet is the global network infrastructure that interconnects networks and carries many services. The World Wide Web is one service that uses the internet to provide linked resources accessed with web protocols and browsers.",
    "Internet hardware includes routers and transmission links that forward data between networks. Web servers store or generate web resources, while clients request those resources; the WWW is therefore not a synonym for all internet services.",
  ], "Separate infrastructure from service", "Sending email uses the internet but not the WWW. Opening a linked webpage uses the WWW service over internet infrastructure, with routers carrying the packets between client and web server.", [
    qa("State the distinction between the internet and the WWW.", "The internet is the interconnected network infrastructure; the WWW is a linked-resource service using it."),
    qa("Name one internet service other than the WWW.", "Email or file transfer."),
  ], "Explain why the internet and the World Wide Web are not the same.", [["B1", "internet infrastructure"], ["B1", "WWW service"], ["M1", "example or hardware path distinguishes them"]], "Do not define the internet as a collection of webpages."),
  focused(25, ["S2.14"], "Internet connection hardware", [
    "A modem converts signals into a form suitable for the access link and back again. Internet-supporting connections include the PSTN (Public Switched Telephone Network), a dedicated line and a cell phone network or cellular phone network. Each has different sharing, mobility and availability characteristics.",
    "When describing an internet connection, follow the path from the end device through its NIC, LAN switch or access point, router and access link. Name each device only for the job it performs.",
  ], "Home-to-provider path", "A laptop sends data through its wireless NIC to the access point/router. The router forwards the packet toward the provider; the modem function adapts signals for the broadband link.", [
    qa("What does a modem do?", "It converts/modulates and demodulates signals for the access medium."),
    qa("What does the router do at the LAN boundary?", "It forwards packets between the LAN and other networks."),
  ], "Describe the hardware path used when a home computer accesses a remote server.", [["B1", "end-device interface"], ["B1", "LAN device"], ["B1", "router role"], ["B1", "modem/access-link role"]], "Do not use modem, router and switch as interchangeable terms."),
  take(20, 26),
];

const section2Sequenced = [
  section2[0], section2[1], section2[2],
  combine(19, "Cloud, wired and wireless networking", section2[3], section2[4]),
  combine(20, "LAN hardware, Ethernet, streaming, the internet, IP and URL", ...section2.slice(5)),
];

const section8Ddl = focused(83, ["S8.07"], "DDL, DML and SQL roles", [
  "DDL is used for the creation and modification of database structure. DML is used for queries and maintenance of stored data. SQL is an industry-standard language that includes both kinds of operation.",
  "Keep the schema and the records distinct: defining a table or constraint changes structure, while selecting, inserting, deleting or updating records works with stored data.",
], "Classify database operations", "CREATE TABLE is DDL because it creates database structure. SELECT and UPDATE are DML because they query or maintain stored data.", [qa("Which language category creates structure?", "DDL."), qa("Which category queries and maintains data?", "DML."), qa("What is SQL?", "An industry-standard database language.")], "Classify CREATE TABLE, SELECT and UPDATE as DDL or DML and explain the distinction.", [["B1", "DDL creation/modification of structure"], ["B1", "DML queries/maintenance"], ["B1", "SQL identified as industry-standard language"]], "Do not describe every SQL statement as changing stored records.");
const section8Dml = focused(85, ["S8.09"], "DDL for databases, tables, types and keys", [
  "Required DDL includes CREATE DATABASE, CREATE TABLE and ALTER TABLE. Field types include CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME.",
  "A PRIMARY KEY uniquely identifies a row. A FOREIGN KEY with REFERENCES links a field to a key in another table and supports referential integrity.",
], "Define two related tables", "CREATE DATABASE College; then CREATE TABLE Department and CREATE TABLE Student. Student uses INTEGER for StudentID, VARCHAR for Name, DATE for DateOfBirth, BOOLEAN for Active and a DepartmentID foreign key REFERENCES Department(DepartmentID). ALTER TABLE can modify the structure later.", [qa("Name four required SQL field types.", "Any four of CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME."), qa("Which clause declares the referenced table?", "REFERENCES.")], "Write DDL to create a Student table with suitable data types, a primary key and one foreign key.", [["B1", "CREATE TABLE and named fields"], ["B1", "suitable required data types"], ["B1", "PRIMARY KEY"], ["B1", "FOREIGN KEY with REFERENCES"]], "Do not award DML statements for a schema-definition task.");
const section8Sql = focused(87, ["S8.11"], "INSERT, DELETE and UPDATE", [
  "INSERT adds a new row, DELETE removes matching rows, and UPDATE changes values in matching rows. These DML statements maintain stored data.",
  "Use a WHERE condition for DELETE and UPDATE when only specified rows should change. Check field order, value types and conditions against the supplied schema.",
], "Maintain one student row", "INSERT adds StudentID 104. UPDATE changes only that row when WHERE StudentID = 104 is used. DELETE removes it with the same key condition.", [qa("Which statement adds a row?", "INSERT."), qa("Which statement removes rows?", "DELETE."), qa("Which statement changes existing values?", "UPDATE.")], "Write INSERT, UPDATE and DELETE statements for StudentID 104.", [["B1", "valid INSERT"], ["B1", "valid UPDATE with condition"], ["B1", "valid DELETE with condition"]], "Do not credit an UPDATE or DELETE that unintentionally affects every row.");

const section12TestData = focused(145, ["S12.07"], "Choose normal, abnormal and extreme or boundary test data", [
  "Normal data are valid values within the accepted range. Abnormal data are invalid and should be rejected. Extreme or boundary data are valid values at the limits of the accepted range; values immediately outside a limit are abnormal boundary checks.",
  "Choose test data from the stated validation rule and give an expected result for each value. A label such as 'boundary' is insufficient unless the value really tests a stated limit.",
], "Test an inclusive mark range", "For an allowed mark from 0 to 100 inclusive, 55 is normal, 0 and 100 are valid extreme/boundary values, and -1 or 101 is abnormal.", [qa("Give one normal mark for 0 to 100 inclusive.", "Any valid non-boundary value, for example 55."), qa("Give two valid extreme values.", "0 and 100."), qa("Give one abnormal boundary value.", "-1 or 101.")], "Choose normal, abnormal and extreme/boundary data for an integer age accepted from 12 to 18 inclusive, and state each expected result.", [["B1", "valid normal value"], ["B1", "12 and/or 18 as valid extremes"], ["B1", "11 and/or 19 as abnormal boundary"], ["B1", "coherent expected results"]], "Do not credit a value whose classification contradicts the stated inclusive range.");

const section4BitManipulation = focused(49, ["S4.15"], "Bit manipulation with masks and shifts", [
  "A bitwise AND mask can test or clear selected bits; an OR mask can set selected bits; an XOR mask can toggle selected bits. These operations are used to monitor and control individual flags without changing unrelated bits.",
  "LSL is a logical left shift and LSR is a logical right shift. Distinguish logical shifts from arithmetic shifts and cyclic shifts: a logical shift inserts zero, an arithmetic right shift preserves the sign bit, and a cyclic shift wraps the bit that leaves one end back to the other.",
], "Test, set, clear and toggle one flag", "For Status = 10110100, an AND mask tests a selected bit, an OR mask sets it, an AND mask with a zero at that position clears it, and an XOR mask toggles it. LSL moves bits left; LSR moves them right and fills with zero.", [qa("Which mask operation sets selected bits?", "Bitwise OR."), qa("Which operation toggles selected bits?", "Bitwise XOR."), qa("What is inserted by a logical shift?", "Zero bits.")], "Explain how AND, OR and XOR masks test, clear, set and toggle control flags, then apply one LSL and one LSR.", [["B1", "AND test/clear"], ["B1", "OR set"], ["B1", "XOR toggle"], ["M1", "correct LSL"], ["M1", "correct LSR"], ["B1", "monitor/control context"]], "Do not treat logical, arithmetic and cyclic shifts as identical.");

const section3StorageDevices = focused(30, ["S3.03"], "Secondary-storage reader and writer operation", [
  "A magnetic HDD uses moving read/write heads over rotating platters. Flash memory stores charge electronically with no moving parts. An optical disc reader/writer uses a laser to read marks and, on writable media, to create or alter marks.",
], "Choose a storage mechanism", "A portable device may use flash memory for shock resistance; an archive may use optical media when an optical disc reader/writer is available.", [qa("Which device uses rotating platters?", "An HDD."), qa("Which device uses a laser?", "An optical reader/writer.")], "Explain how an HDD, flash memory and an optical reader/writer store or retrieve data.", [["B1", "HDD mechanism"], ["B1", "flash mechanism"], ["B1", "optical reader/writer mechanism"]], "Do not describe every storage device as magnetic.");

const section8Indexing = focused(79, ["S8.02"], "Relational terminology, keys, relationships and indexing", [
  "A relational database stores data in tables made of records and fields. A primary key uniquely identifies a record; a foreign key links to a primary key in another table and creates a relationship.",
  "Indexing creates an additional lookup structure for one or more fields so matching records can be located more quickly. The index consumes storage and must be updated when indexed data change.",
], "Use keys and an index", "StudentID is the primary key of Student. DepartmentID is a foreign key linking to Department. An index on Surname can speed searches by surname without changing which field is the primary key.", [qa("What does a primary key do?", "Uniquely identifies each record."), qa("What does indexing improve?", "The speed of locating records by indexed field values.")], "Explain primary key, foreign key and indexing for a Student table.", [["B1", "primary key"], ["B1", "foreign key/relationship"], ["B1", "indexing lookup benefit"], ["B1", "storage/update trade-off"]], "Do not describe an index as a replacement primary key.");

const section11Efficiency = focused(133, ["S11.09"], "Clear and efficient Cambridge pseudocode", [
  "Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path. Efficient pseudocode avoids unnecessary repeated work while preserving correctness.",
  "An improvement must be justified from the algorithm, such as combining repeated traversals or stopping a search when no later work is required. Fewer written lines alone do not prove efficiency.",
], "Combine two traversals", "One traversal of Marks can update both Total and PassCount. The Cambridge pseudocode remains clear because initialisation, loop bounds, selection and outputs are explicit.", [qa("Does shorter code always mean more efficient code?", "No; the amount of work and correctness matter."), qa("Name one clarity feature.", "Meaningful identifiers, indentation or complete constructs.")], "Rewrite two full traversals as one clear and efficient Cambridge pseudocode traversal and justify the change.", [["B1", "clear Cambridge pseudocode"], ["M1", "one correct traversal"], ["B1", "avoids repeated work"], ["A1", "valid efficiency justification"]], "Do not credit an efficiency claim based only on line count.");

const section12LifecycleLimits = focused(142, ["S12.01"], "Lifecycle purpose and model limitations", [
  "A program-development lifecycle gives an organised sequence for analysis, design, implementation, testing and maintenance, with review and documentation linking decisions to evidence.",
  "Waterfall supports planned sequential stages and traceability but its limitation is costly late change. Iterative development reviews repeated versions but can need careful scope control. RAD uses rapid prototyping, time-boxing and user involvement; it may be less suitable or unsuitable where exhaustive assurance and stable architecture are required.",
], "Choose a lifecycle model", "RAD suits a small interface whose users can review frequent prototypes. Waterfall may suit stable, safety-critical requirements where formal traceability matters, although late change remains a limitation.", [qa("State one waterfall limitation.", "Late change can require substantial rework."), qa("Why might RAD be unsuitable for a safety-critical system?", "Rapid cycles may not provide the required exhaustive assurance and traceability.")], "Compare waterfall, iterative and RAD, including one limitation of each model.", [["B1", "waterfall and limitation"], ["B1", "iterative and limitation"], ["B1", "RAD features"], ["B1", "RAD limitation/less suitable context"]], "Do not describe all lifecycle models as the same repeated process.");

const affectedSections = new Set([1, 2, 3, 4, 5, 8, 9, 10, 11, 12]);
const unchanged = stage2Repairs.filter((repair) => !affectedSections.has(Number(repair.rows[0].match(/^S(\d+)\./)?.[1])));

export const stage3CoreRepairs = Object.freeze([
  take(1), take(2), take(3), take(4), take(5), take(6), take(7), take(8), take(9), take(10), take(12),
  ...section2Sequenced,
  take(27), take(33, 28), take(28, 29), combine(30, "Output, storage devices and primary memory", take(29), take(31), section3StorageDevices, take(30)), take(34, 31), take(37, 32),
  combine(41, "Von Neumann architecture, CPU components and registers", take(41), take(43)),
  combine(42, "System buses, ports and processor performance", take(44), take(49)),
  take(42, 43), take(48, 44), take(45), take(46), take(47), take(51, 48, ["S4.13"]), section4BitManipulation,
  take(53, 52), take(55, 53), take(58, 54), take(56, 55), take(60, 56),
  ...unchanged,
  take(79, 78), combine(79, "Relational terminology, keys and relationships", take(80), take(81), section8Indexing), combine(80, "E-R design, normalisation and DBMS features", take(82), take(83), take(78, 80, ["S8.05", "S8.06"])), section8Ddl, take(84), combine(85, "DDL and two-table data queries", section8Dml, take(86)), section8Sql, take(89),
  take(99, 98), take(98, 99), take(100), take(101), take(111, 102), take(102, 103), take(112),
  take(113), take(118, 114), take(115), take(116), take(104, 117), take(105, 118), take(120, 119), take(122, 120), take(123, 121),
  take(140, 126), take(114, 127), take(133, 128), combine(129, "Selection and loop structures", take(127), take(128), take(129)), take(130, 130), combine(133, "Clear and efficient Cambridge pseudocode", take(141), section11Efficiency),
  combine(142, "Lifecycle models, purpose and limitations", take(142), section12LifecycleLimits), take(144, 143), take(59, 144), combine(145, "Testing, maintenance and enhancement", take(145), section12TestData, take(146), take(138)),
].sort((a, b) => a.lesson - b.lesson));

const duplicateLessons = [...new Set(stage3CoreRepairs.map(({ lesson }) => lesson).filter((lesson, index, all) => all.indexOf(lesson) !== index))];
if (duplicateLessons.length) throw new Error(`Stage 3 plan has duplicate CORE repair lessons: ${duplicateLessons.join(", ")}`);

export const stage3RequirementFirstUse = Object.freeze(Object.fromEntries(
  stage3CoreRepairs.flatMap((repair) => repair.rows.map((id) => [id, repair.lesson]))
    .sort((a, b) => a[1] - b[1])
    .filter(([id], index, all) => all.findIndex(([candidate]) => candidate === id) === index),
));

export const stage3RequirementLessons = Object.freeze(Object.fromEntries(
  [...new Set(stage3CoreRepairs.flatMap((repair) => repair.rows))].map((id) => [
    id,
    [...new Set(stage3CoreRepairs.filter((repair) => repair.rows.includes(id)).map(({ lesson }) => lesson))].sort((a, b) => a - b),
  ]),
));

export const stage3SequencedLessons = Object.freeze([...new Set(stage3CoreRepairs.map(({ lesson }) => lesson))].sort((a, b) => a - b));

export const stage3TitleByLesson = Object.freeze(Object.fromEntries(stage3CoreRepairs.map(({ lesson, title }) => [lesson, title])));

export const stage3RequiredSections = Object.freeze([1, 2, 3, 4, 5, 8, 9, 10, 11, 12]);

export const stage3OptionalBaseLessons = Object.freeze([
  ...new Set([...stage2Repairs.map(({ lesson }) => lesson), ...stage3SequencedLessons, 137, 138]),
].sort((a, b) => a - b));
