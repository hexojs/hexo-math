path = require('path')
MathJax = require('../src/main')

module.exports =
  # Note: somewhere in hexo's packages there's a global leak.
  # Disabled mocha's leak checking for now
  initHexo: (engine) ->
    site_dir = "./test/site"
    if !fs.existsSync(site_dir) then throw new Error("Test site not found. Run `gulp asset:test` first.")
    base_dir = path.join(__dirname, "site")
    hexo = new Hexo(base_dir, silent: true)
    mathJax = new MathJax(hexo)
    mathJax.opts.engine = engine
    mathJax.register()

    hexo.extend.filter.register 'after_post_render', (data) ->
      expected_mathjax_file = path.join(base_dir, "/source/#{data.source.replace('_posts', '_expected/mathjax')}.expected")
      expected_katex_file = path.join(base_dir, "/source/#{data.source.replace('_posts', '_expected/katex')}.expected")
      if fs.existsSync(expected_mathjax_file)
        data.mathjax_expected = fs.readFileSync(expected_mathjax_file)
      else
        console.warn('Test file does not exist: ', expected_mathjax_file)
      if fs.existsSync(expected_katex_file)
        data.katex_expected = fs.readFileSync(expected_katex_file)
      else
        console.warn('Test file does not exist: ', expected_katex_file)
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
