import debounce from '@/utils/debounce'
import { ref } from 'vue'
import { getUserListAPI } from '@/api/user'
import { tableItem } from '@/types/permission'
export default () => {
  const tableData = ref([])
  const query = ref('')
  const getUserList = async () => {
    const res = await getUserListAPI({
      query: query.value,
      pagenum: 1,
      pagesize: 5
    })
    tableData.value = res.data.users
    let ind = 0
    tableData.value.forEach((item: tableItem) => {
      item.index = ++ind
    })
  }
  const searchById = () => debounce(getUserList, 500)

  return { getUserList, searchById, tableData, query }
}
