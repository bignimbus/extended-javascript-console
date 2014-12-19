// formats a log message with options
// to be passed to the .out method
define(['condition', 'color-select'],
function (condition, colorSelect) {
    "use strict";
    function prettify (blob, opts) {
        opts = opts || {};
        var logMessage,
            props,
            type,
            text = blob;

        if (!opts.test) {
            props = condition(blob);
            type = props.type + ':\n';
            text = props.text || '';
            type = opts.error ? 'error:\n' : type;
            type = opts.fnName ? opts.fnName + '(' +
                opts.fnArgs + ') returns ' + type : type;
        }
        type = type || '';

        logMessage = type + text;
        return logMessage;
    }

    function format (blob, opts) {
        var n,
            logMessage = '%c',
            logParams,
            color = opts.color || colorSelect(),
            bg = opts.background || '#fff',
            fontWeight = opts.fnName ? "bold" : "normal";

        blob = blob instanceof Array ? blob : [blob];
        for (n in blob) {
            logMessage += prettify(blob[n], opts);
            logMessage += n < blob.length - 1 ? '\n' : '';
        }
        logParams = "color:" + color + ";background:" + bg + ";font-weight:" + fontWeight;
        return [logMessage, logParams];
    }
    return format;
});
