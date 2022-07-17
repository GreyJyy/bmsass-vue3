<script setup lang="ts">
import usePagination from '@/hooks/usePagination'
const { totalItems } = defineProps<{
  totalItems: number
}>()
const emits = defineEmits<{
  (e: 'getUserList', currentPage: number, pageSize: number): void
  (e: 'getGoodsList', currentPage: number, pageSize: number): void
}>()

//to control the pagination
const { currentPage, pageSize } = usePagination()

//define the styles of pagination
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

// change the items of each page
const handleSizeChange = (val: number) => {
  pageSize.value = val
  console.log(pageSize.value)
  emits('getUserList', currentPage.value, pageSize.value)
  emits('getGoodsList', currentPage.value, pageSize.value)
}

// change the current page
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  console.log(currentPage.value)
  emits('getUserList', currentPage.value, pageSize.value)
  emits('getGoodsList', currentPage.value, pageSize.value)
}
</script>

<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 2, 5, 10]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
