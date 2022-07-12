<script setup lang="ts">
import { ChildItem } from '@/types/roles'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
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
const defaultRightList = ref([])
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
interface roles {
  roleName: string
  roleDesc: string
  children: ChildItem[]
}

//get roles list
const rolesList = ref<roles[]>([])
const getRolesList = async () => {
  const res = await getRolesListAPI()
  rolesList.value = res.data
}
getRolesList() //render the table
const labels = ['角色名称', '角色描述']
const tables = ['roleName', 'roleDesc']

//remove the certain right
const onRemoveRight = async (roleId: number, rightId: number) => {
  try {
    await deleteCertainRightAPI(roleId, rightId)
    ElMessage.success('删除成功')
    getRolesList()
  } catch (error) {
    console.error(error) //for debug
    ElMessage.error('删除失败')
  }
}

//grant the user right
const grantDialogVisible = ref(false)
const currentRoleId = ref(0)
const onGrant = async (row: any) => {
  const res = await getRightsList('tree')
  rightList.value = res.data
  currentRoleId.value = row.id
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
