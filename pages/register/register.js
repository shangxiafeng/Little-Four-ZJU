// pages/register/register.js
const app = getApp()
const AV = require('../../libs/av-core-min.js')
const user = AV.User.current()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idCardNumber: '',
    mobilePhoneNumber: '',
    password: '',
    verificationCode: '',
    check:"background-color:#39b54a",
    checktext:"验证码"
  },
  inputName(e) {
    //如果已经在input放了value 那么就不用再加上 this.setData了 
    this.setData({
      name: e.detail.value,
    })
  },
  //身份证号
  inputIdCard(e) {
    this.setData({
      idCardNumber: e.detail.value,
    })
  },
  //手机号
  inputPhoneNumber(e) {

    this.setData({
      mobilePhoneNumber: e.detail.value,
    })
  },
  //密码
  inputPassWord(e) {
    
    this.setData({
      password: e.detail.value,
    })
  },
  //验证码
  inputVerificationCode(e) {
    this.setData({
      verificationCode: e.detail.value,
    })
    console.log(this.data.verificationCode)
  },
  //获取验证码
  getVerificationCode() {

    let that=this;
    that.setData({
       check:"background-color:gray",
       checktext:"已发送"
    })

    

    
    AV.Cloud.requestSmsCode(this.data.mobilePhoneNumber).then(()=>{
        wx.showToast({
          title: '已发送验证码',
          icon: 'success',
        })
    },(error)=>{
      wx.showToast({
        title: '尚未输入验证码',
        icon:none
      })
    })

  },

  confirmRegistration() {
    // 坑数等级*****
    var verificationCode = parseInt(this.data.verificationCode)

    AV.Cloud.verifySmsCode(verificationCode,this.data.mobilePhoneNumber).then(() => {
      app.globalData.mobilePhoneVerified = true
      const {
        name,
        idCardNumber,
        mobilePhoneNumber,
        password,
      } = this.data;

      user.set('name', name)
      user.set('idCardNumber', idCardNumber)
      user.set('mobilePhoneNumber', mobilePhoneNumber)
      user.set('phoneVerified',true)
      user.save()

      wx.showToast({
        title: '注册成功',
        icon: 'success',
      });
      wx.redirectTo({
        url: '../userPage/userPage',
      })
      // // mobilePhoneVerified 将变为 true
    }, (error) => {
      user.set('mobilephone','undefine')
      user.save()
      wx.showToast({
        title: error.message,
        icon: 'none'
      })
      // 验证码不正确
    });

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