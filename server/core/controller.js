/**
 * g server 2012 by alexander Kindziora
 * 
 */
module.exports = function (parent) {
    var self = this;
    
    /** HTTP ENDPOINT **/
    self.constructor = function() {
        /**
        * execute pre and call binding
        */
            
        if(!g.isFunction(self.__before)) {
            self.__before = function(data, evt) {
                return {
                    'data' : data, 
                    'success' : true
                };
            };
        }
            
        /* variable injection via lambda function factory used in iteration */
        var factory = function(evt) {
            return function(req, res) {
                var result = self.__before({
                    'req' : req, 
                    'res' : res
                }, evt);
                
                if(result.success) {
                    self.action[evt](result.data);
                }
            };
        };
        
        /* binding all methods */
        for(var evt in self.action) {
            var method = (evt.indexOf('[post]') > 0) ? 'post' : 'get',
            action = evt.replace(/\[[a-z]*\]/i,'');
            console.log('route registered /' + self.url + '/' + action, '.' + method + '.');
                
            parent[method]('/' + self.url + '/' + action, factory(evt));
        }
        
       return self;
    };
    
    return self;
};