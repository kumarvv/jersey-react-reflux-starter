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

var _hello = require('./hello.jsx');

var _hello2 = _interopRequireDefault(_hello);

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
			switch (event) {
				case "welcome":
					this.setState({
						welcome: data.welcome,
						features: data.features
					});
					break;
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
					{ className: 'ui horizontal segments' },
					_react2.default.createElement(
						'div',
						{ className: 'ui left aligned segment' },
						_react2.default.createElement(
							'ul',
							null,
							featuresDOM
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'ui left aligned segment' },
						_react2.default.createElement(_hello2.default, null)
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

},{"./app_action.jsx":2,"./app_store.jsx":3,"./hello.jsx":4,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppActions = _reflux2.default.createActions(['welcome', 'hello']);

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

		this.welcome = "Welcome To JerseyReactStarter";
		this.features = [{ key: "java", label: "Java", url: "http://www.oracle.com/technetwork/java/javase/overview/java8-2100321.html" }, { key: "jersey", label: "Jersey (JAX-RS)", url: "https://jersey.java.net/" }, { key: "react", label: "ReactJS", url: "https://facebook.github.io/react/" }, { key: "reflux", label: "RefluxJS", url: "https://github.com/reflux/refluxjs" }, { key: "jquery", label: "jQuery ($)", url: "https://jquery.com/" }, { key: "lodash", label: "loadsh (_)", url: "https://lodash.com/" }, { key: "babel", label: "babelify", url: "https://babeljs.io/" }, { key: "browserify", label: "browserify", url: "http://browserify.org/" }, { key: "gulp", label: "gulp", url: "http://gulpjs.com/" }, { key: "semantic", label: "semantic-ui", url: "http://semantic-ui.com/" }];
		this.hello = {
			data: {},
			raw: ""
		};
	},
	onWelcome: function onWelcome() {
		console.log("processing welcome...");
		this.trigger("welcome", {
			welcome: this.welcome,
			features: this.features
		});
	},
	onHello: function onHello(name) {
		console.log("processing hello...");
		var THIS = this;
		$.ajax({
			type: 'GET',
			url: '/api/hello/' + name,
			headers: { 'Accept': 'application/json' }
		}).then(function (json) {
			THIS.hello.data = json;
			THIS.hello.raw = JSON.stringify(json, null, 2);
			THIS.trigger("hello", THIS.hello);
		});
	}
});

exports.default = AppStore;

},{"./app_action.jsx":2,"react":"react","reflux":"reflux"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app_action = require('./app_action.jsx');

var _app_action2 = _interopRequireDefault(_app_action);

var _app_store = require('./app_store.jsx');

var _app_store2 = _interopRequireDefault(_app_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hello = function (_React$Component) {
    _inherits(Hello, _React$Component);

    function Hello() {
        _classCallCheck(this, Hello);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hello).call(this));

        _this.state = {
            name: "",
            data: {},
            raw: ""
        };
        return _this;
    }

    _createClass(Hello, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _app_store2.default.listen(this.onAppStoreChange.bind(this));
        }
    }, {
        key: 'onAppStoreChange',
        value: function onAppStoreChange(event, data) {
            switch (event) {
                case "hello":
                    this.setState({
                        data: data.data,
                        raw: data.raw
                    });
                    break;
            }
        }
    }, {
        key: 'onClickHello',
        value: function onClickHello() {
            var name = $('#name').val();
            _app_action2.default.hello(name);
        }
    }, {
        key: 'renderContents',
        value: function renderContents() {
            var _state = this.state;
            var data = _state.data;
            var raw = _state.raw;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { key: 'input', className: 'ui action input' },
                    _react2.default.createElement('input', { id: 'name', type: 'text', placeholder: 'Name' }),
                    _react2.default.createElement(
                        'button',
                        { className: 'ui button', onClick: this.onClickHello.bind(this) },
                        'Hello'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { key: 'data', className: 'ui raised segment' },
                    _react2.default.createElement(
                        'table',
                        { className: 'ui definition table' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { style: { width: '100px' } },
                                    'Name'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    data.hello === undefined ? '' : data.hello.name
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Lowercase'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    data.hello === undefined ? '' : data.hello.lower
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Uppercase'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    data.hello === undefined ? '' : data.hello.upper
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { key: 'raw', className: 'ui raised segment' },
                    _react2.default.createElement(
                        'p',
                        null,
                        raw
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

    return Hello;
}(_react2.default.Component);

exports.default = Hello;

},{"./app_action.jsx":2,"./app_store.jsx":3,"react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzeCIsImFwcC9hcHBfYWN0aW9uLmpzeCIsImFwcC9hcHBfc3RvcmUuanN4IiwiYXBwL2hlbGxvLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxHOzs7QUFDTCxnQkFBYztBQUFBOztBQUFBOztBQUViLFFBQUssS0FBTCxHQUFhO0FBQ1osWUFBUyxFQURHO0FBRVosYUFBVTtBQUZFLEdBQWI7QUFGYTtBQU1iOzs7O3VDQUVvQjtBQUNwQix3QkFBVyxPQUFYO0FBQ0E7OztzQ0FFbUI7QUFDbkIsdUJBQVMsTUFBVCxDQUFnQixLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQTJCLElBQTNCLENBQWhCO0FBQ0E7OzttQ0FFZ0IsSyxFQUFPLEksRUFBTTtBQUM3QixXQUFPLEtBQVA7QUFDQyxTQUFLLFNBQUw7QUFDQyxVQUFLLFFBQUwsQ0FBYztBQUNiLGVBQVMsS0FBSyxPQUREO0FBRWIsZ0JBQVUsS0FBSztBQUZGLE1BQWQ7QUFJQTtBQU5GO0FBUUE7OzttQ0FFZ0I7QUFBQSxnQkFDVSxLQUFLLEtBRGY7QUFBQSxPQUNYLE9BRFcsVUFDWCxPQURXO0FBQUEsT0FDRixRQURFLFVBQ0YsUUFERTs7O0FBR2hCLE9BQUksY0FBYyxhQUFhLFNBQWIsR0FBeUIsU0FBUyxHQUFULENBQWEsYUFBSztBQUM1RCxXQUFPO0FBQUE7QUFBQSxPQUFJLEtBQUssRUFBRSxHQUFYO0FBQWdCO0FBQUE7QUFBQSxRQUFHLE1BQU0sRUFBRSxHQUFYLEVBQWdCLFFBQU8sUUFBdkI7QUFBaUMsUUFBRTtBQUFuQztBQUFoQixLQUFQO0FBQ0EsSUFGMEMsQ0FBekIsR0FFYix5Q0FGTDs7QUFJQSxVQUFPO0FBQUE7QUFBQSxNQUFLLFdBQVUsMkJBQWY7QUFDTjtBQUFBO0FBQUE7QUFBSztB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Q0k7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNDQUFJLE9BQU8sRUFBQyxPQUFNLE9BQVAsRUFBWDtBQUFBO0FBQUEsaUNBREo7QUFFSTtBQUFBO0FBQUE7QUFBSyx5Q0FBSyxLQUFMLEtBQWUsU0FBZixHQUEyQixFQUEzQixHQUFnQyxLQUFLLEtBQUwsQ0FBVztBQUFoRDtBQUZKLDZCQURBO0FBS0E7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FESjtBQUVJO0FBQUE7QUFBQTtBQUFLLHlDQUFLLEtBQUwsS0FBZSxTQUFmLEdBQTJCLEVBQTNCLEdBQWdDLEtBQUssS0FBTCxDQUFXO0FBQWhEO0FBRkosNkJBTEE7QUFTQTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQURKO0FBRUk7QUFBQTtBQUFBO0FBQUsseUNBQUssS0FBTCxLQUFlLFNBQWYsR0FBMkIsRUFBM0IsR0FBZ0MsS0FBSyxLQUFMLENBQVc7QUFBaEQ7QUFGSjtBQVRBO0FBREo7QUFESixpQkFMRztBQXVCSDtBQUFBO0FBQUEsc0JBQUssS0FBSSxLQUFULEVBQWUsV0FBVSxtQkFBekI7QUFDSTtBQUFBO0FBQUE7QUFBSTtBQUFKO0FBREo7QUF2QkcsYUFBUDtBQTJCSDs7O2lDQUVRO0FBQ0wsbUJBQU87QUFBQTtBQUFBO0FBQU0scUJBQUssY0FBTDtBQUFOLGFBQVA7QUFDSDs7OztFQWhFZSxnQkFBTSxTOztrQkFtRVgsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnOyBcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgQXBwQWN0aW9ucyBmcm9tICcuL2FwcF9hY3Rpb24uanN4JzsgXG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnLi9hcHBfc3RvcmUuanN4JzsgXG5pbXBvcnQgSGVsbG8gZnJvbSAnLi9oZWxsby5qc3gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgeyBcblx0Y29uc3RydWN0b3IoKSB7IFxuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHdlbGNvbWU6ICcnLCBcblx0XHRcdGZlYXR1cmVzOiBbXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHsgXG5cdFx0QXBwQWN0aW9ucy53ZWxjb21lKCk7IFxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7IFxuXHRcdEFwcFN0b3JlLmxpc3Rlbih0aGlzLm9uQXBwU3RvcmVDaGFuZ2UuYmluZCh0aGlzKSk7IFxuXHR9XG5cblx0b25BcHBTdG9yZUNoYW5nZShldmVudCwgZGF0YSkgeyBcblx0XHRzd2l0Y2goZXZlbnQpIHtcblx0XHRcdGNhc2UgXCJ3ZWxjb21lXCI6IFxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHR3ZWxjb21lOiBkYXRhLndlbGNvbWUsIFxuXHRcdFx0XHRcdGZlYXR1cmVzOiBkYXRhLmZlYXR1cmVzIFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQ29udGVudHMoKSB7IFxuXHRcdGxldCB7d2VsY29tZSwgZmVhdHVyZXN9ID0gdGhpcy5zdGF0ZTsgXG5cblx0XHRsZXQgZmVhdHVyZXNET00gPSBmZWF0dXJlcyAhPT0gdW5kZWZpbmVkID8gZmVhdHVyZXMubWFwKGYgPT4ge1xuXHRcdFx0cmV0dXJuIDxsaSBrZXk9e2Yua2V5fT48YSBocmVmPXtmLnVybH0gdGFyZ2V0PSdfYmxhbmsnPntmLmxhYmVsfTwvYT48L2xpPiAgXG5cdFx0fSkgOiA8bGk+PC9saT47XG5cblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J3VpIGNlbnRlciBhbGlnbmVkIHNlZ21lbnQnPlxuXHRcdFx0PGgxPnt3ZWxjb21lfTwvaDE+XG5cdFx0XHQ8aDM+RmVhdHVyZXM8L2gzPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ1aSBob3Jpem9udGFsIHNlZ21lbnRzXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd1aSBsZWZ0IGFsaWduZWQgc2VnbWVudCc+XG5cdFx0XHRcdFx0PHVsPlxuXHRcdFx0XHRcdFx0e2ZlYXR1cmVzRE9NfVxuXHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndWkgbGVmdCBhbGlnbmVkIHNlZ21lbnQnPlxuXHRcdFx0XHRcdDxIZWxsbyAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2Pjtcblx0fVxuXG5cdHJlbmRlcigpIHsgXG5cdFx0cmV0dXJuIDxkaXY+e3RoaXMucmVuZGVyQ29udGVudHMoKX08L2Rpdj47IFxuXHR9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50cycpKTsiLCJpbXBvcnQgUmVmbHV4IGZyb20gJ3JlZmx1eCc7XG5cbmNvbnN0IEFwcEFjdGlvbnMgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyhbXG4gICAgJ3dlbGNvbWUnLFxuICAgICdoZWxsbydcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBBY3Rpb25zOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7IFxuaW1wb3J0IFJlZmx1eCBmcm9tICdyZWZsdXgnOyBcblxuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnLi9hcHBfYWN0aW9uLmpzeCc7IFxuXG5sZXQgQXBwU3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xuXHRpbml0KCkgeyBcblx0XHRjb25zb2xlLmxvZyhcImluaXRpYWxpemluZyBBcHBTdG9yZS4uLlwiKTsgXG5cdFx0dGhpcy5saXN0ZW5Ub01hbnkoQXBwQWN0aW9ucyk7IFxuXG5cdFx0dGhpcy53ZWxjb21lID0gXCJXZWxjb21lIFRvIEplcnNleVJlYWN0U3RhcnRlclwiO1xuXHRcdHRoaXMuZmVhdHVyZXMgPSBbIFxuXHRcdFx0eyBrZXk6IFwiamF2YVwiLCBsYWJlbDogXCJKYXZhXCIsIHVybDogXCJodHRwOi8vd3d3Lm9yYWNsZS5jb20vdGVjaG5ldHdvcmsvamF2YS9qYXZhc2Uvb3ZlcnZpZXcvamF2YTgtMjEwMDMyMS5odG1sXCIgfSxcblx0XHRcdHsga2V5OiBcImplcnNleVwiLCBsYWJlbDogXCJKZXJzZXkgKEpBWC1SUylcIiwgdXJsOiBcImh0dHBzOi8vamVyc2V5LmphdmEubmV0L1wiIH0sXG5cdFx0XHR7IGtleTogXCJyZWFjdFwiLCBsYWJlbDogXCJSZWFjdEpTXCIsIHVybDogXCJodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9cIiB9LFxuXHRcdFx0eyBrZXk6IFwicmVmbHV4XCIsIGxhYmVsOiBcIlJlZmx1eEpTXCIsIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vcmVmbHV4L3JlZmx1eGpzXCIgfSxcblx0XHRcdHsga2V5OiBcImpxdWVyeVwiLCBsYWJlbDogXCJqUXVlcnkgKCQpXCIsIHVybDogXCJodHRwczovL2pxdWVyeS5jb20vXCIgfSwgXG5cdFx0XHR7IGtleTogXCJsb2Rhc2hcIiwgbGFiZWw6IFwibG9hZHNoIChfKVwiLCB1cmw6IFwiaHR0cHM6Ly9sb2Rhc2guY29tL1wiIH0sIFxuXHRcdFx0eyBrZXk6IFwiYmFiZWxcIiwgbGFiZWw6IFwiYmFiZWxpZnlcIiwgdXJsOiBcImh0dHBzOi8vYmFiZWxqcy5pby9cIiB9LCBcblx0XHRcdHsga2V5OiBcImJyb3dzZXJpZnlcIiwgbGFiZWw6IFwiYnJvd3NlcmlmeVwiLCB1cmw6IFwiaHR0cDovL2Jyb3dzZXJpZnkub3JnL1wiIH0sIFxuXHRcdFx0eyBrZXk6IFwiZ3VscFwiLCBsYWJlbDogXCJndWxwXCIsIHVybDogXCJodHRwOi8vZ3VscGpzLmNvbS9cIiB9LCBcblx0XHRcdHsga2V5OiBcInNlbWFudGljXCIsIGxhYmVsOiBcInNlbWFudGljLXVpXCIsIHVybDogXCJodHRwOi8vc2VtYW50aWMtdWkuY29tL1wiIH0gXG5cdFx0XTtcblx0XHR0aGlzLmhlbGxvID0ge1xuXHRcdFx0ZGF0YToge30sXG5cdFx0XHRyYXc6IFwiXCJcblx0XHR9XG5cdH0sXG5cblx0b25XZWxjb21lKCkgeyBcblx0XHRjb25zb2xlLmxvZyhcInByb2Nlc3Npbmcgd2VsY29tZS4uLlwiKTsgXG5cdFx0dGhpcy50cmlnZ2VyKFwid2VsY29tZVwiLCB7IFxuXHQgICAgICBcdHdlbGNvbWU6IHRoaXMud2VsY29tZSwgXG5cdCAgICAgIFx0ZmVhdHVyZXM6IHRoaXMuZmVhdHVyZXMgXG4gICAgICAgIH0pO1xuXHR9LFxuXG5cdG9uSGVsbG8obmFtZSkge1xuXHRcdGNvbnNvbGUubG9nKFwicHJvY2Vzc2luZyBoZWxsby4uLlwiKTtcblx0XHR2YXIgVEhJUyA9IHRoaXM7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdHRVQnLFxuXHRcdFx0dXJsOiAnL2FwaS9oZWxsby8nICsgbmFtZSxcblx0XHRcdGhlYWRlcnM6IHsnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nfVxuXHRcdH0pLnRoZW4oZnVuY3Rpb24oanNvbikge1xuXHRcdFx0VEhJUy5oZWxsby5kYXRhID0ganNvbjtcblx0XHRcdFRISVMuaGVsbG8ucmF3ID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgMik7XG5cdFx0XHRUSElTLnRyaWdnZXIoXCJoZWxsb1wiLCBUSElTLmhlbGxvKTtcblx0XHR9KTtcblx0fVxufSk7IFxuXG5leHBvcnQgZGVmYXVsdCBBcHBTdG9yZTsgIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEFwcEFjdGlvbnMgZnJvbSAnLi9hcHBfYWN0aW9uLmpzeCc7XG5pbXBvcnQgQXBwU3RvcmUgZnJvbSAnLi9hcHBfc3RvcmUuanN4JztcblxuY2xhc3MgSGVsbG8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgcmF3OiBcIlwiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgQXBwU3RvcmUubGlzdGVuKHRoaXMub25BcHBTdG9yZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBvbkFwcFN0b3JlQ2hhbmdlKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIHN3aXRjaChldmVudCkge1xuICAgICAgICAgICAgY2FzZSBcImhlbGxvXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgcmF3OiBkYXRhLnJhd1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja0hlbGxvKCkge1xuICAgICAgICBsZXQgbmFtZSA9ICQoJyNuYW1lJykudmFsKCk7XG4gICAgICAgIEFwcEFjdGlvbnMuaGVsbG8obmFtZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudHMoKSB7XG4gICAgICAgIGxldCB7ZGF0YSwgcmF3fSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGtleT1cImlucHV0XCIgY2xhc3NOYW1lPVwidWkgYWN0aW9uIGlucHV0XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidWkgYnV0dG9uXCIgb25DbGljaz17dGhpcy5vbkNsaWNrSGVsbG8uYmluZCh0aGlzKX0+SGVsbG88L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBrZXk9XCJkYXRhXCIgY2xhc3NOYW1lPVwidWkgcmFpc2VkIHNlZ21lbnRcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidWkgZGVmaW5pdGlvbiB0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17e3dpZHRoOicxMDBweCd9fT5OYW1lPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57ZGF0YS5oZWxsbyA9PT0gdW5kZWZpbmVkID8gJycgOiBkYXRhLmhlbGxvLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPkxvd2VyY2FzZTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2RhdGEuaGVsbG8gPT09IHVuZGVmaW5lZCA/ICcnIDogZGF0YS5oZWxsby5sb3dlcn08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+VXBwZXJjYXNlPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57ZGF0YS5oZWxsbyA9PT0gdW5kZWZpbmVkID8gJycgOiBkYXRhLmhlbGxvLnVwcGVyfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBrZXk9XCJyYXdcIiBjbGFzc05hbWU9XCJ1aSByYWlzZWQgc2VnbWVudFwiPlxuICAgICAgICAgICAgICAgIDxwPntyYXd9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2Pnt0aGlzLnJlbmRlckNvbnRlbnRzKCl9PC9kaXY+O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVsbG87Il19
