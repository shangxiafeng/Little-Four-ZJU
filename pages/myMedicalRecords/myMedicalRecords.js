// pages/myMedicalRecords/myMedicalRecords.js
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
const app = getApp()
 //年  
 var Y =date.getFullYear();
 //月  
 var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
 //日  
 var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    year:Y,   //年
    month:M,   //月
    day:D,     //日
    hospital:"浙大附属第一医院",  //病例中的医院信息
    number:1,   //入院次数
    department:"呼吸内科",  //入院科室
    hospitalNumber:"20200202", //住院号
    name:"王锦源",//患者姓名
    gender:"男",//患者性别
    age:21,//患者年龄
    nativePlace:"杭州市",//患者籍贯
    nation:"汉族",//患者民族
    maritalStatus:"未婚",//患者婚姻状态
    work:"学生",//患者职业
    workPlace:"浙江大学",//患者工作单位
    address:"杭州市西湖区浙江大学紫金港",//患者家庭地址
    admissionDate:"2020-01-01 12:12:12",//患者入院日期
    caseCollectionDate:"2020-01-01 14:12:12",//患者病例采集日期
    caseSpeaker:"Doctor.Hendry",//病理供述人
    chiefComplaint:"服消炎止咳药后症状可缓解",//主诉
    hpi:"患者于近两年反复咳嗽",//现病史
  },

  /**
   * 生命周期函数--监听页面加载
   */
  navBack: function() {
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