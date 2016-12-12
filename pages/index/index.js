//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tabbar: [],
    tabbarIndex: 0,
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
    if (this.data.tabbarIndex == null) {
      _this.setData({
        tabbarIndex: 0
      });
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.getStorage({
      key: 'tabbarIndex',
      success: function (res) {
        _this.setData({
          tabbarIndex: parseInt(res.data),
        });
      }
    });
    function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;//获取当前月份的日期
      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    }
    this.setData({
      lastDate: GetDateStr(-1),
      tabbar: app.tabbar
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
    setTimeout(function () {
      wx.hideToast()
    }, 100)
  },

  tabbarClick: function (e) {
    let link = e.currentTarget.dataset.link;
    let tabbarIndex = e.currentTarget.dataset.index;
    let _this= this;
    wx.getStorage({
      key: 'tabbarIndex',
      success: function (res) {
        _this.setData({
          tabbarIndex: parseInt(res.data),
        });
      }
    });
    if (this.data.tabbarIndex != tabbarIndex) {
      wx.redirectTo({
        url: link
      });
      wx.setStorage({
        key: "tabbarIndex",
        data: e.currentTarget.dataset.index
      })
    }
  }
})
