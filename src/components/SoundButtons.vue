<template>
  <el-row class="soundsButtons">
    <el-button
      v-for="(b, index) in buttons"
      :key="index"
      small
      class="buttons"
      @click="send(b, index)"
    > {{ index }}
    </el-button>
  </el-row>
</template>

<script>
import { db } from '@/db'
import firebase from 'firebase/app'
import buttons from '@/sounds'

export default {
  data() {
    return {
      buttons
    }
  },
  methods: {
    send(aduio, key) {
      new Audio(aduio).play()
      const { slave } = this.$store.state
      db.ref('messages').push({
        from: {
          id: slave.id,
          name: slave.name
        },
        type: 'audio',
        key: key,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
    }
  }
}
</script>
<style  scoped>
/* .soundsButtons {
  padding-top: 79px;
} */
.buttons {
  margin-left: 10px;
}
</style>
