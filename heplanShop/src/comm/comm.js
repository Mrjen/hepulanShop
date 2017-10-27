export default class comm {
    // 格式化日期
    static time(unixtime, withTime) {
      if (!unixtime) {
        unixtime = (new Date()).getTime();
      } else {
        unixtime *= 1000;
      }
      let nd = new Date(unixtime),
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
      let hour = nd.getHours(),
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
      return month + '/' + day + ' ' + hour + ':' + minute +':'+ second; 
    }
   
    // 毫秒转换成时分秒
    static timeSecend(s) {
        let t;
        if(s > -1){
            let hour = Math.floor(s/3600);
            let min = Math.floor(s/60) % 60;
            let sec = s % 60;
            if(hour < 10) {
                t = '0'+ hour + ":";
            } else {
                t = hour + ":";
            }
            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(2);
        }
        return t;
    }


    static dateformat(micro_second) {
        // 秒数
        var second = Math.floor(micro_second / 1000);
        // 小时位
        var day = Math.floor(second/86400);

        if (day < 10) {
            day = '0' + day;
        }
        var hr = Math.floor((second-day*86400) / 3600);
        // 分钟位
        if (hr < 10) {
            hr = '0' + hr;
        }

        var min = Math.floor((second - hr * 3600-day*86400) / 60);
        if (min<10) {
           min = '0' + min;
        }
        // 秒位
        var sec = (second - hr * 3600 - min * 60-day*86400); // equal to => var sec = second % 60;
        // 毫秒位，保留2位
        if (sec<10) {
           sec = '0' + sec;
        }
        var micro_sec = Math.floor((micro_second % 1000) / 10);

        return day + ":" + hr + ":" + min + ":" + sec;
      }

    //   获取sign
    static getSign(cb){
        wx.login({
            success(res){
                console.log("comm code",res)
                let url = 'https://hepulan-mall.playonwechat.com/shop/User/registry'
                wx.request({
                    url:`${url}?code=${res.code}`,
                    success(res){
                        wx.setStorageSync("uid",res.data.data.uid);
                        typeof cb == 'function'&&cb(res)
                    },
                    fail(res){
                        console.log("获取用户uid失败")
                    }
                })
                
            },
            fail(res){
                console.log("失败")
            }
        })
    }

    static wxRequest(params={},url,cb){
        let data = params.query || {};
        // data.sign = wx.getStorageSync('sign');
            wx.request({
            url:url,
            method:params.method || 'GET',
            data:data,
            header: { 'Content-Type': 'application/json' },
            success(res){
                typeof cb == 'function'&&cb(res);
            },
            fail(res){
                console.log("请求错误")
            }
        })
    }

  }

