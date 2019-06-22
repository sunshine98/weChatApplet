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
      "content-type": "json"
    },
    success: function(res) {
      callBack(res.data);
    }
  })
}

function convertToCastString(casts){
  var castsjoin="";
  for(var idx in casts){
    castsjoin=castsjoin+casts[idx].name+"/";
  }
  return castsjoin.substring(0,castsjoin.length-2);
}

function convertToCastInfos(casts){
  var castsArray=[];
  for(var idx in casts){
    var cast={
      img: casts[idx].avatars.large ? casts[idx].avatars.large:"",
      name:casts[idx].name,
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
}