// formats a log message with options
// to be passed to the .out method
define(['condition', 'color-select'],
function (condition, colorSelect) {
    "use strict";
    function format (blob, opts) {
        opts = opts || {};
        var logMessage,
            logParams,
            props,
            type,
            text = blob,
            color = opts.color || colorSelect(),
            bg = opts.background || '#fff',
            fontWeight = opts.fnName ? "bold" : "normal";

        if (!opts.test) {
            props = condition(blob);
            type = props.type + ':\n';
            text = props.text || '';
            type = opts.error ? 'error' : type;
            type = opts.fnName ? opts.fnName + '(' +
                opts.fnArgs + ') returns ' + type : type;
        }
        type = type || '';

        logMessage = "%c" + type + text;
        logParams = "color:" + color + ";background:" + bg + ";font-weight:" + fontWeight;
        return [logMessage, logParams];
    }
    return format;
});
