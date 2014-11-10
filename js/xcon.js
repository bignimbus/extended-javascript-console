(function Xcon () {

    "use strict";

    // future-proof against vender expansions to browser console
    if (this.condition || this.out || this.run) {
        window.xcon = {};
        return Xcon.call(window.xcon);
    }

    this.out = function (rawText, opts) {
        opts = opts || {};
        var props = this.condition(rawText),
            type = props.type,
            text = props.text || '',
            typeColor = opts.color || 'gray';
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' +
            opts.fnArgs.toString() + ') returns ' + type : type;
        console.log("%c" + type, "color:" + typeColor + ";font-weight:bold;");
        console.log("%c" + text, "color:" + opts.color + ";font-weight:bold;");
        if (opts.console) {
            console.log(rawText);
        }
    };

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
                    "fnArgs": args
                });
                return result;
            } catch (e) {
                this.out(e.message, {
                    "color": 'red',
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args,
                    "error": true
                });
            }
        } else {
            this.out(arguments[0], arguments[1]);
        }
    };

    this.condition = function (text) {
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
    };

    return this;

}).call(window.console);
