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
  desc: packageInfo.description
  usage: '<argument>'
  arguments: [
    {name: 'install', desc: 'Install MathJax dependencies.'},
    {name: 'uninstall', desc: 'Uninstall MathJax dependencies.'}
  ]

assetBase = path.resolve __dirname, '../asset'

injectSrc = fs.readFileSync path.resolve assetBase, 'math-jax.ejs'

hexo.extend.filter.register "after_render:html", (src, data) ->
  insertPos = src.indexOf("</body>")
  hasBody = insertPos >= 0
  hasMath = src.indexOf("<!-- Has MathJax -->") >= 0
  if hasBody and hasMath
    return src.substr(0, insertPos) + injectSrc + src.substr(insertPos)
  return src;

# The console
hexo.extend.console.register "math", packageInfo.description, mathOptions, (args, callback) ->
  cmd = new Command hexo, callback
  cmd.execute args._[0]

# Single Tag
hexo.extend.tag.register "math", (args, content) ->
  console.log content
  eq = args.join " "
  result = "<span>$#{eq}$</span><!-- Has MathJax -->"
  return result

# Block Tag
hexo.extend.tag.register "math_block", ((args, content) ->
  result = "<span>$$#{content}$$</span><!-- Has MathJax -->"
  return result
  ), ends: true
