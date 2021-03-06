// pages/other/setting.js
import {
  twx
} from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  logout: function() {
    wx.showLoading()
    twx.request({
      url: '/api/userLogout',
    }).then((data) => {
      if (data.code) {
        wx.removeStorageSync('twxlogin_userId')
        wx.showToast({
          title: '退出成功',
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/task/index',
          })
        }, 1000)
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    }).catch((err) => {
      wx.showToast({
        title: '请求失败',
      })
    }).finally(() => {
      wx.hideLoading()
    })
  }
})