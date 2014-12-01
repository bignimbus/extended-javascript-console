define(['format'],
function (format) {
    "use strict";
    describe('format', function () {

        var blob = "it puts the lotion on the skin",
            opts = {"color": "#000000"};

        it('should format an array to be handed off to the console, given an input blob and options',
        function () {
            expect(format(blob, opts)).toEqual([
                "%cstring:\n\"it puts the lotion on the skin\"",
                "color:#000000;background:#fff;font-weight:normal"
            ]);
        });

    });

});
