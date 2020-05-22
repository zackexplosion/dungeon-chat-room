<template>
  <mu-container id="app">
    <h1>Dunge♂n Chat Room</h1>
    <mu-row>
      <mu-col span="8">
        <ChatBox />
      </mu-col>
      <mu-col span="4">
        <SoundButtons />
      </mu-col>
    </mu-row>
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
