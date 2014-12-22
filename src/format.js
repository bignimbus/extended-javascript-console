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
            text = blob,
            truncated;

        if (!opts.test) {
            props = condition(blob);
            type = props.type + ':\n';
            text = props.text || '';
            truncated = props.truncated;
            type = opts.error ? 'error:\n' : type;
            type = opts.fnName ? opts.fnName + '(' +
                opts.fnArgs + ') returns ' + type : type;
        }
        type = type || '';

        logMessage = type + text;
        return [logMessage, truncated ? true : false];
    }

    function format (blob, opts) {
        var n,
            logMessage = '%c',
            logParams,
            color = opts.color || colorSelect(),
            bg = opts.background || '#fff',
            fontWeight = opts.fnName ? "bold" : "normal",
            logQueue = [],
            item;

        blob = blob instanceof Array ? blob : [blob];
        for (n in blob) {
            item = prettify(blob[n], opts);
            logMessage += item[0];
            logMessage += n < blob.length - 1 ? '\n' : '';
            if (item[1]) {
                logQueue.push(blob[n]);
            }
        }
        logParams = "color:" + color + ";background:" + bg + ";font-weight:" + fontWeight;
        return [logMessage, logParams, logQueue];
    }
    return format;
});
