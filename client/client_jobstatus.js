/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var client_jobstatus = function(self) {
    
    self.__callback = {
        'getJob' : function (data) {
            noty({
                'layout' : 'bottomRight',
                'text' : 'Feld Briefing wurde geändert, neuer Wert: ' + data[0].briefing
            });
        }
    };
    
    /**
     * 
     */
    self.changeit = function(job) {
        
        self.socket.emit('getUser', {
            'job': job
        });
        
    };
    
    
    
    self.bindMethods();
    return self;
};