// pages/task/task.js
import twx from '../../twx/twx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
    accountId: null,
    platformId: null,
    taskId: null,
    categories: [],
    selectedCategoryIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData(options)

    this.getData()
  },

  getData: function() {
    wx.showLoading()
    let promise_list = twx.request({
      url: '/api/task/listSystemTaskType',
      method: 'GET',
      data: {
        platformType: this.data.platformId,
        taskType: this.data.taskId,
        account: this.data.accountId
      }
    }).then((res) => {
      if (res && res.code) {
        return res.data.list.map((item, index) => {
          return {
            name: item.goodsName,
            description: item.taskName,
            money: item.money,
            count: item.remainCount,
            state: item.status == 1,
            id: item.id
          }
        })
      } else {
        return []
      }
    })

    let promise_all = twx.request({
      url: '/api/task/listSystemTaskHall',
      method: 'GET'
    }).then((res) => {
      if (res && res.code) {
        return res.data.map((item, idx) => {
          let tasks = item.taskTypeList.map((element, index) => {
            return {
              name: element.typeName,
              id: element.type,
              number: element.taskNum
            }
          })
          if (this.data.platformId === item.platformId) {
            this.data.selectedCategoryIndex = idx
          }
          return {
            platformName: item.platformName,
            platformId: item.platformId,
            tasks: tasks,
            iconUrl: item.iconUrl
          }
        })
      } else {
        return []
      }
    })

    Promise.all([promise_list, promise_all]).then((res) => {
      this.setData({
        categories: res[1],
        taskList: res[0],
        selectedCategoryIndex: this.data.selectedCategoryIndex
      })
    }).finally(() => {
      wx.hideLoading()
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

  requestTasks: function() {
    let list = []
    wx.showLoading()
    twx.request({
      url: '/api/task/listSystemTaskType',
      method: 'GET',
      data: {
        platformType: this.data.platformId,
        taskType: this.data.taskId,
        account: this.data.accountId
      }
    }).then((res) => {
      if (res && res.code) {
        list = res.data.list.map((item, index) => {
          return {
            name: item.goodsName,
            description: item.taskName,
            money: item.money,
            count: item.remainCount,
            state: item.status == 1,
            id: item.id
          }
        })
      }
      this.setData({
        taskList: list
      })
    }).finally(() => {
      wx.hideLoading()
    })

  },

  tapCategory: function(e) {
    const {
      currentTarget: {
        dataset: {
          index = 0,
          id
        }
      }
    } = e

    this.setData({
      platformId: id,
      selectedCategoryIndex: index,
      taskId: this.data.categories[index].tasks[0].id
    })

    this.requestTasks()
  },

  tapTask: function(e) {
    const {
      currentTarget: {
        dataset: {
          id
        }
      }
    } = e
    this.setData({
      taskId: id
    })

    this.requestTasks()
  },

  takeTask: function(e) {
    wx.showLoading()
    let res = e.currentTarget.id
    twx.request({
      url: '/api/task/receiveTask',
      data: {
        id: res,
        account: this.data.accountId
      }
    }).then((data) => {
      if (data && data.code) {
        wx.showToast({
          title: '领取成功',
          icon: 'none'
        })
        wx.navigateTo({
          url: '/pages/task/detail?taskId=' + res,
        })
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none'
        })
      }
    }).catch(() => {
      wx.showToast({
        title: '领取失败',
        icon: 'none'
      })
    }).finally(() => {
      wx.hideLoading()
    })
  }
})