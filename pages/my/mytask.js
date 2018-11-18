// pages/task/mytask.js
import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPageType:'switchTab',
    table_items: [
      [{
        thumbnail: "/imgs/tx.png",
        title: "提现",
      }, {
        thumbnail: "/imgs/alipay.png",
        title: "绑定支付宝",
      }, {
        thumbnail: "/imgs/qq.png",
        title: '兑换话费/Q币',
      }],
      [{
        thumbnail: "/imgs/sz.png",
        title: "收支明细",
      }],
      [{
        thumbnail: "/imgs/tb.png",
        title: "绑定淘宝账户",
        subTitle: '您还可以绑定4哥淘宝账户',
      }, {
        thumbnail: "/imgs/help.png",
        title: "帮助中心",
      }]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.loginIfNeeded()
    this.requestTasks()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  loginIfNeeded: function() {
    twx.isLogin(true, this)
  },

  requestTasks: function() {
    twx.request({
      url: '/api/user/listAssociateAccount',
    }).then(({
      data
    }) => {
      console.log(data)
    })
    twx.request({
      url: '/api/user/getAccountInfo',
    }).then(({
      data
    }) => {
      console.log(data)
    })
  }
})