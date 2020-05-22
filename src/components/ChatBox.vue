<template>
  <div>
    <ul id="messages">
      <li v-for="(m, index) in messages" :key="index">
        {{ m.message }}
      </li>
    </ul>
    <form
      class="inputbar"
      @submit.prevent="sendMessage"
    >
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
      messages: [],
      inputMessage: ''
    }
  },
  methods: {
    sendMessage () {
      db.ref('messages').push({
        from: '',
        message: this.inputMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })

      this.inputMessage = ''
    }
  },
  computed: {
    reversedMessage () {
      return this.message
        .split('')
        .reverse()
        .join('')
    }
  },
  created () {
    db.ref('messages').on('value', function (e) {
      var audio = new Audio(woo)
      audio.play()
      console.log('message change', e)
    })
  },
  watch: {
    messages (n, o) {
      // console.log('messages change', n, o)

    }
  },
  firebase: {
    messages: db.ref('messages').orderByChild('createdAt')
  }
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
  width: calc(100% - 100px);
}

$inputBarHeight: 48;
.inputbar {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: $inputBarHeight + px;
}

</style>
