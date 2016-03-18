export const INLINE_MATH_REGEX = /\$.*?\$/;
export const BLOCK_MATH_REGEX = /^\s*\$\$[\s\S]*\$\$\s*$/m;
export const INJECTION_REGEX = /([\s\S]*)(<\/body>[\s\S]*)/i;
export const BODY_REGEX = /<\/body>/i;

export const MATH_MARKER = "<!-- Has MathJax -->";

export const DEFAULT_OPTS = {
  src: "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
  config: {
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      processEscapes: true
    },
    TeX: {
      equationNumbers: {
        autoNumber: "AMS"
      }
    }
  }
}
