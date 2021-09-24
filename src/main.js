import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <---
import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";

applyPolyfills().then(() => {
    jeepSqlite(window);
});
      
const app = createApp(App).use(router);

router.isReady().then(() => {
    app.mount('#app');
});
  