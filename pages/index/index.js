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
    menuindex: 0,
    menuindex01: 0,
    menuindex02: 0,
  },
  onLoad: function () {
    let _this = this;
    this.setData({
      lastDate: app.GetDateStr(-1),
      today: app.GetDateStr(0)
    })
    // wx.setStorage({
    //   key: "menuIds",
    //   data: ["99", "9902", "9903", "990403", "990202", "990301", "9901", "990401", "990302", "990203", "990101", "990102", "990201", "9904"]
    // })
    wx.getStorage({
      key: 'menuIds',
      success: function (res) {
        _this.setData({
          menuindex: parseInt(res.data[res.data.indexOf('9901')]),
          menuindex01: parseInt(res.data[res.data.indexOf('990101')]),
          menuindex02: parseInt(res.data[res.data.indexOf('990102')])
        })
      }
    })
    wx.getStorage({
      key: 'adminUser',
      success: function (res) {
        if (!res.data) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
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
          wx.getStorage({
            key: 'openid',
            success: function (res) {
              wx.request({
                url: app.globalData.apiOpen + '/rpt/home',
                header: {
                  'content-type': 'application/json'
                },
                method: 'GET',
                data: {
                  openId: res.data
                },
                success: function (res) {
                  if (res.data) {
                    _this.setData({
                      salesAmount: (_this.thousandsData(res.data.salesAmount) * 0.01).toFixed(2),
                      salesNumber: _this.thousandsData(res.data.salesNumber),
                      offlineMachines: _this.thousandsData(res.data.offlineMachines),
                      needFillMachines: _this.thousandsData(res.data.needFillMachines),
                    })
                  }
                }
              })
            }
          })
        }
      }
    })

  },

  // 二维码扫描
  operateLogin: function (e) {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg === 'scanCode:ok') {
          wx.navigateTo({
            url: "/pages/operateLogin/operateLogin?machineId=" + res.result
          });
        }
      }
    })
  },
  // 千分位格式化
  thousandsData: function (val) {
    //根据`.`作为分隔，将val值转换成一个数组
    var aIntNum = val.toString().split('.');
    // 整数部分
    var iIntPart = aIntNum[0];
    // 小数部分（传的值有小数情况之下）
    var iFlootPart = aIntNum.length > 1 ? '.' + aIntNum[1] : '';
    var rgx = /(\d+)(\d{3})/;
    // 如果整数部分位数大于或等于5
    if (iIntPart.length >= 5) {
      // 根据正则要求，将整数部分用逗号每三位分隔
      while (rgx.test(iIntPart)) {
        iIntPart = iIntPart.replace(rgx, '$1' + ',' + '$2');
      }
    }
    // 如果小数部分位数大于或等于5
    if (iFlootPart && iFlootPart.length >= 5) {
      // 根据正则要求，将小数部分用每三位分隔按空格号分开
      while (rgx.test(iFlootPart)) {
        iFlootPart = iFlootPart.replace(/(\d{3})/g, '$1 ');
      }
    }
    // 将整数部分和小数组部分合并在一起，并返回
    return iIntPart + iFlootPart;
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
  }
})
