import { ElMessage } from 'element-plus'
import { ref } from 'vue'
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
    const res = await deleteUserAPI(delId.value)
    if (res.meta.status === 200) {
      ElMessage.success('删除成功')
    } else {
      ElMessage.warning('删除失败')
    }
    closeDelDialog()
  }
  return {
    delDialogVisible,
    delBtn,
    closeDelDialog,
    confirmDel
  }
}
