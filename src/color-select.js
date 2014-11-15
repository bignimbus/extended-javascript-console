// returns a random color to improve contrast between
// adjacent .out logs.  Colors should be non-red and
// non-green to differentiate between .run() and .out()
// logs.

define([], function () {
	"use strict";
	return function () {
		var outColors = [
			'blue',
			'darkgray',
			'black',
			'darkorange',
			'chocolate',
			'brown',
			'darkmagenta',
			'darkgoldenrod',
			'darkslateblue',
			'dimgray',
			'indigo',
			'maroon',
			'midnightblue',
			'navy',
			'purple',
			'royalblue',
			'sienna',
			'saddlebrown',
			'slateblue',
			'slategray',
			'teal',
			'steelblue'
		],
		random = Math.floor(Math.random() * outColors.length);
		return outColors[random];
	};
});
