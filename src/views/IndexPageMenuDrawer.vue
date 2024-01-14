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
          @click="toggleUploadDialogVisible"
        >
          <el-icon color="#aaaaaa" :size="20">
            <IconUpload></IconUpload>
          </el-icon>
          <span>匯入名單</span>
        </div>
        <UploadMemberDialog v-model:isVisible="uploadDialogVisible"></UploadMemberDialog>
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
    <el-icon color="#aaaaaa" class="cursor-pointer absolute right-2 top-2" @click="closeDrawer">
      <Close />
    </el-icon>
  </el-drawer>
</template>
<script setup lang="ts">
import IconTrophy from '@/components/icons/IconTrophy.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import IconSlider from '@/components/icons/IconSlider.vue'
import UploadMemberDialog from './UploadMemberDialog.vue'
import { ref } from 'vue'

const { isVisible } = defineProps({
  isVisible: Boolean
})

const emits = defineEmits(['update:isVisible'])

const closeDrawer = () => {
  emits('update:isVisible', false)
}

const uploadDialogVisible = ref<boolean>(false)
const toggleUploadDialogVisible = () => {
  uploadDialogVisible.value = !uploadDialogVisible.value
}
</script>
