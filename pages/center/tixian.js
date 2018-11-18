// pages/center/tixian.js
import {
  twx
} from '../../twx/twx.js' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    money:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用应用实例的方法获取全局数据
    let app = getApp();
    // toast组件实例
    new app.ToastPannel();
    
  },
  // 触发toast组件
  openToastPannel: function () {
    this.show('提现成功','资金将在5个工作日内达到您的帐户');
   
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
    twx.request({
      url: '/api/user/getAliPayInfo'
    }).then(({ data }) => {
      this.setData({
        account: data.alipay
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
  
  },

  inputChange: function (e) {
    let value = e.detail.value;
    let name = e.target.dataset.name;

    if (value) {
      this.setData({
        money: value
      })
    }
  },

  submit: function(e) {
    let data = {
      "money": this.data.money
    }
    twx.request({
      url: '/api/account/transferCashToAliPay',
      data: data
    }).then(({ data }) => {

    }).finally(() => {
      wx.hideLoading()
    })
    
  }
})