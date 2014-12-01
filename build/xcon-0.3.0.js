;(function() {
var get_type, condition, color_select, format, is_equal, expectation, obj_diff, mainjs;
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
    var type = getType(blob);
    switch (type) {
    case 'number':
    case 'boolean':
    case 'function':
      blob = blob.toString();
      break;
    case 'object':
    case 'array':
    case 'null':
      blob = JSON.stringify(blob);
      break;
    case 'string':
      blob = '"' + blob + '"';
      break;
    case 'undefined':
      blob = 'undefined';
      break;
    }
    return {
      'type': type,
      'text': blob
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
  
  function format(blob, opts) {
    opts = opts || {};
    var logMessage, logParams, props, type, text = blob, color = opts.color || colorSelect(), bg = opts.background || '#fff', fontWeight = opts.fnName ? 'bold' : 'normal';
    if (!opts.test) {
      props = condition(blob);
      type = props.type + ':\n';
      text = props.text || '';
      type = opts.error ? 'error:\n' : type;
      type = opts.fnName ? opts.fnName + '(' + opts.fnArgs + ') returns ' + type : type;
    }
    type = type || '';
    logMessage = '%c' + type + text;
    logParams = 'color:' + color + ';background:' + bg + ';font-weight:' + fontWeight;
    return [
      logMessage,
      logParams
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
        thing = thing.toString();
        otherThing = otherThing.toString();
        thing = thing.replace(/\s/gm, '');
        otherThing = otherThing.replace(/\s/gm, '');
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
    // if one of them is date, they must had equal valueOf
    if (thing instanceof Date || otherThing instanceof Date) {
      return false;
    }
    // if they are not function or strictly equal, they both need to be Objects
    if (!(thing instanceof Object) || !(otherThing instanceof Object)) {
      return false;
    }
    // arrays and objects can be considered equal in JavaScript.  We don't want that.
    if (getType(thing) !== getType(otherThing)) {
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
expectation = function (isEqual, getType, condition) {
  
  function Expectation(context, thing, opts) {
    opts = opts || {};
    var not = opts.not || false, passed = null, message = function () {
        var n, text = [
            passed ? 'PASSED: ' : 'FAILED: ',
            'expected ',
            getType(thing),
            ' ',
            condition(thing).text,
            ' '
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
      message(not ? 'not ' : '', 'to equal ', getType(otherThing), ' ', condition(otherThing).text);
      if (getType(thing) === getType(otherThing) && typeof thing === 'object' && !passed) {
        context.diff(thing, otherThing);
      }
    };
    this.toBeTruthy = function () {
      passed = not ? !thing : !!thing;
      message(not ? 'not ' : '', 'to be truthy');
    };
    this.toBeFalsy = function () {
      passed = not ? !!thing : !thing;
      message(not ? 'not ' : '', 'to be falsy');
    };
    this.toBeDefined = function () {
      passed = not ? thing === void 0 : thing !== void 0;
      message(not ? 'not ' : '', 'to be defined');
    };
    return this;
  }
  return Expectation;
}(is_equal, get_type, condition);
obj_diff = function (isEqual, getType) {
  
  function diff(obj, compare) {
    if (getType(obj) !== getType(compare)) {
      return false;
    }
    var called = false, objDiff, compareDiff, diffs;
    function trim(arr) {
      for (var n = arr.length - 1; n >= 0; n--) {
        if (arr[n] === void 0) {
          arr.splice(n, 1);
        }
        if (getType(arr[n]) === 'array') {
          trim(arr[n]);
        }
      }
      return arr;
    }
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
    function findUniqueData(first, second) {
      var unique, len, index, key, keys, currentPath = [];
      if (!called) {
        unique = clone(first);
        called = true;
      }
      function getPath(blob) {
        for (var i = 0; i < currentPath.length - 1; i++) {
          blob = blob[currentPath[i]];
        }
        return blob;
      }
      len = first.length || Object.keys(first).length;
      keys = getType(first) === 'object' ? Object.keys(first) : null;
      for (index = 0; index < len; index++) {
        key = getType(first) === 'array' ? index : keys[index];
        currentPath.push(key);
        if (first.hasOwnProperty(key) && isEqual(first[key], second[key])) {
          delete getPath(unique)[key];
        } else if (typeof first[key] === 'object' && second[key]) {
          findUniqueData(first[key], second[key]);
        }
        currentPath = [];
      }
      called = false;
      return unique;
    }
    objDiff = findUniqueData(obj, compare);
    compareDiff = findUniqueData(compare, obj);
    diffs = {
      'firstObjectDiff': getType(objDiff) === 'array' ? trim(objDiff) : objDiff,
      'secondObjectDiff': getType(compareDiff) === 'array' ? trim(compareDiff) : compareDiff
    };
    return diffs;
  }
  return diff;
}(is_equal, get_type);
mainjs = function (format, Expectation, diff, isEqual) {
  
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
      opts = opts || {};
      var logPart = format(blob, opts);
      this.log(logPart[0], logPart[1]);
      if (opts.log) {
        this.log(blob);
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
      this.out('first argument has unique data: ', {
        'test': true,
        'color': 'black',
        'background': 'oldlace'
      });
      this.log(diffs.firstObjectDiff);
      this.out('second argument has unique data: ', {
        'test': true,
        'color': 'black',
        'background': 'papayawhip'
      });
      this.log(diffs.secondObjectDiff);
    };
    return this;
  }
  return Xcon.call(window.console);
}(format, expectation, obj_diff, is_equal);
}());