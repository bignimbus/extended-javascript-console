// returns a random color to improve contrast between
// adjacent .out logs.  Colors should be non-red and
// non-green to differentiate between .run() and .out()
// logs.

define([], function () {
	"use strict";
	function colorSelect () {
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
		random = Math.floor(Math.random() * outColors.length),
		color = outColors[random];
		if (color === colorSelect.last) {
			colorSelect();
		} else {
			colorSelect.last = color;
			return color;
		}
	}
	colorSelect.last = null;
	return colorSelect;
});
