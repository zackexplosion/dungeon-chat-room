import Vue from 'vue'
import App from './App'
import { rtdbPlugin } from 'vuefire'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import VueChatScroll from 'vue-chat-scroll'
import moment from 'moment'
import Vuex from 'vuex'
import { db } from '@/db'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-dark'

Vue.use(Vuex)
Vue.use(rtdbPlugin)
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(VueChatScroll)

// set default config
Vue.$cookies.config('7d')

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('YYYY//MM/DD hh:mm:ss')
  }
})

async function main() {
  // init slave name
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

  new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
  })
}

main()

