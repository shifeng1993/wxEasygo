// pages/groupForm/groupForm.js
Page({
  data: {
    number:'dsadsadsa',
    sale: ['是', '否'],
    name: ['冰峰', '可乐'],
    brand: ['可口可乐', '美年达'],
    norms: ['300ml', '500ml'],
    saleindex: 0,
    nameindex: 0,
    brandindex: 0,
    normsindex: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  sale: function (e) {
    this.setData({
      saleindex: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      nameindex: e.detail.value
    })
  },
  brand: function (e) {
    this.setData({
      brandindex: e.detail.value
    })
  },
  norms: function (e) {
    this.setData({
      normsindex: e.detail.value
    })
  },
  cancle:function(e){
    wx.navigateBack()
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