<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useStore from '@/store'
import { ref } from 'vue'
import { SideMenuItem } from '@/types/permission'
const { index, secondIndex } = defineProps<{
  index: number
  secondIndex: number
}>()
const { user } = useStore()
const menus: SideMenuItem = ref(user.menuList[index])
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ menus.authName }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{
      menus.children[secondIndex].authName
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
