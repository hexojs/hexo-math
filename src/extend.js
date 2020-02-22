'use strict';

// https://github.com/hexojs/hexo/pull/3987

const extend = (target, ...sources) => {
  const length = sources.length;

  if (length < 1 || target == null) return target;
  for (let i = 0; i < length; i++) {
    const source = sources[i];

    for (const key in source) {
      target[key] = source[key];
    }
  }
  return target;
};

module.exports = extend;
