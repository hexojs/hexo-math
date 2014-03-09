hexo-math
===================

A hexo plugin that uses MathJax to render math equations. Features:

* Automatcially deploy and add reference to MathJax
* Provide support to both MathJax's inline math syntax and math tags

(See a Chinese version of this document [here](http://blog.catx.me/2014/03/09/hexo-mathjax-plugin/))
## Install

> npm install hexo-math --save

## Initialize

* Run in your blog project folder:

> $ hexo math install

* Edit `_config.yml`:

```yaml
plugins:
- hexo-math
```

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
{% math-block %}
\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}
{% endmath-block %}
```


