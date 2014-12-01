define(['obj-diff'],
function (diff) {
	"use strict";
	describe('diff', function () {
		var first = {
				"hello": "kitty",
				"goodbye": "mr. bond",
				"nest": {
					"nested": {
						"prop": 4
					}
				}
			},
			second = {
				"hello": "dolly",
				"goodbye": "mr. bond",
				"nest": {
					"nested": {
						"prop": 3
					}
				}
			};
		it('should return two object diffs given two object inputs', function () {
			var diffs = diff(first, second);
			expect(diffs.firstObjectDiff).toBeDefined();
			expect(diffs.secondObjectDiff).toBeDefined();
		});
		it('should return a diff with unique properties for arrays', function () {
			var arrDiffs = diff([1, 2, "3", {"four": 4}], [1, 2, "3", "four"]);
			expect(arrDiffs).toEqual({
				"firstObjectDiff": [{"four": 4}],
				"secondObjectDiff": ["four"]
			});
		});
		it('should return a diff with unique properties for objects', function () {
			var objDiffs = diff(first, second);
			expect(objDiffs).toEqual({
				"firstObjectDiff": {
					"hello": "kitty",
					"nest": {
						"nested": {
							"prop": 4
						}
					}
				},
				"secondObjectDiff": {
					"hello": "dolly",
					"nest": {
						"nested": {
							"prop": 3
						}
					}
				}
			});
		});
	});
});
