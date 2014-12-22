;(function() {
var get_type, condition, color_select, format, is_equal, search, expectation, obj_diff, mainjs;
get_type = function () {
  
  function getType(blob) {
    var type = typeof blob;
    if (blob === void 0) {
      type = 'undefined';
    }
    if (type === 'object') {
      type = blob instanceof Array ? 'array' : 'object';
      type = blob !== null ? type : 'null';
    }
    return type;
  }
  return getType;
}();
// takes a raw input and determines its
// primitive type.  Outputs all input as a string.
condition = function (getType) {
  
  function condition(blob) {
    var type = getType(blob), truncated, limit = 100, log;
    switch (type) {
    case 'number':
    case 'boolean':
    case 'function':
      blob = blob.toString();
      break;
    case 'object':
    case 'array':
    case 'null':
      try {
        blob = JSON.stringify(blob);
      } catch (e) {
        console.out('*circular data structure detected:', {
          'color': 'red',
          'test': true
        });
        console.log(blob);
      }
      break;
    case 'string':
      blob = '"' + blob + '"';
      break;
    case 'undefined':
      blob = 'undefined';
      break;
    }
    if (blob.length > limit) {
      blob = blob.substring(0, limit) + '...' + (type === 'string' ? '"' : '');
      truncated = true;
    }
    return {
      'type': type,
      'text': blob,
      'truncated': !!truncated
    };
  }
  return condition;
}(get_type);
// returns a random color to improve contrast between
// adjacent .out logs.  Colors should be non-red and
// non-green to differentiate between .run() and .out()
// logs.
color_select = function () {
  
  function colorSelect() {
    var outColors = [
        'blue',
        'darkgray',
        'black',
        'darkorange',
        'chocolate',
        'brown',
        'darkmagenta',
        'darkgoldenrod',
        'darkslateblue',
        'dimgray',
        'indigo',
        'maroon',
        'midnightblue',
        'navy',
        'purple',
        'royalblue',
        'sienna',
        'saddlebrown',
        'slateblue',
        'slategray',
        'teal',
        'steelblue'
      ], random = Math.floor(Math.random() * outColors.length), color = outColors[random];
    if (color === colorSelect.last) {
      colorSelect();
    } else {
      colorSelect.last = color;
      return color;
    }
  }
  colorSelect.last = null;
  return colorSelect;
}();
// formats a log message with options
// to be passed to the .out method
format = function (condition, colorSelect) {
  
  function prettify(blob, opts) {
    opts = opts || {};
    var logMessage, props, type, text = blob, truncated;
    if (!opts.test) {
      props = condition(blob);
      type = props.type + ':\n';
      text = props.text || '';
      truncated = props.truncated;
      type = opts.error ? 'error:\n' : type;
      type = opts.fnName ? opts.fnName + '(' + opts.fnArgs + ') returns ' + type : type;
    }
    type = type || '';
    logMessage = type + text;
    return [
      logMessage,
      truncated ? true : false
    ];
  }
  function format(blob, opts) {
    var n, logMessage = '%c', logParams, color = opts.color || colorSelect(), bg = opts.background || '#fff', fontWeight = opts.fnName ? 'bold' : 'normal', logQueue = [], item;
    blob = blob instanceof Array ? blob : [blob];
    for (n in blob) {
      item = prettify(blob[n], opts);
      logMessage += item[0];
      logMessage += n < blob.length - 1 ? '\n' : '';
      if (item[1]) {
        logQueue.push(blob[n]);
      }
    }
    logParams = 'color:' + color + ';background:' + bg + ';font-weight:' + fontWeight;
    return [
      logMessage,
      logParams,
      logQueue
    ];
  }
  return format;
}(condition, color_select);
// based on a solution by Ebrahim Byagowi.  Original code can be found at:
// http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
is_equal = function (getType) {
  
  function isEqual(thing, otherThing) {
    if (thing instanceof Function) {
      if (otherThing instanceof Function) {
        thing = thing.toString().replace(/\s/gm, '');
        otherThing = otherThing.toString().replace(/\s/gm, '');
        return thing === otherThing;
      }
      return false;
    }
    if (thing === null || thing === void 0 || otherThing === null || otherThing === void 0) {
      return thing === otherThing;
    }
    if (thing === otherThing || thing.valueOf() === otherThing.valueOf()) {
      return true;
    }
    if (thing instanceof Date || otherThing instanceof Date || !(thing instanceof Object) || !(otherThing instanceof Object) || getType(thing) !== getType(otherThing)) {
      return false;
    }
    var thingKeys = Object.keys(thing), otherKeys = Object.keys(otherThing), equal = otherKeys.every(function (key) {
        return thingKeys.indexOf(key) !== -1;
      }) && thingKeys.every(function (key) {
        return isEqual(thing[key], otherThing[key]);
      });
    return equal;
  }
  return isEqual;
}(get_type);
search = function (getType) {
  
  function Search(collection) {
    this.contains = false;
    this.thisFor = function (thing, blob) {
      blob = blob || collection;
      var type = getType(blob), keys = type === 'object' ? Object.keys(blob) : null, len = type === 'object' ? Object.keys(blob).length : blob.length, n, key;
      for (n = 0; n < len; n++) {
        key = keys ? keys[n] : n;
        if (blob[key] === thing) {
          this.contains = true;
          break;
        }
        if (getType(blob[key]) === 'object' || getType(blob[key]) === 'array') {
          this.thisFor(thing, blob[key]);
        }
      }
      return this.contains;
    };
    return this;
  }
  return Search;
}(get_type);
expectation = function (isEqual, getType, condition, Search) {
  
  function Expectation(context, thing, opts) {
    opts = opts || {};
    var not = opts.not || false, passed = null, message = function () {
        var n, text = [
            passed ? 'PASSED: ' : 'FAILED: ',
            'expected ',
            getType(thing),
            ' ',
            condition(thing).text,
            ' ',
            not ? 'not ' : ''
          ];
        for (n = 0; n < arguments.length; n++) {
          text.push(arguments[n]);
        }
        return context.out(text.join(''), {
          'color': '#000',
          'background': passed ? 'rgba(44, 226, 44, 0.4)' : 'rgba(226, 44, 44, 0.4)',
          'test': true
        });
      };
    this.toEqual = function (otherThing) {
      var result = isEqual(thing, otherThing);
      passed = not ? !result : result;
      message('to equal ', getType(otherThing), ' ', condition(otherThing).text);
      if (getType(thing) === getType(otherThing) && typeof thing === 'object' && !passed) {
        context.diff(thing, otherThing);
      }
    };
    this.toContain = function (otherThing) {
      var result = new Search(thing).thisFor(otherThing);
      passed = not ? !result : result;
      message('to contain ', getType(otherThing), ' ', condition(otherThing).text);
    };
    this.toBeCloseTo = function (num, margin) {
      passed = thing < num + margin || thing > num - margin;
      passed = not ? !passed : passed;
      message('to be close to ', num, ' by a margin of ', margin);
    };
    this.toBeTruthy = function () {
      passed = not ? !thing : !!thing;
      message('to be truthy');
    };
    this.toBeDefined = function () {
      passed = not ? thing === void 0 : thing !== void 0;
      message('to be defined');
    };
    this.toBeNull = function () {
      passed = not ? thing !== null : thing === null;
      message('to be null');
    };
    return this;
  }
  return Expectation;
}(is_equal, get_type, condition, search);
obj_diff = function (isEqual, getType, condition) {
  
  function diff(obj, compare) {
    if (getType(obj) !== getType(compare)) {
      return false;
    }
    var firstObjectDiff, secondObjectDiff, currentPath = [], uniqueData = '', problem = false, errorMessage;
    function clone(thing) {
      // clone function was originally written by A. Levy
      // and edited by Jeff Auriemma for style and accuracy
      // source:
      // http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
      var copy, attr, i;
      if (thing === null || typeof thing !== 'object') {
        return thing;
      }
      if (thing instanceof Date) {
        copy = new Date();
        copy.setTime(thing.getTime());
        return copy;
      }
      if (thing instanceof Array) {
        copy = [];
        for (i = 0; i < thing.length; i++) {
          copy[i] = clone(thing[i]);
        }
        return copy;
      }
      if (thing instanceof Object) {
        copy = {};
        for (attr in thing) {
          if (thing.hasOwnProperty(attr)) {
            copy[attr] = clone(thing[attr]);
          }
        }
        return copy;
      }
      throw new Error('Unable to provide object diff; infinite recursion detected.');
    }
    function getData(obj, path) {
      var copy = clone(obj);
      return copy[path];
    }
    function findUniqueData(first, second) {
      var index, key, type = getType(first), keys = type === 'object' ? Object.keys(first) : null, len = type === 'object' ? Object.keys(first).length : first.length;
      for (index = 0; index < len; index++) {
        key = type === 'array' ? index : keys[index];
        currentPath.push(key);
        if (first.hasOwnProperty(key) && !isEqual(first[key], second[key])) {
          if (getType(first[key]) !== getType(second[key]) || getType(first[key]) !== 'object' && getType(first[key]) !== 'array') {
            uniqueData += '\n' + currentPath.join('.') + ' : ' + condition(getData(first, currentPath.pop())).text;
          } else {
            findUniqueData(first[key], second[key]);
          }
        }
        currentPath = currentPath.slice(0, -1);
      }
      return uniqueData;
    }
    try {
      firstObjectDiff = findUniqueData(obj, compare);
    } catch (e) {
      problem = true;
      firstObjectDiff = true;
    }
    currentPath = [];
    uniqueData = '';
    try {
      secondObjectDiff = findUniqueData(compare, obj);
    } catch (e) {
      problem = true;
      secondObjectDiff = true;
    }
    if (problem) {
      errorMessage = 'object(s) too complex to diff.' + ' Try testing smaller object(s) or one(s) with fewer circular data references.';
    }
    return {
      'firstObjectDiff': firstObjectDiff,
      'secondObjectDiff': secondObjectDiff,
      'errorMessage': errorMessage
    };
  }
  return diff;
}(is_equal, get_type, condition);
mainjs = function (format, Expectation, diff, isEqual, getType) {
  
  function Xcon() {
    // skins a console.log message to display the primitive type as well
    // as the expected output of a vanilla .log() command
    // opts: {
    //     "color": "#f9f9f9", // specify a css color
    //     "background": "rgb(0, 0, 0)", // specify a css color
    //     "log": true // also calls native console.log, which is useful for large objects and arrays
    // }
    // sometimes this function is called from console.run() to output
    // function return values.  In that case,
    // opts: {
    //     "color": "darkgreen", // or red
    //     "fnName": "nameOfFunction",
    //     "fnArgs": "all passed arguments",
    //     "error": true // indicates a thrown error
    // }
    this.out = this.out || function (blob, opts) {
      var logMsg, noOptsHash, n;
      opts = arguments[arguments.length - 1] || {};
      noOptsHash = !(opts.color || opts.background || opts.log || opts.error || opts.test || opts.fnName || opts.fnArgs);
      opts = noOptsHash ? {} : opts;
      if (arguments.length > this.out.length) {
        blob = noOptsHash ? Array.prototype.slice.call(arguments) : Array.prototype.slice.call(arguments, 0, -1);
      }
      logMsg = format(blob, opts);
      this.log(logMsg[0], logMsg[1]);
      for (n in logMsg[2]) {
        this.log(logMsg[2][n]);
      }
    };
    // given a function, calls that function, returns the output,
    // and calls .out() to skin the output in green (success)
    // or red (failure).  Arguments, function name, and any error
    // messages are logged.
    this.run = this.run || function (fn, args, context) {
      if (typeof fn !== 'function') {
        this.out(arguments[0], arguments[1]);
        return arguments[0];
      }
      context = context || this;
      args = args || [];
      var result, opts = {
          'fnName': fn.name || 'anonymous function',
          'fnArgs': args.toString()
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
    // borrows heavily from jasmine.js syntax
    // console.expect instantiates an expectation object
    // with methods to test equality, truthiness,
    // falsiness, and whether or not data is defined.
    // Adding .not works the same way as jasmine.
    this.expect = this.expect || function (thing) {
      var expect = new Expectation(this, thing);
      expect.not = new Expectation(this, thing, { 'not': true });
      return expect;
    };
    // given two objects or two arrays, returns two objects/arrays
    // containing only the unique data for the corresponding argument.
    // ex: console.diff({"a": 1}, {"a": 1, "b": 2});
    // will return one empty object (no unique data in first arg)
    // and one object: {"b": 2} (the only unique data in second arg)
    this.diff = this.diff || function (obj, compare) {
      if (typeof obj !== 'object' || typeof compare !== 'object') {
        this.out('both arguments must be objects or arrays', { 'color': 'red' });
        return false;
      }
      if (isEqual(obj, compare)) {
        this.out('both arguments are equal', {
          'test': true,
          'color': 'darkgreen'
        });
        return false;
      }
      var diffs = diff(obj, compare);
      if (!diffs.errorMessage) {
        this.out('first ' + getType(obj) + ' has unique data:' + diffs.firstObjectDiff, {
          'test': true,
          'color': 'black',
          'background': 'lightblue'
        });
        this.out('second ' + getType(compare) + ' has unique data:' + diffs.secondObjectDiff, {
          'test': true,
          'color': 'black',
          'background': 'khaki'
        });
      } else {
        this.out(diffs.errorMessage, {
          'test': true,
          'color': 'black',
          'background': 'lightgray'
        });
        if (diffs.firstObjectDiff) {
          this.log(obj);
        }
        if (diffs.secondObjectDiff) {
          this.log(compare);
        }
      }
    };
    return this;
  }
  return Xcon.call(window.console);
}(format, expectation, obj_diff, is_equal, get_type);
}());