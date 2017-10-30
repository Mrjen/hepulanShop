'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      swipeData: {
        type: Object,
        default: []
      }
    }, _this.data = {
      startX: null,
      moveX: null
    }, _this.methods = {
      ts: function ts(e) {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
          this.moveX = e.touches[0].clientX;
        }
      },
      tm: function tm(e) {
        if (e.touches.length === 1) {
          // 手指起始点位置与移动期间的差值
          var distenceX = this.moveX - e.touches[0].clientX;
          this.moveX = e.touches[0].clientX;

          if (this.swipeData.style - distenceX < -140) {
            this.swipeData.style = -140;
          } else if (this.swipeData.style - distenceX > 0) {
            this.swipeData.style = 0;
          } else {
            this.swipeData.style = this.swipeData.style - distenceX;
          }
          this.setData({
            swipeData: this.props.swipeData
          });
        }
      },
      te: function te(e) {
        if (e.changedTouches.length === 1) {
          if (this.swipeData.style <= -70) {
            this.swipeData.style = -140;
          } else {
            this.swipeData.style = 0;
          }
          this.setData({
            swipeData: this.props.swipeData
          });
        }
      },
      handleRightBtnTap: function handleRightBtnTap(item) {
        item = JSON.parse(JSON.stringify(item));
        delete item.style;
        this.$emit('delItem', item);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Counter, [{
    key: 'onLoad',
    value: function onLoad() {
      this.swipeData.style = 0;
    }
  }]);

  return Counter;
}(_wepy2.default.component);

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlcHktc3dpcGUtZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvdW50ZXIiLCJwcm9wcyIsInN3aXBlRGF0YSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0IiwiZGF0YSIsInN0YXJ0WCIsIm1vdmVYIiwibWV0aG9kcyIsInRzIiwiZSIsInRvdWNoZXMiLCJsZW5ndGgiLCJjbGllbnRYIiwidG0iLCJkaXN0ZW5jZVgiLCJzdHlsZSIsInNldERhdGEiLCJ0ZSIsImNoYW5nZWRUb3VjaGVzIiwiaGFuZGxlUmlnaHRCdG5UYXAiLCJpdGVtIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiJGVtaXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXO0FBQ1RDLGNBQU1DLE1BREc7QUFFVEMsaUJBQVM7QUFGQTtBQURMLEssUUFPUkMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxhQUFPO0FBRkYsSyxRQVNQQyxPLEdBQVU7QUFDUkMsUUFEUSxjQUNKQyxDQURJLEVBQ0Q7QUFDTCxZQUFJQSxFQUFFQyxPQUFGLENBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsZUFBS04sTUFBTCxHQUFjSSxFQUFFQyxPQUFGLENBQVUsQ0FBVixFQUFhRSxPQUEzQjtBQUNBLGVBQUtOLEtBQUwsR0FBYUcsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsT0FBMUI7QUFDRDtBQUNGLE9BTk87QUFPUkMsUUFQUSxjQU9KSixDQVBJLEVBT0Q7QUFDTCxZQUFJQSxFQUFFQyxPQUFGLENBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQSxjQUFJRyxZQUFZLEtBQUtSLEtBQUwsR0FBYUcsRUFBRUMsT0FBRixDQUFVLENBQVYsRUFBYUUsT0FBMUM7QUFDQSxlQUFLTixLQUFMLEdBQWFHLEVBQUVDLE9BQUYsQ0FBVSxDQUFWLEVBQWFFLE9BQTFCOztBQUVBLGNBQUssS0FBS1osU0FBTCxDQUFlZSxLQUFmLEdBQXVCRCxTQUF4QixHQUFxQyxDQUFDLEdBQTFDLEVBQStDO0FBQzdDLGlCQUFLZCxTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBQyxHQUF4QjtBQUNELFdBRkQsTUFFTyxJQUFLLEtBQUtmLFNBQUwsQ0FBZWUsS0FBZixHQUF1QkQsU0FBeEIsR0FBcUMsQ0FBekMsRUFBNEM7QUFDakQsaUJBQUtkLFNBQUwsQ0FBZWUsS0FBZixHQUF1QixDQUF2QjtBQUNELFdBRk0sTUFFQTtBQUNMLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsS0FBS2YsU0FBTCxDQUFlZSxLQUFmLEdBQXVCRCxTQUE5QztBQUNEO0FBQ0QsZUFBS0UsT0FBTCxDQUFhO0FBQ1hoQix1QkFBVyxLQUFLRCxLQUFMLENBQVdDO0FBRFgsV0FBYjtBQUdEO0FBQ0YsT0F4Qk87QUEwQlJpQixRQTFCUSxjQTBCSlIsQ0ExQkksRUEwQkQ7QUFDTCxZQUFJQSxFQUFFUyxjQUFGLENBQWlCUCxNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxjQUFJLEtBQUtYLFNBQUwsQ0FBZWUsS0FBZixJQUF3QixDQUFDLEVBQTdCLEVBQWlDO0FBQy9CLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBQyxHQUF4QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLZixTQUFMLENBQWVlLEtBQWYsR0FBdUIsQ0FBdkI7QUFDRDtBQUNELGVBQUtDLE9BQUwsQ0FBYTtBQUNYaEIsdUJBQVcsS0FBS0QsS0FBTCxDQUFXQztBQURYLFdBQWI7QUFHRDtBQUNGLE9BckNPO0FBc0NSbUIsdUJBdENRLDZCQXNDV0MsSUF0Q1gsRUFzQ2lCO0FBQ3ZCQSxlQUFPQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLFNBQUwsQ0FBZUgsSUFBZixDQUFYLENBQVA7QUFDQSxlQUFPQSxLQUFLTCxLQUFaO0FBQ0EsYUFBS1MsS0FBTCxDQUFXLFNBQVgsRUFBc0JKLElBQXRCO0FBQ0Q7QUExQ08sSzs7Ozs7NkJBSkE7QUFDUixXQUFLcEIsU0FBTCxDQUFlZSxLQUFmLEdBQXVCLENBQXZCO0FBQ0Q7Ozs7RUFma0MsZUFBS1UsUzs7a0JBQXJCM0IsTyIsImZpbGUiOiJ3ZXB5LXN3aXBlLWRlbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBzd2lwZURhdGE6IHtcbiAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICBkZWZhdWx0OiBbXVxuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBzdGFydFg6IG51bGwsXG4gICAgICBtb3ZlWDogbnVsbFxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnN3aXBlRGF0YS5zdHlsZSA9IDBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdHMgKGUpIHtcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0WCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgICAgdGhpcy5tb3ZlWCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0bSAoZSkge1xuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIC8vIOaJi+aMh+i1t+Wni+eCueS9jee9ruS4juenu+WKqOacn+mXtOeahOW3ruWAvFxuICAgICAgICAgIHZhciBkaXN0ZW5jZVggPSB0aGlzLm1vdmVYIC0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgICAgICB0aGlzLm1vdmVYID0gZS50b3VjaGVzWzBdLmNsaWVudFhcblxuICAgICAgICAgIGlmICgodGhpcy5zd2lwZURhdGEuc3R5bGUgLSBkaXN0ZW5jZVgpIDwgLTE0MCkge1xuICAgICAgICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSAtMTQwXG4gICAgICAgICAgfSBlbHNlIGlmICgodGhpcy5zd2lwZURhdGEuc3R5bGUgLSBkaXN0ZW5jZVgpID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSAwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3dpcGVEYXRhLnN0eWxlID0gdGhpcy5zd2lwZURhdGEuc3R5bGUgLSBkaXN0ZW5jZVhcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHN3aXBlRGF0YTogdGhpcy5wcm9wcy5zd2lwZURhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICB0ZSAoZSkge1xuICAgICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBpZiAodGhpcy5zd2lwZURhdGEuc3R5bGUgPD0gLTcwKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXBlRGF0YS5zdHlsZSA9IC0xNDBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zd2lwZURhdGEuc3R5bGUgPSAwXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzd2lwZURhdGE6IHRoaXMucHJvcHMuc3dpcGVEYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVJpZ2h0QnRuVGFwIChpdGVtKSB7XG4gICAgICAgIGl0ZW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGl0ZW0pKVxuICAgICAgICBkZWxldGUgaXRlbS5zdHlsZVxuICAgICAgICB0aGlzLiRlbWl0KCdkZWxJdGVtJywgaXRlbSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==