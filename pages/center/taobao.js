// pages/center/taobao.js
import {
  twx
} from '../../twx/twx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['普通会员', '白金会员', '铂金会员', '钻石会员'],
    index: 0,
    imgs: ["", ""],
    level: '10',
    account: '',
    gender: 'M',
    platformName: '淘宝'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {platformId} = options
    this.data.platformId = platformId
    this.setData({
      platformName: platformId == 30 ? '京东' : '淘宝'
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
    this.setData({
      account: value
    })
  },

  bindPickerChange: function(e) {
    let index = parseInt(e.detail.value)
    this.setData({
      index: index,
      level: (index + 1) * 10+""
    })
  },

  tapRadio: function(e) {
    this.setData({
      gender: this.mapGender(e.detail.value)
    })
  },

  tapImage: function(e) {
    var _this = this;
    let id = parseInt(e.target.id)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showLoading();
        _this.uploadImage(res.tempFilePaths[0], id)
      }
    })
  },

  tapSubmit: function(e) {
    wx.showLoading();
    if (this.data.account.length > 0 && this.data.level.length > 0 && this.data.imgs[0].length > 0 && this.data.imgs[1].length > 0 && this.data.gender.length > 0) {
      let data = {
        "account": this.data.account,
        "level": this.data.level,
        "userInfoImg": this.data.imgs[0],
        "userCenterImg": this.data.imgs[1],
        "sex": this.data.gender,
        "type": this.data.platformId //账号类型  10 淘宝  30 京东 20  天猫
      }
      twx.request({
        url: '/api/user/bindAccount',
        data: data
      }).then((res) => {
        wx.hideLoading()
        if (res.code) {
          wx.showToast({
            title: '绑定成功',
            icon: 'none'
          })
          setTimeout(()=>{
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
      }).catch((err)=>{
        wx.showToast({
          title: '绑定失败',
          icon: 'none'
        })
      }).finally(()=>{
        wx.hideLoading()
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      })
    }

  },

  uploadImage: function(filepath, id) {
    let that = this
    wx.uploadFile({
      url: 'https://m.taoqutao.com/file/upload/weixinUpload?module=bind',
      filePath: filepath,
      name: 'fileData',
      formData: {
        'module': 'bind'
      },
      success: ({ data }) => {
        data = JSON.parse(data);
        var imgs = that.data.imgs
        imgs[id] = data.data.urlPath
        that.setData({
          imgs: imgs
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  mapGender: function(gender) {
    var sex = 'M';
    switch (gender) {
      case '男':
        sex = 'M'
        break;
      case '女':
        sex = 'F'
        break;
      default:
        break
    }
    return sex
  }
})