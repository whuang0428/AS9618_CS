"""Execute the portable teaching SQL; check result rows and declared schema.

SQLite does not implement CREATE DATABASE or enforce all declared SQL types.
Those statements/types receive structural checks, not a claim of runtime support.
"""
import json
import re
import sqlite3
import sys


def verify(payload):
    checked = 0
    for name, case in payload["cases"].items():
        con = sqlite3.connect(":memory:")
        con.execute("PRAGMA foreign_keys = ON")
        con.executescript(payload["databases"][case["database"]]["setup"])
        con.executescript(case.get("setup", ""))
        if "inspect" in case:
            con.executescript(case["sql"])
            rows = con.execute(case["inspect"]).fetchall()
        else:
            cursor = con.execute(case["sql"])
            rows = cursor.fetchall()
            assert [c[0] for c in cursor.description] == case["headers"], f"{name}: output columns"
        assert [list(r) for r in rows] == case["expectedRows"], f"{name}: result {rows!r}"
        assert not con.execute("PRAGMA foreign_key_check").fetchall(), f"{name}: orphan record"
        con.close()
        checked += 1
    for name, database in payload["databases"].items():
        con = sqlite3.connect(":memory:")
        con.executescript(database["setup"])
        for table in database.get("tables", []):
            names = [re.sub(r" \((?:PK|FK)\)$", "", h) for h in table["headers"]]
            assert all(re.fullmatch(r"[A-Za-z]+", n) for n in names + [table["title"]])
            actual = con.execute(f'SELECT {", ".join(names)} FROM {table["title"]} ORDER BY {names[0]}').fetchall()
            expected = [[1 if v == "TRUE" else 0 if v == "FALSE" else v for v in row] for row in table["rows"]]
            assert [list(r) for r in actual] == expected, f"{name}: displayed input does not match SQL fixture"
        con.close()
    ddl = payload["ddl"]
    for code in [ddl["database"], payload["createDatabaseAnswer"]]:
        assert re.fullmatch(r"CREATE DATABASE [A-Za-z][A-Za-z0-9_]*;", code), "Invalid CREATE DATABASE form"
    con = sqlite3.connect(":memory:")
    con.execute("PRAGMA foreign_keys = ON")
    con.executescript(ddl["tables"])
    columns = {r[1]: r[2] for r in con.execute("PRAGMA table_info(Student)")}
    assert columns == {"StudentID":"INTEGER", "Initial":"CHARACTER(1)", "StudentName":"VARCHAR(40)", "Active":"BOOLEAN", "Score":"REAL", "BirthDate":"DATE", "ArrivalTime":"TIME", "TutorID":"INTEGER"}, "Student fields/types"
    con.execute("INSERT INTO Tutor VALUES (7, 'Reza')")
    con.execute("INSERT INTO Student (StudentID, TutorID) VALUES (21, 7)")
    con.executescript(ddl["alter"])
    assert con.execute("SELECT StudentID, TutorID, Email FROM Student").fetchall() == [(21, 7, None)], "ALTER must preserve rows and add an initially null field"
    rejected = 0
    for statement in ["INSERT INTO Student (StudentID, TutorID) VALUES (21, 7)", "INSERT INTO Student (StudentID, TutorID) VALUES (22, 999)", "DELETE FROM Tutor WHERE TutorID = 7"]:
        try:
            con.execute(statement)
        except sqlite3.IntegrityError:
            rejected += 1
        else:
            raise AssertionError(f"Constraint accepted invalid change: {statement}")
    con.executescript(ddl["practiceTable"] + ddl["practiceAlter"] + ddl["practiceKey"] + ddl["practiceForeign"] + ddl["examTables"] + ddl["examAlter"])
    assert dict((r[1], r[2]) for r in con.execute("PRAGMA table_info(Event)")) == {"EventID":"INTEGER", "Code":"CHARACTER(1)", "EventName":"VARCHAR(30)", "Confirmed":"BOOLEAN", "Duration":"REAL", "EventDate":"DATE", "StartTime":"TIME", "Room":"VARCHAR(12)"}
    for table, field in [("Tutor","TutorID"),("Student","StudentID"),("Locker","LockerID"),("Allocation","AllocationID"),("Venue","VenueID"),("Booking","BookingID")]:
        assert [r[1] for r in con.execute(f"PRAGMA table_info({table})") if r[5]] == [field], f"{table}: primary key"
    for child, parent, field in [("Student","Tutor","TutorID"),("Allocation","Locker","LockerID"),("Booking","Venue","VenueID")]:
        assert [(r[2],r[3],r[4]) for r in con.execute(f"PRAGMA foreign_key_list({child})")] == [(parent,field,field)], f"{child}: reference"
    reading = sqlite3.connect(":memory:")
    reading.executescript(payload["databases"]["books"]["setup"])
    assert reading.execute(payload["readPractice"]).fetchall() == [("Map",),("Atlas",)], "SQL reading practice result"
    assert reading.execute(payload["readPractice"].replace("'Reference'", "'Fiction'")).fetchall() == [("Orbit",),("River",)], "SQL reading changed condition"
    print(f"S8 SQL: {checked} executable result/state cases; displayed datasets match; DDL fields, keys, ALTER and {rejected} rejected constraint violations checked. CREATE DATABASE syntax checked separately.")


if __name__ == "__main__":
    verify(json.load(sys.stdin))
