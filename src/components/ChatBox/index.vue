<template>
  <div class="container">

    <h4 v-if="reversedMessage.length <= 0">
      loading slaves
    </h4>

    <ul
      v-chat-scroll>
      <li
        v-for="(m, index) in messages"
        :key="index"
        :timestamp="m.createdAt | formatDate"
        placement="top"
      >
        <el-card>
          <el-avatar icon="el-icon-user-solid"/>
          <template v-if="m.type == 'audio'">
            {{ m.from }} :
            <el-button
              icon="el-icon-caret-right"
              type="info"
              @click="playMessageSound(m.key)"
            >
              {{ m.key }}
            </el-button>
          </template>
          <template v-else>
            {{ m.from }} : {{ m.message }}
          </template>
        </el-card>
      </li>
    </ul>

    <form
      class="inputbar"
      @submit.prevent="sendMessage"
    >
      <el-input
        ref="inputbox"
        v-model="inputMessage"
        class="inputbox"
      >
        <template slot="prepend">{{ slaveName }}</template>
      </el-input>
      <el-button @click="sendMessage">Send</el-button>
    </form>
  </div>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import sounds from '@/sounds'

export default {
  data() {
    const { slaveName } = this.$store.state
    return {
      slaveName,
      ready: false,
      userName: '',
      messages: [],
      inputMessage: ''
    }
  },
  computed: {
    reversedMessage() {
      return this.messages.slice().reverse()
    },
    lastMessage() {
      if (this.messages.length > 0) {
        return this.messages[this.messages.length - 1]
      } else {
        return false
      }
    }
  },
  async created() {
    db
      .ref('messages')
      .limitToLast(10)
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

          if (m.from !== this.slaveName && m.type) {
            switch (m.type) {
              case 'audio':
                var a = new Audio(sounds[m.key])
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
  mounted() {
    this.$nextTick(() => {
      this.focusInput()
    })

    setInterval(() => {
      this.focusInput()
    }, 200)
  },
  methods: {
    focusInput() {
      var el = this.$refs.inputbox.$el
      el.querySelector('input').focus()
    },
    playMessageSound(index) {
      var a = new Audio(sounds[index])
      a.play()
    },
    sendMessage() {
      if (this.inputMessage.length <= 0) return
      db.ref('messages').push({
        from: this.slaveName,
        message: this.inputMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      new Audio(sounds['WOO']).play()
      this.inputMessage = ''
    }
  }
  // firebase: {
  //   messages: db.ref('messages').orderByChild('createdAt')
  // }
}
</script>
<style>
.el-text-field-input {
  color:#fff;
}
</style>
<style lang="scss" scoped>

.inputbox{
  width: calc(100% - 90px);
}

$inputBarHeight: 41;
.inputbar {
  padding:5px 0;
  padding-left: 5px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: $inputBarHeight + px;
  background-color: #424242;
}

</style>
