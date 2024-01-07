<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TagCanvas from '@/assets/tagcanvas.js'

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
    console.error('Main element not found!')
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
const tagData: TagData[] = [
  {
    key: 1,
    name: ''
  },
  {
    key: 2,
    name: ''
  },
  {
    key: 3,
    name: ''
  },
  {
    key: 4,
    name: ''
  },
  {
    key: 5,
    name: ''
  },
  {
    key: 6,
    name: ''
  },
  {
    key: 7,
    name: ''
  },
  {
    key: 8,
    name: ''
  },
  {
    key: 9,
    name: ''
  }
]

onMounted(() => {
  startTagCanvas()
  window.addEventListener('resize', reportWindowSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', reportWindowSize)
})
</script>

<template>
  <el-container class="h-full">
    <el-header class="flex items-center justify-center bg-orange-200">
      <div>Hello World~</div>
    </el-header>
    <el-main id="main" class="bg-blue-900">
      <div id="tags">
        <ul v-for="item in tagData" :key="item.key">
          <li>
            <a href="javascript:void(0);">
              {{ item.name ? item.name : item.key }}
            </a>
          </li>
        </ul>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped></style>
