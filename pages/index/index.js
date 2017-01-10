//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    today:'',
    lastDate: '',
    scanQrcode: '../../img/qrcode.png',
    salesAmount: '',
    salesNumber: '',
    offlineMachines: '',
    needFillMachines: '',
  },

  onLoad: function () {
    let _this = this;
    this.setData({
      lastDate: app.GetDateStr(-1),
      today:app.GetDateStr(0)
    })
  },
  onShow: function () {
    var _this = this;
    // if (app.globalData.adminUser == null) {
    //   wx.redirectTo({
    //     url: '/pages/login/login'
    //   })
    // }

    // wx.request({
    //   url: apiServer + apiVersion + '/rpt/home',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'GET',
    //   data: {
    //     openId: app.globalData.openid
    //   },
    //   success: function (res) {
    //     if (res) {
    //       _this.setData({
    //         salesAmount: app.thousandsData(res.salesAmount),
    //         salesNumber: app.thousandsData(res.salesNumber),
    //         offlineMachines: app.thousandsData(res.offlineMachines),
    //         needFillMachines: app.thousandsData(res.needFillMachines),
    //       })
    //     }
    //   }
    // })
  },

  // 二维码扫描
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

  // 以下是index页面card查看详情跳转
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
