<script setup lang="ts">
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div
    class="toggle-button"
    @click="toggleCollapse"
    :style="{ width: isCollapse ? '63px' : '199px' }"
  >
    |||
  </div>
  <el-menu
    default-active="2"
    style="background-color: #424243"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span style="color: #fff">Navigator One</span>
      </template>
      <el-menu-item-group style="background-color: #424243">
        <el-menu-item index="1-1" style="color: #fff">item one</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.toggle-button {
  text-align: center;
  color: #fff;
  background-color: #424243;
}
</style>
