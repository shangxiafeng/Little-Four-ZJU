//index.js
//获取应用实例
const app = getApp();
const Test1 = require('../../model/todo');
const AV = require('../../libs/av-core-min');
const getDataForRender = test1 => ({
  userName: test1.get('userName'),
  userPassword: test1.get('userPassword'),
  userId: test1.get('userId')
})
const getcity = city => ({
  name: city.get('name'),
  country: city.get('country'),
  id: city.get('id')
})

Page({


  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    textx:1,
    space:' ',
    //用来存储医院数据
    hospitalData:'',
    //用来上传数据计数
    countx:1,
    order: '',
    c: '',
    x: "",
    userName: '',
    userPassword: '',
    userId: '',
    test1: [],
    todos: [],
    video: {
      x1: '39:09',
      x2: '39:56'
    },
    changename: '',
    phoneNumber: '',
    verificationCade: '',
    name: '',
    password: '',
  },

  upd(e) {
    this.setData({
      changename: e.detail.value
    })
    // console.log(this.data.changename)
  },

  changename() {
    var xf = this.data.changename
    //更改数据-
    const name = new AV.Object.createWithoutData('Test1', '5f34dbba904a2900063cbe38')
    name.set('userName', xf);
    name.save().then(test1 => {
      this.setData({
        test1: [test1, ... this.data.test1]
      })
    })
    //更新数据
    new AV.Query('Test1').find().then(test1 => this.setData({
      test1: test1.map(getDataForRender)
    })).catch(console.error)
  },
  pt() {
    console.log(this.data.test1)
  },
  addname(e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  addpassword(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  login() {
    //注册界面
    // const user = new AV.User()
    // user.setUsername(this.data.name)
    // user.setPassword(this.data.password)
    // user.signUp().then((user) => {
    //   // 注册成功
    //   console.log(`注册成功。objectId：${user.id}`);
    // }, (error) => {
    //   // 注册失败（通常是因为用户名已被使用）
    // });

    /*     //通过第三方平台登录
          const thirdPartyData = {
          // 必须
          openid: app.globalData.openid,
          access_token: app.globalData.accessToken,
          expires_in: 7200,
        };
        console.log(app.globalData)
        console.log(thirdPartyData.access_token)
        AV.User.loginWithAuthData(thirdPartyData, 'weixin').then((user) => {
          // 登录成功
          console.log("w娃娃")
        }, (error) => {
          // 登录失败
        }); */
    // AV.User.logIn(this.data.name, this.data.password).then((user) => {
    //   console.log(`登录成功。objectId：${user.id}`)
    // })
  },
  updatePhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    console.log(this.data.phoneNumber)
  },
  updateVerificationCode(e) {
    this.setData({
      verificationCade: e.detail.value
    })
    console.log(this.data.verificationCade)
  },

  sendreg() {
    //手机自动注册界面

    var phoneNumber = this.data.phoneNumber
    AV.Cloud.requestSmsCode(phoneNumber)//18443649176
  },

  //注册 
  reg() {
    var verificationCode = this.data.verificationCade
    var phoneNumber = this.data.phoneNumber

    // 手机注册登录
    // AV.User.signUpOrlogInWithMobilePhone(phoneNumber, verificationCode).then((user) => {
    //   // 注册成功
    //   console.log(`注册成功。objectId：${user.id}`);
    // }, (error) => {
    //   // 验证码不正确
    //   console.log('注册失败')
    // });


  },

  mytest() {
    const that = this;
    const cruser = AV.User.current()
    cruser.set('logPlatform', 'wechat')
    cruser.save()
    // var orderId = ''
    // const order = new AV.Query('Order')
    // const test2 = new AV.Object('Test2')
    // const user = AV.User.current()
    // //单独寻找某个特定的id
    // order.equalTo('id', 'hz001020030004202008191')
    // order.first().then((axorder)=>{
    //   {
    //     // test2.set('Order',axorder)
    //     console.log(axorder.id)
    //     orderId = axorder.id
    //     // user.set('Order',axorder)
    //     // user.save()
    //   }
    // })
    // const axxorder = new AV.Object.createWithoutData('Order',orderId)
    // // user.set('Order',axxorder)
    // user.set('Order',[axxorder,])
    // user.save()


    // //注册一个用户
    // const user = new AV.User();

    // // 等同于 user.set('username', 'Tom')
    // user.setUsername('shanxiafeng');
    // user.setPassword('QWEqwe123123');

    // // // 可选
    // // user.setEmail('3189901019@zju.edu.cn');
    // // user.setMobilePhoneNumber('+8615306583833');

    // // // 设置其他属性的方法跟 AV.Object 一样
    // // user.set('gender', 'secret');
    // user.signUp().then((user) => {
    //   // 注册成功
    //   console.log(`注册成功。objectId：${user.id}`);
    // }, (error) => {
    //   // 注册失败（通常是因为用户名已被使用）
    // });

    //登录界面
    // AV.User.logIn('shanxiafeng','QWEqwe123123').then((user)=>{
    //   console.log('恭喜小山登录成功')
    // },(error=>{
    //   //失败
    // }))



    // //手机验证码配合登录
    // AV.User.logInWithMobilePhoneSmsCode('+8615306583833', '872269').then((user) => {
    //   // 登录成功
    //   console.log("恭喜山下风，登录成功")
    // }, (error) => { 
    //   //登录失败（可能是密码错误）
    // });

    var c = ''
    var h = ''
    var d = ''

    // var hospitalid = this.data.hospitalid
    // //最快速度创建数据
    // const Hangzhou = new AV.Object('City')
    // Hangzhou.set('name', 'Hangzhou');
    // Hangzhou.set('id', 'hz');
    // Hangzhou.set('country', 'China')
    // const hospital = new AV.Object('Hospital')
    // hospital.set('id', '001')
    // hospital.set('name', '浙江省中医院')
    // hospital.set('city', Hangzhou)
    // const department = new AV.Object('Department')
    // department.set('id', '02')
    // department.set('name', 'internalMedicine')
    // department.set('hospital', hospital)
    // department.save()

    // //读取数据库City的全部信息
    // new AV.Query('City').find().then(city =>that.setData({c:city.map(getcity)}) )
    // console.log(this.data.c)

    // var disease = new AV.Object('Disease')
    // disease.set('id','003')
    // disease.set('name','diabetes')
    // department.set('disease',disease)
    // department.save()

    // const department = AV.Object.createWithoutData('Department','5f364d04dadca60008382cbe')
    // var doctor = new AV.Object('Doctor')
    // doctor.set('id','0004')
    // doctor.set('name','李兰')
    // doctor.set('department',department)
    // doctor.save()

    // const doctor = AV.Object.createWithoutData('Doctor', '5f36539e904a2900063f6677')



    // // 删除满足条件的对象 
    // var xh = 0
    //   console.log('启动删除数据20200820')
    //   const xo = new AV.Query('Order')
    //   xo.startsWith('id', 'hz00102003000520200820')
    //   console.log(xo)
    //   xo.find().then((xorders) => {
    //       xorders.forEach((xorder) => {
    //         console.log('这里是xh',xh)
    //         xh++
    //         var x = xorder.toJSON()
    //         console.log(x)
    //         const x1 = new AV.Object.createWithoutData('Order',x.objectId)
    //         x1.destroy()
    //       })
    //     })


    // const order = new AV.Query('Order')


    // //单独寻找某个特定的id
    // order.equalTo('id','hz001020030004202008191')
    // order.find().then((orders)=>{
    //   orders.forEach(order=>{
    //     console.log(order.toJSON())
    //   })
    // })

    // //寻找 属性id 以 ‘hz00102003000420200819’ 开头的 数据
    // var x = 'hz'
    // var y = '001'
    // var z = '02'
    // order.startsWith('id', x + y + z + '003000420200819')
    // //找到数组并且输出
    // order.find().then((orders) => {
    //   var count = 0
    //   //第一次学习使用forEach进行批量操作
    //   orders.forEach((order) => {
    //     console.log(xxx)
    //     //increment 可以进行直接的加减法
    //     //set 是直接设置
    //     order.set('margin', 1)
    //     //console.log(order.toJSON())
    //     //计算 margin的总数
    //     if (order.toJSON().margin = 1) { count++ }
    //     // console.log(count)
    //   })
    //   AV.Object.saveAll(orders)
    //   //toJSON 可以把格式变成我们想要的样子

    // })

    //记得读取数据需要时间

    // order.set('id','hz00102003000420200819'+'30')
    // order.set('datetime','2020年8月19日')
    // order.set('doctor',doctor)
    // order.save()
    // .then(function(order){console.log(order.id)})
  },
  onReady() {
    console.log(AV.User.current())
    // console.log("ready!!~")
    new AV.Query('Test1').find().then(test1 => this.setData({
      test1: test1.map(getDataForRender)
    })).catch(console.error)

  },
  printx: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      x: value
    });
  },
  addName: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userName: value
    });
  },
  addPassword: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userPassword: value
    });
  },
  addId: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userId: value
    });
  },
  addTest() {

    const test1 = new Test1({
      userName: this.data.userName,
      userPassword: this.data.userPassword,
      // userPassword:'4'+this.data.userPassword, 通过这样加
      userId: this.data.userId
    });
    // 非常重要 用来读取信息
    const acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setPublicWriteAccess(false)
    acl.setReadAccess(AV.User.current(), true)
    acl.setWriteAccess(AV.User.current(), true)
    test1.setACL(acl)
    test1.save().then(test1 => {
      this.setData({
        test1: [test1, ... this.data.test1],
        userName: '',
        userPassword: '',
        userId: ''
      })
    })
    new AV.Query('Test1').find().then(test1 => this.setData({
      test1: test1.map(getDataForRender)
    })).catch(console.error)

  },
  onLoad: function () {
    var x = 88+67
    console.log('x=',x)
    // 授权成功
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              console.log('111')
            }
          })
        }
      }
    })

    //从LeanCloud读取所有医院的数据保存到当前的hospitalData
    var hospital = []
    const hospitalQueryS = new AV.Query('Hospital')
    hospitalQueryS.find().then((hospitalQuery) => {
      hospitalQuery.forEach(x => {
        var y = x.toJSON()
        hospital.push(y)
      })
      console.log(hospital)
    })
    this.setData({
      hospitalData:hospital
    })
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

addHos(){
  var hospital = this.data.hospitalData
  var doctorId = '001'

  //保存日期的数据
  var date = []
  for (var i=24;i<=31;i++){
    date.push('202008'+i)
  }
  console.log(date)
  // for (var i=9;i<13;i++){
  //   //如果月份为2，4，6，9，11，则天数只有30天
  //   var day = 31
  //   if(i ==2||i == 4||i == 6||i == 9||i == 11){
  //     day = 30
  //   }

  //   var  x = i  
  //    if (i<10){
  //      x = '0'+ i 
  //    }
  //    for (var j=1;j<=day;j++){
  //      var y = j
  //      if(j<10){
  //        y = '0'+j
  //      }
  //      date.push('2020'+x+y)
  //      console.log(date)
  //    }
  // }
  var  orders=[{ 
    time: "8:00",
    id:1,
    value:1
   },
   { 
    time: "8:15",
    id:2,
    value:1
   },
   { 
    time: "8:30",
    id:3,
    value:1
   },
   { 
    time: "8:45",
    id:4,
    value:1
   },
   { 
    time: "9:00",
    id:5,
    value:1
   },
   { 
    time: "9:15",
    id:6,
    value:1
   },
   { 
    time: "9:30",
    id:7,
    value:1
   },
   { 
    time: "9:45",
    id:8,
    value:1
   },
   { 
    time: "10:00",
    id:9,
    value:1
   },
   { 
    time: "10:15",
    id:10,
    value:1
   },
   { 
    time: "10:30",
    id:11,
    value:1
   },
   { 
    time: "10:45",
    id:12,
    value:1
   },
   { 
    time: "11:00",
    id:13,
    value:1
   },
   { 
    time: "11:15",
    id:14,
    value:1
   },
   { 
    time: "11:30",
    id:15,
    value:1
   },
   { 
    time: "13:30",
    id:16,
    value:1
   },
   { 
    time: "13:45",
    id:17,
    value:1
   },
   { 
    time: "14:00",
    id:18,
    value:1
   },
   { 
    time: "14:15",
    id:19,
    value:1
   },
  { 
    time: "14:30",
    id:20,
    value:1
   },
  { 
    time: "14:45",
    id:21,
    value:1
   },
   { 
    time: "15:00",
    id:22,
    value:1
   },
   { 
    time: "15:15",
    id:23,
    value:1
   },
   { 
    time: "15:30",
    id:24,
    value:1
   },
   { 
    time: "15:45",
    id:25,
    value:1
   },
  { 
    time: "16:00",
    id:26,
    value:1
   },
   { 
    time: "16:15",
    id:27,
    value:1
   },
   { 
    time: "16:30",
    id:28,
    value:1
   }]
  var countOrder = 1
  hospital.forEach((hos)=>{
    hos.department.forEach((dep)=>{
      dep.clinic.forEach((cli)=>{
        date.forEach((dat)=>{
          const cloudOrder = new AV.Object('OrderDate')
          var id= 'hz'+hos.id+dep.id+cli.id+doctorId+dat
          orders.forEach((order)=>{
            order.hospitalName = hos.name
            order.clinicName = cli.name
            order.departmentName = dep.name
            order.date = dat
          })
          console.log(orders)
          countOrder++
          cloudOrder.set('order',orders)
          cloudOrder.set('id',id)
          cloudOrder.save().then(()=>{
            console.log('上传OrderDate数据成功！！！！！！！')
          })
        })
      })
    })
  })
  // console.log(orders,'kanorders')

},
  //一次性上传数据 OrderDate=>[{id='hz-001-02-03-004-20200810-1~28',order=[30]：{hospitalname,clinicname,departmentname,date}}]
 addOrderData() {
    
   
   
  },

  testDate(){
    const orders = new AV.Query('OrderDate')
    orders.equalTo('id','hz001010100120200817')
    orders.first().then((xorder)=>{
      var getOrder = xorder.toJSON()
      console.log(getOrder)
    })
  }
})
//下面两个函数用于简化 获取数据库
// const isPlainObject = target =>
//   target &&
//   target.toString() == '[object Object]' &&
//   Object.getPrototypeOf(target) == Object.prototype;
// const _jsonify = target => {
//   if (target && typeof target.toJSON === 'function') return target.toJSON();
//   if (Array.isArray(target)) return target.map(_jsonify);
//   return target;
// };

// const jsonify = target =>
//   isPlainObject(target)
//     ? Object.keys(target).reduce(
//       (result, key) => ({
//         ...result,
//         [key]: _jsonify(target[key])
//       }),
//       {}
//     )
//     : _jsonify(target);