import wepy from 'wepy';

const wxRequest = async (params = {},url) => {
        let aaa = "";
        let data = params.query || {};
        // data.sign = wepy.getStorageSync('sign');
        let res = await wepy.request({
            url: url,
            method: params.method || 'GET',
            data: data,
            header: { 'Content-Type': 'application/json' },
            success(res){
                aaa = res;
            }
        });
        return aaa;
};

 
module.exports = {
    wxRequest
}