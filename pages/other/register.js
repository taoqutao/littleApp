// pages/other/register.js
import {
  twx
} from '../../twx/twx.js'
Page({
  data: {
    captchaUrl: 'https://m.taoqutao.com/vcode?a',
    phonecode:'16602134065',
    qqcode:'40345435435',
    captcha:'3333',
    password:'123456',
    isInputValidate:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })
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

  inputChange: function (e) {
    let value = e.detail.value;
    let curName = e.target.dataset.name;
    checkInput(curName, value)

    switch (curName) {
      case 'phonecode':
        this.setData({
          phoneCode: value,
        });
        break;
      case 'qqcode':
        this.setData({
          qqCode: value,
        });
        break;
      case 'captcha':
        this.setData({
          captcha: value,
        });
        break;
      case 'password':
        this.setData({
          passwordCode: value,
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
      case 'qqcode':
        isInputValidate &= value.length > 0
        break;
      case 'captcha':
        isInputValidate &= value.length == 4
        break;
      case 'password':
        isInputValidate &= value.length > 5
        break;
    }
    this.setData({
      isInputValidate:isInputValidate
    })
  },


  tapCode: function(e) {
    let that = this
    that.setData({
      captchaUrl: this.data.captchaUrl + "a"
    })
  },

  tapRegister: function(e) {
    wx.showLoading()
    let data = {
      "mobile": this.data.phonecode,
      "vCode": this.data.captcha,
      "qq": this.data.qqcode,
      "password": this.data.password
    }
    twx.request({
      url: '/api/reg/registerUser',
      data: data
    }).then(function(res) {
      console.log(res)
    }).finally(()=>{
      wx.hideLoading()
    })
  }

})