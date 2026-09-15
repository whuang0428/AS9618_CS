# Section 11 教学修订与本地审批记录

状态：2026-09-15，按本对话已批准的整体方案完成本地实施，等待用户审阅。未提交、推送或发布。本文件属于项目工作材料，学生正文为英文。

## 依据、范围与完成判断

已完整读取根目录 `AGENTS.md`、`TEACHING_STANDARD.md` 及 README 的课程结构、源文件、生成与验证说明。核对以下官方资料：

- [2027–2029 syllabus Version 2](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)：印刷页 29–30，11.1 Programming Basics、11.2 Constructs、11.3 Structured Programming。
- [同年份 Pseudocode Guide](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf)：常量、赋值、运算、字符串、选择、循环、过程与函数。特别核对 `&`、不带 `DO` 的 `WHILE`、CASE 首个匹配、函数返回与参数传递规则。
- [syllabus update](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf)：Version 2 更新涉及考试说明和计算器规定，未改变 Section 11 的教学内容。

保留 Lesson 072–083 共 12 课与官方主题顺序。当前有 31 个教学单元、29 个项目细分目标、49 道练习和 40 道原创考试风格题。原有 36 道练习与 36 道考试题均保留；新增题用于补足流程图迁移、字符串拼接、嵌套循环、参数交换、返回路径和效率应用。自审时移除了与原题重复的一道新增赋值题。数量只描述交付结构，不是教学充分性的门槛。`S11.xx.Axx` 是项目映射编号，不是官方原文编号。

原先的主要问题包括：讲解偏向短复习；拼接没有完整教学；流程图缺少直接逐边对应的 WHILE 例程；嵌套循环、完整 Swap、提前返回和效率改写的状态证据不足；部分要求写代码的题目仅有描述性答案；课间链接没有清楚区分前置与关联内容。以下对应表记录本次具体解决位置。

## 逐课分工与学习证据

表中 `unit-n` 指该课正文锚点；Qn、EXAM-n 分别指 Practice questions 和原创考试题编号。每个单元另有默认折叠答案的理解检查。所有列出的单元均已实施。

| 课与实际位置 | 知识及深度 / 依据 | 前置与学生应能完成的任务 | 讲解、完整例子、边界与误解 | 独立应用与验收位置 |
| --- | --- | --- | --- | --- |
| [072](web/course-v3/lesson-072/index.html#unit-1)，unit-1–2：Structured English；Flowchart | 官方 11.1；引入设计到代码的迁移，完整完成翻译 | L053 的结构与 L054 的伪代码；从给定设计写出输入、两条分支、回边和最终输出 | 同一三输入设计给出 FOR 和直接 WHILE；−2、0、5 得 1；WHILE 的 Index 最后为 4，不读取第 4 项。区分当前输入序号与正数数量 | Q2 原图改输入；Q3 错放初始化；新增 Q4 用温度流图独立翻译，999 可为首项，阈值 30 不计入 |
| [073](web/course-v3/lesson-073/index.html#unit-1)，unit-1–2：Declarations；Assignment and I/O | 官方 11.1；声明、赋值、输入输出讲透 | 本课直接提供基础规则；类型分类关联 L058。能选择类型、初始化并按依赖计算 | 常量字面量与变量初始化分开；完整购买程序得 36；A=4、B复制A、A加3 后 A/B=7/4；带标签 OUTPUT 与构造 STRING 分开 | Q1 类型及常量；Q2 复制；Q3 完整购买；EXAM-3 未初始化诊断。需要代码的答案补为有效多行代码 |
| [074](web/course-v3/lesson-074/index.html#unit-1)，unit-1–2：Arithmetic；Logical expressions | 官方 11.1；运算过程和条件推理讲透 | L073；能分步计算、重构商余、判断范围及补集 | 14 对比 20；125 DIV/MOD 60 得 2/5；0、59、60 的重构表；Age 与 Suspended 的布尔中间结果；OR 错误范围反例。运算例明确非负整数/正除数，不依赖短路求值 | Q4 用 9 和 21 反驳错误 OR；EXAM-1 每单/每件费用；EXAM-2 区间两端及两侧；EXAM-3 修正商余运算 |
| [075](web/course-v3/lesson-075/index.html#unit-1)，unit-1–3：Numeric routines；String/CHAR interfaces；Concatenation | 官方 11.1 与 Guide 字符串规则；接口读取、结果类型、拼接讲透 | L073–074；根据给定定义正确传参、截取并构造字符串 | 数值与字符串例程分开；RAND 的上下界与 INT/加一逐步映射；ALGORITHM 的位置/长度；STRING 与 CHAR、空串、空格、合法切片条件；CS2046AB → 2046-AB，IT0007XY 保留前导零 | Q4 完整标签程序；Q5 空格和 CHAR；EXAM-4 用新接口 PREFIX/SUFFIX 构造 LAB:0042。字符串函数定义随题给出 |
| [076](web/course-v3/lesson-076/index.html#unit-1)，unit-1–2：IF/nesting；CASE | 官方 11.2；独立动作、互斥分类、嵌套和 CASE 讲透 | L074；能按要求选择决策结构并追踪未执行路径 | 年龄/会员四组合；85 在独立 IF 中输出两项，在互斥分类中只输出 Distinction；CASE 整数范围、OTHERWISE、首个匹配后离开，无 fall-through | Q1 50 的边界；EXAM-1 16 岁/无同意；EXAM-2 日期范围；EXAM-3 将两个独立 IF 改成单一分类 |
| [077](web/course-v3/lesson-077/index.html#unit-1)，unit-1–3：Bounds；STEP；Nested FOR | 官方 11.2；计数循环讲透，嵌套是组合已有结构的必要补充 | L073–074；能推导循环次数、步进方向和内外层顺序 | Count=0/1 的完整累计程序；6,4,2,0 和 5,3,1；方向不符时零次；2×3 坐标程序逐项输出六对。Count 在两层外初始化，内层每行重启 | Q3 零次/一次；Q4 六对坐标及按行计数初始化位置；EXAM-1 四个新价格完整累计；EXAM-2 不可达终点 |
| [078](web/course-v3/lesson-078/index.html#unit-1)，unit-1–3：REPEAT；WHILE；Condition conversion | 官方 11.2；首轮、终止条件及完整等价转换讲透 | L073–074、076；能写验证和哨兵循环，解释零数据路径 | 验证 −1、101、100；哨兵 3、4、−1 得 7，首项 −1 得 0。给出 WHILE 与带外层 IF 的 REPEAT 完整等价程序；单独否定条件不足以保留首项哨兵路径 | Q4 去掉外层 guard 会加哨兵并多读一次；EXAM-2 Stock=0/2；EXAM-3 补循环内 INPUT。明确这里只检查已能读取的 INTEGER 范围 |
| [079](web/course-v3/lesson-079/index.html#unit-1)，unit-1–2：Loop choice；Bounded attempts | 官方 11.2；理由、替代方案及条件变化讲透 | L077–078；能从已知次数、必须首读、可能零项作出选择 | 有效数量与尝试次数分开；密码 WHILE/REPEAT 两版：第一次成功、第三次成功、三次失败；AND 继续与 OR 停止；若事先已锁定，则需前置判断或 guard | EXAM-1 首项哨兵；EXAM-2 固定递减序列；EXAM-3 比较两种有效方案；新增 Q4 对比完整密码程序 |
| [080](web/course-v3/lesson-080/index.html#unit-1)，unit-1–3：Definition/call；Parameter interface；BYVAL/BYREF | 官方 11.3；过程、参数和调用者状态讲透；接口术语在实际调用前引入 | L073、076；能定义、调用、匹配参数并解释 caller 变化 | Heading 定义不立即执行，CALL 后返回下一句；无/单/多参数完整程序；局部与 caller 7,5,7；BYREF Swap 的 Temp、A、B 逐行表；等值与负数；BYVAL Swap 内部正确但 caller 不变 | Q4 完整交换状态；Q5 局部副本；EXAM-2 Clear；EXAM-3 字面量不能作 BYREF 实参。解释默认 BYVAL 与同模式标记可共享，示例逐参数写明模式 |
| [081](web/course-v3/lesson-081/index.html#unit-1)，unit-1–3：Return into expression；All return paths；Interfaces | 官方 11.3；函数、结果替换、路径和术语讲透 | L075–076、078、080；能写完整 typed function 并在表达式使用结果 | Tax(50) 返回 10，调用者算出 60；图文代码统一。Larger 覆盖两方向、相等、负数；DeliveryFee 在零数量提前返回；ReadRating() 空参数列表但有局部输入与结果；RETURN/OUTPUT/BYREF 三种效果分开 | Q4 提前返回；Q5 零参数；EXAM-2 两条 Discount 返回路径；EXAM-3 参数/实参/接收变量；EXAM-4 独立 Smaller 函数及相等路径 |
| [082](web/course-v3/lesson-082/index.html#unit-1)，unit-1–3：Repeated decisions；Loop-invariant calculation；Shared traversal | 官方 11.3 效率；用三个具体模型讲透，操作计数为必要教学补充 | L061、076–077、080–081；能修改代码并说明保留行为及节省的工作 | 三组完整改写：比较 2→1；正 Count=3 的乘法 3→1；五元素处理读取 10→5，输出总分 250、及格数 3。反例：循环零次、Weight 变化、最终均值尚未知；不声称实际耗时减半 | Q4 输出与乘法次数/零次反例；Q5 单次处理读取；EXAM-1 30 元素；EXAM-2 变化 Weight；EXAM-3 边界/输出位置；EXAM-4 合理的第二遍 |
| [083](web/course-v3/lesson-083/index.html#unit-1)，unit-1–3：Complete contract；Nested validation；Subprogram data flow | 11.1–11.3 综合应用；完整整合，不再称为 fragments | L077–078、080–081；能从要求完成声明、函数、过程、主程序、跟踪和输出 | 固定三个有效成绩；每次失败留在同一 slot。−1,0,50,101,100 → Total150/Passed2/Mean50；20,−5,60,80 → 160/3 与2；三次49及三次100；明确非整数输入不在题设内 | Q1–3 控制、数值、接口；EXAM-1 两个有效评分；新增 EXAM-4 独立传感器程序：−20..50，累计两项并计负数，−21,−20,51,30 得10和1 |

## 课程依赖、拓展与测评

- L072 以 L053–054 为前置；L073、076–078 是后续语法细化入口，列为 related review/later applications，避免把尚未进行的同节课程列成入口障碍。主课序保留官方顺序；资源页的可选学习路线按依赖先学基础，再做数组与综合任务。
- L058 类型、L056 边界、L062 二维数组、L065 文件读取、L085 结构图和 L093 综合复习均有相应关联位置。正式前置关系从每个 S11 入口检查，无环。
- 三项可选拓展默认折叠：L075 的任意整数随机区间；L080 与 Java 传值语义的对照；L083 可变数量成绩在 Count=0 时输出 No marks，先 guard 再除法。它们不冒充新增独立考纲要求。
- L093 `REV-P2-S11-Q3` 增加 LEFT 返回值与 `& "-A"` 的组合，结果 PARK-A；同时保留重复费用计算的改写。
- Section check `A-S11-2` 保持 5 分，加入 SCIENCE → CIE!；UCASE/CHAR 仍在 L075 的练习与考试题中检查。其余 section check 与 Paper 2 mock 的有效任务保留。
- L053 的说明表和 L053/L054 共用例程去掉 `WHILE Count > 0 DO` 的 `DO`，与 Guide 及本节一致。没有扩大到重写 Section 9。

## 图示取舍与审核

本节需要精确位置、顺序、分支和值传递，用项目现有的可编辑 SVG、表格与代码表达；本轮没有需要原创位图插画的教学任务，未调用 ImageGen、未引入依赖。

| 素材 | 位置与教学用途 | 来源与审核 |
| --- | --- | --- |
| `string-positions.svg` | L075 unit-3；1-based 字符位置、MID 的 count、RIGHT 以及拼接后的字符串 | 本轮原创 SVG；核对八个字符、区间 3–6、后缀 AB 与结果 2046-AB |
| `selection-paths.svg` | L076 unit-1；同一 85 对应两次独立动作和一次互斥分类 | 本轮原创 SVG；调整右侧箭头避开说明文字 |
| `nested-order.svg` | L077 unit-3；六个坐标顺序、行间返回和 inner restart | 本轮原创 SVG；标题采用自然语言，避免不完整 FOR 语法被误认作代码 |
| `early-return.svg` | L081 unit-2；零/正数量的两次独立调用 | 本轮原创 SVG；每次只执行一条 RETURN，调用者结果为 0.0/4.0 |
| `marks-interfaces.svg` | L083 unit-3；BOOLEAN 返回到条件，引用参数更新 caller accumulators | 本轮原创数据流图；明确 FALSE 重试与 TRUE 才记录，不把 BYREF 更新画成函数返回 |
| `warning-stream.svg` | L072 Q4；与课堂计数图不同的原创迁移任务 | 本轮原创流程图；首项哨兵出口、阈值两路均读取下一项、单次最终输出 |
| `mechanisms/function-return.svg` | L081 unit-1；调用后恢复表达式 | 修订已有 SVG：与程序统一为 Price50、20% 税率、返回10、Total60；同步文字替代 |

新图源码位于 `scripts/course-v3-section11-diagrams.mjs`；函数返回图由 `scripts/course-v3-mechanism-extensions.mjs` 生成。六张新图加上计数流程图与十张机制图（包含已修订的函数返回图），共目视核对 17 张本节实际使用的精确 SVG：数据、箭头、退出路径、标题和标签；浏览器未发现文字超出 viewBox。新图另配图注、alt 和文字转录。技术图在 390px 页面使用局部横向滚动并提供完整查看入口；不缩小关键文字来塞进手机宽度。

最终修改图的 SHA-256：

```text
string-positions.svg  da6d0382f9cd8a65de3e67854787ed330f6425342d16927365b9dbc13bf5be61
selection-paths.svg   97974de7927bd3ddfd7373946e7ab89f80cbf087f9e9ce7508ca93583f8400eb
nested-order.svg      9764c18b7713b66bd2644ef20410ef13b77ea2fd0eb216c7386772bb253b4642
early-return.svg      fab6ad0c38fb1717b21c07621401ee36165d6195eb7b537b752dda8bd8b65b34
marks-interfaces.svg  708ceb137e8ab9865a2620da9cccfaec480b8fa1fb8d07630a0c222cbe1f7f8c
warning-stream.svg    34535908676063d91dd888060e549c3dee7f99038e555263bb9dab83784491b4
function-return.svg   3f9c78bcbf5bb293f86cd72ccc0685a8ab15ee8cfe2342e469ad7a042c2a215e
```

## 教学自审结果

- **学生角度**：31 单元都有详细讲解、精炼 Core、误解与理解检查；讲解按任务条件、执行过程、结果及边界展开。完整程序与局部答案明确区分。空输入、无效尝试、未初始化、相等参数、CHAR/STRING 和 return/caller 的概念均有具体证据，见上表。
- **教师角度**：能用同一组数据连接代码、图和 trace。例如 Swap 的 caller/local 表对应三次赋值；综合成绩表逐项记录五次尝试而非只列接受值；效率课分别量化比较、乘法、元素处理读取，反例解释为什么某些改写不成立。
- **评阅者角度**：检查全部 89 道本节题目的题设与答案，保留原题 ID；多行代码答案与题目声称的范围一致。核对 29 个目标的引用、每单元在本课的练习/考试题对应、题目唯一 ID、分值与评分点数。没有以原创答案冒充 Cambridge 官方评分细则。
- **已解决的自审问题**：函数返回图与代码数据不一致；新增赋值题与已有题重复；“省略参数模式即 BYVAL”表述需要区分整组未指定与同模式 marker 共享；流程图中的 Index 应表示当前输入序号，不能笼统称为已处理数量。
- **边界**：本节的程序验证是明确标注的模拟追踪，未声称通过 Cambridge 官方编译器；Java 辅助实验源程序未修改。本轮没有剩余的已知教学阻断项。对当前内容一致性的判断置信度为高；尚无实际学生课堂试教证据。

## 工程验证与实际页面 QA

### 例程和答案

- `node scripts/render-course-v3.mjs` 成功：93 页、12 节、151 个兼容入口、208 个图示素材。所有改动来自内容源和生成器，未直接修补生成 HTML。
- 在仓库外编写独立、限定语法的伪代码模拟器，支持本节使用的声明、表达式、选择、循环、数组、局部变量、BYVAL/BYREF 和立即 RETURN；输入、随机数及预期输出来自例程 fixture。
- **52 个完整例程条目、131 个输入/边界用例全部通过**；同时检查规定的 caller 状态、输入消耗和随机抽样消耗。六对等价程序核对相同输出；效率例额外记录了比较、乘法和数组读取次数。
- **20 个答案片段在补全题设上下文后，共 36 个用例通过**。包括相等/负数的 Smaller、Discount 两路径、范围边界、Clear、Increase 与局部代码的声明需求。上下文只用于验证，未把局部题目改称完整程序。
- 五种故意错误都被检查器发现：把正数改为含零、错误初始总和、登录 AND 改 OR、Swap 改 BYVAL、早期 RETURN 改 OUTPUT。这是检查器的反例检查，不是另外五个通过的正确例程。
- `git diff --check` 通过。当前模型的 31 个详细讲解/Core/误解记录齐全，89 个题目 ID 唯一，目标引用及评分点数量一致；正式前置关系无环。

### 浏览器环境和检查结果

环境：本地 `http://127.0.0.1:8771`；Chrome 153.0.8010.36；1440×1000 和 390×1000。

采用 frontend-testing-debugging 工作流。**Browser plugin not available**，因此使用已有 Playwright 和本机 Chrome，没有安装浏览器或依赖。沙箱内 Chrome 启动被系统终止后，获工具审批在独立临时配置中启动；未连接用户的浏览器配置。图片检查先等待懒加载资源解码，避免把尚未进入视口的图片误报为缺失。

| 检查 | 结果与证据 |
| --- | --- |
| 页面身份、非空、错误覆盖层 | 19 个相关页面 × 两种宽度，共 38 次检查通过；含 L072–083、L053、L054、L084、L093、S11 索引、Assessment Bank 和 Practical labs |
| console / pageerror / HTTP 错误 | 0 个相关错误或警告 |
| 图片、横向布局 | 全部图片成功解码；页面级水平溢出为 0。图与宽表保留局部滚动 |
| 站内链接及锚点 | 193 个唯一目标检查通过，没有缺页或缺失锚点 |
| 默认答案状态 | 所检查课程的 lesson-stage 答案默认折叠 |
| 课堂交互 | 对 12 课分别执行 Teach one unit → Practice → 展开答案 → Next unit → 返回教学 → Show whole lesson；只显示当前单元及匹配目标的题目，换单元收起答案，恢复后显示所有单元 |
| 键盘滚动 | 手机视口中，L075/L080/L083 的图示区域可聚焦并用 ArrowRight 移动，scrollLeft 实际增加 |
| 无 JS / 打印 | L083 无 JS 时显示全部三个单元、工具栏隐藏；课堂模式下切换 print media 仍显示三个单元；补查全部 3 道练习与 4 道考试题可见、工具栏隐藏 |
| 目视证据 | 17 张 SVG 与桌面/手机实际页面截图逐项查看；包括新图、函数返回改图、课程首屏、手机横向阅读和综合程序接口上下文 |

临时证据保存在 `/tmp/as9618-s11-implementation/`：`program-results.json`、`answer-results.json`、`browser-results.json`、`svg-*.png`、`context-*.png` 与首屏截图。临时脚本为 `check_programs.py`、`check_answer_fragments.py`、`browser-qa.mjs`；未加入仓库的固定测试或题数门槛。补查 L081 长函数代码在手机上使用 15.2px 字体、保留缩进并局部横向滚动；L083 的考试题筛选显示 3 道相关题。结果另存 `final-target-results.json`。

截图示例：`lesson-075-1440.png`、`lesson-075-390.png`、`context-075-390.png`、`context-083-1440.png`。源码与图示已经保存在仓库；临时截图不作为学生资源依赖。

### 改动范围与未运行项

以本轮实施开始时的 744 文件 SHA-256 基线核对，未删除基线中的文件。S1/S10 的 48 个课程源、图示、页面和已有审查记录保持相同哈希；共用生成器、README 和全局内容合同只叠加本次所需变更，保留已有工作。进一步按 JSON 数据比较，S1/S10 的逐课内容合同与节测评条目均未变化。

本节源文件、六个新 SVG 及函数返回 SVG、12 课和节索引是主要改动。相关输出包括 L053/L054 的共享语法修正，L093 与题库，Practical labs 路线，L084 的相邻课标题导航，以及旧兼容入口中的 L083 标题。课程 CSS 的新增规则限定于 S11 知识单元。

未运行：官方伪代码编译器（项目未提供）、Java 实验编译（源代码未变）、其他浏览器/真实手机设备、纸张分页与实际课堂试教、离线发布 ZIP 构建与远程站点检查（本轮交付本地审批版本）。打印验证仅证明全部单元在 print media 可见，不等同于纸张分页验收。

## 本地审批入口

- [Section 11 总入口](http://127.0.0.1:8771/course-v3/section-11/)
- [L072 流程图翻译](http://127.0.0.1:8771/course-v3/lesson-072/#unit-2)
- [L075 拼接](http://127.0.0.1:8771/course-v3/lesson-075/#unit-3)
- [L080 参数与完整交换](http://127.0.0.1:8771/course-v3/lesson-080/#unit-3)
- [L081 返回路径](http://127.0.0.1:8771/course-v3/lesson-081/#unit-2)
- [L082 效率改写](http://127.0.0.1:8771/course-v3/lesson-082/)
- [L083 完整程序](http://127.0.0.1:8771/course-v3/lesson-083/)

预览服务若已停止，在仓库根目录运行 `python3 -m http.server 8771 --bind 127.0.0.1 --directory web`。本地审阅完成后，再由用户决定后续动作；当前不提交、推送或发布。
