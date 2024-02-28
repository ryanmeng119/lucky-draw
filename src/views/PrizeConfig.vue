<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { PrizeData } from '@/utils/custom-types'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const prizeTotal = computed(() =>
  props.prizeList.reduce((total, data) => {
    return total + data.quantity
  }, 0)
)

const props = defineProps<{
  isVisible: boolean
  prizeList: PrizeData[]
}>()

const formData = ref()

const emits = defineEmits(['update:isVisible'])

const closeDialog = () => {
  emits('update:isVisible', false)
}
const updateQuantity = (prize: PrizeData, val: number | null) => {
  if (!val) {
    prize.quantity = 0
  }
}
const onSubmit = () => {}

onMounted(() => {
  debugger
})
</script>

<template>
  <div>
    <el-dialog
      :model-value="props.isVisible"
      class="dialog-model"
      :width="450"
      :before-close="closeDialog"
    >
      <template #title>
        <div class="flex flex-col gap-1">
          <div class="text-lg">獎項配置</div>
          <div class="text-xs flex">
            <div class="mr-0.5 text-red-700">*</div>
            當前配置數量：
            <div class="font-medium">{{ prizeTotal }}</div>
          </div>
        </div>
      </template>
      <el-form :model="formData">
        <el-form-item v-for="prize in prizeList" :key="'prize' + prize.key" :label="prize.name">
          <el-input-number
            v-model="prize.quantity"
            :min="0"
            @change="(val: number) => updateQuantity(prize, val)"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="w-20" @click="closeDialog">取消</el-button>
          <el-button class="w-20" type="primary" @click="onSubmit">確定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-form-item) {
  align-items: center;
  .el-form-item__label {
    height: auto;
    flex: 2.5;
    justify-content: flex-start;
    line-height: normal;
  }
  .el-form-item__content {
    flex: 1;
  }
}
:deep(.dialog-model) {
  .el-dialog__body {
    height: 60vh;
    padding-top: 0;
    overflow: auto;
  }
}
</style>
