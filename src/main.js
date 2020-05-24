// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { rtdbPlugin } from 'vuefire'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import VueChatScroll from 'vue-chat-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark'
Vue.use(rtdbPlugin)

Vue.use(VueCookies)
Vue.use(ElementUI)

Vue.use(VueChatScroll)

// set default config
Vue.$cookies.config('7d')

Vue.config.productionTip = false

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('YYYY//MM/DD hh:mm:ss')
  }
})

import Vuex from 'vuex'

Vue.use(Vuex)

import { db } from '@/db'

async function main() {
  var slaveName = Vue.$cookies.get('slaveName')
  if (!slaveName) {
    const slaves = (await db.ref('slaves').once('value')).val()

    slaveName = 'slave#' + slaves
    Vue.$cookies.set('slaveName', slaveName)
    db.ref('slaves').set(slaves + 1)
  }

  const store = new Vuex.Store({
    state: {
      slaveName
    }
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    // setup the reactive todos property
    components: { App },
    template: '<App/>'
  })
}

main()

