import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import router from "./router";
import store from "./store";
import("./assets/css/index.less");

let app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
// 注册全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
