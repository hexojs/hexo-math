Hexo = require('hexo')
fs = require('hexo-fs')
spawn = require('hexo-util/lib/spawn')

GIT_REPO_URL = 'https://github.com/hexojs/hexo-starter.git'

module.exports = ->
  site_dir = "./test/site"
  asset_dir = "./test/asset"

  gulp.task 'asset:test', ->
    hexo = new Hexo(site_dir)
    fs.mkdirs(site_dir).then(->
      console.log("Creating empty site...")
      spawn('git', ['clone', '--recursive', GIT_REPO_URL, site_dir], stdio: 'inherit')
    ).then(->
      console.log("Copying assets...")
      fs.copyDir(asset_dir, site_dir)
    ).then(->
      console.log("Installing dependencies...")
      args =
        cwd: site_dir
        stdio: 'inherit'
      spawn('npm', ['install', '--production'], args)
    )

  gulp.task 'asset:deploy', ->
    console.log("Copying assets...")
    fs.copyDir(asset_dir, site_dir)
