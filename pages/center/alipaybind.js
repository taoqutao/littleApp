// pages/center/alipaybind.js
import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alipaycode: "",
    namecode: "",
    isInputValidate: 0
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

  inputChange: function(e) {
    let value = e.detail.value;
    let curName = e.target.dataset.name;
    this.checkInput(curName, value)

    switch (curName) {
      case 'alipaycode':
        this.setData({
          alipaycode: value,
        });
        break;
      case 'namecode':
        this.setData({
          namecode: value,
        });
        break;
    }

    if (value) {
      this.setData({
        curName: value
      })
    }
  },

  checkInput: function(name, value) {
    let isInputValidate = this.data.isInputValidate
    let res = 0
    switch (name) {
      case 'alipaycode':
        res = (value.length > 0)
        res ? isInputValidate |= res : isInputValidate &= ~1
        break;
      case 'namecode':
        res = (value.length > 0) << 1
        res ? isInputValidate |= res : isInputValidate &= ~(1 << 1)
        break;
    }
    this.setData({
      isInputValidate: isInputValidate
    })
  },

  tapBind: function(e) {
    let param = {
      "account": this.data.alipaycode,
      "trueName": this.data.namecode,
    }
    wx.showLoading()
    twx.request({
      url: '/api/user/bindAlipay',
      data: param
    }).then((res) => {
      if (res.code) {
        wx.showToast({
          title: '绑定成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }).catch(() => {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
    })
  }
})