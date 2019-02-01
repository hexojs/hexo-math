var MathJax, path;

path = require('path');

MathJax = require('../src/main');

module.exports = {
  // Note: somewhere in hexo's packages there's a global leak.
  // Disabled mocha's leak checking for now
  initHexo: function(engine) {
    var base_dir, hexo, mathJax, setup, site_dir, teardown;
    site_dir = "./test/site";
    if (!fs.existsSync(site_dir)) {
      throw new Error("Test site not found. Run `gulp asset:test` first.");
    }
    base_dir = path.join(__dirname, "site");
    hexo = new Hexo(base_dir, {
      silent: true
    });
    mathJax = new MathJax(hexo);
    mathJax.opts.engine = engine;
    mathJax.register();
    hexo.extend.filter.register('after_post_render', function(data) {
      var expected_file;
      expected_file = path.join(base_dir, `/source/${data.source.replace('_posts', `_expected/${engine}`)}.expected`);
      if (fs.existsSync(expected_file)) {
        data[`${engine}_expected`] = fs.readFileSync(expected_file);
      } else {
        console.warn('Test file does not exist: ', expected_file);
      }
      return data;
    });
    setup = function() {
      return hexo.init().then(function() {
        return hexo.call('generate', {});
      });
    };
    teardown = function() {
      return hexo.call('clean', {});
    };
    return {base_dir, mathJax, hexo, setup, teardown};
  },
  mockHexoWithThemeConfig: function(theme_base, opts) {
    var hexo;
    hexo = {
      theme: {
        base: theme_base,
        config: opts
      }
    };
    return hexo;
  }
};
