define(['condition'], function(condition) {
	"use strict";
	describe('condition', function () {

		var conditioned;

		beforeEach(function () {
			conditioned = condition(Math.PI);
		});

		afterEach(function () {
			conditioned = null;
		});

		it('should return .text and .type', function () {
			expect(conditioned.type).toEqual('number');
			expect(conditioned.text).toEqual('3.141592653589793');
		});

		it('should return both .text and .type as strings', function () {
			expect(typeof conditioned.type).toEqual('string');
			expect(typeof conditioned.text).toEqual('string');
		});

	});
});
