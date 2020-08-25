//index.js
//获取应用实例
const app = getApp()
const AV = require('../../libs/av-core-min');
Page({

  data: {
    mySevice: [
      {
        picture: '/images/filedicon_orderfro.png',
        text: "挂号订单"

      },
      {
        picture: "/images/bingli.png",
        text: "我的病历"
      },
      {
        picture: "/images/baogao.png",
        text: "诊断报告"
      },
      {
        picture: "/images/yisheng.png",
        text: "医生信息"
      },

    ],
    myTools1: [
      {
        picture: '/images/guahao.png',
        text: "自动挂号"
      },
      {
        picture: "/images/yuyue.png",
        text: "快速预约"
      },
      {
        picture: "/images/yiyuan.png",
        text: "医院信息"
      },
      {
        picture: "/images/huizhen.png",
        text: "二次会诊"
      },

      {
        picture: "/images/lianxiren.png",
        text: "联系人"
      },
      {
        picture: "/images/jiaonang.png",
        text: "提醒用药"
      },
      {
        picture: "/images/lejiexiangqingicon.png",
        text: "了解小四"
      },
      {
        picture: "/images/changjianwenti.png",
        text: "常见问题"
      },
    ],

    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },
  //事件处理函数
  //进入到挂号页面
  onShow() {
    console.log(app.globalData.hospitalId)
    if (app.globalData.hospitalId != '') {


      var changePicSecR = this.data.myTools1
      changePicSecR[1] = {
        picture: '/images/yuyue2.png',
        text: '快速预约'
      }
      if (app.globalData.flagCount == 0) {
        wx.showToast({
          title: '您已开通快速预约功能',
          icon: 'none',
          duration: 1500,
        })
      }
      app.globalData.flagCount = 1


      this.setData({
        myTools1: changePicSecR
      })
    }
  },
  toNextPage(e) {
    const item = e.currentTarget.dataset.item
    if (item.text == '自动挂号') {
      wx.navigateTo({
        url: '../chooseHospital/chooseHospital',
      })
    }

    if (item.text == '挂号订单') {
      wx.redirectTo({
        url: '../registrationOrders/registrationOrders',
      })
    }
    if (item.text == '我的病历') {
      wx.redirectTo({
        url: '../myMedicalRecords/myMedicalRecords',
      })
    }
    if (item.text == '医生信息') {
      wx.redirectTo({
        url: '../doctorInfo/doctorInfo',
      })
    }
    if (item.text == '诊断报告') {
      wx.redirectTo({
        url: '../diagnosticReport/diagnosticReport',
      })
    }
    if (item.text == '快速预约') {

      //快速预约的数据！！~~~
      if (app.globalData.hospitalId == '') {
        wx.showToast({
          title: '非常抱歉，小四无法帮您快速预约',
          icon: 'none'
        })
      } else {
        wx.navigateTo({
          url: '../registrationDate/registrationDate',
        })
      }

    }


  },
  toChat: function () {
    wx.redirectTo({
      url: '../chat/chat',
    })
  },
  onLoad: function () {

    //自定义导航栏
    this.setData({
      navH: app.globalData.navHeight
    })


    const userAccount = AV.User.current().toJSON()
    app.globalData.userName = userAccount.name
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
