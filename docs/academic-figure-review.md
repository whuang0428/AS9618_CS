# 教学图片风格调整

2026-09-29。依据用户“学术风格、图片去 AI 味”的要求，将目前识别出的九张卡通人物或装饰性教学图改为可编辑的 SVG。采用白底、细线、正常比例、克制配色和明确关系；具体器件结构仍保留适合教学的技术插图。

## 替换范围

| 章节 / 页面 | 新图（相对于 `web/assets/course-v3/`） | 表达内容 |
| --- | --- | --- |
| S2 / L012 | `section-2/streaming-buffer-reservoir-academic.svg` | 流入、储存量、流出与容量；保留页面的三个文字标签 |
| S7 / L038 | `section-7/reading-assistant-responsibility-academic.svg` | 读错指令、学生依赖与开发者掌握的证据 |
| S7 / L038 | `section-7/professional-responsibility-academic.svg` | 专业知识、披露职责、知情决策和专业支持 |
| S7 / L039 | `section-7/ethical-decision-paths-academic.svg` | 共享问题下两种行动及各自后果 |
| S7 / L040 | `section-7/copyright-permissions-academic.svg` | 版权人、许可证和分别授权的三类活动 |
| S7 / L041 | `section-7/ai-fairness-academic.svg` | 分组正确率、样本构成和总体结果 |
| S8 / L044 | `section-8/data-modelling-academic.svg` | Tutor–Student 一对多关系与外键 |
| S8 / L044 | `section-8/access-rights-academic.svg` | 权限矩阵与三个独立的插入请求 |
| S8 / L044 | `section-8/developer-interface-academic.svg` | 字段定义、表单、报告和提交检查 |

源文件：

- [S2 technical figure](../scripts/course-v3-section2-academic-figures.mjs)
- [S7 opening case](../scripts/course-v3-section7-academic-scene.mjs)
- [S7 concept figures](../scripts/course-v3-section7-academic-concepts.mjs)
- [S8 concept figures](../scripts/course-v3-section8-academic-figures.mjs)

均由 `node scripts/render-course-v3.mjs` 再生成。相关替代文本和图文说明同步更新。S7 新图采用单列展示；窄屏保留 880px 图内画布并允许键盘横向滚动，避免把整张关系图的文字缩得过小。

## 教学核对

- 公平图数据明确为教学示例：A 为 90/90，B 为 5/10；分组结果为 100% 与 50%，合计为 95/100。没有把虚构口音测试当成实际研究结论。
- 版权图逐一标明 Run、Modify、Redistribute 的许可条件，不暗示源码公开后版权消失。
- 伦理图中的两条分支是备选行动，不互相构成因果。
- S8 使用正文现有学校案例和规则；三个请求独立重置，权限与完整性分别检查。
- 水槽只作为缓冲比喻，保留“持续输入不足会耗尽任何有限缓冲”的说明。

## 素材处理与检查边界

扫描当前课程 HTML 得到 43 个唯一教学栅格路径，不含真题和 MS 截图。结合原有来源登记和实际图片查看筛选替换项；没有把所有生成图片一律判为需要重画，也没有声称逐张审阅所有历史素材。

原 PNG 和来源登记均保留，当前课程 HTML 不再引用上述被替换图片。原 S7 开场图登记标为停用。一次内置 ImageGen 写实风格试稿仍有插画感，因此未采用，也未写入项目。当前九张成品由 SVG 文字和图形原语构成，不是该试稿的修饰版本。

## 验证

- 全站生成成功：93 个课程页面、12 个章节目录、151 个兼容入口、552 项登记素材。
- `node --test scripts/course-v3-section7-classroom.test.mjs scripts/course-v3-section7-models.test.cjs`：39 项通过，0 失败、0 跳过。
- 九张 SVG 均通过 XML 解析，并实际栅格化后逐张查看；文字、箭头及图表数据可辨，无重叠或裁切。
- 实际浏览器核验 S7 图片放大；390px 阅读模式四课均无页面横向溢出和破图。图内 ArrowRight 滚动产生 40px 位移，课堂阶段未误切换。
- 1920×1080 首课课堂预览已检查；本轮浏览器会话未捕获 warning 或 error。
- 实际浏览器核验 L012 水槽与三处 HTML 标签、L044 三张数据库图正常加载与显示；两页在 1366px 和 390px 下无页面横向溢出。
- 变更文件 `git diff --check` 通过。对照本轮开始时的文件哈希，未删除已有文件；生成页面变化仅涉及 L012、L038–L041、L044 及 S7 样式。
- 未连接真实教室 HDMI 或触摸屏；未执行远程提交、推送或发布。
