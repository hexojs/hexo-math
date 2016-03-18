import { BLOCK_MATH_RENDER_REGEX, INLINE_MATH_RENDER_REGEX } from '../consts'
import { AllHtmlEntities } from "html-entities";
import katex from 'katex'
import _ from 'underscore'
const entities = new AllHtmlEntities()

export default class Post {
  constructor (hexo, opts) {
    this.hexo = hexo
    this.opts = opts
  }
  register () {
    if (this.opts.engine !== 'katex') return
    let { filter } = this.hexo.extend
    filter.register('before_post_render', this._transform.bind(this))
  }
  _transform (data) {
    data.content = data.content.replace(BLOCK_MATH_RENDER_REGEX, (m, math) => this._render(math, true))
    data.content = data.content.replace(INLINE_MATH_RENDER_REGEX, (m, math) => this._render(math, false))
    return data
  }
  _render (math, isBlock) {
    let opts = _.extend({}, this.opts.katex, { displayMode: isBlock })

    return katex.renderToString(entities.decode(math), opts)
  }
}
