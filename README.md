# WispCSS

> [中文版](./README.zh-CN.md)


A pure CSS component and utility library built on the Tailwind CSS v4 compiler. Fully documented with inline comments, AI-friendly. It provides styled HTML native elements and a comprehensive set of utility classes for UI layout, without requiring any JavaScript.

Explore **[100 Component Demos](https://unpkg.com/wispcss/examples/index.html)** →

---

## Overview

WispCSS serves as the foundational CSS layer for web projects. It sits on top of Tailwind CSS and below application-level styles, functioning as the base design system. It is not a replacement for Tailwind, but an extension that adds:

- Pre-styled HTML native elements (inputs, buttons, forms, tables, etc.)
- A library of UI components (badges, tags, breadcrumbs, pagination, steps, dividers, etc.)
- Utility classes that supplement Tailwind's default offerings
- A complete design token system based on the OKLCH color space

All components and utilities are authored as Tailwind v4 `@utility` directives. When compiled with the Tailwind CLI, unused classes are automatically removed via tree-shaking.

---

## AI-Friendly

WispCSS is designed with AI engines in mind. Every CSS file in `src/` contains extensive inline comments explaining each component's structure, variants, and usage patterns. This means:

- **An AI engine reading `src/index.css` alone can fully understand the entire project** — all components, utilities, and their relationships are documented in context.
- **Pair with `examples/index.html`** for even greater accuracy: the example file maps every component to its visual demo, giving an AI a complete reference of how each component looks and behaves.
- Together, these files enable an AI to **quickly auto-create accurate demos and usage examples** without external documentation.
- To reduce token usage, simply have the AI read the `skill.md` file directly.

---

## Target Audience

Any project that already uses **Tailwind CSS** can adopt WispCSS directly.

---

## Browser Compatibility

The project uses modern CSS features. The following browser versions are required:

| Feature                  | Minimum Browser Support                                 |
| ------------------------ | ------------------------------------------------------- |
| OKLCH color space        | Chrome 111+, Safari 15.4+, Firefox 113+ (March 2023)    |
| CSS Nesting (`&`)        | Chrome 120+, Safari 17.2+, Firefox 117+ (December 2023) |
| `:has()` selector        | Chrome 105+, Safari 15.4+, Firefox 121+                 |
| `:dir()` selector        | Chrome 120+, Safari 16.6+, Firefox 120+ (December 2023) |
| `:user-invalid` selector | Chrome 119+, Safari 16.5+, Firefox 88+（(October 2023)  |
| `@property`              | Chrome 85+, Safari 15.4+, Firefox 128+                  |
| `container-type`         | Chrome 105+, Safari 16+, Firefox 110+                   |

---

## Installation

### Prerequisites

- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/) installed and configured in your project.

### Method 1: Manual Setup (Recommended)

This is the recommended approach. Place the purchased `src/` directory anywhere inside your project (e.g. `lib/wispcss/src/`), add it to version control, and import it directly. The files stay under your control and are never affected by `npm install`.

1. Copy the purchased `src/` directory into your project, for example:

```
your-project/
└── lib/
    └── wispcss/
        └── src/
            ├── index.css
            ├── button.css
            └── ...
```

2. Import in your CSS entry point:

```css
/* Example: app.css */
@import "./lib/wispcss/src/index.css";
```

3. Configure Tailwind CSS:

```css
@import "tailwindcss";
@import "./lib/wispcss/src/index.css";
```

4. Run the Tailwind CLI to compile:

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

### Method 2: Install via npm

The npm package does **not** include the `src/` source files by default, since they are commercial software (see [License](#license)). After purchasing a license, place the `src/` directory you received into `node_modules/@zimeko/wispcss/src/` to enable the imports below.

1. Install the package:

```bash
npm install @zimeko/wispcss
```

2. Obtain a license and copy the purchased `src/` directory into:

```
node_modules/@zimeko/wispcss/src/
```

3. Import in your CSS entry point:

```css
/* Import everything */
@import "@zimeko/wispcss";

/* Core only — components + utilities, no Tailwind import (import Tailwind yourself first) */
@import "@zimeko/wispcss/core.css";

/* Or import specific components */
@import "@zimeko/wispcss/color.css";
@import "@zimeko/wispcss/button.css";
@import "@zimeko/wispcss/input.css";
```

4. Configure Tailwind CSS:

```css
@import "tailwindcss";
@import "@zimeko/wispcss";
```

5. Run the Tailwind CLI to compile:

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

> Note: Since `node_modules` is typically excluded from version control and reinstalled via `npm install`, you will need to re-copy the `src/` directory into `node_modules/@zimeko/wispcss/src/` after every fresh install (e.g. in CI pipelines or after `npm ci`).

### Method 3: Use Your Own Tailwind Import (`core.css`)

Methods 1 and 2 import `index.css`, which is nothing more than an entry point:

```css
@import "tailwindcss";
@import "./core.css";
```

`core.css` contains the whole library (components, utilities, design tokens) and **does not import Tailwind itself**. If your project already imports Tailwind CSS somewhere else — a framework preset, a shared entry file, or a custom `prefix(...)` / `@theme` setup — import `core.css` instead, so the Tailwind layer is not loaded twice:

```css
/* Example: app.css */
@import "tailwindcss";                  /* your own Tailwind setup, imported first */
@import "./lib/wispcss/src/core.css";   /* WispCSS components and utilities only */
```

- **Tailwind must be imported first.** `core.css` relies on Tailwind v4 features (`@utility`, `@theme`, `--theme()`, `--spacing()`), so it cannot be compiled on its own.
- **Everything else stays the same.** Same class names, same tree-shaking; only the Tailwind import is under your control.
- **Prefix-friendly.** If your Tailwind entry uses `prefix(tw)`, pair it with `src-prefix/core.css` (see *Using a Prefix* below).

---

## Usage

WispCSS components use Tailwind v4 `@utility` directives. They are applied as class names in your HTML.

```html
<!-- Buttons -->
<button class="btn-primary">Submit</button>
<button class="btn-outline-error">Cancel</button>

<!-- Badges -->
<span class="badge badge-success">10</span>

<!-- Inputs -->
<input class="input-subtle-primary input-8 input-rounded" placeholder="Name" />

<!-- Typography colors -->
<p class="text-primary">Highlighted text</p>
```

---

## Using a Prefix (`src-prefix/`)

Tailwind CSS v4 can prefix every generated utility (`tw:btn-primary` instead of `btn-primary`). WispCSS ships a ready-to-use prefixed copy of its source in `src-prefix/`, so its class names can never collide with your own Tailwind classes, another version of the library, or a third-party UI kit.

### What is inside `src-prefix/`

- The same file list as `src/` — `index.css`, `core.css` and every component file.
- `src-prefix/index.css` imports Tailwind with the prefix applied:

```css
@import "tailwindcss" prefix(tw);
@import "./core.css";
```

- Every `@apply` statement **and** every static class selector in a rule header is prefixed as well, because Tailwind v4 requires prefixed names in both places:

```css
/* src/check.css */
&:where(.check-subtle, .check-ghost) {
  @apply transition-all-normal;
}

/* src-prefix/check.css */
&:where(.tw\:check-subtle, .tw\:check-ghost) {
  @apply tw:transition-all-normal;
}
```

The backslash is the CSS escape for the colon, so `.tw\:check-subtle` matches the HTML class `tw:check-subtle`.

### Import

Local paths (source copied into your project):

```css
/* Tailwind + all components, prefix = tw */
@import "./lib/wispcss/src-prefix/index.css";

/* Or: your own Tailwind entry + prefixed components */
@import "tailwindcss" prefix(tw);
@import "./lib/wispcss/src-prefix/core.css";
```

npm subpaths (source copied into `node_modules/@zimeko/wispcss/`) — the `.css` extension is optional:

```css
@import "@zimeko/wispcss/prefix";           /* = src-prefix/index.css  (includes prefix(tw)) */
@import "@zimeko/wispcss/prefix/core.css";  /* = src-prefix/core.css   (Tailwind imported by you) */
@import "@zimeko/wispcss/prefix/button";    /* = src-prefix/button.css (single component) */
```

Full subpath map:

| Specifier                            | File                            | Tailwind included  |
| ------------------------------------ | ------------------------------- | ------------------ |
| `@zimeko/wispcss`                    | `src/index.css`                 | Yes                |
| `@zimeko/wispcss/core.css`           | `src/core.css`                  | No                 |
| `@zimeko/wispcss/<component>.css`    | `src/<component>.css`           | No                 |
| `@zimeko/wispcss/prefix`             | `src-prefix/index.css`          | Yes, `prefix(tw)`  |
| `@zimeko/wispcss/prefix/core.css`    | `src-prefix/core.css`           | No                 |
| `@zimeko/wispcss/prefix/<component>` | `src-prefix/<component>.css`    | No                 |

> The prefix name inside `src-prefix/index.css` is fixed to whatever `npm run prefix` generated (default `tw`). If you import `src-prefix/core.css`, your own Tailwind entry must use the **same** prefix: `@import "tailwindcss" prefix(tw);`.

```html
<button class="tw:btn-primary">Submit</button>
<span class="tw:badge tw:badge-success">10</span>
<input class="tw:input-subtle tw:input-8 tw:input-rounded" placeholder="Name" />
```

### Regenerate with a different prefix

`src-prefix/` is generated output — never edit it by hand. The generator script uses Node.js built-ins only (Node 18+), so no extra dependency is required:

```bash
npm run prefix
```

It asks for the prefix and starts immediately when you press Enter:

```
Enter Tailwind prefix (press Enter to use the default "tw"):
```

- Press **Enter** to keep the default `tw`.
- Type another name (e.g. `wisp`) to get `wisp:btn-primary`.

The script then deletes and rebuilds `src-prefix/` from `src/`, rewriting the entry import, every `@apply` statement and every class selector — including `:where()`, `:not()`, `:has()`, `:is()`, nested and multi-line selectors. Comments, strings, attribute selectors (`[class*="..."]`) and declaration values are left untouched.

> Since the directory is deleted on every run, make your changes in `src/` and regenerate.

---

## Included Components

The library provides 50+ components and utility groups, including but not limited to:

| Category   | Components                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Buttons    | `btn` (solid / outline / subtle / ghost / vivid / link variants), `btns` (grouped button layouts)                                                                                                                                    |
| Forms      | `input` / `textarea` / `select` (shared text-input styling), `field` (form layout), `shell` (input wrapper), `check` (checkbox/radio), `switch`, `rating` (star rating), `otp` (one-time password), `validate` (validation feedback) |
| Display    | `avatar`, `badge`, `tag`, `segment` (pill radio group), `flag` (corner ribbon), `buoy` (dual-segment badge), `rank`, `stats`, `swatch` (color swatch), `progress`, `spinner`, `poster` (image cover), `icon`, `skeleton`, `table`, `tree` (hierarchical tree)    |
| Navigation | `breadcrumb`, `pagination`, `step`, `dropmenu`, `droppanel`, `lamp` (indicator-bar tabs), `bookmark` (tab-style switch), `tools` (action toolbar)                                                                                    |
| Typography | `link`, `code`, `pre`, `blockquote`, `kbd`, `ellipsis`, `underline`, `emphasis`, `gilt` (gradient text)                                                                                                             |
| Layout     | `divider`, `spacer`, `comment` (comment threads), `entry` (list item container)                                                                                                                                                      |
| Decoration | `background` (pattern & gradient backgrounds), `blob` (organic shapes), `bubble` (popover with arrow), `callout`, `alarm` (pulse badge), `aura` (animated glow border), `sketch` (hand-drawn styles), `shimmer`, `shadow`            |
| Status     | `status` (status dot), `deform` (morphing CSS icons), `empty` (empty state placeholder)                                                                                                                                              |
| Animation  | `animation` keyframe utilities, `transition` utilities                                                                                                                                                                               |
| Color      | `color` design tokens (OKLCH-based theme system), `theme` utilities                                                                                                                                                                  |

---

## Supplemental Utilities

WispCSS adds utility classes that are not included in Tailwind CSS by default:

| Utility              | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `inline-flex-center` | Shortcut for `display: inline-flex; align-items: center; justify-content: center;`   |
| `flex-center`        | Shortcut for `display: flex; align-items: center; justify-content: center;`          |
| `disabled`           | Applies disabled-state opacity and cursor                                            |
| `inactive`           | Applies reduced opacity for non-interactive elements                                 |
| `text-3xs`           | 8px font size (`max(0.5rem, 8px)`)                                                   |
| `text-2xs`           | 10px font size (`max(0.625rem, 10px)`)                                               |
| `hidden-appearance`  | Visually hides input while keeping it accessible                                     |
| `background-cover`   | `background-size: cover; background-position: center; background-repeat: no-repeat;` |
| `rotate-reverse`     | 180-degree rotation                                                                  |
| `rotate-cross`       | 45-degree rotation (plus to cross)                                                   |
| `rotate-expand`      | 90-degree rotation                                                                   |
| `rotate-collapse`    | -90-degree rotation                                                                  |

---

## Technical Notes

### Color System

WispCSS uses the **OKLCH** color space for all theme colors. This provides perceptually uniform lightness, which allows the framework to automatically adjust text contrast for both light and dark modes. The color system is defined via CSS custom properties and computed dynamically based on lightness thresholds.

### Tree-shaking

Because all components are defined as Tailwind v4 `@utility` blocks, only the classes you actually use in your HTML will be included in the compiled CSS output. This keeps the final file size minimal.

### RTL Support

Components that depend on direction (arrows, spacing, borders) use CSS logical properties (`inset-inline-start`, `border-inline-end`, `padding-inline`, etc.) and the `:dir()` selector. Right-to-left layout is supported without additional configuration.

### Dark Mode

Dark mode is activated by adding the class `dark` to a parent container, or automatically via `prefers-color-scheme: dark`. The theme adjusts all components accordingly.

---

## Project Structure

| Path               | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `src/index.css`    | Entry point: `@import "tailwindcss";` followed by `core.css`                       |
| `src/core.css`     | Components, utilities and tokens only — for projects importing Tailwind themselves |
| `src/`             | Source CSS files (`*.css` with `@utility` directives)                              |
| `src-prefix/`      | Prefixed copy of `src/` (`tw:` namespace), generated by `npm run prefix`           |
| `script-prefix.js` | Prefix generator used by `npm run prefix`                                          |
| `dist/`            | Compiled output (`wispcss.css`, `wispcss.min.css`)                                 |
| `examples/`        | HTML demo files for all components                                                 |
| `CHANGELOG.md`     | Version history                                                                    |
| `LICENSE`          | License information                                                                |

---

## Links

- **GitHub**: [https://github.com/zimeko/wispcss](https://github.com/zimeko/wispcss)
- **Gitee**: [https://gitee.com/zimeko/wispcss](https://gitee.com/zimeko/wispcss)
- **Online Demo**: [https://zimeko.github.io/wispcss/](https://zimeko.github.io/wispcss/)
- **Issue Tracking**: [https://github.com/zimeko/wispcss/issues](https://github.com/zimeko/wispcss/issues)
- **Feedback**: [https://www.zimeko.com/feedback/wispcss](https://www.zimeko.com/feedback/wispcss)
- **Contact**: zimeko2026@outlook.com

---

## License

### Source files (`src/`)

The files in the `src/` directory are **commercial software**. A paid license is required to use them in any project, including personal and commercial work. 

Purchase a license through [ZIMEKO](https://wispcss.zimeko.com) payment.

### Other files

All other files in this repository (including `examples/`, `dist/`, `docs/`, configuration files) are distributed under the **MIT License**.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.