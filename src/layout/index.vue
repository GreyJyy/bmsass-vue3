<script setup lang="ts" name="layout">
import TopBar from '@/layout/components/TopBar/index.vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import useCollapseToggle from '@/hooks/useCollapseToggle'
import { useRoute } from 'vue-router'
//to control the Collapse toggle
const { isCollapse, activePath, toggleCollapse } = useCollapseToggle()
const route = useRoute()

//to monitor the path change and cancel the sideBar's high light
watch(route, () => {
  if (route.path === '/') {
    activePath.value = '/'
    isCollapse.value = true
  }
})
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
