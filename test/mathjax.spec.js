var _, consts, path, util;

util = require('./util');

path = require('path');

_ = require('underscore');

consts = require('../src/consts');

describe("MathJax", function() {
  var base_dir, h, hexo, mathJax;
  h = ({hexo, base_dir, mathJax} = util.initHexo('mathjax'));
  before(function() {
    this.timeout(0);
    return h.setup();
  });
  after(function() {
    this.timeout(0);
    return h.teardown();
  });
  it("should pass all test posts", function() {
    var posts;
    posts = hexo.locals.toObject().posts.data;
    return posts.forEach(function(post) {
      if (post.mathjax_expected == null) {
        return;
      }
      return expect(post.content, post.title).to.equal(post.mathjax_expected);
    });
  });
  return describe("'math' tag", function() {
    var tag, transform;
    ({tag} = mathJax);
    transform = tag._transform.bind(tag, null);
    it("should escape HTML entities", function() {
      return expect(transform("|a|<1")).to.equal("<span>$|a|&lt;1$</span><!-- Has MathJax -->");
    });
    it("should return inline math for single line input", function() {
      return expect(transform("a+b=1")).to.equal("<span>$a+b=1$</span><!-- Has MathJax -->");
    });
    return it("should return block math for multiple line input", function() {
      return expect(transform("a+b=1\nc+d=2")).to.equal("<span>$$a+b=1\nc+d=2$$</span><!-- Has MathJax -->");
    });
  });
});
