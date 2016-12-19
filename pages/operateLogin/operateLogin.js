// pages/operateLogin/operateLogin.js
Page({
  data: {
    operateLogin: true,
    equipmentOperate: false,
    equipmentNumber:'EGZS0300611'
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  operateLogin(e) {
    this.setData({
      operateLogin: false,
      equipmentOperate: true
    });
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