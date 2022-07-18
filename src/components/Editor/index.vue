<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
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
const changeStatus = (TabsPaneContext: any) => {
  active.value = +TabsPaneContext.index
}
//add goods
const addGoods = () => {
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
      ><el-icon style="vertical-align: middle; margin-top: -3px"
        ><InfoFilled
      /></el-icon>
      添加商品信息</el-tag
    >

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
    <el-tabs tab-position="left" class="demo-tabs" @tab-click="changeStatus">
      <el-tab-pane v-for="(item, index) in labels" :key="index" :label="item">
        <div class="step5" v-if="index === 4">
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
</style>
