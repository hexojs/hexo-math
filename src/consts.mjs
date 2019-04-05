export const INLINE_MATH_REGEX = /\$[\s\S]+?\$/;
export const BLOCK_MATH_REGEX = /^\s*\$\$[\s\S]*\$\$\s*$/m;
export const INLINE_MATH_RENDER_REGEX = /\$([^\n]+?)\$/g;
export const BLOCK_MATH_RENDER_REGEX = /\$\$([\s\S]+?)\$\$/g;

export const MATH_MARKER = "<!-- Has MathJax -->";
export const KATEX_INLINE_MARKER = "<span class=\"katex\">"
export const KATEX_BLOCK_MARKER = "<span class=\"katex-display\">"
