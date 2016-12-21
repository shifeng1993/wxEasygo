//my.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bindUser: 'eg_mon',
    userInfo: {}

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
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
  },
})
