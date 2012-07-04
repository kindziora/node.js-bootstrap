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
    
    self.setNodeId = function(node, sid, cb) {
        /**
         * @todo remove after updateRecords work 
         */
        self.sequelize.query( "UPDATE `session` SET `node_id`=" + node + " WHERE session_id='" + sid +"'").on('success', cb)
    }
    
    return self.constructor(self);
};