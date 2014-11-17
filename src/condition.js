// takes a raw input and determines its
// primitive type.  Outputs all input as a string.
define(['get-type'],
function (getType) {
    "use strict";
    function condition (blob) {
        var type = getType(blob);
        switch (type) {
            case 'number' || 'boolean' || 'function':
                blob = blob.toString();
                break;
            case 'object' || 'array' || 'null':
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
