<script setup>
import { ref, onMounted } from 'vue'
import Atropos from 'atropos'


const blogUrl = ref('https://blog.somebodycc.com')
const webUrl = ref('https://www.somebodycc.com')
const avatarUrl = ref('https://pic.imgdb.cn/item/65abdb1d871b83018ae9ae94.png')

const helloText = ref([   //要轮流显示的文字
  { text:'你好喵~', order: 1},
  { text:'嗯喵~', order: 2},
  { text:'喵喵~', order: 3}
])


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

onMounted(() => {
  const atrCard = Atropos({
    el: '.atr-card',
    activeOffset: 15,
    rotateXMax: 5,
    duration: 150,
    shadow: false,
  });
  helloTextAnimation()
})

//文字轮播动画
function helloTextAnimation(){
  let helloText = document.querySelectorAll('.hello-text')
  let helloIndex = 0
  setInterval((function inter() {   //进入时立即执行
    let last = (helloIndex - 1 + helloText.length) % helloText.length
    let next = (helloIndex + 1) % helloText.length
    helloText[last].classList.add('hide')
    setTimeout(() => {
      helloText[helloIndex].classList.remove('hide')
      helloIndex = next
    }, 1500)
    return inter
  })(), 4000)
}
</script>

<template>
  <!-- <div class="card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="cardRef">
      <h1 v-for="hello in helloText"
        :key="hello.order"
        class="hello-text hide">{{hello.text}}
      </h1>
    <button class="btn bolgBtn"><a href="https://blog.somebodycc.com">进入博客</a></button>
  </div> -->

  <div class="atropos atr-card">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner card">

          <div class="profile">
            <img :src="avatarUrl" alt="avatar" />
            <p>葱</p>
          </div>

          <div class="hello-text-container" data-atropos-offset="3">
            <h1 v-for="hello in helloText"
              :key="hello.order"
              class="hello-text hide"
              >{{hello.text}}
            </h1>
          </div>

          <div class="btns">
            <el-button
              size="large"
              tag="a"
              :href="blogUrl"
              color="#35ac82"
              class="btn bolgBtn"
            >
              进入博客
            </el-button>
            <el-button
              size="large"
              tag="a"
              :href="webUrl"
              color="#35ac82"
              class="btn bolgBtn"
            >
              进入网站
            </el-button>
          </div>

        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
a {
  text-decoration: none;
}
.hide {
  opacity: 0;
}

.atr-card {
  width: 32rem;
  height: 38rem;
  animation: card-show .4s ease-out;
}
.profile {
  height: 10rem;
  margin-bottom: 5rem;
}
.profile img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
.profile p {
  font-size: 24px;
  margin-top: .5rem;
  text-align: center;
  color: #333;
}
.card {
  position: relative;
  padding: 2rem;
  width: 32rem;
  height: 38rem;
  background: rgba(255, 255, 255, .6);
  border-radius: 10px;
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  align-items: center;
}
.hello-text-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
  .hello-text {
    position: absolute;
    font-size: 52px;
    text-align: center;
    transition: opacity 1.5s ease;
  }
  
.btns .btn {
  color: #fff;
  margin: 0;
  font-size: 24px;
  transition: all 0.5s ease;
}
.card .btns {
  margin-top: auto;
}
.btns {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
}

@keyframes card-show {
  from {
    opacity: 0;
    scale: 1.2; 
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>
