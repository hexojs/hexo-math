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
Entities = require('html-entities').AllHtmlEntities
entities = new Entities()

# Local
packageInfo = require '../package.json'
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

# Single Tag
hexo.extend.tag.register "math", ((args, content) ->
  content = entities.encode(content)
  if /\n/.test content
    result = "<span>$$#{content}$$</span><!-- Has MathJax -->"
  else
    result = "<span>$#{content}$</span><!-- Has MathJax -->"
  return result
  ), ends: true

warn = (message) ->
  console.warn "#{"WARN".yellow} #{message}"
# Block Tag
hexo.extend.tag.register "math_block", ((args, content) ->
  warn "'math_block' tag is deprecated since hexo-math 2.0. Use 'math' block instead."
  result = "<span>$$#{content}$$</span><!-- Has MathJax -->"
  return result
  ), ends: true
