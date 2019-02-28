<template>
  <div class="wrapper-analysis container">
    <div class="text-center" style="position: relative">
      <div class="img-wrapper">
        <div id="uploadImg" class="img-limit">
          <img v-if="imgPath" :src="imgPath" :style="imgStyle">
          <!--<div class="toast-mask" v-if="isToast"><span>{{errorText}}</span></div>-->
        </div>
      </div>
      <div class="line-wrapper">
        <img class="line" :class="{'line-animate':!isToast}" src="../assets/images/analysis-line.png">
        <div class="mask" :class="{'mask-animate':!isToast}"></div>
      </div>
    </div>
    <img v-if="isLoaded" class="brand-left" src="../assets/images/analysis-brand-left.gif">
    <img v-if="isLoaded" class="brand-right" src="../assets/images/analysis-brand-right.gif">
    <div class="brand-center-wrapper">
      <div class="progress-wrapper">
        <img class="progress-line" src="../assets/images/analysis-progress-line.png">
        <img class="progress-text" src="../assets/images/analysis-progress-text.png">
      </div>
    </div>
    <div class="icon-heart-wrapper">
      <div class="icon-heart-text">
        <img class="icon-heart" src="../assets/images/icon-heart.png">
      </div>
    </div>
    <div class="icon-heart-shadow-wrapper">
      <img class="icon-heart-shadow" src="../assets/images/icon-heart-shadow.png">
    </div>
    <div class="footer-text">
      已有<u class="strong">{{actNum}}</u>人加入刷脸测试
    </div>

    <div v-if="isToast">
      <div class="mui-popup mui-popup-in">
        <div class="mui-popup-inner ">
          <div class="mui-popup-text">{{errorText}}</div>
        </div>
        <div class="mui-popup-buttons">
          <span class="mui-popup-button" @click="$router.replace('upload')">知道了</span>
        </div>
      </div>
      <div class="mui-popup-backdrop"></div>
    </div>
    <!--<div :class="{'mui-active':isToast}" class="mui-toast-container">-->
    <!--<div class="mui-toast-message">{{errorText}}</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        imgPath: '',
        imgStyle: {},
        imgInfo: {},
        cuttingInfo: {},
        isLoaded : false,
        isToast: false,
        isSuccess: true,
        isAnimated: false,
        isRes: false,
        actNum: 5286,
        errorText: '说好的上传正面清晰照呢？'
      }
    },
    methods: {

    },
    mounted(){
      const self = this;
      this.imgInfo = this.$store.state.imgInfo;
      this.cuttingInfo = this.$store.state.cuttingInfo;
      if(this.imgInfo.url){
        this.imgPath = this.imgInfo.url;
        let radio = $(".img-limit").width()/this.cuttingInfo.w;
        this.imgStyle = {
          width: this.imgInfo.width*radio + 'px',
          height: this.imgInfo.height*radio + 'px',
          left: -this.cuttingInfo.x*radio + 'px',
          top: -this.cuttingInfo.y*radio + 'px',
        };
      }
      Tools.countNum((res)=>{
        this.actNum = res;
      });

      setTimeout(()=>{
        this.isLoaded = true;
      },100);
      setTimeout(()=>{
//        var canvas = $('#uploadImg').cropper('getCroppedCanvas');
        html2canvas(document.querySelector("#uploadImg")).then(canvas => {
          let imageData = canvas.toDataURL('image/jpeg', 1);
          self.$store.state.imageData = imageData;
          let fd;
          var blob = Tools.dataURItoBlob(imageData);
          fd = new FormData();
          fd.append("multipartFile", blob, 'i.png');
          console.log(blob);
          if(blob.size > 1024*1024){
            self.errorText = '图片太大啦，换张小一点的图片吧';
            self.isSuccess = false;
            return
          }

          $.ajax({
//            url: 'http://actserver.birdjia.com/hccbAct/secretOfSuperStar',
            url: Tools.getDomain() + '/hccbAct/secretOfSuperStar',
            data: fd,
//            data: {multipartFile:fd},
            type: 'POST',
            dataType:'json',
            processData: false, //用来回避jquery对formdata的默认序列化，XMLHttpRequest会对其进行正确处理
            contentType: false, //设为false才会获得正确的conten-Type
//            contentType: 'text/plain;charset=UTF-8',
//            beforeSend: function(request) {
//              request.setRequestHeader("Accept", "text/plain");
//            },
            success: function(res){
              console.log('res');
              self.isRes = true;
              if(res.code == 200){
                self.isSuccess = true;
                self.$store.state.resultData = res.data;
              }else if(res.code == 404){
                self.isSuccess = false;
                self.errorText = '说好的上传正面清晰照呢？'
              }else if(res.code == 500){
                self.isSuccess = false;
                self.errorText = '前方人山人海，请稍后~'
              }

              if(self.isAnimated){
                if(self.isSuccess){
                  self.$router.replace('setName');
                }else{
                  self.isToast = true;
                  setTimeout(()=>{
                    self.$router.replace('upload');
                  },3000);
                }
              }
            }
          });
        });
      });
      setTimeout(()=>{
        self.isAnimated = true;
        console.log('Animated');
        if(self.isRes){
          if(self.isSuccess){
            self.$router.replace('setName');
          }else{
            self.isToast = true;
            setTimeout(()=>{
              self.$router.replace('upload');
            },3000);
          }
        }
      },3000)
    }
  }
</script>
