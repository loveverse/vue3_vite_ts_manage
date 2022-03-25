, Reflet
<template>
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#364F6B"
    text-color="#fff"
  >
    <h3 class="aside_title">{{ isCollapse ? "后台" : "后台管理" }}</h3>
    <el-menu-item
      :index="item.name"
      v-for="(item, index) in menu"
      :key="item.name"
      @click="changeMenu(item)"
    >
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, reactive, computed, Ref } from "vue";
import { useRouter } from "vue-router";
// import { PictureFilled, HomeFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
// console.log(store.state.isCollapse);

let isCollapse = computed((): boolean => {
  return store.state.isCollapse;
});
const menu: any[] = reactive([
  {
    path: "/",
    name: "home",
    label: "首页",
    icon: "home-filled",
  },
  {
    path: "/pic",
    name: "pic",
    label: "图片管理",
    icon: "picture-filled",
  },
]);
let active: Ref = ref('')
if (sessionStorage.getItem("tab")) {
  active = ref(sessionStorage.getItem("tab"));
} else {
  active = ref("home");
}
function changeMenu(item: { name: string }) {
  router.push({
    name: item.name,
  });
  sessionStorage.setItem("tab", item.name);
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.el-menu {
  border-right: none;
  .aside_title {
    font-size: 24px;
    color: #fff;
    text-align: center;
    padding: 18px 0;
  }
}
</style>
