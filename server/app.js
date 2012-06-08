/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.explore = function (parent) {
    var self = parent, // public context
    _ = this; // private context
    
    ////////////////////////////////////////////////////////////////////////////
    /** EVENTS AND EXTENDABLE METHODS */
    ////////////////////////////////////////////////////////////////////////////
    self.bindings.changed = function (socket) {
        self.db.query('SELECT * FROM Job WHERE id =' + socket.job.meinjob.id + ';', function (rows, fields) {
            self.socket.broadcast.emit('response', rows);
           // self.socket.emit('response', rows);
        });
    };
   
    self.constructor();
    return self;
};

var app = new module.explore( new require('./g/main')({
    'db': {
        'dbconnect': {
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'crowdmodul'
        },
        'debug' : true
    },
    'port' : 8111
}));

//app.db.destructor();