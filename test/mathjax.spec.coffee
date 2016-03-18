util = require('./util')
path = require('path')
_ = require('underscore')
consts = require('../src/consts')

describe "MathJax", ->
  h = {hexo, base_dir, mathJax } = util.initHexo('mathjax')

  before ->
    this.timeout(0)
    h.setup()

  after ->
    this.timeout(0)
    h.teardown()

  it "should pass all test posts", ->
    posts = hexo.locals.toObject().posts.data
    posts.forEach (post) ->
      if not post.mathjax_expected? then return
      expect(post.content, post.title).to.equal(post.mathjax_expected)

  describe "'math' tag", ->
    { tag } = mathJax
    transform = tag._transform.bind(tag, null)
    it "should escape HTML entities", ->
      expect(transform("|a|<1")).to.equal("<span>$|a|&lt;1$</span><!-- Has MathJax -->")

    it "should return inline math for single line input", ->
      expect(transform("a+b=1")).to.equal("<span>$a+b=1$</span><!-- Has MathJax -->")
    it "should return block math for multiple line input", ->
      expect(transform("a+b=1\nc+d=2")).to.equal("<span>$$a+b=1\nc+d=2$$</span><!-- Has MathJax -->")
