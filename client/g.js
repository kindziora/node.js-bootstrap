/**
 * global functions
 */
g = function () {
    var me = this;
    me.cbs = {};
    
    var _ = this;
    
    me.isset = function(variable) {
        return (typeof variable !== 'undefined');
    };

    me.make = function(parent) {
        return (me.isset(parent)) ? parent : this;
    };

    me.isFunction = function (cb, run) {
        var isfunction = (me.isset(cb) && typeof cb === 'function');
        if (me.isset(run) && isfunction) {
            cb(this);
        }
        return isfunction;
    };

    me.ready = function (module, mycb) {
        if (!me.isset(me.cbs[module])) {
            me.cbs[module] = [mycb];
        }else{
            me.cbs[module].push(mycb);
        }
    };

    me.executeReady = function (module) {
        if(me.isset(me.cbs[module])) {
            for (var i = 0, l = me.cbs[module].length;i < l;i++) {
                me.cbs[module][i]();
            }
        }
    };
    
    me.array_keys = function(input) {
        var key, result = [];
        for (key in input) {
            if (input.hasOwnProperty(key)) {
                result.push(key);
            }
        }  
        return result;
    };
    
    me.is_array = function (input) {
        return typeof(input) === 'object' && (input instanceof Array);
    };
    
    me.array_intersect_key = function (arr1) {
        var retArr = {},
        argl = arguments.length,
        arglm1 = argl - 1,
        k1 = '',
        arr = {},
        i = 0,
        k = '';
            arr1keys: for (k1 in arr1) {
                arrs: for (i = 1; i < argl; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (k === k1) {
                            if (i === arglm1) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
 
        return retArr;
    };
    
    me.count = function(data) {
        if(me.isset(data)) {
             return Object.keys(data).length;
        }else {
            return 0;
        }
    };
    
    me.trim = function (stringToTrim) {
        return stringToTrim.replace(/^\,s+|\s+$/g, "");
    };
    
    me.ltrim = function (stringToTrim) {
        return stringToTrim.replace(/^\,s+/, "");
    };
    
    me.rtrim = function (stringToTrim) {
        return stringToTrim.replace(/\,s+$/, "");
    };
    
    return me;

}();
 
