<script lang="ts" setup name="jydialog">
import { addInfoReq } from '@/types/user'
import useAddValidate from '@/hooks/useAddValidate'
const { ruleFormRef, rules, submitForm } = useAddValidate() //to validate the add form
const formLabelWidth = '140px'
const { dialogFormVisible, form, isEditing } = defineProps<{
  dialogFormVisible: boolean
  form: addInfoReq
  isEditing: boolean
}>()
const emit = defineEmits<{
  (e: 'hideDialog'): void
  (e: 'addNewUser'): void
  (e: 'confirmEdit'): void
}>()
const confirmForm = () => {
  submitForm(ruleFormRef.value)
  emit('addNewUser')
}
const setEdit = () => {
  emit('confirmEdit')
}
</script>
<template>
  <!-- for edit info -->
  <el-dialog
    v-if="isEditing"
    v-model="dialogFormVisible"
    title="添加新用户"
    :show-close="false"
    @close="emit('hideDialog')"
  >
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input disabled v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="form.mobile" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('hideDialog')">取消</el-button>
        <el-button type="primary" @click="setEdit">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- for add user info -->
  <el-dialog
    v-else
    v-model="dialogFormVisible"
    title="添加新用户"
    :show-close="false"
    @close="emit('hideDialog')"
  >
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="form.mobile" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('hideDialog')">取消</el-button>
        <el-button type="primary" @click="confirmForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
