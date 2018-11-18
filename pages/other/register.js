// pages/other/register.js
import {
  twx
} from '../../twx/twx.js'
Page({
  data: {
    codeurl: "",
    phonecode:'',
    qqcode:'',
    captcha:'',
    password:'',
    isInputValidate:0,
    cookie:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })
    this.requestCode()
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
    this.checkInput(curName, value)

    switch (curName) {
      case 'phonecode':
        this.setData({
          phonecode: value,
        });
        break;
      case 'qqcode':
        this.setData({
          qqcode: value,
        });
        break;
      case 'captcha':
        this.setData({
          captcha: value,
        });
        break;
      case 'password':
        this.setData({
          password: value,
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
    var isInputValidate = this.data.isInputValidate
    var res = 0
    switch (name) {
      case 'phonecode':
        var pattern = /^1[3-9][0-9]{9}$/;
        res = pattern.test(value);
        res ? isInputValidate |= res : isInputValidate &= ~1
        break;
      case 'qqcode':
        res = (value.length > 0) << 1
        res ? isInputValidate |= res : isInputValidate &= ~(1 << 1)
        break;
      case 'captcha':
        res = (value.length == 4) << 2
        res ? isInputValidate |= res : isInputValidate &= ~(1 << 2)
        break;
      case 'password':
        res = (value.length > 5) << 3
        res ? isInputValidate |= res : isInputValidate &= ~(1 << 3)
        break;
    }
    this.setData({
      isInputValidate:isInputValidate
    })
  },

  tapRegister: function(e) {
    wx.showLoading()
    let that = this
    let data = {
      "mobile": this.data.phonecode,
      "vCode": this.data.captcha,
      "qq": this.data.qqcode,
      "password": this.data.password
    }
    twx.request({
      url: '/api/reg/registerUser',
      header: {
        'Cookie': this.data.cookie
      },
      data: data
    }).then(function(res) {
      if (res.code) {
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        that.requestCode()
      }
      
    }).finally(()=>{
      wx.hideLoading()
    })
  },

  requestCode: function() {
    let that = this
    wx.request({
      url: 'https://m.taoqutao.com/getVCode',
      method: 'GET',
      success: ({data}) => {
        if (data.code) {
          that.setData({
            codeurl: 'data:image/png;base64,'+wx.arrayBufferToBase64(wx.base64ToArrayBuffer(data.data.image)),
            cookie: data.data.jSessionId
          })
        }
      }
    })
    
  }

})