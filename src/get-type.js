define([], function () {
    "use strict";
    function getType (blob) {
        var type = typeof blob;
        if (blob === void 0) {
            type = "undefined";
        }
        if (type === "object") {
            type = blob instanceof Array ? 'array' : 'object';
            type = blob !== null ? type : 'null';
        }
        return type;
    }
    return getType;
});
