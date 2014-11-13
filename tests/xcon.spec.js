describe('Xcon', function () {

	"use strict";

	it('should namespace .out and .run methods to console or fall back to xcon', function () {
		var itWorked = (!!window.console.run && !!window.console.out) ||
						(!!window.xcon.run && !!window.xcon.out);
		expect(itWorked).toEqual(true);
	});

});

describe('condition()', function () {

	"use strict";

	// keep this up-to-date with function in source code
	function condition (text) {
        var type = typeof text;
        switch (type) {
            case 'number' || 'boolean' || 'function':
                text = text.toString();
                break;
            case 'object':
                type = text instanceof Array ? 'array' : 'object';
                type = text !== null ? type : 'null';
                text = JSON.stringify(text);
                break;
            case 'undefined':
                text = 'undefined';
                break;
        }
        type = type;
        return {
            "type": type,
            "text": text
        };
    }

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

describe('console.out()', function () {

	"use strict";

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

	"use strict";

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