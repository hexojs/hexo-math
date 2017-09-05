hexo-math [![Build Status](https://travis-ci.org/hexojs/hexo-math.svg?branch=master)](https://travis-ci.org/hexojs/hexo-math)
===================

A hexo plugin that uses MathJax/KaTeX to render math equations. Features:

* Dynamic MathJax/KaTeX injection on demand
* Provide support to both inline math syntax and math tags
* Server-side rendering with KaTeX (new in 3.0.0)

## New in 3.0.0: Server-side rendering with KaTeX

Since 3.0.0, hexo-math added support to [KaTeX](https://github.com/Khan/KaTeX) .

It has serval advantages over MathJax:

* Server-side rendering
* Faster and smaller

Current limitations are:
* It supports less commands than MathJax. Check out [this list](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX) for more information.
* hexo-math will only render math tags with KaTeX

## Install

> npm install hexo-math --save

See [Migration Note](#migration-note) if you are upgrading from an older version.

## Config

In your site's `_config.yml`:

```yaml
math:
  engine: 'mathjax' # or 'katex'
  mathjax:
    src: custom_mathjax_source
    config:
      # MathJax config
  katex:
    css: custom_css_source
    js: custom_js_source # not used
    config:
      # KaTeX config
```

Your config will be merged into default config:
```js
const DEFAULT_OPTS = {
  engine: 'mathjax',
  mathjax: {
    src: "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
    config: {
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        processEscapes: true
      },
      TeX: {
        equationNumbers: {
          autoNumber: "AMS"
        }
      }
    }
  },
  katex: {
    css: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css",
    js: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.js",
    config: {
      throwOnError: false,
      errorColor: "#cc0000"
    }
  }  
}
```

## Usage

You can use inline math syntax directly. But always remember to escape any special characters by adding a ```\``` before it.
LaTex equations usually contains tones of special characters like ```\```, which makes it painful to escape them one by one. In such cases, you can use hexo-math's tags to make your life easier.

**Inline:**

```markdown
Simple inline $a = b + c$.
```

**Block:**

```markdown
$$\frac{\partial u}{\partial t}
= h^2 \left( \frac{\partial^2 u}{\partial x^2} +
\frac{\partial^2 u}{\partial y^2} +
\frac{\partial^2 u}{\partial z^2}\right)$$
```

**Tag:**

Single line content will be parsed as inline math (same as `$...$`):
```markdown
This equation {% math %}\cos 2\theta = \cos^2 \theta - \sin^2 \theta =  2 \cos^2 \theta - 1 {% endmath %} is inline.
```

Multiple line content will be parsed as block math (same as `$$...$$`)
```markdown
{% math %}
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
{% endmath %}
```

> **Deprecated since 2.0.0**

>**Tag Block:**

>```markdown
{% math_block %}
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
{% endmath_block %}
```

## Migration Note

### Migrating to 3.0.0

* `mathjax` should be moved under `math` section in your `_config.yml`

### Migrating to 2.1.0

* `math_block` is removed

### Migrating to 2.0.0

* `math_block` is deprecated (but still usable. This won't break your site)
* `math` block is used to handle both inline and block math due to breaking changes made since Hexo 3.x. (This will break your site if you're using `math` block)

Since Hexo 3.x, nunjucks is used as tag engine instead of swig. Syntax like this won't work any more:

```markdown
{% math \frac{|ax + by + c|}{\sqrt{a^{2}+b^{2}}} %}
```

Instead, you should use open and close tag since this version:
```markdown
{% math %}\frac{|ax + by + c|}{\sqrt{a^{2}+b^{2}}} {% endmath %}
```

Change all your `math` tags accordingly.

### Migrating to 1.0.6

**!!!IMPORTANT!!!**

Since 1.0.6, hexo-math uses a different approach to inject MathJax into your site. MathJax will be injected on-the-fly and on-demand. This means:

* **You are no longer required to run `hexo math install`**
* MathJax will not be loaded on pages without math tags allowing faster loading speed.

If you have run `hexo math install` before, please **do run:**

```
$ hexo math
```

This will clean up previous installation. Or you can re-install your theme if for some reason this does not work.



### From 1.0.4 to 1.0.5 (Support Hexo 3.0)

Hexo 3.0 introduces multiple breaking changes. Versions before 1.0.5 won't work with it.
The following changes are made since 1.0.5 to adapt the new 3.0 API:

* Block math tag renamed from `math-block` to `math_block`

### From 1.0.3 and before

Since 1.0.4, MathJax scripts will be injected in `<body>` section instead of `<head>` section.
Before you update `hexo-math` to newer version, you should run:

> $ hexo math uninstall

After `hexo-math` is updated, run install again:

> $ hexo math install


## Development

### Test

To run the test suit, first you should install dependencies for the test site:

```bash
> $ cd .test-site
> $ npm install
```

Then run `npm test` from `hexo-math`'s root dir.

#### Add post specs

In `.test-site/source/_post` folder, add a pair of file for each test cases:

* [test-case-name].md
* [test-case-name].md.expected

The `.md` file contains the Markdown source of a post and the `.expected` file contains expected HTML rendered from the source.

If a test case is added to address certain issues, the issue id should be added to the `.md`'s front matter section:

```markdown
title: "Tag Escape"
date: 2015-04-21 02:47:19
tags:
issues:
- 10
---
{% math %} |a|<1 {% endmath %}
```
