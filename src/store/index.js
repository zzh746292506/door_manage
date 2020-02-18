import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import home from './modules/home'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    home
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
