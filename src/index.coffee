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

# Options
mathOptions = 
        desc: packageInfo.description
        usage: '<argument>'
        arguments: [
                {name: 'install', desc: 'Install MathJax dependencies.'},
                {name: 'remove', desc: 'Removes MathJax dependencies.'}
        ]


hexo.extend.console.register "math", packageInfo.description, mathOptions, (args, callback) ->
        console.log "-_-"
