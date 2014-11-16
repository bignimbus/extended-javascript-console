define([],
function () {
	"use strict";
	function Expectation (thing) {
		this.toEqual = function (otherThing) {
			if (thing === otherThing) {
				return true;
			}
			return false;
		};
		return this;
	}
	return Expectation;
});
