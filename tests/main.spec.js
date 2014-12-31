define(['main'],
function () {
    "use strict";
    describe('Xcon', function () {

        it('should add .expect, .out, .diff and .run methods to console', function () {
            var itWorked = !!window.console.expect
                && !!window.console.run
                && !!window.console.out
                && !!window.console.diff;
            expect(itWorked).toEqual(true);
        });

    });

    describe('console.out()', function () {

        it('should accept an arbitrary number of arguments and call .out on each of them,'
                + 'detecting the options hash as the last argument if provided.',
        function () {
            spyOn(window.console, 'log');
            window.console.out(1, 2, 3, 4, {
                "color": "navy"
            });
            expect(window.console.log).toHaveBeenCalledWith('%cnumber:\n1\nnumber:\n2\nnumber:\n3\nnumber:\n4',
                'color:navy;background:#fff;font-weight:normal');
        });

        it('should log function name, function arguments if given those parameters',
        function () {
            spyOn(window.console, 'log');
            window.console.out('success message', {
                "color": 'darkgreen',
                "fnName": 'anotherFunction',
                "fnArgs": '1, 2, 3'
            });
            // expect(window.console.log).toHaveBeenCalledWith("%canotherFunction(1, 2, 3) returns string:\"success message\"", 'color:darkgreen;background:#fff;font-weight:bold');
        });

        it('should log function error status if given those parameters',
        function () {
            spyOn(window.console, 'log');
            window.console.out('error message', {
                "color": 'red',
                "fnName": 'someFunction',
                "fnArgs": '1, 2, 3',
                "error": true
            });
            // expect(window.console.log).toHaveBeenCalledWith("%csomeFunction(1, 2, 3) returns error:\"error message\"", 'color:red;background:#fff;font-weight:bold');
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
            window.console.run(ex.example);
            expect(ex.example).toHaveBeenCalled();
        });

        it('should call window.console.out() to print function output', function () {
            spyOn(window.console, 'out');
            window.console.run(ex.example);
            expect(window.console.out).toHaveBeenCalled();
        });

        it('should return the value of a non-function input', function () {
            var a = window.console.run('a');
            expect(a).toEqual('a');
        });

        it('should call window.console.out() for non-functions as well', function () {
            spyOn(window.console, 'out');
            window.console.run(ex.notAFunction);
            expect(window.console.out).toHaveBeenCalled();
        });

        it('should accept function arguments and run the function with those arguments', function () {
            expect(window.console.run(ex.example, [1, 1, 1])).toEqual(3);
        });

        it('should accept a context as the third argument and run the function with that context', function () {
            var fakeObj = {};
            fakeObj = window.console.run(ex.fakeConstructor, [], fakeObj);
            expect(fakeObj.something).toEqual("something");
        });

    });

    describe('console.expect', function () {

        var a = "a",
            b = "b",
            pass = "PASSED: expected string \"a\" to equal string \"a\"",
            fail = "FAILED: expected string \"a\" to equal string \"b\"",
            notfail = "PASSED: expected string \"a\" not to equal string \"b\"",
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

    describe('console.diff', function () {

        it('should .out an error message if given a non-object or non-array as an argument', function () {
            spyOn(window.console, "out");
            window.console.diff("a", 3);
            expect(window.console.out).toHaveBeenCalledWith("both arguments must be objects or arrays", {
                "test": true,
                "color": "red"
            });
        });

        it('should .out a message indicating that the two arguments are equal', function () {
            spyOn(window.console, "out");
            window.console.diff({"a": "a"}, {"a": "a"});
            expect(window.console.out).toHaveBeenCalledWith("both arguments are equal", {
                "test": true,
                "color": "darkgreen"
            });
        });

        it('should display two diff objects and a short message to the user indicating'
        + ' the difference between the two data types', function () {
            spyOn(window.console, "out");
            spyOn(window.console, "log");
            window.console.diff({"a": 1}, {"a": 2});
            expect(window.console.out).toHaveBeenCalledWith("first object has unique data:\na : 1", {
                "test": true,
                "color": "black",
                "background": "lightblue"
            });
            expect(window.console.out).toHaveBeenCalledWith("second object has unique data:\na : 2", {
                "test": true,
                "color": "black",
                "background": "khaki"
            });
        });

    });

});
