// pages/task/list.js
import {
  twx
} from '../../twx/twx.js'
import {
  dateFtt
} from '../../utils/util.js'
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    const {
      state
    } = options
    wx.showLoading()
    twx.request({
      url: '/api/task/listUserTask',
      method: 'GET',
      data: {
        status: state
      }
    }).then((res) => {
      if (res.code) {
        let info = res.data.map((item, index) => {
          return {
            ...item,
            time: dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.createTime))
          }
        })
        this.setData({
          list: info
        })
      }
      else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }).catch((err)=>{
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
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

  }
})