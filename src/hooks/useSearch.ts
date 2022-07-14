import { tableItem } from '@/types/permission'
import { getUserListAPI } from '@/api/user'
import debounce from '@/utils/debounce'

//to control the pagination
export default () => {
  const tableData = ref<tableItem[]>([])
  const query = ref('')
  const totalItems = ref(0)

  const getUserList = async (currentPage: number, pageSize: number) => {
    const res = await getUserListAPI({
      query: query.value,
      pagenum: currentPage,
      pagesize: pageSize
    })
    tableData.value = res.users //the visible users
    totalItems.value = res.total //all users count

    const ind = ref((currentPage - 1) * pageSize) //avoid index infinite increasing
    tableData.value.forEach((item) => {
      item.index = ++ind.value
    })
  }

  const searchById = () => debounce(getUserList, 500)

  return { getUserList, searchById, tableData, query, totalItems }
}
