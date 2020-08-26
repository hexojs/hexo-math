'use strict';

const { init } = require('mathjax');

module.exports = hexo => {
  return async function mathjaxFn(args, content) {
    if (this.mathjax === false) return content;

    const { options: globalCfg } = hexo.config.math.mathjax;
    const { mathjax: fmCfg } = this;
    const [jsonCfg] = args;
    const argsCfg = jsonCfg ? JSON.parse(jsonCfg) : false;
    let options = { ...globalCfg };
    if (fmCfg) options = { ...options, ...fmCfg };
    if (argsCfg) options = { ...options, ...argsCfg };
    const { conversion, svg, tex } = options;

    const MathJax = await init({
      loader: {
        load: ['input/tex', 'output/svg']
      },
      tex,
      svg
    });

    const { startup, tex2svgPromise } = MathJax;
    const svgOut = await tex2svgPromise(content, conversion);

    return startup.adaptor.outerHTML(svgOut);
  };
};
