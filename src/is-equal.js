// based on a solution by Ebrahim Byagowi.  Original code can be found at:
// http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517

define(['get-type'],
function (getType) {
    "use strict";
    function isEqual (thing, otherThing) {
        if (thing instanceof Function) {
            if (otherThing instanceof Function) {
                thing = thing.toString().replace(/\s/gm, '');
                otherThing = otherThing.toString().replace(/\s/gm, '');
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
        if (thing instanceof Date || otherThing instanceof Date
            || !(thing instanceof Object) || !(otherThing instanceof Object)
            || getType(thing) !== getType(otherThing)) {
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
