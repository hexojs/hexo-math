const path = require('path');

const MathJax = require('../src/main');

module.exports = {
  // Note: somewhere in hexo's packages there's a global leak.
  // Disabled mocha's leak checking for now
  initHexo: function(engine) {
    const site_dir = './test/site';
    if (!fs.existsSync(site_dir)) {
      throw new Error('Test site not found. Run `gulp asset:test` first.');
    }
    const base_dir = path.join(__dirname, 'site');
    const hexo = new Hexo(base_dir, {
      silent: true
    });
    const mathJax = new MathJax(hexo);
    mathJax.opts.engine = engine;
    mathJax.register();
    hexo.extend.filter.register('after_post_render', function(data) {
      const expected_file = path.join(base_dir, `/source/${data.source.replace('_posts', `_expected/${engine}`)}.expected`);
      if (fs.existsSync(expected_file)) {
        data[`${engine}_expected`] = fs.readFileSync(expected_file);
      } else {
        console.warn('Test file does not exist: ', expected_file);
      }
      return data;
    });
    const setup = function() {
      return hexo.init().then(function() {
        return hexo.call('generate', {});
      });
    };
    const teardown = function() {
      return hexo.call('clean', {});
    };
    return {base_dir, mathJax, hexo, setup, teardown};
  },
  mockHexoWithThemeConfig: function(theme_base, opts) {
    const hexo = {
      theme: {
        base: theme_base,
        config: opts
      }
    };
    return hexo;
  }
};
