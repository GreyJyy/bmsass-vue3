import { useLoginValidate } from './useLoginValidate'

const { ruleFormRef, baseRules } = useLoginValidate()
export default function () {
  const rules = reactive({
    ...baseRules,
    email: [
      {
        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        trigger: 'blur',
        message: '邮箱格式不正确'
      }
    ],
    mobile: [
      {
        pattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        trigger: 'blur',
        message: '手机号格式不正确'
      }
    ]
  })
  return {
    ruleFormRef,
    rules
  }
}
