"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _comm = require('./comm/comm.js');

var _comm2 = _interopRequireDefault(_comm);

var _tip = require('./comm/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _wxRequest = require('./comm/wxRequest.js');

var _wxRequest2 = _interopRequireDefault(_wxRequest);

var _api = require('./api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ["pages/mine/mine", "pages/index/index", "pages/fightDetail/fightDetail", "pages/shopCart/shopCart", "pages/demo", "pages/submitOrder/submitOrder", "pages/groupOnlyBuy/gruopOnlyBuy", "pages/fightGroup/fightGroup", "pages/inviteFight/inviteFight", "pages/myOrderDetail/myOrderDetail", "pages/myOrder/myOrder", "pages/myFightGroup/myFightGroup", "pages/myCollect/myCollect", "pages/groupRules/groupRules"],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "禾葡兰护肤商城",
        navigationBarTextStyle: "black"
      },
      tabBar: {
        backgroundColor: "#16382e",
        borderStyle: "black",
        color: "#fff",
        selectedColor: "#ffba00",
        list: [{
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "images/tabbar_icon_home.png",
          selectedIconPath: "images/tabbar_icon_home_active.png"
        }, {
          pagePath: "pages/shopCart/shopCart",
          text: "购物车",
          iconPath: "images/tabbar_icon_shopcart.png",
          selectedIconPath: "images/tabbar_icon_shopcart_active.png"
        }, {
          pagePath: "pages/mine/mine",
          text: "个人中心",
          iconPath: "images/tabbar_icon_mine.png",
          selectedIconPath: "images/tabbar_icon_mine_active.png"
        }],
        "debug": false
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use("requestfix");
    return _this;
  }

  _createClass(_default, [{
    key: "onLaunch",
    value: function onLaunch() {

      this.testAsync();
      this.getUserInfo();
      wx.login({
        success: function success(res) {
          // console.log(res);
          wx.request({
            url: _api2.default.getUid + "?code=" + res.code,
            success: function success(res) {
              // console.log(res)
              wx.setStorageSync("uid", res.data.data.uid);
            }
          });
        }
      });
    }
  }, {
    key: "sleep",
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve("promise resolved");
        }, s * 1000);
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          _wepy2.default.setStorageSync("nickName", res.userInfo.nickName);
          _wepy2.default.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
          delete res.userInfo['sign'];
          that.globalData.userInfo = res.userInfo;
          res.userInfo.id = _wepy2.default.getStorageSync("uid");
          _comm2.default.wxRequest({ query: res.userInfo }, _api2.default.saveUserInfo, function (res) {
            console.log(res, "保存用户信息");
          });
          cb && cb(res.userInfo);
        }
      });
    }
  }, {
    key: "testAsync",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);
                // const e = await this.onLaunch();
                // console.log(e,3333)

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJ0ZXN0QXN5bmMiLCJnZXRVc2VySW5mbyIsInd4IiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwicmVxdWVzdCIsInVybCIsImdldFVpZCIsImNvZGUiLCJzZXRTdG9yYWdlU3luYyIsImRhdGEiLCJ1aWQiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiY2IiLCJ0aGF0Iiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJpZCIsImdldFN0b3JhZ2VTeW5jIiwid3hSZXF1ZXN0IiwicXVlcnkiLCJzYXZlVXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwic2xlZXAiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUEzRGRBLE1BMkRjLEdBM0RMO0FBQ1BDLGFBQU8sQ0FDTCxpQkFESyxFQUVMLG1CQUZLLEVBR0wsK0JBSEssRUFJTCx5QkFKSyxFQUtMLFlBTEssRUFNTCwrQkFOSyxFQU9MLGlDQVBLLEVBUUwsNkJBUkssRUFTTCwrQkFUSyxFQVdMLG1DQVhLLEVBWUwsdUJBWkssRUFhTCxpQ0FiSyxFQWVMLDJCQWZLLEVBZ0JMLDZCQWhC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dXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5pbXBvcnQgXCJ3ZXB5LWFzeW5jLWZ1bmN0aW9uXCI7XHJcblxyXG5pbXBvcnQgY29tbSBmcm9tIFwiLi9jb21tL2NvbW1cIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi9jb21tL3RpcFwiO1xyXG5cclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuL2FwaS9hcGlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgIFwicGFnZXMvbWluZS9taW5lXCIsXHJcbiAgICAgIFwicGFnZXMvaW5kZXgvaW5kZXhcIixcclxuICAgICAgXCJwYWdlcy9maWdodERldGFpbC9maWdodERldGFpbFwiLFxyXG4gICAgICBcInBhZ2VzL3Nob3BDYXJ0L3Nob3BDYXJ0XCIsXHJcbiAgICAgIFwicGFnZXMvZGVtb1wiLFxyXG4gICAgICBcInBhZ2VzL3N1Ym1pdE9yZGVyL3N1Ym1pdE9yZGVyXCIsXHJcbiAgICAgIFwicGFnZXMvZ3JvdXBPbmx5QnV5L2dydW9wT25seUJ1eVwiLFxyXG4gICAgICBcInBhZ2VzL2ZpZ2h0R3JvdXAvZmlnaHRHcm91cFwiLFxyXG4gICAgICBcInBhZ2VzL2ludml0ZUZpZ2h0L2ludml0ZUZpZ2h0XCIsXHJcbiAgICAgIFxyXG4gICAgICBcInBhZ2VzL215T3JkZXJEZXRhaWwvbXlPcmRlckRldGFpbFwiLFxyXG4gICAgICBcInBhZ2VzL215T3JkZXIvbXlPcmRlclwiLFxyXG4gICAgICBcInBhZ2VzL215RmlnaHRHcm91cC9teUZpZ2h0R3JvdXBcIixcclxuICAgICAgXHJcbiAgICAgIFwicGFnZXMvbXlDb2xsZWN0L215Q29sbGVjdFwiLFxyXG4gICAgICBcInBhZ2VzL2dyb3VwUnVsZXMvZ3JvdXBSdWxlc1wiLFxyXG4gICAgICBcclxuICAgIF0sXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogXCJsaWdodFwiLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLnpr7okaHlhbDmiqTogqTllYbln45cIixcclxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCJibGFja1wiXHJcbiAgICB9LFxyXG4gICAgdGFiQmFyOiB7XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICAgIGJvcmRlclN0eWxlOiBcImJsYWNrXCIsXHJcbiAgICAgIGNvbG9yOiBcIiNmZmZcIixcclxuICAgICAgc2VsZWN0ZWRDb2xvcjogXCIjZmZiYTAwXCIsXHJcbiAgICAgIGxpc3Q6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9pbmRleC9pbmRleFwiLFxyXG4gICAgICAgICAgdGV4dDogXCLpppbpobVcIixcclxuICAgICAgICAgIGljb25QYXRoOiBcImltYWdlcy90YWJiYXJfaWNvbl9ob21lLnBuZ1wiLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvdGFiYmFyX2ljb25faG9tZV9hY3RpdmUucG5nXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL3Nob3BDYXJ0L3Nob3BDYXJ0XCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIui0reeJqei9plwiLFxyXG4gICAgICAgICAgaWNvblBhdGg6IFwiaW1hZ2VzL3RhYmJhcl9pY29uX3Nob3BjYXJ0LnBuZ1wiLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvdGFiYmFyX2ljb25fc2hvcGNhcnRfYWN0aXZlLnBuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9taW5lL21pbmVcIixcclxuICAgICAgICAgIHRleHQ6IFwi5Liq5Lq65Lit5b+DXCIsXHJcbiAgICAgICAgICBpY29uUGF0aDogXCJpbWFnZXMvdGFiYmFyX2ljb25fbWluZS5wbmdcIixcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL3RhYmJhcl9pY29uX21pbmVfYWN0aXZlLnBuZ1wiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBcImRlYnVnXCI6IGZhbHNlXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbFxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMudXNlKFwicmVxdWVzdGZpeFwiKTtcclxuICB9XHJcblxyXG4gIG9uTGF1bmNoKCkge1xyXG5cclxuICAgIHRoaXMudGVzdEFzeW5jKCk7XHJcbiAgICB0aGlzLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IGAke2FwaS5nZXRVaWR9P2NvZGU9JHtyZXMuY29kZX1gLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInVpZFwiLCByZXMuZGF0YS5kYXRhLnVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgc2xlZXAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShcInByb21pc2UgcmVzb2x2ZWRcIik7XHJcbiAgICAgIH0sIHMgKiAxMDAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvO1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcIm5pY2tOYW1lXCIscmVzLnVzZXJJbmZvLm5pY2tOYW1lKTtcclxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFwiYXZhdGFyVXJsXCIscmVzLnVzZXJJbmZvLmF2YXRhclVybCk7XHJcbiAgICAgICAgIGRlbGV0ZSByZXMudXNlckluZm9bJ3NpZ24nXTtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgICAgcmVzLnVzZXJJbmZvLmlkID0gd2VweS5nZXRTdG9yYWdlU3luYyhcInVpZFwiKTtcclxuICAgICAgICBjb21tLnd4UmVxdWVzdCh7cXVlcnk6cmVzLnVzZXJJbmZvfSxhcGkuc2F2ZVVzZXJJbmZvLGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyxcIuS/neWtmOeUqOaIt+S/oeaBr1wiKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB0ZXN0QXN5bmMoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgLy8gY29uc3QgZSA9IGF3YWl0IHRoaXMub25MYXVuY2goKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGUsMzMzMylcclxuICB9XHJcbn1cclxuIl19