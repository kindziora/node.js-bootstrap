/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (init) {
    var self = this;
    self.db = init.db;
    
    self.checkPermission = function (data, accept) {
        // check if there's a cookie header
        if (data.headers.cookie) {
            var parseCookie = require('connect').utils.parseJSONCookie;
               
            // if there is, parse the cookie
            data.cookie = parseCookie(data.headers.cookie);
            // note that you will need to use the same key to grad the
            // session id, as you specified in the Express setup.
            self.SID = data.headers.cookie.split('=')[1];
                
           var model = new require('../model/Session')( require('./model')(self.db))
                
            model.db.find({
                'where' : {
                    'session_id' : self.SID + 'sd'
                }
            }).success(function(entry){
                if(!g.isset(entry))return accept('No session id found in database.', false);
            })
            .error(function(e){
                return accept('error while fetching seesion against database', false);
            });
                
        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return accept('No cookie transmitted.', false);
        }
        // accept the incoming connection
        accept(null, true);
    };
  
    
    self.constructor = function(model) {
 
        init.server.set('authorization', self.checkPermission); 
        return self;
    };
   
    
    return self.constructor(init.model);
};