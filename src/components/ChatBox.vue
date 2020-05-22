<template>
  <div>
    <ul id="messages">
      <li v-for="(m, index) in reversedMessage" :key="index">
        {{ m.from }} : {{ m.message }}
      </li>
    </ul>

    <form
      class="inputbar"
      @submit.prevent="sendMessage"
    >
      <mu-divider></mu-divider>
      <span>{{ slaveName }}</span>
      <mu-text-field
      v-model="inputMessage"
      class="inputbox"
      />
      <mu-button @click="sendMessage">Send</mu-button>
    </form>
  </div>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'

var woo = require('@/assets/gachi/WOO.mp3')

export default {
  data () {
    return {
      ready: false,
      userName: '',
      messages: [],
      inputMessage: '',
      slaveName: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.inputMessage.length <= 0) return
      db.ref('messages').push({
        from: this.slaveName,
        message: this.inputMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })

      this.inputMessage = ''
    }
  },
  async created () {
    console.log('created')
    db.ref('messages').once('value', initMessages => {
      if (!initMessages.val()) return
      const messages = initMessages.val()
      this.messages = Object.keys(messages).map(k => {
        return messages[k]
      })
    })

    try {
      // Retrieve new posts as they are added to our database
      db
        .ref('messages')
        .orderByChild('createdAt')
        .startAt(Date.now())
        .on('child_added', (snapshot, prevChildKey) => {
          var newPost = snapshot.val()
          var a = new Audio(woo)
          a.play()
          this.messages.push(newPost)
        })

      var slaveName = this.$cookies.get('slaveName')
      if (!slaveName) {
        const slaves = (await db.ref('slaves').once('value')).val()

        slaveName = 'slave#' + slaves
        this.$cookies.set('slaveName', slaveName)
        if (!slaves) db.ref('slaves').set(slaves + 1)
      }

      this.slaveName = slaveName

      // if (!slaves) db.ref('slaves').set(1)

      // var slave_name = ''
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    reversedMessage () {
      return this.messages.slice().reverse()
    },
    lastMessage () {
      if (this.messages.length > 0) {
        return this.messages[this.messages.length - 1]
      } else {
        return false
      }
    }
  },
  watch: {
    messages (n, o) {
      // console.log('messages change', n, o)

    }
  }
  // firebase: {
  //   messages: db.ref('messages').orderByChild('createdAt')
  // }
}
</script>
<style>
.mu-text-field-input {
  color:#fff;
}
</style>
<style lang="scss" scoped>

.container {
  height: 100%;
}

.inputbox{
  width: calc(100% - 160px);
}

$inputBarHeight: 48;
.inputbar {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: $inputBarHeight + px;
}

</style>
