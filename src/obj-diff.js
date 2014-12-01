define(['is-equal', 'get-type'],
function (isEqual, getType) {
    "use strict";
    function diff (obj, compare) {
        if (getType(obj) !== getType(compare)) {
            return false;
        }
        var called = false,
            objDiff,
            compareDiff,
            diffs;

        function trim (arr) {
            for (var n = arr.length - 1; n >= 0; n--) {
                if (arr[n] === void 0) {
                    arr.splice(n, 1);
                }
                if (getType(arr[n]) === "array") {
                    trim(arr[n]);
                }
            }
            return arr;
        }
        function clone (thing) {
            // clone function was originally written by A. Levy
            // and edited by Jeff Auriemma for style and accuracy
            // source:
            // http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
            var copy, attr, i;

            if (thing === null || typeof thing !== "object") {
                return thing;
            }

            if (thing instanceof Date) {
                copy = new Date();
                copy.setTime(thing.getTime());
                return copy;
            }

            if (thing instanceof Array) {
                copy = [];
                for (i = 0; i < thing.length; i++) {
                    copy[i] = clone(thing[i]);
                }
                return copy;
            }

            if (thing instanceof Object) {
                copy = {};
                for (attr in thing) {
                    if (thing.hasOwnProperty(attr)) {
                        copy[attr] = clone(thing[attr]);
                    }
                }
                return copy;
            }

            throw new Error("Unable to provide object diff; infinite recursion detected.");
        }
        function findUniqueData (first, second) {
            var unique,
                len,
                index,
                key,
                keys,
                currentPath = [];
            if (!called) {
                unique = clone(first);
                called = true;
            }
            function getPath (blob) {
                for (var i = 0; i < currentPath.length - 1; i++) {
                    blob = blob[currentPath[i]];
                }
                return blob;
            }
            len = first.length || Object.keys(first).length;
            keys = getType(first) === "object" ? Object.keys(first) : null;
            for (index = 0; index < len; index ++) {
                key = getType(first) === "array" ? index : keys[index];
                currentPath.push(key);
                if (first.hasOwnProperty(key) && isEqual(first[key], second[key])) {
                    delete getPath(unique)[key]; // finds & deletes the corresponding path in the diff object
                } else if (typeof first[key] === "object" // use typeof to include array and object
                        && second[key]) {
                    findUniqueData(first[key], second[key]);
                }
                currentPath = [];
            }
            called = false;
            return unique;
        }
        objDiff = findUniqueData(obj, compare);
        compareDiff = findUniqueData(compare, obj);
        diffs = {
            "firstObjectDiff": getType(objDiff) === "array" ? trim(objDiff) : objDiff,
            "secondObjectDiff": getType(compareDiff) === "array" ? trim(compareDiff) : compareDiff
        };
        return diffs;
    }
    return diff;
});
