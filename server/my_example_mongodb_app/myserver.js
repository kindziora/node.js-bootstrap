/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (self) {
    
    /**
     * constructor to initialize used models and local classes
     */
    function constructor()  {
        
        self.constructor(); //call parent constructor
       
        self.MODEL.job = self.getModel('Job');
        self.MODEL.user = self.getModel('User');
        self.MODEL.session = self.getModel('Session');
        
        return self;
    };
    
    /**
     * magic function that executes every time before a __bind method was called
     * it returns the data that will be passed to __bind[METHODNAME](data)
     */
    self.__before = function (data, type) {
        /**
         * i can manipulate data if i want to
         */
       
        /**
         * @todo add auth mechanism [
         *     get database session by header session data
         * ]
         * 
         */
        
        return {
            'data' : data,
            'success': true
        };
    };
    
    /**
     * magic functions that get executed if triggered on client side
     */
    self.__execute = {
        /**
        * find job by id and return job to client
        */
        getJob : function (data) {
            
            self.MODEL.job.getById(data.job.meinjob.id, function(rows, fields) {
                self.socket.broadcast.emit('getJob', rows);
            });
        },
        /**
         * find user by name and return user to client
         * with own mysql class
         */
        getUser : function (data) {
            console.log( data );
            this.result = function(entry) {
                self.socket.emit('usernotice', {
                    'result' : entry, 
                    'keyword' : data.name
                });
            };
            
            /* execute search on user table*/
            self.MODEL.user.findByName(data.name, this.result);
            
        },
        getClientList : function (data) {
            
            console.log(self.client);
            
            self.socket.broadcast.emit('clientlist', self.client);
            self.socket.emit('clientlist', self.client);
            
        },
        broadcast : function (data) {
            self.socket.broadcast.emit('broadcast', data);
        },
        privateMessage : function(data){
            console.log(self.io.sockets.sockets, data.user);
            
            if(g.isset(self.io.sockets.sockets[data.user])) {
                self.io.sockets.sockets[data.user].emit('result', data.msg);
            }else {
                console.log('message konnte nicht gesendet werden');
            }
        }
    };
    
    return constructor();
};