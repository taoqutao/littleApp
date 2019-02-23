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
    wx.showLoading()
    twx.request({
      url: '/api/account/getAccountDetail',
      method: 'GET'
    }).then(({
      data
    }) => {
      let res = data.map((item, idx) => {
        let dic = {
          "1": "活动奖励",
          "2": "任务奖励",
          "3": "提现",
          "4": "兑换话费Q币"
        }
        return {
          ...item,
          typeName: dic[item.type],
          updateTime: dateFtt('yyyy-MM-dd hh:mm:ss', new Date(item.updateTime))
        }
      })
      this.setData({
        list: res
      })
    }).finally(() => {
      wx.hideLoading()
    })
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

  }
})