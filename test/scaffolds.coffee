require('babel-register')

GLOBAL.Hexo = require('hexo')
GLOBAL.fs = require('hexo-fs')
GLOBAL.chai = require('chai')
GLOBAL.expect = chai.expect

chai.use(require('chai-as-promised'))
