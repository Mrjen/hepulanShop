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
      navigationBarTitleText: "拼团",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.data = {
      product: {
        img: "http://iph.href.lu/156x156",
        name: "超时空紧致平复套装",
        oldprice: "99.99",
        price: "39.99",
        group_num: 2,
        isready: 1
      },
      groupUser: [],
      groupList: [],
      pageTime: "", //拼团倒计时
      groupstatus: "", //
      joined: 0 //用户是否加入拼团
    }, _this.methods = {}, _this.watch = {
      pageTime: function pageTime(newValue, oldValue) {
        //   console.log(`num value: ${oldValue} -> ${newValue}`)
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "onLoad",
    value: function onLoad(options) {
      console.log(options, "查看页面参数");
      // this.order = options.order;
      this.groupid = options.groupid;
      this.order = "59f4175178198";
      this.$apply();
      var that = this;
      _comm2.default.wxRequest({ query: { groupId: this.order, uid: wx.getStorageSync('uid') } }, _api2.default.orderGroupDetail, function (res) {
        console.log(res);
        res.data.data.group.logo = _api2.default.apiUrl + "/" + res.data.data.group.logo;
        that.product = res.data.data.group;
        that.groupstatus = res.data.data.group.status;
        that.joined = res.data.data.group.joined;
        console.log(that.joined, "that");
        var groupList = res.data.data.recommend;
        var time = res.data.data.group.endTime * 1000;
        var _time = setInterval(function () {
          time -= 1000;
          if (time == '0') {
            time = "00:00:00";
            clearInterval(_time);
            that.pageTime = "00:00:00";
            that.$apply();
          } else {
            that.pageTime = _comm2.default.dateformat(time);
            that.$apply();
          }
        }, 1000);
        var groupUser = res.data.data.groupUser;
        for (var i = 0; i < groupUser.length; i++) {
          groupUser[i].avatarUrl = _api2.default.apiUrl + "/" + groupUser[i].avatarUrl;
        }
        for (var _i = 0; _i < groupList.length; _i++) {
          groupList[_i].logo = _api2.default.apiUrl + "/" + groupList[_i].logo;
          for (var j = 0; j < groupList[_i].users.length; j++) {
            groupList[_i].users[j].avatarUrl = _api2.default.apiUrl + "/" + groupList[_i].users[j].avatarUrl;
          }
        }
        that.groupList = groupList;
        that.groupUser = groupUser;
        console.log(groupList);
        that.$apply();
      });
    }
  }, {
    key: "onShow",
    value: function onShow() {
      console.log("show");
    }
  }, {
    key: "onReady",
    value: function onReady() {}
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage(res) {
      if (res.from === "button") {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '禾葡兰护肤商城',
        path: '/pages/inviteFight/inviteFight?groupid=' + ("" + this.product.groupId),
        success: function success(res) {
          // 转发成功
          console.log("转发成功");
        },
        fail: function fail(res) {
          // 转发失败
        }
      };
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/inviteFight/inviteFight'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludml0ZUZpZ2h0LmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImRhdGEiLCJwcm9kdWN0IiwiaW1nIiwibmFtZSIsIm9sZHByaWNlIiwicHJpY2UiLCJncm91cF9udW0iLCJpc3JlYWR5IiwiZ3JvdXBVc2VyIiwiZ3JvdXBMaXN0IiwicGFnZVRpbWUiLCJncm91cHN0YXR1cyIsImpvaW5lZCIsIm1ldGhvZHMiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJvcHRpb25zIiwiY29uc29sZSIsImxvZyIsImdyb3VwaWQiLCJvcmRlciIsIiRhcHBseSIsInRoYXQiLCJ3eFJlcXVlc3QiLCJxdWVyeSIsImdyb3VwSWQiLCJ1aWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwib3JkZXJHcm91cERldGFpbCIsInJlcyIsImdyb3VwIiwibG9nbyIsImFwaVVybCIsInN0YXR1cyIsInJlY29tbWVuZCIsInRpbWUiLCJlbmRUaW1lIiwiX3RpbWUiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJkYXRlZm9ybWF0IiwiaSIsImxlbmd0aCIsImF2YXRhclVybCIsImoiLCJ1c2VycyIsImZyb20iLCJ0YXJnZXQiLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwiZmFpbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUVFQSxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLG9DQUE4QixTQUZ2QjtBQUdQQyw4QkFBd0I7QUFIakIsSyxRQUtUQyxJLEdBQU87QUFDTEMsZUFBUztBQUNQQyxhQUFLLDRCQURFO0FBRVBDLGNBQU0sV0FGQztBQUdQQyxrQkFBVSxPQUhIO0FBSVBDLGVBQU8s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LE1BQXZDLEVBQStDRSxHQUEvQyxFQUFvRDtBQUNsRHJDLHNCQUFVa0MsRUFBVixFQUFhSSxLQUFiLENBQW1CRCxDQUFuQixFQUFzQkQsU0FBdEIsR0FBcUMsY0FBSVgsTUFBekMsU0FBbUR6QixVQUFVa0MsRUFBVixFQUFhSSxLQUFiLENBQW1CRCxDQUFuQixFQUFzQkQsU0FBekU7QUFDRDtBQUNIO0FBQ0R0QixhQUFLZCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBYyxhQUFLZixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBVSxnQkFBUUMsR0FBUixDQUFZVixTQUFaO0FBQ0FjLGFBQUtELE1BQUw7QUFDRixPQXBDQTtBQXFDRjs7OzZCQUVPO0FBQ05KLGNBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBRUQ7Ozs4QkFFUSxDQUVSOzs7c0NBRWlCWSxHLEVBQUs7QUFDckIsVUFBSUEsSUFBSWlCLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN6QjtBQUNBOUIsZ0JBQVFDLEdBQVIsQ0FBWVksSUFBSWtCLE1BQWhCO0FBQ0Q7QUFDRCxhQUFPO0FBQ0xDLGVBQU8sU0FERjtBQUVMQyxjQUFNLGtEQUE2QyxLQUFLbEQsT0FBTCxDQUFheUIsT0FBMUQsQ0FGRDtBQUdMMEIsaUJBQVMsaUJBQVNyQixHQUFULEVBQWM7QUFDckI7QUFDQWIsa0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0QsU0FOSTtBQU9Ma0MsY0FBTSxjQUFTdEIsR0FBVCxFQUFjO0FBQ2xCO0FBQ0Q7QUFUSSxPQUFQO0FBV0Q7Ozs7RUFqRzBCLGVBQUt1QixJIiwiZmlsZSI6Imludml0ZUZpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCJcclxuaW1wb3J0IGNvbW0gZnJvbSBcIi4uLy4uL2NvbW0vY29tbVwiO1xyXG5pbXBvcnQgdGlwIGZyb20gXCIuLi8uLi9jb21tL3RpcFwiO1xyXG5pbXBvcnQgd3hSZXF1ZXN0IGZyb20gXCIuLi8uLi9jb21tL3d4UmVxdWVzdFwiO1xyXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi9hcGkvYXBpXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaLvOWbolwiLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjMTYzODJlXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcIiNmZmZcIlxyXG4gIH07XHJcbiAgZGF0YSA9IHtcclxuICAgIHByb2R1Y3Q6IHtcclxuICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTZ4MTU2XCIsXHJcbiAgICAgIG5hbWU6IFwi6LaF5pe256m657Sn6Ie05bmz5aSN5aWX6KOFXCIsXHJcbiAgICAgIG9sZHByaWNlOiBcIjk5Ljk5XCIsXHJcbiAgICAgIHByaWNlOiBcIjM5Ljk5XCIsXHJcbiAgICAgIGdyb3VwX251bTogMixcclxuICAgICAgaXNyZWFkeToxLFxyXG4gICAgfSxcclxuICAgIGdyb3VwVXNlcjpbXSxcclxuICAgIGdyb3VwTGlzdDpbXSxcclxuICAgIHBhZ2VUaW1lOlwiXCIsICAvL+aLvOWbouWAkuiuoeaXtlxyXG4gICAgZ3JvdXBzdGF0dXM6XCJcIiwgIC8vXHJcbiAgICBqb2luZWQ6MCwvL+eUqOaIt+aYr+WQpuWKoOWFpeaLvOWbolxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuXHJcbiAgfVxyXG5cclxuICBvbkxvYWQob3B0aW9ucyl7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zLFwi5p+l55yL6aG16Z2i5Y+C5pWwXCIpXHJcbiAgICAvLyB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlcjtcclxuICAgIHRoaXMuZ3JvdXBpZCA9IG9wdGlvbnMuZ3JvdXBpZDtcclxuICAgIHRoaXMub3JkZXIgPSBcIjU5ZjQxNzUxNzgxOThcIjtcclxuICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgY29tbS53eFJlcXVlc3Qoe3F1ZXJ5Ontncm91cElkOnRoaXMub3JkZXIsdWlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1aWQnKX19LGFwaS5vcmRlckdyb3VwRGV0YWlsLGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgIHJlcy5kYXRhLmRhdGEuZ3JvdXAubG9nbyA9IGAke2FwaS5hcGlVcmx9LyR7cmVzLmRhdGEuZGF0YS5ncm91cC5sb2dvfWBcclxuICAgICAgIHRoYXQucHJvZHVjdCA9IHJlcy5kYXRhLmRhdGEuZ3JvdXA7XHJcbiAgICAgICAgdGhhdC5ncm91cHN0YXR1cyA9IHJlcy5kYXRhLmRhdGEuZ3JvdXAuc3RhdHVzO1xyXG4gICAgICAgIHRoYXQuam9pbmVkID0gcmVzLmRhdGEuZGF0YS5ncm91cC5qb2luZWQ7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmpvaW5lZCxcInRoYXRcIilcclxuICAgICAgIGxldCBncm91cExpc3QgPSByZXMuZGF0YS5kYXRhLnJlY29tbWVuZDtcclxuICAgICAgIGxldCB0aW1lID0gcmVzLmRhdGEuZGF0YS5ncm91cC5lbmRUaW1lKjEwMDA7XHJcbiAgICAgICBsZXQgX3RpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgIHRpbWUgLT0xMDAwO1xyXG4gICAgICAgICBpZih0aW1lID09JzAnKXtcclxuICAgICAgICAgICB0aW1lID0gXCIwMDowMDowMFwiO1xyXG4gICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RpbWUpO1xyXG4gICAgICAgICAgIHRoYXQucGFnZVRpbWUgPSBcIjAwOjAwOjAwXCI7XHJcbiAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgdGhhdC5wYWdlVGltZSA9IGNvbW0uZGF0ZWZvcm1hdCh0aW1lKTtcclxuICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICB9LDEwMDApXHJcbiAgICAgICBsZXQgZ3JvdXBVc2VyID0gcmVzLmRhdGEuZGF0YS5ncm91cFVzZXI7XHJcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwVXNlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgZ3JvdXBVc2VyW2ldLmF2YXRhclVybCA9IGAke2FwaS5hcGlVcmx9LyR7Z3JvdXBVc2VyW2ldLmF2YXRhclVybH1gIFxyXG4gICAgICAgICBcclxuICAgICAgIH1cclxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBncm91cExpc3RbaV0ubG9nbyA9IGAke2FwaS5hcGlVcmx9LyR7Z3JvdXBMaXN0W2ldLmxvZ299YFxyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBncm91cExpc3RbaV0udXNlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgZ3JvdXBMaXN0W2ldLnVzZXJzW2pdLmF2YXRhclVybCA9IGAke2FwaS5hcGlVcmx9LyR7Z3JvdXBMaXN0W2ldLnVzZXJzW2pdLmF2YXRhclVybH1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICB0aGF0Lmdyb3VwTGlzdCA9IGdyb3VwTGlzdDtcclxuICAgICAgIHRoYXQuZ3JvdXBVc2VyID0gZ3JvdXBVc2VyO1xyXG4gICAgICAgY29uc29sZS5sb2coZ3JvdXBMaXN0KVxyXG4gICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBvblNob3coKXtcclxuICAgIGNvbnNvbGUubG9nKFwic2hvd1wiKVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBvblJlYWR5KCl7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG4gICAgaWYgKHJlcy5mcm9tID09PSBcImJ1dHRvblwiKSB7XHJcbiAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxyXG4gICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICfnpr7okaHlhbDmiqTogqTllYbln44nLFxyXG4gICAgICBwYXRoOiAnL3BhZ2VzL2ludml0ZUZpZ2h0L2ludml0ZUZpZ2h0P2dyb3VwaWQ9JytgJHt0aGlzLnByb2R1Y3QuZ3JvdXBJZH1gLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyDovazlj5HmiJDlip9cclxuICAgICAgICBjb25zb2xlLmxvZyhcIui9rOWPkeaIkOWKn1wiKVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAvLyDovazlj5HlpLHotKVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2F0Y2ggPSB7XHJcbiAgICBwYWdlVGltZShuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhgbnVtIHZhbHVlOiAke29sZFZhbHVlfSAtPiAke25ld1ZhbHVlfWApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuIl19