require('coffee-script/register');
var Hexo = require('hexo'),
  path = require('path'),
  fs = require('fs'),
  Mocha = require('mocha'),
  Promise = require('bluebird');

console.log("Running tests...");

var testSiteRoot = path.join(process.cwd(), "/.test-site");
var hexo = new Hexo(testSiteRoot, {});

GLOBAL.chai = require('chai');
GLOBAL.expect = chai.expect;
GLOBAL.hexo = hexo;
GLOBAL.result = { posts: {}, pages: {} };

testAfterPostRenderFilter = function(data) {
  result.posts[data.source] = data;
  // Load test data
  var expectedDataFilePath = path.join(testSiteRoot, '/source/', data.source + ".expected");
  console.log(expectedDataFilePath);
  if (fs.existsSync(expectedDataFilePath)) {
    data.expected = fs.readFileSync(expectedDataFilePath, 'utf-8');
  }
};

hexo.init()
  .then(function() {
    console.log("Hexo initialized");
    console.log("Loading hexo-math...");
    require("./");
    console.log("Inject test filter: after_post_render");
    hexo.extend.filter.register('after_post_render', testAfterPostRenderFilter);
    console.log("Loading test site...");
    return hexo.load();
  })
  .then(function() {
    console.log("Cleaning previous build...");
    return hexo.call('clean', {});
  })
  .then(function() {
    console.log("Generating...");
    return hexo.call('generate', {});
  })
  .then(function() {
    console.log("Running tests...");

    var mocha = new Mocha({
      ui: 'bdd',
      reporter: 'spec'
    });
    var testRoot = path.join(process.cwd(), 'tests/');
    fs.readdirSync(testRoot)
      .filter(function (file) { return file.substr(-12) === '.spec.coffee'; })
      .forEach(function (file) {
        mocha.addFile(path.join(testRoot, file));
      });

    return new Promise(function(resolve, reject) {
      // Run mocha
      mocha.run(function (failures) {
        if (failures) return reject(failures);
        return hexo.exit();
      });
    });
  })
  .catch(function(err) {
    return hexo.exit(err);
  });
