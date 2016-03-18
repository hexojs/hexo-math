import { MATH_MARKER, INLINE_MATH_REGEX, BLOCK_MATH_REGEX, DEFAULT_OPTS } from "../consts";
import _ from "underscore";

export default class Inject {
  constructor(hexo) {
    this.hexo = hexo;
  }
  register() {
    let { filter } = this.hexo.extend;
    filter.register("inject_ready", this._inject.bind(this))
  }
  _inject(inject) {
    let { config } = this.hexo;
    let data = _.defaults({}, config.mathjax, DEFAULT_OPTS);
    let opts = {
      data,
      inline: true,
      shouldInject: (src) => src.indexOf(MATH_MARKER) >= 0 || INLINE_MATH_REGEX.test(src) || BLOCK_MATH_REGEX.test(src)
    }
    inject.bodyEnd.require('../../asset/inject.swig', opts)
  }
}
