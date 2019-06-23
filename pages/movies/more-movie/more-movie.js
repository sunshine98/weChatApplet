// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: [],
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },
  /**
   * 电影被点击时
   * 触发进入电影详情界面
   */
  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id='+movieId,
    })
  },
  /**
   *下拉刷新数据 
   */
  onPullDownRefresh: function(event) {
    var refreshUrl=this.data.requestUrl+"?start=0&count=20";
    var movies=this.data.movies;
    var isEmpty=this.data.isEmpty;
    movies={};
    isEmpty=true;
    this.setData({
      movies:movies,
      isEmpty:isEmpty,
    });
    this.data.totalCount=0;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  /**
   * 【更多电影页面】下滑数据加载
   */
  onScrollLower: function(event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);

    wx.showLoading({
      title: 'Loading...',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    wx.setNavigationBarTitle({
      title: category,
    });

    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    };
    this.setData({
      requestUrl: dataUrl,
    });
    util.http(dataUrl, this.processDoubanData);

  },
  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
      }
      movies.push(temp);
    }
    var totalMovies = {};

    var tempTotalCount = this.data.totalCount + 20;
    //如果不是第一次加载电影数据
    if (!this.data.isEmpty) {
      var oldMovies = this.data.movies;
      var newMovies = oldMovies.concat(movies);
    } else {
      newMovies = movies;
      this.setData({
        isEmpty: false,
      });
    }

    this.setData({
      movies: newMovies,
      totalCount: tempTotalCount,
    });
    wx.hideLoading();
    wx.stopPullDownRefresh();
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