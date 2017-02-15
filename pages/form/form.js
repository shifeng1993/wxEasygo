const sliderWidth = 125; // 需要设置slider的宽度，用于计算中间位置
const menuHeight = 125;
var app = getApp()
Page({
    data: {
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
        equipment: '',
        machine: '',
        machinetotal: null,
        machineamounts: [],
        goodstotal: null,
        goodsmounts: [],
        indexleft: "",
        sidebarZindex: "",
        grouplistOpacity: "0",
        grouplistTransform: "",
        offline: "",
        grouplist: {},
        grouplist2: [],
        grouplist3: [],
        grouplist4: [],
        grouplist5: [],
        activeList1: null,
        activeList2: null,
        activeList3: null,
        activeList4: null,
        activeList5: null,
        equipmentItems: [],
        grouplistOpacity: "0",
        grouplistTransform: "",
        checkedValues: [],
        machineIds: [],
        groupValues: "",
        sidebarPageNumber: 0,
        sidebarPagetotal: 0,
        orgId: '',
        childrens: [],
        orgIds: [],
        menuindex: 0,
        menuindex01: 0,
        menuindex02: 0,
    },
    onLoad: function () {
        let _this = this;
        wx.getStorage({
            key: 'menuIds',
            success: function (res) {
                _this.setData({
                    menuindex: parseInt(res.data[res.data.indexOf('9903')]),
                    menuindex01: parseInt(res.data[res.data.indexOf('990301')]),
                    menuindex02: parseInt(res.data[res.data.indexOf('990302')])
                })
            }
        })
        // 这是sidebar菜单
        wx.request({
            url: app.globalData.apiOpen + '/orgs',
            header: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'GET',
            data: {
                openId: app.globalData.openid
            },
            success: function (res) {
                if (res.data) {
                    _this.setData({
                        grouplist: res.data[0]
                    })
                    // 这是sidebar菜单
                    let grouplist2 = [];
                    let arr2 = _this.data.grouplist.childrens;
                    if (arr2 != null) {
                        for (let a = 0; a < arr2.length; a++) {
                            grouplist2.push(arr2[a])
                        }
                    }
                    _this.setData({
                        grouplist2: grouplist2,
                    })

                }
            }
        })
        this.setData({
            equipmentFirstDate: app.GetDate(-1),
            equipmentLastDate: app.GetDate(-1),
            groupFirstDate: app.GetDate(-1),
            groupLastDate: app.GetDate(-1),
            goodsDate: app.GetDate(-1),
        });
    },
    onShow: function () {
        let _this = this;
        wx.getStorage({
            key: 'adminUser',
            success: function (res) {
                if (!res.data) {
                    wx.redirectTo({
                        url: '/pages/login/login'
                    })
                }
            }
        })
        if (app.form.activeIndex != null) {
            _this.setData({
                activeIndex: app.form.activeIndex,
            })
        }
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
        let _this = this
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
        if (e.currentTarget.dataset.back != 0) {
            if (this.data.activeIndex === "0") {
                var orgIds = [];
                orgIds.push(_this.data.orgId);
                for (let i = 0; i < _this.data.childrens.length; i++) {
                    orgIds.push(_this.data.childrens[i].orgId)
                }
                _this.setData({
                    equipment: _this.data.groupValues,
                    orgIds: orgIds
                });
            } else {
                var orgIds = [];
                orgIds.push(_this.data.orgId);
                for (let i = 0; i < _this.data.childrens.length; i++) {
                    orgIds.push(_this.data.childrens[i].orgId)
                }
                _this.setData({
                    goods: _this.data.groupValues,
                    orgIds: orgIds
                });
                wx.request({
                    url: app.globalData.apiOpen + '/machine/all',
                    header: {
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                    data: {
                        openId: app.globalData.openid,
                        "orgIds": _this.data.orgIds,
                        "status": "both",
                        "pageNumber": 0,
                        "pageSize": 60
                    },
                    success: function (res) {
                        if (res.data) {
                            var machines = []
                            for (let i = 0; i < res.data.content.length; i++) {
                                let machineName = '';
                                let machineId = '';
                                if (res.data.content[i].machineName === null) {
                                    machineName = ''
                                } else {
                                    machineName = res.data.content[i].machineName
                                }
                                if (res.data.content[i].machineId === null) {
                                    machineId = ''
                                } else {
                                    machineId = res.data.content[i].machineId
                                }
                                machines.push({
                                    machineId: machineId,
                                    machineName: machineName,
                                    type: 'circle'
                                })
                            }
                            _this.setData({
                                equipmentItems: machines,
                                sidebarPageNumber: 1,
                                sidebarPagetotal: res.data.totalPages,
                            });
                        }
                    }
                })
            }
        }
    },

    dateInit: function (data) {
        let date = new Date(data)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let h = (date.getHours() > 0 ? "00" : '00') + ':'
        let m = (date.getMinutes() == 0 ? '00' : date.getMinutes()) + ':'
        let s = (date.getSeconds() == 0 ? '00' : date.getMinutes())
        return (Y + M + D + h + m + s)
    },
    equipmentBack: function (e) {
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
            machine: this.data.checkedValues
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
        var machineIds = [];
        for (var i = 0; i < equipmentItems.length; i++) {
            if (equipmentItems[i].type == 'success_circle') {
                checkedValues.push(equipmentItems[i].machineName);
                machineIds.push(equipmentItems[i].machineId)
            }
        }
        // 写回data，供提交到网络
        this.setData({
            checkedValues: checkedValues,
            machineIds: machineIds
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
        var machineIds = [];
        for (let i = 0; i < equipmentItems.length; i++) {
            if (equipmentItems[i].type == 'success_circle') {
                checkedValues.push(equipmentItems[i].machineName);
                machineIds.push(equipmentItems[i].machineId)
            }
        }
        // 写回data，供提交到网络
        this.setData({
            checkedValues: checkedValues,
            machineIds: machineIds
        });
    },
    // 以下是grouplist的点击效果
    // 以下是grouplist的点击效果
    list1Click: function (e) {
        // 添加
        this.setData({
            activeList1: e.currentTarget.dataset.level,
            groupValues: e.currentTarget.dataset.name,
            orgId: e.currentTarget.dataset.orgid,
            childrens: this.data.grouplist.childrens
        });
        // 撤销
        this.setData({
            grouplist3: [],
            grouplist4: [],
            grouplist5: [],
            activeList2: null,
            activeList3: null,
            activeList4: null,
            activeList5: null
        })
    },
    list2Click: function (e) {
        let grouplist3 = [];
        let arr2 = this.data.grouplist.childrens;
        let arr3 = arr2[e.currentTarget.id].childrens;
        // 添加
        this.setData({
            activeList2: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
            orgId: e.currentTarget.dataset.orgid,
            grouplist3: arr3,
            childrens: arr3
        });
        // 撤销
        this.setData({
            grouplist4: [],
            grouplist5: [],
            activeList3: null,
            activeList4: null,
            activeList5: null
        })
    },
    list3Click: function (e) {
        let grouplist4 = [];
        let arr2 = this.data.grouplist.childrens;
        let arr3 = arr2[this.data.activeList2].childrens;
        let arr4 = arr3[e.currentTarget.id].childrens;
        this.setData({
            activeList3: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
            orgId: e.currentTarget.dataset.orgid,
            grouplist4: arr4,
            childrens: arr4
        });
        this.setData({
            grouplist5: [],
            activeList4: null,
            activeList5: null,
        })
    },
    list4Click: function (e) {
        let grouplist5 = [];
        let arr2 = this.data.grouplist.childrens;
        let arr3 = arr2[this.data.activeList2].childrens;
        let arr4 = arr3[this.data.activeList3].childrens;
        let arr5 = arr4[e.currentTarget.id].childrens;
        this.setData({
            activeList4: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
            orgId: e.currentTarget.dataset.orgid,
            grouplist5: arr5,
            childrens: arr5
        });
        this.setData({
            activeList5: null,
        })
    },
    list5Click: function (e) {
        this.setData({
            activeList5: e.currentTarget.id,
            groupValues: e.currentTarget.dataset.name,
            orgId: e.currentTarget.dataset.orgid,
        });
    },
    equipmentloadMore: function (e) {
        var _this = this;
        if (_this.data.sidebarPageNumber > 0 && _this.data.sidebarPageNumber < _this.data.sidebarPagetotal) {
            if (_this.data.sidebarPageNumber != 0) {
                wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 10000
                })
            }
            wx.request({
                url: app.globalData.apiOpen + '/machine/all',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    openId: app.globalData.openid,
                    "orgIds": _this.data.orgIds,
                    "status": "both",
                    "pageNumber": _this.data.sidebarPageNumber,
                    "pageSize": 60
                },
                success: function (res) {
                    if (res.data) {
                        wx.hideToast();
                        var machines = _this.data.equipmentItems
                        for (let i = 0; i < res.data.content.length; i++) {
                            machines.push({
                                machineId: res.data.content[i].machineId,
                                machineName: res.data.content[i].machineName,
                                type: 'circle'
                            })
                        }
                        _this.setData({
                            equipmentItems: machines,
                            sidebarPageNumber: _this.data.sidebarPageNumber + 1
                        });
                    }
                }
            })
        }
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
            groupFirstDate: e.detail.value,
            groupLastDateStart: e.detail.value,
            groupLastDateEnd: _this.endDate(e.detail.value),
        })
    },
    groupLastDateChange: function (e) {
        var _this = this;
        this.setData({
            groupLastDate: e.detail.value,
            groupFirstDateStart: _this.startDate(e.detail.value),
            groupFirstDateEnd: e.detail.value,
        })
    },
    goodsDateChange: function (e) {
        this.setData({
            goodsDate: e.detail.value
        })
    },

    // 以下是发送ajax查询
    machineQuery: function (e) {
        let _this = this
        if (_this.data.orgIds.length != 0) {
            wx.request({
                url: app.globalData.apiOpen + '/rpt/sales/byMachine',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    openId: app.globalData.openid,
                    orgIds: _this.data.orgIds,
                    startDate: _this.dateInit(_this.data.equipmentFirstDate),
                    endDate: _this.dateInit(_this.data.equipmentLastDate)
                },
                success: function (res) {
                    if (res.data) {
                        let machinetotal =
                            { amount: res.data.total.amount * 0.01, quantity: res.data.total.quantity }
                        let machineamounts = []
                        for (let i = 0; i < res.data.byMachine.length; i++) {
                            machineamounts.push({
                                amount: res.data.byMachine[i].amount * 0.01, machineName: res.data.byMachine[i].machineName, quantity: res.data.byMachine[i].quantity
                            })
                        }
                        _this.setData({
                            machinetotal: machinetotal,
                            machineamounts: machineamounts
                        })
                    }
                }
            })
        }
    },
    goodsQuery: function (e) {
        let _this = this
        if (_this.data.orgIds.length != 0) {
            wx.request({
                url: app.globalData.apiOpen + '/rpt/sales/byGoods',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    openId: app.globalData.openid,
                    machineIds: _this.data.machineIds,
                    startDate: _this.dateInit(_this.data.groupFirstDate),
                    endDate: _this.dateInit(_this.data.groupLastDate)
                },
                success: function (res) {
                    let goodstotal =
                        { amount: res.data.total.amount * 0.01, quantity: res.data.total.quantity }
                    let goodsmounts = []
                    for (let i = 0; i < res.data.byGoods.length; i++) {
                        goodsmounts.push({
                            amount: res.data.byGoods[i].amount * 0.01, goodsSubject: res.data.byGoods[i].goodsSubject, quantity: res.data.byGoods[i].quantity
                        })
                    }

                    if (res.data) {
                        _this.setData({
                            goodstotal: goodstotal,
                            goodsmounts: goodsmounts
                        })
                    }
                }
            })
        }
    }
});