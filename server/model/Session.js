/**
 * g server 2012 by alexander Kindziora
 * config file
 */

module.exports = function (self) {
    
    self.name = 'session';
    
    self.fields = {
        'session_id' : Sequelize.STRING,
        'session_value ' : Sequelize.STRING
    };
    
    return self.constructor();
};