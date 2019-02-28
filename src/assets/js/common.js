const leafletId = 64660;
const leafletIdDownload = 64663 ; //下载app按钮统计
const leafletIdTest = 64662 ; //体验手机银行按钮
const leafletIdPoster = 64661 ; //生成海报按钮
// const leafletIdPoster = 64660 ; //生成海报按钮

// const DOMAIN = 'http://mojow1994.in.3322.org:12904';
const DOMAIN = 'http://actserver.birdjia.com';
const btnPath = 'http://actserver.birdjia.com/leaflet/actRecord'  //按钮点击统计
const pvUvPath = 'http://actserver.birdjia.com/leaflet/addLeafletRecord'  // pv uv 统计
const activityPath = 'http://actserver.birdjia.com/leaflet/activityNum/'  // 参与人数 统计
const leafletName = ' 杭银解密超级英雄';
const initialNum = 5286;

//渠道id
// import "./exif"

export const Tools = {
  getDomain(){
    return DOMAIN;
  },
  getJsonString(type){
    let result = {
      isWeChat: 0,
      // recordType: 3,
      mobDevice: 2,
      toolType: 1,
      cid: this.GetParameter('cid'),
      leafletId: '',//leafletIdDownload  / leafletIdTest / leafletIdPoster
      leafletName: leafletName
    }
    if(type == 0){ //pvuvB N
      result.leafletId = leafletId;
    }else if(type == 1){  //生成海报按钮
      result.leafletId = leafletIdPoster;
      result.recordType = 3;
      result.channelName = result.cid;
    }else if(type == 2){  //体验手机银行按钮
      result.leafletId = leafletIdTest;
      result.recordType = 3;
      result.channelName = result.cid;
    }else if(type == 3){  //下载app按钮统计
      result.leafletId = leafletIdDownload;
      result.recordType = 3;
      result.channelName = result.cid;
    }
    else if(type == 4){  //下载app按钮统计
      result.leafletId = leafletId;
      result.recordType = 3;
      result.channelName = result.cid;
    }

    if (this.isWeChat()) {
      result.isWeChat = 0;  //是微信
    } else {
      result.isWeChat = 1;  //不是微信
    }
    result.toolType = this.browserRedirect(); //0-移动端；1-PC端

    if(device.ios()){
      result.mobDevice = 0  //ios
    }else if(device.android()){
      result.mobDevice = 1  //android
    }else {
      result.mobDevice = 2  //其他
    }
    return result
  },
  countPvUv(){
    $.ajax({
      url: pvUvPath,
      data: this.getJsonString(0),
      dataType: 'json',
      type: 'POST',
      success(data){}
    })
    $.ajax({
      url: btnPath,
      data: this.getJsonString(4),
      dataType: 'json',
      type: 'POST',
      success(data){}
    })
  },
  countButton(type){
    $.ajax({
      url: btnPath,
      data: this.getJsonString(type),
      dataType: 'json',
      type: 'POST',
      success(data){}
    })
  },
  countNum(callback){
    $.ajax({
      url: activityPath + leafletId,
      data: {},
      dataType: 'json',
      type: 'POST',
      success(data){
        let result = data.actNum ? initialNum + parseInt(data.actNum) : initialNum;
        callback(result);
      }
    })
  },
  dataURItoBlob: function(base64Data) {
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64Data.split(',')[1]);
    else {
      byteString = unescape(base64Data.split(',')[1]);
    }
    let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
      type: mimeString
    });
  },
  isWeChat: function() {
    var _uas = navigator.userAgent.toLowerCase();
    if (_uas.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    }
    return false;
  },
  autoPlayAudio: function() {
    wx.config({
      // 配置信息, 即使不正确也能使用 wx.ready
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: []
    });
    wx.ready(function() {
      document.getElementById('music').play();
    });
  },
  audioAutoPlay(id){
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
      audio.play();
    }, false);
  },
  browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return 0;
    } else {
      return 1;
    }
  },
  GetParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  selectFileImage(fileObj,callback,id) {
    var file = fileObj.target.files[0];
    //图片方向角 added by lzk
    var Orientation = null;

    if (file) {
      console.log("正在上传,请稍后...");
      // var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
      // if (!rFilter.test(file.type)) {
      //   //showMyTips("请选择jpeg、png格式的图片", false);
      //   return;
      // }
      // var URL = URL || webkitURL;
      //获取照片方向角属性，用户旋转控制
      EXIF.getData(file, function() {
        // alert(EXIF.pretty(this));
        EXIF.getAllTags(this);
        //alert(EXIF.getTag(this, 'Orientation'));
        Orientation = EXIF.getTag(this, 'Orientation');
        //return;
      });
      setTimeout(()=>{
        if(Orientation && Orientation != 1){
          var oReader = new FileReader();
          oReader.onload = function(e) {
            //var blob = URL.createObjectURL(file);
            //_compress(blob, file, basePath);
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
              var expectWidth = this.naturalWidth;
              var expectHeight = this.naturalHeight;

              // alert(expectWidth+','+expectHeight);
              if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 4000) {
                expectWidth = 4000;
                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
              } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 4000) {
                expectHeight = 4000;
                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
              }
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              canvas.width = expectWidth;
              canvas.height = expectHeight;
              // alert(expectWidth+','+expectHeight);
              ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
              var base64 = null;
              //修复ios
              if (navigator.userAgent.match(/iphone/i)) {
                //alert(expectWidth + ',' + expectHeight);
                //如果方向角不为1，都需要进行旋转 added by lzk
                // alert('旋转处理+角度'+Orientation);
                // alert(Orientation);
                // if(Orientation != "" && Orientation != 1 && Orientation != undefined) {

                switch (Orientation) {
                  case 6://需要顺时针（向左）90度旋转
                    // alert('需要顺时针（向左）90度旋转');
                    Tools.rotateImg(this, 'left', canvas, expectWidth, expectHeight);
                    break;
                  case 8://需要逆时针（向右）90度旋转
                    // alert('需要顺时针（向右）90度旋转');
                    Tools.rotateImg(this, 'right', canvas, expectWidth, expectHeight);
                    break;
                  case 3://需要180度旋转
                    // alert('需要180度旋转');
                    Tools.rotateImg(this, 'rightdouble', canvas, expectWidth, expectHeight);//转两次
                    // Tools.rotateImg(this,'right',canvas);
                    break;
                }
                // }
                /*var mpImg = new MegaPixImage(image);
                mpImg.render(canvas, {
                    maxWidth: 800,
                    maxHeight: 1200,
                    quality: 0.8,
                    orientation: 8
                });*/
                // Tools.rotateImg(this,'left',canvas);
                // alert(canvas.width+','+canvas.height);
              }
              // else if (navigator.userAgent.match(/Android/i)) {// 修复android
              //   var encoder = new JPEGEncoder();
              //   base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
              // }
              else{
                //alert(Orientation);
                // if(Orientation != "" && Orientation != 1){
                //alert('旋转处理');
                switch(Orientation){
                  case 6://需要顺时针（向左）90度旋转
                    // alert('需要顺时针（向左）90度旋转');
                    Tools.rotateImg(this,'left',canvas,expectWidth, expectHeight);
                    break;
                  case 8://需要逆时针（向右）90度旋转
                    // alert('需要顺时针（向右）90度旋转');
                    Tools.rotateImg(this,'right',canvas,expectWidth,expectHeight);
                    break;
                  case 3://需要180度旋转
                    // alert('需要180度旋转');
                    Tools.rotateImg(this,'rightdouble',canvas,expectWidth, expectHeight);//转两次
                    // Tools.rotateImg(this,'right',canvas,expectWidth,expectHeight);
                    break;
                }
                // }

              }
              base64 = canvas.toDataURL('image/jpeg',1);
              callback(base64);
              //uploadImage(base64);
              // $("#myImage").attr("src", base64);
            };
          };
          oReader.readAsDataURL(file);
        }else{
          let reader  = new FileReader();
          reader.addEventListener("load", function () {
//          alert(reader.result);
            callback(reader.result);
          }, false);
          reader.readAsDataURL(file);
        }
      },100)

    }
  },
  rotateImg(img, direction,canvas,expectWidth,expectHeight) {
    //alert(img);
    //最小与最大旋转方向，图片旋转4次后回到原方向
    var min_step = 0;
    var max_step = 3;
    //var img = document.getElementById(pid);
    if (img == null)return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    // var height = img.height;
    var width = expectWidth;
    var height = expectHeight;
    // var width = img.width;
    //var step = img.getAttribute('step');
    var step = 2;
    if (step == null) {
      step = min_step;
    }
    if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
    } else if (direction == 'rightdouble') {
      step = 2;
      // //旋转到原位置，即超过最大值
      // step > max_step && (step = min_step);
      // step++;
      // //旋转到原位置，即超过最大值
      // step > max_step && (step = min_step);
    }else{
      step--;
      step < min_step && (step = max_step);
    }
    //img.setAttribute('step', step);
    /*var canvas = document.getElementById('pic_' + pid);
    if (canvas == null) {
        img.style.display = 'none';
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'pic_' + pid);
        img.parentNode.appendChild(canvas);
    }  */
    //旋转角度以弧度值为参数
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');
    switch (step) {
      case 0:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0,width,height);
        break;
      case 1:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, 0, -height,width,height);
        break;
      case 2:
        canvas.width = width;
        canvas.height = height;
        ctx.rotate(degree);
        ctx.drawImage(img,-width,-height,width,height);
        // ctx.drawImage(img, -width, -height,width,height);
        break;
      case 3:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(degree);
        ctx.drawImage(img, -width, 0,width,height);
        break;
    }
  }
}
