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
        for(var user in data) {
            if(liste === defaultv)liste = '';
            if(g.isset(lis)){
                liste += '<li>' + (parseInt(user) +1) + '. ' + data[user][field] + '</li>';
            }else {
                liste += data[user][field] + '\n\
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
            self.client = data;
            $('#input03').html(self.makelist(
                data, 'username', 'bitte klicken'
                ));
        },
        broadcast : function(data) {
            self.result(data);
        },
        result : function(data) {
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
    
    self.broadcastMessage = function(e) {
        e.preventDefault();
        self.socket.emit('broadcast', $('#input02').val());
    };
    
    /**
     * 
     */
    self.getNodeId = function(name) {
        for(var client in self.client) {
            if(self.client[client]['username'] == name){
                return self.client[client]['socket'];
            }
        }
    };
    
    /**
     * 
     */
    self.sendUserMessage = function(e) {
        e.preventDefault();
        
        var nodeUser = self.getNodeId($('#input04name').val());
        
        self.socket.emit('privateMessage', {
            'user' : nodeUser, 
            'msg' : $('#input04').val()
            });
    };
    
    self.bindMethods();
    return self;
};