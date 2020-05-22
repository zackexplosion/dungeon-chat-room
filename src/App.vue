<template>
  <mu-container id="app">
    <h1>Dunge♂n Chat Room</h1>
    <ChatBox />
  </mu-container>
</template>

<script>
import ChatBox from './components/ChatBox'

export default {
  name: 'App',
  components: {
    ChatBox
  }
}
</script>

<style>
h1 {
  text-align: center;
}
#app{
  position: relative;
  background: #424242;
}
</style>
