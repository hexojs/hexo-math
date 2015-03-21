colors = require 'colors'

module.exports = class Log
  print: (verb, msg) ->
    console.log "#{"[".bold}#{verb}#{"]".bold} #{msg}"
  error: (msg) ->
    @print "Error".red, msg

  info: (msg) ->
    @print "Info".green, msg
