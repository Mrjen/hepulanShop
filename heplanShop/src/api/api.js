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
// 单独购买保存用户收获地址
const singleAddressSumit = apiUrl + '/shop/Order/singlePerfect'
// 团购买保存用户收获地址
const groupAddressSumit = apiUrl + '/shop/Order/groupPerfect'
// 提交订单支付
const orderSumit = apiUrl + '/shop/Order/singlePay'
// 提交订单页面数据
const singleDetail = apiUrl + '/shop/Order/singleDetail'
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
// 团购订单详情
const orderGroupDetail = apiUrl + '/shop/Order/groupDetail'
// 团购订单提交页面详情
const groupOrderDetail = apiUrl + '/shop/Order/groupOrderDetail'
//单独购买订单列表
const onlyBuyOrderList = apiUrl + '/shop/Order/singleList'



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
    singleAddressSumit,
    groupAddressSumit,
    orderSumit,
    singleDetail,
    groupOrder,
    shareGroup,
    joinGroupOrder,
    groupPay,
    orderGroupDetail,
    groupOrderDetail,
}
