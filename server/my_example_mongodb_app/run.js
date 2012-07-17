/**
 * this is the app starting point
 * it handles the inheritance order of our server
 */

var myserver = require('./myserver'),
    main = require('./g/main'),
    cfg = require('./myconfig');

module.exports = new myserver( new main(cfg) );