// formats a log message with options
// to be passed to the .out method
define(['condition', 'color-select'],
function (condition, colorSelect) {
    "use strict";
    function format (blob, opts) {
        opts = opts || {};
        var logMessage,
            logParams,
            props = condition(blob),
            type = props.type,
            text = props.text || '',
            color = opts.color || colorSelect(),
            fontWeight = opts.fnName ? "bold" : "normal";
        type = opts.error ? 'error' : type;
        type = opts.fnName ? opts.fnName + '(' +
            opts.fnArgs + ') returns ' + type : type;
        logMessage = "%c" + type + ":\n" + text;
        logParams = "color:" + color + ";font-weight:" + fontWeight;
        return [logMessage, logParams];
    }
    return format;
});
