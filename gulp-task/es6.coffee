babel = heap.require('gulp-babel')

module.exports = (profile = "default") ->
  cfg = config["es6:" + profile]
  gulp.task cfg.taskName,
    babel(cfg.src, cfg.dst, if cfg._useBabelRc then null else cfg.opts)
      .with(heap.sourcemaps()).if(cfg.sourceMap)
