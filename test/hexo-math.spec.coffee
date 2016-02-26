util = require('./util')
path = require('path')
_ = require('underscore')
consts = require('../src/consts')

describe "hexo-math", ->
  h = {hexo, base_dir, mathJax } = util.initHexo('test_generator_clean')

  before ->
    this.timeout(0)
    h.setup()

  after ->
    this.timeout(0)
    h.teardown()

  it "should pass all test posts", ->
    posts = hexo.locals.toObject().posts.data
    posts.forEach (post) ->
      if not post.expected? then return
      expect(post.content, post.title).to.equal(post.expected)

  describe "'math' tag", ->
    { tag } = mathJax
    transform = tag._transform.bind(tag, null)
    it "should escape HTML entities", ->
      expect(transform("|a|<1")).to.equal("<span>$|a|&lt;1$</span><!-- Has MathJax -->")

    it "should return inline math for single line input", ->
      expect(transform("a+b=1")).to.equal("<span>$a+b=1$</span><!-- Has MathJax -->")
    it "should return block math for multiple line input", ->
      expect(transform("a+b=1\nc+d=2")).to.equal("<span>$$a+b=1\nc+d=2$$</span><!-- Has MathJax -->")

  describe "Injector", ->
    { script, injector } = mathJax
    { src } = script
    buildHtml = (opts) ->
      defaults =
        content: consts.MATH_MARKER
        body: "body"
        end: ""
      { content, body, end } = _.defaults({}, opts, defaults)
      _body = __body = ""
      if body != ""
        _body = "<#{body}>"
        __body = "</#{body}>"
      "<!doctype html><html>#{_body}#{content}#{end}#{__body}</html>"

    HTML_NO_BODY = buildHtml(body: "")
    HTML_NO_MATH = buildHtml(content: "")

    HAS_MATH_OPTS = [
      {},
      {body: "BODY"},
      {content: "$ math here $"},
      {content: "$$ math \nhere\n too $$"}
    ]
    HTML_HAS_MATHS = HAS_MATH_OPTS.map buildHtml

    it "should inject only if </body> tag is present", ->
      injected = injector._transform(HTML_NO_BODY)
      expect(injected.indexOf(src)).to.be.below(0)

    it "should inject if there are math equations in the page", ->
      expected = HAS_MATH_OPTS.map (o) -> buildHtml _.extend(o, end: src)
      expected.forEach (exp, i) ->
        actual = injector._transform(HTML_HAS_MATHS[i])
        expect(actual).to.equal(exp)

    it "should not inject if there is no math equations in the page", ->
      injected = injector._transform(HTML_NO_MATH)
      expect(injected.indexOf(src)).to.be.below(0)

  describe "Script", ->
    { script } = mathJax.script
    it "should use DEFAULT_OPTS by default"
    it "should use custom options in _config.yml"
