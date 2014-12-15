define(['get-type'],
function (getType) {
   'use strict';
    function Search (collection, thing) {
        this.contains = false;
        this.searchFor = function (collection, thing) {
            var type = getType(collection),
                keys = type === "object" ? Object.keys(collection) : null,
                len = type === "object" ? Object.keys(collection).length : collection.length,
                n,
                key;
            for (n = 0; n < len; n++) {
                key = keys ? keys[n] : n;
                if (collection[key] === thing) {
                    this.contains = true;
                    break;
                }
                if (getType(collection[key]) === 'object' || getType(collection[key]) === 'array') {
                    this.searchFor(collection[key], thing);
                }
            }
            return false;
        };
        return this;
    }
    return Search;
});
