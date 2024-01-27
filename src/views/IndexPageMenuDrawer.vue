<template>
  <el-drawer :model-value="isVisible" :with-header="false" size="220px">
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
        <div class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded p-1">
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
                class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded py-1 pl-1"
              >
                <el-icon color="#DB4437" :size="14"><CircleCloseFilled /> </el-icon>
                <span>全部設定</span>
              </div>
              <div
                class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded py-1 pl-1"
              >
                <el-icon color="#DB4437" :size="14"> <CircleCloseFilled /> </el-icon>
                <span>抽獎結果</span>
              </div>
              <div
                class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded py-1 pl-1"
              >
                <el-icon color="#DB4437" :size="14"> <CircleCloseFilled /> </el-icon>
                <span>名單</span>
              </div>
              <div
                class="flex items-center gap-1 cursor-pointer hover:bg-zinc-300 rounded py-1 pl-1"
              >
                <el-icon color="#DB4437" :size="14"> <CircleCloseFilled /> </el-icon>
                <span>獎項</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <UploadDialog
        v-model:is-visible="uploadDialogVisible"
        :upload-type="uploadType"
      ></UploadDialog>
    </div>
    <div class="flex cursor-pointer absolute right-2 top-2">
      <el-icon color="#aaaaaa" @click="closeDrawer">
        <Close />
      </el-icon>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import IconTrophy from '@/components/icons/IconTrophy.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import IconSlider from '@/components/icons/IconSlider.vue'
import UploadDialog from './UploadDialog.vue'
import type { UploadType } from '@/utils/custom-types'
import { ref } from 'vue'

const { isVisible } = defineProps({
  isVisible: Boolean
})

const uploadType = ref<UploadType>('member')

const emits = defineEmits(['update:isVisible'])

const closeDrawer = () => {
  emits('update:isVisible', false)
}

const visibleResetItems = ref<Boolean>(false)
const updateVisibleResetItems = () => {
  visibleResetItems.value = !visibleResetItems.value
}

const uploadDialogVisible = ref<boolean>(false)
const toggleUploadDialogVisible = (type: UploadType) => {
  uploadType.value = type
  uploadDialogVisible.value = !uploadDialogVisible.value
}

const resetData = (item: string) => {}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
