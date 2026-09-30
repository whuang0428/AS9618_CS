# Section 6 初学者课程重构方案

日期：2026-09-29 · 状态：第一阶段，待教师审核 · 本文件不是已实施报告。

## 1. 本轮交付与已确认要求

本轮仅新增这份方案。现有课程源码、页面、图片、题库、生成结果、Git 索引及发布状态均不修改；不生成图片。实施以本方案审核后的明确授权为起点。

- 学生学过前面章节但掌握不牢；需要在用到知识时补基础。
- 学生可见内容全部用英文。术语、核心定义与答题表达参考官方 mark schemes；完整教学解释由教师编写，不能把评分点当作全部讲解。
- 每节课 45 分钟，整章没有固定课时上限。
- 允许重排、拆分、合并当前五课，以学校成绩系统为主线。
- 教学顺序：情境/素材 → 观察预测 → 分步解释 → 操作/完整例子 → 理解检查 → 匹配真题 → 简短回顾。
- 素材采用 ImageGen 情境图、精确网页/SVG、可操作实验和对照案例的组合。
- 默认 Classroom mode，另有 Full reading mode；以教师操作、全班讨论、偶尔学生上屏为使用场景，支持鼠标、键盘及触摸。

**建议结构：6 个模块、16 个建议课次，约 12 小时。** 模块是知识组织，课次是排课建议，二者不强制等于网页数量。每次理解检查后的表现决定是否增加练习或拆成下一课，16 节不是上限。

## 2. 核验依据与现状诊断

### 2.1 官方范围

已读取官方当前 [2027–2029 syllabus PDF](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf) 及 [syllabus update](https://www.cambridgeinternational.org/Images/747147-2027-2029-syllabus-update.pdf)。当前为 Version 2，修订记录注明 December 2025。Section 6 位于印刷页 24，也为 PDF 第 24 页。

官方分为 **6.1 Data Security** 和 **6.2 Data Integrity**，共有 9 条候选目标。项目映射为 S6.01–S6.08，其中 S6.07 合并官方 6.2 的前两条；现有内容再拆为 32 个 Axx 目标。**S6.xx 和 Axx 是项目编号，不是官方原编号。** 下文细分目标来自本地教学源；官方原文用于检查范围。

核验范围与版本的置信度高。命令行下载官方 PDF 返回 HTTP 403，但 web 工具可读取原文；本轮没有验证当前官方 PDF 字节与本地 contract 保存的源文件哈希完全相同。

本地主要依据：

- [官方条目映射](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/syllabus-official-as-mapping.mjs:68)。
- [S6 内容源](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/course-v3-section6-content.mjs)：五课、26 个旧知识单元、32 个目标。
- [详细教学源](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/course-v3-section6-teaching.mjs)：详细解释、完整示例、扩展。
- [示例数据与计算](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/course-v3-section6-examples.mjs)：计算、权限、表单和防火墙的可检查数据。
- [真题目标分配逻辑](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/course-v3-past-paper-content.mjs:47)。
- [S6 真题教学](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/past-paper-teaching/section-6.mjs)及来源、裁图、选题登记：真题与教师解释。
- [README](/Users/kw/Documents/Projects/GitHub/AS9618_CS/README.md:127) 的本地预览和重新生成说明。当前生成入口为 `node scripts/render-course-v3.mjs`。

### 2.2 已由源码与浏览器确认的问题

| 发现 | 证据 | 改版处理 |
|---|---|---|
| 学习顺序缺少必要铺垫 | L034 在账户后直接进入数字签名；加密集中在 L036。Anti-virus/anti-spyware 的防护讲解早于 L035 的对应威胁 | 先讲对象、威胁和所需基础，再引入防护；签名后移至加密与 key 的最低限度铺垫之后 |
| 当前授课模式仍以整块长文为单位 | 浏览器实测 L034 的账户单元在 1366×768 下高约 2532 CSS px；L037 的 block parity 单元高约 3973 CSS px。后者在 1920×1080 下仍约 3973 CSS px | 单元内部按阶段和步骤显示；长文保留给阅读模式，不靠缩小字体塞入一屏 |
| 流程主要可阅读，不能改变条件并检查后果 | 五页知识单元内没有用于输入、规则修改、位翻转等实验的 input/select/button；现有折叠解释、导航和答案按钮不计为机制实验 | 对需要因果理解的流程增加确定性互动；保留文本等价解释 |
| 默认进入全课阅读模式 | 五个现有页面均默认显示全课，需手动选择 Teach one unit | 默认进入课堂模式，提供明确的 Full reading 切换 |
| 真题被过宽关联到知识点 | L034 选择 Digital signature → Exam questions，显示 E046；原题 3(a)(i) 明确要求认证以外的措施。代码按 S6.03 前缀把该题关联到整组目标 | 为 S6 建立逐题精确映射，并分开记录“涉及的知识”与“实际检验的能力” |
| L037 承载多种不同学习任务 | 同一课有 9 个单元和 14 个目标，含输入规则、源核对、校验位、传输校验 | 分散到输入可靠记录与传输检查两条子线，逐步复用原有例子 |

浏览器已查看 L033–L037，重点操作 L034 与 L037 的授课模式。1366×768 的五页未发现页面级横向溢出；1920×1080 复查了 L037。以上结论不等于已在真实教室智能屏完成验收，也不据此声称所有图片和页面功能均通过全面测试。

### 2.3 应保留的已有内容

- 46 被录成 64 的完整例子：可以直接建立 validation 与 verification 的差别。
- 错误密码、允许读取、拒绝删除的请求对照及权限矩阵。
- 病毒、间谍软件、phishing/pharming 的过程和信息去向解释。
- Check digit、byte/block parity、checksum 的明确算法、完整输入和计算结果。
- 官方 QP/MS 摘录、来源记录和有用的教师答案解释。
- 适合独立阅读的详细段落、限制条件和可选扩展。

教学素材不足主要表现为缺少可操作的解释过程、阶段安排和从理解到真题的过渡；现有完整例子应转化使用，不宜全部丢弃。

## 3. 贯穿情境与学习依赖

### 3.1 同一套虚构学校数据

基础情境使用虚构的 **Riverside School**，不输入真实学生信息。

- 学生编号：`AB012`，按字符串处理并保留前导零。
- 原始纸质成绩：`46`，满分 `75`。
- 可编辑的录入值：初始 `64`。
- 角色：Teacher、Reviewer、Visitor、Examinations officer。
- 文件：`Marks.csv`；传输示例使用文字 `Student AB012: 46`。
- 权限：Teacher 可 read/modify，不可 delete；Reviewer 仅 read；Visitor 不可访问。

Check digit 另用“导出批次编号”四位数字 `4726`，避免将 `AB012` 与只接受数字的算法混用。生物识别使用门禁注册场景；必要局部例子不强行改成成绩数字。

### 3.2 主线

```text
What can happen to a school record?
  → Enter a reasonable value
  → Check it against the source
  → Decide who may use it
  → Follow threats and choose controls
  → Protect a copy and authenticate a message
  → Check the transmitted data
  → Protect the complete journey
```

依赖规则：

1. 先用具体事故认识 security/privacy/integrity，再给术语总结。
2. 先运行简单输入规则，再比较规则检查与来源核对。
3. Authentication 与 access rights 相邻教学，成功登录后仍可拒绝操作。
4. Virus→anti-virus、spyware→anti-spyware 成对出现；pharming 前先演示正常的域名解析。
5. Digital signature 属于 AS 必学。先补 digest、key 及可信公钥的必要概念，再教创建和验证。
6. Byte parity 熟练后再教 block parity；checksum 首次出现时提供算法，不同时要求学生自行猜测规则。
7. “检查通过不等于保证真实/无错”贯穿课程；较复杂的漏检模式按需展开。

## 4. 六个模块与 16 节建议课

课次 U01–U16 是本方案的教学标识。标题及未来页面文字为英文。

| 模块 | 课次 | 学生面对的问题／内容 | 当场补充的基础 | 主素材与课堂操作 | 真题安排 |
|---|---|---|---|---|---|
| M1 · Meet the record | U01 | **What can happen to a school mark?** 三种数据属性；数据与系统为什么都需保护 | record、field、file、system | 成绩场景图；分别发生误录、泄露、删除、系统不可用，解释受影响属性 | E045 在对照案例之后；系统保护另设自编检查并保留原题缺口 |
| M2 · Enter a reliable record | U02 | **Does the entry follow the rules?** range/limit、length/format | character、number/string、inclusive boundary | 单字段实验，两组短学习循环；预测边界值和看似正确的错误格式 | N-VAL 用于完成基础规则后的定义与作用练习；各规则应用仍需针对性补题 |
| M2 | U03 | **Is it present, and does it exist?** presence/existence、组合表单 | lookup list、已有记录与非空值 | 显示学生名单；改编号、留空、观察不同规则失败 | 先自编迁移检查；补核验过的应用原题，不能将 E049 误配到本课 |
| M2 | U04 | **Can an identifier check itself?** check digit 生成、检查和回源更正 | digits、multiply、sum、remainder | 权重逐步揭示；区分生成 check digit 与核验收到的完整代码 | 现有选题缺口；补给定算法的真实题，暂不承诺已有覆盖 |
| M2 | U05 | **Is this a faithful copy?** visual check、double entry；与 validation 比较 | original source、independent entry | 原始成绩与录入并排；第二次录入不预填；修正后重查 | 输入核验专门原题待补；E049 全题延后到 U15，避免提前要求未学的传输方法 |
| M3 · Control access | U06 | **Who are you, and what may you do?** 账户、密码、权限 | identity、resource、read/modify/delete | 先验证身份再执行请求；每次显示许可与文件状态 | 账户/权限直接原题待补；E046 不用于认证练习 |
| M3 | U07 | **What counts as evidence of identity?** biometrics、hacking 与凭据冒用 | enrolment、template、真实身份和系统判定 | 注册→采集→比较；本人/冒用者与接受/拒绝组合 | 对应认证、生物识别原题待补 |
| M4 · Follow threats and controls | U08 | **What does malicious software do?** virus/anti-virus、spyware/anti-spyware | host program、execution、copy、send | 两条独立过程；在检测、隔离、移除等位置观察影响 | 本课理解检查后，E047 全题安排在 U09 学完 phishing 后；不把它算作 anti-spyware 机制题 |
| M4 | U09 | **Was the user deceived, or the destination changed?** phishing/pharming 与风险降低 | domain→address→server | 模拟消息；正常/被改变的地址路径；选择独立核实等措施 | 完成 E047 全题，说明 phishing email 和 spyware；pharming 及措施解释仍需补题 |
| M4 | U10 | **Which traffic should pass?** firewall、主机与网络位置 | traffic、direction、address/service；port 不是插孔 | 请求逐条对规则；先两条，再看既有连接等扩展条件 | E046，明确该原题排除 authentication |
| M5 · Protect a shared copy | U11 | **Can someone read a lost copy?** encryption/decryption、key、权限边界 | reversible transformation、copy | 明文→密文→恢复；改变是否持有正确 key；区分源文件权限 | E048 |
| M5 | U12 | **Has the signed record changed?** digest、签名创建与验证 | hash 不可当成可逆加密；key 的不同角色 | 发送/接收双栏；修改消息、替换验证 key，观察结果 | N-SIG；保留原题共享情境，讲清该题 MS 采用的简化模型 |
| M6 · Check the journey | U13 | **Did a bit change in transit?** byte parity、even/odd | bit、数 1 的个数、data bits 与 parity bit | 生成检查位→传输→翻转一位→接收检查；再试两位改变 | N-PAR(i)；E050 全题需两种方法，留至 U15 |
| M6 | U14 | **Can we locate one changed bit?** block parity | row、column；先完成 U13 | 发送端构建完整矩阵→注入单错→定位→纠正→复查 | N-PAR(ii)，给完整题目矩阵与方向约定 |
| M6 | U15 | **Does the received block give the same check value?** checksum | 本例所需加法与余数 | 两端各自计算；比较；单次改变与抵消改变 | E049 的完整方法分类及 E050 的机制描述；可延至 U16。计算原题待补 |
| M6 | U16 | **Protect the complete journey.** threats、controls、integrity 综合 | 复用前面主线 | 选择措施并说明作用阶段、机制和局限；按错误回到相关单元 | E046/E048/E050 可在此前完成后作回顾；不重复计入新增独立评估量 |

### 每节课的时间使用

建议起点：回忆/前置诊断 5 分钟，情境与解释 10 分钟，操作和完整例子 12 分钟，理解检查 5 分钟，真题与反馈 10 分钟，回顾 3 分钟，共 45 分钟。

这是备课参考，不在学生页面显示倒计时或硬性时间限制。两组概念的课次可各完成一轮短循环；如果原题所需知识跨多课，则在知识齐备后安排原题，不让学生用未学概念硬猜。不具备匹配原题的单元在实施验收前须补题，或明确并入具备相应考查的一组概念；不能用宽泛标签遮盖缺口。

## 5. 全部 32 个现有目标的教学对应

这张表用于保留覆盖并检查迁移；未来可细化目标，但不能无说明丢弃旧目标。真题能力范围见第 6 节。“缺口”表示目前本次核验没有找到直接覆盖，不能推断 Cambridge 从未考过。

| 项目目标 ID | 要教到的能力 | 主课次 | 素材与理解检查 | 直接真题证据／缺口 |
|---|---|---|---|---|
| S6.01.A01 | 区分 security/privacy/integrity，允许一次事故影响多项 | U01 | 独立事故卡；为分类解释理由 | E045 检验 privacy/integrity；security 情境需检查 |
| S6.02.A01 | 解释数据与处理系统都需保护 | U01、U16 | 文件尚存但系统无法启动的反例 | 直接原题缺口 |
| S6.03.A01 | 账户与密码如何支持认证 | U06 | 三次登录请求；指出身份检查结果 | 直接原题缺口 |
| S6.03.A02 | 创建并验证数字签名 | U12 | 两端分步过程；改变消息再验证 | N-SIG |
| S6.03.A03 | 生物识别注册、匹配及局限 | U07 | 真实身份×系统判定；解释误拒/误接受 | 直接原题缺口 |
| S6.03.A04 | 单机与网络防火墙及规则判断 | U10 | 允许/拒绝请求及经过路径 | E046，主要检验措施与工作机制 |
| S6.03.A05 | Anti-virus 检测、更新、隔离 | U08 | 先执行路径再选介入位置 | 直接原题缺口 |
| S6.03.A06 | Anti-spyware 的检测、移除及已泄露数据 | U08 | 本地移除后远端日志仍存在 | 直接原题缺口；E047 解释 spyware，不考其防护机制 |
| S6.03.A07 | 加密的保密作用 | U11 | 丢失副本和密钥分离；可读性判断 | E048 为跨目标关联，原编号主要属 S6.06 |
| S6.03.A08 | 选择互补措施 | U16 | 按风险、作用阶段和机制说明选择 | 多题回顾可支持；无单题全面覆盖 |
| S6.04.A01 | 病毒的宿主、执行、复制与影响 | U08 | 宿主流程；区分传播与损害 | 直接原题缺口 |
| S6.04.A02 | 间谍软件如何收集与披露信息 | U08 | 采集→保存→外发；指出数据去向 | E047 要求解释 spyware，安排在 U09 |
| S6.04.A03 | 未授权访问及后果 | U07、U16 | 被窃凭据的访问案例 | 直接原题缺口 |
| S6.04.A04 | Phishing 如何诱导用户 | U09 | 读模拟消息，指出欺骗与交付信息动作 | E047 要求解释 phishing email |
| S6.04.A05 | Pharming 如何改变访问目的地 | U09 | 正常解析→被改写的路径 | 直接原题缺口 |
| S6.05.A01 | 选择措施并解释如何降低具体风险 | U08–U10、U16 | threat→route→control→remaining limitation | E046 可支持局部应用；更全面的直接原题待补 |
| S6.06.A01 | 加密/解密如何保护数据保密性 | U11 | 明文、密文、key 与恢复结果 | E048 |
| S6.06.A02 | 对 read/modify/delete 应用权限 | U06、U11 | 操作许可与最终文件状态 | 直接原题缺口 |
| S6.07.A01 | 区分 validation 与 verification | U02、U05 | 64 合规则但不等于来源 46 | N-VAL 排除 verification；E049 为后续对照 |
| S6.07.A02 | 应用 range check | U02 | 0、75、−1、76 边界；规定整数输入 | 具体方法应用原题缺口 |
| S6.07.A03 | 应用 format check | U02 | `AB012` 与 `12012` 比较 | 具体方法应用原题缺口 |
| S6.07.A04 | 应用 length check | U02 | 同长度不同格式、正确格式不足长度 | 具体方法应用原题缺口 |
| S6.07.A05 | 应用 presence check | U03 | 空值与非空无效编号 | 具体方法应用原题缺口 |
| S6.07.A06 | 应用 existence check | U03 | 对照已存学生名单查找编号 | 具体方法应用原题缺口 |
| S6.07.A07 | 应用单侧 limit check | U02 | 正数上传大小不超过 10 MiB | 具体方法应用原题缺口 |
| S6.07.A08 | 按给定规则生成/检查 check digit | U04 | `4726` 的带权计算；有效代码被改一位 | 直接原题缺口 |
| S6.07.A09 | 说明 validation 不证明真实 | U02、U05 | 合规则但录错；错来源仍可被正确复制 | N-VAL 检验合理性作用，反例需理解检查 |
| S6.08.A01 | Visual check 与原始来源比较 | U05 | 纸面与输入逐项核对 | E049 在 U15 检验用途分类，未检验完整操作 |
| S6.08.A02 | 两次独立录入并比较 | U05 | 不预填第二次；相同错误漏检 | 直接原题缺口 |
| S6.08.A03 | Byte parity、block parity 及单错定位 | U13–U14 | 点击翻转位；生成、检查、纠正和复查 | N-PAR；E049/E050 另检验分类/描述 |
| S6.08.A04 | 按明确算法计算并比较 checksum | U15 | 两端各自求值，比较与重传决定 | E049/E050 检验分类/描述；计算原题缺口 |
| S6.08.A05 | 输入及传输核验的局限 | U05、U13–U15 | 双录同错、偶数位改变、抵消变化 | E050 只支撑部分过程，不覆盖全部限制 |

特别处理：现有 coverage contract 对 S6.05 的标题偏向“限制访问”，比官方“降低威胁风险”的范围窄。实施应按官方原文与 notes 处理，不把它缩成权限管理。

## 6. 真题来源、精确对应与补题范围

### 6.1 已有来源

本地 E045–E050 共 **6 个题组、18 分**，来自 4 套试卷，无 insert 依赖。已核对原始 QP/MS 文本、原文件 SHA-256、来源登记和 15 张摘录图哈希；它们的身份和文件一致性通过。题意与目标的关联须按下表收窄。

| 题组 | 官方来源 | 分值 | QP / MS PDF 页 | 实际考查／建议精确目标 | 主要位置 |
|---|---|---:|---|---|---|
| E045 | 9618/12 · O/N 2023 · 5(a)、5(b) | 2 | 8 / 5、6 | Privacy、integrity 定义；S6.01.A01 | U01 |
| E046 | 9618/12 · M/J 2024 · 3(a)(i) | 3 | 5 / 5 | Authentication 以外的措施和机制；本课程用 firewall，MS 亦接受 proxy；S6.03.A04 | U10 |
| E047 | 9618/12 · O/N 2023 · 5(c) | 4 | 8 / 6 | 解释 phishing email、spyware，各最多 2 分；S6.04.A02、S6.04.A04 | U09 |
| E048 | 9618/12 · M/J 2024 · 3(a)(ii) | 3 | 5 / 5 | Encryption 名称与机制；S6.06.A01 | U11 |
| E049 | 9618/12 · O/N 2025 · 1 | 2 | 2 / 4 | 四种 verification 方法按输入/传输用途连线；S6.08.A01、A03、A04，仅用途分类 | U15 |
| E050 | 9618/13 · M/J 2024 · 7(f)(i) | 4 | 13（共享情境）、16（小问） / 9 | 两种传输 verification 方法及描述；S6.08.A03、A04，仅机制描述 | U15–U16 |

E049 是四条连线的完整题，2–3 条正确得 1 分，4 条全对得 2 分。不能把它拆成一个“visual check 小问”在 U05 按官方分值评分；应等 U15 学完相关传输方法后完整使用。E047 同样建议在 U09 完成所需两个术语后使用整个 5(c)。

见 [来源登记](/Users/kw/Documents/Projects/GitHub/AS9618_CS/docs/practice-past-paper-review-20260915/selection-registry.json:2336)与 [现有裁图规格](/Users/kw/Documents/Projects/GitHub/AS9618_CS/scripts/past-paper-extracts.json:1139)；E050 必须保留其跨页共享情境。

E046 只应直接关联 firewall；不能因其位于 S6.03 就用于账户、密码、生物识别或签名练习。E049/E050 涉及 parity/checksum，不代表它们都检验了实际计算、错误定位和每一种限制。

当前真实题映射使用 syllabus 前缀继承整组目标，缺少逐小问的教学能力审查。实施时为 S6 显式声明目标、所需先备知识、考查动作及不覆盖的能力，并加入正反两类校验。自动生成的题频 tag 只能用于找候选题，最终以原始 QP/MS 为依据。

现有 S6 另有 35 道教师编写 Practice（30 核心、5 可选），源码标记 `authored: true`；不能将它们报告为历年真题。

### 6.2 本轮额外核验的三组候选

这些题已检查本地 QP/MS 文字、原页视觉与原始 PDF 哈希，但**尚未加入正式选题登记、裁图及页面**。N-VAL/N-SIG/N-PAR 仅是本方案的临时引用名。

| 临时引用 | 官方题目身份 | 分值 | QP / MS PDF 页 | 使用位置与能力边界 |
|---|---|---:|---|---|
| N-VAL | 9618/13 · October/November 2023 · 8(a) | 2 | 12 / 8 | U02 的 validation 作用；原题排除 verification，不能算七种规则均已应用 |
| N-SIG | 9618/11 · May/June 2025 · 7(b) | 5 | 12 / 11 | U12 签名创建与接收检查；讲清该题 MS 采用的简化加密/解密摘要模型 |
| N-PAR | 9618/12 · October/November 2025 · 6(c)(i)、6(c)(ii) | 1 + 1 | 11 / 9 | U13 的 even parity 位、U14 的 block parity 单错定位；两小问分配但保留各自所需完整条件和图 |

候选题进入实施的步骤：复核完整上下文 → 分配精确目标和主教学位置 → 登记题号与分值 → 裁取原题和 MS → 检查裁图完整性与可读性 → 写独立标注的教师讲解 → 验证哈希、链接和答案默认隐藏。

### 6.3 实施时仍必须补齐或明确合并的缺口

优先级一：具体 validation 应用与 check digit、账户/权限、生物识别、pharming、virus/anti-virus/anti-spyware 机制、double entry、checksum 计算。

优先级二：数据与系统保护的区分、互补措施的完整情境应用、检查方法的局限。

不设硬性原题数量。选题按教学能力覆盖；同一综合题可以在所需知识都学过后使用。确无直接原题时，先明确记录缺口和已搜索范围，再决定合并到相邻知识组或保留明确标注的自编检查，不能把自编题改称真题，也不能声称缺口已补齐。

## 7. 素材与互动清单

### 7.1 ImageGen 情境图计划

本阶段只规划用途，不调用生成工具。

| 计划素材 | 主要教学任务 | 图片应表现什么 | 由网页承载的精确信息 |
|---|---|---|---|
| School record scene | U01 建立 record、paper source、computer system 的具体认识 | 教师、纸质记录、电脑与校内使用场景；少量对象，清晰留白 | 学生编号、成绩、角色、事故内容均为可编辑文字 |
| Biometric enrolment scene | U07 区分注册时采集与以后匹配 | 同一虚构人物的首次采集与后续使用，采集设备清晰 | template、步骤箭头、判断和误判标签由 SVG/HTML 控制 |
| A lost copy | U11 说明源系统权限不等于独立副本保密 | 从学校导出的文件副本与遗失存储设备 | plaintext/ciphertext/key 及内容可读性的变化由组件显示 |

初步最多三张新情境图；实施前再次评估已有图是否可以满足相同任务，能复用则减少生成。16:9 横向、适合大屏、低装饰密度；不要将长段落、准确位图或复杂接线烘焙进图片。

已有 digital-signature、encryption、firewall 栅格图可评估后保留为阅读材料。课堂主流程改用可逐步揭示的精确网页/SVG；不删除旧素材或覆盖来源记录。

### 7.2 确定性互动

| 组件 | 输入／操作 | 学生应看到的变化 | 必须遵守的条件 |
|---|---|---|---|
| Form checks | 改值、选规则、检查 | 当前值、适用规则、通过/失败及理由 | 不将空字符串隐式当 0；格式和长度分别判断；整数输入假设或类型处理要明确 |
| Check digit | 输入四位数据、逐步求和、检查完整代码 | 乘积、总和、余数、生成的末位、核验结果 | 说明这是本例算法；有效完整代码不能自动重生成后被误判为正确 |
| Source verification | 输入、独立二次输入、揭示来源对照 | 比较结果、冲突字段、纠正后状态 | 第二次录入不预填；一致不代表来源真实；不自动猜测原值 |
| Identity and rights | 选角色、模拟凭据结果、选择操作 | Authentication 结果、权限结果、文件状态 | 使用虚构凭据，不要求真实密码；拒绝操作不能改变文件；正确密码不证明实际操作者合法 |
| Biometrics | 注册、选本人/冒用者、选采集情形 | reference、comparison、accept/reject 与真实身份对照 | 未注册先提示；基础案例后再介绍阈值；不画成绝对可靠的开门检测 |
| Threat routes | 执行下一步、选介入措施 | 宿主、复制、采集、外发或目的地变化 | 仅模拟，不连接外部表单、不运行恶意程序；结果由具体路线决定 |
| Firewall | 选请求、逐条检查规则、切换位置 | 匹配的规则、允许/拒绝、经过的路径 | 先给明确 policy；没有经过设备的流量不能被其过滤；allow 不显示为“内容安全” |
| Encryption | 加密、解密、改变 key 条件 | 明文、密文、是否恢复原文 | 简化模型标明；不能暗示加密防止删除或保证内容真实 |
| Digital signature | 分步发送、改消息、改变验证 key | 两端流程和验证成功/失败 | 可信公钥假设明确；key 和消息都参与检查；失败不自动修复消息 |
| Parity | 生成、发送、翻转位、检查、单错纠正 | 原块/收到块、计数、失败行列、复查 | 发送与接收数据分别保存；不能根据受损数据重建“原始检查位”；纠正以单错假设为条件 |
| Checksum | 分步计算、改接收数据、比较 | 两端求值、相同/不同、请求重传决定 | 算法、模数及输入范围始终可见；相同值不等于绝对无错 |

共用的按钮、状态提示和数字呈现可复用，模型计算保持独立可测试。无需为每一个术语做一套独立插件。

实施可复用的两组明确数据：

- **Check digit：**本例四位数据权重为 3、1、3、1。`4726` 的加权和为 31，补 9 达到 10 的倍数，完整代码为 `47269`。将数据改为 `4727` 但保留末位 9，核验总和为 41，应失败；不要根据被改数据自动生成新的末位后再宣布通过。
- **Checksum：**本例为 byte 值总和 modulo 256。`[84,121,77]` 得 26；收到 `[84,120,77]` 得 25，比较失败；`[85,120,77]` 又得 26，作为后揭示的抵消变化反例。相同 checksum 不能证明数据一定未改变。

## 8. Classroom 与 Full reading 的页面设计

### 8.1 课堂默认视图

```text
Section 6   Module 2: Enter a reliable record       [Full reading]
Unit 05: Can a reasonable mark still be wrong?      [Contents]

[Observe] [Explain] [Try it] [Check] [Past paper] [Recap]

                 A focused task or visual
          One source card + one input/result area
              A short explanation when needed

[Back]                     Step 2 of 5              [Next]
                    [Reset]  [Reveal explanation]
```

这是一份布局草图，不是新页面截图。阶段名称可按单元需要省略；不要为了凑满六个标签创造无意义内容。

- 全宽工作区用于主要图形、表单或位矩阵；尽量同时显示任务必需的条件与操作区。
- 前置知识按需展开，不占据每个阶段开头数百像素。
- 每一步初显只承担一个问题；长解释移到下一步或按需展开。
- 正文与图形标签可采用约 24–28 CSS px 作为投屏试排起点；不能用这一数值替代真实可读性检查。
- 可操作目标初始按至少 48 CSS px 的舒适触摸尺寸设计；位矩阵在大屏优先约 56–64 px。实际尺寸随布局调整。
- 控件固定在可预期位置，不能遮挡图或题目；使用清楚的文字状态，并提供键盘焦点。
- 颜色之外还用文字、图标或边框标明 pass/fail、sender/receiver，不仅靠红绿区分。
- 不使用仅 hover 才能发现的信息，不要求精细拖动；点击/键盘即可完成相同操作。
- 原题保留比例和内容，提供放大及查看完整上下文；不为适应一屏裁掉条件、图或小问。

### 8.2 状态规则

- 首次打开默认 Classroom，按单元默认第一步；链接到特定单元或题目时可直接到该位置。
- 修改输入后清除或明确标记旧结果，不能继续显示对应旧输入的绿色通过。
- Back 保留本次实验的数据，便于解释；Reset 恢复该实验的明确起始状态，并关闭已揭示答案。
- 切换知识单元时关闭答案，重置该单元到约定的起始状态；不把上一实验的数据带入无关实验。
- 切换阅读模式时定位到同一个知识单元，并关闭答案；返回课堂后保留学习位置，按明示规则处理实验状态。
- 学生先预测，但教师可以直接揭示，不设计强制答对才能翻页的阻断流程。
- 不跨浏览器会话默认保存已显示的答案；不为本课程引入账户或服务器进度存储。

### 8.3 阅读模式

使用同一份内容数据，连续呈现前置知识、完整解释、全部步骤、例子、结果、理解检查、真题和总结。答案默认折叠。阅读模式保留图和表，不依赖用户已经操作过实验才能看懂。

JavaScript 不可用时至少能阅读完整说明与静态示例。课堂互动全部使用本地静态资源和确定性代码；这不等于自动具有离线网站功能。离线访问整章需单独准备已有本地发布包并测试，不承诺断网后导航必定可用。

## 9. 代表性单元 A：Validation 与来源核对

位置：U02 初步发现问题，U05 完成来源核对。下列学生正文全部为英文；实施时 U02 的 comparison 可先由教师展示，U05 再解释两种正式核验方法，避免提前堆叠术语。

### 9.1 初显素材与预测

**Can a reasonable mark still be wrong?**

> The paper mark sheet says **46**. The test is marked out of **75**. A teacher enters **64** into the school system.
>
> The rule accepts whole-number marks from **0 to 75 inclusive**.
>
> **Predict:** Will 64 pass this rule? Does passing the rule mean that the mark was copied correctly?

屏幕仅并排显示原始成绩卡、规则卡和输入框。预测时不出现绿色结果，也不先显示定义。

### 9.2 分步解释

1. **Test the rule.** 64 lies between 0 and 75, so it passes the range check.
2. **Compare with the source.** The original sheet says 46. The entered value does not match it.
3. **Name the two questions.** Validation checks whether data follows stated rules. Verification checks whether it has been entered or copied accurately from its source.
4. **Correct and check again.** Read the source, replace 64 with 46, then repeat the required checks.

### 9.3 操作规范与预期结果

Controls: `Entered mark` · `Check the rule` · `Compare with the source` · `Reset`.

| Entered mark | Range check | Source comparison | Feedback |
|---|---|---|---|
| 76 | Fail | Does not match | The value is above the maximum mark. Check the source before correcting it. |
| 64 | Pass | Does not match | The value follows the rule, but it was copied incorrectly. |
| 46 | Pass | Matches | These checks pass. They do not independently prove that the original sheet is correct. |

本基础实验的输入是整数。空值和非整数必须显示需要提供符合输入条件的数据，不能用隐式数值转换把空值判为 0；正式 presence、format 等方法在相应课次展开。

### 9.4 理解检查与阅读解释

> **Check:** Two independent entries both contain 64. The source sheet says 46. Will comparing the two entries detect this mistake? Explain.

Reveal:

> No. The entries match, so the comparison does not expose the shared mistake. Comparing the entry with the original sheet would reveal the difference.

Reading explanation:

> A reasonable value can still be the wrong value. Validation checks rules; it does not know which mark the teacher intended to copy. Verification can detect a difference between a copy and its source. If the source itself is incorrect, a faithful copy can still contain incorrect information.

### 9.5 真题过渡

- U02 使用 N-VAL：9618/13 O/N 2023 8(a)，2 分。让学生先识别题目排除 verification，再说明 validation 的作用。按官方原题情境作答，不能把题目改成学校故事后仍称为原题。
- U05 先完成输入核验理解检查，并补找专门检验输入核验的原题。E049 涉及尚未教过的传输方法，完整原题延后到 U15，届时返回此例比较输入与传输核验。
- 分别显示 `Official question`、`Official mark scheme`、`Teacher explanation`。
- N-VAL 不能检验全部七类 validation，也不能替代 double entry 的应用题。保留具体方法应用的补题任务。

教师检查理解的标准：学生能给出“合规则但录错”的例子，能解释两次相同错误为何漏检，并能根据失败结果回到来源核对。

## 10. 代表性单元 B：Digital signatures

位置：U12，在 U11 加密和 key 基础之后。Digital signatures 保持必学，复杂密码学实现不扩成 A2 课程。

### 10.1 情境与最小前置知识

**Has the signed mark record changed?**

> The examinations officer sends **Student AB012: 46**. Someone changes the message to **Student AB012: 64**.
>
> The receiver needs to check whether the received message is the content signed by the officer.

按需逐张揭示：

- **Digest:** A fixed-length value calculated from a message using a hash algorithm. The same message and algorithm produce the same digest.
- **Private key:** Kept secret by the signer and used to create the signature.
- **Public key:** Used by the receiver to verify the signature. In this example, the receiver already trusts that this key belongs to the officer.

先解释 hash 和 encryption 作用不同；不引入 SSL/TLS、证书签发流程、量子密码或完整算法比较。

### 10.2 操作顺序

首次演示前简短标明：**“A simplified digest-encryption model for this exam explanation.”** 实际展示两条接收路径，不能将核心步骤藏在一个泛称 Verify 的按钮后。

1. **Prepare:** Display `Student AB012: 46` in the sender lane.
2. **Hash:** Calculate the message digest. Label the supplied conceptual result `Digest A`.
3. **Sign:** In this model, encrypt Digest A using the officer’s private key to create the digital signature.
4. **Send:** Send the message and signature. Keep the private key at the sender.
5. **Predict:** Keep the message unchanged, or change 46 to 64 while keeping the original signature.
6. **Recover the signed digest:** In the first receiver path, use the officer’s trusted public key to decrypt the signature and recover Digest A in this model.
7. **Hash the received message:** In the second receiver path, apply the same hash algorithm to the received message. The unchanged message gives Digest A; the changed message gives the supplied Digest B in this example.
8. **Compare:** Place the two digests side by side. A versus A matches; A versus B does not. Explain why the old signature cannot authenticate the changed content.
9. **Interpret:** Explain what this result establishes under the stated assumptions. A failed check does not reveal the original mark or restore it automatically.

### 10.3 预期状态与反馈

| Condition | Verification result in this model | Explanation |
|---|---|---|
| Original message, original signature, correct trusted public key | Pass | The signature verifies for the received content and the trusted signer key. |
| Message changed from 46 to 64, original signature retained | Fail | In this example the changed content produces Digest B. The original signature does not verify for it. |
| Original message and signature, a different verification key | Fail | This key does not verify the officer’s signature. |

`Digest A/B` 是概念标签，界面明确写 **“Supplied values for this illustration.”** 不能把标签伪装成实际计算的密码学输出，也不能暗示任意两条消息绝不会有相同摘要。

Basic check:

> The message is signed but not encrypted. Can someone who sees the transmission read the mark?

Reveal:

> Yes. A signature does not hide the message. Encryption is needed to protect its confidentiality.

Follow-up:

> A signature verifies successfully. Does this prove that 46 is the student’s true mark?

Reveal:

> No. Under the stated conditions, the check supports the claimed origin and unchanged signed content. The officer could have signed an incorrect mark.

### 10.4 真题与 MS 措辞

接 N-SIG：9618/11 M/J 2025 7(b)，5 分，QP p12 / MS p11。先独立作答，再沿 sender→receiver 的过程核对评分点。

该题的 MS 使用对摘要加密、接收端恢复摘要并重新计算比较的简化叙述。教师答案按该题术语讲解；阅读层加一句简短限定：

> This question uses a simplified model in which the digest is encrypted and recovered. Signature algorithms differ, but verification must check the signature against the received message and the signer’s key.

E046 不能出现在此单元的对应真题位置。学生能解释“改内容不改旧签名”的结果、key 的角色和不保密的边界，才进入真题。

## 11. 代表性单元 C：Block parity

位置：U14，先完成 U13 的 even/odd byte parity。本例复用已有可检查数据，首轮明确假设 **exactly one transmitted bit changes**。

### 11.1 从发送端开始构建

**Can we locate one changed bit?**

> Each row begins with seven data bits. Use even parity. First add one row-parity bit, then construct and send the final column-parity row.

| Data row | Seven data bits | Row-parity bit | Complete row |
|---|---|---|---|
| 1 | 1011001 | 0 | 10110010 |
| 2 | 0110000 | 0 | 01100000 |
| 3 | 1100011 | 0 | 11000110 |

逐列计算得到最后一行 `00010100`，构成完整发送块：

```text
10110010
01100000
11000110
00010100
```

屏幕区分 data bits、row-parity bits、column-parity row。最后一行由发送方生成并传送，不能在接收端依据受损数据重新补出。

### 11.2 学生操作与反馈

Controls: `Build row parity` · `Build column parity` · `Send` · `Flip a bit` · `Check rows` · `Check columns` · `Correct one bit` · `Reset`.

根据步骤只显现当前需要的少量控制，避免九个按钮同时争夺注意。数据格支持点击或键盘切换，另提供行/列选择与 Flip 按钮作为等价操作。

基础演示翻转第二行第五列：`01100000 → 01101000`。

- 各接收行中 1 的数量为 4、3、4、2，只有第二行违反 even parity。
- 各接收列中 1 的数量为 2、2、2、2、1、2、2、0，只有第五列失败。
- 在单错假设下，交点为第二行第五列；把 1 改为 0。
- 重新检查完整块，确认所有行列恢复 even parity。

Reveal:

> Row 2 and column 5 fail the even-parity check. If exactly one bit changed, their intersection locates it. Flip that bit, then check the rows and columns again.

### 11.3 理解检查与真题

> Does a byte-parity failure by itself tell you which bit to correct? What extra information does block parity provide?

Reveal:

> A byte-parity failure indicates a parity error but does not identify one bit position. Row and column checks can locate the intersection under the single-bit assumption.

接 N-PAR(ii)：9618/12 O/N 2025 6(c)(ii)，1 分。展示原题完整矩阵与 even-parity 条件，让学生自行找出需标记的位。N-PAR(i) 的 1 分 parity-bit 题放在 U13，不把一题的重复展示计成两次独立掌握证据。

随后用自编小检查要求解释定位理由，补充原题仅圈位所未检验的推理。基础掌握后才开放 multiple changes；四角翻转的漏检示例默认折叠，不自动执行纠正。

## 12. 实施结构与兼容性方案

实施前再次检查实际工作区状态。本轮发现已有 423 条 status 记录，包括被删除的旧审计文档和 AGENTS.md；它们属于既有状态，不能为了本任务恢复、清理或提交。

建议沿用项目已在 S3/S4/S5 使用的“内容数据 + 专属渲染 + 独立模型 + 作用域样式”方式，为 S6 建立对应模块：

- Journey：模块、教学组、前置知识、阶段文案、素材和精确题目分配。
- Classroom renderer：同一数据生成 Classroom/Full reading 两种展示。
- Models：输入校验、权限、规则匹配、校验位与 checksum 的纯计算函数。
- Labs/controller：模型结果映射到可访问 UI；统一答案揭示与导航状态。
- Scoped CSS：只影响 S6，复用现有基础排版和题目组件。

建议增加 `course-v3-section6-journey.mjs`、`course-v3-section6-classroom.mjs/.js/.css`、`course-v3-section6-models.js` 和必要的 labs 文件；不要复制一整套其他章节代码后长期分叉。已有 examples 中正确的数据与函数优先复用。

### 路径与导航

六模块可采用章节内的稳定语义路径，例如 `section-6/module-01/` 至 `module-06/`。这是待实现的路径建议，不是现有页面链接。

- 保留 L033–L037 旧 URL 的兼容入口，不重编号其他章节。
- L033 对应 M1；L034 的账户/biometrics 去 M3，firewall/anti-malware 去 M4，signature 去 M5；L035 去 M4；L036 的 rights 去 M3、encryption 去 M5；L037 的输入部分去 M2、传输部分去 M6。
- 旧 `#unit-N` 与 `#eNNN` 链接需逐项映射，不能把整个旧课无条件导向一个新模块后丢失原锚点。
- 旧页不带锚点时可提供简短兼容入口菜单，列出该课内容的新位置；已知锚点优先直接到目标。
- 更新 Section 6 目录、主课程列表、前后导航与相关资源链接，让学生默认走新主线。
- 新模块身份与旧 lesson sequenceIndex 分开管理；现有真题的来源身份不因移动位置而改变。新增字段用于教学展示位置，不伪造官方试卷身份。
- 生成器目前会重写多个章节和资源文件。实施应在写入前比较内容，并核对 diff，避免把既有未提交改动与本次生成结果混在一起。

若现有生成器对固定课程数量有约束，应在局部扩展章节路由/清单，保留其他章节身份和内容。实施前记录实际受影响文件；不要求为了六模块重新编号整站。

### 验证重点

1. 32 个旧目标全部有主教学位置，官方要求无遗漏；内容确实解释了目标，不能只检查 ID 出现。
2. 真题映射用显式目标和考查动作；反例必须断言 E046 不分配到签名/认证。
3. 独立验证模型输入与预期结果：边界值、空值、权限拒绝不改文件、rule first match、接收数据与发送检查信息隔离、校验通过与漏检。
4. 真题 PDF/摘录哈希、上下文、分值与来源；已揭示答案在切换时正确关闭。
5. 浏览器覆盖 1366×768、1920×1080，另做窄屏阅读与放大检查；关键触摸目标和键盘操作可达。
6. 切换模式、Back/Next、Reset、输入变更后的反馈、旧 URL/锚点和全章导航实际操作。
7. 新增图片逐张核对术语、对象、方向和大屏可读性；所有本地资源可加载。
8. 真实教室屏幕、HDMI 与直接浏览器访问由实际设备验收；浏览器尺寸模拟只作为前置检查。

当前工作区保留 S3/S4/S5 的 Node 测试，但旧 `verify-all.mjs` 不在现有文件中。实施时沿用实际存在的项目命令并补必要的 S6 模型/映射测试，不能宣称运行了不存在的历史校验器，也不为本任务恢复既有删除。

## 13. 实施顺序与验收门槛

1. **确认本方案**：六模块与建议课次、三种代表单元、素材计划、仍需补题的范围。
2. **先实现一条完整学习链**：选择 validation/verification 或 signature，完成英文材料、互动、理解检查、真题、两种模式及大屏检查。
3. **按同一结构完成全章**：迁移可保留内容，补齐场景图与互动，逐项落实覆盖矩阵和题目缺口。
4. **完成局部兼容与验证**：目标、计算、题源、旧链接和浏览器操作均核验；列出真实设备未验证项。
5. **提供本地可审阅结果**：汇报修改文件和实际运行检查。提交与远程推送不在当前授权范围内。

完成实施的标准：初学者能从页面获得必要的前置概念，观察并解释一个完整机制，亲自改变条件检验理解，再使用已学内容回答对应原题。不能以“页面更漂亮”“新增图片多”“目标编号齐全”代替上述证据。

## 14. 本轮验证记录

- 已检查：官方 syllabus 版本、p.24 范围、A2 边界；本地 32 个目标和 26 个知识单元；现有六组真题与三组候选来源；五页浏览器基线和重点授课交互。
- 已识别：过宽真题关联、机制操作不足、课堂长文负担及需要调整的概念顺序。
- 本轮不运行课程生成器、构建或课程实现测试，因为没有实施课程修改。
- 已用只读 Python 检查：32/32 个现有目标唯一覆盖，16 个课次连续，45 分钟分配相加正确，本地文档链接存在，Markdown 围栏成对且无行尾空白。
- 独立复算通过：block parity 的行列计数与单错纠正、check digit 的 47269 与改动后失败、checksum 的 26/25/26 对照。
- 文件保护检查通过：开始时记录的 1253 个既有文件 SHA-256 全部不变；原有 423 条 Git status 记录原样保留；唯一新增文件是本方案。
- 浏览器重点检查期间未记录到 console warning/error；临时本地预览服务已停止，浏览器尺寸设置已恢复。
- 两次独立复核确认目标范围和题源；已据此把签名接收端细化为 Recover → Hash → Compare，并将 E049/E050 完整练习安排在所需方法教完之后。

置信度：官方范围、现有题源和所述浏览器行为为高；16 节排课及素材组合为中高，需要试教；真实大屏系统/浏览器兼容性尚未验证。
