/**
 * Created by Hsiang on 2017/3/9.
 * http://broofa.com/tests/ErrorProperties.htm
 */
(function() {
  var slice = Array.prototype.slice;

  // Detect the current scripts domain
  var scripts = document.getElementsByTagName('script');
  var isSameDomain = !/bitabove\.com/.test(scripts[scripts.length-1].src);
  var domain = isSameDomain ? 'Same-domain: ' : 'Cross-domain: ';

  // Feature detect based on error properties
  var sample = new Error();
  var client = {
    isIE: 'number' in sample,
    isChrome: !!window.chrome
  };

  // We want to test on browsers that don't have a console API, so whip
  // something up here ...
  var sys = {
    log: function(msg, type) {
      var el = document.createElement(type || 'div');
      el.innerHTML = msg.replace(/&/g, '&amp;').
      replace(/>/g, '&gt;').
      replace(/</g, '&lt;').
      replace(/ {2}/g, ' &nbsp;').
      replace(/\n/g, '<br />');
      document.body.appendChild(el);
    },

    dir: function(o) {
      sys.log(JSON.stringify(o, null, 2), 'pre');
    }
  };

  // The list of properties we've seen or heard about that *might* be directly
  // accessible.  E.g. console.dir(err) sometimes reveals more properties than
  // can be enumerated on an object.
  var KNOWN_PROPERTIES = ['arguments', 'description', 'fileName', 'line',
    'lineNumber', 'message', 'name', 'number', 'sourceURL', 'sourceId',
    'stack', 'stackTrace', 'type', 'url'];

  // Normalize Error objects across all browsers into something semi-standard.
  // Not all properties are will be available, but if they are, they'll at
  // least have a predictable property name.
  function normalizeError(err) {
    var o = {
      line: err.lineNumber || err.line,
      message: err.message,
      name: err.name,
      script: err.fileName || err.sourceURL,
      stack: err.stackTrace || err.stack
    };

    // Chrome doesn't provide script/line # properties in Error objects, and
    // only reports the script/line # of where an error was last rethrown (as
    // opposed to the original throw point).  So we scrape the stack trace to
    // get that info
    if (client.isChrome && err.stack &&
      /(\w{3,5}:\/\/[^:]+):(\d+)/.test(err.stack)) {
      o.script = RegExp.$1;
      o.line = RegExp.$2;
    }

    // Clear out undefined properties
    for (var k in o) {
      if (o[k] === null || o[k] === undefined) {
        delete o[k];
      }
    }
    return o;
  }

  // Log any/all information we can find in an Error object
  function logErr(err) {
    sys.log(domain + 'In "try {...} catch(err) {...}" contexts', 'h2');

    // See what declared properties it has
    if (Object.getOwnPropertyNames) {
      sys.log('ES5 declared properties (via "Object.getOwnPropertyNames(err)")', 'h3');
      var props = Object.getOwnPropertyNames(err);
      sys.dir(props);
    }

    // See which ones are enumerable
    sys.log('Enumerable properties (via "for (var k in err) {...}")', 'h3');
    var enumed = {};
    for (var k in err) {
      enumed[k] = true;
      sys.log(k + ': ' + err[k], 'li');
    }

    // Try directly accessing any of the properties we expect might be on an
    // Error object
    sys.log('Non-enumerable properties', 'h3');
    for (var i = 0; i < KNOWN_PROPERTIES.length; i++) {
      k = KNOWN_PROPERTIES[i];
      if (err[k] && !enumed[k]) {
        sys.log(k + ': ' + err[k], 'li');
      }
    }

    // Finally, output our normalized version of the object
    sys.log('Normalized error object', 'h3');
    var o = normalizeError(err);
    sys.dir(o);
  }

  //
  // "main"
  //

  // Some functions we use to create a stack
  function throwingFunction() {1/xxx;}

  function trappingFunction() {
    try {
      throwingFunction('123', 456, false);
    } catch (err) {
      logErr(err);
    }
  }

  function nontrappingFunction() {
    throwingFunction('789', 0xabc, true);
  }

  // trapError lets us record the properties of an exception object, and merge
  // those with the properties handed to the onerror reporter, which gives us
  // more information there
  function trapError(f) {
    return function() {
      try {
        f.apply(null, arguments);
      } catch (err) {
        var o = normalizeError(err);
        window.currentError = o;
        throw err;
      }
    };
  }

  // NOTE: IE6 does not call onerror when script debugging is enabled.
  var errorHandler = function(msg, script, line) {
    var err = window.currentError;
    // Note "delete window.currentError" here breaks IE
    window.currentError = null;
    if (!err) {
      sys.log(domain + 'In "window.onerror = function(args) {...}" context', 'h2');
      sys.log('args', 'h3');
      sys.dir(slice.call(arguments));
    } else {
      sys.log(domain + 'Trapped error info', 'h2');

      sys.log('err.line(' + err.line + ') === line argument(' + line + ')? ' + (err.line === line));
      if (!err.script) err.script = script;
      if (!err.line) err.line = line;
      sys.dir(err);
    }

    return true; // Suppress default browser error handling
  };

  //
  // Main
  //

  // Only log the client info once
  if (isSameDomain) {
    sys.log('Client info', 'h2');
    sys.dir(client);
  }

  var delay = 200;
  setTimeout(trappingFunction, delay);
  setTimeout(function() {
    window.onerror = errorHandler;
    nontrappingFunction();
  }, delay);
  setTimeout(function() {
    window.onerror = errorHandler;
    trapError(nontrappingFunction)();
  }, delay);
}());
