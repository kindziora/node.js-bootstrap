/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var client = function() {
    var self = this;
    self.connect = function() {
        self.socket = io.connect('http://localhost/', {
            'port':8111
        });
    };
    
    ////////////////////////////////////////////////////////////////////////////
    /** EVENTS AND EXTENDABLE METHODS */
    ////////////////////////////////////////////////////////////////////////////
    
    self.bindings = {
        'testevent' : function (socket) {}
    };
    
    /*
     * init sockserver
     */
    self.bindMethods = function() {
        self.socket.on('connect', function () {
            for(var evt in self.bindings) {
                self.socket.on(evt, self.bindings[evt]);
                
            }
        });
        return true;
    };
    self.connect();
    return self;
};

