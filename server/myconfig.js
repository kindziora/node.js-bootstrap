/**
 * g server 2012 by alexander Kindziora
 * config file
 */
module.exports = {
    'db': {
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'crowdmodul'
    },
    'port' : 8111,
    'auth' : require('./g/auth')
};