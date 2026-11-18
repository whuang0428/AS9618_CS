# 第 4 章课堂路线与核验

[章节入口](../web/course-v3/section-4/index.html)列出 25 个小节、六个真题检查点和 FDE 回顾。Classroom 按图、表、动画和题目逐项前进，Full reading 按同序连续展示。动画可播放、暂停、前进、回退和重置。关闭 JavaScript 后可查看关键帧、步骤和结果。

| 课页 | 小节 | 课堂内容与分层 |
| --- | --- | --- |
| 021 | 4.1.1–4.1.5 | 冯·诺依曼模型与原始 ENIAC、存储程序、两类寄存器、七个专用寄存器、CPU 部件与总线读写。结构真题 9 分。 |
| 022 | 4.1.6–4.1.13 | 五幅性能类比图。性能真题 11 分。用实拍照片辨认 USB Standard-A、Type-C、HDMI 插座与插头及 VGA 插座，在汇总表中对照三种接口。接口真题 9 分。 |
| 023 | 4.1.14 | 从共享内存逐步跟踪 LDD、ADD、STO，另用 LDX 展示 IX。图下对照 RTN，周期回顾附两道保留真题。 |
| 024 | 4.1.15–4.1.17 | 中断来源、设备连接、I/O 完成、定时器调度，以及执行 ADD 期间到达的请求如何被接受、处理和恢复。中断真题 8 分。 |
| 025 | 4.2.1–4.2.2 | 同一条指令的机器码、助记符和翻译关系，以及处理前向引用的两遍汇编。 |
| 026 | 4.2.3–4.2.4 | 官方示例指令表、五种寻址图和逐指令跟踪表。汇编真题 10 分。 |
| 027 | 4.3.1–4.3.4 | 八位逻辑、算术和循环移位，掩码及设备控制。位运算真题 8 分。另可展开一道旧移位题。 |

六个检查点合计 18 个选段、55 分。题目、必要的共享条件和官方评分方案来自教师归档中的 Cambridge 原卷。新增的八个题目选段有 19 张独立的原卷和评分裁图。图旁标注来源文件名和页码，教师解析与评分方案分别折叠。完整选段清单在[检查点资料](../scripts/course-v3-section4-checkpoints.mjs)。

## 教学口径

- 4.1.2 用一个主存框、一列连续地址展示指令和数据。CPU 从地址 1 取出指令 `ADD 5`，再从同一主存的地址 5 读出数据 24。替换地址 1 的指令后，可用原来的数据运行减法。[Cambridge 9618/11，2022 年 10/11 月 Q5(a) 评分方案，第 6 页](https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/9618_w22_ms_11.pdf#page=6)
- 4.1 依考纲架构清单把 ACC 列入专用寄存器。4.2 指令表按题设将 ACC 作为汇编机可用的通用工作寄存器。示例二进制操作码及其宽度属于课程采用的机器模型。[Cambridge 2027–2029 考纲，第 19–22 页](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf#page=19)
- 4.1.14 的取指顺序来自 9618/13 May/June 2025 Q2(a)(ii) 评分方案第 5 页。MAR ← [PC]，PC ← [PC] + 1，MDR ← [[MAR]]，CIR ← [MDR]。状态图将译码及各指令的执行步骤分开展示。
- 一次中断请求可以在外设工作完成时到达。教学案例区分到达与接受，保存现场后进入 ISR，返回时继续主程序；定时器触发的调度另有独立动画。
- 早期 ENIAC 的配置方式以宾夕法尼亚大学的历史说明为依据。教材使用原始档案照片并在其上叠加位置标记。[美国国家档案馆藏照片 594262](https://docsteach.org/document/eniac-women-programmers/) · [宾夕法尼亚大学 ENIAC 回顾](https://penntoday.upenn.edu/news/penns-eniac-worlds-first-electronic-computer-turns-80)

## 本地重建与核验

```sh
node scripts/render-course-v3.mjs --section4
node --test scripts/course-v3-section4-classroom.test.mjs scripts/course-v3-section4-models.test.cjs
python3 -m http.server 8914 --bind 127.0.0.1 --directory web
```

打开[本地第 4 章](http://127.0.0.1:8914/course-v3/section-4/)。定向构建写入章节入口、七个课页、本章浏览器资源及课程 contract 中的第 4 章数据。原 PDF 校验支持 `AS9618_PAST_PAPER_ROOT`，没有源文件时相应校验报告跳过。

浏览器验收使用本机 Chrome。检查项目包括七课课堂路线、跨页返回、完整阅读、旧知识点及真题入口、评分折叠、放大、动画回退，以及无 JavaScript 的关键帧。检查尺寸为 1366×768、1920×1080 和 390×844。投影尺寸使用浏览器视口模拟。

第 4 章的 70 项测试全部通过，无跳过。第 3、5 章的 79 项回归测试也全部通过。课堂路线有 88 步。逐卡核验包括正文引用的材料是否出现在当前卡、动画数值与连线能否一起回退，以及题干所需的原卷图表是否在展开答案之前就能看到。
