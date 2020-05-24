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
  var slaveId = Vue.$cookies.get('slaveId')
  var slave = {}

  console.log('slaveId', slaveId)
  try {
    if (!slaveId) {
      const ref = db.ref('slaves').push()
      Vue.$cookies.set('slaveId', ref.key)
      slaveId = ref.key
    }

    var slaveRef = db.ref('slaves/' + slaveId)

    slave = (await slaveRef.once('value')).val()

    if (!slave) {
      const slaves = await db.ref('slaves').once('value')
      console.log('numChildren', slaves.numChildren())

      slave = {
        name: 'slave#' + (slaves.numChildren() + 1)
      }
      await slaveRef.set(slave)
    }

    slaveRef.set({
      ...slave,
      status: 'online'
    })

    slaveRef.onDisconnect().set({
      ...slave,
      status: 'offline'
    })
  } catch (error) {
    console.error(error)
  }
  console.log('salveID', slaveId)
  console.log('slave', slave)
  const store = new Vuex.Store({
    state: {
      slave,
      slaveName: slave.name
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

