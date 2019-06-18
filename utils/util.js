function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;

}

/**
 * 获取一串电影数据
 */
function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "content-type": ""
    },
    success: function(res) {
      callBack(res.data);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
}