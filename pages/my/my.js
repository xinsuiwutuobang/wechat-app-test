// pages/my/my.js
const JSONDATA = require('../../data/data.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        tabIndex: 0,
        statusType: [
          {
            status: 9999,
            label: '全部'
          },
          {
            status: 0,
            label: '待付款'
          },
          {
            status: 1,
            label: '待上门'
          },
          {
            status: 2,
            label: '待完成'
          },
          {
            status: 3,
            label: '待评价'
          },
        ],
        status: 9999,
        hasRefund: false,
        badges: [0, 0, 0, 0, 0],
        goodsMap: {}
    },
    statusTap: function(e) {
        const index = e.detail.index
        const status = this.data.statusType[index].status
        this.setData({
          page: 1,
          status
        });
        //this.orderList();
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.orderList()
    },

    orderList(){
      const res = JSONDATA.jsonData.orderList
      if (res.code == 0) {
        this.setData({
          orderList: res.data.orderList,
          goodsMap: res.data.goodsMap
        })
      }
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