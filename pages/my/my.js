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
    //调用应用实例的方法获取全局数据
    _this.setData({
      userInfo: app.globalData.wxUser,
      bindUser: app.globalData.adminUser,
    })
  },
  onShow: function () {
    wx.getStorage({
      key: 'adminUser',
      success: function (res) {
        if (!res.data) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        } else {
          app.globalData.adminUser = res.data
        }
      }
    })
  },
  // 解除绑定退出
  removeBind: function () {
    var _this = this;
    wx.request({
      url: app.globalData.apiOpen + '/user/logout/' + app.globalData.openid,
      // header: {
      //   'content-type': 'application/json'
      // },
      method: 'POST',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
        if (res.data.status === 200) {
          app.globalData.wxUser = null;
          app.globalData.adminUser = null;
          wx.setStorage({
            key: "adminUser",
            data: ""
          })
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})
