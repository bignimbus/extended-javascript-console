define(['get-type'],
function (getType) {
   'use strict';
    function Search (collection) {
        this.contains = false;
        this.thisFor = function (thing, blob) {
            blob = blob || collection;
            var type = getType(blob),
                keys = type === "object" ? Object.keys(blob) : null,
                len = type === "object" ? Object.keys(blob).length : blob.length,
                n,
                key;
            for (n = 0; n < len; n++) {
                key = keys ? keys[n] : n;
                if (blob[key] === thing) {
                    this.contains = true;
                    break;
                }
                if (getType(blob[key]) === 'object' || getType(blob[key]) === 'array') {
                    this.thisFor(thing, blob[key]);
                }
            }
            return this.contains;
        };
        return this;
    }
    return Search;
});
