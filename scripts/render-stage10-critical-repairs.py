#!/usr/bin/env python3
"""Render deterministic replacements for the Stage 10 priority repair batch."""

from __future__ import annotations

import argparse
import csv
import json
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "web/assets/diagrams/stage10-infographics"
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplement/Arial Bold.ttf"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"

NAVY = "#10233F"
BLUE = "#1F5AA6"
GREEN = "#2F7D4A"
ORANGE = "#D96A16"
INK = "#172033"
MUTED = "#516174"
LINE = "#CBD7E6"
PAPER = "#F8FAFC"
WHITE = "#FFFFFF"
PALE = ["#EEF5FD", "#EEF8F1", "#FFF4E8"]
ACCENT = [BLUE, GREEN, ORANGE]

REPAIR_FACTS_PATH = ROOT / "scripts/stage10-visual-repair-facts.json"
TARGET_REGISTER_PATH = ROOT / "audits/stage10-explanation-target-register.csv"
TECHNICAL_VISUAL_CONTRACT_PATH = ROOT / "scripts/stage10-technical-visual-contract.json"
VISUAL_DELIVERY_MAP_PATH = ROOT / "scripts/remediation-v2-visual-delivery-map.json"


def font(size: int, bold: bool = False, mono: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_MONO if mono else FONT_BOLD if bold else FONT_REGULAR
    return ImageFont.truetype(path, size)


def wrapped_lines(draw: ImageDraw.ImageDraw, text: str, face: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        if not paragraph:
            lines.append("")
            continue
        words = paragraph.split(" ")
        current = ""
        for word in words:
            candidate = word if not current else f"{current} {word}"
            if draw.textlength(candidate, font=face) <= width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
    return lines


def draw_text_block(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, face: ImageFont.FreeTypeFont,
                    width: int, fill: str = INK, spacing: int = 10, bullet: bool = False) -> int:
    x, y = xy
    line_height = face.size + spacing
    paragraphs = text.split("\n")
    for paragraph in paragraphs:
        prefix = "• " if bullet and paragraph else ""
        lines = wrapped_lines(draw, prefix + paragraph, face, width)
        for line in lines:
            draw.text((x, y), line, font=face, fill=fill)
            y += line_height
        y += 5
    return y


def draw_code(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], code: str, size: int = 25) -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=16, fill="#F6F8FB", outline=LINE, width=2)
    lines = code.splitlines()
    while size > 15:
        candidate = font(size, mono=True)
        fits_width = all(draw.textlength(line, font=candidate) <= x2 - x1 - 44 for line in lines)
        fits_height = 20 + len(lines) * (size + 11) <= y2 - y1 - 12
        if fits_width and fits_height:
            break
        size -= 1
    face = font(size, mono=True)
    if any(draw.textlength(line, font=face) > x2 - x1 - 44 for line in lines):
        raise ValueError(f"Code line exceeds its card at minimum size: {max(lines, key=len)!r}")
    y = y1 + 20
    for line in lines:
        draw.text((x1 + 22, y), line, font=face, fill=INK)
        y += size + 11


def draw_card(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], index: int, heading: str,
              body: str = "", code: str | None = None, note: str = "", *, numbered: bool = True,
              heading_size: int = 30, body_size: int = 26, code_size: int = 25,
              note_size: int = 21) -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=22, fill=WHITE, outline=LINE, width=3)
    draw.rounded_rectangle((x1, y1, x2, y1 + 78), radius=22, fill=PALE[index], outline=PALE[index])
    draw.rectangle((x1, y1 + 56, x2, y1 + 78), fill=PALE[index])
    heading_x = x1 + 26
    if numbered:
        draw.ellipse((x1 + 20, y1 + 18, x1 + 66, y1 + 64), fill=ACCENT[index])
        number = str(index + 1)
        number_width = draw.textlength(number, font=font(26, bold=True))
        draw.text((x1 + 43 - number_width / 2, y1 + 25), number, font=font(26, bold=True), fill=WHITE)
        heading_x = x1 + 82
    draw.text((heading_x, y1 + 22), heading, font=font(heading_size, bold=True), fill=ACCENT[index])
    content_y = y1 + 104
    if body:
        content_y = draw_text_block(draw, (x1 + 26, content_y), body, font(body_size), x2 - x1 - 52, spacing=9)
    if code:
        draw_code(draw, (x1 + 22, content_y + 5, x2 - 22, y2 - (72 if note else 24)), code, size=code_size)
    if note:
        draw_text_block(draw, (x1 + 26, y2 - 58), note, font(note_size, bold=True), x2 - x1 - 52, fill=ACCENT[index], spacing=6)


SPECS = {
    "049/concept": {
        "title": "The official processor performance factors",
        "subtitle": "Use the complete syllabus list and explain each effect; do not substitute a different factor.",
        "headingSize": 25,
        "bodySize": 23,
        "noteSize": 18,
        "cards": [
            ("PROCESSOR TYPE + CORES", "Processor type affects architecture and the useful work completed for a workload. More cores can execute independent threads in parallel when software can divide the work.", None, "Factor 1: processor type and number of cores"),
            ("BUS WIDTH", "A wider data bus can transfer more bits in one transfer. The effect depends on the data path, memory system and workload; width alone does not guarantee faster execution.", None, "Factor 2: bus width"),
            ("CLOCK SPEED + CACHE", "Higher clock speed provides more cycles per second. Cache can reduce waiting for main memory when required data or instructions are found there.", None, "Factors 3 and 4: clock speed and cache memory"),
        ],
        "footer": "Official list: processor type and number of cores; bus width; clock speed; cache memory. No single factor guarantees faster performance.",
    },
    "004/method": {
        "title": "8-bit addition method",
        "subtitle": "Use the carry-out beyond the eighth bit to test unsigned overflow.",
        "cards": [
            ("COLUMN METHOD", "Align both 8-bit operands.\nStart at the rightmost column.\nAdd both bits and the carry-in.\nWrite the result bit; carry 1 left when the column total is 2 or 3.", None, "Show the carry row."),
            ("UNSIGNED CHECK", "After the leftmost column, inspect the carry-out.\nCarry-out = 1 means the true unsigned sum needs a ninth bit and is outside 0 to 255.\nStore only the rightmost 8 bits when required.", None, "Carry-out tests unsigned overflow."),
            ("RANGE CHECK", "Without a carry-out, the stored 8-bit result remains within 0 to 255.\nA leftmost result bit of 1 is not by itself evidence of unsigned overflow.", None, "Check the ninth carry, not the leftmost stored bit."),
        ],
        "footer": "Unsigned rule: a carry-out beyond the eighth bit means the true sum cannot fit in 8 bits.",
    },
    "033/embedded": {
        "title": "What is an embedded system?",
        "subtitle": "Define it by purpose and context, not only by physical size.",
        "cards": [
            ("DEDICATED PURPOSE", "Designed to perform a specific task or closely related set of tasks.", None, "Purpose is the defining feature."),
            ("BUILT INTO A DEVICE", "Forms part of a larger product, such as a washing machine, microwave oven or router.", None, "It is not a separate general-purpose computer."),
            ("DESIGN PRIORITIES", "Often uses a limited interface and task-specific resources. Low cost, low power and reliable repeated operation may matter.", None, "Link each priority to the device."),
        ],
        "footer": "Exam check: state the dedicated task and the larger device before adding a design characteristic.",
    },
    "098/concept": {
        "title": "An algorithm is a solution expressed as defined steps",
        "subtitle": "A precise algorithm plan answers four questions.",
        "cards": [
            ("INPUT", "What data is supplied? Name each required value and any stated type or range.", None, "Do not invent missing data."),
            ("PROCESS + OUTPUT", "What transformation is required? What exact result must be displayed, returned or stored?", None, "The process must produce the output."),
            ("CONSTRAINTS", "What limits, quantity requirements or assumptions affect the plan?", None, "Record the source requirement."),
        ],
        "footer": "Defined steps must be unambiguous; every requirement maps to an input, process, output, constraint or assumption.",
    },
    "098/model": {
        "title": "Use IPOC before choosing a representation",
        "subtitle": "Write the problem model in clear natural language first.",
        "cards": [
            ("INPUT", "List each value the algorithm needs. Record type and range when the problem supplies them.", None, "Inputs come from the requirements."),
            ("PROCESS", "State the required transformation in ordered natural-language steps.", None, "Use precise actions, not ‘process data’."),
            ("OUTPUT + CHECK", "State the exact result, then confirm every constraint and supported assumption is represented.", None, "Check completeness before notation."),
        ],
        "footer": "A representation is chosen later; the IPOC meaning must already be complete.",
    },
    "098/constraints": {
        "title": "Constraints change the algorithm plan",
        "subtitle": "Translate each stated limit into a specific design effect.",
        "cards": [
            ("RANGE", "Clue: Mark is from 0 to 100.\nDesign effect: check both limits before using the mark.", None, "Inclusive limits include 0 and 100."),
            ("QUANTITY", "Clue: exactly 10 readings are supplied.\nDesign effect: plan to process all 10 readings.", None, "Do not omit or invent readings."),
            ("CAPACITY", "Clue: at most 30 bookings are available.\nDesign effect: reject a request beyond remaining capacity.", None, "Capacity affects the decision."),
        ],
        "footer": "State the constraint and its consequence; do not list limits without using them in the plan.",
    },
    "099/decomposition": {
        "title": "Decomposition: split by responsibility",
        "subtitle": "Each sub-problem should perform one meaningful part of the whole task.",
        "cards": [
            ("RECEIVE", "Identify the required data and create a sub-problem responsible for obtaining it.", None, "Name the responsibility clearly."),
            ("CHECK + CALCULATE", "Separate rule checking from calculations when they have different inputs or reasons to change.", None, "Avoid one vague ‘ProcessData’ block."),
            ("PRODUCE RESULT", "Create the required output and confirm that all sub-problems connect into one complete solution.", None, "No requirement may be omitted."),
        ],
        "footer": "Program modules have distinct responsibilities, clear inputs, processing and outputs, and connect into one solution.",
    },
    "099/abstraction": {
        "title": "Abstraction: keep details that affect the result",
        "subtitle": "Relevant details change an input, rule, calculation, constraint or output.",
        "cards": [
            ("KEEP", "Keep values such as RequestedPlaces, PlacesLeft and TicketPrice when they affect the booking result.", None, "Explain the effect on the result."),
            ("IGNORE", "Ignore decoration such as poster colour or room style when it does not change the required result.", None, "Mentioned does not mean relevant."),
            ("CHECK", "Ask: if this detail is removed, can the required result still be produced correctly?", None, "Give a reason, not only a label."),
        ],
        "footer": "Abstraction is deliberate selection of relevant information, not vague simplification.",
    },
    "099/pattern": {
        "title": "From scenario to responsibility plan",
        "subtitle": "Use decomposition and abstraction before choosing implementation notation.",
        "cards": [
            ("READ + FILTER", "Underline the required output. Keep inputs, constraints and relationships that affect it; ignore decoration.", None, "State why each detail matters."),
            ("DECOMPOSE", "Create verb-based sub-problems with distinct responsibilities.", None, "Avoid Part1, Part2 and DoStuff."),
            ("CONNECT", "State each sub-problem’s input and output, then check that the parts collectively meet every requirement.", None, "Check for gaps and overlap."),
        ],
        "footer": "The result is a complete natural-language plan ready for a later representation lesson.",
    },
    "005/twos": {
        "title": "Two’s complement method",
        "subtitle": "The add-1 step is essential.",
        "cards": [
            ("WRITE +45", "Write the positive magnitude using exactly 8 bits.", "00101101", "Positive value = 45"),
            ("INVERT + ADD 1", "Invert every bit, then add 1.", "00101101\n↓ invert\n11010010\n+       1\n────────\n11010011", "Do not stop after inversion."),
            ("LABEL −45", "The 8-bit result 11010011 represents −45 in two’s complement.\nQuick decode when MSB = 1:\n211 − 256 = −45.", None, "State the representation."),
        ],
        "footer": "Positive to negative: write the fixed-width value → invert every bit → add 1.",
    },
    "005/systems": {
        "title": "Three ways to represent negative binary values",
        "subtitle": "Start from the same positive 8-bit value: +23 = 00010111.",
        "cards": [
            ("SIGN-AND-MAGNITUDE", "Keep the seven magnitude bits for 23 and change only the sign bit to 1.", "positive   00010111\nnegative   10010111", "Exactly 8 bits: sign + 7-bit magnitude"),
            ("ONE’S COMPLEMENT", "Invert every bit of the positive 8-bit value.", "positive   00010111\ninvert     11101000", "11101000 represents −23"),
            ("TWO’S COMPLEMENT", "Invert every bit, then add 1.", "positive   00010111\ninvert     11101000\n+                 1\n──────────────────\nresult     11101001", "11101001 represents −23"),
        ],
        "footer": "Negative binary: every input, intermediate state and result contains exactly 8 bits.",
    },
    "008/pixels": {
        "title": "Bitmap file header and pixel data",
        "subtitle": "A bitmap file contains a file header followed by the stored pixel data.",
        "cards": [
            ("FILE HEADER", "The file header stores metadata needed to interpret the bitmap, such as dimensions, colour depth, format and compression information. It is not an image pixel.", None, "Metadata describes the bitmap."),
            ("PIXEL DATA", "Pixel data stores the colour value for each pixel. Pixel-data size is width × height × colour depth.", None, "Calculate pixels separately from metadata."),
            ("QUESTION BOUNDARY", "When a question says to ignore the file header, do not add metadata bytes to the pixel-data calculation.", None, "Use only values the question supplies."),
        ],
        "footer": "File header = metadata; pixel data = stored colour values. Keep the two parts distinct.",
    },
    "034/sensors": {
        "title": "Required sensor types and applications",
        "subtitle": "Name the measurement, give a valid application, then link input to processor and actuator.",
        "headingSize": 25,
        "bodySize": 23,
        "noteSize": 18,
        "cards": [
            ("TEMPERATURE + PRESSURE", "A temperature sensor measures temperature, for example in greenhouse heating. A pressure sensor measures pressure, for example in industrial pipe safety.", None, "Two different measurements and applications."),
            ("INFRA-RED + SOUND", "An infra-red sensor detects infra-red radiation, for example in a beam alarm or remote-control receiver. A sound sensor detects sound level or sound waves, for example in a noise monitor.", None, "Do not replace these named sensors."),
            ("CONTROL LINK", "The sensor supplies input data. The processor applies the control rule. An actuator performs the physical output, such as a heater, valve, floodlight or alarm.", None, "Input → processing → output."),
        ],
        "footer": "Required applications must match temperature, pressure, infra-red or sound sensing.",
    },
    "069/checks": {
        "title": "The seven required validation checks",
        "subtitle": "Range, format, length, presence, existence, limit and check digit are distinct methods.",
        "headingSize": 24,
        "bodySize": 22,
        "noteSize": 18,
        "cards": [
            ("RANGE • FORMAT • LENGTH", "Range check: both lower and upper bounds.\nFormat check: required pattern.\nLength check: required number of characters.", None, "Test the stated rule exactly."),
            ("PRESENCE • EXISTENCE", "Presence check: required field is not blank.\nExistence check: value occurs in a specified stored lookup or file.", None, "Present is not the same as stored and valid."),
            ("LIMIT • CHECK DIGIT", "Limit check: one stated upper or lower limit.\nCheck digit: calculated from other digits and compared to detect entry or scanning errors.", None, "Validation does not prove truth."),
        ],
        "footer": "Range check • Format check • Length check • Presence check • Existence check • Limit check • Check digit.",
    },
    "005/range": {
        "title": "8-bit signed ranges and zero",
        "subtitle": "The three representations do not share the same internal model.",
        "cards": [
            ("SIGN-AND-MAGNITUDE", "The leftmost bit is a separate sign. The remaining seven bits store magnitude.\nRange: −127 to +127\nTwo zero patterns: 00000000 and 10000000", None, "Only this system has a sign + magnitude split."),
            ("ONE’S COMPLEMENT", "A negative value is formed by inverting all eight bits of the positive value.\nRange: −127 to +127\nTwo zero patterns: 00000000 and 11111111", None, "All eight bits participate in inversion."),
            ("TWO’S COMPLEMENT", "All eight bits form one weighted value; the MSB has place value −128.\nRange: −128 to +127\nOne zero pattern: 00000000", None, "There is no separate magnitude field."),
        ],
        "footer": "Do not label one’s complement or two’s complement as a sign bit followed by magnitude bits.",
    },
    "006/precision": {
        "title": "Precision limits: rounding and truncation",
        "subtitle": "A representable value may be exact, truncated or rounded to the nearest value.",
        "cards": [
            ("EXACT VALUE", "0.75 (denary) = 0.1100 (binary) exactly.\n1/2 + 1/4 = 3/4.", None, "Representation error = 0"),
            ("TRUNCATE 0.1", "With four fractional bits, truncating 0.1 gives:\n0.0001 (binary) = 0.0625 (denary)\nAbsolute error:\n|0.1 − 0.0625| = 0.0375", None, "This is truncation, not nearest rounding."),
            ("ROUND TO NEAREST", "The nearest four-bit fractional value is:\n0.0010 (binary) = 0.125 (denary)\nAbsolute error:\n|0.1 − 0.125| = 0.025", None, "0.025 < 0.0375"),
        ],
        "footer": "Always name the method: truncation chooses 0.0625; rounding to nearest chooses 0.125.",
    },
    "050/timing": {
        "title": "Pipeline fill, throughput and drain",
        "subtitle": "Four instructions, three stages: each instruction executes exactly once.",
        "cards": [
            ("FILL", "Early cycles before every stage is occupied.", "Cycle 1   F1\nCycle 2   F2  D1", "No instruction has skipped a stage."),
            ("FULL PIPELINE", "Different instructions occupy different stages in the same cycle.", "Cycle 3   F3  D2  E1\nCycle 4   F4  D3  E2", "Ideal throughput: one completion per cycle."),
            ("DRAIN", "No new instruction enters; remaining instructions finish once.", "Cycle 5       D4  E3\nCycle 6           E4", "Pipeline empty after E4 in cycle 6."),
        ],
        "footer": "Pipelining improves throughput after fill; it does not make one instruction complete all stages instantly.",
    },
    "051/retrieval": {
        "title": "Registers and buses: keep the roles separate",
        "subtitle": "Values and control signals use different paths.",
        "cards": [
            ("FETCH ADDRESS", "PC holds the address of the next instruction.\nPC → MAR\nMAR places that address on the address bus for memory.", None, "Address bus carries addresses."),
            ("TRANSFER VALUE", "Memory transfers the instruction or data through the data bus.\nData bus ↔ MDR\nMDR → CIR for the fetched instruction.", None, "Data bus carries data and instructions."),
            ("CONTROL SIGNALS", "The control unit sends signals such as READ and WRITE on the control bus.\nThe control bus does not carry the memory address or the fetched instruction.", None, "Control bus carries control and timing signals."),
        ],
        "footer": "PC: next address • MAR: address in use • MDR: transferred value • CIR: current instruction.",
    },
    "060/pipeline": {
        "title": "Translation, linking and loading",
        "subtitle": "Different tools have different inputs and outputs.",
        "cards": [
            ("TRANSLATE", "Compiler: translates a whole high-level program before execution.\nAssembler: translates assembly mnemonics into machine/object code.", None, "Both produce target code."),
            ("INTERPRET", "An interpreter translates and executes high-level source statement by statement during execution.\nIt normally does not create a separate permanent executable file.", None, "Source → translate + execute directly"),
            ("BUILD AND RUN", "Linker: combines object modules and resolves external references to form an executable.\nLoader: places executable code and data into main memory ready to run.", None, "Object modules → executable → memory"),
        ],
        "footer": "Do not draw an interpreter arrow to a permanent executable artifact.",
    },
    "101/flowcharts": {
        "title": "Flowcharts use symbols to show control flow",
        "subtitle": "Every arrow must lead to a defined next state.",
        "cards": [
            ("SYMBOLS", "Oval: START or END\nParallelogram: INPUT or OUTPUT\nRectangle: calculation or assignment\nDiamond: yes/no decision\nArrow: next step", None, "Use each symbol for its stated role."),
            ("VALID EXAMPLE", "A complete decision flow uses an assigned input and two labelled branches.", "START\n  ↓\nINPUT Mark\n  ↓\nMark >= 50?\n Yes ↙   ↘ No\nOUTPUT Pass   OUTPUT Resit\n       ↘     ↙\n          END", "Both branches terminate."),
            ("CONSISTENCY CHECK", "Every value that is output must first be assigned or input.\nEvery decision needs labelled outcomes.\nEvery loop needs a route that can change its condition.", None, "Never output an undefined Average."),
        ],
        "footer": "A flowchart is correct only when its symbols and its algorithm are both correct.",
    },
    "106/initialise": {
        "title": "Initialise totals, counts, maximum and minimum safely",
        "subtitle": "The starting value must preserve the meaning of the algorithm.",
        "cards": [
            ("TOTAL AND COUNT", "Totals and counters start at zero because no value has yet been added or counted.", "Total <- 0\nCount <- 0", "Zero is the neutral starting value."),
            ("FIRST SCORE", "Maximum and Minimum should start from the first real score, not from arbitrary values that may be outside the data.", "INPUT Score\nMaximum <- Score\nMinimum <- Score", "Initialise from real data."),
            ("PROCESS THE REST", "Compare every remaining score and update only when a new extreme is found.", "IF Score > Maximum THEN\n    Maximum <- Score\nENDIF\nIF Score < Minimum THEN\n    Minimum <- Score\nENDIF", "Largest and smallest seen so far."),
        ],
        "footer": "Safe rule: zero for totals/counts; first item (or proven safe bounds) for maximum/minimum.",
    },
    "106/sentinel": {
        "title": "Sentinel loop: read, process, read again",
        "subtitle": "The sentinel stops the loop and is not included in the calculation.",
        "cards": [
            ("INITIALISE", "Start the running values, then read the first input.", "Total <- 0\nCount <- 0\nINPUT Number", "Prime the loop with one input."),
            ("PROCESS", "Only process a value while it is not the sentinel.", "WHILE Number <> -1\n    Total <- Total + Number\n    Count <- Count + 1\n    INPUT Number\nENDWHILE", "The repeated INPUT allows termination."),
            ("OUTPUT", "When Number = -1, leave the loop. The -1 is not added and not counted.", "OUTPUT Total\nOUTPUT Count", "Sentinel controls; it is not data."),
        ],
        "footer": "Missing the INPUT inside the loop causes an infinite loop after a non-sentinel first value.",
    },
    "112/pseudocode": {
        "title": "Readable Cambridge-style sentinel pseudocode",
        "subtitle": "Use Cambridge operators and make loop progress explicit.",
        "cards": [
            ("INPUT LOOP", "Read again inside the loop so Value can eventually become -1.", "Total <- 0\nCount <- 0\nINPUT Value\nWHILE Value <> -1\n    Total <- Total + Value\n    Count <- Count + 1\n    INPUT Value\nENDWHILE", "The sentinel is not processed."),
            ("SAFE AVERAGE", "Use real division for an average and avoid dividing by zero.", "IF Count > 0 THEN\n    Average <- Total / Count\n    OUTPUT Average\nELSE\n    OUTPUT \"No data\"\nENDIF", "Use /, not DIV, for a real average."),
            ("JAVA SUPPORT ONLY", "Java may support understanding, but it is not the Cambridge answer format.", "double average =\n    (double) total / count;", "Do not copy Java syntax into pseudocode."),
        ],
        "footer": "Correctness checklist: initialise → input → test → process → update input → close the loop.",
    },
    "123/decision": {
        "title": "Choose a data structure from the scenario",
        "subtitle": "Identifiers are text even when most characters are digits.",
        "cards": [
            ("ONE BOOK", "Use one record with fields such as:\nISBN: STRING\nTitle: STRING\nPages: INTEGER", None, "ISBN is an identifier, not a quantity."),
            ("WHY ISBN IS STRING", "An ISBN may contain leading zeroes or hyphens. ISBN-10 may end in X. No arithmetic is performed on it.", None, "Digits alone do not imply INTEGER."),
            ("SCALE THE STRUCTURE", "50 readings → array of REAL\n200 books → array of records\nTransactions for the next run → file\nArrival-order service → queue", None, "Choose from required operations and lifetime."),
        ],
        "footer": "Ask what the data means and how it is used—not merely what characters it contains.",
    },
    "129/sentinel": {
        "title": "A sentinel value stops the loop",
        "subtitle": "Read the next value before testing the condition again.",
        "cards": [
            ("PRIME", "Initialise the total and read the first value.", "Total <- 0\nINPUT Number", "One input before WHILE."),
            ("REPEAT SAFELY", "Process only non-sentinel values, then read the next value.", "WHILE Number <> -1\n    Total <- Total + Number\n    INPUT Number\nENDWHILE", "The second INPUT changes the condition."),
            ("TRACE", "Inputs: 4, 7, -1\nTotal: 0 → 4 → 11\nWhen -1 is read, the loop stops and -1 is not added.", "OUTPUT Total   // 11", "Sentinel = control value, not data."),
        ],
        "footer": "Without INPUT Number inside WHILE, a non-sentinel first value repeats forever.",
    },
    "129/while": {
        "title": "WHILE loop: check before each iteration",
        "subtitle": "Something inside the loop must be able to change the condition.",
        "cards": [
            ("FIRST INPUT", "Read Password before the pre-condition is tested.", "INPUT Password", "The loop may run zero times."),
            ("RETRY LOOP", "If the password is wrong, prompt and read a replacement value.", "WHILE Password <> CorrectPassword\n    OUTPUT \"Try again\"\n    INPUT Password\nENDWHILE", "The repeated INPUT prevents an infinite loop."),
            ("AFTER LOOP", "Reaching this point means Password = CorrectPassword.", "OUTPUT \"Access granted\"", "Grant access only after the condition is false."),
        ],
        "footer": "General pattern: test condition → perform body → update a value used by the condition.",
    },
    "139/validation": {
        "title": "Validation repeats until input is acceptable",
        "subtitle": "Every retry must obtain a new value.",
        "cards": [
            ("INPUT INSIDE REPEAT", "The input belongs inside the loop body so each iteration can receive a replacement mark.", "REPEAT\n    INPUT Mark", "Runs at least once."),
            ("CHECK RANGE", "Accept only marks from 0 to 100 inclusive.", "    IF Mark >= 0 AND Mark <= 100 THEN\n        Valid <- TRUE\n    ELSE\n        OUTPUT \"Enter 0 to 100\"\n        Valid <- FALSE\n    ENDIF", "Invalid data is not processed."),
            ("TERMINATE", "Repeat while invalid; continue only after acceptable input.", "UNTIL Valid = TRUE", "Then calculate the grade."),
        ],
        "footer": "Validation checks acceptability; it does not guess or silently repair an invalid value.",
    },
    "141/validation": {
        "title": "Review fragment: complete input validation",
        "subtitle": "A correct fragment contains input, decision, retry and termination.",
        "cards": [
            ("REQUEST", "Ask for a mark on every attempt.", "REPEAT\n    OUTPUT \"Enter mark 0 to 100\"\n    INPUT Mark", "A retry reads a new value."),
            ("DECIDE", "Set Valid from the stated inclusive range.", "    IF Mark >= 0 AND Mark <= 100 THEN\n        Valid <- TRUE\n    ELSE\n        Valid <- FALSE\n    ENDIF", "Both paths assign Valid."),
            ("REPEAT OR CONTINUE", "Stop only when Valid is TRUE. Invalid input returns to the prompt and INPUT.", "UNTIL Valid = TRUE", "No infinite retry on an unchanged Mark."),
        ],
        "footer": "Trace test: −5 retries; 72 sets Valid to TRUE and exits.",
    },
}


def code_repair(title: str, subtitle: str, left_heading: str, left_code: str,
                middle_heading: str, middle_code: str, check: str, footer: str) -> dict:
    """Build the shared three-card layout for source-code structure repairs."""
    return {
        "title": title,
        "subtitle": subtitle,
        "cards": [
            (left_heading, "", left_code, "Complete first structure"),
            (middle_heading, "", middle_code, "Complete second structure"),
            ("CONTROL-FLOW CHECK", check, None, "Trace before approval."),
        ],
        "footer": footer,
    }


SPECS.update({
    "099/pseudocode": code_repair(
        "Complete a procedure before it ends",
        "A selection inside a procedure needs its own closing keyword.",
        "CAMBRIDGE PSEUDOCODE",
        "PROCEDURE ValidateMark(Mark)\n    IF Mark >= 0 AND Mark <= 100 THEN\n        OUTPUT \"Valid\"\n    ELSE\n        OUTPUT \"Invalid\"\n    ENDIF\nENDPROCEDURE",
        "JAVA SUPPORT ONLY",
        "static void validateMark(int mark) {\n    if (mark >= 0 && mark <= 100) {\n        System.out.println(\"Valid\");\n    } else {\n        System.out.println(\"Invalid\");\n    }\n}",
        "ENDIF closes IF...ELSE. ENDPROCEDURE closes the surrounding procedure. They are not interchangeable.",
        "Nesting order: open PROCEDURE → open IF → close ENDIF → close ENDPROCEDURE.",
    ),
    "101/equivalence": code_repair(
        "A decision diamond becomes a closed selection",
        "Both labelled branches must rejoin after ENDIF.",
        "FLOWCHART MEANING",
        "INPUT Age\n        ↓\nAge >= 11 AND Age <= 18?\n   Yes ↙          ↘ No\nOUTPUT \"Valid\"   OUTPUT \"Invalid\"\n         ↘        ↙\n            END",
        "PSEUDOCODE",
        "INPUT Age\nIF Age >= 11 AND Age <= 18 THEN\n    OUTPUT \"Valid\"\nELSE\n    OUTPUT \"Invalid\"\nENDIF",
        "The diamond condition becomes IF. Its Yes and No arrows become THEN and ELSE. ENDIF is the rejoin point.",
        "The flowchart diamond becomes an IF condition; a branch is not equivalent to an unclosed IF structure.",
    ),
    "102/pseudocode": code_repair(
        "Same summation in pseudocode and Java",
        "Both versions input three numbers, accumulate them and output the total.",
        "CAMBRIDGE PSEUDOCODE",
        "Total <- 0\nFOR Count <- 1 TO 3\n    INPUT Number\n    Total <- Total + Number\nNEXT Count\nOUTPUT Total",
        "JAVA SUPPORT ONLY",
        "int total = 0;\nfor (int count = 1;\n     count <= 3; count++) {\n    int number = input.nextInt();\n    total += number;\n}\nSystem.out.println(total);",
        "For inputs 4, 7, 2, Total changes 0 → 4 → 11 → 13. Update inside the loop; output after it.",
        "Equivalent algorithms perform the same input, accumulation and final output.",
    ),
    "100/pseudocode": code_repair(
        "Close the selection inside a FOR loop",
        "PassCount changes only when Mark meets the threshold.",
        "COMPLETE LOOP",
        "PassCount <- 0\nFOR Count <- 1 TO 5\n    INPUT Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Count\nOUTPUT PassCount",
        "NESTING MAP",
        "FOR each mark\n    INPUT mark\n    IF mark passes\n        increment PassCount\n    ENDIF\nNEXT mark\nOUTPUT PassCount",
        "Test 49, 50 and 51. Only 50 and 51 increment PassCount because the condition uses >=.",
        "ENDIF appears before NEXT Count because the selection is nested inside the loop.",
    ),
    "103/pseudocode": code_repair(
        "Post-condition validation must be complete",
        "REPEAT opens the loop; ENDIF closes the nested selection.",
        "CAMBRIDGE PSEUDOCODE",
        "REPEAT\n    INPUT Mark\n    IF Mark < 0 OR Mark > 100 THEN\n        OUTPUT \"Invalid mark\"\n    ENDIF\nUNTIL Mark >= 0 AND Mark <= 100",
        "JAVA SUPPORT ONLY",
        "do {\n    mark = input.nextInt();\n    if (mark < 0 || mark > 100) {\n        System.out.println(\n            \"Invalid mark\");\n    }\n} while (mark < 0 || mark > 100);",
        "−5 produces the warning and repeats. 72 satisfies the UNTIL condition, so the loop stops.",
        "Never write UNTIL without REPEAT or a Java while-tail without its opening do block.",
    ),
    "104/pseudocode": code_repair(
        "Linear search: close IF before advancing",
        "The flag update is conditional; moving to the next position is not.",
        "CAMBRIDGE PSEUDOCODE",
        "Found <- FALSE\nIndex <- 1\nWHILE Found = FALSE AND Index <= Length\n    IF List[Index] = Target THEN\n        Found <- TRUE\n    ENDIF\n    Index <- Index + 1\nENDWHILE",
        "NESTING MAP",
        "WHILE search active\n    compare current item\n    IF equal\n        set Found\n    ENDIF\n    advance Index\nENDWHILE",
        "The loop stops when Target is found or Index moves beyond Length. Index changes after every comparison.",
        "ENDIF closes the match decision; ENDWHILE closes the search loop.",
    ),
    "106/pseudocode": code_repair(
        "Total and pass count in one complete loop",
        "Every mark affects Total; only passing marks affect PassCount.",
        "CAMBRIDGE PSEUDOCODE",
        "Total <- 0\nPassCount <- 0\nFOR Index <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT Total\nOUTPUT PassCount",
        "NESTING MAP",
        "FOR each mark\n    INPUT mark\n    update Total\n    IF mark passes\n        update PassCount\n    ENDIF\nNEXT mark",
        "A failing mark still contributes to Total but does not increment PassCount.",
        "Close the IF with ENDIF before NEXT Index closes the surrounding FOR loop.",
    ),
    "107/pseudocode": {
        "title": "Count vowels with a closed selection",
        "subtitle": "MID returns STRING; compare the one-character result with STRING literals.",
        "headingSize": 25,
        "bodySize": 22,
        "codeSize": 17,
        "noteSize": 18,
        "cards": [
            ("PSEUDOCODE", "", "VowelCount <- 0\nFOR Index <- 1 TO LENGTH(Word)\n    Character <- MID(Word, Index, 1)\n    IF Character = \"A\" OR\n       Character = \"a\" OR\n       Character = \"E\" OR\n       Character = \"e\" OR\n       Character = \"I\" OR\n       Character = \"i\" OR\n       Character = \"O\" OR\n       Character = \"o\" OR\n       Character = \"U\" OR\n       Character = \"u\" THEN\n        VowelCount <- VowelCount + 1\n    ENDIF\nNEXT Index\nOUTPUT VowelCount", "MID(..., 1) returns STRING."),
            ("TRACE", "", "C  no change\no  0 -> 1\nd  no change\ne  1 -> 2\n\nFinal output: 2", "Compare both letter cases."),
            ("TYPE CHECK", "The comparisons use one-character STRING literals because MID returns STRING. ENDIF closes the selection before NEXT Index.", None, "Do not call CHAR-only UCASE or LCASE."),
        ],
        "footer": "MID returns STRING. UCASE and LCASE accept CHAR, so do not pass MID's result to them.",
    },
    "108/pseudocode": code_repair(
        "Nested loops must perform the same body",
        "Both forms calculate and output all 3 × 4 products.",
        "CAMBRIDGE PSEUDOCODE",
        "FOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        Product <- Row * Column\n        OUTPUT Product\n    NEXT Column\nNEXT Row",
        "JAVA SUPPORT ONLY",
        "for (int row = 1; row <= 3; row++) {\n    for (int column = 1;\n         column <= 4; column++) {\n        int product = row * column;\n        System.out.println(product);\n    }\n}",
        "The inner loop runs four times for each of three rows, so output executes 12 times.",
        "A support translation is equivalent only when it preserves the loop body and output.",
    ),
    "109/pseudocode": code_repair(
        "Linear-search reasoning is language-independent",
        "The notation changes; the maximum comparison count does not.",
        "CAMBRIDGE PSEUDOCODE",
        "Found <- FALSE\nFOR Index <- 1 TO Length\n    IF List[Index] = Target THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index",
        "JAVA SUPPORT ONLY",
        "boolean found = false;\nfor (int index = 0;\n     index < list.length; index++) {\n    if (list[index] == target) {\n        found = true;\n    }\n}",
        "Without an early exit, both versions can compare Target with all Length items.",
        "Closing IF makes clear that comparison outcome—not the loop itself—sets Found.",
    ),
    "110/java": code_repair(
        "Translate Java structure into pseudocode",
        "Keep the algorithm, replace language-specific syntax and close each block.",
        "JAVA SUPPORT ONLY",
        "int passCount = 0;\nfor (int i = 0; i < 5; i++) {\n    if (marks[i] >= 50) {\n        passCount++;\n    }\n}",
        "CAMBRIDGE PSEUDOCODE",
        "PassCount <- 0\nFOR Index <- 1 TO 5\n    IF Marks[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index",
        "Java visits positions 0 to 4. This course pseudocode example explicitly visits positions 1 to 5.",
        "Use ENDIF before NEXT Index; do not copy Java braces or ++ into exam pseudocode.",
    ),
    "111/pseudocode": code_repair(
        "Design the complete algorithm in pseudocode first",
        "Input, decision, update and output all need explicit locations.",
        "CAMBRIDGE PSEUDOCODE",
        "PassCount <- 0\nFOR Index <- 1 TO 5\n    INPUT Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
        "JAVA SUPPORT ONLY",
        "int passCount = 0;\nfor (int index = 0;\n     index < 5; index++) {\n    int mark = input.nextInt();\n    if (mark >= 50) {\n        passCount++;\n    }\n}\nSystem.out.println(passCount);",
        "Both forms read five marks, count those at least 50, then report the count once.",
        "ENDIF closes the decision before the surrounding loop advances.",
    ),
    "113/why-types": code_repair(
        "Types constrain operations; validation constrains values",
        "A correct type does not remove the need for closed validation logic.",
        "TYPE-BASED OPERATION",
        "DECLARE IsValid : BOOLEAN\nIF IsValid = TRUE THEN\n    OUTPUT \"Accepted\"\nENDIF",
        "VALUE VALIDATION",
        "DECLARE BirthDate : DATE\nIF BirthDate > Today THEN\n    OUTPUT \"Invalid\"\nENDIF",
        "BOOLEAN, DATE, INTEGER and STRING determine meaningful operations. Validation checks whether a value is acceptable here.",
        "Each IF example is a complete structured selection ending with ENDIF.",
    ),
})

# Exact-text technical diagrams are maintained as machine-readable data so the
# renderer and semantic verifier use the same bit strings, opcodes and labels.
with TECHNICAL_VISUAL_CONTRACT_PATH.open(encoding="utf-8") as contract_file:
    TECHNICAL_VISUAL_CONTRACT = json.load(contract_file)
for technical_key, technical_spec in TECHNICAL_VISUAL_CONTRACT.items():
    SPECS[technical_key] = {
        field: technical_spec[field]
        for field in ("title", "subtitle", "cards", "footer", "numbered", "headingSize", "bodySize", "codeSize", "noteSize")
    }


def current_repair_specs() -> dict[str, dict]:
    """Build deterministic three-card specs from the maintained repair facts."""
    facts_by_key = json.loads(REPAIR_FACTS_PATH.read_text(encoding="utf-8"))
    delivery_map = json.loads(VISUAL_DELIVERY_MAP_PATH.read_text(encoding="utf-8"))
    with TARGET_REGISTER_PATH.open(encoding="utf-8", newline="") as handle:
        targets = {
            f"{row['lesson']}/{row['target_id']}": row
            for row in csv.DictReader(handle)
        }

    headings = {
        "process": ("START / RULE", "MECHANISM", "RESULT / CHECK"),
        "mechanism": ("INPUT / FACT", "MECHANISM", "RESULT / CHECK"),
        "comparison": ("FIRST CASE", "SECOND CASE", "DISTINCTION"),
        "tradeoff": ("BENEFIT / CASE", "COST / LIMIT", "DECISION CHECK"),
        "synthesis": ("CORE FACT", "RELATIONSHIP", "EXAM CHECK"),
    }
    title_overrides = {
        # These titles are part of the reviewed deterministic asset contract.
        # The target register title is editorial metadata and may be regenerated;
        # it must not silently change already-approved pixels.
        "017/topologies": "Network topologies",
        "031/cache-vm": "Cache and virtual memory affect performance in opposite directions",
        "106/bubble": "Bubble sort: compare adjacent items and swap if needed",
        "074/ip": "What intellectual property can protect",
        "084/normal-forms": "From 1NF to 3NF",
        "112/analyser": "Stepwise refinement: from task to modules",
        "113/pseudocode": "The eight Cambridge pseudocode type names",
        "119/declare": "Define, save and read a record",
        "123/concept": "An ADT combines data and operations",
        "123/implementation": "Array implementations of three ADTs",
        "123/pseudocode": "Justify the data structure in Cambridge answers",
        "130/procedure": "A procedure performs actions and returns no value",
        "134/substring": "Use the supplied string-function definition",
        "141/standard": "From design description to pseudocode",
        "137/validation": "Testing checks validation against expected results",
        "145/evaluation": "Evaluation uses requirements and measurable success criteria",
    }
    subtitle_overrides = {
        "084/normal-forms": "Each normal form removes a different dependency problem while preserving the represented facts.",
        "112/analyser": "Each level replaces a complex step with a smaller, more precise and implementable sequence.",
    }
    footer_overrides = {
        "084/normal-forms": "Check in order: atomic values and no repeating groups -> no partial dependency -> no transitive dependency.",
        "112/analyser": "Preserve the parent purpose at every level; all refined modules must still form one complete solution.",
        "070/checks": "Range check • Format check • Length check • Presence check • Existence check • Limit check • Check digit.",
    }
    specs: dict[str, dict] = {}
    for key, facts in facts_by_key.items():
        delivered = delivery_map.get(key)
        target_key = f"{delivered['lesson']}/{delivered['targetId']}" if delivered else key
        if target_key not in targets:
            raise ValueError(f"Repair target is missing from the target register: {key} -> {target_key}")
        if len(facts) < 3:
            raise ValueError(f"Repair target needs at least three facts: {key}")
        target = targets[target_key]
        kind = target["target_type"]
        labels = headings.get(kind, headings["synthesis"])
        groups = [facts[:1], facts[1:2], facts[2:]]
        cards = []
        for index, group in enumerate(groups):
            notes = ("State the core fact precisely", "Follow the relationship", "Apply the exam-safe distinction")
            cards.append((labels[index], "\n".join(group), None, notes[index]))
        specs[key] = {
            "title": title_overrides.get(key, target["title"]),
            "subtitle": subtitle_overrides.get(key, "Use the exact facts and relationships in this model."),
            "cards": cards,
            "footer": footer_overrides.get(key, "Exam check: state only the relationship supported by the given data and rule."),
            "edges": [("card-1", "card-2"), ("card-2", "card-3")] if kind in {"process", "mechanism"} else [],
        }
    return specs


SPECS.update(current_repair_specs())


SPECS.update({
    "020/address-journey": {
        "title": "From a URL to a frame on the local link",
        "subtitle": "DNS, IP addressing and MAC addressing solve different parts of delivery.",
        "cards": [
            ("NAME TO IP", "The URL contains a domain name. DNS resolves that domain name to an IP address; it does not return a MAC address.", None, "DNS result: destination IP address"),
            ("NETWORK-LAYER PACKET", "The IP packet header contains the destination IP address of the endpoint. Routers use it to move the packet across networks.", "IP PACKET\n┌──────────────────────────┐\n│ Destination IP: endpoint │\n│ Payload                  │\n└──────────────────────────┘", "The IP packet is carried end to end."),
            ("LOCAL-LINK FRAME", "For one local hop, a link-layer frame contains the IP packet. Its frame header contains the destination MAC address for that hop.", "FRAME\n┌──────────────────────────┐\n│ Destination MAC: next hop│\n│  ┌──── IP PACKET ─────┐  │\n│  │ Destination IP     │  │\n│  └────────────────────┘  │\n└──────────────────────────┘", "MAC belongs to the frame, not the IP packet."),
        ],
        "footer": "Encapsulation: local-link frame outside → IP packet inside; the two destination addresses remain in different headers.",
    },
    "020/addresses": {
        "title": "IP and MAC addresses work together",
        "subtitle": "They are layers with different scopes—not an either/or choice.",
        "cards": [
            ("IP ADDRESS", "Identifies the destination endpoint at the network layer. The destination IP remains the remote endpoint while a packet is routed across networks.", None, "Scope: end-to-end packet delivery"),
            ("MAC ADDRESS", "Identifies the destination network interface for one local-link frame. On a routed path, the destination MAC is normally the next-hop router and changes hop by hop.", None, "Scope: one local-link hop"),
            ("USED TOGETHER", "Same local network:\nIP packet → destination host IP\nFrame → destination host MAC\n\nDifferent network:\nIP packet → remote host IP\nFrame → next-hop router MAC", None, "Every hop uses a frame; the packet keeps its IP destination."),
        ],
        "footer": "Do not choose IP or MAC by destination location: an IP packet is encapsulated in a local-link frame that uses a MAC address.",
    },
    "035/gates": {
        "title": "The six logic-gate output rules",
        "subtitle": "Each rule states exactly when output Q is 1.",
        "cards": [
            ("NOT, AND, OR", "", "NOT   Q = NOT A\n      Q = 1 when A = 0\n\nAND   Q = A AND B\n      Q = 1 when both inputs are 1\n\nOR    Q = A OR B\n      Q = 1 when at least one input is 1", "Three basic output conditions"),
            ("NAND, NOR, XOR", "", "NAND  Q = NOT (A AND B)\n      Q = 1 unless both inputs are 1\n\nNOR   Q = NOT (A OR B)\n      Q = 1 when both inputs are 0\n\nXOR   Q = A XOR B\n      Q = 1 when exactly one input is 1", "Three distinct derived conditions"),
            ("DISTINGUISH THEM", "NAND negates AND.\n\nNOR negates OR.\n\nXOR is 1 when exactly one input is 1; ordinary OR is also 1 when both inputs are 1.", None, "XOR is not the same rule as OR."),
        ],
        "footer": "A six-gate summary must include NOT, AND, OR, NAND, NOR and XOR.",
    },
    "042/cycle-visual": {
        "title": "Trace one instruction through fetch",
        "subtitle": "The instruction transfer and PC increment are separate state changes.",
        "cards": [
            ("ADDRESS", "Copy the address of the next instruction from PC to MAR. Memory receives that address through the address bus.", "PC ── address ──▶ MAR\nMAR ────────────▶ memory", "PC still identifies the fetch position."),
            ("MEMORY READ", "The control unit sends a READ signal. Memory returns the instruction through the data bus into MDR.", "memory ── instruction ──▶ MDR", "MDR now holds the fetched instruction."),
            ("TWO UPDATES", "Move the fetched instruction from MDR to CIR. Independently increment PC so it points to the next instruction.", "MDR ── instruction ──▶ CIR\n\nPC  ◀──  PC + 1", "Only MDR feeds CIR; PC updates itself."),
        ],
        "footer": "Fetch state: MAR gets the address • MDR gets the instruction • CIR gets the current instruction • PC becomes PC + 1.",
    },
    "047/modes": {
        "title": "Four common addressing modes",
        "subtitle": "The operand field may hold a value, an address or part of an effective-address calculation.",
        "cards": [
            ("IMMEDIATE AND DIRECT", "", "IMMEDIATE   LOAD #20\nOperand is the value 20.\nCPU uses 20 directly.\n\nDIRECT      LOAD 20\nOperand is address 20.\nCPU reads the value stored\nat address 20.", "Immediate: value • Direct: one addressed read"),
            ("INDIRECT AND INDEXED", "", "INDIRECT    LOAD (20)\nAddress 20 stores another address.\nCPU follows it, then reads the value.\n\nINDEXED     LOAD 20, IX\nEffective address = 20 + IX.\nCPU reads the value at\nthat address.", "Indirect: reference • Indexed: base + index"),
            ("COMPARE THE PATHS", "Immediate: operand is the value.\n\nDirect: operand is the data address.\n\nIndirect: operand points to an address that points to the data.\n\nIndexed: add an index to a base address.", None, "Count the memory references needed to reach the value."),
        ],
        "footer": "All four modes differ in how the CPU obtains the operand value.",
    },
    "056/concept": {
        "title": "Translation, linking and loading",
        "subtitle": "There is no generic object-code-to-machine-code translation stage.",
        "cards": [
            ("COMPILER", "Translates a high-level source program into target machine/object code. A compiler may create an object module for a later link step.", None, "High-level source → target/object code"),
            ("ASSEMBLER", "Translates assembly-language mnemonics into machine/object code for the target processor.", None, "Assembly source → target/object code"),
            ("LINK AND LOAD", "A linker combines object modules and resolves references to form an executable. A loader places executable code and data into memory.", None, "Object modules → linker → executable → loader → memory"),
        ],
        "footer": "Object code is already target machine code in relocatable form; linking and loading are not another source-language translation.",
    },
    "089/sql": {
        "title": "SQL clause purpose, syntax and processing order",
        "subtitle": "Clause choice is separate from the order in which a query is written or evaluated.",
        "cards": [
            ("CLAUSE PURPOSE", "SELECT chooses output fields.\nFROM names source tables.\nWHERE filters rows.\nGROUP BY forms groups.\nORDER BY sorts the final rows.", None, "Choose clauses to match the request."),
            ("WRITTEN SYNTAX ORDER", "For the clauses shown, write them in this order:", "SELECT fields\nFROM table\nWHERE condition\nGROUP BY field\nORDER BY field", "GROUP BY appears before ORDER BY."),
            ("LOGICAL PROCESSING", "A useful logical model for these clauses is:", "FROM\n  ↓\nWHERE\n  ↓\nGROUP BY\n  ↓\nSELECT\n  ↓\nORDER BY", "Sorting is last in this simplified model."),
        ],
        "footer": "Do not confuse written syntax order with logical processing order; neither places ORDER BY before GROUP BY.",
    },
    "093/sql": {
        "title": "Choose SQL clauses by their effects",
        "subtitle": "SELECT, WHERE, GROUP BY and ORDER BY are not mandatory consecutive stages.",
        "cards": [
            ("SELECT OR WHERE", "SELECT controls which fields appear.\nExample: SELECT Name, Points\n\nWHERE keeps rows that meet a condition.\nExample: WHERE Points > 1000", None, "Use either or both when the request needs them."),
            ("GROUP BY OR ORDER BY", "GROUP BY forms groups for summaries.\nExample: GROUP BY House\n\nORDER BY arranges final rows.\nExample: ORDER BY Points DESC", None, "Grouping and sorting have different effects."),
            ("VALID QUERY ORDER", "When all shown clauses are used, the written order is:", "SELECT fields\nFROM table\nWHERE condition\nGROUP BY field\nORDER BY field", "Clause choice depends on the question."),
        ],
        "footer": "Treat the clauses as independent choices; if combined, use valid SQL syntax with GROUP BY before ORDER BY.",
    },
    "095/timing": {
        "title": "A consistent mark-to-time planning model",
        "subtitle": "Example practice rate: one minute per mark; adjust the rate once, not row by row.",
        "cards": [
            ("CALCULATE", "Use one declared rate for the whole practice set.\n\nTarget time = marks × 1 minute", "1 mark   → 1 minute\n3 marks  → 3 minutes\n4 marks  → 4 minutes\n6 marks  → 6 minutes", "Equal marks receive equal target time."),
            ("MATCH DEPTH", "1 mark: one precise answer.\n3 marks: up to three distinct mark-worthy points.\n4 marks: develop the number and type of points required by the command word.\n6 marks: plan a structured response.", None, "Marks guide both time and answer depth."),
            ("USE THE BUDGET", "Read, plan, write and check within the question's total target time. If one answer exceeds its budget, flag it and return after protecting later marks.", None, "The rate is a practice model, not extra exam time."),
        ],
        "footer": "Consistency rule: the same mark value must map to the same target time unless a clearly labelled adjustment is applied to the whole model.",
    },
    "103/checks": {
        "title": "Match each validation rule to its risk",
        "subtitle": "State exactly what the condition tests; do not imply an exact length when only a maximum is checked.",
        "cards": [
            ("RANGE AND PRESENCE", "Range check:\nMark >= 0 AND Mark <= 100\nPrevents values outside the limits.\n\nPresence check:\nName <> \"\"\nPrevents required data being blank.", None, "The rule matches the stated risk."),
            ("MAXIMUM LENGTH", "Length check:\nLENGTH(Postcode) <= 8\n\nThe input has no more than the maximum number of characters.", None, "Prevents input that is too long; it does not require exactly eight characters."),
            ("TYPE OR FORMAT", "A type/format check tests whether input matches the expected data type or pattern, such as a valid date structure.", None, "Validation cannot prove that entered data is truthful."),
        ],
        "footer": "Describe <= 8 as a maximum-length rule. Use equality or a bounded range only when exact or minimum-and-maximum length is required.",
    },
    "108/model": {
        "title": "Choose outer and inner loops by traversal",
        "subtitle": "Range size does not decide which loop belongs outside.",
        "cards": [
            ("OUTER LOOP", "Put outside the value that should change less frequently. For a row-major table, select one Row, then keep that Row fixed while all columns are visited.", "FOR Row ← 1 TO 3\n    ...\nNEXT Row", "Row changes after the inner traversal completes."),
            ("INNER LOOP", "Put inside the traversal that must complete for every outer value. Here, Column runs through 1 to 4 for each Row.", "FOR Column ← 1 TO 4\n    OUTPUT Row, Column\nNEXT Column", "Column changes on every inner iteration."),
            ("COMBINED TRACE", "The required grouping determines nesting:", "Row 1: (1,1) (1,2) (1,3) (1,4)\nRow 2: (2,1) (2,2) (2,3) (2,4)\nRow 3: (3,1) (3,2) (3,3) (3,4)", "A wider or narrower numeric range can be either loop."),
        ],
        "footer": "Decision rule: outer = changes less often; inner = completes its full traversal for each outer value.",
    },
    "110/conversion": {
        "title": "Convert meaning first, syntax second",
        "subtitle": "Move from abbreviated draft names to clearer names—not the reverse.",
        "cards": [
            ("STATE THE GOAL", "Identify the required input, processing and output before choosing syntax.\n\nExample: input five marks and count how many are at least 50.", None, "Preserve the algorithm's meaning."),
            ("IMPROVE NAMES", "Rename abbreviations in the direction of greater clarity:", "m   ──▶ Mark\ni   ──▶ Index\npc  ──▶ PassCount", "Clear names expose each variable's role."),
            ("WRITE AND TRACE", "Use Cambridge blocks such as FOR...NEXT, IF...ENDIF, assignment, INPUT and OUTPUT. Trace once to check each value changes where intended.", None, "Syntax expresses the already-defined algorithm."),
        ],
        "footer": "Correct direction: abbreviated draft name → meaningful name, for example pc → PassCount.",
    },
    "149/timing": {
        "title": "Spend time in proportion to marks",
        "subtitle": "Example practice rate: one minute per mark, applied consistently.",
        "cards": [
            ("ONE RATE", "Choose a single planning rate for the practice set.\n\nTarget time = marks × 1 minute", "2 marks   → 2 minutes\n3 marks   → 3 minutes\n5 marks   → 5 minutes\n10 marks  → 10 minutes", "More marks always receive more time."),
            ("TIME INCLUDES PROCESS", "The target is the whole question budget. Read the command word, plan the required points, write the answer and check it within that time.", None, "Do not add separate arbitrary minutes to every stage."),
            ("CONTROL THE PAPER", "Start with the declared budget. If progress stalls, flag the question and protect the time available for later marks; return when time remains.", None, "Use the same rule across the paper."),
        ],
        "footer": "A proportional model cannot assign less time to 5 marks than to 3 marks.",
    },
})


SPECS.update({
    "116/pseudocode": code_repair(
        "Traverse the same two-dimensional array",
        "Both versions output the current cell inside the inner loop.",
        "CAMBRIDGE PSEUDOCODE",
        "DECLARE Marks :\n    ARRAY[1:3, 1:4] OF INTEGER\nFOR Row <- 1 TO 3\n    FOR Column <- 1 TO 4\n        OUTPUT Marks[Row, Column]\n    NEXT Column\nNEXT Row",
        "JAVA SUPPORT ONLY",
        "int[][] marks = new int[3][4];\nfor (int row = 0; row < 3; row++) {\n    for (int column = 0;\n         column < 4; column++) {\n        System.out.println(\n            marks[row][column]);\n    }\n}",
        "Three rows × four columns means the output statement executes 12 times in both versions.",
        "Nested loops traverse the array; an empty Java loop body is not equivalent to the pseudocode traversal.",
    ),
    "117/count": code_repair(
        "Increment only when the condition is true",
        "The counter update belongs inside a closed IF selection.",
        "COMPLETE ALGORITHM",
        "PassCount <- 0\nFOR Index <- 1 TO 5\n    IF Scores[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
        "TRACE",
        "Scores: 40, 50, 72, 49, 80\n\nPassCount:\n0 → 0 → 1 → 2 → 2 → 3\n\nFinal output: 3",
        "A score of exactly 50 is counted because the condition uses >=.",
        "ENDIF separates the conditional increment from the surrounding loop control.",
    ),
    "117/pseudocode": code_repair(
        "Same counting algorithm, different array syntax",
        "Both complete versions close the decision and output the final count.",
        "CAMBRIDGE PSEUDOCODE",
        "PassCount <- 0\nFOR Index <- 1 TO 5\n    IF Scores[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
        "JAVA SUPPORT ONLY",
        "int passCount = 0;\nfor (int index = 0;\n     index < 5; index++) {\n    if (scores[index] >= 50) {\n        passCount++;\n    }\n}\nSystem.out.println(passCount);",
        "Each version visits five positions, applies the same threshold and reports one final count.",
        "Closing IF and including output are both required for equivalent complete algorithms.",
    ),
    "117/search": code_repair(
        "Use a flag to remember whether a target appeared",
        "Only a matching element changes Found from FALSE to TRUE.",
        "COMPLETE SEARCH",
        "Found <- FALSE\nFOR Index <- 1 TO 5\n    IF Names[Index] = TargetName THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nOUTPUT Found",
        "TRACE",
        "Names: Ana, Bo, Chen, Di, Eve\nTargetName: Chen\n\nFound:\nFALSE → FALSE → TRUE\n\nIt remains TRUE.",
        "ENDIF closes the match decision before NEXT Index advances the loop.",
        "The flag records whether any visited element matched TargetName.",
    ),
    "119/operations": {
        "title": "Search, count and update are alternative operations",
        "subtitle": "They may share a traversal skeleton, but each uses its own condition and action.",
        "cards": [
            ("SEARCH", "Condition:\nStudents[Index].Name = TargetName\n\nAction:\nOUTPUT Index or record details", None, "Choose when locating a record."),
            ("COUNT", "Condition:\nStudents[Index].Enrolled = TRUE\n\nAction:\nCount <- Count + 1", None, "Choose when measuring a group."),
            ("UPDATE", "Condition:\nStudents[Index].Mark < 40\n\nAction:\nchange the required status or mark field", None, "Choose when modifying records."),
        ],
        "footer": "Search OR count OR update: these are operation choices, not mandatory consecutive pipeline stages.",
    },
    "119/traversal": code_repair(
        "Traverse records and access fields by index",
        "The loop selects a record; the field name selects a value in that record.",
        "COMPLETE TRAVERSAL",
        "FOR Index <- 1 TO 30\n    IF Students[Index].Mark >= 70 THEN\n        OUTPUT Students[Index].Name\n    ENDIF\nNEXT Index",
        "FIELD ROLES",
        "Students[Index]  current record\n.Mark             value tested\n.Name             value output\nIndex             advances 1 to 30",
        "A mark of exactly 70 is included; a lower mark follows the false path and produces no output.",
        "ENDIF closes the conditional output before NEXT Index selects another record.",
    ),
    "120/reader": code_repair(
        "Check EOF before reading the next file line",
        "READFILE runs only after the loop proves that more data exists.",
        "CAMBRIDGE PSEUDOCODE",
        "OPENFILE \"Marks.csv\" FOR READ\nWHILE NOT EOF(\"Marks.csv\")\n    READFILE \"Marks.csv\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Marks.csv\"",
        "ORDER PER ITERATION",
        "1  CHECK NOT EOF\n        ↓ more data\n2  READ next line\n        ↓\n3  PROCESS line\n        ↓\n4  return to CHECK",
        "When EOF is TRUE, the WHILE condition fails; control skips READFILE and closes the file.",
        "Safe order: check NOT EOF → read → process → repeat.",
    ),
    "121/parse": {
        "title": "Use question-supplied CSV functions exactly",
        "subtitle": "The question must define guide-external functions before they are used.",
        "headingSize": 23,
        "bodySize": 21,
        "codeSize": 18,
        "noteSize": 17,
        "cards": [
            ("SIGNATURES", "The question states that the returned Fields array starts at index 1.", "FUNCTION SPLIT(Line : STRING,\n    Delimiter : CHAR)\n    RETURNS ARRAY OF STRING\n\nFUNCTION STRING_TO_INTEGER(\n    Value : STRING)\n    RETURNS INTEGER", "Parameter order and return types are explicit."),
            ("READ + SPLIT", "Read one complete line before parsing its fields.", "READFILE \"Scores.csv\", Line\nFields <- SPLIT(Line, ',')", "SPLIT receives STRING then CHAR."),
            ("ASSIGN + CONVERT", "The supplied array convention makes the first field Fields[1].", "StudentID <- Fields[1]\nName <- Fields[2]\nMark <- STRING_TO_INTEGER(\n    Fields[3])", "Mark receives INTEGER."),
        ],
        "footer": "A guide-external function is usable only because this example supplies its complete signature and array-index convention first.",
    },
    "121/pseudocode": {
        "title": "Question-supplied functions versus Java methods",
        "subtitle": "The signatures, syntax and indexes are different.",
        "headingSize": 23,
        "bodySize": 21,
        "codeSize": 18,
        "noteSize": 17,
        "cards": [
            ("SUPPLIED", "Fields starts at index 1.", "FUNCTION SPLIT(Line : STRING,\n    Delimiter : CHAR)\n    RETURNS ARRAY OF STRING\nFUNCTION STRING_TO_INTEGER(\n    Value : STRING)\n    RETURNS INTEGER", "Question-provided functions."),
            ("USE", "Follow the stated parameter order and return types.", "Fields <- SPLIT(Line, ',')\nMark <- STRING_TO_INTEGER(\n    Fields[3])", "Fields[3] is the third field."),
            ("JAVA ONLY", "Java arrays start at index 0 in this example.", "String[] fields =\n    line.split(\",\");\nint mark =\n    Integer.parseInt(fields[2]);", "Do not copy Java syntax."),
        ],
        "footer": "Use the supplied definitions; do not invent a standard SPLIT or STRING_TO_INTEGER signature.",
    },
    "121/types": code_repair(
        "Convert CSV text before numeric comparison",
        "The question supplies the conversion signature before the example uses it.",
        "SUPPLIED FUNCTION",
        "FUNCTION STRING_TO_INTEGER(\n    Value : STRING)\n    RETURNS INTEGER",
        "USE RETURNED INTEGER",
        "Mark <- STRING_TO_INTEGER(Fields[3])\nIF Mark > 70 THEN\n    OUTPUT Name\nENDIF",
        "STRING_TO_INTEGER is question-provided; it returns INTEGER, so Mark can be compared numerically.",
        "Do not present this conversion as a standard function from the Cambridge pseudocode guide.",
    ),
    "126/constructs": {
        "title": "Three core control-flow constructs",
        "subtitle": "Sequence, selection and iteration answer different algorithm questions.",
        "cards": [
            ("SEQUENCE", "Question: What happens next?\n\nClue: statements execute one after another.\n\nTypical error: assignments are in the wrong order.", None, "Order determines the state."),
            ("SELECTION", "Question: Which path is taken?\n\nClues: IF...THEN...ELSE...ENDIF or CASE...ENDCASE.\n\nTypical error: missing branch or closing keyword.", None, "A condition chooses a path."),
            ("ITERATION", "Question: What repeats, and when does it stop?\n\nClues: FOR...NEXT, WHILE...ENDWHILE, REPEAT...UNTIL.\n\nTypical error: wrong bounds or no condition update.", None, "A loop repeats controlled work."),
        ],
        "footer": "A complete construct summary must include iteration alongside sequence and selection.",
    },
    "126/iteration": {
        "title": "Loops repeat under different controls",
        "subtitle": "The check position determines whether the body can run zero times.",
        "cards": [
            ("FOR...NEXT", "Use when a counter range controls repetition. Before each iteration, determine whether the next counter value is within the stated bounds.", "FOR I <- 1 TO 5\n    OUTPUT I\nNEXT I", "May run zero times for incompatible bounds."),
            ("WHILE...ENDWHILE", "Use when a condition is checked before every iteration. The body must change something that can make the condition false.", "WHILE Valid = FALSE\n    INPUT Value\n    Valid <- Check(Value)\nENDWHILE", "May run zero times."),
            ("REPEAT...UNTIL", "Use when the body must run before its condition is checked.", "REPEAT\n    INPUT Value\nUNTIL Value >= 0", "Runs at least once."),
        ],
        "footer": "FOR also checks whether an iteration is valid before executing it; it is not guaranteed to run once.",
    },
    "126/java": code_repair(
        "Same decision, different exam language",
        "The Cambridge selection uses THEN, ELSE and ENDIF.",
        "CAMBRIDGE PSEUDOCODE",
        "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
        "JAVA SUPPORT ONLY",
        "if (mark >= 50) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\n        \"Resit needed\");\n}",
        "Mark = 50 follows the THEN branch because the condition uses >=.",
        "Do not omit ENDIF or replace Cambridge keywords with Java braces in an exam answer.",
    ),
    "126/selection": code_repair(
        "Close IF and CASE selections explicitly",
        "Each structure has its own matching closing keyword.",
        "IF SELECTION",
        "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
        "CASE SELECTION",
        "CASE Grade OF\n    \"A\" : OUTPUT \"Excellent\"\n    \"B\" : OUTPUT \"Good\"\n    OTHERWISE : OUTPUT \"Check grade\"\nENDCASE",
        "Use IF for a Boolean condition or range; use CASE for discrete values of one expression.",
        "IF ends with ENDIF; CASE ends with ENDCASE.",
    ),
    "127/case": code_repair(
        "CASE handles discrete values of one expression",
        "OTHERWISE handles unlisted values; ENDCASE closes the structure.",
        "COMPLETE CASE",
        "INPUT Choice\nCASE Choice OF\n    1 : OUTPUT \"Add record\"\n    2 : OUTPUT \"Delete record\"\n    3 : OUTPUT \"Search\"\n    OTHERWISE : OUTPUT \"Invalid choice\"\nENDCASE",
        "BRANCH MAP",
        "Choice = 1  → Add record\nChoice = 2  → Delete record\nChoice = 3  → Search\nAny other   → Invalid choice",
        "Use CASE when one expression is compared with several clean, discrete alternatives.",
        "ENDCASE is the single rejoin point after every CASE branch.",
    ),
    "127/java": code_repair(
        "CASE and switch express the same choices",
        "The pseudocode form must close with ENDCASE.",
        "CAMBRIDGE PSEUDOCODE",
        "CASE Choice OF\n    1 : OUTPUT \"Add\"\n    2 : OUTPUT \"Delete\"\n    OTHERWISE : OUTPUT \"Invalid\"\nENDCASE",
        "JAVA SUPPORT ONLY",
        "switch (choice) {\n    case 1 ->\n        System.out.println(\"Add\");\n    case 2 ->\n        System.out.println(\"Delete\");\n    default ->\n        System.out.println(\"Invalid\");\n}",
        "CASE...OF and ENDCASE are pseudocode; switch, braces and arrows are Java syntax.",
        "Preserve branch meanings while using the required language's closing form.",
    ),
    "129/repeat": code_repair(
        "REPEAT...UNTIL reads once per attempt",
        "Place input inside the post-condition loop—never duplicate it before REPEAT.",
        "GENERAL PATTERN",
        "REPEAT\n    // repeated statements\n    // update a value used by Condition\nUNTIL Condition",
        "INPUT VALIDATION",
        "REPEAT\n    INPUT Mark\nUNTIL Mark >= 0 AND Mark <= 100",
        "For inputs −2 then 65, the loop checks once after each input and stops after 65.",
        "One INPUT occurs per iteration; there is no extra pre-loop INPUT.",
    ),
    "130/parameters": code_repair(
        "Parameters receive values passed by arguments",
        "Selections inside a function or caller still need ENDIF.",
        "FUNCTION",
        "FUNCTION IsPass(Mark : INTEGER)\n    RETURNS BOOLEAN\n    IF Mark >= 50 THEN\n        RETURN TRUE\n    ENDIF\n    RETURN FALSE\nENDFUNCTION",
        "CALL AND USE RESULT",
        "Result <- IsPass(67)\nIF IsPass(StudentMark) THEN\n    OUTPUT \"Pass\"\nENDIF",
        "Mark is the parameter in the header; 67 and StudentMark are arguments supplied at calls.",
        "Close each IF independently; ENDFUNCTION closes only the surrounding function.",
    ),
    "132/shadowing": code_repair(
        "Shadowing requires an explicit local declaration",
        "The local Score hides the global Score only inside the procedure.",
        "COMPLETE EXAMPLE",
        "DECLARE Score : INTEGER\nScore <- 50\n\nPROCEDURE ChangeScore()\n    DECLARE Score : INTEGER\n    Score <- 80\n    OUTPUT Score\nENDPROCEDURE\n\nCALL ChangeScore()\nOUTPUT Score",
        "TRACE",
        "Global Score <- 50\nCALL procedure\n    Local Score <- 80\n    OUTPUT 80\nReturn to main program\nOUTPUT global Score: 50",
        "The same identifier refers to two different storage locations in the two scopes.",
        "Without DECLARE Score inside the procedure, the example does not demonstrate local shadowing.",
    ),
    "133/case": {
        "title": "LCASE and UCASE convert one CHAR",
        "subtitle": "Declare and compare CHAR values with single-quoted literals.",
        "headingSize": 25,
        "bodySize": 22,
        "codeSize": 20,
        "noteSize": 18,
        "cards": [
            ("CODE", "", "DECLARE Answer : CHAR\nINPUT Answer\nAnswer <- UCASE(Answer)\nIF Answer = 'Y' THEN\n    OUTPUT \"Continue\"\nENDIF", "Answer is CHAR."),
            ("TRACE", "", "Input 'y'\n    -> UCASE(CHAR)\nAnswer becomes 'Y'\n    -> comparison true\nOutput \"Continue\"", "UCASE returns CHAR."),
            ("TYPE CHECK", "UCASE accepts CHAR and returns CHAR. It does not accept a STRING expression.", None, "CHAR uses single quotes."),
        ],
        "footer": "CHAR uses single quotes; STRING output uses double quotes. LCASE and UCASE accept CHAR only.",
    },
    "133/concat": {
        "title": "Concatenation joins STRING values",
        "subtitle": "The & operator joins strings; it does not require a CHAR-only case-conversion call.",
        "cards": [
            ("DECLARE STRINGS", "Both variables contain STRING values.", "FirstName <- \"Lin\"\nYearText <- \"2029\"", "Quotes keep 2029 as text."),
            ("CONCATENATE", "Join the two existing STRING values.", "Username <- FirstName & YearText\nOUTPUT Username", "The result is \"Lin2029\"."),
            ("TYPE CHECK", "LCASE and UCASE accept one CHAR, not an entire STRING such as FirstName.", None, "Do not pass FirstName to LCASE."),
        ],
        "footer": "Use & for STRING concatenation. Apply LCASE or UCASE only when the argument and return value are CHAR.",
    },
    "133/java": {
        "title": "MID and Java substring use different positions",
        "subtitle": "MID is in the Cambridge guide; LEFT is not. Follow the notation required by the question.",
        "headingSize": 24,
        "bodySize": 22,
        "codeSize": 20,
        "noteSize": 18,
        "cards": [
            ("CAMBRIDGE GUIDE", "MID uses a start position and a character count.", "Code <- MID(Name, 1, 3)", "Returns the first three characters as STRING."),
            ("JAVA SUPPORT ONLY", "substring uses start index inclusive and end index exclusive.", "String code =\n    name.substring(0, 3);", "Indexes 0, 1 and 2 are returned."),
            ("BOUNDARY", "LEFT is not listed in the pseudocode guide. It may be used only when a question supplies its full signature and position convention.", None, "UCASE also cannot receive STRING."),
        ],
        "footer": "Cambridge: MID(Name, 1, 3). Java support: name.substring(0, 3). Do not combine guide-external LEFT with CHAR-only UCASE.",
    },
    "139/integration": code_repair(
        "Validation and modularity support each other",
        "Write the rule once in a complete function and call it where needed.",
        "FUNCTION",
        "FUNCTION IsValidMark(Mark : INTEGER)\n    RETURNS BOOLEAN\n    IF Mark >= 0 AND Mark <= 100 THEN\n        RETURN TRUE\n    ENDIF\n    RETURN FALSE\nENDFUNCTION",
        "CALLER",
        "INPUT Mark\nIF IsValidMark(Mark) THEN\n    OUTPUT \"Accepted\"\nELSE\n    OUTPUT \"Invalid\"\nENDIF",
        "The inclusive range rule is stored in one testable function instead of being repeated.",
        "ENDIF closes each decision; ENDFUNCTION closes the reusable function.",
    ),
    "139/parameters": {
        "title": "Return values and procedure effects are different",
        "subtitle": "A module should expose only the result or action its responsibility requires.",
        "cards": [
            ("GET VALID MARK", "FUNCTION GetValidMark() RETURNS INTEGER\nInputs and validates until acceptable.\nReturns the valid integer Mark.", None, "Value returned: INTEGER"),
            ("CALCULATE GRADE", "FUNCTION CalculateGrade(Mark : INTEGER) RETURNS CHAR\nUses Mark to choose a grade.\nReturns one grade character.", None, "Value returned: CHAR"),
            ("DISPLAY RESULT", "PROCEDURE DisplayResult(Grade : CHAR)\n    OUTPUT Grade\nENDPROCEDURE\n\nPerforms screen output and returns no value.", None, "Effect: OUTPUT only"),
        ],
        "footer": "GetValidMark and CalculateGrade return values; DisplayResult is a procedure that performs output.",
    },
    "140/loops": {
        "title": "Choose the loop keyword that matches the logic",
        "subtitle": "Known count, pre-condition and post-condition loops have different forms.",
        "cards": [
            ("KNOWN COUNT", "Use FOR when the counter range determines repetition.", "FOR I <- 1 TO 5\n    OUTPUT I\nNEXT I", "No Java for-header in pseudocode."),
            ("PRE-CONDITION", "Use WHILE when the condition must be checked before each iteration.", "WHILE Valid = FALSE\n    INPUT Value\n    Valid <- Check(Value)\nENDWHILE", "May execute zero times."),
            ("POST-CONDITION", "Use REPEAT when the body must run before the condition is checked.", "REPEAT\n    INPUT Value\nUNTIL Value >= 0", "Runs at least once."),
        ],
        "footer": "Cambridge post-condition form is REPEAT → body → UNTIL Condition, not DO...ENDWHILE.",
    },
    "141/fragment": code_repair(
        "A complete fragment has setup, logic and result",
        "Input each array element before testing it; close the nested selection.",
        "PASS-COUNT FRAGMENT",
        "PassCount <- 0\nFOR Index <- 1 TO 10\n    INPUT Marks[Index]\n    IF Marks[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
        "ANATOMY",
        "SETUP      initialise counter\nINPUT      assign current element\nDECISION   test current element\nUPDATE     increment when true\nRESULT     output after loop",
        "A mark of 50 is counted; PassCount is output once after all ten positions.",
        "ENDIF closes the decision before NEXT Index advances the loop.",
    ),
    "141/java": code_repair(
        "Java can support practice; pseudocode is the review form",
        "Both versions close the nested selection before the loop.",
        "JAVA SUPPORT ONLY",
        "int passCount = 0;\nfor (int index = 0;\n     index < 10; index++) {\n    if (marks[index] >= 50) {\n        passCount++;\n    }\n}",
        "CAMBRIDGE PSEUDOCODE",
        "PassCount <- 0\nFOR Index <- 1 TO 10\n    IF Marks[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index",
        "Java uses braces and zero-based positions here; pseudocode uses ENDIF and NEXT.",
        "Keep the algorithm equivalent while using the notation required by the question.",
    ),
    "141/subroutines": code_repair(
        "Functions return values; procedures perform actions",
        "Each subroutine has a complete body and its own closing keyword.",
        "FUNCTION",
        "FUNCTION IsPass(Mark : INTEGER)\n    RETURNS BOOLEAN\n    IF Mark >= 50 THEN\n        RETURN TRUE\n    ENDIF\n    RETURN FALSE\nENDFUNCTION",
        "PROCEDURE",
        "PROCEDURE DisplayResult(\n    Name : STRING,\n    Passed : BOOLEAN)\n    OUTPUT Name\n    OUTPUT Passed\nENDPROCEDURE",
        "IsPass returns a BOOLEAN; DisplayResult performs output and returns no value.",
        "ENDIF closes the decision; ENDFUNCTION and ENDPROCEDURE close different subroutines.",
    ),
    "138/bug": {
        "title": "Analyse and amend an existing program",
        "subtitle": "Preserve existing behaviour while adding a tested enhancement.",
        "cards": [
            ("ANALYSE", "Existing purpose: count marks at least 50.\nInput: Marks[1:30].\nPreserve: PassCount and its boundary.", None, "Trace before editing."),
            ("AMEND", "Declare MeritCount. Initialise it to 0. Inside the existing traversal, increment it when Mark >= 70. Output both counts.", None, "Change all affected parts coherently."),
            ("TEST", "Regression: 49 and 50.\nEnhancement: 69 and 70.\nConfirm the old pass count and new merit count.", None, "New and existing paths must pass."),
        ],
        "footer": "An enhancement adds requested functionality; correcting a fault alone does not satisfy this task.",
    },
    "144/algorithms": {
        "title": "Structure charts, pseudocode and state transitions",
        "subtitle": "Use each design document for its distinct purpose.",
        "headingSize": 22,
        "noteSize": 18,
        "cards": [
            ("STRUCTURE CHART", "Main calls CheckLogin. Label UserID, Password and IsValid on parameter arrows. Boxes are modules; lines show calls.", None, "Hierarchy and interfaces, not processing flow."),
            ("DERIVE PSEUDOCODE", "Turn each box into a complete PROCEDURE or FUNCTION header. In the parent, write matching calls with arguments.", None, "Parameters in headers; arguments in calls."),
            ("STATE TRANSITION", "Start -> LoggedOut. valid login -> LoggedIn. logout -> LoggedOut. three invalid attempts -> Locked.", None, "Directed, event-labelled changes between states."),
        ],
        "footer": "A state-transition diagram is not a flowchart of every statement; it documents persistent states and events.",
    },
    "145/changeover": {
        "title": "Test strategy and test plan are different",
        "subtitle": "One governs the testing approach; the other records individual cases.",
        "cards": [
            ("TEST STRATEGY", "Levels and methods\nResponsibilities\nSequence and resources\nEntry/exit expectations", None, "Project-wide approach."),
            ("TEST PLAN ROW", "ID: T03\nPurpose: upper limit\nData: 30\nExpected: accepted\nActual: accepted\nOutcome: Pass", None, "One recorded test case."),
            ("NOT ENOUGH", "Normal, abnormal and extreme/boundary describe test data. A value list alone has no methods, responsibility, expected/actual comparison or outcome.", None, "Categories do not replace either document."),
        ],
        "footer": "Expected result is stated before execution; pass/fail follows comparison with the actual result.",
    },
    "148/selection": code_repair(
        "Review selection: IF for conditions, CASE for choices",
        "Both examples must have an explicit rejoin point.",
        "IF EXAMPLE",
        "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
        "CASE EXAMPLE",
        "CASE MenuChoice OF\n    1 : CALL AddScore()\n    2 : CALL DisplayScores()\n    3 : CALL SaveScores()\n    OTHERWISE : OUTPUT \"Invalid choice\"\nENDCASE",
        "Use IF for a Boolean condition or range; use CASE for discrete values of one expression.",
        "Every IF ends with ENDIF; every CASE ends with ENDCASE.",
    ),
    "148/subprograms": code_repair(
        "Subprograms reduce repetition and support testing",
        "A procedure performs an action; a function returns a value.",
        "PROCEDURE",
        "PROCEDURE DisplayMessage(\n    Message : STRING)\n    OUTPUT Message\nENDPROCEDURE",
        "FUNCTION",
        "FUNCTION IsValidMark(Mark : INTEGER)\n    RETURNS BOOLEAN\n    IF Mark >= 0 AND Mark <= 100 THEN\n        RETURN TRUE\n    ENDIF\n    RETURN FALSE\nENDFUNCTION",
        "Call DisplayMessage for an action; use IsValidMark when a BOOLEAN result is needed.",
        "ENDIF closes the function's selection before ENDFUNCTION closes the function.",
    ),
})

for current_key, source_key in {
    "050/concept": "049/concept",
    "108/pseudocode": "107/pseudocode",
    "122/parse": "121/parse",
    "122/pseudocode": "121/pseudocode",
    "122/types": "121/types",
    "134/case": "133/case",
    "134/concat": "133/concat",
    "134/java": "133/java",
    "139/bug": "138/bug",
    "145/algorithms": "144/algorithms",
    "146/changeover": "145/changeover",
}.items():
    SPECS[current_key] = SPECS[source_key]


def render(key: str, spec: dict, destination: Path) -> None:
    image = Image.new("RGB", (1536, 1024), PAPER)
    draw = ImageDraw.Draw(image)
    title_size = 58
    while title_size > 42 and draw.textlength(spec["title"], font=font(title_size, bold=True)) > 1416:
        title_size -= 2
    draw.text((60, 46), spec["title"], font=font(title_size, bold=True), fill=NAVY)
    draw.text((62, 122), spec["subtitle"], font=font(27), fill=MUTED)
    draw.line((60, 168, 1476, 168), fill=BLUE, width=4)

    gap = 24
    card_width = (1416 - gap * 2) // 3
    for index, card in enumerate(spec["cards"]):
        x1 = 60 + index * (card_width + gap)
        draw_card(
            draw,
            (x1, 194, x1 + card_width, 852),
            index,
            *card,
            numbered=spec.get("numbered", True),
            heading_size=spec.get("headingSize", 30),
            body_size=spec.get("bodySize", 26),
            code_size=spec.get("codeSize", 25),
            note_size=spec.get("noteSize", 21),
        )

    for source, target in spec.get("edges", []):
        edge = (source, target)
        if edge not in {("card-1", "card-2"), ("card-2", "card-3")}:
            raise ValueError(f"Unsupported directed edge for {key}: {source} -> {target}")
        index = 0 if edge == ("card-1", "card-2") else 1
        x1 = 60 + (index + 1) * card_width + index * gap + 4
        x2 = x1 + gap - 8
        y = 522
        draw.line((x1, y, x2, y), fill=BLUE, width=5)
        draw.polygon(((x2, y), (x2 - 11, y - 8), (x2 - 11, y + 8)), fill=BLUE)

    draw.rounded_rectangle((60, 880, 1476, 970), radius=18, fill="#EAF1FA", outline="#AFC3DD", width=2)
    draw.text((88, 899), "KEY CHECK", font=font(22, bold=True), fill=BLUE)
    draw_text_block(draw, (235, 896), spec["footer"], font(25, bold=True), 1208, fill=NAVY, spacing=7)

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, format="JPEG", quality=91, optimize=True, progressive=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", type=Path, default=Path("/private/tmp/stage10-critical-repairs"))
    parser.add_argument("--apply", action="store_true", help="Write directly to the project asset directory.")
    parser.add_argument("--keys", help="Comma-separated lesson/target keys; defaults to every repair spec.")
    args = parser.parse_args()
    output_dir = ASSET_DIR if args.apply else args.output_dir
    selected = args.keys.split(",") if args.keys else list(SPECS)
    unknown = [key for key in selected if key not in SPECS]
    if unknown:
        raise ValueError(f"Unknown repair keys: {', '.join(unknown)}")
    for key in selected:
        spec = SPECS[key]
        lesson, target = key.split("/")
        render(key, spec, output_dir / f"stage10-lesson-{lesson}-{target}.jpg")
    print(f"Rendered {len(selected)} deterministic semantic repairs to {output_dir}")


if __name__ == "__main__":
    main()
