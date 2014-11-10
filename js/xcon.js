(function Xcon () {

    "use strict";

    // future-proof against vender expansions to browser console
    if (this.condition || this.out || this.run) {
        window.xcon = {};
        return Xcon.call(window.xcon);
    }

    function condition (text) {
        var type = typeof text;
        switch (type) {
            case 'number' || 'boolean' || 'function':
                text = text.toString();
                break;
            case 'object':
                type = text instanceof Array ? 'array' : 'object';
                type = text !== null ? type : 'null';
                text = JSON.stringify(text);
                break;
            case 'undefined':
                text = 'undefined';
                break;
        }
        type = type + ':';
        return {
            "type": type,
            "text": text
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
    this.out = function (rawText, opts) {

        opts = opts || {};
        var props = condition(rawText),
            type = props.type,
            text = props.text || '',
            typeColor = opts.color || 'gray';
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' +
            opts.fnArgs + ') returns ' + type : type;
        console.log("%c" + type, "color:" + typeColor + ";font-weight:bold;");
        console.log("%c" + text, "color:" + opts.color + ";font-weight:bold;");
        if (opts.log) {
            console.log(rawText);
        }
    };

    // given a function, calls that function, returns the output,
    // and calls .out() to skin the output in green (success)
    // or red (failure).  Arguments, function name, and any error
    // messages are logged.
    this.run = function (fn) {
        if (typeof fn === 'function') {
            var args = [], n, result;
            for (n = 1; n < arguments.length; n++) {
                args.push(arguments[n]);
            }
            try {
                result = fn.apply(this, args);
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
