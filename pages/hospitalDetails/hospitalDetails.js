const app = getApp()
Page({
  data: {
    dizhis: '',
    imgs: '',
    jianjies: '',
    hospital: '',
    longtitude: '',
    latitude: ''
  },
  toDepartment() {
    wx.redirectTo({
      url: '../chooseDepartment/chooseDepartment',
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  navBack: function () {
    wx.navigateBack({
      changed: true
    }); //返回上一页      
  },

  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    const hospital = wx.getStorageSync("hospital").item
    const longitude = hospital.location.absoluteLocation.longitude
    const latitude = hospital.location.absoluteLocation.latitude
    this.setData({

      hospital: hospital,
      longitude: longitude,
      latitude: latitude


    })
    console.log(this.data.hospital.item)

  }
})