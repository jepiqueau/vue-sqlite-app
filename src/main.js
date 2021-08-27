import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";
import { useState } from '@/composables/state';

applyPolyfills().then(() => {
    jeepSqlite(window);
});
const [jsonListeners, setJsonListeners] = useState(false);
const [message, setMessage] = useState("");
      
const app = createApp(App).use(router);
app.config.globalProperties.$isJsonListeners = {jsonListeners: jsonListeners, setJsonListeners: setJsonListeners};
app.config.globalProperties.$messageContent = {message: message, setMessage: setMessage};

router.isReady().then(() => {
    app.mount('#app');
});
  