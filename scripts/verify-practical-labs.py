"""Compile the downloadable Java starters/solutions and check independent results.

Uses the local JDK and temporary output directories; never writes class files or
experimental data beside course sources.
"""
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
LABS = ROOT / "web/resources/practical-labs"
CASES = {
    "ArraysLab": [
        ("4 7 2 8 1 6", ["13", "15"], ["12", "8", "8"]),
        ("0 0 0 0 0 0", ["0", "0"], ["0", "0", "0"]),
        ("-1 2 -3 4 -5 6", ["-2", "5"], ["3", "-3", "3"]),
    ],
    "SortingLab": [
        ("4 -1 4 0 2", ["-1", "0", "2", "4", "4"], ["4", "4", "2", "0", "-1"]),
        ("1 2 3 4 5", ["1", "2", "3", "4", "5"], ["5", "4", "3", "2", "1"]),
        ("5 4 3 2 1", ["1", "2", "3", "4", "5"], ["5", "4", "3", "2", "1"]),
        ("3 3 3 3 3", ["3"] * 5, ["3"] * 5),
        ("-9 -2 -7 -2 -5", ["-9", "-7", "-5", "-2", "-2"], ["-2", "-2", "-5", "-7", "-9"]),
    ],
    "SubprogramsLab": [
        ("-1 0 50 101 100", ["50.0"], ["50.0", "2"]),
        ("0 0 0", ["0.0"], ["0.0", "0"]),
        ("49 50 51", ["50.0"], ["50.0", "2"]),
        ("1 1 2", [str(4 / 3)], [str(4 / 3), "0"]),
        ("100 100 100", ["100.0"], ["100.0", "3"]),
    ],
    "TestingLab": [
        ("49 50 69 70", ["3"], ["3", "1"]),
        ("70 80 90 100", ["4"], ["4", "4"]),
        ("0 0 0 0", ["0"], ["0", "0"]),
        ("50 50 50 50", ["4"], ["4", "0"]),
    ],
}


def run(classes, name, folder, data="", args=(), check=True):
    return subprocess.run(["java", "-cp", str(classes), name, *map(str, args)],
                          input=data, text=True, capture_output=True,
                          cwd=folder, timeout=10, check=check)


def main():
    passed = 0
    with tempfile.TemporaryDirectory(prefix="as9618-java-") as directory:
        temp = Path(directory)
        for version, variant in enumerate([LABS, LABS / "solutions"]):
            classes = temp / f"classes-{version}"
            classes.mkdir()
            subprocess.run(["javac", "--release", "17", "-d", str(classes),
                            *map(str, sorted(variant.glob("*.java")))], check=True,
                           capture_output=True, text=True, timeout=30)
            for name, cases in CASES.items():
                for data, starter, solution in cases:
                    actual = run(classes, name, temp, data).stdout.splitlines()
                    assert actual == (starter if version == 0 else solution), (name, data, actual)
                    passed += 1
            for index, content in enumerate(["Ada\n\nBo\n", "", "\n\n", " A \n\nB", "夏\n冬\n"]):
                source = temp / f"source-{version}-{index}.txt"
                output = temp / f"output-{version}-{index}.txt"
                source.write_text(content, encoding="utf-8")
                lines = content.splitlines()
                expected = lines if version == 0 else [line for line in lines if line != ""]
                result = run(classes, "FilesLab", temp, args=[source, output])
                assert result.stdout.strip() == str(len(expected))
                assert output.read_text(encoding="utf-8").splitlines() == expected
                assert source.read_text(encoding="utf-8") == content
                passed += 1
                before = output.read_bytes()
                assert run(classes, "FilesLab", temp, args=[source, output], check=False).returncode != 0
                assert output.read_bytes() == before
                assert run(classes, "FilesLab", temp, args=[source, source], check=False).returncode != 0
                assert source.read_text(encoding="utf-8") == content
                passed += 2
        # Check that the stated experiments really expose the named defects.
        mutations = [
            ("SubprogramsLab", "total = add(total, mark);", "add(total, mark);", "0 50 100", ["50.0", "2"]),
            ("TestingLab", "if (mark >= 70)", "else if (mark >= 70)", "70 80 90 100", ["4", "4"]),
            ("SortingLab", "values[index + 1] = temp;", "values[index + 1] = values[index];", "4 -1 4 0 2", ["4", "4", "2", "0", "-1"]),
        ]
        for name, before, after, data, expected in mutations:
            folder = temp / name
            folder.mkdir()
            code = (LABS / "solutions" / f"{name}.java").read_text()
            assert before in code
            changed = folder / f"{name}.java"
            changed.write_text(code.replace(before, after))
            subprocess.run(["javac", "-d", str(folder), str(changed)], check=True,
                           capture_output=True, text=True, timeout=30)
            assert run(folder, name, folder, data).stdout.splitlines() != expected
    print(f"Java practicals verified: 10 compilable files; {passed} output/file-protection cases; 3 deliberate faults exposed.")


if __name__ == "__main__":
    main()
