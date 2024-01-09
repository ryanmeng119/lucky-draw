import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const drawTitle = ref('')
  const lotteryList = []
  const memberList = []

  return { drawTitle, lotteryList, memberList }
})
