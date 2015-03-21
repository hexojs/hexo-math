# extend = hexo.extend
util = require 'hexo-util'
file = require 'hexo-fs'

async = require 'async'

injectionPoint = "</body>"
injectScript = "<%- partial('_partial/math-jax')%>"
makeLoaderCallback = (source, callback) ->
  return (err, src) ->
    if err? then return callback(err)
    if not src? then return callback(new Error("Null source."))
    source.src = src
    source.hasHead = src.indexOf(injectionPoint) >= 0
    source.injected = src.indexOf(injectScript) >= 0

    return callback(null, source)

escapeRegExp = (str) ->
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

module.exports = class Layout
  constructor: (@path) ->
    @src = ""
    @images = []
    @hasHead = false
    @injected = false

  load: (callback) ->
    file.readFile(@path, null, makeLoaderCallback(@, callback))

  inject: () ->
    r = new RegExp "#{escapeRegExp(injectionPoint)}", "g"
    @src = @src.replace r, "#{injectScript}\n#{injectionPoint}"

  uninject: () ->
    r = new RegExp "#{escapeRegExp(injectScript)}\n", "g"
    @src = @src.replace r, ""

  update: (callback) ->
    file.writeFile @path, @src, (err) ->
      if err?
        callback? err, @
      else
        callback? null, @
