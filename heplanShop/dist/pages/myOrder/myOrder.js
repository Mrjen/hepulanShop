'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
            navigationBarTitleText: "我的订单",
            navigationBarBackgroundColor: '#16382e',
            navigationBarTextStyle: '#fff'
        }, _this.data = {
            pageNav: [{
                id: 0,
                text: "全部",
                active: true
            }, {
                id: 1,
                text: "待付款",
                active: false
            }, {
                id: 2,
                text: "已付款",
                active: false
            }, {
                id: 3,
                text: "待收货",
                active: false
            }],
            list: [{
                gid: 0,
                img: "http://iph.href.lu/152x152",
                name: "禾葡兰丰润口红",
                oldprice: "198.00",
                price: "50.00",
                num: "3",
                total: "300",
                order_status: {
                    status: 0,
                    text: "交易关闭",
                    time: "1080000"
                }
            }, {
                gid: 0,
                img: "http://iph.href.lu/152x152",
                name: "禾葡兰丰润口红",
                oldprice: "198.00",
                price: "50.00",
                num: "3",
                total: "300",
                order_status: {
                    status: 1,
                    text: "交易成功",
                    time: "1080000"
                }
            }, {
                gid: 0,
                img: "http://iph.href.lu/152x152",
                name: "禾葡兰丰润口红",
                oldprice: "198.00",
                price: "50.00",
                num: "3",
                total: "300",
                order_status: {
                    status: 2,
                    text: "待支付",
                    time: "1080000"
                }
            }]
        }, _this.methods = {
            changeNav: function changeNav(index) {
                for (var i = 0; i < this.pageNav.length; i++) {
                    this.pageNav[i].active = false;
                }
                this.pageNav[index].active = true;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/myOrder/myOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15T3JkZXIuanMiXSwibmFtZXMiOlsiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiZGF0YSIsInBhZ2VOYXYiLCJpZCIsInRleHQiLCJhY3RpdmUiLCJsaXN0IiwiZ2lkIiwiaW1nIiwibmFtZSIsIm9sZHByaWNlIiwicHJpY2UiLCJudW0iLCJ0b3RhbCIsIm9yZGVyX3N0YXR1cyIsInN0YXR1cyIsInRpbWUiLCJtZXRob2RzIiwiY2hhbmdlTmF2IiwiaW5kZXgiLCJpIiwibGVuZ3RoIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4TEFFSUEsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQywwQ0FBOEIsU0FGekI7QUFHTEMsb0NBQXdCO0FBSG5CLFMsUUFLVEMsSSxHQUFPO0FBQ0pDLHFCQUFRLENBQUM7QUFDTEMsb0JBQUcsQ0FERTtBQUVMQyxzQkFBSyxJQUZBO0FBR0xDLHdCQUFPO0FBSEYsYUFBRCxFQUlOO0FBQ0VGLG9CQUFHLENBREw7QUFFRUMsc0JBQUssS0FGUDtBQUdFQyx3QkFBTztBQUhULGFBSk0sRUFRTjtBQUNFRixvQkFBRyxDQURMO0FBRUVDLHNCQUFLLEtBRlA7QUFHRUMsd0JBQU87QUFIVCxhQVJNLEVBWU47QUFDRUYsb0JBQUcsQ0FETDtBQUVFQyxzQkFBSyxLQUZQO0FBR0VDLHdCQUFPO0FBSFQsYUFaTSxDQURKO0FBa0JKQyxrQkFBSyxDQUFDO0FBQ0ZDLHFCQUFJLENBREY7QUFFRkMscUJBQUksNEJBRkY7QUFHRkMsc0JBQUssU0FISDtBQUlGQywwQkFBUyxRQUpQO0FBS0ZDLHVCQUFNLE9BTEo7QUFNRkMscUJBQUksR0FORjtBQU9GQyx1QkFBTSxLQVBKO0FBUUZDLDhCQUFhO0FBQ1RDLDRCQUFPLENBREU7QUFFVFgsMEJBQUssTUFGSTtBQUdUWSwwQkFBSztBQUhJO0FBUlgsYUFBRCxFQWFIO0FBQ0VULHFCQUFJLENBRE47QUFFRUMscUJBQUksNEJBRk47QUFHRUMsc0JBQUssU0FIUDtBQUlFQywwQkFBUyxRQUpYO0FBS0VDLHVCQUFNLE9BTFI7QUFNRUMscUJBQUksR0FOTjtBQU9FQyx1QkFBTSxLQVBSO0FBUUVDLDhCQUFhO0FBQ1RDLDRCQUFPLENBREU7QUFFVFgsMEJBQUssTUFGSTtBQUdUWSwwQkFBSztBQUhJO0FBUmYsYUFiRyxFQTBCSDtBQUNFVCxxQkFBSSxDQUROO0FBRUVDLHFCQUFJLDRCQUZOO0FBR0VDLHNCQUFLLFNBSFA7QUFJRUMsMEJBQVMsUUFKWDtBQUtFQyx1QkFBTSxPQUxSO0FBTUVDLHFCQUFJLEdBTk47QUFPRUMsdUJBQU0sS0FQUjtBQVFFQyw4QkFBYTtBQUNUQyw0QkFBTyxDQURFO0FBRVRYLDBCQUFLLEtBRkk7QUFHVFksMEJBQUs7QUFISTtBQVJmLGFBMUJHO0FBbEJELFMsUUE0RFBDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDSUMsS0FESixFQUNVO0FBQ1oscUJBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS2xCLE9BQUwsQ0FBYW1CLE1BQTNCLEVBQWtDRCxHQUFsQyxFQUFzQztBQUNsQyx5QkFBS2xCLE9BQUwsQ0FBYWtCLENBQWIsRUFBZ0JmLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0g7QUFDRCxxQkFBS0gsT0FBTCxDQUFhaUIsS0FBYixFQUFvQmQsTUFBcEIsR0FBNkIsSUFBN0I7QUFDQSxxQkFBS2lCLE1BQUw7QUFDSDtBQVBLLFM7Ozs7RUFsRWUsZUFBS0MsSSIsImZpbGUiOiJteU9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaIkeeahOiuouWNlVwiLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMTYzODJlJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnI2ZmZidcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICBwYWdlTmF2Olt7XHJcbiAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICB0ZXh0Olwi5YWo6YOoXCIsXHJcbiAgICAgICAgICAgYWN0aXZlOnRydWVcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIGlkOjEsXHJcbiAgICAgICAgICAgdGV4dDpcIuW+heS7mOasvlwiLFxyXG4gICAgICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICAgfSx7XHJcbiAgICAgICAgICAgaWQ6MixcclxuICAgICAgICAgICB0ZXh0Olwi5bey5LuY5qy+XCIsXHJcbiAgICAgICAgICAgYWN0aXZlOmZhbHNlXHJcbiAgICAgICB9LHtcclxuICAgICAgICAgICBpZDozLFxyXG4gICAgICAgICAgIHRleHQ6XCLlvoXmlLbotKdcIixcclxuICAgICAgICAgICBhY3RpdmU6ZmFsc2VcclxuICAgICAgIH1dLFxyXG4gICAgICAgbGlzdDpbe1xyXG4gICAgICAgICAgIGdpZDowLFxyXG4gICAgICAgICAgIGltZzpcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTJ4MTUyXCIsXHJcbiAgICAgICAgICAgbmFtZTpcIuemvuiRoeWFsOS4sOa2puWPo+e6olwiLFxyXG4gICAgICAgICAgIG9sZHByaWNlOlwiMTk4LjAwXCIsXHJcbiAgICAgICAgICAgcHJpY2U6XCI1MC4wMFwiLFxyXG4gICAgICAgICAgIG51bTpcIjNcIixcclxuICAgICAgICAgICB0b3RhbDpcIjMwMFwiLFxyXG4gICAgICAgICAgIG9yZGVyX3N0YXR1czp7XHJcbiAgICAgICAgICAgICAgIHN0YXR1czowLFxyXG4gICAgICAgICAgICAgICB0ZXh0Olwi5Lqk5piT5YWz6ZetXCIsXHJcbiAgICAgICAgICAgICAgIHRpbWU6XCIxMDgwMDAwXCJcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9LHtcclxuICAgICAgICAgICBnaWQ6MCxcclxuICAgICAgICAgICBpbWc6XCJodHRwOi8vaXBoLmhyZWYubHUvMTUyeDE1MlwiLFxyXG4gICAgICAgICAgIG5hbWU6XCLnpr7okaHlhbDkuLDmtqblj6PnuqJcIixcclxuICAgICAgICAgICBvbGRwcmljZTpcIjE5OC4wMFwiLFxyXG4gICAgICAgICAgIHByaWNlOlwiNTAuMDBcIixcclxuICAgICAgICAgICBudW06XCIzXCIsXHJcbiAgICAgICAgICAgdG90YWw6XCIzMDBcIixcclxuICAgICAgICAgICBvcmRlcl9zdGF0dXM6e1xyXG4gICAgICAgICAgICAgICBzdGF0dXM6MSxcclxuICAgICAgICAgICAgICAgdGV4dDpcIuS6pOaYk+aIkOWKn1wiLFxyXG4gICAgICAgICAgICAgICB0aW1lOlwiMTA4MDAwMFwiXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSx7XHJcbiAgICAgICAgICAgZ2lkOjAsXHJcbiAgICAgICAgICAgaW1nOlwiaHR0cDovL2lwaC5ocmVmLmx1LzE1MngxNTJcIixcclxuICAgICAgICAgICBuYW1lOlwi56a+6JGh5YWw5Liw5ram5Y+j57qiXCIsXHJcbiAgICAgICAgICAgb2xkcHJpY2U6XCIxOTguMDBcIixcclxuICAgICAgICAgICBwcmljZTpcIjUwLjAwXCIsXHJcbiAgICAgICAgICAgbnVtOlwiM1wiLFxyXG4gICAgICAgICAgIHRvdGFsOlwiMzAwXCIsXHJcbiAgICAgICAgICAgb3JkZXJfc3RhdHVzOntcclxuICAgICAgICAgICAgICAgc3RhdHVzOjIsXHJcbiAgICAgICAgICAgICAgIHRleHQ6XCLlvoXmlK/ku5hcIixcclxuICAgICAgICAgICAgICAgdGltZTpcIjEwODAwMDBcIlxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH1dXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjaGFuZ2VOYXYoaW5kZXgpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucGFnZU5hdi5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZU5hdltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOYXZbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICAgXHJcblxyXG4iXX0=