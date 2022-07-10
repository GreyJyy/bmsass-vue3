<script setup lang="ts">
import { ref } from 'vue'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'
const input1 = ref('')
const tableData = [
  {
    date: '1',
    name: 'Tom',
    mobile: '11112321312',
    roles: '管理员'
  }
]
const value1 = ref(false)
const handleEdit = () => {
  console.log('handleEdit')
}
const handleDel = () => {
  console.log('handleDel')
}
const handleRights = () => {
  console.log('handleRights')
}
</script>

<template>
  <bread-crumb :index="0" :second-index="0"></bread-crumb>
  <el-card class="box-card" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <el-input
          v-model="input1"
          size="large"
          style="width: 318px; margin-right: 20px"
          placeholder="请输入内容"
          :suffix-icon="Search"
        />
        <el-button type="primary" style="height: 38px">添加用户</el-button>
      </div>
    </template>
    <div class="table">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="#" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="roles" label="角色" />
        <el-table-column label="状态">
          <template #default><el-switch v-model="value1" /></template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default>
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              @click="handleEdit"
            ></el-button>
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              @click="handleDel"
            ></el-button>
            <el-button
              type="warning"
              :icon="Setting"
              size="small"
              @click="handleRights"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<style scoped lang="less"></style>
