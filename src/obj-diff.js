define(['is-equal', 'get-type', 'condition'],
function (isEqual, getType, condition) {
    "use strict";
    function diff (obj, compare) {

        if (getType(obj) !== getType(compare)) {
            return false;
        }

        var firstObjectDiff,
            secondObjectDiff,
            currentPath = [],
            uniqueData = '';

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

        function getData (obj, path) {
            var copy = clone(obj);
            return copy[path];
        }

        function findUniqueData (first, second) {
            var len,
                index,
                key,
                keys,
                type = getType(first);

            len = type === "object" ? Object.keys(first).length : first.length;
            keys = type === "object" ? Object.keys(first) : null;
            for (index = 0; index < len; index ++) {
                key = type === "array" ? index : keys[index];
                currentPath.push(key);
                if (first.hasOwnProperty(key) && !isEqual(first[key], second[key])) {
                    if (getType(first[key]) !== getType(second[key])
                    || getType(first[key]) !== "object" && getType(first[key]) !== "array") {
                        uniqueData += '\n' + currentPath.join('.')
                            + ' : ' + condition(getData(first, currentPath.pop())).text;
                    } else {
                        findUniqueData(first[key], second[key]);
                    }
                }
                currentPath = currentPath.slice(0, -1);
            }
            return uniqueData;
        }

        firstObjectDiff = findUniqueData(obj, compare);
        currentPath = [];
        uniqueData = '';
        secondObjectDiff = findUniqueData(compare, obj);

        return {
            "firstObjectDiff": firstObjectDiff,
            "secondObjectDiff": secondObjectDiff
        };

    }
    return diff;
});
