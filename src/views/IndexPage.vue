<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import TagCanvas from '@/assets/tagcanvas.js'
// import TitleComponent from '@/views/TitleComponent.vue'
import { MessageError } from '@/components/message'
import SnowBackground from '@/views/SnowBackground.vue'
import IndexPageMenuDrawer from './IndexPageMenuDrawer.vue'

type TagData = {
  key: number
  name: string
}

const MAIN_ELEMENT_SELECTOR = '#main'
const ROOT_CANVAS_ID = 'rootcanvas'

const createCanvas = (selector = MAIN_ELEMENT_SELECTOR) => {
  const canvas = document.createElement('canvas')
  canvas.width = document.body.offsetWidth
  canvas.height = document.body.offsetHeight * 0.8
  canvas.id = ROOT_CANVAS_ID

  const targetElement = document.querySelector(selector)

  if (targetElement) {
    targetElement.appendChild(canvas)
  } else {
    MessageError('Main element not found!')
  }
}

// 速度
const speed = () => [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)]

const canvasConfig = {
  textColour: '#fff',
  initial: speed(),
  dragControl: 1,
  textHeight: 32,
  noSelect: true,
  lock: 'xy'
}

const startTagCanvas = () => {
  createCanvas()
  TagCanvas.Start(ROOT_CANVAS_ID, 'tags', canvasConfig)
}

const reloadTagCanvas = () => {
  TagCanvas.Reload(ROOT_CANVAS_ID)
}

const reportWindowSize = () => {
  const AppCanvas = document.querySelector(`#${ROOT_CANVAS_ID}`)
  if (AppCanvas?.parentElement) {
    AppCanvas?.parentElement.removeChild(AppCanvas)
  }
  startTagCanvas()
}

// 畫面上跑動的項目
const luckyBallData: TagData[] = []

const drawerVisible = ref<boolean>(false)
const toggleDrawerVisible = () => {
  drawerVisible.value = !drawerVisible.value
}

const isRunning = ref(false)
const toggleIsRunning = () => {
  isRunning.value = !isRunning.value
}

const start = () => {
  toggleIsRunning()
}
const stop = () => {
  toggleIsRunning()
}

const stateConfig = reactive({
  thisRound: {
    mode: '',
    prizeId: null,
    qty: 1
    // remain: 1
  }
})

onMounted(() => {
  startTagCanvas()
  addEventListener('resize', reportWindowSize)
})
onUnmounted(() => {
  removeEventListener('resize', reportWindowSize)
})
</script>

<template>
  <el-container class="h-full bg-gray-600">
    <SnowBackground></SnowBackground>
    <el-header class="flex items-center justify-end p-0 z-10">
      <!-- <TitleComponent></TitleComponent> -->
      <div class="hanburger bg-gray-600 me-2 cursor-pointer" @click="toggleDrawerVisible">
        <div class="hanburger-bar" />
        <div class="hanburger-bar" />
        <div class="hanburger-bar" />
      </div>
      <IndexPageMenuDrawer v-model:isVisible="drawerVisible"></IndexPageMenuDrawer>
    </el-header>
    <el-main id="main" class="p-0">
      <div id="tags">
        <ul v-for="item in luckyBallData" :key="item.key">
          <li>
            <a href="javascript:void(0);">
              {{ item.name ? item.name : item.key }}
            </a>
          </li>
        </ul>
      </div>
      <el-button type="danger" class="absolute bottom-12 left-1/2">{{
        isRunning ? 'Stop' : 'Start'
      }}</el-button>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.opacity-75 {
  opacity: 0.75;
}
.p-0 {
  padding: 0 !important;
}

.hanburger {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  gap: 5px;
}
.hanburger-bar {
  width: 20px;
  border-radius: 5px;
  border: 1px solid #fff;
}
</style>
