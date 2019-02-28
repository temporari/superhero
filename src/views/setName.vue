<template>
  <div class="wrapper-setName container">
    <div class="text-center">
      <div class="clearfix">
        <img class="title" src="../assets/images/title-setName.png">
      </div>
      <img class="sub-title" src="../assets/images/title-setName-sub.png">
      <div class="img-wrapper">
        <div class="img-limit">
          <img :src="imgPath" :style="imgStyle">
        </div>
      </div>
      <div class="input-wrapper">
        <input v-model="personName" placeholder="请输入TA的名字">
      </div>
      <img @click="goResult()" class="button" src="../assets/images/button-setName.png">
    </div>
    <div v-if="isToast">
      <div class="mui-popup mui-popup-in">
        <div class="mui-popup-inner ">
          <div class="mui-popup-text">{{errorText}}</div>
        </div>
        <div class="mui-popup-buttons">
          <span class="mui-popup-button" @click="isToast = false">知道了</span>
        </div>
      </div>
      <div class="mui-popup-backdrop"></div>
    </div>
    <!--<div :class="{'mui-active':isToast}" class="mui-toast-container">-->
      <!--<div class="mui-toast-message">请输入他的名字</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        imgPath: '',
        imgStyle: {},
        imgInfo: {},
        cuttingInfo: {},
        personName: "",
        isToast: false,
        errorText: '请输入名字'
      }
    },
    methods: {
      goResult(){
        if(!this.personName){
          this.isToast = true;
//          setTimeout(()=>{
//            this.isToast = false;
//          },2000);
          return
        }
        this.$store.state.personName = this.personName;
        this.$router.replace('result');
      }
    },
    mounted(){
      this.imgInfo = this.$store.state.imgInfo;
      this.cuttingInfo = this.$store.state.cuttingInfo;
      if(this.imgInfo.url) {
        this.imgPath = this.imgInfo.url;
        let radio = $(".img-limit").width() / this.cuttingInfo.w;
        this.imgStyle = {
          width: this.imgInfo.width * radio + 'px',
          height: this.imgInfo.height * radio + 'px',
          left: -this.cuttingInfo.x * radio + 'px',
          top: -this.cuttingInfo.y * radio + 'px',
        };
      }
    }
  }
</script>
