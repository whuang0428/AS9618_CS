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
