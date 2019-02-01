// require something
module.exports = function(profile = "default") {
  var cfg;
  cfg = config["watch:" + profile];
  return gulp.task(cfg.taskName, function() {
    return cfg.opts.watchEntries.forEach(function({targets, actions}) {
      return gulp.watch(targets, actions);
    });
  });
};
