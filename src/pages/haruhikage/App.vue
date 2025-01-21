<script setup>
import { ref, computed, watch } from 'vue'
import MusicPlayer from '@/components/MusicPlayer.vue'


const switchOptions = ref([
  {title: 'soyo', checked: false, img: '/soyo.jpg'},
  {title: 'anon', checked: false, img: '/anon.jpg'},
  {title: 'haruhikage', checked: false, img: '/haruhikage.jpg'},
])

function handelSwitch(event) {
  const { value, index } = event
  // 判断是否全部选中（产生冲突）
  if (switchOptions.value.some(item => !item.checked)) return

  // 生成一个不为当前切换的开关的随机index
  let length = switchOptions.value.length
  let chosen = ( index + (Math.floor(Math.random() * (length - 1)) + 1) ) % length // [1, length-1]

  switchOptions.value[chosen].checked = false
}

</script>

<template>
  <div class="title">
    <h1>你不能同时拥有这些</h1>
    <MusicPlayer />
  </div>
  
  <div class="switchList">
    <div class="switchBox" v-for="(item, index) in switchOptions" :key="item.img">
      <el-switch size="large" v-model="item.checked" @change="(event) => handelSwitch({value: event, index})" />
      <el-image :src="item.img" :alt="item.title" fit="scale-down" />
    </div>
  </div>
  
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.switchList {
  margin: auto;
  width: fit-content;
  min-width: 20rem;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.switchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.switchBox .el-image {
  height: 10rem;
}
</style>