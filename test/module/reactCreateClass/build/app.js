/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

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


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	'use script';

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DataVBaseModuleImage = function (_React$Component) {
	  _inherits(DataVBaseModuleImage, _React$Component);

	  function DataVBaseModuleImage(props) {
	    _classCallCheck(this, DataVBaseModuleImage);

	    return _possibleConstructorReturn(this, _React$Component.call(this, props));
	  }

	  DataVBaseModuleImage.prototype.handleClick = function handleClick() {
	    alert("click");
	  };

	  DataVBaseModuleImage.prototype.renderImage = function renderImage(width, height, src) {
	    if (width.value == 'auto' || height.value == 'auto') {
	      return React.createElement('img', { src: src.value, width: width.value, height: height.value });
	    } else {
	      return React.createElement('div', { style: {
	          width: width.value,
	          height: height.value,
	          background: 'url("' + src.value + '") center center / contain no-repeat'
	        } });
	    }
	  };

	  DataVBaseModuleImage.prototype.render = function render() {
	    var _props = this.props,
	        width = _props.width,
	        height = _props.height,
	        href = _props.href,
	        src = _props.src,
	        target = _props.target;

	    if (!src.value) {
	      return React.createElement(
	        'div',
	        { style: {
	            padding: '10px 0',
	            height: '60px',
	            'line-height': '20px',
	            'text-align': 'center'

	          } },
	        'DataV \u57FA\u672C\u56FE\u7247\u7EC4\u4EF6',
	        React.createElement('br', null),
	        '\u8BF7\u70B9\u51FB\u53F3\u4E0A\u89D2\u6309\u94AE\u914D\u7F6E\u56FE\u7247\u5C5E\u6027'
	      );
	    }
	    if (href.value) {
	      return React.createElement(
	        'a',
	        { href: href.value, target: target.value },
	        this.renderImage.call(this, width, height, src)
	      );
	    }
	    return this.renderImage.call(this, width, height, src);
	  };

	  return DataVBaseModuleImage;
	}(React.Component);

	if (!window.datavModule) window.datavModule = {};
	window.datavModule.datavBaseModuleImage278920E14B69B02754BB95EA8B4293D6 = DataVBaseModuleImage;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);