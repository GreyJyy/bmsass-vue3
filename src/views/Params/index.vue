<script setup lang="ts">
import {
  getCategoriesAPI,
  getAttributesAPI,
  addAttributesAPI,
  deleteAttributesAPI,
  editAttributesAPI
} from '@/api/categories'
import type {
  CascaderOption,
  CascaderProps,
  ExpandTrigger,
  TabsPaneContext
} from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import useParamsTags from '@/hooks/useParamTags'
import type { RowItem } from '@/hooks/useParamTags'

//init categories data
onMounted(async () => {
  categories.value = await getCategoriesAPI()
})

//cascader
const value = ref<number[]>([])
const categories = ref<CascaderOption[]>([])
const props: CascaderProps = {
  expandTrigger: 'hover' as ExpandTrigger,
  value: 'cat_id',
  label: 'cat_name'
}
const theRow = ref<RowItem>()
const handleChange = async (val: number[]) => {
  //only level 3 parameters are allowed
  if (val.length < 3) {
    ElMessage.error('请选择三级分类')
    isDisabled.value = true
    value.value = []
    tableData.value = []
    return
  }
  isDisabled.value = false
  tableData.value = await getAttributesAPI({
    id: val[val.length - 1],
    sel: 'many'
  })
  tableData.value.forEach((item: RowItem) => {
    item.inputVisible = false
    item.inputValue = ''
  })
}
const onEdit = (row: RowItem) => {
  theRow.value = row
  input.value = theRow.value.attr_name
  editVisible.value = true
}
const onDelete = async (row: RowItem) => {
  theRow.value = row
  deleteVisible.value = true
}

//tabs
const activeName = ref('first')
const handleClick = async (tab: TabsPaneContext, event: Event) => {
  //sel:only
  if (tab.props.name === 'second') {
    title.value = '静态属性'
    //only level 3 parameters are allowed
    if (value.value.length < 3) return ElMessage.error('请选择三级分类')
    tableData.value = await getAttributesAPI({
      id: value.value[value.value.length - 1],
      sel: 'only'
    })
    return
  }
  title.value = '动态参数'
  handleChange(value.value) //sel:many
}

//delete visible
const isDisabled = ref(true)
const deleteVisible = ref(false)
const deleteConfirm = async () => {
  deleteVisible.value = false
  if (title.value === '动态参数') {
    await deleteAttributesAPI({
      id: theRow.value!.cat_id,
      attrid: theRow.value!.attr_id
    })
    tableData.value = await getAttributesAPI({
      id: theRow.value!.cat_id,
      sel: 'many'
    })
    ElMessage.success('删除成功!')
  } else {
    ElMessage.warning('我不知道这个删除的接口是哪个,懒得写了')
  }
}

//add visible
const addVisible = ref(false)
const input = ref('')
const title = ref('动态参数')
const confirmAdd = async () => {
  //for dynamic parameter
  if (title.value === '动态参数') {
    const res = await addAttributesAPI({
      id: value.value[value.value.length - 1],
      attr_name: input.value,
      attr_sel: 'many'
    })
    tableData.value = [...tableData.value, res] //reduce the requests
    tableData.value.forEach((item: RowItem) => {
      item.inputVisible = false
      item.inputValue = ''
    })
    //for static properties
  } else {
    const res = await addAttributesAPI({
      id: value.value[value.value.length - 1],
      attr_name: input.value,
      attr_sel: 'only'
    })
    tableData.value = [...tableData.value, res] //reduce the requests
    tableData.value.forEach((item: RowItem) => {
      item.inputVisible = false
      item.inputValue = ''
    })
  }
  addVisible.value = false
}

//edit visible
const editVisible = ref(false)
const confirmEdit = async () => {
  if (title.value === '动态参数') {
    await editAttributesAPI({
      id: theRow.value!.cat_id,
      attrid: theRow.value!.attr_id,
      attr_name: input.value,
      attr_sel: 'many'
    })
    tableData.value = await getAttributesAPI({
      id: theRow.value!.cat_id,
      sel: 'many'
    })
    ElMessage.success('编辑成功!')
  } else {
    ElMessage.warning('和动态参数的编辑一样,懒得做')
  }
  editVisible.value = false
}

//use tags
const { tableData, InputRef, handleClose, showInput, handleInputConfirm } =
  useParamsTags()
</script>

<template>
  <bread-crumb :index="2" :second-index="1"></bread-crumb>
  <el-card class="box-card" style="margin-top: 20px">
    <!-- the tag -->
    <el-tag
      class="ml-2"
      type="warning"
      effect="light"
      size="large"
      style="display: block; width: 100%; line-height: 30px; text-align: left"
      ><el-icon style="vertical-align: middle; margin-top: -3px"
        ><InfoFilled
      /></el-icon>
      注意：只允许为第三级分类设置相关参数！</el-tag
    >
    <!-- the cascader -->
    <div class="example-block">
      <span class="example-demonstration">选择商品分类</span>
      <el-cascader
        v-model="value"
        :options="categories"
        :props="props"
        @change="handleChange"
        filterable
      />
    </div>
    <!-- the tabs -->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <!-- the main table1 -->
        <div class="table">
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="addVisible = true"
            :disabled="isDisabled"
            >添加参数</el-button
          >
          <el-table
            border
            :data="tableData"
            stripe
            style="width: 100%"
            :row-key="(row) => row.attr_id"
          >
            <!-- the expand column -->
            <el-table-column type="expand" fixed="left">
              <template #default="props">
                <el-tag
                  v-for="(tag, index) in props.row.attr_vals.split(' ').filter((item:string)=>item!=='')"
                  :key="index"
                  class="mx-1"
                  closable
                  style="margin: 0 3px"
                  :disable-transitions="false"
                  @close="handleClose(props.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="props.row.inputVisible"
                  ref="InputRef"
                  v-model="props.row.inputValue"
                  class="ml-1 w-20"
                  size="small"
                  style="width: 120px"
                  @keyup.enter="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(props.row)"
                >
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <!-- the index column -->
            <el-table-column
              type="index"
              :index="1"
              label="#"
            ></el-table-column>
            <el-table-column
              prop="attr_name"
              label="分类名称"
            ></el-table-column>
            <!-- the operation column -->
            <el-table-column fixed="right" label="操作" :width="180">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  :icon="Edit"
                  @click="onEdit(row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  :icon="Delete"
                  @click="onDelete(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="second">
        <!-- the main table2 -->
        <div class="table">
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="addVisible = true"
            :disabled="isDisabled"
            >添加属性</el-button
          >
          <el-table
            border
            :data="tableData"
            :row-key="(row) => row.attr_id"
            stripe
            style="width: 100%"
          >
            <!-- the expand column -->
            <el-table-column type="expand" fixed="left">
              <template #default="props">
                <el-tag
                  v-for="(tag, index) in props.row.attr_vals.split(' ').filter((item:string)=>item!=='')"
                  :key="index"
                  class="mx-1"
                  closable
                  style="margin: 0 3px"
                  :disable-transitions="false"
                  @close="handleClose(props.row, tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="props.row.inputVisible"
                  ref="InputRef"
                  v-model="props.row.inputValue"
                  class="ml-1 w-20"
                  size="small"
                  style="width: 120px"
                  @keyup.enter="handleInputConfirm(props.row)"
                  @blur="handleInputConfirm(props.row)"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(props.row)"
                >
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <!-- the index column -->
            <el-table-column
              type="index"
              :index="1"
              label="#"
            ></el-table-column>
            <el-table-column
              prop="attr_name"
              label="分类名称"
            ></el-table-column>
            <!-- the operation column -->
            <el-table-column fixed="right" label="操作" :width="180">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  :icon="Edit"
                  @click="onEdit(row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  :icon="Delete"
                  @click="onDelete(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- delete dialog -->
  <el-dialog v-model="deleteVisible" title="提示" width="30%">
    <span>此操作将永久删除该属性, 是否继续?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- add dialog -->
  <el-dialog v-model="addVisible" :title="`添加${title}`" width="30%">
    <span>{{ title }}</span>
    <el-input
      v-model="input"
      clearable
      style="width: 250px; margin-left: 15px"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- edit dialog -->
  <el-dialog v-model="editVisible" :title="`修改${title}`" width="30%">
    <span>{{ title }}</span>
    <el-input
      v-model="input"
      clearable
      style="width: 250px; margin-left: 15px"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.example-block {
  margin: 1rem;
}
.example-demonstration {
  margin: 1rem;
}
</style>
