/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (db) {
    var self = this; // public context
    
    self.sequelize = db;
    
    self.errorHandler = function(data) {
        console.log(data);
    };
    
    /**
     * update entry
     */
    self.update = function(entry, data, cb) {
        entry
        .updateAttributes(data)
        .success(cb)
        .error(self.errorHandler);
    };
    
    /**
     * insert entry
     */
    self.insert = function(data, cb) {
        self.db
        .create(data)
        .success(cb)
        .error(self.errorHandler);
    };
    
    /**
     * update or insert depends on id
     */
    self.upsert = function(data, cb, id) {
        id = (g.isset(id) ? id : 'id');
        if(g.isset(data[id])) {
            var q = {
                where:{}
            };
        
            q.where[id] = data[id];
        
            self.db.find(q).success(function(entry) {
            
                if(g.count(entry) > 0) {
                    self.update(entry, data, cb);
                }else{
                    self.insert(data, cb);
                }
            }).error(self.errorHandler);
        }else {
            self.insert(data, cb);
        }
    };
    
    /**
    * build sequelize model
    */
    self.constructor = function() {
        
        console.log('model created ' + self.name);
        
        self.db = self.sequelize.define(self.name, self.fields, {
            'classMethods' : self,
            'freezeTableName' : true
        });
        
        return self;
    };
    
    return self;
};