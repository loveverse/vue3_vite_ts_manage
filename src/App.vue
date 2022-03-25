<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.baseCon {
  width: 100%;
  height: 100%;
}
#app {
  .baseCon();
}
.app {
  .baseCon();
}

</style>
