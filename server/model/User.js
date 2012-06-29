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
     * 
     */
    self.findByName = function(name, cb) {
        self.db.findAll({
            limit: 10,
            where : 'username LIKE "%' + name + '%"'
        })
        .success(cb)
        .error(function (er) {
            console.log(er);
        });
    };
    
    return self.constructor();
};