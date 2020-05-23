<template>
  <el-container id="app" style="height: 90vh">
    <el-container>
      <el-header>
        <h1>Dunge♂n Chat Room</h1>
      </el-header>
      <el-main>
        <ChatBox :slave-name="slaveName"/>
      </el-main>
    </el-container>
    <el-aside width="200px">
      <SoundButtons/>
    </el-aside>
  </el-container>
</template>

<script>
import { db } from '@/db'
import ChatBox from './components/ChatBox'
import SoundButtons from './components/SoundButtons'

export default {
  name: 'App',
  components: {
    ChatBox,
    SoundButtons
  },
  data() {
    return {
      slaveName: ''
    }
  },
  async created() {
    var slaveName = this.$cookies.get('slaveName')
    if (!slaveName) {
      const slaves = (await db.ref('slaves').once('value')).val()

      slaveName = 'slave#' + slaves
      this.$cookies.set('slaveName', slaveName)
      db.ref('slaves').set(slaves + 1)
    }

    this.slaveName = slaveName
  }
}
</script>

<style>
h1 {
  text-align: center;
}
</style>
