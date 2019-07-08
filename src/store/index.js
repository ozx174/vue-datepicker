import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const state = {
  effect: 'next'
}
const mutations = {
  nextEffect (state) {
    // 修改却还页面过度动画
    state.effect = 'next'
  },
  prevEffect (state) {
    // 修改却还页面过度动画
    state.effect = 'prev'
  },
  noneEffect (state) {
    state.effect = ''
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
