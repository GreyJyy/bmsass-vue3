import { tableItem } from '@/types/permission'
import { IRoles, ChildItem } from '@/types/roles'
import { getRolesListAPI, setUserRoleAPI } from '@/api/roles'

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
    await setUserRoleAPI({
      id: currentId.value,
      rid
    })
    ElMessage.success('设置成功')
    setDialogVisible.value = false
  }
  const handleRights = async (row: tableItem) => {
    currentUser.value = row.username
    currentRole.value = row.role_name
    currentId.value = row.id
    const res = await getRolesListAPI()
    rolesList.value = res
    currentName.value = res[0]?.roleName || '请选择'
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
