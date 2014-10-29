var Konsole = function () {
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
            text = props.text,
            name = opts.name || '';
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' + opts.fnArgs.toString() + ') returns ' + type : type;
        text = text || '';
        text = type + '\n' + text;
        console.log("%c" + text, "color:" + opts.color + ";font-weight:bold;");
        if (opts.log) console.log(rawText);
    };

    this.debug = function (fn) {
        if (typeof fn !== 'function') {
            this.out(fn, {"color": 'blue'});
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
                console.log(fn);
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
    this.clear = function (el) {
        el.innerHTML = '';
    };
    return this;
};

var konsole = new Konsole();

///////////////////////////////////////////////
/////////////Enter code below./////////////////
///////////////////////////////////////////////

konsole.out("here's an example of konsole.out()");
konsole.out("you can specify a color.", {"color": 'salmon'});
konsole.out(true);
konsole.out(undefined);
konsole.out(Math.PI);
konsole.out(NaN);
konsole.out(['can', 'print', 'arrays']);
konsole.out({"can": "print", "object": "literals"});
konsole.out({
    "pass": 'log:true',
    "to": 'trigger console.log()'
}, {"log": true});
konsole.out(function () {return 'can output function text';});

konsole.debug(function info () {return "use konsole.debug() to print function output";});
konsole.debug({"note": "blue indicates you're trying to debug a non-function"});
konsole.debug(function () {return badThingsCanHappen;});