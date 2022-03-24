<template>
  <div class="common-layout">
    <el-container>
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
  </div>
</template>

<script setup lang="ts">
  import ComAside from '../components/aside/index.vue';
  import ComHeader from '../components/header/index.vue';
  // const props = defineProps({
  //   title: {
  //     type: String,
  //     default: () => '测试信息'
  //   }
    
  // })
  // console.log(props.title);
  
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
.el-aside{
 height: 100vh; 
}
</style>