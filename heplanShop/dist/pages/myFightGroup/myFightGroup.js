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
                text: "拼团中",
                active: false
            }, {
                id: 3,
                text: "拼团成功",
                active: false
            }, {
                id: 4,
                text: "拼团失败",
                active: false
            }],
            list: [{
                gid: 0,
                img: "http://iph.href.lu/152x152",
                name: "禾葡兰丰润口红",
                oldprice: "198.00",
                price: "50.00",
                num: "3",
                total: "300"
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/myFightGroup/myFightGroup'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15RmlnaHRHcm91cC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwicGFnZU5hdiIsImlkIiwidGV4dCIsImFjdGl2ZSIsImxpc3QiLCJnaWQiLCJpbWciLCJuYW1lIiwib2xkcHJpY2UiLCJwcmljZSIsIm51bSIsInRvdGFsIiwibWV0aG9kcyIsImNoYW5nZU5hdiIsImluZGV4IiwiaSIsImxlbmd0aCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OExBRUlBLE0sR0FBUztBQUNMQyxvQ0FBd0IsTUFEbkI7QUFFTEMsMENBQThCLFNBRnpCO0FBR0xDLG9DQUF3QjtBQUhuQixTLFFBS1RDLEksR0FBTztBQUNKQyxxQkFBUSxDQUFDO0FBQ0xDLG9CQUFHLENBREU7QUFFTEMsc0JBQUssSUFGQTtBQUdMQyx3QkFBTztBQUhGLGFBQUQsRUFJTjtBQUNFRixvQkFBRyxDQURMO0FBRUVDLHNCQUFLLEtBRlA7QUFHRUMsd0JBQU87QUFIVCxhQUpNLEVBUU47QUFDRUYsb0JBQUcsQ0FETDtBQUVFQyxzQkFBSyxLQUZQO0FBR0VDLHdCQUFPO0FBSFQsYUFSTSxFQVlOO0FBQ0VGLG9CQUFHLENBREw7QUFFRUMsc0JBQUssTUFGUDtBQUdFQyx3QkFBTztBQUhULGFBWk0sRUFnQk47QUFDRUYsb0JBQUcsQ0FETDtBQUVFQyxzQkFBSyxNQUZQO0FBR0VDLHdCQUFPO0FBSFQsYUFoQk0sQ0FESjtBQXNCSkMsa0JBQUssQ0FBQztBQUNGQyxxQkFBSSxDQURGO0FBRUZDLHFCQUFJLDRCQUZGO0FBR0ZDLHNCQUFLLFNBSEg7QUFJRkMsMEJBQVMsUUFKUDtBQUtGQyx1QkFBTSxPQUxKO0FBTUZDLHFCQUFJLEdBTkY7QUFPRkMsdUJBQU07QUFQSixhQUFEO0FBdEJELFMsUUFpQ1BDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDSUMsS0FESixFQUNVO0FBQ1oscUJBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsS0FBS2YsT0FBTCxDQUFhZ0IsTUFBM0IsRUFBa0NELEdBQWxDLEVBQXNDO0FBQ2xDLHlCQUFLZixPQUFMLENBQWFlLENBQWIsRUFBZ0JaLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0g7QUFDRCxxQkFBS0gsT0FBTCxDQUFhYyxLQUFiLEVBQW9CWCxNQUFwQixHQUE2QixJQUE3QjtBQUNBLHFCQUFLYyxNQUFMO0FBQ0g7QUFQSyxTOzs7O0VBdkNlLGVBQUtDLEkiLCJmaWxlIjoibXlGaWdodEdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaIkeeahOiuouWNlVwiLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMTYzODJlJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnI2ZmZidcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICBwYWdlTmF2Olt7XHJcbiAgICAgICAgICAgaWQ6MCxcclxuICAgICAgICAgICB0ZXh0Olwi5YWo6YOoXCIsXHJcbiAgICAgICAgICAgYWN0aXZlOnRydWVcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIGlkOjEsXHJcbiAgICAgICAgICAgdGV4dDpcIuW+heS7mOasvlwiLFxyXG4gICAgICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICAgfSx7XHJcbiAgICAgICAgICAgaWQ6MixcclxuICAgICAgICAgICB0ZXh0Olwi5ou85Zui5LitXCIsXHJcbiAgICAgICAgICAgYWN0aXZlOmZhbHNlXHJcbiAgICAgICB9LHtcclxuICAgICAgICAgICBpZDozLFxyXG4gICAgICAgICAgIHRleHQ6XCLmi7zlm6LmiJDlip9cIixcclxuICAgICAgICAgICBhY3RpdmU6ZmFsc2VcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgIGlkOjQsXHJcbiAgICAgICAgICAgdGV4dDpcIuaLvOWbouWksei0pVwiLFxyXG4gICAgICAgICAgIGFjdGl2ZTpmYWxzZVxyXG4gICAgICAgfV0sXHJcbiAgICAgICBsaXN0Olt7XHJcbiAgICAgICAgICAgZ2lkOjAsXHJcbiAgICAgICAgICAgaW1nOlwiaHR0cDovL2lwaC5ocmVmLmx1LzE1MngxNTJcIixcclxuICAgICAgICAgICBuYW1lOlwi56a+6JGh5YWw5Liw5ram5Y+j57qiXCIsXHJcbiAgICAgICAgICAgb2xkcHJpY2U6XCIxOTguMDBcIixcclxuICAgICAgICAgICBwcmljZTpcIjUwLjAwXCIsXHJcbiAgICAgICAgICAgbnVtOlwiM1wiLFxyXG4gICAgICAgICAgIHRvdGFsOlwiMzAwXCJcclxuICAgICAgIH1dXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjaGFuZ2VOYXYoaW5kZXgpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMucGFnZU5hdi5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZU5hdltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOYXZbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICAgXHJcblxyXG4iXX0=