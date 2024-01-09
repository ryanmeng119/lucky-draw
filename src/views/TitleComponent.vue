<script setup lang="ts">
const result: string[] = ['HelloWorld', 'HelloWorld2']
</script>
<template>
  <div v-if="result.length === 0">Lucky Draw</div>
  <el-carousel
    v-else
    class="w-full h-full"
    trigger="click"
    height="100%"
    indicator-position="none"
    arrow="never"
  >
    <el-carousel-item v-for="item in result" :key="item">
      <div class="h-full flex justify-center items-center text-slate-600 opacity-75">
        {{ item }}
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<style scoped>
.opacity-75 {
  opacity: 0.75;
}
.el-carousel__item.is-animating {
  transition: transform 0.8s ease-in-out;
}
</style>
