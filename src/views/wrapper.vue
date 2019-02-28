<template>
  <div class="wrapper" :class="[bgClass]">
    <div class="header" v-show="$route.name != 'cutting'">
      <img class="logo" src="../assets/images/logo.png" />
      <div class="pull-right" v-show="$store.state.btnMusicShow">
        <span v-if="showLabel" class="user-text">已有<span class="strong">{{actNum}}</span>人加入刷脸测试</span>
        <div id="musicBtn" @click="switchMusic" style="display: inline-block">
          <img v-if="isOpen" class="icon-music" src="../assets/images/icon-music-open.png" />
          <img v-else class="icon-music" src="../assets/images/icon-music-close.png" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        bgClass: 'bg-' + this.$route.name,
        showLabel: true,
        isOpen: true,
        actNum: 5286
      }
    },
    beforeRouteUpdate(to, from, next){
//      this.bgClass = 'bg-' + this.$route.name;
      this.bgClass = 'bg-' + to.name;
      if(to.name == 'home'){
        this.showLabel = true
      }else{
        this.showLabel = false;
      }
      next();
    },
    methods: {
      switchMusic(){
        var x = document.getElementById("music");
        this.isOpen = !this.isOpen;
        if(this.isOpen){
          x.play();
        }else{
          x.pause();
        }
        this.$store.state.musicStart = this.isOpen;
      }
    },
    mounted(){
      const self = this;
      Tools.countNum((res)=>{
        this.actNum = res;
      });

      if(this.$route.name == 'home'){
        this.showLabel = true
      }else{
        this.showLabel = false;
      }
      this.$router.replace('/wrapper/home');
      function audioAutoPlay(id){
        var audio = document.getElementById(id);
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
          audio.play();
        }, false);
        document.addEventListener('YixinJSBridgeReady', function() {
          audio.play();
        }, false);
      }
      audioAutoPlay('music');
    }
  }
</script>
