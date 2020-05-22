// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui'
import theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import { rtdbPlugin } from 'vuefire'
import VueCookies from 'vue-cookies'

theme.use('dark')

Vue.use(rtdbPlugin)
Vue.use(MuseUI)
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // setup the reactive todos property
  components: { App },
  template: '<App/>'
})
