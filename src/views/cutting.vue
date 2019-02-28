<template>
  <div class="cutting-wrapper">
    <div class="title-bar">
      <div class="back-btn" @click="$router.replace('/wrapper/upload')"><i class="fa fa-chevron-left"></i></div>
      <div class="title"><strong>移动和缩放</strong></div>
    </div>
    <div class="cutting-container">
      <div class="cutting-inner" :style="wrapperStyle">
        <img id="cuttingImg" :src="imgPath" :style="imgStyle"/>
      </div>
    </div>
    <div class="footer-bar">
      <a class="btn btn-primary btn-sm" @click="complete">完成</a>
    </div>
  </div>
</template>
<script>
  import '../assets/js/plugins/Jcrop/jquery.Jcrop.min'
//  import '../assets/js/jquery-2.1.1'
//  import '../assets/js/cropper.min'
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        imgPath: "",
        imgStyle: {},
        wrapperStyle: {},
        cuttingInfo: {},
        imgInfo: {
          url: '',
          width: '',
          height: '',
        }
      }
    },
    methods: {
      complete(){
        this.$store.state.cuttingInfo = this.cuttingInfo;
        this.imgInfo.url = this.$store.state.imgDataUrl;
        this.$store.state.imgInfo = this.imgInfo;
        Tools.countPvUv();
        this.$router.replace('/wrapper/analysis');
      }
    },
    mounted(){
      let radioWrapper = $('.cutting-inner').width()/$('.cutting-inner').height();
//      this.wrapperStyle = {"line-height": $('.img-wrapper').height()+ 'px'};
      let imgCur = new Image();
      imgCur.src = this.$store.state.imgDataUrl;
      imgCur.onload = ()=>{
        let imgW = imgCur.width;
        let imgH = imgCur.height;
        let radioImg = imgW/imgH;
        if(radioImg >= radioWrapper){
          this.imgStyle = {width: "100%"};
        }else{
          this.imgStyle = {height: "100%"};
        }
        this.imgPath = this.$store.state.imgDataUrl;
        setTimeout(()=>{
          let spacing = $('.cutting-inner').height() - $("#cuttingImg").height();
          if(spacing > 2){
            this.wrapperStyle = {"padding-top": spacing/2 + 'px'};
          }
          this.imgInfo.width = $("#cuttingImg").width();
          this.imgInfo.height = $("#cuttingImg").height();
//          $(document).ready(function(){
//            var $image = $(".cutting-inner> img")
////            $("#cuttingImg").cropper({
////              aspectRatio: 1 / 1,
////              autoCropArea: .9,
////              background: false,
////              minContainerWidth: 310,
////              minContainerHeight: 300,
//////              minCanvasWidth: 200,
//////              minCanvasHeight: 200,
////              zoomable: false
////            });
//
//            $("#cuttingImg").cropper({
//              aspectRatio: 1,
////              preview: ".img-preview",
//              done: function(data) {
//                // Output the result data for cropping image.
//              }
//            });
//          })

          $("#cuttingImg").Jcrop({
            bgOpacity: 0.5,
            allowSelect: false,
            setSelect: [ 50, 50, 300, 300 ],
            keySupport: false,
            aspectRatio: 125/125,
            onSelect: (e)=>{
              console.log(e);
              this.cuttingInfo = e;
            }
          });
        })
      };
    }
  }
</script>
