// require something
var del;

del = require('del');

module.exports = function(profile = "default") {
  var cfg;
  cfg = config["clean:" + profile];
  return gulp.task(cfg.taskName, function() {
    return del(cfg.src, cfg.opts).then(function(paths) {
      console.log(`Deleted${(cfg.opts.dryRun ? "(dry run)" : "")}:`);
      return console.log(paths.join('\n'));
    });
  });
};
