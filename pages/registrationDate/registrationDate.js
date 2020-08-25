// pages/registrationDate/registrationDate.js
var util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datainput: '',
    i: 0,
    xxdate: "2020-08-13",
    date1: '',
    xdate: '',
    dateTitles: [],
    currentIndex: 0, //当前选中标题的下标
    scrollLeft: 0, //tab滚动条的位置
  },

  input(e) {
    console.log(e.detail.value)
    this.setData({
      datainput: e.detail.value
    })
    console.log(this.data.datainput)
  },

  changeTitle(event) {
    let index = event.target.dataset.current; //当前点击标题的index

    let x = this.data.xdate[index].time
    let week = this.data.xdate[index].week

    //把日期加上月和日
    var showDate = x.split("")
    showDate.splice(5,0,'日')
    showDate.splice(2,1,'月')
    showDate.push(" ( "+week+" ) ") 
    if(showDate[0] == 0){
      showDate.splice(0,1,"")
    }
    var xshowDate = showDate.join("")

    this.setData({
      currentIndex: index,
      date1: x,
      xshowDate:xshowDate
    })
  },

  //滑动切换内容

  toPeriod(e){
    wx.navigateTo({
      url: '../registrationPeriod/registrationPeriod',
    })
  },
  changeContent(event) {
    let current = event.detail.current
    var xxtime = util.formatDate(new Date());

    let xdate = util.getDates(7, xxtime)
    let xtime = xdate[current].time
    console.log(xtime, "go")
    var date = '2020' + xtime[0] + xtime[1] + xtime[3] + xtime[4]
    app.globalData.date = date
    console.log(date)
    let singleNavWidth = wx.getSystemInfoSync().windowWidth / 5;
    this.setData({
      currentIndex: current,
      scrollLeft: (current - 2) * singleNavWidth
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
    let xtime = util.formatDate(new Date());
    console.log(xtime, '看这里')

    //默认 前置用户点击今天，先设置date为当天
    var date = '2020' + xtime[5] + xtime[6] + xtime[8] + xtime[9]
    app.globalData.date = date
    console.log(date)
    //得到从今天起后面7天的数据
    let xdate = util.getDates(7, xtime);
    var dateTitles = []

    console.log(xdate)
    for (var i = 0; i < 7; i++) {
      // dateTitle 如果定义在外面将无法运行-sxf 
      var dateTitle = {
        id: '',
        title: ''
      }
      dateTitle.id = i
      dateTitle.title = xdate[i].time
      dateTitles.push(dateTitle)
    }

    let x = xdate[0].time
    let week = xdate[0].week
    var showDate = x.split("")
    showDate.splice(5,0,'日')
    showDate.splice(2,1,'月')
    showDate.push(" ( "+week+" ) ") 
    if(showDate[0] == 0){
      showDate.splice(0,1,"")
    }
    var xshowDate = showDate.join("")
    this.setData({
      dateTitles: dateTitles,
      xdate: xdate,
      xshowDate: xshowDate
    })
  },

})