<script setup lang="ts">
import { getCategoriesAPI, addCategoriesAPI } from '@/api/categories'
import type { CascaderOption, CascaderProps, ExpandTrigger } from 'element-plus'

type sortChild = {
  cat_deleted: boolean
  cat_id: number
  cat_level: number
  cat_name: string
  cat_pid: number
  children?: sortChild
}
type selectedItem = {
  cat_level: number
  cat_pid: number
}
const labels = reactive(['分类名称', '是否有效', '排序'])
const tables = reactive(['cat_name', 'cat_deleted', 'cat_level'])
const classification = ref<sortChild[]>([])

onMounted(async () => {
  categories.value = await getCategoriesAPI()
  console.log(categories)
  const res = await getCategoriesAPI({
    type: undefined,
    pagenum: 1,
    pagesize: 5
  })
  classification.value = res.result
  totalItems.value = res.total
})

//pagination
const curPage = ref(1)
const pSize = ref(5)
const totalItems = ref(0)
const changePagination = async (currentPage: number, pageSize: number) => {
  const res = await getCategoriesAPI({
    type: undefined,
    pagenum: currentPage,
    pagesize: pageSize
  })
  classification.value = res.result
  curPage.value = currentPage
  pSize.value = pageSize
}

//add categories
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//cascader
const categories = ref<CascaderOption[]>([])
const props: CascaderProps = {
  expandTrigger: 'hover' as ExpandTrigger,
  value: 'cat_id',
  label: 'cat_name',
  checkStrictly: true
}
const handleChange = (val: number[]) => {
  console.log(val)
}
const form = reactive({
  name: '',
  pid: []
})
const onClick = () => {
  dialogFormVisible.value = true
}
const confirmAdd = async () => {
  await addCategoriesAPI({
    cat_name: form.name,
    cat_pid: form.pid[form.pid.length - 1] || 0,
    cat_level: form.pid.length - 1
  })
  ElMessage.success('添加成功')
  dialogFormVisible.value = false
}
</script>

<template>
  <bread-crumb :index="2" :second-index="2"></bread-crumb>
  <!-- main table -->
  <jy-panel
    :labels="labels"
    :tables="tables"
    :operations="['Edit', 'Delete']"
    :has-header="true"
    :has-search-button="true"
    button-name="添加分类"
    :has-operation="true"
    :cur-page="curPage"
    :p-size="pSize"
    :table-data="classification"
    @on-click="onClick"
  ></jy-panel>
  <!-- the pagination -->
  <pagination
    :totalItems="totalItems"
    @getGoodsList="changePagination"
  ></pagination>
  <!-- addSort dialog -->
  <el-dialog v-model="dialogFormVisible" title="添加商品分类">
    <el-form :model="form">
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="父级分类" :label-width="formLabelWidth">
        <!-- the cascader -->
        <el-cascader
          placeholder="请选择"
          v-model="form.pid"
          :options="categories"
          :props="props"
          @change="handleChange"
          filterable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
