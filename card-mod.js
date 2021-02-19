/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/card-tools/src/deviceID.js":
/*!*************************************************!*\
  !*** ./node_modules/card-tools/src/deviceID.js ***!
  \*************************************************/
/*! exports provided: deviceID, setDeviceID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deviceID\", function() { return deviceID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setDeviceID\", function() { return setDeviceID; });\nconst ID_STORAGE_KEY = 'lovelace-player-device-id';\nfunction _deviceID() {\n  if(!localStorage[ID_STORAGE_KEY])\n  {\n    const s4 = () => {\n      return Math.floor((1+Math.random())*100000).toString(16).substring(1);\n    };\n    if(window['fully'] && typeof fully.getDeviceId === \"function\")\n      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();\n    else\n      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;\n  }\n  return localStorage[ID_STORAGE_KEY];\n};\n\nlet deviceID = _deviceID();\n\nconst setDeviceID = (id) => {\n  if(id === null) return;\n  if(id === \"clear\") {\n    localStorage.removeItem(ID_STORAGE_KEY)\n  } else {\n    localStorage[ID_STORAGE_KEY] = id;\n  }\n  deviceID = _deviceID();\n}\n\nconst params = new URLSearchParams(window.location.search);\nif(params.get('deviceID')) {\n  setDeviceID(params.get('deviceID'));\n}\n\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/deviceID.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/event.js":
/*!**********************************************!*\
  !*** ./node_modules/card-tools/src/event.js ***!
  \**********************************************/
/*! exports provided: fireEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fireEvent\", function() { return fireEvent; });\n/* harmony import */ var _hass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hass */ \"./node_modules/card-tools/src/hass.js\");\n\n\nfunction fireEvent(ev, detail, entity=null) {\n  ev = new Event(ev, {\n    bubbles: true,\n    cancelable: false,\n    composed: true,\n  });\n  ev.detail = detail || {};\n  if(entity) {\n    entity.dispatchEvent(ev);\n  } else {\n    var root = Object(_hass__WEBPACK_IMPORTED_MODULE_0__[\"lovelace_view\"])();\n    if (root) root.dispatchEvent(ev);\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/event.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/hass.js":
/*!*********************************************!*\
  !*** ./node_modules/card-tools/src/hass.js ***!
  \*********************************************/
/*! exports provided: hass, provideHass, lovelace, async_lovelace_view, lovelace_view, load_lovelace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hass\", function() { return hass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"provideHass\", function() { return provideHass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lovelace\", function() { return lovelace; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"async_lovelace_view\", function() { return async_lovelace_view; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lovelace_view\", function() { return lovelace_view; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load_lovelace\", function() { return load_lovelace; });\nfunction hass() {\n  if(document.querySelector('hc-main'))\n    return document.querySelector('hc-main').hass;\n\n  if(document.querySelector('home-assistant'))\n    return document.querySelector('home-assistant').hass;\n\n  return undefined;\n};\n\nfunction provideHass(element) {\n  if(document.querySelector('hc-main'))\n    return document.querySelector('hc-main').provideHass(element);\n\n  if(document.querySelector('home-assistant'))\n    return document.querySelector(\"home-assistant\").provideHass(element);\n\n  return undefined;\n}\n\nfunction lovelace() {\n  var root = document.querySelector(\"hc-main\");\n  if(root) {\n    var ll = root._lovelaceConfig;\n    ll.current_view = root._lovelacePath;\n    return ll;\n  }\n\n  root = document.querySelector(\"home-assistant\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n  root = root && root.shadowRoot || root;\n  root = root && root.querySelector(\"ha-panel-lovelace\")\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\")\n  if (root) {\n    var ll =  root.lovelace\n    ll.current_view = root.___curView;\n    return ll;\n  }\n\n  return null;\n}\n\nasync function await_el(el) {\n  if(!el) return;\n  await customElements.whenDefined(el.localName);\n  if(el.updateComplete)\n    await el.updateComplete;\n}\n\nasync function async_lovelace_view() {\n  var root = document.querySelector(\"hc-main\");\n  if(root) {\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"hc-lovelace\");\n    await_el(root);\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"hui-view\") || root.querySelector(\"hui-panel-view\");\n    await_el(root);\n    return root;\n  }\n\n  root = document.querySelector(\"home-assistant\");\n  await_el(root);\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  await_el(root);\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n  await_el(root);\n  root = root && root.shadowRoot || root;\n  root = root && root.querySelector(\"ha-panel-lovelace\");\n  await_el(root);\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\");\n  await_el(root);\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"ha-app-layout\")\n  await_el(root);\n  root = root && root.querySelector(\"#view\");\n  root = root && root.firstElementChild;\n  await_el(root);\n  return root;\n}\nfunction lovelace_view() {\n  var root = document.querySelector(\"hc-main\");\n  if(root) {\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"hc-lovelace\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"hui-view\") || root.querySelector(\"hui-panel-view\");\n    return root;\n  }\n\n  root = document.querySelector(\"home-assistant\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n  root = root && root.shadowRoot || root;\n  root = root && root.querySelector(\"ha-panel-lovelace\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"ha-app-layout\")\n  root = root && root.querySelector(\"#view\");\n  root = root && root.firstElementChild;\n  return root;\n}\n\nasync function load_lovelace() {\n  if(customElements.get(\"hui-view\")) return true;\n\n  await customElements.whenDefined(\"partial-panel-resolver\");\n  const ppr = document.createElement(\"partial-panel-resolver\");\n  ppr.hass = {panels: [{\n    url_path: \"tmp\",\n    \"component_name\": \"lovelace\",\n  }]};\n  ppr._updateRoutes();\n  await ppr.routerOptions.routes.tmp.load();\n  if(!customElements.get(\"ha-panel-lovelace\")) return false;\n  const p = document.createElement(\"ha-panel-lovelace\");\n  p.hass = hass();\n  if(p.hass === undefined) {\n    await new Promise(resolve => {\n      window.addEventListener('connection-status', (ev) => {\n        console.log(ev);\n        resolve();\n      }, {once: true});\n    });\n    p.hass = hass();\n  }\n  p.panel = {config: {mode: null}};\n  p._fetchConfig();\n  return true;\n}\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/hass.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/helpers.js":
/*!************************************************!*\
  !*** ./node_modules/card-tools/src/helpers.js ***!
  \************************************************/
/*! exports provided: selectTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectTree\", function() { return selectTree; });\nasync function _selectTree(root, path, all=false) {\n  let el = root;\n  if(typeof(path) === \"string\") {\n    path = path.split(/(\\$| )/);\n  }\n  if(path[path.length-1] === \"\")\n     path.pop();\n  for(const [i, p] of path.entries()) {\n    if(!p.trim().length) continue;\n    if(!el) return null;\n    if(el.localName && el.localName.includes(\"-\"))\n      await customElements.whenDefined(el.localName);\n    if(el.updateComplete)\n      await el.updateComplete;\n    if(p === \"$\")\n      if(all && i == path.length-1)\n        el = [el.shadowRoot];\n      else\n        el = el.shadowRoot;\n    else\n      if(all && i == path.length-1)\n        el = el.querySelectorAll(p);\n      else\n        el = el.querySelector(p);\n  }\n  return el;\n}\n\nasync function selectTree(root, path, all=false, timeout=10000) {\n  return Promise.race([\n    _selectTree(root, path, all),\n    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))\n  ]).catch((err) => {\n    if(!err.message || err.message !== \"timeout\")\n      throw(err);\n    return null;\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/helpers.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/lit-element.js":
/*!****************************************************!*\
  !*** ./node_modules/card-tools/src/lit-element.js ***!
  \****************************************************/
/*! exports provided: LitElement, html, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LitElement\", function() { return LitElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"html\", function() { return html; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"css\", function() { return css; });\nconst LitElement = customElements.get('home-assistant-main')\n  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))\n  : Object.getPrototypeOf(customElements.get('hui-view'));\n\nconst html = LitElement.prototype.html;\n\nconst css = LitElement.prototype.css;\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/lit-element.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/lovelace-element.js":
/*!*********************************************************!*\
  !*** ./node_modules/card-tools/src/lovelace-element.js ***!
  \*********************************************************/
/*! exports provided: CUSTOM_TYPE_PREFIX, DOMAINS_HIDE_MORE_INFO, createCard, createElement, createEntityRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CUSTOM_TYPE_PREFIX\", function() { return CUSTOM_TYPE_PREFIX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMAINS_HIDE_MORE_INFO\", function() { return DOMAINS_HIDE_MORE_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCard\", function() { return createCard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEntityRow\", function() { return createEntityRow; });\n/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _hass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hass */ \"./node_modules/card-tools/src/hass.js\");\n\n\n\nconst CUSTOM_TYPE_PREFIX = \"custom:\";\n\nconst DOMAINS_HIDE_MORE_INFO = [\n  \"input_number\",\n  \"input_select\",\n  \"input_text\",\n  \"scene\",\n  \"weblink\",\n];\n\nlet helpers = window.cardHelpers;\nconst helperPromise = new Promise(async (resolve, reject) => {\n  if(helpers) resolve();\n\n  const updateHelpers = async () => {\n    helpers = await window.loadCardHelpers();\n    window.cardHelpers = helpers;\n    resolve();\n  }\n\n  if(window.loadCardHelpers) {\n    updateHelpers();\n  } else {\n    // If loadCardHelpers didn't exist, force load lovelace and try once more.\n    window.addEventListener(\"load\", async () => {\n      Object(_hass__WEBPACK_IMPORTED_MODULE_1__[\"load_lovelace\"])();\n      if(window.loadCardHelpers) {\n        updateHelpers();\n      }\n    });\n  }\n});\n\nfunction errorElement(error, origConfig) {\n  const cfg = {\n    type: \"error\",\n    error,\n    origConfig,\n  };\n  const el = document.createElement(\"hui-error-card\");\n  customElements.whenDefined(\"hui-error-card\").then(() => {\n    const newel = document.createElement(\"hui-error-card\");\n    newel.setConfig(cfg);\n    if(el.parentElement)\n      el.parentElement.replaceChild(newel, el);\n  });\n  helperPromise.then(() => {\n    Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {}, el);\n  });\n  return el;\n}\n\nfunction _createElement(tag, config) {\n  let el = document.createElement(tag);\n  try {\n    el.setConfig(JSON.parse(JSON.stringify(config)));\n  } catch (err) {\n    el = errorElement(err, config);\n  }\n  helperPromise.then(() => {\n    Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {}, el);\n  });\n  return el;\n}\n\nfunction createLovelaceElement(thing, config) {\n  if(!config || typeof config !== \"object\" || !config.type)\n    return errorElement(`No ${thing} type configured`, config);\n\n  let tag = config.type;\n  if(tag.startsWith(CUSTOM_TYPE_PREFIX))\n    tag = tag.substr(CUSTOM_TYPE_PREFIX.length);\n  else\n    tag = `hui-${tag}-${thing}`;\n\n  if(customElements.get(tag))\n    return _createElement(tag, config);\n\n  const el = errorElement(`Custom element doesn't exist: ${tag}.`, config);\n  el.style.display = \"None\";\n\n  const timer = setTimeout(() => {\n    el.style.display = \"\";\n  }, 2000);\n\n  customElements.whenDefined(tag).then(() => {\n    clearTimeout(timer);\n    Object(_event__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {}, el);\n  });\n\n  return el;\n}\n\nfunction createCard(config) {\n  if(helpers) return helpers.createCardElement(config);\n  return createLovelaceElement('card', config);\n}\nfunction createElement(config) {\n  if(helpers) return helpers.createHuiElement(config);\n  return createLovelaceElement('element', config);\n}\nfunction createEntityRow(config) {\n  if(helpers) return helpers.createRowElement(config);\n  const SPECIAL_TYPES = new Set([\n    \"call-service\",\n    \"cast\",\n    \"conditional\",\n    \"divider\",\n    \"section\",\n    \"select\",\n    \"weblink\",\n  ]);\n  const DEFAULT_ROWS = {\n    alert: \"toggle\",\n    automation: \"toggle\",\n    climate: \"climate\",\n    cover: \"cover\",\n    fan: \"toggle\",\n    group: \"group\",\n    input_boolean: \"toggle\",\n    input_number: \"input-number\",\n    input_select: \"input-select\",\n    input_text: \"input-text\",\n    light: \"toggle\",\n    lock: \"lock\",\n    media_player: \"media-player\",\n    remote: \"toggle\",\n    scene: \"scene\",\n    script: \"script\",\n    sensor: \"sensor\",\n    timer: \"timer\",\n    switch: \"toggle\",\n    vacuum: \"toggle\",\n    water_heater: \"climate\",\n    input_datetime: \"input-datetime\",\n    none: undefined,\n  };\n\n  if(!config)\n    return errorElement(\"Invalid configuration given.\", config);\n  if(typeof config === \"string\")\n    config = {entity: config};\n  if(typeof config !== \"object\" || (!config.entity && !config.type))\n    return errorElement(\"Invalid configuration given.\", config);\n\n  const type = config.type || \"default\";\n  if(SPECIAL_TYPES.has(type) || type.startsWith(CUSTOM_TYPE_PREFIX))\n    return createLovelaceElement('row', config);\n\n  const domain = config.entity ? config.entity.split(\".\", 1)[0]: \"none\";\n  return createLovelaceElement('entity-row', {\n    type: DEFAULT_ROWS[domain] || \"text\",\n    ...config\n  });\n}\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/lovelace-element.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/templates.js":
/*!**************************************************!*\
  !*** ./node_modules/card-tools/src/templates.js ***!
  \**************************************************/
/*! exports provided: parseTemplate, hasTemplate, subscribeRenderTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseTemplate\", function() { return parseTemplate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasTemplate\", function() { return hasTemplate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subscribeRenderTemplate\", function() { return subscribeRenderTemplate; });\n/* harmony import */ var _hass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hass.js */ \"./node_modules/card-tools/src/hass.js\");\n/* harmony import */ var _deviceID_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deviceID.js */ \"./node_modules/card-tools/src/deviceID.js\");\n\n\n\nasync function parseTemplate(hass, str, specialData = {}) {\n  if (!hass) hass = hass();\n  if (typeof(specialData === \"string\")) specialData = {};\n    specialData = Object.assign({\n      user: hass.user.name,\n      browser: _deviceID_js__WEBPACK_IMPORTED_MODULE_1__[\"deviceID\"],\n      hash: location.hash.substr(1) || ' ',\n    },\n    specialData);\n\n    for (var k in specialData) {\n      var re = new RegExp(`\\\\{${k}\\\\}`, \"g\");\n      str = str.replace(re, specialData[k]);\n    }\n\n    return hass.callApi(\"POST\", \"template\", {template: str});\n};\n\nfunction hasTemplate(str) {\n  if(String(str).includes(\"{%\"))\n    return true;\n  if(String(str).includes(\"{{\"))\n    return true;\n}\n\nfunction subscribeRenderTemplate(conn, onChange, params, stringify=true) {\n  // params = {template, entity_ids, variables}\n  if(!conn)\n    conn = Object(_hass_js__WEBPACK_IMPORTED_MODULE_0__[\"hass\"])().connection;\n  let variables = {\n    user: Object(_hass_js__WEBPACK_IMPORTED_MODULE_0__[\"hass\"])().user.name,\n    browser: _deviceID_js__WEBPACK_IMPORTED_MODULE_1__[\"deviceID\"],\n    hash: location.hash.substr(1) || ' ',\n    ...params.variables,\n  };\n  let template = params.template;\n  let entity_ids = params.entity_ids;\n\n  return conn.subscribeMessage(\n    (msg) => {\n      if(stringify) {\n        let res = String(msg.result);\n        // Localize \"_(key)\" if found in template results\n        const localize_function = /_\\([^)]*\\)/g;\n        res = res.replace(localize_function, (key) => Object(_hass_js__WEBPACK_IMPORTED_MODULE_0__[\"hass\"])().localize(key.substring(2, key.length-1)) || key);\n        onChange(res);\n      } else {\n        onChange(msg.result);\n      }\n    },\n    { type: \"render_template\",\n      template,\n      variables,\n      entity_ids,\n    }\n  );\n};\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/templates.js?");

/***/ }),

/***/ "./node_modules/card-tools/src/yaml.js":
/*!*********************************************!*\
  !*** ./node_modules/card-tools/src/yaml.js ***!
  \*********************************************/
/*! exports provided: yaml2json */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"yaml2json\", function() { return yaml2json; });\nconst _load_yaml2json = async () => {\n  if(customElements.get(\"developer-tools-event\")) return;\n\n  await customElements.whenDefined(\"partial-panel-resolver\");\n  const ppr = document.createElement('partial-panel-resolver');\n\n  ppr.hass = {panels: [{\n    url_path: \"tmp\",\n    component_name: \"developer-tools\",\n  }]};\n  ppr._updateRoutes();\n\n  await ppr.routerOptions.routes.tmp.load()\n\n  await customElements.whenDefined(\"developer-tools-router\");\n  const dtr = document.createElement(\"developer-tools-router\");\n  await dtr.routerOptions.routes.event.load();\n}\n\nconst yaml2json = async (yaml) => {\n  await _load_yaml2json();\n  const el = document.createElement(\"developer-tools-event\");\n  return el._computeParsedEventData(yaml);\n}\n\n\n//# sourceURL=webpack:///./node_modules/card-tools/src/yaml.js?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, private, version, description, scripts, keywords, author, license, devDependencies, dependencies, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"card-mod\\\",\\\"private\\\":true,\\\"version\\\":\\\"2.0.3\\\",\\\"description\\\":\\\"\\\",\\\"scripts\\\":{\\\"build\\\":\\\"webpack\\\",\\\"watch\\\":\\\"webpack --watch --mode=development\\\",\\\"update-card-tools\\\":\\\"npm uninstall card-tools && npm install thomasloven/lovelace-card-tools\\\"},\\\"keywords\\\":[],\\\"author\\\":\\\"Thomas Lovén\\\",\\\"license\\\":\\\"MIT\\\",\\\"devDependencies\\\":{\\\"webpack\\\":\\\"^4.46.0\\\",\\\"webpack-cli\\\":\\\"^3.3.12\\\"},\\\"dependencies\\\":{\\\"card-tools\\\":\\\"github:thomasloven/lovelace-card-tools\\\"}}\");\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/card-mod.js":
/*!*************************!*\
  !*** ./src/card-mod.js ***!
  \*************************/
/*! exports provided: applyToElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyToElement\", function() { return applyToElement; });\n/* harmony import */ var card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/lit-element */ \"./node_modules/card-tools/src/lit-element.js\");\n/* harmony import */ var card_tools_src_templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! card-tools/src/templates */ \"./node_modules/card-tools/src/templates.js\");\n/* harmony import */ var card_tools_src_hass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! card-tools/src/hass */ \"./node_modules/card-tools/src/hass.js\");\n/* harmony import */ var card_tools_src_yaml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! card-tools/src/yaml */ \"./node_modules/card-tools/src/yaml.js\");\n/* harmony import */ var card_tools_src_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! card-tools/src/helpers */ \"./node_modules/card-tools/src/helpers.js\");\n\n\n\n\n\n\nconst EMPTY_TEMPLATE = {template: \"\", variables: {}, entity_ids: []};\n\nconst applyToElement = async (el, type, template, variables, entity_ids, shadow=true) => {\n  if(el.localName.includes(\"-\"))\n    await customElements.whenDefined(el.localName);\n  if(el.updateComplete)\n    await el.updateComplete;\n\n  if(el.modElement)\n    return applyToElement(el.modElement, type, template, variables, entity_ids, shadow);\n\n  el._cardMod = el._cardMod || document.createElement(\"card-mod\");\n  const target = shadow ? (el.shadowRoot || el) : el;\n  target.appendChild(el._cardMod);\n  if(el.updateComplete)\n    await el.updateComplete;\n  el._cardMod.type = type;\n  el._cardMod.template = {\n    template,\n    variables,\n    entity_ids,\n  };\n}\n\nclass CardMod extends card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      _renderedStyles: {},\n      _renderer: {},\n    }\n  }\n\n  static get applyToElement() { return applyToElement; }\n\n  constructor() {\n    super();\n    document.querySelector(\"home-assistant\").addEventListener(\"settheme\", () => {this._setTemplate(this._data)});\n  }\n\n  connectedCallback() {\n    super.connectedCallback();\n    this.template = this._data;\n    this.setAttribute(\"slot\", \"none\");\n  }\n\n  async getTheme() {\n    if(!this.type) return null;\n    let el = this.parentElement ? this.parentElement : this;\n    const theme = window.getComputedStyle(el).getPropertyValue(\"--card-mod-theme\");\n\n    const themes = Object(card_tools_src_hass__WEBPACK_IMPORTED_MODULE_2__[\"hass\"])().themes.themes;\n    if(!themes[theme]) return null;\n    if(themes[theme][`card-mod-${this.type}-yaml`])\n      return await Object(card_tools_src_yaml__WEBPACK_IMPORTED_MODULE_3__[\"yaml2json\"])(themes[theme][`card-mod-${this.type}-yaml`])\n    if(themes[theme][`card-mod-${this.type}`])\n      return themes[theme][`card-mod-${this.type}`]\n    return null;\n  }\n\n  set template(data) {\n    if(!data) return;\n    this._data = JSON.parse(JSON.stringify(data));\n\n    this.themeApplied = this._setTemplate(this._data);\n  }\n\n  async _setTemplate(data) {\n    if(!this._parent) {\n      data.theme_template = await this.getTheme();\n      if(typeof(data.template) === \"string\") {\n        data.template = {\".\": data.template};\n      }\n      if(typeof(data.theme_template) === \"string\") {\n        data.theme_template = {\".\": data.theme_template};\n      }\n    }\n\n    // if(data.template && JSON.stringify(data.template).includes(\"config.entity\") && !data.entity_ids) {\n    //   if(data.variables.config && data.variables.config.entity)\n    //     data.entity_ids = [data.variables.config.entity]\n    // }\n\n    await this.setStyle(data);\n  }\n\n  async unStyle() {\n    this._styledChildren = this._styledChildren || new Set();\n    for(const c of this._styledChildren) {\n      c.template = EMPTY_TEMPLATE;\n    }\n  }\n\n  _mergeDeep(target, source) {\n    const isObject = (i) => {\n      return (i && typeof i === \"object\" && !Array.isArray(i));\n    };\n    if (isObject(target) && isObject(source)) {\n      for (const key in source) {\n        if (isObject(source[key])) {\n          if(!target[key]) Object.assign(target, { [key]: {} });\n          if(typeof(target[key]) === \"string\")\n            target[key] = {\".\": target[key]};\n          this._mergeDeep(target[key], source[key]);\n        } else {\n          if(target[key])\n            target[key] = source[key] + target[key];\n          else\n            target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  }\n\n  async setStyle(data) {\n\n    let { template, theme_template, variables, entity_ids } = data;\n\n    await this.unStyle();\n\n    if(!template) template = {};\n    template = JSON.parse(JSON.stringify(template));\n    this._mergeDeep(template, theme_template);\n\n    if(typeof template === \"string\") {\n      this._renderedStyles = template;\n      if(this._renderer) {\n        try {\n          await this._renderer();\n        } catch(err) {\n          if(!err.code || err.code !== \"not_found\")\n            throw(err);\n        }\n        this._renderer = undefined;\n      }\n\n      if(Object(card_tools_src_templates__WEBPACK_IMPORTED_MODULE_1__[\"hasTemplate\"])(template)) {\n        this._renderer = await Object(card_tools_src_templates__WEBPACK_IMPORTED_MODULE_1__[\"subscribeRenderTemplate\"])(\n          null,\n          (res) => {\n            this._renderedStyles = res;\n          },\n          { template, variables}\n        )\n      }\n      return;\n    }\n\n    await this.updateComplete;\n    const parent = this.parentElement || this.parentNode;\n    if(!parent) return {template: \"\", variable, entity_ids};\n    if(parent.updateComplete) await parent.updateComplete;\n    for(const k of Object.keys(template)) {\n      let next = [];\n      if(k === \".\") {\n        this.setStyle({template: template[k], variables, entity_ids});\n        continue;\n      } else {\n        next = await Object(card_tools_src_helpers__WEBPACK_IMPORTED_MODULE_4__[\"selectTree\"])(parent, k, true);\n      }\n      if(!next.length) continue;\n      for(const el of next) {\n        if(!el) continue;\n        let styleEl = el.querySelector(\":scope > card-mod\");\n        if(!styleEl || styleEl._parent !== (this._parent || this)) {\n          styleEl = document.createElement(\"card-mod\");\n          this._styledChildren.add(styleEl);\n          styleEl._parent = (this._parent || this);\n        }\n        styleEl.template = {template: template[k], variables, entity_ids};\n        el.appendChild(styleEl);\n        await styleEl.themeApplied;\n      }\n    }\n\n  }\n\n  createRenderRoot() { return this; }\n  render() {\n    return card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n      <style>\n        ${this._renderedStyles}\n      </style>\n    `;\n  }\n\n}\n\nif(!customElements.get(\"card-mod\")) {\n  customElements.define('card-mod', CardMod);\n  const pjson = __webpack_require__(/*! ../package.json */ \"./package.json\");\n  console.info(`%cCARD-MOD ${pjson.version} IS INSTALLED`,\n  \"color: green; font-weight: bold\",\n  \"\");\n}\n\n\n//# sourceURL=webpack:///./src/card-mod.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-mod */ \"./src/card-mod.js\");\n/* harmony import */ var _patch_ha_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patch/ha-card */ \"./src/patch/ha-card.js\");\n/* harmony import */ var _patch_hui_entities_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patch/hui-entities-card */ \"./src/patch/hui-entities-card.js\");\n/* harmony import */ var _patch_hui_glance_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./patch/hui-glance-card */ \"./src/patch/hui-glance-card.js\");\n/* harmony import */ var _patch_hui_state_label_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./patch/hui-state-label-badge */ \"./src/patch/hui-state-label-badge.js\");\n/* harmony import */ var _patch_hui_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patch/hui-view */ \"./src/patch/hui-view.js\");\n/* harmony import */ var _patch_hui_root__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./patch/hui-root */ \"./src/patch/hui-root.js\");\n/* harmony import */ var _patch_ha_more_info_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./patch/ha-more-info-dialog */ \"./src/patch/ha-more-info-dialog.js\");\n/* harmony import */ var _mod_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mod-card */ \"./src/mod-card.js\");\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/mod-card.js":
/*!*************************!*\
  !*** ./src/mod-card.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/lit-element */ \"./node_modules/card-tools/src/lit-element.js\");\n/* harmony import */ var card_tools_src_lovelace_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! card-tools/src/lovelace-element */ \"./node_modules/card-tools/src/lovelace-element.js\");\n/* harmony import */ var card_tools_src_hass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! card-tools/src/hass */ \"./node_modules/card-tools/src/hass.js\");\n\n\n\n\nconst NO_STYLE = `\nha-card {\n  background: none;\n  box-shadow: none;\n}`;\n\nclass ModCard extends card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n    static get properties() {\n      return {\n        hass: {},\n      };\n    }\n    setConfig(config) {\n        this._config = JSON.parse(JSON.stringify(config));\n        if(config.style === undefined)\n        {\n          this._config.style = NO_STYLE;\n        } else if (typeof(config.style) === \"string\") {\n          this._config.style = NO_STYLE + config.style;\n        } else if (config.style[\".\"]) {\n          this._config.style[\".\"] = NO_STYLE + config.style[\".\"];\n        } else {\n          this._config.style[\".\"] = NO_STYLE;\n        }\n\n        this.card = Object(card_tools_src_lovelace_element__WEBPACK_IMPORTED_MODULE_1__[\"createCard\"])(this._config.card);\n        this.card.hass = Object(card_tools_src_hass__WEBPACK_IMPORTED_MODULE_2__[\"hass\"])();\n    }\n\n    render() {\n        return card_tools_src_lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`\n          <ha-card modcard>\n          ${this.card}\n          </ha-card>\n        `;\n    }\n\n    set hass(hass) {\n      if(!this.card) return;\n      this.card.hass = hass;\n    }\n\n    getCardSize() {\n      if(this._config.report_size)\n        return this._config.report_size;\n      let ret = this.shadowRoot;\n      if(ret) ret = ret.querySelector(\"ha-card card-maker\");\n      if(ret) ret = ret.getCardSize;\n      if(ret) ret = ret();\n      if(ret) return ret;\n      return 1;\n    }\n}\n\ncustomElements.define(\"mod-card\", ModCard);\n\n\n//# sourceURL=webpack:///./src/mod-card.js?");

/***/ }),

/***/ "./src/patch/ha-card.js":
/*!******************************!*\
  !*** ./src/patch/ha-card.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined('ha-card').then(() => {\n  const HaCard = customElements.get('ha-card');\n  if(HaCard.prototype.cardmod_patched) return;\n  HaCard.prototype.cardmod_patched = true;\n\n  const findConfig = function(node) {\n    if(node.config)\n      return node.config;\n    if(node._config)\n      return node._config;\n    if(node.host)\n      return findConfig(node.host);\n    if(node.parentElement)\n      return findConfig(node.parentElement);\n    if(node.parentNode)\n      return findConfig(node.parentNode);\n    return null;\n  };\n\n\n  const oldFirstUpdated = HaCard.prototype.firstUpdated;\n  HaCard.prototype.firstUpdated = function(changedProperties) {\n    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);\n    // Move the header inside the slot instead of in the shadowDOM\n    // makes it easier to style it consistently\n    const header = this.shadowRoot.querySelector(\".card-header\");\n    if(header)\n    {\n      this.insertBefore(header, this.children[0]);\n    }\n\n    const config = findConfig(this);\n\n    if(!config) return;\n\n    if(config.class)\n      this.classList.add(config.class);\n    if(config.type)\n      this.classList.add(`type-${config.type.replace(\":\",\"-\")}`);\n\n    const apply = () => Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(this, \"card\", config.style, {config}, config.entity_ids, false);\n\n    apply();\n  }\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])('ll-rebuild', {});\n});\n\n\n//# sourceURL=webpack:///./src/patch/ha-card.js?");

/***/ }),

/***/ "./src/patch/ha-more-info-dialog.js":
/*!******************************************!*\
  !*** ./src/patch/ha-more-info-dialog.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\ncustomElements.whenDefined(\"ha-more-info-dialog\").then(() => {\n\n  const HaMoreInfoDialog = customElements.get(\"ha-more-info-dialog\");\n  if(HaMoreInfoDialog.prototype.cardmod_patched) return;\n  HaMoreInfoDialog.prototype.cardmod_patched = true;\n\n  const oldShowDialog = HaMoreInfoDialog.prototype.showDialog;\n  HaMoreInfoDialog.prototype.showDialog = function(params) {\n    const apply = () => {Object(_card_mod__WEBPACK_IMPORTED_MODULE_0__[\"applyToElement\"])(this.shadowRoot.querySelector(\"ha-dialog\"), \"more-info\", \"\", {config: params}, [params.entityId], false)};\n\n    oldShowDialog.bind(this)(params);\n\n    this.requestUpdate().then( async() => {\n      await this.shadowRoot.querySelector(\"ha-dialog\").updateComplete;\n      apply();\n\n    });\n  };\n\n    let root = document.querySelector(\"home-assistant\");\n    root = root && root.shadowRoot;\n    root = root && root.querySelector(\"ha-more-info-dialog\");\n\n    if(root) {\n      root.showDialog = HaMoreInfoDialog.prototype.showDialog.bind(root);\n      root.showDialog({entityId: root.entityId});\n    }\n});\n\n\n//# sourceURL=webpack:///./src/patch/ha-more-info-dialog.js?");

/***/ }),

/***/ "./src/patch/hui-entities-card.js":
/*!****************************************!*\
  !*** ./src/patch/hui-entities-card.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined('hui-entities-card').then(() => {\n  const EntitiesCard = customElements.get('hui-entities-card');\n  if(EntitiesCard.prototype.cardmod_patched) return;\n  EntitiesCard.prototype.cardmod_patched = true;\n\n  const oldRenderEntity = EntitiesCard.prototype.renderEntity;\n  EntitiesCard.prototype.renderEntity = function(config) {\n\n    const retval = oldRenderEntity.bind(this)(config);\n\n    if(!config) return retval;\n    if(!retval || !retval.values) return retval;\n    const row = retval.values[0];\n    if(!row) return retval;\n\n    let entity_ids = config.entity_ids;\n\n    if(config.class)\n      row.classList.add(config.class);\n\n    const apply = () => Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(row, \"row\", config.style, {config}, config.entity_ids);\n\n    apply();\n    if(retval.values[0])\n      retval.values[0].addEventListener(\"ll-rebuild\", apply);\n    return retval;\n  }\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])('ll-rebuild', {});\n});\n\n\n//# sourceURL=webpack:///./src/patch/hui-entities-card.js?");

/***/ }),

/***/ "./src/patch/hui-glance-card.js":
/*!**************************************!*\
  !*** ./src/patch/hui-glance-card.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined('hui-glance-card').then(() => {\n  const GlanceCard = customElements.get('hui-glance-card');\n  if(GlanceCard.prototype.cardmod_patched) return;\n  GlanceCard.prototype.cardmod_patched = true;\n\n  const oldFirstUpdated = GlanceCard.prototype.firstUpdated;\n  GlanceCard.prototype.firstUpdated = function (changedProperties) {\n    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);\n    const entities = this.shadowRoot.querySelectorAll(\"ha-card div.entity\");\n    entities.forEach((e) => {\n      const root = e.attachShadow({mode: \"open\"});\n      [...e.children].forEach((el) => root.appendChild(el));\n      const styletag = document.createElement(\"style\");\n      root.appendChild(styletag);\n      styletag.innerHTML = `\n      :host {\n        box-sizing: border-box;\n        padding: 0 4px;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        cursor: pointer;\n        margin-bottom: 12px;\n        width: var(--glance-column-width, 20%);\n      }\n      div {\n        width: 100%;\n        text-align: center;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n      .name {\n        min-height: var(--paper-font-body1_-_line-height, 20px);\n      }\n      state-badge {\n        margin: 8px 0;\n      }\n      `;\n\n      const config = e.config || e.entityConf;\n      if(!config) return;\n      let entity_ids = config.entity_ids;\n\n      if(config.class)\n        e.classList.add(config.class);\n\n      const apply = () => Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(e, \"glance\", config.style, {config}, config.entity_ids);\n\n      apply();\n    });\n  }\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])('ll-rebuild', {});\n});\n\n\n//# sourceURL=webpack:///./src/patch/hui-glance-card.js?");

/***/ }),

/***/ "./src/patch/hui-root.js":
/*!*******************************!*\
  !*** ./src/patch/hui-root.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined(\"hui-root\").then(() => {\n  const huiRoot = customElements.get(\"hui-root\");\n  if(huiRoot.prototype.cardmod_patched) return;\n  huiRoot.prototype.cardmod_patched = true;\n\n  const oldFirstUpdated = huiRoot.prototype.firstUpdated;\n  huiRoot.prototype.firstUpdated = async function(changedProperties) {\n    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);\n    const apply = () => {Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(this, \"root\", \"\", {}, [])};\n\n    apply();\n  };\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {});\n  let root = document.querySelector(\"home-assistant\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"home-assistant-main\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"app-drawer-layout partial-panel-resolver\");\n\n  root = root && root.querySelector(\"ha-panel-lovelace\");\n  root = root && root.shadowRoot;\n  root = root && root.querySelector(\"hui-root\");\n  if(root)\n    root.firstUpdated();\n\n});\n\n\n//# sourceURL=webpack:///./src/patch/hui-root.js?");

/***/ }),

/***/ "./src/patch/hui-state-label-badge.js":
/*!********************************************!*\
  !*** ./src/patch/hui-state-label-badge.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined('hui-state-label-badge').then(() => {\n    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');\n    if(HuiStateLabelBadge.prototype.cardmod_patched) return;\n    HuiStateLabelBadge.prototype.cardmod_patched = true;\n\n    const oldFirstUpdated = HuiStateLabelBadge.prototype.firstUpdated;\n    HuiStateLabelBadge.prototype.firstUpdated = function(changedProperties) {\n      if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);\n      const config = this._config;\n      if(!config) return;\n\n      let entity_ids = config.entity_ids;\n\n      if(config.class)\n        this.classList.add(config.class);\n\n      const apply = () => Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(this, \"badge\", config.style, {config}, config.entity_ids);\n\n      apply();\n    }\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])('ll-rebuild', {});\n});\n\n\n//# sourceURL=webpack:///./src/patch/hui-state-label-badge.js?");

/***/ }),

/***/ "./src/patch/hui-view.js":
/*!*******************************!*\
  !*** ./src/patch/hui-view.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-tools/src/event.js */ \"./node_modules/card-tools/src/event.js\");\n/* harmony import */ var _card_mod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card-mod */ \"./src/card-mod.js\");\n\n\n\ncustomElements.whenDefined(\"hui-view\").then(() => {\n  const huiView = customElements.get(\"hui-view\");\n  if(huiView.prototype.cardmod_patched) return;\n  huiView.prototype.cardmod_patched = true;\n\n  const oldFirstUpdated = huiView.prototype.firstUpdated;\n  huiView.prototype.firstUpdated = function(changedProperties) {\n    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);\n    const apply = () => Object(_card_mod__WEBPACK_IMPORTED_MODULE_1__[\"applyToElement\"])(this, \"view\", \"\", {}, []);\n\n    apply();\n  };\n\n  Object(card_tools_src_event_js__WEBPACK_IMPORTED_MODULE_0__[\"fireEvent\"])(\"ll-rebuild\", {});\n\n});\n\n\n//# sourceURL=webpack:///./src/patch/hui-view.js?");

/***/ })

/******/ });