define(['color-select'],
function(colorSelect) {
	"use strict";
	describe('colorSelect', function () {

		var colorOne, colorTwo;

		beforeEach(function () {
			colorOne = colorSelect();
			colorTwo = colorSelect();
		});

		afterEach(function () {
			colorOne = null;
			colorTwo = null;
		});

		it('should return a css color string', function () {
			expect(typeof colorOne).toEqual("string");
		});

		it('should never return the same color twice in a row', function () {
			expect(colorOne).not.toEqual(colorTwo);
		});

	});

});
