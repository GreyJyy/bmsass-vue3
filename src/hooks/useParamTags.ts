import { ElInput } from 'element-plus'
import { getAttributesAPI, editAttributesAPI } from '@/api/categories'

export type RowItem = {
  attr_id: number
  attr_name: string
  attr_sel: 'only' | 'many'
  attr_vals: string
  attr_write: string
  cat_id: number
  delete_time: string | null
  inputValue?: string
  inputVisible?: boolean
}

export default function () {
  const tableData = ref<RowItem[]>([])
  const InputRef = ref<InstanceType<typeof ElInput>>()
  const handleClose = async (row: RowItem, tag: string) => {
    await editAttributesAPI({
      id: row.cat_id,
      attrid: row.attr_id,
      attr_name: row.attr_name,
      attr_sel: row.attr_sel,
      attr_vals: row.attr_vals
        .split(' ')
        .filter((item: string) => item !== tag)
        .join(' ')
    })
    tableData.value = await getAttributesAPI({
      id: row.cat_id,
      sel: row.attr_sel
    })
    ElMessage.success('删除成功!')
  }

  const showInput = (row: RowItem) => {
    row.inputVisible = true
    nextTick(() => {
      InputRef.value!.input!.focus()
    })
  }
  const handleInputConfirm = async (row: RowItem) => {
    if (row.inputValue) {
      row.attr_vals = `${row.attr_vals} ${row.inputValue}`
      await editAttributesAPI({
        id: row.cat_id,
        attrid: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals
      })
    }
    row.inputVisible = false
    row.inputValue = ''
  }

  return {
    tableData,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm
  }
}
