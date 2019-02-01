var GIT_REPO_URL, Hexo, fs, spawn;

Hexo = require('hexo');

fs = require('hexo-fs');

spawn = require('hexo-util/lib/spawn');

GIT_REPO_URL = 'https://github.com/hexojs/hexo-starter.git';

module.exports = function() {
  var asset_dir, site_dir;
  site_dir = "./test/site";
  asset_dir = "./test/asset";
  gulp.task('asset:test', function() {
    var hexo;
    hexo = new Hexo(site_dir);
    return fs.mkdirs(site_dir).then(function() {
      console.log("Creating empty site...");
      return spawn('git', ['clone', '--recursive', GIT_REPO_URL, site_dir], {
        stdio: 'inherit'
      });
    }).then(function() {
      console.log("Copying assets...");
      return fs.copyDir(asset_dir, site_dir);
    }).then(function() {
      var args;
      console.log("Installing dependencies...");
      args = {
        cwd: site_dir,
        stdio: 'inherit'
      };
      return spawn('npm', ['install', '--production'], args);
    });
  });
  return gulp.task('asset:deploy', function() {
    console.log("Copying assets...");
    return fs.copyDir(asset_dir, site_dir);
  });
};
