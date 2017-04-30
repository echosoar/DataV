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

	var mockData = {
	  index: 'noDataVBaseHorizontalNavigationData',
	  data: [{
	    text: 'No Nav Data',
	    value: 'noDataVBaseHorizontalNavigationData'
	  }, {
	    text: '没有导航数据',
	    value: 'noDataVBaseHorizontalNavigationDataCn'
	  }]
	};

	var DataVBaseHorizontalNavigation = function (_React$Component) {
	  _inherits(DataVBaseHorizontalNavigation, _React$Component);

	  function DataVBaseHorizontalNavigation(props) {
	    _classCallCheck(this, DataVBaseHorizontalNavigation);

	    return _possibleConstructorReturn(this, _React$Component.call(this, props));
	  }

	  DataVBaseHorizontalNavigation.prototype.checkIndex = function checkIndex(itemData, siteDisplay) {
	    var index = itemData.index;
	    var isHaveIndex = false;
	    itemData.data && itemData.data.map(function (item) {
	      if (!item.type || item.type == 'display') {
	        if (siteDisplay[item.value] != false && !isHaveIndex) {
	          index = item.value;
	          isHaveIndex = true;
	        }
	      }
	    });
	    return index;
	  };

	  DataVBaseHorizontalNavigation.prototype.handleClick = function handleClick(item) {
	    console.log(item);
	  };

	  DataVBaseHorizontalNavigation.prototype.render = function render() {
	    var _this2 = this;

	    var _props = this.props,
	        width = _props.width,
	        height = _props.height,
	        background = _props.background,
	        textColor = _props.textColor,
	        itemBackground = _props.itemBackground,
	        itemTextColor = _props.itemTextColor,
	        data = _props.data,
	        siteDisplay = _props.siteDisplay,
	        itemData = mockData,
	        isHaveIndex = false;


	    try {
	      itemData = JSON.parse(data);
	    } catch (e) {}

	    var indexValue = this.checkIndex(itemData, siteDisplay);

	    return React.createElement(
	      'div',
	      {
	        style: {
	          width: width.value,
	          height: height.value,
	          background: background.value,
	          color: textColor.value
	        }
	      },
	      itemData.data && itemData.data.map(function (item) {
	        var nowItemIsIndex = false;
	        if (indexValue == item.value && !isHaveIndex) {
	          nowItemIsIndex = true;
	          isHaveIndex = true;
	        }
	        return React.createElement(
	          'div',
	          {
	            style: {
	              'display': 'inline-block',
	              'height': height.value,
	              'color': nowItemIsIndex ? itemTextColor.value : textColor.value,
	              'background': nowItemIsIndex ? itemBackground.value : 'transparent',
	              'cursor': nowItemIsIndex ? 'default' : 'pointer',
	              'padding': '0 10px',
	              'line-height': height.value
	            },
	            onClick: nowItemIsIndex ? function () {} : _this2.handleClick.bind(_this2, item)
	          },
	          item.text
	        );
	      })
	    );
	  };

	  return DataVBaseHorizontalNavigation;
	}(React.Component);

	if (!window.datavModule) window.datavModule = {};
	window.datavModule.datavBaseModuleDataVBaseHorizontalNavigation4b3e68e53841939db2ccb37fe611a70b = DataVBaseHorizontalNavigation;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);