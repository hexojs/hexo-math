# Imports
colors = require 'colors'
Log = require './Log'
Layout = require './Layout'
async = require 'async'
fs = require 'fs'
path = require 'path'

log = new Log()

# Hexo
file = hexo.file
themeDir = hexo.theme_dir
layoutDir = path.resolve themeDir, "layout" 
assetDir = path.resolve __dirname, "../asset"
mathJaxLayoutName = "math-jax.ejs"
mathJaxLayoutAsset = path.resolve assetDir, mathJaxLayoutName
mathJaxLayoutFile = path.resolve layoutDir, "_partial", mathJaxLayoutName

pad = (val, length, padChar = '.') ->
        val += ''
        numPads = length - val.length
        if (numPads > 0) then val + new Array(numPads + 1).join(padChar) else val

yesOrNo = (b) ->
        answer = if b then "YES".green else "NO".red
        "#{"[".bold}#{answer}#{"]".bold}"

doneOrFail = (b) ->
        answer = if b then "DONE".green else "FAIL".red
        "#{"[".bold}#{answer}#{"]".bold}"

load = (files, callback) ->
        # Parallelly load scripts
        tasks = []

        makeTask = (path) ->
                return (cb) ->
                        layout = new Layout path
                        layout.load cb
        files.forEach (f) ->
                fullPath = path.resolve layoutDir, f
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
                try
                        console.log("#{mathJaxLayoutAsset} exists: #{fs.existsSync(mathJaxLayoutAsset)}")
                        console.log("#{mathJaxLayoutFile} exists: #{fs.existsSync(mathJaxLayoutFile)}")
                        fs.linkSync mathJaxLayoutAsset, mathJaxLayoutFile
                        log.info pad("Deploy math-jax.ejs ", 50) +  " #{doneOrFail(true)}"
                catch error
                        log.error pad("Deploy math-jax.ejs ", 50) +  " #{doneOrFail(false)}"
                        log.error error

        tasks = []
        for layout in payload.layouts
                if not layout.injected
                        tasks.push (callback) ->
                                layout.inject()
                                layout.update(callback)

        async.parallel tasks, (err, results) ->
                if err?
                        log.error pad("Inject #{err.length} layouts", 50) +  " #{doneOrFail(false)}"
                        for e in err
                                log.error e
                        next? err
                log.info pad("Inject #{results.length} layouts", 50) +  " #{doneOrFail(true)}"
                next? null, null



remove = (payload, next) ->
        if not payload.deployed and not payload.injected
                log.info "Not installed."
                next? null, payload
                return
        if payload.deployed
                try
                        fs.unlinkSync mathJaxLayoutFile
                        log.info pad("Undeploy math-jax.ejs ", 50) +  " #{doneOrFail(true)}"
                catch error
                        log.error pad("Undeploy math-jax.ejs ", 50) +  " #{doneOrFail(false)}"
                        log.error error
                        
        tasks = []
        for layout in payload.layouts
                if layout.injected
                        tasks.push (callback) ->
                                layout.uninject()
                                layout.update(callback)

        async.parallel tasks, (err, results) ->
                if err?
                        log.error pad("Uninject #{err.length} layouts", 50) +  " #{doneOrFail(false)}"
                        for e in err
                                log.error e
                        next? err
                log.info pad("Uninject #{results.length} layouts", 50) +  " #{doneOrFail(true)}"
                next? null, null

        
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
