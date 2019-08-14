'use strict';
const util = require('./util');

describe('KaTeX', () => {
  const h = util.initHexo('katex');
  const {hexo} = h;
  before(function() {
    this.timeout(0);
    return h.setup();
  });
  after(function() {
    this.timeout(0);
    return h.teardown();
  });
  return it('should pass all test posts', () => {
    const posts = hexo.locals.toObject().posts.data;
    return posts.forEach(post => {
      if (post.katex_expected == null) {
        return;
      }
      return expect(post.content, post.title).to.equal(post.katex_expected);
    });
  });
});
