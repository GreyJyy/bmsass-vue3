import useStore from '@/store'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export const useLoginValidate = () => {
  const ruleFormRef = ref<FormInstance>()
  const baseAttrs = {
    username: '',
    password: ''
  }
  const form = reactive(baseAttrs)
  const baseRules = {
    username: [
      { required: true, trigger: 'blur', message: '用户名不能为空' },
      { min: 2, max: 7, trigger: 'blur', message: '用户名长度为2至7个字符' }
    ],
    password: [
      { required: true, trigger: 'blur', message: '密码不能为空' },
      { min: 2, max: 7, trigger: 'blur', message: '密码长度为2至7个字符' }
    ]
  }
  const rules = reactive<FormRules>(baseRules)
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        const { user } = useStore()
        user.login({ username: form.username, password: form.password })
      }
    })
  }
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    form,
    rules,
    ruleFormRef,
    baseRules,
    baseAttrs,
    submitForm,
    resetForm
  }
}
