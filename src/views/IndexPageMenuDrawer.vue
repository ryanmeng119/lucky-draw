<script setup lang="ts">
import IconTrophy from '@/components/icons/IconTrophy.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import IconSlider from '@/components/icons/IconSlider.vue'
import UploadDialog from './UploadDialog.vue'
import type { UploadType } from '@/utils/custom-types'
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import PrizeConfigDialog from './PrizeConfigDialog.vue'
import ComponentDrawer from '@/components/ComponentDrawer.vue'
import { UPLOAD_TYPE } from '@/utils/enums'
import { MessageSuccess, MessageWarning } from '@/components/message'
// import InspectDialog from './InspectDialog.vue'

type Option = {
  key: string
  label: string
}

const store = useCounterStore()
const { prizeList } = storeToRefs(store)

const drawerVisible = ref(false)
const updateDrawerVisible = () => {
  // 若要開啟，則將重置選項收起來
  if (!drawerVisible.value) {
    visibleResetItems.value = false
  }
  drawerVisible.value = !drawerVisible.value
}

const uploadType = ref<UploadType>(UPLOAD_TYPE.MEMBER)

const visibleResetItems = ref(false)
const updateVisibleResetItems = () => {
  visibleResetItems.value = !visibleResetItems.value
}

const uploadDialogVisible = ref(false)
const toggleUploadDialogVisible = (type: UploadType) => {
  uploadType.value = type
  uploadDialogVisible.value = !uploadDialogVisible.value
}

const InspectDialogVisible = ref(false)
const toggleInspectDialogVisible = () => {
  InspectDialogVisible.value = !InspectDialogVisible.value
}
const resetOptions: Option[] = [
  {
    key: 'all',
    label: '全部'
  },
  {
    key: 'results',
    label: '抽獎結果'
  },
  {
    key: 'member',
    label: '名單'
  },
  {
    key: 'prize',
    label: '獎項'
  }
]

const resetList = (
  listKey: 'resultsList' | 'memberList' | 'prizeList',
  updateFunction: Function,
  label: string
) => {
  if (store[listKey].length === 0) {
    return MessageWarning(`${label}無資料，無需重置！`)
  }
  updateFunction([])
  return MessageSuccess(`重置${label}成功`)
}

const resetData = ({ key, label }: Option) => {
  switch (key) {
    case 'all':
      store.resetAll()
      break
    case 'results':
      resetList('resultsList', store.updateResultsList, label)
      break
    case 'member':
      resetList('memberList', store.updateMemberList, label)
      break
    case 'prize':
      resetList('prizeList', store.updatePrizeList, label)
      break
    default:
      MessageWarning('無此選項')
      break
  }
}

const prizeConfigVisible = ref(false)
const updatePrizeConfigVisible = () => {
  prizeConfigVisible.value = !prizeConfigVisible.value
}

const showWarning = ref(false)
const updateShowWarning = () => {
  showWarning.value = !showWarning.value
}

const moveToUploadPrize = () => {
  updateShowWarning()
  toggleUploadDialogVisible('prize')
}
</script>
<template>
  <div class="hanburger bg-gray-600 me-2 cursor-pointer" @click="updateDrawerVisible">
    <div class="hanburger-bar" />
    <div class="hanburger-bar" />
    <div class="hanburger-bar" />
  </div>
  <ComponentDrawer v-model="drawerVisible" :size="250">
    <template #default>
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
          <div
            class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1"
            @click="toggleUploadDialogVisible('member')"
          >
            <el-icon color="#aaaaaa" :size="20">
              <IconUpload></IconUpload>
            </el-icon>
            <span>匯入名單</span>
          </div>
          <div
            class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1"
            @click="toggleUploadDialogVisible('prize')"
          >
            <el-icon color="#aaaaaa" :size="20">
              <UploadFilled />
            </el-icon>
            <span>匯入獎項</span>
          </div>
          <div
            class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1"
            @click="prizeList.length === 0 ? updateShowWarning() : updatePrizeConfigVisible()"
          >
            <el-icon color="#aaaaaa" :size="20">
              <IconSlider></IconSlider>
            </el-icon>
            <span>獎項配置</span>
          </div>
          <div>
            <div
              class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1"
              @click="updateVisibleResetItems"
            >
              <el-icon color="#aaaaaa" :size="20">
                <Refresh></Refresh>
              </el-icon>
              <span>重置設定</span>
            </div>
            <Transition name="fade">
              <div v-show="visibleResetItems" class="flex flex-col pl-6">
                <div
                  v-for="option in resetOptions"
                  :key="option.key"
                  class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded py-1 pl-1"
                  @click="resetData(option)"
                >
                  <el-icon color="#DB4437" :size="14"> <CircleCloseFilled /> </el-icon>
                  <span>{{ option.label }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <UploadDialog
          v-model:dialogVisible="uploadDialogVisible"
          :upload-type="uploadType"
        ></UploadDialog>
        <PrizeConfigDialog
          v-model:dialogVisible="prizeConfigVisible"
          :prize-list="prizeList"
        ></PrizeConfigDialog>
        <!-- <InspectDialog v-model:dialog-visible=""></InspectDialog> -->
      </div>
    </template>
  </ComponentDrawer>
  <el-dialog v-model="showWarning" :width="400">
    <template #header>
      <div style="color: red">警告</div>
    </template>
    <div>目前無獎項資料，請先匯入獎項再進行設定。</div>
    <template #footer>
      <div>
        <el-button class="w-20" @click="updateShowWarning">關閉</el-button>
        <el-button type="primary" @click="moveToUploadPrize"> 匯入獎項 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.hanburger {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  gap: 5px;
}
.hanburger-bar {
  width: 20px;
  border-radius: 5px;
  border: 1px solid #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
