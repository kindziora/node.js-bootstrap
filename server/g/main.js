/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (config) {
    var self = this, // public context
    _ = this; // private context
    
    g = new require('./g')(); // global functions singleton
    self.MODEL = {};
    Sequelize = require("sequelize");
 
    /**
     * init database
     */
    self.initDb = function() {
        try{
            self.db = new Sequelize(config.db.database, config.db.user, config.db.password, {
                'host' : config.db.host
            });
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
            self.myauth = new config.auth({
                'server' : self.io,
                'db' : self.db
            });
            
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
        }catch(e) {
            return e;
        }
        return true;
    };
    
    /**
     * @return instance of db model "name"
     */
    self.getModel = function(name) {
        return new require('../model/' + name)( require('./model')(self.db));
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