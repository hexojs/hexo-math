var mocha;

mocha = heap.require('gulp-mocha');

module.exports = function(profile = "default") {
  var cfg;
  cfg = config["mocha:" + profile];
  return gulp.task(cfg.taskName, function() {
    return mocha(cfg.src, cfg.dst, cfg.opts)();
  });
};
