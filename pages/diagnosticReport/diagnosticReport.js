// pages/diagnosticReport/diagnosticReport.js
var util=require('../../utils/util.js');
/*获取当前日期*/ 
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
 //年  
 var Y =date.getFullYear();
 //月  
 var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
 //日  
 var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:Y,   //年
    month:M,    //月
    day:D,      //日
    doctor:"华佗",//主治医生
    diagnoseDisease:"XYZ",//诊断病症
    clinicalSymptom:"嗜睡",//临床病症
    treatmentOption:"******",//治疗方案
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