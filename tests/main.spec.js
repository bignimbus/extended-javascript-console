define(['main'],
function () {
	"use strict";
	describe('Xcon', function () {

		it('should add .expect, .out and .run methods to console', function () {
			var itWorked = !!window.console.expect
				&& !!window.console.run
				&& !!window.console.out;
			expect(itWorked).toEqual(true);
		});

	});

	describe('console.out()', function () {

		it('should log the type and output of a given JS statement in the browser console (open console to check output).', 
		function () {
			console.out(2);
			console.out('two');
			console.out([1, 1]);
			console.out({"one":"one"});
			console.out(NaN);
			console.out(undefined);
			console.out(null);
			console.out(true);
			expect(console.out('placeholder')).not.toBeDefined();
		});

		it('should log using the user-specified color given any valid css declaration (open console to check output)',
		function () {
			console.out("hex 3-digit: this should be invisible", {"color":"#fff"});
			console.out("color string: this should be blue", {"color":"blue"});
			console.out("hex 6-digit: this should be orange", {"color":"#ff9900"});
			console.out("rgb: this should be pink", {"color":"rgb(255,20,147)"});
			console.out("rgba: this should be really light pink", {"color":"rgba(255,20,147,0.2)"});
			console.out("hsl: this should be green", {"color":"hsl(120, 96%, 34%)"});
			console.out("hsla: this should be really light green", {"color":"hsla(120, 96%, 34%, 0.2)"});
			expect(console.out('placeholder')).not.toBeDefined();
		});

		it('should log function name, function arguments, and error status if given those parameters (open console to check output)',
		function () {
			console.out('error message', {
	            "color": 'red',
	            "fnName": 'someFunction',
	            "fnArgs": '1, 2, 3',
	            "error": true
	        });
	        console.out('success message', {
	            "color": 'darkgreen',
	            "fnName": 'anotherFunction',
	            "fnArgs": '1, 2, 3'
	        });
	        expect(console.out('error message')).not.toBeDefined();
		});

	});

	describe('console.run()', function () {

		var ex;

		beforeEach(function () {
			ex = {
				"example": function (one, two, three) {
					return one + two + three;
				},
				"notAFunction": {
					"not": "function"
				},
				"fakeConstructor": function () {
					this.something = "something";
					return this;
				}
			};
		});

		afterEach(function () {
			ex = null;
		});

		it('should run the given function', function () {
			spyOn(ex, 'example');
			console.run(ex.example);
			expect(ex.example).toHaveBeenCalled();
		});

		it('should call console.out() to print function output', function () {
			spyOn(console, 'out');
			console.run(ex.example);
			expect(console.out).toHaveBeenCalled();
		});

		it('should return the value of a non-function input', function () {
			var a = console.run('a');
			expect(a).toEqual('a');
		});

		it('should call console.out() for non-functions as well', function () {
			spyOn(console, 'out');
			console.run(ex.notAFunction);
			expect(console.out).toHaveBeenCalled();
		});

		it('should accept function arguments and run the function with those arguments', function () {
			expect(console.run(ex.example, [1, 1, 1])).toEqual(3);
		});

		it('should accept a context as the third argument and run the function with that context', function () {
			var fakeObj = {};
			fakeObj = console.run(ex.fakeConstructor, [], fakeObj);
			expect(fakeObj.something).toEqual("something");
		});

	});

	describe('console.expect', function () {

		var a = "a",
			b = "b",
			pass = "PASSED: expected string a to equal string a",
			fail = "FAILED: expected string a to equal string b",
			notfail = "PASSED: expected string a not to equal string b",
			pOpts = {
				"color": "#000",
				"background": 'rgba(44, 226, 44, 0.4)',
				"test": true
			},
			fOpts = {
				"color": "#000",
				"background": 'rgba(226, 44, 44, 0.4)',
				"test": true
			};
		it('should console.out a PASSED message for true expectations', function () {
			spyOn(window.console, "out");
			window.console.expect(a).toEqual(a);
			expect(window.console.out).toHaveBeenCalledWith(pass, pOpts);
		});

		it('should console.out a FAILED message for false expectation', function () {
			spyOn(window.console, "out");
			window.console.expect(a).toEqual(b);
			expect(window.console.out).toHaveBeenCalledWith(fail, fOpts);
		});

		it('should return the opposite boolean if the .not modifier is used', function () {
			spyOn(window.console, "out");
			window.console.expect(a).not.toEqual(b);
			expect(window.console.out).toHaveBeenCalledWith(notfail, pOpts);
		});
	});
});
