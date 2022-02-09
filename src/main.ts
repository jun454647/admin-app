import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'

// element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App)
.use(router)
// .use(ElementPlus)
.mount('#app')
