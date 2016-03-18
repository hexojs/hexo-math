util = require('./util')
path = require('path')
_ = require('underscore')
consts = require('../src/consts')

describe "KaTeX", ->
  h = {hexo, base_dir, mathJax } = util.initHexo('katex')

  before ->
    this.timeout(0)
    h.setup()

  after ->
    this.timeout(0)
    h.teardown()

  it "should pass all test posts", ->
    posts = hexo.locals.toObject().posts.data
    posts.forEach (post) ->
      if not post.katex_expected? then return
      expect(post.content, post.title).to.equal(post.katex_expected)
