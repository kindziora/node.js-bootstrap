/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var client_jobstatus = function(self) {
    
    self.result = function(msg) {
        noty({
            'layout' : 'bottomRight',
            'text' : msg,
            'timeout': 3000
            
        });
    };
    
    self.makelist = function(data, field, defaultv, lis) {
        var liste = defaultv;
        for(var user in data){
            if(liste === defaultv)liste = '';
            if(g.isset(lis)){
                liste += '<li>' + (parseInt(user) +1) + '. ' + data[user][field] + '</li>';
            }else {
                liste +=  (parseInt(user) +1) + '. ' + data[user][field] + '\n\
';
            }
        }
        return  liste ;
    };
    
    
    self.__callback = {
        usernotice : function (data) {
            var list = self.makelist(data.result, 'username', 'kein user gefunden', true);
            
            list = list.replace(new RegExp(data.keyword, 'gi'), '<b>' + data.keyword + '</b>');
            
            self.result('<ul>' + list +  '</ul>');
        },
        clientlist : function(data) {
 
            var list = data.join('\n\
');
            $('#input03').html(list);
        },
        broadcast : function(data) {
            self.result(data);
        }
    };
    
    /**
     * find user by username
     */
    self.findUser = function(e) {
        e.preventDefault();
        self.socket.emit('getUser', {
            'name': $('#input01').val()
        });
    };
    
    self.findActiveUser = function() {
        self.socket.emit('getClientList', {});
    };
    
    self.broadcastMessage = function(e) {
        e.preventDefault();
        self.socket.emit('broadcast', $('#input02').val());
    };
    
    
    
    self.bindMethods();
    return self;
};