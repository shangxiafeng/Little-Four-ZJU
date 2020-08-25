
var app = getApp();//这个地方一定一定要加;
const AV = require('../../libs/av-core-min');
Page({
  //清除历史记录
  cleanhistory: function (e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
  },
  toHospitalDetails(e){
    wx.setStorageSync('hospital', e.currentTarget.dataset)
    console.log(e)
    var item = e.currentTarget.dataset.item
    console.log(item)
    var id = item.id
    var department = item.department
    var hospitalName = item.name
    var hospitalLocation = item.location.place

    app.globalData.hospitalId = id
    app.globalData.hospitalName = hospitalName
    app.globalData.hospitalLocation = hospitalLocation

    app.globalData.department = department

    wx.redirectTo({
      url: '../hospitalDetails/hospitalDetails',
    })
  },
  //搜索
  // search: function(e) {

  //   this.setData({flag2:false});
  //   var searchtext = this.data.shoopingtext; //搜索框的值
  //   var sss = true;
  //   if (searchtext != "") {this.setData({flag:true});
  //     //将搜索框的值赋给历史数组
  //     this.data.historyArray.push(searchtext);

  //     //模糊查询 循环查询数组中的title字段
  //     for (var index in this.data.yiyuanlist) {
  //       var num = this.data.yiyuanlist[index].title.indexOf(searchtext);
  //       let temp = 'yiyuanlist[' + index + '].status';
  //       if (num != -1) { //不匹配的不显示
  //         this.setData({
  //           [temp]: 1,
  //         })

  //         sss = false //隐藏未找到提示
  //       }
  //     }
  //     this.setData({
  //       history: false, //隐藏历史记录
  //       noneview: sss, //隐藏未找到提示
  //       shoppinglist: true, //显示商品列表
  //       newArray: this.data.historyArray //给新历史记录数组赋值
  //     })
  //   } else {
  //     this.setData({
  //       noneview: true, //显示未找到提示
  //       shoppinglist: false, //隐藏商品列表
  //       history: false, //隐藏历史记录
  //     })
  //   }
  // },
  data: {

    inputShowed: false,
    inputVal: '',
    hospital: '',
  },
  //前往挂号界面
  toDepartment(e){
    console.log(e)
    var item = e.currentTarget.dataset.item
    console.log(item)
    var id = item.id
    var department = item.department
    var hospitalName = item.name
    var hospitalLocation = item.location.place

    app.globalData.hospitalId = id
    app.globalData.hospitalName = hospitalName
    app.globalData.hospitalLocation = hospitalLocation
    app.globalData.department = department

    wx.navigateTo({
      url: '../chooseDepartment/chooseDepartment',
    })
  },
  navBack: function () {
    wx.navigateBack({
      changed: true
    }); //返回上一页      
  },

  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    const user = AV.User.current()

    const hopspital = new AV.Query('Hospital')
    hopspital.find().then((Arrayhos) => {
      console.log(Arrayhos,'202021314')
      var xhospital = []
      Arrayhos.forEach((hos) => {
        xhospital.push(hos.toJSON())

      })
      this.setData({
        hospital: xhospital
      })
    })

    //SearchBar function()
    // this.setData({
    //   search: this.search.bind(this)
    // })

    //确定是否传输成功
    // const hos = new AV.Query('Hospital')
    // hos.equalTo('id','001')
    // hos.first().then((x)=>{
    //   console.log(x.toJSON())
    // })

    // 传上一个医院的数据
    // var hospital = new AV.Object('Hospital')
    // hospital.set('city','杭州')
    // hospital.set('id','003')
    // hospital.set('name','浙江医院三墩院区')
    // var place = '杭州市西湖区古墩路1229号'
    // var absoluteLocation = {
    //   longitude:120.095148,
    //   latitude:30.334892
    // }
    // var location = {
    //     place:place,
    //     absoluteLocation:absoluteLocation
    // }
    // hospital.set('location',location)
    // hospital.set('introduction','浙江医院隶属于浙江省卫生健康委员会，始建于1954年，建院初期以干部医疗保健及涉外医疗为主，1979年全面对外开放，目前是一所集医疗、教学、科研、预防和保健为一体的三级甲等综合性医院，包含灵隐院区和三墩院区。是省内首家涉外医疗定点医院，省市首批医保定点医院，省老年病防治培训基地，省全科医学教育临床培训基地，省住院医师规范化培训基地，浙江大学及省内高等医学院校的教学医院，国家药物临床试验机构，国家卫健委《心律失常诊疗技术》培训基地，全国心脏康复培训基地，国家卫健委医院管理研究所临床医学工程技术研究基地，国家卫健委骨质疏松症诊疗技术协作基地。')
    // hospital.set('level','三级甲等')
    // var generalMedicineClinic = {
    //   id:'01',
    //   name:'普通内科门诊'
    // }
    // var rheumatismClinic = {
    //   id:'02',
    //   name:'风湿免疫门诊'
    // }
    // var respiratoryClinic = {
    //   id:'03',
    //   name:'呼吸内科门诊'
    // }
    // var  medicineDepartment = {
    //     id:'01',
    //     name:'内科',
    //     clinic:[respiratoryClinic,rheumatismClinic,generalMedicineClinic]
    // }
    // var generalSurgeryClinic = {
    //   id:'01',
    //   name:'普通外科门诊'
    // }
    // var orthopaedicsClinic = {
    //   id:'02',
    //   name:'骨科门诊'
    // }
    // var neurosurgeryClinic = {
    //   id:'03',
    //   name:'神经外科门诊'
    // }
    // var  surgeryDepartment = {
    //   id:'02',
    //   name:'外科',
    //   clinic:[generalSurgeryClinic,orthopaedicsClinic,neurosurgeryClinic]
    // }
    // var tuinaClinic = {
    //   id:'01',
    //   name:'推拿门诊'
    // }
    // var acupunctureClinic = {
    //   id:'02',
    //   name:'针灸门诊'
    // }
    // var chineseMedicineClinic = {
    //   id:'03',
    //   name:'中医内科门诊'
    // }
    // var  chineseDepartment = {
    //   id:'03',
    //   name:'中医科',
    //   clinic:[tuinaClinic,acupunctureClinic,chineseMedicineClinic]
    // }
    // //存数组好还是存成对象好
    // var department =[medicineDepartment,surgeryDepartment,chineseDepartment]
    // hospital.set('department',department)
    // hospital.save().then(()=>{
    //   console.log('医院数据保存成功')
    // })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },

})



