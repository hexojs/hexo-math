import MathTag from "./tag/math";
import Inject from "./filter/inject";
import Script from "./script";

export default class MathJax {
  constructor(hexo) {
    this.hexo = hexo;
    this.tag = new MathTag(hexo),
    this.script = new Script(hexo),
    this.injector = new Inject(hexo, this.script);
  }
  register() {
    let { tag, injector } = this;
    tag.register();
    injector.register();
  }
}
