var _Symbol$metadata, _a$1$litPropertyMetad, _a$1$reactiveElementV, _t$litHtmlVersions, _globalThis$litElemen, _globalThis$litElemen2, _templateObject, _templateObject2;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e10) { throw _e10; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e11) { didErr = true; err = _e11; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1 = globalThis,
  e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s$2 = Symbol(),
  o$3 = new WeakMap();
var n$3 = /*#__PURE__*/function () {
  function n$3(t, e, o) {
    _classCallCheck(this, n$3);
    if (this._$cssResult$ = !0, o !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  _createClass(n$3, [{
    key: "styleSheet",
    get: function get() {
      var t = this.o;
      var s = this.t;
      if (e$2 && void 0 === t) {
        var _e2 = void 0 !== s && 1 === s.length;
        _e2 && (t = o$3.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), _e2 && o$3.set(s, t));
      }
      return t;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.cssText;
    }
  }]);
  return n$3;
}();
var r$4 = function r$4(t) {
    return new n$3("string" == typeof t ? t : t + "", void 0, s$2);
  },
  S$1 = function S$1(s, o) {
    if (e$2) s.adoptedStyleSheets = o.map(function (t) {
      return t instanceof CSSStyleSheet ? t : t.styleSheet;
    });else {
      var _iterator = _createForOfIteratorHelper(o),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _e3 = _step.value;
          var _o = document.createElement("style"),
            _n = t$1.litNonce;
          void 0 !== _n && _o.setAttribute("nonce", _n), _o.textContent = _e3.cssText, s.appendChild(_o);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  },
  c$2 = e$2 ? function (t) {
    return t;
  } : function (t) {
    return t instanceof CSSStyleSheet ? function (t) {
      var e = "";
      var _iterator2 = _createForOfIteratorHelper(t.cssRules),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _s = _step2.value;
          e += _s.cssText;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return r$4(e);
    }(t) : t;
  };

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i$1 = Object.is,
  e$1 = Object.defineProperty,
  r$3 = Object.getOwnPropertyDescriptor,
  h$1 = Object.getOwnPropertyNames,
  o$2 = Object.getOwnPropertySymbols,
  n$2 = Object.getPrototypeOf,
  a$1 = globalThis,
  c$1 = a$1.trustedTypes,
  l$1 = c$1 ? c$1.emptyScript : "",
  p$1 = a$1.reactiveElementPolyfillSupport,
  d$1 = function d$1(t, s) {
    return t;
  },
  u$1 = {
    toAttribute: function toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? l$1 : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute: function fromAttribute(t, s) {
      var i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    }
  },
  f$1 = function f$1(t, s) {
    return !i$1(t, s);
  },
  y$1 = {
    attribute: !0,
    type: String,
    converter: u$1,
    reflect: !1,
    hasChanged: f$1
  };
(_Symbol$metadata = Symbol.metadata) !== null && _Symbol$metadata !== void 0 ? _Symbol$metadata : Symbol.metadata = Symbol("metadata"), (_a$1$litPropertyMetad = a$1.litPropertyMetadata) !== null && _a$1$litPropertyMetad !== void 0 ? _a$1$litPropertyMetad : a$1.litPropertyMetadata = new WeakMap();
var b = /*#__PURE__*/function (_HTMLElement) {
  _inherits(b, _HTMLElement);
  var _super = _createSuper(b);
  function b() {
    var _this;
    _classCallCheck(this, b);
    _this = _super.call(this), _this._$Ep = void 0, _this.isUpdatePending = !1, _this.hasUpdated = !1, _this._$Em = null, _this._$Ev();
    return _this;
  }
  _createClass(b, [{
    key: "_$Ev",
    value: function _$Ev() {
      var _this2 = this,
        _this$constructor$l;
      this._$Eg = new Promise(function (t) {
        return _this2.enableUpdating = t;
      }), this._$AL = new Map(), this._$ES(), this.requestUpdate(), (_this$constructor$l = this.constructor.l) === null || _this$constructor$l === void 0 ? void 0 : _this$constructor$l.forEach(function (t) {
        return t(_this2);
      });
    }
  }, {
    key: "addController",
    value: function addController(t) {
      var _this$_$E_, _t$hostConnected;
      ((_this$_$E_ = this._$E_) !== null && _this$_$E_ !== void 0 ? _this$_$E_ : this._$E_ = new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && ((_t$hostConnected = t.hostConnected) === null || _t$hostConnected === void 0 ? void 0 : _t$hostConnected.call(t));
    }
  }, {
    key: "removeController",
    value: function removeController(t) {
      var _this$_$E_2;
      (_this$_$E_2 = this._$E_) === null || _this$_$E_2 === void 0 || _this$_$E_2["delete"](t);
    }
  }, {
    key: "_$ES",
    value: function _$ES() {
      var t = new Map(),
        s = this.constructor.elementProperties;
      var _iterator3 = _createForOfIteratorHelper(s.keys()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _i = _step3.value;
          this.hasOwnProperty(_i) && (t.set(_i, this[_i]), delete this[_i]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      t.size > 0 && (this._$Ep = t);
    }
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _this$shadowRoot;
      var t = (_this$shadowRoot = this.shadowRoot) !== null && _this$shadowRoot !== void 0 ? _this$shadowRoot : this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(t, this.constructor.elementStyles), t;
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$renderRoot, _this$_$E_3;
      (_this$renderRoot = this.renderRoot) !== null && _this$renderRoot !== void 0 ? _this$renderRoot : this.renderRoot = this.createRenderRoot(), this.enableUpdating(!0), (_this$_$E_3 = this._$E_) === null || _this$_$E_3 === void 0 ? void 0 : _this$_$E_3.forEach(function (t) {
        var _t$hostConnected2;
        return (_t$hostConnected2 = t.hostConnected) === null || _t$hostConnected2 === void 0 ? void 0 : _t$hostConnected2.call(t);
      });
    }
  }, {
    key: "enableUpdating",
    value: function enableUpdating(t) {}
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$_$E_4;
      (_this$_$E_4 = this._$E_) === null || _this$_$E_4 === void 0 || _this$_$E_4.forEach(function (t) {
        var _t$hostDisconnected;
        return (_t$hostDisconnected = t.hostDisconnected) === null || _t$hostDisconnected === void 0 ? void 0 : _t$hostDisconnected.call(t);
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
  }, {
    key: "_$EO",
    value: function _$EO(t, s) {
      var i = this.constructor.elementProperties.get(t),
        e = this.constructor._$Eu(t, i);
      if (void 0 !== e && !0 === i.reflect) {
        var _i$converter;
        var _r = (void 0 !== ((_i$converter = i.converter) === null || _i$converter === void 0 ? void 0 : _i$converter.toAttribute) ? i.converter : u$1).toAttribute(s, i.type);
        this._$Em = t, null == _r ? this.removeAttribute(e) : this.setAttribute(e, _r), this._$Em = null;
      }
    }
  }, {
    key: "_$AK",
    value: function _$AK(t, s) {
      var i = this.constructor,
        e = i._$Eh.get(t);
      if (void 0 !== e && this._$Em !== e) {
        var _t$converter;
        var _t = i.getPropertyOptions(e),
          _r2 = "function" == typeof _t.converter ? {
            fromAttribute: _t.converter
          } : void 0 !== ((_t$converter = _t.converter) === null || _t$converter === void 0 ? void 0 : _t$converter.fromAttribute) ? _t.converter : u$1;
        this._$Em = e, this[e] = _r2.fromAttribute(s, _t.type), this._$Em = null;
      }
    }
  }, {
    key: "requestUpdate",
    value: function requestUpdate(t, s, i) {
      var e = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var r = arguments.length > 4 ? arguments[4] : undefined;
      if (void 0 !== t) {
        var _i2, _i$hasChanged;
        if ((_i2 = i) !== null && _i2 !== void 0 ? _i2 : i = this.constructor.getPropertyOptions(t), !((_i$hasChanged = i.hasChanged) !== null && _i$hasChanged !== void 0 ? _i$hasChanged : f$1)(e ? r : this[t], s)) return;
        this.C(t, s, i);
      }
      !1 === this.isUpdatePending && (this._$Eg = this._$EP());
    }
  }, {
    key: "C",
    value: function C(t, s, i) {
      var _this$_$Ej;
      this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && ((_this$_$Ej = this._$Ej) !== null && _this$_$Ej !== void 0 ? _this$_$Ej : this._$Ej = new Set()).add(t);
    }
  }, {
    key: "_$EP",
    value: function () {
      var _$EP2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var t;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.isUpdatePending = !0;
              _context.prev = 1;
              _context.next = 4;
              return this._$Eg;
            case 4:
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              Promise.reject(_context.t0);
            case 9:
              t = this.scheduleUpdate();
              _context.t1 = null != t;
              if (!_context.t1) {
                _context.next = 14;
                break;
              }
              _context.next = 14;
              return t;
            case 14:
              return _context.abrupt("return", !this.isUpdatePending);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 6]]);
      }));
      function _$EP() {
        return _$EP2.apply(this, arguments);
      }
      return _$EP;
    }()
  }, {
    key: "scheduleUpdate",
    value: function scheduleUpdate() {
      return this.performUpdate();
    }
  }, {
    key: "performUpdate",
    value: function performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        var _this$renderRoot2;
        if ((_this$renderRoot2 = this.renderRoot) !== null && _this$renderRoot2 !== void 0 ? _this$renderRoot2 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
          var _iterator4 = _createForOfIteratorHelper(this._$Ep),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _step4$value = _slicedToArray(_step4.value, 2),
                _t2 = _step4$value[0],
                _s2 = _step4$value[1];
              this[_t2] = _s2;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          this._$Ep = void 0;
        }
        var _t3 = this.constructor.elementProperties;
        if (_t3.size > 0) {
          var _iterator5 = _createForOfIteratorHelper(_t3),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = _slicedToArray(_step5.value, 2),
                _s3 = _step5$value[0],
                _i3 = _step5$value[1];
              !0 !== _i3.wrapped || this._$AL.has(_s3) || void 0 === this[_s3] || this.C(_s3, this[_s3], _i3);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
      var t = !1;
      var s = this._$AL;
      try {
        var _this$_$E_5;
        t = this.shouldUpdate(s), t ? (this.willUpdate(s), (_this$_$E_5 = this._$E_) !== null && _this$_$E_5 !== void 0 && _this$_$E_5.forEach(function (t) {
          var _t$hostUpdate;
          return (_t$hostUpdate = t.hostUpdate) === null || _t$hostUpdate === void 0 ? void 0 : _t$hostUpdate.call(t);
        }), this.update(s)) : this._$ET();
      } catch (s) {
        throw t = !1, this._$ET(), s;
      }
      t && this._$AE(s);
    }
  }, {
    key: "willUpdate",
    value: function willUpdate(t) {}
  }, {
    key: "_$AE",
    value: function _$AE(t) {
      var _this$_$E_6;
      (_this$_$E_6 = this._$E_) !== null && _this$_$E_6 !== void 0 && _this$_$E_6.forEach(function (t) {
        var _t$hostUpdated;
        return (_t$hostUpdated = t.hostUpdated) === null || _t$hostUpdated === void 0 ? void 0 : _t$hostUpdated.call(t);
      }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
  }, {
    key: "_$ET",
    value: function _$ET() {
      this._$AL = new Map(), this.isUpdatePending = !1;
    }
  }, {
    key: "updateComplete",
    get: function get() {
      return this.getUpdateComplete();
    }
  }, {
    key: "getUpdateComplete",
    value: function getUpdateComplete() {
      return this._$Eg;
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(t) {
      return !0;
    }
  }, {
    key: "update",
    value: function update(t) {
      var _this3 = this;
      this._$Ej && (this._$Ej = this._$Ej.forEach(function (t) {
        return _this3._$EO(t, _this3[t]);
      })), this._$ET();
    }
  }, {
    key: "updated",
    value: function updated(t) {}
  }, {
    key: "firstUpdated",
    value: function firstUpdated(t) {}
  }], [{
    key: "addInitializer",
    value: function addInitializer(t) {
      var _this$l;
      this._$Ei(), ((_this$l = this.l) !== null && _this$l !== void 0 ? _this$l : this.l = []).push(t);
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return this.finalize(), this._$Eh && _toConsumableArray(this._$Eh.keys());
    }
  }, {
    key: "createProperty",
    value: function createProperty(t) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : y$1;
      if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
        var _i4 = Symbol(),
          _r3 = this.getPropertyDescriptor(t, _i4, s);
        void 0 !== _r3 && e$1(this.prototype, t, _r3);
      }
    }
  }, {
    key: "getPropertyDescriptor",
    value: function getPropertyDescriptor(t, s, i) {
      var _r$;
      var _ref = (_r$ = r$3(this.prototype, t)) !== null && _r$ !== void 0 ? _r$ : {
          get: function get() {
            return this[s];
          },
          set: function set(t) {
            this[s] = t;
          }
        },
        e = _ref.get,
        h = _ref.set;
      return {
        get: function get() {
          return e === null || e === void 0 ? void 0 : e.call(this);
        },
        set: function set(s) {
          var r = e === null || e === void 0 ? void 0 : e.call(this);
          h.call(this, s), this.requestUpdate(t, r, i);
        },
        configurable: !0,
        enumerable: !0
      };
    }
  }, {
    key: "getPropertyOptions",
    value: function getPropertyOptions(t) {
      var _this$elementProperti;
      return (_this$elementProperti = this.elementProperties.get(t)) !== null && _this$elementProperti !== void 0 ? _this$elementProperti : y$1;
    }
  }, {
    key: "_$Ei",
    value: function _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties"))) return;
      var t = n$2(this);
      t.finalize(), void 0 !== t.l && (this.l = _toConsumableArray(t.l)), this.elementProperties = new Map(t.elementProperties);
    }
  }, {
    key: "finalize",
    value: function finalize() {
      if (this.hasOwnProperty(d$1("finalized"))) return;
      if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        var _t4 = this.properties,
          _s4 = [].concat(_toConsumableArray(h$1(_t4)), _toConsumableArray(o$2(_t4)));
        var _iterator6 = _createForOfIteratorHelper(_s4),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _i5 = _step6.value;
            this.createProperty(_i5, _t4[_i5]);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
      var t = this[Symbol.metadata];
      if (null !== t) {
        var _s5 = litPropertyMetadata.get(t);
        if (void 0 !== _s5) {
          var _iterator7 = _createForOfIteratorHelper(_s5),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var _step7$value = _slicedToArray(_step7.value, 2),
                _t5 = _step7$value[0],
                _i6 = _step7$value[1];
              this.elementProperties.set(_t5, _i6);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
      }
      this._$Eh = new Map();
      var _iterator8 = _createForOfIteratorHelper(this.elementProperties),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = _slicedToArray(_step8.value, 2),
            _t6 = _step8$value[0],
            _s6 = _step8$value[1];
          var _i7 = this._$Eu(_t6, _s6);
          void 0 !== _i7 && this._$Eh.set(_i7, _t6);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
  }, {
    key: "finalizeStyles",
    value: function finalizeStyles(s) {
      var i = [];
      if (Array.isArray(s)) {
        var _e4 = new Set(s.flat(1 / 0).reverse());
        var _iterator9 = _createForOfIteratorHelper(_e4),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _s7 = _step9.value;
            i.unshift(c$2(_s7));
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      } else void 0 !== s && i.push(c$2(s));
      return i;
    }
  }, {
    key: "_$Eu",
    value: function _$Eu(t, s) {
      var i = s.attribute;
      return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
  }]);
  return b;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
b.elementStyles = [], b.shadowRootOptions = {
  mode: "open"
}, b[d$1("elementProperties")] = new Map(), b[d$1("finalized")] = new Map(), p$1 !== null && p$1 !== void 0 && p$1({
  ReactiveElement: b
}), ((_a$1$reactiveElementV = a$1.reactiveElementVersions) !== null && _a$1$reactiveElementV !== void 0 ? _a$1$reactiveElementV : a$1.reactiveElementVersions = []).push("2.0.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t = globalThis,
  i = t.trustedTypes,
  s$1 = i ? i.createPolicy("lit-html", {
    createHTML: function createHTML(t) {
      return t;
    }
  }) : void 0,
  e = "$lit$",
  h = "lit$".concat((Math.random() + "").slice(9), "$"),
  o$1 = "?" + h,
  n$1 = "<".concat(o$1, ">"),
  r$2 = document,
  l = function l() {
    return r$2.createComment("");
  },
  c = function c(t) {
    return null === t || "object" != _typeof(t) && "function" != typeof t;
  },
  a = Array.isArray,
  u = function u(t) {
    return a(t) || "function" == typeof (t === null || t === void 0 ? void 0 : t[Symbol.iterator]);
  },
  d = "[ \t\n\f\r]",
  f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v = /-->/g,
  _ = />/g,
  m = RegExp(">|".concat(d, "(?:([^\\s\"'>=/]+)(").concat(d, "*=").concat(d, "*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)"), "g"),
  p = /'/g,
  g = /"/g,
  $ = /^(?:script|style|textarea|title)$/i,
  y = function y(t) {
    return function (i) {
      for (var _len = arguments.length, s = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        s[_key - 1] = arguments[_key];
      }
      return {
        _$litType$: t,
        strings: i,
        values: s
      };
    };
  },
  x = y(1),
  w = Symbol["for"]("lit-noChange"),
  T = Symbol["for"]("lit-nothing"),
  A = new WeakMap(),
  E = r$2.createTreeWalker(r$2, 129);
function C(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i) : i;
}
var P = function P(t, i) {
  var s = t.length - 1,
    o = [];
  var r,
    l = 2 === i ? "<svg>" : "",
    c = f;
  for (var _i8 = 0; _i8 < s; _i8++) {
    var _s8 = t[_i8];
    var _a2 = void 0,
      _u = void 0,
      _d2 = -1,
      _y = 0;
    for (; _y < _s8.length && (c.lastIndex = _y, _u = c.exec(_s8), null !== _u);) {
      var _r4;
      _y = c.lastIndex, c === f ? "!--" === _u[1] ? c = v : void 0 !== _u[1] ? c = _ : void 0 !== _u[2] ? ($.test(_u[2]) && (r = RegExp("</" + _u[2], "g")), c = m) : void 0 !== _u[3] && (c = m) : c === m ? ">" === _u[0] ? (c = (_r4 = r) !== null && _r4 !== void 0 ? _r4 : f, _d2 = -1) : void 0 === _u[1] ? _d2 = -2 : (_d2 = c.lastIndex - _u[2].length, _a2 = _u[1], c = void 0 === _u[3] ? m : '"' === _u[3] ? g : p) : c === g || c === p ? c = m : c === v || c === _ ? c = f : (c = m, r = void 0);
    }
    var _x = c === m && t[_i8 + 1].startsWith("/>") ? " " : "";
    l += c === f ? _s8 + n$1 : _d2 >= 0 ? (o.push(_a2), _s8.slice(0, _d2) + e + _s8.slice(_d2) + h + _x) : _s8 + h + (-2 === _d2 ? _i8 : _x);
  }
  return [C(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : "")), o];
};
var V = /*#__PURE__*/function () {
  function V(_ref2, n) {
    var t = _ref2.strings,
      s = _ref2._$litType$;
    _classCallCheck(this, V);
    var r;
    this.parts = [];
    var c = 0,
      a = 0;
    var u = t.length - 1,
      d = this.parts,
      _P = P(t, s),
      _P2 = _slicedToArray(_P, 2),
      f = _P2[0],
      v = _P2[1];
    if (this.el = V.createElement(f, n), E.currentNode = this.el.content, 2 === s) {
      var _t7 = this.el.content.firstChild;
      _t7.replaceWith.apply(_t7, _toConsumableArray(_t7.childNodes));
    }
    for (; null !== (r = E.nextNode()) && d.length < u;) {
      if (1 === r.nodeType) {
        if (r.hasAttributes()) {
          var _iterator10 = _createForOfIteratorHelper(r.getAttributeNames()),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var _t8 = _step10.value;
              if (_t8.endsWith(e)) {
                var _i9 = v[a++],
                  _s9 = r.getAttribute(_t8).split(h),
                  _e5 = /([.?@])?(.*)/.exec(_i9);
                d.push({
                  type: 1,
                  index: c,
                  name: _e5[2],
                  strings: _s9,
                  ctor: "." === _e5[1] ? k : "?" === _e5[1] ? H : "@" === _e5[1] ? I : R
                }), r.removeAttribute(_t8);
              } else _t8.startsWith(h) && (d.push({
                type: 6,
                index: c
              }), r.removeAttribute(_t8));
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
        if ($.test(r.tagName)) {
          var _t9 = r.textContent.split(h),
            _s10 = _t9.length - 1;
          if (_s10 > 0) {
            r.textContent = i ? i.emptyScript : "";
            for (var _i10 = 0; _i10 < _s10; _i10++) r.append(_t9[_i10], l()), E.nextNode(), d.push({
              type: 2,
              index: ++c
            });
            r.append(_t9[_s10], l());
          }
        }
      } else if (8 === r.nodeType) if (r.data === o$1) d.push({
        type: 2,
        index: c
      });else {
        var _t10 = -1;
        for (; -1 !== (_t10 = r.data.indexOf(h, _t10 + 1));) d.push({
          type: 7,
          index: c
        }), _t10 += h.length - 1;
      }
      c++;
    }
  }
  _createClass(V, null, [{
    key: "createElement",
    value: function createElement(t, i) {
      var s = r$2.createElement("template");
      return s.innerHTML = t, s;
    }
  }]);
  return V;
}();
function N(t, i) {
  var _s$_$Co, _h, _h2, _h2$_$AO, _s$_$Co2;
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
  var e = arguments.length > 3 ? arguments[3] : undefined;
  if (i === w) return i;
  var h = void 0 !== e ? (_s$_$Co = s._$Co) === null || _s$_$Co === void 0 ? void 0 : _s$_$Co[e] : s._$Cl;
  var o = c(i) ? void 0 : i._$litDirective$;
  return ((_h = h) === null || _h === void 0 ? void 0 : _h.constructor) !== o && ((_h2 = h) !== null && _h2 !== void 0 && (_h2$_$AO = _h2._$AO) !== null && _h2$_$AO !== void 0 && _h2$_$AO.call(_h2, !1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? ((_s$_$Co2 = s._$Co) !== null && _s$_$Co2 !== void 0 ? _s$_$Co2 : s._$Co = [])[e] = h : s._$Cl = h), void 0 !== h && (i = N(t, h._$AS(t, i.values), h, e)), i;
}
var S = /*#__PURE__*/function () {
  function S(t, i) {
    _classCallCheck(this, S);
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  _createClass(S, [{
    key: "parentNode",
    get: function get() {
      return this._$AM.parentNode;
    }
  }, {
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "u",
    value: function u(t) {
      var _t$creationScope;
      var _this$_$AD = this._$AD,
        i = _this$_$AD.el.content,
        s = _this$_$AD.parts,
        e = ((_t$creationScope = t === null || t === void 0 ? void 0 : t.creationScope) !== null && _t$creationScope !== void 0 ? _t$creationScope : r$2).importNode(i, !0);
      E.currentNode = e;
      var h = E.nextNode(),
        o = 0,
        n = 0,
        l = s[0];
      for (; void 0 !== l;) {
        var _l;
        if (o === l.index) {
          var _i11 = void 0;
          2 === l.type ? _i11 = new M(h, h.nextSibling, this, t) : 1 === l.type ? _i11 = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (_i11 = new L(h, this, t)), this._$AV.push(_i11), l = s[++n];
        }
        o !== ((_l = l) === null || _l === void 0 ? void 0 : _l.index) && (h = E.nextNode(), o++);
      }
      return E.currentNode = r$2, e;
    }
  }, {
    key: "p",
    value: function p(t) {
      var i = 0;
      var _iterator11 = _createForOfIteratorHelper(this._$AV),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _s11 = _step11.value;
          void 0 !== _s11 && (void 0 !== _s11.strings ? (_s11._$AI(t, _s11, i), i += _s11.strings.length - 2) : _s11._$AI(t[i])), i++;
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }]);
  return S;
}();
var M = /*#__PURE__*/function () {
  function M(t, i, s, e) {
    var _e$isConnected;
    _classCallCheck(this, M);
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = (_e$isConnected = e === null || e === void 0 ? void 0 : e.isConnected) !== null && _e$isConnected !== void 0 ? _e$isConnected : !0;
  }
  _createClass(M, [{
    key: "_$AU",
    get: function get() {
      var _this$_$AM$_$AU, _this$_$AM;
      return (_this$_$AM$_$AU = (_this$_$AM = this._$AM) === null || _this$_$AM === void 0 ? void 0 : _this$_$AM._$AU) !== null && _this$_$AM$_$AU !== void 0 ? _this$_$AM$_$AU : this._$Cv;
    }
  }, {
    key: "parentNode",
    get: function get() {
      var _t11;
      var t = this._$AA.parentNode;
      var i = this._$AM;
      return void 0 !== i && 11 === ((_t11 = t) === null || _t11 === void 0 ? void 0 : _t11.nodeType) && (t = i.parentNode), t;
    }
  }, {
    key: "startNode",
    get: function get() {
      return this._$AA;
    }
  }, {
    key: "endNode",
    get: function get() {
      return this._$AB;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      t = N(this, t, i), c(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== w && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : u(t) ? this.T(t) : this._(t);
    }
  }, {
    key: "k",
    value: function k(t) {
      return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
  }, {
    key: "$",
    value: function $(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
    }
  }, {
    key: "_",
    value: function _(t) {
      this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t : this.$(r$2.createTextNode(t)), this._$AH = t;
    }
  }, {
    key: "g",
    value: function g(t) {
      var _this$_$AH;
      var i = t.values,
        s = t._$litType$,
        e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = V.createElement(C(s.h, s.h[0]), this.options)), s);
      if (((_this$_$AH = this._$AH) === null || _this$_$AH === void 0 ? void 0 : _this$_$AH._$AD) === e) this._$AH.p(i);else {
        var _t12 = new S(e, this),
          _s12 = _t12.u(this.options);
        _t12.p(i), this.$(_s12), this._$AH = _t12;
      }
    }
  }, {
    key: "_$AC",
    value: function _$AC(t) {
      var i = A.get(t.strings);
      return void 0 === i && A.set(t.strings, i = new V(t)), i;
    }
  }, {
    key: "T",
    value: function T(t) {
      a(this._$AH) || (this._$AH = [], this._$AR());
      var i = this._$AH;
      var s,
        e = 0;
      var _iterator12 = _createForOfIteratorHelper(t),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _h3 = _step12.value;
          e === i.length ? i.push(s = new M(this.k(l()), this.k(l()), this, this.options)) : s = i[e], s._$AI(_h3), e++;
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
  }, {
    key: "_$AR",
    value: function _$AR() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
      var i = arguments.length > 1 ? arguments[1] : undefined;
      for ((_this$_$AP = this._$AP) === null || _this$_$AP === void 0 ? void 0 : _this$_$AP.call(this, !1, !0, i); t && t !== this._$AB;) {
        var _this$_$AP;
        var _i12 = t.nextSibling;
        t.remove(), t = _i12;
      }
    }
  }, {
    key: "setConnected",
    value: function setConnected(t) {
      var _this$_$AP2;
      void 0 === this._$AM && (this._$Cv = t, (_this$_$AP2 = this._$AP) === null || _this$_$AP2 === void 0 ? void 0 : _this$_$AP2.call(this, t));
    }
  }]);
  return M;
}();
var R = /*#__PURE__*/function () {
  function R(t, i, s, e, h) {
    _classCallCheck(this, R);
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }
  _createClass(R, [{
    key: "tagName",
    get: function get() {
      return this.element.tagName;
    }
  }, {
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var s = arguments.length > 2 ? arguments[2] : undefined;
      var e = arguments.length > 3 ? arguments[3] : undefined;
      var h = this.strings;
      var o = !1;
      if (void 0 === h) t = N(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== w, o && (this._$AH = t);else {
        var _e6 = t;
        var _n2, _r5;
        for (t = h[0], _n2 = 0; _n2 < h.length - 1; _n2++) {
          var _r6;
          _r5 = N(this, _e6[s + _n2], i, _n2), _r5 === w && (_r5 = this._$AH[_n2]), o || (o = !c(_r5) || _r5 !== this._$AH[_n2]), _r5 === T ? t = T : t !== T && (t += ((_r6 = _r5) !== null && _r6 !== void 0 ? _r6 : "") + h[_n2 + 1]), this._$AH[_n2] = _r5;
        }
      }
      o && !e && this.O(t);
    }
  }, {
    key: "O",
    value: function O(t) {
      t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t !== null && t !== void 0 ? t : "");
    }
  }]);
  return R;
}();
var k = /*#__PURE__*/function (_R) {
  _inherits(k, _R);
  var _super2 = _createSuper(k);
  function k() {
    var _this4;
    _classCallCheck(this, k);
    _this4 = _super2.apply(this, arguments), _this4.type = 3;
    return _this4;
  }
  _createClass(k, [{
    key: "O",
    value: function O(t) {
      this.element[this.name] = t === T ? void 0 : t;
    }
  }]);
  return k;
}(R);
var H = /*#__PURE__*/function (_R2) {
  _inherits(H, _R2);
  var _super3 = _createSuper(H);
  function H() {
    var _this5;
    _classCallCheck(this, H);
    _this5 = _super3.apply(this, arguments), _this5.type = 4;
    return _this5;
  }
  _createClass(H, [{
    key: "O",
    value: function O(t) {
      this.element.toggleAttribute(this.name, !!t && t !== T);
    }
  }]);
  return H;
}(R);
var I = /*#__PURE__*/function (_R3) {
  _inherits(I, _R3);
  var _super4 = _createSuper(I);
  function I(t, i, s, e, h) {
    var _this6;
    _classCallCheck(this, I);
    _this6 = _super4.call(this, t, i, s, e, h), _this6.type = 5;
    return _this6;
  }
  _createClass(I, [{
    key: "_$AI",
    value: function _$AI(t) {
      var _N;
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      if ((t = (_N = N(this, t, i, 0)) !== null && _N !== void 0 ? _N : T) === w) return;
      var s = this._$AH,
        e = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
        h = t !== T && (s === T || e);
      e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(t) {
      var _this$options$host, _this$options;
      "function" == typeof this._$AH ? this._$AH.call((_this$options$host = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.host) !== null && _this$options$host !== void 0 ? _this$options$host : this.element, t) : this._$AH.handleEvent(t);
    }
  }]);
  return I;
}(R);
var L = /*#__PURE__*/function () {
  function L(t, i, s) {
    _classCallCheck(this, L);
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  _createClass(L, [{
    key: "_$AU",
    get: function get() {
      return this._$AM._$AU;
    }
  }, {
    key: "_$AI",
    value: function _$AI(t) {
      N(this, t);
    }
  }]);
  return L;
}();
var Z = t.litHtmlPolyfillSupport;
Z !== null && Z !== void 0 && Z(V, M), ((_t$litHtmlVersions = t.litHtmlVersions) !== null && _t$litHtmlVersions !== void 0 ? _t$litHtmlVersions : t.litHtmlVersions = []).push("3.1.0");
var j = function j(t, i, s) {
  var _s$renderBefore;
  var e = (_s$renderBefore = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore !== void 0 ? _s$renderBefore : i;
  var h = e._$litPart$;
  if (void 0 === h) {
    var _s$renderBefore2;
    var _t13 = (_s$renderBefore2 = s === null || s === void 0 ? void 0 : s.renderBefore) !== null && _s$renderBefore2 !== void 0 ? _s$renderBefore2 : null;
    e._$litPart$ = h = new M(i.insertBefore(l(), _t13), _t13, void 0, s !== null && s !== void 0 ? s : {});
  }
  return h._$AI(t), h;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s = /*#__PURE__*/function (_b2) {
  _inherits(s, _b2);
  var _super5 = _createSuper(s);
  function s() {
    var _this7;
    _classCallCheck(this, s);
    _this7 = _super5.apply(this, arguments), _this7.renderOptions = {
      host: _assertThisInitialized(_this7)
    }, _this7._$Do = void 0;
    return _this7;
  }
  _createClass(s, [{
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _this$renderOptions, _this$renderOptions$r;
      var t = _get(_getPrototypeOf(s.prototype), "createRenderRoot", this).call(this);
      return (_this$renderOptions$r = (_this$renderOptions = this.renderOptions).renderBefore) !== null && _this$renderOptions$r !== void 0 ? _this$renderOptions$r : _this$renderOptions.renderBefore = t.firstChild, t;
    }
  }, {
    key: "update",
    value: function update(t) {
      var i = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), _get(_getPrototypeOf(s.prototype), "update", this).call(this, t), this._$Do = j(i, this.renderRoot, this.renderOptions);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this$_$Do;
      _get(_getPrototypeOf(s.prototype), "connectedCallback", this).call(this), (_this$_$Do = this._$Do) === null || _this$_$Do === void 0 ? void 0 : _this$_$Do.setConnected(!0);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$_$Do2;
      _get(_getPrototypeOf(s.prototype), "disconnectedCallback", this).call(this), (_this$_$Do2 = this._$Do) === null || _this$_$Do2 === void 0 ? void 0 : _this$_$Do2.setConnected(!1);
    }
  }, {
    key: "render",
    value: function render() {
      return w;
    }
  }]);
  return s;
}(b);
s._$litElement$ = !0, s["finalized"] = !0, (_globalThis$litElemen = globalThis.litElementHydrateSupport) === null || _globalThis$litElemen === void 0 ? void 0 : _globalThis$litElemen.call(globalThis, {
  LitElement: s
});
var r$1 = globalThis.litElementPolyfillSupport;
r$1 === null || r$1 === void 0 || r$1({
  LitElement: s
});
((_globalThis$litElemen2 = globalThis.litElementVersions) !== null && _globalThis$litElemen2 !== void 0 ? _globalThis$litElemen2 : globalThis.litElementVersions = []).push("4.0.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var o = {
    attribute: !0,
    type: String,
    converter: u$1,
    reflect: !1,
    hasChanged: f$1
  },
  r = function r() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : o;
    var e = arguments.length > 1 ? arguments[1] : undefined;
    var r = arguments.length > 2 ? arguments[2] : undefined;
    var n = r.kind,
      i = r.metadata;
    var s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map()), s.set(r.name, t), "accessor" === n) {
      var _o2 = r.name;
      return {
        set: function set(r) {
          var n = e.get.call(this);
          e.set.call(this, r), this.requestUpdate(_o2, n, t);
        },
        init: function init(e) {
          return void 0 !== e && this.C(_o2, void 0, t), e;
        }
      };
    }
    if ("setter" === n) {
      var _o3 = r.name;
      return function (r) {
        var n = this[_o3];
        e.call(this, r), this.requestUpdate(_o3, n, t);
      };
    }
    throw Error("Unsupported decorator location: " + n);
  };
function n(t) {
  return function (e, o) {
    return "object" == _typeof(o) ? r(t, e, o) : function (t, e, o) {
      var r = e.hasOwnProperty(o);
      return e.constructor.createProperty(o, r ? _objectSpread(_objectSpread({}, t), {}, {
        wrapped: !0
      }) : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
    }(t, e, o);
  };
}
function hass_base_el() {
  return _hass_base_el.apply(this, arguments);
}
function _hass_base_el() {
  _hass_base_el = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
    var element;
    return _regeneratorRuntime().wrap(function _callee23$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return Promise.race([customElements.whenDefined("home-assistant"), customElements.whenDefined("hc-main")]);
        case 2:
          element = customElements.get("home-assistant") ? "home-assistant" : "hc-main";
        case 3:
          if (document.querySelector(element)) {
            _context25.next = 8;
            break;
          }
          _context25.next = 6;
          return new Promise(function (r) {
            return window.setTimeout(r, 100);
          });
        case 6:
          _context25.next = 3;
          break;
        case 8:
          return _context25.abrupt("return", document.querySelector(element));
        case 9:
        case "end":
          return _context25.stop();
      }
    }, _callee23);
  }));
  return _hass_base_el.apply(this, arguments);
}
function hass() {
  return _hass.apply(this, arguments);
}
function _hass() {
  _hass = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    var base;
    return _regeneratorRuntime().wrap(function _callee24$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return hass_base_el();
        case 2:
          base = _context26.sent;
        case 3:
          if (base.hass) {
            _context26.next = 8;
            break;
          }
          _context26.next = 6;
          return new Promise(function (r) {
            return window.setTimeout(r, 100);
          });
        case 6:
          _context26.next = 3;
          break;
        case 8:
          return _context26.abrupt("return", base.hass);
        case 9:
        case "end":
          return _context26.stop();
      }
    }, _callee24);
  }));
  return _hass.apply(this, arguments);
}
var ID_STORAGE_KEY = "browser_mod-browser-id";
function BrowserID() {
  if (document.querySelector("hc-main")) return "CAST";
  if (localStorage[ID_STORAGE_KEY]) return localStorage[ID_STORAGE_KEY];
  return "";
}
window.cardMod_template_cache = window.cardMod_template_cache || {};
var cachedTemplates = window.cardMod_template_cache;
function template_updated(key, result) {
  var cache = cachedTemplates[key];
  if (!cache) {
    return;
  }
  cache.value = result.result;
  cache.callbacks.forEach(function (f) {
    return f(result.result);
  });
}
function hasTemplate(str) {
  if (!str) return false;
  return String(str).includes("{%") || String(str).includes("{{");
}
function bind_template(_x2, _x3, _x4) {
  return _bind_template.apply(this, arguments);
}
function _bind_template() {
  _bind_template = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(callback, template, variables) {
    var hs, connection, cacheKey, cache;
    return _regeneratorRuntime().wrap(function _callee25$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return hass();
        case 2:
          hs = _context27.sent;
          connection = hs.connection;
          cacheKey = JSON.stringify([template, variables]);
          cache = cachedTemplates[cacheKey];
          if (!cache) {
            unbind_template(callback);
            callback("");
            variables = Object.assign({
              user: hs.user.name,
              browser: BrowserID(),
              hash: location.hash.substr(1) || ""
            }, variables);
            cachedTemplates[cacheKey] = cache = {
              template: template,
              variables: variables,
              value: "",
              callbacks: new Set([callback]),
              unsubscribe: connection.subscribeMessage(function (result) {
                return template_updated(cacheKey, result);
              }, {
                type: "render_template",
                template: template,
                variables: variables
              })
            };
          } else {
            if (!cache.callbacks.has(callback)) unbind_template(callback);
            callback(cache.value);
            cache.callbacks.add(callback);
          }
        case 7:
        case "end":
          return _context27.stop();
      }
    }, _callee25);
  }));
  return _bind_template.apply(this, arguments);
}
function unbind_template(_x5) {
  return _unbind_template.apply(this, arguments);
}
function _unbind_template() {
  _unbind_template = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(callback) {
    var unsubscriber, _i17, _Object$entries2, _Object$entries2$_i, key, cache;
    return _regeneratorRuntime().wrap(function _callee26$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _i17 = 0, _Object$entries2 = Object.entries(cachedTemplates);
        case 1:
          if (!(_i17 < _Object$entries2.length)) {
            _context28.next = 10;
            break;
          }
          _Object$entries2$_i = _slicedToArray(_Object$entries2[_i17], 2), key = _Object$entries2$_i[0], cache = _Object$entries2$_i[1];
          if (!cache.callbacks.has(callback)) {
            _context28.next = 7;
            break;
          }
          cache.callbacks["delete"](callback);
          if (cache.callbacks.size == 0) {
            unsubscriber = cache.unsubscribe;
            delete cachedTemplates[key];
          }
          return _context28.abrupt("break", 10);
        case 7:
          _i17++;
          _context28.next = 1;
          break;
        case 10:
          if (!unsubscriber) {
            _context28.next = 16;
            break;
          }
          _context28.next = 13;
          return unsubscriber;
        case 13:
          _context28.t0 = _context28.sent;
          _context28.next = 16;
          return (0, _context28.t0)();
        case 16:
        case "end":
          return _context28.stop();
      }
    }, _callee26);
  }));
  return _unbind_template.apply(this, arguments);
}
var name = "card-mod";
var version = "3.4.0b0";
var description = "";
var scripts = {
  build: "rollup -c",
  watch: "rollup -c --watch"
};
var keywords = [];
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
  "@babel/core": "^7.23.6",
  "@babel/preset-env": "^7.23.6",
  "@rollup/plugin-babel": "^6.0.4",
  "@rollup/plugin-json": "^6.1.0",
  "@rollup/plugin-node-resolve": "^15.2.3",
  rollup: "^2.79.1",
  "rollup-plugin-terser": "^7.0.2",
  "rollup-plugin-typescript2": "^0.36.0",
  typescript: "^5.3.3"
};
var dependencies = {
  lit: "^3.1.0",
  tslib: "^2.6.2"
};
var pjson = {
  name: name,
  "private": true,
  version: version,
  description: description,
  scripts: scripts,
  keywords: keywords,
  author: author,
  license: license,
  devDependencies: devDependencies,
  dependencies: dependencies
};
var _load_yaml2json = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var ppr, dtr;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!customElements.get("developer-tools-event")) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          _context2.next = 4;
          return customElements.whenDefined("partial-panel-resolver");
        case 4:
          ppr = document.createElement("partial-panel-resolver");
          ppr.hass = {
            panels: [{
              url_path: "tmp",
              component_name: "developer-tools"
            }]
          };
          ppr._updateRoutes();
          _context2.next = 9;
          return ppr.routerOptions.routes.tmp.load();
        case 9:
          _context2.next = 11;
          return customElements.whenDefined("developer-tools-router");
        case 11:
          dtr = document.createElement("developer-tools-router");
          _context2.next = 14;
          return dtr.routerOptions.routes.event.load();
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function _load_yaml2json() {
    return _ref3.apply(this, arguments);
  };
}();
var yaml2json = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(yaml) {
    var el;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _load_yaml2json();
        case 2:
          el = document.createElement("ha-yaml-editor");
          el._onChange(new CustomEvent("yaml", {
            detail: {
              value: yaml
            }
          }));
          return _context3.abrupt("return", el.value);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function yaml2json(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
function get_theme(_x7) {
  return _get_theme.apply(this, arguments);
}
function _get_theme() {
  _get_theme = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(root) {
    var _a, el, theme, hs, themes;
    return _regeneratorRuntime().wrap(function _callee27$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          if (root.type) {
            _context29.next = 2;
            break;
          }
          return _context29.abrupt("return", null);
        case 2:
          el = root.parentElement ? root.parentElement : root;
          theme = window.getComputedStyle(el).getPropertyValue("--card-mod-theme");
          _context29.next = 6;
          return hass();
        case 6:
          hs = _context29.sent;
          if (hs) {
            _context29.next = 9;
            break;
          }
          return _context29.abrupt("return", {});
        case 9:
          themes = (_a = hs === null || hs === void 0 ? void 0 : hs.themes.themes) !== null && _a !== void 0 ? _a : {};
          if (themes[theme]) {
            _context29.next = 12;
            break;
          }
          return _context29.abrupt("return", {});
        case 12:
          if (!themes[theme]["card-mod-".concat(root.type, "-yaml")]) {
            _context29.next = 16;
            break;
          }
          return _context29.abrupt("return", yaml2json(themes[theme]["card-mod-".concat(root.type, "-yaml")]));
        case 16:
          if (!themes[theme]["card-mod-".concat(root.type)]) {
            _context29.next = 20;
            break;
          }
          return _context29.abrupt("return", {
            ".": themes[theme]["card-mod-".concat(root.type)]
          });
        case 20:
          return _context29.abrupt("return", {});
        case 21:
        case "end":
          return _context29.stop();
      }
    }, _callee27);
  }));
  return _get_theme.apply(this, arguments);
}
var TIMEOUT_ERROR = "SELECTTREE-TIMEOUT";
function await_element(_x8) {
  return _await_element.apply(this, arguments);
}
function _await_element() {
  _await_element = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(el) {
    var hard,
      _a,
      rounds,
      _args30 = arguments;
    return _regeneratorRuntime().wrap(function _callee28$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          hard = _args30.length > 1 && _args30[1] !== undefined ? _args30[1] : false;
          if (!((_a = el.localName) === null || _a === void 0 ? void 0 : _a.includes("-"))) {
            _context30.next = 4;
            break;
          }
          _context30.next = 4;
          return customElements.whenDefined(el.localName);
        case 4:
          if (!el.updateComplete) {
            _context30.next = 7;
            break;
          }
          _context30.next = 7;
          return el.updateComplete;
        case 7:
          if (!hard) {
            _context30.next = 18;
            break;
          }
          if (!el.pageRendered) {
            _context30.next = 11;
            break;
          }
          _context30.next = 11;
          return el.pageRendered;
        case 11:
          if (!el._panelState) {
            _context30.next = 18;
            break;
          }
          rounds = 0;
        case 13:
          if (!(el._panelState !== "loaded" && rounds++ < 5)) {
            _context30.next = 18;
            break;
          }
          _context30.next = 16;
          return new Promise(function (r) {
            return setTimeout(r, 100);
          });
        case 16:
          _context30.next = 13;
          break;
        case 18:
        case "end":
          return _context30.stop();
      }
    }, _callee28);
  }));
  return _await_element.apply(this, arguments);
}
function _selectTree(_x9, _x10) {
  return _selectTree2.apply(this, arguments);
}
function _selectTree2() {
  _selectTree2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(root, path) {
    var all,
      el,
      _iterator21,
      _step21,
      _step21$value,
      _i18,
      _p,
      _e9,
      _args31 = arguments;
    return _regeneratorRuntime().wrap(function _callee29$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          all = _args31.length > 2 && _args31[2] !== undefined ? _args31[2] : false;
          el = [root]; // Split and clean path
          if (typeof path === "string") {
            path = path.split(/(\$| )/);
          }
          while (path[path.length - 1] === "") path.pop();
          // For each element in the path
          _iterator21 = _createForOfIteratorHelper(path.entries());
          _context31.prev = 5;
          _iterator21.s();
        case 7:
          if ((_step21 = _iterator21.n()).done) {
            _context31.next = 21;
            break;
          }
          _step21$value = _slicedToArray(_step21.value, 2), _i18 = _step21$value[0], _p = _step21$value[1];
          if (!(_p === "$")) {
            _context31.next = 12;
            break;
          }
          el = _toConsumableArray(el).map(function (e) {
            return e.shadowRoot;
          });
          return _context31.abrupt("continue", 19);
        case 12:
          // Only pick the first one for the next step
          _e9 = el[0];
          if (_e9) {
            _context31.next = 15;
            break;
          }
          return _context31.abrupt("return", null);
        case 15:
          if (_p.trim().length) {
            _context31.next = 17;
            break;
          }
          return _context31.abrupt("continue", 19);
        case 17:
          await_element(_e9);
          el = _e9.querySelectorAll(_p);
        case 19:
          _context31.next = 7;
          break;
        case 21:
          _context31.next = 26;
          break;
        case 23:
          _context31.prev = 23;
          _context31.t0 = _context31["catch"](5);
          _iterator21.e(_context31.t0);
        case 26:
          _context31.prev = 26;
          _iterator21.f();
          return _context31.finish(26);
        case 29:
          return _context31.abrupt("return", all ? el : el[0]);
        case 30:
        case "end":
          return _context31.stop();
      }
    }, _callee29, null, [[5, 23, 26, 29]]);
  }));
  return _selectTree2.apply(this, arguments);
}
function selectTree(_x11, _x12) {
  return _selectTree3.apply(this, arguments);
}
function _selectTree3() {
  _selectTree3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(root, path) {
    var all,
      timeout,
      _args32 = arguments;
    return _regeneratorRuntime().wrap(function _callee30$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          all = _args32.length > 2 && _args32[2] !== undefined ? _args32[2] : false;
          timeout = _args32.length > 3 && _args32[3] !== undefined ? _args32[3] : 10000;
          return _context32.abrupt("return", Promise.race([_selectTree(root, path, all), new Promise(function (_, reject) {
            return setTimeout(function () {
              return reject(new Error(TIMEOUT_ERROR));
            }, timeout);
          })])["catch"](function (err) {
            if (!err.message || err.message !== TIMEOUT_ERROR) throw err;
            return null;
          }));
        case 3:
        case "end":
          return _context32.stop();
      }
    }, _callee30);
  }));
  return _selectTree3.apply(this, arguments);
}
var ModdedElement = /*#__PURE__*/function (_s13) {
  _inherits(ModdedElement, _s13);
  var _super6 = _createSuper(ModdedElement);
  function ModdedElement() {
    var _this8;
    _classCallCheck(this, ModdedElement);
    _this8 = _super6.apply(this, arguments);
    _this8._cardMod = [];
    return _this8;
  }
  _createClass(ModdedElement, [{
    key: "setConfig",
    value: function setConfig(_orig, config) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, [config].concat(args));
      this._cardMod.forEach(function (cm) {
        var _a;
        cm.variables = {
          config: config
        };
        cm.styles = ((_a = config.card_mod) === null || _a === void 0 ? void 0 : _a.style) || {};
      });
    }
  }, {
    key: "updated",
    value: function updated(_orig) {
      var _this9 = this;
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      Promise.all([this.updateComplete]).then(function () {
        return _this9._cardMod.forEach(function (cm) {
          var _a;
          return (_a = cm.refresh) === null || _a === void 0 ? void 0 : _a.call(cm);
        });
      });
    }
  }]);
  return ModdedElement;
}(s);
function apply_card_mod(_x13, _x14) {
  return _apply_card_mod.apply(this, arguments);
}
function _apply_card_mod() {
  _apply_card_mod = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(element, type) {
    var _g2;
    var cm_config,
      variables,
      shadow,
      cls,
      _a,
      _b,
      _c,
      _d,
      _e,
      _f,
      _g,
      debug,
      cm,
      classes,
      _args34 = arguments;
    return _regeneratorRuntime().wrap(function _callee32$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          cm_config = _args34.length > 2 && _args34[2] !== undefined ? _args34[2] : undefined;
          variables = _args34.length > 3 && _args34[3] !== undefined ? _args34[3] : {};
          shadow = _args34.length > 4 && _args34[4] !== undefined ? _args34[4] : true;
          cls = _args34.length > 5 && _args34[5] !== undefined ? _args34[5] : undefined;
          // TODO: This is for backwards compatibility
          // Remove in a future version
          if (typeof cm_config === "string" || cm_config !== undefined && cm_config.style === undefined && cm_config["class"] === undefined) {
            console.warn("Card-mod: You're using a custom card that relies on card-mod and uses an outdated signature for applyToElement. This will be removed at some point in the future. Hopefully the developer of your card will have updated by then.");
            cm_config = {
              style: cm_config
            };
          }
          if (cls === true || cls === false) {
            console.warn("Card-mod: You're using a custom card that relies on card-mod and uses an outdated signature for applyToElement. This will be removed at some point in the future. Hopefully the developer of your card will have updated by then.");
            shadow = cls;
            cls = undefined;
          }
          debug = (cm_config === null || cm_config === void 0 ? void 0 : cm_config.debug) ? function () {
            var _console2;
            for (var _len20 = arguments.length, msg = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
              msg[_key20] = arguments[_key20];
            }
            return (_console2 = console).log.apply(_console2, ["CardMod Debug:"].concat(msg));
          } : function () {};
          debug.apply(void 0, ["Applying card-mod to:"].concat(_toConsumableArray((element === null || element === void 0 ? void 0 : element.host) ? ["#shadow-root of:", element === null || element === void 0 ? void 0 : element.host] : [element]), ["type: ", type, "configuration: ", cm_config]));
          if (element) {
            _context34.next = 10;
            break;
          }
          return _context34.abrupt("return");
        case 10:
          if (!((_a = element.localName) === null || _a === void 0 ? void 0 : _a.includes("-"))) {
            _context34.next = 13;
            break;
          }
          _context34.next = 13;
          return customElements.whenDefined(element.localName);
        case 13:
          element._cardMod = element._cardMod || [];
          // Find any existing card-mod elements of the right type
          cm = (_b = element._cardMod.find(function (cm) {
            return cm.type === type;
          })) !== null && _b !== void 0 ? _b : document.createElement("card-mod");
          debug("Applying card-mod in:", cm);
          cm.type = type;
          cm.debug = (_c = cm_config === null || cm_config === void 0 ? void 0 : cm_config.debug) !== null && _c !== void 0 ? _c : false;
          // (cm as any).setAttribute("card-mod-type", type);
          if (!element._cardMod.includes(cm)) element._cardMod.push(cm);
          queueMicrotask( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
            var _a, _b, _c, target;
            return _regeneratorRuntime().wrap(function _callee31$(_context33) {
              while (1) switch (_context33.prev = _context33.next) {
                case 0:
                  _context33.next = 2;
                  return Promise.all([element.updateComplete]);
                case 2:
                  target = ((_a = element.modElement) !== null && _a !== void 0 ? _a : shadow) ? (_b = element.shadowRoot) !== null && _b !== void 0 ? _b : element : element;
                  if (!target.contains(cm)) target.appendChild(cm);
                  cm.variables = variables;
                  cm.styles = (_c = cm_config === null || cm_config === void 0 ? void 0 : cm_config.style) !== null && _c !== void 0 ? _c : "";
                case 6:
                case "end":
                  return _context33.stop();
              }
            }, _callee31);
          })));
          classes = (_f = typeof (cm_config === null || cm_config === void 0 ? void 0 : cm_config["class"]) == "string" ? (_e = (_d = cm_config === null || cm_config === void 0 ? void 0 : cm_config["class"]) === null || _d === void 0 ? void 0 : _d.split) === null || _e === void 0 ? void 0 : _e.call(_d, " ") : cm_config === null || cm_config === void 0 ? void 0 : cm_config["class"]) !== null && _f !== void 0 ? _f : [];
          (_g = element.classList) === null || _g === void 0 ? void 0 : (_g2 = _g).add.apply(_g2, _toConsumableArray(classes).concat([cls]));
          return _context34.abrupt("return", cm);
        case 23:
        case "end":
          return _context34.stop();
      }
    }, _callee32);
  }));
  return _apply_card_mod.apply(this, arguments);
}
function merge_deep(target, source) {
  var isObject = function isObject(i) {
    return i && _typeof(i) === "object" && !Array.isArray(i);
  };
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
        if (typeof target[key] === "string") target[key] = {
          ".": target[key]
        };
        merge_deep(target[key], source[key]);
      } else {
        if (target[key]) target[key] = source[key] + target[key];else target[key] = source[key];
      }
    }
  }
  return target;
}
function compare_deep(a, b) {
  if (a === b) return true;
  if (_typeof(a) !== _typeof(b)) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (var _x15 in a) {
    if (!a.hasOwnProperty(_x15)) continue;
    if (!b.hasOwnProperty(_x15)) return false;
    if (a[_x15] === b[_x15]) continue;
    if (_typeof(a[_x15]) !== "object") return false;
    if (!compare_deep(a[_x15], b[_x15])) return false;
  }
  for (var _x16 in b) {
    if (!b.hasOwnProperty(_x16)) continue;
    if (!a.hasOwnProperty(_x16)) return false;
  }
  return true;
}
var CardMod = /*#__PURE__*/function (_s14) {
  _inherits(CardMod, _s14);
  var _super7 = _createSuper(CardMod);
  function CardMod() {
    var _this10;
    _classCallCheck(this, CardMod);
    _this10 = _super7.call(this);
    _this10.card_mod_children = {};
    _this10.card_mod_parent = undefined;
    _this10.debug = false;
    _this10._fixed_styles = {};
    _this10._styles = "";
    _this10._rendered_styles = "";
    _this10._observer = new MutationObserver(function (mutations) {
      // MutationObserver to keep track of any changes to the parent element
      // e.g. when elements are changed after creation.
      // The observer is activated in _connect() only if there are any styles
      //  which should be applied to children
      var _iterator13 = _createForOfIteratorHelper(mutations),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var _m = _step13.value;
          if (_m.target.localName === "card-mod") return;
          if (_m.addedNodes.length) _m.addedNodes.forEach(function (n) {
            if (n.localName !== "card-mod") ;
          });
          if (_m.removedNodes.length) _m.removedNodes.forEach(function (n) {
            if (n.localName !== "card-mod") ;
          });
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      if (stop) return;
      _this10.refresh();
    });
    // cm_update is issued when themes are reloaded
    document.addEventListener("cm_update", function () {
      _this10._process_styles(_this10._input_styles);
    });
    return _this10;
  }
  _createClass(CardMod, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(CardMod.prototype), "connectedCallback", this).call(this);
      this.refresh();
      // Make sure the card-mod element is invisible
      this.setAttribute("slot", "none");
      this.style.display = "none";
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(CardMod.prototype), "disconnectedCallback", this).call(this);
      this._disconnect();
    }
  }, {
    key: "styles",
    get: function get() {
      // Return only styles that apply to this element
      return this._styles;
    },
    set: function set(stl) {
      // Parsing styles is expensive, so only do it if things have actually changed
      if (compare_deep(stl, this._input_styles)) return;
      this._input_styles = stl;
      this._process_styles(stl);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this._connect();
    }
  }, {
    key: "_debug",
    value: function _debug() {
      var _console;
      for (var _len4 = arguments.length, msg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        msg[_key4] = arguments[_key4];
      }
      if (this.debug) (_console = console).log.apply(_console, ["CardMod Debug:"].concat(msg));
    }
  }, {
    key: "_process_styles",
    value: function () {
      var _process_styles2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(stl) {
        var styles, theme_styles;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              styles = typeof stl === "string" ? {
                ".": stl
              } : merge_deep({}, stl); // Merge card_mod styles with theme styles
              _context4.next = 3;
              return get_theme(this);
            case 3:
              theme_styles = _context4.sent;
              merge_deep(styles, theme_styles);
              // Save processed styles
              this._fixed_styles = styles;
              this.refresh();
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _process_styles(_x17) {
        return _process_styles2.apply(this, arguments);
      }
      return _process_styles;
    }()
  }, {
    key: "_style_child",
    value: function () {
      var _style_child2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(path, style) {
        var _this11 = this;
        var retries,
          parent,
          elements,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              retries = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 0;
              parent = this.parentElement || this.parentNode;
              _context6.next = 4;
              return selectTree(parent, path, true);
            case 4:
              elements = _context6.sent;
              if (!(!elements || !elements.length)) {
                _context6.next = 11;
                break;
              }
              if (!(retries > 5)) {
                _context6.next = 8;
                break;
              }
              throw new Error("NoElements");
            case 8:
              _context6.next = 10;
              return new Promise(function (resolve) {
                return setTimeout(resolve, retries * 100);
              });
            case 10:
              return _context6.abrupt("return", this._style_child(path, style, retries + 1));
            case 11:
              return _context6.abrupt("return", _toConsumableArray(elements).map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ch) {
                  var cm;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return apply_card_mod(ch, "".concat(_this11.type, "-child"), {
                          style: style,
                          debug: _this11.debug
                        }, _this11.variables, false);
                      case 2:
                        cm = _context5.sent;
                        if (cm) cm.card_mod_parent = _this11;
                        return _context5.abrupt("return", cm);
                      case 5:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x20) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function _style_child(_x18, _x19) {
        return _style_child2.apply(this, arguments);
      }
      return _style_child;
    }()
  }, {
    key: "_connect",
    value: function () {
      var _connect2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var _this12 = this;
        var _a, _b, _c, _d, styles, styleChildren, thisStyle, hasChildren, _loop, _i13, _Object$entries, key, parentEl;
        return _regeneratorRuntime().wrap(function _callee8$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              styles = (_a = this._fixed_styles) !== null && _a !== void 0 ? _a : {};
              styleChildren = {};
              thisStyle = "";
              hasChildren = false;
              this.parentElement || this.parentNode;
              this._debug("(Re)connecting", this);
              // Go through each path in the styles
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var _Object$entries$_i, key, value;
                return _regeneratorRuntime().wrap(function _loop$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _Object$entries$_i = _slicedToArray(_Object$entries[_i13], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                      if (key === ".") {
                        if (typeof value === "string") thisStyle = value;else _this12._debug("Style of '.' must be a string: ", value);
                      } else {
                        hasChildren = true;
                        styleChildren[key] = _this12._style_child(key, value)["catch"](function (e) {
                          if (e.message == "NoElements") {
                            if (_this12.debug) {
                              console.groupCollapsed("card-mod found no elements");
                              console.info("Looked for ".concat(key));
                              console.info(_this12);
                              console.groupEnd();
                            }
                            return;
                          }
                          throw e;
                        });
                      }
                    case 2:
                    case "end":
                      return _context7.stop();
                  }
                }, _loop);
              });
              _i13 = 0, _Object$entries = Object.entries(styles);
            case 8:
              if (!(_i13 < _Object$entries.length)) {
                _context9.next = 13;
                break;
              }
              return _context9.delegateYield(_loop(), "t0", 10);
            case 10:
              _i13++;
              _context9.next = 8;
              break;
            case 13:
              // Prune old child elements
              for (key in this.card_mod_children) {
                if (!styleChildren[key]) {
                  (_b = this.card_mod_children[key]) === null || _b === void 0 ? void 0 : _b.forEach( /*#__PURE__*/function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(ch) {
                      return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                        while (1) switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.next = 2;
                            return ch;
                          case 2:
                            return _context8.abrupt("return", _context8.sent.styles = "");
                          case 3:
                          case "end":
                            return _context8.stop();
                        }
                      }, _callee7);
                    }));
                    return function (_x21) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                }
              }
              this.card_mod_children = styleChildren;
              // Process styles applicable to this card-mod element
              if (!(this._styles === thisStyle)) {
                _context9.next = 17;
                break;
              }
              return _context9.abrupt("return");
            case 17:
              this._styles = thisStyle;
              if (hasTemplate(this._styles)) {
                this._renderer = this._renderer || this._style_rendered.bind(this);
                bind_template(this._renderer, this._styles, this.variables);
              } else {
                this._style_rendered(this._styles || "");
              }
              if (hasChildren) {
                this._observer.disconnect();
                parentEl = (_c = this.parentElement) !== null && _c !== void 0 ? _c : this.parentNode;
                this._observer.observe((_d = parentEl === null || parentEl === void 0 ? void 0 : parentEl.host) !== null && _d !== void 0 ? _d : parentEl, {
                  childList: true
                });
              }
            case 20:
            case "end":
              return _context9.stop();
          }
        }, _callee8, this);
      }));
      function _connect() {
        return _connect2.apply(this, arguments);
      }
      return _connect;
    }()
  }, {
    key: "_disconnect",
    value: function () {
      var _disconnect2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var _a;
        return _regeneratorRuntime().wrap(function _callee9$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              this._observer.disconnect();
              this._styles = "";
              _context10.next = 4;
              return unbind_template(this._renderer);
            case 4:
              (_a = this.card_mod_parent) === null || _a === void 0 ? void 0 : _a.refresh();
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee9, this);
      }));
      function _disconnect() {
        return _disconnect2.apply(this, arguments);
      }
      return _disconnect;
    }()
  }, {
    key: "_style_rendered",
    value: function _style_rendered(result) {
      if (this._rendered_styles !== result) this._rendered_styles = result;
      // This event is listened for by icons
      this.dispatchEvent(new Event("card-mod-update"));
    }
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      return x(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <style>\n        ", "\n      </style>\n    "])), this._rendered_styles);
    }
  }], [{
    key: "applyToElement",
    get: function get() {
      return apply_card_mod;
    }
  }]);
  return CardMod;
}(s);
__decorate([n({
  attribute: "card-mod-type",
  reflect: true
})], CardMod.prototype, "type", void 0);
__decorate([n()], CardMod.prototype, "_rendered_styles", void 0);
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
  return _regeneratorRuntime().wrap(function _callee10$(_context11) {
    while (1) switch (_context11.prev = _context11.next) {
      case 0:
        if (!(customElements.get("home-assistant") === undefined)) {
          _context11.next = 5;
          break;
        }
        _context11.next = 3;
        return new Promise(function (resolve) {
          return window.setTimeout(resolve, 100);
        });
      case 3:
        _context11.next = 0;
        break;
      case 5:
        if (!customElements.get("card-mod")) {
          customElements.define("card-mod", CardMod);
          console.info("%cCARD-MOD ".concat(pjson.version, " IS INSTALLED"), "color: green; font-weight: bold");
        }
      case 6:
      case "end":
        return _context11.stop();
    }
  }, _callee10);
}))();
var patch_method = function patch_method(obj, method, override) {
  if (method === "constructor") return;
  var original = obj[method];
  if (original === null || original === void 0 ? void 0 : original.cm_patched) return;
  var fn = function fn() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    try {
      return override.call.apply(override, [this, original === null || original === void 0 ? void 0 : original.bind(this)].concat(args));
    } catch (e) {
      console.error("Card-mod", e);
      return original === null || original === void 0 ? void 0 : original.bind(this).apply(void 0, args);
    }
  };
  fn.cm_patched = true;
  obj[method] = fn;
};
var patch_object = function patch_object(obj, patch) {
  if (!obj) return;
  for (var method in Object.getOwnPropertyDescriptors(patch.prototype)) {
    patch_method(obj, method, patch.prototype[method]);
  }
};
var patch_prototype = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(cls, patch) {
    return _regeneratorRuntime().wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (!(typeof cls === "string")) {
            _context12.next = 4;
            break;
          }
          _context12.next = 3;
          return customElements.whenDefined(cls);
        case 3:
          cls = customElements.get(cls);
        case 4:
          return _context12.abrupt("return", patch_object(cls.prototype, patch));
        case 5:
        case "end":
          return _context12.stop();
      }
    }, _callee11);
  }));
  return function patch_prototype(_x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
// Decorator for patching a custom-element
function patch_element(element) {
  return function patched(constructor) {
    patch_prototype(element, constructor);
  };
}

/*
Patch the ha-card element to on first update:
- try to find the config parameter of it's parent element
- Apply card_mod styles according to that config
*/
var HaCardPatch = /*#__PURE__*/function (_ModdedElement) {
  _inherits(HaCardPatch, _ModdedElement);
  var _super8 = _createSuper(HaCardPatch);
  function HaCardPatch() {
    var _this13;
    _classCallCheck(this, HaCardPatch);
    _this13 = _super8.apply(this, arguments);
    _this13._cardMod = [];
    return _this13;
  }
  _createClass(HaCardPatch, [{
    key: "firstUpdated",
    value: function () {
      var _firstUpdated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(_orig) {
        var _a,
          _b,
          _c,
          _len6,
          args,
          _key6,
          config,
          cls,
          parent,
          _args13 = arguments;
        return _regeneratorRuntime().wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              for (_len6 = _args13.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                args[_key6 - 1] = _args13[_key6];
              }
              _context13.next = 3;
              return _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
            case 3:
              config = findConfig(this);
              cls = "type-".concat((_b = (_a = config === null || config === void 0 ? void 0 : config.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, ":", "-"));
              _context13.next = 7;
              return apply_card_mod(this, "card", config === null || config === void 0 ? void 0 : config.card_mod, {
                config: config
              }, false, cls);
            case 7:
              parent = (_c = this.parentNode) === null || _c === void 0 ? void 0 : _c.host;
              if (parent) {
                _context13.next = 10;
                break;
              }
              return _context13.abrupt("return");
            case 10:
              patch_object(parent, ModdedElement);
              parent._cardMod = this._cardMod;
            case 12:
            case "end":
              return _context13.stop();
          }
        }, _callee12, this);
      }));
      function firstUpdated(_x24) {
        return _firstUpdated.apply(this, arguments);
      }
      return firstUpdated;
    }()
  }]);
  return HaCardPatch;
}(ModdedElement);
HaCardPatch = __decorate([patch_element("ha-card")], HaCardPatch);
function findConfig(node) {
  if (node.config) return node.config;
  if (node._config) return node._config;
  if (node.host) return findConfig(node.host);
  if (node.parentElement) return findConfig(node.parentElement);
  if (node.parentNode) return findConfig(node.parentNode);
  return null;
}

/*
Patch the hui-entities-card specifically in order to handle individual styling of each row
*/
var HuiEntitiesCardPatch = /*#__PURE__*/function (_ModdedElement2) {
  _inherits(HuiEntitiesCardPatch, _ModdedElement2);
  var _super9 = _createSuper(HuiEntitiesCardPatch);
  function HuiEntitiesCardPatch() {
    _classCallCheck(this, HuiEntitiesCardPatch);
    return _super9.apply(this, arguments);
  }
  _createClass(HuiEntitiesCardPatch, [{
    key: "renderEntity",
    value: function renderEntity(_orig, config) {
      var _a, _b;
      for (var _len7 = arguments.length, rest = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        rest[_key7 - 2] = arguments[_key7];
      }
      var retval = _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, [config].concat(rest));
      if ((config === null || config === void 0 ? void 0 : config.type) === "custom:mod-card") return retval;
      if (!(retval === null || retval === void 0 ? void 0 : retval.values)) return retval;
      var row = retval.values[0];
      if (!row) return retval;
      var cls = "type-".concat((_b = (_a = config === null || config === void 0 ? void 0 : config.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, ":", "-"));
      var apply = /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
          return _regeneratorRuntime().wrap(function _callee13$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return await_element(row);
              case 2:
                patch_object(row, ModdedElement);
                apply_card_mod(row, "row", config === null || config === void 0 ? void 0 : config.card_mod, {
                  config: config
                }, true, cls);
                row.addEventListener("ll-rebuild", apply);
              case 5:
              case "end":
                return _context14.stop();
            }
          }, _callee13);
        }));
        return function apply() {
          return _ref9.apply(this, arguments);
        };
      }();
      Promise.all([this.updateComplete]).then(function () {
        return apply();
      });
      return retval;
    }
  }]);
  return HuiEntitiesCardPatch;
}(ModdedElement);
HuiEntitiesCardPatch = __decorate([patch_element("hui-entities-card")], HuiEntitiesCardPatch);

/*
Patch the hui-glance-card specifically in order to handle individual styling of each item
Items in glance cards are not isolated like rows in entities cards, so the styling options
are somewhat limited. Therefore this patch creates a separate shadowRoot for each item.
*/
// https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L202-L211
// https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L231-L233
var ENTITY_STYLES = "\ndiv {\n  width: 100%;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.name {\n  min-height: var(--paper-font-body1_-_line-height, 20px);\n}\nstate-badge {\n  margin: 8px 0;\n}\n";
var HuiGlanceCardPatch = /*#__PURE__*/function (_ModdedElement3) {
  _inherits(HuiGlanceCardPatch, _ModdedElement3);
  var _super10 = _createSuper(HuiGlanceCardPatch);
  function HuiGlanceCardPatch() {
    _classCallCheck(this, HuiGlanceCardPatch);
    return _super10.apply(this, arguments);
  }
  _createClass(HuiGlanceCardPatch, [{
    key: "updated",
    value:
    // hui-glance-card has a renderEntity method, but the return from that is too messy
    // Instead find every icon after render in the updated method.
    function updated(_orig) {
      var _a, _b, _c;
      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      // Each entity of a glance card is contained in a div.entity
      // Go through each and apply styling individually
      var _iterator14 = _createForOfIteratorHelper(this.shadowRoot.querySelectorAll("ha-card div.entity")),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var el = _step14.value;
          patch_object(el, ModdedElement);
          // Create a shadowroot for each entity
          // This makes it easier to style entities individually without styles "leaking" out
          var root = (_a = el.shadowRoot) !== null && _a !== void 0 ? _a : el.attachShadow({
            mode: "open"
          });
          while (el.firstChild) root.append(el.firstChild);
          // Add default styles into shadowRoot
          var styleTag = (_b = el.querySelector("style[card-mod]")) !== null && _b !== void 0 ? _b : document.createElement("style");
          styleTag.setAttribute("card-mod", "");
          styleTag.innerHTML = ENTITY_STYLES;
          root.append(styleTag);
          // Thankfully the configuration data for the glance entity is added to the div for some reason
          // https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L275
          var config = (_c = el["config"]) !== null && _c !== void 0 ? _c : el["entityConfig"];
          apply_card_mod(el, "glance", config === null || config === void 0 ? void 0 : config.card_mod, {
            config: config
          });
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    }
  }]);
  return HuiGlanceCardPatch;
}(ModdedElement);
HuiGlanceCardPatch = __decorate([patch_element("hui-glance-card")], HuiGlanceCardPatch);

/*
Patch the hui-state-label-badge to take styles from the config
( those are the optional badges at the top of the view )
*/
var StateLabelBadgePatch = /*#__PURE__*/function (_ModdedElement4) {
  _inherits(StateLabelBadgePatch, _ModdedElement4);
  var _super11 = _createSuper(StateLabelBadgePatch);
  function StateLabelBadgePatch() {
    _classCallCheck(this, StateLabelBadgePatch);
    return _super11.apply(this, arguments);
  }
  _createClass(StateLabelBadgePatch, [{
    key: "firstUpdated",
    value: function () {
      var _firstUpdated2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_orig) {
        var _len9,
          args,
          _key9,
          config,
          _args15 = arguments;
        return _regeneratorRuntime().wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              for (_len9 = _args15.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
                args[_key9 - 1] = _args15[_key9];
              }
              _context15.next = 3;
              return _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
            case 3:
              config = this["_config"];
              _context15.next = 6;
              return apply_card_mod(this, "badge", config === null || config === void 0 ? void 0 : config.card_mod, {
                config: config
              });
            case 6:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this);
      }));
      function firstUpdated(_x25) {
        return _firstUpdated2.apply(this, arguments);
      }
      return firstUpdated;
    }()
  }]);
  return StateLabelBadgePatch;
}(ModdedElement);
StateLabelBadgePatch = __decorate([patch_element("hui-state-label-badge")], StateLabelBadgePatch);

/*
Patch hui-view for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

*/
var HuiViewPatch = /*#__PURE__*/function (_ModdedElement5) {
  _inherits(HuiViewPatch, _ModdedElement5);
  var _super12 = _createSuper(HuiViewPatch);
  function HuiViewPatch() {
    _classCallCheck(this, HuiViewPatch);
    return _super12.apply(this, arguments);
  }
  _createClass(HuiViewPatch, [{
    key: "updated",
    value: function updated(_orig) {
      for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        args[_key10 - 1] = arguments[_key10];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      apply_card_mod(this, "view", undefined, {}, false);
    }
  }]);
  return HuiViewPatch;
}(ModdedElement);
HuiViewPatch = __decorate([patch_element("hui-view")], HuiViewPatch);

/*
Patch hui-root for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also re-run firstUpdated of any existing element after patching.
This shouldn't be necessary if card-mod is loaded as a module.
*/
var HuiRootPatch = /*#__PURE__*/function (_ModdedElement6) {
  _inherits(HuiRootPatch, _ModdedElement6);
  var _super13 = _createSuper(HuiRootPatch);
  function HuiRootPatch() {
    _classCallCheck(this, HuiRootPatch);
    return _super13.apply(this, arguments);
  }
  _createClass(HuiRootPatch, [{
    key: "firstUpdated",
    value: function firstUpdated(_orig) {
      for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      apply_card_mod(this, "root");
    }
  }]);
  return HuiRootPatch;
}(ModdedElement);
HuiRootPatch = __decorate([patch_element("hui-root")], HuiRootPatch);

/*
Patch ha-more-info-dialog to style more-info popups.

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also look for any already opened dialogs
home-assistant$ha-more-info-dialog
If that existed it would replace the showDialog method of that with the patched version, and then re-run it.
This should only be necessary if someone manages to open a dialog before card-mod loads in, which shouldn't happen
at all if card-mod is loaded as a module.
*/
var MoreInfoDIalogPatch = /*#__PURE__*/function (_ModdedElement7) {
  _inherits(MoreInfoDIalogPatch, _ModdedElement7);
  var _super14 = _createSuper(MoreInfoDIalogPatch);
  function MoreInfoDIalogPatch() {
    _classCallCheck(this, MoreInfoDIalogPatch);
    return _super14.apply(this, arguments);
  }
  _createClass(MoreInfoDIalogPatch, [{
    key: "showDialog",
    value: function showDialog(_orig, params) {
      var _this14 = this;
      for (var _len12 = arguments.length, rest = new Array(_len12 > 2 ? _len12 - 2 : 0), _key12 = 2; _key12 < _len12; _key12++) {
        rest[_key12 - 2] = arguments[_key12];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, [params].concat(rest));
      this.requestUpdate();
      this.updateComplete.then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        var haDialog;
        return _regeneratorRuntime().wrap(function _callee15$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              haDialog = _this14.shadowRoot.querySelector("ha-dialog");
              if (haDialog) {
                _context16.next = 3;
                break;
              }
              return _context16.abrupt("return");
            case 3:
              apply_card_mod(haDialog, "more-info", undefined, {
                config: params
              }, false);
            case 4:
            case "end":
              return _context16.stop();
          }
        }, _callee15);
      })));
    }
  }]);
  return MoreInfoDIalogPatch;
}(ModdedElement);
MoreInfoDIalogPatch = __decorate([patch_element("ha-more-info-dialog")], MoreInfoDIalogPatch);

/*
Patch ha-sidebar for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also re-run firstUpdated of any existing element after patching.
This shouldn't be necessary if card-mod is loaded as a module.
*/
var SidebarPatch = /*#__PURE__*/function (_ModdedElement8) {
  _inherits(SidebarPatch, _ModdedElement8);
  var _super15 = _createSuper(SidebarPatch);
  function SidebarPatch() {
    _classCallCheck(this, SidebarPatch);
    return _super15.apply(this, arguments);
  }
  _createClass(SidebarPatch, [{
    key: "firstUpdated",
    value:
    // @ts-ignore
    function firstUpdated(_orig) {
      for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
        args[_key13 - 1] = arguments[_key13];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      apply_card_mod(this, "sidebar");
    }
  }]);
  return SidebarPatch;
}(ModdedElement);
SidebarPatch = __decorate([patch_element("ha-sidebar")], SidebarPatch);
customElements.whenDefined("hui-card-element-editor").then(function () {
  var HuiCardElementEditor = customElements.get("hui-card-element-editor");
  if (HuiCardElementEditor.prototype.cardmod_patched) return;
  HuiCardElementEditor.prototype.cardmod_patched = true;
  var _getConfigElement = HuiCardElementEditor.prototype.getConfigElement;
  HuiCardElementEditor.prototype.getConfigElement = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var retval, _setConfig;
    return _regeneratorRuntime().wrap(function _callee16$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return _getConfigElement.bind(this)();
        case 2:
          retval = _context17.sent;
          // Catch and patch the configElement
          if (retval) {
            _setConfig = retval.setConfig;
            try {
              retval.setConfig = function (config) {
                var _a, _b;
                // Strip card_mod from the data that's sent to the config element
                // and put it back after the config has been checked
                var newConfig = JSON.parse(JSON.stringify(config));
                this._cardModData = {
                  card: newConfig.card_mod,
                  entities: []
                };
                if (Array.isArray(newConfig.entities)) {
                  var _iterator15 = _createForOfIteratorHelper((_a = newConfig.entities) === null || _a === void 0 ? void 0 : _a.entries()),
                    _step15;
                  try {
                    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                      var _step15$value = _slicedToArray(_step15.value, 2),
                        _i14 = _step15$value[0],
                        _e7 = _step15$value[1];
                      this._cardModData.entities[_i14] = _e7.card_mod;
                      delete _e7.card_mod;
                    }
                  } catch (err) {
                    _iterator15.e(err);
                  } finally {
                    _iterator15.f();
                  }
                }
                delete newConfig.card_mod;
                for (var _len14 = arguments.length, rest = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
                  rest[_key14 - 1] = arguments[_key14];
                }
                _setConfig.bind(this).apply(void 0, [newConfig].concat(rest));
                if (Array.isArray(newConfig.entities)) {
                  var _iterator16 = _createForOfIteratorHelper((_b = newConfig.entities) === null || _b === void 0 ? void 0 : _b.entries()),
                    _step16;
                  try {
                    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                      var _step16$value = _slicedToArray(_step16.value, 2),
                        _i15 = _step16$value[0],
                        _e8 = _step16$value[1];
                      if (this._cardModData.entities[_i15]) _e8.card_mod = this._cardModData.entities[_i15];
                    }
                  } catch (err) {
                    _iterator16.e(err);
                  } finally {
                    _iterator16.f();
                  }
                }
              };
            } catch (error) {
              console.warn(error);
            }
          }
          return _context17.abrupt("return", retval);
        case 5:
        case "end":
          return _context17.stop();
      }
    }, _callee16, this);
  }));
  var _handleUIConfigChanged = HuiCardElementEditor.prototype._handleUIConfigChanged;
  HuiCardElementEditor.prototype._handleUIConfigChanged = function (ev) {
    if (this._configElement && this._configElement._cardModData) {
      var cardMod = this._configElement._cardModData;
      if (cardMod.card) ev.detail.config.card_mod = cardMod.card;
    }
    for (var _len15 = arguments.length, rest = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
      rest[_key15 - 1] = arguments[_key15];
    }
    _handleUIConfigChanged.bind(this).apply(void 0, [ev].concat(rest));
  };
});
customElements.whenDefined("hui-dialog-edit-card").then(function () {
  var HuiDialogEditCard = customElements.get("hui-dialog-edit-card");
  if (HuiDialogEditCard.prototype.cardmod_patched) return;
  HuiDialogEditCard.prototype.cardmod_patched = true;
  var _updated = HuiDialogEditCard.prototype.updated;
  HuiDialogEditCard.prototype.updated = function () {
    var _this15 = this;
    _updated === null || _updated === void 0 ? void 0 : _updated.bind(this).apply(void 0, arguments);
    this.updateComplete.then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var _a, _b, _c, _d, button;
      return _regeneratorRuntime().wrap(function _callee17$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            if (!_this15._cardModIcon) {
              _this15._cardModIcon = document.createElement("ha-icon");
              _this15._cardModIcon.icon = "mdi:brush";
            }
            button = _this15.shadowRoot.querySelector("mwc-button[slot=secondaryAction]");
            if (button) {
              _context18.next = 4;
              break;
            }
            return _context18.abrupt("return");
          case 4:
            button.appendChild(_this15._cardModIcon);
            if (((_a = _this15._cardConfig) === null || _a === void 0 ? void 0 : _a.card_mod) || ((_b = Array.isArray(_this15._cardConfig.entities)) !== null && _b !== void 0 ? _b : (_d = (_c = _this15._cardConfig) === null || _c === void 0 ? void 0 : _c.entities) === null || _d === void 0 ? void 0 : _d.some(function (e) {
              return e.card_mod;
            }))) {
              _this15._cardModIcon.style.visibility = "visible";
            } else {
              _this15._cardModIcon.style.visibility = "hidden";
            }
          case 6:
          case "end":
            return _context18.stop();
        }
      }, _callee17);
    })));
  };
});

/*
Patch the hui-epicture-elements-card specifically in order to handle individual styling of each element
*/
var PictureElementsCardPatch = /*#__PURE__*/function (_ModdedElement9) {
  _inherits(PictureElementsCardPatch, _ModdedElement9);
  var _super16 = _createSuper(PictureElementsCardPatch);
  function PictureElementsCardPatch() {
    _classCallCheck(this, PictureElementsCardPatch);
    return _super16.apply(this, arguments);
  }
  _createClass(PictureElementsCardPatch, [{
    key: "setConfig",
    value: function setConfig(_orig) {
      var _a, _b;
      for (var _len16 = arguments.length, args = new Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
        args[_key16 - 1] = arguments[_key16];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      var _iterator17 = _createForOfIteratorHelper(this._elements.entries()),
        _step17;
      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var _step17$value = _slicedToArray(_step17.value, 2),
            _i16 = _step17$value[0],
            el = _step17$value[1];
          await_element(el);
          patch_object(el, ModdedElement);
          var config = this._config.elements[_i16];
          var cls = "type-".concat((_b = (_a = config === null || config === void 0 ? void 0 : config.type) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, ":", "-"));
          apply_card_mod(el, "element", config === null || config === void 0 ? void 0 : config.card_mod, {
            config: config
          }, true, cls);
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }
    }
  }]);
  return PictureElementsCardPatch;
}(ModdedElement);
PictureElementsCardPatch = __decorate([patch_element("hui-picture-elements-card")], PictureElementsCardPatch);

/*
Patch various icon elements to consider the following variables:
--card-mod-icon
--card-mod-icon-color
--card-mod-icon-dim
*/
var updateIcon = function updateIcon(el) {
  var styles = window.getComputedStyle(el);
  var icon = styles.getPropertyValue("--card-mod-icon");
  if (icon) el.icon = icon.trim();
  var color = styles.getPropertyValue("--card-mod-icon-color");
  if (color) el.style.color = color;
  var filter = styles.getPropertyValue("--card-mod-icon-dim");
  if (filter === "none") el.style.filter = "none";
};
var bindCardMod = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(el) {
    var retry,
      _a,
      _b,
      _iterator18,
      _step18,
      _loop2,
      _args21 = arguments;
    return _regeneratorRuntime().wrap(function _callee19$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          retry = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : 0; // Find the most relevant card-mods in order to listen to change events so we can react quickly
          updateIcon(el);
          if (!((_a = el._boundCardMod) === null || _a === void 0 ? void 0 : _a.size)) {
            _context21.next = 4;
            break;
          }
          return _context21.abrupt("return");
        case 4:
          _context21.next = 6;
          return findParentCardMod(el);
        case 6:
          el._boundCardMod = _context21.sent;
          if (!(!((_b = el._cardMod) === null || _b === void 0 ? void 0 : _b.size) && retry < 5)) {
            _context21.next = 9;
            break;
          }
          return _context21.abrupt("return", window.setTimeout(function () {
            return bindCardMod(el, retry + 1);
          }, 100 * retry));
        case 9:
          _iterator18 = _createForOfIteratorHelper(el._boundCardMod);
          _context21.prev = 10;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var cm;
            return _regeneratorRuntime().wrap(function _loop2$(_context20) {
              while (1) switch (_context20.prev = _context20.next) {
                case 0:
                  cm = _step18.value;
                  cm.addEventListener("card-mod-update", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
                    return _regeneratorRuntime().wrap(function _callee18$(_context19) {
                      while (1) switch (_context19.prev = _context19.next) {
                        case 0:
                          _context19.next = 2;
                          return cm.updateComplete;
                        case 2:
                          updateIcon(el);
                        case 3:
                        case "end":
                          return _context19.stop();
                      }
                    }, _callee18);
                  })));
                case 2:
                case "end":
                  return _context20.stop();
              }
            }, _loop2);
          });
          _iterator18.s();
        case 13:
          if ((_step18 = _iterator18.n()).done) {
            _context21.next = 17;
            break;
          }
          return _context21.delegateYield(_loop2(), "t0", 15);
        case 15:
          _context21.next = 13;
          break;
        case 17:
          _context21.next = 22;
          break;
        case 19:
          _context21.prev = 19;
          _context21.t1 = _context21["catch"](10);
          _iterator18.e(_context21.t1);
        case 22:
          _context21.prev = 22;
          _iterator18.f();
          return _context21.finish(22);
        case 25:
        case "end":
          return _context21.stop();
      }
    }, _callee19, null, [[10, 19, 22, 25]]);
  }));
  return function bindCardMod(_x26) {
    return _ref13.apply(this, arguments);
  };
}();
var HaStateIconPatch = /*#__PURE__*/function (_ModdedElement10) {
  _inherits(HaStateIconPatch, _ModdedElement10);
  var _super17 = _createSuper(HaStateIconPatch);
  function HaStateIconPatch() {
    _classCallCheck(this, HaStateIconPatch);
    return _super17.apply(this, arguments);
  }
  _createClass(HaStateIconPatch, [{
    key: "firstUpdated",
    value: function firstUpdated(_orig) {
      for (var _len17 = arguments.length, args = new Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
        args[_key17 - 1] = arguments[_key17];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      bindCardMod(this);
    }
  }]);
  return HaStateIconPatch;
}(ModdedElement);
HaStateIconPatch = __decorate([patch_element("ha-state-icon")], HaStateIconPatch);
var HaIconPatch = /*#__PURE__*/function (_ModdedElement11) {
  _inherits(HaIconPatch, _ModdedElement11);
  var _super18 = _createSuper(HaIconPatch);
  function HaIconPatch() {
    _classCallCheck(this, HaIconPatch);
    return _super18.apply(this, arguments);
  }
  _createClass(HaIconPatch, [{
    key: "firstUpdated",
    value: function firstUpdated(_orig) {
      for (var _len18 = arguments.length, args = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        args[_key18 - 1] = arguments[_key18];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      bindCardMod(this);
    }
  }]);
  return HaIconPatch;
}(ModdedElement);
HaIconPatch = __decorate([patch_element("ha-icon")], HaIconPatch);
var HaSvgIconPatch = /*#__PURE__*/function (_ModdedElement12) {
  _inherits(HaSvgIconPatch, _ModdedElement12);
  var _super19 = _createSuper(HaSvgIconPatch);
  function HaSvgIconPatch() {
    _classCallCheck(this, HaSvgIconPatch);
    return _super19.apply(this, arguments);
  }
  _createClass(HaSvgIconPatch, [{
    key: "firstUpdated",
    value: function firstUpdated(_orig) {
      var _a, _b;
      for (var _len19 = arguments.length, args = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
        args[_key19 - 1] = arguments[_key19];
      }
      _orig === null || _orig === void 0 ? void 0 : _orig.apply(void 0, args);
      if (((_b = (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.host) === null || _b === void 0 ? void 0 : _b.localName) === "ha-icon") return;
      bindCardMod(this);
    }
  }]);
  return HaSvgIconPatch;
}(ModdedElement);
HaSvgIconPatch = __decorate([patch_element("ha-svg-icon")], HaSvgIconPatch);
function joinSet(dst, src) {
  var _iterator19 = _createForOfIteratorHelper(src),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _s15 = _step19.value;
      dst.add(_s15);
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
  }
}
function findParentCardMod(_x27) {
  return _findParentCardMod.apply(this, arguments);
}
function _findParentCardMod() {
  _findParentCardMod = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(node) {
    var step,
      cardMods,
      _iterator22,
      _step22,
      cm,
      _args35 = arguments;
    return _regeneratorRuntime().wrap(function _callee33$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          step = _args35.length > 1 && _args35[1] !== undefined ? _args35[1] : 0;
          cardMods = new Set();
          if (!(step == 10)) {
            _context35.next = 4;
            break;
          }
          return _context35.abrupt("return", cardMods);
        case 4:
          if (node) {
            _context35.next = 6;
            break;
          }
          return _context35.abrupt("return", cardMods);
        case 6:
          if (node._cardMod) {
            _iterator22 = _createForOfIteratorHelper(node._cardMod);
            try {
              for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
                cm = _step22.value;
                if (cm.styles) cardMods.add(cm);
              }
            } catch (err) {
              _iterator22.e(err);
            } finally {
              _iterator22.f();
            }
          }
          if (!node.updateComplete) {
            _context35.next = 10;
            break;
          }
          _context35.next = 10;
          return node.updateComplete;
        case 10:
          if (!node.parentElement) {
            _context35.next = 19;
            break;
          }
          _context35.t0 = joinSet;
          _context35.t1 = cardMods;
          _context35.next = 15;
          return findParentCardMod(node.parentElement, step + 1);
        case 15:
          _context35.t2 = _context35.sent;
          (0, _context35.t0)(_context35.t1, _context35.t2);
          _context35.next = 26;
          break;
        case 19:
          if (!node.parentNode) {
            _context35.next = 26;
            break;
          }
          _context35.t3 = joinSet;
          _context35.t4 = cardMods;
          _context35.next = 24;
          return findParentCardMod(node.parentNode, step + 1);
        case 24:
          _context35.t5 = _context35.sent;
          (0, _context35.t3)(_context35.t4, _context35.t5);
        case 26:
          if (!node.host) {
            _context35.next = 33;
            break;
          }
          _context35.t6 = joinSet;
          _context35.t7 = cardMods;
          _context35.next = 31;
          return findParentCardMod(node.host, step + 1);
        case 31:
          _context35.t8 = _context35.sent;
          (0, _context35.t6)(_context35.t7, _context35.t8);
        case 33:
          return _context35.abrupt("return", cardMods);
        case 34:
        case "end":
          return _context35.stop();
      }
    }, _callee33);
  }));
  return _findParentCardMod.apply(this, arguments);
}
var NO_STYLE = "\nha-card {\n  background: none;\n  box-shadow: none;\n  border: none;\n  transition: none;\n}";
var ModCard = /*#__PURE__*/function (_s16) {
  _inherits(ModCard, _s16);
  var _super20 = _createSuper(ModCard);
  function ModCard() {
    _classCallCheck(this, ModCard);
    return _super20.apply(this, arguments);
  }
  _createClass(ModCard, [{
    key: "setConfig",
    value: function setConfig(config) {
      var _a;
      this._config = JSON.parse(JSON.stringify(config));
      var style = ((_a = this._config.card_mod) === null || _a === void 0 ? void 0 : _a.style) || this._config.style;
      if (style === undefined) {
        style = NO_STYLE;
      } else if (typeof style === "string") {
        style = NO_STYLE + style;
      } else if (style["."]) {
        style["."] = NO_STYLE + style["."];
      } else {
        style["."] = NO_STYLE;
      }
      this._config.card_mod = {
        style: style
      };
      this.build_card(config.card);
    }
  }, {
    key: "build_card",
    value: function () {
      var _build_card = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(config) {
        var _this16 = this;
        var helpers;
        return _regeneratorRuntime().wrap(function _callee20$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              if (!(this._hass === undefined)) {
                _context22.next = 3;
                break;
              }
              _context22.next = 3;
              return new Promise(function (resolve) {
                return _this16._hassResolve = resolve;
              });
            case 3:
              this._hassResolve = undefined;
              _context22.next = 6;
              return window.loadCardHelpers();
            case 6:
              helpers = _context22.sent;
              _context22.next = 9;
              return helpers.createCardElement(config);
            case 9:
              this.card = _context22.sent;
              this.card.hass = this._hass;
            case 11:
            case "end":
              return _context22.stop();
          }
        }, _callee20, this);
      }));
      function build_card(_x28) {
        return _build_card.apply(this, arguments);
      }
      return build_card;
    }()
  }, {
    key: "firstUpdated",
    value: function firstUpdated() {
      var _this17 = this;
      window.setTimeout(function () {
        var _a, _b;
        if ((_b = (_a = _this17.card) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("ha-card")) {
          console.info("%cYou are doing it wrong!", "color: red; font-weight: bold");
          var cardName = _this17.card.localName.replace(/hui-(.*)-card/, "$1");
          console.info("mod-card should NEVER be used with a card that already has a ha-card element, such as ".concat(cardName));
        }
      }, 3000);
    }
  }, {
    key: "hass",
    set: function set(hass) {
      this._hass = hass;
      if (this.card) this.card.hass = hass;
      if (this._hassResolve) this._hassResolve();
    }
  }, {
    key: "render",
    value: function render() {
      return x(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([" <ha-card modcard> ", " </ha-card> "])), this.card);
    }
  }, {
    key: "getCardSize",
    value: function getCardSize() {
      if (this._config.report_size) return this._config.report_size;
      var ret = this.shadowRoot;
      if (ret) ret = ret.querySelector("ha-card card-maker");
      if (ret) ret = ret.getCardSize;
      if (ret) ret = ret();
      if (ret) return ret;
      return 1;
    }
  }]);
  return ModCard;
}(s);
__decorate([n()], ModCard.prototype, "card", void 0);
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
  return _regeneratorRuntime().wrap(function _callee21$(_context23) {
    while (1) switch (_context23.prev = _context23.next) {
      case 0:
        if (!(customElements.get("home-assistant") === undefined)) {
          _context23.next = 5;
          break;
        }
        _context23.next = 3;
        return new Promise(function (resolve) {
          return window.setTimeout(resolve, 100);
        });
      case 3:
        _context23.next = 0;
        break;
      case 5:
        if (!customElements.get("mod-card")) {
          customElements.define("mod-card", ModCard);
        }
      case 6:
      case "end":
        return _context23.stop();
    }
  }, _callee21);
}))();
function refresh_theme() {
  document.dispatchEvent(new Event("cm_update"));
}
var bases = [customElements.whenDefined("home-assistant"), customElements.whenDefined("hc-main")];
Promise.race(bases).then(function () {
  window.setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
    var _a, _b, hs;
    return _regeneratorRuntime().wrap(function _callee22$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return hass();
        case 2:
          hs = _context24.sent;
        case 3:
          if (hs) {
            _context24.next = 8;
            break;
          }
          _context24.next = 6;
          return new Promise(function (resolve) {
            return window.setTimeout(resolve, 500);
          });
        case 6:
          _context24.next = 3;
          break;
        case 8:
          hs.connection.subscribeEvents(function () {
            window.setTimeout(refresh_theme, 500);
          }, "themes_updated");
          (_a = document.querySelector("home-assistant")) === null || _a === void 0 ? void 0 : _a.addEventListener("settheme", refresh_theme);
          (_b = document.querySelector("hc-main")) === null || _b === void 0 ? void 0 : _b.addEventListener("settheme", refresh_theme);
        case 11:
        case "end":
          return _context24.stop();
      }
    }, _callee22);
  })), 1000);
});
var _a, _b, _c;
var scriptElements = document.querySelectorAll("script");
var resources = [];
var _iterator20 = _createForOfIteratorHelper(scriptElements),
  _step20;
try {
  for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
    var script = _step20.value;
    if ((_b = (_a = script === null || script === void 0 ? void 0 : script.innerText) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.startsWith("import(")) {
      var imports = (_c = script.innerText.split("\n")) === null || _c === void 0 ? void 0 : _c.map(function (e) {
        return e.trim();
      });
      var _iterator23 = _createForOfIteratorHelper(imports),
        _step23;
      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var imp = _step23.value;
          resources.push(imp.replace(/^import\(\"/, "").replace(/\"\);/, ""));
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }
    }
  }
} catch (err) {
  _iterator20.e(err);
} finally {
  _iterator20.f();
}
if (resources.some(function (r) {
  return r.includes("/card-mod.js");
})) ;else {
  console.info("You may not be getting optimal performance out of card-mod.\nSee https://github.com/thomasloven/lovelace-card-mod#performance-improvements");
}
