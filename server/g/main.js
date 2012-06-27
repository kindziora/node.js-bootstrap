/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (config) {
    var self = this, // public context
    _ = this; // private context
    
    g = new require('./g')(); // global functions singleton
    
    /**
     * init database
     */
    self.initDb = function() {
        
        self.db = new require('./db/mysql/mysql')(config.db);
        
        return true;
    };
    
    /**
     * 
     */
    self.getModel = function(name) {
         self.db.call(self.db.modelCb, name)
    };
    
    /*
     * init sockserver
     */
    self.initServer = function() {
        var express = require('express');
        self.server = express.createServer();
        self.io = require('socket.io').listen(self.server);
        self.server.use(express.static(__dirname + '/public'));
        self.server.use(express.errorHandler({showStack: true, dumpExceptions: true}));
        self.server.listen(config.port);

        return true;
    };
    
    ////////////////////////////////////////////////////////////////////////////
    /** EVENTS AND EXTENDABLE METHODS */
    ////////////////////////////////////////////////////////////////////////////
    
    self.bindings = {
        'testevent' : function (socket) {}
    };
    
    /*
     * init sockserver
     */
    self.bindMethods = function() {
        self.io.sockets.on('connection', function (socket) {
            self.socket = socket;
            for(var evt in self.bindings) {
                socket.on(evt, self.bindings[evt]);
            }
        });
        return true;
    };
    
    /**
     * init app
     */
    self.constructor = function() {
        var init = [{
            'crowdguru': 'starting g server'
        }];
        init.push({
            'initDB:' : self.initDb()
        });
        init.push({
            'initServer:' : self.initServer()
        });
        init.push({
            'bindMethods' : self.bindMethods()
        });
        console.log(init);
    };
    
    //self.constructor(); ONLY in child class
    return self;
}