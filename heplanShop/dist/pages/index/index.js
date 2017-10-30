"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _swiper = require('./../../components/swiper.js');

var _swiper2 = _interopRequireDefault(_swiper);

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
      navigationBarTitleText: "禾葡兰护肤商城",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      productRow: [],
      productNav: [{
        text: "最热",
        active: true
      }, {
        text: "最新",
        active: false
      }],
      productList: [{
        img: "http://iph.href.lu/704x220",
        name: "倾慕丰润口红",
        price: "380"
      }, {
        img: "http://iph.href.lu/704x220",
        name: "倾慕丰润口红",
        price: "380"
      }, {
        img: "http://iph.href.lu/704x220",
        name: "倾慕丰润口红",
        price: "380"
      }],
      pageTime: "00:00:00",
      imgUrls: []
    }, _this.methods = {
      changeNav: function changeNav(e) {
        var productNav = this.productNav;
        for (var i = 0; i < productNav.length; i++) {
          productNav[i].active = false;
        }
        productNav[e].active = true;
        this.productNav = productNav;
        console.log(this);
        this.$apply();
      },
      searchSubmit: function searchSubmit() {
        console.log("搜索了");
      }
    }, _this.watch = {
      pageTime: function pageTime(newValue, oldValue) {
        //   console.log(`num value: ${oldValue} -> ${newValue}`)
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onShow",
    value: function onShow() {
      console.log("show index");
      var that = this;
      var imgUrls = this.imgUrls;
      _comm2.default.wxRequest({ query: {} }, _api2.default.Home, function (res) {
        // console.log(res);
        var imgUrls = res.data.data.banner;
        var productRow = res.data.data.group;
        var productList = res.data.data.sellGoods;
        for (var i = 0; i < imgUrls.length; i++) {
          imgUrls[i].image = "" + res.data.data.domain + imgUrls[i].image;
        }
        for (var _i = 0; _i < productRow.length; _i++) {
          productRow[_i].logo = "" + res.data.data.domain + productRow[_i].logo;
        }
        for (var _i2 = 0; _i2 < productList.length; _i2++) {
          // console.log(productList[i].goods)
          for (var j = 0; j < productList[_i2].goods.length; j++) {
            productList[_i2].goods[j].logo = "" + res.data.data.domain + productList[_i2].goods[j].logo;
          }
        }
        that.productRow = productRow;
        that.imgUrls = imgUrls;
        that.productList = productList;
        that.$apply();
      });
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      var that = this;
      console.log("onLoad  index");
      _comm2.default.getSign(function (res) {
        _comm2.default.wxRequest({ query: {} }, _api2.default.Home, function (res) {
          console.log(res.data.data.time);
          var time = res.data.data.time * 1000;
          // let time = 10000;
          var _time = setInterval(function () {
            time -= 1000;
            if (time == "0") {
              clearInterval(_time);
              that.pageTime = "00:00:00";
              that.$apply();
            } else {
              that.pageTime = _comm2.default.dateformat(time);
              that.$apply();
            }
            //    console.log(that.pageTime)
          }, 1000);
        });
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage() {
      console.log("转发");
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJwcm9kdWN0Um93IiwicHJvZHVjdE5hdiIsInRleHQiLCJhY3RpdmUiLCJwcm9kdWN0TGlzdCIsImltZyIsIm5hbWUiLCJwcmljZSIsInBhZ2VUaW1lIiwiaW1nVXJscyIsIm1ldGhvZHMiLCJjaGFuZ2VOYXYiLCJlIiwiaSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJzZWFyY2hTdWJtaXQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJ0aGF0Iiwid3hSZXF1ZXN0IiwicXVlcnkiLCJIb21lIiwicmVzIiwiYmFubmVyIiwiZ3JvdXAiLCJzZWxsR29vZHMiLCJpbWFnZSIsImRvbWFpbiIsImxvZ28iLCJqIiwiZ29vZHMiLCJnZXRTaWduIiwidGltZSIsIl90aW1lIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiZGF0ZWZvcm1hdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBRUVBLE0sR0FBUztBQUNQQyw4QkFBd0IsU0FEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QjtBQUhqQixLLFFBTVRDLEksR0FBTztBQUNMQyxrQkFBWSxFQURQO0FBRUxDLGtCQUFZLENBQ1Y7QUFDRUMsY0FBTSxJQURSO0FBRUVDLGdCQUFRO0FBRlYsT0FEVSxFQUtWO0FBQ0VELGNBQU0sSUFEUjtBQUVFQyxnQkFBUTtBQUZWLE9BTFUsQ0FGUDtBQVlMQyxtQkFBYSxDQUNYO0FBQ0VDLGFBQUssNEJBRFA7QUFFRUMsY0FBTSxRQUZSO0FBR0VDLGVBQU87QUFIVCxPQURXLEVB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QUFYO0FBQ0FQLGNBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EscUJBQUttQixPQUFMLENBQWEsVUFBU1QsR0FBVCxFQUFjO0FBQ3pCLHVCQUFLSCxTQUFMLENBQWUsRUFBRUMsT0FBTyxFQUFULEVBQWYsRUFBOEIsY0FBSUMsSUFBbEMsRUFBd0MsVUFBU0MsR0FBVCxFQUFjO0FBQ3BEWCxrQkFBUUMsR0FBUixDQUFZVSxJQUFJM0IsSUFBSixDQUFTQSxJQUFULENBQWNxQyxJQUExQjtBQUNBLGNBQUlBLE9BQU9WLElBQUkzQixJQUFKLENBQVNBLElBQVQsQ0FBY3FDLElBQWQsR0FBcUIsSUFBaEM7QUFDQTtBQUNBLGNBQUlDLFFBQVFDLFlBQVksWUFBTTtBQUM1QkYsb0JBQVEsSUFBUjtBQUNBLGdCQUFJQSxRQUFRLEdBQVosRUFBaUI7QUFDZkcsNEJBQWNGLEtBQWQ7QUFDQWYsbUJBQUtkLFFBQUwsR0FBZ0IsVUFBaEI7QUFDQWMsbUJBQUtMLE1BQUw7QUFDRCxhQUpELE1BSU87QUFDTEssbUJBQUtkLFFBQUwsR0FBZ0IsZUFBS2dDLFVBQUwsQ0FBZ0JKLElBQWhCLENBQWhCO0FBQ0FkLG1CQUFLTCxNQUFMO0FBQ0Q7QUFDRDtBQUNELFdBWFcsRUFXVCxJQVhTLENBQVo7QUFZRCxTQWhCRDtBQWlCRCxPQWxCRDtBQW1CRDs7O3dDQUVtQjtBQUNsQkYsY0FBUUMsR0FBUixDQUFZLElBQVo7QUFDRDs7OztFQXBIMEIsZUFBS3lCLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IFN3aXBlciBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9zd2lwZXJcIjtcclxuaW1wb3J0IGNvbW0gZnJvbSBcIi4uLy4uL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi8uLi9jb21tL3RpcFwiO1xyXG5cclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vYXBpL2FwaVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLnpr7okaHlhbDmiqTogqTllYbln45cIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzE2MzgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCJcclxuICB9O1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcHJvZHVjdFJvdzogW10sXHJcbiAgICBwcm9kdWN0TmF2OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIuacgOeDrVwiLFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCLmnIDmlrBcIixcclxuICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBwcm9kdWN0TGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS83MDR4MjIwXCIsXHJcbiAgICAgICAgbmFtZTogXCLlgL7mhZXkuLDmtqblj6PnuqJcIixcclxuICAgICAgICBwcmljZTogXCIzODBcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS83MDR4MjIwXCIsXHJcbiAgICAgICAgbmFtZTogXCLlgL7mhZXkuLDmtqblj6PnuqJcIixcclxuICAgICAgICBwcmljZTogXCIzODBcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS83MDR4MjIwXCIsXHJcbiAgICAgICAgbmFtZTogXCLlgL7mhZXkuLDmtqblj6PnuqJcIixcclxuICAgICAgICBwcmljZTogXCIzODBcIlxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgcGFnZVRpbWU6IFwiMDA6MDA6MDBcIixcclxuICAgIGltZ1VybHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGNoYW5nZU5hdihlKSB7XHJcbiAgICAgIGxldCBwcm9kdWN0TmF2ID0gdGhpcy5wcm9kdWN0TmF2O1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y3ROYXYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwcm9kdWN0TmF2W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb2R1Y3ROYXZbZV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5wcm9kdWN0TmF2ID0gcHJvZHVjdE5hdjtcclxuICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG4gICAgc2VhcmNoU3VibWl0KCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuaQnOe0ouS6hlwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInNob3cgaW5kZXhcIik7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBsZXQgaW1nVXJscyA9IHRoaXMuaW1nVXJscztcclxuICAgIGNvbW0ud3hSZXF1ZXN0KHsgcXVlcnk6IHt9IH0sIGFwaS5Ib21lLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgbGV0IGltZ1VybHMgPSByZXMuZGF0YS5kYXRhLmJhbm5lcjtcclxuICAgICAgbGV0IHByb2R1Y3RSb3cgPSByZXMuZGF0YS5kYXRhLmdyb3VwO1xyXG4gICAgICBsZXQgcHJvZHVjdExpc3QgPSByZXMuZGF0YS5kYXRhLnNlbGxHb29kcztcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWdVcmxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW1nVXJsc1tpXS5pbWFnZSA9IGAke3Jlcy5kYXRhLmRhdGEuZG9tYWlufSR7aW1nVXJsc1tpXS5pbWFnZX1gO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdFJvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHByb2R1Y3RSb3dbaV0ubG9nbyA9IGAke3Jlcy5kYXRhLmRhdGEuZG9tYWlufSR7cHJvZHVjdFJvd1tpXS5sb2dvfWA7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RMaXN0W2ldLmdvb2RzKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvZHVjdExpc3RbaV0uZ29vZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIHByb2R1Y3RMaXN0W2ldLmdvb2RzW2pdLmxvZ28gPSBgJHtyZXMuZGF0YS5kYXRhLmRvbWFpbn0ke3Byb2R1Y3RMaXN0W2ldLmdvb2RzW2pdLmxvZ299YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhhdC5wcm9kdWN0Um93ID0gcHJvZHVjdFJvdztcclxuICAgICAgdGhhdC5pbWdVcmxzID0gaW1nVXJscztcclxuICAgICAgdGhhdC5wcm9kdWN0TGlzdCA9IHByb2R1Y3RMaXN0O1xyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB3YXRjaCA9IHtcclxuICAgIHBhZ2VUaW1lKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGBudW0gdmFsdWU6ICR7b2xkVmFsdWV9IC0+ICR7bmV3VmFsdWV9YClcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uTG9hZCAgaW5kZXhcIik7XHJcbiAgICBjb21tLmdldFNpZ24oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KHsgcXVlcnk6IHt9IH0sIGFwaS5Ib21lLCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnRpbWUpO1xyXG4gICAgICAgIGxldCB0aW1lID0gcmVzLmRhdGEuZGF0YS50aW1lICogMTAwMDtcclxuICAgICAgICAvLyBsZXQgdGltZSA9IDEwMDAwO1xyXG4gICAgICAgIGxldCBfdGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgIHRpbWUgLT0gMTAwMDtcclxuICAgICAgICAgIGlmICh0aW1lID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RpbWUpO1xyXG4gICAgICAgICAgICB0aGF0LnBhZ2VUaW1lID0gXCIwMDowMDowMFwiO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhhdC5wYWdlVGltZSA9IGNvbW0uZGF0ZWZvcm1hdCh0aW1lKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKHRoYXQucGFnZVRpbWUpXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwi6L2s5Y+RXCIpO1xyXG4gIH1cclxufVxyXG4iXX0=