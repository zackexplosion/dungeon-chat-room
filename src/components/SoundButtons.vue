<template>
  <mu-container class="SoundsButtons">
    <mu-button
      v-for="(b, index) in buttons"
      :key="index"
      small
      @click="send(b)"
    > {{ index }}
    </mu-button>
  </mu-container>
</template>

<script>
// var buttons = []
// var SOUNDS = [
//   'WOO.mp3'
// ]

// SOUNDS.forEach(f => {
//   buttons.push({
//     raw: require(`@/assets/gachi/${f}`),
//     name: f.split('.')[0]
//   })
// })

var buttons = {
  // 'woo': require(`@/assets/gachi/woo.mp3`),
  // 'Suction': require(`@/assets/gachi/Suction.mp3`),
  // 'Thank you sir': require(`@/assets/gachi/Thank you sir.mp3`)
}

var req = require.context('@/assets/gachi/')
req.keys().forEach(function (key) {
  // console.log(key)
  var regexp = /\.\/(.*)\.mp3/
  var m = key.match(regexp)
  var _key = m[1]
  // console.log(_key)
  buttons[_key.trim()] = require('@/assets/gachi/' + _key + '.mp3')
})

export default {
  data () {
    return {
      buttons
    }
  },
  methods: {
    send (a) {
      new Audio(a).play()
      this.$emit('sendSound', b)
    }
  }
}
</script>
<style lang="scss" scoped>
.SoundsButtons {
  height: calc(80vh - 100px);
  overflow: scroll;
}
</style>
