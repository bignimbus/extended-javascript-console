#extended javascript console#


##more descriptive JavaScript console methods. Formerly konsole.js##
![I am console](https://lh6.googleusercontent.com/-yF0Z7tZ7i3g/VFK-nbe2tfI/AAAAAAAAKfs/DGHoL3WM-8w/w101-h30-no/Screen%2BShot%2B2014-10-30%2Bat%2B5.41.16%2BPM.png)


###getting started###
excon works as a require module or as a pojo.

require.js:
```js
define([
	"path/to/excon.js"
], function () {
// etc.
```

plain ol' JavaScript:
```html
<script src="path/to/excon.js"></script>
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
![valid output](https://lh6.googleusercontent.com/-5SKd2dYk1zs/VFK42koRWlI/AAAAAAAAKes/ywClh4gO-Uk/w425-h99-no/Screen%2BShot%2B2014-10-30%2Bat%2B5.16.29%2BPM.png "Success")

<hr width="50%">
```js
function badFunction () {
	return undefinedVariable;
}
console.run(badFunction);
```
![error output](https://lh3.googleusercontent.com/-SPXeWlU-TSE/VFK3OKNo-MI/AAAAAAAAKeY/iRnFucet6c4/w473-h104-no/undefined%2Berror.png "Error")

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
![arguments](https://lh3.googleusercontent.com/-EvrzruiOz-k/VFK6xPgpmJI/AAAAAAAAKe8/wzIa0pCXp6U/w425-h153-no/Screen%2BShot%2B2014-10-30%2Bat%2B5.24.48%2BPM.png "Arguments")

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
![chaining](https://lh6.googleusercontent.com/-5o8KDCrUUqw/VFK8rIfOv2I/AAAAAAAAKfM/QcyryhkdwQU/w423-h209-no/Screen%2BShot%2B2014-10-30%2Bat%2B5.32.55%2BPM.png "Chaining")

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
