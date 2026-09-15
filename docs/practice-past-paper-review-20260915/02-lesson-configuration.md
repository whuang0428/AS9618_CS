# B. 全课程 Practice 与真题配置表

> 归档说明（2026-09-15）：用户已授权将本方案与既有 Section 4 修改一同提交、推送。本方案仍待教学审核，尚未实施。下文“本轮只读／项目外／未提交”等描述记录的是此前审查阶段；文件和图片链接已改为仓库相对路径，教师原卷路径保留为来源记录。

覆盖当前活跃课程91节教学课及两节综合复习，采用实际L001–L093路由，不使用旧44+44分配。下文P1、P2指该课**当前Practice显示次序**，其真实ID及原题提示在本文后半的逐课清单中。E编号链接核验登记册；每条都给出真实年份/考季/component/原题号/分值，QP/MS页码。

**计数口径**：Practice按现有顶层question ID计大题；现有源没有统一正式子问编号，故一条ID记一个作答单元，不把题干多个动词冒充多个官方子问。真题大题按该课“原卷+原大题号”计；子问按原卷所选末级题号计，无子号的整题记1。Practice分是现有教师诊断分；定向修改后需复核对应教师评分，绝不称官方分。表中分钟均为教学估计、独立完成时间，不含讲解；不能当作官方限时。

**配置含义**：教学课“主配置”是一个Lesson教学周期的核心任务，可分课内/课后；高密度课不强塞单次40分钟。两节review是诊断菜单，实际选做量由前测决定。其余题保留为有条件的巩固，不要求全部叠加完成。新真题替换现有299条Original exam-style配置；不能把它们连同新题都保留造成重复。经验证有效、确有额外理解价值的旧原创题可在实施时经本表目标检查后归入可选Practice，仍标教师原创，不改标真题。


## Section 1

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L001](../../web/course-v3/lesson-001/index.html) Binary data units and magnitude prefixes<br>单位含义、容量约束与比较 | P1, P4<br>2/2/7；8–10分 | [E001](04-source-register.md) 2024 M/J /12 Q7(a) [1]；QP p14 / MS p10<br>**1/1/1；2–3分** | P1保留GiB/GB解释，P4检查完整文件能否装入；P2、P3转可选基础换算。<br>真题新增：比较混用前缀；不再重复容量装入题 | 001课内；整数乘除<br>无已确认的入选题原卷/MS缺页。 |
| [L002](../../web/course-v3/lesson-002/index.html) Binary, denary, hexadecimal, BCD and signed representations<br>位权、BCD有效性、表示范围、保值转换 | P1, P2, P3, P4, P8, P9, P10<br>7/7/24；25–30分 | [E002](04-source-register.md) 2023 M/J /12 Q4(a) [1] + Q4(b) [2] + Q4(c) [2]；QP p9 / MS p6, 7<br>[E003](04-source-register.md) 2024 O/N /13 Q8(b) [3]；QP p15 / MS p8<br>**2/4/8；10–13分** | 保留七种不同判断；P5、P6例行负数编解码已由P9、P10深化，P7与P1同法，转可选。<br>真题新增：模式数量、负数编码、十六进制位权三种不同要求；从只给结果推进到解释转换方法 | 001<br>无已确认的入选题原卷/MS缺页。 |
| [L003](../../web/course-v3/lesson-003/index.html) Binary addition, subtraction and overflow<br>固定字长算术、借位、带符号溢出 | P1, P2, P3, P4, P6, P7<br>6/6/22；22–27分 | [E004](04-source-register.md) 2024 M/J /12 Q7(b) [3]；QP p14 / MS p10<br>[E005](04-source-register.md) 2024 M/J /11 Q7 [3]；QP p15 / MS p8<br>**2/2/6；9–12分** | P5与P6同属穿零借位，仅P6必做；P1与P2成对区分unsigned与signed，P7增加减负数。<br>真题新增：减法过程与结果分开评分；固定字长、进位、溢出表示 | 002<br>无已确认的入选题原卷/MS缺页。 |
| [L004](../../web/course-v3/lesson-004/index.html) Character encoding: ASCII, extended ASCII and Unicode<br>字符编码、字符集覆盖与解释边界 | P1, P2, P3, P4<br>4/4/10；9–12分 | [E006](04-source-register.md) 2025 O/N /13 Q1(b) [2] + Q1(c) [2]；QP p2 / MS p4<br>**1/2/4；5–7分** | P1编码机制、P2给码转换、P3标准ASCII容量、P4扩展ASCII区别均保留；P5给定UTF-8表作可选拓展，不背码值。<br>真题新增：编码过程与字符覆盖范围的不同command words | 002<br>无已确认的入选题原卷/MS缺页。 |
| [L005](../../web/course-v3/lesson-005/index.html) Bitmap and vector graphics<br>表示方式选择、重建、深度/分辨率、header开销 | P1, P4, P5, P6, P7, P8<br>6/6/22；23–28分 | [E007](04-source-register.md) 2023 O/N /12 Q6(c) [2]；QP p9 / MS p7<br>[E008](04-source-register.md) 2024 M/J /12 Q2(d)(i) [3] + Q2(d)(ii) [2]；QP p3, 4 / MS p4, 5<br>**2/3/7；12–16分** | P2例行像素大小计算由真题承担，P3对象属性已嵌入P8，转可选；保留P7不能整文件机械倍增的反例。<br>真题新增：展示bits到bytes到MiB的过程；数值计算之外增加两种表示的结构解释 | 001、002<br>无已确认的入选题原卷/MS缺页。 |
| [L006](../../web/course-v3/lesson-006/index.html) Sound representation and file compression<br>采样量化、质量权衡、可逆解码与压缩开销 | P2, P3, P4, P5, P6, P8, P9, P10<br>8/8/30；30–38分 | [E009](04-source-register.md) 2023 O/N /12 Q6(b) [3]；QP p9 / MS p7<br>[E010](04-source-register.md) 2024 M/J /13 Q2(b)(ii) [2]；QP p3 / MS p4<br>**2/2/5；7–10分** | P1口头诊断，P7一般收益口头回顾；八项保留分别覆盖声音、文字、位图、向量及两个编码边界，可分课堂与课后完成。<br>真题新增：量化精度因果链；按连续相同像素解释无损编码 | 001、002、005<br>无已确认的入选题原卷/MS缺页。 |

## Section 2

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L007](../../web/course-v3/lesson-007/index.html) Network purpose, models and client types<br>模型角色、离线能力与情境选择 | P2, P3, P4<br>3/3/15；12–16分 | [E011](04-source-register.md) 2024 M/J /11 Q5(a) [4]；QP p11 / MS p6<br>[E012](04-source-register.md) 2024 M/J /12 Q3(b) [4]；QP p5, 6 / MS p6<br>**2/2/8；10–14分** | P1网络收益入口口答；P2三城市LAN/WAN、P3thin选择、P4厚客户端CAD保留，真题另做server角色分工。<br>真题新增：两个角色各用场景展开，避免只背定义；每个特征必须解释对阅卷工作的用处 | 课内LAN/WAN与模型<br>无已确认的入选题原卷/MS缺页。 |
| [L008](../../web/course-v3/lesson-008/index.html) Topologies, packet paths and design choices<br>拓扑数据路径、故障与冗余 | P1, P2, P3, P4<br>4/4/19；15–20分 | [E013](04-source-register.md) 2024 M/J /13 Q5(b) [2]；QP p10 / MS p6<br>**1/1/2；5–7分** | 保留路径和故障任务；真题星形描述不替代bus、mesh与hybrid理解，要求说明链路仍存时可用路径。<br>真题新增：以数据路径解释星形；Practice另保留bus/mesh故障判断 | 007<br>无已确认的入选题原卷/MS缺页。 |
| [L009](../../web/course-v3/lesson-009/index.html) Public and private cloud computing<br>云端依赖、共享与本地持续工作 | P1, P2, P3<br>3/3/16；12–16分 | [E014](04-source-register.md) 2025 O/N /12 Q8(a)(i) [2] + Q8(a)(ii) [2]；QP p13 / MS p10<br>**1/2/4；6–8分** | P3诊所题补给可用安全措施的含义，只评价共享/可用性；P4备份恢复细节延后S6后可选，避免提前考加密知识。<br>真题新增：同一方案分别给出收益与限制 | 007；安全概念另给条件<br>无已确认的入选题原卷/MS缺页。 |
| [L010](../../web/course-v3/lesson-010/index.html) Wired, wireless and transmission media<br>传输介质、干扰、距离与选择理由 | P2, P4<br>2/2/10；10–14分 | [E015](04-source-register.md) 2024 O/N /13 Q9(b) [4]；QP p16 / MS p8<br>**1/1/4；5–7分** | P1十分类罗列作参考，P3与P4重叠转可选；P2比较和P4场景选择保留。<br>真题新增：媒介名称必须配信号传输方式 | 007、008<br>无已确认的入选题原卷/MS缺页。 |
| [L011](../../web/course-v3/lesson-011/index.html) LAN hardware, routers and Ethernet<br>LAN设备职责、帧路径、CSMA/CD阶段 | P3, P5, P6<br>3/3/15；17–22分 | [E016](04-source-register.md) 2023 M/J /12 Q1(d) [3]；QP p2, 3 / MS p3<br>[E017](04-source-register.md) 2023 O/N /12 Q7(c) [3]；QP p10, 11 / MS p8<br>**2/2/6；10–14分** | P1八设备名词清单转口答；P2、P4路径重复作可选。P3错说诊断、P5往返局部路径、P6冲突后重试各有独立作用。<br>真题新增：Ethernet含协议/接入/帧，不与CSMA等同；按阶段描述冲突处理，补足前题不同要求 | 007–010<br>无已确认的入选题原卷/MS缺页。 |
| [L012](../../web/course-v3/lesson-012/index.html) Bit streaming, rates and buffers<br>速率差、有限buffer和连续播放 | P3, P4, P5<br>3/3/14；15–20分 | [E018](04-source-register.md) 2024 O/N /13 Q9(c) [4]；QP p16, 17 / MS p8<br>**1/1/4；6–9分** | P1定义口答，P2简单buffer例可选；P3长期不足、P4变速追踪、P5启动储备不互换。<br>真题新增：串起连续传输、媒体服务器、buffer、播放 | 001、010、011<br>无已确认的入选题原卷/MS缺页。 |
| [L013](../../web/course-v3/lesson-013/index.html) Internet, WWW and connection infrastructure<br>WWW/internet、modem与双向访问路径 | P1, P2, P3, P4<br>4/4/21；15–20分 | [E019](04-source-register.md) 2024 M/J /12 Q3(c)(ii) [2]；QP p5, 6 / MS p6<br>**1/1/2；2–3分** | 四项保留；P3专线/蜂窝服务是独立情境，不与modem双向流程重复。P2/P4作为往返两段连续完成。<br>真题新增：PSTN的公共交换基础设施；Practice完成双向modem | 011、012<br>无已确认的入选题原卷/MS缺页。 |
| [L014](../../web/course-v3/lesson-014/index.html) IP addressing, subnetting, URLs and DNS<br>IP两个分类轴、子网和DNS到资源 | P3, P4, P5, P6<br>4/4/21；22–28分 | [E020](04-source-register.md) 2023 O/N /12 Q7(a) [2] + Q7(b)(iii) [4] + Q7(d) [4]；QP p10, 11, 12 / MS p7, 8, 9<br>**1/3/10；13–17分** | P2和P5相同/26划分思路，P2可选；P1表示法口答；保留P3分类、P4地址使用、P5子网、P6完整资源流程。<br>真题新增：地址表示、subnet用途、static/dynamic与public/private两轴 | 002、011、013<br>无已确认的入选题原卷/MS缺页。 |

## Section 3

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L015](../../web/course-v3/lesson-015/index.html) Input, output, storage and embedded systems<br>专用控制、存储持久性与需求变化 | P2, P4, P5<br>3/3/12；13–17分 | [E021](04-source-register.md) 2023 O/N /12 Q1(c)(i) [2] + Q1(c)(ii) [1]；QP p2 / MS p3<br>**1/2/3；5–7分** | P1结构罗列转口答，P3洗衣机优缺点与P5同类转可选；P4断电和P5升级限制检验迁移。<br>真题新增：用专用任务说明embedded并识别限制 | 硬件基础；001<br>无已确认的入选题原卷/MS缺页。 |
| [L016](../../web/course-v3/lesson-016/index.html) Principal operations of hardware devices<br>九种设备的能量/信号转换和故障定位 | P1, P10, P11, P12, P13, P14<br>6/6/26；30–38分 | [E022](04-source-register.md) 2024 M/J /12 Q2(a) [4]；QP p3 / MS p4<br>[E023](04-source-register.md) 2025 O/N /12 Q8(b)(i) [4]；QP p13 / MS p10<br>**2/2/8；11–15分** | P1调整为“图样正确但碳粉可擦掉”，解释定影作用及激光为何不能修复；保留原5分教师分配。P2–9例行流程作可选，P10–14覆盖其机制；九设备均仍有理解检查。<br>真题新增：多个硬件步骤组成一个工作过程；触摸检测与坐标/菜单处理两个评分组 | 005、006、015<br>无已确认的入选题原卷/MS缺页。 |
| [L017](../../web/course-v3/lesson-017/index.html) Buffers, RAM, ROM and memory technologies<br>易失性、读写特征、缓存排队与选型 | P3, P5, P6<br>3/3/13；16–21分 | [E024](04-source-register.md) 2024 O/N /13 Q2(a) [2] + Q2(b) [4]；QP p3 / MS p3<br>**1/2/6；8–11分** | P1已有流量过程由P5具体追踪承担；P2、P4分类并入P6口头追问，参考答案保留，主练习不重复罗列。<br>真题新增：易混存储技术对比和快慢设备间的数据流 | 015、016<br>无已确认的入选题原卷/MS缺页。 |
| [L018](../../web/course-v3/lesson-018/index.html) Monitoring, control, sensors, actuators and feedback<br>监测/控制、反馈、传感器与执行器故障 | P2, P6, P7<br>3/3/12；15–20分 | [E025](04-source-register.md) 2024 O/N /12 Q9(a) [2] + Q9(b) [2]；QP p16 / MS p10<br>[E026](04-source-register.md) 2025 O/N /12 Q11 [3]；QP p16 / MS p11<br>**2/3/7；10–14分** | P6、P7为两项APPLY，保留完整状态与故障诊断；P5加热器复述与P6同机制可选，其余一般定义入口回顾。<br>真题新增：传感器用途与monitoring理由；名称本身未给分；与前题相反的控制情境，建立判断条件 | 015、016<br>无已确认的入选题原卷/MS缺页。 |
| [L019](../../web/course-v3/lesson-019/index.html) Logic gates, symbols and truth tables<br>六门符号、真值和OR/XOR区别 | P1, P2, P3, P4<br>4/4/17；16–20分 | [E027](04-source-register.md) 2024 M/J /12 Q1(a) [4]；QP p2 / MS p3<br>**1/1/4；5–7分** | P5复合De Morgan任务移入L020可选巩固；本课保留单门全覆盖，不提前要求复合逻辑证明。<br>真题新增：区分OR/XOR与反相门，按行计分 | 002<br>无已确认的入选题原卷/MS缺页。 |
| [L020](../../web/course-v3/lesson-020/index.html) Boolean expressions and logic-circuit design<br>电路、表达式、真值表互相构造 | P1, P3, P4<br>3/3/13；18–23分 | [E028](04-source-register.md) 2023 M/J /12 Q6(a) [2] + Q6(b) [2]；QP p12 / MS p8<br>**1/2/4；10–14分** | P2与P1同类复合追踪作可选；P5仅指定若干接受行构造与P4相近作可选。L019移来的等价性题只作扩展，不增加必做。<br>真题新增：expression→circuit与expression→truth table，两种方法 | 019<br>无已确认的入选题原卷/MS缺页。 |

## Section 4

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L021](../../web/course-v3/lesson-021/index.html) Von Neumann architecture, CPU components and registers<br>寄存器职责、地址/内容、PC/CIR区别 | P1, P3, P4<br>3/3/11；13–17分 | [E029](04-source-register.md) 2024 O/N /12 Q3(a) [4]；QP p4 / MS p4<br>**1/1/4；6–8分** | P2纯寄存器清单可选；P5完整ADD执行题移至L023可选，避免尚未教完整fetch就作为独立考核。<br>真题新增：已给寄存器名称，描述各自用途；Practice负责职责错误的解释 | 015、017<br>无已确认的入选题原卷/MS缺页。 |
| [L022](../../web/course-v3/lesson-022/index.html) System buses, ports and processor performance<br>总线方向、端口约束、cache与地址容量 | P1, P2, P3, P4, P5, P6<br>6/6/25；20–25分 | [E030](04-source-register.md) 2024 O/N /12 Q3(b) [4]；QP p5 / MS p4<br>[E031](04-source-register.md) 2025 O/N /12 Q3(c) [4]；QP p5 / MS p5<br>**2/2/8；9–12分** | 六项均保留：P3是数据总线最少传送次数，不能误判为一般性能复述；与P6地址容量问题不同。<br>真题新增：端口选择需同时回应视频与音频；每种因素最多2分，不能四句全写同一因素 | 021<br>无已确认的入选题原卷/MS缺页。 |
| [L023](../../web/course-v3/lesson-023/index.html) The fetch-execute cycle in register-transfer notation<br>fetch/execute状态变化与寄存器传送符号 | P1, P2, P3, P4<br>4/4/15；19–24分 | [E032](04-source-register.md) 2023 M/J /13 Q7(c) [2]；QP p13 / MS p11<br>[E033](04-source-register.md) 2025 O/N /13 Q6(b) [4]；QP p11 / MS p10<br>**2/2/6；8–11分** | P4保留完整ADD/STO路径，但追加“错误把地址存为数据”的预测作为其原有解释要求，使用原程序条件；从L021移来的题只作可选。<br>真题新增：严格区分地址与地址所指内容；由符号转成连贯fetch机制说明 | 021、022<br>无已确认的入选题原卷/MS缺页。 |
| [L024](../../web/course-v3/lesson-024/index.html) Interrupt causes, detection and handling<br>中断检测、优先级、上下文保存与恢复 | P1, P2, P4<br>3/3/13；15–20分 | [E034](04-source-register.md) 2025 M/J /12 Q1(c) [4]；QP p3 / MS p4<br>**1/1/4；7–10分** | P3定义重复可选；P4必须保留ACC/PC/IX恢复后再执行的结果，不能只答继续执行。<br>真题新增：检测、保存、ISR和恢复的必要顺序 | 021、023<br>无已确认的入选题原卷/MS缺页。 |
| [L025](../../web/course-v3/lesson-025/index.html) Assembly language and the two-pass assembler<br>符号表、前向引用与两遍分工 | P2, P4<br>2/2/9；12–16分 | [E035](04-source-register.md) 2023 M/J /12 Q3(a) [3]；QP p8 / MS p6<br>**1/1/3；4–6分** | P1遍次概述口答，P3自定义编码可选；P2建符号表和P4重复/缺失标签检查保留，真题专教3分不等于连3条线。<br>真题新增：四项动作却总3分，揭示分组计分 | 021；汇编标签课内<br>无已确认的入选题原卷/MS缺页。 |
| [L026](../../web/course-v3/lesson-026/index.html) Addressing modes and complete assembly traces<br>寻址、条件跳转、内存与输出完整追踪 | P2, P4, P6, P7, P8<br>5/5/21；27–35分 | [E036](04-source-register.md) 2023 O/N /12 Q9(b) [4]；QP p14, 15 / MS p11<br>**1/1/4；13–18分** | P1、P3、P5同类中间追踪作可选；P4与P7作为接受/拒绝路径成对检验，P8循环终止新增价值。高密度课分两段完成。<br>真题新增：沿ACC、内存及输出追踪；不能只复制最后输出 | 023–025<br>无已确认的入选题原卷/MS缺页。 |
| [L027](../../web/course-v3/lesson-027/index.html) Bit manipulation, masks and binary shifts<br>逻辑移位、mask保持无关位与条件更新 | P1, P3, P6<br>3/3/16；18–23分 | [E037](04-source-register.md) 2024 M/J /12 Q5(b) [3]；QP p12 / MS p8<br>[E038](04-source-register.md) 2024 O/N /12 Q8(b)(ii) [3]；QP p14, 15 / MS p9<br>**2/2/6；9–12分** | P5标签工作与L025重复转可选；P2两种操作数若给相同数值不增加辨别价值，转可选；P4单独位运算与主题重复可选。<br>真题新增：区分内存操作数与立即数，逐行独立起始状态；从给出结果推进到构造mask并解释 | 002、019、026<br>无已确认的入选题原卷/MS缺页。 |

## Section 5

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L028](../../web/course-v3/lesson-028/index.html) Why operating systems are required<br>OS分配回收、保护、文件、驱动与调度 | P2, P3, P4, P5, P6<br>5/5/12；16–21分 | [E039](04-source-register.md) 2024 M/J /12 Q6 [4]；QP p13 / MS p9<br>**1/1/4；6–8分** | P1服务清单口答；其余五项有独立机制。真题只考memory/process两项，Practice保留文件、权限、驱动覆盖。<br>真题新增：两个评分组各最多3分、总4分 | 017、021、024<br>无已确认的入选题原卷/MS缺页。 |
| [L029](../../web/course-v3/lesson-029/index.html) Utility software, libraries and linked files<br>工具能力边界、恢复、库接口和DLL兼容 | P3, P4, P6, P7, P8<br>5/5/14；20–26分 | [E040](04-source-register.md) 2023 M/J /12 Q7(a)(i) [2] + Q7(a)(ii) [4]；QP p13 / MS p9<br>[E041](04-source-register.md) 2023 O/N /12 Q8(b) [3]；QP p13 / MS p9<br>**2/3/9；12–16分** | P1、P2、P5一般工具定义转可选；保留碎片整理、修复不保证恢复、备份还原与库依赖的不同判断。<br>真题新增：library定义和DLL利益+原因配对；按目的说明工具，避免把安全软件重复列入 | 017、028<br>无已确认的入选题原卷/MS缺页。 |
| [L030](../../web/course-v3/lesson-030/index.html) Assemblers, compilers and interpreters<br>翻译输入/输出、错误发现与执行阶段 | P1, P2, P3<br>3/3/8；10–14分 | [E042](04-source-register.md) 2025 O/N /12 Q10(a) [4]；QP p15 / MS p11<br>**1/1/4；6–8分** | 三项现有任务承担不同目标，均保留；去掉旧exam同义比较，真实题教先解释执行阶段再给理由。<br>真题新增：两个阶段各最多2分 | 025、028<br>无已确认的入选题原卷/MS缺页。 |
| [L031](../../web/course-v3/lesson-031/index.html) Choosing a translator and understanding Java translation<br>翻译方式的情境选择与JVM依赖 | P2, P3<br>2/2/7；8–12分 | [E043](04-source-register.md) 2023 M/J /12 Q7(b) [3]；QP p13 / MS p9<br>**1/1/3；5–7分** | P1通用比较与P2场景选择重叠可选；保留Java中间代码和JVM，不能据一次编译就称独立本机执行。<br>真题新增：不为选择本身给分；两种选择均可合理论证 | 030<br>无已确认的入选题原卷/MS缺页。 |
| [L032](../../web/course-v3/lesson-032/index.html) IDE features and practical debugging support<br>语法/逻辑区别、编辑行为与调试步骤 | P2, P3, P4<br>3/3/10；11–15分 | [E044](04-source-register.md) 2023 M/J /12 Q7(c) [4]；QP p14 / MS p10<br>**1/1/4；7–10分** | P1提示功能入口口答；P2语法诊断、P3格式/折叠不改变执行、P4调试顺序保留，教师在P4解释语法正确仍可有逻辑错。<br>真题新增：根据给定功能名称描述行为；Practice检验调试操作流程 | 030、031<br>无已确认的入选题原卷/MS缺页。 |

## Section 6

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L033](../../web/course-v3/lesson-033/index.html) Security, privacy, integrity and the need for protection<br>security/privacy/integrity分类与反例 | P1, P2, P3<br>3/3/7；9–13分 | [E045](04-source-register.md) 2023 O/N /12 Q5(a) [1] + Q5(b) [1]；QP p8 / MS p5, 6<br>**1/2/2；6–8分** | P4丢失设备情境转可选；保留合法范围但错误值、不可用但未泄露等边界，真题训练定义的必要范围。<br>真题新增：两定义范围不同；Practice负责分类反例 | 028<br>无已确认的入选题原卷/MS缺页。 |
| [L034](../../web/course-v3/lesson-034/index.html) Authentication and layered system protection<br>身份验证、签名、权限与多层保护 | P2, P3, P4, P5, P6, P7<br>6/6/22；22–28分 | [E046](04-source-register.md) 2024 M/J /12 Q3(a)(i) [3]；QP p5 / MS p5<br>**1/1/3；6–9分** | P1一般身份定义口答；其余保留各自机制。真题明确排除authentication，训练排除条件，不能用已背密码答案硬套。<br>真题新增：名称与具体保护机制配对 | 028、033<br>无已确认的入选题原卷/MS缺页。 |
| [L035](../../web/course-v3/lesson-035/index.html) Internet threats, malware and access restriction<br>恶意软件、phishing/pharming与入侵机制 | P1, P2, P3, P4, P5<br>5/5/15；17–22分 | [E047](04-source-register.md) 2023 O/N /12 Q5(c) [4]；QP p8 / MS p6<br>**1/1/4；6–9分** | P6通用防范清单与L034重复可选；保留五类机制区别，教师错误分析明确标识，不称考官统计。<br>真题新增：按入侵/信息获取途径解释而非泛称病毒 | 033、034<br>无已确认的入选题原卷/MS缺页。 |
| [L036](../../web/course-v3/lesson-036/index.html) Encryption and access rights for data<br>密钥、可读性、授权与传播副本 | P2, P3, P4<br>3/3/8；11–15分 | [E048](04-source-register.md) 2024 M/J /12 Q3(a)(ii) [3]；QP p5 / MS p5<br>**1/1/3；5–7分** | P1加密定义口答；P2密钥同放、P3权限表、P4审计只读权限保留，P4答案需说明读权限不阻止所有外部复制。<br>真题新增：加密改变可读性和密钥解密因果链 | 033–035<br>无已确认的入选题原卷/MS缺页。 |
| [L037](../../web/course-v3/lesson-037/index.html) Validation, verification, parity and checksums<br>验证检查分类、错误检测及无法保证真实性 | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10<br>10/10/31；30–40分 | [E049](04-source-register.md) 2025 O/N /12 Q1 [2]；QP p2 / MS p4<br>[E050](04-source-register.md) 2024 M/J /13 Q7(f)(i) [4]；QP p13, 16 / MS p9<br>**2/2/6；10–14分** | 十项分别覆盖范围/限制、格式/长度、存在/非空、校验位、双录、parity/block/checksum及局限，暂不凑减；可分课内诊断和课后操作。真题不替代低频操作检查。<br>真题新增：验证方法使用场合；不是列出几个名称得几分；自行选择两种transfer verification并给机制 | 002、033、035<br>无已确认的入选题原卷/MS缺页。 |

## Section 7

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L038](../../web/course-v3/lesson-038/index.html) Professional ethics and professional bodies<br>专业能力边界、行为准则与专业组织 | P1, P3, P5<br>3/3/6；11–15分 | [E051](04-source-register.md) 2024 O/N /13 Q5(b) [3]；QP p9 / MS p6<br>[E052](04-source-register.md) 2025 O/N /12 Q2(b) [2]；QP p3 / MS p5<br>**2/2/5；7–10分** | P2伦理定义与P1重复、P4组织名称转参考；保留报告错误、能力范围和组织支持的应用。<br>真题新增：专业组织的作用与具体收益；区分职业准则目的与加入组织收益 | 033<br>无已确认的入选题原卷/MS缺页。 |
| [L039](../../web/course-v3/lesson-039/index.html) Ethical decisions and their consequences<br>利益相关者、技术责任与有依据判断 | P1, P2, P5<br>3/3/7；12–17分 | [E053](04-source-register.md) 2024 O/N /12 Q5(a) [4]；QP p7 / MS p6<br>**1/1/4；6–8分** | P3成本和P4隐私为可选巩固；P5改弱答案要把行动、对象和后果连接，不能只写be ethical。<br>真题新增：每组最多2分，技术责任落实到对象 | 033、038<br>无已确认的入选题原卷/MS缺页。 |
| [L040](../../web/course-v3/lesson-040/index.html) Copyright and software licences<br>版权、四种许可使用条件与源代码/价格区别 | P1, P2, P3, P5, P6, P7, P8<br>7/7/18；21–27分 | [E054](04-source-register.md) 2024 O/N /12 Q5(b)(i) [3] + Q5(b)(ii) [2]；QP p7 / MS p6<br>**1/2/5；9–12分** | P4试用21天与P8试用30天同机制，P4可选；保留其余权限、价格、源码、分发、选择条件。历史MS中组织名不能教成具体许可证名称。<br>真题新增：许可选择+理由；版权保护的独立作用 | 038、039<br>无已确认的入选题原卷/MS缺页。 |
| [L041](../../web/course-v3/lesson-041/index.html) Artificial intelligence applications and impacts<br>AI识别应用、误判、社会经济环境与评价 | P1, P3, P4, P5, P7, P8<br>6/6/17；20–27分 | [E055](04-source-register.md) 2025 M/J /12 Q3(a) [4] + Q3(b) [2]；QP p5 / MS p6<br>**1/2/6；8–11分** | P2语音流程可选（真题OCR另一应用）；P6环境成本罗列由P8证据评价深化，转可选。P7总体准确率不能替代分组表现。<br>真题新增：输入→识别→处理→输出；利益应用于题目 | 033、039、040<br>无已确认的入选题原卷/MS缺页。 |

## Section 8

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L042](../../web/course-v3/lesson-042/index.html) From file-based systems to relational databases<br>文件问题、键、参照完整性与索引 | P1, P3, P5, P6<br>4/4/14；15–20分 | [E056](04-source-register.md) 2024 O/N /12 Q6(a) [3]；QP p8 / MS p7<br>**1/1/3；5–7分** | P2术语清单口答，P4关系基数在L043主练；真题改用具体公司文件问题组织原因。<br>真题新增：用关系数据库解决具体文件式问题 | 数据组织课内<br>无已确认的入选题原卷/MS缺页。 |
| [L043](../../web/course-v3/lesson-043/index.html) Entity-relationship design and normalisation<br>关系设计、1NF/2NF/3NF、键与依赖 | P1, P2, P3, P5<br>4/4/16；23–30分 | [E057](04-source-register.md) 2024 M/J /11 Q6(a) [6]；QP p13 / MS p7<br>[E058](04-source-register.md) 2024 O/N /13 Q4(c)(ii) [4]；QP p5, 6, 7 / MS p5<br>**2/2/10；19–25分** | P4postcode→town和P5museum同属传递依赖，P4可选；P5另考空房间先存在的设计约束，保留。<br>真题新增：从情境设计三表，PK/FK与非键字段分组；在既有结构上规范化，补足从零设计以外的能力 | 042<br>无已确认的入选题原卷/MS缺页。 |
| [L044](../../web/course-v3/lesson-044/index.html) DBMS architecture, integrity, security and backup<br>DBMS元数据、schema、完整性、安全恢复和查询 | P1, P3, P4, P5, P6, P8<br>6/6/18；20–27分 | [E059](04-source-register.md) 2024 M/J /11 Q6(b) [4]；QP p13 / MS p7<br>[E060](04-source-register.md) 2025 O/N /12 Q4(d) [2]；QP p6, 7 / MS p6<br>**2/2/6；9–12分** | P2建模与L043重复，P7表单报表与开发接口真题重复，转可选；必要安全与恢复不因本课真题较短而删除。<br>真题新增：两术语各最多2分；将开发接口功能用于数据库工作 | 042、043；034、036<br>无已确认的入选题原卷/MS缺页。 |
| [L045](../../web/course-v3/lesson-045/index.html) DDL, DML and the role of SQL<br>DDL/DML/SQL/DBMS角色边界 | P1, P2, P3<br>3/3/8；7–10分 | 本课不独立重复配置；衔接安排见理由<br>**0/0/0；0分** | 保留现有三项分类与解释；不单独配置重复分类真题。下两课在真实CREATE/ALTER和SELECT/UPDATE中再判职责；这不是“未找到真题”。<br>真题新增：留到下一步真正运用该知识时考查，具体不是资料缺失例外。 | 042、044<br>无已确认的入选题原卷/MS缺页。 |
| [L046](../../web/course-v3/lesson-046/index.html) Understanding and writing SQL data definitions<br>七种DDL数据类型、主外键和ALTER | P2, P3, P4, P5, P6<br>5/5/17；20–27分 | [E061](04-source-register.md) 2024 M/J /12 Q4(b) [3] + Q4(c) [2]；QP p7, 8 / MS p7<br>**1/2/5；14–19分** | P1SELECT读取放L047可选；P3不只照抄类型表，保留原Event需求并要求检查字段与值的适配；P5、P6约束后果必须保留。<br>真题新增：CREATE后ALTER外键，结构操作两种方式 | 042–045<br>无已确认的入选题原卷/MS缺页。 |
| [L047](../../web/course-v3/lesson-047/index.html) Querying and maintaining data with SQL DML<br>筛选、连接、分组聚合与精确修改数据 | P2, P3, P4, P5, P6, P7, P8, P9<br>8/8/23；30–40分 | [E062](04-source-register.md) 2024 M/J /13 Q4(c) [4]；QP p8, 9 / MS p5<br>[E063](04-source-register.md) 2025 M/J /12 Q5(d)(ii) [3]；QP p8, 9, 10 / MS p9<br>**2/2/7；16–22分** | P1查询入门可选；P7–9作为一组写入流程连续完成但保留三个原任务计数/分值；用运行前后数据解释影响，不仅提交SQL。<br>真题新增：JOIN+GROUP BY+COUNT+别名，严格回应输出要求；UPDATE的目标、两个字段及WHERE，增加写入任务 | 042–046<br>无已确认的入选题原卷/MS缺页。 |

## Section 9

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L049](../../web/course-v3/lesson-049/index.html) Abstraction and purposeful models<br>抽象的必要细节与可省略细节 | P1, P2, P3<br>3/3/8；8–11分 | [E067](04-source-register.md) 2023 M/J /22 Q7(a)(i) [3] + Q7(a)(ii) [2]；QP p14 / MS p9<br>**1/2/5；5–7分** | 保留三项，删掉旧exam同情境复述；真题按商业用途解释选留信息。<br>真题新增：抽象保留/舍弃必须依据用途 | 编程新Section入口<br>无已确认的入选题原卷/MS缺页。 |
| [L050](../../web/course-v3/lesson-050/index.html) Decomposition into program modules<br>任务拆分、接口与重复职责 | P1, P2, P3<br>3/3/11；9–12分 | [E068](04-source-register.md) 2024 M/J /22 Q7(a) [3]；QP p16 / MS p10<br>**1/1/3；7–10分** | 保留；一个模块只改名不算分解，重复收费任务要求定位职责重叠。<br>真题新增：模块名与用途配对，避免仅把原文拆句 | 049<br>无已确认的入选题原卷/MS缺页。 |
| [L051](../../web/course-v3/lesson-051/index.html) Defined algorithm steps and identifier tables<br>精确定义步骤、identifier类型及用途 | P1, P2, P3<br>3/3/7；9–12分 | [E069](04-source-register.md) 2023 O/N /22 Q1(a) [4]；QP p2 / MS p4<br>**1/1/4；6–8分** | 保留三项；本课已介绍INTEGER/REAL/STRING及示例BOOLEAN用途，可作标识符表，完整类型边界留L058。<br>真题新增：有意义名称与类型按行配套评分 | 049、050；课内基础类型表<br>无已确认的入选题原卷/MS缺页。 |
| [L052](../../web/course-v3/lesson-052/index.html) Input, process and output in pseudocode<br>输入先于使用、处理与最终输出 | P1, P2, P3<br>3/3/9；8–11分 | 本课不独立重复配置；衔接安排见理由<br>**0/0/0；0分** | 保留现有三项IPO检查；不单独重复一份综合题；L055细化和L061输入/倒序输出题承担考试迁移。<br>真题新增：留到下一步真正运用该知识时考查，具体不是资料缺失例外。 | 051<br>无已确认的入选题原卷/MS缺页。 |
| [L053](../../web/course-v3/lesson-053/index.html) Sequence, selection and iteration<br>顺序、选择、重复与初始化位置 | P1, P2, P3<br>3/3/12；9–12分 | [E070](04-source-register.md) 2023 O/N /21 Q2(b) [2]；QP p3 / MS p5<br>**1/1/2；3–5分** | 保留；真题只需辨认构造，不提前评分L055细化内容，共用题干明确已见。<br>真题新增：sequence以外另两构造；为L055共享语境但不提前展示解答 | 051、052<br>无已确认的入选题原卷/MS缺页。 |
| [L054](../../web/course-v3/lesson-054/index.html) Structured English, flowcharts and pseudocode<br>结构化英语、flowchart、pseudocode转换 | P1, P2, P3, P4<br>4/4/15；16–22分 | [E071](04-source-register.md) 2023 O/N /22 Q2(a) [5]；QP p4 / MS p5<br>**1/1/5；11–15分** | 保留四方向任务；真题包含开始标志27和停止标志0，不是只套一个简单求和循环。<br>真题新增：真正完成控制流，包含未开始累计阶段 | 051–053<br>无已确认的入选题原卷/MS缺页。 |
| [L055](../../web/course-v3/lesson-055/index.html) Stepwise refinement to programmable detail<br>细化到可实现程度、边界与最终输出 | P1, P2, P3<br>3/3/10；10–14分 | [E072](04-source-register.md) 2023 O/N /21 Q2(a) [5]；QP p3 / MS p5<br>**1/1/5；8–11分** | 保留；与L053原题共享语境但本次执行不同任务，不能称未见真题。不可用同义词替换冒充细化。<br>真题新增：对已见问题进一步细化；新增答案形式不再当盲测 | 050、052–054<br>无已确认的入选题原卷/MS缺页。 |
| [L056](../../web/course-v3/lesson-056/index.html) Logic statements and boundary conditions<br>AND/OR/NOT范围条件和反例 | P1, P2, P3<br>3/3/6；11–15分 | [E073](04-source-register.md) 2025 M/J /21 Q2(a)(i) [1] + Q2(a)(ii) [1]；QP p4, 5 / MS p7<br>**1/2/2；5–8分** | 保留区间OR错误与登录规则反例；真实流程图要求走路径证明错误并修正。<br>真题新增：用路径证明为什么中间区间永远进不去并修正 | 053、054<br>无已确认的入选题原卷/MS缺页。 |
| [L057](../../web/course-v3/lesson-057/index.html) Integrated design: a ticket purchase<br>购票/积分完整需求、输入依赖与顺序 | P1, P2, P3<br>3/3/11；17–24分 | [E074](04-source-register.md) 2023 M/J /21 Q3(b) [5]；QP p6, 7 / MS p5<br>**1/1/5；10–14分** | 保留三项：数据接口、数值路径与欠款处理。真题积分三档和整美元规则增加另一种完整需求。<br>真题新增：综合输入、边界和计算顺序，答案为五步细化 | 049–056<br>无已确认的入选题原卷/MS缺页。 |

## Section 10

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L058](../../web/course-v3/lesson-058/index.html) Cambridge data types and declarations<br>六种类型、字面量、初值与值域 | P1, P2, P3, P4<br>4/4/8；11–15分 | [E075](04-source-register.md) 2024 O/N /23 Q1(b) [3]；QP p2 / MS p4<br>**1/1/3；4–6分** | 保留当前四项；身份证式前导0和带引号日期必须根据用途/语法判断，不根据外观猜类型。<br>真题新增：数据外观像日期不等于DATE类型 | 051、052<br>无已确认的入选题原卷/MS缺页。 |
| [L059](../../web/course-v3/lesson-059/index.html) Records: defining, reading and saving structured data<br>record类型/实例、字段读写与值独立性 | P1, P2, P3, P4<br>4/4/9；12–16分 | [E076](04-source-register.md) 2024 M/J /22 Q3(a)(i) [4]；QP p7 / MS p6<br>**1/1/4；7–10分** | 保留；真题五字段综合定义，Practice负责第二记录修改后是否影响第一记录的理解。<br>真题新增：定义record类型，避免误声明一个实例 | 058<br>无已确认的入选题原卷/MS缺页。 |
| [L060](../../web/course-v3/lesson-060/index.html) Array terminology, indices and bounds<br>索引、上下界、容量和合法访问 | P1, P2, P3<br>3/3/6；9–12分 | [E077](04-source-register.md) 2025 M/J /22 Q1(d)(i) [1] + Q1(d)(ii) [1] + Q1(d)(iii) [2]；QP p3 / MS p6, 7<br>**1/3/4；5–8分** | 保留非1起点和边界任务；真实Product题把维度、元素数、声明放一起，显示三者区别。<br>真题新增：维度、容量、声明三个互相关联要求 | 058<br>无已确认的入选题原卷/MS缺页。 |
| [L061](../../web/course-v3/lesson-061/index.html) Selecting and using one-dimensional arrays<br>1D遍历、初始化、严格条件和数据顺序 | P1, P3, P4, P5<br>4/4/11；15–21分 | [E078](04-source-register.md) 2025 M/J /22 Q4 [6]；QP p7 / MS p10<br>**1/1/6；11–15分** | P2例行累加trace可选；保留结构选择、实现、严格条件计数和P5全负数最大/最小值追踪。<br>真题新增：输入顺序与输出顺序分离；不依赖未教函数定义 | 053、054、058、060<br>无已确认的入选题原卷/MS缺页。 |
| [L062](../../web/course-v3/lesson-062/index.html) Selecting and using two-dimensional arrays<br>2D索引、嵌套遍历、行列条件及总量核对 | P1, P2, P3, P4<br>4/4/10；16–22分 | [E079](04-source-register.md) 2023 O/N /21 Q4(b) [3]；QP p7 / MS p6<br>**1/1/3；6–9分** | 保留四项。真实题需要偶数行：在作答前供给官方guide中MOD定义和无答案的操作说明；尚未讲MOD时把该题留到L074回访，不冒充当前无前置缺口。<br>真题新增：行筛选AND列匹配OR，避免二维只做求和 | 056、060、061；补2分钟MOD参照卡<br>L062需MOD参照；否则L074回访。 |
| [L063](../../web/course-v3/lesson-063/index.html) Linear search using arrays<br>线性查找、首个匹配、未找到和停止 | P1, P2, P3<br>3/3/10；13–18分 | 本课不独立重复配置；衔接安排见理由<br>**0/0/0；0分** | 保留完整算法、重复值和未找到检查。候选s25/22 Q7(a)需函数/二维客户记录，适合后续；本课不硬塞综合题。L082首个空记录真题回访线性搜索。<br>真题新增：留到下一步真正运用该知识时考查，具体不是资料缺失例外。 | 061、062<br>无已确认的入选题原卷/MS缺页。 |
| [L064](../../web/course-v3/lesson-064/index.html) Bubble sort using arrays<br>冒泡相邻交换、边界收缩与无交换停止 | P1, P2, P3<br>3/3/10；16–22分 | 本课不独立重复配置；衔接安排见理由<br>**0/0/0；0分** | 保留三项；s25/21 Q6(b)已核验但含procedure与二维成对交换，安排L093，当前不把8分原题改编成一维短题。<br>真题新增：留到下一步真正运用该知识时考查，具体不是资料缺失例外。 | 061、062<br>无已确认的入选题原卷/MS缺页。 |
| [L065](../../web/course-v3/lesson-065/index.html) Why files are needed and text-file pseudocode<br>文本文件、模式、EOF与记录分组 | P1, P2, P3, P4, P5<br>5/5/15；16–21分 | [E080](04-source-register.md) 2025 O/N /22 Q3(a) [6] + Q3(b) [1]；QP p4, 5 / MS p8<br>**1/2/7；13–18分** | 五项保留：文件必要性、空行读取、WRITE、APPEND和P5完整存取回读各有不同作用。<br>真题新增：文件模式、循环读取、记录边界，随后解释separator | 052、053、058<br>无已确认的入选题原卷/MS缺页。 |
| [L066](../../web/course-v3/lesson-066/index.html) Abstract data types<br>ADT接口行为与底层表示区别 | P1, P2, P3<br>3/3/6；9–12分 | 本课不独立重复配置；衔接安排见理由<br>**0/0/0；0分** | 保留三项理解检查；L067–071各有真实操作题，本课不重复先背一次定义；不宣称检索不到ADT真题。<br>真题新增：留到下一步真正运用该知识时考查，具体不是资料缺失例外。 | 060、061、065<br>无已确认的入选题原卷/MS缺页。 |
| [L067](../../web/course-v3/lesson-067/index.html) Stacks and LIFO operations<br>LIFO、top约定、入栈出栈与边界 | P1, P2, P3<br>3/3/7；13–18分 | [E081](04-source-register.md) 2023 O/N /21 Q3(a) [3] + Q3(b) [5]；QP p4, 5 / MS p5<br>**1/2/8；10–14分** | 保留三项，明确top指最后占用格；真题只补文字步骤与表示，符合AS不要求ADT实现伪代码的深度。<br>真题新增：图→数组与操作步骤；原题只补文字，不要求ADT伪代码实现 | 060、066<br>无已确认的入选题原卷/MS缺页。 |
| [L068](../../web/course-v3/lesson-068/index.html) Queues and FIFO operations<br>FIFO、循环复用与有效元素数量 | P2, P3, P4<br>3/3/9；13–18分 | [E082](04-source-register.md) 2023 M/J /22 Q3(a)(i) [4] + Q3(a)(ii) [1]；QP p4, 5 / MS p4<br>**1/2/5；8–11分** | P1简单FIFO弹出顺序入口口答；P2回绕、P3修改但不换位置、P4空队列再次入队保留。<br>真题新增：末端回绕和有效数量，分清残留槽位 | 060、066、067<br>无已确认的入选题原卷/MS缺页。 |
| [L069](../../web/course-v3/lesson-069/index.html) Linked-list features and operations<br>链关系、头尾与插入时保存后继 | P1, P2, P3, P4<br>4/4/11；15–20分 | [E083](04-source-register.md) 2023 O/N /22 Q3(b) [4]；QP p6, 7 / MS p6<br>**1/1/4；7–10分** | 四项保留：循链、插入、头删除和单节点变空，最后一项不能被一般三节点追踪替代。<br>真题新增：先保留后继与free指针，才能安全改变链 | 060、066<br>无已确认的入选题原卷/MS缺页。 |
| [L070](../../web/course-v3/lesson-070/index.html) Implementing ADT operations with arrays<br>数组下标、逻辑链与free链互斥 | P2, P3, P4<br>3/3/9；14–19分 | [E084](04-source-register.md) 2023 O/N /22 Q3(a) [5]；QP p6 / MS p6<br>**1/1/5；8–11分** | P1数组栈回顾可选；P2环形有效位置、P3active/free互斥、P4满后删除再分配保留。<br>真题新增：将L069链关系映射到数组；共享题干，明确非新盲测 | 060、067–069<br>无已确认的入选题原卷/MS缺页。 |
| [L071](../../web/course-v3/lesson-071/index.html) Choosing and combining data structures<br>队列/栈/记录协同、失败不进undo | P1, P4, P5<br>3/3/9；18–25分 | [E085](04-source-register.md) 2025 M/J /21 Q5 [7]；QP p10, 11 / MS p10<br>**1/1/7；13–18分** | P2队列/undo的一般选择和P3playlist链表复述转可选；P1类型选择、P4订座失败/撤销、P5record数组输入保留。<br>真题新增：组合两种操作顺序逆置栈；10评分点上限7 | 062、065–070<br>无已确认的入选题原卷/MS缺页。 |

## Section 11

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L072](../../web/course-v3/lesson-072/index.html) Translating descriptions into Cambridge pseudocode<br>从给定设计保留输入、分支和最终输出 | P2, P3, P4<br>3/3/10；14–20分 | [E086](04-source-register.md) 2024 O/N /23 Q2(a) [5]；QP p3 / MS p5<br>**1/1/5；10–14分** | P1面积计算入门可选；保留翻译、初始化位置、sentinel；真题100整数只累计positive，不额外加输入验证。<br>真题新增：把自然语言变为完整伪代码并保持一次最终输出 | 051–057、058<br>无已确认的入选题原卷/MS缺页。 |
| [L073](../../web/course-v3/lesson-073/index.html) Declarations, assignment and input/output<br>声明/常量/赋值与值拷贝 | P1, P2, P3<br>3/3/7；8–12分 | [E087](04-source-register.md) 2023 M/J /22 Q1(a)(i) [1] + Q1(a)(ii) [3]；QP p2 / MS p3<br>**1/2/4；5–7分** | 三项保留；原题常数3.75尚写成literal，要求提出更佳表示及理由，不把原程序说成已用常量。<br>真题新增：把重复literal提出为常量并解释维护价值；Practice另查赋值值拷贝 | 058、072<br>无已确认的入选题原卷/MS缺页。 |
| [L074](../../web/course-v3/lesson-074/index.html) Arithmetic and logical expressions<br>算术/逻辑、DIV/MOD和条件等价 | P1, P3, P4<br>3/3/7；12–16分 | [E088](04-source-register.md) 2023 M/J /21 Q1(c)(i) [2] + Q1(c)(ii) [1]；QP p3 / MS p3<br>**1/2/3；7–10分** | P2简单年龄AND可选；P1、P3、P4保留；此处回访L062的even判断，仍用同一原题不重复累计分。<br>真题新增：运算结果与恒真子式化简，不仅算术代入 | 056、058、072、073<br>无已确认的入选题原卷/MS缺页。 |
| [L075](../../web/course-v3/lesson-075/index.html) Built-in routines and string functions<br>按契约使用函数、嵌套与返回类型 | P1, P2, P3, P4, P5<br>5/5/13；18–24分 | [E089](04-source-register.md) 2024 M/J /21 Q1(b) [4]；QP p2 / MS p4<br>**1/1/4；8–11分** | 五项保留，函数列表随题给出；历史TO_UPPER允许STRING时遵从该卷insert，不替换成仅CHAR的其他函数。<br>真题新增：读取函数契约、嵌套、MOD和字符串长度 | 058、074<br>无已确认的入选题原卷/MS缺页。 |
| [L076](../../web/course-v3/lesson-076/index.html) IF, ELSE and CASE selection<br>IF/CASE顺序、嵌套与范围覆盖 | P2, P3<br>2/2/4；10–14分 | [E090](04-source-register.md) 2023 O/N /21 Q1(b) [3] + Q1(c) [1]；QP p2 / MS p4<br>**1/2/4；7–10分** | P1简单threshold可选；P2、P3保留。真实CASE要解释遮蔽和OTHERWISE，不仅列最终输出。<br>真题新增：分支遮蔽、顺序和全部范围覆盖 | 053、056、074<br>无已确认的入选题原卷/MS缺页。 |
| [L077](../../web/course-v3/lesson-077/index.html) Count-controlled iteration<br>FOR边界、STEP、零次和嵌套 | P1, P2, P3, P4<br>4/4/9；14–19分 | [E091](04-source-register.md) 2025 O/N /22 Q4(a) [4] + Q4(b) [5]；QP p6, 7 / MS p9<br>**1/2/9；14–19分** | 四项有独立条件，全部保留；真实CheckTotal必须保留初始化小问，不能在题干提前给出正确数组状态。<br>真题新增：先声明初始化再嵌套STEP枚举，不能只摘(b)丢数组前置结果 | 060、061、074、076<br>无已确认的入选题原卷/MS缺页。 |
| [L078](../../web/course-v3/lesson-078/index.html) Post-condition and pre-condition loops<br>WHILE/REPEAT、sentinel与双停止条件 | P1, P2, P4<br>3/3/7；13–18分 | [E092](04-source-register.md) 2025 O/N /22 Q2 [5]；QP p3 / MS p6, 7<br>**1/1/5；10–14分** | P3通用比较入口口答；P1验证、P2哨兵、P4guard追踪保留；真题容量上限和不保存99.9需同时满足。<br>真题新增：两个终止条件与零有效输入，flowchart也检验循环语义 | 053、076、077<br>无已确认的入选题原卷/MS缺页。 |
| [L079](../../web/course-v3/lesson-079/index.html) Selecting and justifying a loop structure<br>按已知次数/至少一次/停止规则选循环 | P2, P3, P4<br>3/3/7；12–17分 | [E093](04-source-register.md) 2023 O/N /22 Q2(b) [2]；QP p4, 5 / MS p5<br>**1/1/2；4–6分** | P1固定次数简单题可选；P2至少一次、P3最大尝试条件、P4等价转换保留；已见L054题此次只justify。<br>真题新增：justify条件循环；不重复要求重画L054流程图 | 077、078<br>无已确认的入选题原卷/MS缺页。 |
| [L080](../../web/course-v3/lesson-080/index.html) Procedures and parameter passing<br>procedure、实参形参、BYVAL/BYREF效果 | P2, P3, P4, P5<br>4/4/10；19–25分 | [E094](04-source-register.md) 2023 M/J /22 Q5(a) [3] + Q5(b) [1]；QP p8 / MS p5<br>**1/2/4；8–12分** | P1Banner基础可选；P4和P5作为真实交换/副本交换的对照保留。真题需按调用顺序读到下一条OUTPUT。<br>真题新增：跟踪调用者变量被改，解释编译器为何不识别逻辑错误 | 058、073、075–079；030<br>无已确认的入选题原卷/MS缺页。 |
| [L081](../../web/course-v3/lesson-081/index.html) Functions, interfaces and return values<br>function接口、返回值、提前RETURN和调用位置 | P2, P3, P4, P5<br>4/4/11；17–23分 | [E095](04-source-register.md) 2023 M/J /22 Q4 [6]；QP p6 / MS p5<br>**1/1/6；12–17分** | P1Double直接代入可选；保留其余四项；真实GetNum遍历字符串，返回在循环后，大小写敏感。<br>真题新增：遍历字符串、大小写敏感、返回计数 | 075、077、080<br>无已确认的入选题原卷/MS缺页。 |
| [L082](../../web/course-v3/lesson-082/index.html) Clear and efficient Cambridge pseudocode<br>避免重复工作、一次遍历和保持语义 | P2, P4, P5<br>3/3/10；16–22分 | [E096](04-source-register.md) 2025 O/N /22 Q8(b) [7]；QP p14, 16, 17 / MS p14<br>**1/1/7；14–19分** | P1解释重复与P2改写合并由P2作答；P3不变表达式罗列由P4边界深化；真题首个空记录尽早停止并处理全满。<br>真题新增：尽早停在首个空位，数组满返回FALSE，回应efficient | 059、061、063、077–081<br>无已确认的入选题原卷/MS缺页。 |
| [L083](../../web/course-v3/lesson-083/index.html) Building a complete structured program<br>整合程序、随机只生成一次和正确终止 | P2, P3<br>2/2/6；15–22分 | [E097](04-source-register.md) 2025 M/J /21 Q3 [8]；QP p7 / MS p8<br>**1/1/8；16–22分** | P1流程提纲作口头准备；P2追踪需使用原有完整程序，P3结构职责要求解释变化影响。真实guessing game独立实现，不用现有教学例原样照抄。<br>真题新增：独立完整程序，内循环持续输入且随机值只生成一次 | 072–082<br>无已确认的入选题原卷/MS缺页。 |

## Section 12

| Lesson / 目标 | Practice主配置：题/单元/分；时间 | 真题：准确选择；题/子问/分；时间 | 保留/调整、重复与新增价值 | 前置与未解决事项 |
|---|---|---|---|---|
| [L084](../../web/course-v3/lesson-084/index.html) Program development life cycles<br>阶段职责与waterfall/iterative/RAD选择 | P1, P2, P3, P5<br>4/4/11；13–18分 | [E098](04-source-register.md) 2023 M/J /21 Q5(a)(i) [2] + Q5(a)(ii) [1]；QP p9 / MS p6<br>**1/2/3；7–10分** | P4RAD定义已嵌入P5条件判断，转可选；真题需求变化与上市时间需分别回应。<br>真题新增：比较waterfall局限与适用模型，而非复述阶段 | 050、072、083<br>无已确认的入选题原卷/MS缺页。 |
| [L085](../../web/course-v3/lesson-085/index.html) Structure charts and module interfaces<br>结构图层级、数据方向、条件/重复调用 | P3, P4, P5, P6<br>4/4/15；22–30分 | [E099](04-source-register.md) 2023 O/N /22 Q7(a) [4] + Q7(b) [2]；QP p14 / MS p10<br>**1/2/6；15–21分** | P1符号口答、P2简单三模块可选；保留方向解释、图→程序、复杂图和执行追踪四种任务。<br>真题新增：层级、数据方向与条件调用；不能只画方框 | 050、080、081、084<br>无已确认的入选题原卷/MS缺页。 |
| [L086](../../web/course-v3/lesson-086/index.html) State-transition diagrams<br>状态、事件、guard、自环及图种区别 | P2, P3, P4<br>3/3/7；11–16分 | [E100](04-source-register.md) 2023 M/J /22 Q7(b) [4]；QP p15 / MS p10<br>**1/1/4；10–14分** | P1定义口答；其余保留；原题四状态与事件表必须同时可见，不能只贴未标箭头的残图。<br>真题新增：按当前状态与事件补图，保留自环 | 054、084<br>无已确认的入选题原卷/MS缺页。 |
| [L087](../../web/course-v3/lesson-087/index.html) Finding and correcting program errors<br>语法/逻辑/运行错误、不可达分支与边界 | P1, P3, P4, P5<br>4/4/12；14–20分 | [E101](04-source-register.md) 2024 M/J /22 Q5(a)(i) [3] + Q5(a)(ii) [2] + Q5(b) [1]；QP p10, 11 / MS p8<br>**1/3/6；13–18分** | P2一般预防建议可选；保留定位、分类、反例与修复后保证范围；真实200元素算法保留全码与line numbers。<br>真题新增：错误分类、不可达分支、运行时访问分别论证 | 060、076–081<br>无已确认的入选题原卷/MS缺页。 |
| [L088](../../web/course-v3/lesson-088/index.html) Testing methods through development<br>dry run/walkthrough/box方法与stub、用户验收 | P1, P2, P3, P5, P6<br>5/5/15；18–25分 | [E102](04-source-register.md) 2025 M/J /22 Q2(b)(ii) [2] + Q2(b)(iii) [2]；QP p4, 5 / MS p8<br>[E103](04-source-register.md) 2025 O/N /22 Q5(b) [1]；QP p8 / MS p10<br>**2/3/5；9–13分** | P4stub定义由P6替换真实模块深化，P7与P5测试目的重复可选；真题acceptance补足最终用户合同要求。<br>真题新增：stub隔离未完成模块与black-box从规格找错；acceptance目的，补足与内部测试区别 | 084、085、087<br>无已确认的入选题原卷/MS缺页。 |
| [L089](../../web/course-v3/lesson-089/index.html) Test strategies and test plans<br>策略/计划、expected/actual与成组记录 | P1, P2, P4<br>3/3/11；14–20分 | [E104](04-source-register.md) 2025 M/J /21 Q6(a) [4]；QP p12 / MS p10<br>**1/1/4；8–11分** | P3策略清单转口答；P4完整计划保留。真题传感器不能产生负数，禁止为了凑invalid而违背原假设。<br>真题新增：测试计划必须尊重输入域，三列成组评分 | 087、088<br>无已确认的入选题原卷/MS缺页。 |
| [L090](../../web/course-v3/lesson-090/index.html) Normal, abnormal and boundary test data<br>normal/extreme/invalid和能区分错误的测试 | P1, P2, P3, P5<br>4/4/9；14–19分 | [E105](04-source-register.md) 2023 O/N /22 Q4(b) [3]；QP p8, 9 / MS p7<br>**1/1/3；8–11分** | P4内点不足由P5故障区分深化；保留其他。入选原题MS有一个缺99的备选与valid限制冲突，单独记录，示范只选符合题干的有效路径。<br>真题新增：选only odd/only even/立即终止等不同有效路径，不能写无效值 | 056、078、089<br>L090官方MS备选与valid条件有疑点，见E105。 |
| [L091](../../web/course-v3/lesson-091/index.html) Corrective, adaptive and perfective maintenance<br>按变更原因区分corrective/adaptive/perfective | P1, P2, P3, P4<br>4/4/10；12–17分 | [E106](04-source-register.md) 2025 M/J /22 Q1(b)(i) [3]；QP p2 / MS p6<br>**1/1/3；5–7分** | 四项保留，不能只看改哪个文件判断维护种类；只选s25/22有效1(b)(i)，不采用统一给分小问。<br>真题新增：仅选有效3分小问；(a)(ii)/(b)(ii)统一给分不入选 | 084、087、089<br>无已确认的入选题原卷/MS缺页。 |
| [L092](../../web/course-v3/lesson-092/index.html) Analysing and amending an existing program<br>分析已有规格、改变接口/格式及回归验证 | P2, P3, P5, P6<br>4/4/16；21–29分 | [E107](04-source-register.md) 2025 O/N /22 Q3(c) [3]；QP p4, 5 / MS p8<br>**1/1/3；9–13分** | P1原功能口答，P4初始化缺陷为可选；P2、P3整程序修改与测试、P5接口改动、P6实参顺序保留。真题加密新字段使旧separator失效，增加格式修订方法。<br>真题新增：定位旧分隔方案失效原因并设计可解析新格式 | 065、075、080–091<br>无已确认的入选题原卷/MS缺页。 |

## 两节综合复习单独配置

### L048 — Paper 1 integrated review and error clinic

P2“比较两个相关概念”未指定对象且答案是考纲条目，删除该配置；保留13项作为诊断菜单，实际课前按错因选一半。其他具体题转分主题可选；不是一节全部做完。真题38分独立完成后按失分类型讲评。

- Practice诊断菜单：13任务/13单元/53教师分；全菜单约55–70分钟。不是强制同一课全做。
- 真题：3大题/10子问/38官方分；独立完成约55–65分钟，讲评另计。
- E064 2025 M/J /12 Q6(a) [2] + Q6(b) [4] + Q6(c) [6] + Q6(d) [4] + Q6(e) [3]；QP p11, 12，MS p10, 11；WAN drivers、地址填空、LAN绘图全部材料；网络情境整合；不安排成P1新75分模拟卷。
- E065 2025 O/N /13 Q5(a) [3] + Q5(b) [4] + Q5(c) [5] + Q5(d) [4]；QP p6, 7, 8，MS p8, 9；REVIEWS四表、STAFF样例、ER空图、rating要求全部材料；数据库结构、查询与安全组合。
- E066 2023 O/N /12 Q6(a) [3]；QP p9，MS p6；livestream完整情境；把S1压缩选择用于S2传输情境；接受有依据的两种选择。
- 组织方式：先独立作答和自标不确定处，再展开评分；将失分分为读题遗漏、概念选择、过程错误、答案证据不足，回到相应Lesson的Practice。Assessment Bank的75分原创卷继续承担整卷训练，不拿此处子题拼成另一套固定75分。
### L093 — Paper 2 integrated review and pseudocode clinic

11项为诊断菜单；P1直接函数区别、P3/4与P2/5同parcel背景、P10/12熟悉parking作可选。真题22分中4分已在L089使用，清楚标已见复测，其余18分新任务；不称完整75分模拟。

- Practice诊断菜单：11任务/11单元/40教师分；全菜单约45–60分钟。不是强制同一课全做。
- 真题：2大题/4子问/22官方分；独立完成约40–50分钟，讲评另计。
- E108 2025 M/J /21 Q6(a) [4] + Q6(b) [8]；QP p12, 13，MS p10, 11；完整sensor/Reading二维表及Sort接口；沿同一需求从test plan到同步交换两列，12分；6(a)为已见复用。
- E109 2024 M/J /22 Q8(a) [2] + Q8(c) [8]；QP p18, 20, 21，MS p10, 12；保留8(b)中DeleteSpaces接口说明及样例（p18）；不要求完成其实现；模块化、文件APPEND、调用两函数、过滤及计数综合10分。
- 组织方式：先独立作答和自标不确定处，再展开评分；将失分分为读题遗漏、概念选择、过程错误、答案证据不足，回到相应Lesson的Practice。Assessment Bank的75分原创卷继续承担整卷训练，不拿此处子题拼成另一套固定75分。

## 逐课原Practice索引与具体去向

该清单保留原prompt和题ID用于定位；引用“supplied”的图/代码仍以现有课程源中的完整材料为准。本清单不是可独立发给学生的练习卷。既有答案已经按相关机制审查；本轮没有对全部498项逐一执行代码或穷举评分，实施时仍须验对应上下文和教师答案。

### L001 Binary data units and magnitude prefixes

知识/能力：单位含义、容量约束与比较；项目知识映射：S1.01。
P1保留GiB/GB解释，P4检查完整文件能否装入；P2、P3转可选基础换算。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L001-01` | State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes. | 4 | 必做保留/按本课说明调整 |
| P2 `V3-Q-L001-02` | Calculate the size of a 3,000,000-byte file in MB. Show your working. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `V3-Q-L001-03` | State the byte multiplier for each pair of prefixes: kibi and kilo; mebi and mega; gibi and giga; tebi and tera. | 4 | 可选巩固或入口口答，不计主配置 |
| P4 `S1-L01-CAPACITY` | Calculate how many complete 600-byte files fit into 2 KiB of available storage and how many bytes remain. Each stated file size includes all overhead. | 3 | 必做保留/按本课说明调整 |
### L002 Binary, denary, hexadecimal, BCD and signed representations

知识/能力：位权、BCD有效性、表示范围、保值转换；项目知识映射：S1.02, S1.03, S1.06。
保留七种不同判断；P5、P6例行负数编解码已由P9、P10深化，P7与P1同法，转可选。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L002-01` | Convert the denary integer 159 to hexadecimal and then to 8-bit binary. Show your working. | 4 | 必做保留/按本课说明调整 |
| P2 `S1-L02-Q2` | Explain how the base and place values determine the value of 101 in binary, denary and hexadecimal. Give each value in denary. | 6 | 必做保留/按本课说明调整 |
| P3 `S1-L02-Q3` | A clock displays 59. Give its 8-bit BCD representation and explain why BCD is useful for this display. | 3 | 必做保留/按本课说明调整 |
| P4 `V3-Q-L002-03` | Explain why hexadecimal is suitable for displaying a binary memory address to a programmer. | 2 | 必做保留/按本课说明调整 |
| P5 `S1-L02-Q5` | Explain how one's complement represents −18 in 8 bits and state one drawback of this representation. | 3 | 可选巩固或入口口答，不计主配置 |
| P6 `S1-L02-Q6` | Explain how to interpret 11101110 as an 8-bit two's-complement integer. Give its denary value and one advantage of two's complement. | 3 | 可选巩固或入口口答，不计主配置 |
| P7 `S1-L02-Q7` | Convert hexadecimal 7B to an 8-bit binary value and to denary. Show the place-value calculation. | 3 | 可选巩固或入口口答，不计主配置 |
| P8 `S1-L02-BCD-REVERSE` | Convert BCD 0000 0110 0000 to its three displayed digits. Explain why replacing the last group with 1100 would make it invalid BCD. | 2 | 必做保留/按本课说明调整 |
| P9 `S1-L02-SIGNED-BOUNDARY` | State the range of four-bit one’s complement and four-bit two’s complement. Interpret 1000 under each rule, and explain whether −8 has a four-bit one’s-complement representation. | 4 | 必做保留/按本课说明调整 |
| P10 `S1-L02-PRESERVE-VALUE` | Convert the eight-bit one’s-complement value 11110010 to eight-bit two’s complement while preserving its denary value. Show the decoded value and the new encoding, then verify the destination value. | 3 | 必做保留/按本课说明调整 |
### L003 Binary addition, subtraction and overflow

知识/能力：固定字长算术、借位、带符号溢出；项目知识映射：S1.04, S1.05。
P5与P6同属穿零借位，仅P6必做；P1与P2成对区分unsigned与signed，P7增加减负数。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L003-01` | Calculate 01111111 + 00000001 as unsigned 8-bit integers and explain whether overflow occurs. | 3 | 必做保留/按本课说明调整 |
| P2 `V3-Q-L003-02` | Calculate 01001100 + 00111101 as 8-bit two's-complement integers. Explain whether the stored result represents the true sum. | 4 | 必做保留/按本课说明调整 |
| P3 `V3-Q-L003-03` | For unsigned operands 11001010 and 01110101, give their denary values, the full binary total and the stored byte. Explain any overflow. | 4 | 必做保留/按本课说明调整 |
| P4 `S1-L03-Q4` | Calculate −12 − 9 using 8-bit two's-complement addition. Show both encoded operands and interpret the retained result. | 4 | 必做保留/按本课说明调整 |
| P5 `S1-L03-Q5` | Calculate the unsigned subtraction 01000000 − 00000111 using borrowing. Explain how you borrow through the zeros and give the 8-bit result. | 3 | 可选巩固或入口口答，不计主配置 |
| P6 `S1-L03-BORROW` | Calculate 00100000 − 00000101 as unsigned eight-bit values. Show how the borrow passes through the zero columns and verify the denary result. | 3 | 必做保留/按本课说明调整 |
| P7 `S1-L03-SUBTRACT-NEGATIVE` | Calculate −9 − (−4) using eight-bit two’s-complement addition. Show the rewritten operation, encoded operands and result. Explain whether signed overflow occurs. | 4 | 必做保留/按本课说明调整 |
### L004 Character encoding: ASCII, extended ASCII and Unicode

知识/能力：字符编码、字符集覆盖与解释边界；项目知识映射：S1.07。
P1编码机制、P2给码转换、P3标准ASCII容量、P4扩展ASCII区别均保留；P5给定UTF-8表作可选拓展，不背码值。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L004-01` | Explain how the character A is represented internally and why Unicode is suitable for a multilingual website. | 4 | 必做保留/按本课说明调整 |
| P2 `V3-Q-L004-02` | A character table gives A the code 65. Give its 8-bit binary pattern and explain why the same character mapping must be used when the file is read. | 2 | 必做保留/按本课说明调整 |
| P3 `S1-L04-Q3` | Explain why standard ASCII provides 128 possible codes and state one limitation. | 2 | 必做保留/按本课说明调整 |
| P4 `S1-L04-Q4` | Compare standard ASCII with extended ASCII in bit width and number of available codes. | 2 | 必做保留/按本课说明调整 |
| P5 `S1-L04-CODEPOINT-BYTES` | A supplied UTF-8 table maps A (U+0041) to byte 41 and é (U+00E9) to bytes C3 A9, all byte values in hexadecimal. Give the bytes for éA and decode 41 C3 A9. Explain why two characters do not necessarily occupy two bytes. | 3 | 可选巩固或入口口答，不计主配置 |
### L005 Bitmap and vector graphics

知识/能力：表示方式选择、重建、深度/分辨率、header开销；项目知识映射：S1.08, S1.09。
P2例行像素大小计算由真题承担，P3对象属性已嵌入P8，转可选；保留P7不能整文件机械倍增的反例。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L005-01` | A website needs a logo that will also appear on a large banner and a detailed photograph. Justify vector graphics for the logo and a bitmap for the photograph. | 4 | 必做保留/按本课说明调整 |
| P2 `V3-Q-L005-02` | A 200 by 100 bitmap uses 24-bit colour. Calculate its pixel-data size in bytes, ignoring the file header. Show your working. | 3 | 可选巩固或入口口答，不计主配置 |
| P3 `V3-Q-L005-03` | Identify one property defining a rectangle's position and one other property stored for it in a vector drawing list. | 2 | 可选巩固或入口口答，不计主配置 |
| P4 `S1-L05-Q4` | Describe how a bitmap's file header and ordered pixel values allow software to reconstruct the image. | 3 | 必做保留/按本课说明调整 |
| P5 `S1-L05-Q5` | Calculate the number of available colours at a depth of 4 bits per pixel. Explain the effects of increasing the depth to 8 bits while keeping image resolution unchanged. | 4 | 必做保留/按本课说明调整 |
| P6 `S1-L05-Q6` | Compare image resolution with screen resolution. Explain the effects of capturing the same scene with twice as many pixels in each dimension, at unchanged colour depth. | 4 | 必做保留/按本课说明调整 |
| P7 `S1-L05-HEADER` | Calculate the complete size of a 40 × 20 bitmap at 4 bits per pixel with a 24-byte header and no other overhead. Repeat at 8 bits per pixel. Explain why the whole file does not exactly double. | 3 | 必做保留/按本课说明调整 |
| P8 `S1-L05-VECTOR-REBUILD` | A drawing list first draws a red rectangle with top-left (3,4), width 12 and height 8, then a black line from (3,12) to (15,12), thickness 1. The origin is top-left; x increases right and y down. Describe the resulting drawing. State every changed geometric property after scaling coordinates, dimensions and thickness by 2, and state whether colour or drawing order changes. | 4 | 必做保留/按本课说明调整 |
### L006 Sound representation and file compression

知识/能力：采样量化、质量权衡、可逆解码与压缩开销；项目知识映射：S1.10, S1.11。
P1口头诊断，P7一般收益口头回顾；八项保留分别覆盖声音、文字、位图、向量及两个编码边界，可分课堂与课后完成。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L006-01` | Describe how sampling, quantisation and binary encoding turn an analogue sound wave into stored digital data. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S1-L06-Q2` | Two changes are considered when recording a sound: doubling the sampling rate or doubling the bits per sample. Explain how each change affects accuracy and uncompressed data size, with duration and channel count unchanged. | 4 | 必做保留/按本课说明调整 |
| P3 `V3-Q-L006-03` | Compare lossless sound compression with a lossy method that removes less-audible sound information. Explain what happens when each file is decoded. | 4 | 必做保留/按本课说明调整 |
| P4 `S1-L06-Q4` | A text format stores repeated words once in a dictionary and uses short references to them. Explain how this compresses a document and why it is suitable for an examination answer that must be preserved exactly. | 3 | 必做保留/按本课说明调整 |
| P5 `S1-L06-Q5` | A publisher stores a diagram with large areas of identical pixel colour and a small photographic preview. Explain a suitable compression method for each, including its effect on reconstruction. | 4 | 必做保留/按本课说明调整 |
| P6 `S1-L06-Q6` | A vector map contains 100 identical tree symbols at different positions. Explain how storing one shared object definition and a reference at each position can compress the map without changing its appearance. | 3 | 必做保留/按本课说明调整 |
| P7 `S1-L06-Q7` | Explain two benefits of compressing a file before storing it and sending it over a connection with a fixed bit rate. | 2 | 可选巩固或入口口答，不计主配置 |
| P8 `S1-L06-Q8` | An RLE format stores each run as an 8-bit count followed by an 8-bit character code. Give the decoded text for 3A 1B 4C, calculate its original and encoded sizes, and decide whether RLE saves space. | 4 | 必做保留/按本课说明调整 |
| P9 `S1-L06-NUMERICAL-SAMPLING` | A 4 Hz recorder measures amplitudes 0.2, 2.8, 1.2, −0.7 at t = 0, 0.25, 0.50, 0.75 seconds. The encoding rounds to the nearest level from −4 through +3 and uses the three-bit code value level + 4. State the quantised levels, encode them, decode the codes and calculate the sample-data bits. Explain one loss of information. | 5 | 必做保留/按本课说明调整 |
| P10 `S1-L06-DICTIONARY` | A dictionary defines REF(2) as GO. Decode REF(2), SPACE, LITERAL(2), SPACE, REF(2). Explain why token types and separators are needed, and why this example alone does not prove a storage saving. | 3 | 必做保留/按本课说明调整 |
### L007 Network purpose, models and client types

知识/能力：模型角色、离线能力与情境选择；项目知识映射：S2.01, S2.02, S2.03。
P1网络收益入口口答；P2三城市LAN/WAN、P3thin选择、P4厚客户端CAD保留，真题另做server角色分工。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L01-Q1` | State two networking benefits and explain the consequence of each. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `S2-L01-Q2` | A company has one LAN in each of three cities. Explain why the complete network is a WAN. Compare client-server with peer-to-peer for centrally controlled payroll files, then suggest a model and give one drawback of your choice. | 6 | 必做保留/按本课说明调整 |
| P3 `S2-L01-Q3` | Suggest thin or thick clients for a school examination room that requires identical software and central storage. Justify the choice, compare the processing location with the alternative and give one drawback. | 5 | 必做保留/按本课说明调整 |
| P4 `S2-L01-Q4` | Explain why a CAD workstation can be a thick client in a client-server network. Its engineers must edit while the site connection is unavailable. State two local requirements for that offline work. | 4 | 必做保留/按本课说明调整 |
### L008 Topologies, packet paths and design choices

知识/能力：拓扑数据路径、故障与冗余；项目知识映射：S2.04, S2.05。
保留路径和故障任务；真题星形描述不替代bus、mesh与hybrid理解，要求说明链路仍存时可用路径。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L02-Q1` | Identify the topology represented by each description: one backbone; separate links to one switch; every router pair linked; star LANs interconnected by a mesh. | 4 | 必做保留/按本课说明调整 |
| P2 `S2-L02-Q2` | In the star + mesh diagram, describe the path of a frame from A to D using the S1–S2 link. That link then fails. Describe an alternative path and explain whether A becomes isolated. Assume the switches can activate the alternative forwarding path. | 5 | 必做保留/按本课说明调整 |
| P3 `S2-L02-Q3` | Suggest a topology for a classroom where cable faults should normally affect only one workstation and new workstations must be easy to add. Include one drawback. | 6 | 必做保留/按本课说明调整 |
| P4 `S2-L02-Q4` | Calculate the number of links in a four-node full mesh by naming each link for nodes A, B, C and D. State a route from A to B after direct link A–B fails, and explain why an alternate route still needs a forwarding assumption. | 4 | 必做保留/按本课说明调整 |
### L009 Public and private cloud computing

知识/能力：云端依赖、共享与本地持续工作；项目知识映射：S2.06。
P3诊所题补给可用安全措施的含义，只评价共享/可用性；P4备份恢复细节延后S6后可选，避免提前考加密知识。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L03-Q1` | Define cloud computing and give two differences between public and private clouds in terms of tenancy and organisational control. | 6 | 必做保留/按本课说明调整 |
| P2 `S2-L03-Q2` | Explain two benefits of a public cloud for a start-up whose demand changes sharply each month and which has only one IT technician. | 4 | 必做保留/按本课说明调整 |
| P3 `S2-L03-Q3` | A clinic considers moving patient records to cloud storage. Give a balanced recommendation covering control, access, availability and cost. | 6 | 必做保留/按本课说明调整 |
| P4 `S2-L03-Q4` | Explain a recovery plan for a cloud order service that becomes unavailable at 10:00. An independently stored, verified backup captures 09:30; order 620 was confirmed at 09:40. A separate connection can still reach the live service. State the likely failed dependency, the limit of the backup, and how offline orders should be reconciled. | 5 | 可选巩固或入口口答，不计主配置 |
### L010 Wired, wireless and transmission media

知识/能力：传输介质、干扰、距离与选择理由；项目知识映射：S2.07, S2.08。
P1十分类罗列作参考，P3与P4重叠转可选；P2比较和P4场景选择保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L04-Q1` | Describe the characteristics of copper cable, fibre-optic cable, radio waves including WiFi, microwaves and satellites. | 10 | 可选巩固或入口口答，不计主配置 |
| P2 `S2-L04-Q2` | Compare a wired connection with WiFi for tablets used around a warehouse in terms of mobility, transmission conditions and physical installation. | 6 | 必做保留/按本课说明调整 |
| P3 `S2-L04-Q3` | Suggest a medium for a high-capacity link between two school buildings and a different medium for laptops that move around classrooms. Justify each choice and give one drawback of each. | 6 | 可选巩固或入口口答，不计主配置 |
| P4 `S2-L04-Q4` | Explain suitable transmission choices for (a) a 500 m link across an electrically noisy factory, (b) moving classroom tablets and (c) fixed buildings with a clear aligned path where cables cannot be installed. Give one limitation of the choice for the buildings. | 4 | 必做保留/按本课说明调整 |
### L011 LAN hardware, routers and Ethernet

知识/能力：LAN设备职责、帧路径、CSMA/CD阶段；项目知识映射：S2.09, S2.10, S2.11。
P1八设备名词清单转口答；P2、P4路径重复作可选。P3错说诊断、P5往返局部路径、P6冲突后重试各有独立作用。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L05-Q1` | Describe one LAN role of each of the following: switch, server, NIC, WNIC, WAP, cable, bridge and repeater. | 8 | 可选巩固或入口口答，不计主配置 |
| P2 `S2-L05-Q2` | Describe the path of a packet from the wireless laptop to the server on another network in the diagram below. Include the roles of the WNIC, WAP, switch and router. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S2-L05-Q3` | A student describes shared Ethernet as follows: “Transmit immediately without listening. Check for a collision only after sending the whole frame. After a collision, every station waits exactly the same fixed time and retries immediately.” Explain three errors in this description of CSMA/CD, giving a correction and its purpose for each. | 6 | 必做保留/按本课说明调整 |
| P4 `S2-L05-Q4` | Explain why a switch and router are both needed in a school LAN connected to the internet. | 4 | 可选巩固或入口口答，不计主配置 |
| P5 `S2-L05-Q5` | Describe both directions of a local exchange. A switch already knows MAC L via WAP on p1 and server MAC S on p3; a router is on p4. The laptop already knows S’s MAC. State the incoming and outgoing switch ports for the request and response, and explain why the router is unused. | 4 | 必做保留/按本课说明调整 |
| P6 `S2-L05-Q6` | Explain why two shared half-duplex Ethernet stations can collide after both sense idle. After the collision, A chooses a shorter random wait than B. B’s wait ends while A is transmitting. Describe B’s next action and what could happen if both had chosen the same wait. | 5 | 必做保留/按本课说明调整 |
### L012 Bit streaming, rates and buffers

知识/能力：速率差、有限buffer和连续播放；项目知识映射：S2.12。
P1定义口答，P2简单buffer例可选；P3长期不足、P4变速追踪、P5启动储备不互换。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L06-Q1` | Define bit streaming and compare real-time streaming with on-demand streaming. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `S2-L06-Q2` | A stream plays at 5 Mbit/s and arrives at 7 Mbit/s for 12 seconds, with playback already running and enough free buffer capacity for all arrivals. Calculate the buffer increase and explain the result. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S2-L06-Q3` | A connection remains below a video’s playback bit rate. Explain why increasing buffer size alone cannot provide uninterrupted playback forever. | 5 | 必做保留/按本课说明调整 |
| P4 `S2-L06-Q4` | Calculate the buffer contents after each interval. Playback has already started at 5 Mbit/s, the initial reserve is 10 Mbit and capacity is 30 Mbit. Arrival is 7 Mbit/s for 3 s, then 3 Mbit/s for 8 s. Ignore overhead. State what happens if the low arrival rate continues after those intervals. | 5 | 必做保留/按本课说明调整 |
| P5 `S2-L06-Q5` | Calculate the startup time for an empty buffer to collect 18 Mbit at an arrival rate of 6 Mbit/s before playback begins. Playback then starts at 4 Mbit/s and the connection immediately fails for 2 s. State the remaining reserve, and explain why a capacity of 40 Mbit does not give 10 s of outage protection at that moment. | 4 | 必做保留/按本课说明调整 |
### L013 Internet, WWW and connection infrastructure

知识/能力：WWW/internet、modem与双向访问路径；项目知识映射：S2.13, S2.14。
四项保留；P3专线/蜂窝服务是独立情境，不与modem双向流程重复。P2/P4作为往返两段连续完成。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L07-Q1` | Explain the difference between the internet and the WWW, then classify email and a web page. | 4 | 必做保留/按本课说明调整 |
| P2 `S2-L07-Q2` | A home uses the telephone-line PSTN access service shown below. Describe the path of a request from a laptop through the home LAN to the provider, distinguishing the router and modem functions and the signal conversion at each end of the telephone link. | 6 | 必做保留/按本课说明调整 |
| P3 `S2-L07-Q3` | Suggest a dedicated line or cell phone network for a remote emergency unit that moves weekly but must upload records. Explain how the chosen network provides access and give a balanced comparison. | 6 | 必做保留/按本课说明调整 |
| P4 `S2-L07-Q4` | Describe a returned web response over the illustrated telephone-access arrangement: home digital system, home modem, telephone/PSTN connection, provider modem and provider network. Identify which end modulates and which demodulates, and distinguish a router’s responsibility. | 5 | 必做保留/按本课说明调整 |
### L014 IP addressing, subnetting, URLs and DNS

知识/能力：IP两个分类轴、子网和DNS到资源；项目知识映射：S2.15, S2.16。
P2和P5相同/26划分思路，P2可选；P1表示法口答；保留P3分类、P4地址使用、P5子网、P6完整资源流程。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S2-L08-Q1` | State the length and normal notation of IPv4 and IPv6, then explain why one device can have more than one IP address. | 6 | 可选巩固或入口口答，不计主配置 |
| P2 `S2-L08-Q2` | A host is 192.168.8.34/26. Explain whether packets to 192.168.8.60 and 192.168.8.80 are delivered locally or through a router, using network bits and the supplied address and mask data below. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S2-L08-Q3` | Suggest public/private and static/dynamic addressing properties for an internal school printer, including the security implication. | 4 | 必做保留/按本课说明调整 |
| P4 `S2-L08-Q4` | For https://learn.example.org/course/page.html, identify the protocol, domain name and web page or file name, then explain how DNS and the browser retrieve the resource. | 7 | 必做保留/按本课说明调整 |
| P5 `S2-L08-Q5` | Calculate local or routed delivery for host 192.168.40.70/26. The mask is 255.255.255.192 and gateway 192.168.40.65; compare destinations 192.168.40.100 and 192.168.40.130. Give the source network and ordinary host range, then state the immediate recipient and final IP destination for the remote case. | 5 | 必做保留/按本课说明调整 |
| P6 `S2-L08-Q6` | Explain why a dynamically assigned private laptop can retrieve https://museum.example.org/gallery/map.html. Assume working routing, a usable IPv4 NAT mapping and no cached DNS entry. In this hypothetical network DNS returns documentation address 203.0.113.60. Distinguish address scope from assignment and name resolution from resource retrieval. | 5 | 必做保留/按本课说明调整 |
### L015 Input, output, storage and embedded systems

知识/能力：专用控制、存储持久性与需求变化；项目知识映射：S3.01, S3.02。
P1结构罗列转口答，P3洗衣机优缺点与P5同类转可选；P4断电和P5升级限制检验迁移。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-013-S3.01-ROLES` | Explain why a computer system needs input, output, primary memory and secondary storage, including removable storage. | 5 | 可选巩固或入口口答，不计主配置 |
| P2 `V3-013-S3.02-STRUCTURE` | A washing machine contains an embedded controller. Describe why it is an embedded system and how input, processing, memory and output support its dedicated function. | 4 | 必做保留/按本课说明调整 |
| P3 `V3-013-S3.02-TRADEOFFS` | Explain two benefits and two drawbacks of using an embedded system in a washing machine. | 4 | 可选巩固或入口口答，不计主配置 |
| P4 `S3-L01-APPLY-1` | Explain what a recorder can recover after this sequence: a reading of 31 is saved successfully, a RAM-only correction changes it to 32, and power is lost before another save. State what a separately completed removable copy made before the correction contains. | 4 | 必做保留/按本课说明调整 |
| P5 `S3-L01-APPLY-2` | Explain one benefit and one limitation of a dedicated embedded controller in a small ticket validator. It must scan tickets on battery power; a proposed upgrade would analyse camera images. Link each point to these requirements. | 4 | 必做保留/按本课说明调整 |
### L016 Principal operations of hardware devices

知识/能力：九种设备的能量/信号转换和故障定位；项目知识映射：S3.03。
P1调整为“图样正确但碳粉可擦掉”，解释定影作用及激光为何不能修复；保留原5分教师分配。P2–9例行流程作可选，P10–14覆盖其机制；九设备均仍有理解检查。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-014-S3.03-LASER` | Describe the principal operation of a laser printer. | 5 | 必做保留/按本课说明调整 |
| P2 `V3-014-S3.03-3D` | Describe how a 3D printer produces a physical model from digital data. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `V3-014-S3.03-MICROPHONE` | Describe how a microphone and an ADC produce binary sound data. | 4 | 可选巩固或入口口答，不计主配置 |
| P4 `V3-014-S3.03-SPEAKERS` | Describe how speakers convert binary sound data into sound waves. | 5 | 可选巩固或入口口答，不计主配置 |
| P5 `V3-014-S3.03-HDD` | Describe how a magnetic hard disk writes and reads data. | 5 | 可选巩固或入口口答，不计主配置 |
| P6 `V3-014-S3.03-FLASH` | Describe how solid-state flash memory stores and reads data. | 4 | 可选巩固或入口口答，不计主配置 |
| P7 `V3-014-S3.03-OPTICAL` | Describe how an optical disc reader/writer reads data and writes to a recordable disc. | 4 | 可选巩固或入口口答，不计主配置 |
| P8 `V3-014-S3.03-TOUCHSCREEN` | Describe how a capacitive touchscreen detects the position of a touch. | 4 | 可选巩固或入口口答，不计主配置 |
| P9 `V3-014-S3.03-VR` | Describe how a virtual-reality headset responds when a user turns their head. | 5 | 可选巩固或入口口答，不计主配置 |
| P10 `S3-L02-APPLY-1` | Explain the difference between the moving-coil microphone and loudspeaker in a recording/playback system. Include what causes motion in each and where ADC and DAC are required. | 5 | 必做保留/按本课说明调整 |
| P11 `S3-L02-APPLY-2` | Describe the final model when a printer follows three aligned, 0.5 mm thick slices: a filled 4 × 4 base, a filled 3 × 3 middle and a filled 2 × 2 top. Explain what would be wrong if it repeated the first slice three times. | 4 | 必做保留/按本课说明调整 |
| P12 `S3-L02-APPLY-3` | Explain how a flash cell can retain a programmed 0 during shutdown but need power to read it later. Use the declared model in which stored charge raises the threshold and a high-threshold state reads 0. | 4 | 必做保留/按本课说明调整 |
| P13 `S3-L02-APPLY-4` | Explain why each of these faults can occur independently: a correct visible screen with no registered touches, and a VR headset with working displays but a frozen viewpoint after a head turn. | 4 | 必做保留/按本课说明调整 |
| P14 `S3-L02-APPLY-5` | Compare writing and reading on a magnetic disk and a recordable optical disc. Explain why a pressed optical disc does not automatically support the same writing operation. | 4 | 必做保留/按本课说明调整 |
### L017 Buffers, RAM, ROM and memory technologies

知识/能力：易失性、读写特征、缓存排队与选型；项目知识映射：S3.04, S3.05, S3.06, S3.07。
P1已有流量过程由P5具体追踪承担；P2、P4分类并入P6口头追问，参考答案保留，主练习不重复罗列。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S3-L03-Q1` | Explain why a printer buffer can help a computer send a short burst of data to a slower printer. Explain what happens if the buffer fills. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `V3-015-S3.05-RAM-ROM` | Explain two differences between RAM and ROM and give one use of each. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `V3-015-S3.06-COMPARE` | Compare SRAM and DRAM and explain why each is used for a different primary-memory role. | 5 | 必做保留/按本课说明调整 |
| P4 `V3-015-S3.07-ROM-TYPES` | Explain the difference between PROM, EPROM and EEPROM. | 3 | 可选巩固或入口口答，不计主配置 |
| P5 `S3-L03-APPLY-1` | Complete the buffer trace for capacity 3, initially empty, and ordered blocks A–E. At time zero A–C arrive and the sender pauses with D–E waiting. At each following second, remove the oldest block first, then accept one waiting block if there is space. State buffer contents after 1 s, 2 s and 5 s, and the order removed. | 4 | 必做保留/按本课说明调整 |
| P6 `S3-L03-APPLY-2` | Explain suitable memory choices for a small controller’s low-latency workspace, a large affordable image-editing workspace, and calibration instructions that must be rewritten electrically while installed. State what each retains after power loss. | 4 | 必做保留/按本课说明调整 |
### L018 Monitoring, control, sensors, actuators and feedback

知识/能力：监测/控制、反馈、传感器与执行器故障；项目知识映射：S3.08, S3.09。
P6、P7为两项APPLY，保留完整状态与故障诊断；P5加热器复述与P6同机制可选，其余一般定义入口回顾。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-016-S3.08-COMPARE` | Compare a monitoring system with a control system. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `V3-016-S3.09-SENSORS` | Identify an appropriate named sensor for each of these uses and explain the match: greenhouse temperature, tyre pressure, remote-control signal and classroom noise level. | 4 | 必做保留/按本课说明调整 |
| P3 `V3-016-S3.09-ACTUATOR` | Describe how a temperature sensor, microprocessor and heater actuator work together in a control system. | 5 | 可选巩固或入口口答，不计主配置 |
| P4 `V3-016-S3.08-FEEDBACK` | Explain why feedback is important in a closed-loop temperature-control system. | 4 | 可选巩固或入口口答，不计主配置 |
| P5 `S3-L04-Q5` | Explain how a controller should respond to these temperature readings when it switches a heater on below 18 °C and off at or above 20 °C: 17 °C, 19 °C, 20 °C. Between the thresholds it retains the previous state. Identify which readings provide feedback after the heater starts. | 5 | 可选巩固或入口口答，不计主配置 |
| P6 `S3-L04-APPLY-1` | State the heater states for readings 17, 19, 20, 19, 18, 17 °C. It starts OFF, turns ON below 18 °C, turns OFF at or above 20 °C, and retains its previous state between those thresholds. Explain the two different outcomes at 19 °C. | 4 | 必做保留/按本课说明调整 |
| P7 `S3-L04-APPLY-2` | Explain the difference between a pump whose pressure sensor is stuck below the target and a pump whose motor fails while its pressure sensor remains accurate. The controller pumps whenever measured pressure is below the target. | 4 | 必做保留/按本课说明调整 |
### L019 Logic gates, symbols and truth tables

知识/能力：六门符号、真值和OR/XOR区别；项目知识映射：S3.10。
P5复合De Morgan任务移入L020可选巩固；本课保留单门全覆盖，不提前要求复合逻辑证明。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S3-L05-Q1` | Draw and label the symbols for NOT, AND and OR. State the output condition for each. | 6 | 必做保留/按本课说明调整 |
| P2 `S3-L05-Q2` | Draw and label NAND, NOR and XOR symbols. Explain how each is distinguished from its related AND or OR symbol. | 3 | 必做保留/按本课说明调整 |
| P3 `S3-L05-Q3` | Construct the truth tables for NAND and NOR using input order 00,01,10,11. State the NOT outputs for input order 0,1. | 4 | 必做保留/按本课说明调整 |
| P4 `S3-L05-Q4` | Construct an XOR truth table. Compare it with OR and identify the input combination that distinguishes the two gates. | 4 | 必做保留/按本课说明调整 |
| P5 `S3-L05-APPLY-1` | Construct complete truth tables for Q = NOT (A OR B) and R = (NOT A) AND (NOT B), and state whether they are equivalent. State why one matching row would not be sufficient. | 4 | 可选巩固或入口口答，不计主配置 |
### L020 Boolean expressions and logic-circuit design

知识/能力：电路、表达式、真值表互相构造；项目知识映射：S3.10。
P2与P1同类复合追踪作可选；P5仅指定若干接受行构造与P4相近作可选。L019移来的等价性题只作扩展，不增加必做。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S3-L06-Q1` | Construct a Boolean expression, circuit and truth table for a lamp L that lights only when switch S is on and both override inputs U and V are off. Use input order SUV = 000 to 111. | 5 | 必做保留/按本课说明调整 |
| P2 `S3-L06-Q2` | Construct a truth table and draw a circuit for Q = (A NOR B) XOR C. Include a column N = A NOR B and list inputs ABC from 000 to 111. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S3-L06-Q3` | Construct an expression and full truth table for Circuit D below. Include intermediate columns X and Y. | 4 | 必做保留/按本课说明调整 |
| P4 `S3-L06-Q4` | Construct a Boolean expression and circuit from the supplied truth table. First give an AND/OR/NOT expression, then identify an equivalent single gate. | 4 | 必做保留/按本课说明调整 |
| P5 `S3-L06-APPLY-1` | Construct an expression and a two-input-gate circuit for Q whose only accepted rows are ABC = 010 and 111. Include both accepted-row terms and verify all eight source outputs. | 4 | 可选巩固或入口口答，不计主配置 |
### L021 Von Neumann architecture, CPU components and registers

知识/能力：寄存器职责、地址/内容、PC/CIR区别；项目知识映射：S4.01, S4.02, S4.03。
P2纯寄存器清单可选；P5完整ADD执行题移至L023可选，避免尚未教完整fetch就作为独立考核。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L01-Q1` | Explain how one main memory containing both instructions and data supports the stored program concept. State how the same processor can carry out a different task. | 3 | 必做保留/按本课说明调整 |
| P2 `S4-L01-Q2` | Identify the register for each role: next instruction address; address of a current memory access; transferred memory value; instruction being decoded; arithmetic result; index offset; condition flags. Compare a general-purpose register with a special-purpose register. | 8 | 可选巩固或入口口答，不计主配置 |
| P3 `S4-L01-Q3` | Describe the roles of the ALU, CU, system clock and IAS when a stored program calculates a total. | 4 | 必做保留/按本课说明调整 |
| P4 `S4-L01-Q4` | Explain why PC=240 and CIR=LDD 600 can be correct at the same time. State which register will hold the loaded value and which register would supply an offset for indexed access. | 4 | 必做保留/按本课说明调整 |
| P5 `S4-L01-Q5` | In the shared calculation, ADD 5 at address 1 has been fetched. ACC=18 and Memory[5]=24. State the values of PC, MAR, MDR and ACC after execution, and explain why PC is not the current instruction. | 4 | 可选巩固或入口口答，不计主配置 |
### L022 System buses, ports and processor performance

知识/能力：总线方向、端口约束、cache与地址容量；项目知识映射：S4.04, S4.05, S4.06。
六项均保留：P3是数据总线最少传送次数，不能误判为一般性能复述；与P6地址容量问题不同。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L02-Q1` | Describe a processor read from Memory[420] and a write of 27 to Memory[421]. Identify what travels on each bus and its direction. | 5 | 必做保留/按本课说明调整 |
| P2 `S4-L02-Q2` | Explain why a four-core processor may improve the time to compress four independent files but may give little improvement for a single sequential calculation. Explain why different processor types cannot be ranked using clock speed alone. | 4 | 必做保留/按本课说明调整 |
| P3 `S4-L02-Q3` | Calculate the minimum number of data-bus transfers needed for 128 bits using a 32-bit bus and a 64-bit bus. Explain how a higher clock frequency and a larger effective cache can affect execution, with one condition for each claim. | 5 | 必做保留/按本课说明调整 |
| P4 `S4-L02-Q4` | Suggest a port for each connection and justify your choice: a USB keyboard, a digital display with integrated speakers, and a legacy VGA-only monitor. Compare the signals carried by HDMI and VGA. | 4 | 必做保留/按本课说明调整 |
| P5 `S4-L02-Q5` | An empty cache can hold both A and B. Reads occur in the order A,A,B,A; a miss fetches and retains the item, with no eviction or memory writes. Identify each hit or miss and calculate the number of RAM reads. Explain what changes for A,B,C,D when the cache has room for all four. | 3 | 必做保留/按本课说明调整 |
| P6 `S4-L02-Q6` | A system has 10 address bits and stores two bytes at each addressed location. Calculate its maximum addressable capacity in bytes. Calculate how many transfers carry 100 bits over a 32-bit data bus, ignoring overhead, and explain why this does not give the program time. | 4 | 必做保留/按本课说明调整 |
### L023 The fetch-execute cycle in register-transfer notation

知识/能力：fetch/execute状态变化与寄存器传送符号；项目知识映射：S4.07。
P4保留完整ADD/STO路径，但追加“错误把地址存为数据”的预测作为其原有解释要求，使用原程序条件；从L021移来的题只作可选。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L03-Q1` | Use register-transfer notation to show the fetch stage when PC=120 and Memory[120] contains LDD 500. Instructions occupy one address. Include the read control signal and state PC and CIR after the fetch. | 4 | 必做保留/按本课说明调整 |
| P2 `S4-L03-Q2` | Describe the decode and execute stages for CIR=STO 510 and ACC=36. Use register-transfer notation for the memory write and state whether the ACC changes. | 4 | 必做保留/按本课说明调整 |
| P3 `S4-L03-Q3` | Explain the error in the proposed fetch transfer PC ← [MDR]. Give the correct instruction destination and explain when a different value may legitimately be loaded into PC. | 3 | 必做保留/按本课说明调整 |
| P4 `S4-L03-Q4` | The supplied calculation starts with Memory[6]=0. Describe the operand transfers for ADD 5 and the write transfers for STO 6, then state the final memory and ACC values. | 4 | 必做保留/按本课说明调整 |
### L024 Interrupt causes, detection and handling

知识/能力：中断检测、优先级、上下文保存与恢复；项目知识映射：S4.08。
P3定义重复可选；P4必须保留ACC/PC/IX恢复后再执行的结果，不能只答继续执行。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L04-Q1` | Explain the purpose of interrupts using a printer that signals completion while the processor runs another program. Compare this with repeatedly checking the printer's status. | 4 | 必做保留/按本课说明调整 |
| P2 `S4-L04-Q2` | Describe how an enabled interrupt is detected and handled after an instruction finishes. Include the ISR, saved processor state and return to the interrupted program. | 5 | 必做保留/按本课说明调整 |
| P3 `S4-L04-Q3` | Identify an interrupt cause for each situation and explain its use: a time slice expires, a temperature alarm is raised, and a program requests an operating-system service. | 3 | 可选巩固或入口口答，不计主配置 |
| P4 `S4-L04-Q4` | An accepted interrupt saves PC=330, ACC=18, IX=4 and comparison=True. The ISR leaves ACC=65, IX=0 and comparison=False. The next program instruction at 330 is ADD #2. Explain the required restoration and state the result after that instruction. A lower-priority enabled request remains pending; explain why that does not mean it was lost. | 4 | 必做保留/按本课说明调整 |
### L025 Assembly language and the two-pass assembler

知识/能力：符号表、前向引用与两遍分工；项目知识映射：S4.09, S4.10, S4.15。
P1遍次概述口答，P3自定义编码可选；P2建符号表和P4重复/缺失标签检查保留，真题专教3分不等于连3条线。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L05-Q1` | Compare assembly language with machine code. Explain why assembly written for one processor instruction set may not run on a processor with a different instruction set. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `S4-L05-Q2` | Complete the pass-one symbol table for the supplied program and give the resolved address operand of each of its first three instructions in pass two. Explain why two passes are useful here. | 5 | 必做保留/按本课说明调整 |
| P3 `S4-L05-Q3` | Write the machine words for LDD 14, ADD 15, STO 16 and END using this teaching encoding: each word is 16 bits; the first 8 bits are the opcode and the last 8 bits the unsigned address. LDD=00000001, ADD=00000010, STO=00000011, END=11111111; use an all-zero operand for END. Explain whether these bit patterns are specified by Cambridge's example instruction set. | 5 | 可选巩固或入口口答，不计主配置 |
| P4 `S4-L05-Q4` | For the supplied source, identify the instruction and data labels and distinguish TOTAL from its initial and final contents. Explain two errors: defining FIRST twice, and referring to MISSING without any definition. | 4 | 必做保留/按本课说明调整 |
### L026 Addressing modes and complete assembly traces

知识/能力：寻址、条件跳转、内存与输出完整追踪；项目知识映射：S4.11, S4.12, S4.13, S4.14。
P1、P3、P5同类中间追踪作可选；P4与P7作为接受/拒绝路径成对检验，P8循环终止新增价值。高密度课分两段完成。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L06-Q1` | Identify the instruction group for each set: LDM/LDD/LDI/LDX/LDR/MOV/STO; IN/OUT; ADD/SUB/INC/DEC; JMP/JPE/JPN; CMP/CMI. Distinguish unconditional from conditional control within the fourth set. | 5 | 可选巩固或入口口答，不计主配置 |
| P2 `S4-L06-Q2` | Trace the data-movement sequence below, paying attention to the direction of MOV IX and the pointer used by LDI. Complete one row for each executed instruction, including END; record ACC, IX, the next PC and any output character. State the final contents of Memory[320]. | 4 | 必做保留/按本课说明调整 |
| P3 `S4-L06-Q3` | Trace the arithmetic sequence below. Convert each immediate operand to its value and distinguish changes to ACC from changes to IX. Complete one row for each executed instruction, including END; record ACC, IX, the next PC and any output character. Show repeated instructions on separate rows. | 5 | 可选巩固或入口口答，不计主配置 |
| P4 `S4-L06-Q4` | Trace the input-validation program for the supplied character A. Use the CMI result to decide whether the rejection path runs. Complete one row for each executed instruction, including END; record ACC, IX, the next PC and any output character. Show repeated instructions on separate rows. | 4 | 必做保留/按本课说明调整 |
| P5 `S4-L06-Q5` | Trace the control-flow example below. Decide which source lines are skipped by JPE and JMP. Complete one row for each executed instruction, including END; record ACC, IX, the next PC and any output character. Show repeated instructions on separate rows. | 4 | 可选巩固或入口口答，不计主配置 |
| P6 `S4-L06-Q6` | Calculate the loaded operand value for immediate #200, direct 200, indirect 200 and indexed 200 with IX=3, given Memory[200]=250, Memory[250]=18 and Memory[203]=44. Calculate a relative target using a supplied PC base of 90 and displacement −6. Explain the distinction between an effective address and its contents. | 6 | 必做保留/按本课说明调整 |
| P7 `S4-L06-Q7` | Trace the supplied input-validation program with input B instead of A. State the executed addresses, comparison, output and final ACC. Explain why the accepted-input arithmetic is skipped. | 4 | 必做保留/按本课说明调整 |
| P8 `S4-L06-Q8` | In the supplied countdown, replace LDM #2 with LDM #1 and reset the initial state. State the executed addresses, number of taken JPN branches and output. Explain why final ACC is not zero. | 3 | 必做保留/按本课说明调整 |
### L027 Bit manipulation, masks and binary shifts

知识/能力：逻辑移位、mask保持无关位与条件更新；项目知识映射：S4.15。
P5标签工作与L025重复转可选；P2两种操作数若给相同数值不增加辨别价值，转可选；P4单独位运算与主题重复可选。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S4-L07-Q1` | Calculate the six one-place shift results for the 8-bit pattern 10110010: logical left/right, arithmetic left/right, and cyclic left/right. Interpret arithmetic shifts using two's complement and state whether the left arithmetic shift overflows. Discard any bit shifted outside the 8-bit result. | 6 | 必做保留/按本课说明调整 |
| P2 `S4-L07-Q2` | Calculate the ACC result for each instruction independently, starting each time with ACC=172 and Memory[700]=15: AND #15, AND 700, OR B00001111, OR 700, XOR &0F, XOR 700. Give every result in 8-bit binary and denary. | 6 | 可选巩固或入口口答，不计主配置 |
| P3 `S4-L07-Q3` | Explain how to test bit 5 and set bit 1 in an 8-bit device status value without changing unrelated bits in the stored value. Bits are numbered 7 to 0 from left to right. The initial status is 00100100. Give the test result and the updated status, using a fresh copy of the original status for setting. | 5 | 必做保留/按本课说明调整 |
| P4 `S4-L07-Q4` | Calculate ACC after LSL #2 followed by LSR #3, starting with the unsigned 8-bit value 00101100. Explain what enters each vacated position. | 3 | 可选巩固或入口口答，不计主配置 |
| P5 `S4-L07-Q5` | Identify the instruction label and data label in the supplied program and give their addresses. Explain the difference between FLAGS and the contents at FLAGS, then state the final stored value in binary and denary. | 5 | 可选巩固或入口口答，不计主配置 |
| P6 `S4-L07-Q6` | The supplied program uses an 8-bit interface register at 900: ready is bit 4 and motor enable is bit 2. The device does not change the register during the sequence and a write replaces the byte. Give the final byte for separate initial values 00010001, 00000001 and 00010101. Explain the role of JPE and the second LDD. | 5 | 必做保留/按本课说明调整 |
### L028 Why operating systems are required

知识/能力：OS分配回收、保护、文件、驱动与调度；项目知识映射：S5.01。
P1服务清单口答；其余五项有独立机制。真题只考memory/process两项，Practice保留文件、权限、驱动覆盖。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S5-L01-Q1` | Explain two reasons why applications on a shared desktop use services provided by an operating system. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S5-L01-Q2` | Describe how memory management responds when a photo editor starts and later exits. Give one reason for protecting its allocated memory. | 3 | 必做保留/按本课说明调整 |
| P3 `S5-L01-Q3` | Describe two file-management operations involved in creating and later retrieving Notes/Revision.txt. | 2 | 必做保留/按本课说明调整 |
| P4 `S5-L01-Q4` | Explain how authentication and access rights can allow a pupil to read a class list while preventing the pupil from changing it. | 2 | 必做保留/按本课说明调整 |
| P5 `S5-L01-Q5` | Describe the roles of a device driver and a queue when three users send jobs to one printer. | 2 | 必做保留/按本课说明调整 |
| P6 `S5-L01-Q6` | Explain why process management can improve CPU use when a running program must wait for a slow disk read. | 3 | 必做保留/按本课说明调整 |
### L029 Utility software, libraries and linked files

知识/能力：工具能力边界、恢复、库接口和DLL兼容；项目知识映射：S5.02, S5.03。
P1、P2、P5一般工具定义转可选；保留碎片整理、修复不保证恢复、备份还原与库依赖的不同判断。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S5-L02-Q1` | Identify the utility needed to prepare an empty storage volume for files and describe what it creates. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S5-L02-Q2` | Explain why a virus checker needs updated detection information and describe the purpose of quarantine. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S5-L02-Q3` | Explain why defragmentation may speed up reading a large fragmented file from a magnetic hard disk without reducing the file's size. | 3 | 必做保留/按本课说明调整 |
| P4 `S5-L02-Q4` | Identify a utility for investigating inconsistent file-system records and give one limitation of its repair operation. | 2 | 必做保留/按本课说明调整 |
| P5 `S5-L02-Q5` | Explain why lossless file compression is appropriate for a folder of source-code files being sent to a colleague. | 2 | 可选巩固或入口口答，不计主配置 |
| P6 `S5-L02-Q6` | Explain why a scheduled backup on a separate device can recover work after the computer's main disk fails. State why a restore check is useful. | 3 | 必做保留/按本课说明调整 |
| P7 `S5-L02-Q7` | Explain what a program library provides and how a developer can use an existing routine correctly. | 3 | 必做保留/按本课说明调整 |
| P8 `S5-L02-Q8` | Explain one storage benefit and one maintenance benefit of a DLL used by several applications. Give one compatibility risk. | 3 | 必做保留/按本课说明调整 |
### L030 Assemblers, compilers and interpreters

知识/能力：翻译输入/输出、错误发现与执行阶段；项目知识映射：S5.04。
三项现有任务承担不同目标，均保留；去掉旧exam同义比较，真实题教先解释执行阶段再给理由。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S5-L03-Q1` | Explain why an assembler is needed for a routine written in the target processor's assembly language. | 2 | 必做保留/按本课说明调整 |
| P2 `S5-L03-Q2` | Describe what a compiler produces and explain why changing source code does not by itself change an existing executable. | 3 | 必做保留/按本课说明调整 |
| P3 `S5-L03-Q3` | Describe how an interpreter executes a high-level program containing a loop, and state whether it must first save a separate native executable of the whole program. | 3 | 必做保留/按本课说明调整 |
### L031 Choosing a translator and understanding Java translation

知识/能力：翻译方式的情境选择与JVM依赖；项目知识映射：S5.05, S5.06。
P1通用比较与P2场景选择重叠可选；保留Java中间代码和JVM，不能据一次编译就称独立本机执行。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S5-L04-Q1` | Compare compilation and interpretation in terms of repeated execution and the work needed after a source correction. | 4 | 可选巩固或入口口答，不计主配置 |
| P2 `S5-L04-Q2` | Suggest a translation approach for testing a partly written high-level calculation with frequent edits, and another for distributing a finished native program without source. Justify both choices. | 4 | 必做保留/按本课说明调整 |
| P3 `S5-L04-Q3` | Describe the role of javac and the JVM when running a Java console program. Explain why bytecode is not a universal physical-processor instruction set. | 3 | 必做保留/按本课说明调整 |
### L032 IDE features and practical debugging support

知识/能力：语法/逻辑区别、编辑行为与调试步骤；项目知识映射：S5.07。
P1提示功能入口口答；P2语法诊断、P3格式/折叠不改变执行、P4调试顺序保留，教师在P4解释语法正确仍可有逻辑错。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S5-L05-Q1` | Describe how context-sensitive prompts help when entering a call to a library routine and explain one limit of that help. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S5-L05-Q2` | Explain how dynamic syntax checking and a diagnostic window help locate a missing keyword. State why they may not identify a valid but incorrect calculation. | 3 | 必做保留/按本课说明调整 |
| P3 `S5-L05-Q3` | Compare pretty-printing with expanding and collapsing code blocks. Explain whether collapsing a block prevents it from executing. | 3 | 必做保留/按本课说明调整 |
| P4 `S5-L05-Q4` | A debugger is paused before Amount <- Amount * 2 with Amount = 7. Describe how to execute just that statement, state Amount afterwards, and explain how to inspect Amount + 1 without assigning it to Amount. Name the facility that caused the initial pause. | 4 | 必做保留/按本课说明调整 |
### L033 Security, privacy, integrity and the need for protection

知识/能力：security/privacy/integrity分类与反例；项目知识映射：S6.01, S6.02。
P4丢失设备情境转可选；保留合法范围但错误值、不可用但未泄露等边界，真题训练定义的必要范围。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S6-L01-Q1` | Identify the principal data concern in each case and justify it: a school publishes private medical details; a marks total is calculated incorrectly; an intruder destroys stored files. | 3 | 必做保留/按本课说明调整 |
| P2 `S6-L01-Q2` | Explain why password protection does not ensure that an entered examination mark is accurate. Give an example of a protected but inaccurate value. | 2 | 必做保留/按本课说明调整 |
| P3 `S6-L01-Q3` | Explain why a company must protect its computer system as well as encrypt its stored customer files. Give two different consequences of system compromise. | 2 | 必做保留/按本课说明调整 |
| P4 `S6-L01-Q4` | Explain why securing a server room is insufficient when staff carry unencrypted copies of records on removable drives. | 2 | 可选巩固或入口口答，不计主配置 |
### L034 Authentication and layered system protection

知识/能力：身份验证、签名、权限与多层保护；项目知识映射：S6.03。
P1一般身份定义口答；其余保留各自机制。真题明确排除authentication，训练排除条件，不能用已背密码答案硬套。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S6-L02-Q1` | Describe how an account identifier and a password are used at login, and explain why separate staff accounts support accountability. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S6-L02-Q2` | Describe the sender and receiver stages used to create and check a digital signature for a document. | 6 | 必做保留/按本课说明调整 |
| P3 `S6-L02-Q3` | Explain how a fingerprint system authenticates a claimed user and distinguish false acceptance from false rejection. | 3 | 必做保留/按本课说明调整 |
| P4 `S6-L02-Q4` | A PC allows incoming connections to service X and blocks service Y. Describe the firewall decision for a request to Y and compare host and network firewall placement. | 3 | 必做保留/按本课说明调整 |
| P5 `S6-L02-Q5` | Explain why anti-virus software needs updates and describe two actions it may take after detecting an infected file. | 3 | 必做保留/按本课说明调整 |
| P6 `S6-L02-Q6` | Describe what anti-spyware can do about an installed screen-monitoring program and explain why removal may not end every consequence. | 3 | 必做保留/按本课说明调整 |
| P7 `S6-L02-Q7` | Suggest a control for each risk and explain the match: stolen laptop storage, unauthorised inbound connections, and an infected program. Explain why the first control cannot replace the other two. | 4 | 必做保留/按本课说明调整 |
### L035 Internet threats, malware and access restriction

知识/能力：恶意软件、phishing/pharming与入侵机制；项目知识映射：S6.04, S6.05。
P6通用防范清单与L034重复可选；保留五类机制区别，教师错误分析明确标识，不称考官统计。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S6-L03-Q1` | Describe how an infected shared program can spread a virus and state one possible effect on the receiving computer. | 3 | 必做保留/按本课说明调整 |
| P2 `S6-L03-Q2` | Explain how spyware that records keystrokes could compromise a user's email account. | 3 | 必做保留/按本课说明调整 |
| P3 `S6-L03-Q3` | Explain how an unpatched network service can enable unauthorised access and how patching restricts this risk. | 3 | 必做保留/按本课说明调整 |
| P4 `S6-L03-Q4` | An email says a student's account will close unless they sign in through its link. Explain two features of this phishing route and describe one suitable precaution. | 3 | 必做保留/按本课说明调整 |
| P5 `S6-L03-Q5` | Describe how corrupting local name-resolution information can cause pharming even when a user types the correct address. State a suitable precaution. | 3 | 必做保留/按本课说明调整 |
| P6 `S6-L03-Q6` | Suggest two different precautions for a shared computer where users install unknown downloads, and explain the specific risk addressed by each. | 2 | 可选巩固或入口口答，不计主配置 |
### L036 Encryption and access rights for data

知识/能力：密钥、可读性、授权与传播副本；项目知识映射：S6.06。
P1加密定义口答；P2密钥同放、P3权限表、P4审计只读权限保留，P4答案需说明读权限不阻止所有外部复制。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S6-L04-Q1` | Describe how a sender makes a readable data file unintelligible during transfer and how the intended receiver restores it. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S6-L04-Q2` | Explain why keeping an unprotected decryption key on the same lost drive as an encrypted archive weakens its confidentiality protection. | 2 | 必做保留/按本课说明调整 |
| P3 `S6-L04-Q3` | Using the personnel-file permissions table, state whether a payroll clerk may modify a record, a department manager may delete one, and a visitor may read one. Explain why successful login does not change these decisions. | 4 | 必做保留/按本课说明调整 |
| P4 `S6-L04-Q4` | Suggest rights for an auditor who must view invoices without changing or removing them. Explain why these rights do not protect an unencrypted invoice copied to an outsider's drive. | 2 | 必做保留/按本课说明调整 |
### L037 Validation, verification, parity and checksums

知识/能力：验证检查分类、错误检测及无法保证真实性；项目知识映射：S6.07, S6.08。
十项分别覆盖范围/限制、格式/长度、存在/非空、校验位、双录、parity/block/checksum及局限，暂不凑减；可分课内诊断和课后操作。真题不替代低频操作检查。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S6-L05-Q1` | A source form says 28 but 82 is entered. The allowed range is 0 to 100. Explain the validation result and the result of comparison with the source. | 3 | 必做保留/按本课说明调整 |
| P2 `S6-L05-Q2` | State which values pass -10 <= Temperature <= 40 from -11, -10, 40 and 41. Then apply the single limit Temperature >= -10 to the same values and explain the difference. | 3 | 必做保留/按本课说明调整 |
| P3 `S6-L05-Q3` | A code must contain exactly six characters in the format two uppercase letters followed by four digits. State the length and format result for AB1234, 123456 and AB123. | 3 | 必做保留/按本课说明调整 |
| P4 `S6-L05-Q4` | The stored product IDs are P10 and P20. Apply presence and existence checks to a blank entry, P20 and P99, and state what each check tests. | 4 | 必做保留/按本课说明调整 |
| P5 `S6-L05-Q5` | Calculate the check digit for data digits 5834 using weights 3,1,3,1. Choose the digit that makes the weighted total plus that digit a multiple of 10. State whether code 58345 passes. | 3 | 必做保留/按本课说明调整 |
| P6 `S6-L05-Q6` | An original reference is KX304. A visual check sees KX340 entered. A separate double-entry attempt produces KX304 and KX340. Describe how each check detects an error and how it should be resolved. | 3 | 必做保留/按本课说明调整 |
| P7 `S6-L05-Q7` | Calculate the parity bit for seven data bits 1100101 under even parity, then under odd parity. Explain why flipping two bits may evade a byte parity check. | 3 | 必做保留/按本课说明调整 |
| P8 `S6-L05-Q8` | Calculate the even-parity row for these three complete eight-bit rows: 11100001, 01010101, 00110011. Then suppose only row 2 becomes 01011101. Identify the changed bit and describe the correction. | 4 | 必做保留/按本课说明调整 |
| P9 `S6-L05-Q9` | Calculate a checksum for data bytes 200,45,30 using sum modulo 256. If the receiver gets 200,46,30 with the original checksum, calculate its check value and state the decision. | 3 | 必做保留/按本课说明调整 |
| P10 `S6-L05-Q10` | Explain why both identical double-entry values and matching transfer checksums can still occur when the information is wrong. | 2 | 必做保留/按本课说明调整 |
### L038 Professional ethics and professional bodies

知识/能力：专业能力边界、行为准则与专业组织；项目知识映射：S7.01, S7.02。
P2伦理定义与P1重复、P4组织名称转参考；保留报告错误、能力范围和组织支持的应用。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S7-L01-Q1` | Explain two reasons why professional ethics is needed when designing a system that stores private patient records. | 2 | 必做保留/按本课说明调整 |
| P2 `S7-L01-Q2` | State two purposes of ethics in the computing profession. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S7-L01-Q3` | An employee is asked to sign off a system outside their expertise. Explain why obeying the instruction alone is insufficient and suggest a responsible action. | 2 | 必做保留/按本课说明调整 |
| P4 `S7-L01-Q4` | Identify the professional bodies abbreviated BCS and IEEE. | 2 | 可选巩固或入口口答，不计主配置 |
| P5 `S7-L01-Q5` | Explain two ways joining a professional body could help a programmer keep their skills current and respond to pressure to hide a fault. | 2 | 必做保留/按本课说明调整 |
### L039 Ethical decisions and their consequences

知识/能力：利益相关者、技术责任与有依据判断；项目知识映射：S7.03。
P3成本和P4隐私为可选巩固；P5改弱答案要把行动、对象和后果连接，不能只写be ethical。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S7-L02-Q1` | A town publishes named residents' complaints on an open website to show how quickly repairs are handled. Identify two stakeholders and explain one concern for each. | 2 | 必做保留/按本课说明调整 |
| P2 `S7-L02-Q2` | A developer knows that a delivery app sends drivers to a closed bridge. Explain one consequence for drivers of reporting the error and one of concealing it. | 2 | 必做保留/按本课说明调整 |
| P3 `S7-L02-Q3` | A company postpones a booking-system launch to correct a fault that loses reservations. Explain one short-term cost and one longer-term benefit of this decision. | 2 | 可选巩固或入口口答，不计主配置 |
| P4 `S7-L02-Q4` | A sports club needs emergency contacts for one weekend trip but proposes keeping them indefinitely for advertising. Justify a more appropriate use of the data and suggest two safeguards. | 3 | 可选巩固或入口口答，不计主配置 |
| P5 `S7-L02-Q5` | A response to an attendance proposal says, 'Tracking everyone is good because it is efficient.' Explain two weaknesses in this reasoning and suggest an alternative to continuous location tracking. | 3 | 必做保留/按本课说明调整 |
### L040 Copyright and software licences

知识/能力：版权、四种许可使用条件与源代码/价格区别；项目知识映射：S7.04, S7.05。
P4试用21天与P8试用30天同机制，P4可选；保留其余权限、价格、源码、分发、选择条件。历史MS中组织名不能教成具体许可证名称。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S7-L03-Q1` | Explain two reasons why copyright legislation is needed for software that takes a year to develop but can be copied in seconds. | 2 | 必做保留/按本课说明调整 |
| P2 `S7-L03-Q2` | Describe the four freedoms associated with the FSF's free-software approach and state which need source access. | 4 | 必做保留/按本课说明调整 |
| P3 `S7-L03-Q3` | Explain the role of the OSI and why publishing readable source while prohibiting all modifications does not establish open-source licensing. | 2 | 必做保留/按本课说明调整 |
| P4 `S7-L03-Q4` | A shareware editor stops saving documents after a 21-day trial unless a licence is bought. Explain one benefit of the trial and one action needed for continued full use. | 2 | 可选巩固或入口口答，不计主配置 |
| P5 `S7-L03-Q5` | A company sells an open-source program, while another gives away a closed-source utility. Explain why price alone does not distinguish open-source and proprietary licensing. | 2 | 必做保留/按本课说明调整 |
| P6 `S7-L03-Q6` | A proprietary licence covers five named users for one year, with support only during office hours. State three terms a manager should check before assigning it to eight users who need round-the-clock help for two years. | 3 | 必做保留/按本课说明调整 |
| P7 `S7-L03-Q7` | A volunteer group must modify a program and share it with partner groups. Offer A permits both acts if copyright notices are retained. Offer B permits use only and supplies no source. Justify one choice and state an obligation. | 3 | 必做保留/按本课说明调整 |
| P8 `S7-L03-Q8` | A shop is unsure whether a stock-control program works with its scanner. Its shareware trial includes scanner support for 30 days, and the shop can pay for continued use. Justify using the trial before purchase and explain one limitation. | 2 | 必做保留/按本课说明调整 |
### L041 Artificial intelligence applications and impacts

知识/能力：AI识别应用、误判、社会经济环境与评价；项目知识映射：S7.06。
P2语音流程可选（真题OCR另一应用）；P6环境成本罗列由P8证据评价深化，转可选。P7总体准确率不能替代分组表现。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S7-L04-Q1` | Explain what is meant by artificial intelligence and distinguish recognising a handwritten postcode from storing a postcode typed by a user. | 2 | 必做保留/按本课说明调整 |
| P2 `S7-L04-Q2` | Describe an AI speech-to-text application using its input, recognition task, output and practical use. | 3 | 可选巩固或入口口答，不计主配置 |
| P3 `S7-L04-Q3` | An AI payment service flags unusual transactions for staff review. Describe what the model analyses and how its output is used; explain why a flag is not proof of fraud. | 3 | 必做保留/按本课说明调整 |
| P4 `S7-L04-Q4` | Automatic captions work well for one accent but often misrecognise another. Explain one social benefit and one social risk of using them in an online lesson, and suggest a safeguard. | 3 | 必做保留/按本课说明调整 |
| P5 `S7-L04-Q5` | A factory uses AI to predict machine faults. Explain one economic benefit, one system cost and one possible effect on workers. | 3 | 必做保留/按本课说明调整 |
| P6 `S7-L04-Q6` | An AI system reduces a building's heating demand but requires new servers. Explain one environmental benefit and two environmental costs that should be considered. | 3 | 可选巩固或入口口答，不计主配置 |
| P7 `S7-L04-Q7` | A recruitment firm wants AI to reject applicants automatically. Testing shows good overall accuracy but much poorer results for one group. Evaluate automatic rejection and recommend a safeguard. | 4 | 必做保留/按本课说明调整 |
| P8 `S7-L04-Q8` | A delivery company claims its AI route planner is environmentally beneficial because its computers are efficient. Explain why this evidence alone is insufficient and suggest a more useful comparison. | 2 | 必做保留/按本课说明调整 |
### L042 From file-based systems to relational databases

知识/能力：文件问题、键、参照完整性与索引；项目知识映射：S8.01, S8.02。
P2术语清单口答，P4关系基数在L043主练；真题改用具体公司文件问题组织原因。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L01-Q1` | A garage repeats a customer's phone number in repair and invoice files. Explain two problems this can cause and describe how a linked Customer table addresses each problem. | 4 | 必做保留/按本课说明调整 |
| P2 `S8-L01-Q2` | Identify the entity, one record and two attributes represented by Book(BookID, Title, Price), containing (7, 'Dunes', 12.50). Give the equivalent terms for record and field. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S8-L01-Q3` | A school assigns each pupil a unique PupilID and a unique exam number. Names and tutor groups may repeat. Identify the candidate keys, choose a primary key, suggest a secondary key for finding tutor-group members, and explain why Attendance.PupilID is a foreign key. | 4 | 必做保留/按本课说明调整 |
| P4 `S8-L01-Q4` | State the relationship in each case: every employee has one parking permit and each permit belongs to one employee; each customer places many orders and every order has one customer; each actor appears in many films and every film has many actors. Explain how to store the final relationship. | 4 | 可选巩固或入口口答，不计主配置 |
| P5 `S8-L01-Q5` | Department contains IDs 3 and 6. Employee.DepartmentID is a non-null foreign key. Explain whether values 6 and 8 can be inserted, and whether two employees may both contain 3. | 3 | 必做保留/按本课说明调整 |
| P6 `S8-L01-Q6` | A catalogue has 200000 products and users frequently search by Category. Explain one benefit and two costs of adding an index on Category. | 3 | 必做保留/按本课说明调整 |
### L043 Entity-relationship design and normalisation

知识/能力：关系设计、1NF/2NF/3NF、键与依赖；项目知识映射：S8.03, S8.04。
P4postcode→town和P5museum同属传递依赖，P4可选；P5另考空房间先存在的设计约束，保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L02-Q1` | Draw an E-R diagram for a library where each Copy belongs to one Book and each Loan refers to one Copy. A book may have several copies and a copy may be loaned many times. Include primary keys, foreign keys and relationship cardinalities. | 5 | 必做保留/按本课说明调整 |
| P2 `S8-L02-Q2` | An order row contains OrderID 70 and a repeating Items field with (P4, quantity 2) and (P8, quantity 5). Write a 1NF relation and its two rows, assuming each product appears once per order. State its key. | 3 | 必做保留/按本课说明调整 |
| P3 `S8-L02-Q3` | Registration(StudentID, CourseID, CourseTitle, Grade) has key (StudentID, CourseID). CourseID determines CourseTitle; the complete key determines Grade. Explain the 2NF violation and give the corrected relations and keys. | 4 | 必做保留/按本课说明调整 |
| P4 `S8-L02-Q4` | Customer(CustomerID, Postcode, Town) has key CustomerID. Each postcode determines one town. Explain why the table fails 3NF and state a decomposition with its linking field. | 3 | 可选巩固或入口口答，不计主配置 |
| P5 `S8-L02-Q5` | A museum stores Item(ItemID, ItemName, RoomID, RoomName). ItemID is the key and RoomID determines RoomName. Explain whether this is in 3NF and produce a design that allows a room to be recorded before any items are assigned to it. | 4 | 必做保留/按本课说明调整 |
### L044 DBMS architecture, integrity, security and backup

知识/能力：DBMS元数据、schema、完整性、安全恢复和查询；项目知识映射：S8.05, S8.06。
P2建模与L043重复，P7表单报表与开发接口真题重复，转可选；必要安全与恢复不因本课真题较短而删除。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L03-Q1` | Describe two pieces of metadata a DBMS stores for a field named BirthDate and explain one way the DBMS can use that metadata. | 3 | 必做保留/按本课说明调整 |
| P2 `S8-L03-Q2` | A designer discovers that a patient can have several appointments and an appointment concerns one patient. Describe how data modelling represents that rule. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S8-L03-Q3` | Describe the logical schema for Team(TeamID, TeamName) and Player(PlayerID, PlayerName, TeamID), where each player has one team. Explain why the schema need not contain disk-sector addresses. | 3 | 必做保留/按本课说明调整 |
| P4 `S8-L03-Q4` | A DBMS receives three changes: reuse an existing OrderID primary-key value, reference an absent CustomerID, and set a quantity to -3 when the rule requires at least 1. Explain the integrity reason for rejecting each. | 3 | 必做保留/按本课说明调整 |
| P5 `S8-L03-Q5` | Explain how individual or group access rights can allow a receptionist to read appointment times while preventing changes to treatment notes. | 3 | 必做保留/按本课说明调整 |
| P6 `S8-L03-Q6` | The latest usable backup is from 02:00. A failure occurs at 09:00 and there are no recovery logs. State the restored data state and explain two improvements to the backup procedure. | 3 | 必做保留/按本课说明调整 |
| P7 `S8-L03-Q7` | A school needs a new enrolment form and a formatted class-list report. Describe how the DBMS developer interface helps with these two tasks. | 2 | 可选巩固或入口口答，不计主配置 |
| P8 `S8-L03-Q8` | Describe three actions performed by a query processor after receiving a request for the names of members with unpaid fees. | 3 | 必做保留/按本课说明调整 |
### L045 DDL, DML and the role of SQL

知识/能力：DDL/DML/SQL/DBMS角色边界；项目知识映射：S8.07。
保留现有三项分类与解释；不单独配置重复分类真题。下两课在真实CREATE/ALTER和SELECT/UPDATE中再判职责；这不是“未找到真题”。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L04-Q1` | Identify CREATE TABLE and ALTER TABLE as DDL or DML, and describe the kind of object they change. | 2 | 必做保留/按本课说明调整 |
| P2 `S8-L04-Q2` | Identify SELECT, INSERT INTO, UPDATE and DELETE FROM as DDL or DML. State which retrieves information without changing stored rows and which removes records. | 3 | 必做保留/按本课说明调整 |
| P3 `S8-L04-Q3` | Explain the relationship between SQL, DDL and DML, using one structural operation and one data operation as examples. | 3 | 必做保留/按本课说明调整 |
### L046 Understanding and writing SQL data definitions

知识/能力：七种DDL数据类型、主外键和ALTER；项目知识映射：S8.08, S8.09。
P1SELECT读取放L047可选；P3不只照抄类型表，保留原Event需求并要求检查字段与值的适配；P5、P6约束后果必须保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L05-Q1` | Explain the output columns, selected records and ordering of the supplied SQL. State how replacing 'Reference' with 'Fiction' changes the qualifying titles. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S8-L05-Q2` | Write an SQL statement to create a database named SportsCentre. State whether it creates any Booking records. | 2 | 必做保留/按本课说明调整 |
| P3 `S8-L05-Q3` | Write CREATE TABLE for Event with EventID (whole number), Code (one character), EventName (up to 30 characters), Confirmed (true/false), Duration (fractional hours), EventDate (calendar date) and StartTime (time of day). Use the seven syllabus data types. | 7 | 必做保留/按本课说明调整 |
| P4 `S8-L05-Q4` | Write DDL to add Room, containing at most 12 characters, to the existing Event table. Explain why an UPDATE statement is insufficient. | 2 | 必做保留/按本课说明调整 |
| P5 `S8-L05-Q5` | Write a Locker table definition containing LockerID as INTEGER and Location as VARCHAR(30), making LockerID its primary key. State the two requirements this identifier must satisfy. | 3 | 必做保留/按本课说明调整 |
| P6 `S8-L05-Q6` | Locker(LockerID) already has its primary key. Write Allocation with integer AllocationID as primary key and integer LockerID as a foreign key to Locker. Explain whether several allocations can reference the same locker under these constraints alone. | 3 | 必做保留/按本课说明调整 |
### L047 Querying and maintaining data with SQL DML

知识/能力：筛选、连接、分组聚合与精确修改数据；项目知识映射：S8.10, S8.11。
P1查询入门可选；P7–9作为一组写入流程连续完成但保留三个原任务计数/分值；用运行前后数据解释影响，不仅提交SQL。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S8-L06-Q1` | Write a query returning Title and Category for every Book, ordered by BookID. State the number of result columns. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S8-L06-Q2` | Write a query listing titles of Fiction books priced at least 8, in BookID order. Use the supplied Book data and state the returned titles. | 3 | 必做保留/按本课说明调整 |
| P3 `S8-L06-Q3` | Write a query returning Title and Price from Book in decreasing price order, with titles in alphabetical order when prices tie. State the first returned title. | 3 | 必做保留/按本课说明调整 |
| P4 `S8-L06-Q4` | Write a query giving each Book category and the sum of its listed book prices, with categories alphabetically ordered. Calculate both totals from the supplied data. | 3 | 必做保留/按本课说明调整 |
| P5 `S8-L06-Q5` | Write a two-table INNER JOIN returning each book Title and sold Quantity for Sale records with Quantity at least 3. Order by SaleID and state the two output rows. | 4 | 必做保留/按本课说明调整 |
| P6 `S8-L06-Q6` | Write one query calculating the number of Sale records, total Quantity and mean Quantity. Calculate the three results from the displayed Sale table. | 4 | 必做保留/按本课说明调整 |
| P7 `S8-L06-Q7` | Stock(StockID INTEGER PRIMARY KEY, ItemName VARCHAR(30), Quantity INTEGER) contains IDs 30 and 31. Write an INSERT adding ID 32, ItemName 'Stand' and Quantity 4, using an explicit field list. | 2 | 必做保留/按本课说明调整 |
| P8 `S8-L06-Q8` | Stock contains (30, 'Cable', 6) and (31, 'Adapter', 2). Write SQL to remove only StockID 31. Explain the effect of omitting WHERE. | 2 | 必做保留/按本课说明调整 |
| P9 `S8-L06-Q9` | Stock contains (30, 'Cable', 6) and (31, 'Adapter', 2). Write SQL to change the quantity of StockID 30 to 8. State which data in record 30 remains unchanged. | 2 | 必做保留/按本课说明调整 |
### L048 Paper 1 integrated review and error clinic

知识/能力：跨主题诊断、错误定位、考试信息筛选；项目知识映射：S1.01, S1.02, S1.03, S1.04, S1.05, S1.06, S1.07, S1.08, S1.09, S1.10, S1.11, S2.01, S2.02, S2.03, S2.04, S2.05, S2.06, S2.07, S2.08, S2.09, S2.10, S2.11, S2.12, S2.13, S2.14, S2.15, S2.16, S3.01, S3.02, S3.03, S3.04, S3.05, S3.06, S3.07, S3.08, S3.09, S3.10, S4.01, S4.02, S4.03, S4.04, S4.05, S4.06, S4.07, S4.08, S4.09, S4.10, S4.11, S4.12, S4.13, S4.14, S4.15, S5.01, S5.02, S5.03, S5.04, S5.05, S5.06, S5.07, S6.01, S6.02, S6.03, S6.04, S6.05, S6.06, S6.07, S6.08, S7.01, S7.02, S7.03, S7.04, S7.05, S7.06, S8.01, S8.02, S8.03, S8.04, S8.05, S8.06, S8.07, S8.08, S8.09, S8.10, S8.11。
P2“比较两个相关概念”未指定对象且答案是考纲条目，删除该配置；保留13项作为诊断菜单，实际课前按错因选一半。其他具体题转分主题可选；不是一节全部做完。真题38分独立完成后按失分类型讲评。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L045-01` | Describe one verification method used during data entry and two methods used during data transfer. | 5 | 可选巩固或入口口答，不计主配置 |
| P2 `V3-Q-L045-03` | Compare two closely related ideas from Section 3: Hardware. | 4 | 删除无明确对象的泛化配置；不作为题目保留 |
| P3 `V3-Q-L045-04` | Calculate the unsigned binary value 10110110 to hexadecimal and denary, showing both methods. | 4 | 可选巩固或入口口答，不计主配置 |
| P4 `S1-REVIEW-NUMBERS` | Interpret the unchanged pattern 11110101 in denary as unsigned, one’s complement and two’s complement. Then calculate 01111110 + 00000010 at eight bits and explain the overflow decision for unsigned and two’s-complement interpretations. | 6 | 必做保留/按本课说明调整 |
| P5 `S1-REVIEW-MEDIA` | Calculate raw data bytes for a 48 × 20 bitmap at 4 bits per pixel, and a 3-second mono recording at 6000 Hz and 8 bits per sample. Exclude headers. A vector line joins (2,3) to (6,3), thickness 1: state its properties after scaling everything by 3. Explain whether RLE helps the bitmap row 000000111111000000 when each run uses an 8-bit count and 1-bit value. | 6 | 必做保留/按本课说明调整 |
| P6 `REV-P1-S2-DESIGN` | Explain a design for a museum with two distant sites and 30 terminals using central accounts. Staff must edit exhibit images during internet outages. Identify LAN/WAN scope, a service model and a client type; explain why cloud-only storage would need an offline-work arrangement. Two buildings at one site are 500 m apart across electrically noisy workshops, and each room uses a star. Recommend a link medium and distinguish one host-cable failure from central-switch failure. | 8 | 可选巩固或入口口答，不计主配置 |
| P7 `REV-P1-S2-HARDWARE` | Describe a local request from a wireless laptop to a server: the laptop is reached via WAP on switch p1 and the server via p3; all needed addresses and ports are known. Then consider a separate shared half-duplex Ethernet segment: two stations collide, wait randomly and one finds the medium busy at retry time. Explain its next action and why the collision was possible. | 5 | 可选巩固或入口口答，不计主配置 |
| P8 `REV-P1-S2-BUFFER` | Calculate a live-stream buffer trace with capacity 40 Mbit, initial reserve 12 Mbit and playback already running at 6 Mbit/s. Arrival is 8 Mbit/s for 4 s and then 4 Mbit/s. State the reserve after 4 s and total time from the start until it empties if the lower rate continues. Explain one response to that sustained deficit. | 5 | 必做保留/按本课说明调整 |
| P9 `REV-P1-S2-RESOURCE` | Explain retrieval of https://archive.example.org/exhibits/map.html by host 192.168.20.150/26 with gateway 192.168.20.129. Assume no cached DNS entry, successful services and routing, and an appropriate NAT arrangement for internet access. In this hypothetical network DNS returns documentation address 203.0.113.60. State the source subnet and next hop, then trace name resolution, resource request and returned content. Distinguish the returned WWW resource from the internet infrastructure. If a phone retrieves it over cellular access instead, describe the phone’s access path. | 8 | 可选巩固或入口口答，不计主配置 |
| P10 `REV-P1-S3-DEVICES` | Explain two faults in a museum recording kiosk: the moving-coil microphone’s diaphragm cannot move, and the laser printer produces the correct label pattern but the toner rubs off. Identify the failed conversion or stage in each and explain why a functioning ADC or laser respectively does not resolve it. | 5 | 必做保留/按本课说明调整 |
| P11 `REV-P1-S3-MEMORY` | Explain why an embedded environmental recorder uses RAM for changing readings, persistent firmware storage and separate saved files. Its firmware must be rewritten electrically while installed. A capacity-three buffer starts with R1–R3 while R4 waits at the paused sender; one block is removed and then R4 is accepted. State the new buffer contents and what survives shutdown after a completed file save. | 5 | 可选巩固或入口口答，不计主配置 |
| P12 `REV-P1-S3-CONTROL` | Explain why a pressure-controlled pump can keep running past the actual target if its sensor is stuck low. Compare this with an accurate sensor reporting no pressure rise because the motor is faulty, and state why a pressure display alone is monitoring. | 5 | 必做保留/按本课说明调整 |
| P13 `REV-P1-S4-Q1` | A student fetches STO 620 using MAR ← [ACC], then writes 620 into memory through MDR. Describe the correction to the address/value confusion. PC=90, Memory[90]=STO 620, ACC=58 and each instruction occupies one location. | 3 | 必做保留/按本课说明调整 |
| P14 `REV-P1-S4-Q2` | An ISR changes ACC from 18 to 65 after saving a program with next PC=330 and IX=4. State the state needed to resume ADD #2 at 330. Explain what happens to an enabled lower-priority request retained while a higher-priority alarm is serviced. | 3 | 必做保留/按本课说明调整 |
| P15 `REV-P1-S4-Q3` | Complete a trace of the supplied input-validation program with input B instead of A. Give the resolved CMI operand, state the comparison and executed addresses, and give the output. Explain why JPN is taken even though ACC is positive. | 4 | 可选巩固或入口口答，不计主配置 |
| P16 `REV-P1-S4-Q4` | A status byte starts at 00010001. Ready is bit 4 and motor enable is bit 2. Explain a conditional test-and-set sequence that preserves all other bits. State the final byte here and when the initial byte is 00000001. Assume stable, writable byte storage during the sequence. | 4 | 必做保留/按本课说明调整 |
| P17 `REV-P1-S5-Q1` | Explain the roles of OS security management, backup software and a program library in a shared editing application: restrict who may overwrite files, recover an earlier document and reuse an existing spell-check routine. | 3 | 可选巩固或入口口答，不计主配置 |
| P18 `REV-P1-S5-Q2` | Explain why repeated use can favour a native compiled executable, then describe why a Java class file still needs a compatible JVM. | 3 | 必做保留/按本课说明调整 |
| P19 `REV-P1-S5-Q3` | A program should double 6 but produces 8. Describe how a breakpoint, single stepping and variable inspection can help locate the faulty calculation. | 3 | 必做保留/按本课说明调整 |
| P20 `REV-P1-S7-Q1` | A systems analyst hides a known emergency-contact error to avoid delaying a client demonstration. Explain why this conflicts with professional ethics, give a consequence of reporting it, and explain how professional-body membership could help the analyst respond. | 3 | 可选巩固或入口口答，不计主配置 |
| P21 `REV-P1-S7-Q2` | A student claims, 'Copyright ends when source is published, and shareware can always be used forever without paying.' Explain the two errors and state why a paid open-source product can still be commercial software. | 3 | 必做保留/按本课说明调整 |
| P22 `REV-P1-S7-Q3` | An archive needs to adapt an indexer and distribute it to partner archives. Licence A supplies source and permits both acts if notices remain. Licence B permits one unmodified installation. Justify a choice and state a continuing responsibility. | 3 | 可选巩固或入口口答，不计主配置 |
| P23 `REV-P1-S7-Q4` | A transport service uses AI to recognise spoken destinations. Describe this application and explain one social benefit, one economic cost and one environmental cost. | 4 | 必做保留/按本课说明调整 |
| P24 `REV-P1-S8-Q1` | A school stores each pupil's address in separate club files. Pupil(PupilID, PupilName, Address) and Membership(PupilID, ClubID) are proposed; Club(ClubID, ClubName) already exists. Explain how the design reduces inconsistent addresses, state the Membership key assuming one membership per pupil per club, and describe the two relationships and referential-integrity rules. | 4 | 可选巩固或入口口答，不计主配置 |
| P25 `REV-P1-S8-Q2` | Parcel(ParcelID, DepotID, DepotName) has atomic values and primary key ParcelID. Each depot has one name and handles many parcels. Explain why the table is not in 3NF, then give a 3NF design with keys and explain how to recover a parcel's depot name. | 3 | 必做保留/按本课说明调整 |
| P26 `REV-P1-S8-Q3` | A developer uses a DBMS interface to define Courier(CourierID INTEGER, CourierName VARCHAR(30), PRIMARY KEY (CourierID)). Explain the roles of the developer interface, data dictionary and query processor. Identify the language category used to create this table and state what the definition permits and prevents. | 5 | 可选巩固或入口口答，不计主配置 |
| P27 `REV-P1-S8-Q4` | Using Member and Loan, write a query returning each member name and number of unreturned loans, grouped by MemberID and MemberName and ordered by MemberID. State the result. Then write SQL marking LoanID 205 as returned and explain why that update must not identify the loan by MemberID alone. | 5 | 可选巩固或入口口答，不计主配置 |
### L049 Abstraction and purposeful models

知识/能力：抽象的必要细节与可省略细节；项目知识映射：S9.01。
保留三项，删掉旧exam同情境复述；真题按商业用途解释选留信息。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L01-Q1` | Explain why a fire-escape model retains exits and blocked corridors but omits classroom display colours. | 3 | 必做保留/按本课说明调整 |
| P2 `S9-L01-Q2` | Write a table model for deciding whether a bicycle can be hired. Bicycle C1 is available and C2 is already hired. The decision depends only on the bicycle identifier and whether it is hired. State one assumption of this model. | 3 | 必做保留/按本课说明调整 |
| P3 `S9-L01-Q3` | A bus model used to choose the lowest fare stores stops and travel times but no fares. Explain the defect and state a change. | 2 | 必做保留/按本课说明调整 |
### L050 Decomposition into program modules

知识/能力：任务拆分、接口与重复职责；项目知识映射：S9.02。
保留；一个模块只改名不算分解，重复收费任务要求定位职责重叠。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L02-Q1` | Describe a decomposition of a cinema purchase that selects a film, checks seats, calculates a price and produces a ticket. State four sub-problems and explain one connection between them. | 5 | 必做保留/按本课说明调整 |
| P2 `S9-L02-Q2` | State whether a function or a procedure returning no value is the better interface for CalculateArea, which receives Length and Width and supplies an area needed in a later paint-cost calculation. Describe its inputs and result. | 3 | 必做保留/按本课说明调整 |
| P3 `S9-L02-Q3` | Explain the problem when two modules separately calculate a delivery charge but only one is updated after a tariff change. Describe a better decomposition. | 3 | 必做保留/按本课说明调整 |
### L051 Defined algorithm steps and identifier tables

知识/能力：精确定义步骤、identifier类型及用途；项目知识映射：S9.03, S9.04。
保留三项；本课已介绍INTEGER/REAL/STRING及示例BOOLEAN用途，可作标识符表，完整类型边界留L058。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L03-Q1` | State what is meant by an algorithm and explain why 'read a price, calculate the tax at 5%, output the tax' is more precise than 'deal with tax'. | 2 | 必做保留/按本课说明调整 |
| P2 `S9-L03-Q2` | Complete an identifier table for a parcel algorithm using ParcelCode, Mass and Express. Parcel codes contain letters, mass may be fractional, and Express records whether express service was selected. Give each type and purpose. | 3 | 必做保留/按本课说明调整 |
| P3 `S9-L03-Q3` | An area algorithm uses A for width and B for length, then computes Result <- A * B. Suggest clearer identifiers and explain whether renaming alone changes the numerical result. | 2 | 必做保留/按本课说明调整 |
### L052 Input, process and output in pseudocode

知识/能力：输入先于使用、处理与最终输出；项目知识映射：S9.05。
保留现有三项IPO检查；不单独重复一份综合题；L055细化和L061输入/倒序输出题承担考试迁移。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L04-Q1` | Write pseudocode to input a distance in kilometres and a speed in kilometres per hour, then output the journey time in hours. Assume distance is non-negative and speed is positive. | 3 | 必做保留/按本课说明调整 |
| P2 `S9-L04-Q2` | Write an IPO table for converting a non-negative length in centimetres to metres, then write pseudocode implementing that table. | 4 | 必做保留/按本课说明调整 |
| P3 `S9-L04-Q3` | The supplied pseudocode is run with Cost 18.25 and Paid 20. State its output and explain the role of the assignment. | 2 | 必做保留/按本课说明调整 |
### L053 Sequence, selection and iteration

知识/能力：顺序、选择、重复与初始化位置；项目知识映射：S9.06。
保留；真题只需辨认构造，不提前评分L055细化内容，共用题干明确已见。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L05-Q1` | Write pseudocode to input a person's non-negative whole-number age and output "Adult" for an age of at least 18, or "Minor" otherwise. State the outputs at ages 17, 18 and 19. | 4 | 必做保留/按本课说明调整 |
| P2 `S9-L05-Q2` | Write pseudocode to input four integers and output their sum once. Explain where the accumulator must be initialised. | 4 | 必做保留/按本课说明调整 |
| P3 `S9-L05-Q3` | Write pseudocode to read six temperature readings and output the number strictly greater than 80. The readings are integers; all six must be processed. | 4 | 必做保留/按本课说明调整 |
### L054 Structured English, flowcharts and pseudocode

知识/能力：结构化英语、flowchart、pseudocode转换；项目知识映射：S9.07。
保留四方向任务；真题包含开始标志27和停止标志0，不是只套一个简单求和循环。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L06-Q1` | Write pseudocode for this structured English: read an integer temperature; if it is below zero display Frost, otherwise display Clear; finish after one message. | 3 | 必做保留/按本课说明调整 |
| P2 `S9-L06-Q2` | Write pseudocode equivalent to the supplied flowchart. Level is a whole-number percentage between 0 and 100. State the output for Level 20. | 3 | 必做保留/按本课说明调整 |
| P3 `S9-L06-Q3` | Draw a flowchart for this structured English: input a person's height in whole centimetres; if the height is at least 120 output Enter, otherwise output Wait; end after that output. | 4 | 必做保留/按本课说明调整 |
| P4 `S9-L06-Q4` | Draw a flowchart equivalent to the supplied pseudocode. Show the accumulator initialisation, loop condition, counter update and final output explicitly. | 5 | 必做保留/按本课说明调整 |
### L055 Stepwise refinement to programmable detail

知识/能力：细化到可实现程度、边界与最终输出；项目知识映射：S9.08。
保留；与L053原题共享语境但本次执行不同任务，不能称未见真题。不可用同义词替换冒充细化。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L07-Q1` | Develop successive refinements of 'calculate the total cost of four entered prices' through one intermediate level to programmable operations. State where the total is initialised and output. | 4 | 必做保留/按本课说明调整 |
| P2 `S9-L07-Q2` | A taxi charges 5.00 for up to and including 3 km, plus 2.00 for each kilometre beyond 3. Develop fare calculation into complete pseudocode for a non-negative distance, allowing fractional kilometres. | 4 | 必做保留/按本课说明调整 |
| P3 `S9-L07-Q3` | An intermediate design reads three marks and says 'find and show their mean'. Identify two unresolved operations and replace each with an explicit step. | 2 | 必做保留/按本课说明调整 |
### L056 Logic statements and boundary conditions

知识/能力：AND/OR/NOT范围条件和反例；项目知识映射：S9.09。
保留区间OR错误与登录规则反例；真实流程图要求走路径证明错误并修正。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L08-Q1` | Write a logic expression that is true when Mark is between 0 and 100 inclusive. State its values for -1, 0, 100 and 101. | 2 | 必做保留/按本课说明调整 |
| P2 `S9-L08-Q2` | Write a condition for a discount given to anyone under 12 or anyone with Member TRUE. Complete the result column for the supplied cases. | 2 | 必做保留/按本课说明调整 |
| P3 `S9-L08-Q3` | Write a condition for login when PasswordCorrect is TRUE and Locked is FALSE. Explain why replacing AND with OR changes the rule. | 2 | 必做保留/按本课说明调整 |
### L057 Integrated design: a ticket purchase

知识/能力：购票/积分完整需求、输入依赖与顺序；项目知识映射：S9.02, S9.05, S9.08。
保留三项：数据接口、数值路径与欠款处理。真题积分三档和整美元规则增加另一种完整需求。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S9-L09-Q1` | For the purchase in this lesson, describe the data passed into charge calculation and the result passed to payment handling. Explain why printing the charge without returning or otherwise supplying its value is insufficient. | 3 | 必做保留/按本课说明调整 |
| P2 `S9-L09-Q2` | Calculate the results using the lesson's ticket rules for Quantity 3, PlacesLeft 7, Student FALSE and Paid 80. Calculate Subtotal, Total, Change and the new PlacesLeft, and state the output sequence. | 4 | 必做保留/按本课说明调整 |
| P3 `S9-L09-Q3` | Develop the final payment step of the lesson's purchase algorithm into explicit operations. Explain the result for Total 45, Paid 44, Quantity 2 and PlacesLeft 8. | 4 | 必做保留/按本课说明调整 |
### L058 Cambridge data types and declarations

知识/能力：六种类型、字面量、初值与值域；项目知识映射：S10.01。
保留当前四项；身份证式前导0和带引号日期必须根据用途/语法判断，不根据外观猜类型。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L01-Q1` | State suitable types for a number of pupils and a measured temperature of 18.6 °C. Justify each choice. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L01-Q2` | Write declarations and assignments for Grade containing the single letter A and AccountCode containing 0048. | 2 | 必做保留/按本课说明调整 |
| P3 `S10-L01-Q3` | State suitable types for IsOpen and an appointment date, and give one valid value for each. Use dd/mm/yyyy for the date. | 2 | 必做保留/按本课说明调整 |
| P4 `S10-L01-Q4` | Describe what DECLARE Prices : ARRAY[1:8] OF REAL creates and why a shop might also use a file. | 2 | 必做保留/按本课说明调整 |
### L059 Records: defining, reading and saving structured data

知识/能力：record类型/实例、字段读写与值独立性；项目知识映射：S10.02。
保留；真题五字段综合定义，Practice负责第二记录修改后是否影响第一记录的理解。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L02-Q1` | Explain why a record suits one product with a description, price and in-stock flag. State a suitable type for each field. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L02-Q2` | Write pseudocode to define ProductRecord with Description : STRING and Price : REAL, then declare Product of that type. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L02-Q3` | State all outputs from the supplied member algorithm for input Tariq and 9 and explain which statement saves a BOOLEAN into the record. | 2 | 必做保留/按本课说明调整 |
| P4 `S10-L02-Q4` | Using the supplied two-record algorithm, add First.YearGroup <- 13 immediately before the outputs. State both final year groups and explain why they differ. | 2 | 必做保留/按本课说明调整 |
### L060 Array terminology, indices and bounds

知识/能力：索引、上下界、容量和合法访问；项目知识映射：S10.03。
保留非1起点和边界任务；真实Product题把维度、元素数、声明放一起，显示三者区别。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L03-Q1` | For Ages : ARRAY[3:7] OF INTEGER with values 15, 17, 16, 15, 18 in index order, identify the array name, the index in Ages[5], and its stored value. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L03-Q2` | Calculate the capacity of ARRAY[−2:2] OF INTEGER and state whether indices −3, 0 and 2 are valid. | 2 | 必做保留/按本课说明调整 |
| P3 `S10-L03-Q3` | Grid is ARRAY[1:3, 0:4] OF CHAR. State its number of dimensions, total capacity and the two upper bounds. | 2 | 必做保留/按本课说明调整 |
### L061 Selecting and using one-dimensional arrays

知识/能力：1D遍历、初始化、严格条件和数据顺序；项目知识映射：S10.04, S10.05。
P2例行累加trace可选；保留结构选择、实现、严格条件计数和P5全负数最大/最小值追踪。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L04-Q1` | A club stores one attendance count for each of 12 meetings. Select a structure and write its declaration. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L04-Q2` | State the Total after each iteration and both outputs from the supplied array-total algorithm for inputs 5, 0, 8, 2. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S10-L04-Q3` | Write pseudocode to input four INTEGER marks into Marks[1:4], then output their total and the third mark. Explain where Total is initialised. | 4 | 必做保留/按本课说明调整 |
| P4 `S10-L04-Q4` | State the output of the supplied conditional-count program with marks [7,6,7,9] and threshold 7. Then change only the comparison to > and give the new output. | 2 | 必做保留/按本课说明调整 |
| P5 `S10-L04-Q5` | State both candidates after each comparison in the supplied extremes program for [−8,−3,−3,−10]. Explain why starting Largest at 0 would fail. | 3 | 必做保留/按本课说明调整 |
### L062 Selecting and using two-dimensional arrays

知识/能力：2D索引、嵌套遍历、行列条件及总量核对；项目知识映射：S10.04, S10.05。
保留四项。真实题需要偶数行：在作答前供给官方guide中MOD定义和无答案的操作说明；尚未讲MOD时把该题留到L074回访，不冒充当前无前置缺口。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L05-Q1` | A cinema has 6 rows of 10 seats and records whether each seat is occupied. Select and declare an array and explain the two indices. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L05-Q2` | State the positions visited and both outputs from the supplied 2D algorithm for inputs 2, 3, 5, 1, 0, 4. | 2 | 必做保留/按本课说明调整 |
| P3 `S10-L05-Q3` | Write pseudocode to input a 2 by 3 INTEGER array Scores and output a separate total for each row. | 4 | 必做保留/按本课说明调整 |
| P4 `S10-L05-Q4` | The supplied combined-total program receives [1,0,−1] then [2,3,4] as its rows. State all six outputs and explain how the two independent checks agree. | 2 | 必做保留/按本课说明调整 |
### L063 Linear search using arrays

知识/能力：线性查找、首个匹配、未找到和停止；项目知识映射：S10.06。
保留完整算法、重复值和未找到检查。候选s25/22 Q7(a)需函数/二维客户记录，适合后续；本课不硬塞综合题。L082首个空记录真题回访线性搜索。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L06-Q1` | State the visited indices and output from the supplied search for values 8, 3, 5, 3, 1 and target 3. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L06-Q2` | Using the supplied search, describe what happens for values 8, 3, 5, 3, 1 and target 6. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L06-Q3` | Write a complete linear search that inputs five INTEGER values and a target, then outputs the first matching 1-based index or 0 if absent. | 5 | 必做保留/按本课说明调整 |
### L064 Bubble sort using arrays

知识/能力：冒泡相邻交换、边界收缩与无交换停止；项目知识映射：S10.06。
保留三项；s25/21 Q6(b)已核验但含procedure与二维成对交换，安排L093，当前不把8分原题改编成一维短题。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L07-Q1` | State the array after each adjacent comparison in one left-to-right ascending bubble-sort pass on [6, 2, 5, 1]. | 3 | 必做保留/按本课说明调整 |
| P2 `S10-L07-Q2` | Write the three assignments that swap Values[Index] and Values[Index + 1], using Temp. Explain the purpose of Temp. | 4 | 必做保留/按本课说明调整 |
| P3 `S10-L07-Q3` | Explain where Swapped is reset in the supplied bubble sort, when it becomes TRUE, and why the inner upper bound is Last − 1. | 3 | 必做保留/按本课说明调整 |
### L065 Why files are needed and text-file pseudocode

知识/能力：文本文件、模式、EOF与记录分组；项目知识映射：S10.07。
五项保留：文件必要性、空行读取、WRITE、APPEND和P5完整存取回读各有不同作用。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L08-Q1` | Explain why an attendance system saves a file at the end of a session. Select modes for loading yesterday's register and adding today's new entry. | 3 | 必做保留/按本课说明调整 |
| P2 `S10-L08-Q2` | State every output from the supplied line-counting algorithm for a file whose lines are Red, an empty line, and Blue and explain why the blank line does not end the loop. | 2 | 必做保留/按本课说明调整 |
| P3 `S10-L08-Q3` | Write complete pseudocode to replace Names.txt with exactly three input lines, including opening and closing the file. | 4 | 必做保留/按本课说明调整 |
| P4 `S10-L08-Q4` | Write pseudocode to append one input line to Names.txt without losing its existing contents. | 3 | 必做保留/按本课说明调整 |
| P5 `S10-L08-Q5` | Names.txt initially contains Keep. Run the supplied save/read-back program. Give the final file contents, all outputs and the effect of changing only its APPEND mode to WRITE. | 3 | 必做保留/按本课说明调整 |
### L066 Abstract data types

知识/能力：ADT接口行为与底层表示区别；项目知识映射：S10.08。
保留三项理解检查；L067–071各有真实操作题，本课不重复先背一次定义；不宣称检索不到ADT真题。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L09-Q1` | Define an abstract data type and illustrate both parts using a queue. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L09-Q2` | Identify whether each statement describes ADT behaviour or an implementation detail: pop removes the newest item; items occupy Array[1:10]; Top stores an index. | 2 | 必做保留/按本课说明调整 |
| P3 `S10-L09-Q3` | Two stack implementations receive PUSH 2, PUSH 5, POP. One returns 5 and the other returns 2. Explain whether both satisfy the same stack ADT. | 2 | 必做保留/按本课说明调整 |
### L067 Stacks and LIFO operations

知识/能力：LIFO、top约定、入栈出栈与边界；项目知识映射：S10.09, S10.10。
保留三项，明确top指最后占用格；真题只补文字步骤与表示，符合AS不要求ADT实现伪代码的深度。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L10-Q1` | A stack receives PUSH 7, PUSH 4, POP, PUSH 9, POP. State both returned values and the remaining stack. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L10-Q2` | A stack uses Stack[1:4] and Top as the last occupied index. Top is 2 with values A, B. Describe pushing C, editing the top to D, then popping it. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L10-Q3` | Explain why a stack suits nested subroutine return information, and state the empty condition for the Top convention used in this lesson. | 2 | 必做保留/按本课说明调整 |
### L068 Queues and FIFO operations

知识/能力：FIFO、循环复用与有效元素数量；项目知识映射：S10.09, S10.10。
P1简单FIFO弹出顺序入口口答；P2回绕、P3修改但不换位置、P4空队列再次入队保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L11-Q1` | A queue receives ENQUEUE 6, ENQUEUE 2, DEQUEUE, ENQUEUE 9, DEQUEUE. State both returned values and the remaining item. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S10-L11-Q2` | A circular queue has capacity 3 with Front = 2, Rear = 3, Count = 2; indices 2 and 3 hold B and C. Describe enqueueing D. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L11-Q3` | An allowed edit changes a queued job's filename without changing its position. State which data changes and which of Front, Rear and Count change. Explain why FIFO is preserved. | 3 | 必做保留/按本课说明调整 |
| P4 `S10-L11-Q4` | A circular queue has capacity 4, F = 4, R = 1, C = 2, with A in slot 4 and B in slot 1. Dequeue twice, attempt another dequeue, then enqueue Z. State the final variables, removal results and Z's position. | 3 | 必做保留/按本课说明调整 |
### L069 Linked-list features and operations

知识/能力：链关系、头尾与插入时保存后继；项目知识映射：S10.09, S10.10。
四项保留：循链、插入、头删除和单节点变空，最后一项不能被一般三节点追踪替代。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L12-Q1` | Head = 3. Data[1] = B, Next[1] = 0; Data[2] = unused; Data[3] = A, Next[3] = 1. State the traversal order and explain why slot 2 is ignored. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L12-Q2` | In the lesson's starting diagram, insert X at free slot 3 after A. State the data assignment and both link changes, in a safe order. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L12-Q3` | Using the starting diagram, describe editing C to Z and then deleting head A. State the final head and data order. | 3 | 必做保留/按本课说明调整 |
| P4 `S10-L12-Q4` | A list consists only of node 2 containing P with Head = 2 and Next[2] = 0. Delete it, then reuse slot 2 for Q in the empty list. Give the head and link changes at both stages. | 3 | 必做保留/按本课说明调整 |
### L070 Implementing ADT operations with arrays

知识/能力：数组下标、逻辑链与free链互斥；项目知识映射：S10.10。
P1数组栈回顾可选；P2环形有效位置、P3active/free互斥、P4满后删除再分配保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L13-Q1` | A capacity-5 stack has Top = 3. Describe one pop followed by editing the new top; state which positions remain active. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S10-L13-Q2` | A capacity-5 circular queue has Front = 4, Rear = 1 and Count = 3. State its active positions, the position used by the next enqueue and the full condition. | 3 | 必做保留/按本课说明调整 |
| P3 `S10-L13-Q3` | Initially the active chain is 2 → 4 → 0 and the free chain is 1 → 3 → 0. Allocate slot 1 after node 2, then delete node 4. State both final chains and explain why they must be disjoint. | 3 | 必做保留/按本课说明调整 |
| P4 `S10-L13-Q4` | After the lesson's four-slot free-list trace reaches active chain 2→1→4→3→0 and Free = 0, delete node 1, then reuse it as the new head. State both chains after each operation. | 3 | 必做保留/按本课说明调整 |
### L071 Choosing and combining data structures

知识/能力：队列/栈/记录协同、失败不进undo；项目知识映射：S10.02, S10.04, S10.05, S10.07, S10.09。
P2队列/undo的一般选择和P3playlist链表复述转可选；P1类型选择、P4订座失败/撤销、P5record数组输入保留。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S10-L14-Q1` | A school retains one total per class and one mark per pupil per test. Suggest a suitable array dimension for each and explain the index meanings. | 2 | 必做保留/按本课说明调整 |
| P2 `S10-L14-Q2` | A drawing program queues commands received from a device and retains completed changes for Undo. Justify a queue for the incoming commands and a stack for the undo history. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S10-L14-Q3` | A programme of performances often inserts an act after a known act. Explain why a linked list can be suitable and identify the links changed during insertion. | 2 | 可选巩固或入口口答，不计主配置 |
| P4 `S10-L14-Q4` | Start a fresh 2×2 performance with every seat FALSE, an empty undo stack and a queue holding A(1,2), B(1,2), C(2,1). Apply the lesson's rules to all requests, then Undo twice. State the outcomes, undo order, final occupancy and all log events. Both ADTs have capacity 3. | 4 | 必做保留/按本课说明调整 |
| P5 `S10-L14-Q5` | RequestRecord is already defined with ID : STRING, Row : INTEGER and Seat : INTEGER. Occupied is already declared as ARRAY[1:2,1:2] OF BOOLEAN and every cell is FALSE. Write pseudocode to declare Req of RequestRecord, save request A for row 1, seat 2 in its fields, and display that seat's current occupancy through Req's fields. State the output. | 3 | 必做保留/按本课说明调整 |
### L072 Translating descriptions into Cambridge pseudocode

知识/能力：从给定设计保留输入、分支和最终输出；项目知识映射：S11.01。
P1面积计算入门可选；保留翻译、初始化位置、sentinel；真题100整数只累计positive，不额外加输入验证。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L01-Q1` | Write pseudocode for this structured English: input a real-valued length and width; multiply them; output the area. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L01-Q2` | Write pseudocode equivalent to the supplied three-value flowchart. State the output for inputs -4, 2 and 7. | 3 | 必做保留/按本课说明调整 |
| P3 `S11-L01-Q3` | Explain why moving Count <- 0 inside the loop changes the three-value algorithm. Use inputs 2, 3 and -1. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L01-Q4` | Write complete pseudocode for the supplied flowchart. Inputs are INTEGER temperatures ending with sentinel 999. State the outputs for 29, 30, 31, 999 and for 999 alone. | 5 | 必做保留/按本课说明调整 |
### L073 Declarations, assignment and input/output

知识/能力：声明/常量/赋值与值拷贝；项目知识映射：S11.02。
三项保留；原题常数3.75尚写成literal，要求提出更佳表示及理由，不把原程序说成已用常量。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L02-Q1` | Write declarations for a whole-number stock count, a real price, a Boolean in-stock flag, a single grade character and a fixed discount rate of 0.10. | 2 | 必做保留/按本课说明调整 |
| P2 `S11-L02-Q2` | State the final values of A and B after A <- 4, B <- A and A <- A + 3. Explain why B has that value. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L02-Q3` | Write pseudocode that inputs an integer Quantity and a real Price, calculates Total <- Price * Quantity, and outputs Total. | 3 | 必做保留/按本课说明调整 |
### L074 Arithmetic and logical expressions

知识/能力：算术/逻辑、DIV/MOD和条件等价；项目知识映射：S11.02。
P2简单年龄AND可选；P1、P3、P4保留；此处回访L062的even判断，仍用同一原题不重复累计分。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L03-Q1` | Calculate 5 + 2 * 6, (5 + 2) * 6, 19 DIV 4 and 19 MOD 4. | 2 | 必做保留/按本课说明调整 |
| P2 `S11-L03-Q2` | Write a Boolean expression for entry when Age is at least 18 and Suspended is FALSE. Evaluate Age 18 with Suspended FALSE. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S11-L03-Q3` | Write assignments that store the complete boxes and loose items when Quantity non-negative items are packed in boxes of 8. State both values for Quantity 27. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L03-Q4` | Explain why (Value >= 10) OR (Value <= 20) is unsuitable for accepting only integers from 10 to 20 inclusive. Give an input below and above the interval, then correct the condition. | 3 | 必做保留/按本课说明调整 |
### L075 Built-in routines and string functions

知识/能力：按契约使用函数、嵌套与返回类型；项目知识映射：S11.03。
五项保留，函数列表随题给出；历史TO_UPPER允许STRING时遵从该卷insert，不替换成仅CHAR的其他函数。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L04-Q1` | State INT(8.9) and the smallest and largest possible values of INT(RAND(4)) + 2, using the numeric contracts in this lesson. | 2 | 必做保留/按本课说明调整 |
| P2 `S11-L04-Q2` | Using the supplied lesson interfaces, calculate LENGTH("COMPUTER"), MID("COMPUTER", 3, 4) and RIGHT("COMPUTER", 3). | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L04-Q3` | A supplied function TAKE(Text : STRING, Count : INTEGER) returns the first Count characters. Write an expression that obtains the first four characters of "NETWORK" and state the result. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L04-Q4` | Write complete pseudocode that inputs a code of exactly eight characters: two letters, four digit characters, then two letters. MID(S, Start, Count) returns Count characters from one-based Start; RIGHT(S, Count) returns the final Count characters. Output the four digit characters, a hyphen and the final letters as one STRING. State the result for IT0007XY. | 4 | 必做保留/按本课说明调整 |
| P5 `S11-L04-Q5` | State LENGTH("A B!"), UCASE('7') and "Ada" & " " & "Lovelace". LENGTH counts all characters; UCASE accepts one CHAR and returns non-lower-case characters unchanged. Explain why UCASE("ab") does not match this interface. | 3 | 必做保留/按本课说明调整 |
### L076 IF, ELSE and CASE selection

知识/能力：IF/CASE顺序、嵌套与范围覆盖；项目知识映射：S11.04。
P1简单threshold可选；P2、P3保留。真实CASE要解释遮蔽和OTHERWISE，不仅列最终输出。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L05-Q1` | Write an IF/ELSE statement that outputs "Pass" for Mark at least 50 and "Fail" otherwise. State the output for Mark 50. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L05-Q2` | State the outputs of the supplied nested selection for Age 18, Member FALSE, and for Age 20, Member TRUE. Explain the role of the outer comparison. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L05-Q3` | Write CASE pseudocode for integer Option: 1 outputs "Add", 2 outputs "Remove" and all other values output "Unknown". | 2 | 必做保留/按本课说明调整 |
### L077 Count-controlled iteration

知识/能力：FOR边界、STEP、零次和嵌套；项目知识映射：S11.04。
四项有独立条件，全部保留；真实CheckTotal必须保留初始化小问，不能在题干提前给出正确数组状态。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L06-Q1` | State the control-variable values and number of iterations for FOR Index <- 3 TO 6. | 2 | 必做保留/按本课说明调整 |
| P2 `S11-L06-Q2` | Write a FOR loop that outputs 10, 8, 6, 4 and 2 in that order. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L06-Q3` | State the output of the supplied total program for Count 0 and for Count 1 followed by Value 9. State how many Value inputs each run reads. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L06-Q4` | State the ordered Row/Column output pairs and the final Count from the supplied nested-loop program. Explain what happens to Column when Row changes to 2, and where a separate per-row counter would be initialised. | 3 | 必做保留/按本课说明调整 |
### L078 Post-condition and pre-condition loops

知识/能力：WHILE/REPEAT、sentinel与双停止条件；项目知识映射：S11.04。
P3通用比较入口口答；P1验证、P2哨兵、P4guard追踪保留；真题容量上限和不保存99.9需同时满足。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L07-Q1` | Write a REPEAT loop to read an integer Rating until it is from 1 to 5 inclusive. State the number of inputs for 0, 6 and 5. | 2 | 必做保留/按本课说明调整 |
| P2 `S11-L07-Q2` | Calculate the output of the supplied sentinel total for 2, 0, 5 and -1. State why the final input is excluded. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L07-Q3` | Compare the minimum number of body executions of WHILE and REPEAT, and explain what a TRUE condition means in each. | 2 | 可选巩固或入口口答，不计主配置 |
| P4 `S11-L07-Q4` | Explain the purpose of the outer IF in the supplied REPEAT version of the sentinel total. State the output for first input -1. Describe the change in behaviour if the guard is removed while the body still adds Value before reading the next input. | 3 | 必做保留/按本课说明调整 |
### L079 Selecting and justifying a loop structure

知识/能力：按已知次数/至少一次/停止规则选循环；项目知识映射：S11.05。
P1固定次数简单题可选；P2至少一次、P3最大尝试条件、P4等价转换保留；已见L054题此次只justify。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L08-Q1` | Justify a loop structure for reading exactly seven daily rainfall values. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L08-Q2` | Justify a loop structure for asking for a positive integer until a positive value is entered. State a suitable stopping or continuation condition. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L08-Q3` | Explain the choice of WHILE for the supplied password program and why its condition joins the restrictions with AND. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L08-Q4` | Compare the supplied REPEAT password program with the WHILE program in this lesson. Explain why no initial Password assignment is needed here, why UNTIL uses OR, and the result for x, y, open. | 3 | 必做保留/按本课说明调整 |
### L080 Procedures and parameter passing

知识/能力：procedure、实参形参、BYVAL/BYREF效果；项目知识映射：S11.06。
P1Banner基础可选；P4和P5作为真实交换/副本交换的对照保留。真题需按调用顺序读到下一条OUTPUT。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L09-Q1` | Write a procedure Banner() that outputs "Welcome", and write its call. Explain why a procedure is suitable. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L09-Q2` | State all three outputs of the supplied parameter-passing program. Explain why the second output differs from the first. | 2 | 必做保留/按本课说明调整 |
| P3 `S11-L09-Q3` | Write a procedure Increase(BYREF Total : INTEGER, BYVAL Amount : INTEGER) that adds Amount to Total. Write a call that adds 4 to caller variable Score. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L09-Q4` | State the caller values A and B after each assignment in Swap for inputs 6 and 2. Explain the role of Temp and give the caller result for equal inputs 5 and 5. | 3 | 必做保留/按本课说明调整 |
| P5 `S11-L09-Q5` | State all outputs of the supplied SwapCopy program. Identify its two formal parameters and explain why main still has the original values after the call. | 3 | 必做保留/按本课说明调整 |
### L081 Functions, interfaces and return values

知识/能力：function接口、返回值、提前RETURN和调用位置；项目知识映射：S11.07, S11.08。
P1Double直接代入可选；保留其余四项；真实GetNum遍历字符串，返回在循环后，大小写敏感。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L10-Q1` | Write a function Double(Value : INTEGER) returning twice its argument, and an assignment that stores Double(6) in Result. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L10-Q2` | For FUNCTION Area(Length : REAL, Width : REAL) RETURNS REAL and the call Area(3.0, Side), identify the parameters, arguments and return type. | 3 | 必做保留/按本课说明调整 |
| P3 `S11-L10-Q3` | Explain why a tax calculation is suitable as a function and a print-heading action is suitable as a procedure. State how a caller uses each. | 2 | 必做保留/按本课说明调整 |
| P4 `S11-L10-Q4` | State the output of the supplied DeliveryFee program for Quantity 0, 1 and 4. Explain why the later RETURN does not override the zero result. | 3 | 必做保留/按本课说明调整 |
| P5 `S11-L10-Q5` | Describe the interface of ReadRating() in the supplied program. State the caller output for inputs 0, 6, 5, and explain why its local Rating need not be an argument. | 3 | 必做保留/按本课说明调整 |
### L082 Clear and efficient Cambridge pseudocode

知识/能力：避免重复工作、一次遍历和保持语义；项目知识映射：S11.09。
P1解释重复与P2改写合并由P2作答；P3不变表达式罗列由P4边界深化；真题首个空记录尽早停止并处理全满。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L11-Q1` | Explain why the two Mark >= 50 tests in the supplied program are redundant, and state a condition under which combining them would be unsafe. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L11-Q2` | Write a revised version of the supplied repeated-test program to use one threshold comparison while preserving outputs. State the output for Mark 50. | 3 | 必做保留/按本课说明调整 |
| P3 `S11-L11-Q3` | A loop computes Width * Height on every iteration although neither variable changes. Explain when the product can be calculated once before the loop and give the benefit. | 2 | 可选巩固或入口口答，不计主配置 |
| P4 `S11-L11-Q4` | Describe a change to the supplied area-reporting program that avoids repeated multiplication for positive Count. State the outputs and multiplication counts before and after the change for Width 3, Height 4, Count 3. Explain why the same saving claim would not apply for Count 0. | 3 | 必做保留/按本课说明调整 |
| P5 `S11-L11-Q5` | Write a revision of the supplied two-traversal marks program that performs one processing read per stored element while preserving Total and Passed. State both results for 49, 50, 80, 21, 50 and compare processing reads, excluding input. | 4 | 必做保留/按本课说明调整 |
### L083 Building a complete structured program

知识/能力：整合程序、随机只生成一次和正确终止；项目知识映射：S11.01, S11.04, S11.06, S11.07。
P1流程提纲作口头准备；P2追踪需使用原有完整程序，P3结构职责要求解释变化影响。真实guessing game独立实现，不用现有教学例原样照抄。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S11-L12-Q1` | Using the integrated design in this lesson, write the main program's control outline from accumulator initialisation to final output. Explain why RecordMark must follow the validation loop. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S11-L12-Q2` | Calculate the results of the integrated program for attempts 20, -5, 60, 80. State accepted marks, final Total, mean and Passed. | 3 | 必做保留/按本课说明调整 |
| P3 `S11-L12-Q3` | Write the ValidMark and RecordMark definitions required by the integrated design. Explain the return type and each parameter mode. | 3 | 必做保留/按本课说明调整 |
### L084 Program development life cycles

知识/能力：阶段职责与waterfall/iterative/RAD选择；项目知识映射：S12.01。
P4RAD定义已嵌入P5条件判断，转可选；真题需求变化与上市时间需分别回应。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L01-Q1` | Describe the purpose of a development life cycle and identify the stage responsible for each output: agreed user requirements, a module design, executable statements, recorded test results and a post-release correction. | 4 | 必做保留/按本课说明调整 |
| P2 `S12-L01-Q2` | A tax calculator has fixed rules and requires written approval of each stage. Explain one benefit and one drawback of using waterfall. | 2 | 必做保留/按本课说明调整 |
| P3 `S12-L01-Q3` | A timetable team revises its interface after each demonstration. Explain how iterative development helps and give one management problem it creates. | 2 | 必做保留/按本课说明调整 |
| P4 `S12-L01-Q4` | Describe three defining features of RAD. Explain why an interface project with available users and a two-week prototype deadline could use it. | 4 | 可选巩固或入口口答，不计主配置 |
| P5 `S12-L01-Q5` | A booking form has a fixed 1–30 range rule but uncertain screen messages. Staff can review a prototype daily. Explain how RAD could obtain useful feedback, and how your choice would change if staff could review only at final delivery. | 3 | 必做保留/按本课说明调整 |
### L085 Structure charts and module interfaces

知识/能力：结构图层级、数据方向、条件/重复调用；项目知识映射：S12.02。
P1符号口答、P2简单三模块可选；保留方向解释、图→程序、复杂图和执行追踪四种任务。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L02-Q1` | State what a rectangle represents in a structure chart and explain what the connecting hierarchy lines show. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S12-L02-Q2` | Draw a structure chart for ProcessOrder calling ReadOrder, CalculateCost and DisplayCost in sequence. Label the quantity, price and cost flows specified in this lesson. | 4 | 可选巩固或入口口答，不计主配置 |
| P3 `S12-L02-Q3` | Explain why ReadOrder uses by-reference parameters while CalculateCost can use by-value parameters. | 2 | 必做保留/按本课说明调整 |
| P4 `S12-L02-Q4` | Write the parent ProcessOrder procedure for the supplied chart, including declarations, the reader call, the calculation and the display call. The three child definitions are those shown in the worked example. | 4 | 必做保留/按本课说明调整 |
| P5 `S12-L02-Q5` | Draw a structure chart from this specification: ProcessBatch reads non-negative OrderCount and calls ProcessOrder that many times, or outputs No orders for zero. ProcessOrder calls ReadOrder to obtain Quantity, UnitPrice and Member, CalculateCost to return Cost, and DisplayCost to display it. CalculateCost calls MemberCost when Member is TRUE, otherwise StandardCost; both receive Quantity and UnitPrice and return the price. Show repetition, conditional calls and labelled data transfers. | 6 | 必做保留/按本课说明调整 |
| P6 `S12-L02-Q6` | Using the supplied complete batch program, trace inputs 2, 1, 20.00, TRUE, 4, 2.00, FALSE. State both outputs, name the selected lower-level calculation for each order, and explain the input consumed when OrderCount is zero. | 3 | 必做保留/按本课说明调整 |
### L086 State-transition diagrams

知识/能力：状态、事件、guard、自环及图种区别；项目知识映射：S12.03。
P1定义口答；其余保留；原题四状态与事件表必须同时可见，不能只贴未标箭头的残图。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L03-Q1` | Describe the purpose of a state-transition diagram and what an event-labelled arrow records. | 2 | 可选巩固或入口口答，不计主配置 |
| P2 `S12-L03-Q2` | State the turnstile state after each event in push, coin, pass, starting from Locked. Explain the first result. | 2 | 必做保留/按本课说明调整 |
| P3 `S12-L03-Q3` | Compare a structure chart and a state-transition diagram as ways of documenting a login system. | 2 | 必做保留/按本课说明调整 |
| P4 `S12-L03-Q4` | The supplied upload diagram starts in Ready. State every state after start, complete [Valid = FALSE], retry, progress, complete [Valid = TRUE]. Explain why the two complete events have different outcomes and whether a new start is possible at the end. | 3 | 必做保留/按本课说明调整 |
### L087 Finding and correcting program errors

知识/能力：语法/逻辑/运行错误、不可达分支与边界；项目知识映射：S12.04。
P2一般预防建议可选；保留定位、分类、反例与修复后保证范围；真实200元素算法保留全码与line numbers。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L04-Q1` | Identify the error type in each case: a missing ENDIF; a syntactically valid formula that subtracts instead of adding; an attempted division by zero during execution. | 3 | 必做保留/按本课说明调整 |
| P2 `S12-L04-Q2` | Explain two ways to reduce faults before a program is released: using indentation and reviewing the design against agreed requirements. | 2 | 可选巩固或入口口答，不计主配置 |
| P3 `S12-L04-Q3` | Describe the execution of the supplied faulty program with Mark 50. State the actual and required output, identify the faulty comparison and write a correction. | 3 | 必做保留/按本课说明调整 |
| P4 `S12-L04-Q4` | Explain why the average program checks Count > 0 before division. State the outputs for Total 24, Count 3 and for Total 0, Count 0, and explain why both tests are needed. | 3 | 必做保留/按本课说明调整 |
| P5 `S12-L04-Q5` | Locate and identify the fault in this supplied program, state the exact correction, and explain what can and cannot be concluded when the construct is repaired. The requirement is Pass for an INTEGER mark of at least 50, otherwise Fail. | 3 | 必做保留/按本课说明调整 |
### L088 Testing methods through development

知识/能力：dry run/walkthrough/box方法与stub、用户验收；项目知识映射：S12.05。
P4stub定义由P6替换真实模块深化，P7与P5测试目的重复可选；真题acceptance补足最终用户合同要求。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L05-Q1` | Complete a dry run of the positive-total program for inputs 2, 0, 5. State Total after each iteration and the final output. | 2 | 必做保留/按本课说明调整 |
| P2 `S12-L05-Q2` | Describe how three team members could perform a walkthrough of a registration algorithm and state one useful outcome. | 3 | 必做保留/按本课说明调整 |
| P3 `S12-L05-Q3` | Explain how white-box and black-box testing could each guide the choice of tests for the supplied member-discount program. Give a member input and a non-member input with expected prices. | 4 | 必做保留/按本课说明调整 |
| P4 `S12-L05-Q4` | A booking caller uses an unfinished IsAvailable function. Explain how a stub can help test the caller and identify one limitation. | 3 | 可选巩固或入口口答，不计主配置 |
| P5 `S12-L05-Q5` | Identify and justify the method for each purpose: internal pre-release fault finding; selected customers trying their own devices; customer sign-off against agreed report requirements. | 3 | 必做保留/按本课说明调整 |
| P6 `S12-L05-Q6` | The TRUE stub is used with RoomID 102, although the real fixture says room 102 is unavailable. State the expected stub-based output and explain what this does and does not verify. Then specify the replacement tests for the real function, whose only IDs are 101 (available) and 102 (unavailable). | 3 | 必做保留/按本课说明调整 |
| P7 `S12-L05-Q7` | Suggest a suitable method and a concrete case for each purpose: check both branches of IF Member; discover booking-form problems on customers’ own devices; decide whether the customer’s agreed 1–30 capacity rule is met. | 3 | 可选巩固或入口口答，不计主配置 |
### L089 Test strategies and test plans

知识/能力：策略/计划、expected/actual与成组记录；项目知识映射：S12.06。
P3策略清单转口答；P4完整计划保留。真题传感器不能产生负数，禁止为了凑invalid而违背原假设。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L06-Q1` | Explain why a booking project needs both an overall test strategy and a record of individual test cases. | 2 | 必做保留/按本课说明调整 |
| P2 `S12-L06-Q2` | A test row for a 30-person room records Quantity 31, expected Rejected and actual Accepted. State the outcome and describe two records needed after the fault is corrected. | 3 | 必做保留/按本课说明调整 |
| P3 `S12-L06-Q3` | Describe three likely contents of a test strategy other than a list of individual input values. | 3 | 可选巩固或入口口答，不计主配置 |
| P4 `S12-L06-Q4` | Develop a small test plan for independent INTEGER requests accepted exactly from 1 to 30. Include an ordinary valid request, both valid endpoints and values just outside them. Give identifiers, purpose, starting conditions, inputs and expected results. State which fields must be completed after each run and two strategy decisions needed before running the cases. | 6 | 必做保留/按本课说明调整 |
### L090 Normal, abnormal and boundary test data

知识/能力：normal/extreme/invalid和能区分错误的测试；项目知识映射：S12.07。
P4内点不足由P5故障区分深化；保留其他。入选原题MS有一个缺99的备选与valid限制冲突，单独记录，示范只选符合题干的有效路径。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L07-Q1` | Give one normal integer mark and the valid extreme marks for the inclusive range 0 to 100. State their expected results. | 2 | 必做保留/按本课说明调整 |
| P2 `S12-L07-Q2` | Give abnormal inputs that test the range and the type checks of an integer mark field from 0 to 100, and state the expected responses. | 2 | 必做保留/按本课说明调整 |
| P3 `S12-L07-Q3` | Write four username test strings to check just below, on, on and just above the limits of 6 to 12 characters. State the expected results in that order. | 2 | 必做保留/按本课说明调整 |
| P4 `S12-L07-Q4` | Explain why testing only mark 55 cannot distinguish the correct range check from one that rejects 0 and 100. Give the additional tests that reveal that particular defect. | 2 | 可选巩固或入口口答，不计主配置 |
| P5 `S12-L07-Q5` | For the same inclusive 1–30 rule, a tester proposes only 10, 15 and 20. Explain the weakness, select data that expose erroneous > 1 and < 30 comparisons, and give a just-inside value that checks whether only endpoints are accepted. | 3 | 必做保留/按本课说明调整 |
### L091 Corrective, adaptive and perfective maintenance

知识/能力：按变更原因区分corrective/adaptive/perfective；项目知识映射：S12.08。
四项保留，不能只看改哪个文件判断维护种类；只选s25/22有效1(b)(i)，不采用统一给分小问。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L08-Q1` | Explain two reasons why a delivered booking system may need maintenance after acceptance. | 2 | 必做保留/按本课说明调整 |
| P2 `S12-L08-Q2` | Identify and explain the maintenance type for each request: restore an omitted required report row; support a new printer interface; add a requested chart. | 3 | 必做保留/按本课说明调整 |
| P3 `S12-L08-Q3` | Explain why two edits to the same invoice calculation could belong to different maintenance categories: fixing an incorrect existing tax rate and implementing a newly legislated tax rate. | 2 | 必做保留/按本课说明调整 |
| P4 `S12-L08-Q4` | A booking program correctly enforces a 30-person limit. The building is modified and its approved capacity becomes 35. Describe the impact analysis and tests needed to implement the changed requirement. Explain why changing the expected result for Quantity 31 is justified here but was not justified when correcting the original <= 31 defect. | 3 | 必做保留/按本课说明调整 |
### L092 Analysing and amending an existing program

知识/能力：分析已有规格、改变接口/格式及回归验证；项目知识映射：S12.09。
P1原功能口答，P4初始化缺陷为可选；P2、P3整程序修改与测试、P5接口改动、P6实参顺序保留。真题加密新字段使旧separator失效，增加格式修订方法。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `S12-L09-Q1` | Describe the purpose, input assumptions, loop and output of the original mark program. State its output for 49, 50, 69, 70. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `S12-L09-Q2` | Write an amended version of the supplied program that retains PassCount and also outputs MeritCount for marks at least 70. Include declarations, initialisation, processing and both outputs. | 5 | 必做保留/按本课说明调整 |
| P3 `S12-L09-Q3` | State the expected outputs of the amended program for 49, 50, 69, 70 and for 70, 80, 90, 100. Explain the purpose of each set. | 3 | 必做保留/按本课说明调整 |
| P4 `S12-L09-Q4` | Explain why placing MeritCount <- 0 immediately after INPUT Mark would be a defect in the enhancement, using four marks of 70. | 2 | 可选巩固或入口口答，不计主配置 |
| P5 `S12-L09-Q5` | Analyse the supplied fixed-50 modular program and write a complete amendment that inputs one INTEGER PassMark in 0–100 before its four validated marks, counts Mark >= PassMark and outputs the count. Keep the four-mark traversal and give the result for threshold 60 with marks 59, 60, 61, 0. | 5 | 必做保留/按本课说明调整 |
| P6 `S12-L09-Q6` | In the supplied amended program, explain the effect of replacing IsPass(Mark, PassMark) with IsPass(PassMark, Mark), using threshold 60 and marks 59, 60, 61, 0. Give a compatibility test for the unchanged threshold 50 and its expected result. | 3 | 必做保留/按本课说明调整 |
### L093 Paper 2 integrated review and pseudocode clinic

知识/能力：读题选择方法、跨模块实现与测试解释；项目知识映射：S9.01, S9.02, S9.03, S9.04, S9.05, S9.06, S9.07, S9.08, S9.09, S10.01, S10.02, S10.03, S10.04, S10.05, S10.06, S10.07, S10.08, S10.09, S10.10, S11.01, S11.02, S11.03, S11.04, S11.05, S11.06, S11.07, S11.08, S11.09, S12.01, S12.02, S12.03, S12.04, S12.05, S12.06, S12.07, S12.08, S12.09。
11项为诊断菜单；P1直接函数区别、P3/4与P2/5同parcel背景、P10/12熟悉parking作可选。真题22分中4分已在L089使用，清楚标已见复测，其余18分新任务；不称完整75分模拟。

| 位置 / 真实ID | 现有题干 | 教师分 | 去向 |
|---|---|---:|---|
| P1 `V3-Q-L090-02` | A student uses a procedure call where a value is required inside an expression. Explain the error and give the correct use of a function. | 3 | 可选巩固或入口口答，不计主配置 |
| P2 `REV-P2-S9-Q1` | A parcel desk only decides whether a parcel mass is from 2 to 5 kg inclusive and counts accepted parcels. State which mass data its abstract model needs, give one irrelevant detail for this decision, and decompose the task into three responsibilities. | 3 | 必做保留/按本课说明调整 |
| P3 `REV-P2-S9-Q2` | Write an identifier table for the supplied parcel-counting algorithm and describe its input, processing and output. Explain why its steps are sufficiently defined to follow. | 3 | 可选巩固或入口口答，不计主配置 |
| P4 `REV-P2-S9-Q3` | Write pseudocode for this structured English: initialise a count to zero; read four parcel masses; for each mass from 2 to 5 kg inclusive increase the count; display the final count. Identify the three basic constructs and state the output for 1.9, 2, 5 and 5.1. | 4 | 可选巩固或入口口答，不计主配置 |
| P5 `REV-P2-S9-Q4` | An intermediate parcel design says 'check the mass and update the count'. Refine this step into programmable detail and explain why setting the count to zero belongs outside the four-parcel loop. | 2 | 必做保留/按本课说明调整 |
| P6 `REV-P2-S10-Q1` | A booking record needs Name and SeatNumber. Define BookingRecord with suitable types, declare Booking, and write statements to input both fields and display Name. | 4 | 必做保留/按本课说明调整 |
| P7 `REV-P2-S10-Q2` | A theatre holds one occupied flag per seat in 3 rows of 8 seats. Declare an array and give valid nested traversal bounds. Separately, trace a first-match linear search for 5 in [9,5,2,5] and one ascending bubble-sort pass on [9,5,2,5]. | 4 | 必做保留/按本课说明调整 |
| P8 `REV-P2-S10-Q3` | A log must keep previous bookings and add one new STRING BookingLine. Write its file operations, then describe how a later program reads every line safely, including any blank lines. | 4 | 必做保留/按本课说明调整 |
| P9 `REV-P2-S10-Q4` | Booking requests arrive A, B, C and must be processed in that order; completed changes must be undoable latest first. Suggest ADTs and state their next removal after all three are stored. Explain how an array-backed linked list inserts a new node after a known node. | 4 | 必做保留/按本课说明调整 |
| P10 `REV-P2-S11-Q1` | Write the parking algorithm described in this review. Include INTEGER declarations, zero initialisation, input until sentinel 0 and final output. Justify the loop and state the output for 2, 1, 0. | 3 | 可选巩固或入口口答，不计主配置 |
| P11 `REV-P2-S11-Q2` | For the supplied parking program, identify each subprogram's parameters, argument types and result or effect. Explain how Charge(Hours) can be an argument to AddCharge. | 3 | 必做保留/按本课说明调整 |
| P12 `REV-P2-S11-Q3` | A supplied function LEFT(Text : STRING, Count : INTEGER) returns the first Count characters. A session code is "PARK204". State LEFT("PARK204", 4) & "-A". A proposed program calculates Hours * 3 twice for the same unchanged Hours, once to display the fee and once to add it. Describe an efficient correction that preserves both actions. | 2 | 可选巩固或入口口答，不计主配置 |
| P13 `REV-P2-S12-Q1` | A club has changing booking requirements and members who can review prototypes weekly. Explain a suitable life cycle. A diagram starts Idle and changes to Booking on begin, then to Idle on cancel. State the states reached after begin, cancel. | 3 | 必做保留/按本课说明调整 |
| P14 `REV-P2-S12-Q2` | A parent calls GetScore, DecideAward and ShowAward. GetScore returns a score to the parent; DecideAward receives it and returns an award label; ShowAward displays the label. Describe the interface directions and a suitable integration test, then identify why a display-library update for a new operating system is needed. | 4 | 必做保留/按本课说明调整 |
| P15 `REV-P2-S12-Q3` | A field accepts integer ages 12–18 inclusive, but 18 is rejected. Give a likely boundary fault and three tests around that upper limit with expected outcomes. Explain how the test plan and test strategy contribute to checking the correction. | 4 | 必做保留/按本课说明调整 |
| P16 `REV-P2-S12-Q4` | Write a complete amendment to the supplied fixed-50 program. Read one INTEGER PassMark in 0–100 before four validated INTEGER marks in 0–100, then output the number at least PassMark. Describe an old-rule compatibility test and a changed-threshold boundary test with expected counts. | 5 | 必做保留/按本课说明调整 |