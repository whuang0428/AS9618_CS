# Section 4 教学实施与本地验收

状态：已按用户批准的方案实施。2026-09-15，用户授权将 Section 4 修改与全课程 Practice／真题方案一起提交、推送。以下验收记录中的“未提交、推送或发布”描述此前本地验收阶段；全课程新方案仍待教学审核，尚未实施。

范围：Cambridge AS Level Computer Science 9618（2027–2029）Section 4，Lesson 021–027；关联 Lesson 048 的 S4 复习、20 分 Section 4 check 和 10 分 Paper 1 第 4 题。原请求中的 Section 13 已由用户更正为 Section 4。

检查日期：2026-09-15。实施依据为根目录 `AGENTS.md`、完整 `TEACHING_STANDARD.md` 和 README 当前生成说明。

## 1. 已批准的课程分工及落实

| 课程 | 顺序与深度 | 前置课程 | 完整例子与变式 | 实际位置 |
| --- | --- | --- | --- | --- |
| L021 结构、部件、寄存器 | stored program → CU/ALU/clock/IAS → 寄存器；讲清地址、内容、结果和 CPU 边界 | L002、L017 | 4 条指令读取 18、加 24、写回 42、END；随后单独看 ADD 期间 MAR=5、MDR=24、ACC=42 | [L021](web/course-v3/lesson-021/) 单元 1–3 |
| L022 总线与性能 | 读写方向 → 位宽计算 → cache 访问历史 → 工作负载判断 → ports | L021、L017 | 两字节编址与部分末次传输；空 cache 的 A,B,A,B；与一次性 A,B,C,D 对比 | [L022](web/course-v3/lesson-022/) 单元 1–5 |
| L023 取指执行 | 寄存器传送记法 → 指令读与数据读 → load/add/store → jump/END | L021、L022 | 同一 18+24=42 程序；逐条 CIR、MAR、MDR、ACC、PC、Memory[6]；分支覆盖顺序 PC | [L023](web/course-v3/lesson-023/) 单元 1–2 |
| L024 中断 | 目的与 polling 对比 → 原因 → 接受条件 → 保存/ISR/恢复 → 继续及多个 pending 请求 | L023 | PC=330、ACC=18、IX=4；ISR 改动后恢复，ADD #2 得 20；报警优先、磁盘请求等待 | [L024](web/course-v3/lesson-024/) 单元 1–2 |
| L025 汇编 | assembly/machine code → 指令与数据标签 → 两遍汇编 | L002、L023 | 同一计算程序的四个符号、七个机器/数据字；前向引用、重复标签与未定义符号 | [L025](web/course-v3/lesson-025/) 单元 1–3 |
| L026 寻址与跟踪 | 五种寻址 → data movement → arithmetic/I/O → compare/control → 跟踪规则 → 完整循环 → 指令分组归纳 | L004、L023、L025 | A→B 与拒绝 B→? 两条路径；计数 2 与 1；indirect/indexed、IX 改变、正负相对位移 | [L026](web/course-v3/lesson-026/) 单元 1–7 |
| L027 位操作 | 六种移位 → AND/OR/XOR → 条件设备控制；标签在此应用 | L002、L003、L019、L025、L026 | ready 才 set motor；00010001→00010101、00000001 保持、00010101 保持；clear/toggle 与丢失位不可恢复 | [L027](web/course-v3/lesson-027/) 单元 1–3 |

共 25 个 Detailed explanation 单元；每单元的 Core explanation 只保留 1 条精炼考试要点。保留原有 28 道有效练习和 21 道原创考试风格题，增加 9 道有不同学习用途的练习。原跟踪题保留完整答案表，评分改为操作、分支、输出等有意义的推理点，而不是每抄一行自动得一分。

课间衔接：L017 承担 SRAM/DRAM 存储机制，L022 解释 cache 对访问等待的影响；L028 承接 OS 的中断应用；L030 承接 compiler/interpreter 比较。链接放在学习路线中，不把后续应用列成前置课程。

## 2. 覆盖与学习证据

`S4.xx` 和 `.Axx` 是项目追踪编号，不是新增官方编号。官方范围对应 4.1 Processor architecture（S4.01–08）、4.2 Assembly language（S4.09–14）、4.3 Bit manipulation（S4.15）。61 个不同原子目标均保留，均有单元映射及独立题目证据；标签在 L025 引入、L027 应用，因此两课会出现相同的两个目标。

| 知识点 / 依据 | 所属课、深度与学生任务 | 讲解与图示 | 例子、误解与独立证据 | 状态 |
| --- | --- | --- | --- | --- |
| S4.01 stored program / 官方 4.1 | L021 单元 1：解释为什么同一硬件可执行另一程序 | CPU/IAS/I/O SVG；二进制内容按访问用途解释 | 四条指令到最终存储值；不能把程序等同于寄存器内容；Q1、EXAM-1 | 已落实 |
| S4.02 registers / 官方 4.1 | L021 单元 3：区分通用寄存器与 PC、MAR、MDR、ACC、IX、CIR、SR 的角色 | 寄存器表；ADD 的并存状态 | PC=2 与 CIR=ADD 5 并存；MAR 地址不等于 MDR 内容；Q5、EXAM-2/3 | 已落实 |
| S4.03 components / 官方 4.1 | L021 单元 2：解释 CU、ALU、clock、IAS 如何合作 | CU/ALU/clock SVG 更新为 18+24=42 | CU 发信号、ALU 计算、时钟同步；一次时钟不等于一条指令；EXAM-3 | 已落实 |
| S4.04 buses / 官方 4.1 | L022 单元 1：逐次说明 read/write 的地址、数据和控制方向 | 原有总线 SVG 与事务表 | 读 18、写 42；control bus 是多条信号线的合称；Q1、EXAM-1 | 已落实 |
| S4.05 performance / 官方 4.1 | L022 单元 2–4：按 workload 解释五个因素，计算有条件的容量/传输数 | cache SVG、A/B 状态表、因果对比表 | 2^n 是位置数，字节数另乘每位置大小；cache miss/hit；不能按核心数许诺固定倍速；Q5/6、EXAM-2 | 已落实；位宽计算为必要补充 |
| S4.06 ports / 官方 4.1 | L022 单元 5：按信号和用途选择 USB/HDMI/VGA | 保留接口参考位图、全称与用途表 | HDMI 数字图像/音频、VGA 模拟图像与独立音频；外部协议不等于内部数据总线宽度；EXAM-3 | 已落实 |
| S4.07 fetch-execute / 官方 4.1 | L023：使用记法完整说明取指、读、算、写及分支 | fetch SVG、完整计算 SVG、寄存器状态表 | 指令取读和执行写入分开；END 后控制交回 OS；Q4、EXAM-1/2/3 | 已落实 |
| S4.08 interrupts / 官方 4.1 | L024：从原因推到恢复后的正确继续 | 中断上下文 SVG 与 before/during/after | 恢复后 ADD 得 20，不恢复 ACC 会得 67；pending 不等于 lost；Q4、EXAM-3 | 已落实 |
| S4.09 assembly/machine / 官方 4.2 | L025 单元 1：分清 mnemonic、opcode、operand、encoding | 三种表示对照 | 同名操作在不同目标上可能编码不同；供应的 16 位编码明确为教学数据；Q1/3、EXAM-3 | 已落实 |
| S4.10 two-pass / 官方 4.2 | L025 单元 3：从源程序到 symbol table 和完整七字 image | 两遍已知信息表；源程序、符号及二进制输出 | 标签存地址而非 18/24/0；重复/未定义名称报错；Q2/4、EXAM-1/2 | 已落实 |
| S4.11 trace / 官方 4.2 | L026 单元 5–6：按执行顺序保留寄存器、比较、PC、写入及输出 | 七列跟踪表；先给程序和初态，再给结果表 | taken/not-taken 两次访问及计数 1 变式；Q7/8、EXAM-1/2 | 已落实 |
| S4.12 instruction groups / 官方 4.2 | L026 单元 7：根据效果归纳五组 | 组别表、compare→control 例子 | STO 不是字符 OUT；CMP 不自行跳转；Q1 | 已落实 |
| S4.13 example ISA / 官方 4.2 | L026 单元 2–6：解析并跟踪所有列出的 ACC/IX 指令 | movement 表、运算例子、完整输入分支和循环 | MOV IX 是 ACC→IX；CMI 是间接比较；JPN 是 not equal；IN/OUT 用 ASCII；Q2–5/7/8 | 已落实 |
| S4.14 addressing / 官方 4.2 | L026 单元 1：从 operand 求 effective address/value/target | 保留五种寻址 SVG | 100→150→7，100+2→102→9；40−5=35、40+6=46；相对 base 必须给出；Q6、EXAM-3 | 已落实 |
| S4.15 shifts、masks、labels / 官方 4.3 | L025 单元 2 引入标签；L027 完成位运算与设备控制 | 六移位 SVG、位规则 SVG、条件设备 SVG与完整 trace | 独立移位均重置输入；负奇数算术右移、左移溢出、clear/toggle；ready=0 不写入；Q1–6、EXAM-1–3 | 已落实 |

## 3. 完整例子与边界自审

- **统一计算**：PC=0、ACC=0、IX=0；Memory[4]=18、Memory[5]=24、Memory[6]=0。执行 `LDD 4; ADD 5; STO 6; END` 后 ACC=42、Memory[6]=42、源数据不变。L025 使用相同数据的标签形式；符号表 START=0、FIRST=4、SECOND=5、TOTAL=6，七个输出字分别为 0x0104、0x0205、0x0306、0xFF00、18、24、0。编码明确由例子供应。
- **cache**：空 cache、足够容量、无写入及驱逐，A,B,A,B 为 miss,miss,hit,hit，两次 RAM 读；A,B,C,D 为四次。没有暗中引入替换算法或给出整机固定加速倍数。
- **中断**：声明在指令边界接受请求并保存 PC=330、ACC=18、IX=4、comparison=True；ISR 的示意状态与保存副本分开。恢复后继续 ADD #2 得 20。没有编造 Cambridge ISR return 助记符，也不假定 ADD 的未规定 flag 副作用。
- **输入分支**：A 路径输出 B；B 路径执行 180,181,182,186,187,188 并输出 ?。CMI 先沿 340→341 取出 65；JPN 检查比较为 False，不检查 ACC 正负。
- **循环**：计数 2 的循环分支先 taken、再 not taken，最终输出 C。计数 1 只访问循环一次，最终同样输出 C。对于初始 0，没有在未给定字宽和回绕规则时断言终止或无限循环。
- **设备**：稳定、可整字节读写的 8-bit interface 模型，bit 4 ready、bit 2 motor，读/AND/CMP/JPE/重新读/OR/STO/END 齐全。256 个初始值均满足 `ready ? original OR 4 : original`，其他七个位不变。
- **移位**：保留 logical/arithmetic/cyclic × left/right 的六种区别；10010111 的结果 00101110、01001011、00101110、11001011、00101111、11001011 均核对。算术左移的 −210 不可表示，算术右移 −105→−53；包含正奇数及丢失 1 位的不可逆变式。

## 4. 拓展与停止深度

- 正文的地址位宽和传输次数计算，是理解总线的必要补充；不把位置数默认成字节数。
- 折叠的可选拓展包括 locality 的直觉、work per cycle、polling/interrupt 的负载条件、OR 重复设置和 XOR 两次恢复。
- 不展开 A2 pipeline/RISC/CISC、cache replacement/coherence、完整中断嵌套调度；不把这些作为本节新增考试要求。
- 设备例子声明寄存器稳定且写入替换整字节，避免把简化模型无条件推广为所有实际硬件寄存器。

## 5. 复习、题目和图示

- [L048](web/course-v3/lesson-048/#unit-4)：替换原 S4 泛化复习，提供 fetch/store 纠错、中断恢复、间接比较与拒绝分支、条件 mask 四项诊断任务。其他 Section 的复习保留。
- [Assessment Bank](web/assessments/)：Section 4 总分维持 20（4×5），覆盖 fetch/cache、label/assembler、indexed trace、conditional device；Paper 1 A-P1-4 维持 10 分（interrupt 3 + indirect trace 4 + bit operation 3）。评分点为原创 guidance。
- 新增 `calculation-transfers.svg`、`interrupt-context.svg`、`device-conditional.svg`；更新 `von-neumann.svg` 的 I/O 边界及计算数据，并让 CU/ALU 图使用同一组 18+24=42。
- 复用总线、cache、addressing、indexed-store、shift、bitwise SVG 和 USB/HDMI/VGA 位图。两遍汇编用可编辑 HTML 表、代码和步骤准确展示符号/机器字，不沿用带未解释 DATA 指令的旧概念图。
- 图示均由仓库源代码可复现；本轮没有需要新增的位图，不调用 ImageGen。SVG 提供替代文字、transcript、full-size 链接；窄屏保留可读字号、局部滚动和提示。

## 6. 工程验证记录

### 已完成

1. `node scripts/render-course-v3.mjs`：生成成功，93 个课程页面、12 个 Section、151 个兼容入口及 216 个资源。修改来自 authored source，生成的 HTML、contract、Assessment Bank Markdown/JSON 同步更新。
2. `/tmp/s4-semantic-qa.mjs` 一次性独立模拟：16 个完整程序；题目及答案共 14 次完整 trace 比较（含同一程序在不同交付位置的重复检查）；三处教学 trace 表独立比对；汇编七字编码、主要移位结果和 256 种设备初值检查通过。这是教学指令模型模拟，不是实际处理器执行。
3. 61 个不同目标均有单元和独立题目映射；25 个单元均有 Detailed、精炼 Core 和 worked example；37 道练习、21 道考试风格题；20/10 分总分一致。
4. 8 个相关课程页面中的 267 条本地链接/图片引用及锚点存在性检查通过。答案默认未展开。
5. 实际浏览器：L021–027、L048 在 1280px 桌面与 390×844 窄屏检查，无整页横向溢出；图片引用检查通过。另在独立浏览器页重新访问这 8 页及 Assessment Bank，18 次桌面/窄屏访问无控制台 warning/error，答案均默认折叠。
6. 课堂控制：逐一选择 25 个单元，始终只显示选中单元；7 课共 28 次 explanation/practice/exam/summary 阶段切换通过。实际点击 previous/next，展开答案后切换单元，确认答案自动收起。
7. 目录键盘跳转、图示方向键滚动和表格滚动已实际操作。设备图可读到最右侧；局部 scrollLeft 到达 608/608 而页面溢出仍为 0。
8. 目视修正：设备 not-ready 分支线避开说明文字；汇编初态改为可换行正文，与源码块分开；S4 SVG 最小显示宽度为本征宽度的 80%，不靠缩小字解决窄屏。

9. `/tmp/s4-scope-qa.mjs` 对照 Git HEAD 的模型检查通过：其他课程的 contract、L048 的其他 Section 单元、其他测评题保持一致；原有 S4 练习与考试题 ID 全部保留。`git diff --check` 通过。

### 限制与未运行

- 官方 syllabus、syllabus update、pseudocode guide 的直接 PDF 入口在本轮返回维护页面，未完成新下载 PDF 的逐页全文复核。依据仓库的 2027–2029 官方映射逐条检查，没有扩大 AS 范围。对应链接为 [syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)、[update](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf)、[pseudocode guide](https://www.cambridgeinternational.org/Images/721401-2027-2029-pseudocode-guide.pdf)。该限制不等于已完成全文核对。
- 直接打开独立 SVG 进行工具检查时，旧浏览器页日志出现 3 条无来源 URL 的 `animation` TypeError；这些 SVG 不含脚本，课程脚本也无对应调用。工具侧错误是目前的归因推断；独立课程页的 18 次访问未复现，不将旧日志表述为完全无错误。
- 项目 README 明确当前没有独立固定验证脚本；一次性 QA 留在 `/tmp`，不新增仓库测试门槛。
- 未运行离线 ZIP release、远端 CI 或真实处理器上的汇编执行；本次交付范围为本地课程审批。未执行 commit、push 或发布操作。
- 数值与实施结果的置信度高；官方 PDF 当前版本的重新全文核验仍待入口恢复，不以旧映射冒充本次新核验。

## 7. 审批入口与源文件

启动方式：`python3 -m http.server 8769 --bind 127.0.0.1 --directory web`。

建议审批顺序：

1. [Section 4 目录](http://127.0.0.1:8769/course-v3/section-4/)
2. [L023 完整取指执行](http://127.0.0.1:8769/course-v3/lesson-023/#unit-2)
3. [L025 标签与两遍汇编](http://127.0.0.1:8769/course-v3/lesson-025/#unit-2)
4. [L026 两条输入路径](http://127.0.0.1:8769/course-v3/lesson-026/#unit-4)
5. [L027 条件设备控制](http://127.0.0.1:8769/course-v3/lesson-027/#unit-3)
6. [L048 S4 复习](http://127.0.0.1:8769/course-v3/lesson-048/#unit-4) 与 [Assessment Bank](http://127.0.0.1:8769/assessments/)

主要源文件：`scripts/course-v3-section4-teaching.mjs`、`course-v3-section4-assessments.mjs`、`course-v3-section4-content.mjs`、`course-v3-section4-questions.mjs`、`course-v3-section4-programs.mjs`、`course-v3-section4-diagrams.mjs`。学习路线在 `course-v3-teaching-support.mjs`，S4 图示可读宽度及代码焦点在 `render-course-v3.mjs`，CU/ALU 的原生图源在 `course-v3-mechanism-completion.mjs`。

本记录属于项目工作材料，不进入学生课程正文。原有未跟踪的 `参考书籍/` 保留，未纳入本次修改。
