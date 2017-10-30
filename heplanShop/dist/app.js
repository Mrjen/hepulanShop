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
      pages: ["pages/index/index", "pages/fightDetail/fightDetail", "pages/inviteFight/inviteFight", "pages/shopCart/shopCart", "pages/demo", "pages/submitOrder/submitOrder", "pages/groupOnlyBuy/gruopOnlyBuy", "pages/fightGroup/fightGroup", "pages/mine/mine", "pages/myOrderDetail/myOrderDetail", "pages/myOrder/myOrder", "pages/myFightGroup/myFightGroup", "pages/myCollect/myCollect", "pages/groupRules/groupRules"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJTdHlsZSIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJ0ZXN0QXN5bmMiLCJnZXRVc2VySW5mbyIsInd4IiwibG9naW4iLCJzdWNjZXNzIiwicmVzIiwicmVxdWVzdCIsInVybCIsImdldFVpZCIsImNvZGUiLCJzZXRTdG9yYWdlU3luYyIsImRhdGEiLCJ1aWQiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiY2IiLCJ0aGF0Iiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJpZCIsImdldFN0b3JhZ2VTeW5jIiwid3hSZXF1ZXN0IiwicXVlcnkiLCJzYXZlVXNlckluZm8iLCJjb25zb2xlIiwibG9nIiwic2xlZXAiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0VFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUE3RGRBLE1BNkRjLEdBN0RMO0FBQ1BDLGFBQU8sQ0FHTCxtQkFISyxFQUlMLCtCQUpLLEVBS0wsK0JBTEssRUFNTCx5QkFOSyxFQU9MLFlBUEssRUFRTCwrQkFSSyxFQVNMLGlDQVRLLEVBVUwsNkJBVkssRUFZTCxpQkFaSyxFQWFMLG1DQWJLLEVBY0wsdUJBZEssRUFlTCxpQ0FmSyxFQWlCTCwyQkFqQkssRUFrQkwsNkJB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c291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XHJcbmltcG9ydCBcIndlcHktYXN5bmMtZnVuY3Rpb25cIjtcclxuXHJcbmltcG9ydCBjb21tIGZyb20gXCIuL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuL2NvbW0vdGlwXCI7XHJcblxyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuL2NvbW0vd3hSZXF1ZXN0XCI7XHJcbmltcG9ydCBhcGkgZnJvbSBcIi4vYXBpL2FwaVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICBcInBhZ2VzL2luZGV4L2luZGV4XCIsXHJcbiAgICAgIFwicGFnZXMvZmlnaHREZXRhaWwvZmlnaHREZXRhaWxcIixcclxuICAgICAgXCJwYWdlcy9pbnZpdGVGaWdodC9pbnZpdGVGaWdodFwiLFxyXG4gICAgICBcInBhZ2VzL3Nob3BDYXJ0L3Nob3BDYXJ0XCIsXHJcbiAgICAgIFwicGFnZXMvZGVtb1wiLFxyXG4gICAgICBcInBhZ2VzL3N1Ym1pdE9yZGVyL3N1Ym1pdE9yZGVyXCIsXHJcbiAgICAgIFwicGFnZXMvZ3JvdXBPbmx5QnV5L2dydW9wT25seUJ1eVwiLFxyXG4gICAgICBcInBhZ2VzL2ZpZ2h0R3JvdXAvZmlnaHRHcm91cFwiLFxyXG4gICAgICBcclxuICAgICAgXCJwYWdlcy9taW5lL21pbmVcIixcclxuICAgICAgXCJwYWdlcy9teU9yZGVyRGV0YWlsL215T3JkZXJEZXRhaWxcIixcclxuICAgICAgXCJwYWdlcy9teU9yZGVyL215T3JkZXJcIixcclxuICAgICAgXCJwYWdlcy9teUZpZ2h0R3JvdXAvbXlGaWdodEdyb3VwXCIsXHJcbiAgICAgIFxyXG4gICAgICBcInBhZ2VzL215Q29sbGVjdC9teUNvbGxlY3RcIixcclxuICAgICAgXCJwYWdlcy9ncm91cFJ1bGVzL2dyb3VwUnVsZXNcIixcclxuICAgICAgXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6IFwibGlnaHRcIixcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi56a+6JGh5YWw5oqk6IKk5ZWG5Z+OXCIsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiYmxhY2tcIlxyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzE2MzgyZVwiLFxyXG4gICAgICBib3JkZXJTdHlsZTogXCJibGFja1wiLFxyXG4gICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgIHNlbGVjdGVkQ29sb3I6IFwiI2ZmYmEwMFwiLFxyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvaW5kZXgvaW5kZXhcIixcclxuICAgICAgICAgIHRleHQ6IFwi6aaW6aG1XCIsXHJcbiAgICAgICAgICBpY29uUGF0aDogXCJpbWFnZXMvdGFiYmFyX2ljb25faG9tZS5wbmdcIixcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL3RhYmJhcl9pY29uX2hvbWVfYWN0aXZlLnBuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9zaG9wQ2FydC9zaG9wQ2FydFwiLFxyXG4gICAgICAgICAgdGV4dDogXCLotK3nianovaZcIixcclxuICAgICAgICAgIGljb25QYXRoOiBcImltYWdlcy90YWJiYXJfaWNvbl9zaG9wY2FydC5wbmdcIixcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL3RhYmJhcl9pY29uX3Nob3BjYXJ0X2FjdGl2ZS5wbmdcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVBhdGg6IFwicGFnZXMvbWluZS9taW5lXCIsXHJcbiAgICAgICAgICB0ZXh0OiBcIuS4quS6uuS4reW/g1wiLFxyXG4gICAgICAgICAgaWNvblBhdGg6IFwiaW1hZ2VzL3RhYmJhcl9pY29uX21pbmUucG5nXCIsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy90YWJiYXJfaWNvbl9taW5lX2FjdGl2ZS5wbmdcIlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgXCJkZWJ1Z1wiOiBmYWxzZVxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGxcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnVzZShcInJlcXVlc3RmaXhcIik7XHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuXHJcbiAgICB0aGlzLnRlc3RBc3luYygpO1xyXG4gICAgdGhpcy5nZXRVc2VySW5mbygpO1xyXG4gICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBgJHthcGkuZ2V0VWlkfT9jb2RlPSR7cmVzLmNvZGV9YCxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiwgcmVzLmRhdGEuZGF0YS51aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHNsZWVwKHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoXCJwcm9taXNlIHJlc29sdmVkXCIpO1xyXG4gICAgICB9LCBzICogMTAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcclxuICAgIH1cclxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoXCJuaWNrTmFtZVwiLHJlcy51c2VySW5mby5uaWNrTmFtZSk7XHJcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcImF2YXRhclVybFwiLHJlcy51c2VySW5mby5hdmF0YXJVcmwpO1xyXG4gICAgICAgICBkZWxldGUgcmVzLnVzZXJJbmZvWydzaWduJ107XHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICAgIHJlcy51c2VySW5mby5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIik7XHJcbiAgICAgICAgY29tbS53eFJlcXVlc3Qoe3F1ZXJ5OnJlcy51c2VySW5mb30sYXBpLnNhdmVVc2VySW5mbyxmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCLkv53lrZjnlKjmiLfkv6Hmga9cIilcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdGVzdEFzeW5jKCkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2xlZXAoMyk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIC8vIGNvbnN0IGUgPSBhd2FpdCB0aGlzLm9uTGF1bmNoKCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhlLDMzMzMpXHJcbiAgfVxyXG59XHJcbiJdfQ==