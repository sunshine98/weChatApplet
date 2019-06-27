// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiInfo: [],
    latitude:0,
    longitude:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取用户的真实地理位置
    wx.showLoading({
      title: '正在定位中',
    })
    wx.getLocation({
      success: function(res) {
        wx.hideLoading();
        that.getWifiInfo(res);
      },
    })

  },
  /**
   * 获取Wifi信息
   * res:包含用户真实地理位置的对象
   * return Wifi对象数组
   */
  getWifiInfo: function(res) {
    var that=this;
    wx.showLoading({
      title: '正在为您搜索中',
    })
    wx.request({
      url: 'http://zhouxunwang.cn/data/?id=56&key=ALnGq4gyTtX+h5uO9IswR2rIMwTgsJeZ/px36w&lon=' + res.longitude + '&lat=' + res.latitude + '&gtype=3',
      success: function(respond) {
        wx.hideLoading();
        that.setData({
          wifiInfo:respond.data.result.data,
          longitude: res.longitude,
          latitude: res.latitude,
        });
      },
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})