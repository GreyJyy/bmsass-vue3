import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from '@/router'
import 'normalize.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import locale from 'element-plus/lib/locale/lang/zh-cn' //chinese
import '@/permission' //router guard
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.use(pinia)
app.mount('#app')
