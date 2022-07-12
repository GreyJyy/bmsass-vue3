export const formatDate = (timeStamp: string) => {
  const time = new Date(+timeStamp * 1000)
  const [y, m, d] = [
    `${time.getFullYear()}`,
    `${time.getMonth() + 1}`,
    `${time.getDate()}`
  ]
  for (let item of [y, m, d]) {
    item = item.toString().padStart(2, '0')
  }
  return `${y}-${m}-${d}`
}
