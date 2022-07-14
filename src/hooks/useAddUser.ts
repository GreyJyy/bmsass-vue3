import { addUserInfoAPI } from '@/api/user'

export default function () {
  const dialogFormVisible = ref(false)
  const form = reactive({
    username: '',
    password: '',
    email: '',
    mobile: ''
  })
  const hideDialog = () => (dialogFormVisible.value = false)
  const addNewUser = async () => {
    await addUserInfoAPI(form)
    ElMessage.success('添加成功')
    hideDialog()
  }
  return { dialogFormVisible, form, hideDialog, addNewUser }
}
