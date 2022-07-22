<script setup lang="ts">
import { getCategoriesAPI, getAttributesAPI } from '@/api/categories'
import { addGoodsAPI } from '@/api/goods'
import type { CascaderOption, CascaderProps, ExpandTrigger } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { getObjectKeys } from '@/utils/getObjectKeys'
import type { RowItem } from '@/hooks/useParamTags'
import useGoodsValidate from '@/hooks/useGoodsValidate'
import useImgUpload from '@/hooks/useImgUpload'
import E from 'wangeditor'

type attrItem = {
  attr_id: number
  attr_value: string
}

//goods-adding form validate
const { rules, form, ruleFormRef } = useGoodsValidate()

//editor
const phoneEditor = ref<any>('')
onMounted(async () => {
  //init categories data
  categories.value = await getCategoriesAPI()
  phoneEditor.value = new E('#richText')
  // upload image:base 64
  phoneEditor.value.config.uploadImgShowBase64 = true
  // hide linkImg
  phoneEditor.value.config.showLinkImg = false
  // create an editor
  phoneEditor.value.create()
  // content
  phoneEditor.value.txt.html()
})

const router = useRouter()
const active = ref(0)
const labels = ref<string[]>([
  '基本信息',
  '商品参数',
  '商品属性',
  '商品图片',
  '商品内容'
])

//change tabs
const isAllowed = ref(false)
const beforeLeave = () => {
  if (
    value.value.length < 3 ||
    form.goodsName === '' ||
    form.goodsNumber <= 0 ||
    form.goodsPrice <= 0 ||
    form.goodsWeight <= 0
  ) {
    ElMessage.error('请填写必填项')
    isAllowed.value = false
    return false
  }
  isAllowed.value = true
  return true
}

//control the steps forward
const changeStatus = async (TabsPaneContext: any) => {
  if (isAllowed.value) active.value = +TabsPaneContext.index
}

//cascader
const value = ref<number[]>([])
const categories = ref<CascaderOption[]>([])
const props: CascaderProps = {
  expandTrigger: 'hover' as ExpandTrigger,
  value: 'cat_id',
  label: 'cat_name'
}

const params = ref<RowItem[]>([])
const attributes = ref<RowItem[]>([])
const attrs = ref<attrItem[]>([])
const handleChange = async (val: number[]) => {
  if (val.length < 3) {
    ElMessage.error('请选择三级分类')
    value.value = []
    return //only level-3 category is allowed
  }
  value.value = val

  //get params data
  params.value = await getAttributesAPI({
    id: value.value[2],
    sel: 'many'
  })
  params.value.forEach((item: RowItem) => {
    item.attr_vals
      .split(' ')
      .filter((item) => item !== '')
      .forEach((item) => checkedTags.value.push(item)) //default check all tags
  })
  //get attrs data
  attributes.value = await getAttributesAPI({
    id: value.value[2],
    sel: 'only'
  })

  //the type of attrItem[] which is addGoodsAPI needs
  attrs.value = [...params.value, ...attributes.value].map((item: any) => {
    item = getObjectKeys(item, ['attr_id', 'attr_vals'])
    item['attr_value'] = item['attr_vals']
    delete item['attr_vals']
    return item //needs attr_value instead of attr_vals
  })
}

//goods params
const checkedTags = ref<string[]>([]) //the checked vals

//when change tags,control the high lighting style and operate the attrs.attr_value
const onChange = (item: RowItem, tag: string) => {
  //if tag is high lighting,remove it from checkedTags and replace it in attrs.attr_value
  if (checkedTags.value.includes(tag)) {
    checkedTags.value.splice(checkedTags.value.indexOf(tag), 1)
    attrs.value.forEach((item2: attrItem) => {
      if (item2.attr_id === item.attr_id) {
        item2.attr_value = item2.attr_value.replace(tag, '')
      }
    })
    //else add it to checkedTags and push it to attrs.attr_value
  } else {
    checkedTags.value.push(tag)
    attrs.value.forEach((item2: attrItem) => {
      if (item2.attr_id === item.attr_id) {
        item2.attr_value = `${item2.attr_value} ${tag}`
      }
    })
  }
}

//image upload
const { fileList, dialogImageUrl, dialogVisible, handleRemove, handlePreview } =
  useImgUpload()

//add goods
// console.log(richEditor.value)
const addGoods = async () => {
  await addGoodsAPI({
    goods_cat: value.value.join(),
    goods_name: form.goodsName,
    //needs string type
    goods_price: `${form.goodsPrice}`,
    goods_weight: `${form.goodsWeight}`,
    goods_number: `${form.goodsNumber}`,
    goods_introduce: phoneEditor.value.txt.html(),
    //cant read pics correctly,so just give an empty array
    pics: [],
    attrs: attrs.value
  })
  ElMessage.success('添加成功')
  router.push({ name: 'goods' })
}
</script>

<template>
  <!-- breadcrumb -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- main content -->
  <el-card style="margin-top: 20px">
    <el-tag
      class="ml-2"
      type="warning"
      effect="light"
      size="large"
      style="
        display: block;
        width: 100%;
        line-height: 30px;
        text-align: left;
        margin-bottom: 20px;
      "
    >
      <el-icon style="vertical-align: middle; margin-top: -3px">
        <InfoFilled />
      </el-icon>
      添加商品信息
    </el-tag>

    <!-- steps -->
    <el-steps
      :space="200"
      :active="active"
      finish-status="success"
      align-center
      style="margin-bottom: 15px"
    >
      <el-step
        v-for="(item, index) in [...labels, '完成']"
        :key="index"
        :title="item"
      />
    </el-steps>

    <!-- tabs -->
    <el-tabs
      tab-position="left"
      class="demo-tabs"
      @tab-click="changeStatus"
      :before-leave="beforeLeave"
    >
      <el-tab-pane v-for="(item, index) in labels" :key="index" :label="item">
        <!-- base info -->
        <div class="step1" v-show="index === 0">
          <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon>
            <el-form-item prop="goodsName">
              <el-input
                v-model="form.goodsName"
                clearable
                style="margin: 15px 0"
              >
                <template #prepend>商品名称</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="goodsPrice">
              <el-input
                v-model="form.goodsPrice"
                type="number"
                clearable
                style="margin: 15px 0"
              >
                <template #prepend>商品价格</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="goodsWeight">
              <el-input
                type="number"
                v-model="form.goodsWeight"
                clearable
                style="margin: 15px 0"
              >
                <template #prepend>商品重量</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="goodsNumber">
              <el-input
                type="number"
                v-model="form.goodsNumber"
                clearable
                style="margin: 15px 0"
              >
                <template #prepend>商品数量</template>
              </el-input>
            </el-form-item>
          </el-form>
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
        </div>
        <!-- goods params -->
        <div class="step2" v-show="index === 1">
          <div class="params" v-for="item in params" :key="item.attr_id">
            <div class="top">{{ item.attr_name }}</div>
            <div class="main">
              <el-check-tag
                style="margin: 0 5px"
                :checked="checkedTags.includes(tag)"
                @click="onChange(item, tag)"
                v-for="(tag, index) in item.attr_vals
                  .split(' ')
                  .filter((item) => item !== '')"
                :key="index"
                >{{ tag }}</el-check-tag
              >
            </div>
          </div>
        </div>
        <!-- goods attrs -->
        <div class="step3" v-show="index === 2">
          <div class="params" v-for="item in attributes" :key="item.attr_id">
            <div class="top">{{ item.attr_name }}</div>
            <el-input v-model="item.attr_vals" />
          </div>
        </div>
        <!-- image upload -->
        <div class="step4" v-show="index === 3">
          <el-upload
            v-model:file-list="fileList"
            action="http://liufusong.top:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture-card"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>
        <!-- goods content -->
        <div class="step5" v-show="index === 4">
          <div
            id="richText"
            style="height: 400px; background-color: #fff"
          ></div>
          <el-button type="primary" @click="addGoods">添加商品</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.example-block {
  margin: 15px -15px 0;
}

.example-demonstration {
  margin: 1rem;
}

.params {
  margin: 30px 0;
}

.main {
  margin: 10px 0;
}
.top {
  margin-bottom: 10px;
}
</style>
