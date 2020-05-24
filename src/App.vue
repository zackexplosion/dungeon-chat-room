<template>
  <el-container id="app" style="height: 90vh">
    <el-container>
      <el-header>
        <h1>Dunge♂n Chat Room</h1>
      </el-header>
      <el-main>
        <ChatBox />
      </el-main>
    </el-container>
    <el-aside width="200px">
      <SoundButtons/>
    </el-aside>
  </el-container>
</template>

<script>
import ChatBox from '@/components/ChatBox'
import SoundButtons from '@/components/SoundButtons'

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
</style>
