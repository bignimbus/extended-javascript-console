#extended javascript console#


##better JavaScript console methods.##
![Welcome](https://lh5.googleusercontent.com/-xDUxoBivJfk/VG5u4e3etHI/AAAAAAAAKsw/E8kA8YnS8Nc/w469-h263-no/Screen%2BShot%2B2014-11-20%2Bat%2B4.43.21%2BPM.png "Welcome")

<hr>
###contents###
<ol>
	<li><a href="#getting-started">Getting Started</a></li>
	<li><a href="#consoleout">console.out()</a></li>
	<li><a href="#consolerun">console.run()</a></li>
	<li><a href="#consoleexpect">console.expect()</a></li>
	<li><a href="#namespace">Namespace</a></li>
	<li><a href="#tests">Tests</a></li>
	<li><a href="#contribute">Contribute</a></li>
</ol>

<hr>
###getting started###
xcon works as a require module or as a pojo.

require.js: I recommend declaring xcon last in your require path list, since you will not need to declare it as a module.
```js
define([
	"path/to/xcon-min"
], function () {
// no need to declare as a parameter
```

plain ol' JavaScript:
```html
<script src="path/to/dist/xcon-min.js"></script>
```
<hr>

###console.out()###
like `console.log`, but also prints the primitive type.  Takes arguments to set the text color and to call native console to take a closer look at nested objects/arrays.

`console.out('hello world!');`
```
string:
hello world!
```
<hr width="50%">

`console.out(Math.PI);`
```
number:
3.141592653589793 
```
<hr width="50%">

`console.out(false);`
```
boolean:
false
```
<hr width="50%">

`console.out(NaN)`
```
number:
NaN 
```
<hr width="50%">

`console.out([1, 2, 3]);`
```
array:
[1,2,3] 
```
<hr width="50%">

```js
console.out({
    "can": "tell",
    "the": "difference",
    "between": "objects",
    "and": "arrays"
});
```
```
object:
{"can":"tell","the":"difference","between":"objects","and":"arrays"}
```
<hr width="50%">
####options####
```js
var someVar = {"foo": "bar"};
console.out(someVar, {
	"color": "rgba(0, 0, 255, 0.8)", // or any valid css color
    "log": true, // also calls native console.  Useful for objects
});
```
<hr>

###console.run()###
calls the given function; returns and logs the result with important details.  Catches errors gracefully and logs the error message.  Capable of nested calls for more complex debugging and logging.  Green text indicates that the function was run and returned a valid result.  Black text indicates that you are not invoking a function.  Red text indicates an error has occurred.

<hr width="50%">
```js
function goodFunction () {
	return "this function worked!";
}
console.run(goodFunction);
```
![valid output](https://dl.dropboxusercontent.com/u/10976600/xcon/Screen%20Shot%202014-10-30%20at%205.16.29%20PM.png "Success")

<hr width="50%">
```js
function badFunction () {
	return undefinedVariable;
}
console.run(badFunction);
```
![error output](https://dl.dropboxusercontent.com/u/10976600/xcon/undefined%20error.png "Error")

<hr width="50%">
####passing arguments####
Pass all function arguments as an array as the second argument.
```js
function multiply () {
	var product = 1, n;
	for (n = 0; n < arguments.length; n++) {
    	product *= arguments[n];
    }
    return product;
}
console.run(multiply, [2, 2, 2]);
```
![arguments](https://dl.dropboxusercontent.com/u/10976600/xcon/Screen%20Shot%202014-10-30%20at%205.24.48%20PM.png "Arguments")

<hr width="50%">
####passing context####
```js
var fakeObj = {};
function FakeConstructor () {
	this.prop = "something";
	return this;
}
fakeObj = console.run(FakeConstructor, [], fakeObj);
fakeObj.prop === "something"; // true
```

in the above example, `fakeObj` will be interpreted as `this` by `FakeConstructor'.

<hr width="50%">
####nesting calls####
sometimes it helps to know what a chain of dependent functions are doing.  Because console.run() returns the value of the function, you can keep eye on the output of each function in an organized way.
```js
function mcConaughey (article) {
	return "removing " + article;
}
function carrey (topic) {
	return "makes a joke about " + topic;
}
console.run(
	carrey, 
	console.run(mcConaughey, "shirt")
);
```
![chaining](https://dl.dropboxusercontent.com/u/10976600/xcon/Screen%20Shot%202014-10-30%20at%205.32.55%20PM.png "Chaining")

<hr width="50%">
It can help keep track of what's going wrong in your application flow:

```js
function carrotTop () {
	return hasNoIdeaWhatHesDoingHere;
}
console.run(
	carrey, 
	console.run(mcConaughey, 
    	console.run(carrotTop)
    )
);
```
![chain undefined](https://lh3.googleusercontent.com/-z142WA2ufrY/VFK9ljNTACI/AAAAAAAAKfg/xygmQPdpO2o/w418-h106-no/Screen%2BShot%2B2014-10-30%2Bat%2B5.36.53%2BPM.png "Chain Debugging")

<hr width="50%">
####Non-functions####
It is possible to pass a non-function into `.run()`.  The value of that non-function will be logged as though you were calling `.out()`.  Additionally, that non-function will be returned, enabling the developer to write inline console statements.
```js
var a = console.run('a');
a === 'a' // evaluates to true
// in the console...
// string:
// a
```
<hr>
###console.expect()###
####unit tests in the browser console####
A stripped-down collection of unit test methods that borrow heavily from <a href="http://jasmine.github.io/">jasmine.js</a>.  Developers who regularly use console.log() to debug or dirty-test their code may find that console.expect adds a more precise tool to their workflow.

<hr width="50%">
####console.expect(data).toEqual(comparison)####
A passed test indicates that the argument passed to `expect()` and the argument passed to `toEqual()` are strictly equal - including truthy and falsy values.  Works for any JavaScript data type: primitives, objects, and functions.  Test results are highlighted in green (passed) or red (failed) in the console.
```js
console.expect(4).toEqual(4);
```

<hr width="50%">
####console.expect(data).toBeTruthy()####
Passed test indicates a <a href="http://www.codeproject.com/Articles/713894/Truthy-Vs-Falsy-Values-in-JavaScript">truthy</a> value.
```js
console.expect("I'm truthy").toBeTruthy();
```

<hr width="50%">
####console.expect(data).toBeFalsy()####
Passed test indicates a <a href="http://www.codeproject.com/Articles/713894/Truthy-Vs-Falsy-Values-in-JavaScript">falsy</a> value.
```js
console.expect(undefined).toBeFalsy();
```

<hr width="50%">
####console.expect(data).toBeDefined()####
Passed test indicates data that is not undefined.
```js
console.expect({}).toBeDefined();
```

<hr width="50%">
####.not####
Prepend the test method with .not to invert the test.
```js
console.expect([0, 1, 2]).not.toEqual({"0": 0, "1": 1, "2": 2});
```
<em>Note: JavaScript would interpret these two blobs as identical because they are both considered object, have identical keys and identical values.  Since they are two data types with different prototypes, however, they will not be interpreted by xcon as equal.</em>

<hr>
###Namespace###
To ensure that xcon.js will never break native console methods, there are fallbacks in the code.  If Mozilla, Webkit, Microsoft, etc. were to implement .run or .out tomorrow, xcon will not overwrite those methods.
<hr>

###Tests###
Jasmine unit tests are in the `tests` directory.
<hr>

###Contribute###
Xcon source and test files use AMD modules via <a href="http://requirejs.org/">require.js</a>.  <a href="http://gruntjs.com/">Grunt</a>, <a href="https://github.com/gfranko/amdclean">AMDclean</a>, and <a href="https://github.com/gruntjs/grunt-contrib-uglify">uglify</a> are used to create production builds that do not need AMD.
