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
      navigationBarTitleText: "拼团详情",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      group_id: 0,
      detail: {},
      goodsNum: 1, //商品数量
      groupIndex: "",
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
        this.groupIndex = index + 1;
        this.data.detail.option.options = color;
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
      cutNum: function cutNum(e) {
        if (e > 0) {
          this.goodsNum += 1;
          this.$apply();
        } else if (e < 0) {
          this.goodsNum = this.goodsNum > 1 ? this.goodsNum -= 1 : 1;
          this.$apply();
        }
      },

      // 单独购买
      toOnlyBuy: function toOnlyBuy() {
        wx.navigateTo({
          url: "../groupOnlyBuy/gruopOnlyBuy?id=" + this.group_id + "&buytype=onlybuy"
        });
      },

      // 拼团
      toGroup: function toGroup(goodsNum) {
        var that = this;
        if (!this.groupIndex) {
          _tip2.default.alert("请选择商品" + this.detail.option.group, 1500);
          return false;
        }
        _comm2.default.wxRequest({
          query: {
            uid: wx.getStorageSync("uid"),
            group: {
              id: this.group_id,
              num: goodsNum,
              option: {
                option: this.detail.option.group,
                value: this.detail.option.options[this.groupIndex - 1].option
              }
            }
          }
        }, _api2.default.groupOrder, function (res) {
          if (res.data.status == "1") {
            wx.navigateTo({
              url: "../submitOrder/submitOrder?order=" + res.data.data.order + "&buytype=gruopbuy"
            });
          } else {
            _tip2.default.error(res.data.data.msg);
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
      // this.group_id = "56.65.61.61";
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/fightDetail/fightDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpZ2h0RGV0YWlsLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJncm91cF9pZCIsImRldGFpbCIsImdvb2RzTnVtIiwiZ3JvdXBJbmRleCIsIm5hdkxpc3QiLCJ0ZXh0IiwiYWN0aXZlIiwibWV0aG9kcyIsImNoYW5nZVR5cGUiLCJpbmRleCIsImUiLCJjb2xvciIsIm9wdGlvbiIsIm9wdGlvbnMiLCJpIiwibGVuZ3RoIiwiJGFwcGx5IiwidG9SdWxlcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbGxlY3QiLCJ0aGF0Iiwid3hSZXF1ZXN0IiwicXVlcnkiLCJnb29kcyIsInVpZCIsImdldFN0b3JhZ2VTeW5jIiwiQ29sbGVjdCIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJtc2ciLCJzdGF0dXMiLCJzdWNjZXNzIiwiY2hhbmdlRGV0YWlsIiwiY3V0TnVtIiwidG9Pbmx5QnV5IiwidG9Hcm91cCIsImFsZXJ0IiwiZ3JvdXAiLCJpZCIsIm51bSIsInZhbHVlIiwiZ3JvdXBPcmRlciIsIm9yZGVyIiwiZXJyb3IiLCJhcGlVcmwiLCJncm91cERldGFpbCIsIl9kZXRhaWwiLCJhcmdzIiwiSlNPTiIsInBhcnNlIiwiZW5kVGltZSIsImRhdGVmb3JtYXQiLCJpbWFnZSIsImxvZ28iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFRUEsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCO0FBSGpCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsY0FBUSxFQUZIO0FBR0xDLGdCQUFVLENBSEwsRUFHUTtBQUNi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LFNBQUwsQ0FDRSxFQUFFQyxPQUFPLEVBQUVpQixJQUFJbkIsS0FBS3RCLFFBQVgsRUFBcUIwQixLQUFLLGVBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBMUIsRUFBVCxFQURGLEVBRUUsY0FBSXFCLFdBRk4sRUFHRSxVQUFTbkIsR0FBVCxFQUFjO0FBQ1pDLGdCQUFRQyxHQUFSLENBQVlGLElBQUk5QixJQUFKLENBQVNBLElBQXJCO0FBQ0EsWUFBSWtELFVBQVVwQixJQUFJOUIsSUFBSixDQUFTQSxJQUF2QjtBQUNBa0QsZ0JBQVFDLElBQVIsR0FBZUMsS0FBS0MsS0FBTCxDQUFXSCxRQUFRQyxJQUFuQixDQUFmO0FBQ0FELGdCQUFRckMsTUFBUixHQUFpQnVDLEtBQUtDLEtBQUwsQ0FBV0gsUUFBUXJDLE1BQW5CLENBQWpCO0FBQ0FxQyxnQkFBUUksT0FBUixHQUFrQixlQUFLQyxVQUFMLENBQWdCTCxRQUFRSSxPQUF4QixDQUFsQjtBQUNBSixnQkFBUU0sS0FBUixHQUFtQixjQUFJUixNQUF2QixTQUFpQ0UsUUFBUU0sS0FBekM7QUFDQU4sZ0JBQVFPLElBQVIsR0FBa0IsY0FBSVQsTUFBdEIsU0FBZ0NFLFFBQVFPLElBQXhDO0FBQ0FsQyxhQUFLckIsTUFBTCxHQUFjZ0QsT0FBZDtBQUNBM0IsYUFBS04sTUFBTDtBQUNELE9BYkg7O0FBZ0JBYyxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEOzs7O0VBbEowQixlQUFLMEIsSSIsImZpbGUiOiJmaWdodERldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi4vLi4vY29tbS9jb21tXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uLy4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCB3eFJlcXVlc3QgZnJvbSBcIi4uLy4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL2FwaS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5ou85Zui6K+m5oOFXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMxNjM4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgZ3JvdXBfaWQ6IDAsXHJcbiAgICBkZXRhaWw6IHt9LFxyXG4gICAgZ29vZHNOdW06IDEsIC8v5ZWG5ZOB5pWw6YePXHJcbiAgICBncm91cEluZGV4OiBcIlwiLFxyXG4gICAgbmF2TGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCLllYblk4Hor6bmg4VcIixcclxuICAgICAgICBhY3RpdmU6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwi5ZWG5ZOB5Y+C5pWwXCIsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmAieaLqeminOiJslxyXG4gICAgY2hhbmdlVHlwZShpbmRleCwgZSkge1xyXG4gICAgICAvLyAgICBjb25zb2xlLmxvZyhpbmRleCxlKVxyXG4gICAgICBsZXQgY29sb3IgPSB0aGlzLmRhdGEuZGV0YWlsLm9wdGlvbi5vcHRpb25zO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbG9yLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29sb3JbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29sb3JbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuZ3JvdXBJbmRleCA9IGluZGV4ICsgMTtcclxuICAgICAgdGhpcy5kYXRhLmRldGFpbC5vcHRpb24ub3B0aW9ucyA9IGNvbG9yO1xyXG4gICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b1J1bGVzKGUpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZ2V0Q3VycmVudFBhZ2VzKCkpXHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogXCIuLi9ncm91cFJ1bGVzL2dyb3VwUnVsZXNcIlxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDmlLbol49cclxuICAgIGNvbGxlY3QoKSB7XHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHsgZ29vZHM6IHRoYXQuZGV0YWlsLmdvb2RzLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpLkNvbGxlY3QsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGV0YWlsLmNvbGxlY3QgPSB0aGF0LmRldGFpbC5jb2xsZWN0ID09IFwiMVwiID8gXCIwXCIgOiAxO1xyXG4gICAgICAgICAgICB0aXAuc3VjY2VzcyhyZXMuZGF0YS5kYXRhLm1zZyk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIC8vIOWIh+aNouWVhuWTgeivpuaDheWSjOWVhuWTgeWPguaVsFxyXG4gICAgY2hhbmdlRGV0YWlsKGluZGV4KSB7XHJcbiAgICAgIGxldCBuYXZMaXN0ID0gdGhpcy5uYXZMaXN0O1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBuYXZMaXN0W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdkxpc3RbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG4gICAgY3V0TnVtKGUpIHtcclxuICAgICAgaWYgKGUgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSArPSAxO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gdGhpcy5nb29kc051bSA+IDEgPyAodGhpcy5nb29kc051bSAtPSAxKSA6IDE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWNleeLrOi0reS5sFxyXG4gICAgdG9Pbmx5QnV5KCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IGAuLi9ncm91cE9ubHlCdXkvZ3J1b3BPbmx5QnV5P2lkPSR7dGhpcy5ncm91cF9pZH0mYnV5dHlwZT1vbmx5YnV5YFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvLyDmi7zlm6JcclxuICAgIHRvR3JvdXAoZ29vZHNOdW0pIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpZiAoIXRoaXMuZ3JvdXBJbmRleCkge1xyXG4gICAgICAgIHRpcC5hbGVydChcIuivt+mAieaLqeWVhuWTgVwiICsgdGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwLCAxNTAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICBpZDogdGhpcy5ncm91cF9pZCxcclxuICAgICAgICAgICAgICBudW06IGdvb2RzTnVtLFxyXG4gICAgICAgICAgICAgIG9wdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uOiB0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5kZXRhaWwub3B0aW9uLm9wdGlvbnNbdGhpcy5ncm91cEluZGV4IC0gMV0ub3B0aW9uXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcGkuZ3JvdXBPcmRlcixcclxuICAgICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdGF0dXMgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgdXJsOiBgLi4vc3VibWl0T3JkZXIvc3VibWl0T3JkZXI/b3JkZXI9JHtyZXMuZGF0YS5kYXRhLm9yZGVyfSZidXl0eXBlPWdydW9wYnV5YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcihyZXMuZGF0YS5kYXRhLm1zZylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgdGhpcy5ncm91cF9pZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICAvLyB0aGlzLmdyb3VwX2lkID0gXCI1Ni42NS42MS42MVwiO1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIGNvbnNvbGUubG9nKGFwaS5hcGlVcmwpO1xyXG4gICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgIHsgcXVlcnk6IHsgaWQ6IHRoYXQuZ3JvdXBfaWQsIHVpZDogd2VweS5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSB9IH0sXHJcbiAgICAgIGFwaS5ncm91cERldGFpbCxcclxuICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgbGV0IF9kZXRhaWwgPSByZXMuZGF0YS5kYXRhO1xyXG4gICAgICAgIF9kZXRhaWwuYXJncyA9IEpTT04ucGFyc2UoX2RldGFpbC5hcmdzKTtcclxuICAgICAgICBfZGV0YWlsLm9wdGlvbiA9IEpTT04ucGFyc2UoX2RldGFpbC5vcHRpb24pO1xyXG4gICAgICAgIF9kZXRhaWwuZW5kVGltZSA9IGNvbW0uZGF0ZWZvcm1hdChfZGV0YWlsLmVuZFRpbWUpO1xyXG4gICAgICAgIF9kZXRhaWwuaW1hZ2UgPSBgJHthcGkuYXBpVXJsfS8ke19kZXRhaWwuaW1hZ2V9YDtcclxuICAgICAgICBfZGV0YWlsLmxvZ28gPSBgJHthcGkuYXBpVXJsfS8ke19kZXRhaWwubG9nb31gO1xyXG4gICAgICAgIHRoYXQuZGV0YWlsID0gX2RldGFpbDtcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic2hvd1wiKTtcclxuICB9XHJcbn1cclxuIl19