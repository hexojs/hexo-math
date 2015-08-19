# Hexo
extend = hexo.extend
util = require 'hexo-util'
file = require 'hexo-fs'
htmlTag = util.html_tag

# Modules
async = require 'async'
colors = require 'colors'
fs = require 'hexo-fs'
path = require 'path'

# Local
packageInfo = require '../package.json'
Command = require './Command'

# Options
mathOptions =
  desc: packageInfo.description + " (IMPORTANT: those commands are deprecated since 1.0.6. Run `hexo math` for migration.)"
  usage: '<argument>'
  arguments: [
    {name: 'install', desc: 'Install MathJax dependencies. (deprecated since 1.0.6)'},
    {name: 'uninstall', desc: 'Uninstall MathJax dependencies. (deprecated since 1.0.6)'}
  ]

assetBase = path.resolve __dirname, '../asset'

injectSrc = fs.readFileSync path.resolve assetBase, 'math-jax.ejs'

inlineMathRegex = /\$.*\$/
blockMathRegex = /^\s*\$\$[\s\S]*\$\$\s*$/m

hexo.extend.filter.register "after_render:html", (src, data) ->
  insertPos = src.indexOf("</body>")
  hasBody = insertPos >= 0
  hasInline = inlineMathRegex.test(src)
  hasBlock = blockMathRegex.test(src)
  hasMath = src.indexOf("<!-- Has MathJax -->") >= 0 or hasInline or hasBlock
  if hasBody and hasMath
    return src.substr(0, insertPos) + injectSrc + src.substr(insertPos)
  return src;

# The console
hexo.extend.console.register "math", packageInfo.description, mathOptions, (args, callback) ->
  cmd = new Command hexo, callback
  # cmd.execute args._[0]
  cmd.migrate()

# Single Tag
hexo.extend.tag.register "math", (args, content) ->
  eq = args.join " "
  result = "<span>$#{eq}$</span><!-- Has MathJax -->"
  return result

warn = (message) ->
  console.warn "#{"WARN".yellow} #{message}"
# Block Tag
hexo.extend.tag.register "math_block", ((args, content) ->
  warn "'math_block' tag is deprecated since hexo-math 2.0. Use 'math' block instead."
  result = "<span>$$#{content}$$</span><!-- Has MathJax -->"
  return result
  ), ends: true
