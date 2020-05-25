import Vue from 'vue'
import App from './App'
import { rtdbPlugin } from 'vuefire'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import VueChatScroll from 'vue-chat-scroll'
import moment from 'moment'
import Vuex from 'vuex'
import firebase from 'firebase/app'
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
  var slaveRef
  console.log('slaveId', slaveId)
  try {
    if (!slaveId) {
      const ref = db.ref('slaves').push()
      Vue.$cookies.set('slaveId', ref.key)
      slaveId = ref.key
    }

    slaveRef = db.ref('slaves/' + slaveId)

    slave = (await slaveRef.once('value')).val()

    if (!slave || !slave.name) {
      const slaves = await db.ref('slaves').once('value')
      console.log('numChildren', slaves.numChildren())

      slave = {
        id: slaveId,
        name: 'slave#' + slaves.numChildren()
      }
    }

    slave.status = 'online'
    slave.lastChange = firebase.database.ServerValue.TIMESTAMP

    slaveRef.set(slave)

    slaveRef.onDisconnect().set({
      ...slave,
      status: 'offline',
      lastChange: firebase.database.ServerValue.TIMESTAMP
    })

    console.log('slave', slave)
  } catch (error) {
    console.error(error)
  }

  const store = new Vuex.Store({
    state: {
      slave
    },
    mutations: {
      changeSlaveName(state, payload) {
        // const { name } = slave
        console.log('slave', slave)
        const id = slave.name.split('#')[1]
        const newName = payload + '#' + id
        // clean disconnect action
        slaveRef.onDisconnect().cancel()

        // upadate database
        slave = {
          ...slave,
          name: newName,
          status: 'online',
          lastChange: firebase.database.ServerValue.TIMESTAMP
        }
        slaveRef.set(slave)

        // register a new disconnect action
        slaveRef.onDisconnect().set({
          ...slave,
          status: 'offline',
          lastChange: firebase.database.ServerValue.TIMESTAMP
        })

        state.slave.name = newName
      }
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

