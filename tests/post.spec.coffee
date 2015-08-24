describe "Sample Posts", ->
  runTest = (it, path, actaul, expected) ->
    it path, ->
      a = result.posts[path].content
      e = result.posts[path].expected
      expect(a).to.equal(e)
  for path, data of result.posts
    if data.expected?
      runTest it, path
