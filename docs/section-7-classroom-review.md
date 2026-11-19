# Section 7：五小节课堂整改

更新日期：2026-11-16。教学源为 [journey](../scripts/course-v3-section7-journey.mjs)，题源与评分边界见[来源核验](section-7-source-review.md)。学生页面使用英文。

## 教学结构

采用用户指定的 7.1.1–7.1.5 教学编号。这是本课程的小节组织方式；Cambridge 大纲将这些内容列于 7.1，没有把本课程五小节编号印在大纲中。

| 小节 | 稳定页面 | 内容顺序 | 原题 |
| --- | --- | --- | --- |
| 7.1.1 Professional ethical bodies | L038 | BCS 图、IEEE 图、职业伦理目的、会员价值与行为守则的 MS 讲解 | E051、E052 |
| 7.1.2 Ethical and unethical actions | L039 | 同事／公众责任、行为与后果对照、学校网络伦理、情境判断 | E053、E7D03B |
| 7.1.3 Copyright legislation | L040 | 版权立法必要性、所有权与许可 | E054B |
| 7.1.4 Software licensing | L040 | 四类软件各一图、统一比较表、情境选型、试用与商业分发益处 | E054A、E7D01 |
| 7.1.5 Artificial intelligence | L041 | AI 含义、构建路线、训练／测试／推断、术语关系与学习方式、影响、应用及判断 | E7D02、E7D03C、E055 |

保留 19 个目标和 18 个原知识单元的映射。课程不再用单一阅读助手项目串联全章，也不把小节数量当成固定课时承诺。阅读／翻译设备仍作为有真实题源支持的 AI 应用案例。

E054 拆为许可与版权两个完整小问；E7D03 拆为网络伦理与 AI 作业影响两个完整小问，以便紧邻对应教学。当前十个题组仍来自原八个选题组，共十二个不同分部、33 分，无重复计分。裁图保留必要共享题干；官方原文与教师解释分开。

## 双模式与材料

[课堂 renderer](../scripts/course-v3-section7-classroom.mjs)、[controller](../scripts/course-v3-section7-classroom.js)与[样式](../scripts/course-v3-section7-classroom.css)仅作用于 S7。运行时不加载 S5 或 S6 的课堂 controller。

- **Classroom** 默认每次显示一份材料，支持上一步／下一步及跨页面衔接。五小节目录在每页都可访问。
- **Full reading** 展示同一份 DOM 的完整内容；切回课堂时按当前阅读区域定位。
- 原题可见，提示、教师答案、官方 MS、评分解释默认各自收起。切换材料或模式时关闭答案并重置实验揭示状态。
- 图、比较表、原题／MS 图片可放大；放大时移动原节点，关闭后归位，避免复制交互状态。
- 无 JavaScript 时保留全文、原题及可展开的解释。导航、放大和实验需 JavaScript。
- 保留练习打印与带答案打印；打印结束恢复此前模式和展开状态。

教学材料由 [core materials](../scripts/course-v3-section7-materials.mjs)及 [AI materials](../scripts/course-v3-section7-ai-materials.mjs)提供。图解使用可编辑 HTML／SVG；表格在窄屏局部滚动。AI 保留四个可选本地实验：识别／翻译／语音流程、分组准确率、成本、环境比较。它们默认折叠，数据为教学示例，不调用在线 AI。既有伦理与许可模型的源文件仍保留，不强制插入主教学顺序。

## 内容与考核边界

- BCS／IEEE 的机构说明与 MS 提炼分开。团体会员资格不能证明产品安全或保证个人必然遵守伦理。
- 软件类别不是互斥集合。Free software 的 free 指自由；commercial 描述商业活动，不直接确定源代码权限。FSF、OSI 是组织，不能冒充两份具体许可证。
- 版权与许可证可以共存。解释未经许可复制的法律后果，不把版权保护讲成普遍必须注册。
- Learning 关系图与监督／无监督／强化学习仅作概念支持；A Level Section 18 的算法要求不加入本章。
- 本地复核范围为 2023–2025 年两考季三个变体的 18 套 Paper 1。未发现经济、环境影响或这些学习方法的直接考问。相应内容仍按 AS 大纲教授，明确标为教师解释与迁移检查，不声称拥有直接对应的 MS。
- Official QP、Official MS、教师讲解与自编检查均有各自标识。详情见来源核验。

## 兼容与构建

四个 lesson 路由、18 个旧概念组、全部 `unit-*`、目标 ID、练习和原题锚点保留。旧 `--phase`／步骤书签由 controller 回退到所属旧概念锚点。

- L040 的 `e054`／`E054` 指向许可部分，并提供版权部分链接。
- L041 的 `e7d03`／`E7D03` 指向 AI 部分，并提供移至 L039 的网络伦理部分链接。
- 各页旧 `past-paper-questions`／`original-exam-style-question` 指向该页第一份原题材料。

独立重建：

```bash
node scripts/render-course-v3.mjs --section7
node --test scripts/course-v3-section7-classroom.test.mjs scripts/course-v3-section7-models.test.cjs
```

源码编辑后只用第七章专用构建刷新四课、章节目录、本章资源及本章 contract 条目。此任务不要求修改、提交或推送其他章节。

## 本轮验证记录

已运行上述两组测试：**39 项通过，0 失败，0 跳过**。检查包括五小节顺序、19 目标／18 原单元、十题组十二分部 33 分、累计前置教学、旧锚点、ID 唯一性、隐藏答案、图表顺序、教学补充标识、全部裁图的身份／尺寸／哈希、14 份原始 PDF 身份和生成页面的本地资源。

源码语法检查已通过：`node --check` 检查 journey、renderer 与 browser controller。

主任务已在真实浏览器检查 1366×768、1920×1080 和 390px 窄屏下的章节目录与四课双模式，共 27 个视图，无页面横向溢出或 JavaScript 错误。材料锚点逐项导航、L038→L039→L038 跨页、E051 的独立 MS 展开与离开折叠、图／表／原图放大、旧书签及无 JavaScript 全文阅读均通过。

四个可选 AI 实验分别在 1366px 桌面和 390px 窄屏完成实操：默认折叠、修改输入后隐藏旧结果、重新揭示、放大、重置、关闭后归位及隐藏答案均通过。键盘切换、触屏放大与下一步、打印结束后恢复原状态均通过，无 JavaScript 错误。最后拆分的职业伦理材料已复查；软件四图、比较表、AI 关系图与各学习方式图均完成目视检查。当前共有 47 份课堂材料。

扩大回归使用本章两组测试及 `course-v3-section6-classroom.test.mjs`、`course-v3-section5-interactive.test.mjs`：**59 项通过，0 失败，1 跳过**。跳过项仅为 S5 的两份 2022 ON 12 公共源 PDF 身份检查，本地未配置 `AS9618_PAST_PAPER_PUBLIC_ROOT`；本章全部源 PDF 检查均通过。

`node scripts/render-course-v3.mjs --section7` 和 `git diff --check` 均通过。与修改前快照比较，1,532 个受保护文件内容未变，非 S7 lesson contract 条目和其余顶层元数据保持原样；已有第六章修改保留。未运行全站重建，避免刷新其他章节的生成文件。
