"""Execute the published S10 pseudocode subset using in-memory input and files.

This deliberately checks bounds, initialisation, field types and file modes.
It is a verifier for these examples, not a general Cambridge language runtime.
"""
import ast
import copy
import json
import re
import sys
from types import SimpleNamespace

UNSET = object()


def typed(value, kind):
    valid = {
        "INTEGER": type(value) is int,
        "REAL": type(value) in (int, float),
        "BOOLEAN": type(value) is bool,
        "CHAR": isinstance(value, str) and len(value) == 1,
        "STRING": isinstance(value, str),
    }
    assert valid.get(kind, False), f"Invalid {kind} value: {value!r}"
    return value


class Array:
    def __init__(self, bounds, kind):
        self.bounds, self.kind, self.values = bounds, kind, {}

    def key(self, index):
        key = index if isinstance(index, tuple) else (index,)
        assert len(key) == len(self.bounds), "Wrong number of indices"
        assert all(type(i) is int and lo <= i <= hi for i, (lo, hi) in zip(key, self.bounds)), f"Out-of-range array access: {key}"
        return key

    def __getitem__(self, index):
        key = self.key(index)
        assert key in self.values, f"Uninitialised element: {key}"
        return self.values[key]

    def __setitem__(self, index, value):
        self.values[self.key(index)] = typed(value, self.kind)


def parse(code):
    lines = [line.strip() for line in code.splitlines() if line.strip() and not line.strip().startswith("//")]
    position = 0

    def block(stops=()):
        nonlocal position
        nodes = []
        while position < len(lines) and lines[position].split()[0] not in stops:
            line = lines[position]
            position += 1
            if line.startswith("FOR "):
                match = re.fullmatch(r"FOR (\w+) <- (.+) TO (.+)", line)
                assert match and not line.endswith(" DO"), f"Invalid FOR syntax: {line}"
                body = block(("NEXT",))
                assert position < len(lines) and lines[position] == f"NEXT {match[1]}", "Mismatched NEXT"
                position += 1
                nodes.append(("for", match.groups(), body))
            elif line.startswith("WHILE "):
                assert not line.endswith(" DO"), "Unexpected DO in WHILE"
                body = block(("ENDWHILE",))
                assert position < len(lines) and lines[position] == "ENDWHILE", "Missing ENDWHILE"
                position += 1
                nodes.append(("while", line[6:], body))
            elif line.startswith("IF "):
                assert line.endswith(" THEN"), "Missing THEN"
                yes, no = block(("ELSE", "ENDIF")), []
                if position < len(lines) and lines[position] == "ELSE":
                    position += 1
                    no = block(("ENDIF",))
                assert position < len(lines) and lines[position] == "ENDIF", "Missing ENDIF"
                position += 1
                nodes.append(("if", line[3:-5], yes, no))
            elif line.startswith("TYPE "):
                fields = []
                while position < len(lines) and lines[position] != "ENDTYPE":
                    match = re.fullmatch(r"DECLARE (\w+) : (\w+)", lines[position])
                    assert match, "Invalid record field declaration"
                    fields.append(match.groups())
                    position += 1
                assert position < len(lines), "Missing ENDTYPE"
                position += 1
                nodes.append(("type", line[5:], fields))
            else:
                nodes.append(("statement", line))
        return nodes

    nodes = block()
    assert position == len(lines), "Unexpected block terminator"
    return nodes


def execute(code, inputs=(), files=None):
    variables, kinds, record_types, opened = {}, {}, {}, {}
    inputs, output, files = iter(inputs), [], copy.deepcopy(files or {})
    steps = 0

    def evaluate(expression):
        # Rewrite keywords outside literals only; strings remain unchanged.
        chunks = re.split(r'("[^"\n]*"|\x27[^\x27\n]*\x27)', expression)
        for i in range(0, len(chunks), 2):
            text = chunks[i].replace("<>", "!=")
            text = re.sub(r"(?<![<>!=])=(?!=)", "==", text)
            for before, after in {"TRUE": "True", "FALSE": "False", "AND": "and", "OR": "or", "NOT": "not"}.items():
                text = re.sub(rf"\b{before}\b", after, text)
            chunks[i] = text
        tree = ast.parse("".join(chunks).strip(), mode="eval").body

        def value(node):
            if isinstance(node, ast.Constant):
                result = node.value
            elif isinstance(node, ast.Name):
                assert node.id in variables, f"Undeclared identifier: {node.id}"
                result = variables[node.id]
            elif isinstance(node, ast.Attribute):
                result = getattr(value(node.value), node.attr)
            elif isinstance(node, ast.Tuple):
                result = tuple(value(item) for item in node.elts)
            elif isinstance(node, ast.Subscript):
                result = value(node.value)[value(node.slice)]
            elif isinstance(node, ast.BinOp):
                a, b = value(node.left), value(node.right)
                operations = {ast.Add: lambda: a + b, ast.Sub: lambda: a - b, ast.Mult: lambda: a * b}
                assert type(node.op) in operations, "Unsupported arithmetic"
                result = operations[type(node.op)]()
            elif isinstance(node, ast.UnaryOp):
                v = value(node.operand)
                assert isinstance(node.op, (ast.Not, ast.USub)), "Unsupported unary operation"
                result = not v if isinstance(node.op, ast.Not) else -v
            elif isinstance(node, ast.BoolOp):
                # Evaluate both operands, so safety cannot rely on short-circuiting.
                values = [value(item) for item in node.values]
                result = all(values) if isinstance(node.op, ast.And) else any(values)
            elif isinstance(node, ast.Compare):
                assert len(node.ops) == 1, "Unsupported chained comparison"
                a, b = value(node.left), value(node.comparators[0])
                operations = {ast.Eq: lambda: a == b, ast.NotEq: lambda: a != b, ast.Gt: lambda: a > b, ast.GtE: lambda: a >= b, ast.Lt: lambda: a < b, ast.LtE: lambda: a <= b}
                result = operations[type(node.ops[0])] ()
            elif isinstance(node, ast.Call):
                assert isinstance(node.func, ast.Name) and node.func.id == "EOF" and len(node.args) == 1, "Unsupported function"
                name = value(node.args[0])
                assert name in opened and opened[name][0] == "READ", "EOF needs a file open for READ"
                result = opened[name][1] >= len(files[name])
            else:
                raise AssertionError(f"Unsupported expression: {ast.dump(node)}")
            assert result is not UNSET, "Uninitialised value"
            return result

        return value(tree)

    def save(target, val):
        if "[" in target:
            name, indices = target.split("[", 1)
            variables[name][evaluate(indices[:-1])] = val
        elif "." in target:
            name, field = target.split(".")
            kind = dict(record_types[kinds[name]])[field]
            setattr(variables[name], field, typed(val, kind))
        else:
            assert target in kinds, f"Assignment to undeclared identifier: {target}"
            variables[target] = typed(val, kinds[target])

    def run(nodes):
        nonlocal steps
        for node in nodes:
            steps += 1
            assert steps < 20000, "Execution did not terminate"
            kind, *args = node
            if kind == "type":
                record_types[args[0]] = args[1]
            elif kind == "for":
                (name, low, high), body = args
                for index in range(evaluate(low), evaluate(high) + 1):
                    save(name, index)
                    run(body)
            elif kind == "while":
                while evaluate(args[0]):
                    steps += 1
                    assert steps < 20000, "Loop did not terminate"
                    run(args[1])
            elif kind == "if":
                run(args[1] if evaluate(args[0]) else args[2])
            else:
                line = args[0]
                if line.startswith("DECLARE "):
                    match = re.fullmatch(r"DECLARE (\w+) : (.+)", line)
                    assert match, "Invalid declaration"
                    name, data_type = match.groups()
                    assert name not in kinds, f"Duplicate declaration: {name}"
                    kinds[name] = data_type
                    array = re.fullmatch(r"ARRAY\[(.+)\] OF (\w+)", data_type)
                    if array:
                        bounds = [tuple(map(int, item.strip().split(":"))) for item in array[1].split(",")]
                        variables[name] = Array(bounds, array[2])
                    elif data_type in record_types:
                        variables[name] = SimpleNamespace(**{field: UNSET for field, _ in record_types[data_type]})
                    else:
                        variables[name] = UNSET
                elif line.startswith("INPUT "):
                    save(line[6:], next(inputs))
                elif line.startswith("OUTPUT "):
                    output.append(evaluate(line[7:]))
                elif line.startswith("OPENFILE "):
                    match = re.fullmatch(r'OPENFILE ("[^"]+") FOR (READ|WRITE|APPEND)', line)
                    assert match, "Invalid OPENFILE"
                    name, mode = evaluate(match[1]), match[2]
                    assert name not in opened, "File already open"
                    if mode == "READ":
                        assert name in files, "Input file is absent"
                    elif mode == "WRITE":
                        files[name] = []
                    else:
                        files.setdefault(name, [])
                    opened[name] = [mode, 0]
                elif line.startswith(("READFILE ", "WRITEFILE ")):
                    operation, arguments = line.split(" ", 1)
                    filename, target = arguments.split(",", 1)
                    filename, target = evaluate(filename), target.strip()
                    assert filename in opened, "File is not open"
                    mode, position = opened[filename]
                    if operation == "READFILE":
                        assert mode == "READ" and position < len(files[filename]), "Read beyond EOF or wrong mode"
                        save(target, files[filename][position])
                        opened[filename][1] += 1
                    else:
                        assert mode in ("WRITE", "APPEND"), "Write with wrong mode"
                        files[filename].append(typed(evaluate(target), "STRING"))
                elif line.startswith("CLOSEFILE "):
                    filename = evaluate(line[10:])
                    assert filename in opened, "Closing unopened file"
                    del opened[filename]
                elif " <- " in line:
                    target, expression = line.split(" <- ", 1)
                    save(target, evaluate(expression))
                else:
                    raise AssertionError(f"Unsupported statement: {line}")

    run(parse(code))
    assert not opened, f"Unclosed files: {list(opened)}"
    assert next(inputs, UNSET) is UNSET, "Unused supplied inputs"
    return output, files, variables


def verify(payload):
    programs = payload["programs"]
    count = 0

    def case(key, inputs=(), files=None, output=None, final_files=None):
        nonlocal count
        result, contents, state = execute(programs[key], inputs, files)
        if output is not None:
            assert result == output, f"{key}: {result!r} != {output!r}"
        if final_files is not None:
            assert contents == final_files, f"{key}: wrong file contents {contents!r}"
        count += 1
        return state

    for name, year in [("Mina", 11), ("Tariq", 9)]:
        case("record", [name, year], output=[name, year + 1, False])
    for values in [[6, 9, 4, 7], [5, 0, 8, 2], [0, 0, 0, 0], [-2, -3, -1, -4]]:
        case("arrayTotal", values, output=[sum(values), values[2]])
        case("arrayMaximum", values, output=[max(values)])
    case("arrayMaximum", [1.2, 4.75, 2.1, 4.75], output=[4.75])
    for values in [[4, 7, 2, 8, 1, 6], [2, 3, 5, 1, 0, 4], [0] * 6, [-1, 2, -3, 4, -5, 6]]:
        case("array2D", values, output=[sum(values[:3]), sum(values[3:])])
        case("columnTotals", values, output=[values[i] + values[i + 3] for i in range(3)])
    for values in [[9, 4, 6, 4, 2], [8, 3, 5, 3, 1], [11, 7, 9, 2, 6], [21, 9, 14, 9, 30], [0] * 5]:
        for target in [values[0], values[-1], values[1], 99]:
            expected = values.index(target) + 1 if target in values else 0
            case("linear", values + [target], output=[expected])
    for values in [[5, 1, 4, 2, 8, 3, 7], list(range(7)), list(range(7, 0, -1)), [3] * 7, [-3, 2, 0, -3, 8, 1, 2]]:
        case("bubble", values, output=sorted(values))
    for values in [[4, -1, 4, 0, 2], [1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [3] * 5, [-9, -2, -7, -2, -5]]:
        case("bubbleDescending", values, output=sorted(values, reverse=True))
    for lines in [[], ["Ari"], ["Ari", "", "Bo"], ["", ""], ["Red", "", "Blue"]]:
        case("readFile", files={"Names.txt": lines}, output=lines + [len(lines)])
        case("filterFile", files={"Names.txt": lines, "NonEmpty.txt": ["old"]}, final_files={"Names.txt": lines, "NonEmpty.txt": [line for line in lines if line != ""]})
    case("writeFile", ["Ada", "Ben", "Cy"], {"Names.txt": ["Old"]}, final_files={"Names.txt": ["Ada", "Ben", "Cy"]})
    case("appendFile", ["Dia"], {"Names.txt": ["Ada", "Ben", "Cy"]}, final_files={"Names.txt": ["Ada", "Ben", "Cy", "Dia"]})
    case("appendFile", ["First"], {}, final_files={"Names.txt": ["First"]})
    for code in payload["inlinePrograms"]:
        inputs = ["0071", 2.75] if "INPUT Sensor.Code" in code else []
        result, _, state = execute(code, inputs)
        if inputs:
            assert result == [2.75] and state["Sensor"].Code == "0071" and state["Sensor"].Valid is True
        count += 1
    mutations = [
        (programs["arrayTotal"].replace("TO 4", "TO 5"), [1, 2, 3, 4, 5], None),
        (programs["array2D"].replace("Scores[Row, Column]", "Scores[Column, Row]"), [1, 2, 3, 4, 5, 6], None),
        (programs["record"].replace("Member.FeesPaid <- FALSE", 'Member.FeesPaid <- "FALSE"'), ["Jo", 10], None),
        (programs["arrayTotal"].replace("NEXT Index", "NEXT Column"), [1, 2, 3, 4], None),
        (programs["writeFile"].replace("FOR WRITE", "FOR READ"), ["A", "B", "C"], {"Names.txt": []}),
        (programs["readFile"].replace('CLOSEFILE "Names.txt"', ""), [], {"Names.txt": []}),
        (programs["arrayTotal"].replace("Total <- 0\n", ""), [1, 2, 3, 4], None),
    ]
    for code, inputs, files in mutations:
        try:
            execute(code, inputs, files)
        except (AssertionError, KeyError, TypeError):
            continue
        raise AssertionError("Verifier accepted a deliberately invalid program")
    # Wrong-but-executable variants must fail the independent expected results.
    result, _, _ = execute(programs["bubble"].replace("Values[Index + 1] <- Temp", "Values[Index + 1] <- Values[Index]"), [5, 1, 4, 2, 8, 3, 7])
    assert result != [1, 2, 3, 4, 5, 7, 8], "Lost swap value was not detected"
    result, _, _ = execute(programs["linear"].replace("Index <= 5", "Index < 5"), [1, 2, 3, 4, 5, 5])
    assert result != [5], "Missing final search element was not detected"
    print(json.dumps({"program_cases": count, "negative_cases": len(mutations) + 2}))


if __name__ == "__main__":
    verify(json.load(sys.stdin))
