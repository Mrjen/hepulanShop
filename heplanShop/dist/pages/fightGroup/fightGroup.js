"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _comm = require('./../../comm/comm.js');

var _comm2 = _interopRequireDefault(_comm);

var _tip = require('./../../comm/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _wxRequest = require('./../../comm/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$page) {
  _inherits(_default, _wepy$page);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "拼团",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      groupList: []
    }, _this.methos = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onShow",
    value: function onShow() {
      var that = this;
      console.log(_api2.default.apiUrl);
      _comm2.default.wxRequest({ query: {} }, _api2.default.fightGroup, function (res) {
        var groupList = res.data.data;
        for (var i = 0; i < groupList.length; i++) {
          groupList[i].logo = _api2.default.apiUrl + "/" + groupList[i].logo;
          for (var j = 0; j < groupList[i].users.length; j++) {
            groupList[i].users[j].avatarUrl = _api2.default.apiUrl + "/" + groupList[i].users[j].avatarUrl;
          }
        }
        that.groupList = groupList;
        that.$apply();
      });
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/fightGroup/fightGroup'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpZ2h0R3JvdXAuanMiXSwibmFtZXMiOlsiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGF0YSIsImdyb3VwTGlzdCIsIm1ldGhvcyIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwiYXBpVXJsIiwid3hSZXF1ZXN0IiwicXVlcnkiLCJmaWdodEdyb3VwIiwicmVzIiwiaSIsImxlbmd0aCIsImxvZ28iLCJqIiwidXNlcnMiLCJhdmF0YXJVcmwiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFRUEsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCO0FBSGpCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGlCQUFXO0FBRE4sSyxRQUlQQyxNLEdBQVMsRTs7Ozs7NkJBSUQ7QUFDTixVQUFJQyxPQUFPLElBQVg7QUFDQUMsY0FBUUMsR0FBUixDQUFZLGNBQUlDLE1BQWhCO0FBQ0EscUJBQUtDLFNBQUwsQ0FBZSxFQUFDQyxPQUFNLEVBQVAsRUFBZixFQUEwQixjQUFJQyxVQUE5QixFQUF5QyxVQUFTQyxHQUFULEVBQWE7QUFDbkQsWUFBSVQsWUFBWVMsSUFBSVYsSUFBSixDQUFTQSxJQUF6QjtBQUNBLGFBQUssSUFBSVcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJVixVQUFVVyxNQUE5QixFQUFzQ0QsR0FBdEMsRUFBMkM7QUFDeENWLG9CQUFVVSxDQUFWLEVBQWFFLElBQWIsR0FBdUIsY0FBSVAsTUFBM0IsU0FBcUNMLFVBQVVVLENBQVYsRUFBYUUsSUFBbEQ7QUFDQSxlQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSWIsVUFBVVUsQ0FBVixFQUFhSSxLQUFiLENBQW1CSCxNQUF2QyxFQUErQ0UsR0FBL0MsRUFBb0Q7QUFDakRiLHNCQUFVVSxDQUFWLEVBQWFJLEtBQWIsQ0FBbUJELENBQW5CLEVBQXNCRSxTQUF0QixHQUFxQyxjQUFJVixNQUF6QyxTQUFtREwsVUFBVVUsQ0FBVixFQUFhSSxLQUFiLENBQW1CRCxDQUFuQixFQUFzQkUsU0FBekU7QUFDRjtBQUNIO0FBQ0RiLGFBQUtGLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0FFLGFBQUtjLE1BQUw7QUFDRixPQVZEO0FBV0Q7Ozs7RUE1QjBCLGVBQUtDLEkiLCJmaWxlIjoiZmlnaHRHcm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi4vLi4vY29tbS9jb21tXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uLy4uL2NvbW0vdGlwXCI7XHJcblxyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuLi8uLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaLvOWbolwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGdyb3VwTGlzdDogW11cclxuICB9XHJcblxyXG4gIG1ldGhvcyA9IHtcclxuXHJcbiAgfVxyXG5cclxuICBvblNob3coKXtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIGNvbnNvbGUubG9nKGFwaS5hcGlVcmwpXHJcbiAgICBjb21tLnd4UmVxdWVzdCh7cXVlcnk6e319LGFwaS5maWdodEdyb3VwLGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICBsZXQgZ3JvdXBMaXN0ID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBncm91cExpc3RbaV0ubG9nbyA9IGAke2FwaS5hcGlVcmx9LyR7Z3JvdXBMaXN0W2ldLmxvZ299YDtcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JvdXBMaXN0W2ldLnVzZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICBncm91cExpc3RbaV0udXNlcnNbal0uYXZhdGFyVXJsID0gYCR7YXBpLmFwaVVybH0vJHtncm91cExpc3RbaV0udXNlcnNbal0uYXZhdGFyVXJsfWBcclxuICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIHRoYXQuZ3JvdXBMaXN0ID0gZ3JvdXBMaXN0O1xyXG4gICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==