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
      var _detailurl = "";
      if (options.buytype == "onlybuy") {
        _apiurl = _api2.default.orderSumit;
        address_api = _api2.default.singleAddressSumit;
        _detailurl = _api2.default.singleDetail;
      } else if (options.buytype == "gruopbuy") {
        _apiurl = _api2.default.groupPay;
        address_api = _api2.default.groupAddressSumit;
        _detailurl = _api2.default.groupOrderDetail;
      }
      console.log(_api2.default.onlyBuy, "api");
      console.log(_apiurl, "_apiurl", address_api, "address_api");
      this._apiurl = _apiurl;
      this.address_api = address_api;
      this.$apply();
      _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid"), order: order } }, _detailurl, function (res) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Ym1pdE9yZGVyLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJhZGRyZXNzIiwib3JkZXIiLCJwZXJzb25OYW1lIiwicGhvbmUiLCJwcm9kdWN0IiwiaW1nIiwibmFtZSIsInR5cGUiLCJudW0iLCJvbGRwcmljZSIsInByaWNlIiwiaGFzQWRkcmVzcyIsImJ1eXR5cGUiLCJfYXBpdXJsIiwicGFnZVByaWNlIiwiZmVlZGJhY2siLCJwcm9kdWN0TnVtIiwibWV0aG9kcyIsInNlbGVjdEFkZHJlc3MiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsImFkZHJlc3NfYXBpIiwiY2hvb3NlQWRkcmVzcyIsInN1Y2Nlc3MiLCJyZXMiLCJ1c2VyTmFtZSIsInBvc3RhbENvZGUiLCJwcm92aW5jZU5hbWUiLCJjaXR5TmFtZSIsImNvdW50eU5hbWUiLCJkZXRhaWxJbmZvIiwibmF0aW9uYWxDb2RlIiwidGVsTnVtYmVyIiwid3hSZXF1ZXN0IiwicXVlcnkiLCJpZCIsInVpZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGF0dXMiLCIkYXBwbHkiLCJzdWJtaXRPcmRlciIsImFsZXJ0IiwiZ3JvdXBpZCIsImdyb3VwSWQiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsInBheURhdGEiLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInBheVNpZ24iLCJuYXZpZ2F0ZVRvIiwidXJsIiwic3dpdGNoVGFiIiwiZmFpbCIsImZlZWRCYWNrIiwiZSIsImRldGFpbCIsInZhbHVlIiwib3B0aW9ucyIsIl9kZXRhaWx1cmwiLCJvcmRlclN1bWl0Iiwic2luZ2xlQWRkcmVzc1N1bWl0Iiwic2luZ2xlRGV0YWlsIiwiZ3JvdXBQYXkiLCJncm91cEFkZHJlc3NTdW1pdCIsImdyb3VwT3JkZXJEZXRhaWwiLCJvbmx5QnV5IiwiZ29vZHMiLCJOdW1iZXIiLCJpIiwibGVuZ3RoIiwibG9nbyIsImFwaVVybCIsIm9wdGlvbiIsIkpTT04iLCJwYXJzZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUVFQSxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0I7QUFIakIsSyxRQUtUQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLGFBQU8sRUFGRjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGFBQU8sRUFKRjtBQUtMQyxlQUFTLENBQ1A7QUFDRUMsYUFBSyw0QkFEUDtBQUVFQyxjQUFNLFlBRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGFBQUssQ0FKUDtBQUtFQyxrQkFBVSxJQUxaO0FBTUVDLGVBQU87QUFOVCxPQURPLEVBU1A7QUFDRUwsYUFBSyw0QkFEUDtBQUVFQyxjQUFNLFdBRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGFBQUssQ0FKUDtBQUtFQyxrQkFBVSxJQUxaO0FBTUVDLGVBQU87QUFOVCxPQVRPLENBTEo7QUF1QkxDLGtCQUFZLENBdkJQLEVBdUJVO0FBQ2ZDLGVBQVMsRUF4QkosRUF3QlE7QUFDYkMsZUFBUyxFQXpCSjtBQTBCTEMsaUJBQVcsRUExQk4sRUEwQlU7QUFDZkMsZ0JBQVUsRUEzQkwsRUEyQlM7QUFDZEMsa0JBQVcsRUE1Qk4sQ0E0QlE7QUE1QlIsSyxRQStCUEMsTyxHQUFVO0FBQ1JDLG1CQURRLDJCQUNRO0FBQ2QsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS0MsV0FBakIsRUFBOEIsYUFBOUI7QUFDQSx1QkFBS0MsYUFBTCxDQUFtQjtBQUNqQkMsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkwsb0JBQVFDLEdBQVIsQ0FBWUksSUFBSUMsUUFBaEI7QUFDQU4sb0JBQVFDLEdB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LEVBQVdJLE1BQVgsR0FBb0JDLEtBQUtDLEtBQUwsQ0FBVzFFLFFBQVFvRSxDQUFSLEVBQVdJLE1BQXRCLENBQXBCO0FBQ0E1RCwwQkFBY1osUUFBUW9FLENBQVIsRUFBV2hFLEdBQXpCO0FBQ0Q7QUFDRFcsZUFBS2YsT0FBTCxHQUFlQSxPQUFmO0FBQ0FlLGVBQUtILFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0FHLGVBQUtzQixNQUFMO0FBQ0Q7QUFDRixPQXBCSDtBQXNCRDs7OztFQW5MMEIsZUFBS3NDLEkiLCJmaWxlIjoic3VibWl0T3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IGNvbW0gZnJvbSBcIi4uLy4uL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi8uLi9jb21tL3RpcFwiO1xyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuLi8uLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaPkOS6pOiuouWNlVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGFkZHJlc3M6IFwiXCIsXHJcbiAgICBvcmRlcjogXCJcIixcclxuICAgIHBlcnNvbk5hbWU6IFwiXCIsXHJcbiAgICBwaG9uZTogXCJcIixcclxuICAgIHByb2R1Y3Q6IFtcclxuICAgICAge1xyXG4gICAgICAgIGltZzogXCJodHRwOi8vaXBoLmhyZWYubHUvMzQ0eDIwOFwiLFxyXG4gICAgICAgIG5hbWU6IFwi56a+6JGh5YWw5YyW5aaG5ZOB6KOF6aWw5YyF5YyFXCIsXHJcbiAgICAgICAgdHlwZTogXCLlpKnok53oibJcIixcclxuICAgICAgICBudW06IDIsXHJcbiAgICAgICAgb2xkcHJpY2U6IDM5LjksXHJcbiAgICAgICAgcHJpY2U6IDE5LjlcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGltZzogXCJodHRwOi8vaXBoLmhyZWYubHUvMzQ0eDIwOFwiLFxyXG4gICAgICAgIG5hbWU6IFwi56a+6JGh5YWw5YyW5aaG6KOF6aWw5YyF5YyFXCIsXHJcbiAgICAgICAgdHlwZTogXCLlpKnok53oibJcIixcclxuICAgICAgICBudW06IDIsXHJcbiAgICAgICAgb2xkcHJpY2U6IDM5LjksXHJcbiAgICAgICAgcHJpY2U6IDE5LjlcclxuICAgICAgfVxyXG4gICAgXSxcclxuICAgIGhhc0FkZHJlc3M6IDAsIC8v5Yik5pat5piv5ZCm5aGr5YaZ5Zyw5Z2AXHJcbiAgICBidXl0eXBlOiBcIlwiLCAvL+WIpOaWrei0reS5sOaWueW8jyAgb25seWJ1ee+8muWNleeLrOi0reS5sCAgIGdydW9wYnV577ya5Zui6LStXHJcbiAgICBfYXBpdXJsOiBcIlwiLFxyXG4gICAgcGFnZVByaWNlOiBcIlwiLCAvLyAg6aG16Z2i5ZCI6K6h5Lu35qC85pWw5o2uXHJcbiAgICBmZWVkYmFjazogXCJcIiwgLy/nlKjmiLfnlZnoqIBcclxuICAgIHByb2R1Y3ROdW06XCJcIi8v5ZWG5ZOB5pWw6YePXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHNlbGVjdEFkZHJlc3MoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29uc29sZS5sb2codGhpcy5hZGRyZXNzX2FwaSwgXCJhZGRyZXNzX2FwaVwiKTtcclxuICAgICAgd2VweS5jaG9vc2VBZGRyZXNzKHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51c2VyTmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucG9zdGFsQ29kZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucHJvdmluY2VOYW1lKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5jaXR5TmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuY291bnR5TmFtZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGV0YWlsSW5mbyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMubmF0aW9uYWxDb2RlKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50ZWxOdW1iZXIpO1xyXG4gICAgICAgICAgdGhhdC5hZGRyZXNzID0gYCR7cmVzLnByb3ZpbmNlTmFtZX0ke3Jlcy5jaXR5TmFtZX0ke3Jlcy5jb3VudHlOYW1lfSR7cmVzLmRldGFpbEluZm99YDtcclxuICAgICAgICAgIHRoYXQucGVyc29uTmFtZSA9IGAke3Jlcy51c2VyTmFtZX1gO1xyXG4gICAgICAgICAgdGhhdC5waG9uZSA9IGAke3Jlcy50ZWxOdW1iZXJ9YDtcclxuICAgICAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGF0Lm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGAke3Jlcy5wcm92aW5jZU5hbWV9JHtyZXMuY2l0eU5hbWV9JHtyZXMuY291bnR5TmFtZX0ke3Jlcy5kZXRhaWxJbmZvfWAsXHJcbiAgICAgICAgICAgICAgICBwaG9uZTogYCR7cmVzLnRlbE51bWJlcn1gLFxyXG4gICAgICAgICAgICAgICAgcGVyc29uTmFtZTogYCR7cmVzLnVzZXJOYW1lfWBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRoYXQuYWRkcmVzc19hcGksXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3JkZXJcIiwgdGhhdC5vcmRlcik7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmhhc0FkZHJlc3MgPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzdWJtaXRPcmRlcigpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmhhc0FkZHJlc3MpO1xyXG4gICAgICBpZiAoIXRoaXMuaGFzQWRkcmVzcykge1xyXG4gICAgICAgIHRpcC5hbGVydChcIuivt+mAieaLqeaUtui0p+WcsOWdgFwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgaWQ6IHRoaXMub3JkZXIsXHJcbiAgICAgICAgICAgIGZlZWRiYWNrOiB0aGlzLmZlZWRiYWNrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aGlzLl9hcGl1cmwsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgbGV0IGdyb3VwaWQgPSByZXMuZGF0YS5kYXRhLmdyb3VwSWQ7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAgICAgICAgICB0aW1lU3RhbXA6IHJlcy5kYXRhLmRhdGEucGF5RGF0YS50aW1lU3RhbXAsXHJcbiAgICAgICAgICAgICAgbm9uY2VTdHI6IHJlcy5kYXRhLmRhdGEucGF5RGF0YS5ub25jZVN0cixcclxuICAgICAgICAgICAgICBwYWNrYWdlOiByZXMuZGF0YS5kYXRhLnBheURhdGEucGFja2FnZSxcclxuICAgICAgICAgICAgICBzaWduVHlwZTogXCJNRDVcIixcclxuICAgICAgICAgICAgICBwYXlTaWduOiByZXMuZGF0YS5kYXRhLnBheURhdGEucGF5U2lnbixcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5pSv5LuY5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlK/ku5jmiJDlip9cIiwgcmVzLHRoYXQuYnV5dHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5idXl0eXBlID09IFwiZ3J1b3BidXlcIikge1xyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuLi9pbnZpdGVGaWdodC9pbnZpdGVGaWdodD9ncm91cGlkPSR7Z3JvdXBpZH1gXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0LmJ1eXR5cGUgPT0gXCJvbmx5YnV5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuLi9pbmRleC9pbmRleGBcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35Y+W5raI5pSv5LuYXCIpO1xyXG4gICAgICAgICAgICAgICAgdGlwLmFsZXJ0KFwi55So5oi35Y+W5raI5pSv5LuYXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIC8vIOeVmeiogFxyXG4gICAgZmVlZEJhY2soZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuZmVlZGJhY2sgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc29sZS5sb2cob3B0aW9ucywgXCJvcHRpb25zIOmhtemdouadpea6kFwiKTtcclxuICAgIGxldCBvcmRlciA9IG9wdGlvbnMub3JkZXI7XHJcbiAgICB0aGlzLmJ1eXR5cGUgPSBvcHRpb25zLmJ1eXR5cGU7XHJcbiAgICAvLyBsZXQgb3JkZXIgPSBcIjU2LjQ3Ljc3LjYxXCI7XHJcbiAgICB0aGlzLm9yZGVyID0gb3JkZXI7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyKTtcclxuICAgIGxldCBfYXBpdXJsID0gXCJcIjtcclxuICAgIGxldCBhZGRyZXNzX2FwaSA9IFwiXCI7XHJcbiAgICBsZXQgX2RldGFpbHVybCA9IFwiXCI7XHJcbiAgICBpZiAob3B0aW9ucy5idXl0eXBlID09IFwib25seWJ1eVwiKSB7XHJcbiAgICAgIF9hcGl1cmwgPSBhcGkub3JkZXJTdW1pdDtcclxuICAgICAgYWRkcmVzc19hcGkgPSBhcGkuc2luZ2xlQWRkcmVzc1N1bWl0O1xyXG4gICAgICBfZGV0YWlsdXJsID0gYXBpLnNpbmdsZURldGFpbFxyXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmJ1eXR5cGUgPT0gXCJncnVvcGJ1eVwiKSB7XHJcbiAgICAgIF9hcGl1cmwgPSBhcGkuZ3JvdXBQYXk7XHJcbiAgICAgIGFkZHJlc3NfYXBpID0gYXBpLmdyb3VwQWRkcmVzc1N1bWl0O1xyXG4gICAgICBfZGV0YWlsdXJsID0gYXBpLmdyb3VwT3JkZXJEZXRhaWxcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGFwaS5vbmx5QnV5LCBcImFwaVwiKTtcclxuICAgIGNvbnNvbGUubG9nKF9hcGl1cmwsIFwiX2FwaXVybFwiLCBhZGRyZXNzX2FwaSwgXCJhZGRyZXNzX2FwaVwiKTtcclxuICAgIHRoaXMuX2FwaXVybCA9IF9hcGl1cmw7XHJcbiAgICB0aGlzLmFkZHJlc3NfYXBpID0gYWRkcmVzc19hcGk7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgIHsgcXVlcnk6IHsgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSwgb3JkZXI6IG9yZGVyIH0gfSxcclxuICAgICAgX2RldGFpbHVybCxcclxuICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCBcIumhtemdoueGn+aNrlwiKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICBsZXQgcHJvZHVjdCA9IHJlcy5kYXRhLmRhdGEuZ29vZHM7XHJcbiAgICAgICAgICBsZXQgcHJvZHVjdE51bSA9IG5ldyBOdW1iZXIoKTtcclxuICAgICAgICAgIHRoYXQucGFnZVByaWNlID0gcmVzLmRhdGEuZGF0YS5vcmRlcjtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHJvZHVjdFtpXS5sb2dvID0gYCR7YXBpLmFwaVVybH0vJHtwcm9kdWN0W2ldLmxvZ299YDtcclxuICAgICAgICAgICAgcHJvZHVjdFtpXS5vcHRpb24gPSBKU09OLnBhcnNlKHByb2R1Y3RbaV0ub3B0aW9uKTtcclxuICAgICAgICAgICAgcHJvZHVjdE51bSArPSBwcm9kdWN0W2ldLm51bVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICAgIHRoYXQucHJvZHVjdE51bSA9IHByb2R1Y3ROdW07XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19