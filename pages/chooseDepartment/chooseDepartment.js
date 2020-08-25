var app = getApp()
Page({
  cleanhistory: function (e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
  },
  //搜索
  search: function (e) {

    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      this.setData({ flag: !this.data.flag })
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.shoopingarray) {
        var num = this.data.shoopingarray[index].title.indexOf(searchtext);
        let temp = 'shoopingarray[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    flag: true,

    department: [],
    curNav: 1,
    curIndex: 0
  },
  toDate(e) {
    var clinic = e.currentTarget.dataset.clinic
    var clinicId = clinic.id
    app.globalData.clinicId = clinicId
    app.globalData.clinicName = clinic.name

    wx.navigateTo({
      url: '../registrationDate/registrationDate',
    })

  },
  //事件处理函数  
  switchRightTab: function (e) {
    var item = e.currentTarget.dataset.item
    app.globalData.departmentId = item.id
    app.globalData.departmentName = item.name 


    // 获取item项的id，和数组的下标值  
    let id = item.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  navBack: function () {
    wx.navigateBack({
      changed: true
    }); //返回上一页      
  },

  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })

    this.setData({
      department: app.globalData.department
    })
    app.globalData.departmentName = this.data.department[0].name
    console.log(this.data.department)
  },
  onShow: function () {
    this.setData({
      flag: false
    })
  },

})