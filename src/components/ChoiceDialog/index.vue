<script setup lang="ts">
import { IRoles, ChildItem } from '@/types/roles'

const formLabelWidth = '140px'
const { currentName, title, setDialogVisible, rolesList } = defineProps<{
  currentName: string
  title: string
  setDialogVisible: boolean
  rolesList: IRoles<ChildItem[]>[]
}>()
const emit = defineEmits<{
  (e: 'closeSetDialog'): void
  (e: 'setConfirmBtn', currentName: string): void
}>()
</script>

<template>
  <el-dialog
    v-model="setDialogVisible"
    :title="title"
    width="30%"
    :show-close="false"
  >
    <el-form>
      <slot></slot>
      <el-form-item :label="title" :label-width="formLabelWidth">
        <el-select v-model="currentName" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeSetDialog')">取消</el-button>
        <el-button type="primary" @click="emit('setConfirmBtn', currentName)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-form-item {
  margin-top: 20px;
  margin-left: -75px;
}
</style>
