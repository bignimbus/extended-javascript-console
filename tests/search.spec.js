define(['contains'],
function (contains) {
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
    describe('contains', function () {
        it('should search and find data stored in an object', function () {
            expect(contains(simpleObj, 5)).toEqual(true);
            expect(contains(simpleObj, 4)).not.toEqual(true);
        });
        it('should search and find data stored in an array', function () {
            expect(contains(simpleArr, "two")).toEqual(true);
            expect(contains(simpleArr, "metropolis")).not.toEqual(true);
        });
        it('should find data deeply nested in an object', function () {
            expect(contains(complexObj, 6)).toEqual(true);
        });
    });
});
