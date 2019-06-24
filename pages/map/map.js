// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    markers: [{
        id:1,
        latitude: 0,
        longitude: 0,
        iconPath: "/images/icon/redLocation.png",
        width: 40,
        height: 40,
      },
      {
        id:2,
        latitude: 28.6553211449,
        longitude: 115.8293187618,
        iconPath: "/images/icon/greenLocation.png",
        width: 40,
        height: 40,
      }
    ],

  },
  onMarketerTap: function(event) {
    wx.showToast({
      title: event.markerId+"",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        that.setInitLocation(res);
      }
    })
  },

  onOpenLockTap: function(event) {
    var that = this;
    wx.scanCode({
      success: function(res) {
        that.openLockThroughQrcode(res);
      },
    })
  },

  openLockThroughQrcode: function(res) {
    wx.showModal({
      title: '扫码的内容',
      content: res.result,
    })

  },

  /**
   * 设置页面加载时的初始化地址
   */
  setInitLocation: function(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude,
      'markers[0].latitude': res.latitude,
      'markers[0].longitude': res.longitude,
    })
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