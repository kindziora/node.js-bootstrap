/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (config) {
    var self = this, // public context
    _ = this; // private context
    
    g = new require('./g')(); // global functions singleton
    self.MODEL = {};
    
    /**
     * init database
     */
    self.initDb = function() {
        try{
            self.db = new config.db.model(config.db);
        }catch(e) {
            return e;
        }
        return true;
    };
    
    /**
     * init authentication
     */
    self.initAuth = function() {
        try{
            self.myauth = new config.auth({});
            
        }catch(e) {
            return e;
        }
        return true;
    };
    
    /*
     * init sockserver
     */
    self.initServer = function() {
        try{
            var express = require('express');
            self.server = express.createServer();
            self.io = require('socket.io').listen(self.server);
            self.server.use(express.static(__dirname + '/public'));
            self.server.use(express.errorHandler({
                showStack: true, 
                dumpExceptions: true
            }));
            self.server.listen(config.port);
        }catch(e) {
            return e;
        }
        return true;
    };
    

    /**
     * @return instance of db model "name"
     */
    self.getModel = function(name) {
        return self.db.modelCb.call(self.db, name);
    };
    
    self.__execute = { /*'testevent' : function (socket) {}*/ };
    
    /*
     * init sockserver
     */
    self.bindMethods = function() {
        try{
            /**
            * execute pre and call binding
            */
            this.bindCallback = function (socket) {
                self.socket = socket;
                for(var evt in self.__execute) {
                    socket.on(evt, function(sock) {
                    
                        if(!g.isFunction(self.__before)) {
                            self.__before = function(psock, evt) {
                                return {
                                    'data' : psock, 
                                    'success' : true
                                };
                            };
                        }
                    
                        var result = self.__before(sock, evt);
                    
                        if(result.success) {
                            self.__execute[evt](result.data);
                        }
                    
                    });
                }
            };
        
            self.io.sockets.on('connection', this.bindCallback);
        }catch(e) {
            return e;
        }
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
        
        init.push({
            'initDB:' : self.initAuth()
        });
        console.log(init);
    };
   
    //self.constructor(); ONLY in child class
    return self;
};