'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepySwipeDelete = require('./../npm/wepy-swipe-delete/wepy-swipe-delete.js');

var _wepySwipeDelete2 = _interopRequireDefault(_wepySwipeDelete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$props = { "swipeDelete": { "xmlns:v-bind": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" }, "v-bind:swipeData.once": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" }, "xmlns:v-on": { "for": "list", "item": "item", "index": "index", "key": "index", "value": "" } } }, _this.$events = { "swipeDelete": { "v-on:delItem": "handleDelItem" } }, _this.components = {
      swipeDelete: _wepySwipeDelete2.default
    }, _this.data = {
      list: [{ id: 1, title: '标题1', style: 0 }, { id: 2, title: '标题2', style: 0 }]
    }, _this.methods = {
      handleDelItem: function handleDelItem(itemData) {
        console.log(itemData);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/demo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiSW5kZXgiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInN3aXBlRGVsZXRlIiwiZGF0YSIsImxpc3QiLCJpZCIsInRpdGxlIiwic3R5bGUiLCJtZXRob2RzIiwiaGFuZGxlRGVsSXRlbSIsIml0ZW1EYXRhIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNwQkMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQUMsT0FBTSxNQUFQLEVBQWMsUUFBTyxNQUFyQixFQUE0QixTQUFRLE9BQXBDLEVBQTRDLE9BQU0sT0FBbEQsRUFBMEQsU0FBUSxFQUFsRSxFQUFoQixFQUFzRix5QkFBd0IsRUFBQyxPQUFNLE1BQVAsRUFBYyxRQUFPLE1BQXJCLEVBQTRCLFNBQVEsT0FBcEMsRUFBNEMsT0FBTSxPQUFsRCxFQUEwRCxTQUFRLEVBQWxFLEVBQTlHLEVBQW9MLGNBQWEsRUFBQyxPQUFNLE1BQVAsRUFBYyxRQUFPLE1BQXJCLEVBQTRCLFNBQVEsT0FBcEMsRUFBNEMsT0FBTSxPQUFsRCxFQUEwRCxTQUFRLEVBQWxFLEVBQWpNLEVBQWYsRSxRQUNaQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsZ0JBQWUsZUFBaEIsRUFBZixFLFFBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssUUFJVkMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSixFQUFDQyxJQUFJLENBQUwsRUFBUUMsT0FBTyxLQUFmLEVBQXNCQyxPQUFPLENBQTdCLEVBREksRUFFSixFQUFDRixJQUFJLENBQUwsRUFBUUMsT0FBTyxLQUFmLEVBQXNCQyxPQUFPLENBQTdCLEVBRkk7QUFERCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxtQkFEUSx5QkFDT0MsUUFEUCxFQUNpQjtBQUN2QkMsZ0JBQVFDLEdBQVIsQ0FBWUYsUUFBWjtBQUNEO0FBSE8sSzs7OztFQWR1QixlQUFLRyxJOztrQkFBbkJmLEsiLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHN3aXBlRGVsZXRlIGZyb20gJ3dlcHktc3dpcGUtZGVsZXRlJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICRwcm9wcyA9IHtcInN3aXBlRGVsZXRlXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCJcIn0sXCJ2LWJpbmQ6c3dpcGVEYXRhLm9uY2VcIjp7XCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIlwifSxcInhtbG5zOnYtb25cIjp7XCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIlwifX19O1xyXG4kZXZlbnRzID0ge1wic3dpcGVEZWxldGVcIjp7XCJ2LW9uOmRlbEl0ZW1cIjpcImhhbmRsZURlbEl0ZW1cIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgc3dpcGVEZWxldGVcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAge2lkOiAxLCB0aXRsZTogJ+agh+mimDEnLCBzdHlsZTogMH0sXHJcbiAgICAgICAge2lkOiAyLCB0aXRsZTogJ+agh+mimDInLCBzdHlsZTogMH1cclxuICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGhhbmRsZURlbEl0ZW0gKGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbURhdGEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==