import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { PrizeData, MemberData } from '@/utils/custom-types'

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
  const drawTitle = ref<string>('')
  const prizeList = ref<PrizeData[]>([])
  const memberList = ref<MemberData[]>([])

  const setLocalStorageData = (key: string, data: PrizeData[] | MemberData[]) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const updateListFromLocalStorage = (key: string, list: Ref<PrizeData[] | MemberData[]>) => {
    const localStorageData = localStorage.getItem(key)
    if (localStorageData) {
      list.value = JSON.parse(localStorageData)
    }
  }
  const updateStoreListData = () => {
    updateListFromLocalStorage('prize', prizeList)
    updateListFromLocalStorage('member', memberList)
  }

  return { drawTitle, prizeList, memberList, updateStoreListData, setLocalStorageData }
})
