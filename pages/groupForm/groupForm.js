// pages/groupForm/groupForm.js
Page({
  data: {
    number: 'dsadsadsa',
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
    // wx.request({
    //   url: apiServer + apiVersion + '/goods/brand',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    //   method: 'GET',
    //   data: {
    //     openId: app.globalData.openid,
    //   },
    //   success: function (res) {
    //     if (res) {
    //       this.setData({
    //         brand: res.brandList
    //       })
    //     }
    //   }
    // })
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
    wx.request({
      url: apiServer + apiVersion + '/goods/size',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid,
        skuBrand: this.data.brand[brandindex],
        skuSubject: this.data.name[e.detail.value]
      },
      success: function (res) {
        if (res) {
          this.setData({
            

            
          })
        }
      }
    })
  },
  brand: function (e) {
    this.setData({
      brandindex: e.detail.value
    })
    wx.request({
      url: apiServer + apiVersion + '/goods/subject',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid,
        skuBrand: this.data.brand[e.detail.value]
      },
      success: function (res) {
        if (res) {
          this.setData({
            name: res.subjectList
          })
        }
      }
    })
  },
  norms: function (e) {
    this.setData({
      normsindex: e.detail.value
    })

  },
  cancle: function (e) {
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