mocha = heap.require('gulp-mocha')

module.exports = (profile = "default") ->
  cfg = config["mocha:" + profile]
  gulp.task cfg.taskName, ->
    mocha(cfg.src, cfg.dst, cfg.opts)()
