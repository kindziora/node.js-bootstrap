/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (config) {
    var self = this, // public context
    _ = this; // private context
    
    g = new require('./g')(); // global functions singleton
    self.MODEL = {};
    self.session = {};
    self.client = {};
    
    /**
     * init database
     */
    self.initDb = function() {
        try{
            self.db = config.db.connection;
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
            self.myauth = new config.auth(self);
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
            self.server.use(express.cookieParser());
            
            //self.server.use(express.session({secret: 'secret', key: 'express.sid'}));
            
            self.server.use(function(req, res, next){
                var sess = req.session;
                console.log(req, sess);
            });
            
            self.server.use(express.staticCache());
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
    
    self.__execute = { /*'testevent' : function (socket) {}*/ };
    
    /*
     * init sockserver
     */
    self.bindMethods = function() {
        try {
            
            /**
             * execute pre and call binding
             */
            self.io.sockets.on('connection', function (socket) {
                self.socket = socket;
                
                self.myauth.connect(self.socket);

                if(!g.isFunction(self.__before)) {
                    self.__before = function(psock, evt) {
                        return {
                            'data' : psock, 
                            'success' : true
                        };
                    };
                }
                
                /* variable injection via lambda function factory used in iteration */
                var factory = function(evt) {
                    return function(sock) {
                        console.log(sock.id);
                        var result = self.__before(sock, evt);
                        if(result.success) {
                            self.__execute[evt](result.data);
                        }
                    };
                };
                
                /* binding all methods */
                for(var evt in self.__execute) {
                    socket.on(evt, factory(evt));
                }
             
            });
            
            self.io.sockets.on('disconnect', self.myauth.disconnect);
            
        }catch(e) {
            return e;
        }
        return true;
    };
    
    /**
     * @return instance of db model "name"
     */
    self.getModel = function(name) {
        return new require('../' + self.name + '/model/' + name)( require('./model/' + config.db.type)(self.db));
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
            'initAuth:' : self.initAuth()
        });
        
        init.push({
            'bindMethods' : self.bindMethods()
        });
        
        console.log(init);
    };
    
    //self.constructor(); ONLY in child class
    return self;
};