<script setup lang="ts">
import TopBar from '@/layout/components/TopBar/index.vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import { getSideMenuAPI } from '@/api/permission'
import { ref, reactive } from 'vue'
const menuList = ref([])
const getSideMenu = async () => {
  const res = await getSideMenuAPI()
  menuList.value = res.data
}
getSideMenu()
const isCollapse = ref(false)
const activePath = ref('0')
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
        :menuList="menuList"
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
