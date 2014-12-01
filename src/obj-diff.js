define(['is-equal'],
function (isEqual) {
    "use strict";
    var called = false;
    function clone (obj) {
        // clone function was originally written by A. Levy
        // and edited by Jeff Auriemma for style and accuracy
        // source:
        // http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
        var copy, attr, i;

        if (obj === null || typeof obj !== "object") {
            return obj;
        }

        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        if (obj instanceof Array) {
            copy = [];
            for (i = 0; i < obj.length; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Object) {
            copy = {};
            for (attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = clone(obj[attr]);
                }
            }
            return copy;
        }

        throw new Error("Unable to provide object diff; infinite recursion detected.");
    }
    function findUniqueData (obj, compare) {
        var unique,
            key,
            currentPath = [];
        if (!called) {
            unique = clone(obj);
            called = true;
        }
        function getPath (blob) {
            for (var i in currentPath) {
                if (!blob[i]) {
                    return false;
                }
                blob = blob[currentPath[i]];
            }
            return blob;
        }
        for (key in Object.keys(obj)) {
            if (obj.hasOwnProperty(key) && isEqual(obj[key], compare[key])) {
                delete getPath(unique);
            } else if (typeof obj[key] === "object"
                    && compare[key]
                    && typeof compare[key] === "object") {
                currentPath.push(key);
                findUniqueData(obj[key], compare[key]);
            }
            currentPath = [];
        }
    }
    function diff (obj, compare) {
        var objDiff = findUniqueData(obj, compare),
            compareDiff = findUniqueData(compare, obj);
        return {
            "firstObjectDiff": objDiff,
            "secondObjectDiff": compareDiff
        };
    }
    return diff;
});
