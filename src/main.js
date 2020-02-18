// ie polyfill
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import $ajax from './utils/ajax-serve'
import Tools from './utils/tools'
import './utils/filter'
import './utils/directives'
import './assets/css/common.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import AntdPlugin from '@a/js/antd-plugin'

import bootstrap from './core/bootstrap'
import './core/use'
Vue.use(AntdPlugin)
Vue.config.productionTip = false
Vue.prototype.$ajax = $ajax
Vue.prototype.$tools = Tools

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
