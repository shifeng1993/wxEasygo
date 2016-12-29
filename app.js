//app.js
App({
  onLaunch: function () {
    var _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              _this.globalData.wxUser = res.userInfo
              console.log(res)
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
  globalData: {
    wxUser: null,
    adminUser: null,
    openid: null,
    apiServer: '',
    apiVersion: '',
  },
  form: {
    activeIndex: null
  },
  operate: {
    activeIndex: null
  }
})