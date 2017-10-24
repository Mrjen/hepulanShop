import wepy from 'wepy';

const ApiUrl = 'hepulan-mall.playonwechat.com';

const wxRequest = async (params = {},url) => {
        let aaa = "";
        wepy.showToast({
            title: '加载中',
            icon: 'loading'
        });
        let data = params.query || {};
        data.sign = wepy.getStorageSync('sign');
        let res = await wepy.request({
            url: url,
            method: params.method || 'GET',
            data: data,
            header: { 'Content-Type': 'application/json' },
            success(res){
                console.log(res)
                aaa = res;
                console.log(aaa,"aaa")
            }
        });
        wepy.hideToast();
        return res;
};

 
module.exports = {
    wxRequest
}