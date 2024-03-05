<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PrizeData } from '@/utils/custom-types'
import { useCounterStore } from '@/stores/counter'
import _ from 'lodash'

const store = useCounterStore()

const props = defineProps<{
  dialogVisible: boolean
  prizeList: PrizeData[]
}>()

const emits = defineEmits(['update:dialogVisible'])

const formData = ref<PrizeData[]>([])
const dialogVisible = computed(() => props.dialogVisible)

const prizeTotal = computed(() =>
  props.prizeList.reduce((total, data) => {
    return total + data.quantity
  }, 0)
)

const closeDialog = () => {
  emits('update:dialogVisible', false)
}
const updateQuantity = (prize: PrizeData, newVal: number) => {
  if (!newVal) {
    prize.quantity = 0
  }
}
const onSubmit = () => {
  store.updatePrizeList(formData.value)
  closeDialog()
}

watch(dialogVisible, (val: boolean) => {
  if (val) {
    formData.value = _.cloneDeep(props.prizeList)
  }
})
</script>

<template>
  <!-- NOTE: el-dialog 需要多包 div 包住，單獨放在 template 內無法貼上 CSS 標籤.  -->
  <div>
    <el-dialog
      :model-value="dialogVisible"
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
      <el-form>
        <el-form-item v-for="data in formData" :key="'prize' + data.key" :label="data.name">
          <el-input-number
            v-model="data.quantity"
            :min="0"
            @change="updateQuantity(data, $event)"
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
