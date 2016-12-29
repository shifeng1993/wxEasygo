//my.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bindUser: null,
    userInfo: {},
  },
  //事件处理函数
  onLoad: function () {
    let _this = this;
    // if (app.appDate.userInfo == null) {
    //   wx.redirectTo({
    //     url: '/pages/login/login'
    //   })
    // }
    console.log('onLoad')

    //调用应用实例的方法获取全局数据
    _this.setData({
      userInfo: app.globalData.wxUser,
      bindUser: app.globalData.adminUser,
    })
  },
  // 解除绑定退出
  removeBind: function () {
    var _this = this;
    wx.request({
      url: apiServer + apiVersion + '/usr/logout',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
        if (res.message === "log out success") {
          app.globalData.wxUser = null;
          app.globalData.adminUser = null;
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
})
