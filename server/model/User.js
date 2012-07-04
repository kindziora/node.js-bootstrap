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
    
    /**
     * @todo does not work needs debug
     
    self.findByName = function(name, cb) {
        self.db.findAll({
            limit: 10,
            where : 'username LIKE "%' + name + '%"'
        })
        .success(cb)
        .error(function (er) {
            console.log(er);
        });
    };*/
    
    self.findByName = function(name, cb) {
        self.sequelize.query( "SELECT * FROM `User` WHERE username LIKE '%" + name + "%' LIMIT 10", null, {raw: true}).on('success', cb);
    };
    
    
    return self.constructor(self);
};