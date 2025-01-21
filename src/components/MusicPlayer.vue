<script setup>
import { ref, watch, onMounted } from 'vue'

import playerImgSrc from '../assets/player.svg'
import musicSrc from '/CRYCHIC - 春日影.mp3'

const playerImg = ref(playerImgSrc)
const music = ref(musicSrc)
const playing = ref(null)

let source = null
let audioCtx = null
let currentTime = 0

onMounted(() => {
  loadMusic()
})

function switchPlaying() {
  if (!audioCtx) return

  const switchTo = !playing.value

  if (switchTo) {
    // start只能调用一次
    if (currentTime == 0) source.start(0, currentTime)
    else audioCtx.resume()
    console.log('开始播放')
  }
  else {
    currentTime = audioCtx.currentTime
    audioCtx.suspend()
    console.log('暂停播放')
  }
  
  playing.value = switchTo
}

// 控制音乐播放
// watch(playing, isPlaying => {

//   if (isPlaying) {
//     console.log(currentTime)
//     try {
//       source.start(0, currentTime)
//     }
//     catch (error) {
//       playing.value = !isPlaying
//     }
//   } else {
//     currentTime = audioCtx.currentTime
//     console.log(currentTime)
//     source.stop(0)
//     loadMusic()
//   }
// })

// 初始化音频设置（使用Web Audio API）
// function setAudioOptions() {
//   const AudioContext = window.AudioContext
//   const audioContext = new AudioContext() //创建音频上下文

//   const audioPlayer = document.getElementById('audio')  //获取音频元素
//   const track = audioContext.createMediaElementSource(audioPlayer)  //将音频元素加入音频上下文

//   const gainNode = audioContext.createGain() //创建增益
//   gainNode.gain.value = 0.5

//   track.connect(gainNode).connect(audioContext.destination)

//   playing.value = false
// }

const loadMusic = () => {
  source = null
  audioCtx = null
  currentTime = 0

  const url = music.value
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'
 
  request.onload = function() {
    const audioData = request.response
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    
    const gainNode = audioCtx.createGain() //创建增益
    gainNode.gain.value = 0.7
  
    audioCtx.decodeAudioData(audioData, (audioBuffer) => {
      source = audioCtx.createBufferSource()
      source.buffer = audioBuffer
      source.loop = true
      source.playbackRate.value = 2 // 改变声音播放速率，2倍播放
      source.connect(gainNode).connect(audioCtx.destination)
      console.log('音乐加载完成')
    })
  }
  request.send()

  playing.value = false
}

</script>

<template>
  <div class="music-player">
    <img class="player-img" :class="{'player-playing': playing}" :src="playerImg" alt="音乐播放器" @click="switchPlaying"/>
    <!-- <audio id="audio" loop :src="music"></audio> -->
  </div>

</template>

<style scoped>
.music-player {
  display: inline-block;
}

.player-img {
  width: 3rem;
  height: 3rem;
}

.player-playing {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>