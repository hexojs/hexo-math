/* global hexo */

'use strict';

hexo.config.math = Object.assign({
  katex: {
    css: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
    options: {
      throwOnError: false
    }
  },
  mathjax: {
    css: 'https://cdn.jsdelivr.net/npm/hexo-math@4.0.0/dist/style.css',
    options: {
      // https://docs.mathjax.org/en/latest/web/typeset.html#conversion-options
      conversion: {
        display: false
      },
      // https://docs.mathjax.org/en/latest/options/input/tex.html
      tex: {},
      // https://docs.mathjax.org/en/latest/options/output/svg.html
      svg: {}
    }
  }
}, hexo.config.math);

const config = hexo.config.math;

hexo.extend.tag.register('katex', require('./lib/katex')(hexo), true);
hexo.extend.tag.register('mathjax', require('./lib/mathjax')(hexo), { ends: true, async: true });

if (config.katex.css) hexo.extend.injector.register('head_end', require('./lib/inject/katex')(hexo));
if (config.mathjax.css) hexo.extend.injector.register('head_end', require('./lib/inject/mathjax')(hexo));
