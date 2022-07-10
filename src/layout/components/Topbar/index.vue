<script setup lang="ts">
import useStore from '@/store'
import { useRouter } from 'vue-router'
const { user } = useStore()
const router = useRouter()

//logout ->remove token and go to the login page
const logout = () => {
  user.$patch((state) => (state.token = ''))
  router.replace('/login')
}
</script>

<template>
  <el-header>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
</template>

<style scoped lang="less">
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-button {
  margin-left: 1100px;
}
</style>
