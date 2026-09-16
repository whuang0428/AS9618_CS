# Section 8 教学修订与本地验收

发布授权（2026-09-16）：用户已明确要求提交并推送 Section 7 和 Section 8。下文保留实施阶段的本地验收记录；Section 5 的未提交工作继续留在本地。

2026-09-16。状态：已按本对话批准的方案实施，交付本地审批；未提交、推送或发布。

## 范围与依据

保持 L042–L047 六课、37 个教学单元与 40 个项目学习目标。依据 [AGENTS.md](AGENTS.md)、[TEACHING_STANDARD.md](TEACHING_STANDARD.md) 和 README 的源文件/生成规则执行。项目目标编号是教学拆分，不是官方条文编号。

官方依据为 [Cambridge 9618 2027–2029 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf) 的 8.1–8.3（正文第 25–27 页）。规划时核对 Version 2 及更新说明，SQL 范围包括所列 DDL/DML、数据类型与最多两表的查询。对应 pseudocode guide 不另行规定 SQL 方言。ALTER 的既有记录约束及 SQL 逻辑处理规则另核对 [PostgreSQL ALTER 文档](https://www.postgresql.org/docs/current/ddl-alter.html) 与 [SELECT 文档](https://www.postgresql.org/docs/current/sql-select.html)；[SQLite 类型文档](https://www.sqlite.org/datatype3.html) 用于界定本地执行验证的限制。

## 已批准分工与实际结果

| 课程 | 教学深度与分工 | 完整例子及独立证据 |
| --- | --- | --- |
| L042 基础 | 从文件问题讲到术语、键、关系、引用完整性和索引；不提前要求写 SQL | 候选键最小性、年度关联键变式；外键插入/更新/删除的允许与拒绝状态；索引查找及维护。新增 Q7 为可选迁移任务。 |
| L043 设计与规范化 | E-R 后按依赖讲透 UNF→1NF→2NF→3NF，再判断和重建 | 恢复完整两笔订单输入、三条 1NF 明细、全部 2NF/3NF 表；三种异常分别给出操作和原因；正面 3NF 与新增 RowID 仍不能消除依赖的反例；新增 Q6。 |
| L044 DBMS | 用学校场景连接模型、schema、dictionary、完整性、权限、备份及工具职责 | 五个独立请求及全部接受/拒绝结果；具体备份记录和恢复后丢失的变更；表单设计→提交→存储与查询请求→结果；新增 Q9 为可选区分任务。 |
| L045 SQL 分类桥梁 | 保持短课，辨别结构与记录，给后两课建立分类框架 | 新增字段前后、连续插入/读取/更新/删除状态；不在此要求完整复杂 SQL。 |
| L046 DDL | 先读 DDL，再建库、选类型、声明主外键，最后 ALTER | Account 完整定义与零记录状态；Tutor/Student 完整定义；添加 Email 后既有值为 NULL；独立无约束初始表→添加主键/外键→检查既有记录；新增 Q7、Q8。 |
| L047 DML | 三段授课：选择/条件/排序；聚合/分组/两表连接；记录维护 | AND/OR 真值追踪、括号变式、实际同值排序、NULL 分母、五个匹配行→三个筛选行→两个分组→精确排序输出；两字段 UPDATE；新增 Q10、Q12 核心及 Q11 可选。 |
| L048 综合复习 | 保留原四题并补全复习例子的 Member/Loan 初始数据 | 新增 S8-Q5：外键拒绝→正确 UPDATE→最终两行→恢复旧备份，检查跨主题因果。 |

L046 原来的 SELECT 阅读任务已由既有分配机制移至 L047 可选巩固，本轮保留该分配并把 L046 的首单元改为 DDL 阅读。L047 将聚合放到分组前；Stock 的 INSERT→DELETE→UPDATE 连续练习保持已有正确初始状态。L043 Registration 题去掉干扰 command-word 自动识别的 “complete key”，现显示 Explain。

## 知识—教学—独立应用对应

下表覆盖全部 37 单元与 40 目标。官方范围栏标识归属；具体变式及解释属于必要教学补充，不冒充新增考纲要求。每个单元包含 Detailed explanation、两条 Core recap、误解分析及折叠理解检查。表内 Practice ID 的完整题干和答案在各课 Practice；标记“可选”的题默认折叠。

| 实际位置 | 知识点 / 项目目标 | 官方范围 | 前置课程 | 本课深度与可观察任务 | 讲解/图示与例子 | 独立应用位置 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [L42 · 单元 1](web/course-v3/lesson-042/index.html#unit-1) | From repeated facts to linked tables；S8.01.A01, S8.01.A02 | 8.1 | L28、L37 | 讲透并应用：Is repeating PatientID in several appointments the same redundancy problem as repeating the address? | Follow each limitation to a mechanism；Distinguish repetition from harmful redundancy；Store shared patient facts once | S8-L01-Q1 | 已落实 |
| [L42 · 单元 2](web/course-v3/lesson-042/index.html#unit-2) | Entities, tables, records and fields；S8.02.A01 | 8.1 | L28、L37 | 讲透并应用：In the displayed table, what do tuple and attribute refer to? | Read two kinds of change；Locate the table inside the system；From an entity to its stored representation | S8-L01-Q2（可选） | 已落实 |
| [L42 · 单元 3](web/course-v3/lesson-042/index.html#unit-3) | Choose keys for identification and retrieval；S8.02.A02 | 8.1 | L28、L37 | 讲透并应用：PatientID is unique. Why is (PatientID, Town) not a candidate key even if every pair is distinct? | Test uniqueness and minimality；Use the rules, not the current appearance；Keys answer different questions | S8-L01-Q3；S8-L01-Q7（可选） | 已落实 |
| [L42 · 单元 4](web/course-v3/lesson-042/index.html#unit-4) | Read relationship cardinality in both directions；S8.02.A03 | 8.1 | L28、L37 | 讲透并应用：Why does Membership need both StudentID and ClubID? | Place the reference on the appropriate side；Change the membership rule；Read each relationship in both directions | S8-L01-Q4（可选）；S8-L01-Q7（可选） | 已落实 |
| [L42 · 单元 5](web/course-v3/lesson-042/index.html#unit-5) | Prevent references to missing records；S8.02.A04 | 8.1 | L28、L37 | 讲透并应用：Would PatientID 18 in two appointments violate referential integrity? | Start independently from Patient 14, 18 and Appointment (90, 14)；State the conditions of the check；A reference must reach an existing record | S8-L01-Q5 | 已落实 |
| [L42 · 单元 6](web/course-v3/lesson-042/index.html#unit-6) | Use an index to find matching records；S8.02.A05 | 8.1 | L28、L37 | 讲透并应用：Why might an index slow an update? | Trace the illustrated Town index；Qualify the performance claim；An index provides another access path | S8-L01-Q6 | 已落实 |
| [L43 · 单元 1](web/course-v3/lesson-043/index.html#unit-1) | Document entities, keys and relationship cardinality；S8.03.A01 | 8.1 | L42 | 讲透并应用：Why not use (PatientID, DoctorID) as the only appointment key? | Explain ownership of a fact；Test the model against changed conditions；Clinic E-R design | S8-L02-Q1 | 已落实 |
| [L43 · 单元 2](web/course-v3/lesson-043/index.html#unit-2) | 1NF: one value in each field；S8.04.A01 | 8.1 | L42 | 讲透并应用：Why does the first order produce two rows? | Rules for the complete order example；Complete unnormalised input；1NF: expand a repeating group | S8-L02-Q2 | 已落实 |
| [L43 · 单元 3](web/course-v3/lesson-043/index.html#unit-3) | 2NF: depend on the whole composite key；S8.04.A02 | 8.1 | L42 | 讲透并应用：Why is Quantity not stored as a single attribute of Product? | Read a dependency and test the determinant；Three independent changes to the original 1NF table；2NF: separate facts with a partial dependency | S8-L02-Q3；S8-L02-Q6 | 已落实 |
| [L43 · 单元 4](web/course-v3/lesson-043/index.html#unit-4) | 3NF: remove transitive dependencies；S8.04.A03 | 8.1 | L42 | 讲透并应用：If Amina changes her name, how many Customer records require the change? | Explain why another split is needed；Check the new possibilities；3NF: remove the transitive dependency | S8-L02-Q6；S8-L02-Q4（可选） | 已落实 |
| [L43 · 单元 5](web/course-v3/lesson-043/index.html#unit-5) | Judge and produce a complete 3NF design；S8.04.A04, S8.04.A05 | 8.1 | L42 | 讲透并应用：ProductID is the only candidate key in an atomic Product(ProductID, ProductName, UnitPrice) table, and neither non-key attribute determines the other. Explain why it is in 3NF. | Reconstruct every original line from the final 3NF tables；Follow the full reconstruction；Check that the original facts remain recoverable | S8-L02-Q5；S8-L02-Q6 | 已落实 |
| [L44 · 单元 1](web/course-v3/lesson-044/index.html#unit-1) | Data management and the data dictionary；S8.05.A01 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Which belongs in the dictionary: a customer's balance of 42.50 or the fact that Balance has type REAL? | One school example: definition versus stored fact；Follow a use of metadata；Metadata describes the data | S8-L03-Q1 | 已落实 |
| [L44 · 单元 2](web/course-v3/lesson-044/index.html#unit-2) | Represent the organisation's data；S8.05.A02 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Why ask whether pupils may belong to several tutor groups? | Continue the school example；Separate the tool from the design judgement；Translate a business rule into a model | S8-L03-Q2（可选） | 已落实 |
| [L44 · 单元 3](web/course-v3/lesson-044/index.html#unit-3) | Define the logical schema；S8.05.A03 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Must an application know the disk sector containing TutorGroup before querying it? | School logical schema；Connect all three descriptions；A logical schema describes organisation | S8-L03-Q3 | 已落实 |
| [L44 · 单元 4](web/course-v3/lesson-044/index.html#unit-4) | Enforce valid values and relationships；S8.05.A04 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Does a stored mark of 73 prove that 73 was written on the script? | Initial school records；State the rules and reset boundary；Check a change before accepting it | S8-L03-Q4；S8-L03-Q9（可选） | 已落实 |
| [L44 · 单元 5](web/course-v3/lesson-044/index.html#unit-5) | Assign access rights to users and groups；S8.05.A05 | 8.2 | L33、L36、L42、L43 | 讲透并应用：How can a new finance officer receive the existing finance permissions? | Same row, different decision；Explain group administration；Permit operations according to user roles | S8-L03-Q5；S8-L03-Q9（可选） | 已落实 |
| [L44 · 单元 6](web/course-v3/lesson-044/index.html#unit-6) | Back up and recover a consistent database；S8.05.A06 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Why test a restoration before an actual emergency? | A complete backup-only recovery；Verify relationships as well as files；Prepare, protect, restore and check | S8-L03-Q6 | 已落实 |
| [L44 · 单元 7](web/course-v3/lesson-044/index.html#unit-7) | Use the developer interface；S8.06.A01 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Which tool helps arrange fields and labels on a new data-entry form? | Build and use a student-entry form；Explain the boundary of the tool；Build the objects and interfaces users need | S8-L03-Q7（可选） | 已落实 |
| [L44 · 单元 8](web/course-v3/lesson-044/index.html#unit-8) | Follow a query through the query processor；S8.06.A02 | 8.2 | L33、L36、L42、L43 | 讲透并应用：Who carries out a saved query when a user presses its Run button? | Retrieve from the same school state；State the abstraction boundary；Turn a SQL request into a result | S8-L03-Q8 | 已落实 |
| [L45 · 单元 1](web/course-v3/lesson-045/index.html#unit-1) | DDL changes structure；S8.07.A01 | 8.3 | L42、L44 | 分类引入：Which category adds a Status field to an existing table? | Add a field: before and after；Read the actual effect；Distinguish a new attribute from a new value | S8-L04-Q1；S8-L04-Q3 | 已落实 |
| [L45 · 单元 2](web/course-v3/lesson-045/index.html#unit-2) | DML retrieves and maintains records；S8.07.A02 | 8.3 | L42、L44 | 分类引入：Does SELECT become DDL because its result looks like a table? | A continuous record lifecycle；Track what stays defined；DML works with records | S8-L04-Q2；S8-L04-Q3 | 已落实 |
| [L45 · 单元 3](web/course-v3/lesson-045/index.html#unit-3) | SQL expresses both kinds of operation；S8.07.A03 | 8.3 | L42、L44 | 分类引入：Can one SQL script contain both DDL and DML? | Connect the lifecycle to the language；SQL includes both DDL and DML | S8-L04-Q3 | 已落实 |
| [L46 · 单元 1](web/course-v3/lesson-046/index.html#unit-1) | Read an SQL table definition；S8.08.A01, S8.08.A02 | 8.3 | L42、L43、L45 | 讲透并应用：What changes if VARCHAR(25) becomes VARCHAR(40), and how many account records are created? | Identify the resulting state；Definition to interpret | S8-L05-Q8 | 已落实 |
| [L46 · 单元 2](web/course-v3/lesson-046/index.html#unit-2) | Create a named database；S8.09.A01 | 8.3 | L42、L43、L45 | 讲透并应用：How many Student rows does CREATE DATABASE SchoolLibrary insert? | Count objects and records separately；Keep product details separate；Create the database before defining its tables | S8-L05-Q2 | 已落实 |
| [L46 · 单元 3](web/course-v3/lesson-046/index.html#unit-3) | Choose data types and define fields；S8.09.A02 | 8.3 | L42、L43、L45 | 讲透并应用：A room code may be '007B'. Is INTEGER suitable? | Distinguish similar-looking values；State the limits of a type；Choose a type from the meaning of a value | S8-L05-Q3；S8-L05-Q8 | 已落实 |
| [L46 · 单元 4](web/course-v3/lesson-046/index.html#unit-4) | Declare the primary key；S8.09.A04 | 8.3 | L42、L43、L45 | 讲透并应用：Can Membership contain (12, A) and (12, B) under the composite declaration? | Independent Membership insertions; initial pairs (12, A), (12, B)；Avoid two separate uniqueness rules；A primary key identifies each record | S8-L05-Q5；S8-L05-Q8 | 已落实 |
| [L46 · 单元 5](web/course-v3/lesson-046/index.html#unit-5) | Declare the referenced relationship；S8.09.A05 | 8.3 | L42、L43、L45 | 讲透并应用：Why does defining Student.TutorID not create a Tutor row for value 9? | Tutor contains only TutorID 7; attempts are independent；Read only the constraints actually supplied；Declare which field references which key | S8-L05-Q6；S8-L05-Q7 | 已落实 |
| [L46 · 单元 6](web/course-v3/lesson-046/index.html#unit-6) | Alter an existing table definition；S8.09.A03 | 8.3 | L42、L43、L45 | 讲透并应用：Student.TutorID exists but has no reference constraint. Tutor.TutorID is already the primary key. Write the statement that adds the link. | Add nullable Email to existing records；Prepare to add constraints to existing tables；ALTER TABLE adds a field to the definition | S8-L05-Q4；S8-L05-Q7 | 已落实 |
| [L47 · 单元 1](web/course-v3/lesson-047/index.html#unit-1) | Choose the result columns and source；S8.10.A01 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Does SELECT MemberName FROM Member delete the other columns? | Library Member: the complete starting data；Separate projection from record identity；SELECT chooses the output columns | S8-L06-Q12；S8-L06-Q1（可选）；S8-L06-Q11（可选） | 已落实 |
| [L47 · 单元 2](web/course-v3/lesson-047/index.html#unit-2) | Filter rows using a Boolean condition；S8.10.A02 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Using the Loan records, which extra LoanID appears if the parentheses are removed from (MemberID = 1 OR MemberID = 2) AND Returned = FALSE? Explain. | Library Loan: reset to this data for each query；Evaluate the main AND condition row by row；WHERE: both conditions must be true | S8-L06-Q2；S8-L06-Q10；S8-L06-Q12 | 已落实 |
| [L47 · 单元 3](web/course-v3/lesson-047/index.html#unit-3) | Sort the returned records；S8.10.A03 | 8.3 | L42、L43、L45、L46 | 讲透并应用：For Charge(1,3), (2,6), (3,3), what ID order follows ORDER BY Fee DESC, ChargeID ASC? | Choose data that exercises the rule；Separate Charge starting data；ORDER BY rearranges the result rows | S8-L06-Q3；S8-L06-Q12；S8-L06-Q11（可选） | 已落实 |
| [L47 · 单元 4](web/course-v3/lesson-047/index.html#unit-4) | Calculate SUM, COUNT and AVG；S8.10.A06 | 8.3 | L42、L43、L45、L46 | 讲透并应用：For fees 2, 4 and 0, what is AVG(Fee)? | Trace the separate FeeSample input；Explain the missing-value effect；Aggregates calculate over the selected records | S8-L06-Q6；S8-L06-Q12 | 已落实 |
| [L47 · 单元 5](web/course-v3/lesson-047/index.html#unit-5) | Form groups before calculating group results；S8.10.A04 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Why is Dara absent from this Loan grouping? | Partition the five Loan rows；Contrast grouping choices；GROUP BY forms one group per key value | S8-L06-Q4；S8-L06-Q12 | 已落实 |
| [L47 · 单元 6](web/course-v3/lesson-047/index.html#unit-6) | Match records from two tables with INNER JOIN；S8.10.A05 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Why is Asha shown twice in the result? | Complete joined rows before filtering；Choose the relationship deliberately；INNER JOIN returns matching row pairs | S8-L06-Q5；S8-L06-Q12 | 已落实 |
| [L47 · 单元 7](web/course-v3/lesson-047/index.html#unit-7) | Insert values into named fields；S8.11.A01 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Can the same statement be repeated unchanged when MemberID is a primary key? | Full Member state after this insertion；Verify matching and unchanged data；INSERT INTO adds a new record | S8-L06-Q7 | 已落实 |
| [L47 · 单元 8](web/course-v3/lesson-047/index.html#unit-8) | Delete only the intended records；S8.11.A02 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Would WHERE MemberID = 1 remove only loan 201? | State the reset and no-match result；Same initial data, different deletion condition；DELETE FROM removes the selected row | S8-L06-Q8 | 已落实 |
| [L47 · 单元 9](web/course-v3/lesson-047/index.html#unit-9) | Change fields while keeping the record；S8.11.A03 | 8.3 | L42、L43、L45、L46 | 讲透并应用：Stock initially contains only (30, Cable, 6) and (31, Adapter, 2). What is its final state after UPDATE Stock SET Quantity = 8 WHERE StockID = 99? | Follow identity and scope；Change two fields in one target；UPDATE changes a field in the selected record | S8-L06-Q9 | 已落实 |

## 例子边界与合理拓展

- 订单例固定业务规则：每单一个客户、同一产品在同单只出现一次、ProductID 决定当前固定价格、Quantity 由订单与产品组合决定。3NF 四表重建是关系设计追踪，不要求四表 SQL。实际重建全部三行与 1NF 数据逐值一致。
- 主键及一对一关系按声明的业务保证判断；样本暂时不重复不能证明候选键。复合键各组成字段可以分别重复。图内索引的 14/22 是独立小例，已明确指出与其他诊所表的边界。
- 学校完整性案例中的 TutorID 非空及 Mark 范围是明确规则；L046 的另一套完整 DDL 没有额外 NOT NULL，正文明确说明这种区别。五个请求独立重置，避免把第一次成功插入带到第二题。
- ALTER 添加约束的示例从“已有字段但尚未声明这两个键”的独立表开始，避免重复添加已经存在的主键。错误既有引用会阻止约束建立，不会自动创建父记录。
- Library 教学 SQL 每例重置；Stock Practice 明确连续执行。零值与 NULL、无匹配行与无分组聚合结果分别解释。AS 是输出列别名，限定字段名用于消除来源歧义。
- 折叠拓展限定在解释误解所需深度：并发丢失更新的概念、历史成交价归属、单字段候选键判断的适用边界、日志恢复概念、空集合聚合、同名成员按身份分组。不引入索引树实现、事务算法、BCNF、子查询或额外连接类型。

## Practice 与真题负担

六课保留原 37 道有效 Practice，新增 8 道，共 45 道：35 核心、10 可选。L048 的 S8 复习共 5 题（2 核心、3 可选）。时间为教师估计，应按学生情况分段完成，不表示六课各占一个固定课时。L047 特别适合把三段教学及练习分次安排。

| 课 | 核心/可选 Practice | 核心估计分钟 | 真题组/子问/分值 | 真题估计分钟 | 依赖与选题增益 |
| --- | --- | --- | --- | --- | --- |
| L42 | 4/3 | 15–20 | 1/1/3 | 5–7 | E056：把关系机制写成情境中的益处 |
| L43 | 5/1 | 28–36 | 2/2/10 | 19–25 | E057/E058：三表设计与限定范围的分解；保留公共题干和样本 |
| L44 | 6/3 | 20–27 | 2/2/6 | 9–12 | E059/E060：区分元数据、逻辑设计和开发工具动作 |
| L45 | 3/0 | 7–10 | 0/0/0 | 0 | 分类桥梁，无独立真题；在后两课综合应用 |
| L46 | 7/0 | 28–37 | 1/2/5 | 14–19 | E061：CREATE 字段/键与 ALTER 外键，已补足前置讲解 |
| L47 | 10/3 | 42–56 | 2/2/7 | 16–22 | E062/E063：两表分组计数、一次修改两个字段与正确 WHERE |

真题保持 E056–E063 共 8 组、9 子问、31 分。重新读取相关原始 QP/MS 页，检查任务条件及评分上限，并校验 14 份原 PDF、25 张现有摘图的 SHA-256。沿用已批准的原页/裁切视觉复核记录，本轮另目视抽查复杂表格、主键下划线和 SQL 评分页。E057 的候选评分点多于六分，仍限制六分；E059 两部分各最多两分；E061 为 3+2；E063 两个 SET 值共同对应一分。原文、数字、评分页和裁切未修改。

现有 20 分 Section 8 检查及 10 分 Paper 1 数据库题的题干/数据充分，与本次讲解匹配，保持原题；其查询和维护例亦包含在执行检查中。未扩大历史真题检索样本，不作频次结论。

## 图示决策与追踪

保留七幅既有 ImageGen 场景插画及适用的精确关系/SQL 图。L046 首单元的旧查询图不再作为 DDL 引导，改用可编辑结构表；原资产保留。以下两图由源码生成；完整输入、中间行及结果保留为 HTML 可编辑表格，图不承担唯一信息来源。

| 新图 | 目的和必要事实 | 源文件 | SHA-256 |
| --- | --- | --- | --- |
| [dbms-request-checks.svg](web/assets/course-v3/section-8/dbms-request-checks.svg) | 权限、标识/引用、字段规则共同决定请求；拒绝无变更、接受增加一行；是教学检查路径，不冒充固定内部执行次序 | scripts/course-v3-section8-teaching-diagrams.mjs | 55f43567eb2f484a0eddf6175112f99c7f40d505e95065f2187de3cf6f5d9159 |
| [sql-query-stages.svg](web/assets/course-v3/section-8/sql-query-stages.svg) | 五个连接行→三个未归还行→两组聚合→Ben 在 Asha 前；数据库原记录不变 | scripts/course-v3-section8-teaching-diagrams.mjs | 942f2261b24e69b0fe87495ee31e2499129dc99e293e35f93f69ff927a3deba2 |

两图均完成全图目视检查；标签、数字、方向与正文一致。课程窄屏保持 680px 图画布置于局部滚动容器，提供说明、键盘滚动、全文替代与完整查看入口；不以缩小全部文字换取一屏显示。无新位图需求，未调用 ImageGen。

## 教学自审

- 学生视角：完整 UNF 输入已实际显示，四张最终表均有数据；每个数据变更交代独立/连续初始状态及最终结果；新 SQL 练习不再依赖未教的 ALTER 外键或复合 SET。
- 教师视角：L045 保持分类桥梁；L046 的键声明位于 ALTER 前；L047 的聚合位于 GROUP BY 前，并给三段授课提示。前置链接已补齐，后续/复习链接与前置分开。
- 评阅者视角：复核身份与最小性、引用允许/拒绝、价格依赖、3NF 正反例、真实排序并列、NULL 分母、两表综合输出、原评分分组上限。所有 40 目标在教学和核心/可选 Practice 中都有对应项。

## 工程验证与实际限制

已完成：

- 运行标准生成命令 node scripts/render-course-v3.mjs，成功生成 93 课、12 个 Section 和资源输出。
- 在独立 SQLite 内存库打开 foreign_keys，实际执行 39 个查询及维护案例，逐行比较预期结果，全部通过；另实际验证 6 个接受/拒绝操作。
- 实际执行 Tutor/Student CREATE TABLE 和 ALTER ADD Email；原记录保留，新字段值为 NULL。三条规范化明细经过四表关联重建，与原三行完全一致。
- 结构核验：37 单元均有详细讲解、两条 Core、理解检查和首要视觉；40 目标均有教学与独立题；表格列数匹配。
- 七个生成课页的本地图片/链接均存在，ID 无重复，details 默认关闭。内置浏览器逐课检查 1280px 和 390px，未发现整页横向溢出；实际访问全部 37 单元，无已加载失败图像；浏览器无 error/warn。延迟加载的未进入视口图片不按失败计数。
- 目视检查规范化图、新流程图以及课程窄屏滚动后的内容。实际验证逐单元模式、下一单元、恢复整课、理解检查展开。所有原题可见而教师答案/MS 默认折叠。
- git diff --check 通过；以实施前逐文件 SHA-256 清单核对，其他课程源码/页面及既有 S5/S7 工作不变，无文件删除。L048 仅追加/增强 S8 范围；共享 allocation、support、contract 和 README 的修改保留已有工作。

未实际运行 / 原因：

- CREATE DATABASE 和 ALTER TABLE ADD PRIMARY KEY/FOREIGN KEY 未在服务器型 DBMS 执行：本机未发现可用 PostgreSQL 服务/CLI，SQLite 不支持这些 ALTER 形式。已按官方 SQL 文档及 E061 原题/MS 核对语法，并给出明确初始/最终状态；不把该核对称为真实运行。
- SQLite 不按服务器型 DBMS 的方式强制 VARCHAR 长度或原生 DATE/TIME/BOOLEAN 域，故 SQLite 通过不能作为全部七类类型约束的执行证明。类型教学与考试数据保持标准含义。
- 浏览器自动化最初的外部 Playwright/系统 Chrome 启动失败，改用已提供的 Codex 内置浏览器完成实际 QA；不安装依赖。不运行仓库中已移除的旧 validator。
- 未做远程发布验证；本轮授权为本地修改与审批。

## 本地审批入口

[Section 8](http://127.0.0.1:8769/course-v3/section-8/)；优先审阅 [L043 完整规范化](http://127.0.0.1:8769/course-v3/lesson-043/#unit-2)、[L044 请求与完整性](http://127.0.0.1:8769/course-v3/lesson-044/#unit-4)、[L046 ALTER](http://127.0.0.1:8769/course-v3/lesson-046/#unit-6)、[L047 综合查询](http://127.0.0.1:8769/course-v3/lesson-047/#unit-6)。当前预览沿用本地 8769 服务。

结论置信度：教学数据、范围映射、生成结果和已执行 SQL 为高；未实际执行的服务器型 DDL 已完成文档核对，实机兼容性仍待指定 DBMS 后确认。当前没有需要进一步修改才能交付本地审批的已知教学阻断项。
