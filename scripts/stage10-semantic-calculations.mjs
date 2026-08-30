// syllabus-order-151 identity refresh applied
import fs from "node:fs";

const technicalVisualContract = JSON.parse(fs.readFileSync(new URL("./stage10-technical-visual-contract.json", import.meta.url), "utf8"));
const invertBits = (bits) => [...bits].map((bit) => bit === "0" ? "1" : "0").join("");
const fixedBinary = (value, width) => value.toString(2).padStart(width, "0").slice(-width);

export const semanticCalculations = Object.freeze([
  { id: "CALC-001-STORAGE", key: "001/knowledge", kind: "equality", observed: 1024 ** 3, expected: 1_073_741_824, description: "1 GiB = 1024^3 bytes" },
  { id: "CALC-002-BINARY", key: "002/knowledge", kind: "binary-to-decimal", bits: "10110110", observed: 182, description: "10110110₂ = 182₁₀" },
  { id: "CALC-003-HEX", key: "003/grouping", kind: "binary-to-hex", bits: "11010110", observed: "D6", description: "11010110₂ = D6₁₆" },
  { id: "CALC-004-OVERFLOW", key: "004/overflow", kind: "unsigned-add", left: "11110000", right: "00010000", observedFull: "100000000", observedStored: "00000000", width: 8, description: "240 + 16 produces a ninth carry bit and stores 00000000 in eight bits" },
  { id: "CALC-005-SIGNMAG", key: "005/systems", kind: "sign-magnitude", magnitude: 23, observedPositive: "00010111", observedNegative: "10010111", width: 8, description: "8-bit sign-and-magnitude conversion for -23" },
  { id: "CALC-006-ONES", key: "005/systems", kind: "ones-complement", positive: 23, observedPositive: "00010111", observedNegative: "11101000", width: 8, description: "8-bit one's-complement conversion for -23" },
  { id: "CALC-007-TWOS", key: "005/systems", kind: "twos-complement", positive: 23, observedPositive: "00010111", observedInverted: "11101000", observedNegative: "11101001", width: 8, description: "8-bit two's-complement conversion for -23" },
  { id: "CALC-008-PRECISION", key: "006/precision", kind: "nearest-fraction", target: 0.1, fractionalBits: 4, observedBits: "0010", description: "Nearest four-fractional-bit representation of 0.1" },
  { id: "CALC-009-BITMAP", key: "008/formula", kind: "product", factors: [100, 80, 8], observed: 64_000, description: "100 x 80 pixels x 8 bits = 64000 bits" },
  { id: "CALC-011-BITMAP-BYTES", key: "008/formula", kind: "quotient", dividend: 64_000, divisor: 8, observed: 8_000, description: "64000 bits / 8 = 8000 bytes" },
  { id: "CALC-012-SOUND", key: "011/formula", kind: "product", factors: [8_000, 16, 10], observed: 1_280_000, description: "8000 Hz x 16 bits x 10 seconds = 1280000 bits" },
  { id: "CALC-013-SOUND-BYTES", key: "011/formula", kind: "quotient", dividend: 1_280_000, divisor: 8, observed: 160_000, description: "1280000 bits / 8 = 160000 bytes" },
  { id: "CALC-014-PACKET", key: "016/sprint", kind: "product", factors: [100, 50, 8], observed: 40_000, description: "100 packets x 50 bytes x 8 = 40000 bits" },
  { id: "CALC-015-TRANSMISSION", key: "026/calculation", kind: "quotient", dividend: 25 * 8, divisor: 10, observed: 20, description: "25 MB x 8 / 10 Mbps = 20 seconds" },
  { id: "CALC-016-ADDRESS-WIDTH", key: "045/width", kind: "power", base: 2, exponent: 16, observed: 65_536, description: "16 address bits select 65536 addresses" },
  { id: "CALC-017-LENGTH", key: "134/length", kind: "string-length", value: "ALGORITHM", observed: 9, description: "LENGTH('ALGORITHM') = 9" },
  { id: "CALC-018-DIVMOD", key: "135/relationship", kind: "divmod", dividend: 17, divisor: 5, observedDiv: 3, observedMod: 2, description: "17 DIV 5 = 3 and 17 MOD 5 = 2" },
  { id: "CALC-020-DECISION-ENDIF", key: "102/equivalence", kind: "balanced-keywords", text: "IF THEN ELSE ENDIF", pairs: [["IF", "ENDIF"]], description: "Flowchart decision maps to a closed IF selection" },
  { id: "CALC-021-JAVA-SUM", key: "103/pseudocode", kind: "required-substrings", text: "int number = input.nextInt(); total += number; System.out.println(total);", required: ["input.nextInt()", "total += number", "System.out.println(total)"], description: "Java support code inputs, accumulates and outputs" },
  { id: "CALC-022-COUNT-ENDIF", key: "101/pseudocode", kind: "ordered-substrings", text: "IF Mark >= 50 THEN PassCount <- PassCount + 1 ENDIF NEXT Count", required: ["IF Mark", "PassCount <- PassCount + 1", "ENDIF", "NEXT Count"], description: "ENDIF precedes NEXT Count" },
  { id: "CALC-023-REPEAT-ENDIF", key: "104/pseudocode", kind: "ordered-substrings", text: "REPEAT INPUT Mark IF invalid THEN OUTPUT warning ENDIF UNTIL valid", required: ["REPEAT", "INPUT Mark", "IF", "ENDIF", "UNTIL"], description: "Cambridge validation has REPEAT, ENDIF and UNTIL in order" },
  { id: "CALC-024-JAVA-DO-WHILE", key: "104/pseudocode", kind: "ordered-substrings", text: "do { input if warning } while (invalid);", required: ["do {", "input", "if", "} while"], description: "Java support loop includes opening do block" },
  { id: "CALC-025-SEARCH-ENDIF", key: "105/pseudocode", kind: "ordered-substrings", text: "WHILE IF match THEN Found <- TRUE ENDIF Index <- Index + 1 ENDWHILE", required: ["WHILE", "IF", "ENDIF", "Index <- Index + 1", "ENDWHILE"], description: "Search decision closes before index update" },
  { id: "CALC-026-TOTAL-COUNT-ENDIF", key: "107/pseudocode", kind: "ordered-substrings", text: "Total update IF pass THEN PassCount update ENDIF NEXT Index", required: ["Total", "IF", "PassCount", "ENDIF", "NEXT Index"], description: "Pass selection closes inside the total loop" },
  { id: "CALC-027-VOWEL-ENDIF", key: "108/pseudocode", kind: "ordered-substrings", text: "IF vowel THEN VowelCount update ENDIF NEXT Index OUTPUT VowelCount", required: ["IF", "VowelCount", "ENDIF", "NEXT Index", "OUTPUT VowelCount"], description: "Vowel decision closes before loop advances" },
  { id: "CALC-028-NESTED-OUTPUT", key: "109/pseudocode", kind: "required-substrings", text: "Product <- Row * Column OUTPUT Product int product = row * column; System.out.println(product);", required: ["OUTPUT Product", "System.out.println(product)"], description: "Both nested-loop forms output each product" },
  { id: "CALC-029-EFFICIENCY-ENDIF", key: "110/pseudocode", kind: "ordered-substrings", text: "IF List[Index] = Target THEN Found <- TRUE ENDIF NEXT Index", required: ["IF List[Index]", "Found <- TRUE", "ENDIF", "NEXT Index"], description: "Search selection is closed" },
  { id: "CALC-030-JAVA-TRANSLATION-ENDIF", key: "111/java", kind: "ordered-substrings", text: "FOR Index IF Marks[Index] >= 50 THEN PassCount update ENDIF NEXT Index", required: ["FOR Index", "IF Marks[Index]", "ENDIF", "NEXT Index"], description: "Translated pseudocode closes IF before NEXT" },
  { id: "CALC-031-DESIGN-ENDIF", key: "112/pseudocode", kind: "ordered-substrings", text: "INPUT Mark IF Mark >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["INPUT Mark", "IF Mark", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Designed loop contains complete input, decision and output" },
  { id: "CALC-032-TYPE-EXAMPLES", key: "114/why-types", kind: "balanced-keywords", text: "IF IsValid THEN OUTPUT ENDIF IF BirthDate > Today THEN OUTPUT ENDIF", pairs: [["IF", "ENDIF"]], description: "Both data-type IF examples are closed" },
  { id: "CALC-033-2D-OUTPUT", key: "117/pseudocode", kind: "required-substrings", text: "OUTPUT Marks[Row, Column] System.out.println(marks[row][column]);", required: ["OUTPUT Marks[Row, Column]", "System.out.println", "marks[row][column]"], description: "Both two-dimensional traversals output the current cell" },
  { id: "CALC-034-COUNT-CLOSED", key: "118/count", kind: "ordered-substrings", text: "FOR Index IF Scores[Index] >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["FOR Index", "IF Scores[Index]", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Count selection closes before the loop advances and reports the result" },
  { id: "CALC-035-COUNT-EQUIVALENCE", key: "118/pseudocode", kind: "required-substrings", text: "ENDIF OUTPUT PassCount } System.out.println(passCount);", required: ["ENDIF", "OUTPUT PassCount", "System.out.println(passCount)"], description: "Both counting forms close the decision and output the final count" },
  { id: "CALC-036-SEARCH-CLOSED", key: "118/search", kind: "ordered-substrings", text: "IF Names[Index] = TargetName THEN Found <- TRUE ENDIF NEXT Index OUTPUT Found", required: ["IF Names[Index]", "Found <- TRUE", "ENDIF", "NEXT Index", "OUTPUT Found"], description: "Search decision closes before the loop advances" },
  { id: "CALC-037-ALTERNATIVE-OPERATIONS", key: "120/operations", kind: "required-substrings", text: "SEARCH COUNT UPDATE Search OR count OR update operation choices not mandatory consecutive pipeline stages", required: ["SEARCH", "COUNT", "UPDATE", "OR", "not mandatory consecutive"], description: "Record search, count and update are presented as alternatives" },
  { id: "CALC-038-RECORD-TRAVERSAL", key: "120/traversal", kind: "ordered-substrings", text: "FOR Index IF Students[Index].Mark >= 70 THEN OUTPUT Students[Index].Name ENDIF NEXT Index", required: ["FOR Index", "IF Students[Index].Mark", "OUTPUT Students[Index].Name", "ENDIF", "NEXT Index"], description: "Record field selection closes before traversal advances" },
  { id: "CALC-039-EOF-ORDER", key: "121/reader", kind: "ordered-substrings", text: "OPENFILE WHILE NOT EOF READFILE OUTPUT ENDWHILE CLOSEFILE", required: ["WHILE NOT EOF", "READFILE", "OUTPUT", "ENDWHILE", "CLOSEFILE"], description: "EOF is checked before each file read" },
  { id: "CALC-040-CSV-CONVERSION", key: "122/types", kind: "required-substrings", text: "IF Fields[3] > text THEN OUTPUT ENDIF Mark <- STRING_TO_INTEGER(Fields[3]) IF Mark > 70 THEN OUTPUT ENDIF", required: ["STRING_TO_INTEGER(Fields[3])", "IF Mark > 70", "ENDIF"], description: "CSV text is converted before numeric comparison and both examples close" },
  { id: "CALC-041-THREE-CONSTRUCTS", key: "127/constructs", kind: "required-substrings", text: "SEQUENCE SELECTION ITERATION", required: ["SEQUENCE", "SELECTION", "ITERATION"], description: "The construct summary includes sequence, selection and iteration" },
  { id: "CALC-042-LOOP-FORMS", key: "127/iteration", kind: "required-substrings", text: "FOR NEXT WHILE ENDWHILE REPEAT UNTIL may run zero times runs at least once", required: ["FOR", "NEXT", "WHILE", "ENDWHILE", "REPEAT", "UNTIL", "zero times", "at least once"], description: "All three loop forms state their check behavior" },
  { id: "CALC-043-JAVA-SELECTION", key: "127/java", kind: "balanced-keywords", text: "IF Mark >= 50 THEN OUTPUT ELSE OUTPUT ENDIF", pairs: [["IF", "ENDIF"]], description: "The Cambridge selection corresponding to Java is closed" },
  { id: "CALC-044-SELECTION-CLOSURES", key: "127/selection", kind: "balanced-keywords", text: "IF THEN ELSE ENDIF CASE OF OTHERWISE ENDCASE", pairs: [["IF", "ENDIF"], ["CASE", "ENDCASE"]], description: "IF and CASE examples use their matching closing keywords" },
  { id: "CALC-045-CASE-CLOSED", key: "128/case", kind: "balanced-keywords", text: "CASE Choice OF OTHERWISE ENDCASE", pairs: [["CASE", "ENDCASE"]], description: "The discrete-choice CASE structure is closed" },
  { id: "CALC-046-CASE-JAVA-CLOSED", key: "128/java", kind: "balanced-keywords", text: "CASE Choice OF OTHERWISE ENDCASE", pairs: [["CASE", "ENDCASE"]], description: "The CASE side of the Java comparison is closed" },
  { id: "CALC-047-ONE-INPUT-PER-ATTEMPT", key: "130/repeat", kind: "occurrence-count", text: "REPEAT INPUT Mark UNTIL Mark >= 0 AND Mark <= 100", fragment: "INPUT Mark", expectedCount: 1, description: "Post-condition validation reads exactly once per pictured iteration" },
  { id: "CALC-048-FUNCTION-SELECTIONS", key: "131/parameters", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION IF ENDIF", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"]], description: "Function and caller selections have matching closures" },
  { id: "CALC-049-SHADOWING-DECLARATIONS", key: "133/shadowing", kind: "occurrence-count", text: "DECLARE Score : INTEGER PROCEDURE ChangeScore DECLARE Score : INTEGER ENDPROCEDURE", fragment: "DECLARE Score", expectedCount: 2, description: "Shadowing example declares distinct global and local variables" },
  { id: "CALC-050-CASE-NORMALISATION", key: "134/case", kind: "ordered-substrings", text: "INPUT Answer Answer <- UCASE(Answer) IF Answer = Y THEN OUTPUT Continue ENDIF", required: ["INPUT Answer", "UCASE(Answer)", "IF Answer", "OUTPUT", "ENDIF"], description: "Letter case is normalised before a closed comparison" },
  { id: "CALC-051-INTEGRATED-VALIDATION", key: "140/integration", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION IF ELSE ENDIF", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"]], description: "Validation function and caller both have complete selection structure" },
  { id: "CALC-052-MODULE-ROLES", key: "140/parameters", kind: "required-substrings", text: "FUNCTION GetValidMark RETURNS INTEGER FUNCTION CalculateGrade RETURNS CHAR PROCEDURE DisplayResult ENDPROCEDURE returns no value", required: ["RETURNS INTEGER", "RETURNS CHAR", "PROCEDURE DisplayResult", "returns no value"], description: "Functions return values while the display procedure performs output" },
  { id: "CALC-053-POST-CONDITION-LOOP", key: "141/loops", kind: "ordered-substrings", text: "POST-CONDITION REPEAT INPUT Value UNTIL Value >= 0", required: ["POST-CONDITION", "REPEAT", "INPUT Value", "UNTIL Value >= 0"], description: "Post-condition loop uses Cambridge REPEAT...UNTIL order" },
  { id: "CALC-054-REVIEW-FRAGMENT", key: "142/fragment", kind: "ordered-substrings", text: "FOR Index INPUT Marks[Index] IF Marks[Index] >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["INPUT Marks[Index]", "IF Marks[Index]", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Complete review fragment inputs, selects, advances and outputs in order" },
  { id: "CALC-055-REVIEW-JAVA", key: "142/java", kind: "balanced-keywords", text: "IF Marks[Index] >= 50 THEN PassCount update ENDIF", pairs: [["IF", "ENDIF"]], description: "Review pseudocode closes the selection shown beside Java" },
  { id: "CALC-056-SUBROUTINE-CLOSURES", key: "142/subroutines", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION PROCEDURE ENDPROCEDURE", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"], ["PROCEDURE", "ENDPROCEDURE"]], description: "Function, nested selection and procedure each close correctly" },
  { id: "CALC-057-NESTED-DECISIONS", key: "145/algorithms", kind: "balanced-keywords", text: "IF same room IF overlap ENDIF ENDIF", pairs: [["IF", "ENDIF"]], description: "Both nested booking-clash decisions are closed" },
  { id: "CALC-058-REVIEW-SELECTIONS", key: "149/selection", kind: "balanced-keywords", text: "IF ELSE ENDIF CASE OF OTHERWISE ENDCASE", pairs: [["IF", "ENDIF"], ["CASE", "ENDCASE"]], description: "Review IF and CASE examples have explicit rejoin points" },
  { id: "CALC-059-REVIEW-SUBPROGRAMS", key: "149/subprograms", kind: "balanced-keywords", text: "PROCEDURE ENDPROCEDURE FUNCTION IF ENDIF ENDFUNCTION", pairs: [["PROCEDURE", "ENDPROCEDURE"], ["FUNCTION", "ENDFUNCTION"], ["IF", "ENDIF"]], description: "Procedure, function and nested validation selection all close" },
  { id: "CALC-060-LAYERED-ENCAPSULATION", key: "021/address-journey", kind: "ordered-substrings", text: "FRAME Destination MAC IP PACKET Destination IP", required: ["FRAME", "Destination MAC", "IP PACKET", "Destination IP"], description: "The local-link frame contains the destination MAC outside the IP packet destination" },
  { id: "CALC-061-IP-MAC-TOGETHER", key: "021/addresses", kind: "required-substrings", text: "Same local network IP packet destination host IP Frame destination host MAC Different network remote host IP next-hop router MAC", required: ["destination host IP", "destination host MAC", "remote host IP", "next-hop router MAC"], description: "Local and routed delivery both use IP and MAC addresses at different scopes" },
  { id: "CALC-062-SIX-GATES", key: "036/gates", kind: "required-substrings", text: "NOT AND OR NAND NOR XOR", required: ["NOT", "AND", "OR", "NAND", "NOR", "XOR"], description: "The six-gate summary names every required gate" },
  { id: "CALC-063-FETCH-UPDATES", key: "043/cycle-visual", kind: "required-substrings", text: "PC address MAR memory instruction MDR MDR instruction CIR PC PC + 1 Only MDR feeds CIR", required: ["PC", "MAR", "MDR", "CIR", "PC + 1", "Only MDR feeds CIR"], description: "MDR-to-CIR transfer is distinct from the PC self-increment" },
  { id: "CALC-064-FIVE-ADDRESSING-MODES", key: "048/modes", kind: "required-substrings", text: "IMMEDIATE DIRECT INDIRECT INDEXED RELATIVE LDR #n loads immediate n into IX not relative", required: ["IMMEDIATE", "DIRECT", "INDIRECT", "INDEXED", "RELATIVE", "LDR #n", "IX", "not relative"], description: "The five-mode comparison includes relative addressing and preserves the official immediate-to-IX meaning of LDR #n" },
  { id: "CALC-065-TRANSLATOR-TOOLCHAIN", key: "057/concept", kind: "ordered-substrings", text: "Object modules linker executable loader memory", required: ["Object modules", "linker", "executable", "loader", "memory"], description: "Object modules are linked and the executable is loaded rather than generically retranslated" },
  { id: "CALC-066-SQL-WRITTEN-ORDER", key: "090/sql", kind: "ordered-substrings", text: "SELECT fields FROM table WHERE condition GROUP BY field ORDER BY field", required: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY"], description: "SQL written syntax places GROUP BY before ORDER BY" },
  { id: "CALC-067-SQL-LOGICAL-ORDER", key: "090/sql", kind: "ordered-substrings", text: "FROM WHERE GROUP BY SELECT ORDER BY", required: ["FROM", "WHERE", "GROUP BY", "SELECT", "ORDER BY"], description: "Simplified logical processing places sorting last" },
  { id: "CALC-068-SQL-CLAUSE-CHOICES", key: "094/sql", kind: "required-substrings", text: "SELECT OR WHERE GROUP BY OR ORDER BY not mandatory consecutive stages", required: ["SELECT", "WHERE", "GROUP BY", "ORDER BY", "not mandatory consecutive"], description: "SQL clauses are choices rather than a mandatory pipeline" },
  { id: "CALC-069-PAPER1-TIMING", key: "096/timing", kind: "proportional-timing", pairs: [[1, 1], [3, 3], [4, 4], [6, 6]], description: "One-minute-per-mark practice timings use one consistent ratio" },
  { id: "CALC-070-MAXIMUM-LENGTH", key: "104/checks", kind: "required-substrings", text: "LENGTH(Postcode) <= 8 no more than the maximum number of characters does not require exactly eight", required: ["<= 8", "maximum", "does not require exactly eight"], description: "The postcode example is described as a maximum-length check" },
  { id: "CALC-071-NESTING-RULE", key: "109/model", kind: "required-substrings", text: "outer changes less often inner completes its full traversal range size does not decide", required: ["changes less often", "full traversal", "range size does not decide"], description: "Loop nesting is based on traversal grouping rather than range width" },
  { id: "CALC-072-CLEARER-NAMES", key: "111/conversion", kind: "ordered-substrings", text: "m -> Mark i -> Index pc -> PassCount", required: ["m", "Mark", "i", "Index", "pc", "PassCount"], description: "Arrows run from abbreviated names to clearer names" },
  { id: "CALC-073-PAPER2-TIMING", key: "150/timing", kind: "proportional-timing", pairs: [[2, 2], [3, 3], [5, 5], [10, 10]], description: "Timed pseudocode practice uses one consistent mark-to-minute ratio" },
  { id: "CALC-074-INSTRUCTION-GROUPS", key: "047/assembler", kind: "instruction-groups", groups: technicalVisualContract["047/assembler"].groups, otherOpcodes: technicalVisualContract["047/assembler"].otherOpcodes, description: "All five official instruction groups and every specified opcode are present" },
  { id: "CALC-075-BINARY-SHIFTS", key: "051/shifts", kind: "fixed-width-shifts", width: technicalVisualContract["051/shifts"].width, input: technicalVisualContract["051/shifts"].input, examples: technicalVisualContract["051/shifts"].examples, description: "All six shift examples preserve eight bits and recompute to the stated results and overflow contexts" },
  { id: "CALC-076-VECTOR-DRAWING-LIST", key: "010/drawing-list", kind: "required-substrings", text: "drawing list drawing objects type coordinates dimensions line colour fill colour line thickness redraw without pixelation", required: ["drawing list", "drawing objects", "type", "coordinates", "dimensions", "line colour", "fill colour", "line thickness", "redraw", "without pixelation"], description: "The dedicated Vector visual preserves the drawing-list, object-property and resolution-independent redraw model" },
]);

export function evaluateSemanticCalculation(check) {
  switch (check.kind) {
    case "equality":
      return check.observed === check.expected;
    case "binary-to-decimal":
      return Number.parseInt(check.bits, 2) === check.observed;
    case "binary-to-hex":
      return Number.parseInt(check.bits, 2).toString(16).toUpperCase() === check.observed;
    case "unsigned-add": {
      const total = Number.parseInt(check.left, 2) + Number.parseInt(check.right, 2);
      return total.toString(2) === check.observedFull && fixedBinary(total, check.width) === check.observedStored;
    }
    case "sign-magnitude": {
      const positive = fixedBinary(check.magnitude, check.width);
      const negative = `1${positive.slice(1)}`;
      return check.observedPositive === positive && check.observedNegative === negative;
    }
    case "ones-complement": {
      const positive = fixedBinary(check.positive, check.width);
      return check.observedPositive === positive && check.observedNegative === invertBits(positive);
    }
    case "twos-complement": {
      const positive = fixedBinary(check.positive, check.width);
      const inverted = invertBits(positive);
      const negative = fixedBinary(Number.parseInt(inverted, 2) + 1, check.width);
      return check.observedPositive === positive && check.observedInverted === inverted && check.observedNegative === negative;
    }
    case "nearest-fraction": {
      const scale = 2 ** check.fractionalBits;
      return fixedBinary(Math.round(check.target * scale), check.fractionalBits) === check.observedBits;
    }
    case "product":
      return check.factors.reduce((result, value) => result * value, 1) === check.observed;
    case "quotient":
      return check.dividend / check.divisor === check.observed;
    case "power":
      return check.base ** check.exponent === check.observed;
    case "string-length":
      return [...check.value].length === check.observed;
    case "divmod":
      return Math.floor(check.dividend / check.divisor) === check.observedDiv
        && check.dividend % check.divisor === check.observedMod
        && check.dividend === check.observedDiv * check.divisor + check.observedMod;
    case "balanced-keywords":
      return check.pairs.every(([opening, closing]) => {
        const openCount = check.text.match(new RegExp(`\\b${opening}\\b`, "g"))?.length ?? 0;
        const closeCount = check.text.match(new RegExp(`\\b${closing}\\b`, "g"))?.length ?? 0;
        return openCount === closeCount;
      });
    case "required-substrings":
      return check.required.every((fragment) => check.text.includes(fragment));
    case "ordered-substrings": {
      let offset = 0;
      return check.required.every((fragment) => {
        const position = check.text.indexOf(fragment, offset);
        if (position === -1) return false;
        offset = position + fragment.length;
        return true;
      });
    }
    case "occurrence-count":
      return check.text.split(check.fragment).length - 1 === check.expectedCount;
    case "proportional-timing": {
      const ratios = check.pairs.map(([marks, minutes]) => minutes / marks);
      return ratios.every((ratio) => ratio === ratios[0]);
    }
    case "instruction-groups": {
      const expected = {
        "data movement": ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO"],
        "input/output": ["IN", "OUT"],
        arithmetic: ["ADD", "SUB", "INC", "DEC"],
        "unconditional/conditional": ["JMP", "JPE", "JPN"],
        compare: ["CMP", "CMI"],
      };
      const sameMembers = (left, right) => left.length === right.length
        && [...left].sort().join("|") === [...right].sort().join("|");
      return Object.keys(expected).length === Object.keys(check.groups).length
        && Object.entries(expected).every(([group, opcodes]) => sameMembers(check.groups[group] ?? [], opcodes))
        && sameMembers(check.otherOpcodes ?? [], ["END"]);
    }
    case "fixed-width-shifts": {
      const { input, width } = check;
      if (!new RegExp(`^[01]{${width}}$`).test(input)) return false;
      const left = `${input.slice(1)}0`;
      const logicalRight = `0${input.slice(0, -1)}`;
      const arithmeticRight = `${input[0]}${input.slice(0, -1)}`;
      const cyclicLeft = `${input.slice(1)}${input[0]}`;
      const cyclicRight = `${input.at(-1)}${input.slice(0, -1)}`;
      const expected = new Map([
        ["logical-left", { result: left, outgoing: input[0], fill: "0", overflowContext: "unsigned", overflow: Number.parseInt(input, 2) * 2 > 2 ** width - 1 }],
        ["logical-right", { result: logicalRight, outgoing: input.at(-1), fill: "0", overflowContext: null, overflow: null }],
        ["arithmetic-left", { result: left, outgoing: input[0], fill: "0", overflowContext: "signed", overflow: input[0] !== left[0] }],
        ["arithmetic-right", { result: arithmeticRight, outgoing: input.at(-1), fill: input[0], overflowContext: null, overflow: null }],
        ["cyclic-left", { result: cyclicLeft, outgoing: input[0], fill: input[0], overflowContext: null, overflow: null }],
        ["cyclic-right", { result: cyclicRight, outgoing: input.at(-1), fill: input.at(-1), overflowContext: null, overflow: null }],
      ]);
      if (check.examples.length !== expected.size) return false;
      return check.examples.every((example) => {
        const result = expected.get(example.name);
        return Boolean(result)
          && new RegExp(`^[01]{${width}}$`).test(example.result)
          && Object.entries(result).every(([field, value]) => example[field] === value);
      });
    }
    default:
      throw new Error(`Unknown semantic calculation kind: ${check.kind}`);
  }
}
