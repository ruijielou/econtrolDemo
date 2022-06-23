import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import "@/assets/common.css";
import "@/assets/common.js";
import 'vant/lib/index.css';
// import "@/assets/main.css";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
// import Home from "@/pc/pc"
// import Mobile from "@/m/mobile"

const routes = [
  // { path: '/', component: () => import('./pc/pc.vue') },
  { path: '/', component: () => import('./pc/pcdata.vue') },
  { path: '/mobile', component: () => import('./m/mobile.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).use(Vant).mount('#app')