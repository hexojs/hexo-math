'use strict';
const { expect } = require('chai');
const util = require('./util');

describe('MathJax', () => {
  const { hexo, mathJax, setup, teardown } = util.initHexo('mathjax');
  before(function() {
    this.timeout(0);
    return setup();
  });
  after(function() {
    this.timeout(0);
    return teardown();
  });
  it('should pass all test posts', () => {
    const posts = hexo.locals.toObject().posts.data;
    posts.forEach(post => {
      if (post.mathjax_expected == null) {
        return;
      }
      expect(post.content, post.title).to.equal(post.mathjax_expected);
    });
  });
  describe('\'math\' tag', () => {
    const {tag} = mathJax;
    const transform = tag._transform.bind(tag, null);
    it('should escape HTML entities', () => {
      expect(transform('|a|<1')).to.equal('<span>$|a|&lt;1$</span><!-- Has MathJax -->');
    });
    it('should return inline math for single line input', () => {
      expect(transform('a+b=1')).to.equal('<span>$a+b=1$</span><!-- Has MathJax -->');
    });
    it('should return block math for multiple line input', () => {
      expect(transform('a+b=1\nc+d=2')).to.equal('<span>$$a+b=1\nc+d=2$$</span><!-- Has MathJax -->');
    });
  });
});
