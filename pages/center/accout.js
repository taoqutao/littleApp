// pages/center/accout.js
import {
  twx
} from '../../twx/twx.js'
Page({

  /**
   * Page initial data
   */
  data: {
    accounts: [],
    accountType: '淘宝'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const {
      platformId
    } = options
    this.setData({
      accountType: this.data.platformId == 30 ? '京东' : '淘宝',
      platformId: platformId
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    
    wx.showLoading()
    twx.request({
      url: '/api/user/listAssociateAccount',
      skipLogin: true
    }).then(({
      data
    }) => {
      let platformId = this.data.platformId
      if (data && data[platformId]) {
        this.setData({
          accounts: data[platformId]
        })
      } else {
        wx.showToast({
          title: '无账号信息',
          icon: 'none'
        })
      }
    }).catch((err) => {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  tapDone: function(e) {
    let path = '/pages/center/taobao?platformId=' + this.data.platformId
    wx.navigateTo({
      url: path,
    })
  }
})