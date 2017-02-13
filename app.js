//app.js
App({
  onLaunch: function () {
    var _this = this
    wx.getStorage({
      key: 'adminUser',
      fail: function (res) {
        wx.setStorage({
          key: "adminUser",
          data: ''
        })
      }
    })

    wx.login({
      success: function (res) {
        if (res.code) {

          wx.getUserInfo({
            success: function (res) {
              _this.globalData.wxUser = res.userInfo
            }
          })
          // 获取openid
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wx0c29f3292cd7d66d",
              secret: '4d81e097348ffe907d9463daab361887',
              js_code: res.code,
              grant_type: 'authorization_code',
            },
            success: function (res) {
              wx.setStorage({
                key: "openid",
                data: res.data.openid
              })
              _this.globalData.openid = res.data.openid
            }
          })
        } else {
          console.log('获取微信登录态失败！' + res.errMsg)
        }
      }
    });
  },



  GetDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "年" + m + "月" + d + "日";
  },
  GetDate: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
  },

  globalData: {
    wxUser: null,
    adminUser: null,
    openid: null,
    apiOpen: 'http://test.open.easygovm.com/oper/v1',
    apiServer: 'http://test.open.easygovm.com/api/v1/',
    machineAisles: []
  },
  form: {
    activeIndex: null
  },
  operate: {
    activeIndex: null
  }
})