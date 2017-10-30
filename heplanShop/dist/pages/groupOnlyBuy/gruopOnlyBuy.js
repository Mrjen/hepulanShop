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
        var goods = {
          goods: this.detail.goods,
          num: this.goodsNum,
          id: this.detail.id,
          option: {
            option: this.detail.option.group,
            value: this.detail.option.options[this.goodsIndex - 1].option
          }
        };
        _comm2.default.wxRequest({ query: { goods: goods, uid: wx.getStorageSync('uid') } }, _api2.default.onlyBuy, function (res) {
          console.log(res);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdydW9wT25seUJ1eS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwiZ3JvdXBfaWQiLCJkZXRhaWwiLCJnb29kc051bSIsImdvb2RzSW5kZXgiLCJuYXZMaXN0IiwidGV4dCIsImFjdGl2ZSIsIm1ldGhvZHMiLCJjaGFuZ2VUeXBlIiwiaW5kZXgiLCJlIiwiY29sb3IiLCJvcHRpb24iLCJvcHRpb25zIiwiaSIsImxlbmd0aCIsIiRhcHBseSIsInRvUnVsZXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xsZWN0IiwidGhhdCIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiZ29vZHMiLCJ1aWQiLCJnZXRTdG9yYWdlU3luYyIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibXNnIiwic3RhdHVzIiwic3VjY2VzcyIsImNoYW5nZURldGFpbCIsImN1dE51bSIsImFkZENhcnQiLCJncm91cCIsImFsZXJ0IiwibnVtIiwidmFsdWUiLCJvbmx5QnV5IiwiaWQiLCJhcGlVcmwiLCJncm91cERldGFpbCIsIl9kZXRhaWwiLCJhcmdzIiwiSlNPTiIsInBhcnNlIiwiZW5kVGltZSIsImRhdGVmb3JtYXQiLCJpbWFnZSIsImxvZ28iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFRUEsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCO0FBSGpCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsY0FBUSxFQUZIO0FBR0xDLGdCQUFVLENBSEwsRUFHUTtBQUNiQyxrQkFBWSxFQUpQLEVBSVc7QUFDaEJDLGVBQVMs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QUwsR0FBYzZDLE9BQWQ7QUFDQXhCLGFBQUtOLE1BQUw7QUFDRCxPQWJIOztBQWdCQWMsY0FBUUMsR0FBUixDQUFZLE1BQVo7QUFDRDs7OztFQXpKMEIsZUFBS3VCLEkiLCJmaWxlIjoiZ3J1b3BPbmx5QnV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBjb21tIGZyb20gXCIuLi8uLi9jb21tL2NvbW1cIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vLi4vY29tbS90aXBcIjtcclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vYXBpL2FwaVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLljZXni6zotK3kubBcIixcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiIzE2MzgyZVwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCIjZmZmXCJcclxuICB9O1xyXG4gIGRhdGEgPSB7XHJcbiAgICBncm91cF9pZDogMCxcclxuICAgIGRldGFpbDoge30sXHJcbiAgICBnb29kc051bTogMSwgLy/llYblk4HmlbDph49cclxuICAgIGdvb2RzSW5kZXg6IFwiXCIsIC8v5ZWG5ZOB6buY6K6k6YCJ5oup57G75Z6LXHJcbiAgICBuYXZMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIuWVhuWTgeivpuaDhVwiLFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCLllYblk4Hlj4LmlbBcIixcclxuICAgICAgICBhY3RpdmU6IGZhbHNlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g6YCJ5oup6aKc6ImyXHJcbiAgICBjaGFuZ2VUeXBlKGluZGV4LCBlKSB7XHJcbiAgICAgIC8vICAgIGNvbnNvbGUubG9nKGluZGV4LGUpXHJcbiAgICAgIGxldCBjb2xvciA9IHRoaXMuZGF0YS5kZXRhaWwub3B0aW9uLm9wdGlvbnM7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb2xvcltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb2xvcltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kYXRhLmRldGFpbC5vcHRpb24ub3B0aW9ucyA9IGNvbG9yO1xyXG4gICAgICB0aGlzLmdvb2RzSW5kZXggPSBpbmRleCsxO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1J1bGVzKGUpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZ2V0Q3VycmVudFBhZ2VzKCkpXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogXCIuLi9ncm91cFJ1bGVzL2dyb3VwUnVsZXNcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDmlLbol49cclxuICAgIGNvbGxlY3QoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHsgZ29vZHM6IHRoYXQuZGV0YWlsLmdvb2RzLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpLkNvbGxlY3QsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGV0YWlsLmNvbGxlY3QgPSB0aGF0LmRldGFpbC5jb2xsZWN0ID09IFwiMVwiID8gXCIwXCIgOiAxO1xyXG4gICAgICAgICAgICB0aXAuc3VjY2VzcyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIC8vIOWIh+aNouWVhuWTgeivpuaDheWSjOWVhuWTgeWPguaVsFxyXG4gICAgY2hhbmdlRGV0YWlsKGluZGV4KSB7XHJcbiAgICAgIGxldCBuYXZMaXN0ID0gdGhpcy5uYXZMaXN0O1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdkxpc3RbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgLy8g5oiW6ICF5YeP5ZWG5ZOB5pWw6YePXHJcbiAgICBjdXROdW0oZSkge1xyXG4gICAgICBpZiAoZSA+IDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtICs9IDE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gPSB0aGlzLmdvb2RzTnVtID4gMSA/ICh0aGlzLmdvb2RzTnVtIC09IDEpIDogMTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8g5Yqg5YWl6LSt54mp6L2mXHJcbiAgICBhZGRDYXJ0KCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGlmICghdGhpcy5nb29kc0luZGV4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwKTtcclxuICAgICAgICB0aXAuYWxlcnQoXCLor7fpgInmi6nllYblk4FcIiArIHRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksXHJcbiAgICAgICAgICAgIGdvb2RzOiB0aGlzLmRldGFpbC5nb29kcyxcclxuICAgICAgICAgICAgbnVtOiB0aGlzLmdvb2RzTnVtLFxyXG4gICAgICAgICAgICBvcHRpb246IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjp0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTp0aGlzLmRldGFpbC5vcHRpb24ub3B0aW9uc1t0aGlzLmdvb2RzSW5kZXgtMV0ub3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwaS5hZGRDYXJ0LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXM9PScxJykge1xyXG4gICAgICAgICAgICAgICAgdGlwLnN1Y2Nlc3MocmVzLmRhdGEuZGF0YS5tc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy8g56uL5Y2z6LSt5LmwXHJcbiAgICBvbmx5QnV5KCl7XHJcbiAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICBsZXQgZ29vZHMgPSB7XHJcbiAgICAgICAgICBnb29kczp0aGlzLmRldGFpbC5nb29kcyxcclxuICAgICAgICAgIG51bTp0aGlzLmdvb2RzTnVtLFxyXG4gICAgICAgICAgaWQ6dGhpcy5kZXRhaWwuaWQsXHJcbiAgICAgICAgICBvcHRpb246e1xyXG4gICAgICAgICAgICAgb3B0aW9uOnRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCxcclxuICAgICAgICAgICAgIHZhbHVlOnRoaXMuZGV0YWlsLm9wdGlvbi5vcHRpb25zW3RoaXMuZ29vZHNJbmRleC0xXS5vcHRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIGNvbW0ud3hSZXF1ZXN0KHtxdWVyeTp7Z29vZHM6Z29vZHMsdWlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1aWQnKX19LGFwaS5vbmx5QnV5LGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgLy8gdGhpcy5ncm91cF9pZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICB0aGlzLmdyb3VwX2lkID0gXCI1Ni4xMTkuNjEuNjFcIjtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBjb25zb2xlLmxvZyhhcGkuYXBpVXJsKTtcclxuICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICB7IHF1ZXJ5OiB7IGlkOiB0aGF0Lmdyb3VwX2lkLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfSB9LFxyXG4gICAgICBhcGkuZ3JvdXBEZXRhaWwsXHJcbiAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgIGxldCBfZGV0YWlsID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICBfZGV0YWlsLmFyZ3MgPSBKU09OLnBhcnNlKF9kZXRhaWwuYXJncyk7XHJcbiAgICAgICAgX2RldGFpbC5vcHRpb24gPSBKU09OLnBhcnNlKF9kZXRhaWwub3B0aW9uKTtcclxuICAgICAgICBfZGV0YWlsLmVuZFRpbWUgPSBjb21tLmRhdGVmb3JtYXQoX2RldGFpbC5lbmRUaW1lKTtcclxuICAgICAgICBfZGV0YWlsLmltYWdlID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmltYWdlfWA7XHJcbiAgICAgICAgX2RldGFpbC5sb2dvID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmxvZ299YDtcclxuICAgICAgICB0aGF0LmRldGFpbCA9IF9kZXRhaWw7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNob3dcIik7XHJcbiAgfVxyXG59XHJcbiJdfQ==