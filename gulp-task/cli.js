var _;

_ = require('underscore');

module.exports = function(profile = "default") {
  var adapteType, arg, cfg, field, getValue, globalMapping, key, mapping, mappings, results, setValue, target, value;
  cfg = config["cli:" + profile];
  mappings = cfg.opts.mapping;
  globalMapping = mappings.GLOBAL || {};
  getValue = function(o, k) {
    var keys, p, v;
    keys = k.split('.');
    v = void 0;
    p = o;
    while (p && keys.length > 0) {
      v = p = p[keys.shift()];
    }
    return v;
  };
  adapteType = function(orig, v) {
    var t;
    if (orig == null) {
      return v;
    }
    if (typeof v !== 'string') {
      return v;
    }
    t = typeof orig;
    switch (t) {
      case 'string':
        return v;
      case 'number':
        return parseFloat(v);
      case 'boolean':
        return v.toLowerCase() === 'true';
      case 'object':
        if (Array.isArray(orig)) {
          return v.split(',').map(function(v) {
            return v.trim();
          });
        }
    }
    throw new Error(`Incompatable type: ${t} and string`);
  };
  setValue = function(o, k, v) {
    var _k, error, keys, p;
    keys = k.split('.');
    _k = keys.pop();
    p = o;
    while (p && keys.length > 0) {
      p = p[keys.shift()];
    }
    if (p != null) {
      try {
        return p[_k] = adapteType(p[_k], v);
      } catch (error1) {
        error = error1;
        return console.log(`Failed to set value. Reason: ${error}.`);
      }
    }
  };
  for (key in mappings) {
    mapping = mappings[key];
    // Get config to be mapped
    target = config[key];
    // No config
    if (target == null) {
      continue;
    }
    for (field in mapping) {
      arg = mapping[field];
      value = heap.cli.opts[arg];
      // No cli override
      if (value == null) {
        continue;
      }
      // Set value
      console.log(`Map ${key}.${field} -> --${arg}=${value}`);
      setValue(target, field, value);
    }
  }
  results = [];
  for (field in globalMapping) {
    arg = globalMapping[field];
    value = heap.cli.opts[arg];
    // No cli override
    if (value == null) {
      continue;
    }
    results.push((function() {
      var results1;
      results1 = [];
      for (key in config) {
        target = config[key];
        console.log(`Map ${key}.${field} -> --${arg}=${value}`);
        results1.push(setValue(target, field, value));
      }
      return results1;
    })());
  }
  return results;
};
