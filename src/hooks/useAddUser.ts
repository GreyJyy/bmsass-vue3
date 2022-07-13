import { addUserInfoAPI } from '@/api/user'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
    hideDialog()
  }
  return { dialogFormVisible, form, hideDialog, addNewUser }
}
