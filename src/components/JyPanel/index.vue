<script setup lang="ts">
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'
type operation = 'Edit' | 'Delete' | 'Setting' //chose button
const props = defineProps<{
  operations?: operation[] //visible buttons
  hasHeader: boolean
  hasSearchInput: boolean
  hasSearchButton: boolean
  hasOperation: boolean
  tableData: object[] //the data for table
  labels: string[] //the headline name
  tables: string[] //each column's data
}>()
const emits = defineEmits<{
  (e: 'onSearch'): void //for search input's input event
  (e: 'onClick'): void //for search button's click event
  (e: 'onEdit'): void //for edit operation's click event
  (e: 'onDelete'): void //for delete operation's click event
  (e: 'onGrant'): void //for grant operation's click event
}>()
//search---------------------------
const query = ''
const onSearch = () => {
  console.log('onSearch')
  emits('onSearch')
}
const onClick = () => {
  console.log('onClick')
  emits('onClick')
}
//search-----------------------------
//3 btns-----------------------------
const onEdit = (row: any) => {
  console.log('onEdit')
  emits('onEdit')
}
const onDelete = (row: any) => {
  console.log('onEdit')
  emits('onEdit')
}
const onGrant = (row: any) => {
  console.log('onEdit')
  emits('onEdit')
}
//3 btns-----------------------------
</script>

<template>
  <el-card class="box-card" style="margin-top: 20px">
    <template #header v-if="hasHeader">
      <div class="card-header">
        <el-input
          v-if="hasSearchInput"
          v-model="query"
          size="large"
          style="width: 318px; margin-right: 20px"
          placeholder="请输入内容"
          :suffix-icon="Search"
          @input="onSearch"
        />
        <el-button
          v-if="hasSearchButton"
          type="primary"
          style="height: 38px"
          @click="onClick"
          >添加用户</el-button
        >
      </div>
    </template>
    <div class="table">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column
          v-for="(item, index) in tables"
          :key="index"
          :prop="item"
          :label="labels[index]"
        >
          <template #default="scope" v-if="item === 'level'">
            <el-tag
              :type="
                scope.row.level === '等级一'
                  ? ''
                  : scope.row.level === '等级二'
                  ? 'success'
                  : 'warning'
              "
              >{{ scope.row.level }}</el-tag
            >
          </template>
          <template #default="scope" v-if="item === 'pay_status'">
            <el-tag
              :type="scope.row.pay_status === '未支付' ? 'danger' : 'success'"
              >{{ scope.row.pay_status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
          v-if="hasOperation"
        >
          <template #default="{ row }">
            <el-button
              v-if="operations?.includes('Edit')"
              type="primary"
              :icon="Edit"
              size="small"
              @click="onEdit(row)"
            ></el-button>
            <el-button
              v-if="operations?.includes('Delete')"
              type="danger"
              :icon="Delete"
              size="small"
              @click="onDelete(row)"
            ></el-button>
            <el-button
              v-if="operations?.includes('Setting')"
              type="warning"
              :icon="Setting"
              size="small"
              @click="onGrant(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<style scoped></style>
