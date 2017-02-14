// pages/operateLogin/operateLogin.js
var app = getApp()
Page({
  data: {
    machineId: '',
    machineName: '',
    machineAisles: []
  },
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.globalData.apiOpen + '/machine/' + options.machineId,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid,
        machineId: options.machineId
      },
      success: function (res) {
        if (res.data) {
          _this.setData({
            machineAisles: res.data.machineAisles,
            machineId: res.data.machineId,
            machineName: res.data.machineName
          })
          app.globalData.machineAisles = res.data.machineAisles
        }
      }
    })
  },
  operateLogin(e) {
    this.setData({
      operateLogin: false,
      equipmentOperate: true
    });
  },
  groupForm: function (e) {
    wx.navigateTo({
      url: "/pages/groupForm/groupForm?index=" + e.currentTarget.dataset.index
    });
  },
  nameChange(e) {
    this.setData({
      machineName: e.detail.value,
    })
  },
  rename: function (e) {
    var _this = this;
    if (this.data.machineName) {
      wx.request({
        url: app.globalData.apiOpen + '/machine/name',
        header: {
          'content-type': 'application/json'
        },
        method: 'PUT',
        data: {
          openId: app.globalData.openid,
          machineId: _this.data.machineId,
          machineName: _this.data.machineName
        },
        success: function (res) {
          if (res.data.status === 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  },
  // fillingAll: function (e) {
  //   var _this = this;
  //   wx.request({
  //     url: app.globalData.apiServer + '/machine/aisle/fillingAll',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //     },
  //     method: 'POST',
  //     data: {
  //       machineId: _this.data.machineId,
  //     },
  //     success: function (res) {
  //       if (res.data.status === 200) {
  //         wx.showToast({
  //           title: '补货成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       }
  //     }
  //   })
  // },
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