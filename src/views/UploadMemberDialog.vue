<template>
  <div>
    <el-dialog :model-value="isVisible" title="匯入設定" width="450px" :before-close="closeDialog">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <el-radio-group class="mb-1 justify-between" v-model="currRadio">
            <el-radio v-for="option in importListOptions" :label="option.key" :key="option.key">{{
              option.name
            }}</el-radio>
          </el-radio-group>
          <el-checkbox v-model="overwrite" class="me-1" label="覆蓋名單" />
        </div>
        <div v-if="currRadio === SOURCE.CSV">
          <el-upload
            ref="upload"
            v-model:file-list="fileList"
            class="flex items-center p-1.5 m-0 upload-border"
            accept=".csv"
            :auto-upload="false"
            :limit="1"
            :on-change="updateUploadFiles"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
          >
            <el-button type="primary" class="w-20 h-7 font-normal text-xs">選擇檔案</el-button>
          </el-upload>
        </div>
        <div v-if="currRadio === SOURCE.INPUT">
          <el-form :model="personnelForm" label-position="top">
            <el-form-item label="英文名稱">
              <el-input v-model="personnelForm.nameEn" placeholder="請輸入英文名稱"></el-input>
            </el-form-item>
            <el-form-item label="中文名稱">
              <el-input v-model="personnelForm.nameCh" placeholder="請輸入中文名稱"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="flex justify-center">
          <el-button class="w-20 h-7 font-normal" @click="closeDialog">取 消</el-button>
          <el-button type="primary" class="w-20 h-7 font-normal" @click="submitUpload"
            >確 認</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import Papa from 'papaparse'
import { useCounterStore, type MenberData } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { memberList } = storeToRefs(store)

const { isVisible } = defineProps({
  isVisible: Boolean
})

const emits = defineEmits(['update:isVisible'])

const closeDialog = () => {
  upload.value?.clearFiles()
  emits('update:isVisible', false)
}

const SOURCE = {
  CSV: 'csv',
  INPUT: 'input'
}

const currRadio = ref('csv')
const importListOptions = [
  {
    key: SOURCE.CSV,
    name: '匯入CSV'
  },
  {
    key: SOURCE.INPUT,
    name: '手動輸入(單筆)'
  }
]
const overwrite = ref(false)
const upload = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])

const personnelForm = reactive({
  nameEn: '',
  nameCh: ''
})

const currentData = ref<MenberData[]>([])

const parseCSV = (file: File) => {
  Papa.parse(file, {
    complete: (result: Papa.ParseResult<string[]>) => {
      // 更新參與人員名單
      // .csv 如果空一行會得到 [''] 的結果，所以用陣列長度過濾空行的部分
      const resultData = result.data
        .filter((item) => item.length > 1)
        .map((item, index) => {
          return {
            key: index + 1,
            name: item[0].trim(),
            nameCH: item[1].trim()
          }
        })
      currentData.value = overwrite.value ? resultData : memberList.value.concat(resultData)
    }
  })
}

const handleExceed: UploadProps['onExceed'] = (files: File[]) => {
  const newFile = files[0]
  parseCSV(newFile)
}

const updateUploadFiles = ({ raw }: { raw: File }) => {
  parseCSV(raw)
}

const handleRemove: UploadProps['onRemove'] = () => {
  currentData.value = []
}

const submitUpload = () => {
  memberList.value = currentData.value
  localStorage.setItem('member', JSON.stringify(memberList.value))
  closeDialog()
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  padding: 10px 20px;
}

.upload-border {
  border: solid 1px #dcdfe6;
  border-radius: 4px;
}
:deep(.el-upload-list) {
  margin: 0;
  flex: 1;
  li {
    margin: 0;
  }
}
</style>
