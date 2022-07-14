import { tableItem } from '@/types/permission'
import { deleteUserAPI } from '@/api/user'

export default function () {
  //to delete the user
  const delId = ref(0)
  const delDialogVisible = ref(false)
  const delBtn = (row: tableItem) => {
    delDialogVisible.value = true
    delId.value = row.id
  }
  const closeDelDialog = () => {
    delDialogVisible.value = false
  }
  const confirmDel = async () => {
    await deleteUserAPI(delId.value)
    ElMessage.success('删除成功')
    closeDelDialog()
  }
  return {
    delDialogVisible,
    delBtn,
    closeDelDialog,
    confirmDel
  }
}
