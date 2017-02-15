// pages/serchMachine/serchMachine.js
var app = getApp();
Page({
  data: {
    machines: [
      "今天是星期五",
      "下周今天是星期几",
      "今天是周五",
      "明天咱们去钓鱼吧",
      "明天有事情玩游戏",
      "明天咱们吃火锅",
      "明天天气怎么样",
    ],
    serchMachines: [],
    serchbtn: false,
    serchtitle: '',
    input: ''
  },
  onLoad: function (options) {
    this.setData({
      serchtitle: options.serch
    })
    if (options.serch === 'fromid') {

    } else if (options.serch === 'toid') {

    }
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
  },
  serch: function (e) {
    this.showlist()
  },
  machinesitem: function (e) {
    if (this.data.serchtitle === 'fromid') {
      app.globalData.fromid = e.currentTarget.dataset.item
    } else {
      app.globalData.toid = e.currentTarget.dataset.item
    }
    this.back()
  },
  back: function (e) {
    wx.navigateBack()
  },
  clear: function (e) {
    this.setData({
      input: '',
      serchMachines: [],
      serchbtn: false
    })
  },
  showlist: function (e) {
    let _this = this;
    let str = e.detail.value;
    if (str !== '') {
      let arr = []
      for (let i = 0; i < _this.data.machines.length; i++) {
        let mainStr = _this.data.machines[i]
        let offset = _this.basicSearch(mainStr, str)
        if (offset !== -1) {
          arr.push(mainStr)
          arr.reverse()
        }
      }
      _this.setData({
        serchMachines: arr,
        serchbtn: true
      })
    } else {
      _this.setData({
        serchMachines: [],
        serchbtn: false
      })
    }
  },
  basicSearch: function (mainStr, str, offset) {
    var _this = this
    var mainLength = mainStr.length;
    var searchLength = str.length;
    if (searchLength > mainLength - offset) {
      return -1;
    }
    offset = offset || 0;
    for (var i = 0; str.length > i; i++) {
      if (str.charAt(i) !== mainStr.charAt(offset + i)) {
        return _this.basicSearch(mainStr, str, offset + 1)
      }
    }
    return offset;
  }
})