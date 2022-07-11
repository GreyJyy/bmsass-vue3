import { ref, reactive } from 'vue'
import { addUserInfoAPI } from '@/api/user'
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
    try {
      const res = await addUserInfoAPI(form)
      if (res.meta.status !== 201) return ElMessage.error(res.meta.msg)
      ElMessage.success(res.meta.msg)
    } catch (error) {
      console.error(error) //for debug
      ElMessage.error('创建失败')
    }
    hideDialog()
  }
  return { dialogFormVisible, form, hideDialog, addNewUser }
}
