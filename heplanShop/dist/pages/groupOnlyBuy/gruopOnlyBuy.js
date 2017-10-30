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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdydW9wT25seUJ1eS5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwiZ3JvdXBfaWQiLCJkZXRhaWwiLCJnb29kc051bSIsImdvb2RzSW5kZXgiLCJuYXZMaXN0IiwidGV4dCIsImFjdGl2ZSIsIm1ldGhvZHMiLCJjaGFuZ2VUeXBlIiwiaW5kZXgiLCJlIiwiY29sb3IiLCJvcHRpb24iLCJvcHRpb25zIiwiaSIsImxlbmd0aCIsIiRhcHBseSIsInRvUnVsZXMiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb2xsZWN0IiwidGhhdCIsInd4UmVxdWVzdCIsInF1ZXJ5IiwiZ29vZHMiLCJ1aWQiLCJnZXRTdG9yYWdlU3luYyIsIkNvbGxlY3QiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibXNnIiwic3RhdHVzIiwic3VjY2VzcyIsImNoYW5nZURldGFpbCIsImN1dE51bSIsImFkZENhcnQiLCJncm91cCIsImFsZXJ0IiwibnVtIiwidmFsdWUiLCJvbmx5QnV5IiwiaWQiLCJhcGlVcmwiLCJncm91cERldGFpbCIsIl9kZXRhaWwiLCJhcmdzIiwiSlNPTiIsInBhcnNlIiwiZW5kVGltZSIsImRhdGVmb3JtYXQiLCJpbWFnZSIsImxvZ28iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFRUEsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsOEJBQXdCO0FBSGpCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLENBREw7QUFFTEMsY0FBUSxFQUZIO0FBR0xDLGdCQUFVLENBSEwsRUFHUTtBQUNiQyxrQkFBWSxFQUpQLEVBSVc7QUFDaEJDLGVBQVMs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LGFBQUtyQixNQUFMLEdBQWM2QyxPQUFkO0FBQ0F4QixhQUFLTixNQUFMO0FBQ0QsT0FiSDs7QUFnQkFjLGNBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0Q7Ozs7RUF6SjBCLGVBQUt1QixJIiwiZmlsZSI6ImdydW9wT25seUJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi4vLi4vY29tbS9jb21tXCI7XHJcbmltcG9ydCB0aXAgZnJvbSBcIi4uLy4uL2NvbW0vdGlwXCI7XHJcbmltcG9ydCB3eFJlcXVlc3QgZnJvbSBcIi4uLy4uL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uL2FwaS9hcGlcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5Y2V54us6LSt5LmwXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMxNjM4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgfTtcclxuICBkYXRhID0ge1xyXG4gICAgZ3JvdXBfaWQ6IDAsXHJcbiAgICBkZXRhaWw6IHt9LFxyXG4gICAgZ29vZHNOdW06IDEsIC8v5ZWG5ZOB5pWw6YePXHJcbiAgICBnb29kc0luZGV4OiBcIlwiLCAvL+WVhuWTgem7mOiupOmAieaLqeexu+Wei1xyXG4gICAgbmF2TGlzdDogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCLllYblk4Hor6bmg4VcIixcclxuICAgICAgICBhY3RpdmU6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwi5ZWG5ZOB5Y+C5pWwXCIsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIC8vIOmAieaLqeminOiJslxyXG4gICAgY2hhbmdlVHlwZShpbmRleCwgZSkge1xyXG4gICAgICAvLyAgICBjb25zb2xlLmxvZyhpbmRleCxlKVxyXG4gICAgICBsZXQgY29sb3IgPSB0aGlzLmRhdGEuZGV0YWlsLm9wdGlvbi5vcHRpb25zO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbG9yLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29sb3JbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29sb3JbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuZGF0YS5kZXRhaWwub3B0aW9uLm9wdGlvbnMgPSBjb2xvcjtcclxuICAgICAgdGhpcy5nb29kc0luZGV4ID0gaW5kZXgrMTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9SdWxlcyhlKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGdldEN1cnJlbnRQYWdlcygpKVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6IFwiLi4vZ3JvdXBSdWxlcy9ncm91cFJ1bGVzXCJcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy8g5pS26JePXHJcbiAgICBjb2xsZWN0KCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1ZXJ5OiB7IGdvb2RzOiB0aGF0LmRldGFpbC5nb29kcywgdWlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwaS5Db2xsZWN0LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5tc2cpO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICB0aGF0LmRldGFpbC5jb2xsZWN0ID0gdGhhdC5kZXRhaWwuY29sbGVjdCA9PSBcIjFcIiA/IFwiMFwiIDogMTtcclxuICAgICAgICAgICAgdGlwLnN1Y2Nlc3MocmVzLmRhdGEuZGF0YS5tc2cpO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvLyDliIfmjaLllYblk4Hor6bmg4XlkozllYblk4Hlj4LmlbBcclxuICAgIGNoYW5nZURldGFpbChpbmRleCkge1xyXG4gICAgICBsZXQgbmF2TGlzdCA9IHRoaXMubmF2TGlzdDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbmF2TGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBuYXZMaXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIC8vIOaIluiAheWHj+WVhuWTgeaVsOmHj1xyXG4gICAgY3V0TnVtKGUpIHtcclxuICAgICAgaWYgKGUgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5nb29kc051bSArPSAxO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZSA8IDApIHtcclxuICAgICAgICB0aGlzLmdvb2RzTnVtID0gdGhpcy5nb29kc051bSA+IDEgPyAodGhpcy5nb29kc051bSAtPSAxKSA6IDE7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIOWKoOWFpei0reeJqei9plxyXG4gICAgYWRkQ2FydCgpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBpZiAoIXRoaXMuZ29vZHNJbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGV0YWlsLm9wdGlvbi5ncm91cCk7XHJcbiAgICAgICAgdGlwLmFsZXJ0KFwi6K+36YCJ5oup5ZWG5ZOBXCIgKyB0aGlzLmRldGFpbC5vcHRpb24uZ3JvdXAsIDE1MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLFxyXG4gICAgICAgICAgICBnb29kczogdGhpcy5kZXRhaWwuZ29vZHMsXHJcbiAgICAgICAgICAgIG51bTogdGhpcy5nb29kc051bSxcclxuICAgICAgICAgICAgb3B0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb246dGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6dGhpcy5kZXRhaWwub3B0aW9uLm9wdGlvbnNbdGhpcy5nb29kc0luZGV4LTFdLm9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcGkuYWRkQ2FydCxcclxuICAgICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzPT0nMScpIHtcclxuICAgICAgICAgICAgICAgIHRpcC5zdWNjZXNzKHJlcy5kYXRhLmRhdGEubXNnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIC8vIOeri+WNs+i0reS5sFxyXG4gICAgb25seUJ1eSgpe1xyXG4gICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgbGV0IGdvb2RzID0gW3tcclxuICAgICAgICAgIGdvb2RzOnRoaXMuZGV0YWlsLmdvb2RzLFxyXG4gICAgICAgICAgbnVtOnRoaXMuZ29vZHNOdW0sXHJcbiAgICAgICAgICBpZDp0aGlzLmRldGFpbC5pZCxcclxuICAgICAgICAgIG9wdGlvbjp7XHJcbiAgICAgICAgICAgICBvcHRpb246dGhpcy5kZXRhaWwub3B0aW9uLmdyb3VwLFxyXG4gICAgICAgICAgICAgdmFsdWU6dGhpcy5kZXRhaWwub3B0aW9uLm9wdGlvbnNbdGhpcy5nb29kc0luZGV4LTFdLm9wdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgfV1cclxuICAgICAgIGNvbW0ud3hSZXF1ZXN0KHtxdWVyeTp7Z29vZHM6Z29vZHMsdWlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1aWQnKX19LGFwaS5vbmx5QnV5LGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgLy8gdGhpcy5ncm91cF9pZCA9IG9wdGlvbnMuaWQ7XHJcbiAgICB0aGlzLmdyb3VwX2lkID0gXCI1Ni4xMTkuNjEuNjFcIjtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBjb25zb2xlLmxvZyhhcGkuYXBpVXJsKTtcclxuICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICB7IHF1ZXJ5OiB7IGlkOiB0aGF0Lmdyb3VwX2lkLCB1aWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfSB9LFxyXG4gICAgICBhcGkuZ3JvdXBEZXRhaWwsXHJcbiAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgIGxldCBfZGV0YWlsID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICBfZGV0YWlsLmFyZ3MgPSBKU09OLnBhcnNlKF9kZXRhaWwuYXJncyk7XHJcbiAgICAgICAgX2RldGFpbC5vcHRpb24gPSBKU09OLnBhcnNlKF9kZXRhaWwub3B0aW9uKTtcclxuICAgICAgICBfZGV0YWlsLmVuZFRpbWUgPSBjb21tLmRhdGVmb3JtYXQoX2RldGFpbC5lbmRUaW1lKTtcclxuICAgICAgICBfZGV0YWlsLmltYWdlID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmltYWdlfWA7XHJcbiAgICAgICAgX2RldGFpbC5sb2dvID0gYCR7YXBpLmFwaVVybH0vJHtfZGV0YWlsLmxvZ299YDtcclxuICAgICAgICB0aGF0LmRldGFpbCA9IF9kZXRhaWw7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNob3dcIik7XHJcbiAgfVxyXG59XHJcbiJdfQ==