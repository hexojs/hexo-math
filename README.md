hexo-math
===================

A hexo plugin that uses MathJax to render math equations. Features:

* Automatcially deploy and add reference to MathJax
* Provide support to both MathJax's inline math syntax and math tags

<del>(See a Chinese version of this document [here](http://blog.catx.me/2014/03/09/hexo-mathjax-plugin/))</del> *Information in that post is out-dated*

## Install


> npm install hexo-math --save

See [Migration Note](#migration-note) if you are upgrading from an older version.

## Usage

You can use MathJax's inline math syntax directly. But always remember to escape any special characters by adding a ```\``` before it.
LaTex equations usually contains tones of special characters like ```\```, which makes it painful to escape them one by one. In such cases, you can use hexo-math's tags to make your life easier.

**MathJax Inline:**

```markdown
Simple inline $a = b + c$.
```

**MathJax Block:**

```markdown
$$\frac{\partial u}{\partial t}
= h^2 \left( \frac{\partial^2 u}{\partial x^2} +
\frac{\partial^2 u}{\partial y^2} +
\frac{\partial^2 u}{\partial z^2}\right)$$
```

**Tag inline:**

```markdown
This equation {% math \cos 2\theta = \cos^2 \theta - \sin^2 \theta =  2 \cos^2 \theta - 1 %} is inline.
```

**Tag Block:**
```markdown
{% math_block %}
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
{% endmath_block %}
```
## Migration Note

### Migrating to 1.0.6

**!!!IMPORTANT!!!**

Since 1.0.6, hexo-math uses a diffrent approach to inject MathJax into your site. MathJax will be injected on-the-fly and on-demand. This means:

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
