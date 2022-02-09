import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PagesRoutes from "./page"
import ViewsRoutes from "./view"

// 页面路由
const routes: Array<RouteRecordRaw> = [
    ...PagesRoutes,
    ...ViewsRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        else return { top: 0 }
    }
});

// 路由开始进入
router.beforeEach((to: any, from: any, next) => {
    next()
})
  
router.afterEach((to, from, next) => {
    // 保存url
})

export default router;