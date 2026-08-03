# Beautify

> [中文版](./README.zh-CN.md)


A pure CSS component and utility library built on the Tailwind CSS v4 compiler. Fully documented with inline comments, AI-friendly. It provides styled HTML native elements and a comprehensive set of utility classes for UI layout, without requiring any JavaScript.

Explore **[100 Component Demos](https://unpkg.com/@codady/beautify/examples/index.html)** →

---

## Overview

Beautify serves as the foundational CSS layer for web projects. It sits on top of Tailwind CSS and below application-level styles, functioning as the base design system. It is not a replacement for Tailwind, but an extension that adds:

- Pre-styled HTML native elements (inputs, buttons, forms, tables, etc.)
- A library of UI components (badges, tags, breadcrumbs, pagination, steps, dividers, etc.)
- Utility classes that supplement Tailwind's default offerings
- A complete design token system based on the OKLCH color space

All components and utilities are authored as Tailwind v4 `@utility` directives. When compiled with the Tailwind CLI, unused classes are automatically removed via tree-shaking.

---

## AI-Friendly

Beautify is designed with AI engines in mind. Every CSS file in `src/` contains extensive inline comments explaining each component's structure, variants, and usage patterns. This means:

- **An AI engine reading `src/index.css` alone can fully understand the entire project** — all components, utilities, and their relationships are documented in context.
- **Pair with `examples/index.html`** for even greater accuracy: the example file maps every component to its visual demo, giving an AI a complete reference of how each component looks and behaves.
- Together, these files enable an AI to **quickly auto-create accurate demos and usage examples** without external documentation.
- To reduce token usage, simply have the AI read the `skill.md` file directly.

---

## Target Audience

Any project that already uses **Tailwind CSS** can adopt Beautify directly.

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

This is the recommended approach. Place the purchased `src/` directory anywhere inside your project (e.g. `lib/beautify/src/`), add it to version control, and import it directly. The files stay under your control and are never affected by `npm install`.

1. Copy the purchased `src/` directory into your project, for example:

```
your-project/
└── lib/
    └── beautify/
        └── src/
            ├── index.css
            ├── button.css
            └── ...
```

2. Import in your CSS entry point:

```css
/* Example: app.css */
@import "./lib/beautify/src/index.css";
```

3. Configure Tailwind CSS:

```css
@import "tailwindcss";
@import "./lib/beautify/src/index.css";
```

4. Run the Tailwind CLI to compile:

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

### Method 2: Install via npm

The npm package does **not** include the `src/` source files by default, since they are commercial software (see [License](#license)). After purchasing a license, place the `src/` directory you received into `node_modules/@codady/beautify/src/` to enable the imports below.

1. Install the package:

```bash
npm install @codady/beautify
```

2. Obtain a license and copy the purchased `src/` directory into:

```
node_modules/@codady/beautify/src/
```

3. Import in your CSS entry point:

```css
/* Import everything */
@import "@codady/beautify";

/* Or import specific components */
@import "@codady/beautify/color.css";
@import "@codady/beautify/button.css";
@import "@codady/beautify/input.css";
```

4. Configure Tailwind CSS:

```css
@import "tailwindcss";
@import "@codady/beautify";
```

5. Run the Tailwind CLI to compile:

```bash
npx @tailwindcss/cli -i app.css -o dist/output.css
```

> Note: Since `node_modules` is typically excluded from version control and reinstalled via `npm install`, you will need to re-copy the `src/` directory into `node_modules/@codady/beautify/src/` after every fresh install (e.g. in CI pipelines or after `npm ci`).


---

## Usage

Beautify components use Tailwind v4 `@utility` directives. They are applied as class names in your HTML.

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

Beautify adds utility classes that are not included in Tailwind CSS by default:

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

Beautify uses the **OKLCH** color space for all theme colors. This provides perceptually uniform lightness, which allows the framework to automatically adjust text contrast for both light and dark modes. The color system is defined via CSS custom properties and computed dynamically based on lightness thresholds.

### Tree-shaking

Because all components are defined as Tailwind v4 `@utility` blocks, only the classes you actually use in your HTML will be included in the compiled CSS output. This keeps the final file size minimal.

### RTL Support

Components that depend on direction (arrows, spacing, borders) use CSS logical properties (`inset-inline-start`, `border-inline-end`, `padding-inline`, etc.) and the `:dir()` selector. Right-to-left layout is supported without additional configuration.

### Dark Mode

Dark mode is activated by adding the class `dark` to a parent container, or automatically via `prefers-color-scheme: dark`. The theme adjusts all components accordingly.

---

## Project Structure

| Path           | Description                                           |
| -------------- | ----------------------------------------------------- |
| `src/`         | Source CSS files (`*.css` with `@utility` directives) |
| `dist/`        | Compiled output (`beautify.css`, `beautify.min.css`)  |
| `examples/`    | HTML demo files for all components                    |
| `CHANGELOG.md` | Version history                                       |
| `LICENSE`      | License information                                   |

---

## Links

- **GitHub**: [https://github.com/codady/beautify](https://github.com/codady/beautify)
- **Gitee**: [https://gitee.com/codady/beautify](https://gitee.com/codady/beautify)
- **Online Demo**: [https://codady.github.io/beautify/](https://codady.github.io/beautify/)
- **Issue Tracking**: [https://github.com/codady/beautify/issues](https://github.com/codady/beautify/issues)
- **Feedback**: [https://www.devivid.com/feedback/beautify](https://www.devivid.com/feedback/beautify)
- **Contact**: devivid2026@outlook.com

---

## License

### Source files (`src/`)

The files in the `src/` directory are **commercial software**. A paid license is required to use them in any project, including personal and commercial work. 

**Purchase**: $29 USD via [Lemon Squeezy](https://devivid.lemonsqueezy.com/checkout/buy/c9b1e630-10ff-490e-9f4f-b9d0bfbd8614).

### Other files

All other files in this repository (including `examples/`, `dist/`, `docs/`, configuration files) are distributed under the **MIT License**.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.