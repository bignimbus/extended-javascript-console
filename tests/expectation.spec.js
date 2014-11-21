define(['expectation'],
function (Expectation) {
	"use strict";

	describe('Expectation', function () {

		it('should namespace test methods to the context', function () {
			var x = new Expectation(window.console, 'hello');
			expect(x.toEqual).toBeDefined();
			expect(x.toBeTruthy).toBeDefined();
			expect(x.toBeFalsy).toBeDefined();
			expect(x.toBeDefined).toBeDefined();
		});

		it('should call console.out when a test is performed', function () {
			var x = new Expectation(window.console, 'hello');
			window.console.out = window.console.out || function () {return false;};
			spyOn(window.console, 'out');
			x.toEqual('hello');
			expect(window.console.out).toHaveBeenCalledWith(
				"PASSED: expected string \"hello\" to equal string \"hello\"", {
				"color": "#000",
				"background": 'rgba(44, 226, 44, 0.4)',
				"test": true
			});
		});

	});

});
