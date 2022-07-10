<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
const { index, secondIndex } = defineProps<{
  index: number
  secondIndex: number
}>()
const { user } = useStore()
const { menuList } = storeToRefs(user)
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ menuList[index]?.authName }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{
      menuList[index]?.children[secondIndex]?.authName
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
