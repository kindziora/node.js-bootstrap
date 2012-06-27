/**
 * 2012 by alexander kindziora
 */
module.exports = function(table) {
    var self = this;
    self.model = table;
    
    /**
     * nimmt nur daten eines arrays wenn die db die felder auch besitzt
     * die Felder die nicht dem db schema entsprechen werden ignoriert
     * @param <type> $data
     * @return <type>
     */
    self.cleanData = function (data, cb) {
        self.query("DESCRIBE `" + self.model + "`", function(row, fields) {
            cb( g.array_intersect_key(data, fields) );
        });
    };
    
    self.getInsertId = function(cb) {
        self.query("SELECT id FROM `" + self.model + "` ORDER BY id DESC LIMIT 1;", cb);
    };
    
    /**
     * 
     */
    self.get = function (where, fields, cb) {
        var wq = '';
        if (fields[0] === '*') {
            if (!empty(self.fields))
                fields = self.fields;
        }

        if (!empty(where))
            wq = self._buildWhereQuery(where);
        
        self.query("SELECT " + ltrim(fields.join(','), ',') + " FROM `" + self.model + '` ' + wq, cb);
       
    };
    
    self.getbyId = function (id, cb) {
        self.query("SELECT * FROM `" + self.model + "` WHERE id= " + parseInt(id), cb);
    };
    
    
    self.insert = function (dirtyData, cb) {
        self.cleanData(dirtyData, function(data) {
            data.created = new Date('Y-m-d H:i:s');

            var queryString = self._querystring(data, function(key, value, comma) {
                return ' `' + key + '` ' + comma;
            });
        
            var valueString = self._querystring(data, function(key, value, comma) {
                return "'" . value + "'" + comma;
            });
            
            self.query("INSERT INTO `" + self.model + "` (" + queryString + ") VALUES (" + valueString + ")", function() {
                self.getInsertId(cb);
            });
        } );
    };
    
    self.update = function (data, where, cb) {
        data.updated = new Date('Y-m-d H:i:s');
        var queryString = self._querystring(data, function(key, value, comma) {
            return ' `' + key + '` =' + "'value'" + comma;
        });
        
        self.query("UPDATE `" + self.model + "` SET " + queryString + self._buildWhereQuery(where), function(data) {
            if (g.isset(data.id)) {
                cb(data.id);
            } else {
                self.get(where, ['id'], cb);
            }
        });
    };
    
    self.remove = function (where, cb) {
        self.query("DELETE FROM `" + self.model + "` " + self._buildWhereQuery(where), cb);
    };
    
    self.count = function (where, cb) {
        self.query("SELECT COUNT(*) as num FROM `" + self.model + '` ' + self._buildWhereQuery(where), function(cnt) {
            cb(cnt.num);
        });
    };
    
    return self;
};