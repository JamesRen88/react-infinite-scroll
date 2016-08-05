'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InlineLoading = require('./InlineLoading');

var _InlineLoading2 = _interopRequireDefault(_InlineLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Soup Tang on 2016/8/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InfiniteScroll = function (_React$Component) {
    _inherits(InfiniteScroll, _React$Component);

    function InfiniteScroll(props) {
        _classCallCheck(this, InfiniteScroll);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteScroll).call(this, props));

        _this.state = {
            loadCompleted: false,
            startLoad: false //首次加载时不显示inline loading
        };
        return _this;
    }

    _createClass(InfiniteScroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.refs.list.addEventListener('scroll', function (e) {
                var clientHeight = e.target.clientHeight;
                var scrollHeight = e.target.scrollHeight;
                var scrollTop = e.target.scrollTop;
                if (scrollHeight - clientHeight == scrollTop && _this2.props.hasMore === true) {
                    if (!_this2.props.onLoad) {
                        throw new Error('need onLoad');
                    }
                    //onLoad返回Promise对象
                    _this2.setState({
                        loadCompleted: false,
                        startLoad: true
                    });
                    _this2.props.onLoad().then(function () {
                        _this2.setState({
                            loadCompleted: true
                        });
                    }).catch(function (errorMsg) {
                        _this2.setState({
                            loadCompleted: true
                        });
                    });
                }
            });
        }
    }, {
        key: 'style',
        value: function style() {
            return {
                height: this.props.height
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement("ul", { ref: "list", className: this.props.className + ' infinite-scroll', style: this.style() }, this.props.children, function () {
                if (_this3.state.startLoad === false) {
                    return null;
                }
                if (_this3.props.hasMore === true && _this3.state.loadCompleted === false) {
                    return _react2.default.createElement(_InlineLoading2.default, { hasMore: true });
                }
                return _react2.default.createElement(_InlineLoading2.default, { hasMore: false, text: "没有更多了..." });
            }());
        }
    }]);

    return InfiniteScroll;
}(_react2.default.Component);

InfiniteScroll.defaultProps = {
    hasMore: true,
    height: 'auto'
};

InfiniteScroll.propType = {
    hasMore: _react2.default.PropTypes.bool,
    //显示设置高度以便产生滚动事件
    height: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    //加载更多
    onLoad: _react2.default.PropTypes.func
};

module.exports = InfiniteScroll;