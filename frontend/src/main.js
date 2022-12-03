/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from './router'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App).use(router)
app.config.globalProperties.$token = ''
app.config.globalProperties.$userId = ''

registerPlugins(app)

app.mount('#app')
