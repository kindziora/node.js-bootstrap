/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var client_jobstatus = function(self) {
 
    self.bindings.response = function (data) {
        var noty_id = noty({
            'layout': 'bottomRight',
            text: 'Feld Briefing wurde geändert, neuer Wert: ' + data[0].briefing
        });
    };
    
    self.changed = function(job) {
        self.socket.emit('changed', { 'job': job });
    };
    
    self.bindMethods();
    return self;
};