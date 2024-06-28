//main file for the app
import { createApp } from 'vue'
import { createPinia } from 'pinia' //pinia framework import serves the purpose of state management and listening to components (like event bus)
import './assets/styles.css'

import App from './App.vue'
import router from './router'

const app = createApp(App) //create new application

// Vuetify import
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// bootstrap import
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
//Deisgn framework
const vuetify = createVuetify({
    components,
    directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')


