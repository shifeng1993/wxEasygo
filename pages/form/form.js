const sliderWidth = 125; // 需要设置slider的宽度，用于计算中间位置
const menuHeight = 125;
var app = getApp()
Page({
    data: {
        tabs: ["设备销量", "产品销量"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        menuTop: 0,
        equipmentFirstDate: "",
        equipmentFirstDateStart: "",
        equipmentFirstDateEnd: "",
        equipmentLastDate: "",
        equipmentLastDateStart: "",
        equipmentLastDateEnd: "",
        groupFirstDate: "",
        groupFirstDateStart: "",
        groupFirstDateEnd: "",
        groupLastDate: "",
        groupLastDateStart: "",
        groupLastDateEnd: "",
        goodsDate: "",
        group: '',
        groupMenu: false,
        equipmentMenu: false,
        equipment: "大梅沙二号机",
        lack: "11",
        nogoods: "32",
        indexleft: "",
        sidebarZindex: "",
        grouplistOpacity: "0",
        grouplistTransform: "",
        offline: "",
        grouplist: {
            "name": "前海易购",
            "link": "###",
            "isleaf": false,
            "level": 0,
            "children": [
                {
                    "name": "2级菜单1",
                    "link": "###",
                    "isleaf": false,
                    "level": 1,
                    "children": [
                        {
                            "name": "3级菜单1",
                            "link": "###",
                            "isleaf": true,
                            "level": 2,
                            "children": [
                                {
                                    "name": "4级菜单1",
                                    "link": "###",
                                    "isleaf": true,
                                    "level": 3,
                                    "children": [
                                        {
                                            "name": "5级菜单1",
                                            "link": "###",
                                            "isleaf": true,
                                            "level": 4,
                                            "children": null
                                        }
                                    ]
                                }
                            ]

                        },
                        {
                            "name": "3级菜单2",
                            "link": "###",
                            "isleaf": true,
                            "level": 2,
                            "children": null
                        }
                    ]
                },
                {
                    "name": "2级菜单2",
                    "link": "###",
                    "isleaf": false,
                    "level": 1,
                    "children": [
                        {
                            "name": "3级菜单3",
                            "link": "###",
                            "isleaf": true,
                            "level": 2,
                            "children": null
                        }
                    ]
                }
            ]
        },
        grouplist2: [],
        grouplist3: [],
        grouplist4: [],
        grouplist5: [],
        activeList2: null,
        activeList3: null,
        activeList4: null,
        activeList5: null,
        equipmentItems: [
            { value: '我是设备1321321313123131231231231', text: '我是设备13213213131232132131231', type: 'circle' },
            { value: '我是设备23123213123', text: '我是设备2', type: 'circle' },
            { value: '我是设备3', text: '我是设备3', type: 'circle' },
            { value: '我是设备4', text: '我是设备4', type: 'circle' },
            { value: '我是设备5', text: '我是设备5', type: 'circle' },
            { value: '我是设备6', text: '我是设备6', type: 'circle' },
        ],
        grouplistOpacity: "0",
        grouplistTransform: "",
        checkedValues: [],
        groupValues: "",
    },
    onLoad: function () {
        let _this = this;
        // if (app.appDate.userInfo == null) {
        //     wx.redirectTo({
        //         url: '/pages/login/login'
        //     })
        // }

        // 这是sidebar菜单
        (function () {
            let grouplist2 = [];
            let arr2 = _this.data.grouplist.children
            // 二级
            if (arr2 != null) {
                for (let a = 0; a < arr2.length; a++) {
                    grouplist2.push(arr2[a])
                }
            }
            _this.setData({
                grouplist2: grouplist2,

            })
        })()
        function GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        };
        this.setData({
            equipmentFirstDate: GetDateStr(-1),
            equipmentLastDate: GetDateStr(-1),
            groupFirstDate: GetDateStr(-1),
            groupLastDate: GetDateStr(-1),
            goodsDate: GetDateStr(-1),
        });
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
                    menuTop: (res.windowHeight / _this.data.grouplist1.length - menuHeight) / 2,

                });
            }
        });
    },
  // tab切换以及ui侧滑出
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
        });
    },
    groupPatch: function (e) {
        this.setData({
            indexleft: "translateX(100%)",
            groupMenu: true,
            equipmentMenu: false,
            sidebarZindex: "1",
            grouplistOpacity: "1",
            grouplistTransform: "translateX(0px)",
        });
    },
    groupBack: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
    },
    equipmentPatch: function (e) {
        this.setData({
            indexleft: "translateX(100%)",
            groupMenu: false,
            equipmentMenu: true,
            sidebarZindex: "1",
            equipmentlistOpacity: "1",
            equipmentlistTransform: "translateX(0px)",
        });

    },
    grouplistBack: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
        if (this.data.activeIndex === "0") {
            this.setData({
                group: this.data.groupValues
            });
        } else {
            this.setData({
                offline: this.data.groupValues
            });
        }
    },
    equipmentBack: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
            equipment: this.data.checkedValues
        });
    },

 offlineGroup: function (e) {
        this.setData({
            indexleft: "translateX(100%)",
            groupMenu: true,
            equipmentMenu: false,
            sidebarZindex: "1",
            grouplistOpacity: "1",
            grouplistTransform: "translateX(0px)",

        });

    },
    init: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
    },
    //    多选以及全选框
    bindCheckbox: function (e) {
        /*绑定点击事件，将checkbox样式改变为选中与非选中*/

        //拿到下标值，以在items作遍历指示用
        var index = parseInt(e.currentTarget.dataset.index);
        //原始的icon状态
        var type = this.data.equipmentItems[index].type;
        var equipmentItems = this.data.equipmentItems;
        if (type == 'circle') {
            //未选中时
            equipmentItems[index].type = 'success_circle';
        } else {
            equipmentItems[index].type = 'circle';
        }

        // 写回经点击修改后的数组
        this.setData({
            equipmentItems: equipmentItems
        });
        // 遍历拿到已经勾选的值
        var checkedValues = [];
        for (var i = 0; i < equipmentItems.length; i++) {
            if (equipmentItems[i].type == 'success_circle') {
                checkedValues.push(equipmentItems[i].text);
            }
        }
        // 写回data，供提交到网络
        this.setData({
            checkedValues: checkedValues
        });
    },
    allCheckbox: function (e) {
        var equipmentItems = this.data.equipmentItems;
        var typeArr = [];
        for (let i = 0; i < equipmentItems.length; i++) {
            typeArr.push(this.data.equipmentItems[i].type);
        }
        if (typeArr.indexOf('circle') == -1) {
            for (let i = 0; i < equipmentItems.length; i++) {
                equipmentItems[i].type = 'circle';
            }
        } else {
            for (let i = 0; i < equipmentItems.length; i++) {
                equipmentItems[i].type = 'success_circle';
            }
        }
        // 写回经点击修改后的数组
        this.setData({
            equipmentItems: equipmentItems
        });

        // 遍历拿到已经勾选的值
        var checkedValues = [];
        for (let i = 0; i < equipmentItems.length; i++) {
            if (equipmentItems[i].type == 'success_circle') {
                checkedValues.push(equipmentItems[i].text);
            }
        }
        // 写回data，供提交到网络
        this.setData({
            checkedValues: checkedValues
        });
    },
    // 以下是grouplist的点击效果
    list2Click: function (e) {
        this.setData({
            activeList2: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
        });
        let _this = this;
        let grouplist3 = [];
        let arr2 = _this.data.grouplist.children;
        let arr3 = arr2[e.currentTarget.id].children;
        _this.setData({
            grouplist3: arr3,
            grouplist4: [],
            grouplist5: [],
        })
    },
    list3Click: function (e) {
        this.setData({
            activeList3: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
        });
        let _this = this;
        let grouplist4 = [];
        let arr2 = _this.data.grouplist.children;
        let arr3 = arr2[this.data.activeList2].children;
        let arr4 = arr3[e.currentTarget.id].children;
        _this.setData({
            grouplist4: arr4,
            grouplist5: [],
        })
    },
    list4Click: function (e) {
        this.setData({
            activeList4: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
        });
        let _this = this;
        let grouplist5 = [];
        let arr2 = _this.data.grouplist.children;
        let arr3 = arr2[this.data.activeList2].children;
        let arr4 = arr3[this.data.activeList3].children;
        let arr5 = arr4[e.currentTarget.id].children;
        _this.setData({
            grouplist5: arr5,
        })
    },
    list5Click: function (e) {
        this.setData({
            activeList5: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
        });
    },

    // 以下是判断时间区间的js
    endDate: function (date) {
        var arr = date.split("-");
        var y = arr[0];
        var m = arr[1]
        var d = arr[2];

        switch (parseInt(arr[1])) {
            case 10:
                y = (parseInt(arr[0]) + 1).toString();
                m = "1";
                break
            case 11:
                y = (parseInt(arr[0]) + 1).toString();
                m = "2";
                break
            case 12:
                y = (parseInt(arr[0]) + 1).toString();
                m = "3";
                break
            default:
                m = (parseInt(arr[1]) + 3).toString()
        }
        return y + "-" + m + "-" + d;
    },
    startDate: function (date) {
        var arr = date.split("-");
        var y = arr[0];
        var m = arr[1]
        var d = arr[2];

        switch (parseInt(arr[1])) {
            case 1:
                y = (parseInt(arr[0]) - 1).toString();
                m = "10";
                break
            case 2:
                y = (parseInt(arr[0]) - 1).toString();
                m = "11";
                break
            case 3:
                y = (parseInt(arr[0]) - 1).toString();
                m = "12";
                break
            default:
                m = (parseInt(arr[1]) - 3).toString()
        }
        return y + "-" + m + "-" + d;
    },

    equipmentFirstDateChange: function (e) {
        var _this = this;
        this.setData({
            equipmentFirstDate: e.detail.value,
            equipmentLastDateStart: e.detail.value,
            equipmentLastDateEnd: _this.endDate(e.detail.value),
        })
    },
    equipmentLastDateChange: function (e) {
        var _this = this;
        this.setData({
            equipmentLastDate: e.detail.value,
            equipmentFirstDateStart: _this.startDate(e.detail.value),
            equipmentFirstDateEnd: e.detail.value,
        })
    },
    groupFirstDateChange: function (e) {
        var _this = this;
        this.setData({
            equipmentFirstDate: e.detail.value,
            equipmentLastDateStart: e.detail.value,
            equipmentLastDateEnd: _this.endDate(e.detail.value),
        })
    },
    groupLastDateChange: function (e) {
        var _this = this;
        this.setData({
            equipmentLastDate: e.detail.value,
            equipmentFirstDateStart: _this.startDate(e.detail.value),
            equipmentFirstDateEnd: e.detail.value,
        })
    },
    goodsDateChange: function (e) {
        this.setData({
            goodsDate: e.detail.value
        })
    },
});