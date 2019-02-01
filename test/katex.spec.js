var _, consts, path, util;

util = require('./util');

path = require('path');

_ = require('underscore');

consts = require('../src/consts');

describe("KaTeX", function() {
  var base_dir, h, hexo, mathJax;
  h = ({hexo, base_dir, mathJax} = util.initHexo('katex'));
  before(function() {
    this.timeout(0);
    return h.setup();
  });
  after(function() {
    this.timeout(0);
    return h.teardown();
  });
  return it("should pass all test posts", function() {
    var posts;
    posts = hexo.locals.toObject().posts.data;
    return posts.forEach(function(post) {
      if (post.katex_expected == null) {
        return;
      }
      return expect(post.content, post.title).to.equal(post.katex_expected);
    });
  });
});
