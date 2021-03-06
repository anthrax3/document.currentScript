

// Inspect the polyfill-ability of this browser
var needsPolyfill = !("currentScript" in document);
var canDefineProp = typeof Object.defineProperty === "function" &&
  (function() {
    var result;
    try {
      Object.defineProperty(document, "_xyz", {
        get: function() {
          return "blah";
        },
        configurable: true
      });
      result = document._xyz === "blah";
      delete document._xyz;
    }
    catch (e) {
      result = false;
    }
    return result;
  })();


// Add the "private" property for testing, even if the real property can be polyfilled
document._currentScript = _currentEvaluatingScript;

// Polyfill it!
if (needsPolyfill && canDefineProp && typeof canPolyfill !== "undefined" && canPolyfill) {
  Object.defineProperty(document, "currentScript", {
    get: _currentEvaluatingScript
  });
}

})();
