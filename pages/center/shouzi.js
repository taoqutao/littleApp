// pages/center/shouzi.js
import {
  twx
} from '../../twx/twx.js' 
import {
  dateFtt
} from '../../utils/util.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading()
    twx.request({
      url: '/api/account/getAccountDetail',
      method: 'GET'
    }).then(({ data }) => {
      for (var i = 0; i < data.length; i++) {
        data[i].updateTime = dateFtt('yyyy-MM-dd hh:mm:ss', new Date(data[i].updateTime))
      }
      this.setData({
        list:data
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})