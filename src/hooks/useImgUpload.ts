import type { UploadProps, UploadUserFile } from 'element-plus'

export default function () {
  const fileList = ref<UploadUserFile[]>([])
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handleRemove: UploadProps['onRemove'] = () =>
    ElMessage.success('删除成功!')
  const handlePreview: UploadProps['onPreview'] = async (file) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
  }
  return {
    fileList,
    dialogImageUrl,
    dialogVisible,
    handleRemove,
    handlePreview
  }
}
