<script setup lang="ts">
import { ChildItem, RoleItem } from '@/types/roles'
import { addNewRoleAPI, commitRoleChangeAPI } from '@/api/roles'
import {
  getRolesListAPI,
  deleteCertainRightAPI,
  rolesGrantAPI,
  deleteRoleAPI
} from '@/api/roles'
import { getRightsList } from '@/api/permission'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElTree } from 'element-plus'

interface Tree {
  name: string
  leaf?: boolean
}
interface IRoles {
  roleName: string
  roleDesc: string
  children: ChildItem[]
}
interface IRowItem extends IRoles {
  id: number
}

//render the table
onMounted(() => {
  getRolesList()
})

//about right tree
const defaultRightProps = ref({
  children: 'children',
  label: 'authName'
})
const defaultRightList = ref<number[]>([]) //default checked list
const rightList = ref([]) //all rights list
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  if (node.level > 1) return resolve([])

  //tree's lazy loading
  setTimeout(() => {
    const data: Tree[] = [
      {
        name: 'leaf',
        leaf: true
      },
      {
        name: 'zone'
      }
    ]
    resolve(data)
  }, 500)
}

//get roles list
const rolesList = ref<IRoles[]>([])
const getRolesList = async () => {
  const res = await getRolesListAPI()
  rolesList.value = res
}
const labels = ['角色名称', '角色描述']
const tables = ['roleName', 'roleDesc']

//-----TODO remove the certain right
const onRemoveRight = async (roleId: number, rightId: number) => {
  const res = await deleteCertainRightAPI(roleId, rightId)
  rightList.value = res
  ElMessage.success('删除成功')
  getRolesList()
}

//grant the user right
const grantDialogVisible = ref(false)
const currentRoleId = ref(0)
const treeRef = ref<InstanceType<typeof ElTree>>()

//update the checked keys (fixed the bug for missing checked keys rending)
const setCheckedKeys = (arr: any) => {
  treeRef.value!.setCheckedKeys(arr, false)
}

const getCheckedKeys = () => treeRef.value!.getCheckedKeys(false) //get checked son nodes
const getHalfCheckedKeys = () => treeRef.value!.getHalfCheckedKeys() // get half checked nodes

//recursive traversal to get the innermost right id
const getInnermostIds = (row: IRowItem | ChildItem) => {
  if (!row.children) return
  row.children.forEach((item: ChildItem) =>
    item.children ? getInnermostIds(item) : defaultRightList.value.push(item.id)
  )
}

//click the grant button
const onGrant = async (row: IRowItem) => {
  const res = await getRightsList('tree')
  rightList.value = res //render the right list
  defaultRightList.value = []
  getInnermostIds(row)

  //waiting for DOM rending
  nextTick(() => {
    //'if':avoid the error of 'undefined'(although it doesn't make a difference)
    if (treeRef.value) setCheckedKeys(defaultRightList.value)
  })
  currentRoleId.value = row.id //save the current role id
  grantDialogVisible.value = true
}

//close right granting dialog
const closeGrantDialog = () => {
  ElMessage.info('取消修改')
  grantDialogVisible.value = false
}

//confirm grant
const rids = ref<number[]>([]) //save all checked nodes
const grantConfirm = async () => {
  rids.value = [...getCheckedKeys(), ...getHalfCheckedKeys()] as number[] //concat the checked and half checked nodes
  await await rolesGrantAPI({
    roleId: currentRoleId.value,
    rids: rids.value.join()
  })
  getRolesList() //re render
  ElMessage.success('更新成功')
  grantDialogVisible.value = false
}

//add new role
const buttonName = ref<string>('添加角色')
const addDialogVisible = ref(false)
const form = ref({
  roleName: '',
  roleDsc: ''
})
const onClick = () => {
  addDialogVisible.value = true
}
const closeAddDialog = () => {
  addDialogVisible.value = false
}
const addConfirmDialog = async () => {
  await addNewRoleAPI({
    roleName: form.value.roleName,
    roleDesc: form.value.roleDsc
  })
  getRolesList() //re render
  ElMessage.success('添加角色成功!')
  addDialogVisible.value = false
}

//delete role
const onDelete = async (row: IRowItem) => {
  await deleteRoleAPI(row.id)
  ElMessage({
    message: '删除成功',
    grouping: true,
    type: 'success'
  })
  getRolesList() //re render
}

//edit role
const editDialogVisible = ref(false)
const editInfo = ref<RoleItem>({
  id: 0,
  roleName: '',
  roleDesc: ''
})
const closeEditDialog = () => {
  editDialogVisible.value = false
}
const editConfirmDialog = async () => {
  const res = await commitRoleChangeAPI(editInfo.value)
  closeEditDialog()
  getRolesList() //re render
}
const onEdit = async (row: IRowItem) => {
  editInfo.value.id = row.id
  editInfo.value.roleDesc = row.roleDesc
  editInfo.value.roleName = row.roleName
  editDialogVisible.value = true
  // const res = await commitRoleChangeAPI()
}
</script>

<template>
  <bread-crumb :index="1" :second-index="0"></bread-crumb>

  <!-- main table -->
  <jy-panel
    :hasHeader="true"
    :hasSearchButton="true"
    :buttonName="buttonName"
    :hasOperation="true"
    :hasExpand="true"
    :hasIndex="true"
    :curPage="1"
    :pSize="1"
    :operations="['Edit', 'Delete', 'Setting']"
    :tableData="rolesList"
    :labels="labels"
    :tables="tables"
    @onRemoveRight="onRemoveRight"
    @onClick="onClick"
    @onGrant="onGrant"
    @onDelete="onDelete"
    @onEdit="onEdit"
  ></jy-panel>

  <!-- grant right dialog -->
  <el-dialog
    v-model="grantDialogVisible"
    title="分配权限"
    width="30%"
    :show-close="false"
  >
    <!-- right tree -->
    <el-tree
      ref="treeRef"
      :data="rightList"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultRightList"
      :props="defaultRightProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeGrantDialog">取消</el-button>
        <el-button type="primary" @click="grantConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- add new role dialog -->
  <el-dialog
    v-model="addDialogVisible"
    title="添加角色"
    width="30%"
    :show-close="false"
  >
    <el-form :model="form">
      <el-form-item label="角色名" label-width="120px" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px" prop="roleDsc">
        <el-input v-model="form.roleDsc" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeAddDialog">取消</el-button>
        <el-button type="primary" @click="addConfirmDialog">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- edit  role dialog -->
  <el-dialog
    v-model="editDialogVisible"
    title="编辑角色"
    width="30%"
    :show-close="false"
  >
    <el-form :model="editInfo">
      <el-form-item label="角色名" label-width="120px" prop="roleName">
        <el-input v-model="editInfo.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px" prop="roleDsc">
        <el-input v-model="editInfo.roleDesc" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeEditDialog">取消</el-button>
        <el-button type="primary" @click="editConfirmDialog">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
