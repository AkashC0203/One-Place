import { createApp } from 'vue'
import App from './app.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

const app = createApp(App)

app.config.productionTip = false

app.config.globalProperties.$http = axios

app.use(router)
app.use(store)

app.mount('#app')

