<template>
  <mu-container class="container">
    <ul id="messages">
      <li v-for="(m, index) in messages" :key="index">
        {{m.created_at}}
      </li>
    </ul>
    <form class="inputbar" @submit="sendMessage">
      <mu-text-field id="m" autocomplete="off" v-model="inputMessage" />
      <mu-button @click="sendMessage">Send</mu-button>
    </form>
  </mu-container>
</template>

<script>
import { db } from '@/db'
export default {
  data () {
    return {
      messages: [],
      inputMessage: ''
    }
  },
  methods: {
    sendMessage () {
      console.log(this.inputMessage)
    }
  },
  firebase: {
    messages: db.ref('messages')
  }
}
</script>

<style lang="scss" scoped>

.container {
  position: relative;
  height: 100vh
}

$inputBarHeight: 48;
.inputbar {
  position: absolute;
  bottom: 0;
  height: $inputBarHeight + px;
}

</style>
