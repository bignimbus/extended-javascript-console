define(['is-equal'],
function (isEqual) {
	"use strict";
	function Expectation (thing, opts) {
		opts = opts || {};
		var not = opts.not || false;
		// TODO create some way to memoize test data
		// so that we can return messages instead of
		// booleans
		this.message = "";
		this.toEqual = function (otherThing) {
			var result = isEqual(thing, otherThing);
			result = not ? !result : result;
			return result;
		};
		this.toBeTruthy = function () {
			var result = not ? !thing : !!thing;
			return result;
		};
		this.toBeFalsy = function () {
			var result = not ? !!thing : !thing;
			return result;
		};
		this.toBeDefined = function () {
			var result = not ? thing === void 0 : thing !== void 0;
			return result;
		};
		return this;
	}
	return Expectation;
});
