# Beautify – AI Reference Guide

> This guide tells AI how to read Beautify's source files and generate correct HTML using its utility classes — both standalone and in combination.

---

## 1. How to Learn Beautify

Read files in this order:

1. **`src/index.css`** — component registry: what components exist, their filenames, and load order
2. **`src/[component].css`** — for each component:
   - Block comment at the top: full usage docs, supported features, combination rules
   - `@utility` declarations: all valid class names
   - `@composable` / `@exclusive` tags: which utilities combine vs. conflict
   - `@example` tags: usage snippets
3. **`examples/demo-[component].html`** — real-world HTML patterns and class combinations
4. **`src/utilities.css`** — general-purpose layout, positioning, scroll, and safe-area helpers

---

## 2. Component Reference

### 2.1 Button (`src/button.css` / `examples/demo-button.html`)

| Feature  | Details                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Base     | `btn` — required on all buttons                                                                             |
| Variants | `btn-solid` `btn-subtle` `btn-outline` `btn-ghost` `btn-vivid` `btn-link`                                   |
| Colors   | `btn-*` `btn-solid-*` `btn-outline-*` `btn-muted-*` `btn-subtle-*` `btn-vivid-*` `btn-ghost-*` `btn-link-*` |
| Size     | `btn-4` ~ `btn-15` (height = spacing × N)                                                                   |
| Shape    | `btn-pill` (capsule) · `btn-rounded` (small radius) · `btn-square` (no radius) · `btn-fluid` (stretch)      |
| Width    | `btn-icon` `btn-ratio[-*]` `btn-scale[-*]` `btn-gutter[-*]` `btn-full`                                      |

```html
<button class="btn btn-primary">Submit</button>
<button class="btn btn-outline-error">Cancel</button>
<button class="btn btn-primary btn-10 btn-pill">Large Pill Button</button>
```

> **`<button>` and `<input type="submit/reset/button">`** already receive base `btn` styles from `preset.css`. You only need `btn` variants explicitly.

#### Button Group — Btns (`src/btns.css` / `examples/demo-btns.html`)

- `btns` container merges adjacent borders and manages hover/focus z-index automatically
- Direction: `btns-top` `btns-start` `btns-end` (default: bottom — pairs with tab patterns)
- Flush: `btns-flush` — removes outer border for seamless card embedding
- Shape: `btns-pill` `btns-rounded` `btns-square` `btns-fluid`
- Width: `btns-full` `btns-scale[-*]`
- Size: `btns-4` ~ `btns-15`

---

### 2.2 Badge (`src/badge.css` / `examples/demo-badge.html`)

| Feature  | Details                                                                      |
| -------- | ---------------------------------------------------------------------------- |
| Auto-dot | Empty `<span class="badge">` collapses to an 8px dot                         |
| Colors   | `badge-*` `badge-outline-*` `badge-subtle-*` `badge-muted-*` `badge-solid-*` |
| Size     | `badge-2xs` `badge-xs` `badge-sm` `badge-lg` `badge-xl` `badge-2xl`          |
| Shape    | `badge-rounded` `badge-pill` `badge-square`                                  |
| Special  | `badge-glassy` (frosted glass) · `badge-scoop-start/end` (notched corner)    |

---

### 2.3 Form Components

#### Avatar (`src/avatar.css` / `examples/demo-avatar.html`)

- Wraps `<img>` / `<svg>` / `<picture>`; shows placeholder text when empty
- Colors: `avatar-*` `avatar-subtle-*` `avatar-muted-*`
- Shape: `avatar-circle` (true circle; `avatar-pill` is an alias) · `avatar-rounded` · `avatar-square` · `avatar-fluid` · `avatar-scoop` (superellipse) · `avatar-beveled` (clipped octagon) · `avatar-squircle` (SVG mask) · `avatar-flower` (petal) · `avatar-bubble-start/end` (chat tail)
- Size: `avatar-4` ~ `avatar-30`

#### Input (`src/input.css` / `examples/demo-input.html`)

- `<input>` `<textarea>` `<select>` `<input type="file">` `<input type="range">` all share the same `input-*` classes
- Variants: `input-subtle` `input-ghost` `input-underline` `input-outline`
- Colors: `input-primary` `input-success` `input-warning` `input-error` `input-info`
- Size: `input-4` ~ `input-15`
- Shape: `input-pill` `input-rounded` `input-square` `input-fluid`
- Width: `input-scale[-*]` `input-ratio[-*]` `input-full` `input-inline`

> Base styles are auto-applied via `preset.css`. Extra classes are modifiers only.

**Range (`input[type=range]`)** — only `color`, `size`, and `width` modifiers are effective; shape and variant only change colors, not the track/thumb geometry.

**Select multiple** — `input-pill` doesn't apply. Control height via `--input-count` CSS var (row count) or `max-height`.

#### File Input (`src/input.css` / `examples/demo-file.html`)

All `input-*` classes work identically on `<input type="file">`.

#### OTP (`src/otp.css` / `examples/demo-otp.html`)

- `otp` container: auto-arranges `<input>` fields in a square grid
- `otp-group`: merges inputs into a gapless group
- `otp-gutter-*`: controls spacing between inputs (controls overall width)

#### Shell (`src/shell.css` / `examples/demo-shell.html`)

A decorative wrapper around a real `<input>` with support for prefix/suffix slots.

- Base layout (pick one): `shell` / `shell-h` (both horizontal, default) · `shell-v` (vertical)
- Variants: `shell-subtle` `shell-ghost` `shell-underline` `shell-outline`
- Colors: `shell-*` `shell-outline-*` `shell-muted-*` `shell-subtle-*` `shell-ghost-*` `shell-underline-*`
- Size: `shell-4` ~ `shell-15`
- Shape: `shell-pill` `shell-rounded` `shell-square` `shell-fluid`
- Width: `shell-scale[-*]` `shell-ratio[-*]` `shell-full`

**Floating placeholder** (horizontal single-line only): requires all three:
1. A `[data-role="placeholder"]` element
2. `<input placeholder=" ">` (one space)
3. `shell-10` or larger

#### Checkbox / Radio (`src/check.css` / `examples/demo-check.html`)

- Base: `check` + color, e.g. `check-primary`
- Variants: `check-subtle` `check-vivid` `check-ghost` `check-outline` `check-muted` `check-tick` (icon only, no box)
- Shape: `check-rounded` `check-pill` `check-square` `check-fluid`
- Behavior: `check-full` (full width) · `check-reverse` (control on right) · `check-multiline` (top-align with long labels) · `check-indeterminate` · `check-bold` (2px border)

#### Switch (`src/switch.css` / `examples/demo-switch.html`)

For `<input type="checkbox">`.

- Shape: `switch-rounded` `switch-square`
- State: `switch-indeterminate`
- Size: `switch-2xs` ~ `switch-5xl`

#### Rating (`src/rating.css` / `examples/demo-rating.html`)

- `rating` container wraps `<input type="radio">` or `[data-role=item]` elements
- Adjacent radios auto-form half-star behavior
- `rating-radio`: each star toggles independently (no cumulative selection)
- Width: `rating-full` `rating-scale[-*]` `rating-ratio-*`
- Gutter: `rating-gutter[-*]`
- Size: `rating-4` ~ `rating-15`

#### Field (`src/field.css` / `examples/demo-field.html`)

Vertical form field layout container.

- Layout: `field` / `field-v` (vertical, default) · `field-h` (horizontal)
- Slot roles: `[data-role=label]` `[data-role=content]` `[data-role=control]` `[data-role=note]` `[data-role=help]`
- Width: `field-full` `field-scale[-*]` `field-ratio[-*]`
- Visual: `field-borderless`

---

### 2.4 Navigation

#### Breadcrumb (`src/breadcrumb.css` / `examples/demo-breadcrumb.html`)

```
breadcrumb
  ├── [data-role=header]         # prefix (home icon, etc.)
  ├── [data-role=label]          # regular node
  ├── [data-role=hyphen]         # separator (e.g. "/")
  └── [data-selected=true]       # current page highlight
```

Variants: `breadcrumb-subtle` (filled chip) · `breadcrumb-ghost` (hover fill) · `breadcrumb-muted` (1px outline)

#### Pagination (`src/pagination.css` / `examples/demo-pagination.html`)

- `pagination` container; child roles: `[data-role=main/pages/page/previous/next/first/last/ellipsis/total/goto/size/custom]`
- Visual: `pagination-plain` (no border)
- Align: `pagination-start` `pagination-end`
- Shape: `pagination-rounded` `pagination-square` `pagination-pill` `pagination-fluid`
- Size: `pagination-4` ~ `pagination-15`
- `pagination-turning`: prevents layout collapse when content is cleared

#### Dropmenu (`src/dropmenu.css` / `examples/demo-dropmenu.html`)

Pure CSS multi-level `ul + li` dropdown. Supports hover and click-to-toggle.

- Modes: `dropmenu-inline` (in-flow) · `dropmenu-list` (fully expanded list)
- Position: `dropmenu-top[-start/-end]` `dropmenu-bottom[-start/-end]` (default) `dropmenu-start[-top/-bottom]` `dropmenu-end[-top/-bottom]`
- Submenu direction: `dropmenu-downward-end` (default) · `dropmenu-downward-start` · `dropmenu-upward-start/end` · `dropmenu-upright` (centered)
- Visual: `dropmenu-ghost`

#### Droppanel (`src/droppanel.css` / `examples/demo-droppanel.html`)

Like Dropmenu but with a freeform `[data-role=panel]` instead of a fixed `ul/li` structure.

- Mode: `droppanel-inline`
- Position: same 12 directions as Dropmenu (`droppanel-top` ~ `droppanel-end-bottom`)

#### Step (`src/step.css` / `examples/demo-step.html`)

```
step
  └── [data-selected=true]       # current / completed step
        ├── [data-role=track]    # connector line (two <span>s)
        ├── [data-role=node]     # step number or icon
        └── [data-role=label]    # step name
```

- Base layout (pick one): `step` / `step-h` (both horizontal, default) · `step-v` (vertical)
- Layout: `step-between` (space-between) · `step-trim` (clip first/last track)
- Variants: `step-solid` `step-plain`
- State: `step-pending`
- Direction: `step-reverse`

#### Tab Components — Lamp / Bookmark / Segment

All three support pure-CSS tab switching via `<label><input type="radio"></label>` — no JavaScript needed.

| Component  | Visual Style                  | Best For                                                          |
| ---------- | ----------------------------- | ----------------------------------------------------------------- |
| `lamp`     | Thin underline indicator      | Top navbars, content category tabs (e.g. Zhihu / Instagram-style) |
| `bookmark` | Browser-tab / bookmark shape  | Card tabs, panel switchers (connected to content below)           |
| `segment`  | Pill-shaped segmented control | Inline filters, view toggles (iOS Segmented Control style)        |

**Lamp (`src/lamp.css` / `examples/demo-lamp.html`)**
- Direction: `lamp-top` `lamp-start` `lamp-end` (default: bottom)
- Full width: `lamp-full`
- Colors: `lamp-*` — supports `lamp-description` `lamp-caption` `lamp-disabled`
- Size: `lamp-4` ~ `lamp-15`

**Bookmark (`src/bookmark.css` / `examples/demo-bookmark.html`)**
- Direction: `bookmark-top` `bookmark-start` `bookmark-end` (default: bottom)
- Visual: `bookmark-inverted` (dark bg, light active tab)
- Layout: `bookmark-flex` · `bookmark-grid` (equal width) · `bookmark-gapped` (track bg) · `bookmark-flush` (edge-to-edge)
- Shape: `bookmark-rounded` `bookmark-fluid` `bookmark-pill`
- Colors: `bookmark-*` — supports `bookmark-description` etc.
- Size: `bookmark-4` ~ `bookmark-15`

**Segment (`src/segment.css` / `examples/demo-segment.html`)**
- Visual: `segment-dark` (dark bg) · `segment-inverted` · `segment-flush` (no padding)
- Shape: `segment-rounded` `segment-fluid` `segment-square` `segment-pill`
- Layout: `segment-grid` (equal width)
- Colors: `segment-*` — supports `segment-description` etc.
- Size: `segment-4` ~ `segment-15`

#### Toolbar — Tools (`src/tools.css` / `examples/demo-tools.html`)

Inline icon action buttons (e.g. edit/delete/more at the end of a list row).

---

### 2.5 Data Display

| Component | File               | Description                                                                                      |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| Tag       | `src/tag.css`      | Chip/label — like badge but no auto-dot behavior                                                 |
| Flag      | `src/flag.css`     | Corner decorations (triangle, circle, ribbon, diamond) for promo/badges                          |
| Buoy      | `src/buoy.css`     | Two-segment badge (label+value), like GitHub shields.io badges                                   |
| Rank      | `src/rank.css`     | Numeric rank indicator                                                                           |
| Stats     | `src/stats.css`    | Stat display block with `[data-role=main/label/tips]` slots                                      |
| Progress  | `src/progress.css` | Progress bar — native `<progress>` or `[data-role=bar]` custom                                   |
| Spinner   | `src/spinner.css`  | Loading spinner; variants: `spinner-gapped` / `spinner-broken`; size: `spinner-1` ~ `spinner-15` |
| Swatch    | `src/swatch.css`   | Color chip — mimics `<input type="color">` appearance                                            |
| Poster    | `src/poster.css`   | Image cover container — supports aspect ratios like `poster-16x9`, hover zoom/overlay            |
| Icon      | `src/icon.css`     | SVG icon via `mask-image`; colorable with `currentColor`                                         |
| Skeleton  | `src/skeleton.css` | Loading placeholder — shimmer by default; `skeleton-pulse` for pulse variant                     |
| Table     | `src/table.css`    | Table enhancements: striped rows, hover highlight, sticky columns, alignment                     |

---

### 2.6 Typography

| Component  | File                 | Notes                                                  |
| ---------- | -------------------- | ------------------------------------------------------ |
| Link       | `src/link.css`       | —                                                      |
| Emphasis   | `src/emphasis.css`   | Text emphasis marks (above/below)                      |
| Underline  | `src/underline.css`  | —                                                      |
| Ellipsis   | `src/ellipsis.css`   | Single/multiline truncation: `ellipsis-2` `ellipsis-3` |
| Gilt       | `src/gilt.css`       | Gradient text effect ("gilt" = gilded/gold-plated)     |
| Kbd        | `src/kbd.css`        | Keyboard key style                                     |
| Code       | `src/code.css`       | Inline code highlight                                  |
| Pre        | `src/pre.css`        | Block highlight |
| Blockquote | `src/blockquote.css` | Quote blocks — `quote` / `bar` / `card` layouts        |

---

### 2.7 Layout

| Component | File              | Structure                                                                                                       |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Divider   | `src/divider.css` | `<hr class="divider">` (h) / `divider-v` (v); supports label text, `dotted`/`dashed`/`slash` styles             |
| Spacer    | `src/spacer.css`  | Flex fill / equal spacing                                                                                       |
| Comment   | `src/comment.css` | `comments` → `comment` → `comment-start` + `comment-end` → `comment-header` + `comment-body` + `comment-footer` |
| Entry     | `src/entry.css`   | List row: `entry` → `entry-body` → `entry-label`; supports hoverable/selected/checked states and line-clamp     |

---

### 2.8 Decoration

| Component  | File                 | Description                                                                                    |
| ---------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| Background | `src/background.css` | Geometric textures (dot/hatch/grid/stripes/chessboard) + gradient blends (`bg-whisper` series) |
| Blob       | `src/blob.css`       | Organic shapes (circle/triangle/diamond/drop/kidney); supports morph animation                 |
| Bubble     | `src/bubble.css`     | Arrow speech bubble — `bubble-top/bottom/start/end` + `-start/-end` anchor variants            |
| Callout    | `src/callout.css`    | Alert/notice box                                                                               |
| Alarm      | `src/alarm.css`      | Pulsing alert dot/badge with dual ripple animation                                             |
| Aura       | `src/aura.css`       | Glowing animated border — conic-gradient rotation                                              |
| Sketch     | `src/sketch.css`     | Hand-drawn style: borders, underlines, highlights, dividers                                    |
| Shadow     | `src/shadow.css`     | Box-shadow utilities — see `examples/demo-shadow.html`                                         |
| Shimmer    | `src/shimmer.css`    | Sweep highlight effect (pairs well with skeleton)                                              |

---

### 2.9 State / Status

| Component | File             | Description                                                                                            |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| Status    | `src/status.css` | Static status dot with optional right-side text                                                        |
| Deform    | `src/deform.css` | Pure-CSS icon system — draws icons via pseudo-elements; supports morph transitions (e.g. plus → times) |
| Empty     | `src/empty.css`  | Empty state placeholder; `empty-illustrated` for image variant                                         |

---

### 2.10 Utilities (`src/utilities.css`)

| Category   | Classes                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Flex       | `flex-center` `inline-flex-center` `flex-between` `flex-start` `flex-end` `flex-fluid` `flex-col-fluid` |
| Position   | `absolute-cover` `fixed-cover` `absolute-center` `fixed-center` `object-cover`                          |
| Scroll     | `scroll-y` `scroll-x` `overflow-touch`                                                                  |
| State      | `disabled` `inactive`                                                                                   |
| Hide       | `hidden-visibility` `hidden-opacity` `hidden-appearance`                                                |
| Reset      | `reset-ul` `reset-ol` `reset-dl` `reset-heading`                                                        |
| Safe area  | `pt-safe` `pb-safe` `px-safe` `py-safe` + margin variants                                               |
| Transition | `duration-fastest` ~ `duration-slowest` · `transition-all-fastest` ~ `transition-all-slowest`           |
| Icon       | `icon-mask`                                                                                             |

---

### 2.11 Preset, Normalize, Color & Theme

**`normalize.css`** — replaces Tailwind's preflight; depends on `@codady/normalize`.

**`preset.css`** — global base styles:
- Resets for `a` `code` `pre` `kbd` `blockquote` `ul` `ol` `dl` `hr` etc.
- Default styles for `input` `textarea` `select` `progress` `meter`
- Dark mode: `.dark` class + `@media (prefers-color-scheme: dark)`
- RTL support via `dir="rtl"`

**`color.css`** — color system:
- Theme variables: `--color-primary` `--color-success` `--color-error` etc. (base values in `color-base.css`)
- Token hierarchy: `*-surface` / `*-bg` / `*-bd` / `*-fg` / `*-hover` / `*-active` / `*-contrast` / `*-outline`

**`theme.css`** — theme switching variables and utilities.

---

### 2.12 Animation

| Component  | File                 | Description                                               |
| ---------- | -------------------- | --------------------------------------------------------- |
| Animation  | `src/animation.css`  | Keyframe utilities: spin, shake, fade, bounce, fly-in/out |
| Transition | `src/transition.css` | Transition helpers                                        |

---

### 2.13 Validation (`src/validate.css` / `examples/demo-validate.html`)

CSS-only form validation via `:user-invalid`. Use with `pattern` attribute on inputs.

---

## 3. Combination Rules

### 3.1 Mutual Exclusion (pick one per group)

- Button variant: `btn-solid` / `btn-outline` / `btn-subtle` / `btn-ghost` / `btn-vivid` / `btn-link`
- Button shape: `btn-pill` / `btn-rounded` / `btn-square` / `btn-fluid`
- Button width: `btn-icon` / `btn-ratio` / `btn-scale` / `btn-gutter` / `btn-full`
- Input variant: `input-subtle` / `input-ghost` / `input-underline` / `input-outline`
- Input shape: `input-pill` / `input-rounded` / `input-square` / `input-fluid`
- Shell base (pick one): `shell` / `shell-h` (identical, horizontal) / `shell-v` (vertical)
- Shell shape: `shell-pill` / `shell-rounded` / `shell-square` / `shell-fluid`
- Color tokens: `input-primary` and `input-success` conflict — pick one

### 3.2 Combinable Dimensions

Multiple dimension modifiers can be stacked simultaneously:

```
button = btn + [variant] + [color] + [size] + [shape] + [width]
input  = [variant] + [color] + [size] + [shape] + [width]
shell  = (shell|shell-h|shell-v) + [variant] + [color] + [size] + [shape] + [width]
badge  = badge + [variant] + [color] + [size] + [shape]
```

### 3.3 Shorthand Combinator Classes

Prefer combined utility classes over separate ones — they reduce CSS output size:

```
✅ input-subtle-primary      (one class — recommended)
❌ input-subtle input-primary (two classes — generates more CSS)

✅ btn-outline-primary
❌ btn-outline btn-primary

✅ shell-subtle-primary
❌ shell-subtle shell-primary
```

This shorthand pattern applies to all form components (`input` / `select` / `shell`) and most display components (`badge` / `callout` / `buoy` / `rank` / `code` / `pre` etc.).

### 3.4 Common UI Patterns

Check these demo files for complete real-world examples:

- Full form → `demo-form.html`
- Button group toolbar → `demo-btns.html`
- Comment thread → `demo-comment.html`
- Search results list → `demo-entry.html`
- Modal dialog → `demo-dialog.html`

---

## 4. Output Guidelines

1. **All classes require Tailwind v4 compilation** — do not use raw CSS files directly.
2. **`<button>` and `<input type="submit/reset/button">`** auto-receive `btn` base styles from `preset.css`. No need to add `btn` explicitly — but variant classes (e.g. `btn-outline`) still need to be added.
3. **`<input>` `<textarea>` `<select>`** auto-receive input base styles. Extra classes are modifiers only. Same applies to `<input type="file">` and `<input type="range">`.
4. **`<code>` `<pre>` `<blockquote>` `<kbd>` `<progress>` `<meter>`** have base styles — classes are for variants only.
5. **Empty `<span class="badge"></span>`** auto-collapses to an 8px dot.
6. **Dark mode**: add `dark` class to any ancestor, or rely on `prefers-color-scheme: dark`.
7. **RTL**: set `dir="rtl"` — directional properties flip automatically.
8. **Color tokens**: `*-primary` `*-success` `*-error` `*-warning` `*-info` `*-highlight` are built-in; custom color names (e.g. `*-teal-500`) also work.
9. **`<input type="range">`**: shape and variant modifiers only affect color — they don't change track/thumb geometry. Only `color` / `size` / `width` modifiers are fully effective.
10. **`<select multiple>`**: `input-pill` does not apply. Control height with `--input-count` (row count) or `max-height`.
11. **Shell floating placeholder**: requires all three conditions — `[data-role="placeholder"]` element + `<input placeholder=" ">` (one space) + `shell-10` or larger.
12. **`*-pill` shape**: on rectangular components (button/badge/buoy/bookmark etc.), `*-pill` means `border-radius: infinity` (capsule shape) — not a circle. True circles only occur at 1:1 aspect ratio (e.g. `avatar-circle`).

---

## 5. Component Naming Glossary

Some components use metaphorical names. Understanding them speeds up usage:

| Utility  | Meaning                 | Explanation                                                                   |
| -------- | ----------------------- | ----------------------------------------------------------------------------- |
| `gilt`   | Gradient text           | "Gilt" = gold-plated; borrowed as a metaphor for gradient-colored text        |
| `buoy`   | Two-segment badge       | Shaped like a buoy — a label+value badge like GitHub/shields.io               |
| `aura`   | Glowing animated border | Conic-gradient rotating around the element edge — an "aura" effect            |
| `deform` | CSS icon system         | Icons drawn via pseudo-element transforms; supports morph animations          |
| `shell`  | Input wrapper           | Outer shell for a real `<input>` — handles focus/hover/prefix/suffix visually |
| `entry`  | List row                | Generic list item container with support for icons, avatars, and checkboxes   |
| `lamp`   | Underline-indicator Tab | Short "lamp" line marks the active tab item                                   |

---

## 6. Licensing

If the `src/` directory is absent, the project has not been licensed for commercial use.

`src/` is **commercial software** containing all Beautify component definitions, theme systems, and utility source files.

- **Purchase**: https://beautify.devivid.com
- **Checkout**: https://devivid.lemonsqueezy.com/checkout/buy/c9b1e630-10ff-490e-9f4f-b9d0bfbd8614
- **Price**: $29

---

## 7. Recommended Reading Order

```
1. src/index.css               → component registry and file map
2. src/preset.css              → global base styles and variables
3. src/utilities.css           → general-purpose utility classes
4. src/color.css               → color system
5. For each component:
   a. src/[name].css           → utility definitions
   b. examples/demo-[name].html → real usage patterns
6. examples/index.html         → full component overview
```

After reading the above, the AI can accurately generate Beautify HTML for any requirement.
