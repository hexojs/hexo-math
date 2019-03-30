import MathTag from "./tag/math";
import Inject from "./filter/inject";
import Post from "./filter/post";
import { getOptions } from "./option";

export default class MathJax {
  constructor(hexo, opts) {
    this.hexo = hexo;
    this.opts = getOptions(hexo, opts);
    this.tag = new MathTag(hexo, this.opts);
    this.injector = new Inject(hexo, this.opts);
    this.post = new Post(hexo, this.opts);
  }
  register() {
    let { tag, injector, post } = this;
    tag.register();
    injector.register();
    // post.register();
  }
}
