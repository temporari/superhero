<template>
  <div class="wrapper-result container" style="padding-top: 0">
    <div id="result" :class="{'result-bg':isShowCode}">
        <!--:class="{'result-bg':isShowCode}"-->
        <div class="header" style="position: relative;z-index: 99">
        <img class="logo" src="../assets/images/logo.png" />
        </div>
        <div class="card-container">
          <div class="card-top clearfix">
            <div class="img-wrapper pull-left">
              <div class="img-limit">
                <!--<img v-if="imgPath" :src="imgPath" :style="imgStyle">-->
                <img :src="$store.state.imageData" style="width: 100%">
              </div>
            </div>
            <div class="info">
              <div class="user-name">{{personName}}</div>
              <div class="desc">{{personDesc}}</div>
            </div>
          </div>
          <!--<img class="dash" src="../assets/images/result-card-dash.png">-->
          <div>
            <div class="title">{{personName}}的英雄属性分布图</div>
          </div>
          <div id="pie"></div>
        </div>
        <div class="footer">
          <div class="remark">杭州银行手机银行，支持每一个温暖的超级英雄，欢迎来手机银行体验生活缴费，优选理财，无卡取款！感受智能金融！</div>
        </div>
        <div class="qr-code-wrapper" v-show="isShowCode">
        <img class="qr-code-text" src="../assets/images/result-qr-code-text.png">
        <img class="qr-code" src="../assets/images/result-qr-code.png">
        </div>
    </div>
    <div class="btns" v-show="!isShowCode">
      <img @click="showResult" class="button-left" src="../assets/images/button-result-left.png">
      <img @click="goInfo" class="button-right" src="../assets/images/button-result-right.png">
    </div>
    <div class="result-download" v-show="isShowResult">
      <div class="full-mask" @click="isShowResult = false"></div>
      <div class="result-card">
        <img :src="resultPath">
      </div>
      <img v-if="!isShowCode" @click="isShowResult = false" class="footer-text" src="../assets/images/result-footer-text.png"/>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts';
  import {Tools} from '../assets/js/common';
  export default {
    data(){
      return {
        imgPath: '',
        imgStyle: {},
        imgInfo: {},
        cuttingInfo: {},
        personName: "",
        resultPath: '',
        isShowCode: false,
        isShowResult: false,
        personDesc: ""
      }
    },
    methods: {
      showResult(){
        Tools.countButton(1);
        const self = this;
        self.isShowCode = true;
        self.isShowResult = true;
        setTimeout(()=>{
          html2canvas(document.querySelector("#result"),{imageTimeout: 0}).then(canvas => {
            console.log('图片生成完毕，执行回调');
//            console.log(canvas);
            let imagePath = canvas.toDataURL('image/jpeg', 1 );
            console.log(imagePath);
            self.resultPath = imagePath;
//            let expectWidth = canvas.width,
//              expectHeight = canvas.height,
//              canvasLimit = 800;
//            if (canvas.width > canvas.height && canvas.width > canvasLimit) {
//              expectWidth = canvasLimit;
//              expectHeight = canvas.width * canvas.height / canvas.width;
//            } else if (canvas.height > canvas.width && canvas.height > canvasLimit) {
//              expectHeight = canvasLimit;
//              expectWidth = expectHeight * canvas.width / canvas.height;
//            }
//
//
//
//            let imgDOM = Canvas2Image.convertToImage(canvas, expectWidth, expectHeight);
//            console.log(imgDOM);
//            $(".result-card").html(imgDOM);
            self.isShowCode = false;
            if(!self.$store.state.musicStart){
              let x = document.getElementById("music");
              x.pause();
            }
          });
        },200);
      },
      goInfo(){
        Tools.countButton(2);
        this.$router.push('information');
      }
    },
    mounted(){
      this.personName = this.$store.state.personName;
      this.personDesc = this.$store.state.resultData.text.replace('XXX',this.personName);
      this.imgInfo = this.$store.state.imgInfo;
      this.cuttingInfo = this.$store.state.cuttingInfo;
      if(this.imgInfo.url) {
        this.imgPath = this.imgInfo.url;
        let radio = $(".img-wrapper").width() / this.cuttingInfo.w;
        this.imgStyle = {
          width: this.imgInfo.width * radio + 'px',
          height: this.imgInfo.height * radio + 'px',
          left: -this.cuttingInfo.x * radio + 'px',
          top: -this.cuttingInfo.y * radio + 'px',
        };
      }



//      var data = [
//        {name: '健美身材',value: 22,color: 'blue'},
//        {name: '喝不醉',value: 14,color: 'yellow'},
//        {name: '社交达人',value: 13,color: 'red'},
//        {name: '艺术天赋',value: 28,color: 'green'},
//        {name: '完美身材',value: 23,color: 'green'},
//        ];
//      let colorArray = ['#03F5CA','#FFC72D','#FF885A','#6840FF','#5193FF'];
      let colorArray = ['#A5DEFC','#F6BAAF','#F5AF69','#FBDE90','#CCEBB0'];
      let colorText = ['#57AAF7','#F08A74','#F39847','#F6B948','#8FCB77'];
      let data = [];
      let indexColor = 0;
      for(let i in this.$store.state.resultData.list){
        let item = this.$store.state.resultData.list[i];
        data.push({
          name: i,
          value: item,
          label: {
            normal: {
//                  formatter: '',
              backgroundColor: colorText[indexColor],
            }
          },
          labelLine: {
            show: true,
            smooth: false,
            lineStyle: {
              color: colorArray[indexColor],
              width: 1,
              type: 'solid',
              opacity: 1
            }
          }
        });
        indexColor++
      }

      let option = {
        title : {
//          text: '同名数量统计',
//          subtext: '纯属虚构',
//          x:'center'
        },
//        tooltip : {
//          trigger: 'item',
//          formatter: "{a} <br/>{b} : {c} ({d}%)"
//        },
        color : colorArray,
//        textStyle: {
//          width: 200
//        },
        series : [
          {
            name: '',
            type: 'pie',
            legendHoverLink: false,
            hoverAnimation: false,
            startAngle: 135,
            avoidLabelOverlap: true,
            radius: ['23%', '60%'],
            data: data,
            label: {
              color: '#fff',
              lineHeight: 10,
//              distance: 1,
//              show: true,
//              width: 200,
//              height: 50,
              borderRadius: 15,
              padding: [6,12,8,12],
//              formatter: '',
              rich: {
                title: {

                }
              },
              shadowColor: '#eeeeee',
              shadowBlur: 2,
              shadowOffsetX: -1,
              shadowOffsetY: 1,

//              textBorderWidth: 2,
//              textBorderColor: "#ffffff",

            },
            labelLine: {
              show: false
            },
            itemStyle: {
//              borderColor: '#ffffff',
//              borderWidth: 2,
            }
//            itemStyle: {
//              emphasis: {
//                shadowBlur: 10,
//                shadowOffsetX: 0,
//                shadowColor: 'rgba(0, 0, 0, 0.5)'
//              }
//            }
          }
        ]
      };

      //初始化chart
      setTimeout(()=>{
        let myChart = echarts.init(document.getElementById('pie'));
        myChart.setOption(option);
      });
    }
  }
</script>
<style>
  #pie>div{
    overflow: visible!important;
  }
</style>
