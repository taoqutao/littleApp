// pages/center/tixian.js
import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    money: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用应用实例的方法获取全局数据
    let app = getApp();
    // toast组件实例
    new app.ToastPannel();

  },
  // 触发toast组件
  openToastPannel: function() {
    this.show('提现成功', '资金将在5个工作日内达到您的帐户');

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
    twx.request({
      url: '/api/user/getAliPayInfo'
    }).then(({
      data
    }) => {
      if (data.alipay) {
        this.setData({
          account: data.alipay
        })
      } else {
        wx.showToast({
          title: '请绑定支付宝',
          icon: 'none'
        })
      }

    }).catch((err) => {
      wx.showToast({
        title: '请求错误',
        icon: 'none'
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

  },

  inputChange: function(e) {
    let value = e.detail.value;
    let name = e.target.dataset.name;

    this.setData({
      money: value
    })
  },

  submit: function(e) {
    let data = {
      "money": this.data.money
    }
    wx.showLoading()
    twx.request({
      url: '/api/account/transferCashToAliPay',
      data: data
    }).then((res) => {
      if (res.code) {
        wx.hideLoading()
        wx.showToast({
          title: '提现成功',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(()=>{
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 2000
      })
    }).finally(() => {
      
    })

  }
})