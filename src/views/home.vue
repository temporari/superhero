<template>
  <div class="wrapper-home container">
    <div class="text-center">
      <img class="title" src="../assets/images/title-home.png">
      <div class="clearfix sub-title">
        <div class="pull-left light-wrapper light-left">
          <div class="lighting" :class="{'lighting-end': isLighting}"></div>
        </div>
        <div class="pull-right light-wrapper light-right">
          <div class="lighting" :class="{'lighting-end': isLighting}"></div>
        </div>
        <div class="title-text-wrapper">
          <img class="title-text" src="../assets/images/title-home-sub.png">
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="button-wrapper" @click="$router.replace('upload')">
        <img class="button" src="../assets/images/button-home.png">
        <div v-if="isLoaded" class="gesture-wrapper">
          <img class="gesture" src="../assets/images/icon-target.png">
        </div>
      </div>
      <div><img class="remark" src="../assets/images/home-remark.png"></div>
    </div>
  </div>
</template>
<script>
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        isLighting: false,
        isLoaded: false
      }
    },
    methods: {

    },
    mounted(){
      setTimeout(()=>{
        this.isLighting = true;
      },200);
      setTimeout(()=>{
        this.isLoaded = true;
      })
    }
  }
</script>
