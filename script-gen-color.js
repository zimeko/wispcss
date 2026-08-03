

/**
 *  Last modified: 2026/07/31 17:04:55
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取 __dirname 的 ES Module 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 配置颜色列表
const colors = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'highlight',
  'error',
  'warning',
  'caution',
  'title',
  'ink',
];

// 变体配置
//highlight颜色比较亮，需要使用-body色
const getLightColors = function (color) {
  let getColors = (color) => `
  --color-${color}: oklch(from var(--color-${color}-base) l calc(c * var(--color-c-factor,1)) h);
  --color-${color}-outline: oklch(from var(--color-${color}) l c h);
  --color-${color}-hover: oklch(from var(--color-${color}) calc(l + (1 - l) * 0.25) c h);
  --color-${color}-active: oklch(from var(--color-${color})  calc(l * 0.9) c h);
  --color-${color}-contrast: oklch(from var(--color-${color}) clamp(var(--light-min), (var(--light-threshold-contrast) - l) * 100, var(--light-max)) 0 0);
  --color-${color}-body: oklch(from var(--color-${color}) min(var(--light-threshold-body),l) c h);
  --color-${color}-surface: oklch(from var(--color-${color}) var(--light-threshold-surface) min(var(--chorme-surface),c ) h);
  --color-${color}-fg:  oklch(from var(--color-${color}) min(var(--light-threshold-fg),l) c h);
  --color-${color}-bg: oklch(from var(--color-${color}) var(--light-threshold-bg) min(var(--chorme-bg),c) h);
  --color-${color}-bg-hover: oklch(from var(--color-${color}) var(--light-threshold-bg-hover) min(var(--chorme-bg-hover),c) h);
  --color-${color}-bg-active:oklch(from var(--color-${color}) var(--light-threshold-bg-active) min(var(--chorme-bg-active),c) h);
  --color-${color}-bd: oklch(from var(--color-${color}) var(--light-threshold-bd) min(var(--chorme-bd),c ) h);
  --color-${color}-bd-hover: oklch(from var(--color-${color}) var(--light-threshold-bd-hover) min(var(--chorme-bd-hover),c ) h);
  --color-${color}-bd-active: oklch(from var(--color-${color}) var(--light-threshold-bd-active) min(var(--chorme-bd-active),c ) h);
`;
  let getAltColors = (color) => `
  --color-${color}-base: oklch(from var(--color-title) calc(l * ${color === 'description' ? 2.5 : color === 'caption' ? 3.5 : color === 'placeholder' ? 4.5 : 1}) c h);
  --color-${color}: var(--color-${color}-base);
  --color-${color}-outline: var(--color-title);
  --color-${color}-hover: oklch(from var(--color-title) calc(l + (1 - l) * 0.25) c h);
  --color-${color}-active: oklch(from var(--color-title) calc(l * 0.9) c h);
  --color-${color}-contrast: var(--color-title-contrast);
  --color-${color}-body: var(--color-${color}-base);
  --color-${color}-fg:  var(--color-${color}-base);
  --color-${color}-surface:  var(--color-title-surface);
  --color-${color}-bg: var(--color-title-bg);
  --color-${color}-bg-hover:  var(--color-title-bg-hover);
  --color-${color}-bg-active: var(--color-title-bg-active);
  --color-${color}-bd:  var(--color-title-bd);
  --color-${color}-bd-hover:  var(--color-title-bd-hover);
  --color-${color}-bd-active:  var(--color-title-bd-active);
`;
  let result = getColors(color);
  if (color === 'title') {
    result += getAltColors('description');
    result += getAltColors('caption');
    result += getAltColors('placeholder');
  }
  return result;
}
const getDarkColors = function (color) {
  //-bg,-bg-hover,-bg-active的c值上限约定0.12,0.14,0.16，是经验判断的数值
  let getColors = (color) => `
  ${color === 'title' ? `--color-${color}-base: oklch(from var(--color-ink-base) var(--light-threshold-body) c h); 
  --color-${color}: oklch(from var(--color-${color}-base) l calc(c * var(--color-c-factor,1)) h); ` : ''}
  --color-${color}-hover: oklch(from var(--color-${color}) calc(l + (1 - l) * 0.25) c h);
  --color-${color}-active: oklch(from var(--color-${color})  calc(l * 0.9) c h);
  --color-${color}-body: oklch(from var(--color-${color}) min(var(--light-threshold-body),l) c h);
  --color-${color}-surface:transparent;
  --color-${color}-fg: oklch(from var(--color-${color}) min(var(--light-threshold-fg),l) c h);
  --color-${color}-bg: oklch(from var(--color-${color}) var(--light-threshold-bg) c h / var(--opacity-bg));
  --color-${color}-bg-hover: oklch(from var(--color-${color}) var(--light-threshold-bg-hover) c h / var(--opacity-bg-hover));
  --color-${color}-bg-active:oklch(from var(--color-${color}) var(--light-threshold-bg-active) c h / var(--opacity-bg-active));
  --color-${color}-bd: oklch(from var(--color-${color}) var(--light-threshold-bd) min(c ,0.12) h);
  --color-${color}-bd-hover: oklch(from var(--color-${color}) var(--light-threshold-bd-hover) min(c ,0.14) h);
  --color-${color}-bd-active: oklch(from var(--color-${color}) var(--light-threshold-bd-active) min(c ,0.16) h);
`;
  let getAltColors = (color) => `
  --color-${color}-base: oklch(from var(--color-title) calc(l * ${color === 'description' ? 0.85 : color === 'caption' ? 0.65 : color === 'placeholder' ? 0.5 : 1}) c h);
  --color-${color}: var(--color-${color}-base);
  --color-${color}-hover: oklch(from var(--color-${color}) calc(l + (1 - l) * 0.25) c h);
  --color-${color}-active: oklch(from var(--color-${color}) calc(l * 0.9) c h);
  --color-${color}-body: var(--color-${color});
  --color-${color}-fg:  var(--color-${color});
`;
  let result = getColors(color);
  if (color === 'title') {
    result += getAltColors('description');
    result += getAltColors('caption');
    result += getAltColors('placeholder');
  }
  return result;
}
// 生成所有样式
function generate() {
  //@theme{}
  let output = '@theme {\n';
  //获得light colors
  let lightColors = ``;
  colors.forEach(color => {
    lightColors += getLightColors(color) + '\n\n';
  });
  //获得dark colors
  let darkColors = ``;
  colors.forEach(color => {
    darkColors += getDarkColors(color) + '\n\n';
  });
  output += lightColors;
  output += '}\n';
  //.light{}
  output += '@utility light{\n&:where(:not(:root)) {\n';
  output += lightColors;
  output += '}\n}\n';
  //暗黑
  output += `
  @media (prefers-color-scheme: dark) {
  :root,
  :host {
  `;
  output += darkColors;
  output += '}\n}\n\n';
  output += '@utility dark{\n';
  output += darkColors;
  output += '}\n';
  return output;
}

// 写入文件
const outputPath = path.join(__dirname, 'src/color-base.css');
fs.writeFileSync(outputPath, generate());
console.log(`✅ 已生样式文件: ${outputPath}`);

// 导出供其他模块使用（可选）
export { colors, generate };