// pages/center/taobao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['普通会员', '白金会员', '铂金会员', '钻石会员'],
    index: 0,
    imgs: ["https://c1.yaofangwang.net/Common/Upload/Medicine/578/578911/584e4a51-2a10-4e9d-b5a6-fb84f4386be04692.jpg_300x300.jpg", "https://c1.yaofangwang.net/Common/Upload/Medicine/578/578911/584e4a51-2a10-4e9d-b5a6-fb84f4386be04692.jpg_300x300.jpg"]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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

  tapImage: function(e) {
    var _this = this;
    let id = parseInt(e.target.id)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgs = _this.data.imgs
        imgs[id] = res.tempFilePaths[0]
        _this.setData({
          imgs: imgs 
        })
      }
    })
  },

  uploadImages: function() {
    let that = this
    wx.uploadFile({
      url: 'https://192.168.0.107:8011/file/upload/weixinUpload',
      filePath: that.data.imgs[0],
      name: 'bind',
    })
  },

  submit: function() {
    let that = this
    wx.uploadFile({
      url: 'https://m.taoqutao.com/file/upload/weixinUpload?module=bind',
      filePath: '/imgs/alipay.png',
      name: 'fileData',
      formData:{
        'module':'bind'
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(e) {
        console.log(e)
      },
      complete: function() {
        console.log('complete')
      }
    })
  }
})