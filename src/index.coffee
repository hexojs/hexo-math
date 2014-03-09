# Hexo
extend = hexo.extend
util = hexo.util
file = hexo.file
htmlTag = hexo.util.html_tag

# Modules
async = require 'async'
colors = require 'colors'
fs = require 'fs'

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

# The console
hexo.extend.console.register "math", packageInfo.description, mathOptions, (args, callback) ->
        cmd = new Command callback
        cmd.execute args._[0]

# Single Tag
hexo.extend.tag.register "math", (args, content) ->
        eq = args.join " "
        result = "<span>$#{eval('"'+ eq + '"')}$</span>"
        return result

# Block Tag
hexo.extend.tag.register "math-block", ((args, content) ->
        result = "<span>$$#{content}$$</span>"
        return result
        ), true
