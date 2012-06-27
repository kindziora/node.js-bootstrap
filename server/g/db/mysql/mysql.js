/**
 * 2012 by alexander kindziora
 */
module.exports = function(config) {
    var self = this;
    self.connection = null;
    self.cfg = config;
    self.result = {};
    
    self.modelCb = require('./model');
    console.log(self.modelCb);
    /**
     * 
     */
    this.constructor = function() {
        self._mysql      = require('mysql');
        self.connection = self._mysql.createConnection(self.cfg.dbconnect);
        self.connection.connect();
    };
    
    /**
     * 
     */
    self.destructor = function (onEnd) {
        if(!g.isset(onEnd)) {
            onEnd = function(){};
        }
        self.connection.end(onEnd);
    };
    
    /**
     *
     * @param err
     * @param rows
     * @param fields
     */
    self.fetchRows = function (err, rows, fields) {
        if (err) throw err;
        if(g.isset(self.cfg.debug)) {
            
            if(!g.isset(self.result[self._query])){
                self.result[self._query] = [];
            }
            self.result[self._query]= rows;
            console.log(self.result);
        }
        
        self.fetchRows.rowCb(rows, fields);
    };
    
    /**
     * eg. squery = 'SELECT * FROM User WHERE 1 LIMIT 10;'
     */
    self.query = function (squery, rowCb) {
        if(g.isFunction(rowCb)) {
            self.fetchRows.rowCb = rowCb;
        } else {
            self.fetchRows.rowCb = function(){};
        }
        self._query = squery;
        self.connection.query(squery, self.fetchRows);
    };
    
    /**
     *
     * @param array $query
     * @return <type>
     */
    self._buildWhereQuery = function (query) {
        var operators = array('<', '>', 'OR', 'AND', 'LIKE', 'NOT LIKE', '!='),
        i = 0,
        keys = g.array_keys(query),
        queryString,
        count = g.count(query);
        
        if (count >= 0) {
            if (!keys[0].indexOf(operators)) {
                queryString = ' WHERE ' + self._mysql.escape(keys[0]) + "='" + self._mysql.escape(query[keys[0]]) + "'";
            } else {
                queryString += ' AND ' + self._mysql.escape(keys[0][0]) + keys[0] + "'" + self._mysql.escape(key[0][1]) + "'";
            }
        } else {
            queryString = ' '; // wenn kein such kriterium/filter
        }
        
        if (count > 1) {
            if (!keys[0].indexOf(operators)) unset(query[keys[0]]);
            var key, val;
            for (key in query) {
                var val = query[key];
                if (!keys[0].indexOf(operators)) {
                    queryString += ' AND ' + self._mysql.escape(key) + '=' + "'" + self._mysql.escape(val) + "'";
                } else {
                    queryString += ' AND ' + self._mysql.escape(val[0]) + key + " '" + self._mysql.escape(val[1]) + "'";
                }
                i++;
            }
        }
        return queryString;
    };
    
    
    
    /**
     * build cleaned query string by [key => value] array
     * @param array $data
     * @param type $injectFunction
     * @return type
     */
    self._querystring = function(data, $injectFunction) {
        var i = 0,
        cdata = g.count(data),
        queryString = '',
        key,
        val,
        comma;
        for (key in data) {
            var val = data[key];
            i++;
            comma = '';
            if (i < cdata)
                comma += ",";
            queryString += $injectFunction(self._mysql.escape(key), self._mysql.escape(val), self._mysql.escape(comma));
        }
        return queryString;
    };
    
    this.constructor();
    return self;
};
 