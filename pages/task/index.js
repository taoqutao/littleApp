// pages/task/index.js
import {
  twx
} from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPageType: 'switchTab',
    data: {},
    accounts: {},
    selectedAccount: {},
    platformId: '',
    taskId: ''
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
    twx.request({
      url: '/api/user/listAssociateAccount',
    }).then(({
      data
    }) => {
      this.setData({
        accounts: data
      })
    })
    wx.showLoading()
    twx.request({
      url: '/api/task/listSystemTaskHall',
      method: 'GET'
    }).then(({
      data
    }) => {
      this.setData({
        data: data
      })
    }).finally(() => {
      wx.hideLoading()
    })
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


  },
  modelClose: function() {

  },
  selectAccount: function(e) {
    wx.navigateTo({
      url: '/pages/task/task?platformId=' + `${this.data.platformId}` + '&taskId=' + `${this.data.taskId}` + '&accountId=' + `${e.detail.id}`,
    })
  },
  tapTask: function(e) {
    let id = e.currentTarget.id.split('_')
    let platformId = parseInt(id[0]);
    let taskId = id[1];

    this.setData({
      selectedAccount: this.data.accounts[platformId],
      platformId: platformId,
      taskId: taskId
    })
    this.selectComponent("#accountView").setStatus(true)
  }
})