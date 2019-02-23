import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonecode:"",
    password:"",
    isInputValidate: 0,
    checked: false,
    _returnpage: '',
    fromPageType: '',//页面来源类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '登录'
    })
    var _this = this;
    let phone = wx.getStorageSync('phonecode_using')
    let password = wx.getStorageSync(phone)
    this.setData({
      _returnpage : options.returnpage ? decodeURIComponent(options.returnpage) : "",
      fromPageType : options.fromPageType || '',
      phonecode: phone || '',
      password: password || '',
      checked: password ? true : false
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

  inputChange: function(e) {
    let value = e.detail.value;
    let curName = e.target.dataset.name;
    this.checkInput(curName, value)

    switch (curName) {
      case 'phonecode':
        this.setData({
          phonecode: value,
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

  checkboxChange: function (e) {
    let checked = !this.data.checked
    if (checked) {
      wx.setStorage({
        key: 'phonecode_using',
        data: this.data.phonecode,
      })
      wx.setStorage({
        key: this.data.phonecode,
        data: this.data.password,
      })
    } else {
      wx.removeStorage({
        key: this.data.phonecode
      })
    }
  },

  checkInput: function(name, value) {
    let isInputValidate = this.data.isInputValidate
    let res = 0
    switch (name) {
      case 'phonecode':
        var pattern = /^1[3-9][0-9]{9}$/;
        res = pattern.test(value);
        res ? isInputValidate |= res : isInputValidate &= ~1
        break;
      case 'password':
        res = (value.length > 5) << 1
        res ? isInputValidate |= res : isInputValidate &= ~(1 << 1)
        break;
    }
    this.setData({
      isInputValidate: isInputValidate
    })
  },

  tapRegister: function (e) {
    wx.navigateTo({
      url: '/pages/other/register',
    })
  },

  tapLogin: function(e) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    twx.request({
      url: '/api/userLogin',
      data: {
        "mobile": this.data.phonecode,
        "password": this.data.password
      }
    }).then((res) => {
        if (res.code) {
          try {
            wx.setStorageSync('twxlogin_userId', res.data.userId);
          } catch (e) {
          }
          if (_this.data._returnpage) {
            if (_this.data.fromPageType && _this.data.fromPageType == 'switchTab') {
              wx.switchTab({
                url: _this.data._returnpage
              })
            } else {
              wx.redirectTo({
                url: _this.data._returnpage
              });
            }
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      }).finally(()=>{
        wx.hideLoading()
      })
  }
})