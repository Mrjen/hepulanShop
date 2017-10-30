"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepySwipeDelete = require('./../../components/wepy-swipe-delete.js');

var _wepySwipeDelete2 = _interopRequireDefault(_wepySwipeDelete);

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
      navigationBarTitleText: "购物车",
      navigationBarBackgroundColor: "#16382e",
      navigationBarTextStyle: "#fff"
    }, _this.$props = { "swipeDelete": { "xmlns:v-bind": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" }, "v-bind:swipeData.once": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" }, "xmlns:v-on": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" } } }, _this.$events = { "swipeDelete": { "v-on:delItem": "handleDelItem" } }, _this.components = {
      swipeDelete: _wepySwipeDelete2.default
    }, _this.data = {
      list: [{
        name: "倾慕丰润口红",
        price: "99.99",
        type: "天使绯红",
        num: 1,
        img: "http://iph.href.lu/370x230",
        select: 1
      }],
      count: 0, //选中的商品数量
      Money: 0, //选中的商品的总价格
      Allselect: 0, //商品是否全选
      buyData: [] //选中商品
    }, _this.methods = {
      // 修改商品数量
      changeNum: function changeNum(index, e) {
        var that = this;
        console.log(this.list);
        if (e > 0) {
          this.list[index].num++;
        } else if (this.list[index].num > 1 && e < 1) {
          this.list[index].num--;
        }
        console.log(this.list);
        this.count = this.countNum(this.list);
        this.Money = this.countMoney(this.list);
        this.$apply();
      },

      // 改变商品选中状态
      changeSelect: function changeSelect(index, id) {
        // console.log(index,id)
        var that = this;
        var select = this.list[index].selected;
        _comm2.default.wxRequest({
          query: {
            id: id,
            uid: wx.getStorageSync("uid"),
            selected: select == "1" ? "0" : "1"
          }
        }, _api2.default.shopSelsct, function (res) {
          if (res.data.status == "1") {
            that.list[index].selected = select == "1" ? "0" : "1";
            that.count = that.countNum(that.list);
            that.Money = that.countMoney(that.list);
            that.Allselect = that.allSelect(that.list);
            that.buyData = that.selectArry(that.list);
            that.$apply();
          } else {
            _tip2.default.showToast(res.data.msg);
          }
        });
      },
      handleDelItem: function handleDelItem(itemData) {
        console.log(itemData);
        var that = this;
        var id = itemData.id;
        _comm2.default.wxRequest({ query: { id: id, uid: wx.getStorageSync("uid") } }, _api2.default.delShopGoods, function (res) {
          if (res.data.status == "1") {
            for (var i = 0; i < that.list.length; i++) {
              if (that.list[i].id === id) {
                that.list.splice(i, 1);
              }
            }
            that.$apply();
            _tip2.default.success("删除成功");
          }
        });
      },

      // 点击结算购买商品
      buyGoods: function buyGoods() {
        var that = this;
        that.buyData = that.selectArry(that.list);
        _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid"), goods: this.buyData } }, _api2.default.onlyBuy, function (res) {
          if (res.data.status == "1") {
            _wepy2.default.navigateTo({
              url: "../submitOrder/submitOrder?order=" + res.data.data.order
            });
          } else {
            _tip2.default.alert(res.data.data.message);
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "countNum",


    // 计算选中的商品总数
    value: function countNum(list) {
      var count = new Number();
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected > 0) {
          count += Number(list[i].num);
        }
      }
      return count;
    }
    // 计算选中的商品的总金额

  }, {
    key: "countMoney",
    value: function countMoney(list) {
      var money = new Number();
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected > 0) {
          money += Number(list[i].goods.price) * Number(list[i].num);
        }
      }
      return money / 100;
    }
    // 判断是否全部选中

  }, {
    key: "allSelect",
    value: function allSelect(list) {
      var isAllSelect = 0;
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        arr.push(Number(list[i].selected));
      }
      isAllSelect = arr.indexOf(0) < 0 ? 1 : 0;
      if (arr.indexOf(0) < 0) {
        _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid"), selected: isAllSelect } }, _api2.default.shopSelectAll, function (res) {
          // console.log(res);
        });
      }
      return isAllSelect;
    }

    // 修改全选状态

  }, {
    key: "changeAllSelect",
    value: function changeAllSelect() {
      if (this.Allselect > 0) {
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].selected = 0;
        }
      } else {
        for (var _i = 0; _i < this.list.length; _i++) {
          this.list[_i].selected = 1;
        }
      }
      this.count = this.countNum(this.list);
      this.Money = this.countMoney(this.list);
      this.Allselect = this.allSelect(this.list);
      this.$apply();
    }

    //    计算选中商品数组

  }, {
    key: "selectArry",
    value: function selectArry(list) {
      var buyData = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected > 0) {
          buyData.push({
            goods: list[i].goods.id,
            option: list[i].option,
            num: list[i].num,
            id: list[i].id
          });
        }
      }
      return buyData;
    }

    // 页面显示加载初始数据

  }, {
    key: "onShow",
    value: function onShow() {
      var that = this;
      console.log();
      _comm2.default.wxRequest({ query: { uid: wx.getStorageSync("uid") } }, _api2.default.shopCartList, function (res) {
        console.log(res);
        var list = res.data.data;
        for (var i = 0; i < list.length; i++) {
          list[i].goods.logo = _api2.default.apiUrl + "/" + list[i].goods.logo;
          list[i].option = JSON.parse(list[i].option);
          list[i].style = 0;
        }
        that.list = list;
        that.count = that.countNum(list);
        that.Money = that.countMoney(list);
        that.Allselect = that.allSelect(list);
        that.buyData = that.selectArry(list);
        that.$apply();
      });
    }
  }]);

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/shopCart/shopCart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BDYXJ0LmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVEZWxldGUiLCJkYXRhIiwibGlzdCIsIm5hbWUiLCJwcmljZSIsInR5cGUiLCJudW0iLCJpbWciLCJzZWxlY3QiLCJjb3VudCIsIk1vbmV5IiwiQWxsc2VsZWN0IiwiYnV5RGF0YSIsIm1ldGhvZHMiLCJjaGFuZ2VOdW0iLCJpbmRleCIsImUiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsImNvdW50TnVtIiwiY291bnRNb25leSIsIiRhcHBseSIsImNoYW5nZVNlbGVjdCIsImlkIiwic2VsZWN0ZWQiLCJ3eFJlcXVlc3QiLCJxdWVyeSIsInVpZCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG9wU2Vsc2N0IiwicmVzIiwic3RhdHVzIiwiYWxsU2VsZWN0Iiwic2VsZWN0QXJyeSIsInNob3dUb2FzdCIsIm1zZyIsImhhbmRsZURlbEl0ZW0iLCJpdGVtRGF0YSIsImRlbFNob3BHb29kcyIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJzdWNjZXNzIiwiYnV5R29vZHMiLCJnb29kcyIsIm9ubHlCdXkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwib3JkZXIiLCJhbGVydCIsIm1lc3NhZ2UiLCJOdW1iZXIiLCJtb25leSIsImlzQWxsU2VsZWN0IiwiYXJyIiwicHVzaCIsImluZGV4T2YiLCJzaG9wU2VsZWN0QWxsIiwib3B0aW9uIiwic2hvcENhcnRMaXN0IiwibG9nbyIsImFwaVVybCIsIkpTT04iLCJwYXJzZSIsInN0eWxlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozsw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QUNBLGFBQUssSUFBSXdDLElBQUksQ0FBYixFQUFnQkEsSUFBSXZDLEtBQUt3QyxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDcEN2QyxlQUFLdUMsQ0FBTCxFQUFRSyxLQUFSLENBQWNnQixJQUFkLEdBQXdCLGNBQUlDLE1BQTVCLFNBQXNDN0QsS0FBS3VDLENBQUwsRUFBUUssS0FBUixDQUFjZ0IsSUFBcEQ7QUFDQTVELGVBQUt1QyxDQUFMLEVBQVFtQixNQUFSLEdBQWlCSSxLQUFLQyxLQUFMLENBQVcvRCxLQUFLdUMsQ0FBTCxFQUFRbUIsTUFBbkIsQ0FBakI7QUFDQTFELGVBQUt1QyxDQUFMLEVBQVF5QixLQUFSLEdBQWdCLENBQWhCO0FBQ0Q7QUFDRGpELGFBQUtmLElBQUwsR0FBWUEsSUFBWjtBQUNBZSxhQUFLUixLQUFMLEdBQWFRLEtBQUtHLFFBQUwsQ0FBY2xCLElBQWQsQ0FBYjtBQUNBZSxhQUFLUCxLQUFMLEdBQWFPLEtBQUtJLFVBQUwsQ0FBZ0JuQixJQUFoQixDQUFiO0FBQ0FlLGFBQUtOLFNBQUwsR0FBaUJNLEtBQUtpQixTQUFMLENBQWVoQyxJQUFmLENBQWpCO0FBQ0FlLGFBQUtMLE9BQUwsR0FBZUssS0FBS2tCLFVBQUwsQ0FBZ0JqQyxJQUFoQixDQUFmO0FBQ0FlLGFBQUtLLE1BQUw7QUFDRCxPQWpCSDtBQW1CRDs7OztFQWpOMEIsZUFBSzZDLEkiLCJmaWxlIjoic2hvcENhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcclxuaW1wb3J0IHN3aXBlRGVsZXRlIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3dlcHktc3dpcGUtZGVsZXRlXCI7XHJcbmltcG9ydCBjb21tIGZyb20gXCIuLi8uLi9jb21tL2NvbW1cIjtcclxuaW1wb3J0IHRpcCBmcm9tIFwiLi4vLi4vY29tbS90aXBcIjtcclxuaW1wb3J0IHd4UmVxdWVzdCBmcm9tIFwiLi4vLi4vY29tbS93eFJlcXVlc3RcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vYXBpL2FwaVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi6LSt54mp6L2mXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiMxNjM4MmVcIixcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiI2ZmZlwiXHJcbiAgfTtcclxuXHJcbiAkcHJvcHMgPSB7XCJzd2lwZURlbGV0ZVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiXCJ9LFwidi1iaW5kOnN3aXBlRGF0YS5vbmNlXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCJcIn0sXCJ4bWxuczp2LW9uXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCJcIn19fTtcclxuJGV2ZW50cyA9IHtcInN3aXBlRGVsZXRlXCI6e1widi1vbjpkZWxJdGVtXCI6XCJoYW5kbGVEZWxJdGVtXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBzd2lwZURlbGV0ZVxyXG4gIH07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBsaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcIuWAvuaFleS4sOa2puWPo+e6olwiLFxyXG4gICAgICAgIHByaWNlOiBcIjk5Ljk5XCIsXHJcbiAgICAgICAgdHlwZTogXCLlpKnkvb/nu6/nuqJcIixcclxuICAgICAgICBudW06IDEsXHJcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9pcGguaHJlZi5sdS8zNzB4MjMwXCIsXHJcbiAgICAgICAgc2VsZWN0OiAxXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBjb3VudDogMCwgLy/pgInkuK3nmoTllYblk4HmlbDph49cclxuICAgIE1vbmV5OiAwLCAvL+mAieS4reeahOWVhuWTgeeahOaAu+S7t+agvFxyXG4gICAgQWxsc2VsZWN0OiAwLCAvL+WVhuWTgeaYr+WQpuWFqOmAiVxyXG4gICAgYnV5RGF0YTogW10gLy/pgInkuK3llYblk4FcclxuICB9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgLy8g5L+u5pS55ZWG5ZOB5pWw6YePXHJcbiAgICBjaGFuZ2VOdW0oaW5kZXgsIGUpIHtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICAgIGlmIChlID4gMCkge1xyXG4gICAgICAgIHRoaXMubGlzdFtpbmRleF0ubnVtKys7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5saXN0W2luZGV4XS5udW0gPiAxICYmIGUgPCAxKSB7XHJcbiAgICAgICAgdGhpcy5saXN0W2luZGV4XS5udW0tLTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3QpXHJcbiAgICAgIHRoaXMuY291bnQgPSB0aGlzLmNvdW50TnVtKHRoaXMubGlzdCk7XHJcbiAgICAgIHRoaXMuTW9uZXkgPSB0aGlzLmNvdW50TW9uZXkodGhpcy5saXN0KTtcclxuICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH0sXHJcbiAgICAvLyDmlLnlj5jllYblk4HpgInkuK3nirbmgIFcclxuICAgIGNoYW5nZVNlbGVjdChpbmRleCwgaWQpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgsaWQpXHJcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgbGV0IHNlbGVjdCA9IHRoaXMubGlzdFtpbmRleF0uc2VsZWN0ZWQ7XHJcbiAgICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgdWlkOiB3eC5nZXRTdG9yYWdlU3luYyhcInVpZFwiKSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdCA9PSBcIjFcIiA/IFwiMFwiIDogXCIxXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwaS5zaG9wU2Vsc2N0LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICB0aGF0Lmxpc3RbaW5kZXhdLnNlbGVjdGVkID0gc2VsZWN0ID09IFwiMVwiID8gXCIwXCIgOiBcIjFcIjtcclxuICAgICAgICAgICAgdGhhdC5jb3VudCA9IHRoYXQuY291bnROdW0odGhhdC5saXN0KTtcclxuICAgICAgICAgICAgdGhhdC5Nb25leSA9IHRoYXQuY291bnRNb25leSh0aGF0Lmxpc3QpO1xyXG4gICAgICAgICAgICB0aGF0LkFsbHNlbGVjdCA9IHRoYXQuYWxsU2VsZWN0KHRoYXQubGlzdCk7XHJcbiAgICAgICAgICAgIHRoYXQuYnV5RGF0YSA9IHRoYXQuc2VsZWN0QXJyeSh0aGF0Lmxpc3QpO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLnNob3dUb2FzdChyZXMuZGF0YS5tc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVEZWxJdGVtKGl0ZW1EYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW1EYXRhKTtcclxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgaWQgPSBpdGVtRGF0YS5pZDtcclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAgeyBxdWVyeTogeyBpZDogaWQsIHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfSB9LFxyXG4gICAgICAgIGFwaS5kZWxTaG9wR29vZHMsXHJcbiAgICAgICAgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3RhdHVzID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoYXQubGlzdFtpXS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5Yig6Zmk5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvLyDngrnlh7vnu5PnrpfotK3kubDllYblk4FcclxuICAgIGJ1eUdvb2RzKCkge1xyXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoYXQuYnV5RGF0YSA9IHRoYXQuc2VsZWN0QXJyeSh0aGF0Lmxpc3QpO1xyXG4gICAgICBjb21tLnd4UmVxdWVzdChcclxuICAgICAgICB7IHF1ZXJ5OiB7IHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIiksIGdvb2RzOiB0aGlzLmJ1eURhdGEgfSB9LFxyXG4gICAgICAgIGFwaS5vbmx5QnV5LFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN0YXR1cyA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogYC4uL3N1Ym1pdE9yZGVyL3N1Ym1pdE9yZGVyP29yZGVyPSR7cmVzLmRhdGEuZGF0YS5vcmRlcn1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgdGlwLmFsZXJ0KHJlcy5kYXRhLmRhdGEubWVzc2FnZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8g6K6h566X6YCJ5Lit55qE5ZWG5ZOB5oC75pWwXHJcbiAgY291bnROdW0obGlzdCkge1xyXG4gICAgbGV0IGNvdW50ID0gbmV3IE51bWJlcigpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChsaXN0W2ldLnNlbGVjdGVkID4gMCkge1xyXG4gICAgICAgIGNvdW50ICs9IE51bWJlcihsaXN0W2ldLm51bSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudDtcclxuICB9XHJcbiAgLy8g6K6h566X6YCJ5Lit55qE5ZWG5ZOB55qE5oC76YeR6aKdXHJcbiAgY291bnRNb25leShsaXN0KSB7XHJcbiAgICBsZXQgbW9uZXkgPSBuZXcgTnVtYmVyKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGxpc3RbaV0uc2VsZWN0ZWQgPiAwKSB7XHJcbiAgICAgICAgbW9uZXkgKz0gTnVtYmVyKGxpc3RbaV0uZ29vZHMucHJpY2UpICogTnVtYmVyKGxpc3RbaV0ubnVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vbmV5IC8gMTAwO1xyXG4gIH1cclxuICAvLyDliKTmlq3mmK/lkKblhajpg6jpgInkuK1cclxuICBhbGxTZWxlY3QobGlzdCkge1xyXG4gICAgbGV0IGlzQWxsU2VsZWN0ID0gMDtcclxuICAgIGxldCBhcnIgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhcnIucHVzaChOdW1iZXIobGlzdFtpXS5zZWxlY3RlZCkpO1xyXG4gICAgfVxyXG4gICAgaXNBbGxTZWxlY3QgPSBhcnIuaW5kZXhPZigwKSA8IDAgPyAxIDogMDtcclxuICAgIGlmIChhcnIuaW5kZXhPZigwKSA8IDApIHtcclxuICAgICAgY29tbS53eFJlcXVlc3QoXHJcbiAgICAgICAgeyBxdWVyeTogeyB1aWQ6IHd4LmdldFN0b3JhZ2VTeW5jKFwidWlkXCIpLCBzZWxlY3RlZDogaXNBbGxTZWxlY3QgfSB9LFxyXG4gICAgICAgIGFwaS5zaG9wU2VsZWN0QWxsLFxyXG4gICAgICAgIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNBbGxTZWxlY3Q7XHJcbiAgfVxyXG5cclxuICAvLyDkv67mlLnlhajpgInnirbmgIFcclxuICBjaGFuZ2VBbGxTZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5BbGxzZWxlY3QgPiAwKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0W2ldLnNlbGVjdGVkID0gMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpc3RbaV0uc2VsZWN0ZWQgPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvdW50ID0gdGhpcy5jb3VudE51bSh0aGlzLmxpc3QpO1xyXG4gICAgdGhpcy5Nb25leSA9IHRoaXMuY291bnRNb25leSh0aGlzLmxpc3QpO1xyXG4gICAgdGhpcy5BbGxzZWxlY3QgPSB0aGlzLmFsbFNlbGVjdCh0aGlzLmxpc3QpO1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcblxyXG4gIC8vICAgIOiuoeeul+mAieS4reWVhuWTgeaVsOe7hFxyXG4gIHNlbGVjdEFycnkobGlzdCkge1xyXG4gICAgbGV0IGJ1eURhdGEgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobGlzdFtpXS5zZWxlY3RlZCA+IDApIHtcclxuICAgICAgICBidXlEYXRhLnB1c2goe1xyXG4gICAgICAgICAgZ29vZHM6IGxpc3RbaV0uZ29vZHMuaWQsXHJcbiAgICAgICAgICBvcHRpb246IGxpc3RbaV0ub3B0aW9uLFxyXG4gICAgICAgICAgbnVtOiBsaXN0W2ldLm51bSxcclxuICAgICAgICAgIGlkOiBsaXN0W2ldLmlkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBidXlEYXRhO1xyXG4gIH1cclxuXHJcbiAgLy8g6aG16Z2i5pi+56S65Yqg6L295Yid5aeL5pWw5o2uXHJcbiAgb25TaG93KCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc29sZS5sb2coKTtcclxuICAgIGNvbW0ud3hSZXF1ZXN0KFxyXG4gICAgICB7IHF1ZXJ5OiB7IHVpZDogd3guZ2V0U3RvcmFnZVN5bmMoXCJ1aWRcIikgfSB9LFxyXG4gICAgICBhcGkuc2hvcENhcnRMaXN0LFxyXG4gICAgICBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxpc3RbaV0uZ29vZHMubG9nbyA9IGAke2FwaS5hcGlVcmx9LyR7bGlzdFtpXS5nb29kcy5sb2dvfWA7XHJcbiAgICAgICAgICBsaXN0W2ldLm9wdGlvbiA9IEpTT04ucGFyc2UobGlzdFtpXS5vcHRpb24pO1xyXG4gICAgICAgICAgbGlzdFtpXS5zdHlsZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQubGlzdCA9IGxpc3Q7XHJcbiAgICAgICAgdGhhdC5jb3VudCA9IHRoYXQuY291bnROdW0obGlzdCk7XHJcbiAgICAgICAgdGhhdC5Nb25leSA9IHRoYXQuY291bnRNb25leShsaXN0KTtcclxuICAgICAgICB0aGF0LkFsbHNlbGVjdCA9IHRoYXQuYWxsU2VsZWN0KGxpc3QpO1xyXG4gICAgICAgIHRoYXQuYnV5RGF0YSA9IHRoYXQuc2VsZWN0QXJyeShsaXN0KTtcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=