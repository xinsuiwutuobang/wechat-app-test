// pages/orderTime/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        calendar: [],
        width: 0,
        currentIndex: 0,
        currentTime: 0,
        currentStatus: 0,
        disabledStatus: true,
        timeArr: [{
                "time": "8:30 ",
                "type": 1,
                "status": 1,
                "id": 1,
                "disabledStatus": false
            },
            {
                "time": "9:00 ",
                "type": 1,
                "status": 2,
                "id": 2,
                "disabledStatus": true
            },
            {
                "time": "9:30 ",
                "type": 1,
                "status": 3,
                "id": 3,
                "disabledStatus": true
            },
            {
                "time": "13:00 ",
                "type": 2,
                "status": 1,
                "id": 4,
            },
            {
                "time": "13:30 ",
                "type": 2,
                "status": 2,
                "id": 5,
            },
            {
                "time": "14:00 ",
                "type": 2,
                "status": 3,
                "id": 6,
            },
            {
                "time": "18:00 ",
                "type": 3,
                "status": 1,
                "id": 7,
            },
            {
                "time": "18:30 ",
                "type": 3,
                "status": 2,
                "id": 8,
            },
            {
                "time": "19:00 ",
                "type": 3,
                "status": 3,
                "id": 9,
            }

        ],
        amOrder: [],
        apOrder: [],
        nightOrder: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        function getThisMonthDays(year, month) {
            return new Date(year, month, 0).getDate();
        }
        // 计算每月第一天是星期几
        function getFirstDayOfWeek(year, month) {
            return new Date(Date.UTC(year, month - 1, 1)).getDay();
        }
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const cur_date = date.getDate();
        const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        //利用构造函数创建对象
        function calendar(date, week) {
            this.date = cur_year + '-' + cur_month + '-' + date;
            if (date == cur_date) {
                this.week = "今天";
            } else if (date == cur_date + 1) {
                this.week = "明天";
            } else {
                this.week = '星期' + week;
            }
        }
        //当前月份的天数
        var monthLength = getThisMonthDays(cur_year, cur_month)
        //当前月份的第一天是星期几
        var week = getFirstDayOfWeek(cur_year, cur_month)
        var x = week;
        for (var i = 1; i <= monthLength; i++) {
            //当循环完一周后，初始化再次循环
            if (x > 6) {
                x = 0;
            }
            //利用构造函数创建对象
            that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
            x++;
        }
        //限制要渲染的日历数据天数为7天以内（用户体验）
        var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
        that.setData({
            calendar: flag
        })
        //设置scroll-view的子容器的宽度
        that.setData({
            width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
        })
        this.buildOrderTime()
    },
    alarmOrder: function (currentStatus) {
        var msg = ""

        if (currentStatus == 1) {
            return
        } else if (currentStatus == 0) {
            msg = "请选择预约时间点"
        } else if (currentStatus == 2) {
            msg = "该时间点已预约，请重新选择"
        } else if (currentStatus == 3) {
            msg = "该时间点休息，请重新选择"
        }

        if (msg != "") {
            wx.showToast({
                title: msg,
                icon: 'none'
            })
        }
        return msg;
    },
    buildOrderTime: function () {
        var amOrder = [];
        var pmOrder = [];
        var nightOrder = []
        this.data.timeArr.forEach(element => {
            if (element.type == 1) {
                amOrder.push(element)
            }
            if (element.type == 2) {
                pmOrder.push(element)
            }
            if (element.type == 3) {
                nightOrder.push(element)
            }
        });
        this.setData({
            "amOrder": amOrder,
            "pmOrder": pmOrder,
            "nightOrder": nightOrder
        })
    },
    select: function (event) {
        //为上半部分的点击事件
        this.setData({
            currentIndex: event.currentTarget.dataset.index,
            currentTime: 0
        })
        console.log(event.currentTarget.dataset.date)
    },
    selectTime: function (event) {
        //为下半部分的点击事件
        var status = event.currentTarget.dataset.status
        this.alarmOrder(event.currentTarget.dataset.status)
        this.setData({
            currentTime: event.currentTarget.dataset.tindex,
            currentStatus: event.currentTarget.dataset.status
        })
        console.log(event.currentTarget.dataset.time)
    },
    buildOrder: function () {
        var msg = this.alarmOrder(this.data.currentStatus)
        wx.navigateTo({
            url: "/pages/deliveryOrder/deliveryOrder"
        })
    }
})