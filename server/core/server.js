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
    self.initDb = function(cb) {
    
            self.db = config.db.connection;
            if(g.isset(self.db.open)) {
                self.db.open(function(err, p_client) {
                    self.client = p_client;
                    console.log('db connected');
                    cb(err, p_client);
                });
            }else{
                cb();
            }
           
        
        return true;
    };
    
    /**
     * init authentication
     */
    self.initAuth = function() {
        
        self.myauth = new config.auth(self);
        
        return true;
    };
    
    /*
     * init sockserver
     */
    self.initServer = function() {
        
        var express = require('express');
        self.server = express.createServer();
        
        for(var name in self.controller) {
            self.controller[name] = new self.controller[name](new require('./controller')(self.server));
        }
        
        self.server.use(express.cookieParser());
            
        //self.server.use(express.session({secret: 'secret', key: 'express.sid'}));
            
        self.server.use(function(req, res, next){
            var sess = req.session;
          //  console.log(req);
        });
            
        self.server.use(express.staticCache());
        self.server.use(express.static(__dirname + '/public'));
            
        self.server.use(express.errorHandler({
            showStack: true, 
            dumpExceptions: true
        }));
                
        self.io = require('socket.io').listen(self.server);
        self.server.listen(config.port);
        return true;
    };
    
    self.__execute = { /*'testevent' : function (socket) {}*/ };
    
    /*
     * init sockserver
     */
    self.bindMethods = function() {
        
            
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
                        self.__execute[evt](result.data, sock);
                    }
                };
            };
                
            /* binding all methods */
            for(var evt in self.__execute) {
                socket.on(evt, factory(evt));
            }
             
        });
            
        self.io.sockets.on('disconnect', self.myauth.disconnect);
            
       
        return true;
    };
    
    /**
     * @return instance of db model "name"
     */
    self.getModel = function(name) {
        return new require('../' + self.name + '/model/' + name)( new require('./model/' + config.db.type)(self.db));
    };
    
    /**
     * init app
     */
    self.constructor = function(controller) {
        
        var init = [{
            'crowdguru': 'starting g server'
        }];
        
        self.controller = controller;
        
        init.push({
            'initDB:' : self.initDb(function(err, p_client){
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
            })
        });
        
    };
    
    //self.constructor(); ONLY in child class
    return self;
};