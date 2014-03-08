# Imports
colors = require 'colors'
Log = require './Log'
Layout = require './Layout'
async = require 'async'

log = new Log()

# Hexo
file = hexo.file
themeDir = hexo.theme_dir
layoutDir = themeDir + "layout\\"

yesOrNo = (b) ->
        answer = if b then "YES".green else "NO".red
        "#{"[".bold}#{answer}#{"]".bold}"

load = (files, callback) ->
        # Parallelly load scripts
        tasks = []

        makeTask = (path) ->
                return (cb) ->
                        layout = new Layout path
                        layout.load cb

        files.forEach (f) ->

                fullPath = layoutDir + f
                tasks.push makeTask fullPath

        async.parallel tasks, (err, results) ->
                if err?
                        next? err
                log.info "Load #{results.length} layout files"
                heads = results.filter (l) -> l.hasHead
                log.info "Found #{heads.length} with <head>"
                callback? null, heads

        
list = (next) ->
        log.info "Layout folder: #{layoutDir}"
        file.list layoutDir, null, (err, files) ->
                if err?
                        next? err
                files = files.filter (f) -> f.match ".*?\.ejs$"
                log.info "Found #{files.length} layout files"
                next? null, files

check = (layouts, next) ->
        mathjax = layouts.filter (f) -> f.match ".*?math-jax.ejs$"
        deployed = mathjax.length != 0

        log.info "Layout math-jax.ejs deployed .......... #{yesOrNo(deployed)}"
        load layouts, (err, headLayouts) ->
                if err?
                        next? err
                        return
                injected = true
                for layout, i in headLayouts
                        log.info "Injected #{i + 1} of #{headLayouts.length} .......... #{yesOrNo(layout.injected)}"
                        if not layout.injected then injected = false
                next? null,
                        deployed: deployed
                        layouts: headLayouts
                        injected: injected

inject = (payload, next) ->
        if payload.deployed and payload.injected
                log.info "Already installed."
                next? null, payload
                return
        console.log "Do install stuff"

remove = (payload, next) ->
        if not payload.deployed or not payload.injected
                log.info "Not installed."
                next? null, payload
                return
        console.log "Do uninstall stuff"
        
        
module.exports = class Command
        constructor: (@callback) ->

        execute: (opt) ->
                handler = @[opt]
                if handler?
                        handler()
                else
                        log.error "Unknown command: #{opt}"
                        hexo.call 'help', {_: ['math']}, @callback
        
        install: () ->
                async.waterfall [
                        list,
                        check,
                        inject
                        ], (err, result) ->
                                if err?
                                        log.error err
                                else
                                        log.info "Done!"
                
        uninstall: () ->
                async.waterfall [
                        list,
                        check,
                        remove
                        ], (err, result) ->
                                if err?
                                        log.error err
                                else
                                        log.info "Done!"
