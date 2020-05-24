<template>
  <el-container>
    <el-container>
      <el-header>
        <h1>Dunge♂n Chat Room</h1>
      </el-header>
      <el-main class="main">
        <ChatBox />
      </el-main>
    </el-container>
    <el-aside width="150px">
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
.el-aside {
  height: 90vh;
}
.main {
  padding: 0;
}
.el-aside {
  height: 80vh;
}
</style>
