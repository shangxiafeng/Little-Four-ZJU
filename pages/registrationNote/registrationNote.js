// pages/registrationNote/registrationNote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:"根据《浙江省省级公立医院医疗服务价格改革方案》文件精神，2019年8月1日起部分医疗服务价格有所调整，具体可查询自助机和医院官方网站！如有疑问，可咨询医院工作人员！1.名医号当天未预约不能微信挂号；网上预约B超名医号的患者未开B超单的，当日需去普通门诊挂号开出B超单，再到特需门诊收费处或手机上缴费，然后去护士台安排检查；特殊B超（如产科三维、NT、超声引导穿刺）不在网上预约，仍需凭B超检查单去（庆园春1号楼2楼/下沙院区门诊1楼一站式服务区6、7号窗口）预约"
  },
  toLogin(){
    wx.redirectTo({
      url: '../logIn/logIn',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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