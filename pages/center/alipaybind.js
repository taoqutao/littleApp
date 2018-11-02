// pages/center/alipaybind.js
import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alipaycode: "16602134065",
    name: "123456",
    isInputValidate: false
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

  inputChange: function (e) {
    let value = e.detail.value;
    let curName = e.target.dataset.name;
    checkInput(curName, value)

    switch (curName) {
      case 'phonecode':
        this.setData({
          phonecode: value,
        });
        break;
      case 'name':
        this.setData({
          name: value,
        });
        break;
    }

    if (value) {
      this.setData({
        curName: value
      })
    }
  },

  checkInput: function (name, value) {
    var isInputValidate = true
    switch (curName) {
      case 'phonecode':
        var pattern = /^1[3-9][0-9]{9}$/;
        isInputValidate &= pattern.test(value);
        break;
      case 'name':
        isInputValidate &= value.length > 0
        break;
    }
    this.setData({
      isInputValidate: isInputValidate
    })
  },

  tapBind: function(e) {
    let param = {
      "account": this.data.alipaycode, 
      "trueName": this.data.name,
    }
    wx.showLoading()
    twx.request({
      url: '/api/user/bindAlipay',
      data: param
    }).then((res)=>{
      console.log(res)
    }).finally(()=>{
      wx.hideLoading()
    })
  }
})