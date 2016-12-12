//my.js
//获取应用实例
var app = getApp()
Page({
  data: {
        tabbar: [],
    tabbarIndex: 0,
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = this;
    wx.getStorage({
      key: 'tabbarIndex',
      success: function (res) {
        _this.setData({
          tabbarIndex: parseInt(res.data),
        });
      }
    });
    _this.setData({
       tabbar: app.tabbar
    })

    console.log('onLoad')

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
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
  },
})
