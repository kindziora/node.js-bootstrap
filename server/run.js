/**
 * this is the app starting point
 * it handles the inheritance order of our server
 */

module.exports = function () {
    return  new require('./myserver')(
                new require('./g/main')(
                    require('./myconfig')
                )
            );
}();