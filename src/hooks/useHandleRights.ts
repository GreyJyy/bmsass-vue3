import { tableItem } from '@/types/permission'
import { IRoles, ChildItem } from '@/types/roles'
import { getRolesListAPI, setUserRoleAPI } from '@/api/roles'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default function () {
  const currentUser = ref('')
  const currentRole = ref('')
  const currentName = ref('')
  const currentId = ref(0)
  const title = ref('分配角色')
  const setDialogVisible = ref(false)
  const rolesList = ref<IRoles<ChildItem[]>[]>([])
  const closeSetDialog = () => {
    setDialogVisible.value = false
  }
  const setConfirmBtn = async (currentName: string) => {
    const rid = rolesList.value.find(
      (item) => item.roleName === currentName
    )!.id
    const res = await setUserRoleAPI({
      id: currentId.value,
      rid
    })
    if (res.meta.status !== 200) ElMessage.warning('设置失败')
    setDialogVisible.value = false
  }
  const handleRights = async (row: tableItem) => {
    currentUser.value = row.username
    currentRole.value = row.role_name
    currentId.value = row.id
    const res = await getRolesListAPI()
    rolesList.value = res.data
    currentName.value = res.data[0].roleName
    setDialogVisible.value = true
  }
  return {
    title,
    closeSetDialog,
    setConfirmBtn,
    handleRights,
    setDialogVisible,
    rolesList,
    currentName,
    currentUser,
    currentRole
  }
}
