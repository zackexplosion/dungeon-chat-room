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
      <template slot="prepend" >
        <span
          @click="openChangeSlaveNamePrompt">
          {{ slave.name }}
        </span>
      </template>
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
    const { slaveName, slave } = this.$store.state
    return {
      slaveName,
      slave,
      inputMessage: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.focusInput()
    })

    // setInterval(() => {
    //   this.focusInput()
    // }, 500)
  },
  methods: {
    focusInput() {
      var el = this.$refs.inputbox.$el
      el.querySelector('input').focus()
    },
    sendMessage() {
      if (this.inputMessage.length <= 0) return
      db.ref('messages').push({
        from: {
          id: this.slave.id,
          name: this.slave.name
        },
        message: this.inputMessage,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
      new Audio(sounds['WOO']).play()
      this.inputMessage = ''
    },
    openChangeSlaveNamePrompt() {
      this.$prompt('Enter New Slave Name', 'Woo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValue: this.slave.name.split('#')[0]
      }).then(({ value }) => {
        this.$store.commit('changeSlaveName', value)
        this.$message({
          type: 'success',
          message: 'Your new slave name is:' + value
        })
      }).catch((e) => {
        this.$message({
          type: 'info',
          message: 'Input canceled'
        })
      })
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
