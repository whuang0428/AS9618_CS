# Section 5 教学实施与本地验收

> 历史记录：本文记录 2026-09-15 的旧版 23 单元验收。2026-09-29 现行版本采用 19 个初学者知识组，源文件为 `scripts/course-v3-section5-journey.mjs`；来源与本次验证见 `docs/section-5-source-review.md`。下文旧版页面结构和验收结论不适用于现行版本。

状态：已按本对话批准的整体方案实施，等待用户本地审批。未提交、推送或发布。

范围：Cambridge AS Level Computer Science 9618（2027–2029），Lesson 028–032；检查日期：2026-09-15。依据根目录 AGENTS.md、完整 TEACHING_STANDARD.md 和 README。保留五课、23 个单元、29 个项目目标；目标编号用于项目追踪，并非官方新增编号。

## 1. 官方依据、课程分工与边界

本对话规划阶段已读取本地官方 `9618-2027-2029-syllabus-v2.pdf` 第 23 页（5.1 System software、5.2 Language translators），并对照第 35 页的 A Level 深度边界。文件位于 `/Users/kw/Documents/Teaching/AS CS 9618/syllabus/`。同目录 syllabus update 涉及第 11 页考试安排说明，不改变 Section 5 内容。适用 pseudocode guide 使用 `docs/practice-past-paper-review-20260915/9618_y27-29_sg.pdf`。官方在线 PDF 入口当时返回维护页，因此没有声称完成新的在线下载；本次依据可读取的官方本地文件。

| 课程 | 已落实的教学分工 | 前置 | 后续连接与停止深度 |
| --- | --- | --- | --- |
| L028 | OS 用途 → memory/process → file/security/hardware；沿共享课表案例区分资源与服务 | L017、L021、L024 | 连接 L034、L036 和 L048；不展开 paging、调度算法和时间计算 |
| L029 | 六类 utility 的用途与限制 → library caller → DLL 依赖及兼容更新 | L006、L016、L028 | 参数/函数的系统语法留到 L080–081；本课给足读懂完整调用程序的规则 |
| L030 | assembler 的输入输出 → native build → high-level interpretation；同一计算比较两种模型 | L025、L028 | 连接 L031–032；不重复两遍汇编，也不把伪代码交给未指定的真实编译器 |
| L031 | 依据工作流程选择 translator → Java source/class/runtime 的完整变化 | L030 | JIT 与运行版本限制明确为折叠的 Optional extension；不展开优化器和 JVM 内部 |
| L032 | context prompts → syntax diagnostics → formatting/folding → 完整 debugger 过程 | L030–031 | L087–090 承担系统测试方法；本课完成当前小程序的定位、修正和重跑 |

前置和后续链接分别标为 **Before this lesson** 与 **Related review and later applications**。课程页保留英文学生正文。课时不机械限定为一次 45 分钟；L029 可按 utilities 与 libraries/DLL 分两段教授，题目时间是独立作答估计，不包含讲授。

## 2. 知识、讲解与独立学习证据

以下各行均已落实。表中 `L01-Q7` 等为稳定题目 ID 的末段，例如 `S5-L01-Q7`，不等同于页面重新排列后的 Question 7。每个单元另有默认折叠的 **Check your understanding**。

| 知识点 / 项目目标 | 官方依据、深度与学生任务 | 讲解与具体例子 | 独立应用或误解检查 | 实际位置 |
| --- | --- | --- | --- | --- |
| OS need / S5.01.A01 | 5.1；解释共同服务为何必要 | editor 请求保存；允许写入与拒绝写入都返回结果 | L01-Q7；应用功能不等于 OS 服务 | [L028 unit-1](web/course-v3/lesson-028/#unit-1) |
| Memory / A02 | 5.1；解释分配、保护、释放 | 12 blocks 中 OS 固定占 2；editor 4、player 3；退出后再分配 | L01-Q2；释放 RAM 不等于保存文件 | [L028 unit-2](web/course-v3/lesson-028/#unit-2) |
| Process / A06 | 5.1；解释等待时如何利用 CPU | editor running→waiting→ready→running；player 使用等待区间 | L01-Q6、Q7；ready 不等于正在运行 | [L028 unit-3](web/course-v3/lesson-028/#unit-3) |
| File / A03 | 5.1；区分路径、内容、metadata 与操作 | create/open/write/close/reopen/read/close；最终读回 Binary revision | L01-Q3；缺失路径与正常读回对照 | [L028 unit-4](web/course-v3/lesson-028/#unit-4) |
| Security / A04 | 5.1；区分身份认证与授权 | Teacher 写 Room 7；Student 的 Room 9 仅留在未保存工作副本 | L01-Q4、Q7；登录成功不授予所有写权限 | [L028 unit-5](web/course-v3/lesson-028/#unit-5) |
| Hardware / A05 | 5.1；区分 driver、job queue、buffer | job A 完成后 job B 传输、打印、完成 | L01-Q5、Q7；队列管理任务，buffer 暂存传输数据 | [L028 unit-6](web/course-v3/lesson-028/#unit-6) |
| Formatter / S5.02.A01 | 5.1；按初态选择工具 | 已知空 volume 建立 file system；已有重要资料时不能当恢复步骤 | L02-Q9；optional Q1 | [L029 unit-1](web/course-v3/lesson-029/#unit-1) |
| Virus checker / A02 | 5.1；说明扫描、隔离与恢复区别 | 虚构 SampleTool 的更新、扫描、隔离记录 | L02-Q9；未检测到不证明所有威胁不存在 | [L029 unit-2](web/course-v3/lesson-029/#unit-2) |
| Defragmentation / A03 | 5.1；解释 HDD placement 与 seek | 保留 A1–A3、B1–B2 和两个 free blocks，只改变排列 | L02-Q3；不压缩内容，HDD 机械寻道解释不套到 SSD | [L029 unit-3](web/course-v3/lesson-029/#unit-3) |
| Contents analysis / repair / A04 | 5.1；按报告选择操作 | 70+25+5=100 GB 正常容量报告，对比 allocation inconsistency | L02-Q4；满盘不证明损坏，repair 不保证恢复物理不可读数据 | [L029 unit-4](web/course-v3/lesson-029/#unit-4) |
| Compression / A05 | 5.1；完成无损归档与还原 | ASCII A.txt=ABCABC、B.txt=001100；分别解压、逐内容比对 | L02-Q9、理解检查、optional Q5；小 archive 可因 overhead 变大 | [L029 unit-5](web/course-v3/lesson-029/#unit-5) |
| Backup / A06 | 5.1；说明恢复版本与限制 | 09:00 V1；09:30 V2；失效后恢复 V1；有 09:35 副本则可恢复 V2 | L02-Q6 改用 Draft A/B 独立判断并要求 restore check | [L029 unit-6](web/course-v3/lesson-029/#unit-6) |
| Library / S5.03.A01–02 | 5.1；解释复用与正确调用 | 提供 SQRT interface、完整 caller、81/0/−4 三路结果 | L02-Q7；返回值不等于 OUTPUT，正确库不能修正错误调用 | [L029 unit-7](web/course-v3/lesson-029/#unit-7) |
| DLL / A03 | 5.1；从代码位置解释开发收益 | 两个 caller 共用 Label.dll；兼容修正与缺少 MakeLabel 对照 | L02-Q8；同文件名不能证明 interface 兼容 | [L029 unit-8](web/course-v3/lesson-029/#unit-8) |
| Assembler / S5.04.A01 | 5.2；区分翻译与执行 | LDM #6、ADD #4、STO 200、END；最终 ACC 与 Memory[200] 均为 10 | L03-Q1；没有 ISA 编码表就不编造 binary opcode | [L030 unit-1](web/course-v3/lesson-030/#unit-1) |
| Compiler / A02 | 5.2；追踪 source、build、run | A 输出 6；仅编辑 B 仍运行 A；重新 build 后输出 12；保留旧 build 的失败情境 | L03-Q2；build 成功不证明算法正确 | [L030 unit-2](web/course-v3/lesson-030/#unit-2) |
| Interpreter / A03 | 5.2；按 control flow 跟踪 | 同一完整循环的 4 次条件检查、3 次循环体与结果；0 次循环和除零变式 | L03-Q3；一行源码可多次执行或不执行 | [L030 unit-3](web/course-v3/lesson-030/#unit-3) |
| Choice / S5.05.A01–02 | 5.2；同因素比较，按需求给理由 | frequent edits、repeated execution、delivery 与 platform 对比 | L04-Q2；optional Q1 专门检查成对比较 | [L031 unit-1](web/course-v3/lesson-031/#unit-1) |
| Java / S5.06.A01 | 5.2；解释部分编译、部分解释 | Hello.java→javac→Hello.class→host JVM；完整编辑与重编译过程 | L04-Q3、Q4；compiler 缺失与 runtime 缺失不同 | [L031 unit-2](web/course-v3/lesson-031/#unit-2) |
| Coding prompts / S5.07.A01 | 5.2；说明提示的用途与限制 | Quantity * 后可用 UnitPrice/Delivery，须选择含义正确的变量 | 理解检查、optional L05-Q1；语法可用不代表算法正确 | [L032 unit-1](web/course-v3/lesson-032/#unit-1) |
| Dynamic syntax / A02 | 5.2；根据 diagnostic 修正语言规则错误 | Total <- Total + 缺 operand；对比合法的错误 subtraction | L05-Q2、Q5；报错位置未必是最初错误处 | [L032 unit-2](web/course-v3/lesson-032/#unit-2) |
| Pretty-print / folding / A03–04 | 5.2；区分编辑视图与执行 | 同一完整 IF 的格式化、无缩进、折叠视图；60/49/50 两分支与边界 | L05-Q3；隐藏代码仍按 control flow 执行 | [L032 unit-3](web/course-v3/lesson-032/#unit-3) |
| Debugger / A05–08 | 5.2；预测、暂停、step、inspect、output、修正、重跑 | 12−4→8；watch 在操作前 16、操作后 12；修正后输出 16；附完整 Java 等价程序 | L05-Q4；新 Q5 用 wrong variable，6 与 watch 12 分开 | [L032 unit-4](web/course-v3/lesson-032/#unit-4) |

### 教学自审结论

- 学生角度：代码给全声明、初态和收尾。L029 提供必要的 IF/INPUT/OUTPUT/call 阅读规则，L030 提供 WHILE 阅读规则，避免依赖尚未学习的完整编程章节。操作概念表明确不冒充可运行程序。
- 教师角度：每课都有进入问题、课程路线和教学检查点。OS 的资源分工、utility 的相似用途、translation 与 execution 的差异可连续讲解；表、图、完整程序承担不同任务。
- 评阅角度：重新核对 29 个目标、题目要求与答案点。Java 重编译题仅映射 Java 目标，不用该题冒充 compiler/interpreter 比较证据；成对比较另由 L031 的对照讲解、选择任务与 optional Q1 承担。
- Core 每单元保留 1–2 条考试要点，Detailed 承担完整解释。JIT 单独折叠；其他必要补充交代用途和边界。没有把工作记录写入学生正文。

## 3. Practice、真题和累计复习

| 课程 | Core 题数 / 教师分 | Optional 题数 / 教师分 | Core 独立作答估计 | 所选真题 / 分值 | 真题估计时间、依赖与增益 |
| --- | --- | --- | --- | --- | --- |
| L028 | 6 / 18 | 1 / 2 | 22–29 分钟 | E039：2024 M/J 12 Q6，4 分 | 6–8 分钟；memory/process；检查两类管理及每类评分上限 |
| L029 | 6 / 21 | 3 / 6 | 28–36 分钟 | E040：2023 M/J 12 Q7(a)(i–ii)，6 分；E041：2023 O/N 12 Q8(b)，3 分 | 12–16 分钟；library/DLL/utilities；解释两个收益并遵守题目排除条件 |
| L030 | 3 / 10 | 0 / 0 | 14–19 分钟 | E042：2025 O/N 12 Q10(a)，4 分 | 6–8 分钟；assembler/compiler/interpreter；按题干区别功能 |
| L031 | 3 / 11 | 1 / 4 | 13–18 分钟 | E043：2023 M/J 12 Q7(b)，3 分 | 5–7 分钟；比较与选择；选择本身不得分，理由须满足情境 |
| L032 | 4 / 16 | 1 / 2 | 20–28 分钟 | E044：2023 M/J 12 Q7(c)，4 分 | 7–10 分钟；IDE facilities；根据指定操作解释用途 |

合计 22 道 core、76 教师分；6 道 optional、14 教师分。原有题目 ID 全部保留，新增 L01-Q7、L02-Q9、L04-Q4、L05-Q5；调整有效旧题的条件、答案和分值，不规定固定题数门槛。分值标为 teacher-written，不能当成官方评分。

六个真题来源组保留七个 selected parts，共 24 分。沿用已核验原题、必要公共题干、QP/MS 裁切、来源和教师说明；本轮不改官方文字和裁切。对应 QP PDF 页码：E039 13；E040 13；E041 13；E042 15；E043 13；E044 13–14。MS 页码分别为 9、9、9、11、9、10。可追溯记录在 `scripts/past-paper-source-manifest.json` 和生成 contract；本轮没有重新逐页审阅这些未改动的原始试卷 PDF。

检查后保留 L048 的 S5 综合提取表、20 分 Section 5 check（4×5）和 9 分 Paper 1 A-P1-5：已有 OS/utility、library/DLL、translator/Java 和 debugger 的具体应用，答案可由修订课程推导。Section check 不是 29 个目标逐项各出一题；完整覆盖依靠课内讲解、理解检查、Practice 和这些累计任务共同完成。

## 4. 图示交付与事实核对

| 图示 | 位置和用途 | 已核对内容 |
| --- | --- | --- |
| `os-request.svg` | L028 unit-1；替代旧服务总览 | request→permission→allowed/refused→result；拒绝路径不改变保存内容；允许路径仍可遇到 device error |
| `translation-stages.svg` | L030 unit-1；新增三种模型对照 | source、translator、target/effect；assembler 的 target ISA；link if needed；无虚构 opcode |
| `java-build-run.svg` | L031 unit-2；替代旧 Java 图 | .java→javac→.class→JVM→output；正确命令与旧 class 结果；修正 launch 标签的位置 |
| `ide-editor.svg` | L032 unit-1；新增编辑辅助示意 | 两个可选 identifier、缺 operand 的 diagnostic、隐藏而未删除的 IF；不冒充产品截图或真实 IDE |

复用八张 SVG：memory、processes、printer-services、defrag、backup-restore、library-call、dll、debugger。memory 图的第二个进程是 browser，正文已说明同一机制应用于案例的 music player，避免把示意标签当成案例数据。

图由 `scripts/course-v3-section5-diagrams.mjs` 可复现，最终文件位于 `web/assets/course-v3/section-5/`；图示说明、alt 和事实 transcript 同源，SHA-256 写入 `scripts/course-v3-contract.json`。四张新图已逐张目视检查，并在课程 390px 布局查看。复杂 SVG 最小显示宽度为本征宽度的 80%，保留局部滚动、提示和 full-size 入口；没有需要新增的位图，未调用 ImageGen。

## 5. 工程验证

已运行和确认：

1. `node scripts/render-course-v3.mjs` 成功：93 课、12 个 Section、151 个兼容入口、518 个资源；源文件与五课生成 HTML 同步。
2. `/tmp/s5-example-qa.py`：从共享源码读取并解析 10 份伪代码，15 个输入/输出用例通过；核对循环状态和两个 debugger 初态/执行后状态。**这是教学模型模拟，不是 Cambridge 官方解释器运行。**除零案例按正文声明的报错环境模拟。
3. Java 17 真实 `javac` / `java`：六项输出核对通过，分别为初版 Hello、编辑后运行旧 class、成功重编译、仅复制 class 的目的目录、DebugDemo 错误输出 8、修正后输出 16。目的目录没有源文件；本机使用已安装的 JDK/runtime，没有把这说成另一台机器的实测。未实操具体 Java IDE 的断点界面。
4. 临时目录中实际创建/写入/关闭/重开/读取文件，并用标准库 ZIP 压缩和解压两个 ASCII 文件；12 bytes 原文精确恢复，此次 ZIP 为 210 bytes，验证 tiny-file overhead 的边界。OS 权限、物理磁盘失败、DLL 更新为明确的概念情境，没有对用户设备执行这些操作。
5. `/tmp/s5-structure-qa.mjs`：23 单元和 29 目标完整；各单元有 Detailed、精炼 Core 和折叠检查；题目目标/分值一致。与 Git HEAD 的 contract 对照，其他课程内容、S5 原题 ID 和真题记录保持一致。
6. `/tmp/s5-link-qa.py`：五课和 Section 5 入口共 250 条本地链接/图片引用及目标锚点通过；六页没有重复 ID。
7. 实际浏览器桌面 1280px 与 390×844 窄屏：五课均有正确标题和 23 个 Detailed，默认答案折叠，无整页横向溢出。桌面逐一选取 23 单元及各课四阶段，共 20 次阶段切换，通过。
8. 手机 L032 展开新调试题答案后切换单元：答案重新收起，只显示对应的 presentation 题；IDE 图方向键滚动从 0 到 40，并用横向滚动到达 608/608 的右边界。Java 源码块可聚焦并保留局部滚动；L031 真题的官方评分展开正常。
9. 独立课程浏览器页重新访问五课，控制台 warning/error 为 0。曾打开独立 SVG 的另一工具页记录四条无来源 URL 的 `animation` TypeError；SVG 无脚本且独立课程页未复现，因此倾向浏览器工具侧问题，未声称已定位根因。一轮过长的浏览器批量操作超时后改为短调用完成课程复核。
10. 最终再次生成，所检查的课程 HTML、四张 SVG 和 contract 与前次输出逐字节一致；`git diff --check` 通过。检查实际变更清单后，恢复默认浏览器宽度并打开 Section 5 的五课审批入口。

未运行：离线 ZIP release、远端 CI、发布部署、真实处理器汇编、具体 IDE 自动化。原因：本次交付为本地教学审批；计算模型与真实 Java 执行已分开验证，未扩大到环境安装或发布。项目没有固定独立测试脚本，一次性 QA 保留在临时目录，不新增依赖或测试门槛。

教学覆盖和已验证程序结果的置信度：高。课内时间是教师估计，需按班级实际调整。

## 6. 本地审批与修改位置

入口：[Section 5](http://127.0.0.1:8769/course-v3/section-5/)。建议按 L028→L029→L030→L031→L032 顺序审批，重点查看 L028 的保存/拒绝路径、L029 的工具边界、L031 的两版 Hello 和 L032 的完整调试与独立题。

若预览服务未运行：`python3 -m http.server 8769 --bind 127.0.0.1 --directory web`。

修改位置：S5 base/teaching/programs/questions/diagrams 源模块、课程前置链接、Practice allocation、renderer、生成 contract、L028–032 HTML、四张 SVG、README 和本记录。用户原有 `scripts/__pycache__/` 与 `参考书籍/` 未处理。
