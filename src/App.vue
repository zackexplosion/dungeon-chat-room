<template>
  <mu-container id="app">
    <h1>Dunge♂n Chat Room</h1>
    <ChatBox />
    <SoundButtons />
  </mu-container>
</template>

<script>
import ChatBox from './components/ChatBox'
import SoundButtons from './components/SoundButtons'

export default {
  name: 'App',
  components: {
    ChatBox,
    SoundButtons
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
  height: 80vh;
  max-height: 80vh;
}
</style>
