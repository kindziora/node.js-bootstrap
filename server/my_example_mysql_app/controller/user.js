/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (self) {
    self.url = 'user';
    self.app = require('../app');
    /** HTTP ENDPOINTS **/
    
    /**
     * methods to be executed 
     */
    self.action = {
        '[post]message' : function(data) { // [post] or [get] will be ignored in route and is a notation for the request type
            
            console.log('message called');
            
            if(g.isset(data) && g.isset(data.req.params.user) && g.isset(data.req.params.msg)) {
                self.app.__execute.privateMessage({
                    'user' : data.req.params.user.id,
                    'msg' : data.req.params.msg
                });
                
            }
            data.res.send('done');
        },
        '[post]message/group' : function(data) { // [post] or [get] will be ignored in route and is a notation for the request type
            /**
             * @todo call group of people
             */
            if(g.isset(data)) {
                data.res.send('user' + data.req.params.id);
            }
          
        }
    };
    
    console.log('CONTROLLER USER INIT');
    return self.constructor();
};