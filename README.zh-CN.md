# Beautify

> [English](./README.md)

基于 Tailwind CSS v4 编译器的纯 CSS 组件与工具库。注释全面，AI 友好支持。无需 JavaScript，即可为 HTML 原生节点提供样式美化，并附带全面的 utility class 用于 UI 布局。

立即查看 **[100个组件演示](https://unpkg.com/@codady/beautify/examples/index.html)** →

---

## 概述

Beautify 作为 Web 项目的底层 CSS 层，位于 Tailwind CSS 之上、应用层样式之下，扮演基础设计系统的角色。它不是 Tailwind 的替代品，而是对 Tailwind 的补充，提供以下内容：

- 预样式的 HTML 原生元素（输入框、按钮、表单、表格等）
- UI 组件库（徽标、标签、面包屑、分页、步骤条、分割线等）
- 补充 Tailwind 默认不包含的 utility class
- 基于 OKLCH 色彩空间的完整设计令牌系统

所有组件和工具类均以 Tailwind v4 的 `@utility` 指令编写。经 Tailwind CLI 编译后，未使用的类会被自动移除（tree-shaking）。

---

## AI 友好设计

本项目已充分考虑 AI 引擎的阅读需求。`src/` 目录下的每个 CSS 文件都包含详尽的注释，说明每个组件的结构、变体和用法。这意味着：

- **AI 仅需阅读 `src/index.css` 即可完全理解整个项目** — 所有组件、工具类及其关系都在上下文中以注释方式完整记录。
- **配合阅读 `examples/index.html`** 可进一步提升准确度：示例文件将每个组件映射到可视化演示，为 AI 提供每个组件外观和行为的完整参考。
- 二者结合，AI 可**快速自动创建准确的演示和使用示例**，无需依赖外部文档。
- 为了节省token消耗，可以直接让AI阅读`skill.md`文件即可。

---

## 目标用户

只要项目中已集成 **Tailwind CSS**，即可直接使用 Beautify。

---

## 浏览器兼容性

项目使用了较新的 CSS 特性，需要以下浏览器版本：

| 特性                   | 最低浏览器支持                                           |
| ---------------------- | -------------------------------------------------------- |
| OKLCH 色彩空间         | Chrome 111+, Safari 15.4+, Firefox 113+（2023 年 3 月）  |
| CSS Nesting（`&`）     | Chrome 120+, Safari 17.2+, Firefox 117+（2023 年 12 月） |
| `:has()` 选择器        | Chrome 105+, Safari 15.4+, Firefox 121+                  |
| `:dir()` 选择器        | Chrome 120+, Safari 16.6+, Firefox 120+（2023 年 12 月） |
| `:user-invalid` 选择器 | Chrome 119+, Safari 16.5+, Firefox 88+（2023 年 10 月）  |
| `@property`            | Chrome 85+, Safari 15.4+, Firefox 128+                   |
| `container-type`       | Chrome 105+, Safari 16+, Firefox 110+                    |

---

## 安装

### 前置条件

- 项目中已安装并配置好 [Tailwind CSS v4](https://tailwindcss.com/docs/installation/)。

### 方式一：手动引入（推荐）

这是推荐的方式。将购买后获得的 `src/` 目录放在项目内任意位置（如 `lib/beautify/src/`），纳入版本控制，并直接引入。文件始终在您的掌控之下，不会受 `npm install` 影响。

1. 将购买后获得的 `src/` 目录复制到项目中，例如：

```
your-project/
└── lib/
    └── beautify/
        └── src/
            ├── index.css
            ├── button.css
            └── ...
```

2. 在项目的 CSS 入口文件中引入：

```css
/* 示例: app.css */
@import "./lib/beautify/src/index.css";
```

3. 配置 Tailwind CSS：

```css
@import "tailwindcss";
@import "./lib/beautify/src/index.css";
```

4. 运行 Tailwind CLI 进行编译：

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

### 方式二：通过 npm 安装

npm 包默认**不包含** `src/` 源文件，因为它们属于商业软件（详见[版权与授权](#版权与授权)）。购买授权后，需要将获得的 `src/` 目录放入 `node_modules/@codady/beautify/src/`，才能使用下面的引入方式。

1. 安装依赖包：

```bash
npm install @codady/beautify
```

2. 购买授权后，将获得的 `src/` 目录复制到：

```
node_modules/@codady/beautify/src/
```

3. 在项目的 CSS 入口文件中引入：

```css
/* 引入全部组件 */
@import "@codady/beautify";

/* 或仅引入需要的组件 */
@import "@codady/beautify/color.css";
@import "@codady/beautify/button.css";
@import "@codady/beautify/input.css";
```

4. 配置 Tailwind CSS：

```css
@import "tailwindcss";
@import "@codady/beautify";
```

5. 运行 Tailwind CLI 进行编译：

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

> 注意：由于 `node_modules` 通常不纳入版本控制，且会在 `npm install` 时重新生成，因此每次重新安装依赖（例如 CI 流程或执行 `npm ci`）后，都需要重新将 `src/` 目录复制到 `node_modules/@codady/beautify/src/`。

---

## 使用方法

Beautify 的组件使用 Tailwind v4 的 `@utility` 指令，以 class name 的形式应用于 HTML。

```html
<!-- 按钮 -->
<button class="btn-primary">提交</button>
<button class="btn-outline-error">取消</button>

<!-- 徽标 -->
<span class="badge badge-success">10</span>

<!-- 输入框 -->
<input class="input-subtle-primary input-8 input-rounded" placeholder="请输入姓名" />

<!-- 文字颜色 -->
<p class="text-primary">高亮文本</p>
```

---

## 包含的组件

本库提供 50 余个组件及工具类分组，包括但不限于：

| 类别 | 组件                                                                                                                                                                                                                                                                                                 |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 按钮 | `btn`（solid / outline / subtle / ghost / vivid / link 等变体）、`btns`（按钮组合布局）                                                                                                                                                                                                              |
| 表单 | `input` / `textarea` / `select`（共用文本输入样式）、`field`（表单布局）、`shell`（输入框外壳）、`check`（复选框/单选框）、`switch`（开关）、`rating`（星级评分）、`otp`（一次性密码）、`validate`（校验提示）                                                                                       |
| 展示 | `avatar`（头像）、`badge`（徽章）、`tag`（标签）、`segment`（药丸单选组）、`flag`（角标旗帜）、`buoy`（双段徽章）、`rank`（排名）、`stats`（统计数字）、`swatch`（色块）、`progress`（进度条）、`spinner`（加载器）、`poster`（图片封面）、`icon`（图标）、`skeleton`（骨架屏）、`table`（表格增强）、`tree`（树形组件） |
| 导航 | `breadcrumb`（面包屑）、`pagination`（分页）、`step`（步骤条）、`dropmenu`（下拉菜单）、`droppanel`（下拉面板）、`lamp`（灯式指示 Tab）、`bookmark`（书签式 Tab）、`tools`（操作工具栏）                                                                                                             |
| 排版 | `link`（链接）、`code`（行内代码）、`pre`（代码块高亮）、`blockquote`（引用块）、`kbd`（键盘按键）、`ellipsis`（文本省略）、`underline`（下划线）、`emphasis`（着重号）、`gilt`（渐变文字）                                                                                                                               |
| 布局 | `divider`（分割线）、`spacer`（间隔填充）、`comment`（评论列表）、`entry`（列表条目容器）                                                                                                                                                                                                            |
| 装饰 | `background`（纹理/渐变背景）、`blob`（有机形状）、`bubble`（带箭头气泡）、`callout`（提示框）、`alarm`（脉冲徽章）、`aura`（动态光晕边框）、`sketch`（手绘风格）、`shimmer`（流光效果）、`shadow`（阴影变量）                                                                                       |
| 状态 | `status`（状态指示点）、`deform`（可变形 CSS 图标）、`empty`（空状态占位）                                                                                                                                                                                                                           |
| 动画 | `animation`（关键帧动画工具类）、`transition`（过渡工具类）                                                                                                                                                                                                                                          |
| 颜色 | `color`（基于 OKLCH 的设计令牌系统）、`theme`（主题切换工具类）                                                                                                                                                                                                                                      |

---

## 补充工具类

Beautify 添加了 Tailwind CSS 默认未包含的 utility class：

| 类名                 | 说明                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------ |
| `inline-flex-center` | `display: inline-flex; align-items: center; justify-content: center;` 的简写         |
| `flex-center`        | `display: flex; align-items: center; justify-content: center;` 的简写                |
| `disabled`           | 应用禁用状态的不透明度和光标样式                                                     |
| `inactive`           | 对非交互元素应用降低的不透明度                                                       |
| `text-3xs`           | 8px 字号（`max(0.5rem, 8px)`）                                                       |
| `text-2xs`           | 10px 字号（`max(0.625rem, 10px)`）                                                   |
| `hidden-appearance`  | 在视觉上隐藏输入框，同时保持无障碍可访问性                                           |
| `background-cover`   | `background-size: cover; background-position: center; background-repeat: no-repeat;` |
| `rotate-reverse`     | 180 度旋转                                                                           |
| `rotate-cross`       | 45 度旋转（加号变叉号）                                                              |
| `rotate-expand`      | 90 度旋转                                                                            |
| `rotate-collapse`    | -90 度旋转                                                                           |

---

## 技术要点

### 色彩系统

Beautify 使用 **OKLCH** 色彩空间定义所有主题色。OKLCH 提供感知均匀的亮度，使框架能够根据亮度阈值自动调整浅色和深色模式下的文字对比度。色彩系统通过 CSS 自定义属性定义，并基于亮度阈值动态计算。

### Tree-shaking

由于所有组件均以 Tailwind v4 的 `@utility` 块定义，只有 HTML 中实际使用的类才会被编译进最终的 CSS 输出文件中，从而保持产物体积最小化。

### RTL 支持

依赖方向的组件（箭头、间距、边框等）使用 CSS 逻辑属性（`inset-inline-start`、`border-inline-end`、`padding-inline` 等）和 `:dir()` 选择器。无需额外配置即可支持从右到左的排版。

### 深色模式

深色模式通过向父容器添加 `dark` 类激活，或自动跟随 `prefers-color-scheme: dark` 系统设置。主题色会自动适配所有组件。

---

## 项目结构

| 路径           | 说明                                            |
| -------------- | ----------------------------------------------- |
| `src/`         | 源代码 CSS 文件（含 `@utility` 指令的 `*.css`） |
| `dist/`        | 编译产物（`beautify.css`、`beautify.min.css`）  |
| `examples/`    | 所有组件的 HTML demo 文件                       |
| `CHANGELOG.md` | 版本历史                                        |
| `LICENSE`      | 授权信息                                        |

---

## 链接

- **GitHub**: [https://github.com/codady/beautify](https://github.com/codady/beautify)
- **Gitee**: [https://gitee.com/codady/beautify](https://gitee.com/codady/beautify)
- **在线 Demo**: [https://codady.github.io/beautify/](https://codady.github.io/beautify/)
- **问题反馈**: [https://github.com/codady/beautify/issues](https://github.com/codady/beautify/issues)
- **意见提交**: [https://www.devivid.com/feedback/beautify](https://www.devivid.com/feedback/beautify)
- **客服邮箱**: devivid2026@outlook.com

---

## 版权与授权

### 源代码文件（`src/`）

`src/` 目录下的文件为**商业软件**。在任何项目（包括个人和商业项目）中使用这些文件，均需购买授权。

**购买价格**：29 美元，通过 [Lemon Squeezy](https://devivid.lemonsqueezy.com/checkout/buy/c9b1e630-10ff-490e-9f4f-b9d0bfbd8614) 支付。

### 其他文件

本仓库中的其他文件（包括 `examples/`、`dist/`、`docs/`、配置文件）均采用 **MIT 协议** 发布。

---

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)。