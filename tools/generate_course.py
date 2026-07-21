from __future__ import annotations

import re
from pathlib import Path
from textwrap import dedent


ROOT = Path(__file__).resolve().parents[1]
LESSONS_DIR = ROOT / "lessons"
ASSESSMENTS_DIR = ROOT / "assessments"
RESOURCES_DIR = ROOT / "resources"

SYLLABUS_URL = (
    "https://www.cambridgeinternational.org/programmes-and-qualifications/"
    "cambridge-international-as-and-a-level-computer-science-9618/"
)


SECTIONS = [
    ("1", "Information representation", 15),
    ("2", "Communication", 11),
    ("3", "Hardware", 14),
    ("4", "Processor fundamentals", 11),
    ("5", "System software", 10),
    ("6", "Security, privacy and data integrity", 10),
    ("7", "Ethics and ownership", 6),
    ("8", "Databases", 12),
    ("R1", "Paper 1 integrated review and mock-style practice", 8),
    ("9", "Algorithm design and problem-solving", 15),
    ("10", "Data types and structures", 13),
    ("11", "Programming", 16),
    ("12", "Software development", 5),
    ("R2", "Paper 2 integrated review and mock-style practice", 4),
]


TOPICS = {
    "1": [
        "Bits, bytes, nibbles and storage units",
        "Binary place value and denary conversion",
        "Hexadecimal notation and binary grouping",
        "Binary addition, carries, and overflow",
        "Signed binary: sign-and-magnitude and two's complement",
        "Binary fractions and precision limits",
        "Character sets: ASCII, Unicode, and why emojis are not magic",
        "Bitmap images: pixels, resolution, and colour depth",
        "Image file size calculations and metadata",
        "Digital sound: sampling rate, sample resolution, and duration",
        "Sound file size calculations",
        "Compression: lossless vs lossy",
        "Run-length encoding and dictionary-style compression",
        "Choosing data representation for a real system",
        "Section 1 review: representation calculations under exam timing",
    ],
    "2": [
        "Network purposes, LAN, WAN, and network topologies",
        "Client-server and peer-to-peer models",
        "Packet switching, routing, and packet structure",
        "Protocols and layered communication",
        "IP addresses, MAC addresses, DNS, and URLs",
        "HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context",
        "Wired and wireless transmission media",
        "Network hardware: switches, routers, access points, and gateways",
        "Internet, intranet, extranet, and cloud services",
        "Network performance, latency, bandwidth, and congestion",
        "Section 2 review: explaining communication with precision",
    ],
    "3": [
        "Computer system overview: input, output, storage, processor, and memory",
        "Input devices and data capture",
        "Output devices and user feedback",
        "Primary storage: RAM, ROM, cache, and virtual memory",
        "Secondary storage: magnetic, optical, and solid-state media",
        "Storage characteristics: capacity, speed, durability, portability, and cost",
        "Embedded systems and microcontrollers",
        "Sensors, actuators, and control systems",
        "Logic gates: NOT, AND, OR, NAND, NOR, XOR",
        "Truth tables and Boolean expressions",
        "Building logic circuits from requirements",
        "Hardware selection for different users",
        "Environmental and reliability considerations in hardware",
        "Section 3 review: compare, justify, calculate",
    ],
    "4": [
        "CPU architecture: ALU, CU, registers, buses, and clock",
        "The fetch-decode-execute cycle",
        "Registers: PC, CIR, MAR, MDR, ACC, and status register",
        "System buses: address, data, and control",
        "Instruction sets and machine code",
        "Assembly language basics and mnemonics",
        "Addressing modes and operand interpretation",
        "Interrupts and interrupt service routines",
        "Performance factors: cores, cache, clock speed, and word length",
        "Pipelining and why faster is not always simpler",
        "Section 4 review: tracing processor behaviour",
    ],
    "5": [
        "System software overview: operating systems, utility software, and translators",
        "Operating system roles: process, memory, file, and device management",
        "User interfaces: command line, graphical, menu-driven, and natural language",
        "Utility software: backup, compression, encryption, defragmentation, and antivirus",
        "Compilers, interpreters, and assemblers",
        "Compilation stages: lexical analysis to object code",
        "Linkers, loaders, and libraries",
        "Error types: syntax, logic, runtime, and translation diagnostics",
        "Choosing translation approaches for development and deployment",
        "Section 5 review: precise software comparisons",
    ],
    "6": [
        "Security goals: confidentiality, integrity, availability, and authenticity",
        "Malware types and social engineering",
        "Hacking, phishing, pharming, and denial-of-service attacks",
        "Authentication: passwords, biometrics, tokens, and multi-factor authentication",
        "Access rights, permissions, and least privilege",
        "Encryption, hashing, and digital certificates",
        "Firewalls, proxies, and network monitoring",
        "Data validation and verification",
        "Backup strategies, disaster recovery, and audit trails",
        "Section 6 review: matching risks to controls",
    ],
    "7": [
        "Ethical issues in Computer Science decisions",
        "Privacy, surveillance, and data protection",
        "Intellectual property, copyright, patents, and licensing",
        "Open source, proprietary software, and ownership trade-offs",
        "Environmental and social impacts of computing",
        "Section 7 review: balanced evaluation answers",
    ],
    "8": [
        "Data, information, databases, and DBMS roles",
        "Flat-file databases vs relational databases",
        "Tables, records, fields, data types, and constraints",
        "Primary keys, foreign keys, and relationships",
        "Entity-relationship modelling",
        "Normalisation: avoiding duplication and update problems",
        "SQL SELECT, FROM, WHERE",
        "SQL ORDER BY, aggregate functions, and GROUP BY",
        "SQL joins using related tables",
        "SQL INSERT, UPDATE, and DELETE",
        "Validation, verification, security, and backup in databases",
        "Section 8 review: designing and querying relational data",
    ],
    "R1": [
        "Paper 1 review: representation and communication",
        "Paper 1 review: hardware and processor fundamentals",
        "Paper 1 review: system software and security",
        "Paper 1 review: ethics and databases",
        "Paper 1 mixed question strategy",
        "Paper 1 timed short-answer practice",
        "Paper 1 extended-response practice",
        "Paper 1 mock review and correction clinic",
    ],
    "9": [
        "Algorithmic thinking: inputs, outputs, and constraints",
        "Decomposition and abstraction",
        "Flowcharts and pseudocode notation",
        "Trace tables and dry runs",
        "Sequence, selection, and iteration in algorithms",
        "Validation algorithms and defensive input handling",
        "Linear search and binary search",
        "Bubble sort and insertion sort",
        "Finding maximum, minimum, count, and total",
        "String-processing algorithms",
        "Nested loops and table-style problems",
        "Algorithm efficiency at AS level",
        "Cambridge pseudocode conventions and exam readability",
        "Designing algorithms from word problems",
        "Section 9 review: from scenario to pseudocode",
    ],
    "10": [
        "Data types: integer, real, Boolean, char, string, date, and user-defined types",
        "Constants, variables, and assignment",
        "One-dimensional arrays",
        "Two-dimensional arrays",
        "Array algorithms: traversal, update, search, and count",
        "Records and composite data",
        "Arrays of records",
        "Text files: reading, writing, and appending",
        "CSV-style structured text files",
        "Stacks and queues as abstract data types",
        "Choosing appropriate data structures",
        "Pseudocode data declarations vs Java declarations",
        "Section 10 review: data modelling in algorithms",
    ],
    "11": [
        "Programming constructs: sequence, selection, and iteration",
        "IF, CASE, and nested selection",
        "Count-controlled loops",
        "Condition-controlled loops",
        "Procedures and functions",
        "Parameters: by value and by reference in pseudocode",
        "Scope, lifetime, and local/global variables",
        "String handling and built-in functions",
        "Arithmetic operators, integer division, and MOD",
        "Input and output formatting",
        "File handling patterns in pseudocode and Java",
        "Testing with normal, boundary, and erroneous data",
        "Debugging using traces and breakpoints",
        "Robust program design: validation and modularity",
        "Converting Java habits into Cambridge pseudocode",
        "Section 11 review: writing complete program fragments",
    ],
    "12": [
        "Software development lifecycle models",
        "Requirements analysis and success criteria",
        "Design documentation: algorithms, data dictionaries, and interfaces",
        "Testing, implementation, maintenance, and evaluation",
        "Section 12 review: software development case study",
    ],
    "R2": [
        "Paper 2 review: algorithm design and data structures",
        "Paper 2 review: programming constructs and file handling",
        "Paper 2 timed pseudocode practice",
        "Paper 2 mock review and correction clinic",
    ],
}


VOCAB = {
    "1": ["binary 二进制", "denary 十进制", "hexadecimal 十六进制", "overflow 溢出", "compression 压缩"],
    "2": ["protocol 协议", "packet 数据包", "routing 路由", "bandwidth 带宽", "latency 延迟"],
    "3": ["input 输入", "output 输出", "storage 存储", "logic gate 逻辑门", "embedded system 嵌入式系统"],
    "4": ["register 寄存器", "bus 总线", "fetch-decode-execute 取指-译码-执行", "interrupt 中断"],
    "5": ["operating system 操作系统", "compiler 编译器", "interpreter 解释器", "utility software 实用程序"],
    "6": ["confidentiality 机密性", "integrity 完整性", "authentication 认证", "encryption 加密"],
    "7": ["ethics 伦理", "privacy 隐私", "copyright 版权", "license 许可"],
    "8": ["database 数据库", "primary key 主键", "foreign key 外键", "SQL 结构化查询语言"],
    "9": ["algorithm 算法", "decomposition 分解", "trace table 跟踪表", "pseudocode 伪代码"],
    "10": ["array 数组", "record 记录", "file 文件", "stack 栈", "queue 队列"],
    "11": ["procedure 过程", "function 函数", "parameter 参数", "scope 作用域", "debugging 调试"],
    "12": ["lifecycle 生命周期", "requirements 需求", "testing 测试", "maintenance 维护"],
    "O": ["syllabus 考纲", "command word 指令词", "evidence 证据", "revision 复习"],
    "R1": ["mark scheme 评分标准", "justify 论证", "compare 比较", "evaluate 评价"],
    "R2": ["dry run 手工运行", "boundary test 边界测试", "modularity 模块化", "syntax 语法"],
}


def slugify(text: str) -> str:
    text = text.lower().replace("'", "")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:70]


def paper_for(section: str) -> str:
    if section in {"1", "2", "3", "4", "5", "6", "7", "8", "R1"}:
        return "Paper 1"
    if section in {"9", "10", "11", "12", "R2"}:
        return "Paper 2"
    return "Course setup"


def section_ref(section: str) -> str:
    if section == "R1":
        return "Paper 1 review: Sections 1-8"
    if section == "R2":
        return "Paper 2 review: Sections 9-12"
    return f"Syllabus Section {section}"


def build_lessons() -> list[dict[str, str | int]]:
    lessons: list[dict[str, str | int]] = []
    lesson_no = 1
    for section, title, count in SECTIONS:
        topics = TOPICS[section]
        if len(topics) != count:
            raise ValueError(f"{section} has {len(topics)} topics, expected {count}")
        for idx, topic in enumerate(topics, 1):
            lessons.append(
                {
                    "no": lesson_no,
                    "section": section,
                    "section_title": title,
                    "index": idx,
                    "topic": topic,
                    "paper": paper_for(section),
                    "ref": section_ref(section),
                }
            )
            lesson_no += 1
    if len(lessons) != 150:
        raise ValueError(f"Expected 150 lessons, got {len(lessons)}")
    return lessons


def assessment_tag(no: int) -> str:
    tags = []
    if no % 5 == 0:
        tags.append("5-minute quiz")
    if no in {20, 40, 60, 80, 100, 120, 140}:
        tags.append("monthly assessment checkpoint")
    if no in {15, 26, 40, 51, 61, 71, 77, 89, 97, 112, 125, 141, 146, 150}:
        tags.append("stage review")
    return ", ".join(tags) if tags else "informal questioning"


def category_for(section: str, topic: str) -> str:
    t = topic.lower()
    if "review" in t or "practice" in t or "mock" in t or "strategy" in t:
        return "review"
    if section == "1":
        if any(word in t for word in ["binary", "hexadecimal", "signed", "fractions", "bits", "bytes", "addition"]):
            return "number_representation"
        if any(word in t for word in ["bitmap", "image", "sound", "character", "ascii", "unicode"]):
            return "media_representation"
        return "compression"
    if section == "2":
        return "networking"
    if section == "3":
        if any(word in t for word in ["logic", "truth", "boolean", "circuit"]):
            return "logic"
        if any(word in t for word in ["sensor", "actuator", "embedded"]):
            return "control_hardware"
        return "hardware"
    if section == "4":
        return "processor"
    if section == "5":
        if any(word in t for word in ["compiler", "interpreter", "assembler", "compilation", "linker", "loader", "translator"]):
            return "translator"
        return "system_software"
    if section == "6":
        return "security"
    if section == "7":
        return "ethics"
    if section == "8":
        if "sql" in t:
            return "sql"
        return "database"
    if section == "9":
        return "algorithm"
    if section == "10":
        if "file" in t or "csv" in t:
            return "file_data"
        if "stack" in t or "queue" in t:
            return "adt"
        return "data_structure"
    if section == "11":
        return "programming"
    if section == "12":
        return "software_development"
    return "review"


def topic_overrides(topic: str) -> dict[str, str]:
    t = topic.lower()
    if "bits, bytes" in t:
        return {
            "worked_problem": "A small icon uses 2048 bits. Convert this into bytes, nibbles and KiB where appropriate. Then explain why confusing bit and byte would make a file-size answer eight times wrong.",
            "worked_answer": "`2048 bits / 8 = 256 bytes`; `2048 bits / 4 = 512 nibbles`; `256 bytes = 0.25 KiB` if using 1024 bytes per KiB. Mark the unit conversion and the explanation that 1 byte = 8 bits.",
            "student_task": "Students build a storage ladder from bit -> nibble -> byte -> KiB -> MiB, then create two exam traps: one using decimal place-value thinking and one confusing bits with bytes.",
        }
    if "binary place value" in t:
        return {
            "worked_problem": "Convert `10110110₂` to denary and explain which place values are used.",
            "worked_answer": "`128 + 32 + 16 + 4 + 2 = 182`; credit visible columns `128 64 32 16 8 4 2 1` and correct base labelling.",
            "student_task": "Students convert three 8-bit values to denary, then write one deliberately wrong solution where a zero bit is accidentally counted.",
        }
    if "hexadecimal" in t:
        return {
            "worked_problem": "Convert `1101 0110₂` to hexadecimal and explain why grouping into four bits works.",
            "worked_answer": "`1101₂ = D₁₆` and `0110₂ = 6₁₆`, so the value is `D6₁₆`. Award marks for 4-bit grouping from the right.",
            "student_task": "Students match binary nibbles to hex digits, then decode a short memory-address style value.",
        }
    if "overflow" in t:
        return {
            "worked_problem": "Add `11001010₂` and `01110101₂` using 8-bit binary addition and identify whether overflow occurs.",
            "worked_answer": "Credit correct carries and the 9th carry-out. Overflow must be explained as the result exceeding the available 8-bit range, not just 'there is a carry'.",
            "student_task": "Pairs solve two additions: one that fits in 8 bits and one that overflows. They annotate every carry.",
        }
    if "two's complement" in t or "signed binary" in t:
        return {
            "worked_problem": "Represent `-23` in 8-bit two's complement and explain how the sign bit is interpreted.",
            "worked_answer": "`23 = 00010111`; invert -> `11101000`; add 1 -> `11101001`. Credit method and explanation that the leading 1 indicates a negative value in two's complement.",
            "student_task": "Students convert two positive and two negative values, then explain why sign-and-magnitude and two's complement are not interchangeable.",
        }
    if "bitmap" in t or "image file size" in t:
        return {
            "worked_problem": "Calculate the size of a 100 by 80 pixel bitmap using 8-bit colour depth, ignoring metadata.",
            "worked_answer": "`100 * 80 * 8 = 64 000 bits = 8000 bytes`. Credit dimensions, colour depth and bit-to-byte conversion.",
            "student_task": "Students change one parameter at a time: width, height and colour depth. They predict which change doubles the file size.",
        }
    if "sound file size" in t or "sampling rate" in t:
        return {
            "worked_problem": "Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution.",
            "worked_answer": "`8000 * 16 * 10 = 1 280 000 bits = 160 000 bytes`. Credit sample rate, sample resolution and duration.",
            "student_task": "Students compare two clips and decide whether reducing sample rate or sample resolution is the better compromise.",
        }
    if "packet switching" in t:
        return {
            "worked_problem": "A file is split into packets before being sent across a network. Explain two items of metadata each packet needs and why packets may arrive out of order.",
            "worked_answer": "Credit destination/source address, sequence number, checksum or payload length. Out-of-order arrival occurs because packets can take different routes.",
            "student_task": "Students act as routers passing numbered packet cards through different routes, then reconstruct the message using sequence numbers.",
        }
    if "http" in t and "imap" in t:
        return {
            "worked_problem": "Match HTTP, HTTPS, FTP, SMTP, POP3 and IMAP to six actions: viewing a webpage securely, transferring a file, sending email, downloading email, synchronising mailbox folders and viewing a normal webpage.",
            "worked_answer": "HTTP: webpage; HTTPS: secure webpage; FTP: file transfer; SMTP: sending email; POP3: downloading email; IMAP: synchronised email access. Credit context, not just expansion of abbreviations.",
            "student_task": "Students write a protocol diary for a student submitting homework by email and downloading a file from a school server.",
        }
    if "logic gates" in t:
        return {
            "worked_problem": "Complete the truth table for `Output = (A AND B) OR NOT C`.",
            "worked_answer": "Credit all eight input combinations and correct intermediate columns for `A AND B` and `NOT C` before the final OR.",
            "student_task": "Students turn a classroom access rule into a Boolean expression, then draw the gate circuit.",
        }
    if "truth tables" in t:
        return {
            "worked_problem": "Given a two-gate circuit, derive the Boolean expression and complete its truth table.",
            "worked_answer": "Credit systematic input combinations, intermediate gate outputs and final output. The expression must match the circuit order.",
            "student_task": "Pairs swap circuits and truth tables; each pair checks whether the other representation matches.",
        }
    if "fetch-decode-execute" in t:
        return {
            "worked_problem": "Trace one instruction through PC, MAR, MDR and CIR during the fetch stage.",
            "worked_answer": "PC holds the address; address is copied to MAR; memory returns instruction to MDR; instruction is copied to CIR; PC is incremented. Credit sequence.",
            "student_task": "Students annotate a CPU diagram with numbered arrows for each fetch step.",
        }
    if "compilers, interpreters" in t:
        return {
            "worked_problem": "Choose a translator for development and another for distributing a finished program. Justify both choices.",
            "worked_answer": "Interpreter is useful for development due to line-by-line error feedback; compiler is suitable for distribution because object/executable code can run without source code.",
            "student_task": "Students sort scenarios into compiler, interpreter and assembler, then write one trade-off for each.",
        }
    if "encryption, hashing" in t:
        return {
            "worked_problem": "A website stores passwords and sends payment data. Decide where hashing, encryption and a digital certificate are used.",
            "worked_answer": "Hash stored passwords; encrypt payment data in transit; use a digital certificate to support authentication of the website and secure HTTPS communication.",
            "student_task": "Students create a three-column table: protection method, what it protects, what it does not protect.",
        }
    if "primary keys" in t:
        return {
            "worked_problem": "For `Student(StudentID, Name, TutorGroup)` and `Loan(LoanID, StudentID, BookID, DateBorrowed)`, identify primary and foreign keys.",
            "worked_answer": "`StudentID` is primary key in Student; `LoanID` is primary key in Loan; `StudentID` in Loan is a foreign key referencing Student.",
            "student_task": "Students design a two-table system for sports equipment loans and label each key.",
        }
    if "sql joins" in t:
        return {
            "worked_problem": "Write an SQL query to show `StudentName` and `BookTitle` for current loans using `Student`, `Loan` and `Book` tables.",
            "worked_answer": "Credit a valid join path such as `Student.StudentID = Loan.StudentID` and `Loan.BookID = Book.BookID`, plus only the requested fields in SELECT.",
            "student_task": "Students draw the join path first, then write the SQL. They must circle the foreign keys before writing `SELECT`.",
        }
    if "linear search and binary search" in t:
        return {
            "worked_problem": "Trace a linear search for `42` in `[13, 42, 56, 70]`, then explain why binary search requires sorted data.",
            "worked_answer": "Linear search checks 13 then 42 and stops when found. Binary search can discard half the data only when order is guaranteed.",
            "student_task": "Students trace both searches on paper cards, then write one sentence explaining when linear search is still acceptable.",
        }
    if "bubble sort" in t or "insertion sort" in t:
        return {
            "worked_problem": "Show the first pass of bubble sort on `[5, 1, 4, 2]` and compare it with the first insertion sort movement.",
            "worked_answer": "Bubble sort compares adjacent items and moves the largest towards the end; insertion sort takes the next item and inserts it into the sorted left part.",
            "student_task": "Students physically sort four cards twice, once using bubble sort rules and once using insertion sort rules.",
        }
    if "procedures and functions" in t:
        return {
            "worked_problem": "Write a procedure `DisplayMenu()` and a function `CalculateVAT(Price)`; explain the difference in return value.",
            "worked_answer": "The procedure performs output and does not have to return a value. The function returns a calculated value, for example `Price * 0.2`.",
            "student_task": "Students convert two repeated code blocks into one procedure and one function, then label call, parameter and return value.",
        }
    if "parameters" in t:
        return {
            "worked_problem": "Trace a procedure call where one parameter is passed by value and another by reference.",
            "worked_answer": "Changes to the by-value parameter do not affect the original variable; changes to the by-reference parameter do. Credit clear before/after values.",
            "student_task": "Students annotate two calls with arrows showing whether data is copied or linked back to the caller.",
        }
    if "file handling patterns" in t:
        return {
            "worked_problem": "Write pseudocode to open `Orders.txt`, read every line, count records, and close the file.",
            "worked_answer": "Credit `OPENFILE` for read, loop until EOF, `READFILE`, count update and `CLOSEFILE`. Java syntax must not replace Cambridge pseudocode.",
            "student_task": "Students identify the file mode for read, write and append scenarios, then write one Cambridge pseudocode pattern.",
        }
    if "software development lifecycle" in t:
        return {
            "worked_problem": "A school wants a booking system. Place analysis, design, implementation, testing, evaluation and maintenance in a sensible lifecycle order.",
            "worked_answer": "Credit lifecycle order and feedback loops; analysis should identify requirements before design and implementation.",
            "student_task": "Students turn a vague client request into two measurable requirements before any design is allowed.",
        }
    return {}


def topic_profile(section: str, topic: str, no: int) -> dict[str, str]:
    category = category_for(section, topic)
    t = topic.lower()
    profiles: dict[str, dict[str, str]] = {
        "number_representation": {
            "warmup": f"Write `{no * 7 % 256:08b}` on the board and ask: Is this a number, a colour value, a character code, or just eight dramatic zeros and ones? Let students argue before revealing that representation gives the bits meaning.",
            "guided": f"Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting {topic} to file sizes, memory addresses, or exam calculation marks.",
            "board": "Left: place-value columns. Middle: worked conversion or binary operation. Right: exam warnings: show working, label base, check range.",
            "worked_problem": "Convert a small value between denary, binary and hexadecimal, then state whether the answer fits in 8 bits.",
            "worked_answer": "Award the method before the final number: place values or 4-bit hex groups must be visible. The final line must include the base, for example `10110110₂ = B6₁₆`.",
            "student_task": "Give each pair three cards: a denary value, a binary value and a hex value. They must match them, explain the method, then design one trap card that looks plausible but is wrong.",
            "misconception": "Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.",
        },
        "media_representation": {
            "warmup": "Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.",
            "guided": f"Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.",
            "board": "Left: physical media idea. Middle: formula or encoding table. Right: quality/storage trade-off sentence frames.",
            "worked_problem": "Calculate storage for a small image or sound sample using the lesson parameters, then explain one effect of increasing resolution, colour depth, sample rate or sample resolution.",
            "worked_answer": "Correct answers show multiplication by the relevant dimensions and bit depth, then convert bits to bytes where needed. The explanation must mention both quality and file size.",
            "student_task": "Pairs redesign a media file for a slow network: one student defends quality, the other defends storage. They must agree on which parameter to reduce and justify it.",
            "misconception": "Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it.",
        },
        "compression": {
            "warmup": "Write `AAAAAABBBBCCCCCCCC` and ask students to compress it faster than a tired messaging app. Then show a random-looking string and ask why the same trick struggles.",
            "guided": f"Begin with repeated data, then formalise why {topic} reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.",
            "board": "Left: original data. Middle: compressed representation and ratio. Right: lossless/lossy decision table.",
            "worked_problem": "Compress a short run of repeated characters and calculate the number of saved characters or bytes.",
            "worked_answer": "Credit the encoded form and the comparison with the original size. For lossy/lossless questions, the answer must state whether exact reconstruction is possible.",
            "student_task": "Groups receive three mini-files: repeated text, a photo description and a music clip. They choose lossless or lossy compression and defend the decision.",
            "misconception": "Students often assume compression always makes a file smaller. Correction: compression has overhead and depends on patterns in the data.",
        },
        "networking": {
            "warmup": f"Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce {topic}, not as a vocabulary list but as a journey.",
            "guided": "Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.",
            "board": "Left: sender and receiver. Middle: packet path with devices/protocols. Right: cause -> symptom -> fix table.",
            "worked_problem": "A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each.",
            "worked_answer": "Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.",
            "student_task": "Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect.",
            "misconception": "Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.",
        },
        "hardware": {
            "warmup": "Place a phone, a keyboard and a USB drive on the desk or name them. Ask: Which one captures data, which one stores it, and which one merely makes humans feel in control?",
            "guided": f"Classify the component first, then examine how it interacts with the rest of the system. Compare at least two alternatives using capacity, speed, durability, cost, accuracy or suitability. End with a scenario so students must justify, not just name, hardware.",
            "board": "Left: component category. Middle: characteristics comparison table. Right: scenario-based recommendation sentence.",
            "worked_problem": "Choose suitable hardware for a school attendance system and justify two choices.",
            "worked_answer": "Award marks for matching device characteristics to the scenario, such as fast input, reliable storage, or suitable output feedback.",
            "student_task": "Teams design a hardware set-up for a specific user: librarian, weather station, exam office or delivery driver. They must reject one tempting but unsuitable device.",
            "misconception": "Students often list hardware without explaining suitability. Correction: the mark usually comes from matching a feature to a need.",
        },
        "control_hardware": {
            "warmup": "Ask: How does a washing machine know it is being dramatic, not just wet? Lead students to sensors, data input, decisions and actuators.",
            "guided": "Build a control loop: sensor reads a physical quantity, processor compares it with a rule, actuator changes the environment, then the sensor reads again. Keep the loop visible and ask where errors could enter.",
            "board": "Left: physical condition. Middle: sensor -> processor -> actuator loop. Right: error and safety checks.",
            "worked_problem": "Design a control system for a greenhouse fan using temperature readings.",
            "worked_answer": "A complete answer names the sensor, decision condition, actuator, and feedback loop. Extra credit for validation or safety limits.",
            "student_task": "Students write a three-step control rule for traffic lights, greenhouse fans or automatic doors, then identify the sensor and actuator.",
            "misconception": "Students often say the sensor 'does the action'. Correction: sensors detect; actuators act.",
        },
        "logic": {
            "warmup": "Tell students the classroom door opens only if the teacher has a key AND the lesson is not an exam. Ask them to turn that sentence into a truth table before anyone tries to escape.",
            "guided": "Translate English conditions into Boolean variables, complete the truth table, then draw or simplify the logic circuit. Test the circuit with one row from the table and use mismatches as debugging evidence.",
            "board": "Left: Boolean statement. Middle: truth table. Right: circuit or expression and test row.",
            "worked_problem": "Create a truth table for a two-input condition and identify when the output is 1.",
            "worked_answer": "Credit every input combination and the correct output column. For circuits, the gate sequence must match the expression.",
            "student_task": "Pairs invent a school rule using AND, OR and NOT, then exchange it with another pair to produce a truth table.",
            "misconception": "Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.",
        },
        "processor": {
            "warmup": "Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.",
            "guided": f"Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to {topic}: what changes, what improves, and what limitation remains?",
            "board": "Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.",
            "worked_problem": "Trace one fetch-decode-execute cycle and name the role of two registers.",
            "worked_answer": "Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.",
            "student_task": "Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences.",
            "misconception": "Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.",
        },
        "system_software": {
            "warmup": "Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.",
            "guided": f"Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For {topic}, keep asking: what service is being provided to hardware, software or the user?",
            "board": "Left: user problem. Middle: OS or utility role. Right: benefit and limitation.",
            "worked_problem": "A laptop is slow and storage is nearly full. Recommend two system software tools or OS actions and justify them.",
            "worked_answer": "Answers must connect a tool to a job: backup protects data, antivirus detects malware, file management organises storage, process management allocates CPU time.",
            "student_task": "Students sort cards into OS roles, utility software and application software, then defend two difficult cards.",
            "misconception": "Students often call every program an operating system. Correction: an OS manages resources and provides services; an app performs user tasks.",
        },
        "translator": {
            "warmup": "Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?",
            "guided": "Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show why translation is not magic.",
            "board": "Left: source code. Middle: translation pathway. Right: compiler/interpreter/assembler comparison.",
            "worked_problem": "Choose a suitable translator for distributing a finished program and justify the choice.",
            "worked_answer": "Compiler is usually suitable for distribution because it produces object/executable code and can run without source code; interpreter is useful during development for line-by-line diagnostics.",
            "student_task": "Students receive development and deployment scenarios and choose compiler, interpreter or assembler with one reason and one trade-off.",
            "misconception": "Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.",
        },
        "security": {
            "warmup": "Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.",
            "guided": f"Build a risk chain: asset, threat, vulnerability, impact and control. For {topic}, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.",
            "board": "Left: asset and threat. Middle: risk chain. Right: control mapped to CIA/authenticity.",
            "worked_problem": "A school stores exam marks online. Identify two risks and one control for each.",
            "worked_answer": "Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.",
            "student_task": "Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks.",
            "misconception": "Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups.",
        },
        "ethics": {
            "warmup": "Ask: Just because a system can collect the data, should it? If the first answer is 'depends', good: now we have an ethics lesson instead of a slogan contest.",
            "guided": f"Frame {topic} as a conflict between stakeholders. Identify benefits, harms, rights and responsibilities. Teach students to write balanced answers: one side, the other side, then a justified judgement.",
            "board": "Left: stakeholder map. Middle: benefit/risk evidence. Right: balanced evaluation paragraph.",
            "worked_problem": "Evaluate whether a school should use monitoring software on student laptops.",
            "worked_answer": "Credit balanced points: safeguarding and security benefits, privacy concerns, transparency, consent, proportionality and data retention.",
            "student_task": "Students role-play two stakeholders and prepare one argument each, then write a neutral examiner-style conclusion.",
            "misconception": "Students often write personal opinions only. Correction: ethics answers need stakeholders, evidence and balanced judgement.",
        },
        "database": {
            "warmup": "Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.",
            "guided": f"Start with messy data, then organise it into entities, fields, records and relationships. For {topic}, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.",
            "board": "Left: messy flat data. Middle: table/entity design. Right: key or relationship rule.",
            "worked_problem": "Design two related tables for students borrowing library books and identify suitable primary and foreign keys.",
            "worked_answer": "A strong answer separates Student and Loan/Book data, gives each table a primary key, and uses a foreign key to link records.",
            "student_task": "Pairs convert a messy club list into relational tables, then mark one field as a primary key and one as a foreign key.",
            "misconception": "Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record.",
        },
        "sql": {
            "warmup": "Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.",
            "guided": f"Begin with the English question, underline the required fields, table and condition, then translate into SQL. For {topic}, stress order of thinking over memorising line order. Test the query against two rows.",
            "board": "Left: English request. Middle: SQL clauses. Right: expected result rows.",
            "worked_problem": "Write a query to return selected fields from a table using a condition, ordering, aggregate or join as appropriate.",
            "worked_answer": "Credit correct SELECT fields, FROM table, WHERE/JOIN condition and any ORDER BY or aggregate clause required by the question.",
            "student_task": "Students write three natural-language questions for a database, then swap and write SQL for another pair's questions.",
            "misconception": "Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required.",
        },
        "algorithm": {
            "warmup": "Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.",
            "guided": f"Define the inputs, outputs and stopping condition before writing any pseudocode. For {topic}, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.",
            "board": "Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.",
            "worked_problem": "Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string.",
            "worked_answer": "Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.",
            "student_task": "Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears.",
            "misconception": "Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.",
        },
        "data_structure": {
            "warmup": "Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.",
            "guided": f"Move from single values to grouped data. For {topic}, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.",
            "board": "Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.",
            "worked_problem": "Declare an appropriate data structure and write pseudocode to read, update, search or count values.",
            "worked_answer": "Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.",
            "student_task": "Students model a small school dataset using arrays, records or arrays of records, then write one operation on it.",
            "misconception": "Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.",
        },
        "file_data": {
            "warmup": "Ask: If the program forgets everything when it closes, is it a program or a very confident goldfish? Then introduce files as persistent storage.",
            "guided": f"Show the lifecycle of file data: open, read or write, process, close. For {topic}, distinguish the stored text from the variables used while processing it. Include one failure case such as missing file or malformed line.",
            "board": "Left: file contents. Middle: read/write pseudocode. Right: validation and close-file reminders.",
            "worked_problem": "Read records from a text file, process a value, and write a result or updated line.",
            "worked_answer": "Credit correct open mode, loop through records, parsing or assignment, and closing the file. For CSV-style data, fields must be separated consistently.",
            "student_task": "Students design a small text file format for scores or stock items, then write pseudocode to read one record.",
            "misconception": "Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.",
        },
        "adt": {
            "warmup": "Ask who should be served first: the last student who joined the queue or the first. If anyone says last, quietly move them to the stack lesson.",
            "guided": f"Introduce the rule of access before implementation. For {topic}, model operations with cards: push/pop or enqueue/dequeue. Then write pseudocode that respects overflow and underflow checks.",
            "board": "Left: ADT rule. Middle: operation trace. Right: overflow/underflow checks.",
            "worked_problem": "Trace a sequence of stack or queue operations and state the final contents.",
            "worked_answer": "Credit operation order and pointer/front/rear updates where used. Answers must show when an operation is invalid because the structure is full or empty.",
            "student_task": "Students act out a stack or queue with paper cards, then convert the movement into pseudocode operations.",
            "misconception": "Students often describe stacks and queues as just arrays. Correction: the defining feature is the access rule, not the storage implementation.",
        },
        "programming": {
            "warmup": "Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.",
            "guided": f"For {topic}, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.",
            "board": "Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.",
            "worked_problem": "Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case.",
            "worked_answer": "Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.",
            "student_task": "Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer.",
            "misconception": "Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.",
        },
        "software_development": {
            "warmup": "Ask: If a client says 'make it user-friendly', should we start coding or start asking better questions? Requirements first; keyboard heroics later.",
            "guided": f"Place {topic} inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is weak. Connect the stage to testing and maintenance, not as a poster but as a feedback loop.",
            "board": "Left: lifecycle stage. Middle: document or activity produced. Right: risk if skipped.",
            "worked_problem": "Given a small client scenario, identify suitable requirements, design evidence, tests or maintenance actions.",
            "worked_answer": "Credit answers that are measurable and scenario-specific. Vague requirements such as 'easy to use' need success criteria to earn strong marks.",
            "student_task": "Students turn a vague client request into three testable requirements and one acceptance test.",
            "misconception": "Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.",
        },
        "review": {
            "warmup": f"Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.",
            "guided": f"Use {topic} to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.",
            "board": "Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.",
            "worked_problem": "Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks.",
            "worked_answer": "Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.",
            "student_task": "Students complete a timed response, swap scripts, mark with a checklist, and write one improved version.",
            "misconception": "Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.",
        },
    }
    profile = profiles[category].copy()
    profile.update(topic_overrides(topic))
    profile["category"] = category
    topic_focus = topic.lower()
    profile["warmup"] = (
        f"{profile['warmup']}\n\n"
        f"Lesson-specific focus question: What would go wrong if a student confused **{topic}** with a neighbouring syllabus idea?"
    )
    profile["guided"] = (
        f"{profile['guided']}\n\n"
        f"Topic-specific teaching move: keep the explanation anchored to **{topic}**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it."
    )
    profile["worked_problem"] = (
        f"{profile['worked_problem']} The worked example must explicitly use **{topic}**, not a generic example from the wider unit."
    )
    profile["student_task"] = (
        f"{profile['student_task']} Their final answer must include the phrase **{topic}** and one short Chinese support note explaining the hardest word."
    )
    profile["misconception"] = (
        f"{profile['misconception']} For this lesson, make students contrast that mistake with the exact idea of **{topic_focus}**."
    )
    return profile


def pseudocode_example(section: str, topic: str) -> str:
    if section not in {"9", "10", "11", "12", "R2"}:
        return ""
    t = topic.lower()
    if "procedures and functions" in t:
        pseudo = """```text
// Cambridge-style pseudocode
PROCEDURE DisplayMenu()
    OUTPUT "1. Add score"
    OUTPUT "2. Quit"
ENDPROCEDURE

FUNCTION CalculateVAT(Price : REAL) RETURNS REAL
    RETURN Price * 0.20
ENDFUNCTION
```"""
        java = """```java
// Java support example only, not exam pseudocode
static void displayMenu() {
    System.out.println("1. Add score");
    System.out.println("2. Quit");
}

static double calculateVAT(double price) {
    return price * 0.20;
}
```"""
    elif "parameters" in t:
        pseudo = """```text
// Cambridge-style pseudocode
PROCEDURE Increase(BYREF Score : INTEGER)
    Score <- Score + 1
ENDPROCEDURE
```"""
        java = """```java
// Java support example only, not exam pseudocode
// Java primitives are passed by value; wrapper/state objects are needed to mimic BYREF-style changes.
```"""
    elif "search" in t:
        pseudo = """```text
// Cambridge-style pseudocode
Found <- FALSE
Index <- 1
WHILE Found = FALSE AND Index <= Length DO
    IF Names[Index] = Target THEN
        Found <- TRUE
    ELSE
        Index <- Index + 1
    ENDIF
ENDWHILE
```"""
        java = """```java
// Java support example only, not exam pseudocode
boolean found = false;
int index = 0;
while (!found && index < names.length) {
    if (names[index].equals(target)) {
        found = true;
    } else {
        index++;
    }
}
```"""
    elif "array" in t or "data" in t or "record" in t:
        pseudo = """```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```"""
        java = """```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```"""
    elif "file" in t:
        pseudo = """```text
// Cambridge-style pseudocode
OPENFILE "Scores.txt" FOR READ
WHILE NOT EOF("Scores.txt")
    READFILE "Scores.txt", Line
    OUTPUT Line
ENDWHILE
CLOSEFILE "Scores.txt"
```"""
        java = """```java
// Java support example only, not exam pseudocode
try (Scanner file = new Scanner(new File("Scores.txt"))) {
    while (file.hasNextLine()) {
        System.out.println(file.nextLine());
    }
}
```"""
    else:
        pseudo = """```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```"""
        java = """```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```"""
    return f"{pseudo}\n\n{java}\n"


def lesson_markdown(lesson: dict[str, str | int]) -> str:
    no = int(lesson["no"])
    section = str(lesson["section"])
    topic = str(lesson["topic"])
    paper = str(lesson["paper"])
    ref = str(lesson["ref"])
    vocab = ", ".join(VOCAB.get(section, VOCAB["O"])[:5])
    is_programming = section in {"9", "10", "11", "12", "R2"}
    profile = topic_profile(section, topic, no)
    java_note = (
        "\n> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.\n\n"
        if is_programming
        else ""
    )
    pseudo_block = pseudocode_example(section, topic)
    return f"""# Lesson {no:03d}: {topic}

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** {paper}  
**Syllabus reference:** {ref}  
**Duration:** 45 minutes  
**Assessment rhythm:** {assessment_tag(no)}
{java_note}## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **{topic}** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- {vocab}

## Warm-Up Hook
{profile["warmup"]}

## Guided Explanation
{profile["guided"]}

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
{profile["board"]}

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** {profile["worked_problem"]}

**Worked answer / marking focus:** {profile["worked_answer"]}

{pseudo_block}

## Student Task
{profile["student_task"]}

## Mini-Quiz
1. State one precise definition connected to **{topic}**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **{topic}** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **{topic}** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from {ref}.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: {profile["misconception"]}  
Correction prompt: "Show the mechanism, not just the label."
"""


def readme(lessons: list[dict[str, str | int]]) -> str:
    return dedent(
        f"""
        # AS9618 Computer Science 2027-2029 AS Lesson Plans

        This repository contains a complete teacher-facing Markdown course pack for Cambridge International AS Level Computer Science 9618, syllabus years 2027-2029.

        Official qualification page: <{SYLLABUS_URL}>

        Syllabus reference used for this pack: Cambridge International AS & A Level Computer Science 9618 syllabus for examination in 2027, 2028 and 2029, Version 2.

        ## Course Design

        - Target: AS Level only.
        - Papers: Paper 1, Sections 1-8; Paper 2, Sections 9-12.
        - Length: 150 lessons, 45 minutes each.
        - Orientation-only lessons are not included; Lesson 001 starts with syllabus content.
        - Included: stage review, short quizzes, monthly assessments, marking guidance.
        - Excluded: school midterm and final examinations.
        - Language style: English first, Chinese support for difficult concepts.
        - Programming approach: Cambridge pseudocode is the exam standard; Java is used only as a supporting implementation language.

        ## Folder Structure

        - `course-map.md`: syllabus mapping, pacing, and assessment rhythm.
        - `lessons/`: 150 complete lesson plans with topic-specific warm-ups, explanations, examples and misconceptions.
        - `assessments/`: quizzes, monthly assessments, stage reviews, answer keys.
        - `resources/`: glossary, pseudocode-Java guide, and misconception bank.

        ## How To Use

        1. Start with `course-map.md` to see the full pacing plan.
        2. Teach lessons in numerical order unless your school timetable requires rearrangement.
        3. Use the mini-quiz inside each lesson for retrieval practice.
        4. Use `assessments/quizzes.md` every 4-5 lessons and `assessments/monthly-assessments.md` roughly every 18-20 lessons.
        5. For Paper 2, keep reminding students that Java examples are practice scaffolds, not Cambridge pseudocode answers.

        ## Generated Lesson Count

        Total lessons generated: {len(lessons)}
        """
    ).strip() + "\n"


def course_map(lessons: list[dict[str, str | int]]) -> str:
    rows = []
    cursor = 1
    for section, title, count in SECTIONS:
        start = cursor
        end = cursor + count - 1
        cursor += count
        ref = section_ref(section)
        rows.append(f"| {start:03d}-{end:03d} | {paper_for(section)} | {ref} | {title} | {count} |")

    assessment_points = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150]
    subtopics = [
        ("1", "Information representation", "1.1 Data Representation; 1.2 Multimedia - Graphics, Sound; 1.3 Compression"),
        ("2", "Communication", "2.1 Networks including the internet"),
        ("3", "Hardware", "3.1 Computers and their components; 3.2 Logic Gates and Logic Circuits"),
        ("4", "Processor Fundamentals", "4.1 CPU Architecture; 4.2 Assembly Language; 4.3 Bit manipulation"),
        ("5", "System Software", "5.1 Operating Systems; 5.2 Language Translators"),
        ("6", "Security, privacy and data integrity", "6.1 Data Security; 6.2 Data Integrity"),
        ("7", "Ethics and Ownership", "7.1 Ethics and Ownership"),
        ("8", "Databases", "8.1 Database Concepts; 8.2 DBMS; 8.3 DDL and DML"),
        ("9", "Algorithm Design and Problem-solving", "9.1 Computational Thinking Skills; 9.2 Algorithms"),
        ("10", "Data Types and Structures", "10.1 Data Types and Records; 10.2 Arrays; 10.3 Files; 10.4 Introduction to ADT"),
        ("11", "Programming", "11.1 Programming Basics; 11.2 Constructs; 11.3 Structured Programming"),
        ("12", "Software Development", "12.1 Program Development Life cycle; 12.2 Program Design; 12.3 Program Testing and Maintenance"),
    ]
    subtopic_rows = [f"| {section} | {title} | {items} |" for section, title, items in subtopics]
    return dedent(
        """
        # Course Map

        ## Official AS Assessment Overview

        | Paper | Focus | Time | Marks | AS weighting | Course coverage |
        |---|---|---:|---:|---:|---|
        | Paper 1 | Theory Fundamentals | 1 hour 30 minutes | 75 | 50% | Sections 1-8 |
        | Paper 2 | Fundamental Problem-solving and Programming Skills | 2 hours | 75 | 50% | Sections 9-12 |

        Notes:
        - Calculators are not used in the papers.
        - Paper 2 answers should be written in Cambridge-style pseudocode.
        - Java examples in this course are teaching support only.

        ## Official AS Content Overview

        | Section | Title | Subtopics |
        |---:|---|---|
        """
    ).strip() + "\n" + "\n".join(subtopic_rows) + "\n\n" + dedent(
        """
        ## Lesson Pacing

        | Lessons | Paper | Syllabus Reference | Unit | Lessons |
        |---:|---|---|---|---:|
        """
    ).strip() + "\n" + "\n".join(rows) + "\n\n" + dedent(
        f"""

        ## Internal Assessment Rhythm

        - Short quiz: lessons {", ".join(str(x) for x in assessment_points)}.
        - Monthly assessment checkpoints: lessons 020, 040, 060, 080, 100, 120, 140.
        - Stage reviews: lessons 015, 026, 040, 051, 061, 071, 077, 089, 097, 112, 125, 141, 146, 150.
        - Midterm and final examinations are not included in this 150-lesson pack.

        ## Implementation Notes

        The lesson sequence is deliberately spiral:

        - Paper 1 lessons build vocabulary and explanation accuracy.
        - Paper 2 lessons turn problem statements into traceable algorithms.
        - Reviews mix topics so students practise recognising the question type, not just the chapter heading.
        - Java appears only as a supporting language for runnable practice. Cambridge pseudocode remains the required exam style.
        """
    ).strip() + "\n"


def quizzes(lessons: list[dict[str, str | int]]) -> str:
    parts = ["# Short Quizzes\n", "Use one quiz every 4-5 lessons. Each quiz should take 8-10 minutes.\n"]
    for no in range(5, 151, 5):
        lesson = lessons[no - 1]
        topic = str(lesson["topic"])
        section = str(lesson["section"])
        parts.append(
            dedent(
                f"""
                ## Quiz after Lesson {no:03d}: {topic}

                1. Define one key term from {section_ref(section)}.
                2. Give one example and one non-example related to **{topic}**.
                3. Explain why a vague answer such as "it is faster" would not earn full marks.
                4. Write one exam-quality sentence using "therefore".

                ### Answer Key / Mark Scheme
                1. Award 1 mark for an accurate definition and 1 mark for correct technical vocabulary.
                2. Award 1 mark for a valid example and 1 mark for a valid non-example.
                3. Award 2 marks for explaining that "faster" needs context, measurable comparison, and a consequence.
                4. Award 2 marks for a complete sentence that links cause to effect using "therefore".

                Do not award generic claims without explanation.
                """
            ).strip()
        )
    return "\n\n".join(parts) + "\n"


def monthly_assessments() -> str:
    checkpoints = [
        (20, "Information representation and communication"),
        (40, "Communication and hardware"),
        (60, "Processor fundamentals and system software"),
        (80, "Security, ethics, and databases"),
        (100, "Paper 1 review and algorithm design"),
        (120, "Algorithms and data structures"),
        (140, "Programming and software development"),
    ]
    parts = ["# Monthly Assessments\n", "Each assessment is designed for 35-45 minutes plus review time.\n"]
    for no, focus in checkpoints:
        parts.append(
            dedent(
                f"""
                ## Checkpoint at Lesson {no:03d}: {focus}

                ### Questions
                1. Define two key terms and use each in a technical sentence. [4]
                2. Apply one calculation, trace, diagram, or SQL/pseudocode fragment from the current unit. [6]
                3. Explain two advantages, disadvantages, risks, or safeguards in context. [6]
                4. Extended response: justify a design choice for a realistic school, shop, or network scenario. [8]

                ### Answer Key / Mark Scheme
                - Q1: 1 mark per accurate definition and 1 mark per correct technical sentence. [4]
                - Q2: Award up to 6 marks for correct method, working, and final result or trace. [6]
                - Q3: Award 1 mark per valid point and 1 mark per contextual explanation. [6]
                - Q4: Award up to 8 marks for a justified recommendation with balanced trade-offs and scenario evidence. [8]
                - Full credit requires technical accuracy and context; memorised definitions alone cannot receive full marks.
                """
            ).strip()
        )
    return "\n\n".join(parts) + "\n"


def stage_reviews() -> str:
    reviews = [
        (15, "Section 1 representation calculations"),
        (26, "Section 2 communication explanations"),
        (40, "Section 3 hardware comparisons"),
        (51, "Section 4 processor tracing"),
        (61, "Section 5 system software comparisons"),
        (71, "Section 6 security controls"),
        (77, "Section 7 ethical evaluation"),
        (89, "Section 8 database design and SQL"),
        (97, "Paper 1 integrated response technique"),
        (112, "Section 9 algorithm design"),
        (125, "Section 10 data structures"),
        (141, "Section 11 programming"),
        (146, "Section 12 software development"),
        (150, "Paper 2 integrated pseudocode practice"),
    ]
    parts = ["# Stage Reviews\n"]
    for no, focus in reviews:
        parts.append(
            dedent(
                f"""
                ## Lesson {no:03d}: {focus}

                ### Review Flow
                1. Retrieval grid: 6 quick prompts from previous lessons.
                2. Error clinic: students correct two weak answers.
                3. Timed exam practice: one short question and one longer question.
                4. Reflection: each student writes one target for the next unit.

                ### Teacher Notes
                Push students to explain cause and consequence. A correct keyword is the start of an answer, not the whole answer.

                ### Answer Key / Mark Scheme
                - Retrieval grid: 1 mark per correct term, fact, or calculation.
                - Error clinic: award marks for identifying the error and rewriting a corrected answer.
                - Timed practice: use Cambridge-style point-plus-explanation marking.
                - Reflection: no exam mark; use it to set the next target.
                """
            ).strip()
        )
    return "\n\n".join(parts) + "\n"


def glossary() -> str:
    terms = [
        ("abstraction", "Hiding unnecessary detail so the important features of a problem are clearer.", "抽象：隐藏不必要细节，突出核心特征。"),
        ("algorithm", "A finite set of ordered steps used to solve a problem.", "算法：解决问题的一组有限、有序步骤。"),
        ("array", "A data structure that stores multiple values of the same type under one identifier.", "数组：用一个标识符保存多个同类型值。"),
        ("binary", "A base-2 number system using 0 and 1.", "二进制：只使用 0 和 1 的数制。"),
        ("compiler", "A translator that converts source code into object code before execution.", "编译器：执行前把源代码翻译成目标代码。"),
        ("database", "An organised collection of related data.", "数据库：有组织的相关数据集合。"),
        ("encryption", "Transforming data so it cannot be understood without the correct key.", "加密：没有正确密钥就无法理解数据。"),
        ("foreign key", "A field that links to the primary key of another table.", "外键：连接到另一张表主键的字段。"),
        ("interrupt", "A signal that causes the processor to pause its current task and run a service routine.", "中断：使处理器暂停当前任务并运行服务程序的信号。"),
        ("pseudocode", "A language-independent way to express an algorithm.", "伪代码：不依赖具体编程语言来表达算法。"),
        ("protocol", "A set of rules for communication between devices.", "协议：设备通信时遵守的规则集合。"),
        ("validation", "Checking data is reasonable and follows required rules.", "验证：检查数据是否合理并符合规则。"),
    ]
    lines = ["# Glossary\n", "| Term | English Definition | 中文支持 |", "|---|---|---|"]
    for term, definition, chinese in terms:
        lines.append(f"| {term} | {definition} | {chinese} |")
    return "\n".join(lines) + "\n"


def pseudocode_java_guide() -> str:
    return dedent(
        """
        # Cambridge Pseudocode and Java Support Guide

        Cambridge pseudocode is the exam answer format. Java examples in this course are used to make ideas runnable and testable, not to replace pseudocode.

        ## Core Differences

        | Idea | Cambridge-style pseudocode | Java support example |
        |---|---|---|
        | Assignment | `total <- total + 1` | `total = total + 1;` |
        | Output | `OUTPUT total` | `System.out.println(total);` |
        | Selection | `IF mark >= 50 THEN ... ENDIF` | `if (mark >= 50) { ... }` |
        | Count loop | `FOR i <- 1 TO 10 ... NEXT i` | `for (int i = 1; i <= 10; i++) { ... }` |
        | Condition loop | `WHILE found = FALSE DO ... ENDWHILE` | `while (!found) { ... }` |
        | Array access | `names[1]` or syllabus-approved indexing as taught | `names[0]` in standard Java zero-based arrays |

        ## Teacher Rule

        When students write Paper 2 answers, mark for algorithmic clarity and Cambridge notation. Do not let Java punctuation become the main event. Semicolons are not a personality trait.

        ## Conversion Routine

        1. Write the algorithm in English.
        2. Convert English into Cambridge pseudocode.
        3. Only then implement a Java version for testing.
        4. Compare the trace table from the pseudocode with the Java output.
        """
    ).strip() + "\n"


def misconceptions() -> str:
    return dedent(
        """
        # Common Misconceptions Bank

        ## Paper 1

        - "More bits always means better." Correction: more bits can increase range or precision, but also increases storage and processing needs.
        - "HTTPS is a different internet." Correction: HTTPS is a secure application-layer protocol used over the internet.
        - "RAM and storage are the same because both hold data." Correction: RAM is volatile primary memory; secondary storage is non-volatile.
        - "The CPU stores all files." Correction: the CPU processes instructions; files are stored in secondary storage.
        - "Encryption prevents all attacks." Correction: encryption protects confidentiality, but does not stop weak passwords, phishing, or poor access control.
        - "Ethics questions are opinion questions." Correction: they require balanced, evidence-based evaluation.
        - "A foreign key is just another primary key." Correction: a foreign key references a primary key in another table to create a relationship.

        ## Paper 2

        - "Pseudocode must compile." Correction: pseudocode must communicate the algorithm clearly using Cambridge conventions.
        - "Java syntax is automatically acceptable in Paper 2." Correction: Java is only a support language in this course; exam answers should use Cambridge pseudocode.
        - "A trace table is busywork." Correction: trace tables expose logic errors before code becomes expensive to fix.
        - "Testing one normal case is enough." Correction: robust testing includes normal, boundary, and erroneous data.
        - "A procedure and function are the same." Correction: a function returns a value; a procedure performs a task and may not return a value.
        """
    ).strip() + "\n"


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def main() -> None:
    lessons = build_lessons()

    for directory in [LESSONS_DIR, ASSESSMENTS_DIR, RESOURCES_DIR]:
        directory.mkdir(parents=True, exist_ok=True)

    for old_lesson in LESSONS_DIR.glob("*.md"):
        old_lesson.unlink()

    write_file(ROOT / "README.md", readme(lessons))
    write_file(ROOT / "course-map.md", course_map(lessons))
    write_file(ASSESSMENTS_DIR / "quizzes.md", quizzes(lessons))
    write_file(ASSESSMENTS_DIR / "monthly-assessments.md", monthly_assessments())
    write_file(ASSESSMENTS_DIR / "stage-reviews.md", stage_reviews())
    write_file(RESOURCES_DIR / "glossary.md", glossary())
    write_file(RESOURCES_DIR / "pseudocode-java-guide.md", pseudocode_java_guide())
    write_file(RESOURCES_DIR / "common-misconceptions.md", misconceptions())

    for lesson in lessons:
        no = int(lesson["no"])
        slug = slugify(str(lesson["topic"]))
        write_file(LESSONS_DIR / f"{no:03d}-{slug}.md", lesson_markdown(lesson))

    print(f"Generated {len(lessons)} lesson files and course resources.")


if __name__ == "__main__":
    main()
