import {
  twx
} from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPageType: 'switchTab',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestTask()
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

  requestTask: function() {
    wx.showLoading()
    twx.request({
      url: '/api/task/listUserTaskStatus',
      method: 'GET'
    }).then((res) => {
      this.setData({
        list: res.data
      })
    }).finally(() => {
      wx.hideLoading()
    })

  },
  tapBtn: function(e) {
    const {
      target: {
        dataset: {
          taskid
        } = {}
      } = {}
    } = e

    wx.navigateTo({
      url: '/pages/task/detail?taskId=' + taskid,
    })
  },
  tapItem: function(e) {
    const {
      currentTarget: {
        dataset: {
          status
        } = {}
      } = {}
    } = e

    wx.showLoading()
    twx.request({
      url: '/api/task/listUserTask',
      method: 'GET',
      data: {
        status: status
      }
    }).then((res) => {
      if (res.code) {
        if (res.data.length)
          wx.navigateTo({
            url: '/pages/task/list?state=' + status,
          })
        else {
          wx.showToast({
            title: '没有相关任务',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: res.message,
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

  }
})