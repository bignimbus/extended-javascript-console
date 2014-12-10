// based on a solution by Ebrahim Byagowi.  Original code can be found at:
// http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517

define(['get-type'],
function (getType) {
    "use strict";
    function isEqual (thing, otherThing) {
        if (thing instanceof Function) {
            if (otherThing instanceof Function) {
                thing = thing.toString();
                otherThing = otherThing.toString();
                thing = thing.replace(/\s/gm, '');
                otherThing = otherThing.replace(/\s/gm, '');
                return thing === otherThing;
            }
            return false;
        }
        if (thing === null || thing === void 0 || otherThing === null || otherThing === void 0) {
            return thing === otherThing;
        }
        if (thing === otherThing || thing.valueOf() === otherThing.valueOf()) {
            return true;
        }

        // if one of them is date, they must had equal valueOf
        if (thing instanceof Date || otherThing instanceof Date) {
            return false;
        }

        // if they are not function or strictly equal, they both need to be Objects
        if (!(thing instanceof Object) || !(otherThing instanceof Object)) {
            return false;
        }

        // arrays and objects can be considered equal in JavaScript.  We don't want that.
        if (getType(thing) !== getType(otherThing)) {
            return false;
        }

        var thingKeys = Object.keys(thing),
            otherKeys = Object.keys(otherThing),
            equal = otherKeys.every(function (key) {
                    return thingKeys.indexOf(key) !== -1;
                })
                && thingKeys.every(function (key) {
                    return isEqual(thing[key], otherThing[key]);
                });
        return equal;
    }
    return isEqual;
});
