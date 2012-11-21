/**
 * g server 2012 by alexander Kindziora
 * config file
 */

module.exports = function (self) {
    
    self.name = 'User';
    
    self.fields = {
        'title' : Sequelize.STRING,
        'description' : Sequelize.TEXT
    };
    
    return self.constructor(self);
};