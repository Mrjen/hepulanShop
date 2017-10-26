import {wxRequest} from '../comm/wxRequest'

const apiUrl = 'https://hepulan-mall.playonwechat.com'

// 获取首页数据
const Home = apiUrl +'/shop/Home/page'
// 拼团页面数据
const fightGroup = apiUrl +'/shop/Group/page'
// 拼团商品详情
const groupDetail = apiUrl+'/shop/Group/detail'
// 收藏
const Collect = apiUrl+'/shop/Collect/collect'
// 加入购物车
const addCart = apiUrl+'/shop/Car/join'
// 获取购物车列表
const shopCartList = apiUrl+'/shop/Car/list'
// 购物车商品选中
const shopSelsct = apiUrl + '/shop/Car/select'
// 购物车商品全选
const shopSelectAll = apiUrl + '/shop/Car/selectAll'
// 删除购物车商品
const delShopGoods = apiUrl + '/shop/Car/del'
// 单独提交订单
const onlyBuy = apiUrl + '/shop/Order/single'

// 保存用户信息
const saveUserInfo = apiUrl + '/shop/User/upgrade'




module.exports = {
    apiUrl,
    Home,
    fightGroup,
    saveUserInfo,
    groupDetail,
    Collect,
    addCart,
    shopCartList,
    shopSelsct,
    shopSelectAll,
    delShopGoods,
    onlyBuy
}
