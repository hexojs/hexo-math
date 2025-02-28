'use strict';

require('chai').should();

const { url_for } = require('hexo-util');
const Hexo = require('hexo');
const hexo = new Hexo(__dirname, { silent: true });
const { renderToString: renderKatex } = require('katex');

describe('hexo-math', () => {
  const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.config, {
    math: {
      katex: {
        enable: true,
        css: 'https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
        options: {
          throwOnError: false
        }
      },
      mathjax: {
        enable: true,
        css: 'https://fastly.jsdelivr.net/gh/hexojs/hexo-math/master/dist/style.css',
        options: {
          conversion: {
            display: false
          },
          svg: {},
          tex: {}
        }
      }
    }
  })));
  let args = [];

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
    args = [];
  });

  describe('tag', () => {
    describe('katex', () => {
      const k = require('../lib/katex')(hexo).bind({});
      const content = 'c = \\pm\\sqrt{a^2 + b^2}';

      it('default', () => {
        const output = k(args, content);
        const expected = renderKatex(content, hexo.config.math.katex.options);

        output.should.eql(expected);
      });

      it('config', () => {
        hexo.config.math.katex.options.output = 'html';
        const output = k(args, content);
        const expected = renderKatex(content, hexo.config.math.katex.options);

        output.should.eql(expected);
      });

      it('args', () => {
        const options = { output: 'mathml' };
        args.push(JSON.stringify(options));
        const output = k(args, content);
        const expected = renderKatex(content, options);

        output.should.eql(expected);
      });

      it('args should override config', () => {
        hexo.config.math.katex.options.output = 'html';

        const options = { output: 'mathml' };
        args.push(JSON.stringify(options));
        const output = k(args, content);
        const expected = renderKatex(content, options);

        output.should.eql(expected);
      });

      it('disable in front-matter', () => {
        const fm = { katex: false };
        const k = require('../lib/katex')(hexo).bind(fm);

        const output = k(args, content);
        output.should.eql(content);
      });

      it('args should override front-matter', () => {
        const fm = { katex: { output: 'html' } };
        const k = require('../lib/katex')(hexo).bind(fm);
        const options = { output: 'mathml' };
        args.push(JSON.stringify(options));
        const output = k(args, content);
        const expected = renderKatex(content, options);

        output.should.eql(expected);
      });
    });

    describe('mathjax', () => {
      const m = require('../lib/mathjax')(hexo).bind({});
      const content = '\\frac{1}{x^2-1}';
      const displayFalse = '<mjx-container class="MathJax" jax="SVG">';
      const displayTrue = '<mjx-container class="MathJax" jax="SVG" display="true">';

      it('default', async () => {
        const output = await m(args, content);

        output.startsWith(displayFalse).should.eql(true);
      });

      it('config', async () => {
        hexo.config.math.mathjax.options.conversion.display = true;
        const output = await m(args, content);

        output.startsWith(displayTrue).should.eql(true);
      });

      it('args', async () => {
        const options = { conversion: { display: true } };
        args.push(JSON.stringify(options));
        const output = await m(args, content);

        output.startsWith(displayTrue).should.eql(true);
      });

      it('args should override config', async () => {
        hexo.config.math.mathjax.options.conversion.display = false;

        const options = { conversion: { display: true } };
        args.push(JSON.stringify(options));
        const output = await m(args, content);

        output.startsWith(displayTrue).should.eql(true);
      });

      it('disable in front-matter', async () => {
        const fm = { mathjax: false };
        const m = require('../lib/mathjax')(hexo).bind(fm);

        const output = await m(args, content);
        output.should.eql(content);
      });

      it('args should override front-matter', async () => {
        const fm = { mathjax: { conversion: { display: false } } };
        const m = require('../lib/mathjax')(hexo).bind(fm);
        const options = { conversion: { display: true } };
        args.push(JSON.stringify(options));
        const output = await m(args, content);

        output.startsWith(displayTrue).should.eql(true);
      });
    });
  });

  describe('inject', () => {
    const css = path => {
      return `<link rel="stylesheet" href="${url_for.call(hexo, path)}">\n`;
    };

    hexo.extend.helper.register('css', path => {
      return css(path);
    });

    describe('katex', () => {
      const k = require('../lib/inject/katex')(hexo);

      it('default', () => {
        const output = k();
        output.should.eql(css(hexo.config.math.katex.css));
      });

      it('custom path', () => {
        const path = '/foo/bar.css';
        hexo.config.math.katex.css = path;
        const output = k();
        output.should.eql(css(path));
      });
    });

    describe('mathjax', () => {
      const m = require('../lib/inject/mathjax')(hexo);

      it('default', () => {
        const output = m();
        output.should.eql(css(hexo.config.math.mathjax.css));
      });

      it('custom path', () => {
        const path = '/foo/bar.css';
        hexo.config.math.mathjax.css = path;
        const output = m();
        output.should.eql(css(path));
      });
    });
  });
});
