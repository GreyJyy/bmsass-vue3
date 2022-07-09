import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useStore from '@/store'
export const ruleFormRef = ref<FormInstance>()
export const form = reactive({
  username: '',
  password: ''
})
export const rules = reactive<FormRules>({
  username: [
    { required: true, trigger: 'blur', message: '用户名不能为空' },
    { min: 3, max: 8, trigger: 'blur', message: '用户名长度为3至8个字符' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '密码不能为空' },
    { min: 3, max: 8, trigger: 'blur', message: '密码长度为3至8个字符' }
  ]
})
export const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const { user } = useStore()
      user.login({ username: form.username, password: form.password })
    }
  })
}
export const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
