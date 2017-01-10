// pages/operateLogin/operateLogin.js
Page({
  data: {
    machineId: 'EGZS0300611',
    name: "611#续航电梯间"
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
  groupForm: function (e) {
    wx.navigateTo({
      url: "/pages/groupForm/groupForm"
    });
  },
  nameChange(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  rename: function (e) {
    var _this = this;
    wx.request({
      url: apiServer + apiVersion + '/usr/binding',
      header: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      data: {
        openId: app.globalData.openid,
        machineId: _this.data.machineId,
        machineName: _this.data.name
      },
      success: function (res) {
        if (res.msg === "update machine name success!") {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  fillingAll: function (e) {
    var _this = this;
    wx.request({
      url: apiServer + '/api/v1/machine/aisle/fillingAll',
      header: {
         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'POST',
      data: {
        machineId: _this.data.machineId,
      },
      success: function (res) {
        if (res.msg === "update machine name success!") {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
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