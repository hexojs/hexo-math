const MathTag = require('./tag/math');
const Inject = require('./filter/inject');
const Post = require('./filter/post');
const { getOptions } = require('./option');

module.exports = class MathJax {
  constructor(hexo, opts) {
    this.hexo = hexo;
    this.opts = getOptions(hexo, opts);
    this.tag = new MathTag(hexo, this.opts);
    this.injector = new Inject(hexo, this.opts);
    this.post = new Post(hexo, this.opts);
  }
  register() {
    const { tag, injector /* post */ } = this;
    tag.register();
    injector.register();
    // post.register();
  }
};
