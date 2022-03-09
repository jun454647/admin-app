import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "animate.css"
import { createPinia } from 'pinia';
import Icons from "@/config/icons"
import components from '@/components/index';

const app = createApp(App);

// 注册全局组件
const comps = { ...components, ...Icons }
Object.keys(comps).map(key => {
    app.component(key, comps[key as keyof typeof comps])
})

app.use(router)
app.use(createPinia())
app.mount('#app')
