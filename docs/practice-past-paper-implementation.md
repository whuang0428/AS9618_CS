# Practice 与真题教学实施记录

**状态：全课程本地实施和自审已于 2026-09-15 完成。用户随后明确授权将这批修改提交并推送至 main；以下内容保留实施阶段的教学和验证记录。推送将触发现有 GitHub Pages 工作流。**

依据：[已批准方案](practice-past-paper-review-20260915/01-review-report.md)、[93 课配置及全部旧 Practice 去向](practice-past-paper-review-20260915/02-lesson-configuration.md)、[来源登记](practice-past-paper-review-20260915/04-source-register.md)。归档保留审批时快照，其“待审核／只读”描述是历史阶段；当前状态以本记录为准。

## 1. 实施结果

- 91 节教学 Lesson 与 L048、L093 两节综合复习均已落实。Practice 为 376 项核心任务、121 项可选巩固；删除方案指出的 L048 泛化比较题一项。核心／可选选择和时间均来自已批准的逐课配置，不设统一数量。
- 新栏目为 **Past-paper questions and exam technique**：109 组选题、151 个子问出现位置、476 分；去重为 150 个唯一子问、472 分。s25/21 Q6(a) 的 4 分在 L089 和 L093 回访；不能把复习重复计为新的历史试题。
- 页面直接呈现完整所选官方题目与对应官方评分内容。306 个原页区域包括 288 个 QP/MS 区域与 18 个 insert 区域；原始图表、数据、代码和分值保留。官方图片不是教师改写或 OCR 重排。
- 每题具有针对性的审题、完整必要解答、评分对应和错误分析。简单单子问可合并教师讲解；复杂题分别展开。官方 MS 与教师内容分别标明，题目默认可见，其余默认折叠。
- L045、L052、L063、L064、L066 按方案保留理解性 Practice，提供具体后续真题入口。它们不是检索失败或资料缺失的原创例外。**原创例外仍为 0。**
- L048、L093 是可选组合的复习菜单，不宣称整页可在一课完成，也不作为统一限时模拟卷。

## 2. 内容变动与前置关系

| 位置 | 已完成的具体处理 |
|---|---|
| S2 cloud Practice | 提供服务保护条件，让学生根据已学内容解释；高级加密恢复问题作为学过 L037 后的可选巩固。 |
| L017 激光打印 | 改为可由已教流程诊断的“碳粉可擦掉”定影故障，题干、示范答案及分值一致。 |
| S4 Practice | 通过 STO 情境辨别 MAR/MDR 的地址和数据职责。已有完整状态恢复练习保留。 |
| S5、S6、S7 | 分别明确可执行代码中的逻辑错误、权限与外部明文副本的区别、伦理情境中的主体／行为／后果。 |
| S8 数据类型与 SQL | CHAR(1) 不接受 Code=AB；REAL 可接受 Duration=1.5。Stock 的插入、删除、更新保持连续状态，每题也提供独立作答条件；SQL fixture 与预期结果同步。 |
| 可选题转移 | De Morgan 从 L019 转至 L020；完整 ADD 执行从 L021 转至 L023；SELECT 从 L046 转至 L047。原问题与答案保留，避免依赖尚未教授的内容。 |
| L062 | 在运用真题偶数行判断前补齐 MOD 的短讲解及 17 MOD 5=2 示例。 |
| L068、L071 | 分别按原题定义处理“最后加入位置”与“下次插入位置”，不把不同 queue pointer 约定混用。 |
| L078 / E092 | 官方备选流程图忠实保留；教师说明其会在容量检查前再读一个值，另给出存满 20 项后立即结束的完整有效流程。 |
| L090 / E105 | 官方 MS 原样展示；教师指出“缺少 99”的官方示例与原题有效输入限制的冲突，选用三组满足原题的有效序列并列出预期奇偶计数。 |
| L092 / E107 | 两位长度前缀明确边界；教师例子单独标为自拟，说明若“任意字符”包括换行应先编码并一致计长。 |
| L093 | 二维排序交换整对关联数据，展示提前终止和缩小边界；文件题使用给定模块、APPEND、空行计数和关闭文件，区分历史 OPEN 与现行 OPENFILE。 |

详细逐课目标、选题新增价值、前置关系、候选淘汰和重复判断沿用批准配置。下方第 6 节记录成品的实际题量与入口；页面来源和解题均可逐题检查。

### Assessment Bank 的有限处理

- 只改 `A-P1-4(a)`：从已重复的 PC/ACC 数值恢复情境，改为未恢复比较状态使 `JPE 410` 在地址 330 处错误落到 331。维持该小问 3 分及其他子问，强调只恢复 PC/ACC 不足以恢复先前比较结果。
- 14 套题库结构、总分和其余内容保留。S10 的一趟冒泡、S12 的 PassMark 背景仍与课堂／复习相近；应间隔安排，解释成绩时考虑题目熟悉度，不把这些任务称作全新考法。题库来源说明已去掉“没有复用课堂情境”的不准确断言。
- 资源清单直接收集题库图示，避免旧 exam 配置被替换后，题库独用的 `logic-sectionCheck.svg` 从离线包遗漏。这是衔接修复，不是题库重写。

## 3. 来源、考纲和核验边界

- 选题仍来自批准方案中 21 对 QP/MS，即 42 份原卷及评分文件。实施时重新核对本地文件 SHA-256、题目文字和依赖；未扩展原频次分母。
- 历史频次继续只指 **2023–2025 M/J、O/N 的 components 12、22 共 12 卷核心样本**。检索库为 36 QP + 36 MS；其他 variants 为选题扩展，不混入核心频次。此处 21 对来源卷数不是新的频次样本。
- 采用教师本地 2027–2029 syllabus v2 与批准阶段核验的 Version 1 pseudocode guide。官方 syllabus/guide 地址本次仍返回维护页；没有把 HTML 当成 PDF，也没有声称从官方服务器重新取回文件。
- 原始页面的逐页视觉核验保留在批准归档。本轮另逐一复核 288 个 QP/MS 截取区域的上下边界、全部 18 个 insert 摘录，并全尺寸抽查复杂图形、代码、状态表和评分区域；检查裁切是否穿过字符。教师绘图逐张核对方向、数量、分支和文字位置。
- 实施中补齐相关 insert 的 MOD、AND/OR/NOT、字符串函数及类型、EOF、INT/RAND；用到 7 份已核验配套 insert 的相关区域。原历史 guide／insert 不被现行术语悄悄覆盖。
- [截取配置](../scripts/past-paper-extracts.json)保存确切边界及审核指纹；[来源清单](../scripts/past-paper-source-manifest.json)保存原文件／页码／SHA-256／图片区域。改变裁切会使旧审核失效；页面生成和离线打包均拒绝未审核或被改动的官方内容。
- **未发现已入选题缺少 QP、对应 MS 或必要页。** 没有使用 examiner report 支持新的失分统计，错误分析均标为教师分析。
- 置信程度：来源身份、分值和成品对应为高；已核对的教学解答为高，未把语义模拟称为官方编译器测试；历史分类为中；用时估计为中至低，仍需学生实际试做校准；未来命题概率未作判断。

## 4. 源文件与生成链

| 职责 | 文件 |
|---|---|
| Practice 分配、修正及转移 | `scripts/course-v3-practice-allocation.json`、`scripts/course-v3-practice-plan.mjs` |
| 官方原页截取和核验 | `scripts/past-paper-extracts.json`、`tools/render_past_paper_extracts.py`、`scripts/past-paper-source-manifest.json` |
| 教师考试教学 | `scripts/past-paper-teaching/section-1.mjs` 至 `section-12.mjs`、`review-1.mjs`、`review-2.mjs` |
| 课程组装与来源门槛 | `scripts/course-v3-content.mjs`、`scripts/course-v3-past-paper-content.mjs` |
| 课堂、展开、原文显示、教师图与打印 | `scripts/render-course-v3.mjs`、`course-v3-classroom.js`、`course-v3-past-paper-render.mjs`、`past-paper-teaching-diagrams.mjs`、`course-v3-past-paper.css`、`course-v3-past-paper.js` |
| 相关 SQL／题库 | `scripts/course-v3-section8-sql.mjs`、`scripts/course-v3-section4-assessments.mjs`、`scripts/assessment-bank-contract.json` |
| 规则同步 | `README.md`、`TEACHING_STANDARD.md`、`course-v3-map.md` |
| 生成成品 | `web/course-v3/`、`web/assets/past-paper-questions/`、课程 contract、题库 Markdown／HTML及入口 |
| 离线包 | `scripts/build-course-release.py` → `dist/AS9618-CS-2027-2029-course.zip` |

实际按共享模型 → S1–S3 → S4–S8 → L048 → S9–S10 → S11–S12 → L093 → 全课程回归推进。未仅修改 HTML，未增加依赖或恢复已删除的专用校验脚本；一次性核验脚本和截图留在项目外 `/private/tmp/as9618-implementation/`。

## 5. 教学自审与工程验证

### 教学自审

- 全部 93 课的核心／可选 Practice 去向与批准配置对照；109 组选题的教师内容逐条检查 command word、条件、方法、答案和分组评分上限。计算给过程和单位，追踪给状态，代码／SQL 给完整相关逻辑。
- 已运行 329 项语义核对：保留 SQL 的真实 SQLite 执行、教师 SQL 的自拟 fixture、单位／补码／逻辑／位运算、完整汇编追踪、教师伪代码的输入输出及边界模拟。SQL 测试数据明确为教师 fixture；伪代码模拟不是 Cambridge 官方执行器。
- 重点覆盖空字符串、无匹配、最后一项、7000 项全满／首空位置、随机范围端点、2000 行排序的关联值与稳定性、空文件及 APPEND 保留已有输出。教师流程图另按输入顺序、哨兵及容量条件逐步核对。
- 没有声称执行测试穷尽所有既有 Practice 或整个 Assessment Bank；保留题的去向审查和上述重点数值／代码验证是不同工作。

### 工程验证

| 已运行 | 结果与范围 |
|---|---|
| `tools/render_past_paper_extracts.py` | 109 组均有经审核 QP/MS，306 个原页区域；原文件 hash 匹配，字符边界检查通过。 |
| `node scripts/render-course-v3.mjs` | 93 课、12 个 Section、151 个兼容入口，516 项资源；来源、目标映射及教师内容完整性检查通过。 |
| 全课程浏览器回归 | 93 课 × 1280px／390px 两种宽度，零页面错误；原题可见、答案初始折叠、页面无横溢出、全部课堂单元的真题筛选正确。 |
| 16 课代表性呈现 | 原文图片实际加载；教师图逐张查看；手机局部横向滚动；两个打印按钮及关闭后的状态恢复通过。 |
| 打印 PDF | L047 题目版 9 页、教师版 16 页；题目版无答案，教师版包含原 MS，两份均查看实际输出中的原文区域。 |
| `python3 scripts/build-course-release.py` | 离线包包含 808 项；807 个内容文件逐项 hash 校验通过。 |
| 链接与锚点 | 在线目录及解压目录各 269 个 HTML、4798 个本地引用；缺文件／缺锚点／重复 ID 为零。 |
| 离线浏览器 | 37 个入口、Section、Lesson、题库／资源页面；图片、导航、答案展开和旧 S2 路由通过。 |
| 生成拒绝条件 | 临时来源中的未审核状态、错分值、变更图片 hash、缺少 insert 四种情况均被课程组装器拒绝。 |
| 打包拒绝条件 | 临时副本中的未审核来源、变更裁切、缺失图片三种情况均被实际构建器拒绝。 |
| 生成可重复性 | 重新生成前后 1010 个成品／contract 文件 hash 一致。 |
| Git 范围与空白检查 | `git diff --check` 通过；未更改审批归档，未动原有未跟踪参考书籍；实施验收时未暂存或提交；后续提交推送已获用户明确授权。 |

无 Browser 插件，依已读前端测试技能使用现有 Playwright 与安装的 Chrome；只使用临时浏览器配置。初期沙箱内 Chrome 启动受限后，按工具许可完成本地测试。

未运行：远程部署／Pages／CI、Cambridge 官方伪代码编译器、学生实际用时试验。原因：本轮授权为本地实施；当前验证是明确标注的语义模拟；用时仍为教师估计。原文作为 PDF 图片展示，不能直接复制检索其文字；正文教师解题、代码和表格可选择复制。

## 6. 93 课实际配置与成品入口

Practice 列为“核心任务数／可选任务数；核心教师分数；核心估时（分钟）”，正式子问不另行人为拆分。真题列为“大题数／所选子问数／官方总分；估时（分钟）”。题量、分值和用时是本轮结果，不是统一标准。核心 Practice 合计 1246 教师分，可选合计 427 教师分；它们不是官方考试总分。

来源 E 编号链接到实际课程中的原题；完整文件、页码、依赖及评分限制另见来源清单与批准登记。各行均已完成源配置、教学处理和生成；零题行说明实际衔接。

| Lesson／当前题目 | Practice | 真题 | 选定原题与实际位置 |
|---|---|---|---|
| [L001](../web/course-v3/lesson-001/index.html) Binary data units and magnitude prefixes | 2／2；7；8–10 | 1／1／1；2–3 | [E001](../web/course-v3/lesson-001/index.html#e001) 2024 M/J /12 Q7(a) [1] |
| [L002](../web/course-v3/lesson-002/index.html) Binary, denary, hexadecimal, BCD and signed representations | 7／3；24；25–30 | 2／4／8；10–13 | [E002](../web/course-v3/lesson-002/index.html#e002) 2023 M/J /12 Q4(a) [1], 4(b) [2], 4(c) [2]<br>[E003](../web/course-v3/lesson-002/index.html#e003) 2024 O/N /13 Q8(b) [3] |
| [L003](../web/course-v3/lesson-003/index.html) Binary addition, subtraction and overflow | 6／1；22；22–27 | 2／2／6；9–12 | [E004](../web/course-v3/lesson-003/index.html#e004) 2024 M/J /12 Q7(b) [3]<br>[E005](../web/course-v3/lesson-003/index.html#e005) 2024 M/J /11 Q7 [3] |
| [L004](../web/course-v3/lesson-004/index.html) Character encoding: ASCII, extended ASCII and Unicode | 4／1；10；9–12 | 1／2／4；5–7 | [E006](../web/course-v3/lesson-004/index.html#e006) 2025 O/N /13 Q1(b) [2], 1(c) [2] |
| [L005](../web/course-v3/lesson-005/index.html) Bitmap and vector graphics | 6／2；22；23–28 | 2／3／7；12–16 | [E007](../web/course-v3/lesson-005/index.html#e007) 2023 O/N /12 Q6(c) [2]<br>[E008](../web/course-v3/lesson-005/index.html#e008) 2024 M/J /12 Q2(d)(i) [3], 2(d)(ii) [2] |
| [L006](../web/course-v3/lesson-006/index.html) Sound representation and file compression | 8／2；30；30–38 | 2／2／5；7–10 | [E009](../web/course-v3/lesson-006/index.html#e009) 2023 O/N /12 Q6(b) [3]<br>[E010](../web/course-v3/lesson-006/index.html#e010) 2024 M/J /13 Q2(b)(ii) [2] |
| [L007](../web/course-v3/lesson-007/index.html) Network purpose, models and client types | 3／1；15；12–16 | 2／2／8；10–14 | [E011](../web/course-v3/lesson-007/index.html#e011) 2024 M/J /11 Q5(a) [4]<br>[E012](../web/course-v3/lesson-007/index.html#e012) 2024 M/J /12 Q3(b) [4] |
| [L008](../web/course-v3/lesson-008/index.html) Topologies, packet paths and design choices | 4／0；19；15–20 | 1／1／2；5–7 | [E013](../web/course-v3/lesson-008/index.html#e013) 2024 M/J /13 Q5(b) [2] |
| [L009](../web/course-v3/lesson-009/index.html) Public and private cloud computing | 3／1；16；12–16 | 1／2／4；6–8 | [E014](../web/course-v3/lesson-009/index.html#e014) 2025 O/N /12 Q8(a)(i) [2], 8(a)(ii) [2] |
| [L010](../web/course-v3/lesson-010/index.html) Wired, wireless and transmission media | 2／2；10；10–14 | 1／1／4；5–7 | [E015](../web/course-v3/lesson-010/index.html#e015) 2024 O/N /13 Q9(b) [4] |
| [L011](../web/course-v3/lesson-011/index.html) LAN hardware, routers and Ethernet | 3／3；15；17–22 | 2／2／6；10–14 | [E016](../web/course-v3/lesson-011/index.html#e016) 2023 M/J /12 Q1(d) [3]<br>[E017](../web/course-v3/lesson-011/index.html#e017) 2023 O/N /12 Q7(c) [3] |
| [L012](../web/course-v3/lesson-012/index.html) Bit streaming, rates and buffers | 3／2；14；15–20 | 1／1／4；6–9 | [E018](../web/course-v3/lesson-012/index.html#e018) 2024 O/N /13 Q9(c) [4] |
| [L013](../web/course-v3/lesson-013/index.html) Internet, WWW and connection infrastructure | 4／0；21；15–20 | 1／1／2；2–3 | [E019](../web/course-v3/lesson-013/index.html#e019) 2024 M/J /12 Q3(c)(ii) [2] |
| [L014](../web/course-v3/lesson-014/index.html) IP addressing, subnetting, URLs and DNS | 4／2；21；22–28 | 1／3／10；13–17 | [E020](../web/course-v3/lesson-014/index.html#e020) 2023 O/N /12 Q7(a) [2], 7(b)(iii) [4], 7(d) [4] |
| [L015](../web/course-v3/lesson-015/index.html) Input, output, storage and embedded systems | 3／2；12；13–17 | 1／2／3；5–7 | [E021](../web/course-v3/lesson-015/index.html#e021) 2023 O/N /12 Q1(c)(i) [2], 1(c)(ii) [1] |
| [L016](../web/course-v3/lesson-016/index.html) Principal operations of hardware devices | 6／8；26；30–38 | 2／2／8；11–15 | [E022](../web/course-v3/lesson-016/index.html#e022) 2024 M/J /12 Q2(a) [4]<br>[E023](../web/course-v3/lesson-016/index.html#e023) 2025 O/N /12 Q8(b)(i) [4] |
| [L017](../web/course-v3/lesson-017/index.html) Buffers, RAM, ROM and memory technologies | 3／3；13；16–21 | 1／2／6；8–11 | [E024](../web/course-v3/lesson-017/index.html#e024) 2024 O/N /13 Q2(a) [2], 2(b) [4] |
| [L018](../web/course-v3/lesson-018/index.html) Monitoring, control, sensors, actuators and feedback | 3／4；12；15–20 | 2／3／7；10–14 | [E025](../web/course-v3/lesson-018/index.html#e025) 2024 O/N /12 Q9(a) [2], 9(b) [2]<br>[E026](../web/course-v3/lesson-018/index.html#e026) 2025 O/N /12 Q11 [3] |
| [L019](../web/course-v3/lesson-019/index.html) Logic gates, symbols and truth tables | 4／0；17；16–20 | 1／1／4；5–7 | [E027](../web/course-v3/lesson-019/index.html#e027) 2024 M/J /12 Q1(a) [4] |
| [L020](../web/course-v3/lesson-020/index.html) Boolean expressions and logic-circuit design | 3／3；13；18–23 | 1／2／4；10–14 | [E028](../web/course-v3/lesson-020/index.html#e028) 2023 M/J /12 Q6(a) [2], 6(b) [2] |
| [L021](../web/course-v3/lesson-021/index.html) Von Neumann architecture, CPU components and registers | 3／1；11；13–17 | 1／1／4；6–8 | [E029](../web/course-v3/lesson-021/index.html#e029) 2024 O/N /12 Q3(a) [4] |
| [L022](../web/course-v3/lesson-022/index.html) System buses, ports and processor performance | 6／0；25；20–25 | 2／2／8；9–12 | [E030](../web/course-v3/lesson-022/index.html#e030) 2024 O/N /12 Q3(b) [4]<br>[E031](../web/course-v3/lesson-022/index.html#e031) 2025 O/N /12 Q3(c) [4] |
| [L023](../web/course-v3/lesson-023/index.html) The fetch-execute cycle in register-transfer notation | 4／1；15；19–24 | 2／2／6；8–11 | [E032](../web/course-v3/lesson-023/index.html#e032) 2023 M/J /13 Q7(c) [2]<br>[E033](../web/course-v3/lesson-023/index.html#e033) 2025 O/N /13 Q6(b) [4] |
| [L024](../web/course-v3/lesson-024/index.html) Interrupt causes, detection and handling | 3／1；13；15–20 | 1／1／4；7–10 | [E034](../web/course-v3/lesson-024/index.html#e034) 2025 M/J /12 Q1(c) [4] |
| [L025](../web/course-v3/lesson-025/index.html) Assembly language and the two-pass assembler | 2／2；9；12–16 | 1／1／3；4–6 | [E035](../web/course-v3/lesson-025/index.html#e035) 2023 M/J /12 Q3(a) [3] |
| [L026](../web/course-v3/lesson-026/index.html) Addressing modes and complete assembly traces | 5／3；21；27–35 | 1／1／4；13–18 | [E036](../web/course-v3/lesson-026/index.html#e036) 2023 O/N /12 Q9(b) [4] |
| [L027](../web/course-v3/lesson-027/index.html) Bit manipulation, masks and binary shifts | 3／3；16；18–23 | 2／2／6；9–12 | [E037](../web/course-v3/lesson-027/index.html#e037) 2024 M/J /12 Q5(b) [3]<br>[E038](../web/course-v3/lesson-027/index.html#e038) 2024 O/N /12 Q8(b)(ii) [3] |
| [L028](../web/course-v3/lesson-028/index.html) Why operating systems are required | 5／1；12；16–21 | 1／1／4；6–8 | [E039](../web/course-v3/lesson-028/index.html#e039) 2024 M/J /12 Q6 [4] |
| [L029](../web/course-v3/lesson-029/index.html) Utility software, libraries and linked files | 5／3；14；20–26 | 2／3／9；12–16 | [E040](../web/course-v3/lesson-029/index.html#e040) 2023 M/J /12 Q7(a)(i) [2], 7(a)(ii) [4]<br>[E041](../web/course-v3/lesson-029/index.html#e041) 2023 O/N /12 Q8(b) [3] |
| [L030](../web/course-v3/lesson-030/index.html) Assemblers, compilers and interpreters | 3／0；8；10–14 | 1／1／4；6–8 | [E042](../web/course-v3/lesson-030/index.html#e042) 2025 O/N /12 Q10(a) [4] |
| [L031](../web/course-v3/lesson-031/index.html) Choosing a translator and understanding Java translation | 2／1；7；8–12 | 1／1／3；5–7 | [E043](../web/course-v3/lesson-031/index.html#e043) 2023 M/J /12 Q7(b) [3] |
| [L032](../web/course-v3/lesson-032/index.html) IDE features and practical debugging support | 3／1；10；11–15 | 1／1／4；7–10 | [E044](../web/course-v3/lesson-032/index.html#e044) 2023 M/J /12 Q7(c) [4] |
| [L033](../web/course-v3/lesson-033/index.html) Security, privacy, integrity and the need for protection | 3／1；7；9–13 | 1／2／2；6–8 | [E045](../web/course-v3/lesson-033/index.html#e045) 2023 O/N /12 Q5(a) [1], 5(b) [1] |
| [L034](../web/course-v3/lesson-034/index.html) Authentication and layered system protection | 6／1；22；22–28 | 1／1／3；6–9 | [E046](../web/course-v3/lesson-034/index.html#e046) 2024 M/J /12 Q3(a)(i) [3] |
| [L035](../web/course-v3/lesson-035/index.html) Internet threats, malware and access restriction | 5／1；15；17–22 | 1／1／4；6–9 | [E047](../web/course-v3/lesson-035/index.html#e047) 2023 O/N /12 Q5(c) [4] |
| [L036](../web/course-v3/lesson-036/index.html) Encryption and access rights for data | 3／1；8；11–15 | 1／1／3；5–7 | [E048](../web/course-v3/lesson-036/index.html#e048) 2024 M/J /12 Q3(a)(ii) [3] |
| [L037](../web/course-v3/lesson-037/index.html) Validation, verification, parity and checksums | 10／0；31；30–40 | 2／2／6；10–14 | [E049](../web/course-v3/lesson-037/index.html#e049) 2025 O/N /12 Q1 [2]<br>[E050](../web/course-v3/lesson-037/index.html#e050) 2024 M/J /13 Q7(f)(i) [4] |
| [L038](../web/course-v3/lesson-038/index.html) Professional ethics and professional bodies | 3／2；6；11–15 | 2／2／5；7–10 | [E051](../web/course-v3/lesson-038/index.html#e051) 2024 O/N /13 Q5(b) [3]<br>[E052](../web/course-v3/lesson-038/index.html#e052) 2025 O/N /12 Q2(b) [2] |
| [L039](../web/course-v3/lesson-039/index.html) Ethical decisions and their consequences | 3／2；7；12–17 | 1／1／4；6–8 | [E053](../web/course-v3/lesson-039/index.html#e053) 2024 O/N /12 Q5(a) [4] |
| [L040](../web/course-v3/lesson-040/index.html) Copyright and software licences | 7／1；18；21–27 | 1／2／5；9–12 | [E054](../web/course-v3/lesson-040/index.html#e054) 2024 O/N /12 Q5(b)(i) [3], 5(b)(ii) [2] |
| [L041](../web/course-v3/lesson-041/index.html) Artificial intelligence applications and impacts | 6／2；17；20–27 | 1／2／6；8–11 | [E055](../web/course-v3/lesson-041/index.html#e055) 2025 M/J /12 Q3(a) [4], 3(b) [2] |
| [L042](../web/course-v3/lesson-042/index.html) From file-based systems to relational databases | 4／2；14；15–20 | 1／1／3；5–7 | [E056](../web/course-v3/lesson-042/index.html#e056) 2024 O/N /12 Q6(a) [3] |
| [L043](../web/course-v3/lesson-043/index.html) Entity-relationship design and normalisation | 4／1；16；23–30 | 2／2／10；19–25 | [E057](../web/course-v3/lesson-043/index.html#e057) 2024 M/J /11 Q6(a) [6]<br>[E058](../web/course-v3/lesson-043/index.html#e058) 2024 O/N /13 Q4(c)(ii) [4] |
| [L044](../web/course-v3/lesson-044/index.html) DBMS architecture, integrity, security and backup | 6／2；18；20–27 | 2／2／6；9–12 | [E059](../web/course-v3/lesson-044/index.html#e059) 2024 M/J /11 Q6(b) [4]<br>[E060](../web/course-v3/lesson-044/index.html#e060) 2025 O/N /12 Q4(d) [2] |
| [L045](../web/course-v3/lesson-045/index.html) DDL, DML and the role of SQL | 3／0；8；7–10 | 0／0／0；0 | 衔接 L046, L047 |
| [L046](../web/course-v3/lesson-046/index.html) Understanding and writing SQL data definitions | 5／0；17；20–27 | 1／2／5；14–19 | [E061](../web/course-v3/lesson-046/index.html#e061) 2024 M/J /12 Q4(b) [3], 4(c) [2] |
| [L047](../web/course-v3/lesson-047/index.html) Querying and maintaining data with SQL DML | 8／2；23；30–40 | 2／2／7；16–22 | [E062](../web/course-v3/lesson-047/index.html#e062) 2024 M/J /13 Q4(c) [4]<br>[E063](../web/course-v3/lesson-047/index.html#e063) 2025 M/J /12 Q5(d)(ii) [3] |
| [L048](../web/course-v3/lesson-048/index.html) Paper 1 integrated review and error clinic | 13／13；53；55–70 | 3／10／38；55–65 | [E064](../web/course-v3/lesson-048/index.html#e064) 2025 M/J /12 Q6(a) [2], 6(b) [4], 6(c) [6], 6(d) [4], 6(e) [3]<br>[E065](../web/course-v3/lesson-048/index.html#e065) 2025 O/N /13 Q5(a) [3], 5(b) [4], 5(c) [5], 5(d) [4]<br>[E066](../web/course-v3/lesson-048/index.html#e066) 2023 O/N /12 Q6(a) [3] |
| [L049](../web/course-v3/lesson-049/index.html) Abstraction and purposeful models | 3／0；8；8–11 | 1／2／5；5–7 | [E067](../web/course-v3/lesson-049/index.html#e067) 2023 M/J /22 Q7(a)(i) [3], 7(a)(ii) [2] |
| [L050](../web/course-v3/lesson-050/index.html) Decomposition into program modules | 3／0；11；9–12 | 1／1／3；7–10 | [E068](../web/course-v3/lesson-050/index.html#e068) 2024 M/J /22 Q7(a) [3] |
| [L051](../web/course-v3/lesson-051/index.html) Defined algorithm steps and identifier tables | 3／0；7；9–12 | 1／1／4；6–8 | [E069](../web/course-v3/lesson-051/index.html#e069) 2023 O/N /22 Q1(a) [4] |
| [L052](../web/course-v3/lesson-052/index.html) Input, process and output in pseudocode | 3／0；9；8–11 | 0／0／0；0 | 衔接 L055, L061 |
| [L053](../web/course-v3/lesson-053/index.html) Sequence, selection and iteration | 3／0；12；9–12 | 1／1／2；3–5 | [E070](../web/course-v3/lesson-053/index.html#e070) 2023 O/N /21 Q2(b) [2] |
| [L054](../web/course-v3/lesson-054/index.html) Structured English, flowcharts and pseudocode | 4／0；15；16–22 | 1／1／5；11–15 | [E071](../web/course-v3/lesson-054/index.html#e071) 2023 O/N /22 Q2(a) [5] |
| [L055](../web/course-v3/lesson-055/index.html) Stepwise refinement to programmable detail | 3／0；10；10–14 | 1／1／5；8–11 | [E072](../web/course-v3/lesson-055/index.html#e072) 2023 O/N /21 Q2(a) [5] |
| [L056](../web/course-v3/lesson-056/index.html) Logic statements and boundary conditions | 3／0；6；11–15 | 1／2／2；5–8 | [E073](../web/course-v3/lesson-056/index.html#e073) 2025 M/J /21 Q2(a)(i) [1], 2(a)(ii) [1] |
| [L057](../web/course-v3/lesson-057/index.html) Integrated design: a ticket purchase | 3／0；11；17–24 | 1／1／5；10–14 | [E074](../web/course-v3/lesson-057/index.html#e074) 2023 M/J /21 Q3(b) [5] |
| [L058](../web/course-v3/lesson-058/index.html) Cambridge data types and declarations | 4／0；8；11–15 | 1／1／3；4–6 | [E075](../web/course-v3/lesson-058/index.html#e075) 2024 O/N /23 Q1(b) [3] |
| [L059](../web/course-v3/lesson-059/index.html) Records: defining, reading and saving structured data | 4／0；9；12–16 | 1／1／4；7–10 | [E076](../web/course-v3/lesson-059/index.html#e076) 2024 M/J /22 Q3(a)(i) [4] |
| [L060](../web/course-v3/lesson-060/index.html) Array terminology, indices and bounds | 3／0；6；9–12 | 1／3／4；5–8 | [E077](../web/course-v3/lesson-060/index.html#e077) 2025 M/J /22 Q1(d)(i) [1], 1(d)(ii) [1], 1(d)(iii) [2] |
| [L061](../web/course-v3/lesson-061/index.html) Selecting and using one-dimensional arrays | 4／1；11；15–21 | 1／1／6；11–15 | [E078](../web/course-v3/lesson-061/index.html#e078) 2025 M/J /22 Q4 [6] |
| [L062](../web/course-v3/lesson-062/index.html) Selecting and using two-dimensional arrays | 4／0；10；16–22 | 1／1／3；6–9 | [E079](../web/course-v3/lesson-062/index.html#e079) 2023 O/N /21 Q4(b) [3] |
| [L063](../web/course-v3/lesson-063/index.html) Linear search using arrays | 3／0；10；13–18 | 0／0／0；0 | 衔接 L082 |
| [L064](../web/course-v3/lesson-064/index.html) Bubble sort using arrays | 3／0；10；16–22 | 0／0／0；0 | 衔接 L093 |
| [L065](../web/course-v3/lesson-065/index.html) Why files are needed and text-file pseudocode | 5／0；15；16–21 | 1／2／7；13–18 | [E080](../web/course-v3/lesson-065/index.html#e080) 2025 O/N /22 Q3(a) [6], 3(b) [1] |
| [L066](../web/course-v3/lesson-066/index.html) Abstract data types | 3／0；6；9–12 | 0／0／0；0 | 衔接 L067, L068, L069, L070, L071 |
| [L067](../web/course-v3/lesson-067/index.html) Stacks and LIFO operations | 3／0；7；13–18 | 1／2／8；10–14 | [E081](../web/course-v3/lesson-067/index.html#e081) 2023 O/N /21 Q3(a) [3], 3(b) [5] |
| [L068](../web/course-v3/lesson-068/index.html) Queues and FIFO operations | 3／1；9；13–18 | 1／2／5；8–11 | [E082](../web/course-v3/lesson-068/index.html#e082) 2023 M/J /22 Q3(a)(i) [4], 3(a)(ii) [1] |
| [L069](../web/course-v3/lesson-069/index.html) Linked-list features and operations | 4／0；11；15–20 | 1／1／4；7–10 | [E083](../web/course-v3/lesson-069/index.html#e083) 2023 O/N /22 Q3(b) [4] |
| [L070](../web/course-v3/lesson-070/index.html) Implementing ADT operations with arrays | 3／1；9；14–19 | 1／1／5；8–11 | [E084](../web/course-v3/lesson-070/index.html#e084) 2023 O/N /22 Q3(a) [5] |
| [L071](../web/course-v3/lesson-071/index.html) Choosing and combining data structures | 3／2；9；18–25 | 1／1／7；13–18 | [E085](../web/course-v3/lesson-071/index.html#e085) 2025 M/J /21 Q5 [7] |
| [L072](../web/course-v3/lesson-072/index.html) Translating descriptions into Cambridge pseudocode | 3／1；10；14–20 | 1／1／5；10–14 | [E086](../web/course-v3/lesson-072/index.html#e086) 2024 O/N /23 Q2(a) [5] |
| [L073](../web/course-v3/lesson-073/index.html) Declarations, assignment and input/output | 3／0；7；8–12 | 1／2／4；5–7 | [E087](../web/course-v3/lesson-073/index.html#e087) 2023 M/J /22 Q1(a)(i) [1], 1(a)(ii) [3] |
| [L074](../web/course-v3/lesson-074/index.html) Arithmetic and logical expressions | 3／1；7；12–16 | 1／2／3；7–10 | [E088](../web/course-v3/lesson-074/index.html#e088) 2023 M/J /21 Q1(c)(i) [2], 1(c)(ii) [1] |
| [L075](../web/course-v3/lesson-075/index.html) Built-in routines and string functions | 5／0；13；18–24 | 1／1／4；8–11 | [E089](../web/course-v3/lesson-075/index.html#e089) 2024 M/J /21 Q1(b) [4] |
| [L076](../web/course-v3/lesson-076/index.html) IF, ELSE and CASE selection | 2／1；4；10–14 | 1／2／4；7–10 | [E090](../web/course-v3/lesson-076/index.html#e090) 2023 O/N /21 Q1(b) [3], 1(c) [1] |
| [L077](../web/course-v3/lesson-077/index.html) Count-controlled iteration | 4／0；9；14–19 | 1／2／9；14–19 | [E091](../web/course-v3/lesson-077/index.html#e091) 2025 O/N /22 Q4(a) [4], 4(b) [5] |
| [L078](../web/course-v3/lesson-078/index.html) Post-condition and pre-condition loops | 3／1；7；13–18 | 1／1／5；10–14 | [E092](../web/course-v3/lesson-078/index.html#e092) 2025 O/N /22 Q2 [5] |
| [L079](../web/course-v3/lesson-079/index.html) Selecting and justifying a loop structure | 3／1；7；12–17 | 1／1／2；4–6 | [E093](../web/course-v3/lesson-079/index.html#e093) 2023 O/N /22 Q2(b) [2] |
| [L080](../web/course-v3/lesson-080/index.html) Procedures and parameter passing | 4／1；10；19–25 | 1／2／4；8–12 | [E094](../web/course-v3/lesson-080/index.html#e094) 2023 M/J /22 Q5(a) [3], 5(b) [1] |
| [L081](../web/course-v3/lesson-081/index.html) Functions, interfaces and return values | 4／1；11；17–23 | 1／1／6；12–17 | [E095](../web/course-v3/lesson-081/index.html#e095) 2023 M/J /22 Q4 [6] |
| [L082](../web/course-v3/lesson-082/index.html) Clear and efficient Cambridge pseudocode | 3／2；10；16–22 | 1／1／7；14–19 | [E096](../web/course-v3/lesson-082/index.html#e096) 2025 O/N /22 Q8(b) [7] |
| [L083](../web/course-v3/lesson-083/index.html) Building a complete structured program | 2／1；6；15–22 | 1／1／8；16–22 | [E097](../web/course-v3/lesson-083/index.html#e097) 2025 M/J /21 Q3 [8] |
| [L084](../web/course-v3/lesson-084/index.html) Program development life cycles | 4／1；11；13–18 | 1／2／3；7–10 | [E098](../web/course-v3/lesson-084/index.html#e098) 2023 M/J /21 Q5(a)(i) [2], 5(a)(ii) [1] |
| [L085](../web/course-v3/lesson-085/index.html) Structure charts and module interfaces | 4／2；15；22–30 | 1／2／6；15–21 | [E099](../web/course-v3/lesson-085/index.html#e099) 2023 O/N /22 Q7(a) [4], 7(b) [2] |
| [L086](../web/course-v3/lesson-086/index.html) State-transition diagrams | 3／1；7；11–16 | 1／1／4；10–14 | [E100](../web/course-v3/lesson-086/index.html#e100) 2023 M/J /22 Q7(b) [4] |
| [L087](../web/course-v3/lesson-087/index.html) Finding and correcting program errors | 4／1；12；14–20 | 1／3／6；13–18 | [E101](../web/course-v3/lesson-087/index.html#e101) 2024 M/J /22 Q5(a)(i) [3], 5(a)(ii) [2], 5(b) [1] |
| [L088](../web/course-v3/lesson-088/index.html) Testing methods through development | 5／2；15；18–25 | 2／3／5；9–13 | [E102](../web/course-v3/lesson-088/index.html#e102) 2025 M/J /22 Q2(b)(ii) [2], 2(b)(iii) [2]<br>[E103](../web/course-v3/lesson-088/index.html#e103) 2025 O/N /22 Q5(b) [1] |
| [L089](../web/course-v3/lesson-089/index.html) Test strategies and test plans | 3／1；11；14–20 | 1／1／4；8–11 | [E104](../web/course-v3/lesson-089/index.html#e104) 2025 M/J /21 Q6(a) [4] |
| [L090](../web/course-v3/lesson-090/index.html) Normal, abnormal and boundary test data | 4／1；9；14–19 | 1／1／3；8–11 | [E105](../web/course-v3/lesson-090/index.html#e105) 2023 O/N /22 Q4(b) [3] |
| [L091](../web/course-v3/lesson-091/index.html) Corrective, adaptive and perfective maintenance | 4／0；10；12–17 | 1／1／3；5–7 | [E106](../web/course-v3/lesson-091/index.html#e106) 2025 M/J /22 Q1(b)(i) [3] |
| [L092](../web/course-v3/lesson-092/index.html) Analysing and amending an existing program | 4／2；16；21–29 | 1／1／3；9–13 | [E107](../web/course-v3/lesson-092/index.html#e107) 2025 O/N /22 Q3(c) [3] |
| [L093](../web/course-v3/lesson-093/index.html) Paper 2 integrated review and pseudocode clinic | 11／5；40；45–60 | 2／4／22；40–50 | [E108](../web/course-v3/lesson-093/index.html#e108) 2025 M/J /21 Q6(a) [4], 6(b) [8]<br>[E109](../web/course-v3/lesson-093/index.html#e109) 2024 M/J /22 Q8(a) [2], 8(c) [8] |

## 7. 本地审核入口

- [课程总目录](http://127.0.0.1:8796/course-v3/)
- [L001：低密度单位比较](http://127.0.0.1:8796/course-v3/lesson-001/#past-paper-questions)
- [L026：完整汇编追踪与分组评分](http://127.0.0.1:8796/course-v3/lesson-026/#past-paper-questions)
- [L047：SQL 公共表与教师查询](http://127.0.0.1:8796/course-v3/lesson-047/#past-paper-questions)
- [L078：容量与哨兵流程图](http://127.0.0.1:8796/course-v3/lesson-078/#past-paper-questions)
- [L090：有效测试序列及官方资料疑点](http://127.0.0.1:8796/course-v3/lesson-090/#past-paper-questions)
- [L093：Paper 2 综合复习菜单](http://127.0.0.1:8796/course-v3/lesson-093/#past-paper-questions)
- [离线 ZIP](../dist/AS9618-CS-2027-2029-course.zip)；解压后从 `web/index.html` 打开。

本地服务器退出后，可按 README 重新启动。实施起始提交为 `b45fce6c45e4a5a40aab7534501e395f49e3d14a`。成品在本地验收后，按用户后续明确指令提交并推送；实际提交和远端状态以 Git 历史及工作流记录为准。
