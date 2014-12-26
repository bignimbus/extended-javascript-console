define(['search'],
function (search) {
    'use strict';
    var simpleObj = {
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

    describe('search', function () {
        it('should search and find data stored in an object', function () {
            expect(search(simpleObj, 5)).toEqual(true);
            expect(search(simpleObj, 4)).toEqual(false);
        });
        it('should search and find data stored in an array', function () {
            expect(search(simpleArr, "two")).toEqual(true);
            expect(search(simpleArr, "metropolis")).toEqual(false);
        });
        it('should find data deeply nested in an object', function () {
            expect(search(complexObj, 6)).toEqual(true);
            expect(search(complexObj, "hazelnut")).toEqual(false);
        });
        it('should find data deeply nested in an array', function () {
            expect(search(complexArr, 3)).toEqual(true);
            expect(search(complexArr, "peet's")).toEqual(false);
        });
    });
});
