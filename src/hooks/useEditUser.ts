import { tableItem } from '@/types/permission'
import { editUserInfoAPI } from '@/api/user'

export default function () {
  const isEditing = ref(false) //to control the edit status
  const editForm = reactive({
    username: '',
    password: '',
    email: '',
    mobile: '',
    id: 0
  })
  const confirmEdit = async () => {
    const { id, email, mobile } = editForm
    await editUserInfoAPI({
      id,
      email,
      mobile
    })
    ElMessage.success('编辑成功')
  }
  const handleEdit = (row: tableItem) => {
    isEditing.value = true //when click the edit button,show the editForm
    editForm.username = row.username
    editForm.email = row.email
    editForm.mobile = row.mobile
    editForm.id = row.id
  }
  return {
    isEditing,
    editForm,
    handleEdit,
    confirmEdit
  }
}
