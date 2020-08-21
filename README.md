# hexo-math

[![Tester](https://github.com/hexojs/hexo-math/workflows/Tester/badge.svg?branch=master)](https://github.com/hexojs/hexo-math/actions?query=workflow%3ATester)
[![npm version](https://badge.fury.io/js/hexo-math.svg)](https://www.npmjs.com/package/hexo-math)
[![npm license](https://img.shields.io/npm/l/hexo-math)](./LICENSE)
![npm download](https://img.shields.io/npm/dt/hexo-math)

Embed [KaTeX] and [MathJax] in [Hexo] post/page via tag plugins. Equations are rendered in Hexo (server-side), so browser-side javascript library is not needed and should be removed. CSS stylesheets are included by default but  can be easily replaced.

## Installation

```bash
$ npm i hexo-math --save
```

- Requires Hexo 5+

## Usage

**KaTeX**

```
{% katex '{options}' %}
content
{% endkatex %}
```

### Examples

```
{% katex %}
c = \pm\sqrt{a^2 + b^2}
{% endkatex %}
```

Override [front-matter](#per-article-configuration) and [global options](#global-options) for a particular content. Options must be specified in [JSON](https://en.wikipedia.org/wiki/JSON#Example) format.

```
{% katex '{ "output": "mathml", "felqn": true, "minRuleThickness": 0.05, "throwOnError": true }' %}
c = \pm\sqrt{a^2 + b^2}
{% endkatex %}
```

**MathJax**

```
{% mathjax '{options}' %}
content
{% endmathjax %}
```

### Examples

```
{% mathjax %}
\frac{1}{x^2-1}
{% endmathjax %}
```

Override [front-matter](#per-article-configuration) and [global options](#global-options) for a particular content. Options must be specified in [JSON](https://en.wikipedia.org/wiki/JSON#Example) format.

```
{% mathjax '{ "conversion": { "em": 14 }, "tex": { "tags": "ams" }, "svg": { "exFactor": 0.03 } }' %}
\frac{1}{x^2-1}
{% endmathjax %}
```

## Per-article configuration

Override the global options via the front-matter of an article (post/page) basis.

``` yml
---
title: On the Electrodynamics of Moving Bodies
categories: Physics
date: 1905-06-30 12:00:00
katex: false
mathjax: false
---
```

### Options

Disable math renderer in an article:

``` yml
---
katex: false
mathjax: false
---
```

Override global options:

``` yml
---
katex:
  output: 'mathml'
  felqn: true
  minRuleThickness: 0.05
  throwOnError: true
mathjax:
  conversion:
    em: 14
  tex:
    tags: 'ams'
  svg:
    exFactor: 0.03
---
```

## Global Options

```yaml
# _config.yml
math:
  katex:
    css: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css'
    options:
      throwOnError: false
  mathjax:
    css: 'https://cdn.jsdelivr.net/npm/hexo-math@4.0.0/dist/style.css'
    options:
      conversion:
        display: false
      tex:
      svg:
```

- **css**: Location of stylesheet.
  * Specify a relative path if you're self-hosting the stylesheet.
    * Example: `css: '/css/style.css'` refers to `source/css/style.css` or `themes/<theme-name>/source/css/style.css`.
  * It can be disabled (`css: false`) if the installed theme has already included one.
    * KaTeX: defaults to the [official stylesheet](https://github.com/KaTeX/KaTeX/blob/master/src/katex.less).
    * MathJax: defaults to [style.css](dist/style.css)

### KaTeX

``` yaml
  katex:
    options:
      throwOnError: false
```

- **options**: Refer to the [documentation](https://katex.org/docs/options.html) for available options.

### MathJax

``` yaml
  mathjax:
    options:
      conversion:
        display: false
      tex:
      svg:
```

- **options**: Rendering options.
  * **conversion**: [Conversion options](https://docs.mathjax.org/en/latest/web/typeset.html#conversion-options).
  * **tex**: [TeX input options](https://docs.mathjax.org/en/latest/options/input/tex.html).
  * **svg**: [SVG output options](https://docs.mathjax.org/en/latest/options/output/svg.html).

## Configuration priority

Unique options are combined, if there is any duplicate options, [argument](#usage) overrides [front-matter](#per-article-configuration), front-matter overrides [global options](#global-options).

**Example**:

```
{% katex '{ "output": "html", "felqn": true }' %}
content
{% endkatex %}
```

``` yml
# front-matter
---
katex:
  output: 'mathml'
  minRuleThickness: 0.05
  throwOnError: true
---
```

``` yml
# _config.yml
math:
  katex:
    options:
      minRuleThickness: 0.03
      maxExpand: 900
```

Following options will be parsed as argument for that specific content:

``` js
{
  output: 'html',
  felqn: true,
  minRuleThickness: 0.05,
  throwOnError: true,
  maxExpand: 900
}
```

## Similar project

- [hexo-filter-mathjax]: A MathJax plugin developed by @stevenjoezhang, who is also a Hexo developer. It enables you to write LaTeX in-line within your post without using a tag `{% %}`.
  * hexo-math uses tag plugin approach due to minor incompatibility between LaTeX and [marked], the default markdown renderer of Hexo (via [hexo-renderer-marked]).

[KaTex]: https://katex.org/
[MathJax]: https://www.mathjax.org/
[Hexo]: https://hexo.io/
[hexo-filter-mathjax]: https://github.com/next-theme/hexo-filter-mathjax
[marked]: https://github.com/markedjs/marked
[hexo-renderer-marked]: https://github.com/hexojs/hexo-renderer-marked
