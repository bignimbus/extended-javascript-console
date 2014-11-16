define(['condition'], function(condition) {
	describe('condition', function () {

		it('should return .text and .type', function () {
			var foundType = condition(Math.PI);
			expect(foundType.type).toEqual('number');
			expect(foundType.text).toEqual('3.141592653589793');
		});

		it('should stringify objects, arrays, and null values', function () {
			var obj = condition({"hello":"goodbye"}).text,
				arr = condition([1, 2, 3]).text,
				nl = condition(null).text;
			expect(obj).toEqual('{"hello":"goodbye"}');
			expect(arr).toEqual('[1,2,3]');
			expect(nl).toEqual('null');
		});

		it('should correctly identify numbers', function () {
			expect(condition(4).type).toEqual('number');
			expect(condition(NaN).type).toEqual('number');
			expect(condition("4").type).not.toEqual('number');
		});

		it('should correctly identify booleans', function () {
			expect(condition(false).type).toEqual('boolean');
			expect(condition(true).type).toEqual('boolean');
			expect(condition('true').type).not.toEqual('boolean');
		});

		it('should correctly identify strings', function () {
			expect(condition('Steve Perry').type).toEqual('string');
			expect(condition(['Steve', 123][1]).type).not.toEqual('string');
		});

		it('should be able to identify undefined', function () {
			expect(condition(undefined).type).toEqual('undefined');
			expect(condition('undefined').type).not.toEqual('undefined');
		});

		it('should correctly identify objects', function () {
			expect(condition({"name": "value"}).type).toEqual('object');
		});

		it('should correctly identify arrays', function () {
			expect(condition(["one", "two", 3]).type).toEqual('array');
		});

		it('should be able to identify null', function () {
			expect(condition(null).type).toEqual('null');
			expect(condition(undefined).type).not.toEqual('null');
			expect(condition('null').type).not.toEqual('null');
		});

		it('should differentiate between objects, arrays, and null', function () {
			expect(condition([1, 2, 3]).type).not.toEqual('object');
			expect(condition({"an": "object"}).type).not.toEqual('array');
			expect(condition(null).type).not.toEqual('object');
		});

	});
});
