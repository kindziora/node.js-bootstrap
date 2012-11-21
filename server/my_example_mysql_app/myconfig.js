/**
 * g server 2012 by alexander Kindziora
 * config file
 */
Sequelize = require("sequelize");

module.exports = {
    'db': {
        type     : 'mysql',
        connection: new Sequelize(
            'crowdmodul', //db
            'root', //user
            'root', //pass
            {
                'host' : 'localhost'
            })
    },
    'port' : 8111,
    'auth' : require('../core/auth')
};