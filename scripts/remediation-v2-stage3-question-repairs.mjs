const point = (mark, text) => Object.freeze({ mark, text });

export const stage3QuestionRepairs = Object.freeze({
  "L027-Q4": Object.freeze({
    title: "Question 4", marks: "6 marks",
    prompt: "Explain the format and use of IPv4 and IPv6 addresses, and distinguish public/private and static/dynamic addresses.",
    answer: "IPv4 uses 32-bit addresses and IPv6 uses 128-bit addresses. An IP address is associated with a network interface so packets can be routed. A public address is reachable across the internet, while a private address is used inside a local network. A static address remains fixed; a dynamic address is allocated and may change. Possessing an IP address does not by itself guarantee security.",
    marking: [point("B1", "IPv4 is 32-bit"), point("B1", "IPv6 is 128-bit"), point("B1", "address associated with a network interface / used for routing"), point("B1", "public and private distinction"), point("B1", "static and dynamic distinction"), point("B1", "IP addressing does not guarantee security")],
    strict: ["Do not credit decimal digit counts as the address bit width.", "Do not claim that a private address alone makes a device secure."],
  }),
  "L027-Q5": Object.freeze({
    title: "Question 5", marks: "6 marks",
    prompt: "For the URL https://school.example.org/results/index.html, identify the scheme, domain name and path, then explain how DNS helps locate the WWW resource.",
    answer: "The scheme is https, the domain name is school.example.org and the path is /results/index.html. DNS resolves the domain name to an IP address. The browser can then send packets toward the web server and request the named WWW resource.",
    marking: [point("B1", "scheme is https"), point("B1", "domain is school.example.org"), point("B1", "path is /results/index.html"), point("B1", "DNS resolves the domain name"), point("B1", "resolution returns/finds an IP address"), point("B1", "browser uses the location to request the WWW resource")],
    strict: ["Do not describe DNS as storing the webpage.", "Require the URL components to be matched to the supplied URL."],
  }),
  "L041-Q4": Object.freeze({
    title: "Question 4", marks: "6 marks",
    prompt: "Distinguish RAM and ROM, including volatility, purpose and whether their contents normally change while a computer is in use.",
    answer: "RAM is volatile read/write memory used for programs and data currently in use, so its contents are lost without power and change during operation. ROM is non-volatile memory that stores instructions or data such as start-up firmware that normally remain available without power and are not routinely changed by the running program.",
    marking: [point("B1", "RAM is volatile"), point("B1", "RAM stores current programs/data"), point("B1", "RAM is read/write and changes during use"), point("B1", "ROM is non-volatile"), point("B1", "ROM stores firmware/start-up instructions"), point("B1", "ROM contents are not routinely changed during normal use")],
    strict: ["Do not define RAM only as faster than ROM.", "Do not claim that all ROM can never be reprogrammed."],
  }),
  "L041-Q5": Object.freeze({
    title: "Question 5", marks: "8 marks",
    prompt: "Compare PROM, EPROM and EEPROM, including how each is programmed or erased and one suitable use consequence.",
    answer: "PROM is programmed once after manufacture and cannot normally be erased. EPROM can be erased with ultraviolet light and then reprogrammed, usually after removal from the circuit. EEPROM is erased and reprogrammed electrically, often in circuit. Their different update methods affect convenience, equipment and update frequency.",
    marking: [point("B1", "PROM identified as programmable once"), point("B1", "PROM cannot normally be erased"), point("B1", "EPROM erased using ultraviolet light"), point("B1", "EPROM can then be reprogrammed"), point("B1", "EEPROM erased electrically"), point("B1", "EEPROM reprogrammed electrically/in circuit"), point("B1", "valid comparison of update convenience/equipment"), point("B1", "suitable use consequence linked to update frequency")],
    strict: ["Do not confuse EPROM ultraviolet erasure with EEPROM electrical erasure."],
  }),
  "L090-Q4": Object.freeze({
    title: "Question 4", marks: "5 marks",
    prompt: "Explain the purposes of a DBMS developer interface and query processor, and describe how they support a database application.",
    answer: "The developer interface provides tools or an interface for a developer to define forms, reports, queries or application access to the database. The query processor parses and validates a query, chooses how to execute it and obtains the required data. Together they let application code submit database operations and receive results through controlled DBMS services.",
    marking: [point("B1", "developer interface provides development tools/access"), point("B1", "valid developer task such as forms/reports/queries"), point("B1", "query processor parses/validates a query"), point("B1", "query processor plans/executes and retrieves results"), point("B1", "links both components to application database access")],
    strict: ["Do not describe the query processor as the human who writes the query."],
  }),
  "L142-Q5": Object.freeze({
    title: "Question 5", marks: "6 marks",
    prompt: "Write a function IsPass(Mark : INTEGER) that returns a BOOLEAN, and show the returned value used in an IF expression. Explain how this differs from a procedure.",
    answer: "FUNCTION IsPass(Mark : INTEGER) RETURNS BOOLEAN returns Mark >= 50. The caller can use IF IsPass(Score) THEN ... ENDIF because the function call returns a BOOLEAN value in an expression. A procedure performs a named action and is called as a statement rather than supplying a return value to the expression.",
    marking: [point("B1", "complete function header with INTEGER parameter"), point("B1", "declares BOOLEAN return type"), point("B1", "returns the pass comparison"), point("M1", "uses IsPass(Score) in an IF expression"), point("B1", "procedure described as named action/call"), point("B1", "distinguishes procedure from function return value")],
    strict: ["Do not credit OUTPUT as the function return.", "Require the returned BOOLEAN to be used in an expression."],
  }),
  "L147-Q5": Object.freeze({
    title: "Question 5", marks: "6 marks",
    prompt: "An existing program counts marks of 50 or more. Analyse where to amend the program so it also counts merits of 70 or more, while preserving the existing result.",
    answer: "Analyse the existing declarations, initialisation, traversal, pass condition and outputs. Add and initialise MeritCount, then amend the existing traversal with a separate test Mark >= 70 and increment MeritCount. Keep the pass test Mark >= 50 unchanged, output both counts, and run boundary and regression tests such as 49, 50, 69 and 70.",
    marking: [point("B1", "analyses existing traversal and behaviour to preserve"), point("B1", "declares and initialises MeritCount"), point("M1", "amends existing loop with Mark >= 70"), point("B1", "preserves Mark >= 50 pass behaviour"), point("B1", "outputs both counts"), point("B1", "uses boundary/regression tests around 50 and 70")],
    strict: ["Do not credit a rewrite that removes or changes the existing pass count."],
  }),
});

export const stage3AssessmentEvidence = Object.freeze({
  "S2.15": [{ questionId: "L027-Q4", conceptGroups: [["IPv4"], ["IPv6"], ["public"], ["private"], ["static"], ["dynamic"]] }],
  "S2.16": [{ questionId: "L027-Q5", conceptGroups: [["scheme"], ["domain"], ["path"], ["DNS"], ["IP address"], ["WWW resource"]] }],
  "S3.05": [{ questionId: "L041-Q4", conceptGroups: [["RAM"], ["ROM"], ["volatile"], ["non-volatile"]] }],
  "S3.07": [{ questionId: "L041-Q5", conceptGroups: [["PROM"], ["EPROM"], ["EEPROM"]] }],
  "S8.06": [{ questionId: "L090-Q4", conceptGroups: [["developer interface"], ["query processor"]] }],
  "S11.07": [{ questionId: "L142-Q5", conceptGroups: [["function"], ["returns"], ["value"], ["expression"]] }],
  "S12.07": [{ questionId: "L148-Q3", conceptGroups: [["normal"], ["abnormal"], ["boundary"]] }],
  "S12.08": [{ questionId: "L147-Q4", conceptGroups: [["perfective"], ["adaptive"], ["corrective"], ["maintenance"]] }],
  "S12.09": [{ questionId: "L147-Q5", conceptGroups: [["analyse"], ["amend"], ["existing"], ["program"]] }],
});

export const stage3QuestionDependencyOverrides = Object.freeze({
  "AQ131-Q3": ["S11.05"],
  "L033-Q1": ["S3.03"],
  "L135-Q2": ["S11.03"],
  "L135-Q3": ["S11.03"],
  "L135-Q5": ["S11.03"],
  "L136-Q1": ["S11.02"],
  "L136-Q2": ["S11.02"],
  "L136-Q5": ["S11.02"],
  "L137-Q1": ["S10.07"],
  "L137-Q2": ["S10.07"],
});
