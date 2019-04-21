'use strict';
const { AllHtmlEntities } = require('html-entities');
const { MATH_MARKER } = require('../consts');
const katex = require('katex');

const entities = new AllHtmlEntities();

module.exports = class MathTag {
  constructor(hexo, opts) {
    this.hexo = hexo;
    this.opts = opts;
  }
  register() {
    const { tag } = this.hexo.extend;
    tag.register('math', this._transform.bind(this), { ends: true });
  }
  _transform(args, content) {
    const multiLine = /\n/.test(content);

    const transformers = {
      mathjax: this._mathJax.bind(this),
      katex: this._kaTeX.bind(this)
    };
    return transformers[this.opts.engine](content, multiLine);
  }
  _mathJax(content, multiLine) {
    content = entities.encode(content.trim());
    return multiLine ? `<span>$$${content}$$</span>${MATH_MARKER}` : `<span>$${content}$</span>${MATH_MARKER}`;
  }
  _kaTeX(content, multiLine) {
    content = entities.decode(content.trim());
    const opts = Object.assign({}, this.opts.katex.config, { displayMode: multiLine });

    try {
      return katex.renderToString(content, opts);
    } catch (e) {
      this.hexo.log.error(e);
    }

    return content;
  }
};
