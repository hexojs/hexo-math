colors = require 'colors'
Log = require './Log'
log = new Log()

module.exports = class Command
        constructor: (@callback) ->

        execute: (opt) ->
                try
                        @[opt]()
                catch
                        log.error "Unknown command: #{opt}"
                        hexo.call 'help', {_: ['math']}, @callback
        
        install: () ->
                log.info "Run install"
        remove: () ->
                log.info "Run remove"
