const util = require('./util');

describe('MathJax', () => {
  const h = util.initHexo('mathjax');
  const {hexo, mathJax} = h;
  before(function() {
    this.timeout(0);
    return h.setup();
  });
  after(function() {
    this.timeout(0);
    return h.teardown();
  });
  it('should pass all test posts', () => {
    const posts = hexo.locals.toObject().posts.data;
    return posts.forEach(post => {
      if (post.mathjax_expected == null) {
        return;
      }
      return expect(post.content, post.title).to.equal(post.mathjax_expected);
    });
  });
  return describe('\'math\' tag', () => {
    const {tag} = mathJax;
    const transform = tag._transform.bind(tag, null);
    it('should escape HTML entities', () => {
      return expect(transform('|a|<1')).to.equal('<span>$|a|&lt;1$</span><!-- Has MathJax -->');
    });
    it('should return inline math for single line input', () => {
      return expect(transform('a+b=1')).to.equal('<span>$a+b=1$</span><!-- Has MathJax -->');
    });
    return it('should return block math for multiple line input', () => {
      return expect(transform('a+b=1\nc+d=2')).to.equal('<span>$$a+b=1\nc+d=2$$</span><!-- Has MathJax -->');
    });
  });
});
