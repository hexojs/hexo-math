path = require('path')
hexoMathJax = require('../src')

module.exports =
  # Note: somewhere in hexo's packages there's a global leak.
  # Disabled mocha's leak checking for now
  initHexo: (name, registerExtension = true) ->
    site_dir = "./test/site"
    if !fs.existsSync(site_dir) then throw new Error("Test site not found. Run `gulp asset:test` first.")
    base_dir = path.join(__dirname, name)
    hexo = new Hexo(base_dir, silent: true)
    generator = new hexoMathJax(hexo)
    if registerExtension
      generator.register()

    setup = ->
      fs.copyDir(site_dir, base_dir).then(-> hexo.init())
    teardown = ->
      fs.rmdir(base_dir)

    return {
      generator,
      base_dir,
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
