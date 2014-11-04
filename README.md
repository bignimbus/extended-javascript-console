#extended javascript console#


##more descriptive JavaScript console methods.##
![Welcome](https://lh5.googleusercontent.com/-szn-LngTI5U/VFfxTa8NIFI/AAAAAAAAKjo/uYKW0I9nEoU/w386-h63-no/Screen%2BShot%2B2014-11-03%2Bat%2B3.18.55%2BPM.png "Welcome")


###getting started###
xcon works as a require module or as a pojo.

require.js:
```js
define([
	"path/to/xcon"
], function () {
// no need to declare as a parameter
```

plain ol' JavaScript:
```html
<script src="path/to/xcon.js"></script>
```

###console.out()###
like `console.log`, but also prints the primitive type.  Takes arguments to set the text color and to call native console to take a closer look at nested objects/arrays.
<hr>

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
    "console": true, // also calls native console.  Useful for objects
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

####passing arguments####
same syntax as `Function.prototype.call()`
```js
function multiply () {
	var product = 1, n;
	for (n = 0; n < arguments.length; n++) {
    	product *= arguments[n];
    }
    return product;
}
console.run(multiply, 2, 2, 2);
```
![arguments](https://dl.dropboxusercontent.com/u/10976600/xcon/Screen%20Shot%202014-10-30%20at%205.24.48%20PM.png "Arguments")

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

<hr>

###Tests###

Jasmine unit tests are in the `tests` directory.
