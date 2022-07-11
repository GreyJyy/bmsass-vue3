<script setup lang="ts">
const { delDialogVisible } = defineProps<{
  delDialogVisible: boolean
}>()
const emit = defineEmits<{
  (e: 'closeDelDialog'): void
  (e: 'delConfirmBtn'): void
}>()
</script>

<template>
  <el-dialog
    v-model="delDialogVisible"
    title="提示"
    width="30%"
    :show-close="false"
  >
    <span>此操作将永久删除该用户, 是否继续?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('closeDelDialog')">取消</el-button>
        <el-button type="primary" @click="emit('delConfirmBtn')"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
