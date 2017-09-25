'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defaultStyle = require('./defaultStyle.css');

var _defaultStyle2 = _interopRequireDefault(_defaultStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTopAbs = 100,
    defaultTopFix = 30,
    defaultLeft = 100,
    defaultWidth = 250;

var ArticleDirectory = function (_React$Component) {
  (0, _inherits3.default)(ArticleDirectory, _React$Component);

  function ArticleDirectory(props) {
    (0, _classCallCheck3.default)(this, ArticleDirectory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ArticleDirectory.__proto__ || (0, _getPrototypeOf2.default)(ArticleDirectory)).call(this, props));

    _this.getDirectoryInfo = function () {
      var id = _this.props.id;
      var offset = _this.props.offset || 0;
      var selector = _this.props.selector || 'h1';
      if (document.getElementById(id)) {
        var directoryArr = document.getElementById(id).getElementsByTagName(selector);
        var directoryList = [];
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < directoryArr.length; i++) {
          directoryList.push({ label: directoryArr[i].innerText, scrollTop: parseInt(directoryArr[i].getBoundingClientRect().top + scrollTop - offset) });
        }
        _this.setState({ directoryList: directoryList, directoryArr: directoryArr });
      }
    };

    _this.handleScroll = function () {
      var topsAbs = _this.props.style.topAbs || defaultTopAbs,
          topFix = _this.props.style.topFix || defaultTopFix;
      var criticalValue = topsAbs - topFix;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var directoryList = _this.state.directoryList;

      //如果没有在滑动，则监听scrollTop改变当前的激活目录
      if (!_this.state.sliding) {
        var maxScrollTop = (document.body.scrollHeight || document.documentElement.scrollHeight) - (document.body.clientHeight || document.documentElement.clientHeight);
        var directoryActive = _this.state.directoryActive;
        for (var i = 0; i < directoryList.length; i++) {
          if (scrollTop >= directoryList[i].scrollTop) {
            directoryActive = i;
          }
        }
        if (scrollTop === maxScrollTop) {
          directoryActive = directoryList.length - 1;
        }
        _this.setState({ directoryActive: directoryActive });
      }
      _this.setState({
        directoryPos: scrollTop >= criticalValue ? 'fixed' : 'absolute'
      });
    };

    _this.slideToDirectory = function (scrolltop, index) {
      if (_this.state.sliding) return;

      _this.setState({ directoryActive: index, sliding: true });
      var maxTop = (document.body.scrollHeight || document.documentElement.scrollHeight) - (document.body.clientHeight || document.documentElement.clientHeight);
      var interVal = setInterval(function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = scrolltop - top > 0 ? Math.ceil((scrolltop - top) / 12) : Math.floor((scrolltop - top) / 12);
        top += speed;
        document.body.scrollTop = document.documentElement.scrollTop = top;
        if (top === scrolltop || top >= maxTop) {
          _this.setState({ sliding: false });
          clearInterval(interVal);
        }
      }, 20);
    };

    _this.state = {
      directoryActive: '',
      directoryPos: 'absolute',
      directoryList: [],
      sliding: false
    };
    return _this;
  }

  (0, _createClass3.default)(ArticleDirectory, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var topsAbs = this.props.style.topAbs || defaultTopAbs,
          topFix = this.props.style.topFix || defaultTopFix;
      var criticalValue = topsAbs - topFix;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.setState({ directoryPos: scrollTop >= criticalValue ? 'fixed' : 'absolute' });
      window.addEventListener('scroll', this.handleScroll);
      this.getDirectoryInfo();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.refresh !== this.props.refresh) {
        this.getDirectoryInfo();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var containerStyle = this.props.style || {};
      var directoryStyle = this.props.itemStyle || {};
      var title = this.props.title || 'Directory';
      var absStyle = {
        position: 'absolute',
        top: containerStyle.topAbs || defaultTopAbs,
        left: containerStyle.left || defaultLeft,
        width: containerStyle.width || defaultWidth
      };
      var fixStyle = {
        position: 'fixed',
        top: containerStyle.topFix || defaultTopFix,
        left: containerStyle.left || defaultLeft,
        width: containerStyle.width || defaultWidth
      };
      return _react2.default.createElement(
        'ul',
        {
          style: this.state.directoryPos === 'fixed' ? (0, _extends3.default)({}, fixStyle) : (0, _extends3.default)({}, absStyle),
          className: 'directory'
        },
        _react2.default.createElement(
          'li',
          { className: 'directoryTitle' },
          title
        ),
        this.state.directoryList.map(function (directory, index) {
          return _react2.default.createElement(
            'li',
            {
              key: index,
              style: (0, _extends3.default)({}, directoryStyle),
              className: index === _this2.state.directoryActive ? 'directoryActive' : '',
              onClick: function onClick() {
                _this2.slideToDirectory(directory.scrollTop, index);
              } },
            directory.label
          );
        })
      );
    }
  }]);
  return ArticleDirectory;
}(_react2.default.Component);

ArticleDirectory.propTypes = {
  id: _propTypes2.default.string,
  selector: _propTypes2.default.string,
  title: _propTypes2.default.string,
  style: _propTypes2.default.object,
  itemStyle: _propTypes2.default.object,
  offset: _propTypes2.default.number
};

exports.default = ArticleDirectory;