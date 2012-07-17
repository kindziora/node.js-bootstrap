/**
 * g server 2012 by alexander Kindziora
 * config file
 */
module.exports = {
    'db': {
        type     : 'mongodb',
        connection: new Db('test', new Server("127.0.0.1", 27017, {}))
    },
    'port' : 8111,
    'auth' : require('./g/auth')
};


