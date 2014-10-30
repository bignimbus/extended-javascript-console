function Konsole (settings) {
    "use strict";

    this.findType = function (text) {
        var type = typeof text;
        switch (type) {
            case 'number':
                if (isNaN(text)) {
                    text = text.toString();
                }
                break;
            case 'boolean' || 'function':
                text = text.toString();
                break;
            case 'object':
                type = text instanceof Array ? 'array' : 'object';
                text = JSON.stringify(text);
                break;
            case 'undefined':
                text = 'undefined';
                break;
        }
        type = '@' + type + ':';
        return {
            "type": type,
            "text": text
        }
    };

    this.out = function (rawText, opts) {
        opts = opts || {};
        var props = this.findType(rawText),
            type = props.type,
            text = props.text || '';
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' + 
            opts.fnArgs.toString() + ') returns ' + type : type;
        text = type + '\n' + text;
        console.log("%c" + text, "color:" + opts.color + ";font-weight:bold;");
        if (opts.console) {
            console.log(rawText);
        }
    };

    this.run = function (fn, opts) {
        if (typeof fn !== 'function') {
            this.out(fn, opts);
        } else {
            var args = [], n;
            for (n = 1; n < arguments.length; n++) {
                args.push(arguments[n]);
            }
            try {
                this.out(fn.apply(this, args), {
                    "color": 'darkgreen',
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args
                });
                return fn.apply(this, args);
            } catch (e) {
                this.out(e.message, {
                    "color": 'red',
                    "fnName": fn.name || 'anonymous function',
                    "fnArgs": args,
                    "error": true
                });
            }
        }
    };

    this.clear = function () {
        console.clear();
    };

    return this;
}

try {
    if (require) {
        define([], function() {return Konsole;});
    }
} catch(e) {}

try {
    if (window) {
        window.konsole = new Konsole();
    }
} catch(e) {}
