<template>
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
      inputMessage: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.focusInput()
    })

    setInterval(() => {
      this.focusInput()
    }, 500)
  },
  methods: {
    focusInput() {
      var el = this.$refs.inputbox.$el
      el.querySelector('input').focus()
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
}
</script>
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
