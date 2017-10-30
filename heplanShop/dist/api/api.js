'use strict';

var _wxRequest = require('./../comm/wxRequest.js');

var apiUrl = 'https://hepulan-mall.playonwechat.com';

// 获取用户UID
var getUid = apiUrl + '/shop/User/registry';
// 获取首页数据
var Home = apiUrl + '/shop/Home/page';
// 拼团页面数据
var fightGroup = apiUrl + '/shop/Group/page';
// 拼团商品详情
var groupDetail = apiUrl + '/shop/Group/detail';
// 收藏
var Collect = apiUrl + '/shop/Collect/collect';
// 加入购物车
var addCart = apiUrl + '/shop/Car/join';
// 获取购物车列表
var shopCartList = apiUrl + '/shop/Car/list';
// 购物车商品选中
var shopSelsct = apiUrl + '/shop/Car/select';
// 购物车商品全选
var shopSelectAll = apiUrl + '/shop/Car/selectAll';
// 删除购物车商品
var delShopGoods = apiUrl + '/shop/Car/del';
// 单独提交订单
var onlyBuy = apiUrl + '/shop/Order/single';
// 保存用户收获地址
var addressSumit = apiUrl + '/shop/Order/singlePerfect';
// 提交订单支付
var orderSumit = apiUrl + '/shop/Order/singlePay';
// 保存用户信息
var saveUserInfo = apiUrl + '/shop/User/upgrade';
// 生成团购订单
var groupOrder = apiUrl + '/shop/Order/group';
// 分享拼团
var shareGroup = apiUrl + '/shop/Order/shareGroup';
// 加入团购 
var joinGroupOrder = apiUrl + '/shop/Order/joinGroup';
// 团购支付
var groupPay = apiUrl + '/shop/Order/groupPay';
// 团购订单详情
var orderGroupDetail = apiUrl + '/shop/Order/groupDetail';

module.exports = {
    getUid: getUid,
    apiUrl: apiUrl,
    Home: Home,
    fightGroup: fightGroup,
    saveUserInfo: saveUserInfo,
    groupDetail: groupDetail,
    Collect: Collect,
    addCart: addCart,
    shopCartList: shopCartList,
    shopSelsct: shopSelsct,
    shopSelectAll: shopSelectAll,
    delShopGoods: delShopGoods,
    onlyBuy: onlyBuy,
    addressSumit: addressSumit,
    orderSumit: orderSumit,
    groupOrder: groupOrder,
    shareGroup: shareGroup,
    joinGroupOrder: joinGroupOrder,
    groupPay: groupPay,
    orderGroupDetail: orderGroupDetail
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJhcGlVcmwiLCJnZXRVaWQiLCJIb21lIiwiZmlnaHRHcm91cCIsImdyb3VwRGV0YWlsIiwiQ29sbGVjdCIsImFkZENhcnQiLCJzaG9wQ2FydExpc3QiLCJzaG9wU2Vsc2N0Iiwic2hvcFNlbGVjdEFsbCIsImRlbFNob3BHb29kcyIsIm9ubHlCdXkiLCJhZGRyZXNzU3VtaXQiLCJvcmRlclN1bWl0Iiwic2F2ZVVzZXJJbmZvIiwiZ3JvdXBPcmRlciIsInNoYXJlR3JvdXAiLCJqb2luR3JvdXBPcmRlciIsImdyb3VwUGF5Iiwib3JkZXJHcm91cERldGFpbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBTUEsU0FBUyx1Q0FBZjs7QUFFQTtBQUNBLElBQU1DLFNBQVNELFNBQVMscUJBQXhCO0FBQ0E7QUFDQSxJQUFNRSxPQUFPRixTQUFRLGlCQUFyQjtBQUNBO0FBQ0EsSUFBTUcsYUFBYUgsU0FBUSxrQkFBM0I7QUFDQTtBQUNBLElBQU1JLGNBQWNKLFNBQU8sb0JBQTNCO0FBQ0E7QUFDQSxJQUFNSyxVQUFVTCxTQUFPLHVCQUF2QjtBQUNBO0FBQ0EsSUFBTU0sVUFBVU4sU0FBTyxnQkFBdkI7QUFDQTtBQUNBLElBQU1PLGVBQWVQLFNBQU8sZ0JBQTVCO0FBQ0E7QUFDQSxJQUFNUSxhQUFhUixTQUFTLGtCQUE1QjtBQUNBO0FBQ0EsSUFBTVMsZ0JBQWdCVCxTQUFTLHFCQUEvQjtBQUNBO0FBQ0EsSUFBTVUsZUFBZVYsU0FBUyxlQUE5QjtBQUNBO0FBQ0EsSUFBTVcsVUFBVVgsU0FBUyxvQkFBekI7QUFDQTtBQUNBLElBQU1ZLGVBQWVaLFNBQVMsMkJBQTlCO0FBQ0E7QUFDQSxJQUFNYSxhQUFhYixTQUFTLHVCQUE1QjtBQUNBO0FBQ0EsSUFBTWMsZUFBZWQsU0FBUyxvQkFBOUI7QUFDQTtBQUNBLElBQU1lLGFBQWFmLFNBQVMsbUJBQTVCO0FBQ0E7QUFDQSxJQUFNZ0IsYUFBYWhCLFNBQVMsd0JBQTVCO0FBQ0E7QUFDQSxJQUFNaUIsaUJBQWlCakIsU0FBUyx1QkFBaEM7QUFDQTtBQUNBLElBQU1rQixXQUFXbEIsU0FBUyxzQkFBMUI7QUFDQTtBQUNBLElBQU1tQixtQkFBbUJuQixTQUFTLHlCQUFsQzs7QUFFQW9CLE9BQU9DLE9BQVAsR0FBaUI7QUFDYnBCLGtCQURhO0FBRWJELGtCQUZhO0FBR2JFLGNBSGE7QUFJYkMsMEJBSmE7QUFLYlcsOEJBTGE7QUFNYlYsNEJBTmE7QUFPYkMsb0JBUGE7QUFRYkMsb0JBUmE7QUFTYkMsOEJBVGE7QUFVYkMsMEJBVmE7QUFXYkMsZ0NBWGE7QUFZYkMsOEJBWmE7QUFhYkMsb0JBYmE7QUFjYkMsOEJBZGE7QUFlYkMsMEJBZmE7QUFnQmJFLDBCQWhCYTtBQWlCYkMsMEJBakJhO0FBa0JiQyxrQ0FsQmE7QUFtQmJDLHNCQW5CYTtBQW9CYkM7QUFwQmEsQ0FBakIiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt3eFJlcXVlc3R9IGZyb20gJy4uL2NvbW0vd3hSZXF1ZXN0J1xyXG5cclxuY29uc3QgYXBpVXJsID0gJ2h0dHBzOi8vaGVwdWxhbi1tYWxsLnBsYXlvbndlY2hhdC5jb20nXHJcblxyXG4vLyDojrflj5bnlKjmiLdVSURcclxuY29uc3QgZ2V0VWlkID0gYXBpVXJsICsgJy9zaG9wL1VzZXIvcmVnaXN0cnknXHJcbi8vIOiOt+WPlummlumhteaVsOaNrlxyXG5jb25zdCBIb21lID0gYXBpVXJsICsnL3Nob3AvSG9tZS9wYWdlJ1xyXG4vLyDmi7zlm6LpobXpnaLmlbDmja5cclxuY29uc3QgZmlnaHRHcm91cCA9IGFwaVVybCArJy9zaG9wL0dyb3VwL3BhZ2UnXHJcbi8vIOaLvOWbouWVhuWTgeivpuaDhVxyXG5jb25zdCBncm91cERldGFpbCA9IGFwaVVybCsnL3Nob3AvR3JvdXAvZGV0YWlsJ1xyXG4vLyDmlLbol49cclxuY29uc3QgQ29sbGVjdCA9IGFwaVVybCsnL3Nob3AvQ29sbGVjdC9jb2xsZWN0J1xyXG4vLyDliqDlhaXotK3nianovaZcclxuY29uc3QgYWRkQ2FydCA9IGFwaVVybCsnL3Nob3AvQ2FyL2pvaW4nXHJcbi8vIOiOt+WPlui0reeJqei9puWIl+ihqFxyXG5jb25zdCBzaG9wQ2FydExpc3QgPSBhcGlVcmwrJy9zaG9wL0Nhci9saXN0J1xyXG4vLyDotK3nianovabllYblk4HpgInkuK1cclxuY29uc3Qgc2hvcFNlbHNjdCA9IGFwaVVybCArICcvc2hvcC9DYXIvc2VsZWN0J1xyXG4vLyDotK3nianovabllYblk4HlhajpgIlcclxuY29uc3Qgc2hvcFNlbGVjdEFsbCA9IGFwaVVybCArICcvc2hvcC9DYXIvc2VsZWN0QWxsJ1xyXG4vLyDliKDpmaTotK3nianovabllYblk4FcclxuY29uc3QgZGVsU2hvcEdvb2RzID0gYXBpVXJsICsgJy9zaG9wL0Nhci9kZWwnXHJcbi8vIOWNleeLrOaPkOS6pOiuouWNlVxyXG5jb25zdCBvbmx5QnV5ID0gYXBpVXJsICsgJy9zaG9wL09yZGVyL3NpbmdsZSdcclxuLy8g5L+d5a2Y55So5oi35pS26I635Zyw5Z2AXHJcbmNvbnN0IGFkZHJlc3NTdW1pdCA9IGFwaVVybCArICcvc2hvcC9PcmRlci9zaW5nbGVQZXJmZWN0J1xyXG4vLyDmj5DkuqTorqLljZXmlK/ku5hcclxuY29uc3Qgb3JkZXJTdW1pdCA9IGFwaVVybCArICcvc2hvcC9PcmRlci9zaW5nbGVQYXknXHJcbi8vIOS/neWtmOeUqOaIt+S/oeaBr1xyXG5jb25zdCBzYXZlVXNlckluZm8gPSBhcGlVcmwgKyAnL3Nob3AvVXNlci91cGdyYWRlJ1xyXG4vLyDnlJ/miJDlm6LotK3orqLljZVcclxuY29uc3QgZ3JvdXBPcmRlciA9IGFwaVVybCArICcvc2hvcC9PcmRlci9ncm91cCdcclxuLy8g5YiG5Lqr5ou85ZuiXHJcbmNvbnN0IHNoYXJlR3JvdXAgPSBhcGlVcmwgKyAnL3Nob3AvT3JkZXIvc2hhcmVHcm91cCdcclxuLy8g5Yqg5YWl5Zui6LStIFxyXG5jb25zdCBqb2luR3JvdXBPcmRlciA9IGFwaVVybCArICcvc2hvcC9PcmRlci9qb2luR3JvdXAnXHJcbi8vIOWboui0reaUr+S7mFxyXG5jb25zdCBncm91cFBheSA9IGFwaVVybCArICcvc2hvcC9PcmRlci9ncm91cFBheSdcclxuLy8g5Zui6LSt6K6i5Y2V6K+m5oOFXHJcbmNvbnN0IG9yZGVyR3JvdXBEZXRhaWwgPSBhcGlVcmwgKyAnL3Nob3AvT3JkZXIvZ3JvdXBEZXRhaWwnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGdldFVpZCxcclxuICAgIGFwaVVybCxcclxuICAgIEhvbWUsXHJcbiAgICBmaWdodEdyb3VwLFxyXG4gICAgc2F2ZVVzZXJJbmZvLFxyXG4gICAgZ3JvdXBEZXRhaWwsXHJcbiAgICBDb2xsZWN0LFxyXG4gICAgYWRkQ2FydCxcclxuICAgIHNob3BDYXJ0TGlzdCxcclxuICAgIHNob3BTZWxzY3QsXHJcbiAgICBzaG9wU2VsZWN0QWxsLFxyXG4gICAgZGVsU2hvcEdvb2RzLFxyXG4gICAgb25seUJ1eSxcclxuICAgIGFkZHJlc3NTdW1pdCxcclxuICAgIG9yZGVyU3VtaXQsXHJcbiAgICBncm91cE9yZGVyLFxyXG4gICAgc2hhcmVHcm91cCxcclxuICAgIGpvaW5Hcm91cE9yZGVyLFxyXG4gICAgZ3JvdXBQYXksXHJcbiAgICBvcmRlckdyb3VwRGV0YWlsXHJcbn1cclxuIl19