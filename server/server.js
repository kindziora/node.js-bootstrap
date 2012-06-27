/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function () {
     
    var self = new require('./g/main')(
        require('./myconfig')
    ), // public context
    _ = this; // private context
    
    /**
     * private constructor of g server
     */
    _.constructor = function () {
        self.constructor();
        
        console.log(self.db);
        
        _.model = {
            'job' : self.db.call(self.db.modelCb, 'Job'),
            'user' : self.db.call(self.db.modelCb, 'User')
        };
    };
    
    ////////////////////////////////////////////////////////////////////////////
    /** EVENTS AND EXTENDABLE METHODS */
    ////////////////////////////////////////////////////////////////////////////
    self.bindings.changed = function (socket) {
        
        _.model.job.findById(socket.job.meinjob.id, function(rows, fields) {
            self.socket.broadcast.emit('response', rows);
        });
        
    };
    
    _.constructor();
    return self;
}();


//app.db.destructor();