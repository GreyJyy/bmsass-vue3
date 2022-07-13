<script setup lang="ts">
import { ChildItem } from '@/types/roles'
import { ref } from 'vue'
import BreadCrumb from '@/components/BreadCrumb/index.vue'
import JyPanel from '@/components/JyPanel/index.vue'
import {
  getRolesListAPI,
  deleteCertainRightAPI,
  rolesGrantAPI
} from '@/api/roles'
import { getRightsList } from '@/api/permission'
// tree---------------------------------------
import type Node from 'element-plus/es/components/tree/src/model/node'
interface Tree {
  name: string
  leaf?: boolean
}

const defaultRightProps = ref({
  children: 'children',
  label: 'authName'
})
const defaultRightList = ref<number[]>([])
const rightList = ref([])
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  if (node.level > 1) return resolve([])

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
// tree---------------------------------------
interface IRoles {
  roleName: string
  roleDesc: string
  children: ChildItem[]
}
interface IRowItem<T> {
  id: number
  roleDesc: string
  roleName: string
  children: T
}
type childItem = {
  id: number
  authName: string
  path: string
  children?: childItem[]
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
  getRolesList()
}

//grant the user right
const grantDialogVisible = ref(false)
const currentRoleId = ref(0)
const onGrant = async (row: IRowItem<childItem[]>) => {
  const res = await getRightsList('tree')
  rightList.value = res
  console.log(row)
  const addDeepChildIds = (arr?: childItem[]) => {
    if (arr?.every((item: any) => !item.children)) return
    row.children.forEach((item: any) => {
      if (!item.children) {
        defaultRightList.value.push(item.id)
      } else {
        addDeepChildIds(item.children)
      }
    })
  }
  addDeepChildIds()
  console.log(defaultRightList.value)
  // const findDeepChildId = (rows: childItem[] | []) => {
  //   if (rows.some((item: any) => !item.children)) {
  //     rows.forEach((item: any) => {
  //       defaultRightList.value.push(item.id)
  //     })
  //     return
  //   }
  //   row.children.forEach((item: any) => {
  //     findDeepChildId(item.children)
  //   })
  // }
  // findDeepChildId([])
  // console.log(defaultRightList.value)
  currentRoleId.value = row.id
  // console.log(currentRoleId.value)
  grantDialogVisible.value = true
}
const closeGrantDialog = () => (grantDialogVisible.value = false)
const grantConfirm = () => {
  // rolesGrantAPI()
  grantDialogVisible.value = false
}
</script>

<template>
  <bread-crumb :index="1" :second-index="0"></bread-crumb>
  <jy-panel
    :hasHeader="true"
    :hasSearchInput="true"
    :hasSearchButton="false"
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
    <el-tree
      ref="tree"
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
</template>

<style scoped lang="less"></style>
