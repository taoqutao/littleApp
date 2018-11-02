import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonecode:"16602134065",
    password:"123456",
    isInputValidate:false,
    returnpage: '',
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
    _this.options = options;
    _this.userInfo = {};
    _this.data.returnpage = options.returnpage ? decodeURIComponent(options.returnpage) : "";
    _this.data.fromPageType = options.fromPageType;
    _this.data.jdlogin = options.jdlogin;

    let out = wx.getStorageSync('jdlogin_out');
    _this.data.isLogout = out ? out : false;
    wx.login({
      success: function (radata) {
        _this.radata = radata;
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success(resInfo) {
                  _this.getUserInfo();
                },
                fail: function (res) {
                  _this.authorize();
                }
              })
            } else {
              _this.getUserInfo();
            }
          },
          fail: function (data) {
            _this.getUserInfo();
          }
        })
      }
    });
  },
  getUserInfo() {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000);
    wx.getUserInfo({
      success: function (resInfo) {
        _this.userInfo = resInfo;
        _this.encryptedData = encodeURIComponent(resInfo.encryptedData);
        _this.ivData = encodeURIComponent(resInfo.iv);
      },
      fail: function () { },
      complete: function () {
        _this.smsLogin();
      }
    })
  },
  authorize: function () {
    var _this = this;
    wx.showModal({
      title: '打开设置页面进行授权',
      content: '需要获取您的公开信息（昵称、头像等），请到小程序的设置中打开用户信息授权',
      cancelText: '取消',
      confirmText: '去设置',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                _this.getUserInfo();
              }
            }
          })

        } else {
          _this.getUserInfo();
        }
      },
      fail: function (res) {
        _this.getUserInfo();
      }
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
    checkInput(curName, value)

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

  checkInput: function(name, value) {
    var isInputValidate = true
    switch (curName) {
      case 'phonecode':
        var pattern = /^1[3-9][0-9]{9}$/;
        isInputValidate &= pattern.test(value);
        break;
      case 'password':
        isInputValidate &= value.length > 5
        break;
    }
    this.setData({
      isInputValidate: isInputValidate
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
        var data = res.data;
        if (data.code) {
          try {
            wx.setStorageSync('twxlogin_userId', data.data.userId);
          } catch (e) {
          }
          if (_this.data.returnpage) {
            if (_this.data.fromPageType && _this.data.fromPageType == 'switchTab') {
              wx.switchTab({
                url: _this.data.returnpage
              })
            } else if (activityUrl) {
              h5Login.jshopH5Login(_this.data.returnpage)
            }
            else {
              wx.redirectTo({
                url: _this.data.returnpage
              });
            }
          }
        }
      }).finally(()=>{
        wx.hideLoading()
      })
  }
})