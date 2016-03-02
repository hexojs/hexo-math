import { INLINE_MATH_REGEX, BLOCK_MATH_REGEX, BODY_REGEX, INJECTION_REGEX, MATH_MARKER } from "../consts";
import _ from "underscore";

export default class Inject {
  constructor(hexo, script) {
    this.hexo = hexo;
    this.script = script;
  }
  register() {
    let { filter } = this.hexo.extend;
    filter.register("after_render:html", this._transform.bind(this));
    filter.register("after_init", this._filterPolyfill.bind(this));
  }
  _filterPolyfill() {
    let { hexo } = this,
      { log, extend } = hexo,
      { renderer } = extend,
      [major, minor, patch] = hexo.version.split(".").map((v) => parseInt(v));

    // Hotfix for hexojs/hexo#1791
    if (major == 3 && minor >= 2) {
      log.info(`[hexo-math] installing hotfix for hexojs/hexo#1791`);
      _.each(renderer.list(), (r, name) => {
        let { compile } = r,
          self = this;
        if (typeof compile !== 'function') return;
        log.info(`[hexo-math] after_render polyfill for renderer '${name}'`);
        r._rawCompile = compile.bind(r);
        r.compile = function(data) {
          let c = r._rawCompile(data);
          return function(locals) {
            let src = c(locals);
            return self._transform(src);
          }
        }
      });
    }
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
