/**
 * g server 2012 by alexander Kindziora
 * config file
 */
module.exports = {
    'db': {
        'model' : require('./g/db/mysql/run'),
        'dbconnect': {
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'crowdmodul'
        },
        'debug' : true
    },
    'port' : 8111,
    'auth' : require('./g/auth')
};