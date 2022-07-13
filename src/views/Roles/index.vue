<script setup lang="ts">
import { ChildItem } from '@/types/roles'
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import JyPanel from '@/components/JyPanel/index.vue'
import {
  getRolesListAPI,
  deleteCertainRightAPI,
  rolesGrantAPI
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

type CheckedObj = ChildItem & {
  pid: string
}
type nodes = CheckedObj & {
  $treeNodeId: number
}
interface ITreeStatus<T> {
  checkedNodes: T[]
  checkedKeys: number[]
  halfCheckedNodes: T[]
  halfCheckedKeys: number[]
}

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
getRolesList() //render the table
const labels = ['角色名称', '角色描述']
const tables = ['roleName', 'roleDesc']

//remove the certain right
const onRemoveRight = async (roleId: number, rightId: number) => {
  await deleteCertainRightAPI(roleId, rightId)
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
//get checked keys
const getCheckedKeys = () => {
  treeRef.value!.getCheckedKeys(false)
}

const getInnermostIds = (row: IRowItem | ChildItem) => {
  if (!row.children) return
  row.children.forEach((item: ChildItem) => {
    if (item.children) {
      getInnermostIds(item)
    } else {
      defaultRightList.value.push(item.id)
    }
  })
}

//click the grant button
const onGrant = async (row: IRowItem) => {
  const res = await getRightsList('tree')
  rightList.value = res //render the right list
  defaultRightList.value = []
  console.log(row)
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
  isChanged.value = false
  ElMessage.info('取消修改')
  grantDialogVisible.value = false
}

const rids = ref<number[]>([]) //save current checked nodes
const isChanged = ref(false) //a flag for rights changing

//response for changing node's status
const onChangeChecked = (
  currentCheckedObj: CheckedObj,
  currentTreeStatus: ITreeStatus<nodes>
) => {
  isChanged.value = true
  rids.value = currentTreeStatus.checkedKeys
  console.log(rids.value)
}

//confirm grant
const grantConfirm = async () => {
  if (isChanged.value) {
    await rolesGrantAPI({
      roleId: currentRoleId.value,
      rids: rids.value.join()
    })
    isChanged.value = false
    getRolesList()
  }
  ElMessage.success('更新成功')
  grantDialogVisible.value = false
}
</script>

<template>
  <bread-crumb :index="1" :second-index="0"></bread-crumb>

  <!-- main table -->
  <jy-panel
    :hasHeader="true"
    :hasSearchInput="true"
    :hasOperation="true"
    :hasExpand="true"
    :hasIndex="true"
    :operations="['Edit', 'Delete', 'Setting']"
    :tableData="rolesList"
    :labels="labels"
    :tables="tables"
    @onRemoveRight="onRemoveRight"
    @onGrant="onGrant"
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
      @check="onChangeChecked"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeGrantDialog">取消</el-button>
        <el-button type="primary" @click="grantConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
