import { RouteRecordRaw } from "vue-router";
// 全屏页面
const pages: Array<RouteRecordRaw> = [
    {
        path: "/login",
        component: () => import("@/pages/login.vue"),
    }
]

export default pages;