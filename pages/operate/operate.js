var app = getApp();
Page({
    data: {
        activeIndex: "0",
        group: '',
        offline: "",
        groupMenu: false,
        equipmentMenu: false,
        equipment: [],
        fillGoods: [],
        needFillGoodsRate: '0',
        noGoodsRate: '0',
        indexleft: "",
        sidebarZindex: "",
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
        checkedValue: '',
        machineIds: [],
        machineId: '',
        machineCode: '',
        groupValues: "",
        fromId: null,
        toId: null,
        sidebarPageNumber: 0,
        sidebarPagetotal: 0,
        offlinePageNumber: 0,
        offlinePagetotal: 0,
        offlines: [],
        orgId: '',
        childrens: [],
        orgIds: [],
        fromcopygroup: '',
        fromcopyequipment: '',
        tocopygroup: '',
        tocopyequipment: '',
        copyfromto: '',
        menuindex: 0,
        menuindex01: 0,
        menuindex02: 0,
        menuindex03: 0,
    },

    // 初始化页面
    onLoad: function () {
        let _this = this;
        wx.getStorage({
            key: 'menuIds',
            success: function (res) {
                _this.setData({
                    menuindex: parseInt(res.data[res.data.indexOf('9902')]),
                    menuindex01: parseInt(res.data[res.data.indexOf('990201')]),
                    menuindex02: parseInt(res.data[res.data.indexOf('990202')]),
                    menuindex03: parseInt(res.data[res.data.indexOf('990203')])
                })
            }
        })
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
    },
    onShow: function () {
        let _this = this;
        if (app.operate.activeIndex != null) {
            _this.setData({
                activeIndex: app.operate.activeIndex,
            })
        }
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
        this.setData({
            fromId: app.globalData.fromid,
            toId: app.globalData.toid,
        })
    },

    // tab切换以及ui侧滑出
    tabClick: function (e) {
        this.setData({
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
    copygroupPatch: function (e) {
        this.setData({
            indexleft: "translateX(100%)",
            groupMenu: true,
            equipmentMenu: false,
            sidebarZindex: "1",
            grouplistOpacity: "1",
            grouplistTransform: "translateX(0px)",
            copyfromto: e.currentTarget.dataset.copy
        });
    },
    copyequipmentPatch: function (e) {
        this.setData({
            indexleft: "translateX(100%)",
            groupMenu: false,
            equipmentMenu: true,
            sidebarZindex: "1",
            equipmentlistOpacity: "1",
            equipmentlistTransform: "translateX(0px)",
            copyfromto: e.currentTarget.dataset.copy
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
        var _this = this;
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
        if (e.currentTarget.dataset.back != 0) {
            if (_this.data.activeIndex === "0") {
                var orgIds = [];
                orgIds.push(_this.data.orgId);
                for (let i = 0; i < _this.data.childrens.length; i++) {
                    orgIds.push(_this.data.childrens[i].orgId)
                }
                _this.setData({
                    group: _this.data.groupValues,
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
            } else if (_this.data.activeIndex === "1") {
                var orgIds = [];
                orgIds.push(_this.data.orgId);
                for (let i = 0; i < _this.data.childrens.length; i++) {
                    orgIds.push(_this.data.childrens[i].orgId)
                }
                _this.setData({
                    offline: _this.data.groupValues,
                    orgIds: orgIds
                });
            } else if (_this.data.activeIndex === "2") {
                var orgIds = [];
                orgIds.push(_this.data.orgId);
                for (let i = 0; i < _this.data.childrens.length; i++) {
                    orgIds.push(_this.data.childrens[i].orgId)
                }
                if (_this.data.copyfromto === 'from') {
                    _this.setData({
                        fromcopygroup: _this.data.groupValues,
                        orgIds: orgIds
                    });
                } else if (_this.data.copyfromto === 'to') {
                    _this.setData({
                        tocopygroup: _this.data.groupValues,
                        orgIds: orgIds
                    });
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
                        "pageNumber": 0,
                        "pageSize": 60
                    },
                    success: function (res) {
                        if (res.data) {
                            var machines = []
                            for (let i = 0; i < res.data.content.length; i++) {
                                let machineName = '';
                                let machineCode = '';
                                if (res.data.content[i].machineName === null) {
                                    machineName = ''
                                } else {
                                    machineName = res.data.content[i].machineName
                                }
                                if (res.data.content[i].machineCode === null) {
                                    machineCode = ''
                                } else {
                                    machineCode = res.data.content[i].machineCode
                                }
                                machines.push({
                                    machineCode: machineCode,
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
    equipmentBack: function (e) {
        let _this = this
        this.setData({
            indexleft: "translateX(0px)",
            groupMenuZindex: "0",
            grouplistOpacity: "0",
            grouplistTransform: "translateX(100rpx)",
            equipmentlistOpacity: "0",
            equipmentlistTransform: "translateX(100rpx)",
        });
        if (_this.data.activeIndex === "0") {
            _this.setData({
                equipment: _this.data.checkedValues
            })
        } else if (_this.data.activeIndex === "2") {

            if (_this.data.copyfromto === 'from') {
                _this.setData({
                    fromcopyequipment: _this.data.checkedValue,
                    fromId: _this.data.machineCode
                })
            } else if (_this.data.copyfromto === 'to') {
                _this.setData({
                    tocopyequipment: _this.data.checkedValue,
                    toId: _this.data.machineCode
                })
            }
        }
    },

    fillGoods: function (e) {
        let _this = this
        if (_this.data.machineIds.length != 0) {
            wx.request({
                url: app.globalData.apiOpen + '/rpt/fillGoods',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    openId: app.globalData.openid,
                    machineIds: _this.data.machineIds,
                },
                success: function (res) {
                    if (res.data) {
                        _this.setData({
                            needFillGoodsRate: res.data.needFillGoodsRate,
                            noGoodsRate: res.data.noGoodsRate,
                            fillGoods: res.data.fillGoods
                        })
                    }
                }
            })
        }
    },
    offlinemachine: function (e) {
        let _this = this
        if (_this.data.offline !== '') {
            wx.request({
                url: app.globalData.apiOpen + '/machine/all',
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                    openId: app.globalData.openid,
                    "orgIds": _this.data.orgIds,
                    "status": "offline",
                    "pageNumber": 0,
                    "pageSize": 30
                },
                success: function (res) {
                    if (res.data) {
                        var offlines = []
                        for (let i = 0; i < res.data.content.length; i++) {
                            let machineName = '';
                            let machineCode = '';
                            let organizationName = '';
                            let offlineOrOnlineTime = '';
                            if (res.data.content[i].machineName === null) {
                                machineName = ''
                            } else {
                                machineName = res.data.content[i].machineName
                            }
                            if (res.data.content[i].machineCode === null) {
                                machineCode = ''
                            } else {
                                machineCode = res.data.content[i].machineCode
                            }
                            if (res.data.content[i].organizationName === null) {
                                organizationName = ''
                            } else {
                                organizationName = res.data.content[i].organizationName
                            }
                            if (res.data.content[i].offlineOrOnlineTime === null) {
                                offlineOrOnlineTime = ''
                            } else {
                                offlineOrOnlineTime = _this.offlineinit(res.data.content[i].offlineOrOnlineTime)
                            }
                            offlines.push({
                                machineCode: machineCode,
                                machineName: machineName,
                                organizationName: organizationName,
                                offlineOrOnlineTime: offlineOrOnlineTime
                            })
                        }
                        _this.setData({
                            offlines: offlines,
                            offlinePageNumber: 1,
                            offlinePagetotal: res.data.totalPages
                        })
                    }
                }
            })
        }
    },

    offlineinit: function (data) {
        let date = new Date(data)
        let nowdate = new Date()

        var newdate = nowdate.getTime() - date.getTime()  //时间差的毫秒数

        //计算出相差天数
        var days = Math.floor(newdate / (24 * 3600 * 1000))

        //计算出小时数

        var leave1 = newdate % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))


        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        if (days === 0) {
            return (hours + "小时 ")
        } else {
            return (days + "天 " + hours + "小时 ")
        }
        //    return ( " 离线 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    },
    fromIdinput: function (e) {
        this.setData({
            fromId: e.detail.value,
        })
    },
    toIdinput: function (e) {
        this.setData({
            toId: e.detail.value,
        })
    },
    copy: function (e) {
        let _this = this;
        wx.request({
            url: app.globalData.apiOpen + '/machine/copy',
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            data: {
                openId: app.globalData.openid,
                fromId: _this.data.fromId,
                toId: _this.data.toId
            },
            success: function (res) {
                console.log(res.data.status)
                if (res.data.status === 200) {
                    wx.showToast({
                        title: '复制成功',
                        icon: 'success',
                        duration: 2000
                    })
                } else if (res.data.status === 400) {
                    wx.showModal({
                        title: '提示',
                        content: '复制设备失败，货道不一样，请重新选择',
                        success: function (res) {
                            if (res.confirm) {
                                _this.setData({
                                    fromId: null,
                                    toId: null
                                })
                            }
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '找不到对应的机器,请检查机器编码',
                        success: function (res) {
                            if (res.confirm) {
                                _this.setData({
                                    fromId: null,
                                    toId: null
                                })
                            }
                        }
                    })
                }
            }
        })
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
        let _this = this
        if (_this.data.activeIndex === "0") {
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
        } else if (_this.data.activeIndex === "2") {
            /*绑定点击事件，将checkbox样式改变为选中与非选中*/

            //拿到下标值，以在items作遍历指示用
            var index = parseInt(e.currentTarget.dataset.index);
            //原始的icon状态
            var type = this.data.equipmentItems[index].type;
            var equipmentItems = this.data.equipmentItems;
            if (type == 'circle') {
                //未选中时
                for (let a = 0; a < equipmentItems.length; a++) {
                    equipmentItems[a].type = 'circle';
                }
                equipmentItems[index].type = 'success_circle';
            } else {
                equipmentItems[index].type = 'circle';
            }
            // 写回经点击修改后的数组
            this.setData({
                equipmentItems: equipmentItems
            });
            // 遍历拿到已经勾选的值
            var checkedValue = '';
            var machineCode = '';
            for (var i = 0; i < equipmentItems.length; i++) {
                if (equipmentItems[i].type == 'success_circle') {
                    checkedValue = equipmentItems[i].machineName;
                    machineCode = equipmentItems[i].machineCode
                }
            }
            // 写回data，供提交到网络
            this.setData({
                checkedValue: checkedValue,
                machineCode: machineCode
            });
        }
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
    offlineloadMore: function (e) {
        let _this = this

        if (_this.data.activeIndex == 1) {

            if (_this.data.offlinePageNumber > 0 && _this.data.offlinePageNumber < _this.data.offlinePagetotal) {
                if (_this.data.offline !== '') {
                    wx.showToast({
                        title: '加载中',
                        icon: 'loading',
                        duration: 10000
                    })
                    wx.request({
                        url: app.globalData.apiOpen + '/machine/all',
                        header: {
                            'content-type': 'application/json'
                        },
                        method: 'POST',
                        data: {
                            openId: app.globalData.openid,
                            "orgIds": _this.data.orgIds,
                            "status": "offline",
                            "pageNumber": _this.data.offlinePageNumber,
                            "pageSize": 30
                        },
                        success: function (res) {
                            if (res.data) {
                                wx.hideToast();
                                var offlines = _this.data.offlines
                                for (let i = 0; i < res.data.content.length; i++) {
                                    let machineName = '';
                                    let machineCode = '';
                                    let organizationName = '';
                                    let offlineOrOnlineTime = '';
                                    if (res.data.content[i].machineName === null) {
                                        machineName = ''
                                    } else {
                                        machineName = res.data.content[i].machineName
                                    }
                                    if (res.data.content[i].machineCode === null) {
                                        machineCode = ''
                                    } else {
                                        machineCode = res.data.content[i].machineCode
                                    }
                                    if (res.data.content[i].organizationName === null) {
                                        organizationName = ''
                                    } else {
                                        organizationName = res.data.content[i].organizationName
                                    }
                                    if (res.data.content[i].offlineOrOnlineTime === null) {
                                        offlineOrOnlineTime = ''
                                    } else {
                                        offlineOrOnlineTime = _this.offlineinit(res.data.content[i].offlineOrOnlineTime)
                                    }
                                    offlines.push({
                                        machineCode: machineCode,
                                        machineName: machineName,
                                        organizationName: organizationName,
                                        offlineOrOnlineTime: offlineOrOnlineTime
                                    })
                                }
                                _this.setData({
                                    offlines: offlines,
                                    offlinePageNumber: _this.data.offlinePageNumber + 1,
                                    offlinePagetotal: res.data.totalPages
                                })
                            }
                        }
                    })
                }
            }
        }
    },
    serchmachine: function (e) {
        if (e.currentTarget.dataset.serch === 'fromid') {
            wx.navigateTo({
                url: "/pages/serchMachine/serchMachine?serch=" + e.currentTarget.dataset.serch
            });
        } else if (e.currentTarget.dataset.serch === 'toid') {
            wx.navigateTo({
                url: "/pages/serchMachine/serchMachine?serch=" + e.currentTarget.dataset.serch
            });
        }

    }
});