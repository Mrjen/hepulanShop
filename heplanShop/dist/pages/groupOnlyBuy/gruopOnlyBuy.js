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
      navigationBarTitleText: "单独购买",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      group_id: 0,
      detail: {},
      goodsNum: 1, //商品数量
      goodsIndex: "", //商品默认选择类型
      navList: [{
        text: "商品详情",
        active: true
      }, {
        text: "商品参数",
        active: false
      }]
    }, _this.methods = {
      // 选择颜色
      changeType: function changeType(index, e) {
        //    console.log(index,e)
        var color = this.data.detail.option.options;
        for (var i = 0; i < color.length; i++) {
          color[i].active = false;
        }
        color[index].active = true;
        this.data.detail.option.options = color;
        this.goodsIndex = index + 1;
        this.$apply();
      },
      toRules: function toRules(e) {
        // console.log(getCurrentPages())
        wx.navigateTo({
          url: "../groupRules/groupRules"
        });
      },

      // 收藏
      collect: function collect() {
        var that = this;
        _comm2.default.wxRequest({
          query: { goods: that.detail.goods, uid: _wepy2.default.getStorageSync("uid") }
        }, _api2.default.Collect, function (res) {
          console.log(res.data.data.msg);
          if (res.data.status == "1") {
            that.detail.collect = that.detail.collect == "1" ? "0" : 1;
            _tip2.default.success(res.data.data.msg);
            that.$apply();
          }
        });
      },

      // 切换商品详情和商品参数
      changeDetail: function changeDetail(index) {
        var navList = this.navList;
        for (var i = 0; i < navList.length; i++) {
          navList[i].active = false;
        }
        navList[index].active = true;
      },

      // 或者减商品数量
      cutNum: function cutNum(e) {
        if (e > 0) {
          this.goodsNum += 1;
          this.$apply();
        } else if (e < 0) {
          this.goodsNum = this.goodsNum > 1 ? this.goodsNum -= 1 : 1;
          this.$apply();
        }
      },

      // 加入购物车
      addCart: function addCart() {
        var that = this;
        if (!this.goodsIndex) {
          console.log(this.detail.option.group);
          _tip2.default.alert("请选择商品" + this.detail.option.group, 1500);
          return false;
        }
        _comm2.default.wxRequest({
          query: {
            uid: wx.getStorageSync("uid"),
            goods: this.detail.goods,
            num: this.goodsNum,
            option: {
              option: this.detail.option.group,
              value: this.detail.option.options[this.goodsIndex - 1].option
            }
          }
        }, _api2.default.addCart, function (res) {
          console.log(res);
          if (res.data.status == '1') {
            _tip2.default.success(res.data.data.msg);
          }
        });
      },

      // 立即购买
      onlyBuy: function onlyBuy() {
        var that = this;
        if (!this.goodsIndex) {
          console.log(this.detail.option.group);
          _tip2.default.alert("请选择商品" + this.detail.option.group, 1500);
          return false;
        }
        var goods = [{
          goods: this.detail.goods,
          num: this.goodsNum,
          id: this.detail.id,
          option: {
            option: this.detail.option.group,
            value: this.detail.option.options[this.goodsIndex - 1].option
          }
        }];
        _comm2.default.wxRequest({ query: { goods: goods, uid: wx.getStorageSync('uid') } }, _api2.default.onlyBuy, function (res) {
          console.log(res);
          if (res.data.status == '1') {
            wx.navigateTo({
              url: "../submitOrder/submitOrder?order=" + res.data.data.order + "&buytype=onlybuy"
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onLoad",
    value: function onLoad(options) {
      console.log(options);
      // this.group_id = options.id;
      this.group_id = "56.119.61.61";
      this.$apply();
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      console.log(_api2.default.apiUrl);
      _comm2.default.wxRequest({ query: { id: that.group_id, uid: _wepy2.default.getStorageSync("uid") } }, _api2.default.groupDetail, function (res) {
        console.log(res.data.data);
        var _detail = res.data.data;
        _detail.args = JSON.parse(_detail.args);
        _detail.option = JSON.parse(_detail.option);
        _detail.endTime = _comm2.default.dateformat(_detail.endTime);
        _detail.image = _api2.default.apiUrl + "/" + _detail.image;
        _detail.logo = _api2.default.apiUrl + "/" + _detail.logo;
        that.detail = _detail;
        that.$apply();
      });

      console.log("show");
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/groupOnlyBuy/gruopOnlyBuy'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdydW9wT25seUJ1eS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwiZ3JvdXBfaWQiLCJkZXRhaWwiLCJnb29kc051bSIsImdvb2RzSW5kZXgiLCJuYXZMaXN0IiwidGV4dCIsImFjdGl2ZSIsIm1ldGhvZHMiLCJjaGFuZ2VUeXBlIiwiaW5kZXgiLCJlIiwiY29sb3IiLCJvcHRpb24iLCJvcHRpb25zIiwiaSIsImxlbmd0aCIsIiRhcHBseSIsInRvUnVsZXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xsZWN0IiwidGhhdCIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiZ29vZHMiLCJ1aWQiLCJnZXRTdG9yYWdlU3luYyIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibXNnIiwic3RhdHVzIiwic3VjY2VzcyIsImNoYW5nZURldGFpbCIsImN1dE51bSIsImFkZENhcnQiLCJncm91cCIsImFsZXJ0IiwibnVtIiwidmFsdWUiLCJvbmx5QnV5IiwiaWQiLCJvcmRlciIsImFwaVVybCIsImdyb3VwRGV0YWlsIiwiX2RldGFpbCIsImFyZ3MiLCJKU09OIiwicGFyc2UiLCJlbmRUaW1lIiwiZGF0ZWZvcm1hdCIsImltYWdlIiwibG9nbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUVFQSxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0I7QUFIakIsSyxRQUtUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxjQUFRLEVBRkg7QUFHTEMsZ0JBQVUsQ0FITCxFQUdRO0FBQ2JDLGtCQUFZLEVBSlAsRUFJVztBQUNo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QUNBLFlBQUlnRCxVQUFVbEIsSUFBSTlCLElBQUosQ0FBU0EsSUFBdkI7QUFDQWdELGdCQUFRQyxJQUFSLEdBQWVDLEtBQUtDLEtBQUwsQ0FBV0gsUUFBUUMsSUFBbkIsQ0FBZjtBQUNBRCxnQkFBUW5DLE1BQVIsR0FBaUJxQyxLQUFLQyxLQUFMLENBQVdILFFBQVFuQyxNQUFuQixDQUFqQjtBQUNBbUMsZ0JBQVFJLE9BQVIsR0FBa0IsZUFBS0MsVUFBTCxDQUFnQkwsUUFBUUksT0FBeEIsQ0FBbEI7QUFDQUosZ0JBQVFNLEtBQVIsR0FBbUIsY0FBSVIsTUFBdkIsU0FBaUNFLFFBQVFNLEtBQXpDO0FBQ0FOLGdCQUFRTyxJQUFSLEdBQWtCLGNBQUlULE1BQXRCLFNBQWdDRSxRQUFRTyxJQUF4QztBQUNBaEMsYUFBS3JCLE1BQUwsR0FBYzhDLE9BQWQ7QUFDQXpCLGFBQUtOLE1BQUw7QUFDRCxPQWJIOztBQWdCQWMsY0FBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDs7OztFQW5LMEIsZUFBS3dCLEkiLCJmaWxlIjoiZ3J1b3BPbmx5QnV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBjb21tIGZyb20gXCIuLi8uLi9jb21tL2NvbW1cIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vLi4vY29tbS90aXBcIjtcclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vYXBpL2FwaVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLljZXni6zotK3kubBcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzE2MzgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBncm91cF9pZDogMCxcclxuICAgIGRldGFpbDoge30sXHJcbiAgICBnb29kc051bTogMSwgLy/llYblk4HmlbDph49cclxuICAgIGdvb2RzSW5kZXg6IFwiXCIsIC8v5ZWG5ZOB6buY6K6k6YCJ5oup57G75Z6LXHJcbiAgICBuYXZMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIuWVhuWTgeivpuaDhVwiLFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCLllYblk4Hlj4LmlbBcIixcclxuICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g6YCJ5oup6aKc6ImyXHJcbiAgICBjaGFuZ2VUeXBlKGluZGV4LCBlKSB7XHJcbiAgICAgIC8vICAgIGNvbnNvbGUubG9nKGluZGV4LGUpXHJcbiAgICAgIGxldCBjb2xvciA9IHRoaXMuZGF0YS5kZXRhaWwub3B0aW9uLm9wdGlvbnM7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb2xvcltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb2xvcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kYXRhLmRldGFpbC5vcHRpb24ub3B0aW9ucyA9IGNvbG9yO1xyXG4gICAgICB0aGlzLmdvb2RzSW5kZXggPSBpbmRleCsxO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1J1bGVzKGUpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZ2V0Q3VycmVudFBhZ2VzKCkpXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogXCIuLi9ncm91cFJ1bGVzL2dyb3VwUnVsZXNcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDmlLbol49cclxuICAgIGNvbGxlY3QoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHsgZ29vZHM6IHRoYXQuZGV0YWlsLmdvb2RzLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpLkNvbGxlY3QsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGV0YWlsLmNvbGxlY3QgPSB0aGF0LmRldGFpbC5jb2xsZWN0ID09IFwiMVwiID8gXCIwXCIgOiAxO1xyXG4gICAgICAgICAgICB0aXAuc3VjY2VzcyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIC8vIOWIh+aNouWVhuWTgeivpuaDheWSjOWVhuWTgeWPguaVsFxyXG4gICAgY2hhbmdlRGV0YWlsKGluZGV4KSB7XHJcbiAgICAgIGxldCBuYXZMaXN0ID0gdGhpcy5uYXZMaXN0O1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdkxpc3RbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgLy8g5oiW6ICF5YeP5ZWG5ZOB5pWw6YePXHJcbiAgICBjdXROdW0oZSkge1xyXG4gICAgICBpZiAoZSA+IDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtICs9IDE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtID4gMSA/ICh0aGlzLmdvb2RzTnVtIC09IDEpIDogMTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5Yqg5YWl6LSt54mp6L2mXHJcbiAgICBhZGRDYXJ0KCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGlmICghdGhpcy5nb29kc0luZGV4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwKTtcclxuICAgICAgICB0aXAuYWxlcnQoXCLor7fpgInmi6nllYblk4FcIiArIHRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksXHJcbiAgICAgICAgICAgIGdvb2RzOiB0aGlzLmRldGFpbC5nb29kcyxcclxuICAgICAgICAgICAgbnVtOiB0aGlzLmdvb2RzTnVtLFxyXG4gICAgICAgICAgICBvcHRpb246IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjp0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTp0aGlzLmRldGFpbC5vcHRpb24ub3B0aW9uc1t0aGlzLmdvb2RzSW5kZXgtMV0ub3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwaS5hZGRDYXJ0LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXM9PScxJykge1xyXG4gICAgICAgICAgICAgICAgdGlwLnN1Y2Nlc3MocmVzLmRhdGEuZGF0YS5tc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy8g56uL5Y2z6LSt5LmwXHJcbiAgICBvbmx5QnV5KCl7XHJcbiAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICBpZiAoIXRoaXMuZ29vZHNJbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCk7XHJcbiAgICAgICAgdGlwLmFsZXJ0KFwi6K+36YCJ5oup5ZWG5ZOBXCIgKyB0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAgbGV0IGdvb2RzID0gW3tcclxuICAgICAgICAgIGdvb2RzOnRoaXMuZGV0YWlsLmdvb2RzLFxyXG4gICAgICAgICAgbnVtOnRoaXMuZ29vZHNOdW0sXHJcbiAgICAgICAgICBpZDp0aGlzLmRldGFpbC5pZCxcclxuICAgICAgICAgIG9wdGlvbjp7XHJcbiAgICAgICAgICAgICBvcHRpb246dGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwLFxyXG4gICAgICAgICAgICAgdmFsdWU6dGhpcy5kZXRhaWwub3B0aW9uLm9wdGlvbnNbdGhpcy5nb29kc0luZGV4LTFdLm9wdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgfV1cclxuICAgICAgIGNvbW0ud3hSZXF1ZXN0KHtxdWVyeTp7Z29vZHM6Z29vZHMsdWlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1aWQnKX19LGFwaS5vbmx5QnV5LGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cz09JzEnKSB7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogYC4uL3N1Ym1pdE9yZGVyL3N1Ym1pdE9yZGVyP29yZGVyPSR7cmVzLmRhdGEuZGF0YS5vcmRlcn0mYnV5dHlwZT1vbmx5YnV5YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICB9XHJcbiAgICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcclxuICAgIC8vIHRoaXMuZ3JvdXBfaWQgPSBvcHRpb25zLmlkO1xyXG4gICAgdGhpcy5ncm91cF9pZCA9IFwiNTYuMTE5LjYxLjYxXCI7XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gIH1cclxuXHJcbiAgb25TaG93KCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc29sZS5sb2coYXBpLmFwaVVybCk7XHJcbiAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgeyBxdWVyeTogeyBpZDogdGhhdC5ncm91cF9pZCwgdWlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpIH0gfSxcclxuICAgICAgYXBpLmdyb3VwRGV0YWlsLFxyXG4gICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICBsZXQgX2RldGFpbCA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgX2RldGFpbC5hcmdzID0gSlNPTi5wYXJzZShfZGV0YWlsLmFyZ3MpO1xyXG4gICAgICAgIF9kZXRhaWwub3B0aW9uID0gSlNPTi5wYXJzZShfZGV0YWlsLm9wdGlvbik7XHJcbiAgICAgICAgX2RldGFpbC5lbmRUaW1lID0gY29tbS5kYXRlZm9ybWF0KF9kZXRhaWwuZW5kVGltZSk7XHJcbiAgICAgICAgX2RldGFpbC5pbWFnZSA9IGAke2FwaS5hcGlVcmx9LyR7X2RldGFpbC5pbWFnZX1gO1xyXG4gICAgICAgIF9kZXRhaWwubG9nbyA9IGAke2FwaS5hcGlVcmx9LyR7X2RldGFpbC5sb2dvfWA7XHJcbiAgICAgICAgdGhhdC5kZXRhaWwgPSBfZGV0YWlsO1xyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzaG93XCIpO1xyXG4gIH1cclxufVxyXG4iXX0=