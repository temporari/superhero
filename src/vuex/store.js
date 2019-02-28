import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 10,
    imgDataUrl: '',
    cuttingInfo: {},
    imgInfo: {},
    personName: '',
    btnMusicShow: true,
    resultData: {},
    musicStart: true,
    imageData: ''
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});
