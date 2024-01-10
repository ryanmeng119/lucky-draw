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
  number: number // 配置數量
}

// config = {
//   number: number 參與人數
//   name: String 抽獎活動標題
//   ([xxx]: number) * n 獎項數量
// };
// form = {
//   allin: Boolean, 全員抽獎
//   category: String, 獎項數的 key
//   mode: Number,  抽獎模式
//   qty: Number, 抽取人數 (自訂時使用)
//   remain: Number 獎項剩餘數量 (限制一次抽完與自訂上限用) 獎項總數 - 已抽取的數量
// };
// mode:
// 1 - 抽 1 人
// 0 - 一次抽完
// 99 - 自訂人數
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
