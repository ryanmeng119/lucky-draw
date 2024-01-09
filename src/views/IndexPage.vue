<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TagCanvas from '@/assets/tagcanvas.js'
// import TitleComponent from '@/views/TitleComponent.vue'
import IconTrophy from '@/components/icons/IconTrophy.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import IconSlider from '@/components/icons/IconSlider.vue'

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
const showSetting = ref<boolean>(false)

onMounted(() => {
  startTagCanvas()
  window.addEventListener('resize', reportWindowSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', reportWindowSize)
})
</script>

<template>
  <el-container class="h-full bg-gray-600">
    <el-header class="flex items-center justify-end p-0">
      <!-- <TitleComponent></TitleComponent> -->
      <div class="hanburger bg-gray-600 me-2" @click="showSetting = true">
        <div class="hanburger-bar" />
        <div class="hanburger-bar" />
        <div class="hanburger-bar" />
      </div>
      <el-drawer v-model="showSetting" :with-header="false" size="20%">
        <div class="flex flex-col text-sm">
          <el-divider class="my-5"> 檢視 </el-divider>
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <User />
              </el-icon>
              <span>人員名單</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <List />
              </el-icon>
              <span>獎項名單</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <IconTrophy></IconTrophy>
              </el-icon>
              <span>抽獎結果</span>
            </div>
          </div>
          <el-divider class="my-5"> 設定 </el-divider>
          <div class="flex flex-col">
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <IconUpload></IconUpload>
              </el-icon>
              <span>匯入名單</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <UploadFilled />
              </el-icon>
              <span>匯入獎項</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <IconSlider></IconSlider>
              </el-icon>
              <span>獎項配置</span>
            </div>
            <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
              <el-icon color="#aaaaaa" :size="20">
                <Refresh></Refresh>
              </el-icon>
              <span>重置設定</span>
            </div>
          </div>
        </div>
        <el-icon color="#aaaaaa" class="cursor-pointer absolute right-2 top-2">
          <Close />
        </el-icon>
      </el-drawer>
    </el-header>
    <el-main id="main" class="p-0">
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

<style scoped>
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

:deep(.bg-gray) {
  background-color: #f1f1f1;
}
</style>
