const sliderWidth = 125; // 需要设置slider的宽度，用于计算中间位置
const menuHeight = 125;
var app = getApp()
Page({
    data: {
        tabs: ["设备销量", "产品销量"],
        tabbar: [],
        tabbarIndex: 0,
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        menuTop: 0,
        date: "",
        group: '',
        groupMenu: false,
        equipmentMenu: false,
        equipment: "大梅沙二号机",
        lack: "11",
        nogoods: "32",
        indexleft: "",
        sidebarZindex: "",
        grouplist1: ["测试组织", "光明乳业", "我的组织", "友芝友乳业", "未归属机器"],
        grouplist1Selete: ["我是1", "我司1", "我是1"],
        grouplist1Selete0: ["我是1", "我司1", "我是1"],
        grouplist1Selete1: ["我是2", "我司2", "我是2"],
        grouplist1Selete2: ["我是3", "我司3", "我是3"],
        grouplist1Selete3: ["我是4", "我司4", "我是4"],
        grouplist1Selete4: ["我是5", "我司5", "我是5"],
        grouplist2: ["00", "01", "02", "10", "11", "12", "20", "21", "22", "30", "31", "32", "40", "41", "42"],
        grouplist2item: ["我是1", "我司1", "我是1"],
        grouplist2item00: ["00", "我司1", "我是1"],
        grouplist2item01: ["01", "我司1", "我是1"],
        grouplist2item02: ["02", "我司1", "我是1"],
        grouplist2item10: ["10", "我司1", "我是1"],
        grouplist2item11: ["11", "我司1", "我是1"],
        grouplist2item12: ["12", "我司1", "我是1"],
        grouplist2item20: ["20", "我司1", "我是1"],
        grouplist2item21: ["21", "我司1", "我是1"],
        grouplist2item22: ["22", "我司1", "我是1"],
        grouplist2item30: ["30", "我司1", "我是1"],
        grouplist2item31: ["31", "我司1", "我是1"],
        grouplist2item32: ["32", "我司1", "我是1"],
        grouplist2item40: ["40", "我司1", "我是1"],
        grouplist2item41: ["41", "我司1", "我是1"],
        grouplist2item42: ["42", "我司1", "我是1"],
        grouplist3item000: ["000", "我司1", "我是1"],
        grouplist3: ["000", "001", "002", "010", "011", "012", "020", "021", "022",
            "100", "101", "102", "110", "111", "112", "120", "121", "122",
            "200", "201", "202", "210", "211", "212", "220", "221", "222",
            "300", "301", "302", "310", "311", "312", "320", "321", "322",
            "400", "401", "402", "410", "411", "412", "420", "421", "422",
        ],
        grouplist3item: ["我是000", "我司000", "我是000"],
        grouplist3item000: ["我是000", "我司000", "我是000"],
        grouplist3item001: ["我是001", "我司000", "我是000"],
        grouplist3item002: ["我是002", "我司000", "我是000"],
        grouplist3item010: ["我是010", "我司000", "我是000"],
        grouplist3item011: ["我是011", "我司000", "我是000"],
        grouplist3item012: ["我是022", "我司000", "我是000"],
        grouplist3item020: ["我是020", "我司000", "我是000"],
        grouplist3item021: ["我是021", "我司000", "我是000"],
        grouplist3item022: ["我是022", "我司000", "我是000"],
        grouplist3item100: ["我是100", "我司000", "我是000"],
        grouplist3item101: ["我是000", "我司000", "我是000"],
        grouplist3item102: ["我是000", "我司000", "我是000"],
        grouplist3item110: ["我是000", "我司000", "我是000"],
        grouplist3item111: ["我是000", "我司000", "我是000"],
        grouplist3item112: ["我是000", "我司000", "我是000"],
        grouplist3item120: ["我是000", "我司000", "我是000"],
        grouplist3item121: ["我是000", "我司000", "我是000"],
        grouplist3item122: ["我是000", "我司000", "我是000"],
        grouplist3item200: ["我是000", "我司000", "我是000"],
        grouplist3item201: ["我是000", "我司000", "我是000"],
        grouplist3item202: ["我是000", "我司000", "我是000"],
        grouplist3item210: ["我是000", "我司000", "我是000"],
        grouplist3item211: ["我是000", "我司000", "我是000"],
        grouplist3item212: ["我是000", "我司000", "我是000"],
        grouplist3item220: ["我是000", "我司000", "我是000"],
        grouplist3item221: ["我是000", "我司000", "我是000"],
        grouplist3item222: ["我是000", "我司000", "我是000"],
        grouplist3item300: ["我是000", "我司000", "我是000"],
        grouplist3item301: ["我是000", "我司000", "我是000"],
        grouplist3item302: ["我是000", "我司000", "我是000"],
        grouplist3item310: ["我是000", "我司000", "我是000"],
        grouplist3item311: ["我是000", "我司000", "我是000"],
        grouplist3item312: ["我是000", "我司000", "我是000"],
        grouplist3item320: ["我是000", "我司000", "我是000"],
        grouplist3item321: ["我是000", "我司000", "我是000"],
        grouplist3item322: ["我是000", "我司000", "我是000"],
        grouplist3item400: ["我是000", "我司000", "我是000"],
        grouplist3item401: ["我是000", "我司000", "我是000"],
        grouplist3item402: ["我是000", "我司000", "我是000"],
        grouplist3item410: ["我是000", "我司000", "我是000"],
        grouplist3item411: ["我是000", "我司000", "我是000"],
        grouplist3item412: ["我是412", "我司000", "我是000"],
        grouplist3item420: ["我是420", "我司000", "我是000"],
        grouplist3item421: ["我是000", "我司000", "我是000"],
        grouplist3item422: ["我是000", "我司000", "我是000"],
        equipmentItems: [
            { value: '我是设备1321321313123131231231231', text: '我是设备13213213131232132131231', type: 'circle' },
            { value: '我是设备23123213123', text: '我是设备2', type: 'circle' },
            { value: '我是设备3', text: '我是设备3', type: 'circle' },
            { value: '我是设备4', text: '我是设备4', type: 'circle' },
            { value: '我是设备5', text: '我是设备5', type: 'circle' },
            { value: '我是设备6', text: '我是设备6', type: 'circle' },
        ],
        activeList1: "0",
        grouplistOpacity: "0",
        grouplistTransform: "",
        activeList2: "",
        activeList1Selete: "",
        activeList3: "",
        list1: "0",
        list1Selete: "0",
        checkedValues: [],
        groupList3Color: false,
        offline: ""
    },
    onLoad: function () {
        let _this = this;
        wx.getStorage({
            key: 'tabbarIndex',
            success: function (res) {
                _this.setData({
                    tabbarIndex: parseInt(res.data),
                });
            }
        });
        function GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        };
        this.setData({
            date: GetDateStr(-1),
             tabbar: app.tabbar
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
  tabbarClick: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.redirectTo({
      url: link
    });
    wx.setStorage({
      key: "tabbarIndex",
      data: e.currentTarget.dataset.index
    })
  },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            activeList1: "0",
            activeList1Selete: "",
            activeList2: "",
            activeList3: "",
        });
    },
    groupPatch: function (e) {
        this.setData({
            indexleft: "translateX(300px)",
            groupMenu: true,
            equipmentMenu: false,
            sidebarZindex: "1",
            grouplistOpacity: "1",
            grouplistTransform: "translateX(0px)",
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
        let n = e.currentTarget.id
        switch (n) {
            case "0":
                _this.setData({
                    grouplist1Selete: _this.data.grouplist1Selete0
                });
                break
            case "1":
                _this.setData({
                    grouplist1Selete: _this.data.grouplist1Selete1
                });
                break
            case "2":
                _this.setData({
                    grouplist1Selete: _this.data.grouplist1Selete2
                });
                break
            case "3":
                _this.setData({
                    grouplist1Selete: _this.data.grouplist1Selete3
                });
                break
            case "4":
                _this.setData({
                    grouplist1Selete: _this.data.grouplist1Selete4
                });
                break
        }
    },
    list1seleteClick: function (e) {

        this.setData({
            activeList1Selete: e.currentTarget.id,
            activeList2: "0",
            groupList3Color: false,
        });
        let _this = this;
        wx.getStorage({
            key: 'list1',
            success: function (res) {
                _this.setData({
                    list1: res.data,
                });
            }
        })
        let n = _this.data.activeList1 + e.currentTarget.id

        switch (n) {
            case "00":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item00
                });
                break
            case "01":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item01
                });
                break
            case "02":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item02
                });
                break
            case "10":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item10
                });
                break
            case "11":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item11
                });
                break
            case "12":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item12
                });
                break
            case "20":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item20
                });
                break
            case "21":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item21
                });
                break
            case "22":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item22
                });
                break
            case "30":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item30
                });
                break
            case "31":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item31
                });
                break
            case "32":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item32
                });
                break
            case "40":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item40
                });
                break
            case "41":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item41
                });
                break
            case "42":
                _this.setData({
                    grouplist2item: _this.data.grouplist2item42
                });
                break

        }
        wx.setStorage({
            key: "list1Selete",
            data: e.currentTarget.id
        })
    },
    groupList2Click: function (e) {
        let _this = this;
        this.setData({
            activeList2: e.currentTarget.id,
            groupList3Color: false,
        });
        wx.getStorage({
            key: 'list1Selete',
            success: function (res) {
                _this.setData({
                    list1Selete: res.data,
                });
            }
        });

        let n = _this.data.activeList1 + _this.data.activeList1Selete + e.currentTarget.id

        switch (n) {
            case "000":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item000
                });
                break
            case "001":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item001
                });
                break
            case "002":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item002
                });
                break
            case "010":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item010
                });
                break
            case "011":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item011
                });
                break
            case "012":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item012
                });
                break
            case "020":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item020
                });
                break
            case "021":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item021
                });
                break
            case "022":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item022
                });
                break
            case "100":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item100
                });
                break
            case "101":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item101
                });
                break
            case "102":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item102
                });
                break
            case "110":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item110
                });
                break
            case "111":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item111
                });
                break
            case "112":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item112
                });
                break
            case "120":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item120
                });
                break
            case "121":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item121
                });
                break
            case "122":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item122
                });
                break
            case "200":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item200
                });
                break
            case "201":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item201
                });
                break
            case "202":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item202
                });
                break
            case "210":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item210
                });
                break
            case "211":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item211
                });
                break
            case "212":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item212
                });
                break
            case "220":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item220
                });
                break
            case "221":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item221
                });
                break
            case "222":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item222
                });
                break
            case "300":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item300
                });
                break
            case "301":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item301
                });
                break
            case "302":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item302
                });
                break
            case "310":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item310
                });
                break
            case "311":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item311
                });
                break
            case "312":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item312
                });
                break
            case "320":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item320
                });
                break
            case "321":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item321
                });
                break
            case "322":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item322
                });
                break
            case "400":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item400
                });
                break
            case "401":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item401
                });
                break
            case "402":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item402
                });
                break
            case "410":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item410
                });
                break
            case "411":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item411
                });
                break
            case "412":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item412
                });
                break
            case "420":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item420
                });
                break
            case "421":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item421
                });
                break
            case "422":
                _this.setData({
                    grouplist3item: _this.data.grouplist3item422
                });
                break
        }
        wx.setStorage({
            key: "list2",
            data: e.currentTarget.id
        })
    },
    groupList3Click: function (e) {

        let _this = this;
        if (_this.data.activeIndex == "0") {
            this.setData({
                activeList3: e.currentTarget.id,
                group: e.currentTarget.dataset.item,
                groupList3Color: true,
            });
        } else {
            this.setData({
                activeList3: e.currentTarget.id,
                offline: e.currentTarget.dataset.item,
                groupList3Color: true,
            });
        }
        // wx.getStorage({
        //     key: 'list1Selete',
        //     success: function (res) {
        //         _this.setData({
        //             list1Selete: res.data,
        //         });
        //     }
        // });
        // wx.setStorage({
        //     key: "list2",
        //     data: e.currentTarget.id
        // })
    },
    equipmentPatch: function (e) {
        this.setData({
            indexleft: "translateX(300px)",
            groupMenu: false,
            equipmentMenu: true,
            sidebarZindex: "1",
            equipmentlistOpacity: "1",
            equipmentlistTransform: "translateX(0px)",
        });

    },
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

    offlineGroup: function (e) {
        this.setData({
            indexleft: "translateX(300px)",
            groupMenu: true,
            equipmentMenu: false,
            sidebarZindex: "1",
            grouplistOpacity: "1",
            grouplistTransform: "translateX(0px)",

        });

    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
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
    }
});