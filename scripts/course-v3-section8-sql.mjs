// Shared SQL examples and supplied data used in the lessons.
export const section8Databases = {
  library: {
    setup: `CREATE TABLE Member (MemberID INTEGER PRIMARY KEY, MemberName VARCHAR(40), Active BOOLEAN);
CREATE TABLE Loan (LoanID INTEGER PRIMARY KEY, MemberID INTEGER REFERENCES Member(MemberID), Fee REAL, Returned BOOLEAN);
INSERT INTO Member VALUES (1, 'Asha', TRUE), (2, 'Ben', TRUE), (3, 'Chen', FALSE), (4, 'Dara', TRUE);
INSERT INTO Loan VALUES (201, 1, 2, FALSE), (202, 1, 4, TRUE), (203, 2, 6, FALSE), (204, 3, 0, TRUE), (205, 2, 3, FALSE);`,
    tables: [
      { title: "Member", headers: ["MemberID (PK)", "MemberName", "Active"], rows: [[1,"Asha","TRUE"],[2,"Ben","TRUE"],[3,"Chen","FALSE"],[4,"Dara","TRUE"]] },
      { title: "Loan", headers: ["LoanID (PK)", "MemberID (FK)", "Fee", "Returned"], rows: [[201,1,2,"FALSE"],[202,1,4,"TRUE"],[203,2,6,"FALSE"],[204,3,0,"TRUE"],[205,2,3,"FALSE"]] },
    ],
  },
  books: {
    setup: `CREATE TABLE Book (BookID INTEGER PRIMARY KEY, Title VARCHAR(40), Category VARCHAR(20), Price REAL);
CREATE TABLE Sale (SaleID INTEGER PRIMARY KEY, BookID INTEGER REFERENCES Book(BookID), Quantity INTEGER);
INSERT INTO Book VALUES (1, 'Atlas', 'Reference', 14), (2, 'Orbit', 'Fiction', 8), (3, 'River', 'Fiction', 10), (4, 'Map', 'Reference', 6);
INSERT INTO Sale VALUES (11, 1, 3), (12, 2, 2), (13, 3, 4), (14, 1, 1), (15, 4, 2);`,
    tables: [
      { title: "Book", headers: ["BookID (PK)", "Title", "Category", "Price"], rows: [[1,"Atlas","Reference",14],[2,"Orbit","Fiction",8],[3,"River","Fiction",10],[4,"Map","Reference",6]] },
      { title: "Sale", headers: ["SaleID (PK)", "BookID (FK)", "Quantity"], rows: [[11,1,3],[12,2,2],[13,3,4],[14,1,1],[15,4,2]] },
    ],
  },
  shop: {
    setup: `CREATE TABLE Category (CategoryID INTEGER PRIMARY KEY, CategoryName VARCHAR(30));
CREATE TABLE Product (ProductID INTEGER PRIMARY KEY, ProductName VARCHAR(30), CategoryID INTEGER REFERENCES Category(CategoryID), Price REAL, Available BOOLEAN);
INSERT INTO Category VALUES (1, 'Stationery'), (2, 'Accessories');
INSERT INTO Product VALUES (51, 'Pencil', 1, 2, TRUE), (52, 'Notebook', 1, 7, TRUE), (53, 'Mouse', 2, 25, TRUE), (54, 'Cable', 2, 9, FALSE);`,
    tables: [
      { title: "Category", headers: ["CategoryID (PK)", "CategoryName"], rows: [[1,"Stationery"],[2,"Accessories"]] },
      { title: "Product", headers: ["ProductID (PK)", "ProductName", "CategoryID (FK)", "Price", "Available"], rows: [[51,"Pencil",1,2,"TRUE"],[52,"Notebook",1,7,"TRUE"],[53,"Mouse",2,25,"TRUE"],[54,"Cable",2,9,"FALSE"]] },
    ],
  },
  payments: {
    setup: `CREATE TABLE Payment (PaymentID INTEGER PRIMARY KEY, Branch VARCHAR(20), Amount REAL);
INSERT INTO Payment VALUES (1,'North',10),(2,'South',15),(3,'North',20),(4,'South',5),(5,'South',10);`,
    tables: [{ title: "Payment", headers: ["PaymentID (PK)", "Branch", "Amount"], rows: [[1,"North",10],[2,"South",15],[3,"North",20],[4,"South",5],[5,"South",10]] }],
  },
  stock: { setup: "CREATE TABLE Stock (StockID INTEGER PRIMARY KEY, ItemName VARCHAR(30), Quantity INTEGER); INSERT INTO Stock VALUES (30,'Cable',6),(31,'Adapter',2);" },
  reservations: { setup: "CREATE TABLE Reservation (ReservationID INTEGER PRIMARY KEY, GuestName VARCHAR(30), Confirmed BOOLEAN); INSERT INTO Reservation VALUES (80,'Tariq',TRUE);" },
  empty: { setup: "" },
  festival: {
    setup: "CREATE TABLE Stall (StallID INTEGER PRIMARY KEY, StallName VARCHAR(30)); CREATE TABLE Receipt (ReceiptID INTEGER PRIMARY KEY, StallID INTEGER REFERENCES Stall(StallID), Amount REAL, Paid BOOLEAN); INSERT INTO Stall VALUES (1,'Art'),(2,'Food'),(3,'Games'); INSERT INTO Receipt VALUES (10,1,12,TRUE),(11,2,5,TRUE),(12,1,8,FALSE),(13,2,7,TRUE);",
    tables: [
      {title:"Stall",headers:["StallID (PK)","StallName"],rows:[[1,"Art"],[2,"Food"],[3,"Games"]]},
      {title:"Receipt",headers:["ReceiptID (PK)","StallID (FK)","Amount","Paid"],rows:[[10,1,12,"TRUE"],[11,2,5,"TRUE"],[12,1,8,"FALSE"],[13,2,7,"TRUE"]]},
    ],
  },
  hotel: {
    setup: "CREATE TABLE Room (RoomID INTEGER PRIMARY KEY, RoomType VARCHAR(20)); CREATE TABLE Stay (StayID INTEGER PRIMARY KEY, RoomID INTEGER REFERENCES Room(RoomID), Nights INTEGER); INSERT INTO Room VALUES (101,'Single'),(102,'Double'); INSERT INTO Stay VALUES (1,101,2),(2,102,5),(3,101,4);",
    tables: [
      {title:"Room",headers:["RoomID (PK)","RoomType"],rows:[[101,"Single"],[102,"Double"]]},
      {title:"Stay",headers:["StayID (PK)","RoomID (FK)","Nights"],rows:[[1,101,2],[2,102,5],[3,101,4]]},
    ],
  },
};
const query = (database, sql, headers, expectedRows) => ({ database, sql, headers, expectedRows });
const change = (database, sql, inspect, expectedRows) => ({ database, sql, inspect, expectedRows });
export const section8SqlCases = {
  read: query("books", "SELECT Title, Price\nFROM Book\nWHERE Price >= 10\nORDER BY BookID;", ["Title", "Price"], [["Atlas",14],["River",10]]),
  select: query("library", "SELECT MemberName\nFROM Member\nORDER BY MemberID;", ["MemberName"], [["Asha"],["Ben"],["Chen"],["Dara"]]),
  filter: query("library", "SELECT LoanID, Fee\nFROM Loan\nWHERE Returned = FALSE AND Fee >= 3\nORDER BY LoanID;", ["LoanID", "Fee"], [[203,6],[205,3]]),
  sort: query("library", "SELECT LoanID, Fee\nFROM Loan\nORDER BY Fee DESC, LoanID ASC;", ["LoanID", "Fee"], [[203,6],[202,4],[205,3],[201,2],[204,0]]),
  group: query("library", "SELECT MemberID, COUNT(*) AS LoanCount\nFROM Loan\nGROUP BY MemberID\nORDER BY MemberID;", ["MemberID", "LoanCount"], [[1,2],[2,2],[3,1]]),
  join: query("library", "SELECT Member.MemberName, Loan.LoanID\nFROM Member INNER JOIN Loan\nON Member.MemberID = Loan.MemberID\nORDER BY Loan.LoanID;", ["MemberName", "LoanID"], [["Asha",201],["Asha",202],["Ben",203],["Chen",204],["Ben",205]]),
  aggregate: query("library", "SELECT SUM(Fee) AS TotalFee, COUNT(*) AS LoanCount, AVG(Fee) AS MeanFee\nFROM Loan;", ["TotalFee", "LoanCount", "MeanFee"], [[15,5,3]]),
  nullAggregate: query("empty", "SELECT COUNT(*) AS Rows, COUNT(Fee) AS KnownFees, SUM(Fee) AS Total, AVG(Fee) AS Mean\nFROM FeeSample;", ["Rows", "KnownFees", "Total", "Mean"], [[3,2,6,3]]),
  insert: change("library", "INSERT INTO Member (MemberID, MemberName, Active)\nVALUES (5, 'Elena', TRUE);", "SELECT * FROM Member ORDER BY MemberID;", [[1,"Asha",1],[2,"Ben",1],[3,"Chen",0],[4,"Dara",1],[5,"Elena",1]]),
  delete: change("library", "DELETE FROM Loan\nWHERE LoanID = 204;", "SELECT LoanID FROM Loan ORDER BY LoanID;", [[201],[202],[203],[205]]),
  update: change("library", "UPDATE Loan\nSET Returned = TRUE\nWHERE LoanID = 203;", "SELECT * FROM Loan ORDER BY LoanID;", [[201,1,2,0],[202,1,4,1],[203,2,6,1],[204,3,0,1],[205,2,3,0]]),
  qSelect: query("books", "SELECT Title, Category\nFROM Book\nORDER BY BookID;", ["Title", "Category"], [["Atlas","Reference"],["Orbit","Fiction"],["River","Fiction"],["Map","Reference"]]),
  qFilter: query("books", "SELECT Title\nFROM Book\nWHERE Category = 'Fiction' AND Price >= 8\nORDER BY BookID;", ["Title"], [["Orbit"],["River"]]),
  qSort: query("books", "SELECT Title, Price\nFROM Book\nORDER BY Price DESC, Title ASC;", ["Title", "Price"], [["Atlas",14],["River",10],["Orbit",8],["Map",6]]),
  qGroup: query("books", "SELECT Category, SUM(Price) AS TotalPrice\nFROM Book\nGROUP BY Category\nORDER BY Category;", ["Category", "TotalPrice"], [["Fiction",18],["Reference",20]]),
  qJoin: query("books", "SELECT Book.Title, Sale.Quantity\nFROM Book INNER JOIN Sale\nON Book.BookID = Sale.BookID\nWHERE Sale.Quantity >= 3\nORDER BY Sale.SaleID;", ["Title", "Quantity"], [["Atlas",3],["River",4]]),
  qAggregate: query("books", "SELECT COUNT(*) AS SaleCount, SUM(Quantity) AS TotalQuantity, AVG(Quantity) AS MeanQuantity\nFROM Sale;", ["SaleCount", "TotalQuantity", "MeanQuantity"], [[5,12,2.4]]),
  qInsert: change("stock", "INSERT INTO Stock (StockID, ItemName, Quantity)\nVALUES (32, 'Stand', 4);", "SELECT * FROM Stock ORDER BY StockID;", [[30,"Cable",6],[31,"Adapter",2],[32,"Stand",4]]),
  qDelete: change("stock", "DELETE FROM Stock WHERE StockID = 31;", "SELECT * FROM Stock;", [[30,"Cable",6]]),
  qUpdate: change("stock", "UPDATE Stock SET Quantity = 8 WHERE StockID = 30;", "SELECT * FROM Stock ORDER BY StockID;", [[30,"Cable",8],[31,"Adapter",2]]),
  examJoin: query("shop", "SELECT Category.CategoryName, Product.ProductName\nFROM Category INNER JOIN Product\nON Category.CategoryID = Product.CategoryID\nWHERE Product.Available = TRUE AND Product.Price >= 5\nORDER BY Product.Price DESC;", ["CategoryName", "ProductName"], [["Accessories","Mouse"],["Stationery","Notebook"]]),
  examGroup: query("payments", "SELECT Branch, COUNT(*) AS PaymentCount, SUM(Amount) AS Total, AVG(Amount) AS Mean\nFROM Payment\nGROUP BY Branch\nORDER BY AVG(Amount) DESC;", ["Branch", "PaymentCount", "Total", "Mean"], [["North",2,30,15],["South",3,30,10]]),
  examMaintain: change("reservations", "INSERT INTO Reservation (ReservationID, GuestName, Confirmed) VALUES (81, 'Nora', FALSE);\nUPDATE Reservation SET Confirmed = TRUE WHERE ReservationID = 81;\nDELETE FROM Reservation WHERE ReservationID = 80;", "SELECT * FROM Reservation;", [[81,"Nora",1]]),
  reviewQuery: query("library", "SELECT Member.MemberName, COUNT(*) AS Outstanding\nFROM Member INNER JOIN Loan ON Member.MemberID = Loan.MemberID\nWHERE Loan.Returned = FALSE\nGROUP BY Member.MemberID, Member.MemberName\nORDER BY Member.MemberID;", ["MemberName", "Outstanding"], [["Asha",1],["Ben",2]]),
  checkQuery: query("festival", "SELECT Stall.StallName, SUM(Receipt.Amount) AS Total\nFROM Stall INNER JOIN Receipt ON Stall.StallID = Receipt.StallID\nWHERE Receipt.Paid = TRUE\nGROUP BY Stall.StallID, Stall.StallName\nORDER BY Stall.StallName;", ["StallName","Total"], [["Art",12],["Food",12]]),
  checkUpdate: change("festival", "UPDATE Receipt SET Paid = TRUE WHERE ReceiptID = 12;", "SELECT ReceiptID, Paid FROM Receipt ORDER BY ReceiptID;", [[10,1],[11,1],[12,1],[13,1]]),
  mockQuery: query("hotel", "SELECT Room.RoomType, Stay.Nights\nFROM Room INNER JOIN Stay ON Room.RoomID = Stay.RoomID\nWHERE Stay.Nights >= 4\nORDER BY Stay.Nights DESC;", ["RoomType","Nights"], [["Double",5],["Single",4]]),
  mockUpdate: change("hotel", "UPDATE Stay SET Nights = 3 WHERE StayID = 1;", "SELECT StayID, Nights FROM Stay ORDER BY StayID;", [[1,3],[2,5],[3,4]]),
};
section8SqlCases.nullAggregate.setup = "CREATE TABLE FeeSample (Fee REAL); INSERT INTO FeeSample VALUES (2),(NULL),(4);";

export const section8Ddl = {
  database: "CREATE DATABASE SchoolLibrary;",
  tables: `CREATE TABLE Tutor (\n    TutorID INTEGER,\n    TutorName VARCHAR(40),\n    PRIMARY KEY (TutorID)\n);\nCREATE TABLE Student (\n    StudentID INTEGER,\n    Initial CHARACTER(1),\n    StudentName VARCHAR(40),\n    Active BOOLEAN,\n    Score REAL,\n    BirthDate DATE,\n    ArrivalTime TIME,\n    TutorID INTEGER,\n    PRIMARY KEY (StudentID),\n    FOREIGN KEY (TutorID) REFERENCES Tutor(TutorID)\n);`,
  alter: "ALTER TABLE Student ADD Email VARCHAR(80);",
  practiceTable: `CREATE TABLE Event (\n    EventID INTEGER,\n    Code CHARACTER(1),\n    EventName VARCHAR(30),\n    Confirmed BOOLEAN,\n    Duration REAL,\n    EventDate DATE,\n    StartTime TIME\n);`,
  practiceAlter: "ALTER TABLE Event ADD Room VARCHAR(12);",
  practiceKey: "CREATE TABLE Locker (LockerID INTEGER, Location VARCHAR(30), PRIMARY KEY (LockerID));",
  practiceForeign: "CREATE TABLE Allocation (AllocationID INTEGER, LockerID INTEGER, PRIMARY KEY (AllocationID), FOREIGN KEY (LockerID) REFERENCES Locker(LockerID));",
  examTables: "CREATE TABLE Venue (VenueID INTEGER, VenueName VARCHAR(50), PRIMARY KEY (VenueID));\nCREATE TABLE Booking (BookingID INTEGER, VenueID INTEGER, BookingDate DATE, Confirmed BOOLEAN, PRIMARY KEY (BookingID), FOREIGN KEY (VenueID) REFERENCES Venue(VenueID));",
  examAlter: "ALTER TABLE Booking ADD Cost REAL;",
};
