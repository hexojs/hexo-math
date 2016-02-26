util = require('./util')
path = require('path')

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
    it "should escape HTML entities"
    it "should return inline math for single line input"
    it "should return block math for multiple line input"

  describe "Injector", ->
    { injector } = mathJax
    it "should inject only if </body> tag is present"
    it "should inject if there are math equations in the page"
    it "should not inject if there is no math equations in the page"

  describe "Script", ->
    { script } = mathJax.script
    it "should use DEFAULT_OPTS by default"
    it "should use custom options in _config.yml"
