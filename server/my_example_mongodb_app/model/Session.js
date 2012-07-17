/**
 * g server 2012 by alexander Kindziora
 * config file
 */

module.exports = function (self) {
    
    self.name = 'session';
    
    self.fields = {
        'session_id' : Sequelize.STRING,
        'session_value' : Sequelize.STRING,
        'session_json' : Sequelize.STRING,
        'node_id' : Sequelize.INTEGER,
        'session_time' : Sequelize.INTEGER
    };

    return self.constructor(self);
};