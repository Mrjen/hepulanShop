"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      navigationBarTitleText: "订单详情",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      persionInfo: {
        name: "小恶魔",
        phone: 18376602598,
        address: "广东深圳市龙岗区大运软件小镇"
      },
      orderList: [{
        id: 0,
        img: "http://iph.href.lu/152x152",
        oldprice: "12.58",
        price: "1.99",
        name: "阿尔卑斯棒棒糖糖果创意喜糖水果糖",
        color: "图片色",
        num: 2
      }],
      payables: 0.01,
      express_rpice: "0.00",
      real_payment: "0.01",
      order_num: 69464613134564643213,
      order_time: "2017-10-19 17:16:31",
      pay_time: "2017-10-19 17:16:30",
      all_money: "0.01"
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/myOrderDetail/myOrderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15T3JkZXJEZXRhaWwuanMiXSwibmFtZXMiOlsiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGF0YSIsInBlcnNpb25JbmZvIiwibmFtZSIsInBob25lIiwiYWRkcmVzcyIsIm9yZGVyTGlzdCIsImlkIiwiaW1nIiwib2xkcHJpY2UiLCJwcmljZSIsImNvbG9yIiwibnVtIiwicGF5YWJsZXMiLCJleHByZXNzX3JwaWNlIiwicmVhbF9wYXltZW50Iiwib3JkZXJfbnVtIiwib3JkZXJfdGltZSIsInBheV90aW1lIiwiYWxsX21vbmV5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFRUEsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCO0FBSGpCLEssUUFNVEMsSSxHQUFPO0FBQ0xDLG1CQUFhO0FBQ1hDLGNBQU0sS0FESztBQUVYQyxlQUFPLFdBRkk7QUFHWEMsaUJBQVM7QUFIRSxPQURSO0FBTUxDLGlCQUFXLENBQ1Q7QUFDRUMsWUFBSSxDQUROO0FBRUVDLGFBQUssNEJBRlA7QUFHRUMsa0JBQVUsT0FIWjtBQUlFQyxlQUFPLE1BSlQ7QUFLRVAsY0FBTSxrQkFMUjtBQU1FUSxlQUFPLEtBTlQ7QUFPRUMsYUFBSztBQVBQLE9BRFMsQ0FOTjtBQWlCTEMsZ0JBQVUsSUFqQkw7QUFrQkxDLHFCQUFlLE1BbEJWO0FBbUJMQyxvQkFBYyxNQW5CVDtBQW9CTEMsaUJBQVcsb0JBcEJOO0FBcUJMQyxrQkFBWSxxQkFyQlA7QUFzQkxDLGdCQUFVLHFCQXRCTDtBQXVCTEMsaUJBQVc7QUF2Qk4sSzs7OztFQVBvQixlQUFLQyxJIiwiZmlsZSI6Im15T3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi6K6i5Y2V6K+m5oOFXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMxNjM4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgfTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIHBlcnNpb25JbmZvOiB7XHJcbiAgICAgIG5hbWU6IFwi5bCP5oG26a2UXCIsXHJcbiAgICAgIHBob25lOiAxODM3NjYwMjU5OCxcclxuICAgICAgYWRkcmVzczogXCLlub/kuJzmt7HlnLPluILpvpnlspfljLrlpKfov5Dova/ku7blsI/plYdcIlxyXG4gICAgfSxcclxuICAgIG9yZGVyTGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTJ4MTUyXCIsXHJcbiAgICAgICAgb2xkcHJpY2U6IFwiMTIuNThcIixcclxuICAgICAgICBwcmljZTogXCIxLjk5XCIsXHJcbiAgICAgICAgbmFtZTogXCLpmL/lsJTljZHmlq/mo5Lmo5Lns5bns5bmnpzliJvmhI/llpzns5bmsLTmnpzns5ZcIixcclxuICAgICAgICBjb2xvcjogXCLlm77niYfoibJcIixcclxuICAgICAgICBudW06IDJcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIHBheWFibGVzOiAwLjAxLFxyXG4gICAgZXhwcmVzc19ycGljZTogXCIwLjAwXCIsXHJcbiAgICByZWFsX3BheW1lbnQ6IFwiMC4wMVwiLFxyXG4gICAgb3JkZXJfbnVtOiA2OTQ2NDYxMzEzNDU2NDY0MzIxMyxcclxuICAgIG9yZGVyX3RpbWU6IFwiMjAxNy0xMC0xOSAxNzoxNjozMVwiLFxyXG4gICAgcGF5X3RpbWU6IFwiMjAxNy0xMC0xOSAxNzoxNjozMFwiLFxyXG4gICAgYWxsX21vbmV5OiBcIjAuMDFcIlxyXG4gIH07XHJcbn1cclxuIl19