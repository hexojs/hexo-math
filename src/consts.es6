export const INLINE_MATH_REGEX = /\$.*?\$/;
export const BLOCK_MATH_REGEX = /^\s*\$\$[\s\S]*\$\$\s*$/m;
export const INJECTION_REGEX = /([\s\S]*)(<\/body>[\s\S]*)/i;
export const BODY_REGEX = /<\/body>/i;

export const MATH_MARKER = "<!-- Has MathJax -->";

export const TEMPLATE = `
<!-- Begin: Injected MathJax -->
<script type="text/x-mathjax-config">
  MathJax.Hub.Config(<%= JSON.stringify(config) %>);
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Queue(function() {
        var all = MathJax.Hub.getAllJax(), i;
        for(i=0; i < all.length; i += 1) {
            all[i].SourceElement().parentNode.className += ' has-jax';
        }
    });
</script>

<script type="text/javascript" src="<%= src %>">
</script>
<!-- End: Injected MathJax -->
`

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
