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
  { id: "CALC-010-BITMAP-BYTES", key: "008/formula", kind: "quotient", dividend: 64_000, divisor: 8, observed: 8_000, description: "64000 bits / 8 = 8000 bytes" },
  { id: "CALC-011-SOUND", key: "010/formula", kind: "product", factors: [8_000, 16, 10], observed: 1_280_000, description: "8000 Hz x 16 bits x 10 seconds = 1280000 bits" },
  { id: "CALC-012-SOUND-BYTES", key: "010/formula", kind: "quotient", dividend: 1_280_000, divisor: 8, observed: 160_000, description: "1280000 bits / 8 = 160000 bytes" },
  { id: "CALC-013-PACKET", key: "015/sprint", kind: "product", factors: [100, 50, 8], observed: 40_000, description: "100 packets x 50 bytes x 8 = 40000 bits" },
  { id: "CALC-014-TRANSMISSION", key: "025/calculation", kind: "quotient", dividend: 25 * 8, divisor: 10, observed: 20, description: "25 MB x 8 / 10 Mbps = 20 seconds" },
  { id: "CALC-015-ADDRESS-WIDTH", key: "044/width", kind: "power", base: 2, exponent: 16, observed: 65_536, description: "16 address bits select 65536 addresses" },
  { id: "CALC-016-LENGTH", key: "133/length", kind: "string-length", value: "ALGORITHM", observed: 9, description: "LENGTH('ALGORITHM') = 9" },
  { id: "CALC-017-DIVMOD", key: "134/relationship", kind: "divmod", dividend: 17, divisor: 5, observedDiv: 3, observedMod: 2, description: "17 DIV 5 = 3 and 17 MOD 5 = 2" },
  { id: "CALC-019-DECISION-ENDIF", key: "101/equivalence", kind: "balanced-keywords", text: "IF THEN ELSE ENDIF", pairs: [["IF", "ENDIF"]], description: "Flowchart decision maps to a closed IF selection" },
  { id: "CALC-020-JAVA-SUM", key: "102/pseudocode", kind: "required-substrings", text: "int number = input.nextInt(); total += number; System.out.println(total);", required: ["input.nextInt()", "total += number", "System.out.println(total)"], description: "Java support code inputs, accumulates and outputs" },
  { id: "CALC-021-COUNT-ENDIF", key: "100/pseudocode", kind: "ordered-substrings", text: "IF Mark >= 50 THEN PassCount <- PassCount + 1 ENDIF NEXT Count", required: ["IF Mark", "PassCount <- PassCount + 1", "ENDIF", "NEXT Count"], description: "ENDIF precedes NEXT Count" },
  { id: "CALC-022-REPEAT-ENDIF", key: "103/pseudocode", kind: "ordered-substrings", text: "REPEAT INPUT Mark IF invalid THEN OUTPUT warning ENDIF UNTIL valid", required: ["REPEAT", "INPUT Mark", "IF", "ENDIF", "UNTIL"], description: "Cambridge validation has REPEAT, ENDIF and UNTIL in order" },
  { id: "CALC-023-JAVA-DO-WHILE", key: "103/pseudocode", kind: "ordered-substrings", text: "do { input if warning } while (invalid);", required: ["do {", "input", "if", "} while"], description: "Java support loop includes opening do block" },
  { id: "CALC-024-SEARCH-ENDIF", key: "104/pseudocode", kind: "ordered-substrings", text: "WHILE IF match THEN Found <- TRUE ENDIF Index <- Index + 1 ENDWHILE", required: ["WHILE", "IF", "ENDIF", "Index <- Index + 1", "ENDWHILE"], description: "Search decision closes before index update" },
  { id: "CALC-025-TOTAL-COUNT-ENDIF", key: "106/pseudocode", kind: "ordered-substrings", text: "Total update IF pass THEN PassCount update ENDIF NEXT Index", required: ["Total", "IF", "PassCount", "ENDIF", "NEXT Index"], description: "Pass selection closes inside the total loop" },
  { id: "CALC-026-VOWEL-ENDIF", key: "107/pseudocode", kind: "ordered-substrings", text: "IF vowel THEN VowelCount update ENDIF NEXT Index OUTPUT VowelCount", required: ["IF", "VowelCount", "ENDIF", "NEXT Index", "OUTPUT VowelCount"], description: "Vowel decision closes before loop advances" },
  { id: "CALC-027-NESTED-OUTPUT", key: "108/pseudocode", kind: "required-substrings", text: "Product <- Row * Column OUTPUT Product int product = row * column; System.out.println(product);", required: ["OUTPUT Product", "System.out.println(product)"], description: "Both nested-loop forms output each product" },
  { id: "CALC-028-EFFICIENCY-ENDIF", key: "109/pseudocode", kind: "ordered-substrings", text: "IF List[Index] = Target THEN Found <- TRUE ENDIF NEXT Index", required: ["IF List[Index]", "Found <- TRUE", "ENDIF", "NEXT Index"], description: "Search selection is closed" },
  { id: "CALC-029-JAVA-TRANSLATION-ENDIF", key: "110/java", kind: "ordered-substrings", text: "FOR Index IF Marks[Index] >= 50 THEN PassCount update ENDIF NEXT Index", required: ["FOR Index", "IF Marks[Index]", "ENDIF", "NEXT Index"], description: "Translated pseudocode closes IF before NEXT" },
  { id: "CALC-030-DESIGN-ENDIF", key: "111/pseudocode", kind: "ordered-substrings", text: "INPUT Mark IF Mark >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["INPUT Mark", "IF Mark", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Designed loop contains complete input, decision and output" },
  { id: "CALC-031-TYPE-EXAMPLES", key: "113/why-types", kind: "balanced-keywords", text: "IF IsValid THEN OUTPUT ENDIF IF BirthDate > Today THEN OUTPUT ENDIF", pairs: [["IF", "ENDIF"]], description: "Both data-type IF examples are closed" },
  { id: "CALC-032-2D-OUTPUT", key: "116/pseudocode", kind: "required-substrings", text: "OUTPUT Marks[Row, Column] System.out.println(marks[row][column]);", required: ["OUTPUT Marks[Row, Column]", "System.out.println", "marks[row][column]"], description: "Both two-dimensional traversals output the current cell" },
  { id: "CALC-033-COUNT-CLOSED", key: "117/count", kind: "ordered-substrings", text: "FOR Index IF Scores[Index] >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["FOR Index", "IF Scores[Index]", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Count selection closes before the loop advances and reports the result" },
  { id: "CALC-034-COUNT-EQUIVALENCE", key: "117/pseudocode", kind: "required-substrings", text: "ENDIF OUTPUT PassCount } System.out.println(passCount);", required: ["ENDIF", "OUTPUT PassCount", "System.out.println(passCount)"], description: "Both counting forms close the decision and output the final count" },
  { id: "CALC-035-SEARCH-CLOSED", key: "117/search", kind: "ordered-substrings", text: "IF Names[Index] = TargetName THEN Found <- TRUE ENDIF NEXT Index OUTPUT Found", required: ["IF Names[Index]", "Found <- TRUE", "ENDIF", "NEXT Index", "OUTPUT Found"], description: "Search decision closes before the loop advances" },
  { id: "CALC-036-ALTERNATIVE-OPERATIONS", key: "119/operations", kind: "required-substrings", text: "SEARCH COUNT UPDATE Search OR count OR update operation choices not mandatory consecutive pipeline stages", required: ["SEARCH", "COUNT", "UPDATE", "OR", "not mandatory consecutive"], description: "Record search, count and update are presented as alternatives" },
  { id: "CALC-037-RECORD-TRAVERSAL", key: "119/traversal", kind: "ordered-substrings", text: "FOR Index IF Students[Index].Mark >= 70 THEN OUTPUT Students[Index].Name ENDIF NEXT Index", required: ["FOR Index", "IF Students[Index].Mark", "OUTPUT Students[Index].Name", "ENDIF", "NEXT Index"], description: "Record field selection closes before traversal advances" },
  { id: "CALC-038-EOF-ORDER", key: "120/reader", kind: "ordered-substrings", text: "OPENFILE WHILE NOT EOF READFILE OUTPUT ENDWHILE CLOSEFILE", required: ["WHILE NOT EOF", "READFILE", "OUTPUT", "ENDWHILE", "CLOSEFILE"], description: "EOF is checked before each file read" },
  { id: "CALC-039-CSV-CONVERSION", key: "121/types", kind: "required-substrings", text: "IF Fields[3] > text THEN OUTPUT ENDIF Mark <- STRING_TO_INTEGER(Fields[3]) IF Mark > 70 THEN OUTPUT ENDIF", required: ["STRING_TO_INTEGER(Fields[3])", "IF Mark > 70", "ENDIF"], description: "CSV text is converted before numeric comparison and both examples close" },
  { id: "CALC-040-THREE-CONSTRUCTS", key: "126/constructs", kind: "required-substrings", text: "SEQUENCE SELECTION ITERATION", required: ["SEQUENCE", "SELECTION", "ITERATION"], description: "The construct summary includes sequence, selection and iteration" },
  { id: "CALC-041-LOOP-FORMS", key: "126/iteration", kind: "required-substrings", text: "FOR NEXT WHILE ENDWHILE REPEAT UNTIL may run zero times runs at least once", required: ["FOR", "NEXT", "WHILE", "ENDWHILE", "REPEAT", "UNTIL", "zero times", "at least once"], description: "All three loop forms state their check behavior" },
  { id: "CALC-042-JAVA-SELECTION", key: "126/java", kind: "balanced-keywords", text: "IF Mark >= 50 THEN OUTPUT ELSE OUTPUT ENDIF", pairs: [["IF", "ENDIF"]], description: "The Cambridge selection corresponding to Java is closed" },
  { id: "CALC-043-SELECTION-CLOSURES", key: "126/selection", kind: "balanced-keywords", text: "IF THEN ELSE ENDIF CASE OF OTHERWISE ENDCASE", pairs: [["IF", "ENDIF"], ["CASE", "ENDCASE"]], description: "IF and CASE examples use their matching closing keywords" },
  { id: "CALC-044-CASE-CLOSED", key: "127/case", kind: "balanced-keywords", text: "CASE Choice OF OTHERWISE ENDCASE", pairs: [["CASE", "ENDCASE"]], description: "The discrete-choice CASE structure is closed" },
  { id: "CALC-045-CASE-JAVA-CLOSED", key: "127/java", kind: "balanced-keywords", text: "CASE Choice OF OTHERWISE ENDCASE", pairs: [["CASE", "ENDCASE"]], description: "The CASE side of the Java comparison is closed" },
  { id: "CALC-046-ONE-INPUT-PER-ATTEMPT", key: "129/repeat", kind: "occurrence-count", text: "REPEAT INPUT Mark UNTIL Mark >= 0 AND Mark <= 100", fragment: "INPUT Mark", expectedCount: 1, description: "Post-condition validation reads exactly once per pictured iteration" },
  { id: "CALC-047-FUNCTION-SELECTIONS", key: "130/parameters", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION IF ENDIF", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"]], description: "Function and caller selections have matching closures" },
  { id: "CALC-048-SHADOWING-DECLARATIONS", key: "132/shadowing", kind: "occurrence-count", text: "DECLARE Score : INTEGER PROCEDURE ChangeScore DECLARE Score : INTEGER ENDPROCEDURE", fragment: "DECLARE Score", expectedCount: 2, description: "Shadowing example declares distinct global and local variables" },
  { id: "CALC-049-CASE-NORMALISATION", key: "133/case", kind: "ordered-substrings", text: "INPUT Answer Answer <- UCASE(Answer) IF Answer = Y THEN OUTPUT Continue ENDIF", required: ["INPUT Answer", "UCASE(Answer)", "IF Answer", "OUTPUT", "ENDIF"], description: "Letter case is normalised before a closed comparison" },
  { id: "CALC-050-INTEGRATED-VALIDATION", key: "139/integration", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION IF ELSE ENDIF", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"]], description: "Validation function and caller both have complete selection structure" },
  { id: "CALC-051-MODULE-ROLES", key: "139/parameters", kind: "required-substrings", text: "FUNCTION GetValidMark RETURNS INTEGER FUNCTION CalculateGrade RETURNS CHAR PROCEDURE DisplayResult ENDPROCEDURE returns no value", required: ["RETURNS INTEGER", "RETURNS CHAR", "PROCEDURE DisplayResult", "returns no value"], description: "Functions return values while the display procedure performs output" },
  { id: "CALC-052-POST-CONDITION-LOOP", key: "140/loops", kind: "ordered-substrings", text: "POST-CONDITION REPEAT INPUT Value UNTIL Value >= 0", required: ["POST-CONDITION", "REPEAT", "INPUT Value", "UNTIL Value >= 0"], description: "Post-condition loop uses Cambridge REPEAT...UNTIL order" },
  { id: "CALC-053-REVIEW-FRAGMENT", key: "141/fragment", kind: "ordered-substrings", text: "FOR Index INPUT Marks[Index] IF Marks[Index] >= 50 THEN PassCount update ENDIF NEXT Index OUTPUT PassCount", required: ["INPUT Marks[Index]", "IF Marks[Index]", "ENDIF", "NEXT Index", "OUTPUT PassCount"], description: "Complete review fragment inputs, selects, advances and outputs in order" },
  { id: "CALC-054-REVIEW-JAVA", key: "141/java", kind: "balanced-keywords", text: "IF Marks[Index] >= 50 THEN PassCount update ENDIF", pairs: [["IF", "ENDIF"]], description: "Review pseudocode closes the selection shown beside Java" },
  { id: "CALC-055-SUBROUTINE-CLOSURES", key: "141/subroutines", kind: "balanced-keywords", text: "FUNCTION IF ENDIF ENDFUNCTION PROCEDURE ENDPROCEDURE", pairs: [["IF", "ENDIF"], ["FUNCTION", "ENDFUNCTION"], ["PROCEDURE", "ENDPROCEDURE"]], description: "Function, nested selection and procedure each close correctly" },
  { id: "CALC-056-NESTED-DECISIONS", key: "144/algorithms", kind: "balanced-keywords", text: "IF same room IF overlap ENDIF ENDIF", pairs: [["IF", "ENDIF"]], description: "Both nested booking-clash decisions are closed" },
  { id: "CALC-057-REVIEW-SELECTIONS", key: "148/selection", kind: "balanced-keywords", text: "IF ELSE ENDIF CASE OF OTHERWISE ENDCASE", pairs: [["IF", "ENDIF"], ["CASE", "ENDCASE"]], description: "Review IF and CASE examples have explicit rejoin points" },
  { id: "CALC-058-REVIEW-SUBPROGRAMS", key: "148/subprograms", kind: "balanced-keywords", text: "PROCEDURE ENDPROCEDURE FUNCTION IF ENDIF ENDFUNCTION", pairs: [["PROCEDURE", "ENDPROCEDURE"], ["FUNCTION", "ENDFUNCTION"], ["IF", "ENDIF"]], description: "Procedure, function and nested validation selection all close" },
  { id: "CALC-059-LAYERED-ENCAPSULATION", key: "020/address-journey", kind: "ordered-substrings", text: "FRAME Destination MAC IP PACKET Destination IP", required: ["FRAME", "Destination MAC", "IP PACKET", "Destination IP"], description: "The local-link frame contains the destination MAC outside the IP packet destination" },
  { id: "CALC-060-IP-MAC-TOGETHER", key: "020/addresses", kind: "required-substrings", text: "Same local network IP packet destination host IP Frame destination host MAC Different network remote host IP next-hop router MAC", required: ["destination host IP", "destination host MAC", "remote host IP", "next-hop router MAC"], description: "Local and routed delivery both use IP and MAC addresses at different scopes" },
  { id: "CALC-061-SIX-GATES", key: "035/gates", kind: "required-substrings", text: "NOT AND OR NAND NOR XOR", required: ["NOT", "AND", "OR", "NAND", "NOR", "XOR"], description: "The six-gate summary names every required gate" },
  { id: "CALC-062-FETCH-UPDATES", key: "042/cycle-visual", kind: "required-substrings", text: "PC address MAR memory instruction MDR MDR instruction CIR PC PC + 1 Only MDR feeds CIR", required: ["PC", "MAR", "MDR", "CIR", "PC + 1", "Only MDR feeds CIR"], description: "MDR-to-CIR transfer is distinct from the PC self-increment" },
  { id: "CALC-063-FOUR-ADDRESSING-MODES", key: "047/modes", kind: "required-substrings", text: "IMMEDIATE DIRECT INDIRECT INDEXED", required: ["IMMEDIATE", "DIRECT", "INDIRECT", "INDEXED"], description: "The four-mode comparison includes immediate, direct, indirect and indexed" },
  { id: "CALC-064-TRANSLATOR-TOOLCHAIN", key: "056/concept", kind: "ordered-substrings", text: "Object modules linker executable loader memory", required: ["Object modules", "linker", "executable", "loader", "memory"], description: "Object modules are linked and the executable is loaded rather than generically retranslated" },
  { id: "CALC-065-SQL-WRITTEN-ORDER", key: "089/sql", kind: "ordered-substrings", text: "SELECT fields FROM table WHERE condition GROUP BY field ORDER BY field", required: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY"], description: "SQL written syntax places GROUP BY before ORDER BY" },
  { id: "CALC-066-SQL-LOGICAL-ORDER", key: "089/sql", kind: "ordered-substrings", text: "FROM WHERE GROUP BY SELECT ORDER BY", required: ["FROM", "WHERE", "GROUP BY", "SELECT", "ORDER BY"], description: "Simplified logical processing places sorting last" },
  { id: "CALC-067-SQL-CLAUSE-CHOICES", key: "093/sql", kind: "required-substrings", text: "SELECT OR WHERE GROUP BY OR ORDER BY not mandatory consecutive stages", required: ["SELECT", "WHERE", "GROUP BY", "ORDER BY", "not mandatory consecutive"], description: "SQL clauses are choices rather than a mandatory pipeline" },
  { id: "CALC-068-PAPER1-TIMING", key: "095/timing", kind: "proportional-timing", pairs: [[1, 1], [3, 3], [4, 4], [6, 6]], description: "One-minute-per-mark practice timings use one consistent ratio" },
  { id: "CALC-069-MAXIMUM-LENGTH", key: "103/checks", kind: "required-substrings", text: "LENGTH(Postcode) <= 8 no more than the maximum number of characters does not require exactly eight", required: ["<= 8", "maximum", "does not require exactly eight"], description: "The postcode example is described as a maximum-length check" },
  { id: "CALC-070-NESTING-RULE", key: "108/model", kind: "required-substrings", text: "outer changes less often inner completes its full traversal range size does not decide", required: ["changes less often", "full traversal", "range size does not decide"], description: "Loop nesting is based on traversal grouping rather than range width" },
  { id: "CALC-071-CLEARER-NAMES", key: "110/conversion", kind: "ordered-substrings", text: "m -> Mark i -> Index pc -> PassCount", required: ["m", "Mark", "i", "Index", "pc", "PassCount"], description: "Arrows run from abbreviated names to clearer names" },
  { id: "CALC-072-PAPER2-TIMING", key: "149/timing", kind: "proportional-timing", pairs: [[2, 2], [3, 3], [5, 5], [10, 10]], description: "Timed pseudocode practice uses one consistent mark-to-minute ratio" },
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
    default:
      throw new Error(`Unknown semantic calculation kind: ${check.kind}`);
  }
}
