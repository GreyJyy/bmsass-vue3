<script setup lang="ts">
import { SideMenuItem } from '@/types/permission'
const { isCollapse, activePath, menuList } = defineProps<{
  isCollapse: boolean
  activePath: string
  menuList: SideMenuItem[]
}>()
const emit = defineEmits<{ (e: 'toggleCollapse'): void }>()
const toggleCollapse = () => emit('toggleCollapse')
</script>

<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!-- 侧边栏菜单区域 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="activePath"
      router
    >
      <el-sub-menu
        :index="`${index}`"
        v-for="(item, index) in menuList"
        :key="item.id"
      >
        <template #title>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          :index="`/${child.path}`"
          v-for="child in item.children"
          :key="child.id"
          >{{ child.authName }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.iconfont {
  margin-right: 10px;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
</style>
