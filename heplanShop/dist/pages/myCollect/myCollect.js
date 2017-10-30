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
      navigationBarTitleText: "我的收藏",
      navigationBarBackgroundColor: '#16382e',
      navigationBarTextStyle: '#fff'
    }, _this.data = {
      list: [{
        gid: 0,
        img: "http://iph.href.lu/152x152",
        name: "美瞳赋活护理套装",
        oldprice: "198.00",
        price: "49.00"
      }, {
        gid: 0,
        img: "http://iph.href.lu/152x152",
        name: "美瞳赋活护理套装",
        oldprice: "198.00",
        price: "49.00"
      }, {
        gid: 0,
        img: "http://iph.href.lu/152x152",
        name: "美瞳赋活护理套装",
        oldprice: "198.00",
        price: "49.00"
      }]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return _default;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(_default , 'pages/myCollect/myCollect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15Q29sbGVjdC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJkYXRhIiwibGlzdCIsImdpZCIsImltZyIsIm5hbWUiLCJvbGRwcmljZSIsInByaWNlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFFSUEsTSxHQUFTO0FBQ0xDLDhCQUF3QixNQURuQjtBQUVMQyxvQ0FBOEIsU0FGekI7QUFHTEMsOEJBQXdCO0FBSG5CLEssUUFLVEMsSSxHQUFPO0FBQ0hDLFlBQUssQ0FBQztBQUNKQyxhQUFJLENBREE7QUFFSkMsYUFBSSw0QkFGQTtBQUdKQyxjQUFLLFVBSEQ7QUFJSkMsa0JBQVMsUUFKTDtBQUtKQyxlQUFNO0FBTEYsT0FBRCxFQU1IO0FBQ0FKLGFBQUksQ0FESjtBQUVBQyxhQUFJLDRCQUZKO0FBR0FDLGNBQUssVUFITDtBQUlBQyxrQkFBUyxRQUpUO0FBS0FDLGVBQU07QUFMTixPQU5HLEVBWUg7QUFDQUosYUFBSSxDQURKO0FBRUFDLGFBQUksNEJBRko7QUFHQUMsY0FBSyxVQUhMO0FBSUFDLGtCQUFTLFFBSlQ7QUFLQUMsZUFBTTtBQUxOLE9BWkc7QUFERixLOzs7O0VBTmtCLGVBQUtDLEkiLCJmaWxlIjoibXlDb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi5oiR55qE5pS26JePXCIsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMxNjM4MmUnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcjZmZmJ1xyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsaXN0Olt7XHJcbiAgICAgICAgICBnaWQ6MCxcclxuICAgICAgICAgIGltZzpcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTJ4MTUyXCIsXHJcbiAgICAgICAgICBuYW1lOlwi576O556z6LWL5rS75oqk55CG5aWX6KOFXCIsXHJcbiAgICAgICAgICBvbGRwcmljZTpcIjE5OC4wMFwiLFxyXG4gICAgICAgICAgcHJpY2U6XCI0OS4wMFwiXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICBnaWQ6MCxcclxuICAgICAgICAgIGltZzpcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTJ4MTUyXCIsXHJcbiAgICAgICAgICBuYW1lOlwi576O556z6LWL5rS75oqk55CG5aWX6KOFXCIsXHJcbiAgICAgICAgICBvbGRwcmljZTpcIjE5OC4wMFwiLFxyXG4gICAgICAgICAgcHJpY2U6XCI0OS4wMFwiXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICBnaWQ6MCxcclxuICAgICAgICAgIGltZzpcImh0dHA6Ly9pcGguaHJlZi5sdS8xNTJ4MTUyXCIsXHJcbiAgICAgICAgICBuYW1lOlwi576O556z6LWL5rS75oqk55CG5aWX6KOFXCIsXHJcbiAgICAgICAgICBvbGRwcmljZTpcIjE5OC4wMFwiLFxyXG4gICAgICAgICAgcHJpY2U6XCI0OS4wMFwiXHJcbiAgICAgICAgfV1cclxuICAgIH1cclxufSBcclxuIl19