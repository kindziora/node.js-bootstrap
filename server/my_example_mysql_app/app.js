/**
 * this is the app starting point
 * it handles the inheritance order of our server
 * + dependency injection
 */

var myserver = require('./myserver'),
    main = require('../core/server'),
    cfg = require('./myconfig');

module.exports = new myserver( new main(cfg) );