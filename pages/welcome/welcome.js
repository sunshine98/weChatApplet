Page({
  onTap:function(){
    wx.switchTab({
      url: '../posts/posts',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
  onUnload: function() {
    console.log('welcome page is unloded')
  },
  onHide: function() {
    console.log('welcome page is onHide')
  }

})