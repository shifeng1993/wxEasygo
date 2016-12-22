//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lastDate: '',
    scanQrcode: '../../img/qrcode.png'
  },
  // ajax: function() {
  //   wx.request({
  //     url: 'https://open.easygovm.com/api/v1/machine/machineTypes',
  //     header: {
  //         'content-type': 'application/json'
  //     },
  //     success: function(res) {
  //       console.log(res.data)
  //     }
  //   })
  // },

  onLoad: function () {
    let _this = this;
    // if (app.appDate.userInfo == null) {
    //   wx.redirectTo({
    //     url: '/pages/login/login'
    //   })
    // }
    function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;//获取当前月份的日期
      var d = dd.getDate();
      return y + "年" + m + "月" + d + "日";
    }
    this.setData({
      lastDate: GetDateStr(-1),
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
    // setTimeout(function () {
    //   wx.hideToast()
    // }, 100)
  },
  operateLogin: function (e) {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    wx.navigateTo({
      url: "/pages/operateLogin/operateLogin"
    });
  },
  // 以下是跳转tabbar
  link1: function () {
    wx.switchTab({
      url: '/pages/form/form'
    })
    app.form.activeIndex = "0"
  },
  link2: function () {
    wx.switchTab({
      url: '/pages/form/form'
    })
    app.form.activeIndex = "1"
  },
  link3: function () {
     wx.switchTab({
      url: '/pages/operate/operate'
    })
    app.operate.activeIndex = "1"
  },
  link4: function () {
     wx.switchTab({
      url: '/pages/operate/operate'
    })
    app.operate.activeIndex = "0"
  },
})
