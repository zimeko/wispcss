# Changelog

All changes to WispCSS including new features, updates, and removals are documented here.


## [v1.0.4] - 2026-10-28

### Changes

#### Added
- Added handling for `menu` nodes.
- Added the `src-prefix` package for projects using the `tailwind` prefix.
- Added the `script-prefix.js` script; running `npm run prefix` generates prefixed `src` files.

#### Fixed
- Fixed the background color issue for `meter` nodes.
- Changed the `var(--spancing)*n` syntax to `--spacing(n)`;
- Used the `--theme` system approach to ensure variables work correctly in prefix mode.

#### Edited
- Changed the static `.light` and `.dark` classes to utility classes.

#### Removed
- Removed `normalize.css` and fully switched to Tailwind's Preflight.

## [v1.0.3] - 2026-08-03

### Changes

#### Added
- Added the `tree` component. / 新增`tree`组件。
- Added the `--default-size-check` variable to globally control the default size of radio and checkbox elements. / 新增`--default-size-check`变量，全局控制radio和checkbox的默认尺寸。

#### Fixed
- Fixed an issue where the `font-mono` font displayed incorrectly when rendering Chinese/Japanese text. / 修复`font-mono`字体在现实中文/日文时的问题。

#### Edited
- Changed the `disabled` color semantics to `placeholder`. / 将`disabled`颜色语义改成了`placeholder`。


## [v1.0.2] - 2026-07-30

### Changes

#### Added
- Added `pre.css` file and new utilities related to `pre` elements.  / 新增`pre.css`文件，并新增了与pre相关的utilities。

#### Fixed
- Modified the `segment` component to add a border to the `selected` item.  / 修改`segment`组件，对`selected`项添加边框。
- Modified the `blockquote-quote` utility to remove the `:after` pseudo-element.  / 修改了`blockquote-quote`这个utility，删除`:after`伪元素。
- Changed the default color of the `code` element to `currentColor`.  / 修改了`code`节点的默认颜色为`currentColor`。
- Updated the default background color of the `skeleton` component.  / 修改了`skeleton`组件的默认背景色。

## [v1.0.1] - 2026-07-14

### Distribution Files
- **Compiled CSS**: `dist/wispcss.css` — compiled production file
- **Examples**: `examples/index.html` directory with HTML demo files for all components

> Note: The `src/` directory contains commercial source CSS files and is **not** included in the published npm package. It is available for purchase separately.

### Changes

#### Added
- Initial release of WispCSS — a pure CSS component and utility library built on the Tailwind CSS v4 compiler.
- **Components**: 40+ UI components including buttons, badges, tags, breadcrumbs, pagination, steps, dividers, inputs, forms, switches, checkboxes, avatars, blockquotes, code blocks, kbd, links, emphasis, underline, ellipsis, gilt, spinner, progress, stats, rank, buoy, flag, segment, swatch, poster, blob, bubble, callout, alarm, aura, sketch, shadow, comment, tools, spacer, lamp, bookmark, dropmenu, droppanel, table, heading, dialog, deform, shimmer, shell, field, and more.
- **Utilities**: Supplemental utility classes not included in Tailwind CSS by default (`inline-flex-center`, `flex-center`, `disabled`, `inactive`, `text-3xs`, `text-2xs`, `hidden-appearance`, `background-cover`, `rotate-*`).
- **Animation**: `transition` utilities and `animate-*` keyframe animation classes.
- **Color System**: Complete design token system based on the OKLCH color space with automatic dark/light mode adaptation.
- **Dark Mode**: Support via `.dark` class or `prefers-color-scheme: dark`.
- **RTL Support**: Direction-aware components using CSS logical properties and `:dir()` selector.
- **Tree-shaking**: All components written as Tailwind v4 `@utility` blocks for automatic dead code elimination.
- **Documentation**: Bilingual README (English and Chinese) with AI-friendly design notes.
- **Examples**: Comprehensive demo HTML files for every component with visual references.