import type { FormInstance, FormRules } from 'element-plus'

export default function () {
  const ruleFormRef = ref<FormInstance>()
  //check the number input
  const checkNumber = (rule: any, val: any, callback: any) => {
    if (val <= 0) {
      return callback(new Error('数值不能小于等于0'))
    }
  }
  const rules = reactive<FormRules>({
    goodsName: [
      { required: true, message: '请输入商品名称', trigger: 'blur' },
      { min: 1, max: 25, message: '长度为1至25个字符', trigger: 'blur' }
    ],
    goodsPrice: [
      { required: true, message: '请输入商品价格', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' }
    ],
    goodsWeight: [
      { required: true, message: '请输入商品重量', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' }
    ],
    goodsNumber: [
      { required: true, message: '请输入商品数量', trigger: 'blur' },
      { validator: checkNumber, trigger: 'blur' }
    ]
  })
  const form = reactive({
    goodsName: '',
    goodsPrice: 0,
    goodsWeight: 0,
    goodsNumber: 0
  })
  return {
    rules,
    form,
    ruleFormRef
  }
}
