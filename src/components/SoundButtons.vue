<template>
  <el-row class="SoundsButtons">
    <el-button
      v-for="(b, index) in buttons"
      :key="index"
      small
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

      db.ref('messages').push({
        from: this.$cookies.get('slaveName'),
        type: 'audio',
        key: key,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .SoundsButtons {
//   height: calc(80vh - 100px);
//   overflow: scroll;
// }
</style>
