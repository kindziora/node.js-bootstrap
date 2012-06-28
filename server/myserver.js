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
       
        
        var permission = self.myauth.checkPermission();
        
        if(!permission) {
            /*auth failed*/
            self.socket.emit('error', 'auth failed');
            console.log('auth failed');
            
        }
        console.log(data, type);
        
        return {
            'data' : data,
            'success' : permission
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
         */
        getUser : function (data) {
            this.query = {};
            
            this.query.limit = 10;
            this.query.data = {
                'username' : {
                    'LIKE' : "%" + data.name + "%"
                }
            };
            this.query.fields = ['id','username'];
            
            
            this.result = function(rows, fields) {
                self.socket.emit('usernotice', {
                    'result' : rows, 
                    'keyword' : data.name
                });
            };
            
            /* execute search on user table*/
            self.MODEL.user.get(this.query, this.result);
            
        },
        /**
        * save user and return result to client
        */
        saveUser : function (data) {
            
        /*self.MODEL.user.insert(data.user, function(rows, fields) {
            self.socket.broadcast.emit('response', rows.id);
        });*/
        },
        getClientList : function (data) {
            var clients =  self.io.sockets.clients(),
            client,
            clientlist = [];
            
            for(client in clients) {
                clientlist.push(clients[client].id);
            }
            
            self.socket.broadcast.emit('clientlist', clientlist);
            self.socket.emit('clientlist', clientlist);
        },
        broadcast : function (data) {
            self.socket.broadcast.emit('broadcast', data);
        }
    };
    
    
    return constructor();
};

//app.db.destructor();