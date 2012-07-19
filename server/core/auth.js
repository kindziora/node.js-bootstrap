/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (init) {
    var self = this;
    self.db = init.db;
    
    self.checkPermission = function (data, accept) {
        console.log('checkPermission PERMISSION');
        // check if there's a cookie header
        if (data.headers.cookie) {
            // note that you will need to use the same key to grad the
            // session id, as you specified in the Express setup.
            self.SID = data.headers.cookie.split('=')[1];
            
            self.model = new require('../model/Session')( require('./model')(self.db))
            
            /**
             * entry found
             */
            this.success = function(entry){
                self.entry = entry;
                
                if(!entry) return accept('No valid session id found in database.', false);
                
                if(!g.isset(entry.session_json)){
                    return accept('No session id found in database.', false);
                }
                
                init.session = JSON.parse(g.base64_decode(entry.session_json));
                
                if(!g.isset(init.session.username)){
                    return accept('No valid session id found in database.', false);
                }
                
                if(g.isset(entry.node_id) && entry.node_id > 0){
                    init.session.nodeId = entry.node_id;
                }
                // accept the incoming connection
                
                return accept(null, true);
            };
            
            /**
             * mysql sql error or db error
             */
            this.failed = function(e){
                return accept('error while fetching session against database', false);
            };
            
            self.model.db.find({
                'where' : {
                    'session_id' : self.SID
                }
            })
            .success(this.success)
            .error(this.failed);
            
        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return accept('No cookie transmitted.', false);
        }
       
        return accept(null, true);
    };
    
    /**
     *
     */
    self.connect = function(socket) {
        console.log('connect PERMISSION');
        if(g.isset(self.entry)) {

            self.entry.updateAttributes({
                'node_id' : socket.id
            }).success(function() {
                init.client[init.session.id] = {
                    'username' : init.session.username,
                    'socket' : socket.id
                };
            });
        }
    };
    
    /**
 * disconnect
 */
    self.disconnect = function(socket) {
        console.log('DELETE:' + socket.id);
        init.client[init.session.id] = null;
        delete init.client[init.session.id];
    };
    
    /**
 * 
 */
    self.constructor = function() {
        console.log('constructor PERMISSION');
        init.io.set('authorization', self.checkPermission); 
        return self;
    };
    
    return self.constructor();
};