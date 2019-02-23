// pages/task/mytask.js
import {
  twx
} from '../../twx/twx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPageType: 'switchTab',
    table_items: [
      [{
        thumbnail: "/imgs/tx.png",
        title: "提现",
      }, {
        thumbnail: "/imgs/alipay.png",
        title: "绑定支付宝",
        subTitle: "未绑定"
      }],
      [{
        thumbnail: "/imgs/sz.png",
        title: "收支明细",
      }],
      [{
          thumbnail: "/imgs/tb.png",
          title: "绑定淘宝账户",
        }, {
          thumbnail: "/imgs/jd.png",
          title: "绑定京东账户"
        },
        {
          thumbnail: "/imgs/help.png",
          title: "帮助中心",
        }
      ]
    ],
    info: {}
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
    // this.loginIfNeeded()
    this.requestTasks()
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

  loginIfNeeded: function() {
    twx.isLogin(true, this)
  },

  requestTasks: function() {
    wx.showLoading()
    let cells = this.data.table_items
    twx.request({
      url: '/api/user/getAccountInfo',
    }).then(({
      data
    }) => {
      if (data) {
        cells[0][1].subTitle = data.alipay ? '未绑定' : ''
        this.setData({
          info: data,
          table_items: cells
        })
      } else {
        cells[0][1].subTitle = '未绑定'
        this.setData({
          info: {
            "availableMoney": 0, //可提现金额
            "money": 0, //账户余额
            "sumMoney": 0, //累计收入
          },
          table_items: cells
        })
      }
    }).catch((err) => {
      cells[0][1].subTitle = '未绑定'
      this.setData({
        info: {
          "availableMoney": 0, //可提现金额
          "money": 0, //账户余额
          "sumMoney": 0, //累计收入
        },
        table_items: cells
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },
  tapCell: function(e) {
    const {
      detail: {
        index
      }
    } = e
    let idxs = index.split('_')
    let section = parseInt(idxs[0])
    let row = parseInt(idxs[1])
    let path = ''
    switch (section) {
      case 0:
        switch (row) {
          case 0:
            path = '/pages/center/tixian'
            break;
          case 1:
            path = '/pages/center/alipaybind'
            break;
        }
        break;
      case 1:
        switch (row) {
          case 0:
            path = '/pages/center/shouzi'
            break;
        }
        break;
      case 2:
        switch (row) {
          case 0:
            path = '/pages/center/taobao?platformId=10'
            break;
          case 1:
            path = '/pages/center/taobao?platformId=30'
            break;
          case 2:
            path = '/pages/other/help'
            break;
        }
        break;
    }
    wx.navigateTo({
      url: path,
    })
  }
})