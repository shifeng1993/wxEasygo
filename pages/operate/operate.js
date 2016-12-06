const sliderWidth = 125; // 需要设置slider的宽度，用于计算中间位置
const menuHeight = 125;
Page({
    data: {
        tabs: ["补货统计", "离线设备", "设备复制"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        menuTop: 0,
        group: '前海易购',
        equipment: "大梅沙二号机",
        lack: "11",
        nogoods: "32",
        indexleft: "",
        groupMenu: "",
        grouplist1: ["测试组织", "光明乳业", "我的组织", "友芝友乳业", "未归属机器"],
        grouplist1Selete: ["我是1", "我司1", "我是1"],
        activeList1: "0",
        grouplist1opacity: "0",
        grouplist1transform: "",
        grouplist2: ["前海易购", "哈哈", "啊啊"],
        activeList2: "0",
        grouplist2opacity: "0",
        grouplist2transform: "",
        activeList1Selete: "0",
        list1: "0",
        list1Selete: "0"
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    menuTop: (res.windowHeight / that.data.grouplist1.length - menuHeight) / 2,

                });
            }
        });
    },

    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    groupPatch: function (e) {
        this.setData({
            indexleft: "translateX(300px)",
            groupMenu: "1",
            grouplist1opacity: "1",
            grouplist1transform: "translateX(0px)",
            grouplist2opacity: "1",
            grouplist2transform: "translateX(0px)"
        });
    },
    groupList1Click: function (e) {
        this.setData({
            activeList1: e.currentTarget.id,
        });
        wx.setStorage({
            key: "list1",
            data: e.currentTarget.id
        })
        let _this = this;
        let n = parseInt(e.currentTarget.id)
        switch (n) {
            case 0:
                _this.setData({
                    grouplist1Selete: ["我是1", "我司1", "我是1"]
                });
                break
            case 1:
                _this.setData({
                    grouplist1Selete: ["我是2", "我司2", "我是2"]
                });
                break
            case 2:
                _this.setData({
                    grouplist1Selete: ["我是3", "我司3", "我是3"]
                });
                break
            case 3:
                _this.setData({
                    grouplist1Selete: ["我是4", "我司4", "我是4"]
                });
                break
            case 4:
                _this.setData({
                    grouplist1Selete: ["我是5", "我司5", "我是5"]
                });
                break
        }
    },
    list1seleteClick: function (e) {
        this.setData({
            activeList1Selete: e.currentTarget.id,
        });
        let _this = this
        wx.getStorage({
            key: 'list1',
            success: function (res) {
                console.log(res.data);
                _this.setData({
                    list1: res.data,
                });
            }
        })
        wx.setStorage({
            key: "list1Selete",
            data: e.currentTarget.id
        })
    },
    groupList2Click: function (e) {
        this.setData({
            activeList2: e.currentTarget.id
        });
        wx.getStorage({
            key: 'list1Selete',
            success: function (res) {
                console.log(res.data);
                _this.setData({
                    list1Selete: res.data,
                });
            }
        })

    },
    equipmentPatch: function (e) {

    },
    init: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenu: "0",
            grouplist1opacity: "0",
            grouplist1transform: "translateX(100rpx)",
            grouplist2opacity: "0",
            grouplist2transform: "translateX(50px)"
        });
    }
});