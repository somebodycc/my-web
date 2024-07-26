<script setup>
import { ref } from 'vue'

const cardRef = ref(null)

function handleMouseMove(e) {
  const { clientX, clientY } = e
  const { width, height, left, top } = cardRef.value.getBoundingClientRect();
  // 最大旋转角度
  const maxRotateX = 15
  const maxRotateY = 20
  // 原点位置
  const centerX = width / 2
  const centerY = height / 2
    
  // 鼠标位置相对卡片左上角的坐标
  const offsetX = clientX - left
  const offsetY = clientY - top
    
  // 将和原点的距离线性折算成旋转角度
  // X 方向移动旋转 Y 轴，Y 方向移动旋转 X 轴
  let rotateX = (maxRotateX * (offsetY - centerY)) / (centerY) * -1
  let rotateY = (maxRotateY * (offsetX - centerX)) / (centerX)
    
  // 设置 CSS Variables
  cardRef.value.style.setProperty('--rotateX', rotateX)
  cardRef.value.style.setProperty('--rotateY', rotateY)
 
}

function handleMouseLeave() {
  cardRef.value.style.setProperty('--rotateX', 0)
  cardRef.value.style.setProperty('--rotateY', 0)
}


</script>

<template>
  <div class="card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="cardRef">
    <h1>你好喵~</h1>
  </div>
</template>

<style scoped>
  
  .card {
    --rotateX: 0;
    --rotateY: 0;

    position: relative;
    padding: 2rem;
    width: 32rem;
    height: 38rem;
    background: rgba(255, 255, 255, .7);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;

    transition: 300ms ease-out;
    transform: rotateX(calc(var(--rotateX) * 1deg)) rotateY(calc(var(--rotateY) * 1deg));
  }
</style>
