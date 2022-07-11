<script setup lang="ts" name="users">
import { tableItem } from '@/types/permission'
import { changeUserStatusAPI } from '@/api/user'
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import JyDialog from '@/components/JyDialog/index.vue'
import DelConfirm from '@/components/DelConfirm/index.vue'
import ChoiceDialog from '@/components/ChoiceDialog/index.vue'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import useSearch from '@/hooks/useSearch'
import useAddUser from '@/hooks/useAddUser'
import useEditUser from '@/hooks/useEditUser'
import useDeleteUser from '@/hooks/useDeleteUser'
import useHandleRights from '@/hooks/useHandleRights'

//to add the new user
const { dialogFormVisible, form, hideDialog, addNewUser } = useAddUser()
const addBtn = () => {
  isEditing.value = false //when click the add button,show the addForm
  dialogFormVisible.value = true
}
const addConfirm = async () => {
  await addNewUser()
  getUserList() //rerender the user list
}
// to edit the user info
const { isEditing, editForm, handleEdit, confirmEdit } = useEditUser()
const editBtn = (row: tableItem) => {
  dialogFormVisible.value = true //when click the edit button,show the editForm
  handleEdit(row)
}

//to confirm the edit result
const editConfirmBtn = async () => {
  await confirmEdit()
  getUserList() //to rerender the list
  dialogFormVisible.value = false
}

//searchById
const { getUserList, searchById, tableData, query } = useSearch()

//to init the list
getUserList()

// to change the user's status
const changeStatus = async (row: tableItem) => {
  const res = await changeUserStatusAPI(row.id, row['mg_state'])
  if (res.meta.status === 200) return ElMessage.success('修改状态成功')
}

//to delete the user
const { delDialogVisible, delBtn, closeDelDialog, confirmDel } = useDeleteUser()
const delConfirmBtn = async () => {
  await confirmDel() //to confirm the delete operation
  getUserList() //to rerender the list
}

//to setting the rights
const {
  title,
  closeSetDialog,
  setConfirmBtn,
  handleRights,
  setDialogVisible,
  rolesList,
  currentName,
  currentUser,
  currentRole
} = useHandleRights()
</script>

<template>
  <!-- the dialog for deleting -->
  <del-confirm
    :delDialogVisible="delDialogVisible"
    @closeDelDialog="closeDelDialog"
    @delConfirmBtn="delConfirmBtn"
  ></del-confirm>

  <!-- the dialog for editing -->
  <jy-dialog
    :form="isEditing ? editForm : form"
    :dialogFormVisible="dialogFormVisible"
    :isEditing="isEditing"
    @hideDialog="hideDialog"
    @addConfirm="addConfirm"
    @confirmEdit="editConfirmBtn"
  ></jy-dialog>

  <!-- the dialog for setting -->
  <choice-dialog
    :title="title"
    :setDialogVisible="setDialogVisible"
    :rolesList="rolesList"
    :currentName="currentName"
    @closeSetDialog="closeSetDialog"
    @setConfirmBtn="setConfirmBtn"
  >
    <div style="margin-bottom: 10px">当前的用户:{{ currentUser }}</div>
    <div>当前的角色:{{ currentRole }}</div>
  </choice-dialog>
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
        <el-button type="primary" style="height: 38px" @click="addBtn"
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
          <template #default="{ row }">
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              @click="editBtn(row)"
            ></el-button>
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              @click="delBtn(row)"
            ></el-button>
            <el-button
              type="warning"
              :icon="Setting"
              size="small"
              @click="handleRights(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<style scoped lang="less"></style>
