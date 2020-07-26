'use strict';

const { url_for } = require('hexo-util');

module.exports = (hexo, css) => () => {
  const { css: cssPath } = hexo.config.math.katex;
  return `<link rel="stylesheet" href="${url_for.call(hexo, cssPath)}">\n`;
};
