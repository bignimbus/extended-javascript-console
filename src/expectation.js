define(['is-equal', 'get-type', 'condition'],
function (isEqual, getType, condition) {
    "use strict";
    function Expectation (context, thing, opts) {
        opts = opts || {};
        var not = opts.not || false,
            passed = null,
            message = function () {
                var n,
                    text = [passed ? "PASSED: " : "FAILED: ",
                            "expected ", getType(thing), ' ', condition(thing).text, ' '];
                for (n = 0; n < arguments.length; n++) {
                    text.push(arguments[n]);
                }
                return context.out(text.join(''), {
                    "color": "#000",
                    "background": passed ? 'rgba(44, 226, 44, 0.4)' : 'rgba(226, 44, 44, 0.4)',
                    "test": true
                });
            };

        this.toEqual = function (otherThing) {
            var result = isEqual(thing, otherThing);
            passed = not ? !result : result;
            message(not ? 'not ' : '', 'to equal ', getType(otherThing), ' ', condition(otherThing).text);
            if (getType(thing) === getType(otherThing)
                && typeof thing === "object"
                && !passed) {
                context.diff(thing, otherThing);
            }
        };
        this.toBeCloseTo = function (num, margin) {
            passed = thing < num + margin || thing > num - margin;
            passed = not ? !passed : passed;
            message(not ? 'not ' : '', 'to be close to ', num, ' by a margin of ', margin);
        };
        this.toBeTruthy = function () {
            passed = not ? !thing : !!thing;
            message(not ? 'not ' : '', 'to be truthy');
        };
        this.toBeDefined = function () {
            passed = not ? thing === void 0 : thing !== void 0;
            message(not ? 'not ' : '', 'to be defined');
        };
        this.toBeNull = function () {
            passed = not ? thing !== null : thing === null;
            message(not ? 'not ' : '', 'to be null');
        };

        return this;
    }

    return Expectation;
});
