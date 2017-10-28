import {wxRequest} from '../comm/wxRequest'

const apiUrl = 'https://hepulan-mall.playonwechat.com'

// 获取用户UID
const getUid = apiUrl + '/shop/User/registry'
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
// 保存用户收获地址
const addressSumit = apiUrl + '/shop/Order/singlePerfect'
// 提交订单支付
const orderSumit = apiUrl + '/shop/Order/singlePay'
// 保存用户信息
const saveUserInfo = apiUrl + '/shop/User/upgrade'
// 生成团购订单
const groupOrder = apiUrl + '/shop/Order/group'
// 分享拼团
const shareGroup = apiUrl + '/shop/Order/shareGroup'
// 加入团购 
const joinGroupOrder = apiUrl + '/shop/Order/joinGroup'
// 团购支付
const groupPay = apiUrl + '/shop/Order/groupPay'

module.exports = {
    getUid,
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
    onlyBuy,
    addressSumit,
    orderSumit,
    groupOrder,
    shareGroup,
    joinGroupOrder,
    groupPay
}
