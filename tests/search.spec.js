define(['search'],
function (Search) {
    'use strict';
    var search,
        simpleObj = {
            "starbucks": 3,
            "intelligentsia": 10,
            "dunkindonuts": 5
        },
        complexObj = {
            "starbucks": {
                "coffee": "ok",
                "espresso": "pretty bad",
                "sweetDrinks": {
                    "PSL": "overrated, but still good"
                }
            },
            "dunkindonuts": {
                "flavors": ["cinnamon", "french vanilla"],
                "randomNumbers": [2, 3, 4, 5, 6]
            },
            "intelligentsia": [
                {
                    "yummy": true,
                    "expensive": true
                }
            ]
        },
        simpleArr = ["zero", "one", "two", "three"],
        complexArr = [
            "zero",
            1,
            {
                "two": {
                    "three": 3,
                    "four": 4
                }
            }
        ];

    describe('contains', function () {
        it('should search and find data stored in an object', function () {
            expect(new Search(simpleObj).thisFor(5)).toEqual(true);
            expect(new Search(simpleObj).thisFor(4)).toEqual(false);
        });
        it('should search and find data stored in an array', function () {
            expect(new Search(simpleArr).thisFor("two")).toEqual(true);
            expect(new Search(simpleArr).thisFor("metropolis")).toEqual(false);
        });
        it('should find data deeply nested in an object', function () {
            expect(new Search(complexObj).thisFor(6)).toEqual(true);
            expect(new Search(complexObj).thisFor("hazelnut")).toEqual(false);
        });
        it('should find data deeply nested in an array', function () {
            expect(new Search(complexArr)).thisFor(3)).toEqual(true);
            expect(new Search(complexArr)).thisFor("peet's")).toEqual(false);
        });
    });
});
