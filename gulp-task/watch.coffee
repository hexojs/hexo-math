# require something

module.exports = (profile = "default") ->
  cfg = config["watch:" + profile]
  gulp.task cfg.taskName, ->
    cfg.opts.watchEntries.forEach ({targets, actions}) ->
      gulp.watch targets, actions
