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
                console.log("支付成功", res);
                wx.navigateTo({
                  url: "../inviteFight/inviteFight?groupid=" + groupid
                });
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
      console.log(options, "options 页面来源");
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Ym1pdE9yZGVyLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJhZGRyZXNzIiwib3JkZXIiLCJwZXJzb25OYW1lIiwicGhvbmUiLCJwcm9kdWN0IiwiaW1nIiwibmFtZSIsInR5cGUiLCJudW0iLCJvbGRwcmljZSIsInByaWNlIiwiaGFzQWRkcmVzcyIsImJ1eXR5cGUiLCJfYXBpdXJsIiwibWV0aG9kcyIsInNlbGVjdEFkZHJlc3MiLCJ0aGF0IiwiY2hvb3NlQWRkcmVzcyIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidXNlck5hbWUiLCJwb3N0YWxDb2RlIiwicHJvdmluY2VOYW1lIiwiY2l0eU5hbWUiLCJjb3VudHlOYW1lIiwiZGV0YWlsSW5mbyIsIm5hdGlvbmFsQ29kZSIsInRlbE51bWJlciIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiaWQiLCJ1aWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiYWRkcmVzc1N1bWl0Iiwic3RhdHVzIiwiJGFwcGx5Iiwic3VibWl0T3JkZXIiLCJhbGVydCIsImdyb3VwaWQiLCJncm91cElkIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJwYXlEYXRhIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwibmF2aWdhdGVUbyIsInVybCIsImZhaWwiLCJvcHRpb25zIiwib25seUJ1eSIsImdyb3VwUGF5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBRUVBLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QjtBQUhqQixLLFFBS1RDLEksR0FB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VUFBSXdDLFFBQVF6QyxPQUFSLElBQWlCLFNBQXJCLEVBQWdDO0FBQzVCQyxrQkFBVSxjQUFJeUMsT0FBZDtBQUNILE9BRkQsTUFFTSxJQUFHRCxRQUFRekMsT0FBUixJQUFpQixVQUFwQixFQUErQjtBQUNqQ0Msa0JBQVUsY0FBSTBDLFFBQWQ7QUFDSDtBQUNEbkMsY0FBUUMsR0FBUixDQUFZUixPQUFaLEVBQW9CLFNBQXBCO0FBQ0EsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsV0FBS3lCLE1BQUw7QUFDQTtBQUNEOzs7O0VBaEkwQixlQUFLa0IsSSIsImZpbGUiOiJzdWJtaXRPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi4vLi4vY29tbS9jb21tXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uLy4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCB3eFJlcXVlc3QgZnJvbSBcIi4uLy4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL2FwaS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5o+Q5Lqk6K6i5Y2VXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMxNjM4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgYWRkcmVzczogXCJcIixcclxuICAgIG9yZGVyOiBcIlwiLFxyXG4gICAgcGVyc29uTmFtZTogXCJcIixcclxuICAgIHBob25lOiBcIlwiLFxyXG4gICAgcHJvZHVjdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS8zNDR4MjA4XCIsXHJcbiAgICAgICAgbmFtZTogXCLnpr7okaHlhbDljJblpoblk4Hoo4XppbDljIXljIVcIixcclxuICAgICAgICB0eXBlOiBcIuWkqeiTneiJslwiLFxyXG4gICAgICAgIG51bTogMixcclxuICAgICAgICBvbGRwcmljZTogMzkuOSxcclxuICAgICAgICBwcmljZTogMTkuOVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS8zNDR4MjA4XCIsXHJcbiAgICAgICAgbmFtZTogXCLnpr7okaHlhbDljJblpoboo4XppbDljIXljIVcIixcclxuICAgICAgICB0eXBlOiBcIuWkqeiTneiJslwiLFxyXG4gICAgICAgIG51bTogMixcclxuICAgICAgICBvbGRwcmljZTogMzkuOSxcclxuICAgICAgICBwcmljZTogMTkuOVxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgaGFzQWRkcmVzczogMCwgLy/liKTmlq3mmK/lkKbloavlhpnlnLDlnYBcclxuICAgIGJ1eXR5cGU6XCJcIiwgICAvL+WIpOaWrei0reS5sOaWueW8jyAgb25seWJ1ee+8muWNleeLrOi0reS5sCAgIGdydW9wYnV577ya5Zui6LStXHJcbiAgICBfYXBpdXJsOlwiXCJcclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgc2VsZWN0QWRkcmVzcygpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3ZXB5LmNob29zZUFkZHJlc3Moe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnVzZXJOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5wb3N0YWxDb2RlKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5wcm92aW5jZU5hbWUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmNpdHlOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb3VudHlOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kZXRhaWxJbmZvKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5uYXRpb25hbENvZGUpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnRlbE51bWJlcik7XHJcbiAgICAgICAgICB0aGF0LmFkZHJlc3MgPSBgJHtyZXMucHJvdmluY2VOYW1lfSR7cmVzLmNpdHlOYW1lfSR7cmVzLmNvdW50eU5hbWV9JHtyZXMuZGV0YWlsSW5mb31gO1xyXG4gICAgICAgICAgdGhhdC5wZXJzb25OYW1lID0gYCR7cmVzLnVzZXJOYW1lfWA7XHJcbiAgICAgICAgICB0aGF0LnBob25lID0gYCR7cmVzLnRlbE51bWJlcn1gO1xyXG4gICAgICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRoYXQub3JkZXIsXHJcbiAgICAgICAgICAgICAgICB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYCR7cmVzLnByb3ZpbmNlTmFtZX0ke3Jlcy5jaXR5TmFtZX0ke3Jlcy5jb3VudHlOYW1lfSR7cmVzLmRldGFpbEluZm99YCxcclxuICAgICAgICAgICAgICAgIHBob25lOiBgJHtyZXMudGVsTnVtYmVyfWAsXHJcbiAgICAgICAgICAgICAgICBwZXJzb25OYW1lOiBgJHtyZXMudXNlck5hbWV9YFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXBpLmFkZHJlc3NTdW1pdCxcclxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcmRlclwiLCB0aGF0Lm9yZGVyKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaGFzQWRkcmVzcyA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHN1Ym1pdE9yZGVyKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGFzQWRkcmVzcyk7XHJcbiAgICAgIGlmICghdGhpcy5oYXNBZGRyZXNzKSB7XHJcbiAgICAgICAgdGlwLmFsZXJ0KFwi6K+36YCJ5oup5pS26LSn5Zyw5Z2AXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgICB7IHF1ZXJ5OiB7IHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksIGlkOiB0aGlzLm9yZGVyIH0gfSxcclxuICAgICAgICB0aGlzLl9hcGl1cmwsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgbGV0IGdyb3VwaWQgPSByZXMuZGF0YS5kYXRhLmdyb3VwSWQ7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICAgICB0aW1lU3RhbXA6IHJlcy5kYXRhLmRhdGEucGF5RGF0YS50aW1lU3RhbXAsXHJcbiAgICAgICAgICAgICAgbm9uY2VTdHI6IHJlcy5kYXRhLmRhdGEucGF5RGF0YS5ub25jZVN0cixcclxuICAgICAgICAgICAgICBwYWNrYWdlOiByZXMuZGF0YS5kYXRhLnBheURhdGEucGFja2FnZSxcclxuICAgICAgICAgICAgICBzaWduVHlwZTogXCJNRDVcIixcclxuICAgICAgICAgICAgICBwYXlTaWduOiByZXMuZGF0YS5kYXRhLnBheURhdGEucGF5U2lnbixcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLmlK/ku5jmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pSv5LuY5oiQ5YqfXCIscmVzKVxyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuLi9pbnZpdGVGaWdodC9pbnZpdGVGaWdodD9ncm91cGlkPSR7Z3JvdXBpZH1gXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLflj5bmtojmlK/ku5hcIilcclxuICAgICAgICAgICAgICAgICAgdGlwLmFsZXJ0KFwi55So5oi35Y+W5raI5pSv5LuYXCIpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyxcIm9wdGlvbnMg6aG16Z2i5p2l5rqQXCIpXHJcbiAgICBsZXQgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xyXG4gICAgdGhpcy5idXl0eXBlID0gb3B0aW9ucy5idXl0eXBlO1xyXG4gICAgLy8gbGV0IG9yZGVyID0gXCI1Ni40Ny43Ny42MVwiO1xyXG4gICAgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5vcmRlcik7XHJcbiAgICBsZXQgX2FwaXVybCA9IFwiXCI7XHJcbiAgICBpZiAob3B0aW9ucy5idXl0eXBlPT0nb25seWJ1eScpIHtcclxuICAgICAgICBfYXBpdXJsID0gYXBpLm9ubHlCdXlcclxuICAgIH1lbHNlIGlmKG9wdGlvbnMuYnV5dHlwZT09J2dydW9wYnV5Jyl7XHJcbiAgICAgICAgX2FwaXVybCA9IGFwaS5ncm91cFBheVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coX2FwaXVybCxcIl9hcGl1cmxcIilcclxuICAgIHRoaXMuX2FwaXVybCA9IF9hcGl1cmw7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgLy8gY29tbS53eFJlcXVlc3QoeyBxdWVyeTogeyB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLG9yZGVyOm9yZGVyfSAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==