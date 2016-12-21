// pages/groupForm/groupForm.js
Page({
  data: {
    array: ['是', '否'],
    index: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  sale: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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