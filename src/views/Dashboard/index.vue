<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <h3 v-if="route.name === 'dashboard'">欢迎登录!</h3>
  <router-view></router-view>
</template>

<style scoped></style>
