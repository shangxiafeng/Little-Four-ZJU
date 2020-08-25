// pages/1/1.js
const AV = require('../../libs/av-core-min');
const app = getApp();
var plugin = requirePlugin("chatbot");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userInfo = res.userInfo
                console.log(res.userInfo)
                const userHeader = res.userInfo.avatarUrl
                //用户已经授权过
                wx.login({
                  //获取code
                  success: function (res) {
                    var code = res.code; //返回code

                    wx.request({
                      url: 'https://exp.zjubiomedit.com/expdev/v1.0/util/wx/openid/four?code=' + code,
                      method: 'GET',
                      // data: {},
                      // header: {
                      //   'content-type': 'json'
                      // },
                      success: function (res) {
                        wx.setStorageSync('openId', res.data.result)  //返回openid
                        plugin.init({
                          appid: "BVVKpdZscjtS1WAh2ZNVnIjLe6NCvD",
                          openid: wx.getSystemInfoSync('openId'), //用户的openid，必填项，可通过wx.login()获取code，然后通过后台接口获取openid
                          success: () => {

                          }, //非必填
                          fail: (error) => {  }, //非必填
                          robotHeader: 'data:image/png;base64,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',
                          userHeader: userHeader,

                          textToSpeech: false,
                          background: "rgba(247,251,252,1)",

                        })
                        wx.showToast({
                          title: '✨小四会一直陪伴您',
                          icon: 'none',
                          success: function () {
                            setTimeout(function () {
                              //要延时执行的代码
                              wx.redirectTo({
                                url: '../chat/chat'
                              })
                            }, 2000)
                          }
                        })

                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
      console.log('用户可以授权')
    } else {
      //用户按了拒绝按钮
    }
  },
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