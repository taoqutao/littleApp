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
    remark: null,
    fulfilled: false
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
    wx.showModal({
      title: '特别提醒',
      content: '1.请使用已选择的账号完成任务\n2.不可以任何形式联系卖家，擅自卡筛选条件查找商品，则扣除2金币，情节严重封号！\n3.领取任务3分钟后才可提交，并在30分钟内完成，超时未提交扣除0.5金币！\n 4.请遵守平台规则，有疑问联系客服QQ123070861',
      showCancel: false
    })
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
    const {
      currentTarget: {
        dataset: {
          index
        }
      }
    } = e
    wx.showLoading()
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        wx.showLoading();
        this.uploadImage(res.tempFilePaths[0], index)
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  uploadImage: function(filepath, index) {
    let that = this
    wx.uploadFile({
      url: 'https://t.taoqutao.com/file/upload/weixinUpload?module=taskSubmit',
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
        let info = this.data.info
        info.imgs[index].img = urlPath
        let fulfilled = true
        info.imgs.map((item)=>{
          fulfilled = item.img  && fulfilled
        })
        that.setData({
          info,
          fulfilled
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
        data.imgs = data.submitInfoList.map((item, idx) => {
          return {
            img: null,
            name: item
          }
        })
        this.setData({
          info: data
        })
      }

    }).finally(() => {
      wx.hideLoading()
    })
  },

  tapSubmit: function() {
    let imgs = this.data.info.imgs.map((item, idx) => {
      return item.img
    })
    this.data.fulfilled && (wx.showLoading(), twx.request({
      url: '/api/task/submitTask',
      data: {
        "taskId": this.data.taskId,
        "images": imgs.join(',')
      }
    }).then((res) => {
      wx.hideLoading()
      if (res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)

      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }).finally(() => {
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