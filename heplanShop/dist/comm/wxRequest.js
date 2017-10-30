'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var wxRequest = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var url = arguments[1];
        var aaa, data, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        aaa = "";
                        data = params.query || {};
                        // data.sign = wepy.getStorageSync('sign');

                        _context.next = 4;
                        return _wepy2.default.request({
                            url: url,
                            method: params.method || 'GET',
                            data: data,
                            header: { 'Content-Type': 'application/json' },
                            success: function success(res) {
                                aaa = res;
                            }
                        });

                    case 4:
                        res = _context.sent;
                        return _context.abrupt('return', aaa);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function wxRequest() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    wxRequest: wxRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJwYXJhbXMiLCJ1cmwiLCJhYWEiLCJkYXRhIiwicXVlcnkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUE7QUFBQSx1RUFBWTtBQUFBLFlBQU9DLE1BQVAsdUVBQWdCLEVBQWhCO0FBQUEsWUFBbUJDLEdBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNOQywyQkFETSxHQUNBLEVBREE7QUFFTkMsNEJBRk0sR0FFQ0gsT0FBT0ksS0FBUCxJQUFnQixFQUZqQjtBQUdWOztBQUhVO0FBQUEsK0JBSU0sZUFBS0MsT0FBTCxDQUFhO0FBQ3pCSixpQ0FBS0EsR0FEb0I7QUFFekJLLG9DQUFRTixPQUFPTSxNQUFQLElBQWlCLEtBRkE7QUFHekJILGtDQUFNQSxJQUhtQjtBQUl6Qkksb0NBQVEsRUFBRSxnQkFBZ0Isa0JBQWxCLEVBSmlCO0FBS3pCQyxtQ0FMeUIsbUJBS2pCQyxHQUxpQixFQUtiO0FBQ1JQLHNDQUFNTyxHQUFOO0FBQ0g7QUFQd0IseUJBQWIsQ0FKTjs7QUFBQTtBQUlOQSwyQkFKTTtBQUFBLHlEQWFIUCxHQWJHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFpQkFRLE9BQU9DLE9BQVAsR0FBaUI7QUFDYlo7QUFEYSxDQUFqQiIsImZpbGUiOiJ3eFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmNvbnN0IHd4UmVxdWVzdCA9IGFzeW5jIChwYXJhbXMgPSB7fSx1cmwpID0+IHtcclxuICAgICAgICBsZXQgYWFhID0gXCJcIjtcclxuICAgICAgICBsZXQgZGF0YSA9IHBhcmFtcy5xdWVyeSB8fCB7fTtcclxuICAgICAgICAvLyBkYXRhLnNpZ24gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdzaWduJyk7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgIGFhYSA9IHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhYWE7XHJcbn07XHJcblxyXG4gXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgd3hSZXF1ZXN0XHJcbn0iXX0=