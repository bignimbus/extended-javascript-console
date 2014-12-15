define(['get-type'],
function (getType) {
   'use strict';
    var hasData = false;
    function contains (collection, thing) {
        if (hasData) {
            return true;
        }
        var type = getType(collection),
            keys = type === "object" ? Object.keys(collection) : null,
            len = type === "object" ? Object.keys(collection).length : collection.length,
            n,
            key;
        for (n = 0; n < len; n++) {
            key = keys ? keys[n] : n;
            if (collection[key] === thing) {
                hasData = true;
            }
            if (getType(collection[key]) === 'object' || getType(collection[key]) === 'array') {
                contains(collection[key], thing);
            }
        }
        return hasData;
    }
    return contains;
});
