import MathTag from "./tag/math";
import Inject from "./filter/inject";

export default class MathJax {
  constructor(hexo) {
    this.hexo = hexo;
    this.tag = new MathTag(hexo);
    this.injector = new Inject(hexo);
  }
  register() {
    let { tag, injector } = this;
    tag.register();
    injector.register();
  }
}
