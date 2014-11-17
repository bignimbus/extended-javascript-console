define(['get-type'],
function (getType) {
	"use strict";
	describe('getType', function () {
		beforeEach(function () {

		});
		afterEach(function () {

		});

		it('should stringify objects, arrays, and null values', function () {
			var obj = getType({"hello": "goodbye"}),
				arr = getType([1, 2, 3]),
				nl = getType(null);
			expect(obj).toEqual('object');
			expect(arr).toEqual('array');
			expect(nl).toEqual('null');
		});

		it('should correctly identify numbers', function () {
			expect(getType(4)).toEqual('number');
			expect(getType(NaN)).toEqual('number');
			expect(getType("4")).not.toEqual('number');
		});

		it('should correctly identify booleans', function () {
			expect(getType(false)).toEqual('boolean');
			expect(getType(true)).toEqual('boolean');
			expect(getType('true')).not.toEqual('boolean');
		});

		it('should correctly identify strings', function () {
			expect(getType('Steve Perry')).toEqual('string');
			expect(getType(['Steve', 123][1])).not.toEqual('string');
		});

		it('should be able to identify undefined', function () {
			expect(getType(undefined)).toEqual('undefined');
			expect(getType('undefined')).not.toEqual('undefined');
		});

		it('should correctly identify objects', function () {
			expect(getType({"name": "value"})).toEqual('object');
		});

		it('should correctly identify arrays', function () {
			expect(getType(["one", "two", 3])).toEqual('array');
		});

		it('should be able to identify null', function () {
			expect(getType(null)).toEqual('null');
			expect(getType(undefined)).not.toEqual('null');
			expect(getType('null')).not.toEqual('null');
		});

		it('should differentiate between objects, arrays, and null', function () {
			expect(getType([1, 2, 3])).not.toEqual('object');
			expect(getType({"an": "object"})).not.toEqual('array');
			expect(getType(null)).not.toEqual('object');
		});
	});
});
