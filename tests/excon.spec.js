describe('console', function () {
	it('should exist', function () {
		expect(window.console).toBeDefined();
	});

	it('should have method .out()', function () {
		expect(window.console.out).toBeDefined();
	});

	it('should have method .run()', function () {
		expect(window.console.run).toBeDefined();
	});

	it('should have method .findType()', function () {
		expect(window.console.findType).toBeDefined();
	});
});

describe('console.findType()', function () {
	it('should return .text and .type', function () {
		var foundType = console.findType(Math.PI);
		expect(foundType.type).toEqual('number:');
		expect(foundType.text).toEqual(3.141592653589793);
	});

	it('should stringify objects, arrays, and null values', function () {
		var obj = console.findType({"hello":"goodbye"}).text,
			arr = console.findType([1, 2, 3]).text,
			nl = console.findType(null).text;
		expect(obj).toEqual('{"hello":"goodbye"}');
		expect(arr).toEqual('[1,2,3]');
		expect(nl).toEqual('null');
	});

	it('should correctly identify numbers', function () {
		expect(console.findType(4).type).toEqual('number:');
		expect(console.findType(NaN).type).toEqual('number:');
		expect(console.findType("4").type).not.toEqual('number:');
	});

	it('should correctly identify booleans', function () {
		expect(console.findType(false).type).toEqual('boolean:');
		expect(console.findType(true).type).toEqual('boolean:');
		expect(console.findType('true').type).not.toEqual('boolean:');
	});

	it('should correctly identify strings', function () {
		expect(console.findType('Steve Perry').type).toEqual('string:');
		expect(console.findType(['Steve', 123][1]).type).not.toEqual('string:');
	});

	it('should correctly identify objects', function () {
		expect(console.findType({"name": "value"}).type).toEqual('object:');
	});

	it('should correctly identify arrays', function () {
		expect(console.findType(["one", "two", 3]).type).toEqual('array:');
	});

	it('should differentiate between objects and arrays', function () {
		expect(console.findType([1, 2, 3]).type).not.toEqual('object:');
		expect(console.findType({"an": "object"}).type).not.toEqual('array:');
	});

	it('should be able to identify undefined', function () {
		expect(console.findType(undefined).type).toEqual('undefined:');
		expect(console.findType('undefined').type).not.toEqual('undefined:');
	});

	it('should be able to identify null', function () {
		expect(console.findType(null).type).toEqual('null:');
		expect(console.findType(undefined).type).not.toEqual('null:');
		expect(console.findType('null').type).not.toEqual('null:');
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

	it('should call console.out() for non-functions as well', function () {
		spyOn(console, 'out');
		console.run(ex.notAFunction);
		expect(console.out).toHaveBeenCalled();
	});

	it('should accept function arguments and run the function with those arguments', function () {
		expect(console.run(ex.example, 1, 1, 1)).toEqual(3);
	});

});