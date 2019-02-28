<template>
  <div class="wrapper-information container">
    <div class="text-center">
      <div class="clearfix">
        <img class="title-1" src="../assets/images/title-information-1.png">
        <img class="title-2" src="../assets/images/title-information-2.png">
      </div>
      <div class="card-wrapper">
        <div class="card">
          <img @click="goBank" class="button" src="../assets/images/button-information.png">
        </div>
        <!--<div class="card-bottom"></div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {

      }
    },
    methods: {
      goBank(){
        Tools.countButton(3);
        window.location.href = 'http://www.hzbank.com.cn/mobile/wallet.html';
      }
    },
    mounted(){

    }
  }
</script>
