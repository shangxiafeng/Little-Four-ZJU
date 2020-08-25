// pages/dentistInfo/dentistInfo.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"Doctor.Hengry",
    gender:"男",
    age:42,
    workLocation:"北京协和医院皮肤科",//工作单位
    phoneNumber:15300000000,
    workingTime:13,//从医时间
    education:"北京医科大学博士学位",
    major:"皮肤信号的诊断与治疗",
    assess:""//评价
  },
/*评价按钮处理函数*/
  evaluate(){
    wx.redirectTo({
      url: '../evaluation/evaluation',
    })
  },
  /*联系医生按钮处理函数*/
  contactDoctor(){
    wx.redirectTo({
      url: '../evaluation/evaluation',
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