# Section 1 整体教学修订与审批记录

日期：2026-09-15。状态：本地实施和自审完成，等待用户验收；未提交、推送或发布。

## 1. 已批准范围与教学依据

本轮按同一对话中已批准的整体方案执行，遵循 [AGENTS.md](AGENTS.md) 和 [TEACHING_STANDARD.md](TEACHING_STANDARD.md)。保留 Lesson 001–006 的路由与六课分工，补齐知识深度、完整例子、独立任务、课间依赖与必要图示；同步 Lesson 048 和 Section 1 的累计测评。规划与验收记录放在本文件，学生正文使用英语。

依据是 Cambridge 9618 2027–2029 syllabus Version 2 的 Section 1，官方印刷页 14–15：

- [官方 syllabus](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)：1.1 Data representation、1.2 Multimedia、1.3 Compression。
- [官方更新说明](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf)：Version 2 的修订涉及考试说明；此次核对的 Section 1 范围未改变。

S1.01–S1.11 及其 A 编号是项目对官方要求的细化映射，不是官方独立小节编号。保留 44 个目标；位数与模式数量、字形与码点、声道数和格式开销等属于支撑计算、澄清概念的必要知识。补码端点与反向转换用于完成核心操作，不藏在拓展中。

## 2. 课程分工与教学深度

| 课程 | 前置 | 本课讲透的内容 | 课堂阶段与衔接 |
| --- | --- | --- | --- |
| [001](web/course-v3/lesson-001/index.html) | 基础整数运算 | bit/nibble/byte；模式数与最大值；四组二进制/十进制前缀；单位换算与完整文件容量 | 为后续颜色、字符、幅度级数与大小计算提供共同基础 |
| [002](web/course-v3/lesson-002/index.html) | 001 | 位值与双向转换、BCD、两种补码与范围、保持值的转换 | 三阶段：普通数制 → BCD → 有符号表示；编码所需的加一进位在本课解释，避免依赖 003 才能完成 |
| [003](web/course-v3/lesson-003/index.html) | 002 | 无符号逐列运算、带负数的加减、固定宽度与两类溢出 | 先 unsigned，再 signed，最后统一判断；与 021 的状态寄存器相连 |
| [004](web/course-v3/lesson-004/index.html) | 001、002 | 字符—数值码—存储—解码—字形；ASCII、扩展表、Unicode | 先完成字符往返，再比较容量和兼容性；连接 058 中数字与字符类型的区别 |
| [005](web/course-v3/lesson-005/index.html) | 001、002 | 位图数据与重建、质量与大小、矢量对象与缩放、用途选择 | 将 Pixel 并入位图结构；从存储结构解释视觉效果 |
| [006](web/course-v3/lesson-006/index.html) | 001、002、004、005 | 声音采样—量化—编码—解码；速率/位深/声道；所有媒体的压缩与恢复 | 两阶段：声音表示 → 压缩；连接 012 的传输/流媒体与 016 的输入输出硬件 |

六个页面是内容组织单元，不规定必须在六个固定时长课时内完成。002 与 006 的阶段安排写入页面导语。保留原有有效问题，新增任务使用不同输入或不同边界。

## 3. 知识、教学过程与学习证据

所有下列位置都已实现；精确的 44 项目标、单元和题目对应关系另见文末附录。

| 知识及性质 | 所属位置与深度 | 学生应能完成的任务 | 讲解、例子与图示 | 变式／误解与独立证据 |
| --- | --- | --- | --- | --- |
| 数据单位与前缀，1.1；模式计数为必要基础 | 001 unit-1，讲透 | 从字节基准双向换算，判断完整文件数 | 2ⁿ 与 2ⁿ−1；Ki/k 至 Ti/T 对照；4 MiB → bytes → MB；1 KiB 放 300-byte 文件 | 不能用分数文件充数；`S1-L01-CAPACITY`、`S1-L01-EXAM-CAPACITY` |
| binary、denary 位值与转换，1.1 | 002 unit-1，讲透 | 按权展开、按余数/位权编码并复查 | 同一 101 的不同值；59 的逐位构建；13 的连续除二 | 非法数字与前导零；`V3-Q-L002-01`、`S1-L02-Q2` |
| hex 与应用，1.1 | 002 unit-2，讲透 | 完成 hex/binary/denary 六个方向 | 59 四种转换路径、300 → 12C、nibble 补零；地址显示用途 | 紧凑显示不改变存储比特；`S1-L02-Q7`、`V3-Q-L002-03` |
| BCD 与应用，1.1 | 002 unit-3，讲透 | 按十进制数字编码/解码，检出非法组 | 407 与 007；59 的普通 binary/BCD/hex 对照；显示与空间代价 | 中间/前导零、1010–1111 非法；`S1-L02-BCD-REVERSE` |
| one’s complement，1.1 | 002 unit-4，讲透 | 编码、反向解码、推导范围 | −23 往返、双零、−127..127 | 四位范围和 −8 不可表示；`S1-L02-SIGNED-BOUNDARY` |
| two’s complement，1.1 | 002 unit-5，讲透 | 用负权和反转加一解码，说明最小负数 | −23、−18 的加一进位、−128；n 位非对称范围 | 最小负数无同宽正数；`S1-L02-EXAM-BOUNDARY` |
| 表示之间转换，1.1 | 002 unit-6，应用 | 区分保持数值、取反数、原位模式重新解释 | +45 保持为 +45；另算 −45；11101001 的三种解释 | 不把 +45 变成 −45 称为保持值转换；`S1-L02-PRESERVE-VALUE` |
| unsigned 加减，1.1 | 003 unit-1，讲透 | 写出每列 carry/borrow 并验证 | 45+23 的八列进位表；64−7 跨零借位的调整行 | 负差超出 unsigned；`S1-L03-BORROW` |
| signed 加减，1.1 | 003 unit-2，讲透 | 正负数组合、减正数、减负数 | +5+(−3)、−5+(−3)、7−12、7−(−3)、−7−(−3) | −128 的取反边界；`S1-L03-SUBTRACT-NEGATIVE` |
| overflow，1.1 | 003 unit-3，讲透 | 区分真值、保留位模式与其解释 | 127+1、240+16、−1+1、−128−1；signed/unsigned 同式对照 | carry out 不等于 signed overflow；`S1-L03-EXAM-NEGATIVE-OVERFLOW` |
| 字符表示、ASCII，1.1 | 004 unit-1..2，讲透 | 使用给定码表完成多字符往返 | A5 加空格 → 65/53/32 → 三个字节 → 原串；7 bit/128 codes | 数字 5 不等于字符 5；`S1-L04-EXAM-DIGIT` |
| 扩展 ASCII、Unicode，1.1；encoding/glyph 为必要澄清 | 004 unit-3..4，讲透 | 解释表不一致、码点与字节差异 | 两个明确标为示意的扩展表；A中 的 UTF-8 往返 | Unicode 并非固定 16 bit；`S1-L04-CODEPOINT-BYTES` |
| 位图、像素、header，1.2 | 005 unit-1，讲透 | 从逐行 code 与 palette 重建原网格 | 复用 10×6、2-bit 的编码格与解码格；15-byte 像素数据 | 数据量不包括未给出的 header/palette；原有 `V3-Q-L005-01` 等 |
| 色深与分辨率，1.2 | 005 unit-2..3，讲透 | 单独改变参数并解释质量和数据量 | 固定 8×8 比较 1/2/4 bit；640×480 单/双方向扩展 | bit 数翻倍不等于颜色数翻倍；放大不恢复原始细节；`S1-L05-EXAM-SCALE` |
| 位图大小，1.2；固定开销为计算支持 | 005 unit-4，讲透 | 算像素、bits、bytes，再加开销 | 640×480×8，300 KiB，加 54-byte header 得 307,254 B | 固定 header 不随位深翻倍；`S1-L05-HEADER` |
| 矢量 drawing list 与用途，1.2 | 005 unit-5..6，讲透 | 根据全部几何/样式/次序重建并缩放 | 蓝矩形 + 黑线同一数据集；原点、方向、线宽、×2；摄影/标志/像素画选择 | 绘制次序和线宽缩放需明确；`S1-L05-VECTOR-REBUILD` |
| 声音采样、量化、编码，1.2 | 006 unit-1，讲透 | 按给定规则量化、编码、解码并说明恢复限制 | 4 个时间点、实际幅值、量化级、3-bit offset code；4 samples/12 bits | 模型码不是补码；压缩可逆不恢复量化前幅值；`S1-L06-NUMERICAL-SAMPLING` |
| sampling rate/resolution，1.2；声道为大小计算支持 | 006 unit-2..3，讲透 | 分别改变时间/幅度精度，计算数据量 | 同源 4 Hz/8 Hz；同测量 2/3 bit；5 s × 16000 Hz ×16 bit mono | 新采集与 upsampling 不同；bits/sample 不等于 samples/s；保留原有比较题 |
| 压缩需要与两类方法，1.3 | 006 unit-4..5，讲透 | 从精确恢复与用途作出选择 | 同 8 Mbit/s 链路 2 MB/1 MB；文本、master、照片预览、语音场景 | 不能只看文件扩展名或“是否看得出”；保留原有用途比较题 |
| RLE，1.3 | 006 unit-6，讲透 | 完整编码/解码、比较包括 count 的成本 | 16 字符、4 runs、128→64 bit；ABC 24→48 bit；count 上限 255 | 不合并不相邻 run；原有 bitmap 24-pixel 反例与 `S1-L06-EXAM-SOUND-RUNS` |
| text/bitmap/vector/sound 压缩，1.3 | 006 unit-7..8，讲透 | 明确恢复对象，判断方法和限制 | REF/LITERAL/SPACE 完整串；12 个声音样本 96→48 bit；共享星形；灰度不可逆例 | 矢量外观等价不保证原文件字节等价；`S1-L06-DICTIONARY` 与原有四类媒体题 |

## 4. 拓展范围与图示决策

可选内容均使用折叠的 Optional extension：one’s-complement end-around carry、UTF-8 与 ASCII 的兼容性、过少采样的直观解释、明确压缩比定义、重复有损导出。没有加入完整信号处理、Huffman/LZW、JPEG/MP3 或浮点实现。

| 图示 | 教学用途与核查内容 | 来源与位置 |
| --- | --- | --- |
| 字符 code 与 glyph | 65、七位/八位 A、字形变化 | 复用现有 `assets/course-v3/mechanisms/` 中的 character-code SVG，004 unit-1 |
| bitmap-composition、colour-depth | 两个相同 60-pixel 网格、4 色映射；固定 64 像素的 2/4/16 级比较 | 复用现有精确 SVG，005 unit-1..2 |
| vector-drawing | 同一 drawing list；坐标、顺序、线宽及 ×2 变换 | 新 SVG，005 unit-5 |
| sound-sampling | 样本时间、连续示意源、量化级、code 与解码值一致 | 新 SVG，006 unit-1 |
| sampling-rate | 同源同位深，仅改变采样时刻 | 新 SVG，006 unit-2 |
| sampling-resolution | 同源同时间同输入范围，仅改变允许级数 | 新 SVG，006 unit-3 |
| rle-roundtrip | 逐 run 对应、恢复顺序、字段成本与扩张反例 | 新 SVG，006 unit-6 |

新图由 `course-v3-section1-examples.mjs` 的明确数值/对象数据与 SVG 生成器构造；浏览器目视核查五图，文本未超出画布。采样图底部最初用空格对齐，经实际检查改成固定坐标列。图注、替代文本、折叠 transcript、全尺寸链接及可聚焦局部滚动均保留。本轮教学需求均为精确结构/数值图，没有新增位图素材或调用 ImageGen。

## 5. 综合测评与源文件

- Lesson 048：Section 1 复习改为具体检索任务；新增 `S1-REVIEW-NUMBERS` 与 `S1-REVIEW-MEDIA`。题目涵盖原位模式的三种解释、同式不同 overflow 判断、位图/声音大小、矢量缩放和会增大数据的 RLE。保留其他 Section 的复习内容。
- Section 1 check：仍为 4×5=20 分。`A-S1-3` 由只列属性深化为给定坐标的实际缩放；`A-S1-4` 加入量化级与二进制码，保留 16-bit bitmap row 编码为 18 bit 的反例。
- 原有 8 分 Paper 1 mock 的 MiB/MB、RLE 解码与成本、字典分隔符、矢量缩放题已经有效，保留其内容；没有为增加题数而替换。
- 主讲源：`scripts/course-v3-section1-teaching.mjs`。详细 blocks 与简短 essentials 分开，按 unitKey 对应，减少单元合并/重排后按序号错配图示的风险。
- 数据与图：`scripts/course-v3-section1-examples.mjs`、`scripts/course-v3-section1-diagrams.mjs`；输出 `web/assets/course-v3/section-1/`。
- 问题源：保留 `course-v3-section1-content.mjs` 的 33 道练习、18 道考试题，`course-v3-section1-questions.mjs` 增加 11 道练习、6 道考试题。
- 累计题源：`scripts/assessment-bank-contract.json`，同步生成 `assessments/assessment-bank.md` 与 `web/assessments/index.html`。
- 共享生成链仅增加 S1 的 author pass、前置课链接和 S1 适用的前置提示；已有 Section 10 工作受到保护。

## 6. 验证记录

### 教学自审

- 学生视角：转换/解码给出宽度、码表和数据；图与表中的数值可以逐项回查；核心例子没有用“按规则计算”跳过关键进位、借位或解码步骤。
- 教师视角：保留六课，合并重复的 Denary 与 Pixel 独立单元；003 调整为 unsigned → signed → overflow；006 调整为采样 → 参数 → 压缩判断 → RLE → 各类媒体。
- 评阅者视角：逐项检查目标与题目映射；新增题的条件、分值、答案点和 command word 均通过项目生成验证。使用给定 UTF-8 字节并用运行时编码独立复算；示意扩展字符表明确不冒充真实 code page。
- 已复算：45+23 的全部 carry 列、64−7 借位权值、11101001 的三种解释、−128 边界与负溢出、4 MiB 换算、位图 header、数值采样、声道/位深大小、RLE 及声音 run 的恢复与成本。

### 工程验证

- `node scripts/render-course-v3.mjs`：通过；生成 93 个课程页面、12 个 Section、151 个兼容入口、202 项资源。
- 临时核查 `/tmp/as9618-s1-verify.mjs`：通过；28 个主讲单元均有 Detailed、Core 和理解检查，44 个目标均有主讲位置与应用题；44 道练习、24 道考试题的分值与评分点一致。临时脚本与详细输出未加入项目。
- 相关 9 个页面的静态引用检查：243 个本地引用均存在；包含文件与 fragment 校验。
- 实际浏览器检查：001–006 与 048 均在 1280px、390px 下检查；页面宽度没有溢出，所有本轮练习答案默认关闭，没有发现错误图片引用。宽图/表保持局部可聚焦滚动。
- `Teach one unit` / `Show whole lesson`、采样题答案展开/收起、Optional extension 均已实际操作。新增 SVG 按图逐张目视核对，不以无页面溢出代替图内检查。
- `git diff --check`：通过。改动范围与初始哈希清单对照；Section 10 源文件、图示及页面没有本轮新增变化。
- 重复生成未改变任何已有输出；contract 的 lesson 记录变化仅限 001–006、048。45 个 Section 10 相关文件与本轮开始时的校验值一致。
- 全尺寸 SVG 已通过直接打开逐张检查；内嵌浏览器点击新窗口链接未返回可观测的新标签，因此没有将新窗口行为记为已验证。链接目标文件和同页局部滚动均已验证。

未运行离线 ZIP 打包或远程部署：本轮交付为本地审批版本。没有未解决的教学阻塞项。核心内容与计算核对置信度：高；未将本次页面自审视为真实学生课堂试教结果。

## 7. 本地审批入口

运行 `python3 -m http.server 8769 --bind 127.0.0.1 --directory web` 后打开：

- [Section 1 总览](http://127.0.0.1:8769/course-v3/section-1/)
- [002 数制与补码](http://127.0.0.1:8769/course-v3/lesson-002/)
- [003 运算与溢出](http://127.0.0.1:8769/course-v3/lesson-003/)
- [005 位图与矢量](http://127.0.0.1:8769/course-v3/lesson-005/)
- [006 声音与压缩](http://127.0.0.1:8769/course-v3/lesson-006/)
- [048 综合复习](http://127.0.0.1:8769/course-v3/lesson-048/)
- [Assessment Bank](http://127.0.0.1:8769/assessments/)

后续新对话应同时读取本记录与通用教学标准。此次授权完成本地修订，不包含远程发布。

## 附录：44 项目标的位置与题目证据

以下为本次实际生成模型的对应关系。题号可在页面 HTML 的 `data-question-id` 和问题源文件中定位；同一综合题可以覆盖多项目标。

| 目标 | 主讲位置 | 对应练习／考试题（节选） |
| --- | --- | --- |
| S1.01.A01 | [001 unit-1](web/course-v3/lesson-001/index.html#unit-1) | `V3-Q-L001-01`、`S1-L01-EXAM-3`、`S1-L01-EXAM-CAPACITY` |
| S1.01.A02 | [001 unit-1](web/course-v3/lesson-001/index.html#unit-1) | `V3-Q-L001-01`、`S1-L01-EXAM-3`、`S1-L01-EXAM-CAPACITY` |
| S1.02.A01 | [002 unit-1](web/course-v3/lesson-002/index.html#unit-1) | `S1-L02-Q2` |
| S1.02.A02 | [002 unit-1](web/course-v3/lesson-002/index.html#unit-1) | `S1-L02-Q2` |
| S1.02.A03 | [002 unit-2](web/course-v3/lesson-002/index.html#unit-2) | `S1-L02-Q2` |
| S1.02.A04 | [002 unit-3](web/course-v3/lesson-002/index.html#unit-3) | `S1-L02-Q3`、`S1-L02-BCD-REVERSE`、`S1-L02-EXAM-1` |
| S1.02.A05 | [002 unit-4](web/course-v3/lesson-002/index.html#unit-4) | `S1-L02-Q5`、`S1-L02-SIGNED-BOUNDARY`、`S1-L02-EXAM-2` |
| S1.02.A06 | [002 unit-5](web/course-v3/lesson-002/index.html#unit-5) | `S1-L02-Q6`、`S1-L02-SIGNED-BOUNDARY`、`S1-L02-EXAM-2` |
| S1.03.A01 | [002 unit-1](web/course-v3/lesson-002/index.html#unit-1)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `V3-Q-L002-01`、`S1-L02-Q7`、`S1-L02-EXAM-3` |
| S1.03.A02 | [002 unit-2](web/course-v3/lesson-002/index.html#unit-2)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `V3-Q-L002-01`、`S1-L02-Q7`、`S1-L02-EXAM-3` |
| S1.03.A03 | [002 unit-2](web/course-v3/lesson-002/index.html#unit-2)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `V3-Q-L002-01`、`S1-L02-Q7` |
| S1.03.A04 | [002 unit-3](web/course-v3/lesson-002/index.html#unit-3)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `S1-L02-Q3`、`S1-L02-BCD-REVERSE`、`S1-L02-EXAM-1` |
| S1.03.A05 | [002 unit-4](web/course-v3/lesson-002/index.html#unit-4)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `S1-L02-Q5`、`S1-L02-EXAM-2`、`S1-L02-EXAM-BOUNDARY` |
| S1.03.A06 | [002 unit-5](web/course-v3/lesson-002/index.html#unit-5)、[002 unit-6](web/course-v3/lesson-002/index.html#unit-6) | `S1-L02-Q6`、`S1-L02-EXAM-2`、`S1-L02-EXAM-BOUNDARY` |
| S1.06.A01 | [002 unit-3](web/course-v3/lesson-002/index.html#unit-3) | `S1-L02-Q3` |
| S1.06.A02 | [002 unit-2](web/course-v3/lesson-002/index.html#unit-2) | `V3-Q-L002-03` |
| S1.04.A01 | [003 unit-1](web/course-v3/lesson-003/index.html#unit-1) | `V3-Q-L003-01`、`S1-L03-EXAM-2`、`S1-L03-EXAM-3` |
| S1.04.A02 | [003 unit-2](web/course-v3/lesson-003/index.html#unit-2) | `V3-Q-L003-02`、`S1-L03-EXAM-1`、`S1-L03-EXAM-NEGATIVE-OVERFLOW` |
| S1.05.A01 | [003 unit-2](web/course-v3/lesson-003/index.html#unit-2)、[003 unit-3](web/course-v3/lesson-003/index.html#unit-3) | `V3-Q-L003-01`、`S1-L03-EXAM-2`、`S1-L03-EXAM-NEGATIVE-OVERFLOW` |
| S1.07.A01 | [004 unit-1](web/course-v3/lesson-004/index.html#unit-1) | `V3-Q-L004-01`、`S1-L04-EXAM-2`、`S1-L04-EXAM-DIGIT` |
| S1.07.A02 | [004 unit-2](web/course-v3/lesson-004/index.html#unit-2) | `S1-L04-Q3`、`S1-L04-EXAM-1`、`S1-L04-EXAM-DIGIT` |
| S1.07.A03 | [004 unit-3](web/course-v3/lesson-004/index.html#unit-3) | `S1-L04-Q4`、`S1-L04-EXAM-1`、`S1-L04-EXAM-3` |
| S1.07.A04 | [004 unit-4](web/course-v3/lesson-004/index.html#unit-4) | `V3-Q-L004-01`、`S1-L04-CODEPOINT-BYTES`、`S1-L04-EXAM-3` |
| S1.08.A01 | [005 unit-1](web/course-v3/lesson-005/index.html#unit-1) | `S1-L05-Q4`、`S1-L05-EXAM-1` |
| S1.08.A02 | [005 unit-3](web/course-v3/lesson-005/index.html#unit-3) | `S1-L05-Q6` |
| S1.08.A03 | [005 unit-2](web/course-v3/lesson-005/index.html#unit-2) | `S1-L05-Q5`、`S1-L05-EXAM-1` |
| S1.08.A04 | [005 unit-4](web/course-v3/lesson-005/index.html#unit-4) | `V3-Q-L005-02`、`S1-L05-EXAM-3`、`S1-L05-EXAM-SCALE` |
| S1.08.A05 | [005 unit-3](web/course-v3/lesson-005/index.html#unit-3) | `S1-L05-Q6`、`S1-L05-EXAM-3`、`S1-L05-EXAM-SCALE` |
| S1.08.A06 | [005 unit-2](web/course-v3/lesson-005/index.html#unit-2) | `S1-L05-Q5`、`S1-L05-HEADER`、`S1-L05-EXAM-3` |
| S1.09.A01 | [005 unit-5](web/course-v3/lesson-005/index.html#unit-5) | `V3-Q-L005-03`、`S1-L05-VECTOR-REBUILD`、`S1-L05-EXAM-2` |
| S1.09.A02 | [005 unit-6](web/course-v3/lesson-005/index.html#unit-6) | `V3-Q-L005-01`、`S1-L05-EXAM-2`、`S1-L05-EXAM-SCALE` |
| S1.09.A03 | [005 unit-6](web/course-v3/lesson-005/index.html#unit-6) | `V3-Q-L005-01` |
| S1.10.A01 | [006 unit-1](web/course-v3/lesson-006/index.html#unit-1) | `V3-Q-L006-01`、`S1-L06-NUMERICAL-SAMPLING`、`S1-L06-EXAM-1` |
| S1.10.A02 | [006 unit-1](web/course-v3/lesson-006/index.html#unit-1) | `V3-Q-L006-01`、`S1-L06-NUMERICAL-SAMPLING`、`S1-L06-EXAM-SOUND-RUNS` |
| S1.10.A03 | [006 unit-2](web/course-v3/lesson-006/index.html#unit-2) | `S1-L06-Q2`、`S1-L06-EXAM-1` |
| S1.10.A04 | [006 unit-3](web/course-v3/lesson-006/index.html#unit-3) | `S1-L06-Q2`、`S1-L06-NUMERICAL-SAMPLING`、`S1-L06-EXAM-SOUND-RUNS` |
| S1.11.A01 | [006 unit-4](web/course-v3/lesson-006/index.html#unit-4) | `S1-L06-Q7` |
| S1.11.A02 | [006 unit-5](web/course-v3/lesson-006/index.html#unit-5)、[006 unit-7](web/course-v3/lesson-006/index.html#unit-7)、[006 unit-8](web/course-v3/lesson-006/index.html#unit-8) | `V3-Q-L006-03`、`S1-L06-DICTIONARY`、`S1-L06-EXAM-3` |
| S1.11.A03 | [006 unit-6](web/course-v3/lesson-006/index.html#unit-6) | `S1-L06-Q8`、`S1-L06-EXAM-2`、`S1-L06-EXAM-SOUND-RUNS` |
| S1.11.A04 | [006 unit-7](web/course-v3/lesson-006/index.html#unit-7) | `S1-L06-Q4`、`S1-L06-DICTIONARY` |
| S1.11.A05 | [006 unit-7](web/course-v3/lesson-006/index.html#unit-7)、[006 unit-8](web/course-v3/lesson-006/index.html#unit-8) | `S1-L06-Q5`、`S1-L06-EXAM-2` |
| S1.11.A06 | [006 unit-7](web/course-v3/lesson-006/index.html#unit-7) | `S1-L06-Q6` |
| S1.11.A07 | [006 unit-7](web/course-v3/lesson-006/index.html#unit-7)、[006 unit-8](web/course-v3/lesson-006/index.html#unit-8) | `V3-Q-L006-03`、`S1-L06-EXAM-3`、`S1-L06-EXAM-SOUND-RUNS` |
| S1.11.A08 | [006 unit-5](web/course-v3/lesson-006/index.html#unit-5)、[006 unit-8](web/course-v3/lesson-006/index.html#unit-8) | `S1-L06-Q4`、`S1-L06-EXAM-2`、`S1-L06-EXAM-3` |
