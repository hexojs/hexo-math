import { INLINE_MATH_REGEX, BLOCK_MATH_REGEX, BODY_REGEX, INJECTION_REGEX, MATH_MARKER } from "../consts";
export default class Inject {
  constructor(hexo, script) {
    this.hexo = hexo;
    this.script = script;
  }
  register() {
    let { filter } = this.hexo.extend;
    filter.register("after_render:html", this._transform.bind(this));
  }
  _transform(src, data) {
    let { script } = this;
    let shouldInject =
      BODY_REGEX.test(src)          &&
      (
      src.indexOf(MATH_MARKER) >= 0 ||
      INLINE_MATH_REGEX.test(src)   ||
      BLOCK_MATH_REGEX.test(src)
      );
    return shouldInject ? src.replace(INJECTION_REGEX, `$1${script.src}$2`)
                        : src;
  }
}
