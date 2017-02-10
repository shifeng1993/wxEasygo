// pages/groupForm/groupForm.js
var app = getApp();
Page({
  data: {
    number: '',
    sale: ['是', '否'],
    name: [],
    brand: [],
    norms: [],
    saleindex: 0,
    nameindex: 0,
    brandindex: 0,
    normsindex: 0,
    machineAisle: {},
    // 默认库cun
    defaultGoodsStock: '',
    // 当前库存
    goodsStock: '',
    originalPrice: '',
    // 货到产品价格
    goodsPrice: '',
    // 货到原价
    aisleOriginalPrice: '',
    // 货到产品价格
    aisleGoodsPrice: '',
    skuId: null,
    skuIds: []
  },

  onLoad: function (options) {
    let _this = this
    _this.setData({
      number: app.globalData.machineAisles[options.index].aisleName,
      machineAisle: app.globalData.machineAisles[options.index],
      saleindex: _this.isSaleEnabledinit(app.globalData.machineAisles[options.index].isSaleEnabled),
      defaultGoodsStock: app.globalData.machineAisles[options.index].defaultGoodsStock,
      goodsStock: app.globalData.machineAisles[options.index].goodsStock,
      aisleGoodsPrice: app.globalData.machineAisles[options.index].aisleGoodsPrice * 0.01,
      aisleOriginalPrice: app.globalData.machineAisles[options.index].aisleOriginalPrice * 0.01,
      goodsPrice: app.globalData.machineAisles[options.index].aisleGoodsPrice,
      originalPrice: app.globalData.machineAisles[options.index].aisleOriginalPrice
    })
    wx.request({
      url: app.globalData.apiOpen + '/goods/brand',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
        if (res.data) {
          let brand = res.data.brandList
          let brandindex = brand.indexOf(_this.data.machineAisle.goodsSkuInfo.skuPackageType)
          _this.setData({
            brand: brand,
            brandindex: brandindex
          })
          wx.request({
            url: app.globalData.apiOpen + '/goods/subject',
            header: {
              'content-type': 'application/json'
            },
            method: 'GET',
            data: {
              openId: app.globalData.openid,
              skuBrand: _this.data.brand[_this.data.brandindex]
            },
            success: function (res) {
              if (res.data) {
                let name = res.data.subjectList
                let nameindex = name.indexOf(_this.data.machineAisle.goodsSkuInfo.skuSubject)
                _this.setData({
                  name: name,
                  nameindex: nameindex
                })
                wx.request({
                  url: app.globalData.apiOpen + '/goods/size',
                  header: {
                    'content-type': 'application/json'
                  },
                  method: 'GET',
                  data: {
                    openId: app.globalData.openid,
                    skuBrand: _this.data.brand[_this.data.brandindex],
                    skuSubject: _this.data.name[_this.data.nameindex]
                  },
                  success: function (res) {
                    if (res.data) {
                      let norms = []
                      for (let a = 0; a < res.data.length; a++) {
                        norms.push(res.data[a].skuSize)
                      }
                      let normsindex = norms.indexOf(_this.data.machineAisle.goodsSkuInfo.skuSize)
                      _this.setData({
                        norms: norms,
                        normsindex: normsindex,
                        skuId: res.data[normsindex].skuId
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  sale: function (e) {
    this.setData({
      saleindex: parseInt(e.detail.value)
    })
  },
  isSaleEnabledinit: function (isSaleEnabled) {
    if (isSaleEnabled === 'Y') {
      return 0
    } else if (isSaleEnabled === 'N') {
      return 1
    } else if (isSaleEnabled === 0) {
      return 'Y'
    } else if (isSaleEnabled === 1) {
      return 'N'
    }
  },
  brand: function (e) {
    let _this = this
    this.setData({
      brandindex: parseInt(e.detail.value),
      norms: [],
      normsindex: 0
    })
    wx.request({
      url: app.globalData.apiOpen + '/goods/subject',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid,
        skuBrand: _this.data.brand[parseInt(e.detail.value)]
      },
      success: function (res) {
        if (res.data) {
          let name = res.data.subjectList
          let nameindex = name.indexOf(_this.data.machineAisle.goodsSkuInfo.skuSubject)
          _this.setData({
            name: name,
            nameindex: nameindex
          })
        }
      }
    })
  },
  name: function (e) {
    let _this = this
    this.setData({
      nameindex: parseInt(e.detail.value),
    })
    wx.request({
      url: app.globalData.apiOpen + '/goods/size',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        openId: app.globalData.openid,
        skuBrand: _this.data.brand[_this.data.brandindex],
        skuSubject: _this.data.name[parseInt(e.detail.value)]
      },
      success: function (res) {
        if (res.data) {
          let norms = []
          let skuIds = []
          for (let a = 0; a < res.data.length; a++) {
            norms.push(res.data[a].skuSize)
            skuIds.push(res.data[a].skuId)
          }
          let normsindex = norms.indexOf(_this.data.machineAisle.goodsSkuInfo.skuSize)
          _this.setData({
            norms: norms,
            normsindex: normsindex,
            skuIds: skuIds
          })
        }
      }
    })
  },

  norms: function (e) {
    this.setData({
      normsindex: e.detail.value,
      skuId: this.data.skuIds[e.detail.value]
    })
  },

  aisleGoodsPrice: function (e) {
    this.setData({
      aisleGoodsPrice: e.detail.value,
      goodsPrice: e.detail.value * 100
    })
  },
  aisleOriginalPrice: function (e) {
    this.setData({
      aisleOriginalPrice: e.detail.value,
      originalPrice: e.detail.value * 100
    })
  },
  cancle: function (e) {
    wx.navigateBack()
  },
  save: function (e) {
    let _this = this;
    wx.request({
      url: app.globalData.apiOpen + '/machine/asile',
      header: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      data: {
        openId: app.globalData.openid,
        machineId: _this.data.machineAisle.machineId,
        aisleName: _this.data.machineAisle.aisleName,
        skuId: _this.data.skuId,
        goodsStock: _this.data.goodsStock,
        defaultGoodsStock: _this.data.defaultGoodsStock,
        aisleOriginalPrice: _this.data.originalPrice,
        aisleGoodsPrice: _this.data.goodsPrice,
        isSaleEnabled: _this.isSaleEnabledinit(_this.data.saleindex)
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