extend = hexo.extend
util = hexo.util
file = hexo.file

async = require 'async'

headTag = "</head>"
inject = "<%- partial('math-jax')%>"
makeLoaderCallback = (source, callback) ->
    return (err, src) ->
        if err? then return callback(err)
        if not src? then return callback(new Error("Null source."))
        source.src = src
        source.hasHead = src.indexOf(headTag) >= 0
        source.injected = src.indexOf(inject) >= 0
        
        return callback(null, source)

module.exports = class Layout
        constructor: (@path) ->
                @src = ""
                @images = []
                @hasHead = false
                @injected = false

        load: (callback) ->
                file.readFile(@path, null, makeLoaderCallback(@, callback))

        update: (callback) ->
                newSrc = @src
                for img in @images
                        r = new RegExp escapeRegExp img.url, "g"
                        newSrc = newSrc.replace r, "{{BASE_PATH}}/images/#{img.localPath}"
                        #console.log "#{img.url} -> #{img.localPath}"
                d = new Date()
                timestamp = d.toISOString()
                        .replace(/:/g, "-")

                # write backup file
                file.writeFile "#{@path}.#{timestamp}.bak", @src, (err) =>
                        if err?
                                console.log "Fail to backup #{@path}"
                        file.writeFile @path, newSrc, (err) ->
                                if err?
                                        callback? err, @
                                else
                                        callback? null, @
                
