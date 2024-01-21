<template>
  <el-dialog
    :model-value="props.isVisible"
    :title="title"
    width="450px"
    :before-close="closeDialog"
  >
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
        <!-- 名單 -->
        <el-form
          v-if="props.uploadType === UPLOAD_TYPE.MEMBER"
          :model="memberFormData"
          label-position="top"
        >
          <el-form-item label="英文名稱">
            <el-input v-model="memberFormData.nameEn" placeholder="請輸入英文名稱"></el-input>
          </el-form-item>
          <el-form-item label="中文名稱">
            <el-input v-model="memberFormData.nameCh" placeholder="請輸入中文名稱"></el-input>
          </el-form-item>
        </el-form>
        <!-- 獎項 -->
        <el-form
          v-if="props.uploadType === UPLOAD_TYPE.PRIZE"
          :model="prizeFormData"
          label-position="top"
        >
          <el-form-item label="獎項名稱">
            <el-input v-model="prizeFormData.name" placeholder="請輸入獎項名稱"></el-input>
          </el-form-item>
          <el-form-item label="獎項數量">
            <el-input v-model="prizeFormData.number" placeholder="請輸入獎項數量"></el-input>
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
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import Papa from 'papaparse'
import { useCounterStore } from '@/stores/counter'
import type { PrizeData, MemberData, UploadType } from '@/utils/custom-types'
import { storeToRefs } from 'pinia'
import { UPLOAD_TYPE } from '@/utils/const'

const store = useCounterStore()
const { memberList, prizeList } = storeToRefs(store)

const props = defineProps<{
  isVisible: boolean
  uploadType: UploadType
}>()

const emits = defineEmits(['update:isVisible'])

const title = computed(() => `匯入${props.uploadType === UPLOAD_TYPE.MEMBER ? '名單' : '獎項'}`)

const closeDialog = () => {
  upload.value?.clearFiles()
  emits('update:isVisible', false)
}

const SOURCE = {
  CSV: 'csv',
  INPUT: 'input'
}

const currRadio = ref(SOURCE.CSV)
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

const memberFormData = ref({
  nameEn: '',
  nameCh: ''
})

const prizeFormData = ref({
  name: '',
  number: ''
})

const currentData = ref<Array<MemberData | PrizeData>>([])

const parseCSV = (file: File) => {
  Papa.parse(file, {
    complete: (result: Papa.ParseResult<string[]>) => {
      // 更新名單
      // .csv 如果空一行會得到 [''] 的結果，所以用陣列長度過濾空行的部分
      const resultData = result.data
        .filter((item) => item.length > 1)
        .map((item, index) => {
          const commonData = {
            key: index + 1,
            name: item[0].trim()
          }
          if (props.uploadType === UPLOAD_TYPE.MEMBER) {
            return {
              ...commonData,
              nameCH: item[1].trim()
            }
          } else {
            return {
              ...commonData,
              number: Number(item[1].trim())
            }
          }
        })
      currentData.value = overwrite.value
        ? resultData
        : props.uploadType === 'member'
          ? [...memberList.value, ...resultData]
          : [...prizeList.value, ...resultData]
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
  if (props.uploadType === UPLOAD_TYPE.MEMBER) {
    memberList.value = currentData.value as MemberData[]
  } else {
    prizeList.value = currentData.value as PrizeData[]
  }

  localStorage.setItem(props.uploadType, JSON.stringify(currentData.value))
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
