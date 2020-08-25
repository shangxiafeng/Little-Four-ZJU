
const app = getApp()
const AV = require("../../libs/av-core-min")
const user = AV.User.current()
// pages/registration2/registration2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    nvabarData: {
      showCapsule: 1, // 是否显示左上角图标   1表示显示    0表示不显示
      iconColor: 'white', // icon颜色 black/white
      borderColor: 'rgba(255, 255, 255, 0.3)' // 边框颜色 格式为 rgba()，透明度为0.3
    },
    // 此页面 页面内容距最顶部的距离



    patient: "00",
    cost: "00",
    hospitalName: "00",
    clinicName: "00",
    orderNumber: "",
    doctor: "000",
    medicalRecordNumber: "00000",//病历号
    clinicTime: "000",//就诊时间
    //lineNumber:"22",//排队号
    // satisfaction:"很满意",//满意度
    // doctorEvaluation:"658498465384",//医生评价
    show: 1,//控制挂号订单是否显示
    patientOrders: '',
    orderQuery: '',
    orderQueryId: '',
  },
  getBarInfo(e) {
    this.setData({ topBarHeight: e.detail.topBarHeight })
  },


  cancelRegistration(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var item = e.currentTarget.dataset.item
    //indexId 是order 在 orders的位置
    var indexId = item.id - 1
    console.log(item, 'item', index)


    const Query = new AV.Query('OrderDate')
    Query.equalTo('id', item.orderId)
    Query.first().then((orders) => {

      var patientOrders = this.data.patientOrders
      var orderQuery = orders.toJSON().order
      var orderQueryId = orders.id

      orderQuery[indexId].value = 1
      patientOrders.splice(index, 1)

      user.set('Order', patientOrders)
      user.save()

      this.setData({
        patientOrders: patientOrders
      })


      const changeOrder = AV.Object.createWithoutData('OrderDate', orderQueryId)
      changeOrder.set('order', orderQuery)
      changeOrder.save().then((changeOrder) => {
        changeOrder.fetch()
        console.log('恭喜你完成了上传')
      })
    })
    var changeDate = item.date.split("",)
    changeDate.splice(8, 0, '日')
    changeDate.splice(6, 0, '月')
    changeDate.splice(4, 0, '年')
    var xchangeDate = changeDate.join("")
    const userToJSON = AV.User.current().toJSON()
    const currentOrder = item
    const time = xchangeDate + ' ' + item.time

    //发送短信提示
    // AV.Cloud.requestSmsCode({
    //   mobilePhoneNumber: userToJSON.mobilePhoneNumber,
    //   template: 'unsetReminder',
    //   sign: 'ZJU小四',
    //   userName: userToJSON.name,
    //   hospitalName: currentOrder.hospitalName,
    //   clinicName: currentOrder.clinicName,
    //   time: time
    // }).then(function () {
    //   // 调用成功
    // }, function (err) {
    //   // 调用失败
    // });

    wx.showToast({
      title: '订单已取消',
      icon: 'success',
      success: function () {
        setTimeout(function () {
          //要延时执行的代码
          wx.redirectTo({
            url: '../userPage/userPage'
          })
        }, 1000)
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  navBack: function() {
    wx.redirectTo({
      url: '../userPage/userPage',
    });//返回上一页      
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

    //一定要多放一个在这里否则第一次加载会错误
       var user = AV.User.current()
      user.fetch().then((user)=>{
        var patientOrders = user.toJSON().Order
        console.log(user.toJSON().Order)
        this.setData({
          patientOrders: patientOrders
        })
    

      })

      // const data = app.globalData
      // this.setData({
      //   orderNumber: data.orderId + data.orderIndex,
      //   patientName: user.toJSON().name,
      //   clinicName: data.clinicName,
      //   hospitalName: data.hospitalName,
      //   hospitalLocation: data.hospitalLocation,
      //   cost: data.cost,
      //   medicalRecordNumber: user.id,
      //   clinicTime: data.date + '  ' + data.period,
      // })


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

