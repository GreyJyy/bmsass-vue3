<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  router.replace('/')
}
</script>

<template>
  <el-row justify="space-between" align="middle">
    <el-col :span="18" class="title">Fast Coding Company</el-col>
    <el-col :span="6"
      ><el-row justify="end" style="margin-top: 14px"
        ><el-button type="primary" @click="logout">退出</el-button></el-row
      ></el-col
    >
  </el-row>
</template>

<style scoped>
.el-col {
  height: 60px;
}
.title {
  font-size: 24px;
  line-height: 60px;
}
</style>
