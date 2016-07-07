(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app_action = require('./app_action.jsx');

var _app_action2 = _interopRequireDefault(_app_action);

var _app_store = require('./app_store.jsx');

var _app_store2 = _interopRequireDefault(_app_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

		_this.state = {
			welcome: '',
			features: []
		};
		return _this;
	}

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			_app_action2.default.welcome();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_app_store2.default.listen(this.onAppStoreChange.bind(this));
		}
	}, {
		key: 'onAppStoreChange',
		value: function onAppStoreChange(event, data) {
			console.log("processing AppStore event: " + event);
			switch (event) {
				case "welcome":
					this.setState({
						welcome: data.welcome,
						features: data.features
					});
			}
		}
	}, {
		key: 'renderContents',
		value: function renderContents() {
			var _state = this.state;
			var welcome = _state.welcome;
			var features = _state.features;


			var featuresDOM = features !== undefined ? features.map(function (f) {
				return _react2.default.createElement(
					'li',
					{ key: f.key },
					_react2.default.createElement(
						'a',
						{ href: f.url, target: '_blank' },
						f.label
					)
				);
			}) : _react2.default.createElement('li', null);

			return _react2.default.createElement(
				'div',
				{ className: 'ui center aligned segment' },
				_react2.default.createElement(
					'h1',
					null,
					welcome
				),
				_react2.default.createElement(
					'h3',
					null,
					'Features'
				),
				_react2.default.createElement(
					'div',
					{ className: 'ui left aligned segment' },
					_react2.default.createElement(
						'ul',
						null,
						featuresDOM
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				this.renderContents()
			);
		}
	}]);

	return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('contents'));

},{"./app_action.jsx":2,"./app_store.jsx":3,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppActions = _reflux2.default.createActions(['welcome']);

exports.default = AppActions;

},{"reflux":"reflux"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _app_action = require('./app_action.jsx');

var _app_action2 = _interopRequireDefault(_app_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppStore = _reflux2.default.createStore({
	init: function init() {
		console.log("initializing AppStore...");
		this.listenToMany(_app_action2.default);

		this.welcome = "Welcome To ReactStarter";
		this.features = [{ key: "react", label: "ReactJS", url: "https://facebook.github.io/react/" }, { key: "reflux", label: "RefluxJS", url: "https://github.com/reflux/refluxjs" }, { key: "jquery", label: "jQuery ($)", url: "https://jquery.com/" }, { key: "lodash", label: "loadsh (_)", url: "https://lodash.com/" }, { key: "babel", label: "babelify", url: "https://babeljs.io/" }, { key: "browserify", label: "browserify", url: "http://browserify.org/" }, { key: "gulp", label: "gulp", url: "http://gulpjs.com/" }, { key: "semantic", label: "semantic-ui", url: "http://semantic-ui.com/" }];
	},
	onWelcome: function onWelcome() {
		console.log("processing welcome...");
		this.trigger("welcome", {
			welcome: this.welcome,
			features: this.features
		});
	}
});

exports.default = AppStore;

},{"./app_action.jsx":2,"react":"react","reflux":"reflux"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzeCIsImFwcC9hcHBfYWN0aW9uLmpzeCIsImFwcC9hcHBfc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxHOzs7QUFDTCxnQkFBYztBQUFBOztBQUFBOztBQUViLFFBQUssS0FBTCxHQUFhO0FBQ1osWUFBUyxFQURHO0FBRVosYUFBVTtBQUZFLEdBQWI7QUFGYTtBQU1iOzs7O3VDQUVvQjtBQUNwQix3QkFBVyxPQUFYO0FBQ0E7OztzQ0FFbUI7QUFDbkIsdUJBQVMsTUFBVCxDQUFnQixLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWhCO0FBQ0E7OzttQ0FFZ0IsSyxFQUFPLEksRUFBTTtBQUM3QixXQUFRLEdBQVIsQ0FBWSxnQ0FBZ0MsS0FBNUM7QUFDQSxXQUFPLEtBQVA7QUFDQyxTQUFLLFNBQUw7QUFDQyxVQUFLLFFBQUwsQ0FBYztBQUNiLGVBQVMsS0FBSyxPQUREO0FBRWIsZ0JBQVUsS0FBSztBQUZGLE1BQWQ7QUFGRjtBQU9BOzs7bUNBRWdCO0FBQUEsZ0JBQ1UsS0FBSyxLQURmO0FBQUEsT0FDWCxPQURXLFVBQ1gsT0FEVztBQUFBLE9BQ0YsUUFERSxVQUNGLFFBREU7OztBQUdoQixPQUFJLGNBQWMsYUFBYSxTQUFiLEdBQXlCLFNBQVMsR0FBVCxDQUFhLGFBQUs7QUFDNUQsV0FBTztBQUFBO0FBQUEsT0FBSSxLQUFLLEVBQUUsR0FBWDtBQUFnQjtBQUFBO0FBQUEsUUFBRyxNQUFNLEVBQUUsR0FBWCxFQUFnQixRQUFPLFFBQXZCO0FBQWlDLFFBQUU7QUFBbkM7QUFBaEIsS0FBUDtBQUNBLElBRjBDLENBQXpCLEdBRWIseUNBRkw7O0FBSUEsVUFBTztBQUFBO0FBQUEsTUFBSyxXQUFVLDJCQUFmO0FBQ047QUFBQTtBQUFBO0FBQUs7QUFBTCxLQURNO0FBRU47QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZNO0FBR047QUFBQTtBQUFBLE9BQUssV0FBVSx5QkFBZjtBQUNDO0FBQUE7QUFBQTtBQUNFO0FBREY7QUFERDtBQUhNLElBQVA7QUFTQTs7OzJCQUVRO0FBQ1IsVUFBTztBQUFBO0FBQUE7QUFBTSxTQUFLLGNBQUw7QUFBTixJQUFQO0FBQ0E7Ozs7RUFoRGdCLGdCQUFNLFM7O0FBbUR4QixtQkFBUyxNQUFULENBQWdCLDhCQUFDLEdBQUQsT0FBaEIsRUFBd0IsU0FBUyxjQUFULENBQXdCLFVBQXhCLENBQXhCOzs7Ozs7Ozs7QUN6REE7Ozs7OztBQUVBLElBQU0sYUFBYSxpQkFBTyxhQUFQLENBQXFCLENBQ3RDLFNBRHNDLENBQXJCLENBQW5COztrQkFJZSxVOzs7Ozs7Ozs7QUNOZjs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUVBLElBQUksV0FBVyxpQkFBTyxXQUFQLENBQW1CO0FBQ2pDLEtBRGlDLGtCQUMxQjtBQUNOLFVBQVEsR0FBUixDQUFZLDBCQUFaO0FBQ0EsT0FBSyxZQUFMOztBQUVBLE9BQUssT0FBTCxHQUFlLHlCQUFmO0FBQ0EsT0FBSyxRQUFMLEdBQWdCLENBQ2YsRUFBRSxLQUFLLE9BQVAsRUFBZ0IsT0FBTyxTQUF2QixFQUFrQyxLQUFLLG1DQUF2QyxFQURlLEVBRWYsRUFBRSxLQUFLLFFBQVAsRUFBaUIsT0FBTyxVQUF4QixFQUFvQyxLQUFLLG9DQUF6QyxFQUZlLEVBR2YsRUFBRSxLQUFLLFFBQVAsRUFBaUIsT0FBTyxZQUF4QixFQUFzQyxLQUFLLHFCQUEzQyxFQUhlLEVBSWYsRUFBRSxLQUFLLFFBQVAsRUFBaUIsT0FBTyxZQUF4QixFQUFzQyxLQUFLLHFCQUEzQyxFQUplLEVBS2YsRUFBRSxLQUFLLE9BQVAsRUFBZ0IsT0FBTyxVQUF2QixFQUFtQyxLQUFLLHFCQUF4QyxFQUxlLEVBTWYsRUFBRSxLQUFLLFlBQVAsRUFBcUIsT0FBTyxZQUE1QixFQUEwQyxLQUFLLHdCQUEvQyxFQU5lLEVBT2YsRUFBRSxLQUFLLE1BQVAsRUFBZSxPQUFPLE1BQXRCLEVBQThCLEtBQUssb0JBQW5DLEVBUGUsRUFRZixFQUFFLEtBQUssVUFBUCxFQUFtQixPQUFPLGFBQTFCLEVBQXlDLEtBQUsseUJBQTlDLEVBUmUsQ0FBaEI7QUFVQSxFQWhCZ0M7QUFrQmpDLFVBbEJpQyx1QkFrQnJCO0FBQ1gsVUFBUSxHQUFSLENBQVksdUJBQVo7QUFDQSxPQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCO0FBQ2xCLFlBQVMsS0FBSyxPQURJO0FBRWxCLGFBQVUsS0FBSztBQUZHLEdBQXhCO0FBSUE7QUF4QmdDLENBQW5CLENBQWY7O2tCQTJCZSxRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7IFxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJy4vYXBwX2FjdGlvbi5qc3gnOyBcbmltcG9ydCBBcHBTdG9yZSBmcm9tICcuL2FwcF9zdG9yZS5qc3gnOyBcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHsgXG5cdGNvbnN0cnVjdG9yKCkgeyBcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR3ZWxjb21lOiAnJywgXG5cdFx0XHRmZWF0dXJlczogW10gIFxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHsgXG5cdFx0QXBwQWN0aW9ucy53ZWxjb21lKCk7IFxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7IFxuXHRcdEFwcFN0b3JlLmxpc3Rlbih0aGlzLm9uQXBwU3RvcmVDaGFuZ2UuYmluZCh0aGlzKSk7IFxuXHR9XG5cblx0b25BcHBTdG9yZUNoYW5nZShldmVudCwgZGF0YSkgeyBcblx0XHRjb25zb2xlLmxvZyhcInByb2Nlc3NpbmcgQXBwU3RvcmUgZXZlbnQ6IFwiICsgZXZlbnQpOyBcblx0XHRzd2l0Y2goZXZlbnQpIHsgXG5cdFx0XHRjYXNlIFwid2VsY29tZVwiOiBcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0d2VsY29tZTogZGF0YS53ZWxjb21lLCBcblx0XHRcdFx0XHRmZWF0dXJlczogZGF0YS5mZWF0dXJlcyBcblx0XHRcdFx0fSk7IFxuXHRcdH1cblx0fVxuXG5cdHJlbmRlckNvbnRlbnRzKCkgeyBcblx0XHRsZXQge3dlbGNvbWUsIGZlYXR1cmVzfSA9IHRoaXMuc3RhdGU7IFxuXG5cdFx0bGV0IGZlYXR1cmVzRE9NID0gZmVhdHVyZXMgIT09IHVuZGVmaW5lZCA/IGZlYXR1cmVzLm1hcChmID0+IHtcblx0XHRcdHJldHVybiA8bGkga2V5PXtmLmtleX0+PGEgaHJlZj17Zi51cmx9IHRhcmdldD0nX2JsYW5rJz57Zi5sYWJlbH08L2E+PC9saT4gIFxuXHRcdH0pIDogPGxpPjwvbGk+O1xuXG5cdFx0cmV0dXJuIDxkaXYgY2xhc3NOYW1lPSd1aSBjZW50ZXIgYWxpZ25lZCBzZWdtZW50Jz5cblx0XHRcdDxoMT57d2VsY29tZX08L2gxPlxuXHRcdFx0PGgzPkZlYXR1cmVzPC9oMz5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPSd1aSBsZWZ0IGFsaWduZWQgc2VnbWVudCc+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHR7ZmVhdHVyZXNET019XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj47IFxuXHR9XG5cblx0cmVuZGVyKCkgeyBcblx0XHRyZXR1cm4gPGRpdj57dGhpcy5yZW5kZXJDb250ZW50cygpfTwvZGl2PjsgXG5cdH1cbn1cblxuUmVhY3RET00ucmVuZGVyKDxBcHAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnRzJykpOyIsImltcG9ydCBSZWZsdXggZnJvbSAncmVmbHV4JztcblxuY29uc3QgQXBwQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3dlbGNvbWUnXG5dKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwQWN0aW9uczsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnOyBcbmltcG9ydCBSZWZsdXggZnJvbSAncmVmbHV4JzsgXG5cbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJy4vYXBwX2FjdGlvbi5qc3gnOyBcblxubGV0IEFwcFN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcblx0aW5pdCgpIHsgXG5cdFx0Y29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgQXBwU3RvcmUuLi5cIik7IFxuXHRcdHRoaXMubGlzdGVuVG9NYW55KEFwcEFjdGlvbnMpOyBcblxuXHRcdHRoaXMud2VsY29tZSA9IFwiV2VsY29tZSBUbyBSZWFjdFN0YXJ0ZXJcIjsgXG5cdFx0dGhpcy5mZWF0dXJlcyA9IFsgXG5cdFx0XHR7IGtleTogXCJyZWFjdFwiLCBsYWJlbDogXCJSZWFjdEpTXCIsIHVybDogXCJodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9cIiB9LCBcblx0XHRcdHsga2V5OiBcInJlZmx1eFwiLCBsYWJlbDogXCJSZWZsdXhKU1wiLCB1cmw6IFwiaHR0cHM6Ly9naXRodWIuY29tL3JlZmx1eC9yZWZsdXhqc1wiIH0sIFxuXHRcdFx0eyBrZXk6IFwianF1ZXJ5XCIsIGxhYmVsOiBcImpRdWVyeSAoJClcIiwgdXJsOiBcImh0dHBzOi8vanF1ZXJ5LmNvbS9cIiB9LCBcblx0XHRcdHsga2V5OiBcImxvZGFzaFwiLCBsYWJlbDogXCJsb2Fkc2ggKF8pXCIsIHVybDogXCJodHRwczovL2xvZGFzaC5jb20vXCIgfSwgXG5cdFx0XHR7IGtleTogXCJiYWJlbFwiLCBsYWJlbDogXCJiYWJlbGlmeVwiLCB1cmw6IFwiaHR0cHM6Ly9iYWJlbGpzLmlvL1wiIH0sIFxuXHRcdFx0eyBrZXk6IFwiYnJvd3NlcmlmeVwiLCBsYWJlbDogXCJicm93c2VyaWZ5XCIsIHVybDogXCJodHRwOi8vYnJvd3NlcmlmeS5vcmcvXCIgfSwgXG5cdFx0XHR7IGtleTogXCJndWxwXCIsIGxhYmVsOiBcImd1bHBcIiwgdXJsOiBcImh0dHA6Ly9ndWxwanMuY29tL1wiIH0sIFxuXHRcdFx0eyBrZXk6IFwic2VtYW50aWNcIiwgbGFiZWw6IFwic2VtYW50aWMtdWlcIiwgdXJsOiBcImh0dHA6Ly9zZW1hbnRpYy11aS5jb20vXCIgfSBcblx0XHRdO1xuXHR9LFxuXG5cdG9uV2VsY29tZSgpIHsgXG5cdFx0Y29uc29sZS5sb2coXCJwcm9jZXNzaW5nIHdlbGNvbWUuLi5cIik7IFxuXHRcdHRoaXMudHJpZ2dlcihcIndlbGNvbWVcIiwgeyBcblx0ICAgICAgXHR3ZWxjb21lOiB0aGlzLndlbGNvbWUsIFxuXHQgICAgICBcdGZlYXR1cmVzOiB0aGlzLmZlYXR1cmVzIFxuICAgICAgICB9KTtcblx0fVxufSk7IFxuXG5leHBvcnQgZGVmYXVsdCBBcHBTdG9yZTsgIl19
