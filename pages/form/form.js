var sliderWidth = 125; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["设备销量", "产品销量"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        tab1Title: "设备销量报表",
        tab2Title: "产品销量报表"
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});