// pages/task/detail.js
import twx from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: null,
    info: {},
    imgs: [],
    showTips: false,
    tips: ['关键词搜索不到商品', '商品图片与商家不符', '找不到商家直通车商品', '商家未设置优惠券', '上传图片失效'],
    remark: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      taskId
    } = options
    this.data.taskId = taskId

    this.request()
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

  pressKeyword: function() {
    wx.setClipboardData({
      data: this.data.info.keyWord,
      success(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  tapImg: function(e) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        wx.showLoading();
        this.uploadImage(res.tempFilePaths[0])
      }
    })
  },

  uploadImage: function(filepath) {
    let that = this
    wx.uploadFile({
      url: 'https://m.taoqutao.com/file/upload/weixinUpload?module=taskSubmit',
      filePath: filepath,
      name: 'fileData',
      formData: {
        'module': 'taskSubmit'
      },
      success: ({
        data
      }) => {
        let res = JSON.parse(data);
        const {
          data: {
            urlPath
          } = {} = {}
        } = res
        let imgs = this.data.imgs
        imgs.push(urlPath)
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

  request: function() {
    wx.showLoading()
    twx.request({
      url: '/api/task/getTaskInfo',
      method: 'GET',
      data: {
        id: this.data.taskId
      }
    }).then((res) => {
      if (res.code) {
        const {
          data = {}
        } = res
        let rpl = (str) => {
          str = String(str)
          if (str.length) {
            return '**' + str.slice(1, str.length)
          }
          return str
        }

        data.goodsName = rpl(data.goodsName)
        data.money = rpl(data.money)
        data.taskUserName = rpl(data.taskUserName)
        data.shopName = rpl(data.shopName)
        this.setData({
          info: data
        })
      }

    }).finally(() => {
      wx.hideLoading()
    })
  },

  tapSubmit: function() {

    this.data.imgs.length && (wx.showLoading(), twx.request({
      url: '/api/task/submitTask',
      data: {
        "taskId": this.data.taskId,
        "images": this.data.imgs.join(',')
      }
    }).then((res) => {
      if (res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/task/index',
          })
        }, 1000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }).catch((err) => {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
    }))
  },
  tapCancel: function() {
    this.setData({
      showTips: true
    })
  },
  tapCancelConfirm: function() {
    wx.showLoading()
    twx.request({
      url: '/api/task/cancelTask',
      data: {
        "taskId": this.data.taskId,
        "remark": this.data.tip //备注
      }
    }).then((res) => {
      if (res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/task/index',
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    }).catch((err) => {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },
  radioChange: function(e) {
    this.setData({
      tip: e.detail.value
    })
  },
  tapTipWindow: function() {
    this.setData({
      showTips: false,
      tip: null
    })
  },
})