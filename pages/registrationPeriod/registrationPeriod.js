// pages/registrationPeriod/registrationPeriod.js
const app = getApp();
var util = require('../../utils/util.js');
const AV = require('../../libs/av-core-min.js');
const order = new AV.Query('OrderDate');
const user = AV.User.current()
/*获取当前日期*/
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//年  
var Y = date.getFullYear();
//月  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日  
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//时
var h = date.getHours();
//分
var m = date.getMinutes();
//秒
var s = date.getSeconds();
Page(
  {
    /**
     * 页面的初始数据
     */
    data: {
      clinicName: '',                       /*门诊种类*/
      hospitalName: '',                        /*就诊院区*/
      cost: '15.00元',                           /*挂号费*/
      date: '',
      userName: '',                                  /*就诊人姓名*/
      doctorName: '',                       /*支付类型*/
      year: Y,   //年
      month: M,    //月
      day: D,      //日
      hour: h,//时
      minute: m,//selectTime
      second: s,//秒
      AllDayOrder: [{
        time: "8:00",
        id: 1,
        value: 1
      },
      {
        time: "8:15",
        id: 2,
        value: 1
      },
      {
        time: "8:30",
        id: 3,
        value: 1
      },
      {
        time: "8:45",
        id: 4,
        value: 1
      },
      {
        time: "9:00",
        id: 5,
        value: 1
      },
      {
        time: "9:15",
        id: 6,
        value: 1
      },
      {
        time: "9:30",
        id: 7,
        value: 1
      },
      {
        time: "9:45",
        id: 8,
        value: 1
      },
      {
        time: "10:00",
        id: 9,
        value: 1
      },
      {
        time: "10:15",
        id: 10,
        value: 1
      },
      {
        time: "10:30",
        id: 11,
        value: 1
      },
      {
        time: "10:45",
        id: 12,
        value: 1
      },
      {
        time: "11:00",
        id: 13,
        value: 1
      },
      {
        time: "11:15",
        id: 14,
        value: 1
      },
      {
        time: "11:30",
        id: 15,
        value: 1
      },
      {
        time: "13:30",
        id: 16,
        value: 1
      },
      {
        time: "13:45",
        id: 17,
        value: 1
      },
      {
        time: "14:00",
        id: 18,
        value: 1
      },
      {
        time: "14:15",
        id: 19,
        value: 1
      },
      {
        time: "14:30",
        id: 20,
        value: 1
      },
      {
        time: "14:45",
        id: 21,
        value: 1
      },
      {
        time: "15:00",
        id: 22,
        value: 1
      },
      {
        time: "15:15",
        id: 23,
        value: 1
      },
      {
        time: "15:30",
        id: 24,
        value: 1
      },
      {
        time: "15:45",
        id: 25,
        value: 1
      },
      {
        time: "16:00",
        id: 26,
        value: 1
      },
      {
        time: "16:15",
        id: 27,
        value: 1
      },
      {
        time: "16:30",
        id: 28,
        value: 1
      }],
      id: 0,
      orderTime: "0:00"
    },
    navBack: function () {
      wx.navigateBack({
        changed: true
      }); //返回上一页      
    },
    onLoad() {
      this.setData({
        navH: app.globalData.navHeight
      })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {

      var data = app.globalData
      let orderId = data.cityId
        + data.hospitalId
        + data.departmentId
        + data.clinicId
        + data.doctorId
        + data.date

      order.equalTo('id', orderId)
      order.first().then((xorder) => {

        //先找一个变量存储由28个（或更多）订单组成的数组
        const AllDayOrder = xorder.toJSON().order

        this.setData({
          AllDayOrder: AllDayOrder
        })
      })
      var data = app.globalData
      var changeDate = app.globalData.date.split("",)

      changeDate.splice(8, 0, '日')
      changeDate.splice(6, 0, '月')
      changeDate.splice(4, 0, '年')
      console.log('输出date', changeDate)
      var xchangeDate = changeDate.join("")
      console.log(xchangeDate)
      this.setData({
        clinicName: data.clinicName,                       /*门诊种类*/
        hospitalName: data.hospitalName,                        /*就诊院区*/
        cost: '15.00元',
        date: xchangeDate,                           /*挂号费*/
        userName: data.userName,                                  /*就诊人姓名*/
        doctorName: data.doctorName,                       /*支付类型*/
      })
      this.setData({
        message4: this.options.name,
      })
    },
    /*微信挂号时间点击处理函数*/
    selectTime: function (event) {

      this.setData({
        currentArrayIndex: event.currentTarget.dataset.tindex,//当前点击数组的下标
        orderTime: event.currentTarget.dataset.time, //当前点击数组的时间
        id: event.currentTarget.dataset.id //当前选择时间的Id
      })
    },
    changetoSuccess(e) {
      console.log(e)
      const data = app.globalData
      let orderId = data.cityId
        + data.hospitalId
        + data.departmentId
        + data.clinicId
        + data.doctorId
        + data.date

      var orderObjectId = ''
      order.equalTo('id', orderId)
      order.first().then((x) => {
        this.setData({
          orderObjectId: x.toJSON().objectId
        })
      })
      const orders = AV.Object.createWithoutData('OrderDate', this.data.orderObjectId)
      orders.fetch().then((orders) => {
        this.setData({
          getOrder: orders.toJSON().order
        })
      })
    },
    /*微信挂号时间选择确定按钮处理函数*/
    change() {
      const data = app.globalData
      let orderId = data.cityId
        + data.hospitalId
        + data.departmentId
        + data.clinicId
        + data.doctorId
        + data.date
      app.globalData.orderId = orderId

      //当前选择的时间段Id

      /*         var x = this.data.AllDayOrder
        const order = new AV.Query('OrderDate')
          var orderObjectId = ''
          order.equalTo('id',orderId)
          order.first().then((x)=>{
            console.log(x.toJSON())
            this.setData({
              getOrder:x.toJSON().order,
              orderObjectId:x.toJSON().objectId
            })
          }) */
      //去现有的数据库数据
      var id = parseInt(this.data.id)
      app.globalData.orderIndex = id
      var currentOrder = this.data.AllDayOrder[id - 1]
      if (currentOrder.value == 1) {
        currentOrder.value = 0

        app.globalData.period = currentOrder.time

        var orderObjectId = this.data.orderObjectId

        //如果使用fetch 就必须要和TOJSON一样第一次前放一个
        const user = AV.User.current()
        user.fetch().then((user) => {
          var addorder = user.toJSON().Order
          currentOrder.orderId = orderId
          currentOrder.orderAllId = orderId + id
          currentOrder.patientName = app.globalData.patientName
          currentOrder.userId = app.globalData.userId
          currentOrder.clinicTime = currentOrder.date + ' | ' + currentOrder.time
          currentOrder.cost = 15
          currentOrder.hospitalLocation = app.globalData.hospitalLocation//这个应该在初始化时提前放进去
          console.log(currentOrder)
          if (addorder == undefined) {
            addorder = []
          }
          addorder.push(currentOrder)
          user.set('Order', addorder)
          user.save()


          const changeOrder = AV.Object.createWithoutData('OrderDate', orderObjectId)

          //g给回刷新后的数据
          var allOrder = this.data.AllDayOrder
          allOrder[id - 1] = currentOrder
          changeOrder.set('order', allOrder)
          this.setData({
            AllDayOrder: allOrder
          })

          changeOrder.save().then((x) => {
            console.log('恭喜你，完成了改变数值，接下来将会打出改变后的数值', x)
          })
          const userToJSON = user.toJSON()
          var time = this.data.date + ' ' + currentOrder.time
          console.log(time)
          console.log(userToJSON)

          //发送短信提示
          // AV.Cloud.requestSmsCode({
          //   mobilePhoneNumber: userToJSON.mobilePhoneNumber,
          //   template: 'orderInfo',
          //   sign: 'ZJU小四',
          //   userName: userToJSON.name,
          //   hospitalName: currentOrder.hospitalName,
          //   clinicName: currentOrder.clinicName,
          //   time: time,
          //   hospitalLocation: currentOrder.hospitalLocation,
          // }).then(function () {
          //   // 调用成功
          // }, function (err) {
          //   // 调用失败
          // });

          wx.showToast({
            title: '完成预定',
            icon: 'success',
            success: function () {
              console.log('haha');
              setTimeout(function () {
                //要延时执行的代码
                wx.reLaunch({
                  url: '../userPage/userPage',
                })
              }, 1000)
            }
          })
        })
      } else {
        wx.showToast({
          title: '小四非常抱歉，这张票已经被预定了',
          icon: 'none',
          duration: 1500,
        })
      }

    }
  })





