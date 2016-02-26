# require something
del = require('del')

module.exports = (profile = "default") ->
  cfg = config["clean:" + profile]
  gulp.task cfg.taskName, ->
    del(cfg.src, cfg.opts).then (paths) ->
      console.log "Deleted#{if cfg.opts.dryRun then "(dry run)" else ""}:"
      console.log paths.join('\n')
