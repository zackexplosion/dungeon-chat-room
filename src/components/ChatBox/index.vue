<template>
  <el-container>

    <h4 v-if="messages.length <= 0">
      loading slaves
    </h4>

    <div
      v-chat-scroll
      class="scroll-container"
    >
      <el-card
        v-for="(m, index) in messages"
        :key="index"
        :timestamp="m.createdAt | formatDate"
        class="message"
        placement="top"
      >
        <!-- <el-avatar icon="el-icon-user-solid"/> -->
        <template v-if="m.type == 'audio'">
          {{ m.from.name }} :
          <el-button
            icon="el-icon-caret-right"
            type="info"
            @click="playMessageSound(m.key)"
          >
            {{ m.key }}
          </el-button>
        </template>
        <template v-else>
          {{ m.from.name }} : {{ m.message }}
        </template>
      </el-card>
    </div>

    <MessageInput />
  </el-container>
</template>

<script>
import { db } from '@/db'
import sounds from '@/sounds'
import MessageInput from './MessageInput'

export default {
  components: {
    MessageInput
  },
  data() {
    const { slave } = this.$store.state
    return {
      slave,
      messages: []
    }
  },
  computed: {
  },
  async created() {
    try {
      // init messages
      db
        .ref('messages')
        .limitToLast(10)
        .once('value', initMessages => {
          if (!initMessages.val()) return
          const messages = initMessages.val()
          this.messages = Object.keys(messages).map(k => {
            return messages[k]
          })
        })

      // listen on new message
      db
        .ref('messages')
        .orderByChild('createdAt')
        .startAt(Date.now())
        .on('child_added', (snapshot, prevChildKey) => {
          const m = snapshot.val()

          if (m.from.id !== this.slave.id && m.type) {
            switch (m.type) {
              case 'audio':
                this.playMessageSound(m.key)
                break
            }
          }
          this.messages.push(m)
        })
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    playMessageSound(index) {
      new Audio(sounds[index]).play()
    }
  }
}
</script>
<style>
.el-text-field-input {
  color:#fff;
}
.scroll-container {
  height: 80vh;
  overflow:scroll;
  width: 100%;
}
.message {
  width: 100%;
}

</style>
