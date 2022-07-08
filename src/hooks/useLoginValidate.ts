import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
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
    if (valid)
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
  })
}
export const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
