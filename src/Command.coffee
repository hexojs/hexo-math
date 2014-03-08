# Imports
colors = require 'colors'
Log = require './Log'
Layout = require './Layout'
async = require 'async'
fs = require 'fs'

log = new Log()

# Hexo
file = hexo.file
themeDir = hexo.theme_dir
layoutDir = themeDir + "layout\\"
assetDir = __dirname + "\\..\\asset\\"
mathJaxLayoutName = "math-jax.ejs"
mathJaxLayoutAsset = assetDir + mathJaxLayoutName
mathJaxLayoutFile = layoutDir + "_partial\\" + mathJaxLayoutName

pad = (val, length, padChar = '.') ->
        val += ''
        numPads = length - val.length
        if (numPads > 0) then val + new Array(numPads + 1).join(padChar) else val

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
        deployed = fs.existsSync mathJaxLayoutFile

        log.info pad("Layout math-jax.ejs deployed ", 50) + " #{yesOrNo(deployed)}"
        load layouts, (err, headLayouts) ->
                if err?
                        next? err
                        return
                injected = true
                for layout, i in headLayouts
                        log.info pad("Injected #{i + 1} of #{headLayouts.length} ", 50) +  " #{yesOrNo(layout.injected)}"
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
        if not payload.deployed
                fs.linkSync mathJaxLayoutAsset, mathJaxLayoutFile
                log.info pad("Deploy math-jax.ejs ", 50) +  " #{yesOrNo(true)}"
        console.log "Do install stuff"

remove = (payload, next) ->
        if not payload.deployed or not payload.injected
                log.info "Not installed."
                next? null, payload
                return
        if payload.deployed
                fs.unlinkSync mathJaxLayoutFile
                log.info pad("Undeploy math-jax.ejs ", 50) +  " #{yesOrNo(true)}"

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
