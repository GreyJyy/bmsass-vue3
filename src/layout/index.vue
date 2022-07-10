<script setup lang="ts">
import TopBar from '@/layout/components/TopBar/index.vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import useStore from '@/store'
import { ref } from 'vue'
const isCollapse = ref(false)
const activePath = ref('0')
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const { user } = useStore()
user.getSideMenu()
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
