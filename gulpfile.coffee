#< deps
GLOBAL.gulp = require('gulp')
GLOBAL.heap = require('gulp-heap')
GLOBAL.config = require('./gulpconfig.json')
#>
#< tasks
require('./gulp-task/cli')('default')
require('./gulp-task/clean')('default')
require('./gulp-task/es6')('default')
require('./gulp-task/mocha')('default')
require('./gulp-task/watch')('default')
require('./gulp-task/clean')('test')
#>
#< contents
require('./gulp-task/test-asset')()
#>