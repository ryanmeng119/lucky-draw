const generateArray = (start: number, end: number) =>
  Array.from(new Array(end + 1).keys()).slice(start)

// 取範圍內隨機整數
export const randomNum = (minNum: number = 1, maxNum: number) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
}
/**
 * @param {number} total 總人數
 * @param {array} won 已中獎
 * @param {number} num 本次抽取人數
 */
// 單次抽獎
export const luckydrawHandler = (total: number, won: number[] = [], num: number) => {
  const peolist = generateArray(1, Number(total))
  const wons = won
  const res: number[] = []
  for (let j = 0; j < num; j++) {
    const nodraws = peolist.filter((item) => !wons.includes(item)) // 排除掉已中獎的 id.
    const current = nodraws[randomNum(1, nodraws.length) - 1]
    res.push(current)
    wons.push(current)
  }
  return res
}
