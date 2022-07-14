export default function () {
  const currentPage = ref(1)
  const pageSize = ref(5)
  return {
    currentPage,
    pageSize
  }
}
