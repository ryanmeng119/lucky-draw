import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type MenberData = {
  key: number
  name: string
  nameCH: string
}

type PrizeData = {
  key: number
  name: string
  number: number
}

export const useCounterStore = defineStore('counter', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const drawTitle = ref<string>('')
  const lotteryList = ref<PrizeData[]>([])
  const memberList = ref<MenberData[]>([])

  return { drawTitle, lotteryList, memberList }
})
