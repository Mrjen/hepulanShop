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
      navigationBarTitleText: "提交订单",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      address: "",
      order: "",
      personName: "",
      phone: "",
      product: [{
        img: "http://iph.href.lu/344x208",
        name: "禾葡兰化妆品装饰包包",
        type: "天蓝色",
        num: 2,
        oldprice: 39.9,
        price: 19.9
      }, {
        img: "http://iph.href.lu/344x208",
        name: "禾葡兰化妆装饰包包",
        type: "天蓝色",
        num: 2,
        oldprice: 39.9,
        price: 19.9
      }],
      hasAddress: 0, //判断是否填写地址
      buytype: "", //判断购买方式  onlybuy：单独购买   gruopbuy：团购
      _apiurl: ""
    }, _this.methods = {
      selectAddress: function selectAddress() {
        var that = this;
        _wepy2.default.chooseAddress({
          success: function success(res) {
            console.log(res.userName);
            console.log(res.postalCode);
            console.log(res.provinceName);
            console.log(res.cityName);
            console.log(res.countyName);
            console.log(res.detailInfo);
            console.log(res.nationalCode);
            console.log(res.telNumber);
            that.address = "" + res.provinceName + res.cityName + res.countyName + res.detailInfo;
            that.personName = "" + res.userName;
            that.phone = "" + res.telNumber;
            _comm2.default.wxRequest({
              query: {
                id: that.order,
                uid: wx.getStorageSync("uid"),
                address: "" + res.provinceName + res.cityName + res.countyName + res.detailInfo,
                phone: "" + res.telNumber,
                personName: "" + res.userName
              }
            }, _api2.default.addressSumit, function (res) {
              console.log("order", that.order);
              console.log(res);
              if (res.data.status == "1") {
                that.hasAddress = 1;
              }
            });
            that.$apply();
          }
        });
      },
      submitOrder: function submitOrder() {
        var that = this;
        console.log(this.hasAddress);
        if (!this.hasAddress) {
          _tip2.default.alert("请选择收货地址");
          return false;
        }
        _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid"), id: this.order } }, this._apiurl, function (res) {
          console.log(res);
          if (res.data.status == "1") {
            wx.requestPayment({
              timeStamp: res.data.data.payData.timeStamp,
              nonceStr: res.data.data.payData.nonceStr,
              package: res.data.data.payData.package,
              signType: "MD5",
              paySign: res.data.data.payData.paySign,
              success: function success(res) {
                _tip2.default.success("支付成功");
              },
              fail: function fail(res) {
                console.log("用户取消支付");
                _tip2.default.alert("用户取消支付");
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onLoad",
    value: function onLoad(options) {
      console.log(options, "options");
      var order = options.order;
      this.buytype = options.buytype;
      // let order = "56.47.77.61";
      this.order = order;
      console.log(this.order);
      var _apiurl = "";
      if (options.buytype == 'onlybuy') {
        _apiurl = _api2.default.onlyBuy;
      } else if (options.buytype == 'gruopbuy') {
        _apiurl = _api2.default.groupPay;
      }
      console.log(_apiurl, "_apiurl");
      this._apiurl = _apiurl;
      this.$apply();
      // comm.wxRequest({ query: { uid: wx.getStorageSync("uid"),order:order}  });
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/submitOrder/submitOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Ym1pdE9yZGVyLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJhZGRyZXNzIiwib3JkZXIiLCJwZXJzb25OYW1lIiwicGhvbmUiLCJwcm9kdWN0IiwiaW1nIiwibmFtZSIsInR5cGUiLCJudW0iLCJvbGRwcmljZSIsInByaWNlIiwiaGFzQWRkcmVzcyIsImJ1eXR5cGUiLCJfYXBpdXJsIiwibWV0aG9kcyIsInNlbGVjdEFkZHJlc3MiLCJ0aGF0IiwiY2hvb3NlQWRkcmVzcyIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidXNlck5hbWUiLCJwb3N0YWxDb2RlIiwicHJvdmluY2VOYW1lIiwiY2l0eU5hbWUiLCJjb3VudHlOYW1lIiwiZGV0YWlsSW5mbyIsIm5hdGlvbmFsQ29kZSIsInRlbE51bWJlciIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiaWQiLCJ1aWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiYWRkcmVzc1N1bWl0Iiwic3RhdHVzIiwiJGFwcGx5Iiwic3VibWl0T3JkZXIiLCJhbGVydCIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwicGF5RGF0YSIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwicGF5U2lnbiIsImZhaWwiLCJvcHRpb25zIiwib25seUJ1eSIsImdyb3VwUGF5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBRUVBLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QjtBQUhqQixLLFFBS1RDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsYUFBTyxFQUZGO0FBR0xD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QSxXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxXQUFLeUIsTUFBTDtBQUNBO0FBQ0Q7Ozs7RUEzSDBCLGVBQUtjLEkiLCJmaWxlIjoic3VibWl0T3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IGNvbW0gZnJvbSBcIi4uLy4uL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi8uLi9jb21tL3RpcFwiO1xyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuLi8uLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaPkOS6pOiuouWNlVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBvcmRlcjogXCJcIixcclxuICAgIHBlcnNvbk5hbWU6IFwiXCIsXHJcbiAgICBwaG9uZTogXCJcIixcclxuICAgIHByb2R1Y3Q6IFtcclxuICAgICAge1xyXG4gICAgICAgIGltZzogXCJodHRwOi8vaXBoLmhyZWYubHUvMzQ0eDIwOFwiLFxyXG4gICAgICAgIG5hbWU6IFwi56a+6JGh5YWw5YyW5aaG5ZOB6KOF6aWw5YyF5YyFXCIsXHJcbiAgICAgICAgdHlwZTogXCLlpKnok53oibJcIixcclxuICAgICAgICBudW06IDIsXHJcbiAgICAgICAgb2xkcHJpY2U6IDM5LjksXHJcbiAgICAgICAgcHJpY2U6IDE5LjlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltZzogXCJodHRwOi8vaXBoLmhyZWYubHUvMzQ0eDIwOFwiLFxyXG4gICAgICAgIG5hbWU6IFwi56a+6JGh5YWw5YyW5aaG6KOF6aWw5YyF5YyFXCIsXHJcbiAgICAgICAgdHlwZTogXCLlpKnok53oibJcIixcclxuICAgICAgICBudW06IDIsXHJcbiAgICAgICAgb2xkcHJpY2U6IDM5LjksXHJcbiAgICAgICAgcHJpY2U6IDE5LjlcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIGhhc0FkZHJlc3M6IDAsIC8v5Yik5pat5piv5ZCm5aGr5YaZ5Zyw5Z2AXHJcbiAgICBidXl0eXBlOlwiXCIsICAgLy/liKTmlq3otK3kubDmlrnlvI8gIG9ubHlidXnvvJrljZXni6zotK3kubAgICBncnVvcGJ1ee+8muWboui0rVxyXG4gICAgX2FwaXVybDpcIlwiXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNlbGVjdEFkZHJlc3MoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgd2VweS5jaG9vc2VBZGRyZXNzKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51c2VyTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucG9zdGFsQ29kZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucHJvdmluY2VOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jaXR5TmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY291bnR5TmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGV0YWlsSW5mbyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMubmF0aW9uYWxDb2RlKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50ZWxOdW1iZXIpO1xyXG4gICAgICAgICAgdGhhdC5hZGRyZXNzID0gYCR7cmVzLnByb3ZpbmNlTmFtZX0ke3Jlcy5jaXR5TmFtZX0ke3Jlcy5jb3VudHlOYW1lfSR7cmVzLmRldGFpbEluZm99YDtcclxuICAgICAgICAgIHRoYXQucGVyc29uTmFtZSA9IGAke3Jlcy51c2VyTmFtZX1gO1xyXG4gICAgICAgICAgdGhhdC5waG9uZSA9IGAke3Jlcy50ZWxOdW1iZXJ9YDtcclxuICAgICAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGF0Lm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGAke3Jlcy5wcm92aW5jZU5hbWV9JHtyZXMuY2l0eU5hbWV9JHtyZXMuY291bnR5TmFtZX0ke3Jlcy5kZXRhaWxJbmZvfWAsXHJcbiAgICAgICAgICAgICAgICBwaG9uZTogYCR7cmVzLnRlbE51bWJlcn1gLFxyXG4gICAgICAgICAgICAgICAgcGVyc29uTmFtZTogYCR7cmVzLnVzZXJOYW1lfWBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFwaS5hZGRyZXNzU3VtaXQsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JkZXJcIiwgdGhhdC5vcmRlcik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmhhc0FkZHJlc3MgPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzdWJtaXRPcmRlcigpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmhhc0FkZHJlc3MpO1xyXG4gICAgICBpZiAoIXRoaXMuaGFzQWRkcmVzcykge1xyXG4gICAgICAgIHRpcC5hbGVydChcIuivt+mAieaLqeaUtui0p+WcsOWdgFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAgeyBxdWVyeTogeyB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLCBpZDogdGhpcy5vcmRlciB9IH0sXHJcbiAgICAgICAgdGhpcy5fYXBpdXJsLFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgICAgIHRpbWVTdGFtcDogcmVzLmRhdGEuZGF0YS5wYXlEYXRhLnRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICBub25jZVN0cjogcmVzLmRhdGEuZGF0YS5wYXlEYXRhLm5vbmNlU3RyLFxyXG4gICAgICAgICAgICAgIHBhY2thZ2U6IHJlcy5kYXRhLmRhdGEucGF5RGF0YS5wYWNrYWdlLFxyXG4gICAgICAgICAgICAgIHNpZ25UeXBlOiBcIk1ENVwiLFxyXG4gICAgICAgICAgICAgIHBheVNpZ246IHJlcy5kYXRhLmRhdGEucGF5RGF0YS5wYXlTaWduLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaUr+S7mOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35Y+W5raI5pSv5LuYXCIpXHJcbiAgICAgICAgICAgICAgICAgIHRpcC5hbGVydChcIueUqOaIt+WPlua2iOaUr+S7mFwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMsXCJvcHRpb25zXCIpXHJcbiAgICBsZXQgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xyXG4gICAgdGhpcy5idXl0eXBlID0gb3B0aW9ucy5idXl0eXBlO1xyXG4gICAgLy8gbGV0IG9yZGVyID0gXCI1Ni40Ny43Ny42MVwiO1xyXG4gICAgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5vcmRlcik7XHJcbiAgICBsZXQgX2FwaXVybCA9IFwiXCI7XHJcbiAgICBpZiAob3B0aW9ucy5idXl0eXBlPT0nb25seWJ1eScpIHtcclxuICAgICAgICBfYXBpdXJsID0gYXBpLm9ubHlCdXlcclxuICAgIH1lbHNlIGlmKG9wdGlvbnMuYnV5dHlwZT09J2dydW9wYnV5Jyl7XHJcbiAgICAgICAgX2FwaXVybCA9IGFwaS5ncm91cFBheVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coX2FwaXVybCxcIl9hcGl1cmxcIilcclxuICAgIHRoaXMuX2FwaXVybCA9IF9hcGl1cmw7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgLy8gY29tbS53eFJlcXVlc3QoeyBxdWVyeTogeyB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLG9yZGVyOm9yZGVyfSAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==