require('@babel/register');

global.Hexo = require('hexo');

global.fs = require('hexo-fs');

global.chai = require('chai');

global.expect = chai.expect;

chai.use(require('chai-as-promised'));
