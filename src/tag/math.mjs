import { AllHtmlEntities } from "html-entities";
import { MATH_MARKER } from "../consts";
import katex from 'katex';
import _ from 'underscore';

const entities = new AllHtmlEntities()

export default class MathTag {
  constructor(hexo, opts) {
    this.hexo = hexo;
    this.opts = opts
  }
  register() {
    let { tag } = this.hexo.extend;
    tag.register("math", this._transform.bind(this), { ends: true });
  }
  _transform(args, content) {
    let multiLine = /\n/.test(content);

    const transformers = {
      mathjax: this._mathJax.bind(this),
      katex: this._kaTeX.bind(this)
    }
    return transformers[this.opts.engine](content, multiLine)
  }
  _mathJax(content, multiLine) {
    content = entities.encode(content.trim());
    return multiLine ? `<span>$$${content}$$</span>${MATH_MARKER}`
                     : `<span>$${content}$</span>${MATH_MARKER}`;
  }
  _kaTeX(content, multiLine) {
    content = entities.decode(content.trim());
    let opts = _.extend({}, this.opts.katex.config, { displayMode: multiLine })

    try {
        return katex.renderToString(content, opts)
    } catch (e) {
      this.hexo.log.error(e)
    }

    return content
  }
}
