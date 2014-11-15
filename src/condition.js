// takes a raw input and determines its
// primitive type.  Outputs all input as a string.
define([], function () {
    "use strict";
    function condition (blob) {
        var type = typeof blob;
        switch (type) {
            case 'number' || 'boolean' || 'function':
                blob = blob.toString();
                break;
            case 'object':
                type = blob instanceof Array ? 'array' : 'object';
                type = blob !== null ? type : 'null';
                blob = JSON.stringify(blob);
                break;
            case 'undefined':
                blob = 'undefined';
                break;
        }
        return {
            "type": type,
            "text": blob
        };
    }
    return condition;
});
