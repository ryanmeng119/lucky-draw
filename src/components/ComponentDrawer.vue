<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  size: {
    type: Number,
    default: 400
  },
  hiddenClose: Boolean
})
const emit = defineEmits(['update:modelValue'])
const updateDrawerVisible = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
<template>
  <el-drawer
    :model-value="modelValue"
    :with-header="false"
    :size="size"
    :before-close="updateDrawerVisible"
  >
    <slot></slot>
    <slot name="footer"></slot>
    <!-- 關閉在 header，為了可以更好排版，所以移除掉表頭自定義一個關閉用 -->
    <div v-show="!hiddenClose" class="flex cursor-pointer absolute right-2 top-2">
      <el-icon color="#aaaaaa" @click="updateDrawerVisible">
        <Close />
      </el-icon>
    </div>
  </el-drawer>
</template>
<style scoped></style>
