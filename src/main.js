import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// AndDesign
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

createApp(App).use(router).use(Antd).mount('#app')
