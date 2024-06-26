import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/theme.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from "@/router";

import IconComponent from '@/components/icons/icon.vue';


const app = createApp(App)

app.use(createPinia())
app.use(router)


app.use(ElementPlus)

app.component('icon', IconComponent);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')
