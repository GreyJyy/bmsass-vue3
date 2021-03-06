<script setup lang="ts">
import { ChildItem } from '@/types/roles'
import { Delete, Edit, Setting, Search } from '@element-plus/icons-vue'
type operation = 'Edit' | 'Delete' | 'Setting' //chose button
interface IRoles {
  roleName: string
  roleDesc: string
  children: ChildItem[]
}
interface IRowItem extends IRoles {
  id: number
}

const tableConfig = defineProps<{
  labels: string[] //the headline name
  tables: string[] //each column's data
  tableData: object[] //the data for table
  operations?: operation[] //visible buttons
  hasHeader?: boolean
  hasSearchInput?: boolean
  hasSearchButton?: boolean
  buttonName?: string
  hasOperation?: boolean
  hasIndex?: boolean
  curPage?: number //if hasIndex,u must set this prop
  pSize?: number //same as curPage
  hasExpand?: boolean //the expand option
  widthList?: string[]
  operationWidth?: string
}>()

const emits = defineEmits<{
  (e: 'onSearch', query: string): void //for search input's input event
  (e: 'onClick'): void //for search button's click event
  (e: 'onEdit', row: IRowItem): void //for edit operation's click event
  (e: 'onDelete', row: IRowItem): void //for delete operation's click event
  (e: 'onGrant', row: IRowItem): void //for grant operation's click event
  (e: 'onRemoveRight', roleId: number, rightId: number): void //for remove right's click event
}>()

//index line increase
const count = computed(() => {
  return (tableConfig.curPage! - 1) * tableConfig.pSize! + 1
})
//search---------------------------
const query = ref('')
const onSearch = () => {
  console.log('onSearch')
  emits('onSearch', query.value)
}
const onClick = () => {
  emits('onClick')
}
//search-----------------------------
//3 btns-----------------------------
const onEdit = (row: IRowItem) => {
  emits('onEdit', row)
}
const onDelete = (row: IRowItem) => {
  emits('onDelete', row)
}
const onGrant = (row: IRowItem) => {
  emits('onGrant', row)
}
const delInfo = ref({
  roleId: 0,
  rightId: 0
})
//3 btns-----------------------------

//remove certain right
const delDialogVisible = ref(false)
const onRemoveRight = (roleId: number, rightId: number) => {
  delInfo.value.roleId = roleId
  delInfo.value.rightId = rightId
  delDialogVisible.value = true
}
const closeDelDialog = () => (delDialogVisible.value = false)
const delConfirmBtn = () => {
  emits('onRemoveRight', delInfo.value.roleId, delInfo.value.rightId)
  delDialogVisible.value = false
}
</script>

<template>
  <el-card style="margin-top: 20px">
    <!-- the head line -->
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
          >{{ buttonName }}</el-button
        >
      </div>
    </template>
    <!-- the main table -->
    <div class="table">
      <el-table
        border
        :data="tableData"
        :row-key="(row) => row.id || row.cat_id"
        stripe
        style="width: 100%"
      >
        <!-- the expand treeList -->
        <el-table-column type="expand" v-if="hasExpand" label="#" fixed="left">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row v-for="item in props.row.children" :key="item.id">
                <el-col :span="6" class="left">
                  <div class="class1">
                    <el-tag class="class1">{{ item.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </div>
                </el-col>
                <el-col :span="18" class="right">
                  <!-- a recursive component but still have a bug(cant send id) which i cant resolve,so i annotated it -->
                  <!-- <tree-columns
                    :child-list="item.children"
                    :son-list="item.children"
                  ></tree-columns> -->
                  <div
                    class="wrap"
                    v-for="item2 in item.children"
                    :key="item2.id"
                  >
                    <div class="class2">
                      <el-tag type="success">{{ item2.authName }}</el-tag
                      ><i class="el-icon-caret-right"></i>
                    </div>
                    <div class="class3">
                      <el-tag
                        closable
                        @close="onRemoveRight(props.row.id, item3.id)"
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        >{{ item3.authName }}</el-tag
                      >
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <!-- the index column -->
        <el-table-column
          type="index"
          :index="count"
          label="#"
          v-if="hasIndex"
        ></el-table-column>

        <!-- the information column -->
        <el-table-column
          v-for="(item, index) in tables"
          :key="index"
          :prop="item"
          :width="widthList && widthList[index]"
          :label="labels[index]"
        >
          <template #default="scope" v-if="item === 'cat_deleted'">
            <el-icon v-if="scope.row.cat_deleted === false" style="color: green"
              ><CircleCheckFilled
            /></el-icon>
            <el-icon v-else style="color: red"><CircleCloseFilled /></el-icon>
          </template>
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
          <template #default="scope" v-if="item === 'cat_level'">
            <el-tag
              :type="
                scope.row.cat_level === 0
                  ? ''
                  : scope.row.cat_level === 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.cat_level === 0
                  ? '一级'
                  : scope.row.cat_level === 1
                  ? '二级'
                  : '三级'
              }}</el-tag
            >
          </template>
          <template #default="scope" v-if="item === 'pay_status'">
            <el-tag
              :type="scope.row.pay_status === '未支付' ? 'danger' : 'success'"
              >{{ scope.row.pay_status }}</el-tag
            >
          </template>
        </el-table-column>

        <!-- the operation column -->
        <el-table-column
          fixed="right"
          label="操作"
          :width="operationWidth"
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

  <!-- the delete confirm dialog -->
  <del-confirm
    :delDialogVisible="delDialogVisible"
    @closeDelDialog="closeDelDialog"
    @delConfirmBtn="delConfirmBtn"
  ></del-confirm>
</template>

<style scoped lang="less">
.el-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  i {
    line-height: 32px;
  }
  .el-tag {
    margin: 8px;
  }
  .left {
    display: flex;
    justify-content: center;
    .class1 {
      display: flex;
      align-items: center;
    }
  }
  .right {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    .wrap {
      display: flex;
    }
    .class2 {
      display: flex;
      align-items: center;
      margin-right: 50px;
    }
    .class3 {
      display: inline-block;
    }
  }
}
</style>
