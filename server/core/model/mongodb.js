/**
 * g server 2012 by alexander Kindziora
 * 
 */

module.exports = function (db) {
    var self = this; // public context


    self.errorHandler = function(data) {
        console.log(data);
    };
    
    /**
     * update entry
     */
    self.update = function(where, data, cb) {
        db.collection(self.name, function(err, collection){
            collection.update(where, data, {
                upsert : false
            }, cb);
            self.errorHandler(err); 
        });
    };
    
    /**
 * insert entry
 */
    self.insert = function(data, cb) {
        db.open(function(err, p_client) {
            db.collection(self.name, function(err, collection){
                collection.insert(data, cb);
            });
        });
    };
    
    /**
 * update or insert depends on id
 */
    self.upsert = function(data, cb, id) {
        id = (g.isset(id) ? id : 'id');
        if(g.isset(data[id])) {
            var q = {
                id : data[id]
            };
        
            self.db.find(q).toArray(function(err, results){
                if(g.count(results) > 0) {
                    self.update(results, data, cb);
                }else{
                    self.insert(data, cb);
                }
            });
        }else {
            self.insert(data, cb);
        }
    };
    
    /**
 * open mongodb connection
 */
    self.constructor = function(me) {
        self.name = me.name;
        db.open(function(err, p_client) {
            self.client = p_client;
            console.log('db connected');
        });

        return self;
    };
    
    /**
     * close mongodb connection
     */
    self.destructor = function() {
        db.close();
    }
    
    return self;
};