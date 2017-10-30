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
      _apiurl: "",
      pagePrice: "", //  页面合计价格数据
      feedback: "", //用户留言
      productNum: "" //商品数量
    }, _this.methods = {
      selectAddress: function selectAddress() {
        var that = this;
        console.log(this.address_api, "address_api");
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
            }, that.address_api, function (res) {
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
        _comm2.default.wxRequest({
          query: {
            uid: wx.getStorageSync("uid"),
            id: this.order,
            feedback: this.feedback
          }
        }, this._apiurl, function (res) {
          console.log(res);
          var groupid = res.data.data.groupId;
          if (res.data.status == "1") {
            wx.requestPayment({
              timeStamp: res.data.data.payData.timeStamp,
              nonceStr: res.data.data.payData.nonceStr,
              package: res.data.data.payData.package,
              signType: "MD5",
              paySign: res.data.data.payData.paySign,
              success: function success(res) {
                _tip2.default.success("支付成功");
                console.log("支付成功", res, that.buytype);
                if (that.buytype == "gruopbuy") {
                  wx.navigateTo({
                    url: "../inviteFight/inviteFight?groupid=" + groupid
                  });
                } else if (that.buytype == "onlybuy") {
                  wx.switchTab({
                    url: "../index/index"
                  });
                }
              },
              fail: function fail(res) {
                console.log("用户取消支付");
                _tip2.default.alert("用户取消支付");
              }
            });
          }
        });
      },

      // 留言
      feedBack: function feedBack(e) {
        console.log(e.detail.value);
        this.feedback = e.detail.value;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onLoad",
    value: function onLoad(options) {
      var that = this;
      console.log(options, "options 页面来源");
      var order = options.order;
      this.buytype = options.buytype;
      // let order = "56.47.77.61";
      this.order = order;
      console.log(this.order);
      var _apiurl = "";
      var address_api = "";
      if (options.buytype == "onlybuy") {
        _apiurl = _api2.default.orderSumit;
        address_api = _api2.default.singleAddressSumit;
      } else if (options.buytype == "gruopbuy") {
        _apiurl = _api2.default.groupPay;
        address_api = _api2.default.groupAddressSumit;
      }
      console.log(_api2.default.onlyBuy, "api");
      console.log(_apiurl, "_apiurl", address_api, "address_api");
      this._apiurl = _apiurl;
      this.address_api = address_api;
      this.$apply();
      _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid"), order: order } }, _api2.default.singleDetail, function (res) {
        console.log(res, "页面熟据");
        if (res.data.status == "1") {
          var product = res.data.data.goods;
          var productNum = new Number();
          that.pagePrice = res.data.data.order;
          console.log(product);

          for (var i = 0; i < product.length; i++) {
            product[i].logo = _api2.default.apiUrl + "/" + product[i].logo;
            product[i].option = JSON.parse(product[i].option);
            productNum += product[i].num;
          }
          that.product = product;
          that.productNum = productNum;
          that.$apply();
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/submitOrder/submitOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Ym1pdE9yZGVyLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJhZGRyZXNzIiwib3JkZXIiLCJwZXJzb25OYW1lIiwicGhvbmUiLCJwcm9kdWN0IiwiaW1nIiwibmFtZSIsInR5cGUiLCJudW0iLCJvbGRwcmljZSIsInByaWNlIiwiaGFzQWRkcmVzcyIsImJ1eXR5cGUiLCJfYXBpdXJsIiwicGFnZVByaWNlIiwiZmVlZGJhY2siLCJwcm9kdWN0TnVtIiwibWV0aG9kcyIsInNlbGVjdEFkZHJlc3MiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsImFkZHJlc3NfYXBpIiwiY2hvb3NlQWRkcmVzcyIsInN1Y2Nlc3MiLCJyZXMiLCJ1c2VyTmFtZSIsInBvc3RhbENvZGUiLCJwcm92aW5jZU5hbWUiLCJjaXR5TmFtZSIsImNvdW50eU5hbWUiLCJkZXRhaWxJbmZvIiwibmF0aW9uYWxDb2RlIiwidGVsTnVtYmVyIiwid3hSZXF1ZXN0IiwicXVlcnkiLCJpZCIsInVpZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGF0dXMiLCIkYXBwbHkiLCJzdWJtaXRPcmRlciIsImFsZXJ0IiwiZ3JvdXBpZCIsImdyb3VwSWQiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsInBheURhdGEiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJuYXZpZ2F0ZVRvIiwidXJsIiwic3dpdGNoVGFiIiwiZmFpbCIsImZlZWRCYWNrIiwiZSIsImRldGFpbCIsInZhbHVlIiwib3B0aW9ucyIsIm9yZGVyU3VtaXQiLCJzaW5nbGVBZGRyZXNzU3VtaXQiLCJncm91cFBheSIsImdyb3VwQWRkcmVzc1N1bWl0Iiwib25seUJ1eSIsInNpbmdsZURldGFpbCIsImdvb2RzIiwiTnVtYmVyIiwiaSIsImxlbmd0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RCxHQUF6QjtBQUNEO0FBQ0RXLGVBQUtmLE9BQUwsR0FBZUEsT0FBZjtBQUNBZSxlQUFLSCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBRyxlQUFLc0IsTUFBTDtBQUNEO0FBQ0YsT0FwQkg7QUFzQkQ7Ozs7RUFoTDBCLGVBQUtvQyxJIiwiZmlsZSI6InN1Ym1pdE9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBjb21tIGZyb20gXCIuLi8uLi9jb21tL2NvbW1cIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vLi4vY29tbS90aXBcIjtcclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vYXBpL2FwaVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLmj5DkuqTorqLljZVcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzE2MzgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBhZGRyZXNzOiBcIlwiLFxyXG4gICAgb3JkZXI6IFwiXCIsXHJcbiAgICBwZXJzb25OYW1lOiBcIlwiLFxyXG4gICAgcGhvbmU6IFwiXCIsXHJcbiAgICBwcm9kdWN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpbWc6IFwiaHR0cDovL2lwaC5ocmVmLmx1LzM0NHgyMDhcIixcclxuICAgICAgICBuYW1lOiBcIuemvuiRoeWFsOWMluWmhuWTgeijhemlsOWMheWMhVwiLFxyXG4gICAgICAgIHR5cGU6IFwi5aSp6JOd6ImyXCIsXHJcbiAgICAgICAgbnVtOiAyLFxyXG4gICAgICAgIG9sZHByaWNlOiAzOS45LFxyXG4gICAgICAgIHByaWNlOiAxOS45XHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpbWc6IFwiaHR0cDovL2lwaC5ocmVmLmx1LzM0NHgyMDhcIixcclxuICAgICAgICBuYW1lOiBcIuemvuiRoeWFsOWMluWmhuijhemlsOWMheWMhVwiLFxyXG4gICAgICAgIHR5cGU6IFwi5aSp6JOd6ImyXCIsXHJcbiAgICAgICAgbnVtOiAyLFxyXG4gICAgICAgIG9sZHByaWNlOiAzOS45LFxyXG4gICAgICAgIHByaWNlOiAxOS45XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBoYXNBZGRyZXNzOiAwLCAvL+WIpOaWreaYr+WQpuWhq+WGmeWcsOWdgFxyXG4gICAgYnV5dHlwZTogXCJcIiwgLy/liKTmlq3otK3kubDmlrnlvI8gIG9ubHlidXnvvJrljZXni6zotK3kubAgICBncnVvcGJ1ee+8muWboui0rVxyXG4gICAgX2FwaXVybDogXCJcIixcclxuICAgIHBhZ2VQcmljZTogXCJcIiwgLy8gIOmhtemdouWQiOiuoeS7t+agvOaVsOaNrlxyXG4gICAgZmVlZGJhY2s6IFwiXCIsIC8v55So5oi355WZ6KiAXHJcbiAgICBwcm9kdWN0TnVtOlwiXCIvL+WVhuWTgeaVsOmHj1xyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBzZWxlY3RBZGRyZXNzKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWRkcmVzc19hcGksIFwiYWRkcmVzc19hcGlcIik7XHJcbiAgICAgIHdlcHkuY2hvb3NlQWRkcmVzcyh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudXNlck5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnBvc3RhbENvZGUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnByb3ZpbmNlTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY2l0eU5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvdW50eU5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRldGFpbEluZm8pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLm5hdGlvbmFsQ29kZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGVsTnVtYmVyKTtcclxuICAgICAgICAgIHRoYXQuYWRkcmVzcyA9IGAke3Jlcy5wcm92aW5jZU5hbWV9JHtyZXMuY2l0eU5hbWV9JHtyZXMuY291bnR5TmFtZX0ke3Jlcy5kZXRhaWxJbmZvfWA7XHJcbiAgICAgICAgICB0aGF0LnBlcnNvbk5hbWUgPSBgJHtyZXMudXNlck5hbWV9YDtcclxuICAgICAgICAgIHRoYXQucGhvbmUgPSBgJHtyZXMudGVsTnVtYmVyfWA7XHJcbiAgICAgICAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogdGhhdC5vcmRlcixcclxuICAgICAgICAgICAgICAgIHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBgJHtyZXMucHJvdmluY2VOYW1lfSR7cmVzLmNpdHlOYW1lfSR7cmVzLmNvdW50eU5hbWV9JHtyZXMuZGV0YWlsSW5mb31gLFxyXG4gICAgICAgICAgICAgICAgcGhvbmU6IGAke3Jlcy50ZWxOdW1iZXJ9YCxcclxuICAgICAgICAgICAgICAgIHBlcnNvbk5hbWU6IGAke3Jlcy51c2VyTmFtZX1gXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGF0LmFkZHJlc3NfYXBpLFxyXG4gICAgICAgICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyXCIsIHRoYXQub3JkZXIpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5oYXNBZGRyZXNzID0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc3VibWl0T3JkZXIoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29uc29sZS5sb2codGhpcy5oYXNBZGRyZXNzKTtcclxuICAgICAgaWYgKCF0aGlzLmhhc0FkZHJlc3MpIHtcclxuICAgICAgICB0aXAuYWxlcnQoXCLor7fpgInmi6nmlLbotKflnLDlnYBcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLm9yZGVyLFxyXG4gICAgICAgICAgICBmZWVkYmFjazogdGhpcy5mZWVkYmFja1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGhpcy5fYXBpdXJsLFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgIGxldCBncm91cGlkID0gcmVzLmRhdGEuZGF0YS5ncm91cElkO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAgICAgdGltZVN0YW1wOiByZXMuZGF0YS5kYXRhLnBheURhdGEudGltZVN0YW1wLFxyXG4gICAgICAgICAgICAgIG5vbmNlU3RyOiByZXMuZGF0YS5kYXRhLnBheURhdGEubm9uY2VTdHIsXHJcbiAgICAgICAgICAgICAgcGFja2FnZTogcmVzLmRhdGEuZGF0YS5wYXlEYXRhLnBhY2thZ2UsXHJcbiAgICAgICAgICAgICAgc2lnblR5cGU6IFwiTUQ1XCIsXHJcbiAgICAgICAgICAgICAgcGF5U2lnbjogcmVzLmRhdGEuZGF0YS5wYXlEYXRhLnBheVNpZ24sXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaUr+S7mOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY5oiQ5YqfXCIsIHJlcyx0aGF0LmJ1eXR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuYnV5dHlwZSA9PSBcImdydW9wYnV5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi4vaW52aXRlRmlnaHQvaW52aXRlRmlnaHQ/Z3JvdXBpZD0ke2dyb3VwaWR9YFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5idXl0eXBlID09IFwib25seWJ1eVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi4vaW5kZXgvaW5kZXhgXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+WPlua2iOaUr+S7mFwiKTtcclxuICAgICAgICAgICAgICAgIHRpcC5hbGVydChcIueUqOaIt+WPlua2iOaUr+S7mFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvLyDnlZnoqIBcclxuICAgIGZlZWRCYWNrKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpO1xyXG4gICAgICB0aGlzLmZlZWRiYWNrID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMsIFwib3B0aW9ucyDpobXpnaLmnaXmupBcIik7XHJcbiAgICBsZXQgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xyXG4gICAgdGhpcy5idXl0eXBlID0gb3B0aW9ucy5idXl0eXBlO1xyXG4gICAgLy8gbGV0IG9yZGVyID0gXCI1Ni40Ny43Ny42MVwiO1xyXG4gICAgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5vcmRlcik7XHJcbiAgICBsZXQgX2FwaXVybCA9IFwiXCI7XHJcbiAgICBsZXQgYWRkcmVzc19hcGkgPSBcIlwiO1xyXG4gICAgaWYgKG9wdGlvbnMuYnV5dHlwZSA9PSBcIm9ubHlidXlcIikge1xyXG4gICAgICBfYXBpdXJsID0gYXBpLm9yZGVyU3VtaXQ7XHJcbiAgICAgIGFkZHJlc3NfYXBpID0gYXBpLnNpbmdsZUFkZHJlc3NTdW1pdDtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5idXl0eXBlID09IFwiZ3J1b3BidXlcIikge1xyXG4gICAgICBfYXBpdXJsID0gYXBpLmdyb3VwUGF5O1xyXG4gICAgICBhZGRyZXNzX2FwaSA9IGFwaS5ncm91cEFkZHJlc3NTdW1pdDtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGFwaS5vbmx5QnV5LCBcImFwaVwiKTtcclxuICAgIGNvbnNvbGUubG9nKF9hcGl1cmwsIFwiX2FwaXVybFwiLCBhZGRyZXNzX2FwaSwgXCJhZGRyZXNzX2FwaVwiKTtcclxuICAgIHRoaXMuX2FwaXVybCA9IF9hcGl1cmw7XHJcbiAgICB0aGlzLmFkZHJlc3NfYXBpID0gYWRkcmVzc19hcGk7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgIHsgcXVlcnk6IHsgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSwgb3JkZXI6IG9yZGVyIH0gfSxcclxuICAgICAgYXBpLnNpbmdsZURldGFpbCxcclxuICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCBcIumhtemdoueGn+aNrlwiKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICBsZXQgcHJvZHVjdCA9IHJlcy5kYXRhLmRhdGEuZ29vZHM7XHJcbiAgICAgICAgICBsZXQgcHJvZHVjdE51bSA9IG5ldyBOdW1iZXIoKTtcclxuICAgICAgICAgIHRoYXQucGFnZVByaWNlID0gcmVzLmRhdGEuZGF0YS5vcmRlcjtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHJvZHVjdFtpXS5sb2dvID0gYCR7YXBpLmFwaVVybH0vJHtwcm9kdWN0W2ldLmxvZ299YDtcclxuICAgICAgICAgICAgcHJvZHVjdFtpXS5vcHRpb24gPSBKU09OLnBhcnNlKHByb2R1Y3RbaV0ub3B0aW9uKTtcclxuICAgICAgICAgICAgcHJvZHVjdE51bSArPSBwcm9kdWN0W2ldLm51bVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgIHRoYXQucHJvZHVjdE51bSA9IHByb2R1Y3ROdW07XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19