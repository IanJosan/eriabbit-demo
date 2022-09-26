import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 挂载自己的组件插件
import UI from './components/library/index'
// 重置样式的库
import 'normalize.css'
// 自己项目的全局样式
import '@/assets/styles/common.less'
createApp(App).use(store).use(router).use(UI).mount('#app')
