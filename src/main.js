import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// if (import.meta.env.MODE === 'production') {
//   app.config.devtools = false
// }
app.use(router).mount('#app')
