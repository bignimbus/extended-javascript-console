define(['is-equal', 'get-type'],
function (isEqual, getType) {
	"use strict";
	function Expectation (context, thing, opts) {
		opts = opts || {};
		var not = opts.not || false,
			passed = null;

		function message () {
			var n,
				text = [passed ? "PASSED: " : "FAILED: ",
						"expected ", getType(thing), ' ', thing, ' '];
			for (n = 0; n < arguments.length; n++) {
				text.push(arguments[n]);
			}
			context.out(text.join(''), {
				"color": "#000",
				"background": passed ? 'rgba(44, 226, 44, 0.4)' : 'rgba(226, 44, 44, 0.4)',
				"test": true
			});
		}

		this.toEqual = function (otherThing) {
			var result = isEqual(thing, otherThing);
			passed = not ? !result : result;
			message('to equal ', getType(otherThing), ' ', otherThing);
		};
		this.toBeTruthy = function () {
			passed = not ? !thing : !!thing;
			message('to be truthy');
		};
		this.toBeFalsy = function () {
			passed = not ? !!thing : !thing;
			message('to be falsy');
		};
		this.toBeDefined = function () {
			passed = not ? thing === void 0 : thing !== void 0;
			message('to be defined');
		};
		this.messages = {

		};
		return this;
	}

	return Expectation;
});
