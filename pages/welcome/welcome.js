Page({

  onTap: function() {
    wx.switchTab({
      url: '../posts/posts',
    })

  },
  onUnload: function() {
    console.log('welcome page is unloded')
  },
  onHide: function() {
    console.log('welcome page is onHide')
  }

})