'use strict';

const { renderToString: renderKatex } = require('katex');

module.exports = hexo => {
  return function katexFn(args, content) {
    if (this.katex === false) return content;

    const { options: globalCfg } = hexo.config.math.katex;
    const { katex: fmCfg } = this;
    const [jsonCfg] = args;
    const argsCfg = jsonCfg ? JSON.parse(jsonCfg) : false;
    let options = { ...globalCfg };
    if (fmCfg) options = { ...options, ...fmCfg };
    if (argsCfg) options = { ...options, ...argsCfg };

    return renderKatex(content, options);
  };
};
