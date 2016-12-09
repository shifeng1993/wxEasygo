//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorage({
      key: "tabbarIndex",
      data: "0",
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },

  appDate: {
    userInfo: null

  },
  tabbar: [
    {
      "pagePath": "/pages/index/index",
      "iconPath": "/img/home.png",
      "selectedIconPath": "/img/home-active.png",
      "text": "主页",
      "selectedColor": "#3a91df"
    },
    {
      "pagePath": "/pages/operate/operate",
      "iconPath": "/img/operate.png",
      "selectedIconPath": "/img/operate-active.png",
      "text": "运营"
    },
    {
      "pagePath": "/pages/form/form",
      "iconPath": "/img/form.png",
      "selectedIconPath": "/img/form-active.png",
      "text": "报表"
    },
    {
      "pagePath": "/pages/my/my",
      "iconPath": "/img/my.png",
      "selectedIconPath": "/img/my-active.png",
      "text": "我的"
    }
  ]




})