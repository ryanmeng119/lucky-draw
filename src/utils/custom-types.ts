export type UploadType = 'member' | 'prize'

export type MemberData = {
  key: number
  name: string
  nameCH: string
}

export type PrizeData = {
  key: number
  name: string
  quantity: number // 配置數量
}
