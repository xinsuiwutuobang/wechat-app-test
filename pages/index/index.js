const JSONDATA = require('../../data/data.js')
const APP = getApp()

Page({
  data: {
    
  },
  onLoad: function(e){
    wx.showShareMenu({
     withShareTicket: true
    })
    this.initBanners()
    this.goodsDynamic()
    this.categories()
    this.cmsCategories()
    this.miaoshaGoods()
  },
  initBanners(){
    const _data = {}
    //读取轮播图
    const res = JSONDATA.jsonData.bannerData
    if (res.code == 700){
      wx.showModal({
        title: '提示',
        content: '请在后台添加banner 轮播图片，自定义类型填写index',
        showCancel: false
      })  
    } else {
      _data.banners = res.data
    }
    this.setData(_data)
  },
  goodsDynamic(){
    const res = JSONDATA.jsonData.goodsDynamic
    if (res.code == 0) {
      this.setData({
        goodsDynamic: res.data
      })
    }
  },
  categories(){
    const res = JSONDATA.jsonData.category
    let categories = [];
    if (res.code == 0) {
      const _categories = res.data.filter(ele => {
        return ele.level == 1
      })
      categories = categories.concat(_categories)
    }
    this.setData({
      categories: categories,
      curPage: 1
    });
  },
  cmsCategories(){
    const res = JSONDATA.jsonData.cmsCategoryList
    if(res.code == 0){
      const cmsCategories = res.data.filter(ele => {
        return ele.type == 'index'
      })
      this.setData({cmsCategories})
      console.log(cmsCategories)
    }
  },
  miaoshaGoods(){
    const res = JSONDATA.jsonData.goodsList
    if (res.code == 0) {
      res.data.result.forEach(ele => {
        const _now = new Date().getTime()
        if (ele.dateStart) {
          ele.dateStartInt = new Date(ele.dateStart.replace(/-/g, '/')).getTime() - _now
        }
        if (ele.dateEnd) {
          ele.dateEndInt = new Date(ele.dateEnd.replace(/-/g, '/')).getTime() -_now
        }
      })
      this.setData({
        miaoshaGoods: res.data.result
      })
    }
  },
  toOrderTap: function(e) {
    console.log(e);
    //当前元素
    console.log(e.target.id)
    //父级最外层元素
    //const communityId = e.currentTarget.dataset.id
    const communityId = e.target.id
    console.log(communityId)
    wx.navigateTo({
      url: `/pages/order/order?communityId=${communityId}`,
    })
  },
  readConfigVal() {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    this.setData({
      mallName:wx.getStorageSync('mallName')?wx.getStorageSync('mallName'):'',
      show_buy_dynamic: wx.getStorageSync('show_buy_dynamic')
    })
  },
})