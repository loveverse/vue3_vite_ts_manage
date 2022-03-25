<template>
  <el-container class="common-layout">
    <el-aside width="auto">
      <ComAside></ComAside>
    </el-aside>
    <el-container>
      <el-header>
        <ComHeader></ComHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import ComAside from "../components/aside/index.vue";
import ComHeader from "../components/header/index.vue";
</script>

<style lang="less" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
  .el-header {
    padding: 0;
  }
  .el-main{
    // overflow: hidden;
  }
}
</style>
