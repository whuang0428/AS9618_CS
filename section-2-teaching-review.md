# Section 2 教学实施与本地验收

日期：2026-09-15。状态：已按用户批准的整体方案实施，等待本地验收；未提交、推送或发布。置信度：高（来源、计算、渲染和修改边界均有具体证据）。本文件是项目工作材料，不进入学生正文。

## 1. 范围、依据与分工

已完整阅读根目录 `AGENTS.md`、`TEACHING_STANDARD.md` 和 README 的当前课程源与验证说明。保留 L007–L014 的次序和 31 个教学单元，覆盖项目映射 S2.01–S2.16；该映射编号不是 Cambridge 的原始条款编号。同步处理 L048 的 Section 2 复习单元及 Assessment Bank 的相关题位。

- 考纲依据：[Cambridge 9618 2027–2029 syllabus，Version 2，Section 2，印刷页 16–17](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)。本轮方案阶段已核对范围；没有将 A Level 的完整协议栈与传输协议要求整体前移至 AS。
- 私有地址范围：[RFC 1918 §3](https://www.rfc-editor.org/rfc/rfc1918.html#section-3)。
- IPv4 文档示例地址：[RFC 5737 §3–4](https://www.rfc-editor.org/rfc/rfc5737.html#section-3)；IPv6 文档前缀：[RFC 3849 §2–3](https://www.rfc-editor.org/rfc/rfc3849.html#section-2)。这些示例用于假设网络，不作为真实可访问目标。
- 原有教材来源继续保留在课程源 `sources` 中。本轮新增的数值、网络图和原创问题由本项目编写；未声称原创评分点是 Cambridge 官方 mark scheme。

| 课程映射与知识 | 所属课、教学深度 | 前置与衔接 | 学生要完成的任务；例子与变式 | 讲解、图示与独立验收位置 |
| --- | --- | --- | --- | --- |
| S2.01 组网目的、LAN/WAN | L007 U1，概念与因果讲透 | 日常共享文件、打印机经验 | 从共享资源推出具体收益；一馆与跨城市多馆对比；不从名称推断速度 | 共享目录流程、LAN/WAN 图；Q1、单元理解检查 |
| S2.02 client-server/P2P | L007 U2，过程与选择 | U1；与 L008 拓扑分开 | 40 终端中央账户选择；4 人非关键照片共享反例；请求到返回记录 | 请求步骤、保留完整选型例子；Q2、Q4 |
| S2.03 thin/thick client | L007 U3，处理位置与边界 | 服务角色已解释 | 同一编辑任务的本地/远端步骤；离线 CAD；thick + client-server 可并存 | 对照表；Q3、Q4 |
| S2.04 bus/star/mesh/hybrid | L008 U1，结构与机制 | L007；当课介绍 packet/frame 最少词汇 | 识别 backbone、独立星型链路、全/部分 mesh；解释 terminator；列出 4 节点 6 条边 | 精确拓扑 SVG；Q1、Q4；编号重组仅可选拓展 |
| S2.05 路径、故障、选择 | L008 U2，完整追踪与权衡 | U1 | 正常 A–S1–S2–C；S1–S2 断开后经 S3；A 链路/S1 失效对比；明确备用路径启用假设 | hybrid SVG + 完整 5 步；Q2–Q4、原有无答案题图 |
| S2.06 云计算、公有/私有 | L009 U1–U4，资源、租用边界、因果与恢复 | L007；后续 L029、L034、L036 | 请求→远端处理/存储→确认；private 可本地部署；区别本地接入与供应商故障；12:00 备份不能自动恢复 12:05 订单；离线记录去重对账 | 既有场景图配明确适用条件、恢复步骤和依赖表；Q1–Q4、原 outage exam |
| S2.07 wired/wireless | L010 U1，条件对比 | L007 | 区分容量、实际速率、延迟；把移动、安装、衰减与干扰用于判断 | 精确文字对比表替换误导旧图；Q2、Q4 |
| S2.08 各种介质 | L010 U2–U5，载体、路径与选型 | U1 | 铜/光/无线载体；微波对准与遮挡；卫星上下行与返回；30 m 桌面、500 m 噪声工厂、移动平板、不可挖沟建筑、海船五例 | 载体外观图、复用微波/卫星 SVG、完整选型表；Q1、Q3、Q4 |
| S2.09 LAN 设备 | L011 U1–U3，角色与逐端口追踪 | L008、L010 | WNIC→WAP→p1→p3→server 及反向响应；bridge A/B 左、C 右过滤/转发；repeater 再生可恢复信号 | 独立 switch ports SVG、bridge SVG、repeater 图；Q1、Q2、Q5 |
| S2.10 router | L011 U4，跨网完整请求/响应 | LAN 本地转发；L014 再计算 subnet | MAC 选择当前链路接收者、IP 标识远端目的；跨接口转发与返回；给定地址信息避免隐藏前提 | router 图与无 NAT 私网步骤；Q2、Q5 |
| S2.11 Ethernet、CSMA/CD | L011 U5，原因与完整重试 | L008 frame、U1 链路 | 传播延迟导致双方都先听到空闲；检测、停发/jam、随机等待、重新监听、成功；相同等待与到时仍忙变式 | 双站阶段 SVG；Q3、Q4、Q6；明确 shared half-duplex 范围 |
| S2.12 streaming、bit rate、buffer | L012 U1–U2，方法、计算和边界 | L001 单位、L006 压缩、L010 链路；后续 L017 | 空缓冲启动；主例 12→20→20→0 Mbit，t=19 s；短停网、相同容量不同存量、降低码率、空/满边界；保留 30 s 例 | 储水类比、分段图、数值表；Q1–Q5 |
| S2.13 Internet/WWW | L013 U1，关系与反例 | L007、L010、L011 | 区分本地 WiFi、互联网基础设施、WWW 服务；本地打印可用而外站不可用 | 既有服务关系图、请求链；Q1 |
| S2.14 modem/PSTN/专线/蜂窝 | L013 U2–U5，双向机制与选择 | U1；已有 router 角色 | modem 两方向角色互换；PSTN 电话接入不等于全网模拟；专线不保证所有远端立即响应；手机经基站/运营商到服务并返回，handover 与覆盖限制 | 双向 modem SVG、PSTN/专线场景、蜂窝 SVG；Q2–Q4 |
| S2.15 IP、subnet、scope、assignment | L014 U1–U4，推导、计算与独立分类 | L002 数制、L011 routing、L013；AND 当课先教；L019 是后续关联 | 0–255 来自 8 bits；32/128 位；接口地址；/24 与 /26、network/host/broadcast、给定 gateway；public/private × static/dynamic；IPv4 NAT 最小往返 | AND 表、掩码表、subnet SVG、接口地址 SVG、四组合表；Q1、Q2、Q4–Q6 |
| S2.16 URL、DNS、资源返回 | L014 U5，完整工作流 | U1–U4 | scheme/domain/path；DNS query/reply→local/gateway→request path→server response→display；DNS 成功而资源不存在反例 | 三泳道 DNS SVG、六步；Q3、Q6 |

每个单元默认可读的 Detailed explanation 承担完整教学；Core 仅保留两条考试重点。每个单元有默认折叠答案的理解检查。目录、锚点和课堂控制均已接入 S2；前置课程和后续关联课程分栏表达，不把未学的逻辑门课当成做 AND 的隐藏前提。

## 2. 完整例子、拓展与考核决定

### 例子的收尾与边界

- 云订单：给定备份时刻、确认时刻和故障时刻；指出可恢复状态的上限，并完整安排离线记录、恢复验证、确认记录和去重对账。网络恢复不等于数据恢复。
- LAN：给定 MAC/端口与已知地址条件，逐段写出请求和响应；本地交互不绕行 router。跨网例明确 final IP 与 immediate LAN recipient 的区别。
- CSMA/CD：给定 shared half-duplex 场景；随机等待后重新监听。到时仍忙就延后，相同随机等待可能再次碰撞。阶段图不假装为按比例时钟。
- 缓冲：区分 startup 和已开始 playback；按每段持续时间携带存量；主例在 19 s 触零，练习在 11 s 触零，复习在 14 s 触零。空/满是公式需要停止或改变行为的边界。
- 子网：先教一位 AND 四种结果，再展开 /26 的最后一字节；列出 network、普通 host 范围与 broadcast；gateway 由条件提供，不能从 mask 凭空指定。
- DNS：给出无缓存、路由可用等前提和文档地址性质；将 DNS 返回地址与 server 返回资源画为不同箭头，说明“成功解析”不足以证明资源存在。

### 可选拓展的停止深度

L008 的编号重组、L010 的轨道与传播延迟、L014 的一次 IPv6 `::` 展开、RFC 1918 地址表、DHCP lease/renewal 和 DNS cache 均标为 Optional extension。仅用于解释或辨析；不扩展到 VLSM、完整协议分层、TCP 重传/窗口、DHCP DORA 或路由协议配置。

### 题目保留与补充

- 原 26 道练习和 24 道原创 exam-style 题的 ID 均保留。新增 11 道独立应用题，S2 共 37 道练习；分值与评分点逐题相等，目标引用有效。L012 原速率增量题补明播放已开始、空余容量足够。
- L048 加入 `REV-P1-S2-DESIGN`、`HARDWARE`、`BUFFER`、`RESOURCE` 四道具体诊断；共同覆盖 S2.01.R–S2.16.R。设计题包括网络/处理/云依赖与介质和星型故障；资源题包括 Internet/WWW、蜂窝接入、子网、DNS 与返回内容。
- `SECTION-2-CHECK` 保持原四题，共 20 分；仅给文档示例 IP 的假设补充说明。
- `A-P1-2` 保留 star 和 partial mesh 的 (a)/(b)，把 (c) 编号重组改成给定 /26、gateway 的 local/routed 判断。该题仍 9 分，Paper 1 mock 仍 75 分。
- 所有新增理解检查和练习答案默认折叠；切换课堂单元后再次折叠。原创题和评分点不冒充官方考题。

## 3. 图示决定与复核

新图通过 `scripts/course-v3-section2-teaching-diagrams.mjs` 生成，汇入现有 S2 diagram module；采用项目现有 SVG/HTML/表格技术。没有新增位图需求，因此未调用 ImageGen。已有适合的外观和场景素材继续使用；旧文件未删除。

| 图示 / 位置 | 教学任务与检查结果 |
| --- | --- |
| teaching-topologies / L008 U1 | bus 终端、star 独立链路、full mesh 六边；交叉处不是节点 |
| teaching-hybrid-failure / L008 U2 | 正常和失效路径逐边对应；修正备用边端点与盒子边界的间隙；注明备用路由启用前提 |
| teaching-lan-ports / L011 U1 | WAP、desktop、server、router 各占独立 switch port；修正 server 与 switch 的紧贴/端口标签拥挤；请求/响应同图对应 |
| teaching-bridge / L011 U2 | 给定 A/B→1、C→2；同侧过滤与跨侧转发区别明确 |
| teaching-csma-cd / L011 U5 | 双方先空闲、传播、碰撞、停发/jam、不同等待与再次监听；移开压在线上的 travel-time 标签 |
| teaching-buffer / L012 U2 | 横轴 0/4/9/19 s，纵轴 0/12/20/32 Mbit；折点与逐段计算一致 |
| teaching-pstn / L013 U2 | 两端 modem 在请求/响应方向互换 modulation/demodulation；注明电话接入范围 |
| teaching-cellular / L013 U5 | phone→serving station→operator→service；虚线表示先后服务链路；修正端点间隙 |
| teaching-subnet / L014 U2 | /26 块 128–191；.180 local、.210 routed；给定 .129 gateway |
| teaching-public-ip / L014 U3 | IP 标注在接口所属设备内；假设公网侧地址与 NAT 往返解释一致 |
| teaching-dns / L014 U5 | browser/resolver/server 三泳道；四个方向清晰的请求/返回箭头 |

复用的微波、卫星精确 SVG 已保持；新 unit key 接入时发现的选择失效已修复。旧 wired/wireless 位图存在可误读的线缆分支和过度概括的屏蔽标签，改用精确对比表。旧 transmission-media 的统一速度排序未采用，改用无数值排序的载体场景图。云图、P2P 图、静态/动态地址图增加明确适用条件，避免逻辑交流箭头被当成物理拓扑或文档地址被当成真实公网目标。

所有新增 SVG 均有 title、desc、alt、图注、文字 transcript 和完整查看链接。桌面全图以及窄屏横向滚动后分别目视检查；SVG 文字没有越出画布或所属节点标签框。精准网络图的设备端点另经几何检查。

## 4. 工程验证与修改边界

验证环境：`http://127.0.0.1:8774`，本地 Python HTTP server；Chrome headless + Playwright 1.62.1；1440×1000 与 390×844。Browser plugin not available，采用前端测试技能规定的 Playwright 路径。系统 Playwright 浏览器包缺失，改用已安装 Chrome；沙箱不允许 Chrome 启动，经自动审批后运行临时独立浏览器。没有安装依赖或改动用户浏览器配置。

主要命令：

```sh
node scripts/render-course-v3.mjs
python3 -m http.server 8774 --bind 127.0.0.1 --directory web
python3 /tmp/as9618-s2-content-qa.py
node /tmp/as9618-s2-browser-qa.mjs
QA_LESSONS=48 node /tmp/as9618-s2-browser-qa.mjs
node /tmp/as9618-s2-visual-qa.mjs
```

| 检查 | 结果与证据 |
| --- | --- |
| 源文件与生成 | 93 页整站生成成功；作者源、相应 HTML、课程 contract、assessment contract/Markdown/HTML 同步 |
| 页面身份与非空 | L007–L014、L048 两视口共 18 次检查；标题和正文正常；Assessment Bank 两视口检查 |
| 课堂交互 | Teach one unit→逐单元 Explanation→理解检查展开→Practice 展开答案→Exam questions→切换单元折叠→Show whole lesson；目标问题随单元改变；Back to lesson contents 退出单元模式，目录锚点定位正确 |
| 答案状态、资源、链接 | 初始答案折叠；课程检查无破损图或失效页内锚点；独立检查使用 33 个相关图片资源 |
| 控制台 | 课程和考核未发现相关应用错误；直接打开裸 SVG 时浏览器请求根 `/favicon.ico` 得到既有 404，已确认来源，不是课程图片加载失败 |
| 桌面/390px | 无页面横向溢出；精确图保持可读尺寸，区域横向滚动；完整查看链接可定位资产；AND/掩码表与云恢复步骤另有实际截图 |
| 数值与结构 | Python `ipaddress` 独立核对 /26 地址范围和 local/routed；三组分段缓冲、startup/停网变式计算通过；full mesh 六边及失效后合法路径核对；三个网络 SVG 的命名边端点落在对应设备框内 |
| 学习目标与分值 | 59 个核心目标均有练习/exam 对应；新增题目标合法、分值等于评分点；四道 review 题覆盖 16 个复习目标；原题 ID 保留；20/75 分总分保持 |
| 已有工作保护 | 实施前对 753 个既有文件记录哈希并备份文本源到系统临时目录。生成结果与本轮前快照比较；其他 Section 的课程页面与 lesson contract 不变，AGENTS/TEACHING_STANDARD 及原有未提交工作受保护 |

临时证据在 `/tmp/as9618-s2-qa/`：`full-results.json`（完整浏览器检查）、`results.json`（最终 L048 复查）、`content-results.json`（计算与结构）、`visual-results.json`（SVG 标签与表格）。截图包括 `L12-1440-diagram.png`、`L12-390-diagram.png`、`L12-390-diagram-right.png`、`mask-table-390.png`、`cloud-recovery-1440.png`、`review-design-390.png`。临时脚本与截图不进入课程资源。

未运行：Safari/Firefox 跨浏览器测试、真实网络设备实验、发布构建/远端检查。原因：本轮是理论课程本地实施验收，未改浏览器兼容代码、未操作真实网络、未获发布授权。数值验证是计算核对，网络路线是给定模型的追踪，不声称真实流量测试。

## 5. 教学自审结论

- 学生角度：为 packet/frame、MAC/IP、AND、rate/quantity 和云备份时点补全必要含义与前提；例子的请求/响应、故障/恢复、开始/停止均收尾。改变条件的题目要求重新判断。
- 教师角度：8 课各有职责，概念、设备、速率、地址顺序连贯；每个单元可独立显示并带对应题目。未来课程作为关联链接，未拿后续内容作为省略当前步骤的理由。
- 评阅者角度：核心与可选拓展分开；图、例、题、答案数值与边界一致；保留有效原题；可追踪目标证据见下表。

已批准方案中没有留待实施的内容项。本地验收入口为 L007；建议重点查看 L008 故障路径、L011 switch/CSMA、L012 分段缓冲、L014 subnet/DNS 与 L048 四道诊断。

## 6. 逐学习目标位置与验收索引

下表由本次实际课程数据核对；题号是所在课的稳定 ID。一个综合题可以服务多个目标，单元理解检查还提供口头/即时学习证据。

| 目标 | 学生任务 | 默认可读讲解位置 | 独立问题 ID |
| --- | --- | --- | --- |
| S2.01.A01 | Explain why devices are networked and link each benefit to a consequence. | [L007 U1](web/course-v3/lesson-007/index.html#unit-1) | S2-L01-Q1 |
| S2.01.A02 | Distinguish a LAN by limited area and organisational control. | [L007 U1](web/course-v3/lesson-007/index.html#unit-1) | S2-L01-Q2, S2-L01-EXAM-1 |
| S2.01.A03 | Distinguish a WAN by large area, linked sites and provider infrastructure. | [L007 U1](web/course-v3/lesson-007/index.html#unit-1) | S2-L01-Q2, S2-L01-EXAM-1 |
| S2.02.A01 | Explain client and server roles. | [L007 U2](web/course-v3/lesson-007/index.html#unit-2) | S2-L01-Q2, S2-L01-Q4, S2-L01-EXAM-2 |
| S2.02.A02 | Compare client-server and peer-to-peer benefits and drawbacks. | [L007 U2](web/course-v3/lesson-007/index.html#unit-2) | S2-L01-Q2, S2-L01-EXAM-2 |
| S2.02.A03 | Justify a network model from a scenario. | [L007 U2](web/course-v3/lesson-007/index.html#unit-2) | S2-L01-Q2, S2-L01-EXAM-2 |
| S2.03.A01 | Explain where a thin client performs processing and stores resources. | [L007 U3](web/course-v3/lesson-007/index.html#unit-3) | S2-L01-Q3, S2-L01-EXAM-3 |
| S2.03.A02 | Explain where a thick client performs processing and stores resources. | [L007 U3](web/course-v3/lesson-007/index.html#unit-3) | S2-L01-Q3, S2-L01-Q4, S2-L01-EXAM-3 |
| S2.03.A03 | Choose a client type from dependence, management and offline-work requirements. | [L007 U3](web/course-v3/lesson-007/index.html#unit-3) | S2-L01-Q3, S2-L01-Q4, S2-L01-EXAM-3 |
| S2.04.A01 | Recognise and explain a bus topology. | [L008 U1](web/course-v3/lesson-008/index.html#unit-1) | S2-L02-Q1, S2-L02-EXAM-2 |
| S2.04.A02 | Recognise and explain a star topology. | [L008 U1](web/course-v3/lesson-008/index.html#unit-1) | S2-L02-Q1, S2-L02-Q3, S2-L02-EXAM-2 |
| S2.04.A03 | Recognise and explain a mesh topology. | [L008 U1](web/course-v3/lesson-008/index.html#unit-1) | S2-L02-Q1, S2-L02-Q4, S2-L02-EXAM-1, S2-L02-EXAM-3 |
| S2.04.A04 | Recognise and explain a hybrid topology. | [L008 U1](web/course-v3/lesson-008/index.html#unit-1) | S2-L02-Q1, S2-L02-Q2 |
| S2.05.A01 | Trace transmission between two hosts for a given topology. | [L008 U1](web/course-v3/lesson-008/index.html#unit-1) | S2-L02-Q2, S2-L02-Q4, S2-L02-EXAM-3 |
| S2.05.A02 | Explain failure effects, traffic and redundancy. | [L008 U2](web/course-v3/lesson-008/index.html#unit-2) | S2-L02-Q2, S2-L02-Q3, S2-L02-Q4, S2-L02-EXAM-1, S2-L02-EXAM-2, S2-L02-EXAM-3 |
| S2.05.A03 | Justify a topology for a scenario. | [L008 U2](web/course-v3/lesson-008/index.html#unit-2) | S2-L02-Q3, S2-L02-EXAM-1 |
| S2.06.A01 | Explain cloud computing as remote computing resources accessed through a network. | [L009 U1](web/course-v3/lesson-009/index.html#unit-1) | S2-L03-Q1, S2-L03-Q4, S2-L03-EXAM-1 |
| S2.06.A02 | Distinguish public and private cloud control and tenancy. | [L009 U2](web/course-v3/lesson-009/index.html#unit-2), [L009 U3](web/course-v3/lesson-009/index.html#unit-3) | S2-L03-Q1, S2-L03-Q3, S2-L03-EXAM-2 |
| S2.06.A03 | Explain benefits and drawbacks of cloud computing. | [L009 U4](web/course-v3/lesson-009/index.html#unit-4) | S2-L03-Q2, S2-L03-Q3, S2-L03-Q4, S2-L03-EXAM-1, S2-L03-EXAM-3 |
| S2.06.A04 | Justify a cloud choice for a scenario. | [L009 U4](web/course-v3/lesson-009/index.html#unit-4) | S2-L03-Q3, S2-L03-Q4 |
| S2.07.A01 | Compare wired and wireless networks and explain implications. | [L010 U1](web/course-v3/lesson-010/index.html#unit-1) | S2-L04-Q2, S2-L04-Q3, S2-L04-Q4, S2-L04-EXAM-1 |
| S2.08.A01 | Describe copper-cable signal characteristics. | [L010 U2](web/course-v3/lesson-010/index.html#unit-2) | S2-L04-Q1, S2-L04-EXAM-1 |
| S2.08.A02 | Describe fibre-optic signal characteristics. | [L010 U2](web/course-v3/lesson-010/index.html#unit-2) | S2-L04-Q1, S2-L04-Q3, S2-L04-Q4, S2-L04-EXAM-1 |
| S2.08.A03 | Describe radio waves including WiFi. | [L010 U2](web/course-v3/lesson-010/index.html#unit-2) | S2-L04-Q1, S2-L04-Q2, S2-L04-Q3, S2-L04-Q4 |
| S2.08.A04 | Describe the characteristics of microwaves. | [L010 U3](web/course-v3/lesson-010/index.html#unit-3) | S2-L04-Q1, S2-L04-Q4, S2-L04-EXAM-2 |
| S2.08.A05 | Describe the characteristics of satellites. | [L010 U4](web/course-v3/lesson-010/index.html#unit-4) | S2-L04-Q1, S2-L04-EXAM-3 |
| S2.08.A06 | Justify a transmission medium for a scenario. | [L010 U5](web/course-v3/lesson-010/index.html#unit-5) | S2-L04-Q3, S2-L04-Q4, S2-L04-EXAM-1 |
| S2.09.A01 | Describe switch and server roles. | [L011 U1](web/course-v3/lesson-011/index.html#unit-1) | S2-L05-Q1, S2-L05-Q2, S2-L05-Q4, S2-L05-Q5, S2-L05-EXAM-2 |
| S2.09.A02 | Describe NIC and WNIC roles. | [L011 U1](web/course-v3/lesson-011/index.html#unit-1) | S2-L05-Q1, S2-L05-Q2, S2-L05-Q5, S2-L05-EXAM-2 |
| S2.09.A03 | Describe WAP and cable roles. | [L011 U1](web/course-v3/lesson-011/index.html#unit-1) | S2-L05-Q1, S2-L05-Q2, S2-L05-Q5, S2-L05-EXAM-2 |
| S2.09.A04 | Describe bridge and repeater roles. | [L011 U2](web/course-v3/lesson-011/index.html#unit-2), [L011 U3](web/course-v3/lesson-011/index.html#unit-3) | S2-L05-Q1, S2-L05-EXAM-1 |
| S2.10.A01 | Explain how a router forwards packets between networks. | [L011 U4](web/course-v3/lesson-011/index.html#unit-4) | S2-L05-Q2, S2-L05-Q4 |
| S2.10.A02 | Distinguish router and switch scope. | [L011 U4](web/course-v3/lesson-011/index.html#unit-4) | S2-L05-Q2, S2-L05-Q4, S2-L05-Q5 |
| S2.11.A01 | Explain Ethernet frames and a shared medium. | [L011 U5](web/course-v3/lesson-011/index.html#unit-5) | S2-L05-Q3, S2-L05-Q6, S2-L05-EXAM-3 |
| S2.11.A02 | Describe the complete CSMA/CD sequence. | [L011 U5](web/course-v3/lesson-011/index.html#unit-5) | S2-L05-Q3, S2-L05-Q6, S2-L05-EXAM-3 |
| S2.11.A03 | Explain why random backoff reduces repeated collisions. | [L011 U5](web/course-v3/lesson-011/index.html#unit-5) | S2-L05-Q3, S2-L05-Q6, S2-L05-EXAM-3 |
| S2.12.A01 | Explain bit streaming and progressive playback. | [L012 U1](web/course-v3/lesson-012/index.html#unit-1) | S2-L06-Q1, S2-L06-EXAM-1 |
| S2.12.A02 | Distinguish real-time and on-demand streaming. | [L012 U1](web/course-v3/lesson-012/index.html#unit-1) | S2-L06-Q1, S2-L06-EXAM-1 |
| S2.12.A03 | Explain bit rate as bits transmitted/consumed per second. | [L012 U2](web/course-v3/lesson-012/index.html#unit-2) | S2-L06-Q2, S2-L06-Q3, S2-L06-Q4, S2-L06-Q5, S2-L06-EXAM-2, S2-L06-EXAM-3 |
| S2.12.A04 | Explain how a buffer temporarily stores arriving data. | [L012 U2](web/course-v3/lesson-012/index.html#unit-2) | S2-L06-Q2, S2-L06-Q3, S2-L06-Q4, S2-L06-Q5, S2-L06-EXAM-1, S2-L06-EXAM-2 |
| S2.12.A05 | Predict buffer change from incoming and playback rates. | [L012 U2](web/course-v3/lesson-012/index.html#unit-2) | S2-L06-Q2, S2-L06-Q3, S2-L06-Q4, S2-L06-Q5, S2-L06-EXAM-2, S2-L06-EXAM-3 |
| S2.12.A06 | Explain why sustained insufficient broadband speed causes adaptation or interruption. | [L012 U2](web/course-v3/lesson-012/index.html#unit-2) | S2-L06-Q3, S2-L06-Q4, S2-L06-EXAM-3 |
| S2.13.A01 | Explain the internet as a global network of networks. | [L013 U1](web/course-v3/lesson-013/index.html#unit-1) | S2-L07-Q1, S2-L07-EXAM-1 |
| S2.13.A02 | Explain the WWW as one internet service of linked resources. | [L013 U1](web/course-v3/lesson-013/index.html#unit-1) | S2-L07-Q1, S2-L07-EXAM-1 |
| S2.13.A03 | Classify non-WWW internet services correctly. | [L013 U1](web/course-v3/lesson-013/index.html#unit-1) | S2-L07-Q1, S2-L07-EXAM-1 |
| S2.14.A01 | Explain a modem’s role at an access link. | [L013 U2](web/course-v3/lesson-013/index.html#unit-2) | S2-L07-Q2, S2-L07-Q4, S2-L07-EXAM-2 |
| S2.14.A02 | Describe PSTN connectivity. | [L013 U3](web/course-v3/lesson-013/index.html#unit-3) | S2-L07-Q2, S2-L07-Q4, S2-L07-EXAM-2 |
| S2.14.A03 | Describe a dedicated line. | [L013 U4](web/course-v3/lesson-013/index.html#unit-4) | S2-L07-Q3, S2-L07-EXAM-2 |
| S2.14.A04 | Describe a cell phone/cellular network connection. | [L013 U5](web/course-v3/lesson-013/index.html#unit-5) | S2-L07-Q3, S2-L07-EXAM-3 |
| S2.14.A05 | Choose connection infrastructure for a scenario. | [L013 U4](web/course-v3/lesson-013/index.html#unit-4), [L013 U5](web/course-v3/lesson-013/index.html#unit-5) | S2-L07-Q3, S2-L07-EXAM-2, S2-L07-EXAM-3 |
| S2.15.A01 | Describe IPv4 format and 32-bit length. | [L014 U1](web/course-v3/lesson-014/index.html#unit-1) | S2-L08-Q1, S2-L08-Q5, S2-L08-EXAM-1 |
| S2.15.A02 | Describe IPv6 format and 128-bit length. | [L014 U1](web/course-v3/lesson-014/index.html#unit-1) | S2-L08-Q1, S2-L08-EXAM-1 |
| S2.15.A03 | Explain that an IP address is associated with a network interface. | [L014 U1](web/course-v3/lesson-014/index.html#unit-1) | S2-L08-Q1, S2-L08-Q5 |
| S2.15.A04 | Use subnet information to decide local or routed delivery. | [L014 U2](web/course-v3/lesson-014/index.html#unit-2) | S2-L08-Q2, S2-L08-Q5, S2-L08-EXAM-2 |
| S2.15.A05 | Compare public and private addresses and security implications. | [L014 U3](web/course-v3/lesson-014/index.html#unit-3) | S2-L08-Q3, S2-L08-Q6, S2-L08-EXAM-3 |
| S2.15.A06 | Compare static and dynamic assignment. | [L014 U4](web/course-v3/lesson-014/index.html#unit-4) | S2-L08-Q3, S2-L08-Q6, S2-L08-EXAM-3 |
| S2.16.A01 | Identify the protocol, domain name and web page or file name in a URL. | [L014 U5](web/course-v3/lesson-014/index.html#unit-5) | S2-L08-Q4, S2-L08-Q6 |
| S2.16.A02 | Explain DNS domain-to-IP resolution. | [L014 U5](web/course-v3/lesson-014/index.html#unit-5) | S2-L08-Q4, S2-L08-Q6 |
| S2.16.A03 | Trace browser contact and resource request after DNS. | [L014 U5](web/course-v3/lesson-014/index.html#unit-5) | S2-L08-Q4, S2-L08-Q6 |

## 7. 新图来源与校验值

来源均为项目原创 SVG 源函数，教学规格与绘制内容保存在 `scripts/course-v3-section2-teaching-diagrams.mjs`，无外部生成提示词。生成资产 SHA-256：

| 资产 | SHA-256 |
| --- | --- |
| teaching-bridge.svg | `5b013772cf9bd904771b7033020a50b6b9c0072a09c526e2158f652f8396b925` |
| teaching-buffer.svg | `ba634b88ac65b50d710fae618cd26f9a55b5126cee7850d6d9eb9d5cc3a0ba4c` |
| teaching-cellular.svg | `5f2d587cf90c45fdd9e23306e6725374d7b3245b3c52bbe237a08cbdb08abf5b` |
| teaching-csma-cd.svg | `8a2dc37307e62d56f2a411b9506afd1122dbb1ea082bf4254cada0460d68bc4d` |
| teaching-dns.svg | `fe77fe0167aba3451a604ce5cd1577f540ea318ef9fc80459240c592b3d9a760` |
| teaching-hybrid-failure.svg | `ff2d90dc0e0f56897aa4457b84a1fee81f712b28cb9aff5d5bdb39f47864fa14` |
| teaching-lan-ports.svg | `f813b2eb4eb706adcb71838f6c877f2a0a4b25d9fc834b358e8567da4bbbbb40` |
| teaching-pstn.svg | `5fd16f65dae0dec33c458dbae1e33f6e10831e1e7714d3d3e4b93f82db20d7bd` |
| teaching-public-ip.svg | `079beb23b8f6455d6a46a78f4876712896a6639a2030b243860173e542b95481` |
| teaching-subnet.svg | `085a80b0d48c9013dd2ad616452a462c4b85a7f100bb7b7879ba704f58137e7b` |
| teaching-topologies.svg | `d3b9d11b3912167685ffaf895a965f6dcc2e42313b40a9da2369856d4112499d` |
