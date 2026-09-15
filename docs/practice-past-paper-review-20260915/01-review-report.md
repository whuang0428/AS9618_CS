# AS 9618 全课程 Practice 与真实试题教学配置方案

> 归档说明（2026-09-15）：用户已授权将本方案与既有 Section 4 修改一同提交、推送。本方案仍待教学审核，尚未实施。下文“本轮只读／项目外／未提交”等描述记录的是此前审查阶段；文件和图片链接已改为仓库相对路径，教师原卷路径保留为来源记录。

**审查日期：2026-09-15。状态：方案及代表性样稿，等待教师审核。**

## 结论与交付导航

活跃课程为 **91节教学Lesson + L048、L093两节综合复习**。现有498项Practice与299项原创exam配置已逐课审查其任务和衔接。建议主配置保留或定向调整376项Practice，配入109个真题大题单元、151个子问出现位置，共476分；按原卷和题号去重是150个子问、472分。这些是全课程合计，不是任何课的统一题数或总分要求。

- [B：93课配置表及498项原Practice的逐项去向](02-lesson-configuration.md)
- [C：7个代表性教学样稿，含完整原题、官方评分和教师讲解](03-teaching-samples.md)
- [入选真题来源登记册：109条，含文件、页码、条件、适配及核验状态](04-source-register.md)
- [机器可读选题登记](selection-registry.json)、[Practice配置](practice-plan.json)、[频次逐子问主目标分配](frequency-events.json)
- [验证记录](05-verification.md)

**已经确定的展示方式**：公开课程直接呈现所选官方题目和对应官方mark scheme的完整内容；来源链接仅作补充。题目及必要材料默认可见；提示、教师解答、官方评分和得分解释默认折叠。用户最新指令覆盖现有相冲突的项目条款。本轮没有修改这些条款；实施时一起更新，不再询问展示方式。本轮未修改项目文件、未生成课程、未提交、推送或发布。

## A. 资料、统计与置信程度

### A1. 工作区和事实来源

根目录和实际工作目录均为 `/Users/kw/Documents/Projects/GitHub/AS9618_CS`，分支为main。开始时已有大量未提交修改和未跟踪文件，尤其Section 4及课程/Assessment生成结果。开始时记录Git状态及810个项目文件的SHA-256，结束时对照；详见验证记录。未利用“工作区干净”这种并不成立的前提。

已完整阅读[AGENTS.md](../../AGENTS.md)、[TEACHING_STANDARD.md](../../TEACHING_STANDARD.md)、[README.md](../../README.md)，并核对[当前课程清单](../../course-v3-map.md)、实际93条lesson contract和93个活跃HTML。课程知识点、Practice和旧exam从当前源/生成内容交叉检查，不照搬旧44+44课配置。

本轮“审查所有Lesson”指知识分工、题目任务、范围和前置的逐课审查；不声称已对全部498条既有答案逐一做执行测试或穷举评分。本轮完整执行核对的是样稿中的计算、SQL和算法，原题真实性核验则覆盖全部入选题。

### A2. 实际材料范围

教师已有资料目录：`/Users/kw/Documents/Teaching/AS CS 9618/past-papers`。

| 范围 | QP | 对应MS | 其他材料 | 本轮用途 |
|---|---:|---:|---|---|
| 2023 M/J、O/N；11/12/13、21/22/23 | 12 | 12 | 两季ER及GT | 全文提取定位，核心variant 2全文审读，额外候选复核 |
| 2024 M/J、O/N；11/12/13、21/22/23 | 12 | 12 | O/N GT；缺M/J GT | 同上 |
| 2025 M/J、O/N；11/12/13、21/22/23 | 12 | 12 | 两季GT | 同上；排除统一给分小问的评分贡献 |
| 合计 | **36** | **36** | **2 ER + 5 GT** | 79份教师PDF，无SHA-256完全重复文件 |

本轮区分三层，不能混称“36套都已详细分析”：

1. **检索库**：36份QP及36份MS全文提取，结合已有频次索引定位。关键词未命中不是不存在题目的证据。
2. **频次核心样本**：12组QP/MS，分别为2023、2024、2025的M/J和O/N，每季只取component **12、22**。共900名义分；2025 M/J /22的1(a)(ii)、1(b)(ii)各1分统一给满分，官方声明其MS未使用，故知识目标的可用评分贡献合计898分（P1 450，P2 448）。
3. **选题扩展审查**：在核心样本外，全文审读s24/11、s24/13、w24/13、s23/21、w23/21、s25/21六组QP/MS；另针对s23/13、w25/13、s24/21、w24/23打开相关完整页。合计涉及22组候选原卷/MS，最终入选来自其中21组。扩展variants用于找更适合本课的题，不混入核心频次分母。

核心样本清单：`9618_{s23,w23,s24,w24,s25,w25}_{qp,ms}_{12,22}.pdf`，其中花括号表示上述固定组合，不是其他年份的概括。

**原页核验**：已逐张查看登记的全部入选QP/MS相关页面，包括图表、代码、指针、上标、连线、跨页材料；另核验10份配套insert的封面及资源页、当前guide相关页和2025统一给分说明。253页的首批原页及补充4页均有查看记录；样稿另保留17个原页裁片和1个insert裁片。原题页的截图是核验/样稿材料，不表示已制作课程页面。[原页清单](visual-manifest.json)

### A3. 当前考纲与pseudocode依据

采用教师已有9618 2027–2029 syllabus v2（教师本地文件：`/Users/kw/Documents/Teaching/AS CS 9618/syllabus/9618-2027-2029-syllabus-v2.pdf`）及update（教师本地文件：`/Users/kw/Documents/Teaching/AS CS 9618/syllabus/9618-2027-2029-syllabus-update.pdf`），重点核对AS范围pp14–31、考试规则p11和更新说明p48。更新为2025年12月v2，涉及考试说明，不能由此推断新知识点已经有历年样本。

采用 **Pseudocode Guide for Teachers, 9618, exams 2027–2029, Version 1**。[本轮核验的PDF](9618_y27-29_sg.pdf)来自[Cambridge文件镜像](https://syllabus.papacambridge.com/directories/CAIE/CAIE-syllabus/upload/9618_y27-29_sg.pdf)。本轮访问[官方syllabus地址](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)和[官方guide地址](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf)遇到维护页；下载的HTML失败文件没有当成PDF使用。镜像文件封面、适用年、版本和正文已实际打开核验；仍记录这一取得途径，不把镜像说成官方服务器成功下载。

逐题适配的主要判据：

- 9618 AS Paper 1/2与2027–29范围匹配；原题的细节以它自己提供的条件为准。AS阶段可描述stack/queue/linked list的数组表示和增删改，但不应把ADT实现伪代码当作必需作答。因此L067–071采用图、文字步骤和操作解释。
- 数学基数、bit/byte、MiB、one’s/two’s complement明确区分。s24/11 Q7是三个加数；s23/12 Q4(b)是8-bit one’s complement，不能偷换成补码题。
- 当前guide中WHILE不用DO；FOR边界包含终点，起点超过终点的正步长循环可零次执行；RETURN立即结束函数；函数调用不写CALL；procedure未指定参数方式默认BYVAL，function参数不以BYREF传递。
- 文件WRITE会丢弃旧内容，APPEND保留旧内容；空文件EOF为TRUE。历史MS若写OPEN，本体忠实保留，教师解答使用当前OPENFILE并清楚说明。
- 字符串函数会给出。历史insert对长度1的STRING/CHAR及TO_UPPER的允许类型不能被别的年份惯例覆盖。样稿保留本卷函数签名、位置起点和限制。
- SQL限当前AS要求的至多两表DML。题干提供三/四表时可保留所有公共schema，解题只连接所需两表；不把schema多就误判成必须三表JOIN。
- 对“已经考过”的判断只包括真实考试，未把specimen列为past paper。本轮无需原创填补，因此没有把specimen或新增内容样本冒充历史频次。

**置信程度**：文件身份/题号/所选分值/登记页完整性为高；当前AS内容适配为高，但L062的教学先后需要落实短桥接，L090有官方资料内部疑点；历史主目标分类为中（含教师判断）；时间估计为中至低，需实际学生试做校准；任何未来考试概率为未知，本报告不预测。

### A4. 统计口径

- 单位是**不同试卷中的出现**。同卷多个小问考同类目标，分子仍只加1；其不重叠的原分值可以累加。
- 每个最末级子问只分配一个“主要评分目标”类别。其辅助知识在组合分析中记述，不能把该小问全部分值重复累计到每个相关类别。
- 下表是主要评分目标的粗粒度比较，不是每个微知识点的覆盖率；例如“文件处理6/6”不表示EOF单独问答6/6。可从事件表回到原题核验细粒度归属。本轮没有可靠计算的微点频次明确留空，不用索引关键词标签补成精确统计。
- 分类中P2“表达式/控制/字符串/子程序”把最终实现或解释控制机制作为主目标；“类型/数组/记录”把数据表示、数组处理作为主目标。一个数组程序仍可能依赖循环，两者不会各拿全分。
- variants并非三次完全独立年度命题证据。核心每季只取variant 2，避免资料较全的年份或三个variants给出三倍权重；代价是样本偏小且会漏掉其他variant的考法。不同variants仅用于配置多样性，不能据扩展候选说“该知识每季一定出现”。
- 文件先按SHA-256去重，再按syllabus/year/series/component识别试卷；同一试卷改文件名不会增分母。本地没有完全重复PDF。
- command words依据实际原题查看，**不直接采用索引里自动推断的recall/name等标签**。评分例题中“Explain”“Describe”“Write”“Complete”“Draw”“Tick”等各有不同答案形式；“列了几个点”不自动等于几分。


### A5. 仅限12卷核心样本的频次结果

每类分母是对应Paper的6卷。分值范围仅统计出现该主目标的卷，非出现卷为0；各类别累计分可相加，但不把辅助知识重复加分。

| 主要知识/评分目标 | 出现卷数 | 累计相关分 | 出现卷内相关分范围 | 实际设问和能力例子 |
|---|---:|---:|---:|---|
| 数字/字符/二进制数量表示 | 5/6 | 28 | 4–7 | Calculate/Convert/Tick：s24/12 Q7(a–c)，统一单位与明确表示法 |
| 图像、声音与压缩 | 4/6 | 26 | 4–8 | Explain/Estimate：w23/12 Q6(b–c)，量化准确度与像素容量 |
| 网络与通信 | 5/6 | 69 | 8–19 | State/Explain/Draw/Describe：s25/12 Q6(a–e)，WAN、蜂窝、地址、拓扑与switch |
| 硬件设备、存储与控制 | 4/6 | 36 | 7–10 | Describe/Explain：s24/12 Q2(a)，VR感知到显示；w24/12 Q9监测 |
| 布尔逻辑 | 6/6 | 27 | 4–6 | Construct/Complete/Draw：s23/12 Q6(a–b)，表达式→电路/表 |
| 处理器、汇编、寻址与位操作 | 6/6 | 77 | 7–19 | Complete/Describe：s24/12 Q5(b)逐行位运算；w23/12 Q9(b)整段追踪 |
| 系统软件、翻译器、IDE与libraries | 5/6 | 55 | 4–20 | Explain/Describe：s24/12 Q6，memory/process各组上限；s23/12 Q7库和IDE |
| 安全、隐私与验证 | 5/6 | 25 | 2–8 | Describe/Explain：w23/12 Q5(a–c)，privacy/integrity与威胁机制 |
| 伦理、许可与AI | 4/6 | 32 | 3–12 | Explain：w24/12 Q5(a–b)对象责任与许可；s25/12 Q3 AI情境 |
| 数据库与SQL | 6/6 | 75 | 10–16 | Write/Describe：s24/12 Q4，表定义与关系；w25/12 Q4连接计数与开发接口 |
| 类型、数组、记录及数组处理 | 6/6 | 107 | 11–26 | State/Give/Write：s25/22 Q1(d)，维度、容量和声明；w25/22 Q8记录处理 |
| 表达式、控制结构、字符串与子程序 | 6/6 | 134 | 8–31 | Write：s23/22 Q4完整GetNum；w25/22 Q4(b)嵌套STEP |
| 文件及文件处理整合 | 6/6 | 59 | 7–12 | Complete/Explain：w25/22 Q3(a–c)，文件模式、三行合并与分隔设计 |
| ADT表示与操作 | 4/6 | 34 | 5–13 | Describe/State：s23/22 Q3(a)，循环队列及有效数量；w23/22 Q3数组链 |
| 抽象、分解、细化与设计图 | 6/6 | 69 | 9–16 | Describe/Complete/Draw：s24/22 Q7(a)分解；s23/22 Q7(b)状态图 |
| 错误、测试、生命周期及维护 | 6/6 | 45 | 3–13 | Explain/Complete：s25/22 Q2(b)测试方法；s24/22 Q5错误分类与定位 |


这些数值说明的是这个样本中哪些教学任务反复得到评分，不能转换成未来考试概率。主目标分配及逐卷分值见[频次摘要JSON](frequency-summary.json)和[事件表](frequency-events.json)。例如硬件出现4/6不构成删去laser/flash理解检查的理由；当前考纲明确要求的九类设备仍通过Lesson 016的理解任务检查。

**组合考查的实际例子**：

- s24/12 Q3：扫描答卷应用中组合安全、加密、thin client、网络连接。L007只取thin-client子问并带公共题干；安全子问分别放L034、L036。辅助扫描背景不获得重复安全分。
- w23/12 Q6：实时媒体压缩、采样分辨率、位图容量。分配到L048、L006、L005；不会因为同题号就让L005提前完成所有媒体内容。
- w25/22 Q8：records、数组、有效记录判断、函数/过程、效率、文件。L082取8(b)，保留record和unused约定；按数组记录处理主目标统计，循环/RETURN为辅助方法。
- s25/21 Q6（扩展候选，不在频次分母）：非负传感器测试与二维成对排序。测试子问先在L089，排序留L093。重复的测试4分标为已见；不能把两次教学算作两次命题。

### A6. 材料缺口、未采用候选与原创例外

| 情况 | 具体记录 | 本轮处理 |
|---|---|---|
| 本地无配套insert | 教师past-papers目录没有insert；本轮补核验s23/21、22；w23/21、22；s24/21、22；w24/23；s25/21、22；w25/22，共10份 | 从Cambridge原文件镜像读取，路径、来源和SHA随入选题登记；原卷原有函数约定保留 |
| 其他年份/考季未进入样本 | 2021、2022、2026、March卷未审阅；没有取得2027实考卷 | 不声称涵盖全部历年或新增考纲未来题；不把未检索当作无题 |
| Examiner report不足 | 只有2023两季ER，未将任何选定失分断言建立在具体ER段落上；2024/25 ER不在本地 | 所有错误例子标教师分析。未作“考官发现很多学生……”表述 |
| 历史题适合后教 | s25/22 Q7(a)涉及函数/二维客户记录；s25/21 Q6(b)涉及procedure和二维同步交换 | L063/64不硬塞；线性搜索在L082回访，排序原题在L093 |
| 当前课与后课同一功能 | L045 DDL/DML角色、L052 IPO、L066 ADT概念 | 理解检查保留；真实运用题在L046/47、L055/61、L067–071，无需每课重复定义题 |
| 小前置尚未完成 | L062 E079使用MOD，正式运算教学在L074 | 方案明确先给当前guide定义参照或延后回访；不是完全无前置缺口的直接投放题 |
| 原题/MS表面不一致 | w23/22 Q4(b)要求只用valid；MS包含一条无99终止输入的备选 | 保留官方原文，教师示范只用题干允许的数据；不擅自解释该备选必然有效；作为编辑核对记录 |
| 评分细则未实际采用 | s25/22 Q1(a)(ii)、1(b)(ii)官方说明统一满分 | 不入选；名义总分与可用评分分值分开统计 |
| 文档取回受阻 | 官方syllabus/guide网址返回维护页 | 使用已核验本地syllabus和镜像guide，记录取得途径；未把失败HTML误认为原卷 |

**原创例外登记：0项。** 本方案没有以“Original exam-style question”填补任何所谓找不到的真题。五节课本次独立真题为0，是因功能衔接或先后安排；并非声称该知识从未考过。若审核要求这五节每课即时出现独立真题，应继续按具体目标查其他年份/variants，不能只把已知综合题改数字后标成真题。

### A7. 相关重复与Assessment Bank边界

本轮读取14组Assessment Bank的相关题干和其源配置，核查衔接，不做题库正确性全面重写。

| 具体重复/衔接 | 判断与安排 |
|---|---|
| L003 P5/P6均穿零借位；L014 P2/P5均/26本地路由判断；L040 P4/P8仅试用期限变化 | 主配置各留能够解释过程/使用条件的一项，其余可选 |
| L048 P2 “Compare two closely related ideas from Section 3”没有指定比较对象，答案只是考纲条目 | 明确删除这项泛化配置，不将其视为有效4分综合题 |
| L024状态恢复、L048 `REV-P1-S4-Q2`、Bank `A-P1-4(a)`沿用PC=330、ACC=18→65、IX=4、ADD #2 | 属实质已见场景，若Bank照现状使用须标已练习后的迁移不足；本轮不改Bank，实施该Section时只处理这一衔接点 |
| L081函数/过程区别与L093 P1；L064、L093 P7、`A-S10-2`、`A-P2-6`都含一趟冒泡 | 概念可复现，但不能称全部新考法；真实L093二维成对排序增加关联数据保持与效率要求 |
| L092、L093 `REV-P2-S12-Q4`、`A-S12-4(b)`、`A-P2-8(b)`均用固定50改可配置PassMark | 重复已熟悉接口修改背景；review主样和Bank间隔安排，成绩解释注明熟悉度；不再在新真题区追加同型原创 |
| L047聚合查询与L048 P27、Bank两表查询 | 主题相同可以接受；新题分别教JOIN+GROUP BY+alias、UPDATE与精确WHERE，Bank保留整卷整合功能 |

共用官方题干并不自动构成重复：L053/055、L054/079、L069/070执行的是构造识别/细化、画图/justify、链更新/数组映射等不同任务。页面注明selected subparts，工作材料记已见背景；旧问答案不能提前出现在新问题干。

## D. 实施方案（批准后执行，本轮不执行）

### D1. 按实际内容所有者修改

所有路径相对于已确认项目根目录，以下文件均实际存在。

| 范围 | 内容及练习源 | 程序/图示/评估配套 |
|---|---|---|
| S1 | `scripts/course-v3-section1-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-examples.mjs`、`-diagrams.mjs` |
| S2 | `scripts/course-v3-section2-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-diagrams.mjs`、`-teaching-diagrams.mjs` |
| S3 | `scripts/course-v3-section3-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-examples.mjs`、`-diagrams.mjs`、`-teaching-diagrams.mjs` |
| S4 | `scripts/course-v3-section4-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-programs.mjs`、`-assessments.mjs`、`-diagrams.mjs`；现有未提交工作优先保护 |
| S5–S7 | 各自`course-v3-sectionN-content.mjs` | S6 diagrams；S7 visuals；相关Bank在assessment contract |
| S8 | `scripts/course-v3-section8-content.mjs` | `-sql.mjs`、`-exact-visuals.mjs`、`-diagrams.mjs`、`-visuals.mjs` |
| S9 | `scripts/course-v3-section9-content.mjs` | `-programs.mjs`、`-diagrams.mjs` |
| S10 | `scripts/course-v3-section10-content.mjs`、`-teaching.mjs` | `-programs.mjs`、`-diagrams.mjs` |
| S11 | `scripts/course-v3-section11-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-programs.mjs`、`-assessments.mjs`、`-diagrams.mjs` |
| S12 | `scripts/course-v3-section12-content.mjs`、`-teaching.mjs`、`-questions.mjs` | `-programs.mjs`、`-assessments.mjs`、`-diagrams.mjs`、`-teaching-diagrams.mjs` |
| 汇总/前置 | `scripts/course-v3-content.mjs`、`course-v3-teaching-support.mjs`；部分旧数据仍由`course-v2-content.json`进入模型 | 两节review由汇总及各Section追加，不能只改HTML |

`-questions.mjs`等缩写指同一行的`course-v3-sectionN`完整前缀。生成的`course-v3-contract.json`是检查输出/所有权的依据，不应绕过其内容源单改它。

建议新增一个正式选题manifest与相应教师讲解模块，承接本轮JSON字段；这是**拟新增**，不是声称项目已有。官方内容、官方评分、教师讲解分别存储并有sourceType，禁止单个markLogic数组混装全部内容。原PDF和页面资源均记录原文件哈希、页码、选取区域/子问及核验人/日期；不把本轮临时绝对路径写进公开页面。

### D2. 页面与规则需要同时改变的地方

1. `TEACHING_STANDARD.md:15`及README的公开不收录/仅元数据说明，按用户已确定要求改为如实展示并严格核验、区分官方和教师内容。无须再征求展示方式。
2. `scripts/render-course-v3.mjs:210`的原创免责声明和单段task/markLogic渲染需改；`:230`栏目改名为 **Past-paper questions and exam technique**。不沿用“original task”来源说明。
3. 目录`:142`、课堂stage按钮`:161`、`scripts/course-v3-classroom.js:35`附近的旧`original-exam-style-question`选择器必须同步迁移或保留兼容锚点；来源名、题号、总分、单位筛选一起更新。没有独立真题的课显示衔接安排，不造空题。
4. 图表/代码保留精确原样，文字转录必须对照PDF。题目区只含原题及必要材料，公共context作为共享资源显式依赖；不得从MS取答案混入题面。每个折叠块分别标Teacher/Official。
5. 正式页面建议以核验后的语义文字、表格、code及原图组成可读题面，并提供原页查看；样稿用PDF裁片展示忠实内容。复杂原图可保留原页裁图，但须另有不泄露答案的等价可访问描述。转录不是改写；OCR里的上下标、符号、索引和连线逐项复核。
6. `scripts/render-course-v3.mjs:435`及后续asset/contract收集需要覆盖新题图、答案图、原页资源及其折叠归属。只把图片放入assets但不纳入contract会使离线包丢资源。
7. **实际打包阻断**：`scripts/build-course-release.py:87`当前拒绝`.pdf`和路径含`past-papers`的输入。批准实施后应将这一 blanket ban改成“已登记且已核验的课程资源允许进入release”的规则，并纳入manifest；本轮不改。不能通过把文件随便改名绕开而保留冲突规则。

### D3. 现有命令与拟做验证分开

当前真实存在：

```text
node scripts/render-course-v3.mjs
python3 scripts/build-course-release.py
python3 -m http.server 8769 --directory web
python3 tools/extract_past_paper_frequency.py --help
```

- 第一个会写活跃HTML、资源、内容contract及兼容入口，本轮未运行。
- 第二个生成dist ZIP及hash，本轮未运行。
- HTTP server只是预览，不是验收器；本轮没有生成页面，因此未进行新课程浏览器验收。
- `tools/extract_past_paper_frequency.py`确实存在，但只供提取候选元数据，不能证明选题适配、command word正确或官方评分准确。本轮不刷新项目里的索引。
- 当前仓库已不含独立validation scripts，也没有固定题数gate。旧记忆中的`verify-all.mjs`、`verify-stage5-mark-schemes.mjs`等不能作为此项目当前可运行检查。README对此已有明确说明。

以下是实施后**需要执行的验收工作，部分需新增临时检查工具**，不是虚构已有脚本：

- 教学：逐题独立解答；核对前置；用mark scheme实际限制逐点评分；确认替代答案、分组上限和依赖；审查每题相对Practice增加的任务。
- 来源：manifest完整、哈希匹配、每个子问有QP和MS、所需跨页/insert/图表齐全；有未核验字段不得当成正式题发布。
- 数值/程序：容量与单位复算；状态表对照执行；SQL用明确教师测试fixture核对输入/输出和修改范围；算法检查无输入、末项、全满、无匹配及原题规定的其他边界。不把fixture伪装为原题数据。
- 工程：生成前后比较93条路由和内容所有权；新资源进入contract和离线包；链接/锚点存在；原题默认可见，所有解题与评分默认折叠；课堂知识点筛选不隐藏必要公共材料。
- 呈现：桌面与390px检查长题、代码缩进、指数、表格、指针箭头、横向滚动；键盘可展开、读取；打印时明确题卷/教师答案输出选择。抽样从实际页面作答，不能只看HTML源。
- 整体回归：保留Assessment Bank范围、Resources、兼容入口、课堂控制及离线解压后导航；生成成功和ZIP存在只证明工程步骤成功，不等于教学验收通过。

### D4. 按Section推进顺序与门槛

1. 先落实共享官方/教师内容模型和7份样稿的显示功能，连同冲突条款、栏目及打包规则，完成本地审阅。
2. S1→S2→S3：基础表示、网络、硬件；优先看单位/编码/图表和前置。高密度L016、L037按教学周期安排，不能因题数多便删机制。
3. S4→S5→S6→S7→S8：处理器执行到系统软件、安全、责任、数据；S4从用户当前未提交内容继续；S8检验DDL/DML语义与SQL数据。
4. 更新L048，核对已见题与Bank同源任务的使用说明，再做Paper 1范围回归。
5. S9→S10：先算法表示后数据结构；落实L062 MOD参照或延后选择，保留L063/64理解训练和后续真题回访。
6. S11→S12：完整编程、函数、效率、开发与测试；区分历史insert和当前guide，保留官方MS原文疑点记录。
7. 更新L093，标明s25/21 Q6(a)已见4分，执行二维排序和文件综合样题，再做全课程/离线回归。

每段完成的门槛是：内容源与生成结果一致、每题来源齐全、学生能独立作答、教师答案经核对、折叠和图文可读；不使用“所有课至少三题”之类结构指标替代教学判断。批准实施仅授权本地修改和验证；提交、推送、发布仍须另行明确指令。
