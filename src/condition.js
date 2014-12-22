// takes a raw input and determines its
// primitive type.  Outputs all input as a string.
define(['get-type'],
function (getType) {
    "use strict";
    function condition (blob) {
        var type = getType(blob),
            truncated,
            limit = 100,
            log;
        switch (type) {
            case 'number':
            case 'boolean':
            case 'function':
                blob = blob.toString();
                break;
            case 'object':
            case 'array':
            case 'null':
                try {
                    blob = JSON.stringify(blob);
                } catch (e) {
                    console.out('*circular data structure detected:', {"color": "red", "test": true});
                    console.log(blob);
                }
                break;
            case 'string':
                blob = '"' + blob + '"';
                break;
            case 'undefined':
                blob = 'undefined';
                break;
        }
        if (blob.length > limit) {
            blob = blob.substring(0, limit) + '...' + (type === 'string' ? '"' : '');
            truncated = true;
        }
        return {
            "type": type,
            "text": blob,
            "truncated": !!truncated
        };
    }
    return condition;
});
