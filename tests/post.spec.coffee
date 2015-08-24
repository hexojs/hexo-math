describe "Sample Posts", ->
  runTest = (it, path, msg) ->
    it path + msg, ->
      a = result.posts[path].content
      e = result.posts[path].expected
      expect(a).to.equal(e)
  for path, data of result.posts
    if data.expected?
      msg = ""
      # Attach issue number
      if data.issues
        i = data.issues.map((n) -> "##{n}").join(", ")
        msg = " (#{i})"
      runTest it, path, msg
