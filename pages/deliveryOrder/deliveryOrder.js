// pages/deliveryOrder/deliveryOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        provinces: undefined, // 省份数据数组
        pIndex: 0, //选择的省下标
        cities: undefined, // 城市数据数组
        cIndex: 0, //选择的市下标
        areas: undefined, // 区县数数组
        aIndex: 0, //选择的区下标.
        detailAddress: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        this.setData({
            shipping_address_gps: wx.getStorageSync('shipping_address_gps')
        })
        console.log(this.data.shipping_address_gps + '-------------')
    },
    async readFromWx() {
        let that = this;
        wx.chooseAddress({
            success: function (res) {
                // res = {
                //   cityName: '上海市',
                //   countyName: '嘉定区',
                //   detailInfo: '惠民路123号',
                //   errMsg: 'chooseAddress.ok',
                //   nationalCode: '310114',
                //   postalCode: '201800',
                //   provinceName: '上海市',
                //   telNumber: '13500000000',
                //   userName: '测试',
                // }
                const provinceName = res.provinceName;
                const cityName = res.cityName;
                const diatrictName = res.countyName;
                that.setData({
                    linkMan: res.userName,
                    mobile: res.telNumber,
                    address: res.detailInfo
                });
            }
        })
    },
    chooseLocation() {
        wx.chooseLocation({
            success: (res) => {
                const addressData = this.data.addressData ? this.data.addressData : {}
                addressData.address = res.address + res.name
                addressData.latitude = res.latitude
                addressData.longitude = res.longitude
                this.setData({
                    addressData
                })
                console.log(res)
            },
            fail: (e) => {
                console.error(e)
            },
        })
    },
    async bindSave() {
        const linkMan = this.data.linkMan;
        const address = this.data.address;
        const mobile = this.data.mobile;

        const detailAddress = this.data.detailAddress 
        if (!linkMan) {
            wx.showToast({
                title: '请填写联系人姓名',
                icon: 'none'
            })
            return
        }
        if (!mobile) {
            wx.showToast({
                title: '请填写手机号码',
                icon: 'none'
            })
            return
        }
        if (!detailAddress) {
            wx.showToast({
                title: '请填详细地址',
                icon: 'none'
            })
            return
        }
        const postData = {
            token: wx.getStorageSync('token'),
            linkMan: linkMan,
            address: address,
            mobile: mobile,
            isDefault: 'true',
            detailAddress: detailAddress
        }
        
    
       console.log(postData)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})