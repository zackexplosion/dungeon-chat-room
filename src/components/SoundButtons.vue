<template>
  <mu-container>
    <mu-button
      v-for="(b, index) in buttons"
      :key="index"
      @click="send(b)"
    > {{ index }}
    </mu-button>
  </mu-container>
</template>

<script>
var buttons = []
// var SOUNDS = [
//   'WOO.mp3'
// ]

// SOUNDS.forEach(f => {
//   buttons.push({
//     raw: require(`@/assets/gachi/${f}`),
//     name: f.split('.')[0]
//   })
// })

// var buttons = {
//   'woo': require(`@/assets/gachi/woo.mp3`)
// }

// // var req = require.context('@/assets/gachi', true, /^(.*\.(js$))[^.]*$/igm)
// var req = require.context('@/assets/gachi', true)
// req.keys().forEach(function (key) {
//   console.log(key)
//   let _key = key
//   buttons[_key] = require('@/assets/gachi/' + key)
// })

export default {
  data () {
    return {
      buttons
    }
  },
  methods: {
    send (a) {
      new Audio(a).play()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
