'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var comm = function () {
    function comm() {
        _classCallCheck(this, comm);
    }

    _createClass(comm, null, [{
        key: 'time',

        // 格式化日期
        value: function time(unixtime, withTime) {
            if (!unixtime) {
                unixtime = new Date().getTime();
            } else {
                unixtime *= 1000;
            }
            var nd = new Date(unixtime),
                year = nd.getFullYear(),
                month = nd.getMonth() + 1,
                day = nd.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (!withTime) {
                return year + '-' + month + '-' + day;
            }
            var hour = nd.getHours(),
                minute = nd.getMinutes(),
                second = nd.getSeconds();
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            //   return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; 
            return month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        }

        // 毫秒转换成时分秒

    }, {
        key: 'timeSecend',
        value: function timeSecend(s) {
            var t = void 0;
            if (s > -1) {
                var hour = Math.floor(s / 3600);
                var min = Math.floor(s / 60) % 60;
                var sec = s % 60;
                if (hour < 10) {
                    t = '0' + hour + ":";
                } else {
                    t = hour + ":";
                }
                if (min < 10) {
                    t += "0";
                }
                t += min + ":";
                if (sec < 10) {
                    t += "0";
                }
                t += sec.toFixed(2);
            }
            return t;
        }
    }, {
        key: 'dateformat',
        value: function dateformat(micro_second) {
            // 秒数
            var second = Math.floor(micro_second / 1000);
            // 小时位
            var day = Math.floor(second / 86400);

            if (day < 10) {
                day = '0' + day;
            }
            var hr = Math.floor((second - day * 86400) / 3600);
            // 分钟位
            if (hr < 10) {
                hr = '0' + hr;
            }

            var min = Math.floor((second - hr * 3600 - day * 86400) / 60);
            if (min < 10) {
                min = '0' + min;
            }
            // 秒位
            var sec = second - hr * 3600 - min * 60 - day * 86400; // equal to => var sec = second % 60;
            // 毫秒位，保留2位
            if (sec < 10) {
                sec = '0' + sec;
            }
            var micro_sec = Math.floor(micro_second % 1000 / 10);

            return day + ":" + hr + ":" + min + ":" + sec;
        }

        //   获取sign

    }, {
        key: 'getSign',
        value: function getSign(cb) {
            wx.login({
                success: function success(res) {
                    console.log("comm code", res);
                    var url = 'https://hepulan-mall.playonwechat.com/shop/User/registry';
                    wx.request({
                        url: url + '?code=' + res.code,
                        success: function success(res) {
                            wx.setStorageSync("uid", res.data.data.uid);
                            typeof cb == 'function' && cb(res);
                        },
                        fail: function fail(res) {
                            console.log("获取用户uid失败");
                        }
                    });
                },
                fail: function fail(res) {
                    console.log("失败");
                }
            });
        }
    }, {
        key: 'wxRequest',
        value: function wxRequest() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var url = arguments[1];
            var cb = arguments[2];

            var data = params.query || {};
            // data.sign = wx.getStorageSync('sign');
            wx.request({
                url: url,
                method: params.method || 'GET',
                data: data,
                header: { 'Content-Type': 'application/json' },
                success: function success(res) {
                    typeof cb == 'function' && cb(res);
                },
                fail: function fail(res) {
                    console.log("请求错误");
                }
            });
        }
    }]);

    return comm;
}();

exports.default = comm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW0uanMiXSwibmFtZXMiOlsiY29tbSIsInVuaXh0aW1lIiwid2l0aFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm5kIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsInMiLCJ0IiwiTWF0aCIsImZsb29yIiwibWluIiwic2VjIiwidG9GaXhlZCIsIm1pY3JvX3NlY29uZCIsImhyIiwibWljcm9fc2VjIiwiY2IiLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ1cmwiLCJyZXF1ZXN0IiwiY29kZSIsInNldFN0b3JhZ2VTeW5jIiwiZGF0YSIsInVpZCIsImZhaWwiLCJwYXJhbXMiLCJxdWVyeSIsIm1ldGhvZCIsImhlYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsSTs7Ozs7Ozs7QUFDakI7NkJBQ1lDLFEsRUFBVUMsUSxFQUFVO0FBQzlCLGdCQUFJLENBQUNELFFBQUwsRUFBZTtBQUNiQSwyQkFBWSxJQUFJRSxJQUFKLEVBQUQsQ0FBYUMsT0FBYixFQUFYO0FBQ0QsYUFGRCxNQUVPO0FBQ0xILDRCQUFZLElBQVo7QUFDRDtBQUNELGdCQUFJSSxLQUFLLElBQUlGLElBQUosQ0FBU0YsUUFBVCxDQUFUO0FBQUEsZ0JBQ0VLLE9BQU9ELEdBQUdFLFdBQUgsRUFEVDtBQUFBLGdCQUVFQyxRQUFRSCxHQUFHSSxRQUFILEtBQWdCLENBRjFCO0FBQUEsZ0JBR0VDLE1BQU1MLEdBQUdNLE9BQUgsRUFIUjtBQUlBLGdCQUFJSCxRQUFRLEVBQVosRUFBZ0I7QUFDZEEsd0JBQVEsTUFBTUEsS0FBZDtBQUNEO0FBQ0QsZ0JBQUlFLE1BQU0sRUFBVixFQUFjO0FBQ1pBLHNCQUFNLE1BQU1BLEdBQVo7QUFDRDtBQUNELGdCQUFJLENBQUNSLFFBQUwsRUFB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Y29tbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbW0ge1xyXG4gICAgLy8g5qC85byP5YyW5pel5pyfXHJcbiAgICBzdGF0aWMgdGltZSh1bml4dGltZSwgd2l0aFRpbWUpIHtcclxuICAgICAgaWYgKCF1bml4dGltZSkge1xyXG4gICAgICAgIHVuaXh0aW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1bml4dGltZSAqPSAxMDAwO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBuZCA9IG5ldyBEYXRlKHVuaXh0aW1lKSxcclxuICAgICAgICB5ZWFyID0gbmQuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBtb250aCA9IG5kLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIGRheSA9IG5kLmdldERhdGUoKTtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBtb250aCA9ICcwJyArIG1vbnRoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4gICAgICAgIGRheSA9ICcwJyArIGRheTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXdpdGhUaW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgaG91ciA9IG5kLmdldEhvdXJzKCksXHJcbiAgICAgICAgbWludXRlID0gbmQuZ2V0TWludXRlcygpLFxyXG4gICAgICAgIHNlY29uZCA9IG5kLmdldFNlY29uZHMoKTtcclxuICAgICAgaWYgKGhvdXIgPCAxMCkge1xyXG4gICAgICAgIGhvdXIgPSAnMCcgKyBob3VyO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtaW51dGUgPCAxMCkge1xyXG4gICAgICAgIG1pbnV0ZSA9ICcwJyArIG1pbnV0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2Vjb25kIDwgMTApIHtcclxuICAgICAgICBzZWNvbmQgPSAnMCcgKyBzZWNvbmQ7XHJcbiAgICAgIH1cclxuICAgIC8vICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheSArICcgJyArIGhvdXIgKyAnOicgKyBtaW51dGUgKyAnOicgKyBzZWNvbmQ7IFxyXG4gICAgICByZXR1cm4gbW9udGggKyAnLycgKyBkYXkgKyAnICcgKyBob3VyICsgJzonICsgbWludXRlICsnOicrIHNlY29uZDsgXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLy8g5q+r56eS6L2s5o2i5oiQ5pe25YiG56eSXHJcbiAgICBzdGF0aWMgdGltZVNlY2VuZChzKSB7XHJcbiAgICAgICAgbGV0IHQ7XHJcbiAgICAgICAgaWYocyA+IC0xKXtcclxuICAgICAgICAgICAgbGV0IGhvdXIgPSBNYXRoLmZsb29yKHMvMzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKHMvNjApICUgNjA7XHJcbiAgICAgICAgICAgIGxldCBzZWMgPSBzICUgNjA7XHJcbiAgICAgICAgICAgIGlmKGhvdXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgdCA9ICcwJysgaG91ciArIFwiOlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdCA9IGhvdXIgKyBcIjpcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihtaW4gPCAxMCl7dCArPSBcIjBcIjt9XHJcbiAgICAgICAgICAgIHQgKz0gbWluICsgXCI6XCI7XHJcbiAgICAgICAgICAgIGlmKHNlYyA8IDEwKXt0ICs9IFwiMFwiO31cclxuICAgICAgICAgICAgdCArPSBzZWMudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBkYXRlZm9ybWF0KG1pY3JvX3NlY29uZCkge1xyXG4gICAgICAgIC8vIOenkuaVsFxyXG4gICAgICAgIHZhciBzZWNvbmQgPSBNYXRoLmZsb29yKG1pY3JvX3NlY29uZCAvIDEwMDApO1xyXG4gICAgICAgIC8vIOWwj+aXtuS9jVxyXG4gICAgICAgIHZhciBkYXkgPSBNYXRoLmZsb29yKHNlY29uZC84NjQwMCk7XHJcblxyXG4gICAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4gICAgICAgICAgICBkYXkgPSAnMCcgKyBkYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBociA9IE1hdGguZmxvb3IoKHNlY29uZC1kYXkqODY0MDApIC8gMzYwMCk7XHJcbiAgICAgICAgLy8g5YiG6ZKf5L2NXHJcbiAgICAgICAgaWYgKGhyIDwgMTApIHtcclxuICAgICAgICAgICAgaHIgPSAnMCcgKyBocjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKChzZWNvbmQgLSBociAqIDM2MDAtZGF5Kjg2NDAwKSAvIDYwKTtcclxuICAgICAgICBpZiAobWluPDEwKSB7XHJcbiAgICAgICAgICAgbWluID0gJzAnICsgbWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp5LkvY1cclxuICAgICAgICB2YXIgc2VjID0gKHNlY29uZCAtIGhyICogMzYwMCAtIG1pbiAqIDYwLWRheSo4NjQwMCk7IC8vIGVxdWFsIHRvID0+IHZhciBzZWMgPSBzZWNvbmQgJSA2MDtcclxuICAgICAgICAvLyDmr6vnp5LkvY3vvIzkv53nlZky5L2NXHJcbiAgICAgICAgaWYgKHNlYzwxMCkge1xyXG4gICAgICAgICAgIHNlYyA9ICcwJyArIHNlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1pY3JvX3NlYyA9IE1hdGguZmxvb3IoKG1pY3JvX3NlY29uZCAlIDEwMDApIC8gMTApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF5ICsgXCI6XCIgKyBociArIFwiOlwiICsgbWluICsgXCI6XCIgKyBzZWM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAvLyAgIOiOt+WPlnNpZ25cclxuICAgIHN0YXRpYyBnZXRTaWduKGNiKXtcclxuICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tbSBjb2RlXCIscmVzKVxyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9ICdodHRwczovL2hlcHVsYW4tbWFsbC5wbGF5b253ZWNoYXQuY29tL3Nob3AvVXNlci9yZWdpc3RyeSdcclxuICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDpgJHt1cmx9P2NvZGU9JHtyZXMuY29kZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1aWRcIixyZXMuZGF0YS5kYXRhLnVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nJiZjYihyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi3dWlk5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKHJlcyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWksei0pVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgd3hSZXF1ZXN0KHBhcmFtcz17fSx1cmwsY2Ipe1xyXG4gICAgICAgIGxldCBkYXRhID0gcGFyYW1zLnF1ZXJ5IHx8IHt9O1xyXG4gICAgICAgIC8vIGRhdGEuc2lnbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzaWduJyk7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6dXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6cGFyYW1zLm1ldGhvZCB8fCAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YTpkYXRhLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgY2IgPT0gJ2Z1bmN0aW9uJyYmY2IocmVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fmsYLplJnor69cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiJdfQ==