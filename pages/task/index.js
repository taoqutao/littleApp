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
    taskId: '',
    banners: ['/imgs/bar.jpg', '/imgs/bar2.png']
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
    this.request()
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
  request: function() {
    twx.request({
      url: '/api/user/listAssociateAccount',
      skipLogin: true
    }).then(({
      data
    }) => {
      this.setData({
        accounts: data || {}
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
  selectAccount: function(e) {
    wx.navigateTo({
      url: '/pages/task/task?platformId=' + `${this.data.platformId}` + '&taskId=' + `${this.data.taskId}` + '&accountId=' + `${e.detail.id}`,
    })
  },
  tapTask: function(e) {
    if (!twx.isLogin(true, this)) {
      return;
    }
    let id = e.currentTarget.id.split('_')
    let platformId = parseInt(id[0]);
    let taskId = id[1];
    if (JSON.stringify(this.data.accounts) === '{}') {
      let account = platformId == 30 ? '京东' : '淘宝'
      let path = '/pages/center/taobao?platformId=' + platformId
      wx.showModal({
        title: '提示',
        content: '请添加您的' + account + '账号，最多可添加5个，账号添加完成才可做任务',
        showCancel: true,
        confirmColor: "#fe5727",
        confirmText: '添加账号',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: path,
            })
          }
        }
      })
      return;
    }
    this.setData({
      selectedAccount: this.data.accounts[platformId],
      platformId: platformId,
      taskId: taskId
    })
    this.selectComponent("#accountView").setStatus(true)
  },
  tapBanner: function(e) {
    e.target.dataset.index
    const {
      target: {
        dataset: {
          index
        }
      }
    } = e
    switch (parseInt(index)) {
      case 0:
        wx.navigateTo({
          url: '/pages/other/register',
        })
        break;
      case 1:
        break
    }
  }
})