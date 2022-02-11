import { RouteRecordRaw } from "vue-router";
// 主内容页面
const views: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("@/pages/layout/layout.vue"),
        children: [
            {
                path: "/",
                component: () => import("@/views/home.vue"),
            },
            {
                path: "/data",
                component: () => import("@/views/data.vue"),
            }
        ]
    }
]

export default views;