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
      this.group_id = options.id;
      // this.group_id = "56.119.61.61";
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdydW9wT25seUJ1eS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwiZ3JvdXBfaWQiLCJkZXRhaWwiLCJnb29kc051bSIsImdvb2RzSW5kZXgiLCJuYXZMaXN0IiwidGV4dCIsImFjdGl2ZSIsIm1ldGhvZHMiLCJjaGFuZ2VUeXBlIiwiaW5kZXgiLCJlIiwiY29sb3IiLCJvcHRpb24iLCJvcHRpb25zIiwiaSIsImxlbmd0aCIsIiRhcHBseSIsInRvUnVsZXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xsZWN0IiwidGhhdCIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiZ29vZHMiLCJ1aWQiLCJnZXRTdG9yYWdlU3luYyIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibXNnIiwic3RhdHVzIiwic3VjY2VzcyIsImNoYW5nZURldGFpbCIsImN1dE51bSIsImFkZENhcnQiLCJncm91cCIsImFsZXJ0IiwibnVtIiwidmFsdWUiLCJvbmx5QnV5IiwiaWQiLCJvcmRlciIsImFwaVVybCIsImdyb3VwRGV0YWlsIiwiX2RldGFpbCIsImFyZ3MiLCJKU09OIiwicGFyc2UiLCJlbmRUaW1lIiwiZGF0ZWZvcm1hdCIsImltYWdlIiwibG9nbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUVFQSxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0I7QUFIakIsSyxRQUtUQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxjQUFRLEVBRkg7QUFHTEMsZ0JBQVUsQ0FITCxFQUdRO0FBQ2JDLGtCQUFZLEVBSlAsRUFJVztBQUNo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LElBQXJCO0FBQ0EsWUFBSWdELFVBQVVsQixJQUFJOUIsSUFBSixDQUFTQSxJQUF2QjtBQUNBZ0QsZ0JBQVFDLElBQVIsR0FBZUMsS0FBS0MsS0FBTCxDQUFXSCxRQUFRQyxJQUFuQixDQUFmO0FBQ0FELGdCQUFRbkMsTUFBUixHQUFpQnFDLEtBQUtDLEtBQUwsQ0FBV0gsUUFBUW5DLE1BQW5CLENBQWpCO0FBQ0FtQyxnQkFBUUksT0FBUixHQUFrQixlQUFLQyxVQUFMLENBQWdCTCxRQUFRSSxPQUF4QixDQUFsQjtBQUNBSixnQkFBUU0sS0FBUixHQUFtQixjQUFJUixNQUF2QixTQUFpQ0UsUUFBUU0sS0FBekM7QUFDQU4sZ0JBQVFPLElBQVIsR0FBa0IsY0FBSVQsTUFBdEIsU0FBZ0NFLFFBQVFPLElBQXhDO0FBQ0FoQyxhQUFLckIsTUFBTCxHQUFjOEMsT0FBZDtBQUNBekIsYUFBS04sTUFBTDtBQUNELE9BYkg7O0FBZ0JBYyxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEOzs7O0VBbkswQixlQUFLd0IsSSIsImZpbGUiOiJncnVvcE9ubHlCdXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IGNvbW0gZnJvbSBcIi4uLy4uL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi8uLi9jb21tL3RpcFwiO1xyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuLi8uLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuWNleeLrOi0reS5sFwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIGdyb3VwX2lkOiAwLFxyXG4gICAgZGV0YWlsOiB7fSxcclxuICAgIGdvb2RzTnVtOiAxLCAvL+WVhuWTgeaVsOmHj1xyXG4gICAgZ29vZHNJbmRleDogXCJcIiwgLy/llYblk4Hpu5jorqTpgInmi6nnsbvlnotcclxuICAgIG5hdkxpc3Q6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwi5ZWG5ZOB6K+m5oOFXCIsXHJcbiAgICAgICAgYWN0aXZlOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIuWVhuWTgeWPguaVsFwiLFxyXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAvLyDpgInmi6npopzoibJcclxuICAgIGNoYW5nZVR5cGUoaW5kZXgsIGUpIHtcclxuICAgICAgLy8gICAgY29uc29sZS5sb2coaW5kZXgsZSlcclxuICAgICAgbGV0IGNvbG9yID0gdGhpcy5kYXRhLmRldGFpbC5vcHRpb24ub3B0aW9ucztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xvci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbG9yW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbG9yW2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmRhdGEuZGV0YWlsLm9wdGlvbi5vcHRpb25zID0gY29sb3I7XHJcbiAgICAgIHRoaXMuZ29vZHNJbmRleCA9IGluZGV4KzE7XHJcbiAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvUnVsZXMoZSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhnZXRDdXJyZW50UGFnZXMoKSlcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiBcIi4uL2dyb3VwUnVsZXMvZ3JvdXBSdWxlc1wiXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vIOaUtuiXj1xyXG4gICAgY29sbGVjdCgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxdWVyeTogeyBnb29kczogdGhhdC5kZXRhaWwuZ29vZHMsIHVpZDogd2VweS5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcGkuQ29sbGVjdCxcclxuICAgICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEubXNnKTtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgdGhhdC5kZXRhaWwuY29sbGVjdCA9IHRoYXQuZGV0YWlsLmNvbGxlY3QgPT0gXCIxXCIgPyBcIjBcIiA6IDE7XHJcbiAgICAgICAgICAgIHRpcC5zdWNjZXNzKHJlcy5kYXRhLmRhdGEubXNnKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLy8g5YiH5o2i5ZWG5ZOB6K+m5oOF5ZKM5ZWG5ZOB5Y+C5pWwXHJcbiAgICBjaGFuZ2VEZXRhaWwoaW5kZXgpIHtcclxuICAgICAgbGV0IG5hdkxpc3QgPSB0aGlzLm5hdkxpc3Q7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF2TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5hdkxpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgbmF2TGlzdFtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvLyDmiJbogIXlh4/llYblk4HmlbDph49cclxuICAgIGN1dE51bShlKSB7XHJcbiAgICAgIGlmIChlID4gMCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHNOdW0gKz0gMTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSA9IHRoaXMuZ29vZHNOdW0gPiAxID8gKHRoaXMuZ29vZHNOdW0gLT0gMSkgOiAxO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyDliqDlhaXotK3nianovaZcclxuICAgIGFkZENhcnQoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgaWYgKCF0aGlzLmdvb2RzSW5kZXgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXApO1xyXG4gICAgICAgIHRpcC5hbGVydChcIuivt+mAieaLqeWVhuWTgVwiICsgdGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwLCAxNTAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgZ29vZHM6IHRoaXMuZGV0YWlsLmdvb2RzLFxyXG4gICAgICAgICAgICBudW06IHRoaXMuZ29vZHNOdW0sXHJcbiAgICAgICAgICAgIG9wdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uOnRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOnRoaXMuZGV0YWlsLm9wdGlvbi5vcHRpb25zW3RoaXMuZ29vZHNJbmRleC0xXS5vcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpLmFkZENhcnQsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cz09JzEnKSB7XHJcbiAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhyZXMuZGF0YS5kYXRhLm1zZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvLyDnq4vljbPotK3kubBcclxuICAgIG9ubHlCdXkoKXtcclxuICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgIGlmICghdGhpcy5nb29kc0luZGV4KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwKTtcclxuICAgICAgICB0aXAuYWxlcnQoXCLor7fpgInmi6nllYblk4FcIiArIHRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCwgMTUwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgICBsZXQgZ29vZHMgPSBbe1xyXG4gICAgICAgICAgZ29vZHM6dGhpcy5kZXRhaWwuZ29vZHMsXHJcbiAgICAgICAgICBudW06dGhpcy5nb29kc051bSxcclxuICAgICAgICAgIGlkOnRoaXMuZGV0YWlsLmlkLFxyXG4gICAgICAgICAgb3B0aW9uOntcclxuICAgICAgICAgICAgIG9wdGlvbjp0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsXHJcbiAgICAgICAgICAgICB2YWx1ZTp0aGlzLmRldGFpbC5vcHRpb24ub3B0aW9uc1t0aGlzLmdvb2RzSW5kZXgtMV0ub3B0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICB9XVxyXG4gICAgICAgY29tbS53eFJlcXVlc3Qoe3F1ZXJ5Ontnb29kczpnb29kcyx1aWQ6d3guZ2V0U3RvcmFnZVN5bmMoJ3VpZCcpfX0sYXBpLm9ubHlCdXksZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzPT0nMScpIHtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiBgLi4vc3VibWl0T3JkZXIvc3VibWl0T3JkZXI/b3JkZXI9JHtyZXMuZGF0YS5kYXRhLm9yZGVyfSZidXl0eXBlPW9ubHlidXlgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgIH1cclxuICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5ncm91cF9pZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAvLyB0aGlzLmdyb3VwX2lkID0gXCI1Ni4xMTkuNjEuNjFcIjtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBjb25zb2xlLmxvZyhhcGkuYXBpVXJsKTtcclxuICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICB7IHF1ZXJ5OiB7IGlkOiB0aGF0Lmdyb3VwX2lkLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfSB9LFxyXG4gICAgICBhcGkuZ3JvdXBEZXRhaWwsXHJcbiAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgIGxldCBfZGV0YWlsID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICBfZGV0YWlsLmFyZ3MgPSBKU09OLnBhcnNlKF9kZXRhaWwuYXJncyk7XHJcbiAgICAgICAgX2RldGFpbC5vcHRpb24gPSBKU09OLnBhcnNlKF9kZXRhaWwub3B0aW9uKTtcclxuICAgICAgICBfZGV0YWlsLmVuZFRpbWUgPSBjb21tLmRhdGVmb3JtYXQoX2RldGFpbC5lbmRUaW1lKTtcclxuICAgICAgICBfZGV0YWlsLmltYWdlID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmltYWdlfWA7XHJcbiAgICAgICAgX2RldGFpbC5sb2dvID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmxvZ299YDtcclxuICAgICAgICB0aGF0LmRldGFpbCA9IF9kZXRhaWw7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNob3dcIik7XHJcbiAgfVxyXG59XHJcbiJdfQ==