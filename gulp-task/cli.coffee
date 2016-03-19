_ = require('underscore')

module.exports = (profile = "default") ->
  cfg = config["cli:" + profile]
  mappings = cfg.opts.mapping
  globalMapping = mappings.GLOBAL || {}

  getValue = (o, k) ->
    keys = k.split('.')
    v = undefined
    p = o
    while p and keys.length > 0
      v = p = p[keys.shift()]
    v

  adapteType = (orig, v) ->
    if not orig? then return v
    if typeof v != 'string' then return v
    t = typeof orig
    switch t
      when 'string'
        return v
      when 'number'
        return parseFloat(v)
      when 'boolean'
        return v.toLowerCase() == 'true'
      when 'object'
        if Array.isArray(orig)
          return v.split(',').map((v) -> v.trim())
    throw new Error("Incompatable type: #{t} and string")

  setValue = (o, k, v) ->
    keys = k.split('.')
    _k = keys.pop()
    p = o
    while p and keys.length > 0
      p = p[keys.shift()]
    if p?
      try
        p[_k] = adapteType p[_k], v
      catch error
        console.log("Failed to set value. Reason: #{error}.")


  for key, mapping of mappings
    # Get config to be mapped
    target = config[key]
    # No config
    if not target? then continue
    for field, arg of mapping
      value = heap.cli.opts[arg]
      # No cli override
      if not value? then continue
      # Set value
      console.log("Map #{key}.#{field} -> --#{arg}=#{value}")
      setValue(target, field, value)

  for field, arg of globalMapping
    value = heap.cli.opts[arg]
    # No cli override
    if not value? then continue
    for key, target of config
      console.log("Map #{key}.#{field} -> --#{arg}=#{value}")
      setValue(target, field, value)
