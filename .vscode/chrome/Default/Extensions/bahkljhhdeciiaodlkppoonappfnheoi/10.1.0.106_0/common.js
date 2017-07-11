/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"background","1":"client"}[chunkId]||chunkId) + ".v0.0.1.min.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CONFIG_PATH = exports.CONFIG_PATH = 'content/asstes';
	var WEATHER_API_KEY = exports.WEATHER_API_KEY = '4c48e554026a4c9e97b3b2dc8824b559'; //http://openweathermap.org/ (billingit@)

	var GEO_DATA_KEY = exports.GEO_DATA_KEY = 'geodata';
	var COUNTRY_CODE_KEY = exports.COUNTRY_CODE_KEY = 'cc';
	var GEO_LOCATOR_KEY = exports.GEO_LOCATOR_KEY = 'geolocator';
	var DATE_FORMAT_KEY = exports.DATE_FORMAT_KEY = 'date_format';
	var CITY_KEY = exports.CITY_KEY = 'city';
	var LATITUDE_KEY = exports.LATITUDE_KEY = 'latitude';
	var LONGITUDE_KEY = exports.LONGITUDE_KEY = 'longitude';
	var UNITS_WEATHER_KEY = exports.UNITS_WEATHER_KEY = 'units_weather';
	var SELECTED_SEARCH_CATEGORY_KEY = exports.SELECTED_SEARCH_CATEGORY_KEY = 'selected_cat';
	var SELECTED_SEARCH_ENGINE_KEY = exports.SELECTED_SEARCH_ENGINE_KEY = 'sengine';
	var TEMP_SEARCH_ENGINE_KEY = exports.TEMP_SEARCH_ENGINE_KEY = 'sengineTemp';
	var LABEL_KEY = exports.LABEL_KEY = 'label';
	var TYPE_KEY = exports.TYPE_KEY = 'type';
	var BACKGROUND_COLOR_KEY = exports.BACKGROUND_COLOR_KEY = 'bg_color';
	var BACKGROUND_IMAGE_KEY = exports.BACKGROUND_IMAGE_KEY = 'bg_img';
	var TRACK_KEY = exports.TRACK_KEY = 'track';
	var VERIFIED_HOST_KEY = exports.VERIFIED_HOST_KEY = 'verified_host';
	var CONFIG_SERVER_KEY = exports.CONFIG_SERVER_KEY = 'config_server';
	var UNINSTALL_URL_FORMAT_KEY = exports.UNINSTALL_URL_FORMAT_KEY = 'uninstall_url_format';
	var UNINSTALL_DOMAIN = exports.UNINSTALL_DOMAIN = 'uninstall_domain';
	var DEFUALT_AFLT_FORMAT_KEY = exports.DEFUALT_AFLT_FORMAT_KEY = 'defualt_aflt_format';
	var POPUP_DELAY_KEY = exports.POPUP_DELAY_KEY = 'popup_delay';
	var FIRST_RUN_KEY = exports.FIRST_RUN_KEY = 'firstRun';
	var GUID_KEY = exports.GUID_KEY = 'guid';
	var XLP_PERS_GUID_KEY = exports.XLP_PERS_GUID_KEY = 'xlp_pers_guid';
	var FIRST_VER_KEY = exports.FIRST_VER_KEY = 'firstVer';
	var LAST_VER_KEY = exports.LAST_VER_KEY = 'lastVer';
	var SRCH_MFST_KEY = exports.SRCH_MFST_KEY = 'srch.mfst';
	var LFC_ALV_KEY = exports.LFC_ALV_KEY = 'lfc.alv';
	var C_ALV_KEY = exports.C_ALV_KEY = 'c.alv';
	var AFLT_KEY = exports.AFLT_KEY = 'aflt';
	var B_AFLT_KEY = exports.B_AFLT_KEY = 'bptag';
	var LFC_ITH_KEY = exports.LFC_ITH_KEY = 'lfc.ith';
	var LS_TS_KEY = exports.LS_TS_KEY = 'ls_ts'; // Local storage time stamp
	var UREF_KEY = exports.UREF_KEY = 'uref';
	var LS_DATA_COOKIE_ID = exports.LS_DATA_COOKIE_ID = 'ls_data';
	var URL_DATA_COOKIE_ID = exports.URL_DATA_COOKIE_ID = 'url_data';
	var ABTEST_ID_KEY = exports.ABTEST_ID_KEY = 'abid';
	var GROUP_ID_KEY = exports.GROUP_ID_KEY = 'xt_abg';
	var GROUP_ID_VALIDATION_KEY = exports.GROUP_ID_VALIDATION_KEY = 'xt_abg_valid';
	var SECURE_HTTP_KEY = exports.SECURE_HTTP_KEY = 'sec_http';
	var COOKIE_NAME_KEY = exports.COOKIE_NAME_KEY = 'ck_name';
	var ENGINE_ID_KEY = exports.ENGINE_ID_KEY = 'engine_id';
	var VISUAL_ID_KEY = exports.VISUAL_ID_KEY = 'visual_id';
	var CONFIG_ID_KEY = exports.CONFIG_ID_KEY = 'config_id';
	var CONFIG_ID_VALIDATION_KEY = exports.CONFIG_ID_VALIDATION_KEY = 'config_id_valid';
	var ENGINE_VERSION_KEY = exports.ENGINE_VERSION_KEY = 'engine_ver';
	var SERVER_REQUEST_COUNTER_KEY = exports.SERVER_REQUEST_COUNTER_KEY = 'req_c';
	var FIRST_CONFIG_LOAD = exports.FIRST_CONFIG_LOAD = 'firstCfgLoad';
	var SERVER_REQUEST_TIMESTAMP_KEY = exports.SERVER_REQUEST_TIMESTAMP_KEY = 'req_ts';
	var SERVER_REQUEST_INTERVAL_KEY = exports.SERVER_REQUEST_INTERVAL_KEY = 'req_intr';
	var ENGINES_KEY = exports.ENGINES_KEY = 'engines';
	var CHECKER_F_URL_KEY = exports.CHECKER_F_URL_KEY = 'checker_f_url';
	var CHECKER_T_URL_KEY = exports.CHECKER_T_URL_KEY = 'checker_t_url';
	var TRACKING_PROPERTIES_KEY = exports.TRACKING_PROPERTIES_KEY = 'tracking';
	var TRANSLATION_ACTIVE_KEY = exports.TRANSLATION_ACTIVE_KEY = 'trans_active';
	var NEW_DAY = exports.NEW_DAY = 'new_day';
	var TOPSITES_FAVICON_TEMPLATE = exports.TOPSITES_FAVICON_TEMPLATE = 'topSitesFavicon';
	var TOPSITES_SCREENSHOT_TEMPLATE = exports.TOPSITES_SCREENSHOT_TEMPLATE = 'topSitesScreenshot';
	var TOPSITES_URL_TEMPLATE = exports.TOPSITES_URL_TEMPLATE = 'topSitesUrl';
	var TOPSITES_TITLE_TEMPLATE = exports.TOPSITES_TITLE_TEMPLATE = 'topSitesTitle';
	var ALIVE_DYNAMIC_REPORTS_KEY = exports.ALIVE_DYNAMIC_REPORTS_KEY = 'alv.dyn';
	var THANK_YOU_PAGE_EVENT_KEY = exports.THANK_YOU_PAGE_EVENT_KEY = 'ThankUPage';
	var THANK_YOU_PAGE_OPENED_KEY = exports.THANK_YOU_PAGE_OPENED_KEY = 'thank_you_page_opened';
	var RATE_US_SHOW_TIME = exports.RATE_US_SHOW_TIME = 'rate.us.time';
	var COOKIE_VALUE = exports.COOKIE_VALUE = 'lpcv'; //landing page cookie value

	var TOPSITES_KEY = exports.TOPSITES_KEY = 'topsites';
	var TOPSITES_SCREENSHOTS_KEY = exports.TOPSITES_SCREENSHOTS_KEY = 'screenshots';

	// Track events
	var ALIVE_TRACK_EVENT = exports.ALIVE_TRACK_EVENT = 'alive';
	var SEARCH_OB_TRACK_EVENT = exports.SEARCH_OB_TRACK_EVENT = 'search-ob';
	var ERROR_TRACK_EVENT = exports.ERROR_TRACK_EVENT = 'error';
	var ALIVE_DYNAMIC_TRACK_EVENT = exports.ALIVE_DYNAMIC_TRACK_EVENT = 'n.alive';

	// Tracking usage
	var RID_KEY = exports.RID_KEY = 'rid';
	var RID_URL_KEY = exports.RID_URL_KEY = 'rid_url';
	var RID_VERIFY_KEY = exports.RID_VERIFY_KEY = 'rid_verify';

	// Service keys
	var PREFERENCES_SERVICE = exports.PREFERENCES_SERVICE = 'PreferencesService';
	var CHROME_SERVICE = exports.CHROME_SERVICE = 'ChromeService';
	var SEARCH_SERVICE = exports.SEARCH_SERVICE = 'SearchService';
	var TRACKING_SERVICE = exports.TRACKING_SERVICE = 'TrackingService';
	var NOTIFICATION_SERVICE = exports.NOTIFICATION_SERVICE = 'NotificationService';

	// Search
	var SEARCH_CAT_WEB = exports.SEARCH_CAT_WEB = 'web';
	var SEARCH_CAT_IMAGE = exports.SEARCH_CAT_IMAGE = 'image';
	var SEARCH_CAT_VIDEO = exports.SEARCH_CAT_VIDEO = 'video';

	// Tab
	var BACKGROUND_TAB_TYPE = exports.BACKGROUND_TAB_TYPE = 'backgroundTab';
	var COMMON_COMPONENTS_TYPE = exports.COMMON_COMPONENTS_TYPE = 'commonComponents';
	var NEW_TAB_TYPE = exports.NEW_TAB_TYPE = 'newTab';
	var HTML_TYPES = exports.HTML_TYPES = {
	    "client": { "parentType": "newTab", "mainWindowId": "mainWindow", "bodyStyling": false, "finishEvent": 'CLIENT_LOADED' },
	    "browserActionPopup": { "parentType": "browserActionWrapper", "mainWindowId": "browserActionPopup", "bodyStyling": true, "rootStyling": true, "finishEvent": "BROWSER_ACTION_LOADED" }
	};
	var HASH_ENV_PREFIX = exports.HASH_ENV_PREFIX = 'env_';

	// Events
	var DOCUMENT_CLICKED_EVENT = exports.DOCUMENT_CLICKED_EVENT = 'DOCUMENT_CLICKED';
	var WINDOW_HASH_CHANGED_EVENT = exports.WINDOW_HASH_CHANGED_EVENT = 'WINDOW_HASH_CHANGED';
	var STORAGE_UPDATED_EVENT = exports.STORAGE_UPDATED_EVENT = 'STORAGE_UPDATED';
	var PREFERENCES_RELOADED_EVENT = exports.PREFERENCES_RELOADED_EVENT = 'PREFERENCES_RELOADED';
	var AUTO_SUGGEST_SELECTED_CHANGE_EVENT = exports.AUTO_SUGGEST_SELECTED_CHANGE_EVENT = 'AUTO_SUGGEST_SELECTED_CHANGE';
	var ON_SET_TEXT_EVENT = exports.ON_SET_TEXT_EVENT = 'onSetText';
	var UNITS_WEATHER_CHANGE = exports.UNITS_WEATHER_CHANGE = 'UNITS_WEATHER_CHANGE';
	var BACKGROUND_LOADED_EVENT = exports.BACKGROUND_LOADED_EVENT = 'BACKGROUND_LOADED';
	var CLIENT_LOADED_EVENT = exports.CLIENT_LOADED_EVENT = 'CLIENT_LOADED';
	var SELECTED_SEARCH_CATEGORY_CHANGED = exports.SELECTED_SEARCH_CATEGORY_CHANGED = 'SELECTED_SEARCH_CATEGORY_CHANGED';
	var UNINSTALL_TRACK_EVENT_KEY = exports.UNINSTALL_TRACK_EVENT_KEY = 'uninstall';
	var PARSE_COOKIE_FINISHED = exports.PARSE_COOKIE_FINISHED = 'PARSE_COOKIE_FINISHED';
	var UPDATE_CONFIG_FINISHED = exports.UPDATE_CONFIG_FINISHED = 'UPDATE_CONFIG_FINISHED';
	var ON_SEARCH_EVENT = exports.ON_SEARCH_EVENT = 'ON_SEARCH';
	var SEARCH_OB_STARTED_EVENT = exports.SEARCH_OB_STARTED_EVENT = 'SEARCH_OB_STARTED';
	var SEARCH_OB_DONE_EVENT = exports.SEARCH_OB_DONE_EVENT = 'SEARCH_OB_DONE';
	var UPDATE_CONFIG_AND_ENGINE_ID_FINISHED = exports.UPDATE_CONFIG_AND_ENGINE_ID_FINISHED = 'UPDATE_CONFIG_AND_ENGINE_ID_FINISHED';
	var GET_CHROME_TOPSITES_DONE = exports.GET_CHROME_TOPSITES_DONE = 'GET_CHROME_TOPSITES_DONE';
	var BUILD_TOPSITES_LOCALSTORAGE_DONE = exports.BUILD_TOPSITES_LOCALSTORAGE_DONE = 'BUILD_TOPSITES_LOCALSTORAGE_DONE';
	var GET_GOOGLE_TRENDING_SEARCHES = exports.GET_GOOGLE_TRENDING_SEARCHES = 'GET_GOOGLE_TRENDING_SEARCHES';
	var RSS_LINK_CLICKED = exports.RSS_LINK_CLICKED = 'RSS_LINK_CLICKED';
	var RSS_LOGO_CLICKED = exports.RSS_LOGO_CLICKED = 'RSS_LOGO_CLICKED';
	var RSS_MORE_CLICKED = exports.RSS_MORE_CLICKED = 'RSS_MORE_CLICKED';
	var RSS_ADD_FEED_CLICKED = exports.RSS_ADD_FEED_CLICKED = 'RSS_ADD_FEED_CLICKED';
	var RSS_REMOVE_FEED_CLICKED = exports.RSS_REMOVE_FEED_CLICKED = 'RSS_REMOVE_FEED_CLICKED';
	var SET_CHROME_POPUP_DONE = exports.SET_CHROME_POPUP_DONE = 'SET_CHROME_POPUP_DONE';
	var XT_ABG_CHANGED = exports.XT_ABG_CHANGED = 'XT_ABG_CHANGED';
	var CONFIG_CHANGED = exports.CONFIG_CHANGED = 'CONFIG_CHANGED';
	var CONFIG_REQUEST = exports.CONFIG_REQUEST = 'CONFIG_REQUEST';
	var CONFIG_RECEIVED = exports.CONFIG_RECEIVED = 'CONFIG_RECEIVED';
	var EXTENSION_INSTALLED = exports.EXTENSION_INSTALLED = 'install';
	var SHOW_FEEDBACK = exports.SHOW_FEEDBACK = 'SHOW_FEEDBACK';
	var SEARCH_ENGINE_CHANGED = exports.SEARCH_ENGINE_CHANGED = 'SEARCH_ENGINE_CHANGED';

	// Chrome events
	var CHROME_NEW_TAB_CLICKED = exports.CHROME_NEW_TAB_CLICKED = 'CHROME_NEW_TAB_CLICKED';
	var CHROME_ON_MESSAGE = exports.CHROME_ON_MESSAGE = 'CHROME_ON_MESSAGE';
	var CHROME_ON_BEFORE_REQUEST = exports.CHROME_ON_BEFORE_REQUEST = 'CHROME_ON_BEFORE_REQUEST';
	var CHROME_TABS_ON_UPDATE = exports.CHROME_TABS_ON_UPDATE = 'CHROME_TABS_ON_UPDATE';
	var CHROME_RUNTIME_ON_INSTALLED = exports.CHROME_RUNTIME_ON_INSTALLED = 'CHROME_RUNTIME_ON_INSTALLED';
	var CHROME_RUNTIME_ON_MESSAGE = exports.CHROME_RUNTIME_ON_MESSAGE = 'CHROME_RUNTIME_ON_MESSAGE';
	var CHROME_CREATE_TAB_EVENT = exports.CHROME_CREATE_TAB_EVENT = 'CHROME_CREATE_TAB_EVENT';
	var COMPONENT_MOUNTED = exports.COMPONENT_MOUNTED = 'COMPONENT_MOUNTED';

	// Keys
	var KEY_DOWN_CODE = exports.KEY_DOWN_CODE = 38;
	var KEY_UP_CODE = exports.KEY_UP_CODE = 40;

	//notifications
	var NOTIFICATION_CLICKED = exports.NOTIFICATION_CLICKED = 'NOTIFICATION_CLICKED';
	var NOTIFICATION_CLOSED = exports.NOTIFICATION_CLOSED = 'NOTIFICATION_CLOSED';
	var NOTIFICATION_POP = exports.NOTIFICATION_POP = 'NOTIFICATION_POP';
	var BEACON_FIRED = exports.BEACON_FIRED = 'BEACON_FIRED';

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _TrackingService = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/// This it the Logger service to be used to log all the required debuggings
	var LoggerServiceClass = function () {
	    function LoggerServiceClass(isDebug) {
	        _classCallCheck(this, LoggerServiceClass);

	        this.isDebug = isDebug ? isDebug : false;
	        this.loggingGUID = (0, _Utils.createGUID)();
	    }

	    _createClass(LoggerServiceClass, [{
	        key: 'log',
	        value: function log(message) {
	            this.debug(message);
	        }
	    }, {
	        key: 'debug',
	        value: function debug() {
	            if (this.isDebug) {
	                try {
	                    var line = ["DEBUG:" + new Date().toISOString() + " -"];
	                    for (var i = 0; i < arguments.length; i++) {
	                        var arg = arguments[i];
	                        line.push(arg);
	                    }
	                    console.log.apply(this, line);
	                } catch (e) {
	                    // sometimes console log does not work inside extensions
	                    LoggerService.track('error', 'LoggerService90: ' + e.message);
	                }
	            }
	        }
	    }, {
	        key: 'track',
	        value: function track(event, message) {
	            var chromeDetails = chrome.app.getDetails();
	            var id = chromeDetails.id.substring(0, 4);
	            var ver = chromeDetails.version;
	            try {
	                var firstRun = localStorage["firstRun"];
	                (0, _TrackingService.nativeTracking)(event, this.loggingGUID, message, firstRun, id, ver);
	            } catch (e) {
	                (0, _TrackingService.nativeTracking)('error-ls-init', this.loggingGUID, e.message, null, id, ver);
	            }
	        }
	    }]);

	    return LoggerServiceClass;
	}();

	var LoggerService = new LoggerServiceClass((false));

	exports.default = LoggerService;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.yymmdd = yymmdd;
	exports.getWeek = getWeek;
	exports.strStartsWith = strStartsWith;
	exports.strEndsWith = strEndsWith;
	exports.createGUID = createGUID;
	exports.sprintf = sprintf;
	exports.getParameterByName = getParameterByName;
	exports.tryParseJSON = tryParseJSON;
	exports.imageToB64 = imageToB64;
	exports.populateFromLocalStorage = populateFromLocalStorage;
	exports.objToQueryString = objToQueryString;
	exports.buildObjectFromStringWithDelimiters = buildObjectFromStringWithDelimiters;

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _Consts = __webpack_require__(1);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function yymmdd() {
	    try {
	        var date = new Date();
	        return (date.getUTCFullYear() + "").slice(-2) + ('0' + (date.getUTCMonth() + 1)).slice(-2) + ('0' + date.getUTCDate()).slice(-2);
	    } catch (e) {
	        _LoggerService2.default.track('error', 'yymmdd: ' + e.message);
	    }
	}

	function getWeek(date) {
	    var target = new Date(date.valueOf());
	    var dayNr = (date.getDay() + 6) % 7;
	    target.setDate(target.getDate() - dayNr + 3);
	    var firstThursday = target.valueOf();
	    target.setMonth(0, 1);
	    if (target.getDay() != 4) {
	        target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
	    }
	    var week = 1 + Math.ceil((firstThursday - target) / 604800000);
	    week = "0" + week;
	    return week.slice(-2);
	}

	function strStartsWith(str, prefix) {
	    if ((typeof str === "undefined" ? "undefined" : _typeof(str)) === "object") {
	        try {
	            str = JSON.stringify(str);
	        } catch (e) {
	            _LoggerService2.default.track('error', 'strStartsWith: ' + e.message);
	            return false;
	        }
	    }
	    return str.indexOf(prefix) === 0;
	}

	function strEndsWith(str, suffix) {
	    if ((typeof str === "undefined" ? "undefined" : _typeof(str)) === "object") {
	        try {
	            str = JSON.stringify(str);
	        } catch (e) {
	            _LoggerService2.default.track('error', 'strEndsWith: ' + e.message);
	            return false;
	        }
	    }
	    return str.match(suffix + "$") == suffix;
	}

	function createGUID() {
	    try {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    } catch (e) {
	        _LoggerService2.default.track('error', 'createGUID: ' + e.message);
	    }
	}

	function sprintf(str, params) {
	    var formatted = str;
	    for (var k in params) {
	        var v = params[k];
	        var regexp = new RegExp('\\{' + k + '\\}', 'gi');
	        formatted = formatted.replace(regexp, v);
	    }
	    return formatted;
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';

	    return window.decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function tryParseJSON(jsonString) {
	    try {
	        var o = JSON.parse(jsonString);
	        if (o && (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object") {
	            return true;
	        }
	    } catch (e) {}
	    return false;
	};

	function imageToB64(url) {
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.responseType = 'blob';
	        xhr.onload = function () {
	            var reader = new FileReader();
	            reader.onloadend = function () {
	                resolve(reader.result);
	            };
	            reader.readAsDataURL(xhr.response);
	        };
	        xhr.open('GET', url);
	        xhr.send();
	    });
	}

	function populateFromLocalStorage(obj) {
	    var pref = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);
	    if (obj && obj['local_storage']) {
	        for (var i in obj['local_storage']) {
	            var local_storage = obj['local_storage'][i];
	            if (Array.isArray(local_storage['key'])) {
	                try {
	                    if (typeof pref.get(local_storage['key'][0]) === 'undefined') return;
	                    var value = pref.get(local_storage['key'][0]);
	                    for (var _i = 1; _i < local_storage['key'].length; _i++) {
	                        if (typeof value[local_storage['key'][_i]] === 'undefined') return;
	                        value = value[local_storage['key'][_i]];
	                    }
	                    obj[local_storage['field']] = value;
	                } catch (e) {
	                    _LoggerService2.default.debug(e.message, e.lineNumber + ' @actionCreator');
	                }
	            } else obj[local_storage['field']] = localStorage[local_storage['key']];
	        }
	        delete obj['local_storage'];
	    }
	}

	function objToQueryString(obj) {
	    var string = '';
	    for (var key in obj) {
	        string += key + "=" + obj[key] + "&";
	    }
	    string = string.slice(0, -1);

	    return string;
	}

	function buildObjectFromStringWithDelimiters(string, delBetweenKeys, delBetweenKeyValues, prefixToRemove) {
	    var obj = {};
	    var internalString = string;
	    if (!string || !delBetweenKeys || !delBetweenKeyValues) {
	        return string;
	    }

	    if (prefixToRemove) {
	        internalString = string.replace(prefixToRemove, '');
	    }

	    if (internalString.indexOf(delBetweenKeys) > -1) {
	        var internalArr = internalString.split(delBetweenKeys);
	        for (var i = 0; i < internalArr.length; i++) {
	            if (internalArr[i].indexOf(delBetweenKeyValues) > -1) {
	                obj[internalArr[i].split(delBetweenKeyValues)[0]] = internalArr[i].split(delBetweenKeyValues)[1];
	            } else {
	                obj[internalArr[i]] = internalArr[i];
	            }
	        }
	    } else if (internalString.indexOf(delBetweenKeyValues) > -1) {
	        obj[internalString.split(delBetweenKeyValues)[0]] = internalString.split(delBetweenKeyValues)[1];
	    } else {
	        obj[internalString] = internalString;
	    }
	    return obj;
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ServiceFactory = __webpack_require__(5);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _PreferencesService = __webpack_require__(7);

	var _PreferencesService2 = _interopRequireDefault(_PreferencesService);

	var _TrackingService = __webpack_require__(13);

	var _TrackingService2 = _interopRequireDefault(_TrackingService);

	var _SearchService = __webpack_require__(25);

	var _SearchService2 = _interopRequireDefault(_SearchService);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _ExtensionService = __webpack_require__(26);

	var _ExtensionService2 = _interopRequireDefault(_ExtensionService);

	var _NotificationService = __webpack_require__(27);

	var _NotificationService2 = _interopRequireDefault(_NotificationService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// This is a factory service to hold all services that have been loaded to the client
	exports.default = _ServiceFactory2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ServiceFactory = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ServiceFactory = exports.ServiceFactory = function () {
	    function ServiceFactory() {
	        _classCallCheck(this, ServiceFactory);

	        this.services = {};
	    }

	    _createClass(ServiceFactory, [{
	        key: "load",
	        value: function load(config, env_) {
	            for (var serviceKey in config.components) {
	                var _service = _ComponentsFactory2.default.createComponent(config.components[serviceKey].type);
	                this.services[config.components[serviceKey].id] = new _service(config.components[serviceKey], env_);
	            }
	        }
	    }, {
	        key: "add",
	        value: function add(serviceInstance, serviceName) {
	            if (this.services[serviceName] === undefined) {
	                this.services[serviceName] = serviceInstance;
	            }
	        }
	    }, {
	        key: "get",
	        value: function get(serviceName) {
	            if (this.services[serviceName]) {
	                return this.services[serviceName];
	            }
	        }
	    }]);

	    return ServiceFactory;
	}();

	var service = new ServiceFactory();

	exports.default = service;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// This is a factory service to hold all component types in the system
	// Each component has a unique type that identifies it

	var ComponentsFactory = exports.ComponentsFactory = function () {
	    function ComponentsFactory() {
	        _classCallCheck(this, ComponentsFactory);

	        this.componentTypes = {};
	    }

	    _createClass(ComponentsFactory, [{
	        key: "add",
	        value: function add(componentFunc, componentType) {
	            if (this.componentTypes[componentType] === undefined) {
	                this.componentTypes[componentType] = componentFunc;
	            }
	        }
	    }, {
	        key: "createComponent",
	        value: function createComponent(componentType) {
	            if (this.componentTypes[componentType]) {
	                return this.componentTypes[componentType]();
	            }
	        }
	    }]);

	    return ComponentsFactory;
	}();

	var service = new ComponentsFactory();

	exports.default = service;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _assign = __webpack_require__(8);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	var _StorageService = __webpack_require__(9);

	var _StorageService2 = _interopRequireDefault(_StorageService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _Utils = __webpack_require__(3);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _Consts = __webpack_require__(1);

	var Consts = _interopRequireWildcard(_Consts);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PreferencesService = function () {
	    function PreferencesService(config, env) {
	        _classCallCheck(this, PreferencesService);

	        this.preferences = {};
	        this.env_ = env;
	        if (env == 'client') {
	            var t = _StorageService2.default.get("ci");
	            if (t !== undefined && t != null && t != "") config = t;
	        }
	        this.setConfig(config);
	    }

	    _createClass(PreferencesService, [{
	        key: "setConfig",
	        value: function setConfig(config) {
	            var config_temp = null;
	            if ((typeof config === "undefined" ? "undefined" : _typeof(config)) !== "object") {
	                try {
	                    config_temp = JSON.parse(config);
	                } catch (e) {
	                    _LoggerService2.default.track('error', 'setConfig90: ' + e.message);
	                    config_temp = config;
	                }
	            } else config_temp = config;
	            var innerComponents = config_temp["components"];
	            for (var i in innerComponents) {
	                var o = innerComponents[i];
	                if (o["type"] == "commonComponents") {
	                    for (var j in o["components"]) {
	                        if (o["components"][j]["type"] == "PreferencesService") {
	                            config_temp = o["components"][j];
	                        }
	                    }
	                }
	            }
	            this.config_ = config_temp;
	            this.parseConfig();
	        }
	    }, {
	        key: "parseConfig",
	        value: function parseConfig() {
	            if (this.config_.properties) {
	                var overwriteKeys = this.config_.overwrite ? this.config_.overwrite : [];
	                if (overwriteKeys.indexOf('config_id') > -1) {
	                    if (this.config_.properties.config_id && (0, _Utils.strStartsWith)(this.config_.properties.config_id.toString(), '{{')) {
	                        overwriteKeys = overwriteKeys.filter(function (item) {
	                            return item !== 'config_id';
	                        });
	                    }
	                }
	                try {
	                    if (this.get(Consts.SERVER_REQUEST_COUNTER_KEY) == 1 && this.get(Consts.FIRST_CONFIG_LOAD) != (true && 'true')) {
	                        var firstRunOverwriteKeys = this.config_.firstRunOverwriteKeys ? this.config_.firstRunOverwriteKeys : ["sengine", "bg_color", "bg_img", 'ds1', 'nt1'];
	                        for (var i = 0; i < Object.keys(firstRunOverwriteKeys).length; i++) {
	                            this.set(firstRunOverwriteKeys[i], undefined);
	                        }
	                        this.set(Consts.FIRST_CONFIG_LOAD, true);
	                    }
	                } catch (e) {
	                    _LoggerService2.default.track('error', 'parseConfig90: ' + e.message);
	                }

	                this.preferences = _assign({}, this.config_.properties);

	                for (var k in this.preferences) {
	                    var storeValLocked = _StorageService2.default.get(k + '_locked');
	                    if (storeValLocked == 'true') {
	                        delete this.preferences[k];
	                    }
	                }

	                // Load from storage and persist to storage if required
	                for (var key in this.preferences) {
	                    var storeVal = _StorageService2.default.get(key);

	                    if (storeVal !== undefined && overwriteKeys.indexOf(key) === -1) {
	                        try {
	                            if (storeVal && (0, _Utils.tryParseJSON)(storeVal)) {
	                                storeVal = JSON.parse(storeVal);
	                            } else if (typeof this.preferences[key] === 'number') {
	                                var parsedVal = parseFloat(storeVal);
	                                if (parsedVal !== NaN) {
	                                    storeVal = parsedVal;
	                                }
	                            }
	                        } catch (e) {
	                            _LoggerService2.default.track('error', 'parseConfig90: ' + e.message);
	                        }

	                        this.preferences[key] = storeVal;
	                    } else if (storeVal !== this.preferences[key]) {
	                        this.set(key, this.preferences[key]);
	                    }
	                }
	            }
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            var retVal = this.preferences[key];

	            if (retVal === undefined) {
	                retVal = _StorageService2.default.get(key);

	                if (retVal && (0, _Utils.tryParseJSON)(retVal)) {
	                    try {
	                        retVal = JSON.parse(retVal);
	                    } catch (e) {
	                        _LoggerService2.default.track('error', 'prefServ_get: key=' + key + ' error=' + e.message);
	                    }
	                }

	                if (retVal !== undefined) {
	                    this.preferences[key] = retVal;
	                }
	            }

	            return retVal;
	        }
	    }, {
	        key: "set",
	        value: function set(key, val) {
	            this.preferences[key] = val;
	            if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
	                _StorageService2.default.set(key, JSON.stringify(val));
	            } else {
	                _StorageService2.default.set(key, val);
	            }
	        }
	    }, {
	        key: "all",
	        value: function all() {
	            return _assign({}, this.preferences);
	        }
	    }, {
	        key: "getAllKeys",
	        value: function getAllKeys() {
	            return _StorageService2.default.allKeys();
	        }
	    }, {
	        key: "reloadAll",
	        value: function reloadAll() {
	            var keys = _StorageService2.default.allKeys();

	            for (var i = 0; i < keys.length; i++) {
	                var key = keys[i];
	                var storeVal = _StorageService2.default.get(keys[i]);

	                if (storeVal !== undefined) {
	                    try {
	                        if (storeVal && (0, _Utils.tryParseJSON)(storeVal)) {
	                            storeVal = JSON.parse(storeVal);
	                        } else if (typeof this.preferences[key] === 'number') {
	                            var parsedVal = parseFloat(storeVal);
	                            if (parsedVal !== NaN) {
	                                storeVal = parsedVal;
	                            }
	                        }
	                    } catch (e) {
	                        _LoggerService2.default.track('error', 'reloadAll: ' + e.message);
	                    }
	                }

	                this.preferences[key] = storeVal;
	            }

	            _EventsService2.default.trigger(Consts.PREFERENCES_RELOADED_EVENT);
	            _LoggerService2.default.debug('event: ' + Consts.PREFERENCES_RELOADED_EVENT);
	        }
	    }, {
	        key: "count",
	        value: function count(k) {
	            var v = this.get(k);

	            if (v == null) {
	                v = 1;
	            } else {
	                v++;
	            }

	            this.set(k, v);
	        }
	    }, {
	        key: "markTime",
	        value: function markTime(k) {
	            this.set(k, new Date().getTime());
	        }
	    }]);

	    return PreferencesService;
	}();

	exports.default = PreferencesService;


	_ComponentsFactory2.default.add(function () {
	    return PreferencesService;
	}, 'PreferencesService');
	//LoggerService.debug(env_);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */

	var _assign = __webpack_require__(8);

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!_assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(_assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? _assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StorageService = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _Consts = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StorageService = exports.StorageService = function () {
	    function StorageService() {
	        _classCallCheck(this, StorageService);

	        if (window) {
	            window.addEventListener('storage', function (e) {
	                _EventsService2.default.trigger(_Consts.STORAGE_UPDATED_EVENT, arguments);
	                _LoggerService2.default.debug('event: ' + _Consts.STORAGE_UPDATED_EVENT);
	            }, false);
	        }
	    }

	    _createClass(StorageService, [{
	        key: 'get',
	        value: function get(k) {
	            return localStorage[k];
	        }
	    }, {
	        key: 'set',
	        value: function set(k, v) {
	            if (v === undefined) {
	                this.remove(k);
	            } else {
	                localStorage[k] = v;
	            }
	        }
	    }, {
	        key: 'remove',
	        value: function remove(k) {
	            localStorage.removeItem(k);
	        }
	    }, {
	        key: 'allKeys',
	        value: function allKeys() {
	            return Object.keys(localStorage);
	        }
	    }, {
	        key: 'print',
	        value: function print() {
	            var keys = Object.keys(localStorage);

	            for (var i = 0; i < keys.length; i++) {
	                _LoggerService2.default.debug(keys[i] + ' : ' + localStorage[keys[i]]);
	            }
	        }
	    }]);

	    return StorageService;
	}();

	var storageService = new StorageService();

	exports.default = storageService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _wolfy87Eventemitter = __webpack_require__(11);

	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _Consts = __webpack_require__(1);

	var _Utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EventsService = function (_EventEmitter) {
	    _inherits(EventsService, _EventEmitter);

	    function EventsService() {
	        _classCallCheck(this, EventsService);

	        var _this = _possibleConstructorReturn(this, (EventsService.__proto__ || Object.getPrototypeOf(EventsService)).call(this));

	        var that = _this;
	        _this.browserService = _ChromeService2.default;
	        var hash = window.location.hash;
	        var HtmlVarTag = document.getElementsByTagName("VAR")[0];
	        var HtmlEnv = HtmlVarTag && HtmlVarTag.getAttribute("env") ? HtmlVarTag.getAttribute("env") : undefined;
	        _this.env_ = hash.indexOf(_Consts.HASH_ENV_PREFIX) > -1 ? hash.split(_Consts.HASH_ENV_PREFIX)[1] : HtmlEnv;
	        _this.objectToSend = { eventFromOtherContext: true, eventSource: _this.env_ };
	        _this.browserService.onMessage(function (request, sender, sendResponse) {
	            if ((typeof request === 'undefined' ? 'undefined' : _typeof(request)) === 'object' && request['event']) {
	                //LoggerService.debug('event received', request['event']['name'], request['event']['args'], (sender ? sender.url.substring(sender.url.lastIndexOf('/')) : null));
	                that.trigger(request['event']['name'], request['event']['args'], true);
	            }
	        });
	        return _this;
	    }

	    _createClass(EventsService, [{
	        key: 'trigger',
	        value: function trigger(evt, args, internal) {
	            if (args) (0, _Utils.populateFromLocalStorage)(args[0]);
	            if (!evt) return;
	            //LoggerService.debug('event: ' + evt);
	            _get(EventsService.prototype.__proto__ || Object.getPrototypeOf(EventsService.prototype), 'trigger', this).call(this, evt, args);

	            if (!internal) {
	                //LoggerService.debug('event sent to all contexts: ' + evt);
	                if (Array.isArray(args)) args.push(this.objectToSend);else if (args) args = [args, this.objectToSend];else args = [this.objectToSend];

	                this.browserService.sendMessage({ event: { name: evt, args: args } });
	            }
	        }
	    }]);

	    return EventsService;
	}(_wolfy87Eventemitter2.default);

	exports.default = new EventsService();

	// let EventsService = new EventEmitter();
	// export default EventsService;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * EventEmitter v5.1.0 - git.io/ee
	 * Unlicense - http://unlicense.org/
	 * Oliver Caldwell - http://oli.me.uk/
	 * @preserve
	 */

	;(function (exports) {
	    'use strict';

	    /**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */

	    function EventEmitter() {}

	    // Shortcuts to improve speed and size
	    var proto = EventEmitter.prototype;
	    var originalGlobalValue = exports.EventEmitter;

	    /**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */
	    function indexOfListener(listeners, listener) {
	        var i = listeners.length;
	        while (i--) {
	            if (listeners[i].listener === listener) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    /**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */
	    function alias(name) {
	        return function aliasClosure() {
	            return this[name].apply(this, arguments);
	        };
	    }

	    /**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */
	    proto.getListeners = function getListeners(evt) {
	        var events = this._getEvents();
	        var response;
	        var key;

	        // Return a concatenated array of all matching events if
	        // the selector is a regular expression.
	        if (evt instanceof RegExp) {
	            response = {};
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    response[key] = events[key];
	                }
	            }
	        } else {
	            response = events[evt] || (events[evt] = []);
	        }

	        return response;
	    };

	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */
	    proto.flattenListeners = function flattenListeners(listeners) {
	        var flatListeners = [];
	        var i;

	        for (i = 0; i < listeners.length; i += 1) {
	            flatListeners.push(listeners[i].listener);
	        }

	        return flatListeners;
	    };

	    /**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */
	    proto.getListenersAsObject = function getListenersAsObject(evt) {
	        var listeners = this.getListeners(evt);
	        var response;

	        if (listeners instanceof Array) {
	            response = {};
	            response[evt] = listeners;
	        }

	        return response || listeners;
	    };

	    function isValidListener(listener) {
	        if (typeof listener === 'function' || listener instanceof RegExp) {
	            return true;
	        } else if (listener && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object') {
	            return isValidListener(listener.listener);
	        } else {
	            return false;
	        }
	    }

	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListener = function addListener(evt, listener) {
	        if (!isValidListener(listener)) {
	            throw new TypeError('listener must be a function');
	        }

	        var listeners = this.getListenersAsObject(evt);
	        var listenerIsWrapped = (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object';
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
	                listeners[key].push(listenerIsWrapped ? listener : {
	                    listener: listener,
	                    once: false
	                });
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of addListener
	     */
	    proto.on = alias('addListener');

	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addOnceListener = function addOnceListener(evt, listener) {
	        return this.addListener(evt, {
	            listener: listener,
	            once: true
	        });
	    };

	    /**
	     * Alias of addOnceListener.
	     */
	    proto.once = alias('addOnceListener');

	    /**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvent = function defineEvent(evt) {
	        this.getListeners(evt);
	        return this;
	    };

	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.defineEvents = function defineEvents(evts) {
	        for (var i = 0; i < evts.length; i += 1) {
	            this.defineEvent(evts[i]);
	        }
	        return this;
	    };

	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListener = function removeListener(evt, listener) {
	        var listeners = this.getListenersAsObject(evt);
	        var index;
	        var key;

	        for (key in listeners) {
	            if (listeners.hasOwnProperty(key)) {
	                index = indexOfListener(listeners[key], listener);

	                if (index !== -1) {
	                    listeners[key].splice(index, 1);
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of removeListener
	     */
	    proto.off = alias('removeListener');

	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.addListeners = function addListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(false, evt, listeners);
	    };

	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeListeners = function removeListeners(evt, listeners) {
	        // Pass through to manipulateListeners
	        return this.manipulateListeners(true, evt, listeners);
	    };

	    /**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
	        var i;
	        var value;
	        var single = remove ? this.removeListener : this.addListener;
	        var multiple = remove ? this.removeListeners : this.addListeners;

	        // If evt is an object then pass each of its properties to this method
	        if ((typeof evt === 'undefined' ? 'undefined' : _typeof(evt)) === 'object' && !(evt instanceof RegExp)) {
	            for (i in evt) {
	                if (evt.hasOwnProperty(i) && (value = evt[i])) {
	                    // Pass the single listener straight through to the singular method
	                    if (typeof value === 'function') {
	                        single.call(this, i, value);
	                    } else {
	                        // Otherwise pass back to the multiple function
	                        multiple.call(this, i, value);
	                    }
	                }
	            }
	        } else {
	            // So evt must be a string
	            // And listeners must be an array of listeners
	            // Loop over it and pass each one to the multiple method
	            i = listeners.length;
	            while (i--) {
	                single.call(this, evt, listeners[i]);
	            }
	        }

	        return this;
	    };

	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.removeEvent = function removeEvent(evt) {
	        var type = typeof evt === 'undefined' ? 'undefined' : _typeof(evt);
	        var events = this._getEvents();
	        var key;

	        // Remove different things depending on the state of evt
	        if (type === 'string') {
	            // Remove all listeners for the specified event
	            delete events[evt];
	        } else if (evt instanceof RegExp) {
	            // Remove all events matching the regex.
	            for (key in events) {
	                if (events.hasOwnProperty(key) && evt.test(key)) {
	                    delete events[key];
	                }
	            }
	        } else {
	            // Remove all listeners in all events
	            delete this._events;
	        }

	        return this;
	    };

	    /**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */
	    proto.removeAllListeners = alias('removeEvent');

	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emitEvent = function emitEvent(evt, args) {
	        var listenersMap = this.getListenersAsObject(evt);
	        var listeners;
	        var listener;
	        var i;
	        var key;
	        var response;

	        for (key in listenersMap) {
	            if (listenersMap.hasOwnProperty(key)) {
	                listeners = listenersMap[key].slice(0);

	                for (i = 0; i < listeners.length; i++) {
	                    // If the listener returns true then it shall be removed from the event
	                    // The function is executed either with a basic call or an apply if there is an args array
	                    listener = listeners[i];

	                    if (listener.once === true) {
	                        this.removeListener(evt, listener.listener);
	                    }

	                    response = listener.listener.apply(this, args || []);

	                    if (response === this._getOnceReturnValue()) {
	                        this.removeListener(evt, listener.listener);
	                    }
	                }
	            }
	        }

	        return this;
	    };

	    /**
	     * Alias of emitEvent
	     */
	    proto.trigger = alias('emitEvent');

	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.emit = function emit(evt) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return this.emitEvent(evt, args);
	    };

	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	    proto.setOnceReturnValue = function setOnceReturnValue(value) {
	        this._onceReturnValue = value;
	        return this;
	    };

	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	    proto._getOnceReturnValue = function _getOnceReturnValue() {
	        if (this.hasOwnProperty('_onceReturnValue')) {
	            return this._onceReturnValue;
	        } else {
	            return true;
	        }
	    };

	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */
	    proto._getEvents = function _getEvents() {
	        return this._events || (this._events = {});
	    };

	    /**
	     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	     *
	     * @return {Function} Non conflicting EventEmitter class.
	     */
	    EventEmitter.noConflict = function noConflict() {
	        exports.EventEmitter = originalGlobalValue;
	        return EventEmitter;
	    };

	    // Expose the class either via AMD, CommonJS or the global object
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EventEmitter;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	        module.exports = EventEmitter;
	    } else {
	        exports.EventEmitter = EventEmitter;
	    }
	})(undefined || {});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// This file should include all the required chorme specific abilities that are available in the extension

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Consts = __webpack_require__(1);

	var Consts = _interopRequireWildcard(_Consts);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChromeService = function () {
	    function ChromeService() {
	        _classCallCheck(this, ChromeService);

	        this.isChromeExtension = false;
	        this.isNewTabTaken = false;
	        this.isDefaultSearchTaken = false;
	        if (window.chrome && window.chrome.app.getDetails()) {
	            this.isChromeExtension = true;
	            this._details = chrome.app.getDetails();
	            this._version = this._details.version;
	            this._id = this._details.id;
	            this._newTabUr = '';
	            this._defaultSearchManifestObject = '';
	            try {
	                this._newTabUrl = chrome.extension.getURL(chrome.app.getDetails().chrome_url_overrides.newtab);
	                this.isNewTabTaken = true;
	            } catch (e) {}
	            try {
	                this._defaultSearchManifestObject = chrome.app.getDetails().chrome_settings_overrides.search_provider;
	                this.isDefaultSearchTaken = true;
	            } catch (e) {}
	            if (this._details.permissions.includes("notifications")) {
	                chrome.notifications.onClicked.addListener(function (notificationId) {
	                    var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                    tracking.trackStatusEvent("notificationClicked", notificationId);
	                    var data = {
	                        notification: true,
	                        id: notificationId,
	                        text: "software"
	                    };

	                    _EventsService2.default.trigger(Consts.NOTIFICATION_CLICKED, [data]);
	                });

	                chrome.notifications.onClosed.addListener(function (notificationId, byUser) {
	                    var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                    tracking.trackStatusEvent(Consts.NOTIFICATION_CLOSED, notificationId, "closedbyuser:" + byUser);
	                });
	            }

	            chrome.browserAction.onClicked.addListener(function (tab) {
	                _EventsService2.default.trigger(Consts.CHROME_NEW_TAB_CLICKED, [tab]);
	                _LoggerService2.default.debug('event: ' + Consts.CHROME_NEW_TAB_CLICKED + " tab: " + JSON.stringify(tab));
	            });

	            // request, sender, sendResponse
	            // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	            //     LoggerService.log("chrome.tabs.onUpdated");
	            //     LoggerService.log(JSON.stringify(arguments));
	            //     ee.trigger(Consts.CHROME_ON_MESSAGE, [request, sender, sendResponse]);
	            // });

	            // tabId, details, tab
	            chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
	                _LoggerService2.default.log("chrome.tabs.onUpdated");
	                _LoggerService2.default.log(JSON.stringify(arguments));
	                _EventsService2.default.trigger(Consts.CHROME_TABS_ON_UPDATE, [tabId, details, tab]);
	            });

	            // request, sender, sendResponse
	            // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	            //     LoggerService.log("chrome.runtime.onMessage");
	            //     LoggerService.log(JSON.stringify(arguments));
	            //     ee.trigger(Consts.CHROME_RUNTIME_ON_MESSAGE, [request, sender, sendResponse]);
	            //     // setLocalStorage(request.ext)
	            // });

	            // e
	            chrome.runtime.onInstalled.addListener(function (e) {
	                _LoggerService2.default.log("chrome.runtime.onInstalled");
	                _LoggerService2.default.log(JSON.stringify(arguments));
	                setTimeout(function () {
	                    _LoggerService2.default.log(JSON.stringify(arguments));
	                    _EventsService2.default.trigger(Consts.CHROME_RUNTIME_ON_INSTALLED, [e]);
	                }, 1000);
	            });
	        }
	    }

	    _createClass(ChromeService, [{
	        key: "url",
	        value: function url() {
	            return chrome.extension.getURL("");
	        }
	    }, {
	        key: "id",
	        value: function id() {
	            return this._id;
	        }
	    }, {
	        key: "id4",
	        value: function id4() {
	            return this._id ? this._id.substring(0, 4) : undefined;
	        }
	    }, {
	        key: "version",
	        value: function version() {
	            return this._version;
	        }
	    }, {
	        key: "newTabUrl",
	        value: function newTabUrl() {
	            return this._newTabUrl;
	        }
	    }, {
	        key: "createTab",
	        value: function createTab(callback, url) {
	            _EventsService2.default.trigger(Consts.CHROME_CREATE_TAB_EVENT);

	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                if (url) {
	                    chrome.tabs.create({ url: url }, callback);
	                } else if (this.isChromeExtension && this.isNewTabTaken) {
	                    chrome.tabs.create({ url: this._newTabUrl }, callback);
	                }
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @createTab');
	            }
	        }
	    }, {
	        key: "removeTab",
	        value: function removeTab(tabId, callback) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                chrome.tabs.remove(tabId, callback);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @removeTab');
	            }
	        }
	    }, {
	        key: "updateTab",
	        value: function updateTab(tabId, url) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                chrome.tabs.update(tabId, { 'url': url }, null);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @updateTab');
	            }
	        }
	    }, {
	        key: "getCurrentTabId",
	        value: function getCurrentTabId() {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                chrome.tabs.getCurrent(function (tabId) {
	                    return tabId;
	                });
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getCurrentTabId');
	            }
	        }
	    }, {
	        key: "setUninstallURL",
	        value: function setUninstallURL(url) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                chrome.runtime.setUninstallURL(url);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @setUninstallURL');
	            }
	        }
	    }, {
	        key: "getCookies",
	        value: function getCookies(domain, callback) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                if (this.isChromeExtension) {
	                    chrome.cookies.getAll({ domain: domain }, callback);
	                    // chrome.cookies.getAll({domain: config['verified_host']}, processCookieData)
	                }
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getCookies');
	            }
	        }
	    }, {
	        key: "setCookies",
	        value: function setCookies(url, domain, name, value, expirationDate, callback) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                if (!expirationDate) {
	                    expirationDate = new Date().getTime() + 60 * 60 * 24 * 365;
	                }

	                if (!callback) {
	                    callback = function callback() {
	                        if (chrome.runtime.lastError) {
	                            tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, chrome.runtime.lastError.message + ' @setCookies');
	                        }
	                    };
	                }
	                chrome.cookies.set({
	                    url: url,
	                    domain: domain,
	                    name: name,
	                    value: value,
	                    expirationDate: expirationDate
	                }, callback);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @setCookies');
	            }
	        }
	    }, {
	        key: "sendMessage",
	        value: function sendMessage() {
	            // let tracking = ServiceFactory.get(Consts.TRACKING_SERVICE);
	            try {
	                chrome.runtime.sendMessage.apply(chrome.runtime, arguments);
	            } catch (e) {
	                // tracking.trackStatusEvent(ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @sendMessage');
	            }
	        }
	    }, {
	        key: "onMessage",
	        value: function onMessage(callback, external) {
	            // let tracking = ServiceFactory.get(Consts.TRACKING_SERVICE);
	            try {
	                if (external) chrome.runtime.onMessageExternal.addListener(callback);else chrome.runtime.onMessage.addListener(callback);
	            } catch (e) {
	                // tracking.trackStatusEvent(ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @onMessage');
	            }
	        }
	    }, {
	        key: "showNotification",
	        value: function showNotification(notificationId, options, callback) {
	            try {
	                if (this.isChromeExtension) {
	                    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) != "object") return false;
	                    chrome.notifications.create(notificationId, options, callback);
	                }
	            } catch (e) {}
	        }
	    }, {
	        key: "registerIdleListener",
	        value: function registerIdleListener(idle_time) {
	            if (this.isChromeExtension) {
	                chrome.idle.setDetectionInterval(idle_time);
	                chrome.idle.onStateChanged.addListener(function (newState) {
	                    if (newState == 'active') {
	                        _EventsService2.default.trigger('IDLE_IS_ACTIVE');
	                    }
	                });
	            }
	        }
	    }, {
	        key: "uninstall",
	        value: function uninstall(callback) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                if (this.isChromeExtension) {
	                    _EventsService2.default.trigger("chromeUninstall");
	                    chrome.management.uninstallSelf({ showConfirmDialog: true }, callback);
	                }
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @uninstall');
	            }
	        }
	    }, {
	        key: "getChromeVer",
	        value: function getChromeVer() {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                var version = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
	                return version;
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getChromeVer');
	            }
	        }
	    }, {
	        key: "getExtManifest",
	        value: function getExtManifest() {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                return chrome.runtime.getManifest();
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getExtManifest');
	            }
	        }
	    }, {
	        key: "checkIfNewTabIsTaken",
	        value: function checkIfNewTabIsTaken() {
	            return this.isNewTabTaken;
	            // let tracking = ServiceFactory.get(Consts.TRACKING_SERVICE);
	            // try {
	            //     let manifest = this.getExtManifest();
	            //     return (manifest.chrome_url_overrides && manifest.chrome_url_overrides.newtab);
	            // } catch (e) {
	            //     tracking.trackStatusEvent(ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @checkIfNewTabIsTaken');
	            // }
	        }
	    }, {
	        key: "checkIfDefaultSearchIsTaken",
	        value: function checkIfDefaultSearchIsTaken() {
	            return this.isDefaultSearchTaken;
	        }
	    }, {
	        key: "setBrowserActionPopUp",
	        value: function setBrowserActionPopUp(html) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            var htmlReplacer = html == 'false' ? '' : html;
	            try {
	                chrome.browserAction.setPopup({
	                    popup: htmlReplacer
	                });
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @setBrowserActionPopUp');
	            }
	        }
	    }, {
	        key: "getTranslation",
	        value: function getTranslation(msg) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                return chrome.i18n.getMessage(msg);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getTranslation');
	                return msg;
	            }
	        }
	    }, {
	        key: "getChromeUILang",
	        value: function getChromeUILang() {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                return chrome.i18n.getUILanguage();
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getChromeUILang');
	            }
	        }
	    }, {
	        key: "getTranslationOnlyIfExist",
	        value: function getTranslationOnlyIfExist(msg, active) {
	            // The purpose of 'active' val is to give a configuration option to enable/disable the translation mechanisem.
	            var activeN = false;
	            if (active == 'true' || active == true) {
	                activeN = true;
	            }
	            var msg_trans = msg;
	            if (activeN && typeof msg_trans == 'string') {
	                msg_trans = msg_trans.replace(/[^a-zA-Z0-9]+/g, "_");
	            }
	            if (activeN && msg_trans != undefined && this.getTranslation(msg_trans) != '') {
	                return this.getTranslation(msg_trans);
	            } else {
	                return msg;
	            }
	        }

	        //promise return topSites

	    }, {
	        key: "getChromeTopSites",
	        value: function getChromeTopSites() {
	            return new Promise(function (resolve, reject) {
	                chrome.topSites.get(function (res) {
	                    resolve(res);
	                });
	            });
	        }

	        //getScreenshot take screenshot of the visible tab and return a b64 image

	    }, {
	        key: "getScreenshot",
	        value: function getScreenshot(format, quality) {
	            return new Promise(function (resolve, reject) {
	                chrome.tabs.captureVisibleTab(null, {
	                    format: format,
	                    quality: quality
	                }, function (image) {
	                    resolve(image);
	                });
	            });
	        }

	        //getCurrentVisibleTab in order to ensure we catch the right tab

	    }, {
	        key: "getCurrentVisibleTab",
	        value: function getCurrentVisibleTab(windowInfo) {
	            return new Promise(function (resolve, reject) {
	                chrome.tabs.query({
	                    active: true,
	                    windowId: windowInfo.id
	                }, function (tabs) {
	                    resolve(tabs[0]);
	                });
	            });
	        }

	        //getLastFocusedWindow in order to ensure we catch the right window

	    }, {
	        key: "getLastFocusedWindow",
	        value: function getLastFocusedWindow() {
	            return new Promise(function (resolve, reject) {
	                chrome.windows.getLastFocused(null, function (windowInfo) {
	                    resolve(windowInfo);
	                });
	            });
	        }
	    }, {
	        key: "openNewWindow",
	        value: function openNewWindow(settings) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                if ((typeof settings === "undefined" ? "undefined" : _typeof(settings)) == 'object') {
	                    chrome.windows.create(settings);
	                }
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @openNewWindow');
	            }
	        }
	    }, {
	        key: "getLocalUrl",
	        value: function getLocalUrl(localFile) {
	            var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	            try {
	                return chrome.runtime.getURL(localFile);
	            } catch (e) {
	                tracking.trackStatusEvent(_Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getLocalUrl');
	            }
	        }
	    }]);

	    return ChromeService;
	}();

	var service = new ChromeService();
	exports.default = service;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _assign = __webpack_require__(8);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.nativeTracking = nativeTracking;

	var _Consts = __webpack_require__(1);

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _StorageService = __webpack_require__(9);

	var _StorageService2 = _interopRequireDefault(_StorageService);

	var _HttpService = __webpack_require__(14);

	var _HttpService2 = _interopRequireDefault(_HttpService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _Utils = __webpack_require__(3);

	var _BrowserService = __webpack_require__(19);

	var _BrowserService2 = _interopRequireDefault(_BrowserService);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _Actions = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function nativeTracking(evtName, guid, message3, message2, id, ver) {
	    var trackingUrl = "asset=&ptag=&click_location=&evt={{evtType}}&aflt=&uref=&firstver=&itag=&client=&pver=&ptype=&label=&ver={{ver}}&id={{id}}&guid=&extra={{extra}}&extra2={{extra2}}&extra3={{extra3}}&z=&xlp_pers_guid=&xlp_sess_guid=&cd=&cr=&sengine=&ext_cc=&xt_abg=&abid=";

	    var trackObj = {
	        table: 'extensions_b64',
	        data: btoa(trackingUrl.replace('{{evtType}}', evtName).replace('{{extra}}', guid.substring(0, 80)).replace('{{extra3}}', message3 ? typeof message3 == "string" ? message3.substring(0, 500) : message3 : '').replace('{{extra2}}', message2 ? typeof message2 == "string" ? message2.substring(0, 80) : message2 : '').replace('{{id}}', id ? id : '').replace('{{ver}}', ver ? ver : ''))
	    };

	    var protocol = localStorage['sec_http'] == '1' ? 'https://' : 'http://';
	    var url = localStorage['track'];
	    if (!url) {
	        protocol = 'https://';
	        url = 'ib.srch.bar';
	    }
	    return _HttpService2.default.doPost(protocol + url, trackObj, '').catch(function (err) {
	        _LoggerService2.default.debug('error sending native track: ' + err);
	    });
	}

	var TrackingService = function () {
	    function TrackingService(config) {
	        _classCallCheck(this, TrackingService);

	        this.pref = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);
	        this.chrome = _ChromeService2.default;
	        this.properties = _assign({}, config.properties);
	        this.behaviours = config.behaviours;
	        (0, _Actions.register)(this.behaviours);
	        this.pref.set(_Consts.TRACKING_PROPERTIES_KEY, this.properties);
	    }

	    _createClass(TrackingService, [{
	        key: 'markActive',
	        value: function markActive() {
	            var self = this;
	            // lfc_act = lifecycle active date
	            this.markDay('lfc.act', 'active', true, function (newday) {
	                if (newday) {
	                    self.pref.count('c.act'); // count new day activity
	                }
	            });
	        }
	    }, {
	        key: 'markDay',
	        value: function markDay(key, evt, stEvt, callback) {
	            var dayStr = (0, _Utils.yymmdd)();
	            var isNewDay = false;

	            if (this.pref.get(key) == null || this.pref.get(key) != dayStr) {
	                this.pref.set(key, dayStr);
	                isNewDay = true;
	                if (stEvt) {
	                    this.trackStatusEvent(evt);
	                }
	            }

	            if (typeof callback == 'function') {
	                callback(isNewDay);
	            }
	        }
	    }, {
	        key: 'trackStatusEventGetData',
	        value: function trackStatusEventGetData(evtType, extra1, extra2, extra3) {
	            // TODO: use a dynamic object instead of pre-defined variables
	            var assets = '',
	                click_location = '';

	            if ((typeof extra1 === 'undefined' ? 'undefined' : _typeof(extra1)) == 'object' && extra1 != null) {
	                click_location = extra1['click_location'] || '';
	                assets = extra1['assets'] || '';

	                if (_typeof(extra1['extra2']) == 'object' && extra1['extra2'] != null) {
	                    if (extra1['extra2'].hasOwnProperty('localStorage')) {
	                        extra2 = this.pref.get(extra1['extra2']['localStorage']);
	                    }
	                } else {
	                    extra2 = extra1['extra2'] || extra2 || '';
	                }
	                if (_typeof(extra1['extra3']) == 'object' && extra1['extra3'] != null) {
	                    if (extra1['extra3'].hasOwnProperty('localStorage')) {
	                        extra3 = this.pref.get(extra1['extra3']['localStorage']);
	                    }
	                } else {
	                    extra3 = extra1['extra3'] || extra3 || '';
	                }

	                //extra1 must kept the last in order to avoid overriding it
	                if (_typeof(extra1['extra1']) == 'object' && extra1['extra1'] != null) {
	                    if (extra1['extra1'].hasOwnProperty('localStorage')) {
	                        extra1 = this.pref.get(extra1['extra1']['localStorage']);
	                    }
	                } else {
	                    extra1 = extra1['extra1'] || '';
	                }
	            }

	            var data = this.properties.trackingUrlFormat;

	            try {

	                var placeholders = {
	                    'click_location': click_location,
	                    assets: assets,
	                    evtType: evtType,
	                    client: _BrowserService2.default.getBrowserFlavor(),
	                    ver: this.chrome.version(),
	                    id4: this.chrome.id4(),
	                    extra1: extra1 != undefined ? typeof extra1 == "string" ? extra1.substring(0, 80) : extra1 : '',
	                    extra2: extra2 != undefined ? typeof extra2 == "string" ? extra2.substring(0, 80) : extra2 : '',
	                    extra3: extra3 != undefined ? typeof extra3 == "string" ? extra3.substring(0, 500) : extra3 : '',
	                    z: 1000000000 + Math.floor(Math.random() * (2147483647 - 1000000000))
	                };

	                for (var key in placeholders) {
	                    var _str = new RegExp('{{' + key + '}}', 'g');
	                    data = data.replace(_str, placeholders[key]);
	                }

	                var storageKeys = this.pref.getAllKeys();

	                for (var i = 0; i < storageKeys.length; i++) {
	                    var _key = storageKeys[i];
	                    var _str2 = new RegExp('{{' + _key + '}}', 'g');
	                    data = data.replace(_str2, this.pref.get(_key));
	                }
	                // replace "un-replaced" placeholder with ''
	                var str = new RegExp('\{\{(.*?)\}\}', 'g');
	                data = data.replace(str, '');

	                if (evtType.indexOf('search-set') == -1 && evtType.indexOf('search-') == 0) {
	                    data = data + '&scategory=' + this.pref.get('selected_cat').toLowerCase();
	                }

	                _LoggerService2.default.debug(data);
	                return btoa(data);
	            } catch (e) {
	                _LoggerService2.default.track('error', 'trackStatusEventGetData: ' + e.message);
	            }
	        }
	    }, {
	        key: 'trackStatusEventGetDataObject',
	        value: function trackStatusEventGetDataObject(evtType, extra1, extra2, extra3) {
	            return {
	                'table': this.properties.trackTable,
	                'data': this.trackStatusEventGetData(evtType, extra1, extra2, extra3)
	            };
	        }
	    }, {
	        key: 'trackStatusEvent',
	        value: function trackStatusEvent(evtType, extra1, extra2, callback, extra3) {
	            var protocol = this.pref.get(_Consts.SECURE_HTTP_KEY) == '1' ? 'https://' : 'http://';
	            return _HttpService2.default.doPost(protocol + this.pref.get(_Consts.TRACK_KEY), this.trackStatusEventGetDataObject(evtType, extra1, extra2, extra3), '', callback);
	        }
	    }]);

	    return TrackingService;
	}();

	exports.default = TrackingService;


	_ComponentsFactory2.default.add(function () {
	    return TrackingService;
	}, 'TrackingService');

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HttpService = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(15);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// fetch API: https://github.com/github/fetch
	var Promise = __webpack_require__(16).Promise;
	function serializeData(data) {
	    var formData = '';
	    for (var key in data) {
	        formData += key + '=' + data[key] + '&';
	    }

	    return formData.slice(0, -1);
	}

	function ajax(method, url, params, headers, timeout) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url);
	    xhr.timeout = timeout || 5000;
	    if (headers && Array.isArray(headers)) {
	        if (headers.includes('application/x-www-form-urlencoded')) {
	            params = serializeData(JSON.parse(params));
	        }
	        for (var i = 0; i < headers.length; i += 2) {
	            xhr.setRequestHeader(headers[i], headers[i + 1]);
	        }
	    }
	    xhr.send(params);

	    return new Promise(function (resolve, reject) {
	        //xhr.ontimeout = function () { console.log(url+' Timed out!!! '); }
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
	                resolve(xhr);
	            } else if (xhr.readyState == 4) {
	                reject(xhr.status);
	            }
	        };
	    });
	}

	function ajax_post(url, params, type, headers) {
	    var err = false;
	    return ajax('POST', url, params, headers).then(function (xhr) {
	        if (type == 'xml') {
	            return xhr.responseXML;
	        } else if (type == 'text') {
	            return xhr.responseText;
	        } else if (type === 'json') {
	            try {
	                return JSON.parse(xhr.responseText);
	            } catch (e) {
	                return e;
	            }
	        } else {
	            return xhr;
	        }
	    }).catch(function (reason) {
	        return reason;
	    });
	}

	// function ajax_get(url, params, type, callback, err) {
	//     ajax('GET', url, params, function (xhr) {
	//         if (typeof callback == 'function') {
	//             if (type == 'xml') {
	//                 callback(xhr.responseXML);
	//             } else if (type == 'text') {
	//                 callback(xhr.responseText);
	//             } else if (type === 'json') {
	//                 callback(JSON.parse(xhr.responseText));
	//             } else {
	//                 callback(xhr);
	//             }
	//         }
	//     }, err);
	// }
	//
	// function ajax_head(url, callback, err) {
	//     ajax('HEAD', url, null, function (xhr) {
	//         if (typeof callback == 'function')
	//             callback(xhr);
	//     }, err);
	// }

	var HttpService = exports.HttpService = function () {
	    function HttpService() {
	        _classCallCheck(this, HttpService);
	    }

	    _createClass(HttpService, [{
	        key: 'doGetJSON',
	        value: function doGetJSON(url, success, err, config) {
	            return this.doGet(url, 'json', success, err, config);
	        }
	    }, {
	        key: 'doGet',
	        value: function doGet(url, response_type, success, err, config, timeout) {
	            var promise = ajax('GET', url, config, null, timeout).then(this.checkResponse).then(this.transformResult.bind(this, [response_type]));

	            // let promise = fetch(url,
	            //     Object.assign({
	            //         method: 'GET',
	            //     }, config))
	            //     .then(this.checkResponse)
	            //     .then(this.transformResult.bind(this, [type]));

	            promise = success ? promise.then(success) : promise;
	            promise = err ? promise.catch(err) : promise;

	            return promise;
	        }
	    }, {
	        key: 'doPostJSON',
	        value: function doPostJSON(url, data, success, err, config, headers) {
	            return this.doPost(url, data, 'json', success, err, config, headers);
	        }
	    }, {
	        key: 'doPost',
	        value: function doPost(url, data, response_type, success, err, config, headers) {
	            var promise = ajax_post(url, JSON.stringify(data), response_type, headers);

	            // To use fetch and read all the response header we need to add the following to the server response:
	            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Headers
	            // After adding this we can go back and use fetch

	            // let promise = fetch(url,
	            //     Object.assign({
	            //         method: 'POST',
	            //         headers: {
	            //             'Accept': 'application/json',
	            //             'Content-Type': 'application/json'
	            //         },
	            //         body: JSON.stringify(data)
	            //     }, config))
	            //     .then(this.checkResponse)
	            //     .then(this.transformResult.bind(this, [response_type]));

	            promise = success ? promise.then(success) : promise;
	            promise = err ? promise.catch(err) : promise;

	            return promise;
	        }
	    }, {
	        key: 'transformResult',
	        value: function transformResult(args, response) {
	            var type = args[0];
	            if (type === 'json') {
	                //return response.json();
	                return JSON.parse(response.responseText);
	            } else if (type === 'text') {
	                //return response.text();
	                return response.responseText;
	            } else if (type === 'blob') {
	                return response.blob();
	            } else {
	                return response;
	            }
	        }
	    }, {
	        key: 'checkResponse',
	        value: function checkResponse(response, a, b) {
	            if (response.status >= 200 && response.status < 300 || response.status == 0) {
	                return response;
	            } else {
	                var error = new Error(response.statusText);
	                error.response = response;
	                throw error;
	            }
	        }
	    }]);

	    return HttpService;
	}();

	var service = new HttpService();

	exports.default = service;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  if (support.arrayBuffer) {
	    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

	    var isDataView = function isDataView(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj);
	    };

	    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
	    };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function next() {
	        var value = items.shift();
	        return { done: value === undefined, value: value };
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function () {
	        return iterator;
	      };
	    }

	    return iterator;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  Headers.prototype.keys = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.values = function () {
	    var items = [];
	    this.forEach(function (value) {
	      items.push(value);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.entries = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items);
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise;
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise;
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('');
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0);
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer;
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer
	        // IE 10-11 can't handle a DataView body.
	        );this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        throw new Error('unsupported BodyInit type');
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer);
	        }
	      };
	    }

	    this.text = function () {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected;
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob);
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text');
	      } else {
	        return Promise.resolve(this._bodyText);
	      }
	    };

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (typeof input === 'string') {
	      this.url = input;
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this, { body: this._bodyInit });
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    rawHeaders.split('\r\n').forEach(function (line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = 'status' in options ? options.status : 200;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request = new Request(input, init);
	      var xhr = new XMLHttpRequest();

	      xhr.onload = function () {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.ES6Promise = factory();
	})(undefined, function () {
	  'use strict';

	  function objectOrFunction(x) {
	    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x !== null;
	  }

	  function isFunction(x) {
	    return typeof x === 'function';
	  }

	  var _isArray = undefined;
	  if (!Array.isArray) {
	    _isArray = function _isArray(x) {
	      return Object.prototype.toString.call(x) === '[object Array]';
	    };
	  } else {
	    _isArray = Array.isArray;
	  }

	  var isArray = _isArray;

	  var len = 0;
	  var vertxNext = undefined;
	  var customSchedulerFn = undefined;

	  var asap = function asap(callback, arg) {
	    queue[len] = callback;
	    queue[len + 1] = arg;
	    len += 2;
	    if (len === 2) {
	      // If len is 2, that means that we need to schedule an async flush.
	      // If additional callbacks are queued before the queue is flushed, they
	      // will be processed by this flush that we are scheduling.
	      if (customSchedulerFn) {
	        customSchedulerFn(flush);
	      } else {
	        scheduleFlush();
	      }
	    }
	  };

	  function setScheduler(scheduleFn) {
	    customSchedulerFn = scheduleFn;
	  }

	  function setAsap(asapFn) {
	    asap = asapFn;
	  }

	  var browserWindow = typeof window !== 'undefined' ? window : undefined;
	  var browserGlobal = browserWindow || {};
	  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	  // test for web worker but not in IE10
	  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	  // node
	  function useNextTick() {
	    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	    // see https://github.com/cujojs/when/issues/410 for details
	    return function () {
	      return process.nextTick(flush);
	    };
	  }

	  // vertx
	  function useVertxTimer() {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  function useMutationObserver() {
	    var iterations = 0;
	    var observer = new BrowserMutationObserver(flush);
	    var node = document.createTextNode('');
	    observer.observe(node, { characterData: true });

	    return function () {
	      node.data = iterations = ++iterations % 2;
	    };
	  }

	  // web worker
	  function useMessageChannel() {
	    var channel = new MessageChannel();
	    channel.port1.onmessage = flush;
	    return function () {
	      return channel.port2.postMessage(0);
	    };
	  }

	  function useSetTimeout() {
	    // Store setTimeout reference so es6-promise will be unaffected by
	    // other code modifying setTimeout (like sinon.useFakeTimers())
	    var globalSetTimeout = setTimeout;
	    return function () {
	      return globalSetTimeout(flush, 1);
	    };
	  }

	  var queue = new Array(1000);
	  function flush() {
	    for (var i = 0; i < len; i += 2) {
	      var callback = queue[i];
	      var arg = queue[i + 1];

	      callback(arg);

	      queue[i] = undefined;
	      queue[i + 1] = undefined;
	    }

	    len = 0;
	  }

	  function attemptVertx() {
	    try {
	      var r = require;
	      var vertx = __webpack_require__(18);
	      vertxNext = vertx.runOnLoop || vertx.runOnContext;
	      return useVertxTimer();
	    } catch (e) {
	      return useSetTimeout();
	    }
	  }

	  var scheduleFlush = undefined;
	  // Decide what async method to use to triggering processing of queued callbacks:
	  if (isNode) {
	    scheduleFlush = useNextTick();
	  } else if (BrowserMutationObserver) {
	    scheduleFlush = useMutationObserver();
	  } else if (isWorker) {
	    scheduleFlush = useMessageChannel();
	  } else if (browserWindow === undefined && "function" === 'function') {
	    scheduleFlush = attemptVertx();
	  } else {
	    scheduleFlush = useSetTimeout();
	  }

	  function then(onFulfillment, onRejection) {
	    var _arguments = arguments;

	    var parent = this;

	    var child = new this.constructor(noop);

	    if (child[PROMISE_ID] === undefined) {
	      makePromise(child);
	    }

	    var _state = parent._state;

	    if (_state) {
	      (function () {
	        var callback = _arguments[_state - 1];
	        asap(function () {
	          return invokeCallback(_state, child, callback, parent._result);
	        });
	      })();
	    } else {
	      subscribe(parent, child, onFulfillment, onRejection);
	    }

	    return child;
	  }

	  /**
	    `Promise.resolve` returns a promise that will become resolved with the
	    passed `value`. It is shorthand for the following:
	  
	    ```javascript
	    let promise = new Promise(function(resolve, reject){
	      resolve(1);
	    });
	  
	    promise.then(function(value){
	      // value === 1
	    });
	    ```
	  
	    Instead of writing the above, your code now simply becomes the following:
	  
	    ```javascript
	    let promise = Promise.resolve(1);
	  
	    promise.then(function(value){
	      // value === 1
	    });
	    ```
	  
	    @method resolve
	    @static
	    @param {Any} value value that the returned promise will be resolved with
	    Useful for tooling.
	    @return {Promise} a promise that will become fulfilled with the given
	    `value`
	  */
	  function resolve(object) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Constructor) {
	      return object;
	    }

	    var promise = new Constructor(noop);
	    _resolve(promise, object);
	    return promise;
	  }

	  var PROMISE_ID = Math.random().toString(36).substring(16);

	  function noop() {}

	  var PENDING = void 0;
	  var FULFILLED = 1;
	  var REJECTED = 2;

	  var GET_THEN_ERROR = new ErrorObject();

	  function selfFulfillment() {
	    return new TypeError("You cannot resolve a promise with itself");
	  }

	  function cannotReturnOwn() {
	    return new TypeError('A promises callback cannot return that same promise.');
	  }

	  function getThen(promise) {
	    try {
	      return promise.then;
	    } catch (error) {
	      GET_THEN_ERROR.error = error;
	      return GET_THEN_ERROR;
	    }
	  }

	  function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	    try {
	      then.call(value, fulfillmentHandler, rejectionHandler);
	    } catch (e) {
	      return e;
	    }
	  }

	  function handleForeignThenable(promise, thenable, then) {
	    asap(function (promise) {
	      var sealed = false;
	      var error = tryThen(then, thenable, function (value) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;
	        if (thenable !== value) {
	          _resolve(promise, value);
	        } else {
	          fulfill(promise, value);
	        }
	      }, function (reason) {
	        if (sealed) {
	          return;
	        }
	        sealed = true;

	        _reject(promise, reason);
	      }, 'Settle: ' + (promise._label || ' unknown promise'));

	      if (!sealed && error) {
	        sealed = true;
	        _reject(promise, error);
	      }
	    }, promise);
	  }

	  function handleOwnThenable(promise, thenable) {
	    if (thenable._state === FULFILLED) {
	      fulfill(promise, thenable._result);
	    } else if (thenable._state === REJECTED) {
	      _reject(promise, thenable._result);
	    } else {
	      subscribe(thenable, undefined, function (value) {
	        return _resolve(promise, value);
	      }, function (reason) {
	        return _reject(promise, reason);
	      });
	    }
	  }

	  function handleMaybeThenable(promise, maybeThenable, then$$) {
	    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	      handleOwnThenable(promise, maybeThenable);
	    } else {
	      if (then$$ === GET_THEN_ERROR) {
	        _reject(promise, GET_THEN_ERROR.error);
	      } else if (then$$ === undefined) {
	        fulfill(promise, maybeThenable);
	      } else if (isFunction(then$$)) {
	        handleForeignThenable(promise, maybeThenable, then$$);
	      } else {
	        fulfill(promise, maybeThenable);
	      }
	    }
	  }

	  function _resolve(promise, value) {
	    if (promise === value) {
	      _reject(promise, selfFulfillment());
	    } else if (objectOrFunction(value)) {
	      handleMaybeThenable(promise, value, getThen(value));
	    } else {
	      fulfill(promise, value);
	    }
	  }

	  function publishRejection(promise) {
	    if (promise._onerror) {
	      promise._onerror(promise._result);
	    }

	    publish(promise);
	  }

	  function fulfill(promise, value) {
	    if (promise._state !== PENDING) {
	      return;
	    }

	    promise._result = value;
	    promise._state = FULFILLED;

	    if (promise._subscribers.length !== 0) {
	      asap(publish, promise);
	    }
	  }

	  function _reject(promise, reason) {
	    if (promise._state !== PENDING) {
	      return;
	    }
	    promise._state = REJECTED;
	    promise._result = reason;

	    asap(publishRejection, promise);
	  }

	  function subscribe(parent, child, onFulfillment, onRejection) {
	    var _subscribers = parent._subscribers;
	    var length = _subscribers.length;

	    parent._onerror = null;

	    _subscribers[length] = child;
	    _subscribers[length + FULFILLED] = onFulfillment;
	    _subscribers[length + REJECTED] = onRejection;

	    if (length === 0 && parent._state) {
	      asap(publish, parent);
	    }
	  }

	  function publish(promise) {
	    var subscribers = promise._subscribers;
	    var settled = promise._state;

	    if (subscribers.length === 0) {
	      return;
	    }

	    var child = undefined,
	        callback = undefined,
	        detail = promise._result;

	    for (var i = 0; i < subscribers.length; i += 3) {
	      child = subscribers[i];
	      callback = subscribers[i + settled];

	      if (child) {
	        invokeCallback(settled, child, callback, detail);
	      } else {
	        callback(detail);
	      }
	    }

	    promise._subscribers.length = 0;
	  }

	  function ErrorObject() {
	    this.error = null;
	  }

	  var TRY_CATCH_ERROR = new ErrorObject();

	  function tryCatch(callback, detail) {
	    try {
	      return callback(detail);
	    } catch (e) {
	      TRY_CATCH_ERROR.error = e;
	      return TRY_CATCH_ERROR;
	    }
	  }

	  function invokeCallback(settled, promise, callback, detail) {
	    var hasCallback = isFunction(callback),
	        value = undefined,
	        error = undefined,
	        succeeded = undefined,
	        failed = undefined;

	    if (hasCallback) {
	      value = tryCatch(callback, detail);

	      if (value === TRY_CATCH_ERROR) {
	        failed = true;
	        error = value.error;
	        value = null;
	      } else {
	        succeeded = true;
	      }

	      if (promise === value) {
	        _reject(promise, cannotReturnOwn());
	        return;
	      }
	    } else {
	      value = detail;
	      succeeded = true;
	    }

	    if (promise._state !== PENDING) {
	      // noop
	    } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	  }

	  function initializePromise(promise, resolver) {
	    try {
	      resolver(function resolvePromise(value) {
	        _resolve(promise, value);
	      }, function rejectPromise(reason) {
	        _reject(promise, reason);
	      });
	    } catch (e) {
	      _reject(promise, e);
	    }
	  }

	  var id = 0;
	  function nextId() {
	    return id++;
	  }

	  function makePromise(promise) {
	    promise[PROMISE_ID] = id++;
	    promise._state = undefined;
	    promise._result = undefined;
	    promise._subscribers = [];
	  }

	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);

	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }

	    if (isArray(input)) {
	      this._input = input;
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate();
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      _reject(this.promise, validationError());
	    }
	  }

	  function validationError() {
	    return new Error('Array Methods must be provided an Array');
	  };

	  Enumerator.prototype._enumerate = function () {
	    var length = this.length;
	    var _input = this._input;

	    for (var i = 0; this._state === PENDING && i < length; i++) {
	      this._eachEntry(_input[i], i);
	    }
	  };

	  Enumerator.prototype._eachEntry = function (entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$ = c.resolve;

	    if (resolve$$ === resolve) {
	      var _then = getThen(entry);

	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise) {
	        var promise = new c(noop);
	        handleMaybeThenable(promise, entry, _then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$) {
	          return resolve$$(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$(entry), i);
	    }
	  };

	  Enumerator.prototype._settledAt = function (state, i, value) {
	    var promise = this.promise;

	    if (promise._state === PENDING) {
	      this._remaining--;

	      if (state === REJECTED) {
	        _reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };

	  Enumerator.prototype._willSettleAt = function (promise, i) {
	    var enumerator = this;

	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };

	  /**
	    `Promise.all` accepts an array of promises, and returns a new promise which
	    is fulfilled with an array of fulfillment values for the passed promises, or
	    rejected with the reason of the first passed promise to be rejected. It casts all
	    elements of the passed iterable to promises as it runs this algorithm.
	  
	    Example:
	  
	    ```javascript
	    let promise1 = resolve(1);
	    let promise2 = resolve(2);
	    let promise3 = resolve(3);
	    let promises = [ promise1, promise2, promise3 ];
	  
	    Promise.all(promises).then(function(array){
	      // The array here would be [ 1, 2, 3 ];
	    });
	    ```
	  
	    If any of the `promises` given to `all` are rejected, the first promise
	    that is rejected will be given as an argument to the returned promises's
	    rejection handler. For example:
	  
	    Example:
	  
	    ```javascript
	    let promise1 = resolve(1);
	    let promise2 = reject(new Error("2"));
	    let promise3 = reject(new Error("3"));
	    let promises = [ promise1, promise2, promise3 ];
	  
	    Promise.all(promises).then(function(array){
	      // Code here never runs because there are rejected promises!
	    }, function(error) {
	      // error.message === "2"
	    });
	    ```
	  
	    @method all
	    @static
	    @param {Array} entries array of promises
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise} promise that is fulfilled when all `promises` have been
	    fulfilled, or rejected if any of them become rejected.
	    @static
	  */
	  function all(entries) {
	    return new Enumerator(this, entries).promise;
	  }

	  /**
	    `Promise.race` returns a new promise which is settled in the same way as the
	    first passed promise to settle.
	  
	    Example:
	  
	    ```javascript
	    let promise1 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 1');
	      }, 200);
	    });
	  
	    let promise2 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 2');
	      }, 100);
	    });
	  
	    Promise.race([promise1, promise2]).then(function(result){
	      // result === 'promise 2' because it was resolved before promise1
	      // was resolved.
	    });
	    ```
	  
	    `Promise.race` is deterministic in that only the state of the first
	    settled promise matters. For example, even if other promises given to the
	    `promises` array argument are resolved, but the first settled promise has
	    become rejected before the other promises became fulfilled, the returned
	    promise will become rejected:
	  
	    ```javascript
	    let promise1 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        resolve('promise 1');
	      }, 200);
	    });
	  
	    let promise2 = new Promise(function(resolve, reject){
	      setTimeout(function(){
	        reject(new Error('promise 2'));
	      }, 100);
	    });
	  
	    Promise.race([promise1, promise2]).then(function(result){
	      // Code here never runs
	    }, function(reason){
	      // reason.message === 'promise 2' because promise 2 became rejected before
	      // promise 1 became fulfilled
	    });
	    ```
	  
	    An example real-world use case is implementing timeouts:
	  
	    ```javascript
	    Promise.race([ajax('foo.json'), timeout(5000)])
	    ```
	  
	    @method race
	    @static
	    @param {Array} promises array of promises to observe
	    Useful for tooling.
	    @return {Promise} a promise which settles in the same way as the first passed
	    promise to settle.
	  */
	  function race(entries) {
	    /*jshint validthis:true */
	    var Constructor = this;

	    if (!isArray(entries)) {
	      return new Constructor(function (_, reject) {
	        return reject(new TypeError('You must pass an array to race.'));
	      });
	    } else {
	      return new Constructor(function (resolve, reject) {
	        var length = entries.length;
	        for (var i = 0; i < length; i++) {
	          Constructor.resolve(entries[i]).then(resolve, reject);
	        }
	      });
	    }
	  }

	  /**
	    `Promise.reject` returns a promise rejected with the passed `reason`.
	    It is shorthand for the following:
	  
	    ```javascript
	    let promise = new Promise(function(resolve, reject){
	      reject(new Error('WHOOPS'));
	    });
	  
	    promise.then(function(value){
	      // Code here doesn't run because the promise is rejected!
	    }, function(reason){
	      // reason.message === 'WHOOPS'
	    });
	    ```
	  
	    Instead of writing the above, your code now simply becomes the following:
	  
	    ```javascript
	    let promise = Promise.reject(new Error('WHOOPS'));
	  
	    promise.then(function(value){
	      // Code here doesn't run because the promise is rejected!
	    }, function(reason){
	      // reason.message === 'WHOOPS'
	    });
	    ```
	  
	    @method reject
	    @static
	    @param {Any} reason value that the returned promise will be rejected with.
	    Useful for tooling.
	    @return {Promise} a promise rejected with the given `reason`.
	  */
	  function reject(reason) {
	    /*jshint validthis:true */
	    var Constructor = this;
	    var promise = new Constructor(noop);
	    _reject(promise, reason);
	    return promise;
	  }

	  function needsResolver() {
	    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	  }

	  function needsNew() {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }

	  /**
	    Promise objects represent the eventual result of an asynchronous operation. The
	    primary way of interacting with a promise is through its `then` method, which
	    registers callbacks to receive either a promise's eventual value or the reason
	    why the promise cannot be fulfilled.
	  
	    Terminology
	    -----------
	  
	    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	    - `thenable` is an object or function that defines a `then` method.
	    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	    - `exception` is a value that is thrown using the throw statement.
	    - `reason` is a value that indicates why a promise was rejected.
	    - `settled` the final resting state of a promise, fulfilled or rejected.
	  
	    A promise can be in one of three states: pending, fulfilled, or rejected.
	  
	    Promises that are fulfilled have a fulfillment value and are in the fulfilled
	    state.  Promises that are rejected have a rejection reason and are in the
	    rejected state.  A fulfillment value is never a thenable.
	  
	    Promises can also be said to *resolve* a value.  If this value is also a
	    promise, then the original promise's settled state will match the value's
	    settled state.  So a promise that *resolves* a promise that rejects will
	    itself reject, and a promise that *resolves* a promise that fulfills will
	    itself fulfill.
	  
	  
	    Basic Usage:
	    ------------
	  
	    ```js
	    let promise = new Promise(function(resolve, reject) {
	      // on success
	      resolve(value);
	  
	      // on failure
	      reject(reason);
	    });
	  
	    promise.then(function(value) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	  
	    Advanced Usage:
	    ---------------
	  
	    Promises shine when abstracting away asynchronous interactions such as
	    `XMLHttpRequest`s.
	  
	    ```js
	    function getJSON(url) {
	      return new Promise(function(resolve, reject){
	        let xhr = new XMLHttpRequest();
	  
	        xhr.open('GET', url);
	        xhr.onreadystatechange = handler;
	        xhr.responseType = 'json';
	        xhr.setRequestHeader('Accept', 'application/json');
	        xhr.send();
	  
	        function handler() {
	          if (this.readyState === this.DONE) {
	            if (this.status === 200) {
	              resolve(this.response);
	            } else {
	              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	            }
	          }
	        };
	      });
	    }
	  
	    getJSON('/posts.json').then(function(json) {
	      // on fulfillment
	    }, function(reason) {
	      // on rejection
	    });
	    ```
	  
	    Unlike callbacks, promises are great composable primitives.
	  
	    ```js
	    Promise.all([
	      getJSON('/posts'),
	      getJSON('/comments')
	    ]).then(function(values){
	      values[0] // => postsJSON
	      values[1] // => commentsJSON
	  
	      return values;
	    });
	    ```
	  
	    @class Promise
	    @param {function} resolver
	    Useful for tooling.
	    @constructor
	  */
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];

	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }

	  Promise.all = all;
	  Promise.race = race;
	  Promise.resolve = resolve;
	  Promise.reject = reject;
	  Promise._setScheduler = setScheduler;
	  Promise._setAsap = setAsap;
	  Promise._asap = asap;

	  Promise.prototype = {
	    constructor: Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	    
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	    
	      Chaining
	      --------
	    
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	    
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	    
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	    
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	    
	      Assimilation
	      ------------
	    
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	    
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	    
	      If the assimliated promise rejects, then the downstream promise will also reject.
	    
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	    
	      Simple Example
	      --------------
	    
	      Synchronous Example
	    
	      ```javascript
	      let result;
	    
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	    
	      Errback Example
	    
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	    
	      Promise Example;
	    
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	    
	      Advanced Example
	      --------------
	    
	      Synchronous Example
	    
	      ```javascript
	      let author, books;
	    
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	    
	      Errback Example
	    
	      ```js
	    
	      function foundBooks(books) {
	    
	      }
	    
	      function failure(reason) {
	    
	      }
	    
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	    
	      Promise Example;
	    
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	    
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	    then: then,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	    
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	    
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	    
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	    
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	    'catch': function _catch(onRejection) {
	      return this.then(null, onRejection);
	    }
	  };

	  function polyfill() {
	    var local = undefined;

	    if (typeof global !== 'undefined') {
	      local = global;
	    } else if (typeof self !== 'undefined') {
	      local = self;
	    } else {
	      try {
	        local = Function('return this')();
	      } catch (e) {
	        throw new Error('polyfill failed because global object is unavailable in this environment');
	      }
	    }

	    var P = local.Promise;

	    if (P) {
	      var promiseToString = null;
	      try {
	        promiseToString = Object.prototype.toString.call(P.resolve());
	      } catch (e) {
	        // silently ignored
	      }

	      if (promiseToString === '[object Promise]' && !P.cast) {
	        return;
	      }
	    }

	    local.Promise = Promise;
	  }

	  polyfill();
	  // Strange compat..
	  Promise.polyfill = polyfill;
	  Promise.Promise = Promise;

	  return Promise;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), (function() { return this; }())))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) {
	    return [];
	};

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BrowserService = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _StorageService = __webpack_require__(9);

	var _StorageService2 = _interopRequireDefault(_StorageService);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _Consts = __webpack_require__(1);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BrowserService = exports.BrowserService = function () {
	    function BrowserService() {
	        _classCallCheck(this, BrowserService);

	        this._locale = navigator.languages[0] || navigator.language;
	        this._language = this._locale.substr(0, 2);
	        this._os = function () {
	            var ua = navigator.userAgent.toLowerCase();
	            if (/windows nt 5.0/.test(ua)) {
	                return 'win2K';
	            } else if (/windows nt 5.0/.test(ua)) {
	                return 'winXP';
	            } else if (/windows nt 6.0/.test(ua)) {
	                return 'vista';
	            } else if (/windows nt 6.1/.test(ua)) {
	                return 'win7';
	            } else if (/windows nt 6.2/.test(ua)) {
	                return 'win8';
	            } else if (/windows nt 6.3/.test(ua)) {
	                return 'win8.1';
	            } else if (/windows nt 10.0/.test(ua)) {
	                return 'win10';
	            }
	        }();

	        if (document) {
	            document.addEventListener('click', function () {
	                _EventsService2.default.trigger(_Consts.DOCUMENT_CLICKED_EVENT, arguments);
	                _LoggerService2.default.debug('event: ' + _Consts.DOCUMENT_CLICKED_EVENT);
	            }, false);
	        }

	        if (window) {
	            window.addEventListener('hashchange', function () {
	                _EventsService2.default.trigger(_Consts.WINDOW_HASH_CHANGED_EVENT, arguments);
	                _LoggerService2.default.debug('event: ' + _Consts.WINDOW_HASH_CHANGED_EVENT);
	            }, false);
	        }
	    }

	    _createClass(BrowserService, [{
	        key: 'os',
	        value: function os() {
	            return this._os;
	        }
	    }, {
	        key: 'locale',
	        value: function locale() {
	            return this._locale;
	        }
	    }, {
	        key: 'locale2',
	        value: function locale2() {
	            return this._locale.replace('_', '-');
	        }
	    }, {
	        key: 'language',
	        value: function language() {
	            return this._language;
	        }
	    }, {
	        key: 'platform',
	        value: function platform() {
	            return navigator.platform;
	        }
	    }, {
	        key: 'getBrowserFlavor',
	        value: function getBrowserFlavor(type) {
	            var chrome_str = type == 'beacon' ? 'chrome' : _StorageService2.default.get('client');
	            var chmm_str = type == 'beacon' ? 'chmm' : 'chromium';

	            var i = void 0,
	                p = window.navigator.plugins,
	                b = chrome_str;
	            for (i = 0; i < p.length; i++) {
	                if (p[i].name.indexOf('PDF') > -1 && p[i].name.indexOf('Chromium') > -1) {
	                    b = chmm_str;
	                }
	            }

	            return b;
	        }
	    }]);

	    return BrowserService;
	}();

	var service = new BrowserService();

	exports.default = service;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _assign = __webpack_require__(8);

	exports.unregister = unregister;
	exports.register = register;

	var _ActionTypes = __webpack_require__(21);

	var ActionTypes = _interopRequireWildcard(_ActionTypes);

	var _Consts = __webpack_require__(1);

	var Consts = _interopRequireWildcard(_Consts);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _BrowserService = __webpack_require__(19);

	var _BrowserService2 = _interopRequireDefault(_BrowserService);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _ConfigurationService = __webpack_require__(22);

	var _ConfigurationService2 = _interopRequireDefault(_ConfigurationService);

	var _Condition = __webpack_require__(24);

	var _Condition2 = _interopRequireDefault(_Condition);

	var _Utils = __webpack_require__(3);

	var _HttpService = __webpack_require__(14);

	var _HttpService2 = _interopRequireDefault(_HttpService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var md5 = __webpack_require__(23);

	function unregister(behaviours) {
	    var createAction = actionCreator.bind(this);
	    if (behaviours) {
	        // Remove listeners

	        for (var i = 0; i < behaviours.length; i++) {
	            var behaviour = behaviours[i];
	            _EventsService2.default.off(behaviour.on, createAction(behaviour));
	        }
	    }
	}

	function register(behaviours) {
	    var createAction = actionCreator.bind(this);
	    if (behaviours) {
	        // Add listeners
	        for (var i = 0; i < behaviours.length; i++) {
	            var behaviour = behaviours[i];
	            _EventsService2.default.on(behaviour.on, createAction(behaviour));
	        }
	    }
	}

	function actionCreator(behaviour) {
	    var retFunc = void 0;

	    switch (behaviour.do) {
	        case ActionTypes.PARSE_USER_DATA:
	            retFunc = function retFunc(args) {
	                function innerPUD() {
	                    try {
	                        var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                        var isFirstRun = pref.get(Consts.FIRST_RUN_KEY) || pref.get(Consts.FIRST_RUN_KEY) === undefined;
	                        var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                        if (isFirstRun && (cond === null || cond.check(args))) {
	                            var check_file_active = pref.get('check_file_active');
	                            if (check_file_active == true || check_file_active == 'true') {
	                                var id = _ChromeService2.default.id();
	                                var file = "snv.nfr";
	                                var retries = pref.get('check_file_retries') || 2;
	                                var timeout = pref.get('check_file_timeout') || 1;
	                                checkFile(id, file, retries, timeout, start);
	                            } else {
	                                start();
	                            }
	                        }
	                    } catch (e) {
	                        _LoggerService2.default.track('error', 'pud90: ' + e.message);
	                        setTimeout(function () {
	                            innerPUD();
	                        }, 250);
	                    }
	                }

	                function start() {
	                    _LoggerService2.default.debug('Parsing user data');
	                    updateIDS();
	                    getDefaultData();
	                    getCookieData();
	                }

	                innerPUD();
	            };
	            break;
	        case ActionTypes.RUN_ACTIONS:
	            retFunc = function retFunc(args) {};
	            break;
	        case ActionTypes.SET_UNINSTALL_COOKIE:
	            retFunc = function retFunc(args) {
	                setUninstallUrl();
	            };
	            break;
	        case ActionTypes.CREATE_NEW_TAB:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond.check(args)) {
	                    _ChromeService2.default.createTab();
	                }
	            };
	            break;
	        case ActionTypes.OPEN_THANK_YOU_PAGE:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond.check(args)) {
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                    var track = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                    var cookieValue = pref.get(Consts.COOKIE_VALUE);
	                    if (cookieValue === undefined) return;
	                    var data = splitCookie(cookieValue);

	                    setTimeout(function () {
	                        if (behaviour.url.substr(behaviour.url.length - 1) !== '/') {
	                            behaviour.url = behaviour.url + '/';
	                        }
	                        var url = 'http://' + behaviour.url + data['ext_qs'];

	                        _ChromeService2.default.setCookies(url, behaviour.host, behaviour.cookieName, '1');
	                        if (behaviour.type === 'window') {
	                            window.open(url);
	                        } else if (behaviour.type === 'tab') {
	                            var properties = {
	                                url: url
	                            };
	                            chrome.tabs.create(properties, function () {});
	                        }
	                        track.trackStatusEvent(Consts.THANK_YOU_PAGE_EVENT_KEY);
	                        pref.set(Consts.THANK_YOU_PAGE_OPENED_KEY, true);
	                    }, behaviour.timeout * 1000);
	                }
	            };
	            break;
	        case ActionTypes.CHECK_NEW_XT_ABG:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                if (cond === null || cond.check(args)) {
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                    if (pref.get(Consts.GROUP_ID_VALIDATION_KEY) == undefined || pref.get(Consts.GROUP_ID_VALIDATION_KEY) != pref.get(Consts.GROUP_ID_KEY)) {
	                        var abg = pref.get(Consts.GROUP_ID_KEY) != undefined ? pref.get(Consts.GROUP_ID_KEY) : '';
	                        pref.set(Consts.GROUP_ID_VALIDATION_KEY, abg);
	                        var req_c = pref.get(Consts.SERVER_REQUEST_COUNTER_KEY);
	                        if (req_c != 1 && req_c != '1' && abg != '{{GROUPID}}') {
	                            _EventsService2.default.trigger(Consts.XT_ABG_CHANGED);
	                        }
	                    }
	                }
	            };
	            break;
	        case ActionTypes.CHECK_NEW_CONFIG:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                if (cond === null || cond.check(args)) {
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                    if (pref.get(Consts.CONFIG_ID_KEY) == undefined || pref.get(Consts.CONFIG_ID_VALIDATION_KEY) != pref.get(Consts.CONFIG_ID_KEY)) {
	                        var config_id = pref.get(Consts.CONFIG_ID_KEY) != undefined ? pref.get(Consts.CONFIG_ID_KEY) : '';
	                        pref.set(Consts.CONFIG_ID_VALIDATION_KEY, config_id);
	                        _EventsService2.default.trigger(Consts.CONFIG_CHANGED);
	                    }
	                }
	            };
	            break;
	        case ActionTypes.UPDATE_CONFIG:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                if (cond === null || cond.check(args)) {
	                    var sendRequest = function sendRequest() {
	                        var key = Consts.SERVER_REQUEST_COUNTER_KEY;
	                        var cntValue = pref.get(key) == undefined || pref.get(key) == '' || pref.get(key) == null ? 0 : parseFloat(pref.get(key));
	                        cntValue++;
	                        pref.set(key, cntValue);

	                        try {
	                            var _currentTime = new Date().getTime();
	                            pref.set(Consts.SERVER_REQUEST_TIMESTAMP_KEY, _currentTime);
	                        } catch (e) {
	                            _LoggerService2.default.track('error', 'sendRequest90: ' + e.message);
	                        }

	                        var data = {
	                            "aflt": pref.get(Consts.AFLT_KEY),
	                            "ptag": pref.get(Consts.B_AFLT_KEY),
	                            "client": _BrowserService2.default.getBrowserFlavor(),
	                            "uref": pref.get(Consts.UREF_KEY),
	                            "firstVer": pref.get(Consts.FIRST_VER_KEY),
	                            "sengine": pref.get(Consts.SELECTED_SEARCH_ENGINE_KEY),
	                            "label": pref.get(Consts.LABEL_KEY),
	                            "ver": _ChromeService2.default.version(),
	                            "id": _ChromeService2.default.id(),
	                            "guid": pref.get(Consts.GUID_KEY),
	                            "ptype": pref.get(Consts.TYPE_KEY),
	                            "abid": pref.get(Consts.ABTEST_ID_KEY),
	                            "xt_abg": pref.get(Consts.GROUP_ID_KEY),
	                            "ls_ts": pref.get(Consts.LS_TS_KEY),
	                            "browser_version": _ChromeService2.default.getChromeVer(),
	                            "xlp_pers_guid": pref.get(Consts.XLP_PERS_GUID_KEY),
	                            "xlp_sess_guid": pref.get(Consts.GUID_KEY),
	                            "config_id": pref.get(Consts.CONFIG_ID_KEY),
	                            "engine_id": pref.get(Consts.ENGINE_ID_KEY),
	                            "visual_id": pref.get(Consts.VISUAL_ID_KEY),
	                            "req_c": pref.get(Consts.SERVER_REQUEST_COUNTER_KEY)

	                        };

	                        // replace all un-replaced ph
	                        var str = new RegExp('\{\{(.*?)\}\}', 'g');
	                        Object.keys(data).forEach(function (key) {
	                            var val = data[key];
	                            val = typeof val == 'string' ? val.replace(str, '') : val;
	                            data[key] = val;
	                        });

	                        _EventsService2.default.trigger(Consts.CONFIG_REQUEST);
	                        var configService = new _ConfigurationService2.default();
	                        configService.loadFromServer(data).then(function () {
	                            var configuration = configService.getConfiguration();
	                            if (configuration) {
	                                _EventsService2.default.removeAllListeners();
	                                var extensionComponentKeys = Object.keys(configuration.components);
	                                var loadedApp = false;
	                                for (var i = 0; !loadedApp && i < extensionComponentKeys.length; i++) {
	                                    var component = configuration.components[extensionComponentKeys[i]];
	                                    if (component.type === Consts.BACKGROUND_TAB_TYPE) {
	                                        loadedApp = true;
	                                        _ServiceFactory2.default.load(component);
	                                    } else if (component.type === Consts.COMMON_COMPONENTS_TYPE) {
	                                        _ServiceFactory2.default.load(component);
	                                    }
	                                }
	                            }

	                            var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);
	                            search.reloadSearchConfig(pref.get('ci'), true);
	                            _EventsService2.default.trigger(Consts.UPDATE_CONFIG_FINISHED, [_assign(behaviour)]);
	                            _LoggerService2.default.debug('event: ' + Consts.UPDATE_CONFIG_FINISHED);
	                        });
	                    };

	                    // TODO: Add logic for updating the config and reloading it
	                    _LoggerService2.default.debug('should update config');
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);

	                    if (!isNaN(parseFloat(pref.get(Consts.SERVER_REQUEST_INTERVAL_KEY)))) {
	                        var currentTime = new Date().getTime();
	                        var key = Consts.SERVER_REQUEST_TIMESTAMP_KEY;
	                        var lastReqTime = pref.get(key) == undefined || pref.get(key) == '' || pref.get(key) == null ? 0 : parseFloat(pref.get(key));
	                        var interval = pref.get(Consts.SERVER_REQUEST_INTERVAL_KEY);

	                        if (currentTime - lastReqTime >= interval) {
	                            try {
	                                updateIDS(sendRequest);
	                            } catch (e) {
	                                _LoggerService2.default.track('error', 'UPDATE_CONFIG90: ' + e.message);
	                            }
	                        } else {
	                            try {
	                                updateIDS();
	                            } catch (e) {
	                                _LoggerService2.default.track('error', 'UPDATE_CONFIG93: ' + e.message);
	                            }
	                        }
	                    } else {
	                        try {
	                            updateIDS(sendRequest);
	                        } catch (e) {
	                            _LoggerService2.default.track('error', 'UPDATE_CONFIG91: ' + e.message);
	                        }
	                    }
	                }
	            };
	            break;
	        case ActionTypes.PUBLISH_EVENT_ON_INTERVAL:
	            retFunc = function retFunc(args) {
	                if (behaviour.interval) {
	                    var interval = behaviour.interval;
	                    if (behaviour.unit) {
	                        if (behaviour.unit == 's') {
	                            interval = interval * 1000;
	                        } else if (behaviour.unit == 'm') {
	                            interval = interval * 1000 * 60;
	                        } else if (behaviour.unit == 'h') {
	                            interval = interval * 1000 * 60 * 60;
	                        }
	                    }
	                    setInterval(function () {
	                        _EventsService2.default.trigger(behaviour.eventName, [_assign({}, behaviour)]);
	                        _LoggerService2.default.debug('event: ' + behaviour.eventName);
	                    }, interval);
	                }

	                if (behaviour.timeout) {
	                    setTimeout(function () {
	                        _EventsService2.default.trigger(behaviour.eventName, [_assign({}, behaviour)]);
	                        _LoggerService2.default.debug('event: ' + behaviour.eventName);
	                    }, behaviour.timeout);
	                }
	            };
	            break;
	        case ActionTypes.SET_CHROME_POPUP:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond && cond.check(args)) {
	                    if (behaviour.html) {
	                        _ChromeService2.default.setBrowserActionPopUp(behaviour.html);
	                        _EventsService2.default.trigger(Consts.SET_CHROME_POPUP_DONE);
	                        _LoggerService2.default.debug('Event: ' + Consts.SET_CHROME_POPUP_DONE);
	                    }
	                }
	            };
	            break;
	        case ActionTypes.GET_CHROME_TOPSITES:
	            retFunc = function retFunc(args) {
	                //Get chrome topsites, and insert all of them into a key in the local storage
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond && cond.check(args)) {
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                    _ChromeService2.default.getChromeTopSites().then(function (res) {
	                        var topSites = pref.get(Consts.TOPSITES_KEY);

	                        if ((typeof topSites === 'undefined' ? 'undefined' : _typeof(topSites)) == "object" && JSON.stringify(topSites) == JSON.stringify(res)) {
	                            return;
	                        }

	                        pref.set(Consts.TOPSITES_KEY, res);
	                        _EventsService2.default.trigger(Consts.GET_CHROME_TOPSITES_DONE);
	                        _LoggerService2.default.debug('event: ' + Consts.GET_CHROME_TOPSITES_DONE);
	                    });
	                }
	            };
	            break;

	        case ActionTypes.BUILD_TOPSITES_LOCALSTORAGE:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond && cond.check(args)) {
	                    var _ret = function () {

	                        //Check if new screenshot is needed: if db does not exists, or specific screenshot is missing, or last screenshot been taken more than 23h ago, than it starts:
	                        //get favicon -> get screenshot -> Update screenshotDb with the data -> populate the localStorage from the DB data -> remove old DB data
	                        //In case it does not match the following, it just repopulate the local storage, and remove old DB entries.
	                        var handleScreenshotsProcess = function handleScreenshotsProcess(favIconUrl, screenShotUrl, localStorageUrl) {
	                            return new Promise(function (resolve, reject) {
	                                var screenshotDbObj = pref.get(Consts.TOPSITES_SCREENSHOTS_KEY);
	                                if (screenshotDbObj && screenshotDbObj.hasOwnProperty(localStorageUrl)) {
	                                    var currentTime = new Date().getTime();
	                                    if (screenshotDbObj[localStorageUrl].screenshot == '') {
	                                        process();
	                                    } else if (currentTime - screenshotDbObj[localStorageUrl].ts > 82800000) {
	                                        process();
	                                    } else {
	                                        populateLocalStorageFromDB().then(deleteOldDbEntries());
	                                    }
	                                } else {
	                                    process();
	                                }
	                                function process() {
	                                    return new Promise(function (resolve, reject) {
	                                        getFavicon(favIconUrl).then(function (favicon) {
	                                            getScreenshot(screenShotUrl).then(function (screenshot) {
	                                                updateScreenshotsDB(localStorageUrl, screenshot, favicon).then(populateLocalStorageFromDB()).then(deleteOldDbEntries());
	                                            });
	                                        });
	                                    });
	                                }
	                            });
	                        };

	                        //get favicon image (convert to binary, if fails, keep as url)


	                        var getFavicon = function getFavicon(favIconUrl) {
	                            return new Promise(function (resolve, reject) {
	                                try {
	                                    if (favIconUrl) {
	                                        (0, _Utils.imageToB64)(favIconUrl).then(function (base64Img) {
	                                            resolve(base64Img);
	                                        }).catch(function (e) {
	                                            tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getFavicon');
	                                        });
	                                    } else {
	                                        resolve(favIconUrl);
	                                    }
	                                } catch (e) {
	                                    resolve(favIconUrl);
	                                }
	                            });
	                        };

	                        //Get screenshot while verifying the visible tab is really the wanted one


	                        var getScreenshot = function getScreenshot(url) {
	                            return new Promise(function (resolve, reject) {
	                                setTimeout(function () {
	                                    _ChromeService2.default.getLastFocusedWindow().then(function (windowInfo) {
	                                        _ChromeService2.default.getCurrentVisibleTab(windowInfo).then(function (currentTab) {
	                                            if (currentTab.url == url) {
	                                                _ChromeService2.default.getScreenshot('jpeg', 10).then(function (image) {
	                                                    resolve(image);
	                                                }).catch(function (e) {
	                                                    tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @getScreenshot');
	                                                });
	                                            }
	                                        });
	                                    });
	                                }, 2000);
	                            });
	                        };

	                        //Populate the localStorage relevant keys just for top 8 keys, take all the data from the screenshot DB


	                        var populateLocalStorageFromDB = function populateLocalStorageFromDB() {
	                            return new Promise(function (resolve, reject) {
	                                if (isLocalstorageValueIsValid(Consts.TOPSITES_SCREENSHOTS_KEY) && isLocalstorageValueIsValid(Consts.TOPSITES_KEY)) {
	                                    var db = pref.get(Consts.TOPSITES_SCREENSHOTS_KEY);
	                                    var topSites = pref.get(Consts.TOPSITES_KEY);
	                                    for (var _i2 = 0; _i2 < Object.keys(topSites).length; _i2++) {
	                                        if (topSites[_i2].url in db) {
	                                            pref.set(Consts.TOPSITES_TITLE_TEMPLATE + _i2, topSites[_i2].title);
	                                            pref.set(Consts.TOPSITES_SCREENSHOT_TEMPLATE + _i2, db[topSites[_i2].url].screenshot);
	                                            pref.set(Consts.TOPSITES_FAVICON_TEMPLATE + _i2, db[topSites[_i2].url].favicon);
	                                            pref.set(Consts.TOPSITES_URL_TEMPLATE + _i2, topSites[_i2].url);
	                                        }
	                                        if (_i2 == 7) {
	                                            break;
	                                        }
	                                    }
	                                }
	                            });
	                        };

	                        // In charge to handle updating screenshot DB in localStorage


	                        var updateScreenshotsDB = function updateScreenshotsDB(url, screenshot, favicon) {
	                            return new Promise(function (resolve, reject) {
	                                var screenshotDbObj = {};
	                                var currentTime = new Date().getTime();
	                                if (isLocalstorageValueIsValid(Consts.TOPSITES_SCREENSHOTS_KEY)) {
	                                    screenshotDbObj = pref.get(Consts.TOPSITES_SCREENSHOTS_KEY);
	                                    if (!(url in screenshotDbObj)) {
	                                        screenshotDbObj[url] = {};
	                                    }
	                                } else {
	                                    screenshotDbObj[url] = {};
	                                }
	                                if (favicon) {
	                                    screenshotDbObj[url].favicon = favicon;
	                                }
	                                screenshotDbObj[url].screenshot = screenshot;
	                                screenshotDbObj[url].ts = currentTime;
	                                pref.set(Consts.TOPSITES_SCREENSHOTS_KEY, screenshotDbObj);
	                            });
	                        };

	                        // Delete old db entries in case: DB entry is no longer in the topSites


	                        var deleteOldDbEntries = function deleteOldDbEntries() {
	                            return new Promise(function (resolve, reject) {
	                                if (isLocalstorageValueIsValid(Consts.TOPSITES_SCREENSHOTS_KEY) && isLocalstorageValueIsValid(Consts.TOPSITES_KEY)) {
	                                    var screenshotDbObj = pref.get(Consts.TOPSITES_SCREENSHOTS_KEY);
	                                    var _topSitesArr = pref.get(Consts.TOPSITES_KEY);
	                                    var remove = true;
	                                    for (var key in screenshotDbObj) {
	                                        for (var _i3 = 0; _i3 < Object.keys(_topSitesArr).length; _i3++) {
	                                            if (key == _topSitesArr[_i3].url) {
	                                                remove = false;
	                                            }
	                                        }
	                                        if (remove) {
	                                            delete screenshotDbObj[key];
	                                        }
	                                    }
	                                    pref.set(Consts.TOPSITES_SCREENSHOTS_KEY, screenshotDbObj);
	                                }
	                            });
	                        };

	                        var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                        var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                        // If topsites key exists in the localStorage, it starts build the screenshots DB
	                        if (!isLocalstorageValueIsValid(Consts.TOPSITES_KEY)) {
	                            return {
	                                v: void 0
	                            };
	                        }

	                        var topSitesArr = pref.get(Consts.TOPSITES_KEY);
	                        var getFavDomain = 'http://www.google.com/s2/favicons?domain_url=';

	                        // Go over all new topsites

	                        var _loop = function _loop(i) {
	                            // Check if screenshot Db already exists
	                            if (isLocalstorageValueIsValid(Consts.TOPSITES_SCREENSHOTS_KEY)) {
	                                var screenshotDbObj = pref.get(Consts.TOPSITES_SCREENSHOTS_KEY);
	                                // If encounter with a topSite which does not exists in the DB, create a new DB entry
	                                if (!(topSitesArr[i].url in screenshotDbObj)) {
	                                    (0, _Utils.imageToB64)(getFavDomain + topSitesArr[i].url).then(function (base64Favicon) {
	                                        updateScreenshotsDB(topSitesArr[i].url, '', base64Favicon).then(populateLocalStorageFromDB()).then(deleteOldDbEntries()).catch(function (e) {
	                                            tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @topSites1');
	                                        });
	                                    });
	                                }
	                            } else {
	                                // Check if screenshot Db does not exists yet, create a DB entry from scratch
	                                (0, _Utils.imageToB64)(getFavDomain + topSitesArr[i].url).then(function (base64Favicon) {
	                                    updateScreenshotsDB(topSitesArr[i].url, '', base64Favicon).then(populateLocalStorageFromDB()).then(deleteOldDbEntries()).catch(function (e) {
	                                        tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @topSites2');
	                                    });
	                                });
	                            }
	                        };

	                        for (var i = 0; i < Object.keys(topSitesArr).length; i++) {
	                            _loop(i);
	                        }

	                        var urlToScreenshotsMapping = {};
	                        var serverRedirectMapping = {};
	                        for (var i = 0; i < Object.keys(topSitesArr).length; i++) {
	                            urlToScreenshotsMapping[topSitesArr[i].url] = topSitesArr[i].url;
	                        }

	                        // Listen to redirects, and switch the url in case it in the topSites array
	                        chrome.webRequest.onBeforeRedirect.addListener(function (data) {
	                            if (data.url in urlToScreenshotsMapping) {
	                                urlToScreenshotsMapping[data.redirectUrl] = urlToScreenshotsMapping[data.url];
	                            }
	                        }, { urls: ["<all_urls>"] });

	                        // Listen to tab updates, in case it match one of the urlToScreenshotsMapping list, it start working on it
	                        chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
	                            if (tab.active == true && details.status == 'complete') {
	                                var currentTime = new Date().getTime();
	                                if (tab.url in urlToScreenshotsMapping) {
	                                    handleScreenshotsProcess(tab.favIconUrl, tab.url, urlToScreenshotsMapping[tab.url]).catch(function (e) {
	                                        tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @topSites3');
	                                    });
	                                } else {
	                                    //use serverRedirectMapping for determaine if the server redirect the page
	                                    for (var key in serverRedirectMapping) {
	                                        if (serverRedirectMapping[key].id == tabId && serverRedirectMapping[key].windowId == tab.windowId && currentTime - serverRedirectMapping[key].ts < 3000) {
	                                            handleScreenshotsProcess(tab.favIconUrl, tab.url, key).catch(function (e) {
	                                                tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @topSites4');
	                                            });
	                                        }
	                                    }
	                                }
	                                //Build object for server-side redirect huristic,
	                            } else if (tab.active == true && details.status == 'loading') {
	                                var _currentTime2 = new Date().getTime();
	                                if (tab.url in urlToScreenshotsMapping) {
	                                    serverRedirectMapping[tab.url] = {
	                                        'id': tab.id,
	                                        'windowId': tab.windowId,
	                                        'ts': _currentTime2
	                                    };
	                                }
	                                for (var _i in serverRedirectMapping) {
	                                    if (_currentTime2 - serverRedirectMapping[_i].ts > 3000) {
	                                        delete serverRedirectMapping[_i];
	                                    }
	                                }
	                            }
	                        });

	                        _EventsService2.default.trigger(Consts.BUILD_TOPSITES_LOCALSTORAGE_DONE);
	                        _LoggerService2.default.debug('event: ' + Consts.BUILD_TOPSITES_LOCALSTORAGE_DONE);
	                    }();

	                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	                }
	            };
	            break;
	        case ActionTypes.TRIGGER_GET_GOOGLE_TRENDING_SEARCHES:
	            retFunc = function retFunc(args) {
	                _EventsService2.default.trigger(Consts.GET_GOOGLE_TRENDING_SEARCHES);
	            };
	            break;
	        case ActionTypes.GET_GOOGLE_TRENDING_SEARCHES:
	            retFunc = function retFunc(args) {
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                var cc = pref.get('cc');
	                if (cc == null || cc.length != 2) cc = 'US';
	                if (behaviour['countryCodes'] != null && behaviour['countryCodes'][cc] != null) cc = behaviour['countryCodes'][cc];
	                var url = behaviour.url;
	                var params = behaviour.params;
	                params[behaviour['countryCodeParam']] = cc;
	                _HttpService2.default.doPostJSON(url, params, function (response) {
	                    if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
	                        try {
	                            var getTrends = function getTrends(obj, i) {
	                                var trends = [];
	                                var node = behaviour['jsonPath'][i];
	                                if (i < behaviour['jsonPath'].length - 1) {
	                                    var key = node['name'];
	                                    var type = node['type'];
	                                    if (type == 'list') {
	                                        for (var j = 0; j < obj[key].length; j++) {
	                                            trends = trends.concat(getTrends(obj[key][j], i + 1));
	                                        }
	                                    } else if (type == 'obj') trends = trends.concat(getTrends(obj[key], i + 1));else tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, 'Error in JSON path: no such type "' + type + '"', '@GET_GOOGLE_TRENDING_SEARCHES');
	                                } else {
	                                    trends = [{
	                                        title: obj[node['titleName']],
	                                        imageUrl: obj[node['imageUrlName']]
	                                    }];
	                                }
	                                return trends;
	                            };

	                            var trends = getTrends(response, 0);
	                            if (trends != null && trends.length > 0) {
	                                var map = new Map();
	                                for (var i in trends) {
	                                    if (!map.has(trends[i].title)) map.set(trends[i].title, trends[i]);
	                                }pref.set('trends', Array.from(map.values()).slice(0, behaviour['numOfTrends']));
	                            }
	                        } catch (e) {
	                            tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + ' @GET_GOOGLE_TRENDING_SEARCHES');
	                        }
	                    } else {
	                        tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, response, '@GET_GOOGLE_TRENDING_SEARCHES');
	                    }
	                }, function (e) {
	                    tracking.trackStatusEvent(Consts.ERROR_TRACK_EVENT, 'doPost error', e + ' @GET_GOOGLE_TRENDING_SEARCHES');
	                }, null, ['content-type', 'application/x-www-form-urlencoded']);
	            };
	            break;
	        case ActionTypes.TRACK_AND_DO_SEARCH:
	            retFunc = function retFunc(args) {
	                var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                tracking.trackStatusEvent(behaviour['eventType'], args['extra1'], args['extra2'], function (res) {
	                    _LoggerService2.default.debug('Track res:', res);
	                    behaviour['do'] = ActionTypes.DO_SEARCH;
	                    actionCreator(behaviour)(args);
	                });
	                _LoggerService2.default.debug('Track events:', behaviour, args);
	            };
	            break;
	        case ActionTypes.TRACK:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                var extra1 = {};
	                if (args) {
	                    if (args.clickLocation) {
	                        extra1.click_location = args.clickLocation;
	                    }
	                    if (args.extra1) {
	                        if (_typeof(args.extra1) === 'object') {
	                            extra1 = _assign(extra1, args.extra1);
	                        } else {
	                            extra1 = { extra1: args.extra1 };
	                        }
	                    }
	                }

	                if (cond === null || cond.check(args)) {
	                    var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                    tracking.trackStatusEvent(behaviour.eventType, _assign({}, extra1, behaviour.extra1), behaviour.extra2, function (res) {
	                        _LoggerService2.default.debug('Track res: ' + JSON.stringify(res));
	                    });

	                    _LoggerService2.default.debug('Track events: ' + JSON.stringify(behaviour));
	                }
	            };
	            break;
	        case ActionTypes.SET_PREFERENCES:
	            retFunc = function retFunc(args) {
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                if (cond === null || cond && cond.check(args)) {
	                    var relevantKeys = [];
	                    var allKeys = [];
	                    if (behaviour.wildcard == true) {
	                        allKeys = pref.getAllKeys();
	                        allKeys.forEach(function (key) {
	                            if (key.indexOf(behaviour.key) >= 0) {
	                                relevantKeys.push(key);
	                            }
	                        });
	                    } else {
	                        relevantKeys.push(behaviour.key);
	                    }

	                    relevantKeys.forEach(function (key) {
	                        if (behaviour.op) {
	                            var lsValue = pref.get(key) == undefined || pref.get(key) == '' ? 0 : parseFloat(pref.get(key));
	                            switch (behaviour.op) {
	                                case '*':
	                                    lsValue *= behaviour.val;
	                                    pref.set(key, lsValue);
	                                    break;
	                                case '-':
	                                    lsValue -= behaviour.val;
	                                    pref.set(key, lsValue);
	                                    break;
	                                case '/':
	                                    if (lsValue != 0) {
	                                        lsValue /= behaviour.val;
	                                        pref.set(key, lsValue);
	                                    }
	                                    break;
	                                case '+':
	                                    lsValue += behaviour.val;
	                                    pref.set(key, lsValue);
	                                    break;
	                            }
	                        } else {
	                            pref.set(key, behaviour.val);
	                        }
	                    });
	                }
	            };
	            break;
	        case ActionTypes.ADD_SEARCH_REDIRECT:
	            retFunc = function retFunc(args) {
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                chrome.webRequest.onBeforeRequest.addListener(function (details) {
	                    _LoggerService2.default.debug("chrome.tabs.onBeforeRequest");
	                    _LoggerService2.default.debug("searchRedirect:" + JSON.stringify(arguments));
	                    _LoggerService2.default.debug("searchRedirect_details:" + JSON.stringify(details));
	                    return searchRedirect(details);
	                }, { urls: ["*://" + pref.get(Consts.SRCH_MFST_KEY) + "/*"] }, ["blocking"]);
	            };
	            break;
	        case ActionTypes.PING_ALIVE:
	            retFunc = function retFunc(args) {
	                var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);

	                tracking.markDay(Consts.LFC_ALV_KEY, Consts.ALIVE_TRACK_EVENT, true, function (isNewDay) {
	                    if (isNewDay) {
	                        pref.count(Consts.C_ALV_KEY);
	                    }
	                });
	            };
	            break;
	        case ActionTypes.PING_DYNAMIC_ALIVE:
	            retFunc = function retFunc(args) {
	                var track = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;

	                if ((cond === null || cond.check(args)) && pref.get(Consts.ALIVE_DYNAMIC_REPORTS_KEY) != true && pref.get(Consts.ALIVE_DYNAMIC_REPORTS_KEY) != 'true' && behaviour.rules) {
	                    var handleTimeoutAndInterval = function handleTimeoutAndInterval(timeout, interval, counter) {
	                        setTimeout(function () {
	                            var currentCount = 0;
	                            var intervalFunc = setInterval(function () {
	                                sendAlive(counter);
	                            }, interval);

	                            function sendAlive(counter) {
	                                if (currentCount < counter) {
	                                    track.trackStatusEvent(Consts.ALIVE_DYNAMIC_TRACK_EVENT, reportsCounter);
	                                    reportsCounter++;
	                                    currentCount++;
	                                } else {
	                                    clearInterval(intervalFunc);
	                                }
	                            }
	                        }, timeout);
	                    };

	                    pref.set(Consts.ALIVE_DYNAMIC_REPORTS_KEY, true);
	                    var reportsCounter = 1;
	                    for (var i = 0; i < Object.keys(behaviour.rules).length; i++) {
	                        if (behaviour.rules[i].hasOwnProperty('startTime') && behaviour.rules[i].hasOwnProperty('interval') && behaviour.rules[i].hasOwnProperty('limit')) {
	                            handleTimeoutAndInterval(behaviour.rules[i].startTime * 1000, behaviour.rules[i].interval * 1000, behaviour.rules[i].limit);
	                        }
	                    }
	                }
	            };
	            break;
	        case ActionTypes.DO_SEARCH:
	            retFunc = function retFunc(args) {
	                var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);

	                if (args.notification) {
	                    search.doSearch(args.text);
	                    return;
	                }

	                if (args.keyCode === undefined || args.keyCode && args.keyCode === 13) {
	                    if (args.stringId.toLowerCase() != 'ds') {
	                        search.doSearch(args.text ? args.text : search.searchStrings[args.stringId], 'nt');
	                    } else {
	                        search.doSearch(args.text ? args.text : search.searchStrings[args.stringId], 'ds');
	                    }
	                }
	            };
	            break;
	        case ActionTypes.CHANGE_ENGINE:
	            retFunc = function retFunc(args, sender) {
	                var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);
	                search.config.selectedCategory = sender.id;
	            };
	            break;
	        case ActionTypes.UPDATE_SEARCH_TEXT:
	            retFunc = function retFunc(args) {
	                var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);
	                if (args.stringId) {
	                    search.setSearchString(args.stringId, args.text);
	                }
	            };
	            break;
	        case ActionTypes.UPDATE_SEARCH_CATEGORY:
	            retFunc = function retFunc(args, sender) {
	                var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);
	                var category = sender && sender.id ? sender.id : behaviour.category ? behaviour.category : args && args.category ? args.category : 'web';
	                search.setSelectedSearchCategory(category);
	                var extra1 = {
	                    "extra1": {
	                        "extra1": search.config.sengineTemp || null
	                    }
	                };
	                _EventsService2.default.trigger(Consts.SELECTED_SEARCH_CATEGORY_CHANGED, [_assign({}, args, extra1)]);
	                _LoggerService2.default.debug('event: ' + Consts.SELECTED_SEARCH_CATEGORY_CHANGED);
	            };
	            break;
	        case ActionTypes.RELOAD_PREFERENCES:
	            retFunc = function retFunc(args) {
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                pref.reloadAll();
	            };
	            break;
	        case ActionTypes.READ_DS_HASH:
	            retFunc = function retFunc(args) {
	                var searchText = (0, _Utils.getParameterByName)('terms');
	                _EventsService2.default.trigger('HASH_URL', [{ hash: window.location.hash, stringId: 'ds', text: searchText }]);
	                _LoggerService2.default.debug('event: ' + 'HASH_URL' + "hash: " + window.location.hash);
	            };
	            break;
	        case ActionTypes.INIT_SSE:
	            retFunc = function retFunc(args) {
	                var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                var active = pref.get('secured_active');
	                if (active == true || active == 'true') {
	                    var ext_id = _ChromeService2.default.id();
	                    var url = 'chrome-extension://' + ext_id + '/lib/background/index.js';
	                    _HttpService2.default.doGet(url, '', function (response) {
	                        if (response.status == 200 && response.readyState == 4) {
	                            var script = document.createElement('script');
	                            script.setAttribute('src', 'chrome-extension://' + ext_id + '/lib/background/index.js');
	                            document.head.appendChild(script);
	                        }
	                    });
	                }
	            };
	            break;

	        case ActionTypes.SHOW_NOTIFICATION:
	            retFunc = function retFunc(args) {
	                var tracking = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	                tracking.markDay(Consts.LFC_NTF_KEY, null, false, function (isNewDay) {
	                    if (isNewDay) {
	                        var notification = _ServiceFactory2.default.get(Consts.NOTIFICATION_SERVICE);
	                        notification.show();
	                    }
	                });
	            };
	            break;
	        case ActionTypes.REGISTER_IDLE_LISTENER:
	            retFunc = function retFunc(args) {
	                var chrome = _ChromeService2.default;
	                var notification = _ServiceFactory2.default.get(Consts.NOTIFICATION_SERVICE);
	                var idleTime = notification.idleTime();
	                chrome.registerIdleListener(idleTime);
	            };
	            break;
	        case ActionTypes.CHECK_NEW_DAY:
	            retFunc = function retFunc(args) {};
	            break;
	        case ActionTypes.MARK_IF_NT_IS_TAKEN:
	            retFunc = function retFunc(args) {
	                var cond = behaviour.c ? new _Condition2.default(behaviour.c) : null;
	                if (cond === null || cond && cond.check(args, behaviour)) {
	                    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	                    if (behaviour.localStorageKey) {
	                        pref.set(behaviour.localStorageKey, _ChromeService2.default.checkIfNewTabIsTaken());
	                    }
	                }
	            };
	            break;
	        default:
	            retFunc = function retFunc() {};
	    }

	    return function () {
	        (0, _Utils.populateFromLocalStorage)(behaviour);
	        (0, _Utils.populateFromLocalStorage)(arguments[0]);
	        var env_ = _EventsService2.default.env_;
	        var argsObj = {};
	        for (var i in arguments) {
	            argsObj = _assign(argsObj, arguments[i]);
	        }
	        // if trigger force cross events, don't take into consideration the listener
	        if (argsObj.forceCrossContextEvent === true) {
	            retFunc.apply(this, arguments);
	            // if trigger force cross event for certain targets, check if it matches
	        } else if (_typeof(argsObj.forceCrossContextEvent) === 'object' && env_) {
	            if (argsObj.forceCrossContextEvent[env_]) {
	                retFunc.apply(this, arguments);
	            }
	            // if no force involved, keep checking the regular flow
	        } else if (argsObj.eventFromOtherContext) {
	            // check if listener accept events from other context
	            if (behaviour.crossContextListener === true) {
	                // check if trigger define desired targets
	                if (_typeof(argsObj.crossContextEventTargets) === 'object') {
	                    if (argsObj.crossContextEventTargets[env_]) {
	                        retFunc.apply(this, arguments);
	                    }
	                } else {
	                    retFunc.apply(this, arguments);
	                }
	            }
	            // check if listener accept only events from certain sources, if so check if the sources match
	            else if (_typeof(behaviour.crossContextListener) === 'object' && argsObj.eventSource) {
	                    if (behaviour.crossContextListener[argsObj.eventSource]) {
	                        retFunc.apply(this, arguments);
	                    }
	                }
	        } else if (_typeof(argsObj.crossContextEventTargets) === 'object') {
	            if (argsObj.crossContextEventTargets[env_]) {
	                retFunc.apply(this, arguments);
	            }
	        }
	        // event come from the same context, and there is not filtering in the trigger
	        else retFunc.apply(this, arguments);
	    };
	}

	function createSess() {
	    return "yxxx-zzzzzzzzzzzz".replace(/[xyz]/g, function (a) {
	        var b = 16 * Math.random() | 0;
	        return ("y" == a ? b & 3 | 8 : b).toString(16);
	    });
	}

	function getDefaultData() {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);

	    pref.set(Consts.GUID_KEY, (0, _Utils.createGUID)());
	    pref.set(Consts.FIRST_VER_KEY, _ChromeService2.default.version());
	    pref.set(Consts.LAST_VER_KEY, _ChromeService2.default.version());

	    // install time in hours GMT, according to client, may be fixed later by server time
	    try {
	        var ith = Math.floor(new Date().getTime() / 1000 / 60 / 60);
	        pref.set(Consts.LFC_ITH_KEY, ith);
	    } catch (e) {
	        _LoggerService2.default.track('error', 'getDefaultData90: ' + e.message);
	    }

	    if (pref.get(Consts.AFLT_KEY) == '') {
	        pref.set(Consts.AFLT_KEY, getDefaultAflt());
	        pref.set(Consts.B_AFLT_KEY, "ICO-" + md5(pref.get(Consts.AFLT_KEY)).substr(0, 8).toLowerCase());
	    }
	}

	function getDefaultAflt() {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var format = pref.get(Consts.DEFUALT_AFLT_FORMAT_KEY);
	    var d = new Date();

	    return format.replace('{{yy}}', ("0" + d.getYear()).slice(-2)).replace('{{ww}}', (0, _Utils.getWeek)(d));
	}

	function getCookieData() {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);

	    if (pref.get(Consts.VERIFIED_HOST_KEY) != null) {
	        _ChromeService2.default.getCookies(pref.get(Consts.VERIFIED_HOST_KEY), processCookieData);
	    }
	}

	function getRid() {
	    function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }

	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function processCookieData(c) {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var track = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);

	    try {
	        // map data keys from jmbextts cookie to "user" (localStorage)
	        var localUser = [],
	            var_map = {
	            aflt: Consts.AFLT_KEY,
	            'xlp_sess_guid': Consts.GUID_KEY,
	            'xlp_pers_guid': 'xlp_pers_guid',
	            'cookie_ts': Consts.LS_TS_KEY,
	            'extension_id': 'extension_id'
	        };

	        for (var i in c) {
	            var cookie = c[i];
	            if (cookie.name == pref.get(Consts.COOKIE_NAME_KEY)) {
	                pref.set(Consts.COOKIE_VALUE, cookie.value);
	                var o = splitCookie(cookie.value);

	                for (var key in var_map) {
	                    localUser[var_map[key]] = o[key];
	                }
	            }

	            if (cookie.name == Consts.AFLT_KEY) localUser[Consts.AFLT_KEY] = cookie.value.substr(0, 12);
	            if (cookie.name == Consts.UREF_KEY) localUser[Consts.UREF_KEY] = cookie.value.substr(0, 12);else if (cookie.name == 'itag') {
	                var _val = cookie.value.substr(0, 2);
	                if (_val >= 'A0' && _val <= 'A7') localUser['itag'] = _val;
	            }
	        }

	        if (localUser[Consts.AFLT_KEY] === '' || localUser[Consts.AFLT_KEY] === undefined) {
	            localUser[Consts.AFLT_KEY] = getDefaultAflt();
	        }

	        _LoggerService2.default.debug("aflt: " + localUser[Consts.AFLT_KEY]);

	        localUser[Consts.B_AFLT_KEY] = "ICO-" + md5(localUser[Consts.AFLT_KEY]).substr(0, 8).toLowerCase();
	        // check if cookie data is newer then LS
	        localUser[Consts.LS_TS_KEY] = Math.floor(localUser[Consts.LS_TS_KEY] / 1000);
	        if (pref.get(Consts.LS_TS_KEY) < localUser[Consts.LS_TS_KEY] && _ChromeService2.default.id() === localUser['extension_id']) {
	            var keys = ['cd', 'cr', 'c_ver', 'param2'];
	            keys.forEach(function (key) {
	                pref.set(key, undefined);
	            });

	            /*
	             ['cd', 'cr', 'c_ver', 'param2'].map(function (key) {
	             pref.set(key, undefined);
	             return key;
	             });*/

	            for (var _key in var_map) {
	                pref.set(var_map[_key], undefined);
	            }

	            for (var _key2 in localUser) {
	                pref.set(_key2, localUser[_key2]);
	            }
	        } else if (pref.get(Consts.LS_TS_KEY) == 0) {
	            pref.set(Consts.LS_TS_KEY, Math.floor(new Date().getTime() / 1000));
	        }

	        track.trackStatusEvent(Consts.EXTENSION_INSTALLED);
	        _EventsService2.default.trigger(Consts.PARSE_COOKIE_FINISHED);
	        _LoggerService2.default.debug('event: ' + Consts.PARSE_COOKIE_FINISHED);
	        setTimeout(function () {
	            _LoggerService2.default.debug(Consts.FIRST_RUN_KEY);
	            // ee.trigger(Consts.PARSE_COOKIE_FINISHED);
	            if (runRidCheck()) {
	                var rid = getRid();
	                var header = ['Content-Type', 'application/json'];
	                pref.set(Consts.RID_KEY, rid);
	                _HttpService2.default.doPostJSON(pref.get(Consts.RID_URL_KEY), {
	                    rid: rid,
	                    cookie_key: pref.get(Consts.COOKIE_NAME_KEY)
	                }, function (result) {
	                    result[pref.get(Consts.COOKIE_NAME_KEY)]['action'] = 'first_run_ext';
	                    var data = {
	                        table: 'installcore_extensions',
	                        data: JSON.stringify(result[pref.get(Consts.COOKIE_NAME_KEY)])
	                    };
	                    _HttpService2.default.doPostJSON(pref.get(Consts.RID_VERIFY_KEY), data, null, null, null, header);
	                }, null, null, header);
	            }

	            track.trackStatusEvent(Consts.FIRST_RUN_KEY, pref.get(Consts.POPUP_DELAY_KEY), pref.get(Consts.RID_KEY), function (res) {
	                pref.set(Consts.FIRST_RUN_KEY, false);
	                _LoggerService2.default.debug('firstRunSent');

	                try {
	                    // make install time accurate server time
	                    var date = new Date(res.getResponseHeader('Date'));
	                    var hours = Math.floor(date.getTime() / 1000 / 60 / 60);
	                    // check discrepancy with time
	                    var lfc_ith = pref.get(Consts.LFC_ITH_KEY);

	                    if (lfc_ith != null && Math.abs(lfc_ith - hours) > 1) {
	                        pref.set('client.td', lfc_ith - hours); // client time discrepancy
	                    }
	                    pref.set(Consts.LFC_ITH_KEY, hours);
	                } catch (e) {
	                    _LoggerService2.default.track('error', 'processCookieData: ' + e.message);
	                }
	            });
	        }, 3000);

	        _LoggerService2.default.debug('Finish parsing user data');
	    } catch (e) {
	        _LoggerService2.default.debug('error: ' + e.message);
	        track.trackStatusEvent(Consts.ERROR_TRACK_EVENT, e.message, e.lineNumber + '@udata');
	    }
	}

	function splitCookie(value) {
	    var vars = [],
	        hash = void 0;
	    var hashes = value.split('&');

	    for (var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        if (!(hash[0] == "" || typeof hash[0] == "undefined" || hash[1] == "" || typeof hash[1] == "undefined")) {
	            vars[hash[0]] = hash[1];
	        }
	    }

	    return vars;
	}

	function runRidCheck() {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    return pref.get(Consts.RID_VERIFY_KEY) && pref.get(Consts.RID_URL_KEY) && pref.get(Consts.RID_VERIFY_KEY) != '0' && pref.get(Consts.RID_URL_KEY) != '0';
	}

	function setUninstallUrl() {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var track = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	    var verifiedHost = pref.get(Consts.VERIFIED_HOST_KEY);
	    var uninstallHost = pref.get(Consts.UNINSTALL_DOMAIN);
	    var host = uninstallHost && uninstallHost.indexOf('{{') == -1 ? uninstallHost : verifiedHost;
	    var uninstallFormatUrl = pref.get(Consts.UNINSTALL_URL_FORMAT_KEY);
	    var protocol = pref.get(Consts.SECURE_HTTP_KEY) == '1' ? 'https://' : 'http://';
	    var lsData = btoa(JSON.stringify(track.trackStatusEventGetDataObject(Consts.UNINSTALL_TRACK_EVENT_KEY)));
	    var uninstallUrl = uninstallFormatUrl.replace('{{' + 'UNINSTALL_URL' + '}}', host).replace('{{' + 'verified_host' + '}}', host);
	    _ChromeService2.default.setUninstallURL(uninstallUrl);
	    _ChromeService2.default.setCookies(uninstallUrl, host, Consts.URL_DATA_COOKIE_ID, protocol + pref.get(Consts.TRACK_KEY));
	    _ChromeService2.default.setCookies(uninstallUrl, host, Consts.LS_DATA_COOKIE_ID, lsData);
	}

	function searchRedirect(details) {
	    var url = details.url;

	    var method = '';
	    var search_terms = void 0;
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var track = _ServiceFactory2.default.get(Consts.TRACKING_SERVICE);
	    var search = _ServiceFactory2.default.get(Consts.SEARCH_SERVICE);
	    var a = document.createElement('a');

	    a.href = url;

	    if (a.pathname == '/' || a.pathname == '') {
	        var type = a.search.substr(1, 1);
	        switch (type) {
	            case 's':
	                method = 'SuggestUrl';
	                break;
	            case 'u':
	            case 'h':
	                return { redirectUrl: "chrome://newtab" };
	            default:
	                break;
	        }

	        search_terms = a.search.substr(3);
	    } else {
	        try {
	            method = 'SearchUrl';
	            search_terms = decodeURIComponent(a.pathname.substring(1));
	            pref.set(Consts.SELECTED_SEARCH_CATEGORY_KEY, Consts.SEARCH_CAT_WEB);

	            setTimeout(function () {
	                pref.count('c.sob'); // count search query from omni box
	                pref.markTime('act.sob'); // mark search query from omni box activity time
	                track.markActive(); // mark general user activity
	                if (pref.get('ds1') != 1 && _ChromeService2.default.checkIfDefaultSearchIsTaken()) {
	                    _EventsService2.default.trigger(Consts.SEARCH_OB_DONE_EVENT);
	                }
	            }, 100);
	        } catch (e) {
	            _LoggerService2.default.track('error', 'searchRedirect90: ' + e.message);
	        }
	    }

	    var locale = '';
	    //var url = '';
	    try {
	        url = method === 'SuggestUrl' ? (0, _Utils.sprintf)(search.getSuggestUrl(), {
	            searchTerms: search_terms,
	            lang: locale
	        }) : search.getSearchUrl(search_terms);
	        if (url == '' || url == undefined) {
	            _LoggerService2.default.track('error', 'searchRedirect91: ' + 'empty_url');
	        }
	    } catch (e) {
	        _LoggerService2.default.track('error', 'searchRedirect92: ' + e.message);
	    }

	    var search_url = url;
	    var checker_f_url = pref.get(Consts.CHECKER_F_URL_KEY) && pref.get(Consts.CHECKER_F_URL_KEY) != 'false' ? pref.get(Consts.CHECKER_F_URL_KEY) : false;
	    var checker_t_url = pref.get(Consts.CHECKER_T_URL_KEY) && pref.get(Consts.CHECKER_T_URL_KEY) != 'false' ? pref.get(Consts.CHECKER_T_URL_KEY) : false;
	    var checker_f_fullURL = 'http://' + pref.get(Consts.SRCH_MFST_KEY) + checker_f_url;
	    var checker_t_fullURL = 'http://' + pref.get(Consts.SRCH_MFST_KEY) + checker_t_url;

	    //sprintf(url, {searchTerms: search_terms, lang: locale});
	    _LoggerService2.default.debug('Search Method:' + method);
	    _LoggerService2.default.debug('URL:' + url);
	    _LoggerService2.default.debug('Search Terms:' + search_terms);
	    _LoggerService2.default.debug('DS1:' + pref.get('ds1'));

	    if (!_ChromeService2.default.checkIfNewTabIsTaken() || !_ChromeService2.default.checkIfDefaultSearchIsTaken()) {
	        pref.set('ds1', 0);
	    }

	    try {
	        if (pref.get('ds1') === 1 && method !== 'SuggestUrl') {
	            search_url = _ChromeService2.default.newTabUrl() + '?terms=' + encodeURIComponent(search_terms) + '#ds1';
	            _ChromeService2.default.updateTab(details.tabId, search_url);
	        } else {
	            // Verify the checker False file url and redirect it to True file
	            if (method !== 'SuggestUrl' && checker_f_url && checker_t_url && checker_f_fullURL === details.url) {
	                return { 'redirectUrl': checker_t_fullURL };
	            }
	            // Does not initiate a redirect in case trying to reach checker True file
	            else if (method !== 'SuggestUrl' && checker_t_url && checker_t_fullURL === details.url) {
	                    return;
	                } else if (_ChromeService2.default.checkIfDefaultSearchIsTaken()) {
	                    return { 'redirectUrl': search_url };
	                }
	        }
	    } catch (e) {
	        _LoggerService2.default.track('error', 'searchRedirect93: ' + e.message);
	    }
	}

	function checkFile(extId, fileName, retries, timeout, cb, checkOverride) {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var url = 'chrome-extension://' + extId + '/' + fileName;
	    _HttpService2.default.doGetJSON(url, insertToStorage, retryXhr);

	    function insertToStorage(result) {
	        try {
	            if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) == "object") {
	                for (var key in result) {
	                    if (checkOverride && result.hasOwnProperty(key) && checkOverride.indexOf(key) > -1) {
	                        if (pref.get(key) === undefined || (0, _Utils.strStartsWith)(pref.get(key).toString(), '{{')) {
	                            pref.set(key, result[key]);
	                        }
	                    } else if (result.hasOwnProperty(key)) {
	                        pref.set(key, result[key]);
	                    }
	                }
	            }
	            cb();
	        } catch (e) {
	            cb();
	        }
	    }

	    function retryXhr() {
	        if (retries > 0) {
	            retries--;
	            setTimeout(function () {
	                _HttpService2.default.doGetJSON(url, insertToStorage, retryXhr);
	            }, timeout * 1000);
	        } else {
	            cb();
	        }
	    }
	}

	function isLocalstorageValueIsValid(key) {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var value = pref.get(key);
	    if (value && value != undefined && value != null && value != '') {
	        return true;
	    } else {
	        return false;
	    }
	}

	function updateIDS(cb) {
	    var pref = _ServiceFactory2.default.get(Consts.PREFERENCES_SERVICE);
	    var id = _ChromeService2.default.id();
	    var file = "e_.json";
	    var retries = 0;
	    var timeout = 0.5;
	    var checkOverride = ['config_id'];
	    checkFile(id, file, retries, timeout, function () {
	        idsOverrideByConfig(cb);
	    });

	    function idsOverrideByConfig(cb) {
	        try {
	            if (pref.config_.properties.config_id != (null && undefined) && !(0, _Utils.strStartsWith)(pref.config_.properties.config_id.toString(), '{{')) {
	                pref.set(Consts.CONFIG_ID_KEY, pref.config_.properties.config_id);
	            }
	        } catch (e) {
	            _LoggerService2.default.track('error', 'idsOverrideByConfig90: ' + e.message);
	        }
	        if (cb) {
	            cb();
	        }
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SET_UNINSTALL_COOKIE = exports.SET_UNINSTALL_COOKIE = 'SET_UNINSTALL_COOKIE';
	var CREATE_NEW_TAB = exports.CREATE_NEW_TAB = 'CREATE_NEW_TAB';
	var UPDATE_CONFIG = exports.UPDATE_CONFIG = 'UPDATE_CONFIG';
	var RUN_ACTIONS = exports.RUN_ACTIONS = 'RUN_ACTIONS';
	var TRACK = exports.TRACK = 'TRACK';
	var PING_ALIVE = exports.PING_ALIVE = 'PING_ALIVE';
	var PING_DYNAMIC_ALIVE = exports.PING_DYNAMIC_ALIVE = 'PING_DYNAMIC_ALIVE';
	var PARSE_USER_DATA = exports.PARSE_USER_DATA = 'PARSE_USER_DATA';
	var RELOAD_PREFERENCES = exports.RELOAD_PREFERENCES = 'RELOAD_PREFERENCES';
	var READ_DS_HASH = exports.READ_DS_HASH = 'READ_DS_HASH';
	var UPDATE_SEARCH_TEXT = exports.UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT';
	var UPDATE_SEARCH_CATEGORY = exports.UPDATE_SEARCH_CATEGORY = 'UPDATE_SEARCH_CATEGORY';
	var DO_SEARCH = exports.DO_SEARCH = 'DO_SEARCH';
	var CHANGE_ENGINE = exports.CHANGE_ENGINE = 'CHANGE_ENGINE';
	var ADD_SEARCH_REDIRECT = exports.ADD_SEARCH_REDIRECT = 'ADD_SEARCH_REDIRECT';
	var PUBLISH_EVENT_ON_INTERVAL = exports.PUBLISH_EVENT_ON_INTERVAL = 'PUBLISH_EVENT_ON_INTERVAL';
	var INIT_SSE = exports.INIT_SSE = 'INIT_SSE';
	var SHOW_NOTIFICATION = exports.SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
	var REGISTER_IDLE_LISTENER = exports.REGISTER_IDLE_LISTENER = 'REGISTER_IDLE_LISTENER';
	var CHECK_NEW_DAY = exports.CHECK_NEW_DAY = 'CHECK_NEW_DAY';
	var NOTIFICATION_SEARCH = exports.NOTIFICATION_SEARCH = 'NOTIFICATION_SEARCH';
	var SET_PREFERENCES = exports.SET_PREFERENCES = 'SET_PREFERENCES';
	var CHECK_NEW_XT_ABG = exports.CHECK_NEW_XT_ABG = 'CHECK_NEW_XT_ABG';
	var CHECK_NEW_CONFIG = exports.CHECK_NEW_CONFIG = 'CHECK_NEW_CONFIG';
	var MARK_IF_NT_IS_TAKEN = exports.MARK_IF_NT_IS_TAKEN = 'MARK_IF_NT_IS_TAKEN';

	var SET_SEARCH_ENGINE = exports.SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE';
	var INIT_SEARCH_ENGINE = exports.INIT_SEARCH_ENGINE = 'INIT_SEARCH_ENGINE';
	var UPDATE_CONFIG_AND_ENGINE_ID = exports.UPDATE_CONFIG_AND_ENGINE_ID = 'UPDATE_CONFIG_AND_ENGINE_ID';
	var CHECK_UPDATE_CONFIG = exports.CHECK_UPDATE_CONFIG = 'CHECK_UPDATE_CONFIG';
	var DO_UPDATE_CONFIG = exports.DO_UPDATE_CONFIG = 'DO_UPDATE_CONFIG';
	var SET_CHROME_POPUP = exports.SET_CHROME_POPUP = 'SET_CHROME_POPUP';
	var GET_CHROME_TOPSITES = exports.GET_CHROME_TOPSITES = 'GET_CHROME_TOPSITES';
	var BUILD_TOPSITES_LOCALSTORAGE = exports.BUILD_TOPSITES_LOCALSTORAGE = 'BUILD_TOPSITES_LOCALSTORAGE';
	var CAPTURE_TOPSITES_SCREENSHOTS = exports.CAPTURE_TOPSITES_SCREENSHOTS = 'CAPTURE_TOPSITES_SCREENSHOTS';
	var OPEN_THANK_YOU_PAGE = exports.OPEN_THANK_YOU_PAGE = 'OPEN_THANK_YOU_PAGE';

	var GET_GOOGLE_TRENDING_SEARCHES = exports.GET_GOOGLE_TRENDING_SEARCHES = 'GET_GOOGLE_TRENDING_SEARCHES';
	var TRIGGER_GET_GOOGLE_TRENDING_SEARCHES = exports.TRIGGER_GET_GOOGLE_TRENDING_SEARCHES = 'TRIGGER_GET_GOOGLE_TRENDING_SEARCHES';
	var TRACK_AND_DO_SEARCH = exports.TRACK_AND_DO_SEARCH = 'TRACK_AND_DO_SEARCH';

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _HttpService = __webpack_require__(14);

	var _HttpService2 = _interopRequireDefault(_HttpService);

	var _StorageService = __webpack_require__(9);

	var _StorageService2 = _interopRequireDefault(_StorageService);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _Consts = __webpack_require__(1);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Promise = __webpack_require__(16).Promise;
	var md5 = __webpack_require__(23);


	var CONFIG_KEY = 'ci';
	var CONFIG_HASH_KEY = 'ci.h';
	var FALLBACK_CONFIG = "responseConfig.json";

	var ConfigurationService = function () {
	    function ConfigurationService() {
	        _classCallCheck(this, ConfigurationService);

	        this.config = null;
	    }

	    _createClass(ConfigurationService, [{
	        key: 'load',
	        value: function load() {
	            var self = this;
	            // TODO: load the configuration of the extension from the server
	            // After loading the configuration should bootstrap the extension components
	            var promise = new Promise(function (resolve, reject) {
	                // Load from local storage
	                self.reload();

	                // Works only in dev mode
	                self.loadFromHash();

	                if (self.config !== null) {
	                    resolve(self.config);
	                } else {
	                    // Load from server, in case of timeout
	                    self.loadFromLocal().then(function () {
	                        resolve(self.config);
	                    }).catch(function (err) {
	                        reject(err);
	                    });
	                }
	            });

	            return promise;
	        }
	    }, {
	        key: 'loadFromServer',
	        value: function loadFromServer(data) {
	            var self = this;

	            // Try to load config_server url from local storage:
	            var prefService = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);

	            // Load from server, in case of timeout
	            return _HttpService2.default.doPostJSON(prefService.get(_Consts.CONFIG_SERVER_KEY), data).then(function (json) {
	                _LoggerService2.default.debug('received config from server:' + json);
	                // Load the config from the C param in the url
	                if (json.placeholders || json.config) {
	                    self.config = self.buildConfigFromResponse(json);
	                    _EventsService2.default.trigger(_Consts.CONFIG_RECEIVED);
	                } else if ((typeof json === 'undefined' ? 'undefined' : _typeof(json)) === 'object' && !json.message) {
	                    self.config = json;
	                    _EventsService2.default.trigger(_Consts.CONFIG_RECEIVED);
	                } else {
	                    try {
	                        prefService.set(_Consts.FIRST_CONFIG_LOAD, true);
	                        return self;
	                    } catch (e) {
	                        _LoggerService2.default.track('error', 'loadFromServer90: ' + e.message);
	                    }
	                }
	                self.save();

	                return self;
	            });
	        }
	    }, {
	        key: 'loadFromLocal',
	        value: function loadFromLocal() {
	            var self = this;

	            // Load from server, in case of timeout
	            return _HttpService2.default.doGet(FALLBACK_CONFIG, 'json').then(function (json) {
	                if (json.placeholders || json.config) {
	                    self.config = self.buildConfigFromResponse(json);
	                } else {
	                    self.config = json;
	                }
	                self.save();
	            }.bind(this));
	        }
	    }, {
	        key: 'buildConfigFromResponse',
	        value: function buildConfigFromResponse(response) {
	            var config = {};
	            var configStr = JSON.stringify(response.config);

	            if (response.placeholders) {
	                // Replace all the placeholders in the config
	                for (var key in response.placeholders) {
	                    var placeholder = "{{" + key + "}}";
	                    var value = _typeof(response.placeholders[key]) === "object" ? JSON.stringify(response.placeholders[key]) : response.placeholders[key];

	                    if (typeof response.placeholders[key] === "number" || typeof response.placeholders[key] === "boolean" || _typeof(response.placeholders[key]) === "object") {
	                        placeholder = "\"" + placeholder + "\"";
	                    }

	                    configStr = configStr.replace(placeholder, value);
	                }
	            }

	            var responseConfig = JSON.parse(configStr);
	            var nodes = {};

	            for (var i = 0; i < responseConfig.length; i++) {
	                nodes[responseConfig[i].compId] = responseConfig[i];

	                if (responseConfig[i].parId === 0) {
	                    config = nodes[responseConfig[i].compId];
	                }
	            }

	            for (var j = 0; j < responseConfig.length; j++) {
	                if (responseConfig[j].parId && responseConfig[j].parId !== 0) {
	                    nodes[responseConfig[j].parId].components.push(nodes[responseConfig[j].compId]);
	                }
	            }

	            return config;
	        }
	    }, {
	        key: 'loadFromHash',
	        value: function loadFromHash() {
	            if (false) {
	                var json = void 0;
	                if (location.hash.length > 1) {
	                    try {
	                        json = JSON.parse(window.decodeURIComponent(location.hash.substr(1)));
	                    } catch (e) {
	                        _LoggerService2.default.log('Loading from hash error:' + e.message);
	                        _LoggerService2.default.track('error', 'loadFromHash90: ' + e.message);
	                    }
	                }

	                if (json) {
	                    if (json.placeholders || json.config) {
	                        this.config = this.buildConfigFromResponse(json);
	                    } else {
	                        this.config = json;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            var configStr = JSON.stringify(this.config);
	            var configHash = md5(configStr);

	            if (_StorageService2.default.get(CONFIG_HASH_KEY) !== configHash) {
	                _StorageService2.default.set(CONFIG_HASH_KEY, configHash);
	                _StorageService2.default.set(CONFIG_KEY, configStr);
	                var pref = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);
	                if (pref !== undefined) pref.setConfig(configStr);
	            }
	        }
	    }, {
	        key: 'reload',
	        value: function reload() {
	            var configHash = _StorageService2.default.get(CONFIG_HASH_KEY);
	            var configStr = _StorageService2.default.get(CONFIG_KEY);

	            if (configHash !== undefined && configStr !== undefined) {
	                this.config = JSON.parse(configStr);
	            }
	        }
	    }, {
	        key: 'getConfiguration',
	        value: function getConfiguration() {
	            return this.config;
	        }
	    }, {
	        key: 'registerConfigChanged',
	        value: function registerConfigChanged(callback) {}
	    }]);

	    return ConfigurationService;
	}();

	exports.default = ConfigurationService;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = md5;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ServiceFactory = __webpack_require__(5);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _Consts = __webpack_require__(1);

	var _Utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Condition = function () {
	    function Condition(condition) {
	        _classCallCheck(this, Condition);

	        var hash = window.location.hash;
	        this._hash = (0, _Utils.buildObjectFromStringWithDelimiters)(hash, '-', '_', '#');
	        this._hash = this._hash ? this._hash : {};
	        this.condition = condition;
	        this.pref = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);
	    }

	    _createClass(Condition, [{
	        key: 'check',
	        value: function check(args, behaviour) {
	            var retVal = false;
	            var cond = void 0,
	                i = void 0,
	                j = void 0;

	            if (this.condition.and) {
	                retVal = true;
	                for (i = 0; i < this.condition.and.length && retVal; i++) {
	                    cond = new Condition(this.condition.and[i]);
	                    retVal = retVal && cond.check(args, behaviour);
	                }
	            } else if (this.condition.or) {
	                for (j = 0; j < this.condition.or.length && !retVal; j++) {
	                    cond = new Condition(this.condition.or[j]);
	                    retVal = retVal || cond.check(args, behaviour);
	                }
	            } else {
	                retVal = this.checkCondition(this.condition, args, behaviour);
	            }

	            return retVal;
	        }
	    }, {
	        key: 'checkCondition',
	        value: function checkCondition(condition, args, behaves) {
	            var retVal = false;
	            var prefVal = void 0;
	            if (isNaN(parseFloat(this.pref.get(condition.pref)))) {
	                prefVal = this.pref.get(condition.pref);
	            } else {
	                prefVal = parseFloat(this.pref.get(condition.pref));
	            }

	            if (args == undefined) {
	                args = {};
	            }
	            switch (condition.op) {
	                case "=":
	                    if (condition.pref !== undefined) {
	                        retVal = prefVal == condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] === condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] === condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] === condition.val;
	                    }
	                    break;
	                case ">":
	                    if (condition.pref !== undefined) {
	                        var lsVal = prefVal == undefined ? 0 : prefVal;
	                        retVal = lsVal > condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] > condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] > condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] > condition.val;
	                    }
	                    break;
	                case "<":
	                    if (condition.pref !== undefined) {
	                        var _lsVal = prefVal == undefined ? 0 : prefVal;
	                        retVal = _lsVal < condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] < condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] < condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] < condition.val;
	                    }
	                    break;
	                case ">=":
	                    if (condition.pref !== undefined) {
	                        var _lsVal2 = prefVal == undefined ? 0 : prefVal;
	                        retVal = _lsVal2 >= condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] >= condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] >= condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] >= condition.val;
	                    }
	                    break;
	                case "<=":
	                    if (condition.pref !== undefined) {
	                        var _lsVal3 = prefVal == undefined ? 0 : prefVal;
	                        retVal = _lsVal3 <= condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] <= condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] <= condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] <= condition.val;
	                    }
	                    break;
	                case "!=":
	                    if (condition.pref !== undefined) {
	                        retVal = prefVal != condition.val;
	                    } else if (condition.arg !== undefined) {
	                        retVal = args[condition.arg] != condition.val;
	                    } else if (condition.behave !== undefined) {
	                        retVal = behaves[condition.behave] != condition.val;
	                    } else if (condition.hash !== undefined) {
	                        retVal = this._hash[condition.hash] !== condition.val;
	                    }
	                    break;
	            }

	            return retVal;
	        }
	    }]);

	    return Condition;
	}();

	exports.default = Condition;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _assign = __webpack_require__(8);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _BrowserService = __webpack_require__(19);

	var _BrowserService2 = _interopRequireDefault(_BrowserService);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _Utils = __webpack_require__(3);

	var _LoggerService = __webpack_require__(2);

	var _LoggerService2 = _interopRequireDefault(_LoggerService);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _StorageService = __webpack_require__(9);

	var _StorageService2 = _interopRequireDefault(_StorageService);

	var _Consts = __webpack_require__(1);

	var _Actions = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SearchService = function () {
	    function SearchService(config) {
	        _classCallCheck(this, SearchService);

	        try {
	            this.reloadSearchConfig(config, false);
	        } catch (e) {
	            _LoggerService2.default.track('error', 'reloadSearchConfig90: ' + e.message);
	        }
	    }

	    _createClass(SearchService, [{
	        key: 'reloadSearchConfig',
	        value: function reloadSearchConfig(conf, searchComp) {
	            var config = null;
	            if (searchComp == true) {
	                if (conf["id"] == "extension") {
	                    for (var i in conf["components"]) {
	                        if (conf["components"][i]["id"] == "commonComponents") {
	                            for (var j in conf["components"][i]["components"]) {
	                                if (conf["components"][i]["components"][j]["id"] == "SearchService") {
	                                    config = conf["components"][i]["components"][j];
	                                }
	                            }
	                        }
	                    }
	                }
	            } else {
	                config = conf;
	            }

	            if (config.properties) {
	                this.pref = _ServiceFactory2.default.get(_Consts.PREFERENCES_SERVICE);
	                this.StorageService = _StorageService2.default;
	                this.chrome = _ChromeService2.default;
	                this.track = _ServiceFactory2.default.get(_Consts.TRACKING_SERVICE);
	                this.config = _assign({}, config.properties);
	                this.behaviours = config.behaviours;
	                this.enginesIndex = {};
	                this.relevantEngines = [];
	                this.config.sengineTemp = false;

	                var _j = 0;
	                for (var _i = 0; _i < Object.keys(this.config.engines).length; _i++) {
	                    if (this.config.engines[_i].active || this.config.engines[_i].active == undefined) {
	                        this.relevantEngines[_j] = this.config.engines[_i];
	                        this.enginesIndex[this.config.engines[_i].id] = _j;
	                        _j++;
	                    }
	                }
	                this.config.engines = this.relevantEngines;

	                this.StorageService.set(_Consts.ENGINES_KEY, JSON.stringify(this.relevantEngines));

	                var selectedEngine = this.pref.get(_Consts.SELECTED_SEARCH_ENGINE_KEY);
	                try {
	                    selectedEngine = this.StorageService.get(_Consts.SELECTED_SEARCH_ENGINE_KEY);
	                } catch (e) {
	                    _LoggerService2.default.track('error', 'SearchService90: ' + e.message);
	                }

	                if (selectedEngine) {
	                    var engineExist = false;

	                    for (var _i2 = 0; !engineExist && _i2 < this.config.engines.length; _i2++) {
	                        if (this.config.engines[_i2].id === selectedEngine) {
	                            engineExist = true;
	                        }
	                    }

	                    if (!engineExist) {
	                        this.pref.set(_Consts.SELECTED_SEARCH_ENGINE_KEY, undefined);
	                        selectedEngine = undefined;
	                    }
	                }

	                this.setSelectedSearchCategory(this.config.selectedCategory);
	                this.setCurrentSearchEngine(selectedEngine ? selectedEngine : this.getSearchEngineSortedByMarket(this.config)[0].id, true);
	                _Actions.register.bind(this)(this.behaviours);
	            }

	            this.searchStrings = {};
	        }
	    }, {
	        key: 'setSearchString',
	        value: function setSearchString(id, string) {
	            this.searchStrings[id] = string;
	        }
	    }, {
	        key: 'getSelectedSearchCategory',
	        value: function getSelectedSearchCategory() {
	            return this.config.selectedCategory;
	        }
	    }, {
	        key: 'getCurrentEngine',
	        value: function getCurrentEngine() {
	            return this.config.engines[this.getCurrentSearchEngineIndex()];
	        }
	    }, {
	        key: 'getCurrentSearchEngineIndex',
	        value: function getCurrentSearchEngineIndex() {
	            return this.enginesIndex[this.getSelectedEngineId()];
	        }
	    }, {
	        key: 'getTempOrCurrentSearchEngineIndex',
	        value: function getTempOrCurrentSearchEngineIndex() {
	            var engine = this.pref.get(_Consts.TEMP_SEARCH_ENGINE_KEY) && this.pref.get(_Consts.TEMP_SEARCH_ENGINE_KEY) != '' ? this.pref.get(_Consts.TEMP_SEARCH_ENGINE_KEY) : this.pref.get(_Consts.SELECTED_SEARCH_ENGINE_KEY);
	            return this.enginesIndex[engine];
	        }
	    }, {
	        key: 'getEngineIdByIndex',
	        value: function getEngineIdByIndex(engineIndex) {
	            for (var key in this.enginesIndex) {
	                if (this.enginesIndex[key] == engineIndex) {
	                    return key;
	                }
	            }
	        }
	    }, {
	        key: 'getSuggestUrl',
	        value: function getSuggestUrl(engineId) {
	            var defaultEngine = this.getCurrentEngine();
	            var tempEngine = false;
	            if (engineId) {
	                tempEngine = this.getEngineById(engineId);
	            }
	            return tempEngine && tempEngine.suggestUrl ? tempEngine.suggestUrl : defaultEngine.suggestUrl ? defaultEngine.suggestUrl : '';
	        }
	    }, {
	        key: 'getSelectedEngineId',
	        value: function getSelectedEngineId() {
	            return this.pref.get(_Consts.SELECTED_SEARCH_ENGINE_KEY);
	        }
	    }, {
	        key: 'getTempEngineId',
	        value: function getTempEngineId() {
	            return this.config.sengineTemp ? this.config.sengineTemp : false;
	        }
	    }, {
	        key: 'setCurrentSearchEngineIndex',
	        value: function setCurrentSearchEngineIndex(engineIndex) {
	            this.setCurrentSearchEngine(this.config.engines[engineIndex].id);
	        }
	    }, {
	        key: 'getSearchEngineSortedByMarket',
	        value: function getSearchEngineSortedByMarket(config) {
	            var mntEngines = [];
	            var nonMntEngines = [];

	            // separate config.engines into two different array; 1. list of monetized engines 2. list of non-monetized engines
	            for (var i = 0; i < Object.keys(config.engines).length; i++) {
	                if (config.engines[i].monetized && this.isEngineMarket(config.engines[i])) {
	                    mntEngines.push(config.engines[i]);
	                } else {
	                    nonMntEngines.push(this.config.engines[i]);
	                }
	            }

	            // Sort the monetized engines by priority
	            mntEngines.sort(function (a, b) {
	                return a.priority >= b.priority ? 1 : b.priority > a.priority ? -1 : 0;
	            });

	            // Sort the non-monetized engines by priority
	            nonMntEngines.sort(function (a, b) {
	                return a.priority >= b.priority ? 1 : b.priority > a.priority ? -1 : 0;
	            });

	            // Combining both list into one
	            mntEngines = mntEngines.concat(nonMntEngines);

	            return mntEngines.length == 0 ? config.engines : mntEngines;
	        }
	    }, {
	        key: 'setCurrentSearchEngine',
	        value: function setCurrentSearchEngine(engineId, forceDS) {
	            // this.config.sengine = engineId;
	            // this.pref.set(SELECTED_SEARCH_ENGINE_KEY, engineId);
	            // this.pref.set(TEMP_SEARCH_ENGINE_KEY, "");
	            if (this.isEnginePersist(engineId) || forceDS) {
	                this.config.sengine = engineId;
	                this.config.sengineTemp = false;
	                this.pref.set(_Consts.SELECTED_SEARCH_ENGINE_KEY, engineId);
	                this.pref.set(_Consts.TEMP_SEARCH_ENGINE_KEY, "");
	            } else {
	                this.config.sengineTemp = engineId;
	                this.pref.set(_Consts.TEMP_SEARCH_ENGINE_KEY, engineId);
	            }
	        }
	    }, {
	        key: 'setSelectedSearchCategory',
	        value: function setSelectedSearchCategory(category) {
	            this.config.selectedCategory = category;
	            this.pref.set(_Consts.SELECTED_SEARCH_CATEGORY_KEY, category);
	        }
	    }, {
	        key: 'getEngines',
	        value: function getEngines() {
	            return this.config.engines;
	        }
	    }, {
	        key: 'getEngineById',
	        value: function getEngineById(engineId) {
	            var enginesArr = this.getEngines();
	            for (var i = 0; i < enginesArr.length; i++) {
	                if (enginesArr[i].id == engineId) return enginesArr[i];
	            }
	        }
	    }, {
	        key: 'doSearch',
	        value: function doSearch(searchString, asset) {
	            if (searchString == '' || searchString === null || searchString === undefined) {
	                return;
	            }

	            var searchUrl = void 0;

	            searchUrl = this.getSearchUrl(searchString, asset);
	            // old use of diff func for web and category
	            // if (this.getSelectedSearchCategory().toLowerCase() !== SEARCH_CAT_WEB) {
	            //     searchUrl = this.doCategorySearch(searchString,asset);
	            // } else {
	            //     searchUrl = this.doSearchWeb(searchString,asset);
	            // }
	            if (searchUrl) {
	                _EventsService2.default.trigger(_Consts.ON_SEARCH_EVENT);
	                _LoggerService2.default.debug('event: ' + _Consts.ON_SEARCH_EVENT);

	                try {
	                    if (asset != 'ds') {
	                        this.track.trackStatusEvent('search-nt', this.config.sengineTemp ? this.config.sengineTemp : null, null, function () {
	                            document.location.href = searchUrl;
	                        });
	                    } else {
	                        this.track.trackStatusEvent('search-ob', null, null, function () {
	                            document.location.href = searchUrl;
	                        });
	                    }
	                } catch (e) {
	                    this.track.trackStatusEvent('error', e.message, e.lineNumber + '@search-form');
	                }

	                setTimeout(function () {
	                    document.location.href = searchUrl;
	                }, 500);
	            }
	        }
	    }, {
	        key: 'getAvailableSearchSource',
	        value: function getAvailableSearchSource(engine, desiredSearchCategory) {
	            if (this.shouldMonetized(engine.monetized) && engine[desiredSearchCategory]) return desiredSearchCategory;else if (engine['nm_' + desiredSearchCategory]) return 'nm_' + desiredSearchCategory;else if (engine[desiredSearchCategory]) return desiredSearchCategory;else if (this.shouldMonetized(engine.monetized) && engine['searchUrl']) return 'searchUrl';else if (engine['nm_searchUrl']) return 'nm_searchUrl';else return 'searchUrl';
	        }
	    }, {
	        key: 'getSearchUrl',
	        value: function getSearchUrl(searchString, assetFrom) {
	            var query = searchString;
	            var locale = _BrowserService2.default.locale();
	            var engine = this.getTempEngineId() ? this.getEngineById(this.getTempEngineId()) : this.getCurrentEngine();
	            var searchUrl = void 0;
	            var category = this.config.selectedCategory;
	            locale = locale.replace('_', '-');
	            var asset = assetFrom == 'nt' ? 'nt' : 'ds';

	            if (query.trim().length > 0 || engine.searchForm == null) {
	                query = encodeURIComponent(query);
	                var sUrl = engine.searchUrl;
	                try {
	                    var urlSource = category == 'web' ? 'searchUrl' : category;
	                    urlSource = this.getAvailableSearchSource(engine, urlSource);
	                    sUrl = engine[urlSource];
	                    var ycc = this.getEngineSubDomain() ? this.getEngineSubDomain() : '';
	                    // CC remover by configuration
	                    if (engine && engine.removeCCByCategories && _typeof(engine.removeCCByCategories) === 'object') {
	                        if (engine.removeCCByCategories.hasOwnProperty(category)) {
	                            for (var i = 0; i < engine.removeCCByCategories[category].length; i++) {
	                                if (engine.removeCCByCategories[category][i].toLowerCase() == this.getEngineSubDomain().toLowerCase()) {
	                                    ycc = '';
	                                }
	                            }
	                        }
	                    } else {
	                        //fallback for backward compatibility - yahoo does not have subdomain .us for images and videos
	                        ycc = engine.id == 'yahoo' && (category == 'images' || category == 'videos') && ycc.toLowerCase() == 'us.' ? '' : ycc;
	                    }

	                    //Support old config, when monetized yahoo didnt have ycc //TODO: Remove when possible
	                    sUrl = engine.id === 'yahoo' && urlSource === 'searchUrl' && sUrl.indexOf('{{ycc}}') === -1 ? 'https://' + ycc + '.search.yahoo.com/yhs/search?hspart=itm&hsimp=yhs-001&type=' + this.pref.get('aflt') + '&p={searchTerms}' : sUrl;

	                    if (engine.yccWithDotsAround) {
	                        sUrl = sUrl.replace('{{ycc}}', ycc || '');
	                    } else {
	                        sUrl = sUrl.replace('{{ycc}}', ycc + '.' || '');
	                    }

	                    sUrl = sUrl.replace('{{ycc}}', ycc || '').replace(/\{\{aflt\}\}/g, this.pref.get('aflt') || '').replace('{{b_aflt}}', this.pref.get(_Consts.B_AFLT_KEY) || '').replace('{{hspart}}', this.pref.get('hspart') || '').replace('{{hsimp}}', this.pref.get('hsimp') || '').replace('{{FORM}}', asset == 'nt' ? 'INCOH1' : 'INCOH2').replace('{{PC}}', this.pref.get('b_pc') || 'IC03');
	                    // if ph does not exist, adds searchString at the end, else it will be replace at the sprintf
	                    sUrl = sUrl.indexOf('{searchTerms}') === -1 ? sUrl + searchString : sUrl;
	                    // in case of monetized yahoo, add url params
	                    sUrl = engine.id === 'yahoo' && this.shouldMonetized(engine.monetized) && urlSource.indexOf('nm_') === -1 ? sUrl + this.yahooParam2Beacon(asset) : sUrl;
	                } catch (e) {
	                    this.track.trackStatusEvent('error', e.message, new Error().lineNumber + '@search-form');
	                }

	                if (this.config.ISSearchEngines && this.config.ISSearchEngines.indexOf(engine.id) > -1) {
	                    var lsWhiteList = { 'cd': 'cd', 'cr': 'cr', 'uref': 'uref', 'aflt': 'aflt' };
	                    for (var key in lsWhiteList) {
	                        sUrl = sUrl.replace('{{' + key + '}}', this.pref.get(key));
	                    }
	                }

	                searchUrl = (0, _Utils.sprintf)(sUrl, { searchTerms: query, lang: locale });
	            } else {
	                searchUrl = engine.searchForm;
	            }

	            if (asset == 'nt') {
	                this.pref.count('c.snt'); // count search query from new tab
	                this.pref.markTime('act.snt'); // mark search query activity time
	            }
	            this.track.markActive(); // mark general user activity

	            return searchUrl;
	        }
	    }, {
	        key: 'doSearchWeb',
	        value: function doSearchWeb(searchString, asset) {
	            var query = searchString;
	            var locale = _BrowserService2.default.locale();
	            var engine = this.getTempEngineId() ? this.getEngineById(this.getTempEngineId()) : this.getCurrentEngine();
	            var searchUrl = void 0;
	            locale = locale.replace('_', '-');

	            if (query.trim().length > 0 || engine.searchForm == null) {
	                query = encodeURIComponent(query);
	                var sUrl = engine.searchUrl;

	                try {
	                    var se = engine.id;
	                    var urlSource = 'searchUrl';
	                    // if search engine is yahoo and monetization is on (mnz.ccyho != null) and we have monetization date (mnz.mmdd) and install time exists
	                    if (se == 'yahoo') {
	                        if (!this.shouldMonetized(engine.monetized)) {
	                            sUrl = engine['nm_searchUrl'];
	                        } else {
	                            var ycc = this.getEngineSubDomain();
	                            if (ycc == null) {
	                                sUrl = 'https://search.yahoo.com/yhs/search?hspart=itm&hsimp=yhs-001&type=' + this.pref.get('aflt') + '&p={searchTerms}' + this.yahooParam2Beacon(asset);
	                            } else {
	                                sUrl = 'https://' + ycc + '.search.yahoo.com/yhs/search?hspart=itm&hsimp=yhs-001&type=' + this.pref.get('aflt') + '&p={searchTerms}' + this.yahooParam2Beacon(asset);
	                            }
	                        }
	                    } else if (se == 'bing') {
	                        if (this.shouldMonetized(engine.monetized)) {
	                            sUrl = sUrl.replace('{{aflt}}', this.pref.get(_Consts.B_AFLT_KEY));
	                        } else {
	                            sUrl = engine['nm_searchUrl'];
	                        }
	                    } else if (this.config.ISSearchEngines.indexOf(se) > -1) {
	                        var lsWhiteList = { 'cd': 'cd', 'cr': 'cr', 'uref': 'uref', 'aflt': 'aflt' };
	                        for (var key in lsWhiteList) {
	                            sUrl = sUrl.replace('{{' + key + '}}', this.pref.get(key));
	                        }
	                    }
	                } catch (e) {
	                    this.track.trackStatusEvent('error', e.message, new Error().lineNumber + '@search-form');
	                }

	                searchUrl = (0, _Utils.sprintf)(sUrl, { searchTerms: query, lang: locale });
	            } else {
	                searchUrl = engine.searchForm;
	            }

	            this.pref.count('c.snt'); // count search query from new tab
	            this.pref.markTime('act.snt'); // mark search query activity time
	            this.track.markActive(); // mark general user activity

	            return searchUrl;
	        }
	    }, {
	        key: 'doCategorySearch',
	        value: function doCategorySearch(searchString, asset) {
	            var engine = this.getTempEngineId() ? this.getEngineById(this.getTempEngineId()) : this.getCurrentEngine();
	            var searchEngine = this.getSelectedEngineId();

	            var sUrl = engine[this.getSelectedSearchCategory()] + searchString;

	            if (searchEngine == 'yahoo') {
	                if (!this.shouldMonetized(engine.monetized)) {
	                    sUrl = engine['nm_' + this.config.selectedCategory] + searchString;
	                } else {
	                    var yahooSubDomain = this.getEngineSubDomain();
	                    if (yahooSubDomain && yahooSubDomain != 'us') {
	                        yahooSubDomain += '.';
	                    } else {
	                        yahooSubDomain = '';
	                    }

	                    sUrl = sUrl.replace('{{ycc}}', yahooSubDomain);
	                    sUrl = sUrl.replace('{{aflt}}', this.pref.get('aflt')) + this.yahooParam2Beacon(asset);
	                }
	            } else if (searchEngine == 'bing') {
	                if (!this.shouldMonetized(engine.monetized)) {
	                    sUrl = engine['nm_' + this.config.selectedCategory] + searchString;
	                } else {
	                    sUrl = sUrl.replace('{{aflt}}', this.pref.get(_Consts.B_AFLT_KEY));
	                }
	            } else if (this.config.ISSearchEngines.indexOf(searchEngine) > -1) {
	                var lsWhiteList = { 'cd': 'cd', 'cr': 'cr', 'uref': 'uref', 'aflt': 'aflt' };

	                for (var key in lsWhiteList) {
	                    sUrl = sUrl.replace('{{' + key + '}}', this.pref.get(key));
	                }
	            }

	            return sUrl;
	        }
	    }, {
	        key: 'isEngineMarket',
	        value: function isEngineMarket(configEngine) {
	            var cc = this.pref.get('cc').toLowerCase();
	            var engine = configEngine === undefined ? this.getCurrentEngine() : configEngine;
	            if (!engine.countries) return true;

	            return engine.countries && engine.countries.indexOf(cc) >= 0;
	        }
	    }, {
	        key: 'shouldMonetized',
	        value: function shouldMonetized(monetized) {
	            return monetized && this.isEngineMarket();
	        }
	    }, {
	        key: 'getEngineSubDomain',
	        value: function getEngineSubDomain() {

	            if (!this.isEngineMarket()) {
	                return;
	            }
	            try {
	                var cc = this.pref.get('cc').toLowerCase();
	                var engine = this.getCurrentEngine();

	                if (!engine.subDomain) {
	                    return;
	                }

	                return engine.subDomain[cc] ? engine.subDomain[cc][_BrowserService2.default.language()] ? engine.subDomain[cc][_BrowserService2.default.language()] : engine.subDomain[cc]['def'] : 'us';
	            } catch (e) {
	                _LoggerService2.default.track('error', 'getEngineSubDomain: ' + e.message);
	            }
	        }
	    }, {
	        key: 'trackNMsearches',
	        value: function trackNMsearches(asset, sTerm) {
	            asset = asset == 'nt' ? 'nt' : 'ds';
	            sTerm = sTerm.substring(0, 79);
	            this.track.trackStatusEvent('search-nm', asset, sTerm);
	        }
	    }, {
	        key: 'yahooParam2Beacon',
	        value: function yahooParam2Beacon(f) {
	            f = f == 'nt' ? 2 : 4;
	            var cat = this.config.selectedCategory || _Consts.SEARCH_CAT_WEB;
	            var data = void 0;

	            if (this.pref.get('param2') && this.pref.get('param2') != '') {
	                var param2 = decodeURIComponent(this.pref.get('param2'));
	                if (param2.charAt(0) != '&') {
	                    param2 = '&' + param2;
	                }
	                if (param2.indexOf('&f=-1') >= 0) {
	                    param2 = param2.replace('&f=-1', '');
	                }
	                param2 += '&rb=' + _BrowserService2.default.getBrowserFlavor('beacon');
	                data = 'f={{f}}&ip={{ip}}&cat={{cat}}&xlp_pers_guid={{xlp_pers_guid}}&xlp_sess_guid={{xlp_sess_guid}}' + '&uref={{uref}}&abid={{abid}}&xt_abg={{xt_abg}}' + param2;
	            } else {
	                data = 'f={{f}}&b={{b}}&ip={{ip}}&pa={{pa}}&type={{aflt}}&cat={{cat}}&a={{aflt}}&xlp_pers_guid=' + '{{xlp_pers_guid}}&xlp_sess_guid={{xlp_sess_guid}}&uref={{uref}}&abid={{abid}}&xt_abg={{xt_abg}}';
	            }

	            try {
	                data = data.replace(/\{\{aflt\}\}/g, this.pref.get('aflt') || '').replace('{{cat}}', cat).replace('{{f}}', f).replace('{{pa}}', this.pref.get('pa') || 'search-manager').replace('{{os}}', _BrowserService2.default.platform()).replace('{{xlp_sess_guid}}', this.pref.get('guid') || '').replace('{{xlp_pers_guid}}', this.pref.get('xlp_pers_guid') || '').replace('{{uref}}', this.pref.get('uref') || '').replace('{{b}}', _BrowserService2.default.getBrowserFlavor('beacon')).replace('{{abid}}', this.pref.get('abid') && this.pref.get('abid') != '{{ABTESTID}}' ? this.pref.get('abid') : '').replace('{{xt_abg}}', this.pref.get('xt_abg') && this.pref.get('xt_abg') != '{{GROUPID}}' ? this.pref.get('xt_abg') : '');

	                data += '&' + 'xt_ver=' + this.chrome.version();
	            } catch (e) {
	                _LoggerService2.default.track('error', 'yahooParam2Beacon91: ' + e.message);
	            }

	            try {
	                var geodata = this.pref.get(_Consts.GEO_DATA_KEY);
	                data = data.replace('{{ip}}', geodata.ip);
	            } catch (e) {
	                _LoggerService2.default.track('error', 'yahooParam2Beacon92: ' + e.message);
	            }

	            return '&param1=1&param2=' + encodeURIComponent(data);
	        }
	    }, {
	        key: 'isEnginePersist',
	        value: function isEnginePersist(engineId) {
	            var engine = this.getEngineById(engineId);
	            if (engine.persistent == false) {
	                return false;
	            }
	            return true;
	        }
	    }]);

	    return SearchService;
	}();

	exports.default = SearchService;


	_ComponentsFactory2.default.add(function () {
	    return SearchService;
	}, 'SearchService');

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ExtensionService = undefined;

	var _assign = __webpack_require__(8);

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	var _EventsService = __webpack_require__(10);

	var _EventsService2 = _interopRequireDefault(_EventsService);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _Actions = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ExtensionService = exports.ExtensionService = function ExtensionService(config) {
	    _classCallCheck(this, ExtensionService);

	    this.config = _assign(config);

	    (0, _Actions.register)(this.config.behaviours);
	};

	_ComponentsFactory2.default.add(function () {
	    return ExtensionService;
	}, 'ExtensionService');

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ComponentsFactory = __webpack_require__(6);

	var _ComponentsFactory2 = _interopRequireDefault(_ComponentsFactory);

	var _ServiceFactory = __webpack_require__(4);

	var _ServiceFactory2 = _interopRequireDefault(_ServiceFactory);

	var _Actions = __webpack_require__(20);

	var _ChromeService = __webpack_require__(12);

	var _ChromeService2 = _interopRequireDefault(_ChromeService);

	var _AdService = __webpack_require__(28);

	var _AdService2 = _interopRequireDefault(_AdService);

	var _Consts = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationService = function () {
	    function NotificationService(config) {
	        _classCallCheck(this, NotificationService);

	        this.chrome = _ChromeService2.default;
	        this.ad = _AdService2.default;
	        this.track = _ServiceFactory2.default.get(_Consts.TRACKING_SERVICE);
	        this.behaviours = config.behaviours;
	        this.properties = config.properties;
	        _Actions.register.bind(this)(this.behaviours);
	    }

	    _createClass(NotificationService, [{
	        key: 'idleTime',
	        value: function idleTime() {
	            return this.properties.idle.time;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            var _this = this;

	            var options = {};
	            var id = void 0;
	            var notificationOptions = this.properties.options;

	            for (var key in notificationOptions) {
	                if (notificationOptions[key] == '') continue;

	                if (key == "id") {
	                    id = this.properties["id"];
	                    continue;
	                }

	                options[key] = notificationOptions[key];
	            }

	            if (this.properties.adService.active == true) {
	                var adService = this.properties.adService;

	                var data = {
	                    key: adService.key,
	                    url: adService.url
	                };

	                var params = {
	                    clientIp: '112.12.23.33',
	                    requestUrl: chrome.extension.getURL(""),
	                    format: 'json'
	                };

	                this.ad.setData(data).get(params, function (result) {
	                    options["imageUrl"] = result["creative"];
	                    _this.chrome.showNotification(id, options, function () {
	                        _this.track.trackStatusEvent(_Consts.NOTIFICATION_POP);
	                        if (_this.ad.fireBeacon()) {
	                            _this.track.trackStatusEvent(_Consts.BEACON_FIRED);
	                        }
	                    });
	                });
	                return;
	            }

	            this.chrome.showNotification(id, options, function () {
	                _this.track.trackStatusEvent(_Consts.NOTIFICATION_POP);
	            });
	        }
	    }]);

	    return NotificationService;
	}();

	exports.default = NotificationService;


	_ComponentsFactory2.default.add(function () {
	    return NotificationService;
	}, 'NotificationService');

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AdService = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _HttpService = __webpack_require__(14);

	var _HttpService2 = _interopRequireDefault(_HttpService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AdService = exports.AdService = function () {
	    function AdService() {
	        _classCallCheck(this, AdService);

	        this.http = _HttpService2.default;
	        this.beaconUrl = '';
	    }

	    _createClass(AdService, [{
	        key: "setData",
	        value: function setData(data) {
	            this.key = data["key"];
	            this.url = data["url"];

	            return this;
	        }
	    }, {
	        key: "get",
	        value: function get(data, cb) {
	            var _this = this;

	            data['key'] = this.key;

	            this.http.doPostJSON(this.url, data, function (result) {
	                if (result["success"] == true) {
	                    _this.beaconUrl = result['beacon'];
	                    cb(result);
	                }
	            }, null, null, ['Content-Type', 'application/x-www-form-urlencoded']);
	        }
	    }, {
	        key: "fireBeacon",
	        value: function fireBeacon() {
	            if (this.beaconUrl != '') {
	                var img = document.createElement('img');
	                img.src = this.beaconUrl;
	                return true;
	            }
	        }
	    }]);

	    return AdService;
	}();

	var service = new AdService();

	exports.default = service;

/***/ })
/******/ ]);