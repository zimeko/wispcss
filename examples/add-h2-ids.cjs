/**
 * Script to add id attributes to h2 elements in demo html files.
 * id values represent the section's purpose/type, not literal h2 text.
 */
const fs = require('fs');
const path = require('path');

const examplesDir = __dirname;
const files = fs.readdirSync(examplesDir).filter(f => f.startsWith('demo-') && f.endsWith('.html'));

/**
 * Determine id from h2 text and context.
 * Maps section headings to meaningful feature-type identifiers.
 */
function h2ToId(text) {
  const t = text.trim();

  // --- Sections that should NOT have an id (documentation, not a demo section) ---
  if (/^notes$/i.test(t)) return null;

  // --- Common section patterns ---

  // Basic / Base / Default
  if (/^basic\s+usage$/i.test(t)) return 'basic';
  if (/^base\s*$/i.test(t)) return 'base';
  if (/^default\s*$/i.test(t) && !/blockquote|style|layout/i.test(t)) return 'default';
  if (/^default\s+blockquote$/i.test(t)) return 'default';

  // Elements
  if (/^button\s+elements$/i.test(t)) return 'elements';
  if (/^all\s+elements$/i.test(t)) return 'elements';

  // Input types (form page etc.)
  if (/^text\s+inputs$/i.test(t)) return 'text-inputs';
  if (/^numeric\s*(&|and)\s*time$/i.test(t)) return 'numeric-time';
  if (/^selection\s+controls$/i.test(t)) return 'selection-controls';
  if (/^file\s*(&|and)\s*buttons$/i.test(t)) return 'file-buttons';

  // Sizes
  if (/^size(s?)\s*(\(.*?\))?$/i.test(t)) return 'sizes';
  if (/^size\s+variants$/i.test(t)) return 'sizes';
  if (/^dynamic\s+size\b/i.test(t)) return 'dynamic-size';
  if (/^sizes\s*\(.*?\)/i.test(t)) return 'sizes';

  // Shapes
  if (/^shape(s?)\s*(\(.*?\))?$/i.test(t)) return 'shapes';
  if (/^all\s+shapes$/i.test(t)) return 'shapes';
  if (/^shape\s+modifiers$/i.test(t)) return 'shapes';
  if (/^shape\s+transitions/i.test(t)) return 'shape-transitions';

  // Colors
  if (/^theme\s+colors/i.test(t)) return 'theme-colors';
  if (/^custom\s+colors$/i.test(t)) return 'custom-colors';
  if (/^solid\s+theme\s+colors/i.test(t)) return 'theme-colors-solid';
  if (/^primary\s+colors$/i.test(t)) return 'primary-colors';
  if (/^status\s+colors$/i.test(t)) return 'status-colors';
  if (/^neutral\s+colors$/i.test(t)) return 'neutral-colors';
  if (/^color\s+schemes$/i.test(t)) return 'color-schemes';

  // Color sub-sections
  if (/^colors?\s*[:—]\s*/i.test(t)) {
    const sub = t.replace(/^colors?\s*[:——]\s*/i, '').toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return `colors-${sub}`;
  }

  // Variants
  if (/^variant(s?)\s*(\(.*?\))?$/i.test(t)) return 'variants';
  if (/^visual\s+variants/i.test(t)) return 'variants';
  if (/^shortcut\s+variant/i.test(t)) return 'variant-shortcuts';
  if (/^style\s+variants/i.test(t)) return 'style-variants';
  if (/^layout\s+variants/i.test(t)) return 'layout-variants';
  if (/^shorthand\s+compound\s+variants/i.test(t)) return 'compound-variants';

  // Combinations / Use cases
  if (/^use\s+cases?$/i.test(t)) return 'use-cases';
  if (/^combinations?$/i.test(t)) return 'combinations';
  if (/^variant\s*\+\s*shape\s+combinations/i.test(t)) return 'combinations';
  if (/^color\s*\+\s*size\s+combination/i.test(t)) return 'combination';
  if (/^size\s*\+\s*ratio\s+combinations/i.test(t)) return 'size-ratio-combinations';

  // Layout
  if (/^layout(s?)\s*(\(.*?\))?$/i.test(t)) return 'layout';
  if (/^layout\s+alignment$/i.test(t)) return 'layout-alignment';

  // Direction
  if (/^direction(s?)\s*(\(.*?\))?$/i.test(t)) return 'direction';
  if (/^directions$/i.test(t)) return 'direction';

  // Width
  if (/^width\s*(variants)?$/i.test(t)) return 'width';
  if (/^scale\s+width$/i.test(t)) return 'scale-width';
  if (/^dynamic\s+width$/i.test(t)) return 'dynamic-width';

  // States
  if (/^state(s?)$/i.test(t)) return 'states';

  // Hover effects
  if (/^hover\s+effects?\b/i.test(t)) {
    const sub = t.replace(/^hover\s+effects?\s*[:—]\s*/i, '').toLowerCase()
      .replace(/[()']/g, '').trim();
    return `hover-${sub}`;
  }

  // Poster specific
  if (/^placeholder\b/i.test(t)) return 'placeholder';
  if (/^aspect\s+ratio/i.test(t)) return 'aspect-ratio';
  if (/^caption$/i.test(t)) return 'caption';
  if (/^marker$/i.test(t)) return 'marker';

  // Dialog
  if (/^open\s+methods$/i.test(t)) return 'open-methods';

  // Features
  if (/^features?$/i.test(t)) return 'features';
  if (/^text\s+features?$/i.test(t)) return 'text-features';
  if (/^fixed\s+nodes?$/i.test(t)) return 'fixed-nodes';

  // Separators
  if (/^separators?$/i.test(t)) return 'separators';

  // Line styles
  if (/^line\s+styles?$/i.test(t)) return 'line-styles';

  // Vertical divider
  if (/^vertical\s+divider/i.test(t)) return 'vertical';

  // Radius
  if (/^radius$/i.test(t)) return 'radius';

  // Animation specific names (they ARE the feature type)
  const animNames = [
    'rotation', 'remind', 'float', 'bounce', 'blink', 'heartbeat',
    'shake', 'fade', 'ease', 'spring', 'scale', 'fly', 'rotate',
  ];
  const animMatch = t.match(new RegExp(`^(${animNames.join('|')})\\b`, 'i'));
  if (animMatch) {
    const prefix = animMatch[1].toLowerCase();
    const suffix = t.replace(new RegExp(`^${animMatch[1]}\\s*`, 'i'), '').replace(/[()]/g, '').trim();
    if (!suffix) return prefix;
    return `${prefix}-${suffix.toLowerCase().replace(/\s+/g, '-')}`;
  }

  // Dynamic duration
  if (/^dynamic\s+duration/i.test(t)) return 'dynamic-duration';

  // Configuration
  if (/^configuration$/i.test(t)) return 'configuration';
  if (/^controls$/i.test(t)) return 'controls';
  if (/^color\s+swatches$/i.test(t)) return 'color-swatches';

  // Button variants
  if (/^base\s+variants?\s*\+?\s*color/i.test(t)) return 'variants-color';
  if (/^btn-link/i.test(t)) return 'btn-link';
  if (/^link\s+cjk/i.test(t)) return 'link-cjk';

  // Tabs/segments
  if (/^fill\s+mode/i.test(t)) return 'fill';
  if (/^justify\s+(mode|content)/i.test(t)) return 'justify';
  if (/^variant\s+style/i.test(t)) return 'variant-style';

  // Underline styles
  if (/^underline\s*\(/i.test(t)) return 'underline-default';
  if (/^underline-/i.test(t)) {
    const m = t.match(/^underline-(\w+)/);
    if (m) return `underline-${m[1].toLowerCase()}`;
  }

  // Two markup structures
  if (/^two\s+markup/i.test(t)) return 'markup-structures';
  if (/^custom\s+messages/i.test(t)) return 'custom-messages';

  // Replacement / cancel etc for ellipsis
  if (/^cancel\b/i.test(t)) return 'cancel';
  if (/^reserve\s+height/i.test(t)) return 'reserve';
  if (/^fadeout/i.test(t)) return 'fadeout';
  if (/^single\s+line$/i.test(t)) return 'single-line';
  if (/^multi-line/i.test(t)) return 'multi-line';

  // Flip
  if (/^flip$/i.test(t)) return 'flip';

  // Open (hollow) fill
  if (/^open\s+\(hollow\)\s+fill/i.test(t)) return 'hollow';

  // Language auto-detection
  if (/^language\s+auto/i.test(t)) return 'auto-detection';
  if (/^manual\s+classes/i.test(t)) return 'manual-classes';
  if (/^comparison\s+with/i.test(t)) return 'comparison';

  // Ghost variant
  if (/^ghost\s+variant/i.test(t)) return 'ghost';

  // Popup positions
  if (/^popup\s+positions/i.test(t)) return 'popup-positions';

  // Panel content
  if (/^panel\s+content/i.test(t)) return 'panel-content';

  // Submenu
  if (/^submenu/i.test(t)) return 'submenu';

  // With bubble / shell / etc
  if (/^with\s+(bubble|shell|input)/i.test(t)) return `with-${t.match(/with\s+(\w+)/i)[1].toLowerCase()}`;

  // Berformance / flush mount
  if (/^flush\s+mount/i.test(t)) return 'flush';

  // Nested replies
  if (/^nested\s+replies/i.test(t)) return 'nested-replies';
  if (/^media\s+content/i.test(t)) return 'media-content';
  if (/^quoted\s+reply/i.test(t)) return 'quoted-reply';
  if (/^rich\s+content/i.test(t)) return 'rich-content';

  // Specific feature names (preserve as-is, kebab-case)
  if (/^real-world\s+usage/i.test(t)) return 'real-world';

  // For "Morph animation"
  if (/^morph\s+animation/i.test(t)) return 'morph';
  if (/^animation$/i.test(t)) return 'animation';

  // Card examples
  if (/^card\s+examples/i.test(t)) return 'card-examples';

  // Background types
  if (/^geometric\s+textures/i.test(t)) return 'geometric';
  if (/^whisper\b/i.test(t)) return 'whisper';
  if (/^tint\b/i.test(t)) return 'tint';
  if (/^blend\b/i.test(t)) return 'blend';
  if (/^aurora\b/i.test(t)) return 'aurora';
  if (/^layered\s+backgrounds/i.test(t)) return 'layered';

  // ** Icons
  if (/^icon\s+types\s+comparison/i.test(t)) return 'icon-types';
  if (/^with\s+icons/i.test(t)) return 'with-icons';

  // ** Markup structures (validate)
  if (/^i18n\s+variables/i.test(t)) return 'i18n-variables';

  // Borderless mode
  if (/^borderless\s+mode/i.test(t)) return 'borderless';

  // Dark variant
  if (/^dark\s+variant/i.test(t)) return 'dark';

  // Selection
  if (/^default\s+(&|and)\s+selection/i.test(t)) return 'default-selection';

  // Any other - convert to kebab case, strip parentheticals
  return t
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[:]/g, '')
    .replace(/[''`]/g, '')
    .replace(/\+/g, 'plus')
    .replace(/[&]+/g, 'and')
    .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Process each file
files.forEach(file => {
  const filePath = path.join(examplesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Match h2 that does NOT already have an id attribute
  content = content.replace(/<h2>(?!.*\bid=)([^<]+)<\/h2>/g, (match, text) => {
    const id = h2ToId(text);
    if (!id) return match; // Skip (e.g. "Notes")
    return `<h2 id="${id}">${text}</h2>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${file}`);
  } else {
    console.log(`- ${file} (no changes)`);
  }
});

console.log('\nDone.');