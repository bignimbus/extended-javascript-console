define(['color-select', 'condition'],
function (colorSelect, condition) {
    "use strict";
    function Xcon () {

        // skins a console.log message to display the primitive type as well
        // as the expected output of a vanilla .log() command
        // opts: {
        //     "color": "#f9f9f9", // specify a css color
        //     "log": true //
        // }
        // sometimes this function is called from console.run() to output
        // function return values.  In that case,
        // opts: {
        //     "color": "darkgreen", // or red
        //     "fnName": "nameOfFunction",
        //     "fnArgs": "all passed arguments",
        //     "error": true // indicates a thrown error
        // }
        this.out = function (blob, opts) {
            opts = opts || {};
            var props = condition(blob),
                type = props.type,
                text = props.text || '',
                color = opts.color || colorSelect(),
                fontWeight = opts.fnName ? "bold" : "normal";
            type = opts.error ? 'error' : type;
            type = opts.fnName ? opts.fnName + '(' +
                opts.fnArgs + ') returns ' + type : type;
            console.log("%c" + type + ":\n" + text,
                "color:" + color + ";font-weight:" + fontWeight);
            if (opts.log) {
                console.log(blob);
            }
        };

        // given a function, calls that function, returns the output,
        // and calls .out() to skin the output in green (success)
        // or red (failure).  Arguments, function name, and any error
        // messages are logged.
        this.run = function (fn, args, context) {
            if (typeof fn !== 'function') {
                this.out(arguments[0], arguments[1]);
                return arguments[0];
            }
            context = context || this;
            args = args || [];
            var result,
                opts = {
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args.toString()
                };
            try {
                result = fn.apply(context, args);
                opts.color = 'darkgreen';
                this.out(result, opts);
                return result;
            } catch (e) {
                opts.color = 'red';
                opts.error = true;
                this.out(e.message, opts);
            }
        };
        return this;
    }

    return Xcon.call(window.console);
});
