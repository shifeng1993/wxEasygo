//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    today: '',
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
      today: app.GetDateStr(0)
    })
  },
  onShow: function () {
    var _this = this;
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
    wx.request({
      url: app.globalData.apiOpen + '/rpt/home',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
        if (res.data) {
          _this.setData({
            salesAmount: app.thousandsData(res.data.salesAmount),
            salesNumber: app.thousandsData(res.data.salesNumber),
            offlineMachines: app.thousandsData(res.data.offlineMachines),
            needFillMachines: app.thousandsData(res.data.needFillMachines),
          })
        }
      }
    })
  },

  // 二维码扫描
  operateLogin: function (e) {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    app.globalData.machineId = 1480062879775
    wx.navigateTo({
      url: "/pages/operateLogin/operateLogin?machineId=" + app.globalData.machineId
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
