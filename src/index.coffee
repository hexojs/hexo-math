# Hexo
extend = hexo.extend
util = hexo.util
file = hexo.file

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


hexo.extend.console.register "math", packageInfo.description, mathOptions, (args, callback) ->
        cmd = new Command callback
        cmd.execute args._[0]
