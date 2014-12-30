define(['is-equal', 'get-type', 'condition', 'search'],
function (isEqual, getType, condition, search) {
    "use strict";

    var Expectation,
        passBgColor = 'rgba(44, 226, 44, 0.4)',
        failBgColor = 'rgba(226, 44, 44, 0.4)';

    Expectation = function (context, thing, opts) {
        opts = opts || {};
        this.opposite = !!opts.not;

        this.thing = thing;
        this.context = context;
    };

    Expectation.prototype.thing = null;
    Expectation.prototype.context = null;
    Expectation.prototype.passed = false;
    Expectation.prototype.opposite = false;

    Expectation.prototype.message = function () {
        var text = [
            this.passed ? "PASSED:" : "FAILED:",
            "expected",
            getType(this.thing),
            condition(this.thing).text
        ];

        if (this.opposite) {
            text.push('not');
        }

        text = text.concat(Array.prototype.slice.call(arguments));

        this.context.out(text.join(' '), {
            "color": "#000",
            "background": this.passed ? passBgColor : failBgColor,
            "test": true
        });
    };

    Expectation.prototype.setResult = function (result) {
        result = this.opposite ^ result;
        this.passed = !!result; // convert to boolean
    };

    Expectation.prototype.toEqual = function (otherThing) {
        var result = isEqual(this.thing, otherThing);
        this.setResult(result);
        this.message('to equal', getType(otherThing), condition(otherThing).text);
        if (getType(this.thing) === getType(otherThing)
            && typeof this.thing === "object"
            && !this.passed) {
            this.context.diff(this.thing, otherThing);
        }
    };

    Expectation.prototype.toContain = function (otherThing) {
        var result = search(this.thing, otherThing);
        this.setResult(result);
        this.message('to contain', getType(otherThing), condition(otherThing).text);
    };

    Expectation.prototype.toBeCloseTo = function (num, margin) {
        var result = this.thing < num + margin || this.thing > num - margin;
        this.setResult(result);
        this.message('to be close to', num, 'by a margin of', margin);
    };

    Expectation.prototype.toBeTruthy = function () {
        this.setResult(!!this.thing);
        this.message('to be truthy');
    };

    Expectation.prototype.toBeDefined = function () {
        var result = this.thing !== void 0;
        this.setResult(result);
        this.message('to be defined');
    };

    Expectation.prototype.toBeNull = function () {
        var result = this.thing === null;
        this.setResult(result);
        this.message('to be null');
    };

    return Expectation;
});
