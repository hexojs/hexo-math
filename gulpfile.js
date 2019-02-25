//< deps
global.gulp = require('gulp');

global.heap = require('gulp-heap');

global.config = require('./gulpconfig.json');

//>
//< tasks
require('./gulp-task/cli')('default');

require('./gulp-task/watch')('default');

//>
//< contents
require('./gulp-task/test-asset')();

//>
