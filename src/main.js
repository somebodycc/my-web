import './assets/main.css'
import './style/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'atropos/css'

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
