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
            navigationBarTitleText: "个人中心",
            navigationBarBackgroundColor: '#16382e',
            navigationBarTextStyle: '#fff'
        }, _this.data = {
            navList: [{
                id: 0,
                text: "待付款",
                icon: "https://qncdn.playonwechat.com/hepulanShop/mine_icon_nopay.png",
                msg: 1
            }, {
                id: 1,
                text: "代发货",
                icon: "https://qncdn.playonwechat.com/hepulanShop/mine_icon_noship.png",
                msg: 0
            }, {
                id: 2,
                text: "待收货",
                icon: "https://qncdn.playonwechat.com/hepulanShop/mine_icon_noreceipt.png",
                msg: 1
            }, {
                id: 3,
                text: "已完成",
                icon: "https://qncdn.playonwechat.com/hepulanShop/mine_icon_hascarryout.png",
                msg: 0
            }],
            userInfo: {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_default, [{
        key: "onShow",
        value: function onShow() {
            var that = this;
            var userInfo = {
                nickName: _wepy2.default.getStorageSync("nickName"),
                avatarUrl: _wepy2.default.getStorageSync("avatarUrl")
            };
            that.userInfo = userInfo;
            that.$apply();
            console.log(userInfo);
        }
    }]);

    return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/mine/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGF0YSIsIm5hdkxpc3QiLCJpZCIsInRleHQiLCJpY29uIiwibXNnIiwidXNlckluZm8iLCJ0aGF0Iiwibmlja05hbWUiLCJnZXRTdG9yYWdlU3luYyIsImF2YXRhclVybCIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4TEFHSUEsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywwQ0FBOEIsU0FGekI7QUFHTEMsb0NBQXdCO0FBSG5CLFMsUUFLVEMsSSxHQUFPO0FBQ0pDLHFCQUFRLENBQUM7QUFDTEMsb0JBQUcsQ0FERTtBQUVMQyxzQkFBSyxLQUZBO0FBR0xDLHNCQUFLLGdFQUhBO0FBSUxDLHFCQUFJO0FBSkMsYUFBRCxFQUtOO0FBQ0VILG9CQUFHLENBREw7QUFFRUMsc0JBQUssS0FGUDtBQUdFQyxzQkFBSyxpRUFIUDtBQUlFQyxxQkFBSTtBQUpOLGFBTE0sRUFVTjtBQUNFSCxvQkFBRyxDQURMO0FBRUVDLHNCQUFLLEtBRlA7QUFHRUMsc0JBQUssb0VBSFA7QUFJRUMscUJBQUk7QUFKTixhQVZNLEVBZU47QUFDRUgsb0JBQUcsQ0FETDtBQUVFQyxzQkFBSyxLQUZQO0FBR0VDLHNCQUFLLHNFQUhQO0FBSUVDLHFCQUFJO0FBSk4sYUFmTSxDQURKO0FBc0JKQyxzQkFBUztBQXRCTCxTOzs7OztpQ0F5QkM7QUFDSixnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlELFdBQVc7QUFDWEUsMEJBQVMsZUFBS0MsY0FBTCxDQUFvQixVQUFwQixDQURFO0FBRVhDLDJCQUFVLGVBQUtELGNBQUwsQ0FBb0IsV0FBcEI7QUFGQyxhQUFmO0FBSUFGLGlCQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBQyxpQkFBS0ksTUFBTDtBQUNBQyxvQkFBUUMsR0FBUixDQUFZUCxRQUFaO0FBQ0g7Ozs7RUF4Q3dCLGVBQUtRLEkiLCJmaWxlIjoibWluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi4vLi4vY29tbS9jb21tXCJcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vLi4vY29tbS90aXBcIlxyXG5cclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIlxyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuS4quS6uuS4reW/g1wiLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMTYzODJlJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnI2ZmZidcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICBuYXZMaXN0Olt7XHJcbiAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICB0ZXh0Olwi5b6F5LuY5qy+XCIsXHJcbiAgICAgICAgICAgaWNvbjpcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9oZXB1bGFuU2hvcC9taW5lX2ljb25fbm9wYXkucG5nXCIsXHJcbiAgICAgICAgICAgbXNnOjFcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIGlkOjEsXHJcbiAgICAgICAgICAgdGV4dDpcIuS7o+WPkei0p1wiLFxyXG4gICAgICAgICAgIGljb246XCJodHRwczovL3FuY2RuLnBsYXlvbndlY2hhdC5jb20vaGVwdWxhblNob3AvbWluZV9pY29uX25vc2hpcC5wbmdcIixcclxuICAgICAgICAgICBtc2c6MFxyXG4gICAgICAgfSx7XHJcbiAgICAgICAgICAgaWQ6MixcclxuICAgICAgICAgICB0ZXh0Olwi5b6F5pS26LSnXCIsXHJcbiAgICAgICAgICAgaWNvbjpcImh0dHBzOi8vcW5jZG4ucGxheW9ud2VjaGF0LmNvbS9oZXB1bGFuU2hvcC9taW5lX2ljb25fbm9yZWNlaXB0LnBuZ1wiLFxyXG4gICAgICAgICAgIG1zZzoxXHJcbiAgICAgICB9LHtcclxuICAgICAgICAgICBpZDozLFxyXG4gICAgICAgICAgIHRleHQ6XCLlt7LlrozmiJBcIixcclxuICAgICAgICAgICBpY29uOlwiaHR0cHM6Ly9xbmNkbi5wbGF5b253ZWNoYXQuY29tL2hlcHVsYW5TaG9wL21pbmVfaWNvbl9oYXNjYXJyeW91dC5wbmdcIixcclxuICAgICAgICAgICBtc2c6MFxyXG4gICAgICAgfV0sXHJcbiAgICAgICB1c2VySW5mbzp7fVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpe1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgdXNlckluZm8gPSB7XHJcbiAgICAgICAgICAgIG5pY2tOYW1lOndlcHkuZ2V0U3RvcmFnZVN5bmMoXCJuaWNrTmFtZVwiKSxcclxuICAgICAgICAgICAgYXZhdGFyVXJsOndlcHkuZ2V0U3RvcmFnZVN5bmMoXCJhdmF0YXJVcmxcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC51c2VySW5mbyA9IHVzZXJJbmZvO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXHJcbiAgICB9XHJcbn0gICAgXHJcbiJdfQ==