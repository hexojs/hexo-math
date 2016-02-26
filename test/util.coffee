path = require('path')
MathJax = require('../src/main')

module.exports =
  # Note: somewhere in hexo's packages there's a global leak.
  # Disabled mocha's leak checking for now
  initHexo: ->
    site_dir = "./test/site"
    if !fs.existsSync(site_dir) then throw new Error("Test site not found. Run `gulp asset:test` first.")
    base_dir = path.join(__dirname, "site")
    hexo = new Hexo(base_dir, silent: true)
    mathJax = new MathJax(hexo)
    mathJax.register()

    hexo.extend.filter.register 'after_post_render', (data) ->
      expected_file = path.join(base_dir, "/source/#{data.source}.expected")
      if fs.existsSync(expected_file)
        data.expected = fs.readFileSync(expected_file)
      return data

    setup = ->
      hexo.init().then(-> hexo.call('generate', {}))
    teardown = ->
      hexo.call('clean', {})

    return {
      base_dir,
      mathJax
      hexo,
      setup,
      teardown
    }

  mockHexoWithThemeConfig: (theme_base, opts) ->
    hexo =
      theme:
        base: theme_base
        config: opts

    hexo
