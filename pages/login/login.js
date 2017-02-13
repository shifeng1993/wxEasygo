// pages/login/login.js
var app = getApp()
Page({
  data: {
    name: '前海易购',
    logo: '/img/logo.png',
    username: null,
    password: null
  },

  // binding提交
  binding: function () {
    var _this = this;
    wx.setStorage({
      key: "adminUser",
      data: ""
    })
    wx.request({
      url: app.globalData.apiOpen + '/user/binding',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openId: app.globalData.openid,
        username: _this.data.username,
        password: _this.data.password
      },
      success: function (res) {
        if (res.data.status === 200) {
          wx.setStorage({
            key: "adminUser",
            data: _this.data.username
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if(res.data.status === 400){
          wx.setStorage({
            key: "adminUser",
            data: _this.data.username
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },

  // inputchange
  username: function (e) {
    this.setData({
      username: e.detail.value,
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value,
    })
  },
  onLoad: function () {
    //页面初始化完成
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})