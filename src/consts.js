module.exports.INLINE_MATH_REGEX = /\$[\s\S]+?\$/;
module.exports.BLOCK_MATH_REGEX = /^\s*\$\$[\s\S]*\$\$\s*$/m;
module.exports.INLINE_MATH_RENDER_REGEX = /\$([^\n]+?)\$/g;
module.exports.BLOCK_MATH_RENDER_REGEX = /\$\$([\s\S]+?)\$\$/g;

module.exports.MATH_MARKER = '<!-- Has MathJax -->';
module.exports.KATEX_INLINE_MARKER = '<span class="katex">';
module.exports.KATEX_BLOCK_MARKER = '<span class="katex-display">';
