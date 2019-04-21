import { BLOCK_MATH_RENDER_REGEX, INLINE_MATH_RENDER_REGEX } from '../consts';
import { AllHtmlEntities } from 'html-entities';
import katex from 'katex';
const entities = new AllHtmlEntities();

export default class Post {
  constructor(hexo, opts) {
    this.hexo = hexo;
    this.opts = opts;
  }
  register() {
    if (this.opts.engine !== 'katex') return;
    const { filter } = this.hexo.extend;
    filter.register('before_post_render', this._transform.bind(this));
  }
  _transform(data) {
    data.content = data.content.replace(BLOCK_MATH_RENDER_REGEX, (m, math) => this._render(m, math, true));
    data.content = data.content.replace(INLINE_MATH_RENDER_REGEX, (m, math) => this._render(m, math, false));
    return data;
  }
  _render(match, math, isBlock) {
    const opts = Object.assign({}, this.opts.katex.config, { displayMode: isBlock });

    try {
      return katex.renderToString(entities.decode(math), opts);
    } catch (e) {
      this.hexo.log.error(e);
    }

    return match;
  }
}
