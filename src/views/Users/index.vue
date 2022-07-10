<script setup lang="ts" name="users">
import { tableItem } from '@/types/permission'
import { changeUserStatusAPI } from '@/api/user'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'
import useSearch from '@/hooks/useSearch'
import JyDialog from '@/components/JyDialog/index.vue'
import useAddUser from '@/hooks/useAddUser'

//searchById
const { getUserList, searchById, tableData, query } = useSearch()

getUserList() //to init the list

// to change the user's status
const changeStatus = async (row: tableItem) => {
  await changeUserStatusAPI(row.id, row['mg_state'])
}
const handleEdit = () => {
  console.log('handleEdit')
}
const handleDel = () => {
  console.log('handleDel')
}
const handleRights = () => {
  console.log('handleRights')
}

//to add the new user
const { dialogFormVisible, form, hideDialog, addNewUser } = useAddUser()
</script>

<template>
  <jy-dialog
    :form="form"
    :dialogFormVisible="dialogFormVisible"
    @hideDialog="hideDialog"
    @addNewUser="addNewUser"
  ></jy-dialog>
  <bread-crumb :index="0" :second-index="0"></bread-crumb>
  <el-card class="box-card" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <el-input
          v-model="query"
          size="large"
          style="width: 318px; margin-right: 20px"
          placeholder="请输入内容"
          :suffix-icon="Search"
          @input="searchById"
        />
        <el-button
          type="primary"
          style="height: 38px"
          @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </div>
    </template>
    <div class="table">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="index" label="#" width="180" />
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column label="状态">
          <template #default="{ row }"
            ><el-switch v-model="row['mg_state']" @change="changeStatus(row)"
          /></template>
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
