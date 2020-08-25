// pages/contact/contact.js
const app = getApp();
const AV = require('../../libs/av-core-min');
const plugin = requirePlugin("chatbot");
//注释下面这些-sxf
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  that.setData({
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    AV.User.loginWithMiniApp().then(()=>{
      console.log('ZHENGCHANGXIANSHI1')
      const user = AV.User.current()
      var Id = user.id
      wx.setStorageSync('useId', Id)
      app.globalData.patientName = user.toJSON().name
      app.globalData.userId = user.id
  
      if (user.toJSON().phoneVerified != true) {
        user.set('phoneVerified', false)
        user.save()
      }
      this.setData({
        navH: app.globalData.navHeight
      })
    })


    initData(this);
    // var chat = plugin.getChatComponent();
    // chat.setTextToSpeech(true)
    // chat.editFoucs(true)
    // chat.setWelcome("小四祝您复习顺利")
  },
  getQueryCallback: function (e) {

  },
  toUserPageOrRegister() {

    //如果当前用户没有注册手机号，那么就要进入注册界面--sxf
    const user = AV.User.current()
    user.fetch().then((user)=>{
      if (user.toJSON().phoneVerified == false && app.globalData.phoneVerified == false) {
        wx.navigateTo({
          url: '/pages/register/register',
        })
      } else {
        wx.redirectTo({
          url: '/pages/userPage/userPage',
        })
      }

    })


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }

})