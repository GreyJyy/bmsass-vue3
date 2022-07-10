let timer: any = null
export default function (fn: Function, delay: number) {
  clearTimeout(timer)
  timer = setTimeout(fn, delay)
}
