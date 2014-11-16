define([],
function () {
	"use strict";
	function Expectation (thing) {
		this.toEqual = function (otherThing, not) {
			return not ? thing !== otherThing : thing === otherThing;
		};
		this.toBeTruthy = function (not) {
			return not ? !thing : !!thing;
		};
		this.toBeFalsy = function (not) {
			return not ? !!thing : !thing;
		};
		this.not = {
			"toEqual": function (otherThing) {
				return this.toEqual(otherThing, true);
			}.bind(this),
			"toBeTruthy": function () {
				return this.toBeTruthy(true);
			}.bind(this),
			"toBeFalsy": function () {
				return this.toBeFalsy(true);
			}.bind(this)
		};
		return this;
	}
	return Expectation;
});
