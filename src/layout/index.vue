<script setup lang="ts">
import TopBar from '@/layout/components/TopBar/index.vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import { ref, reactive } from 'vue'
const menuList = reactive([])
const iconsObj = reactive({
  '125': 'iconfont icon-yonghu1',
  '103': 'iconfont icon-quanxian',
  '101': 'iconfont icon-shangpin',
  '102': 'iconfont icon-dingdan2',
  '145': 'iconfont icon-icon_huabanfuben'
})
const isCollapse = ref(false)
const activePath = ref('')
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="common-layout">
    <top-bar></top-bar>
    <el-container class="home-container">
      <side-bar
        :activePath="activePath"
        :isCollapse="isCollapse"
        @toggleCollapse="toggleCollapse"
      ></side-bar>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.home-container {
  height: 794px;
}
.el-main {
  background-color: #eaedf1;
}
</style>
