var sounds = {}
var req = require.context('@/assets/gachi/')
req.keys().forEach(function(key) {
  // console.log(key)
  var regexp = /\.\/(.*)\.mp3/
  var m = key.match(regexp)
  var _key = m[1]
  // console.log(_key)
  sounds[_key.trim()] = require('@/assets/gachi/' + _key + '.mp3')
})

export default sounds
