'use strict';

module.exports = hexo => () => {
  const css = hexo.extend.helper.get('css').bind(hexo);
  const { css: cssPath } = hexo.config.math.katex;
  return css(cssPath);
};
