define(['is-equal'],
function (isEqual) {
	"use strict";

	describe("isEqual", function () {

		var obj = {
				"this": "is",
				"an": "object"
			},
			arr = ["arrays", "look", "like", "this"],
			fn = function () {
				return "function";
			};

		beforeEach(function () {

		});

		afterEach(function () {

		});

		it('should return true when given two identical strings', function () {
			var str = 'string';
			expect(isEqual(str, 'string')).toEqual(true);
			expect(isEqual(str, 'String'.toLowerCase())).toEqual(true);
			expect(isEqual(str, 'String')).toEqual(false);
		});

		it('should return true when given two identical numbers', function () {
			var num = 5;
			expect(isEqual(num, 2 + 3)).toEqual(true);
			expect(isEqual(num, "5")).toEqual(false);
		});

		it('should return true when given two identical arrays', function () {
			expect(isEqual(arr, ["arrays", "look", "like", "this"])).toEqual(true);
			expect(isEqual(arr, ["arrays", "look", ["like", "this"]])).toEqual(false);
		});

		it('should return true when given two identical objects', function () {
			expect(isEqual(obj, {
				"this": "is",
				"an": "object"
			})).toEqual(true);
			expect(isEqual(obj, {
				"this": "is",
				"an": {
					"different": "object"
				}
			})).toEqual(false);
		});

		it('should return true when given two identical functions', function () {
			expect(isEqual(fn, function () {return "function";})).toEqual(true);
		});

		it('should return true when given two identical falsy values', function () {
			expect(isEqual(false, false)).toEqual(true);
			expect(isEqual(null, null)).toEqual(true);
			expect(isEqual(undefined, undefined)).toEqual(true);
			expect(isEqual(undefined, void 0)).toEqual(true);
			expect(isEqual(undefined, null)).toEqual(false);
			expect(isEqual(false, 0)).toEqual(false);
		});

		it('should return false when given two different data types', function () {
			expect(isEqual(5, '5')).toEqual(false);
			expect(isEqual([1, 2], {1: 1, 2: 2})).toEqual(false);
		});

	});

});
