// pages/login/login.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    name: '前海易购',
    logo: '/img/logo.png',
    loginBind: true,
  },
  submit: function() {
    wx.request({
      url: 'https://open.easygovm.com/api/v1/machine/machineTypes',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;//获取当前月份的日期
      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    }
    this.setData({
      lastDate: GetDateStr(-1)
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
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