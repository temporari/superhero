<template>
  <div class="wrapper-upload container">
    <div class="text-center">
      <img class="title" src="../assets/images/title-upload.png">
      <div class="sub-title-wrapper clearfix">
        <img class="sub-title" src="../assets/images/title-upload-sub.png">
      </div>
      <div>
        <div class="img-wrapper">
          <img @click="startUpload" class="icon-upload-btn" src="../assets/images/+.png">
        </div>
      </div>
    </div>
    <div class="hidden">
      <!--<form id="myForm" action="http://actserver.birdjia.com/hccbAct/secretOfSuperStar" method="POST" enctype="multipart/form-data">-->
        <input type="file" id="uploadItem" @change="selectFile">
        <img id="imgCash" :src="imgPath">
      <!--</form>-->
    </div>
    <div class="icon-heart-wrapper">
      <div class="icon-heart-text">
        <img class="icon-heart" src="../assets/images/icon-heart.png">
      </div>
    </div>
    <div class="icon-heart-shadow-wrapper">
      <img class="icon-heart-shadow" src="../assets/images/icon-heart-shadow.png">
    </div>
    <img class="brand-left" src="../assets/images/upload-brand-left.png">
    <img class="brand-right" src="../assets/images/upload-brand-right.png">
    <img class="brand-center" src="../assets/images/upload-brand-center.png">
  </div>
</template>
<script>
  import '../assets/js/exif'
//  import '../assets/js/canvasResize'
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        imgPath: '',
        imgStyle: {},
        imgInfo: {},
        cuttingInfo: {}
      }
    },
    methods: {
      startUpload(){
        $("#uploadItem").trigger("click");
      },
      selectFile(file){
        const self = this;
//        if (navigator.userAgent.match(/iphone/i)) {
          Tools.selectFileImage(file,(result)=>{
//            alert(result);
            self.$store.state.imgDataUrl = result;
            self.$router.replace({path: 'cutting'});
          });
//        }else{
//          let reader  = new FileReader();
//          reader.addEventListener("load", function () {
//            self.imgPath = reader.result;
////          alert(reader.result);
//          self.$store.state.imgDataUrl = reader.result;
//          self.$router.replace({path: 'cutting'})
//          }, false);
//          reader.readAsDataURL(file.target.files[0]);
//        }
      }
    },
    mounted(){
      this.imgInfo = this.$store.state.imgInfo;
      this.cuttingInfo = this.$store.state.cuttingInfo;
      if(this.imgInfo.url){
        this.imgPath = this.imgInfo.url;
        let radio = $(".upload-btn").width()/this.cuttingInfo.w;
        this.imgStyle = {
          width: this.imgInfo.width*radio + 'px',
          height: this.imgInfo.height*radio + 'px',
          left: -this.cuttingInfo.x*radio + 'px',
          top: -this.cuttingInfo.y*radio + 'px',
        }
      }
    }
  }
</script>
