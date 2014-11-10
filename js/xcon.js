(function Xcon () {

    "use strict";

    // future-proof against vender expansions to browser console
    if (this.out || this.run) {
        window.xcon = {};
        return Xcon.call(window.xcon);
    }

    // private method that takes a raw input and determines
    // its primitive type.  Outputs all input as a string.
    function condition (blob) {
        var type = typeof blob;
        switch (type) {
            case 'number' || 'boolean' || 'function':
                blob = blob.toString();
                break;
            case 'object':
                type = blob instanceof Array ? 'array' : 'object';
                type = blob !== null ? type : 'null';
                blob = JSON.stringify(blob);
                break;
            case 'undefined':
                blob = 'undefined';
                break;
        }
        type = type + ':';
        return {
            "type": type,
            "text": blob
        };
    }

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
            typeColor = opts.color || 'gray';
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' +
            opts.fnArgs + ') returns ' + type : type;
        console.log("%c" + type, "color:" + typeColor + ";font-weight:bold;");
        console.log("%c" + text, "color:" + opts.color + ";font-weight:bold;");
        if (opts.log) {
            console.log(blob);
        }
    };

    // given a function, calls that function, returns the output,
    // and calls .out() to skin the output in green (success)
    // or red (failure).  Arguments, function name, and any error
    // messages are logged.
    this.run = function (fn, args, context) {
        if (typeof fn === 'function') {
            context = context || this;
            args = args || [];
            var n, result;
            try {
                result = fn.apply(context, args);
                this.out(result, {
                    "color": 'darkgreen',
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args.toString()
                });
                return result;
            } catch (e) {
                this.out(e.message, {
                    "color": 'red',
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args.toString(),
                    "error": true
                });
            }
        } else {
            this.out(arguments[0], arguments[1]);
        }
    };

    return this;

}).call(window.console);
