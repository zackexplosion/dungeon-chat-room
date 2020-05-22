<template>
  <mu-container id="app">
    <h1>Dunge♂n Chat Room</h1>
    <mu-row>
      <mu-col span="8">
        <ChatBox />
      </mu-col>
      <mu-col span="4">
        <SoundButtons/>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
import { db } from '@/db'
import ChatBox from './components/ChatBox'
import SoundButtons from './components/SoundButtons'

export default {
  name: 'App',
  async created () {
    var slaveName = this.$cookies.get('slaveName')
    if (!slaveName) {
      const slaves = (await db.ref('slaves').once('value')).val()

      slaveName = 'slave#' + slaves
      this.$cookies.set('slaveName', slaveName)
      db.ref('slaves').set(slaves + 1)
    }
  },
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
