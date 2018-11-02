// pages/task/task.js
import twx from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },

  takeTask: function(e) {
    wx.showLoading()
    let res = e.target.id
    if (res) {
      let arr = res.split('_')
      let taskId = arr[0]
      let planId = arr[1]

      let data = {
        "taskId": taskId,
        "planId": planId,
        "account": 1 
      }
      twx.request({
        url: '/api/task/receiveTask',
        data: data
      }).then(({data})=> {

      }).finally(()=>{
        wx.hideLoading()
      })
    }
    
  }
})