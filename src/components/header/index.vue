<template>
  <header class="out_header">
    <el-button
      plain
      size="small"
      class="show_button"
      :icon="IconMenu"
      @click="handlerClick"
    >
    </el-button>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item>homepage</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>homepage</el-breadcrumb-item> -->
    </el-breadcrumb>
    <div class="right">
      <el-dropdown>
        <div>
          <img class="avator" src="../../assets/img/avator.jpg" alt="" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useStore } from "vuex";
const store = useStore();
function handlerClick() {
  // store.commit('isCollapse', true)
  store.commit("updateCollapse");
}
</script>

<style lang="less" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.out_header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #333333;
  .el-breadcrumb{
    flex: 1;
  }
  .show_button {
    margin: 0 20px;
  }
  .right {
    margin-right: 20px;
    text-align: right;
    .avator {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
