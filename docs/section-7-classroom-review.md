# Section 7：初学者课堂改版说明

更新日期：2026-09-29。本文记录教学结构与实现边界；课程内容以 [journey 数据](../scripts/course-v3-section7-journey.mjs)为准，试题依据见[来源核验](section-7-source-review.md)。

## 1. 教学范围与主线

面向已学过前面章节、首次学习 Section 7 的学生。学生页面使用英文，先建立概念与因果解释，再练习接近官方 mark scheme 的表达。答案要点不能代替初学者讲解。

- **18 个概念组、19 个唯一目标、14 个建议课时，每课时 45 分钟。** 课时可按理解进度延长或拆分，没有总课时上限。
- 保留 `lesson-038`—`lesson-041` 四个旧路由，以及原有 unit、practice、summary 和 paper 锚点。一个路由容纳多个课时；页面、概念组与课时不作一对一绑定。
- 贯穿案例：学校准备采用拍照、翻译并朗读的阅读助手。学生依次解释专业责任、比较行动后果、判断软件权限、理解 AI 信息流程，最后综合社会、经济和环境证据提出建议。
- 另用测试报告、定位用途、课堂监控、AI 作业帮助、灌溉泵等独立例子检验迁移，避免学生只记住一个故事。
- 每组先观察素材，再分步讲解和完整例题，安排即时检查；相关概念组完成后放入已核验真题。没有合适真题的目标保留明确标注的教师自编检查。

## 2. 双模式与操作方式

[课堂渲染器](../scripts/course-v3-section7-classroom.mjs)使用同一份 journey 内容生成课堂模式与完整阅读模式。课堂按 Observe、Recall（需要时）、Explain、Work together、Experiment（有互动时）、Check、Past paper（有对应题时）、Connect 推进；完整阅读保留解释、例题与检查反馈，支持学生独立自学。

Section 7 复用 Section 5 的课堂 controller、`renderGuidedFigure` 与 `renderGuidedSteps`，并使用 [Section 7 适配器](../scripts/course-v3-section7-classroom.js)处理本章实验的隐藏和重置。新增行为限定在 `data-s7-classroom` 内，Section 5 行为保持原样。

教师操作控件，学生口头或纸上作答；检查答案和 mark scheme 默认收起。互动无学生账号、无在线提交或答案存储要求。讲解与完整例题不依赖 JavaScript 才能阅读。实际展示目标是笔记本 HDMI 投屏及智能大屏直接访问，使用大字、明确按钮与触控可操作的控件。

## 3. 概念组、目标与素材映射

下表由当前 journey 导出。每行列出该组教学目标；真题的**直接考查目标**另由 `section7PaperObjectives` 和来源核验定义，不能把该组所有目标都算作该题覆盖。

| 序号 | 概念组 ID | 旧路由 | Objective IDs | 讲解素材 | Lab | 真题组 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `reading-assistant-responsibility` | L038 | `S7.01.A01` | 情境、分步讲解、完整例题；`reading-assistant-responsibility-academic.svg` | — | — |
| 2 | `duties-in-action` | L038 | `S7.01.A02` | 情境、分步讲解、完整例题 | — | — |
| 3 | `professional-bodies-and-codes` | L038 | `S7.02.A01`, `S7.02.A02` | 情境、分步讲解、完整例题；`professional-responsibility-academic.svg` | — | `E051`, `E052` |
| 4 | `identify-stakeholders` | L039 | `S7.03.A01` | 情境、分步讲解、完整例题；文字表格 | — | — |
| 5 | `compare-consequences` | L039 | `S7.03.A02` | 情境、分步讲解、完整例题；`ethical-decision-paths-academic.svg` | `ethics` | — |
| 6 | `justify-a-response` | L039 | `S7.03.A01`, `S7.03.A02`, `S7.03.A03` | 情境、分步讲解、完整例题 | — | `E053` |
| 7 | `copyright-and-permission` | L040 | `S7.04.A01` | 情境、分步讲解、完整例题；`copyright-permissions-academic.svg` | — | — |
| 8 | `free-software-freedoms` | L040 | `S7.05.A01` | 情境、分步讲解、完整例题；文字表格 | — | — |
| 9 | `open-source-permissions` | L040 | `S7.05.A02` | 情境、分步讲解、完整例题 | — | — |
| 10 | `trial-price-and-business` | L040 | `S7.05.A03`, `S7.05.A04` | 情境、分步讲解、完整例题；`software-freedoms-and-price.png`；文字表格 | — | `E7D01` |
| 11 | `choose-a-licence` | L040 | `S7.04.A01`, `S7.05.A01`, `S7.05.A02`, `S7.05.A03`, `S7.05.A04`, `S7.05.A05` | 情境、分步讲解、完整例题 | `licence` | `E054` |
| 12 | `ai-learning-and-inference` | L041 | `S7.06.A01` | 情境、分步讲解、完整例题；`learning-and-inference.svg` | — | — |
| 13 | `page-to-speech` | L041 | `S7.06.A02` | 情境、分步讲解、完整例题；`image-to-translated-speech.svg` | `pipeline` | — |
| 14 | `ai-applications-and-use` | L041 | `S7.06.A02` | 情境、分步讲解、完整例题；`ai-inference-pipeline.png`；文字表格 | — | — |
| 15 | `social-access-and-fairness` | L041 | `S7.06.A02`, `S7.06.A03` | 情境、分步讲解、完整例题；`ai-fairness.png`；文字表格 | `fairness` | `E055`, `E7D02` |
| 16 | `economic-costs-and-work` | L041 | `S7.06.A04` | 情境、分步讲解、完整例题 | `costs` | — |
| 17 | `environmental-balance` | L041 | `S7.06.A05` | 情境、分步讲解、完整例题；`ai-environmental-balance.png`；文字表格 | `environment` | — |
| 18 | `evaluate-the-school-pilot` | L041 | `S7.06.A06` | 情境、分步讲解、完整例题 | — | `E7D03` |

维护时优先修改 journey；如调整组 ID、目标、素材、lab 或题目位置，同步更新本表和下面的建议课时表。

## 4. 建议课时安排

这些是教学节奏建议。教师可回到上一组补讲，也可将一个课时拆成两次授课；不会因此创建或改名旧路由。

| 课时 | 主题 | 概念组 ID | 建议分钟 |
| --- | --- | --- | --- |
| 1 | Why a reading assistant creates responsibilities | `reading-assistant-responsibility`, `duties-in-action` | 45 |
| 2 | Professional standards and support | `professional-bodies-and-codes` | 45 |
| 3 | People and the consequences of choices | `identify-stakeholders`, `compare-consequences` | 45 |
| 4 | Justify and reconsider an ethical action | `justify-a-response` | 45 |
| 5 | Copyright and software freedoms | `copyright-and-permission`, `free-software-freedoms` | 45 |
| 6 | Source, trials and business terms | `open-source-permissions`, `trial-price-and-business` | 45 |
| 7 | Choose from the school’s requirements | `choose-a-licence` | 45 |
| 8 | What makes a task an AI task? | `ai-learning-and-inference` | 45 |
| 9 | From a photographed page to speech | `page-to-speech` | 45 |
| 10 | Explain applications through their information flow | `ai-applications-and-use` | 45 |
| 11 | Access, fairness and privacy | `social-access-and-fairness` | 45 |
| 12 | Productivity, money and work | `economic-costs-and-work` | 45 |
| 13 | Measure the environmental comparison | `environmental-balance` | 45 |
| 14 | Make the final school recommendation | `evaluate-the-school-pilot` | 45 |

## 5. 六个互动的教学作用

确定性数据与计算见 [models](../scripts/course-v3-section7-models.js)，界面见 [labs renderer](../scripts/course-v3-section7-labs.mjs)，操作逻辑见 [labs controller](../scripts/course-v3-section7-labs.js)。情境和数值均为教学自编数据，控件改变条件后展示推理过程；不调用实时 AI 服务。

| Lab | 学生先预测什么 | 可改变的条件 | 反馈与边界 |
| --- | --- | --- | --- |
| `ethics` | 谁受到影响，行动会带来什么后果 | 已知读错警示语／录音被改用于招生排名；暂停／限用／继续；有无保障 | 展示相关人、职责与行动后果；保障缺失时不能假定替代方案已落实，不用分数替学生作伦理判断。 |
| `licence` | 哪个完整报价符合学校要求 | 修改、再分发、支持需求及年度预算 | 比较四份虚构报价的具体权限、费用和支持；可收费的自由／开源软件与专有软件分开解释，30 天试用不能证明全年可用。 |
| `pipeline` | 每一步输入和输出是什么，错误从哪一步出现 | 清晰／模糊的法语页面；是否核对并修正 OCR | 显示 OCR、语言解释、翻译与语音输出的文字轨迹。`Sortie` 漏掉字母变成 `Sorte` 后会传递错误；这是流程示例，无实时语音合成。 |
| `fairness` | 总准确率能否代表每组学生 | 样本比例与第二组识别结果 | 展示分组计数、分组正确率与总体正确率；95%／75% 来自同样的分组正确率但不同权重，改善示例为 99%。不把虚构数据当真实口音表现。 |
| `costs` | 节省的时间是否足以抵消成本 | 人工检查量、服务费与比较月份 | 同时计算初始成本及服务、检查、维护、返工等月度成本；区分员工时间价值、现金支出和就业影响。 |
| `environment` | 节省的泵电量是否大于新增系统耗电 | AI 与冷却用电、额外硬件制造能耗及寿命分摊 | 先比同一时间段的用电，再加入明确说明的制造能耗分摊；用水、排放、材料和电子废物需独立证据，不能从 kWh 单独推出全部环境结论。 |

数值一致性基准：经济例题每月人工基线 1200，计划方案每月 1100、初始 600，6 个月持平、12 个月节省 600。环境例题月度基线 1000 kWh，泵 850 加 AI／冷却 80 得 930；12 个月运行 11160，再加 240 的制造分摊得 11400，比 12000 基线少 600。更高审查成本、冷却耗电或较短硬件寿命可以改变结论。

## 6. 真题来源与覆盖边界

共 **8 个题组、12 个选定小题、33 分**：原有 E051—E055 为 7 小题／20 分；新增 E7D01—E7D03 为 5 小题／13 分。逐题 QP/MS 页码、原 PDF 与裁图 hash、上下文保留方式及官方 syllabus 版本见[来源核验](section-7-source-review.md)，新增数据定义见 [extra papers](../scripts/course-v3-section7-extra-papers.mjs)。

| 题组 | 来源与选定小题 | 分值 | 本次使用范围 |
| --- | --- | --- | --- |
| E051 | 9618/13 O/N 2024，5(b) | 3 | 专业团体会员收益 |
| E052 | 9618/12 O/N 2025，2(b) | 2 | 专业行为准则的作用 |
| E053 | 9618/12 O/N 2024，5(a) | 4 | 对同事与公众的职责及后果 |
| E054 | 9618/12 O/N 2024，5(b)(i)、5(b)(ii) | 5 | 源码修改、付费维护与版权 |
| E055 | 9618/12 M/J 2025，3(a)、3(b) | 6 | 阅读／翻译装置的处理步骤与社会收益 |
| E7D01 | 9618/11 O/N 2024，7(a)、7(b) | 4 | Shareware 与商业分发的收益 |
| E7D02 | 9618/13 O/N 2025，7(a) | 2 | 课堂 AI 监控的一个展开说明的影响 |
| E7D03 | 9618/11 O/N 2025，8(b)、8(c) | 7 | 学校网络伦理与 AI 作业帮助的社会影响 |

真题安排用于迁移练习，不代表整组目标均获考试覆盖。现有选题没有直接覆盖 AI 经济影响、环境影响及完整部署评价；这些保留自编材料和检查。E7D03 保留 Q8 总题干中的既有 malware 示例，因为 8(b) 要求三个 **other** considerations；不选入 8(a)。MS 中通常存在的商业支持／测试收益不写成保证，专业组织名称不当作具体软件许可证。

## 7. 图解与来源登记

开场案例、职业责任、伦理决策、版权许可和 AI 公平图已改用五张可编辑的学术 SVG。源文件为 [opening case](../scripts/course-v3-section7-academic-scene.mjs) 和 [concept figures](../scripts/course-v3-section7-academic-concepts.mjs)。文字、箭头、数据均由源码定义；白底细线与少量强调色用于区分关系。详见[全项目图片风格复核](academic-figure-review.md)。

原开场 ImageGen 图不再用于课程，其 prompt、hash 与停用原因保留在 [classroom images registry](../scripts/course-v3-section7-classroom-images.json)。此前八张 ImageGen 图片也保留原文件及[来源登记](../scripts/course-v3-section7-imagegen-assets.json)，其中四张人物／装饰型图已在本次替换；`shareware-trial.png` 仍未被新 journey 使用。

| 当前讲解图片 | 使用位置 |
| --- | --- |
| `reading-assistant-responsibility-academic.svg` | reading-assistant-responsibility |
| `professional-responsibility-academic.svg` | professional-bodies-and-codes |
| `ethical-decision-paths-academic.svg` | compare-consequences |
| `copyright-permissions-academic.svg` | copyright-and-permission |
| `software-freedoms-and-price.png` | trial-price-and-business |
| `ai-inference-pipeline.png` | ai-applications-and-use |
| `ai-fairness-academic.svg` | social-access-and-fairness |
| `ai-environmental-balance.png` | environmental-balance |

另复用 `learning-and-inference.svg` 与 `image-to-translated-speech.svg` 两张流程图，其源文件为 [section7 diagrams](../scripts/course-v3-section7-diagrams.mjs)。图像中的说明不能作为唯一知识来源；可编辑正文保留必要解释。

## 8. 验证记录

来源检查详见来源核验文档。独立教学复核已检查主要概念、真题前置讲解与互动数值；发现的“暂停且缺少保障，却假定已有可靠替代方案”问题已在 models 中按条件修正。

主任务已完成以下浏览器验收：

- 1366×768：四课的课堂、阅读两种模式均无页面横向溢出和破图。
- 390×844：四课双模式检查完成；L041 成本互动曾被内部表格撑宽，已通过 Section 7 范围内的 grid 最小宽度修复，并复核阅读模式页面宽度为 390。
- 1920×1080：首课投影视觉检查完成。
- 六个互动实操、条件重置、隐藏答案、阅读工具栏续教、图片对话框、E052 提示／答案／MS 分开揭示，以及旧 past-paper-questions 锚点在阅读模式下定位均通过。

生成命令：`node scripts/render-course-v3.mjs`，成功生成 93 个课程页面、12 个章节目录、151 个兼容入口和 552 个登记素材。

相关回归命令：

```bash
node --test scripts/course-v3-section7-classroom.test.mjs scripts/course-v3-section7-models.test.cjs scripts/course-v3-section5-interactive.test.mjs scripts/course-v3-section5-models.test.cjs scripts/course-v3-section3-classroom.test.mjs scripts/course-v3-section4-classroom.test.mjs
```

结果：137 项全部通过，0 失败、0 跳过。覆盖 S7 教学映射、真题前置条件、旧链接、原始 PDF／裁图哈希和六个互动模型，并检查相关共享模块的 S3–S5 回归。

另外完成：

- 五个 S7 页面共 216 个本地链接／资源引用均可找到目标；新 ImageGen 图片 SHA-256 与登记一致。
- 真实浏览器中确认 Section 5 的 L028 课堂／阅读切换正常；S7 旧 `unit-6`、旧真题入口和新 `e7d03` 链接均能定位。
- 当前浏览器会话未捕获 warning／error 日志。
- 对照改版开始时的 SHA-256 记录，未删除已有文件，其他章节生成页面的内容保持不变。
- 本次变更的 `git diff --check` 通过。未提交、推送或发布。

真实 HDMI 和教室触摸硬件未接入，本次浏览器检查不代表已验证这些硬件条件。未执行离线发行打包；本轮目标是正常联网访问和本地审阅。
