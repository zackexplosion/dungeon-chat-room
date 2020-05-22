<template>
  <div class="container">

    <h4 v-if="reversedMessage.length <= 0">
      loading slaves
    </h4>
    <ul id="messages">
      <li v-for="(m, index) in reversedMessage" :key="index">
        <template v-if="m.message.type == 'audio'">
        {{ m.from }} :
          <mu-button
          @click="playMessageSound(m.message.key)"
          >
            {{ m.message.key}}
          </mu-button>
        </template>
        <template v-else>
          {{ m.from }} : {{ m.message }}
        </template>
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
        ref="inputbox"
        class="inputbox"
      />
      <mu-button @click="sendMessage">Send</mu-button>
    </form>
  </div>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import sounds from '@/sounds'

export default {
  data () {
    return {
      ready: false,
      userName: '',
      messages: [],
      inputMessage: '',
      slaveName: this.$cookies.get('slaveName')
    }
  },
  methods: {
    playMessageSound (index) {
      var a = new Audio(sounds[index])
      a.play()
    },
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
    db
      .ref('messages')
      .once('value', initMessages => {
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
          const m = snapshot.val()

          if (m.from !== this.$cookies.get('slaveName')) {
            switch (m.message.type) {
              case 'audio':
                var a = new Audio(sounds[m.message.key])
                a.play()
                break
            }
          }
          this.messages.push(m)
        })
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
  mounted () {
    this.$nextTick(() => {
      var el = this.$refs.inputbox.$el
      el.querySelector('input').focus()
    })
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

// .container {
//   height: calc(80vh -100px);

// }

.inputbox{
  width: calc(100% - 160px);
}

$inputBarHeight: 48;
.inputbar {
  padding-left: 15px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: $inputBarHeight + px;
  background-color: #424242;
}

</style>
